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
  if (!el) return;
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
  const countEl = $("#cart-count");
  const list = $("#cart-items");
  const totalEl = $("#cart-total");
  if (!countEl || !list || !totalEl) return;

  const cart = loadCart();
  countEl.textContent = cartQty(cart);
  if (!cart.length) {
    list.innerHTML = `<li class="empty-cart">Giỏ còn trống. Thêm món nổi bật phía trên nhé.</li>`;
    totalEl.textContent = money(0);
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
  totalEl.textContent = money(cartSum(cart));
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

function isNavOpen() {
  const nav = $("#main-nav");
  return nav ? nav.classList.contains("is-open") : false;
}

function setCartOpen(open) {
  const drawer = $("#cart-drawer");
  const overlay = $("#cart-overlay");
  if (!drawer) return;

  // Nếu mở giỏ hàng thì đóng menu mobile nếu đang mở
  if (open && isNavOpen()) {
    const nav = $("#main-nav");
    const toggle = $(".nav-toggle");
    if (nav) nav.classList.remove("is-open");
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

function setupNav() {
  const toggle = $(".nav-toggle");
  const nav = $("#main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    // Đóng giỏ hàng nếu đang mở trước khi mở menu mobile
    const drawer = $("#cart-drawer");
    if (drawer && drawer.classList.contains("is-open")) {
      setCartOpen(false);
    }

    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle(
      "no-scroll",
      open || (drawer ? drawer.classList.contains("is-open") : false),
    );
  });

  $$(".nav-link").forEach((a) => {
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

  const links = $$(".nav-link");
  const sections = links
    .map((a) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        return document.querySelector(href);
      }
      return null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const onScroll = () => {
    const y = window.scrollY + 130;
    // Kiểm tra nếu đang ở đỉnh trang (Hero), không active mục nào
    if (sections[0] && y < sections[0].offsetTop) {
      links.forEach((a) => a.classList.remove("is-active"));
      return;
    }

    let current = sections[0];
    sections.forEach((s) => {
      if (s.offsetTop <= y) current = s;
    });

    links.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle(
        "is-active",
        Boolean(current && href === `#${current.id}`),
      );
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupMenuFilter() {
  const filterBtns = $$(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

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

const OPEN_TIME = "07:00";
const CLOSE_TIME = "22:00";

function setupBooking() {
  const form = $("#booking-form");
  if (!form) return;

  const dateInput = form.date;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  if (dateInput) {
    dateInput.min = today;
  }

  const saved = localStorage.getItem(BOOKING_KEY);
  if (saved) {
    try {
      const b = JSON.parse(saved);
      if (form.name) form.name.value = b.name || "";
      if (form.phone) form.phone.value = b.phone || "";
      if (form.date) form.date.value = b.date || "";
      if (form.time) form.time.value = b.time || "";
      if (form.guests) form.guests.value = b.guests || "2";
      if (form.note) form.note.value = b.note || "";
    } catch {
      /* ignore */
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#form-error");
    const ok = $("#form-success");
    if (err) err.hidden = true;
    if (ok) ok.hidden = true;

    const name = form.name.value.trim();
    // Chuẩn hóa số điện thoại: loại bỏ dấu cách, gạch nối, chấm
    const phone = form.phone.value.replace(/[\s.-]/g, "");
    const date = form.date.value;
    const time = form.time.value;

    if (name.length < 2) {
      if (err) {
        err.textContent = "Nhập họ tên (tối thiểu 2 ký tự).";
        err.hidden = false;
      }
      return;
    }
    if (!/^0[0-9]{9}$/.test(phone)) {
      if (err) {
        err.textContent = "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng số 0.";
        err.hidden = false;
      }
      return;
    }
    if (!date || date < today) {
      if (err) {
        err.textContent = "Chọn ngày từ hôm nay trở đi.";
        err.hidden = false;
      }
      return;
    }
    if (!time) {
      if (err) {
        err.textContent = "Chọn giờ đến quán.";
        err.hidden = false;
      }
      return;
    }
    if (time < OPEN_TIME || time > CLOSE_TIME) {
      if (err) {
        err.textContent = `Quán chỉ nhận đặt bàn từ ${OPEN_TIME} đến ${CLOSE_TIME}.`;
        err.hidden = false;
      }
      return;
    }

    // Nếu đặt bàn trong ngày hôm nay, kiểm tra giờ không được trong quá khứ
    if (date === today) {
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${currentHours}:${currentMinutes}`;
      if (time <= currentTime) {
        if (err) {
          err.textContent =
            "Giờ đặt bàn hôm nay không thể ở trong quá khứ. Vui lòng chọn giờ sau thời điểm hiện tại.";
          err.hidden = false;
        }
        return;
      }
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
    if (ok) {
      ok.textContent = `Đã lưu chỗ cho ${name} · ${date} lúc ${time} · ${booking.guests} khách. Đưa tên này khi tới quán.`;
      ok.hidden = false;
    }
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

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const drawer = $("#cart-drawer");
    if (drawer && drawer.classList.contains("is-open")) setCartOpen(false);
    const nav = $("#main-nav");
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

  const cartBtn = $(".cart-btn");
  if (cartBtn) cartBtn.addEventListener("click", () => setCartOpen(true));

  const cartClose = $(".cart-close");
  if (cartClose) cartClose.addEventListener("click", () => setCartOpen(false));

  const overlay = $("#cart-overlay");
  if (overlay) overlay.addEventListener("click", () => setCartOpen(false));

  const cartClear = $("#cart-clear");
  if (cartClear) {
    cartClear.addEventListener("click", () => {
      saveCart([]);
      renderCart();
      toast("Đã xóa giỏ hàng");
    });
  }

  const cartCheckout = $("#cart-checkout");
  if (cartCheckout) {
    cartCheckout.addEventListener("click", () => {
      const cart = loadCart();
      if (!cart.length) {
        toast("Giỏ hàng đang trống");
        return;
      }
      toast("Đơn đã ghi nhớ — gọi món theo giỏ khi tới quán");
      setCartOpen(false);
    });
  }
});
