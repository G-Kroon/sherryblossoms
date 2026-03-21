/* script.js
   - Contains product data (13 keychains + 3 fragrances)
   - Renders responsive grid, filters, search
   - Modal quick view with multiple images and thumbnails
   - Performance: lazy loading, srcset usage (if you provide resized images)
*/

/* ---------- Product data ----------
   Update image filenames if your actual files differ.
   For best performance, create resized variants:
     - <name>-400.jpg (thumbnail)
     - <name>-800.jpg (grid / modal)
     - <name>-1200.jpg (large modal)
   If you don't have resized variants, the code still works with single images.
*/
const PRODUCTS = [
  // 13 keychains (examples). Replace filenames with your actual files in assets/keychains/
  {
    id: "kc01",
    title: "Name Keychain",
    price: "R50",
    priceValue: 50,
    category: "keychains",
    short: "Custom name keychain with glitter edge.",
    long: "Handmade acrylic name keychain with rose-gold clasp. Durable and lightweight.",
    images: ["R50keychain.jpg"],
  },
  {
    id: "kc02",
    title: "Name Keychain",
    price: "R50",
    priceValue: 50,
    category: "keychains",
    short: "Personalized pastel name keychain.",
    long: "Acrylic name charm with glitter border and rose-gold hardware.",
    images: ["R50(1)keychain.jpg"],
  },
  {
    id: "kc03",
    title: "Name Keychain — Pom Pom With Letter",
    price: "R60",
    priceValue: 60,
    category: "keychains",
    short: "Shimmer name keychain.",
    long: "Perfect for gifts and party favours; includes gift wrap option.",
    images: ["R60keychain.jpg"],
  },
  {
    id: "kc04",
    title: "Name Keychain",
    price: "R60",
    priceValue: 60,
    category: "keychains",
    short: "Pastel name keychain with glitter.",
    long: "Lightweight acrylic with durable hardware.",
    images: ["R60(1)keychain.jpg"],
  },
  {
    id: "kc05",
    title: "Name Keychain",
    price: "R70",
    priceValue: 70,
    category: "keychains",
    short: "Custom name charm with sparkle.",
    long: "Hand-finished edges and premium clasp.",
    images: ["R70keychain.jpg"],
  },
  {
    id: "kc06",
    title: "Name Keychain",
    price: "R70",
    priceValue: 70,
    category: "keychains",
    short: "Glitter-edge name keychain.",
    long: "Personalized acrylic charm with rose-gold ring.",
    images: ["R70(1)keychain.jpg"],
  },

  {
    id: "kc07",
    title: "Pom-Pom Letter A",
    price: "R70",
    priceValue: 60,
    category: "keychains",
    short: "Fluffy pom-pom with letter charm.",
    long: "Soft faux-fur pom-pom, gold hardware and confetti letter charm.",
    images: ["R70(2)keychain.jpg"],
  },
  {
    id: "kc08",
    title: "Name Keychain",
    price: "R70",
    priceValue: 60,
    category: "keychains",
    short: "Fluffy pom-pom with letter charm.",
    long: "Bright confetti letter charm and soft pom.",
    images: ["R70(3)keychain.jpg"],
  },
  {
    id: "kc09",
    title: "Name Keychain",
    price: "R80",
    priceValue: 60,
    category: "keychains",
    short: "Fluffy pom-pom with letter charm.",
    long: "Cute and colorful bag accessory.",
    images: ["R80keychain.jpg"],
  },
  {
    id: "kc10",
    title: "Letter Keychain",
    price: "R90",
    priceValue: 70,
    category: "keychains",
    short: "Resin letter with butterfly charm.",
    long: "Hand-poured resin letter with embedded glitter and butterfly charm.",
    images: ["R90keychain.jpg"],
  },
  {
    id: "kc11",
    title: "Name Keychain",
    price: "R90",
    priceValue: 70,
    category: "keychains",
    short: "Resin letter with tassel.",
    long: "Colorful resin with gold hardware and tassel.",
    images: ["R90(1)keychain.jpg"],
  },
  {
    id: "kc12",
    title: "Engraved Name On Leather Strap",
    price: "R90",
    priceValue: 90,
    category: "keychains",
    short: "Premium resin keychain with layered glitter.",
    long: "Larger resin piece with premium hardware and decorative tassel.",
    images: ["R90(2)keychain.jpg"],
  },
  {
    id: "kc12",
    title: "Quote Keychain",
    price: "R120",
    priceValue: 120,
    category: "keychains",
    short: "Premium resin keychain with layered glitter.",
    long: "Larger resin piece with premium hardware and decorative tassel.",
    images: ["R120keychain.jpg"],
  },

  // 3 fragrances
  {
    id: "fr01",
    title: "Blossom Petal Eau de Parfum",
    price: "R50",
    priceValue: 50,
    category: "fragrances",
    short: "Peony, cherry blossom, warm musk.",
    long: "A delicate floral blend with long-lasting base notes. Packaged in gift-ready box.",
    images: ["fragrance1.jpg"],
  },
  {
    id: "fr02",
    title: "Citrus Bloom Eau",
    price: "R50",
    priceValue: 50,
    category: "fragrances",
    short: "Fresh citrus, jasmine, and musk.",
    long: "Bright top notes with a soft floral heart.",
    images: ["fragrance2.jpg"],
  },

  /*{ id:'fr03', title:'Velvet Oud', price:'R50', priceValue:50, category:'fragrances', short:'Deep oud, rose, and leather.', long:'A rich, long-lasting oud blend for evening wear.', images:['assets/fragrances/fragranceR50.jpg'] }*/
];

/* ---------- DOM refs ---------- */
const productGrid = document.getElementById("productGrid");
const filterCategory = document.getElementById("filterCategory");
const filterPrice = document.getElementById("filterPrice");
const searchInput = document.getElementById("searchInput");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const yearEl = document.getElementById("year");

const productModal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalThumbs = document.getElementById("modalThumbs");
const modalTitle = document.getElementById("modalTitle");
const modalShort = document.getElementById("modalShort");
const modalLong = document.getElementById("modalLong");
const modalPrice = document.getElementById("modalPrice");
const modalClose = document.getElementById("modalClose");
const modalAdd = document.getElementById("modalAdd");

/* ---------- Helpers ---------- */
function createSrcset(basePath) {
  // If you have resized variants named -400, -800, -1200, return a srcset string.
  // If not, return empty string and the <img> will use the single src.
  if (!basePath) return "";
  if (
    basePath.includes("-400") ||
    basePath.includes("-800") ||
    basePath.includes("-1200")
  ) {
    // assume basePath like '...-800.jpg' -> build 400/800/1200 variants
    const base = basePath.replace(/-400|-800|-1200/, "");
    return `${base}-400.jpg 400w, ${base}-800.jpg 800w, ${base}-1200.jpg 1200w`;
  }
  return "";
}

/* ---------- Render product card ---------- */
function createProductCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.setAttribute("role", "listitem");
  card.setAttribute("aria-label", p.title);

  // choose first image for grid
  const img = p.images && p.images.length ? p.images[0] : "";
  const srcset = createSrcset(img);

  card.innerHTML = `
    <div class="badge" aria-hidden="true">${p.price}</div>
    <div class="img-wrap">
      <img src="${img}" ${srcset ? `srcset="${srcset}" sizes="(max-width:720px) 100vw, (max-width:1024px) 48vw, 33vw"` : ""} alt="${p.title}" loading="lazy">
    </div>
    <h3>${p.title}</h3>
    <p class="muted">${p.short}</p>
    <div class="meta"><div class="price">${p.price}</div><div class="muted">${p.category}</div></div>
    <div class="actions">
      <button class="btn btn-ghost quick-view" data-id="${p.id}" data-tooltip="View product details" aria-label="Quick view ${p.title}"><i class="fa-solid fa-eye" aria-hidden="true"></i> Quick View</button>
      <a href="https://wa.me/+27812863988" target="_blank" rel="noopener" class="btn btn-primary" data-tooltip="Order via WhatsApp" aria-label="Order ${p.title}"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Order Now</a>
    </div>

  `;
  return card;
}

/* ---------- Render grid ---------- */
function renderGrid(list) {
  productGrid.setAttribute("aria-busy", "true");
  productGrid.innerHTML = "";
  if (!list.length) {
    productGrid.innerHTML = '<p class="muted">No products found.</p>';
    productGrid.setAttribute("aria-busy", "false");
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach((p) => frag.appendChild(createProductCard(p)));
  productGrid.appendChild(frag);
  attachCardListeners();
  productGrid.setAttribute("aria-busy", "false");
}

/* ---------- Filters & search ---------- */
function applyFilters() {
  const cat = filterCategory ? filterCategory.value : "all";
  const price = filterPrice ? filterPrice.value : "all";
  const q =
    searchInput && searchInput.value
      ? searchInput.value.trim().toLowerCase()
      : "";

  let filtered = PRODUCTS.slice();

  if (cat !== "all") filtered = filtered.filter((p) => p.category === cat);
  if (price === "under100")
    filtered = filtered.filter((p) => p.priceValue < 100);
  if (price === "r50") filtered = filtered.filter((p) => p.priceValue === 50);
  if (price === "r60") filtered = filtered.filter((p) => p.priceValue === 60);
  if (price === "r70") filtered = filtered.filter((p) => p.priceValue === 70);
  if (price === "r90") filtered = filtered.filter((p) => p.priceValue === 90);

  if (q)
    filtered = filtered.filter((p) =>
      (p.title + " " + p.short + " " + p.long).toLowerCase().includes(q),
    );

  renderGrid(filtered);
}

/* ---------- Card listeners ---------- */
function attachCardListeners() {
  document.querySelectorAll(".quick-view").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) openModal(product);
    });
  });

  document.querySelectorAll(".buy-now").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const p = PRODUCTS.find((x) => x.id === id);
      alert(`Added ${p.title} (${p.price}) to cart — demo only.`);
    });
  });

  // featured quick view (data-quick)
  document.querySelectorAll("[data-quick]").forEach((b) => {
    b.addEventListener("click", () => {
      try {
        const data = JSON.parse(b.getAttribute("data-quick"));
        openModal(data);
      } catch (e) {
        console.error(e);
      }
    });
  });
}

/* ---------- Modal logic ---------- */
function openModal(product) {
  modalTitle.textContent = product.title || "";
  modalShort.textContent = product.short || "";
  modalLong.textContent = product.long || "";
  modalPrice.textContent = product.price || "";
  modalImg.src = product.images && product.images[0] ? product.images[0] : "";
  modalImg.alt = product.title || "Product image";

  modalThumbs.innerHTML = "";
  (product.images || []).forEach((src, i) => {
    const t = document.createElement("img");
    t.src = src;
    t.alt = `${product.title} ${i + 1}`;
    t.loading = "lazy";
    if (i === 0) t.classList.add("active");
    t.addEventListener("click", () => {
      modalImg.src = src;
      modalThumbs
        .querySelectorAll("img")
        .forEach((im) => im.classList.remove("active"));
      t.classList.add("active");
    });
    modalThumbs.appendChild(t);
  });

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ---------- Menu toggle ---------- */
menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("show");
});

/* ---------- Modal events ---------- */
modalClose?.addEventListener("click", closeModal);
productModal?.addEventListener("click", (e) => {
  if (e.target === productModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Contact form (demo) ---------- */
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("#cname")?.value?.trim();
    const email = contactForm.querySelector("#cemail")?.value?.trim();
    const phone = contactForm.querySelector("#cphone")?.value?.trim();
    const message = contactForm.querySelector("#cmessage")?.value?.trim();
    if (!name || !email || !phone || !message) {
      contactStatus.textContent = "Please complete all fields.";
      contactStatus.classList.remove("sr-only");
      return;
    }
    contactStatus.textContent = "Opening WhatsApp to send your message...";
    contactStatus.classList.remove("sr-only");

    const now = new Date();
    const timestamp = now.toLocaleString("en-ZA", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const waMsg =
      `📬 *New Contact Form Message — Sherry Blossoms*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Cellphone / WhatsApp:* ${phone}\n` +
      `🕐 *Sent:* ${timestamp}\n\n` +
      `💬 *Message:*\n${message}`;

    const waUrl = `https://wa.me/+27812863988?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      contactStatus.textContent = "Message sent via WhatsApp! We'll be in touch soon.";
      contactForm.reset();
    }, 800);
  });
}

/* ---------- Init ---------- */
function init() {
  renderGrid(PRODUCTS);
  filterCategory?.addEventListener("change", applyFilters);
  filterPrice?.addEventListener("change", applyFilters);
  searchInput?.addEventListener("input", applyFilters);
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (navList.classList.contains("show"))
          navList.classList.remove("show");
      }
    });
  });

  // Focus trap for modal
  productModal?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = productModal.querySelectorAll(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

/* ============================================================
   MOTHERS' DAY CAROUSEL
   ============================================================ */
(function () {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsContainer = document.getElementById("carouselDots");
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  let current = 0;
  let autoTimer = null;
  let visibleCount = getVisibleCount();
  let slideWidth = 0;
  let gapPx = 20;

  /* Build dot indicators */
  const totalPages = () => Math.max(1, slides.length - visibleCount + 1);

  function buildDots() {
    dotsContainer.innerHTML = "";
    const n = totalPages();
    for (let i = 0; i < n; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === current ? " active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 600) return 2;
    return 1;
  }

  function computeSlideWidth() {
    if (!slides.length) return;
    const outer = track.parentElement;
    const outerW = outer.clientWidth;
    gapPx = 20;
    slideWidth = (outerW - gapPx * (visibleCount - 1)) / visibleCount;
    slides.forEach((s) => {
      s.style.flex = `0 0 ${slideWidth}px`;
    });
  }

  function goTo(index) {
    const maxIndex = slides.length - visibleCount;
    current = Math.max(0, Math.min(index, maxIndex));
    const offset = current * (slideWidth + gapPx);
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex;
  }

  function goNext() {
    const maxIndex = slides.length - visibleCount;
    goTo(current < maxIndex ? current + 1 : 0);
  }

  function goPrev() {
    const maxIndex = slides.length - visibleCount;
    goTo(current > 0 ? current - 1 : maxIndex);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(goNext, 3800);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function setup() {
    visibleCount = getVisibleCount();
    computeSlideWidth();
    buildDots();
    goTo(current);
  }

  /* Call once after DOM is ready — buttons are static HTML */
  function init() {
    attachOrderButtons();
  }

  /* Order buttons — build WhatsApp link with product name, price & image URL */
  function attachOrderButtons() {
    track.querySelectorAll(".carousel-order-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".carousel-card");
        const name = card.dataset.name || "this product";
        const price = card.dataset.price || "";
        const imgFile = card.dataset.img || "";
        const imageUrl = imgFile ? `${window.location.origin}/${imgFile}` : "";
        const msg =
          `Hi Sherry Blossoms! 🌸\n\n` +
          `I'd like to order the following *Mothers' Day Special*:\n\n` +
          `🛍️ *Product:* ${name}\n` +
          `💰 *Price:* ${price}\n\n` +
          (imageUrl ? `🖼️ *Product image:* ${imageUrl}\n\n` : "") +
          `Please confirm availability 
          Thank you! 😊`;
        const waUrl = `https://wa.me/+27812863988?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      });
    });
  }

  /* Events */
  nextBtn.addEventListener("click", () => { goNext(); stopAuto(); startAuto(); });
  prevBtn.addEventListener("click", () => { goPrev(); stopAuto(); startAuto(); });

  /* Touch / swipe */
  let touchStartX = 0;
  let touchDeltaX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    stopAuto();
  }, { passive: true });
  track.addEventListener("touchmove", (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });
  track.addEventListener("touchend", () => {
    if (touchDeltaX < -50) goNext();
    else if (touchDeltaX > 50) goPrev();
    startAuto();
  });

  /* Pause on hover */
  const wrapper = document.querySelector(".carousel-wrapper");
  wrapper?.addEventListener("mouseenter", stopAuto);
  wrapper?.addEventListener("mouseleave", startAuto);

  /* Resize */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newVisible = getVisibleCount();
      if (newVisible !== visibleCount) {
        current = 0;
      }
      setup();
    }, 200);
  });

  /* Init */
  setup();
  startAuto();
  init();
})();
