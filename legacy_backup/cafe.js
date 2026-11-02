/* ============================================================
   Sunset Chill Café — cafe.js
   Static-only, no framework, no build step.
   ============================================================ */

const CART_KEY     = "sunset-chill-cart";
const BOOKING_KEY  = "sunset-chill-booking";
const PREORDER_KEY = "sunset-chill-preorder";

const OPEN_TIME  = "07:00";
const CLOSE_TIME = "22:00";

/* ---------- helpers ---------- */
const money = (n) => n.toLocaleString("vi-VN") + "đ";
const $      = (sel, root = document) => root.querySelector(sel);
const $$     = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- cart persistence ---------- */
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- toast ---------- */
function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-show"), 2200);
}

/* ---------- cart math ---------- */
function cartQty(cart)  { return cart.reduce((s, i) => s + i.qty, 0); }
function cartSum(cart)  { return cart.reduce((s, i) => s + i.qty * i.price, 0); }


/* ---------- booking persistence & management ---------- */
function loadBooking() {
  try {
    const rawPreorder = localStorage.getItem(PREORDER_KEY);
    if (rawPreorder) {
      const p = JSON.parse(rawPreorder);
      if (p && p.booking) {
        return {
          ...p.booking,
          items: p.items || [],
          total: p.total || 0,
          createdAt: p.createdAt
        };
      }
    }
    const rawBooking = localStorage.getItem(BOOKING_KEY);
    if (rawBooking) {
      const b = JSON.parse(rawBooking);
      if (b && b.name) return b;
    }
    return null;
  } catch {
    return null;
  }
}

function cancelBooking() {
  localStorage.removeItem(BOOKING_KEY);
  localStorage.removeItem(PREORDER_KEY);
  renderBooking();
  renderCart();
  toast("Đã hủy thông tin đặt bàn");
}

/* ---------- drawer tabs & panel rendering ---------- */
function switchDrawerTab(tabName) {
  const tabCart     = $("#tab-cart");
  const tabBooking  = $("#tab-booking");
  const paneCart    = $("#pane-cart");
  const paneBooking = $("#pane-booking");

  const isCart = tabName === "cart";

  if (tabCart) {
    tabCart.classList.toggle("is-active", isCart);
    tabCart.setAttribute("aria-selected", String(isCart));
  }
  if (tabBooking) {
    tabBooking.classList.toggle("is-active", !isCart);
    tabBooking.setAttribute("aria-selected", String(!isCart));
  }
  if (paneCart)    paneCart.hidden = !isCart;
  if (paneBooking) paneBooking.hidden = isCart;
}

function renderBooking() {
  const b = loadBooking();

  // 1. Header & Tab Badges
  const headerCount = $("#booking-count");
  if (headerCount) {
    headerCount.textContent = b ? "1" : "0";
    headerCount.classList.toggle("is-active", Boolean(b));
  }
  const tabBadge = $("#booking-tab-count");
  if (tabBadge) {
    tabBadge.textContent = b ? "1" : "0";
  }

  // 2. Render inside Drawer Pane
  const contentEl = $("#booking-content");
  if (contentEl) {
    if (!b) {
      contentEl.innerHTML = `
        <div class="booking-empty">
          <div class="booking-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h3 class="booking-empty-title">Chưa có bàn đặt</h3>
          <p class="booking-empty-desc">
            Bạn chưa có lịch hẹn đặt bàn nào được lưu trên thiết bị này.
          </p>
          <div class="booking-empty-sub">
            💡 <strong>Mẹo hay:</strong> Bạn có thể chọn món tại trang Menu rồi bấm <em>"Đặt bàn & Đặt trước món"</em> — khi tới quán là mọi thứ đã chuẩn bị sẵn sàng!
          </div>
          <div class="booking-empty-actions">
            <a href="dat-ban.html" class="btn btn-sm" id="btn-empty-book">Đi đến trang đặt bàn →</a>
          </div>
        </div>
      `;
    } else {
      const hasPreorder = b.items && b.items.length > 0;
      contentEl.innerHTML = `
        <div class="booking-card-detail">
          <div class="booking-status-tag">
            <span class="status-pulse-dot" aria-hidden="true"></span>
            <span>Đã xác nhận · Quán sẵn sàng đón bạn</span>
          </div>

          <div class="booking-primary-info">
            <h3 class="b-name">${b.name}</h3>
            <span class="b-guests-pill">${b.guests} khách</span>
          </div>

          <div class="booking-info-grid">
            <div class="b-grid-row">
              <span class="b-label">📞 Điện thoại:</span>
              <strong class="b-val"><a href="tel:${b.phone}">${b.phone}</a></strong>
            </div>
            <div class="b-grid-row">
              <span class="b-label">📅 Ngày đến:</span>
              <strong class="b-val">${b.date}</strong>
            </div>
            <div class="b-grid-row">
              <span class="b-label">⏰ Giờ hẹn:</span>
              <strong class="b-val">${b.time}</strong>
            </div>
            ${b.note ? `
            <div class="b-grid-row b-note-row">
              <span class="b-label">📝 Ghi chú:</span>
              <span class="b-val">${b.note}</span>
            </div>` : ""}
          </div>

          ${hasPreorder ? `
          <div class="b-preorder-section">
            <div class="b-preorder-header">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Món đã đặt trước (${b.items.length}):</span>
            </div>
            <ul class="b-preorder-items">
              ${b.items.map(i => `
                <li>
                  <span class="b-item-name">${i.name} <strong>x${i.qty}</strong></span>
                  <span class="b-item-price">${money(i.qty * i.price)}</span>
                </li>
              `).join("")}
            </ul>
            <div class="b-preorder-sum">
              <span>Tổng tiền đồ uống:</span>
              <strong>${money(b.total)}</strong>
            </div>
          </div>` : ""}

          <div class="booking-storage-callout">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <div>
              <strong>Lưu trên thiết bị này:</strong> Khi đến quán Sunset Chill, chỉ cần báo tên <em>"${b.name}"</em> hoặc SĐT <em>"${b.phone}"</em>, nhân viên đã giữ bàn và đồ uống sẵn sàng.
            </div>
          </div>

          <div class="booking-card-actions">
            <button type="button" class="btn btn-ghost b-cancel-btn" id="btn-cancel-booking">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Hủy lịch đặt bàn này
            </button>
          </div>
        </div>
      `;
    }
  }

  // 3. Render banner on #dat-ban sections if on page
  const bannerEl = $("#active-booking-banner");
  if (bannerEl) {
    if (!b) {
      bannerEl.hidden = true;
      bannerEl.innerHTML = "";
    } else {
      bannerEl.hidden = false;
      bannerEl.innerHTML = `
        <div class="booking-banner-card">
          <div class="b-banner-left">
            <span class="b-banner-pill">🟢 Bàn bạn đã đặt trước</span>
            <h4>${b.name} · ${b.guests} khách</h4>
            <p>Hẹn lúc <strong>${b.time}</strong> ngày <strong>${b.date}</strong> (SĐT: <a href="tel:${b.phone}">${b.phone}</a>)</p>
          </div>
          <div class="b-banner-right">
            <button type="button" class="btn btn-sm btn-outline" id="btn-banner-view">Xem chi tiết bàn &amp; món</button>
            <button type="button" class="btn btn-sm btn-ghost" id="btn-banner-cancel">Hủy bàn</button>
          </div>
        </div>
      `;
    }
  }
}

/* ---------- render cart drawer ---------- */
function renderCart() {
  const countEl = $("#cart-count");
  const list    = $("#cart-items");
  const totalEl = $("#cart-total");
  if (!countEl || !list || !totalEl) return;

  const cart = loadCart();
  countEl.textContent = cartQty(cart);
  if (!cart.length) {
    list.innerHTML = `<li class="empty-cart">Giỏ còn trống. Thêm món nổi bật phía trên nhé.</li>`;
    totalEl.textContent = money(0);
    return;
  }
  list.innerHTML = cart.map(i => `
    <li>
      <div>
        <strong>${i.name}</strong>
        <div class="cart-item-qty">
          <button type="button" data-dec="${i.id}" aria-label="Giảm">−</button>
          <span>${i.qty}</span>
          <button type="button" data-inc="${i.id}" aria-label="Tăng">+</button>
        </div>
      </div>
      <span>${money(i.qty * i.price)}</span>
    </li>
  `).join("");
  totalEl.textContent = money(cartSum(cart));
}

/* ---------- add to cart ---------- */
function addToCart(btn) {
  const id      = btn.dataset.add;
  const product = {
    id,
    name:  btn.dataset.name,
    price: Number(btn.dataset.price),
  };
  if (!id || !product.name || !product.price) return;

  const cart  = loadCart();
  const found = cart.find(i => i.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart(cart);
  renderCart();
  toast(`Đã thêm ${product.name}`);
}

/* ---------- change qty ---------- */
function changeQty(id, delta) {
  let cart = loadCart();
  cart = cart.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
             .filter(i => i.qty > 0);
  saveCart(cart);
  renderCart();
}

/* ---------- nav open state ---------- */
function isNavOpen() {
  const nav = $("#main-nav");
  return nav ? nav.classList.contains("is-open") : false;
}

/* ---------- cart drawer ---------- */
function setCartOpen(open, initialTab = "cart") {
  const drawer  = $("#cart-drawer");
  const overlay = $("#cart-overlay");
  if (!drawer) return;

  if (open) {
    switchDrawerTab(initialTab);
    renderBooking();
    renderCart();
  }

  if (open && isNavOpen()) {
    const nav    = $("#main-nav");
    const toggle = $(".nav-toggle");
    if (nav)    nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  drawer.classList.toggle("is-open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  if (overlay) overlay.hidden = !open;
  document.body.classList.toggle("no-scroll", open || isNavOpen());

  if (open) {
    const closeBtn = $(".cart-close");
    if (closeBtn) closeBtn.focus();
  } else {
    const cartBtn = $(".cart-btn");
    if (cartBtn) cartBtn.focus();
  }
}

/* ---------- nav & scroll-spy ---------- */
function setupNav() {
  const toggle = $(".nav-toggle");
  const nav    = $("#main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const drawer = $("#cart-drawer");
    if (drawer && drawer.classList.contains("is-open")) setCartOpen(false);
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle(
      "no-scroll",
      open || (drawer ? drawer.classList.contains("is-open") : false),
    );
  });

  $$(".nav-link").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      const drawer = $("#cart-drawer");
      document.body.classList.toggle(
        "no-scroll",
        drawer ? drawer.classList.contains("is-open") : false,
      );
    });
  });

  const links    = $$(".nav-link");
  const sections = links.map(a => {
    const href = a.getAttribute("href");
    return (href && href.startsWith("#") && href.length > 1)
      ? document.querySelector(href)
      : null;
  }).filter(Boolean);

  if (!sections.length) return;

  const onScroll = () => {
    const y = window.scrollY + 130;
    if (sections[0] && y < sections[0].offsetTop) {
      links.forEach(a => a.classList.remove("is-active"));
      return;
    }
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    links.forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("is-active", Boolean(current && href === `#${current.id}`));
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- menu category filter ---------- */
function setupMenuFilter() {
  const filterBtns = $$(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      const f = btn.dataset.filter;
      $$(".danh-muc").forEach(box => {
        box.classList.toggle("is-hidden", f !== "all" && box.dataset.category !== f);
      });
    });
  });
}

/* ---------- booking form (dat-ban.html standalone) ---------- */
function setupBooking() {
  const form = $("#booking-form");
  if (!form) return;

  const dateInput = form.date;
  const now   = new Date();
  const today = toDateStr(now);
  if (dateInput) dateInput.min = today;

  const saved = localStorage.getItem(BOOKING_KEY);
  if (saved) {
    try {
      const b = JSON.parse(saved);
      if (form.name)   form.name.value   = b.name   || "";
      if (form.phone)  form.phone.value  = b.phone  || "";
      if (form.date)   form.date.value   = b.date   || "";
      if (form.time)   form.time.value   = b.time   || "";
      if (form.guests) form.guests.value = b.guests || "2";
      if (form.note)   form.note.value   = b.note   || "";
    } catch { /* ignore */ }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#form-error");
    const ok  = $("#form-success");
    if (err) err.hidden = true;
    if (ok)  ok.hidden  = true;

    const name  = form.name.value.trim();
    const phone = form.phone.value.replace(/[\s.-]/g, "");
    const date  = form.date.value;
    const time  = form.time.value;

    const validationError = validateBookingFields(name, phone, date, time, today);
    if (validationError) {
      if (err) { err.textContent = validationError; err.hidden = false; }
      return;
    }

    const booking = { name, phone, date, time, guests: form.guests.value, note: form.note.value.trim() };
    localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
    renderBooking();
    if (ok) {
      ok.textContent = `Đã lưu chỗ cho ${name} · ${date} lúc ${time} · ${booking.guests} khách. Đưa tên này khi tới quán.`;
      ok.hidden = false;
    }
    toast("Đã lưu đặt bàn trên máy này");
  });
}

/* ---------- shared booking validation ---------- */
function toDateStr(d) {
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dy}`;
}

function validateBookingFields(name, phone, date, time, today) {
  const now = new Date();
  if (name.length < 2)               return "Nhập họ tên (tối thiểu 2 ký tự).";
  if (!/^0[0-9]{9}$/.test(phone))   return "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng số 0.";
  if (!date || date < today)         return "Chọn ngày từ hôm nay trở đi.";
  if (!time)                         return "Chọn giờ đến quán.";
  if (time < OPEN_TIME || time > CLOSE_TIME)
    return `Quán chỉ nhận đặt bàn từ ${OPEN_TIME} đến ${CLOSE_TIME}.`;
  if (date === today) {
    const currentTime = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    if (time <= currentTime)
      return "Giờ đặt bàn hôm nay không thể ở trong quá khứ. Vui lòng chọn giờ sau thời điểm hiện tại.";
  }
  return null;
}

/* ============================================================
   Pre-order + Table Booking Modal
   ============================================================ */

function openPreorderModal() {
  const modal = $("#preorder-modal");
  if (!modal) {
    window.location.href = "index.html";
    return;
  }

  const cart = loadCart();
  if (!cart.length) {
    toast("Giỏ hàng đang trống — thêm món trước nhé!");
    return;
  }

  // Close cart drawer first
  setCartOpen(false);

  // Populate item summary
  const itemsList = $("#po-items-list");
  const totalEl   = $("#po-total");
  if (itemsList) {
    itemsList.innerHTML = cart.map(i => `
      <li class="po-item">
        <span class="po-item-name">${i.name}</span>
        <span class="po-item-meta">x${i.qty}</span>
        <span class="po-item-price">${money(i.qty * i.price)}</span>
      </li>
    `).join("");
  }
  if (totalEl) totalEl.textContent = money(cartSum(cart));

  // Set date min
  const now   = new Date();
  const today = toDateStr(now);
  const dateInput = $("#po-date");
  if (dateInput) dateInput.min = today;

  // Reset form state
  const poForm = $("#po-form");
  if (poForm) poForm.reset();
  const errEl = $("#po-error");
  const okEl  = $("#po-success");
  if (errEl) errEl.hidden = true;
  if (okEl)  { okEl.hidden = true; poForm && (poForm.hidden = false); }

  // Show modal + overlay
  const poOverlay = $("#po-overlay");
  modal.hidden = false;
  modal.removeAttribute("aria-hidden");
  if (poOverlay) { poOverlay.hidden = false; poOverlay.style.opacity = "1"; poOverlay.style.pointerEvents = "auto"; }
  document.body.classList.add("no-scroll");

  // Focus first input
  const firstInput = modal.querySelector("input, button");
  if (firstInput) setTimeout(() => firstInput.focus(), 60);

  // Focus trap
  trapFocus(modal);
}

function closePreorderModal() {
  const modal = $("#preorder-modal");
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  const poOverlay = $("#po-overlay");
  if (poOverlay) { poOverlay.style.opacity = "0"; poOverlay.style.pointerEvents = "none"; setTimeout(() => { poOverlay.hidden = true; }, 260); }
  document.body.classList.remove("no-scroll");
  // Return focus to cart button
  const cartBtn = $(".cart-btn");
  if (cartBtn) cartBtn.focus();
}

function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  modal._trapHandler = (e) => {
    if (e.key !== "Tab") return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };
  modal.addEventListener("keydown", modal._trapHandler);
}

function setupPreorderModal() {
  const modal   = $("#preorder-modal");
  const closeBtn = $("#po-close");
  const overlay  = $("#po-overlay");
  const poForm   = $("#po-form");

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener("click", closePreorderModal);
  if (overlay)  overlay.addEventListener("click", closePreorderModal);
  const closeSuccess = modal.querySelector(".po-close-success");
  if (closeSuccess) closeSuccess.addEventListener("click", closePreorderModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closePreorderModal();
  });

  if (!poForm) return;

  poForm.addEventListener("submit", e => {
    e.preventDefault();
    const now   = new Date();
    const today = toDateStr(now);

    const name  = (poForm.querySelector("#po-name")?.value || "").trim();
    const phone = (poForm.querySelector("#po-phone")?.value || "").replace(/[\s.-]/g, "");
    const date  = poForm.querySelector("#po-date")?.value  || "";
    const time  = poForm.querySelector("#po-time")?.value  || "";
    const guests = poForm.querySelector("#po-guests")?.value || "2";
    const note  = (poForm.querySelector("#po-note")?.value || "").trim();

    const errEl = $("#po-error");
    if (errEl) errEl.hidden = true;

    const validationError = validateBookingFields(name, phone, date, time, today);
    if (validationError) {
      if (errEl) { errEl.textContent = validationError; errEl.hidden = false; }
      return;
    }

    const cart = loadCart();
    const record = {
      booking:   { name, phone, date, time, guests, note },
      items:     cart,
      total:     cartSum(cart),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(PREORDER_KEY, JSON.stringify(record));
    localStorage.setItem(BOOKING_KEY, JSON.stringify(record.booking));
    renderBooking();

    // Show success
    poForm.hidden = true;
    const okEl = $("#po-success");
    if (okEl) {
      const itemLines = cart.map(i => `• ${i.name} x${i.qty} — ${money(i.qty * i.price)}`).join("\n");
      okEl.querySelector("#po-confirm-name").textContent   = name;
      okEl.querySelector("#po-confirm-date").textContent   = date;
      okEl.querySelector("#po-confirm-time").textContent   = time;
      okEl.querySelector("#po-confirm-guests").textContent = guests;
      okEl.querySelector("#po-confirm-items").textContent  = itemLines;
      okEl.querySelector("#po-confirm-total").textContent  = money(cartSum(cart));
      okEl.hidden = false;
    }
    toast("Đặt bàn & món thành công!");
  });
}

/* ============================================================
   DOMContentLoaded — bootstrap everything
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* -- header scroll & back-to-top -- */
  const header = document.querySelector(".site-header");
  const btt    = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 30);
    if (btt)    btt.classList.toggle("is-show", y > 320);
  }, { passive: true });
  if (btt) btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* -- init modules -- */
  renderCart();
  renderBooking();
  setupNav();
  setupMenuFilter();
  setupBooking();
  setupPreorderModal();

  /* -- global click delegation -- */
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) addToCart(add);

    if (e.target.closest("[data-inc]"))
      changeQty(e.target.closest("[data-inc]").dataset.inc, 1);
    if (e.target.closest("[data-dec]"))
      changeQty(e.target.closest("[data-dec]").dataset.dec, -1);
  });

  /* -- Escape key -- */
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const drawer = $("#cart-drawer");
    if (drawer && drawer.classList.contains("is-open")) setCartOpen(false);
    const nav    = $("#main-nav");
    const toggle = $(".nav-toggle");
    if (nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.classList.toggle(
        "no-scroll",
        drawer ? drawer.classList.contains("is-open") : false,
      );
    }
  });

  /* -- booking button in header -- */
  const bookingBtn = $("#booking-btn");
  if (bookingBtn) bookingBtn.addEventListener("click", () => setCartOpen(true, "booking"));

  /* -- cart button -- */
  const cartBtn = $(".cart-btn");
  if (cartBtn) cartBtn.addEventListener("click", () => setCartOpen(true, "cart"));

  /* -- drawer tabs -- */
  const tabCart = $("#tab-cart");
  if (tabCart) tabCart.addEventListener("click", () => switchDrawerTab("cart"));
  const tabBooking = $("#tab-booking");
  if (tabBooking) tabBooking.addEventListener("click", () => switchDrawerTab("booking"));

  /* -- delegate cancel and banner actions -- */
  document.addEventListener("click", e => {
    if (e.target.closest("#btn-cancel-booking") || e.target.closest("#btn-banner-cancel")) {
      cancelBooking();
    }
    if (e.target.closest("#btn-banner-view")) {
      setCartOpen(true, "booking");
    }
  });

  const cartClose = $(".cart-close");
  if (cartClose) cartClose.addEventListener("click", () => setCartOpen(false));

  const overlay = $("#cart-overlay");
  if (overlay) overlay.addEventListener("click", () => setCartOpen(false));

  /* -- clear cart -- */
  const cartClear = $("#cart-clear");
  if (cartClear) {
    cartClear.addEventListener("click", () => {
      saveCart([]);
      renderCart();
      toast("Đã xóa giỏ hàng");
    });
  }

  /* -- checkout → open pre-order modal -- */
  const cartCheckout = $("#cart-checkout");
  if (cartCheckout) {
    cartCheckout.addEventListener("click", () => {
      const cart = loadCart();
      if (!cart.length) {
        toast("Giỏ hàng đang trống — thêm món trước nhé!");
        return;
      }
      openPreorderModal();
    });
  }

  // Export functions to window for inline onclick handlers
  window.openPreorderModal = openPreorderModal;
  window.closePreorderModal = closePreorderModal;
  window.cancelBooking = cancelBooking;
  window.renderBooking = renderBooking;
  window.switchDrawerTab = switchDrawerTab;
});
