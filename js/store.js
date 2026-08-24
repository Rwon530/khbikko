/**
 * كشري الزعيم - محرك البيانات وإدارة الحالة
 * Reactive Store & State Management
 */

class ZaeemStore {
  constructor() {
    this.listeners = [];
    this.init();
    this.setupCrossTabSync();
  }

  init() {
    // Menu items
    if (!localStorage.getItem("zaeem_menu")) {
      localStorage.setItem("zaeem_menu", JSON.stringify(INITIAL_MENU_ITEMS));
    }
    // Categories
    if (!localStorage.getItem("zaeem_categories")) {
      localStorage.setItem("zaeem_categories", JSON.stringify(INITIAL_CATEGORIES));
    }
    // Branches
    if (!localStorage.getItem("zaeem_branches")) {
      localStorage.setItem("zaeem_branches", JSON.stringify(INITIAL_BRANCHES));
    }
    // Orders
    if (!localStorage.getItem("zaeem_orders")) {
      localStorage.setItem("zaeem_orders", JSON.stringify(INITIAL_ORDERS));
    }
    // Cart
    if (!localStorage.getItem("zaeem_cart")) {
      localStorage.setItem("zaeem_cart", JSON.stringify([]));
    }
    // Customers & Loyalty
    if (!localStorage.getItem("zaeem_customers")) {
      localStorage.setItem("zaeem_customers", JSON.stringify(INITIAL_CUSTOMERS));
    }
    // Reservations
    if (!localStorage.getItem("zaeem_reservations")) {
      localStorage.setItem("zaeem_reservations", JSON.stringify(INITIAL_RESERVATIONS));
    }
    // Careers / Applications
    if (!localStorage.getItem("zaeem_applications")) {
      localStorage.setItem("zaeem_applications", JSON.stringify([]));
    }
    // Staff
    if (!localStorage.getItem("zaeem_staff")) {
      localStorage.setItem("zaeem_staff", JSON.stringify(INITIAL_STAFF));
    }
    // Settings
    if (!localStorage.getItem("zaeem_settings")) {
      localStorage.setItem("zaeem_settings", JSON.stringify(RESTAURANT_SETTINGS));
    }
    // Selected Branch for Customer
    if (!localStorage.getItem("zaeem_selected_branch")) {
      localStorage.setItem("zaeem_selected_branch", "branch-downtown");
    }
    // Current Staff Auth
    if (!localStorage.getItem("zaeem_current_user")) {
      // Default to super admin for easy evaluation or null
      localStorage.setItem("zaeem_current_user", JSON.stringify(INITIAL_STAFF[0]));
    }
  }

  setupCrossTabSync() {
    window.addEventListener("storage", (e) => {
      if (e.key && e.key.startsWith("zaeem_")) {
        this.notify(e.key);
      }
    });
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(eventKey = "general") {
    this.listeners.forEach(listener => {
      try {
        listener(eventKey);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  // ================= MENU & CATEGORIES =================
  getMenu() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_menu")) || INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  }

  getCategories() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_categories")) || INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  getMenuItemById(id) {
    const menu = this.getMenu();
    return menu.find(item => item.id === id);
  }

  toggleDishStock(id) {
    const menu = this.getMenu();
    const item = menu.find(i => i.id === id);
    if (item) {
      item.inStock = !item.inStock;
      localStorage.setItem("zaeem_menu", JSON.stringify(menu));
      this.notify("zaeem_menu");
    }
    return item;
  }

  saveMenuItem(dishData) {
    const menu = this.getMenu();
    const index = menu.findIndex(i => i.id === dishData.id);
    if (index >= 0) {
      menu[index] = { ...menu[index], ...dishData };
    } else {
      dishData.id = "dish-" + Date.now();
      if (dishData.inStock === undefined) dishData.inStock = true;
      menu.unshift(dishData);
    }
    localStorage.setItem("zaeem_menu", JSON.stringify(menu));
    this.notify("zaeem_menu");
    return dishData;
  }

  deleteMenuItem(id) {
    let menu = this.getMenu();
    menu = menu.filter(i => i.id !== id);
    localStorage.setItem("zaeem_menu", JSON.stringify(menu));
    this.notify("zaeem_menu");
  }

  // ================= CART SYSTEM =================
  getCart() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_cart")) || [];
    } catch {
      return [];
    }
  }

  saveCart(cart) {
    localStorage.setItem("zaeem_cart", JSON.stringify(cart));
    this.notify("zaeem_cart");
  }

  addToCart(item, selectedSize, selectedAddons = [], quantity = 1, specialNotes = "") {
    const cart = this.getCart();
    
    // Calculate single unit price with size and addons
    const basePrice = selectedSize ? selectedSize.price : item.price;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + (addon.price || 0), 0);
    const unitPrice = basePrice + addonsPrice;
    const itemTotal = unitPrice * quantity;

    const cartItem = {
      cartItemId: "cart-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      id: item.id,
      name: item.name,
      image: item.image,
      size: selectedSize ? selectedSize.name : "عادي",
      selectedAddons: selectedAddons,
      specialNotes: specialNotes,
      unitPrice: unitPrice,
      quantity: quantity,
      itemTotal: itemTotal
    };

    cart.push(cartItem);
    this.saveCart(cart);

    if (window.zaeemSound) {
      window.zaeemSound.playAddToCartSound();
    }

    return cartItem;
  }

  updateCartItemQty(index, delta) {
    const cart = this.getCart();
    if (cart[index]) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].itemTotal = cart[index].unitPrice * cart[index].quantity;
      }
      this.saveCart(cart);
    }
  }

  removeCartItem(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this.saveCart(cart);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotals(couponCode = null, useLoyaltyPoints = 0, selectedBranchId = null, fulfillmentType = "delivery") {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
    
    let discount = 0;
    let validCoupon = null;

    if (couponCode) {
      const cleanCode = couponCode.trim().toUpperCase();
      validCoupon = INITIAL_COUPONS.find(c => c.code === cleanCode);
      if (validCoupon && subtotal >= validCoupon.minOrder) {
        discount = (subtotal * validCoupon.discountPercent) / 100;
        if (discount > validCoupon.maxDiscount) {
          discount = validCoupon.maxDiscount;
        }
      }
    }

    // Loyalty points discount
    const settings = this.getSettings();
    let loyaltyDiscount = 0;
    if (useLoyaltyPoints > 0) {
      loyaltyDiscount = useLoyaltyPoints * (settings.loyaltyPointValueInEGP || 0.5);
      if (loyaltyDiscount > (subtotal - discount)) {
        loyaltyDiscount = Math.max(0, subtotal - discount);
      }
    }

    const totalDiscount = discount + loyaltyDiscount;

    // Delivery fee
    let deliveryFee = 0;
    if (fulfillmentType === "delivery") {
      deliveryFee = settings.defaultDeliveryFee || 15;
      if (selectedBranchId) {
        const branch = this.getBranchById(selectedBranchId);
        if (branch && branch.zones && branch.zones.length > 0) {
          deliveryFee = branch.zones[0].fee || deliveryFee;
        }
      }
    }

    const tax = 0; // شامل الضريبة
    const total = Math.max(0, subtotal - totalDiscount + deliveryFee + tax);

    return {
      subtotal,
      discount,
      loyaltyDiscount,
      totalDiscount,
      deliveryFee,
      tax,
      total,
      validCoupon,
      itemsCount: this.getCartCount()
    };
  }

  // ================= BRANCHES =================
  getBranches() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_branches")) || INITIAL_BRANCHES;
    } catch {
      return INITIAL_BRANCHES;
    }
  }

  getBranchById(id) {
    const branches = this.getBranches();
    return branches.find(b => b.id === id) || branches[0];
  }

  getSelectedBranch() {
    const branchId = localStorage.getItem("zaeem_selected_branch") || "branch-downtown";
    return this.getBranchById(branchId);
  }

  setSelectedBranch(branchId) {
    localStorage.setItem("zaeem_selected_branch", branchId);
    this.notify("zaeem_selected_branch");
  }

  saveBranch(branchData) {
    const branches = this.getBranches();
    const index = branches.findIndex(b => b.id === branchData.id);
    if (index >= 0) {
      branches[index] = { ...branches[index], ...branchData };
    } else {
      branchData.id = "branch-" + Date.now();
      branches.push(branchData);
    }
    localStorage.setItem("zaeem_branches", JSON.stringify(branches));
    this.notify("zaeem_branches");
    return branchData;
  }

  // ================= ORDERS =================
  getOrders() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_orders")) || INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id || o.id === "#" + id);
  }

  placeOrder(orderData) {
    const orders = this.getOrders();
    const orderId = "ZAEEM-" + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail || "",
      fulfillmentType: orderData.fulfillmentType || "delivery",
      branchId: orderData.branchId,
      branchName: orderData.branchName,
      address: orderData.address || null,
      paymentMethod: orderData.paymentMethod || "cash",
      paymentStatus: orderData.paymentMethod === "card" ? "paid" : (orderData.paymentStatus || "pending"),
      orderStatus: "received", // received -> preparing -> ready -> delivering -> delivered
      items: orderData.items || this.getCart(),
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      couponCode: orderData.couponCode || null,
      deliveryFee: orderData.deliveryFee || 0,
      tax: orderData.tax || 0,
      total: orderData.total,
      earnedPoints: Math.floor(orderData.total * 0.1),
      pilot: orderData.fulfillmentType === "delivery" ? {
        name: "كابتن إبراهيم الزعيم",
        phone: "01123456789",
        vehicle: "سكوتر توصيل سريع",
        rating: 4.9,
        estimatedArrivalMinutes: 30
      } : null
    };

    orders.unshift(newOrder);
    localStorage.setItem("zaeem_orders", JSON.stringify(orders));

    // Clear cart
    this.clearCart();

    // Reward Loyalty points
    this.recordCustomerOrder(newOrder);

    // Play sounds
    if (window.zaeemSound) {
      window.zaeemSound.playOrderSuccessSound();
      window.zaeemSound.playNewOrderAlert();
    }

    this.notify("zaeem_orders");
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.orderStatus = newStatus;
      if (newStatus === "delivered") {
        order.paymentStatus = "paid";
      }
      localStorage.setItem("zaeem_orders", JSON.stringify(orders));
      this.notify("zaeem_orders");
    }
    return order;
  }

  // ================= CUSTOMERS & LOYALTY =================
  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_customers")) || INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  }

  recordCustomerOrder(order) {
    const customers = this.getCustomers();
    let customer = customers.find(c => c.phone === order.customerPhone);
    const pointsToAdd = Math.floor(order.total * 0.1);

    if (customer) {
      customer.ordersCount += 1;
      customer.totalSpent += order.total;
      customer.loyaltyPoints += pointsToAdd;
      customer.lastOrderAt = "الآن";

      // Tier check
      if (customer.totalSpent > 3000) customer.tier = "VIP الزعيم 👑";
      else if (customer.totalSpent > 1500) customer.tier = "ذهبي 🥇";
      else if (customer.totalSpent > 800) customer.tier = "فضي 🥈";
      else customer.tier = "برونزي 🥉";
    } else {
      customer = {
        id: "cust-" + Date.now(),
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail || "",
        ordersCount: 1,
        totalSpent: order.total,
        loyaltyPoints: pointsToAdd,
        tier: "برونزي 🥉",
        registeredAt: new Date().toISOString().split("T")[0],
        lastOrderAt: "الآن"
      };
      customers.unshift(customer);
    }

    localStorage.setItem("zaeem_customers", JSON.stringify(customers));
    this.notify("zaeem_customers");
  }

  // ================= RESERVATIONS =================
  getReservations() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_reservations")) || INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  }

  addReservation(data) {
    const reservations = this.getReservations();
    const resId = "RES-" + Math.floor(100 + Math.random() * 900);
    const newRes = {
      id: resId,
      customerName: data.customerName,
      phone: data.phone,
      branchId: data.branchId,
      branchName: data.branchName,
      date: data.date,
      time: data.time,
      guests: parseInt(data.guests) || 2,
      zoneType: data.zoneType || "صالة عائلات",
      occasion: data.occasion || "عام",
      status: "confirmed",
      createdAt: new Date().toISOString()
    };
    reservations.unshift(newRes);
    localStorage.setItem("zaeem_reservations", JSON.stringify(reservations));
    this.notify("zaeem_reservations");
    return newRes;
  }

  updateReservationStatus(resId, status) {
    const reservations = this.getReservations();
    const res = reservations.find(r => r.id === resId);
    if (res) {
      res.status = status;
      localStorage.setItem("zaeem_reservations", JSON.stringify(reservations));
      this.notify("zaeem_reservations");
    }
    return res;
  }

  // ================= CAREERS =================
  getApplications() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_applications")) || [];
    } catch {
      return [];
    }
  }

  submitApplication(data) {
    const apps = this.getApplications();
    const newApp = {
      id: "APP-" + Date.now(),
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      governorate: data.governorate,
      experienceYears: data.experienceYears,
      previousWork: data.previousWork,
      notes: data.notes,
      submittedAt: new Date().toISOString(),
      status: "under_review"
    };
    apps.unshift(newApp);
    localStorage.setItem("zaeem_applications", JSON.stringify(apps));
    this.notify("zaeem_applications");
    return newApp;
  }

  // ================= AUTH / STAFF =================
  getStaff() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_staff")) || INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_current_user")) || INITIAL_STAFF[0];
    } catch {
      return INITIAL_STAFF[0];
    }
  }

  setCurrentUser(user) {
    localStorage.setItem("zaeem_current_user", JSON.stringify(user));
    this.notify("zaeem_current_user");
  }

  loginStaff(email, pin) {
    const staff = this.getStaff();
    const user = staff.find(s => s.email.toLowerCase() === email.toLowerCase().trim() && s.pin === pin.trim());
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "البريد الإلكتروني أو رمز PIN غير صحيح" };
  }

  demoLogin(role) {
    const staff = this.getStaff();
    const user = staff.find(s => s.role === role) || staff[0];
    this.setCurrentUser(user);
    return user;
  }

  logoutStaff() {
    localStorage.removeItem("zaeem_current_user");
    this.notify("zaeem_current_user");
  }

  // ================= SETTINGS =================
  getSettings() {
    try {
      return JSON.parse(localStorage.getItem("zaeem_settings")) || RESTAURANT_SETTINGS;
    } catch {
      return RESTAURANT_SETTINGS;
    }
  }

  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem("zaeem_settings", JSON.stringify(updated));
    this.notify("zaeem_settings");
    return updated;
  }

  // ================= EXPORT TOOLS =================
  exportOrdersToCSV() {
    const orders = this.getOrders();
    if (!orders || orders.length === 0) return;

    let csvContent = "\uFEFFرقم الطلب,التاريخ,اسم العميل,الهاتف,الفرع,نوع الطلب,طريقة الدفع,حالة الطلب,المجموع الفرعي,الخصم,التوصيل,الإجمالي\n";

    orders.forEach(o => {
      const isDel = o.fulfillmentType === "delivery" ? "توصيل" : "استلام";
      const pay = o.paymentMethod;
      csvContent += `"${o.id}","${o.createdAt.split('T')[0]}","${o.customerName}","${o.customerPhone}","${o.branchName}","${isDel}","${pay}","${o.orderStatus}","${o.subtotal}","${o.discount}","${o.deliveryFee}","${o.total}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `تقرير_طلبات_كشري_الزعيم_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.zaeemStore = new ZaeemStore();
