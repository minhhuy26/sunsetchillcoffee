const CART_KEY = "sunset-chill-cart";
const BOOKING_KEY = "sunset-chill-booking";

const money = (n) => n.toLocaleString("vi-VN") + "đ";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-show"), 2200);
}

function cartQty(cart) {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function cartSum(cart) {
  return cart.reduce((s, i) => s + i.qty * i.price, 0);
}

function renderCart() {
  const cart = loadCart();
  $("#cart-count").textContent = cartQty(cart);
  const list = $("#cart-items");
  if (!cart.length) {
    list.innerHTML = `<li class="empty-cart">Giỏ còn trống. Thêm món nổi bật phía trên nhé.</li>`;
    $("#cart-total").textContent = money(0);
    return;
  }
  list.innerHTML = cart
    .map(
      (i) => `
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
    `,
    )
    .join("");
  $("#cart-total").textContent = money(cartSum(cart));
}

function addToCart(btn) {
  const id = btn.dataset.add;
  const product = {
    id,
    name: btn.dataset.name,
    price: Number(btn.dataset.price),
  };
  if (!id || !product.name || !product.price) return;
  const cart = loadCart();
  const found = cart.find((i) => i.id === id);
  if (found) found.qty += 1;
  else
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  saveCart(cart);
  renderCart();
  toast(`Đã thêm ${product.name}`);
}

function changeQty(id, delta) {
  let cart = loadCart();
  cart = cart
    .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    .filter((i) => i.qty > 0);
  saveCart(cart);
  renderCart();
}

// FIX: khóa scroll nền + trả focus về nút mở khi đóng drawer (a11y + UX mobile)
function setCartOpen(open) {
  $("#cart-drawer").classList.toggle("is-open", open);
  $("#cart-drawer").setAttribute("aria-hidden", String(!open));
  $("#cart-overlay").hidden = !open;
  document.body.classList.toggle("no-scroll", open || isNavOpen());
  if (open) {
    $(".cart-close").focus();
  } else {
    $(".cart-btn").focus();
  }
}

function isNavOpen() {
  const nav = $("#main-nav");
  return nav ? nav.classList.contains("is-open") : false;
}

function setupNav() {
  const toggle = $(".nav-toggle");
  const nav = $("#main-nav");
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    // FIX: khóa scroll nền khi menu mobile mở, trừ khi cart cũng đang mở
    document.body.classList.toggle(
      "no-scroll",
      open || $("#cart-drawer").classList.contains("is-open"),
    );
  });
  $$(".nav-link").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.toggle(
        "no-scroll",
        $("#cart-drawer").classList.contains("is-open"),
      );
    });
  });

  const links = $$(".nav-link");
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY + 90;
    let current = sections[0];
    sections.forEach((s) => {
      if (s.offsetTop <= y) current = s;
    });
    links.forEach((a) => {
      a.classList.toggle(
        "is-active",
        a.getAttribute("href") === `#${current.id}`,
      );
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  // FIX: chạy 1 lần ngay khi tải trang để nav highlight đúng mục ngay từ đầu
  onScroll();
}

function setupMenuFilter() {
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$(".danh-muc").forEach((box) => {
        box.classList.toggle(
          "is-hidden",
          f !== "all" && box.dataset.category !== f,
        );
      });
    });
  });
}

// FIX: khai báo khung giờ mở cửa 1 chỗ, dùng lại cho cả input min/max và validate JS
const OPEN_TIME = "07:00";
const CLOSE_TIME = "22:00";

function setupBooking() {
  const form = $("#booking-form");
  const dateInput = form.date;
  const today = new Date().toISOString().slice(0, 10);
  dateInput.min = today;

  const saved = localStorage.getItem(BOOKING_KEY);
  if (saved) {
    try {
      const b = JSON.parse(saved);
      form.name.value = b.name || "";
      form.phone.value = b.phone || "";
      form.date.value = b.date || "";
      form.time.value = b.time || "";
      form.guests.value = b.guests || "2";
      form.note.value = b.note || "";
    } catch {
      /* ignore */
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#form-error");
    const ok = $("#form-success");
    err.hidden = true;
    ok.hidden = true;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const time = form.time.value;

    if (name.length < 2) {
      err.textContent = "Nhập họ tên (tối thiểu 2 ký tự).";
      err.hidden = false;
      return;
    }
    if (!/^0[0-9]{9}$/.test(phone)) {
      err.textContent = "Số điện thoại phải gồm 10 số, bắt đầu bằng 0.";
      err.hidden = false;
      return;
    }
    if (!date || date < today) {
      err.textContent = "Chọn ngày từ hôm nay trở đi.";
      err.hidden = false;
      return;
    }
    // FIX: trước đây chỉ kiểm tra time có được chọn hay không, không kiểm tra
    // có nằm trong khung giờ mở cửa (07:00–22:00) không — thuộc tính min/max
    // trên <input type="time"> chỉ là gợi ý UI, không chặn được hết mọi trường hợp.
    if (!time) {
      err.textContent = "Chọn giờ đến quán.";
      err.hidden = false;
      return;
    }
    if (time < OPEN_TIME || time > CLOSE_TIME) {
      err.textContent = `Quán chỉ nhận đặt bàn từ ${OPEN_TIME} đến ${CLOSE_TIME}.`;
      err.hidden = false;
      return;
    }

    const booking = {
      name,
      phone,
      date,
      time,
      guests: form.guests.value,
      note: form.note.value.trim(),
    };
    localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
    ok.textContent = `Đã lưu chỗ cho ${name} · ${date} lúc ${time} · ${booking.guests} khách. Đưa tên này khi tới quán.`;
    ok.hidden = false;
    toast("Đã lưu đặt bàn trên máy này");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupNav();
  setupMenuFilter();
  setupBooking();

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) addToCart(add);
    if (e.target.closest("[data-inc]"))
      changeQty(e.target.closest("[data-inc]").dataset.inc, 1);
    if (e.target.closest("[data-dec]"))
      changeQty(e.target.closest("[data-dec]").dataset.dec, -1);
  });

  // FIX: đóng drawer giỏ hàng và menu mobile bằng phím Escape (chuẩn UX cho overlay)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if ($("#cart-drawer").classList.contains("is-open")) setCartOpen(false);
    const nav = $("#main-nav");
    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      $(".nav-toggle").setAttribute("aria-expanded", "false");
      document.body.classList.toggle(
        "no-scroll",
        $("#cart-drawer").classList.contains("is-open"),
      );
    }
  });

  $(".cart-btn").addEventListener("click", () => setCartOpen(true));
  $(".cart-close").addEventListener("click", () => setCartOpen(false));
  $("#cart-overlay").addEventListener("click", () => setCartOpen(false));

  $("#cart-clear").addEventListener("click", () => {
    saveCart([]);
    renderCart();
    toast("Đã xóa giỏ hàng");
  });

  $("#cart-checkout").addEventListener("click", () => {
    const cart = loadCart();
    if (!cart.length) {
      toast("Giỏ hàng đang trống");
      return;
    }
    toast("Đơn đã ghi nhớ — gọi món theo giỏ khi tới quán");
    setCartOpen(false);
  });
});
