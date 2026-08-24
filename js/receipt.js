/**
 * كشري الزعيم - مولد الفواتير وبونات الكاشير الحرارية
 * POS Thermal Receipt Generator (80mm)
 */

const ReceiptPrinter = {
  generateHTML(order, settings = RESTAURANT_SETTINGS) {
    if (!order) return "<p>لا يوجد طلب محدد</p>";

    const dateStr = new Date(order.createdAt).toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const isDelivery = order.fulfillmentType === "delivery";
    const paymentArabic = {
      cash: "دفع كاش عند الاستلام",
      vodafone_cash: "محفظة إلكترونية (فودافون كاش)",
      card: "بطاقة ائتمانية (فيزا / ماستر)"
    }[order.paymentMethod] || order.paymentMethod;

    let itemsHtml = order.items.map((item, i) => {
      const addonsText = item.selectedAddons && item.selectedAddons.length > 0
        ? `<div style="font-size: 11px; color: #4b5563; padding-right: 8px;">+ ${item.selectedAddons.map(a => `${a.name} (${a.price} ج)`).join(' + ')}</div>`
        : '';

      return `
        <tr>
          <td style="padding: 4px 0; font-weight: bold; width: 45%;">
            ${item.name}
            <div style="font-size: 10px; font-weight: normal; color: #6b7280;">[${item.size || 'عادي'}]</div>
            ${addonsText}
          </td>
          <td style="padding: 4px 0; text-align: center; width: 15%;">${item.quantity}</td>
          <td style="padding: 4px 0; text-align: left; width: 20%;">${item.unitPrice} ج</td>
          <td style="padding: 4px 0; text-align: left; font-weight: bold; width: 20%;">${item.itemTotal || (item.unitPrice * item.quantity)} ج</td>
        </tr>
      `;
    }).join("");

    return `
      <div id="thermal-receipt" class="receipt-preview text-right" dir="rtl">
        <!-- Receipt Header -->
        <div style="text-align: center; margin-bottom: 8px;">
          <h2 style="font-size: 20px; font-weight: 900; margin: 0; color: #111827;">👑 كشري الزعيم 👑</h2>
          <p style="font-size: 11px; margin: 2px 0; color: #4b5563;">${settings.slogan || 'أصل الكشري المصري الأصيل'}</p>
          <p style="font-size: 12px; font-weight: bold; margin: 2px 0;">${order.branchName || 'الفرع الرئيسي'}</p>
          <p style="font-size: 11px; margin: 1px 0;">الخط الساخن: <strong dir="ltr">${settings.hotline}</strong></p>
        </div>

        <div class="receipt-double-divider"></div>

        <!-- Order Meta Info -->
        <div style="font-size: 12px; line-height: 1.5;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>رقم الطلب:</span>
            <span style="font-family: monospace; font-size: 14px;">#${order.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>التاريخ والوقت:</span>
            <span>${dateStr}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>نوع الطلب:</span>
            <span style="font-weight: bold; color: ${isDelivery ? '#1e40af' : '#15803d'};">
              ${isDelivery ? '🛵 توصيل منزلي (Delivery)' : '🏪 استلام من الفرع (Pickup)'}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>طريقة الدفع:</span>
            <span>${paymentArabic} (${order.paymentStatus === 'paid' ? 'مدفوع ✅' : 'تحصيل كاش'})</span>
          </div>
        </div>

        <div class="receipt-divider"></div>

        <!-- Customer Details -->
        <div style="font-size: 12px; line-height: 1.4; background: #f9fafb; padding: 6px; border-radius: 4px;">
          <div><strong>العميل:</strong> ${order.customerName}</div>
          <div><strong>الهاتف:</strong> <span dir="ltr">${order.customerPhone}</span></div>
          ${isDelivery && order.address ? `
            <div><strong>العنوان:</strong> ${order.address.area} - ${order.address.street}</div>
            <div><strong>عمارة:</strong> ${order.address.building} | <strong>دور:</strong> ${order.address.floor} | <strong>شقة:</strong> ${order.address.apartment}</div>
            ${order.address.notes ? `<div style="font-size: 10px; color: #b91c1c;"><strong>ملاحظات:</strong> ${order.address.notes}</div>` : ''}
          ` : '<div style="color: #059669; font-weight: bold;">استلام العميل شخصياً من صالة المطعم</div>'}
        </div>

        <div class="receipt-divider"></div>

        <!-- Items Table -->
        <table style="width: 100%; font-size: 11px; border-collapse: collapse; margin-top: 4px;">
          <thead>
            <tr style="border-bottom: 1px solid #111827; text-align: right;">
              <th style="padding-bottom: 4px;">الصنف</th>
              <th style="padding-bottom: 4px; text-align: center;">العدد</th>
              <th style="padding-bottom: 4px; text-align: left;">السعر</th>
              <th style="padding-bottom: 4px; text-align: left;">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="receipt-divider"></div>

        <!-- Totals Summary -->
        <div style="font-size: 12px; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between;">
            <span>المجموع الفرعي:</span>
            <span>${order.subtotal.toFixed(2)} ج.م</span>
          </div>
          ${order.discount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: #b91c1c;">
              <span>الخصم (${order.couponCode || 'عرض'}):</span>
              <span>- ${order.discount.toFixed(2)} ج.م</span>
            </div>
          ` : ''}
          ${isDelivery ? `
            <div style="display: flex; justify-content: space-between;">
              <span>خدمة التوصيل:</span>
              <span>${(order.deliveryFee || 0).toFixed(2)} ج.م</span>
            </div>
          ` : ''}
          <div class="receipt-double-divider"></div>
          <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 900; color: #111827;">
            <span>المبلغ الإجمالي المطلوب:</span>
            <span style="font-size: 17px; background: #fef08a; padding: 0 4px; border-radius: 2px;">
              ${order.total.toFixed(2)} ج.م
            </span>
          </div>
        </div>

        <div class="receipt-divider"></div>

        <!-- Barcode and Footer -->
        <div style="text-align: center; margin-top: 8px;">
          <div style="letter-spacing: 4px; font-family: monospace; font-size: 18px; font-weight: bold; margin: 4px 0;">
            ||| | |||| || ||||| ||| ||
          </div>
          <p style="font-size: 11px; margin: 4px 0; font-weight: bold;">بالهناء والشفاء من كشري الزعيم ❤️</p>
          <p style="font-size: 10px; color: #6b7280; margin: 0;">شكراً لثقتكم بنا - نسعد بخدمتكم دائماً</p>
          <p style="font-size: 9px; color: #9ca3af; margin-top: 4px;">www.koshary-elzaeem.com</p>
        </div>
      </div>
    `;
  },

  print(order) {
    const html = this.generateHTML(order);
    const printContainer = document.getElementById("print-modal-content");
    if (printContainer) {
      printContainer.innerHTML = html;
      const modal = document.getElementById("print-modal");
      if (modal) modal.classList.remove("hidden");
    }
    
    // Auto trigger print
    setTimeout(() => {
      window.print();
    }, 300);
  }
};

window.ReceiptPrinter = ReceiptPrinter;
