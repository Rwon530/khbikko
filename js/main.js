/**
 * كشري الزعيم - وظائف الواجهة العامة والنافبار والسلة
 * Global UI Helpers, Mini-Cart Drawer, Dish Customizer Modal, Toasts
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMiniCart();
  initBranchModal();
  initCustomizerModal();
  updateCartBadge();
  checkPWA();

  // Listen to store changes
  if (window.zaeemStore) {
    window.zaeemStore.subscribe((key) => {
      if (key === "zaeem_cart") {
        updateCartBadge();
        renderMiniCartItems();
      }
      if (key === "zaeem_selected_branch") {
        updateHeaderBranchName();
      }
    });
  }
});

// Toast notification helper
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  const toast = document.createElement("div");
  toast.className = `toast-item ${type}`;
  toast.innerHTML = `
    <span style="font-size: 20px;">${icons[type] || '✨'}</span>
    <div style="flex: 1; font-size: 14px; font-weight: 600;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-100%)";
    toast.style.transition = "all 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mobile Navbar and Header Logic
function initNavbar() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Update branch name in header
  updateHeaderBranchName();
}

function updateHeaderBranchName() {
  const branchEl = document.getElementById("current-branch-label");
  if (branchEl && window.zaeemStore) {
    const branch = window.zaeemStore.getSelectedBranch();
    branchEl.textContent = branch ? branch.name : "اختر الفرع";
  }
}

// Mini Cart Drawer System
function initMiniCart() {
  const cartButtons = document.querySelectorAll(".open-cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const backdrop = document.getElementById("cart-backdrop");

  cartButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openMiniCart();
    });
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeMiniCart);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMiniCart);
  }
}

function openMiniCart() {
  const cartDrawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (cartDrawer && backdrop) {
    renderMiniCartItems();
    cartDrawer.classList.add("open");
    backdrop.classList.add("open");
    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeMiniCart() {
  const cartDrawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (cartDrawer && backdrop) {
    cartDrawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!backdrop.classList.contains("open")) {
        backdrop.classList.add("hidden");
      }
    }, 300);
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count-badge");
  const count = window.zaeemStore ? window.zaeemStore.getCartCount() : 0;
  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) {
      b.classList.remove("scale-0");
      b.classList.add("scale-100");
    } else {
      b.classList.add("scale-0");
    }
  });
}

function renderMiniCartItems() {
  const listEl = document.getElementById("cart-items-list");
  const totalEl = document.getElementById("cart-drawer-total");
  const emptyEl = document.getElementById("cart-empty-state");
  const footerEl = document.getElementById("cart-drawer-footer");

  if (!listEl) return;

  const cart = window.zaeemStore.getCart();
  const totals = window.zaeemStore.getCartTotals();

  if (cart.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (footerEl) footerEl.classList.add("hidden");
    return;
  }

  if (emptyEl) emptyEl.classList.add("hidden");
  if (footerEl) footerEl.classList.remove("hidden");

  listEl.innerHTML = cart.map((item, index) => {
    const addonsBadge = item.selectedAddons && item.selectedAddons.length > 0
      ? `<div class="text-xs text-amber-700 font-medium mt-1">+ ${item.selectedAddons.map(a => a.name).join(', ')}</div>`
      : '';

    return `
      <div class="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/70 relative transition hover:bg-amber-50">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shadow-sm border border-amber-200" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-zinc-900 truncate">${item.name}</h4>
          <span class="inline-block text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold mt-0.5">الحجم: ${item.size}</span>
          ${addonsBadge}
          <div class="text-sm font-extrabold text-red-700 mt-1">${item.itemTotal.toFixed(2)} ج.م</div>
        </div>
        <!-- Quantity Controls -->
        <div class="flex flex-col items-center gap-1 bg-white border border-stone-200 rounded-lg p-1">
          <button onclick="window.zaeemStore.updateCartItemQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-red-700 hover:bg-red-50 rounded font-bold transition">+</button>
          <span class="text-xs font-bold text-zinc-800">${item.quantity}</span>
          <button onclick="window.zaeemStore.updateCartItemQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 rounded font-bold transition">-</button>
        </div>
        <!-- Remove Button -->
        <button onclick="window.zaeemStore.removeCartItem(${index})" class="text-zinc-400 hover:text-red-600 transition p-1" title="حذف">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    `;
  }).join("");

  if (totalEl) {
    totalEl.textContent = totals.subtotal.toFixed(2) + " ج.م";
  }
}

// Branch Selector Modal
function initBranchModal() {
  const branchModal = document.getElementById("branch-modal");
  const openButtons = document.querySelectorAll(".open-branch-modal-btn");
  const closeBtn = document.getElementById("close-branch-modal");
  const branchList = document.getElementById("branch-modal-list");

  if (!branchModal) return;

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      renderBranchModalList();
      branchModal.classList.remove("hidden");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      branchModal.classList.add("hidden");
    });
  }

  branchModal.addEventListener("click", (e) => {
    if (e.target === branchModal) {
      branchModal.classList.add("hidden");
    }
  });
}

function renderBranchModalList() {
  const listEl = document.getElementById("branch-modal-list");
  if (!listEl || !window.zaeemStore) return;

  const branches = window.zaeemStore.getBranches();
  const currentBranch = window.zaeemStore.getSelectedBranch();

  listEl.innerHTML = branches.map(b => {
    const isSelected = currentBranch && currentBranch.id === b.id;
    return `
      <div onclick="selectBranch('${b.id}')" class="p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${isSelected ? 'border-amber-600 bg-amber-50/70 shadow-sm' : 'border-stone-200 hover:border-amber-400 bg-white'}">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-zinc-900 text-base">${b.name}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-800">مفتوح الآن 🟢</span>
          </div>
          <p class="text-xs text-stone-600">${b.address}</p>
          <div class="text-xs text-amber-800 font-semibold flex items-center gap-2">
            <span>📞 ${b.phone}</span>
            <span>•</span>
            <span>🕒 ${b.hours}</span>
          </div>
        </div>
        <div>
          ${isSelected 
            ? '<span class="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">✓</span>' 
            : '<button class="text-xs bg-stone-100 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded-lg font-bold transition">اختيار</button>'
          }
        </div>
      </div>
    `;
  }).join("");
}

function selectBranch(branchId) {
  if (window.zaeemStore) {
    window.zaeemStore.setSelectedBranch(branchId);
    showToast("تم تغيير الفرع بنجاح إلى: " + window.zaeemStore.getSelectedBranch().name, "info");
    const branchModal = document.getElementById("branch-modal");
    if (branchModal) branchModal.classList.add("hidden");
  }
}

// Dish Customizer Modal (Size, Addons, Notes)
let currentCustomizingDish = null;
let currentCustomizingSize = null;
let currentCustomizingAddons = [];
let currentCustomizingQuantity = 1;

function initCustomizerModal() {
  const modal = document.getElementById("dish-customizer-modal");
  const closeBtn = document.getElementById("close-customizer-modal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }
}

function openDishCustomizer(dishId) {
  const dish = window.zaeemStore.getMenuItemById(dishId);
  if (!dish) return;

  if (!dish.inStock) {
    showToast("عفواً، هذا الصنف نفذ مؤقتاً من المخزون", "warning");
    return;
  }

  currentCustomizingDish = dish;
  currentCustomizingSize = dish.sizes && dish.sizes.length > 0 ? dish.sizes[0] : { name: "عادي", price: dish.price };
  currentCustomizingAddons = [];
  currentCustomizingQuantity = 1;

  const modal = document.getElementById("dish-customizer-modal");
  if (!modal) return;

  // Render elements inside modal
  document.getElementById("customizer-dish-image").src = dish.image;
  document.getElementById("customizer-dish-name").textContent = dish.name;
  document.getElementById("customizer-dish-desc").textContent = dish.desc;
  
  // Render Sizes
  const sizesContainer = document.getElementById("customizer-sizes-container");
  if (sizesContainer) {
    if (dish.sizes && dish.sizes.length > 0) {
      sizesContainer.innerHTML = dish.sizes.map((s, idx) => `
        <label class="flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition size-option-label ${idx === 0 ? 'border-amber-600 bg-amber-50' : 'border-stone-200 bg-white hover:border-amber-300'}">
          <div class="flex items-center gap-3">
            <input type="radio" name="customizer-size" value="${idx}" ${idx === 0 ? 'checked' : ''} onchange="onSizeSelected(${idx})" class="w-4 h-4 text-red-600 focus:ring-red-500" />
            <span class="font-bold text-zinc-900 text-sm">${s.name}</span>
          </div>
          <span class="font-extrabold text-red-700 text-sm">${s.price} ج.م</span>
        </label>
      `).join("");
      sizesContainer.parentElement.classList.remove("hidden");
    } else {
      sizesContainer.parentElement.classList.add("hidden");
    }
  }

  // Render Addons
  const addonsContainer = document.getElementById("customizer-addons-container");
  if (addonsContainer) {
    if (dish.addons && dish.addons.length > 0) {
      addonsContainer.innerHTML = dish.addons.map(addonId => {
        const addon = INITIAL_ADDONS_DICT[addonId];
        if (!addon) return '';
        return `
          <label class="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 cursor-pointer transition">
            <div class="flex items-center gap-2">
              <input type="checkbox" value="${addon.id}" onchange="toggleAddonSelected('${addon.id}')" class="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
              <span class="text-xs font-bold text-zinc-800">${addon.name}</span>
            </div>
            <span class="text-xs font-extrabold text-amber-800">+${addon.price} ج.م</span>
          </label>
        `;
      }).join("");
      addonsContainer.parentElement.classList.remove("hidden");
    } else {
      addonsContainer.parentElement.classList.add("hidden");
    }
  }

  // Reset notes and quantity
  const notesInput = document.getElementById("customizer-special-notes");
  if (notesInput) notesInput.value = "";

  document.getElementById("customizer-qty").textContent = "1";
  updateCustomizerTotalPrice();

  modal.classList.remove("hidden");
}

function onSizeSelected(index) {
  if (currentCustomizingDish && currentCustomizingDish.sizes) {
    currentCustomizingSize = currentCustomizingDish.sizes[index];
    
    // Update active classes
    const labels = document.querySelectorAll(".size-option-label");
    labels.forEach((lbl, idx) => {
      if (idx === index) {
        lbl.classList.add("border-amber-600", "bg-amber-50");
        lbl.classList.remove("border-stone-200", "bg-white");
      } else {
        lbl.classList.remove("border-amber-600", "bg-amber-50");
        lbl.classList.add("border-stone-200", "bg-white");
      }
    });

    updateCustomizerTotalPrice();
  }
}

function toggleAddonSelected(addonId) {
  const addon = INITIAL_ADDONS_DICT[addonId];
  if (!addon) return;

  const idx = currentCustomizingAddons.findIndex(a => a.id === addonId);
  if (idx >= 0) {
    currentCustomizingAddons.splice(idx, 1);
  } else {
    currentCustomizingAddons.push(addon);
  }

  updateCustomizerTotalPrice();
}

function changeCustomizerQty(delta) {
  currentCustomizingQuantity = Math.max(1, currentCustomizingQuantity + delta);
  document.getElementById("customizer-qty").textContent = currentCustomizingQuantity;
  updateCustomizerTotalPrice();
}

function updateCustomizerTotalPrice() {
  if (!currentCustomizingDish) return;
  const basePrice = currentCustomizingSize ? currentCustomizingSize.price : currentCustomizingDish.price;
  const addonsPrice = currentCustomizingAddons.reduce((sum, a) => sum + a.price, 0);
  const singlePrice = basePrice + addonsPrice;
  const total = singlePrice * currentCustomizingQuantity;

  const totalEl = document.getElementById("customizer-total-price");
  if (totalEl) totalEl.textContent = total.toFixed(2) + " ج.م";
}

function submitDishToCart() {
  if (!currentCustomizingDish) return;
  const notes = document.getElementById("customizer-special-notes") ? document.getElementById("customizer-special-notes").value : "";

  window.zaeemStore.addToCart(
    currentCustomizingDish,
    currentCustomizingSize,
    currentCustomizingAddons,
    currentCustomizingQuantity,
    notes
  );

  showToast(`تمت إضافة "${currentCustomizingDish.name}" إلى السلة بنجاح! 🍲`, "success");

  const modal = document.getElementById("dish-customizer-modal");
  if (modal) modal.classList.add("hidden");

  // Open mini-cart for convenient preview
  setTimeout(openMiniCart, 200);
}

// PWA Installer Check
let deferredPrompt = null;
function checkPWA() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const pwaBtn = document.getElementById("pwa-install-btn");
    if (pwaBtn) pwaBtn.classList.remove("hidden");
  });

  const pwaBtn = document.getElementById("pwa-install-btn");
  if (pwaBtn) {
    pwaBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          showToast("تم تثبيت تطبيق كشري الزعيم بنجاح! 📱", "success");
        }
        deferredPrompt = null;
        pwaBtn.classList.add("hidden");
      } else {
        showToast("يمكنك إضافة الموقع للشاشة الرئيسية من قائمة متصفحك 📲", "info");
      }
    });
  }

  // Register service worker if supported
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // SW optional in local dev
      });
    });
  }
}
