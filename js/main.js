/**
 * ATLAS PATHWAY JOURNEYS - MAIN JAVASCRIPT
 * Premium Tourism Website
 */

/* ---- NAVBAR ---- */
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.navbar-hamburger');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Navbar
  if (navbar) {
    navbar.classList.toggle('scrolled', scrolled > 50);
  }

  // Scroll Progress
  if (scrollProgress) {
    scrollProgress.style.width = `${(scrolled / docHeight) * 100}%`;
  }

  // Back to Top
  if (backToTop) {
    backToTop.classList.toggle('visible', scrolled > 400);
  }
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- SCROLL ANIMATIONS ---- */
const animatedEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
animatedEls.forEach(el => animObserver.observe(el));

/* ---- FAQ ACCORDION ---- */
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

/* ---- GALLERY LIGHTBOX ---- */
let lightboxImages = [];
let lightboxIndex = 0;

function initGallery() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const thumbs = document.querySelectorAll('.tour-gallery-thumb img, .tour-gallery-main img');
  const thumbItems = document.querySelectorAll('.tour-gallery-thumb, .tour-gallery-main');

  lightboxImages = [];
  thumbs.forEach(img => lightboxImages.push(img.src));

  thumbItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      lightboxIndex = i < lightboxImages.length ? i : 0;
      lightboxImg.src = lightboxImages[lightboxIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Update active thumb
      document.querySelectorAll('.tour-gallery-thumb').forEach((t, j) => {
        t.classList.toggle('active', j === lightboxIndex);
      });
    });
  });

  // Also handle clicking the main image
  const mainImg = document.querySelector('.tour-gallery-main');
  if (mainImg) {
    mainImg.style.cursor = 'zoom-in';
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  });

  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
    if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
  });
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ---- GALLERY THUMBNAIL SWITCH ---- */
function initThumbnailGallery() {
  const mainImg = document.querySelector('.tour-gallery-main img');
  if (!mainImg) return;
  document.querySelectorAll('.tour-gallery-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.querySelector('img').src;
      document.querySelectorAll('.tour-gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
  const firstThumb = document.querySelector('.tour-gallery-thumb');
  if (firstThumb) firstThumb.classList.add('active');
}

/* ---- BOOKING BOX DYNAMIC PRICE ---- */
function initBookingBox() {
  const pricePerPerson = parseFloat(document.querySelector('[data-price]')?.dataset.price || 0);
  const travelersInput = document.getElementById('booking-travelers');
  const totalDisplay = document.getElementById('booking-total');
  const subtotalDisplay = document.getElementById('booking-subtotal');
  const priceDisplay = document.getElementById('booking-price-display');

  if (!travelersInput || !pricePerPerson) return;

  function updateTotal() {
    const travelers = parseInt(travelersInput.value) || 1;
    const subtotal = pricePerPerson * travelers;
    const serviceFee = Math.round(subtotal * 0.03);
    const total = subtotal + serviceFee;

    if (subtotalDisplay) subtotalDisplay.textContent = `€${subtotal}`;
    if (document.getElementById('booking-service-fee')) {
      document.getElementById('booking-service-fee').textContent = `€${serviceFee}`;
    }
    if (totalDisplay) totalDisplay.textContent = `€${total}`;
    if (priceDisplay) priceDisplay.textContent = `€${total}`;
  }

  travelersInput.addEventListener('change', updateTotal);
  travelersInput.addEventListener('input', updateTotal);
  updateTotal();
}

/* ---- BOOKING FORM SUBMIT ---- */
function initBookingForm() {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', e => {
    e.preventDefault();

    const date = document.getElementById('booking-date')?.value;
    const travelers = document.getElementById('booking-travelers')?.value;
    const tourName = document.querySelector('.tour-hero h1')?.textContent ||
                     document.querySelector('h1')?.textContent || 'Tour';
    const total = document.getElementById('booking-total')?.textContent || '';

    if (!date) {
      showToast('⚠️ Please select a date', 'warning');
      return;
    }

    // Show payment modal
    showPaymentModal({
      tourName: tourName.trim(),
      date,
      travelers,
      total
    });
  });
}

/* ---- PAYMENT MODAL ---- */
function showPaymentModal(data) {
  const existing = document.getElementById('payment-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'payment-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    z-index: 9998; display: flex; align-items: center;
    justify-content: center; padding: 20px;
  `;
  modal.innerHTML = `
    <div style="background: white; border-radius: 20px; padding: 36px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
      <button onclick="this.closest('#payment-modal').remove()" style="position: absolute; top: 16px; right: 16px; background: #f0f0f0; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">✕</button>
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🎉</div>
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">Complete Your Booking</h3>
        <p style="color: #666; font-size: 0.9rem;">Secure checkout • SSL encrypted</p>
      </div>
      <div style="background: #f8f8f8; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #666;">Tour</span><span style="font-weight: 600; max-width: 220px; text-align: right;">${data.tourName}</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #666;">Date</span><span style="font-weight: 600;">${data.date}</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #666;">Travelers</span><span style="font-weight: 600;">${data.travelers}</span></div>
        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #ddd; font-weight: 700; font-size: 1rem;"><span>Total</span><span style="color: #FF6B00;">${data.total}</span></div>
      </div>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <button onclick="selectPayment(this, 'stripe')" class="payment-tab active" style="flex: 1; padding: 10px; border: 2px solid #FF6B00; border-radius: 8px; background: rgba(255,107,0,0.06); cursor: pointer; font-weight: 600; font-size: 0.85rem; color: #FF6B00;">💳 Card</button>
        <button onclick="selectPayment(this, 'paypal')" class="payment-tab" style="flex: 1; padding: 10px; border: 2px solid #eee; border-radius: 8px; background: white; cursor: pointer; font-weight: 600; font-size: 0.85rem; color: #333;">🅿 PayPal</button>
        <button onclick="selectPayment(this, 'later')" class="payment-tab" style="flex: 1; padding: 10px; border: 2px solid #eee; border-radius: 8px; background: white; cursor: pointer; font-weight: 600; font-size: 0.85rem; color: #333;">⏰ Later</button>
      </div>
      <div id="payment-fields">
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;" oninput="formatCard(this)">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Expiry Date</label>
            <input type="text" placeholder="MM/YY" maxlength="5" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;">
          </div>
          <div>
            <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">CVV</label>
            <input type="text" placeholder="123" maxlength="3" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;">
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Name on Card</label>
          <input type="text" placeholder="John Doe" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;">
        </div>
        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Email Address</label>
          <input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;">
        </div>
      </div>
      <button onclick="processPayment()" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #FF6B00, #FF8C33); color: white; border: none; border-radius: 50px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 20px rgba(255,107,0,0.4);">
        🔒 Confirm Booking — ${data.total}
      </button>
      <p style="text-align: center; font-size: 0.78rem; color: #999; margin-top: 12px;">🔒 256-bit SSL encrypted • No hidden fees</p>
      <div style="display: flex; gap: 6px; justify-content: center; margin-top: 10px;">
        <span style="background: white; border: 1px solid #eee; border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; font-weight: 700; color: #666;">VISA</span>
        <span style="background: white; border: 1px solid #eee; border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; font-weight: 700; color: #666;">MC</span>
        <span style="background: white; border: 1px solid #eee; border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; font-weight: 700; color: #666;">AMEX</span>
        <span style="background: white; border: 1px solid #eee; border-radius: 4px; padding: 3px 8px; font-size: 0.72rem; font-weight: 700; color: #666;">PayPal</span>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

window.selectPayment = function(btn, method) {
  document.querySelectorAll('#payment-modal .payment-tab').forEach(b => {
    b.style.borderColor = '#eee';
    b.style.background = 'white';
    b.style.color = '#333';
  });
  btn.style.borderColor = '#FF6B00';
  btn.style.background = 'rgba(255,107,0,0.06)';
  btn.style.color = '#FF6B00';

  const fields = document.getElementById('payment-fields');
  if (method === 'paypal') {
    fields.innerHTML = `
      <div style="text-align: center; padding: 24px; background: #f8f8f8; border-radius: 12px; margin-bottom: 16px;">
        <p style="font-size: 1.8rem; margin-bottom: 8px;">🅿️</p>
        <p style="font-weight: 700; margin-bottom: 4px;">Pay with PayPal</p>
        <p style="font-size: 0.85rem; color: #666;">You'll be redirected to PayPal to complete payment securely.</p>
      </div>
    `;
  } else if (method === 'later') {
    fields.innerHTML = `
      <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <p style="font-weight: 700; color: #166534; margin-bottom: 8px;">✅ Reserve Now, Pay Later</p>
        <p style="font-size: 0.88rem; color: #166534;">Secure your spot today with no payment. Pay 48 hours before your tour date.</p>
        <div style="margin-top: 12px;">
          <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Your Email</label>
          <input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px 14px; border: 2px solid #86efac; border-radius: 8px; font-size: 0.9rem;">
        </div>
      </div>
    `;
  } else {
    fields.innerHTML = `
      <div style="margin-bottom: 12px;">
        <label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Card Number</label>
        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;" oninput="formatCard(this)">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <div><label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Expiry</label><input type="text" placeholder="MM/YY" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;"></div>
        <div><label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">CVV</label><input type="text" placeholder="123" maxlength="3" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;"></div>
      </div>
      <div style="margin-bottom: 16px;"><label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Name on Card</label><input type="text" placeholder="John Doe" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;"></div>
      <div style="margin-bottom: 16px;"><label style="font-size: 0.82rem; font-weight: 600; display: block; margin-bottom: 6px;">Email</label><input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px 14px; border: 2px solid #eee; border-radius: 8px; font-size: 0.9rem;"></div>
    `;
  }
};

window.formatCard = function(input) {
  let value = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = value.replace(/(.{4})/g, '$1 ').trim();
};

window.processPayment = function() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.innerHTML = `
      <div style="background: white; border-radius: 20px; padding: 40px; max-width: 480px; width: 100%; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: #1a1a1a; margin-bottom: 12px;">Booking Confirmed!</h3>
        <p style="color: #666; margin-bottom: 24px; line-height: 1.7;">Your tour is confirmed! You'll receive a confirmation email shortly. Our guide Abdulaziz will contact you 24 hours before your tour.</p>
        <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="font-size: 0.9rem; color: #166534; font-weight: 600;">📧 Confirmation email sent</p>
          <p style="font-size: 0.9rem; color: #166534;">📱 WhatsApp message coming soon</p>
        </div>
        <a href="https://wa.me/212671910887?text=Hello%2C%20I%20just%20booked%20a%20tour%20with%20Atlas%20Pathway%20Journeys!" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: #25D366; color: white; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; margin-bottom: 12px;">
          💬 Contact on WhatsApp
        </a><br>
        <button onclick="this.closest('#payment-modal').remove()" style="background: none; border: none; color: #999; cursor: pointer; font-size: 0.9rem; margin-top: 12px;">Close</button>
      </div>
    `;
  }
};

/* ---- EMAIL POPUP ---- */
function initEmailPopup() {
  const popup = document.getElementById('email-popup');
  if (!popup) return;
  if (localStorage.getItem('apj_popup_shown')) return;

  setTimeout(() => {
    popup.classList.add('active');
  }, 8000);

  const closeBtn = popup.querySelector('.popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
      localStorage.setItem('apj_popup_shown', '1');
    });
  }

  popup.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.remove('active');
      localStorage.setItem('apj_popup_shown', '1');
    }
  });

  const form = popup.querySelector('form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      popup.querySelector('.popup-box').innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
          <h3 style="margin-bottom: 10px;">You're in!</h3>
          <p style="color: #666;">Your 10% discount code: <strong style="color: #FF6B00;">ATLAS10</strong></p>
        </div>
      `;
      localStorage.setItem('apj_popup_shown', '1');
      setTimeout(() => popup.classList.remove('active'), 3000);
    });
  }
}

/* ---- TOAST NOTIFICATION ---- */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
    ${message}
  `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ---- HERO SEARCH ---- */
function initHeroSearch() {
  const searchForm = document.getElementById('hero-search-form');
  if (!searchForm) return;
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('hero-search-input')?.value.toLowerCase() || '';
    const toursMap = {
      'atlas': 'tours/atlas-mountains-day-trip.html',
      'mountain': 'tours/atlas-mountains-day-trip.html',
      'agafay': 'tours/agafay-desert-day-pass.html',
      'desert': 'tours/agafay-desert-day-pass.html',
      'dinner': 'tours/agafay-desert-dinner.html',
      'ourika': 'tours/ourika-valley-tour.html',
      'valley': 'tours/ourika-valley-tour.html',
      'food': 'tours/marrakech-food-tour.html',
      'tasting': 'tours/marrakech-food-tour.html',
    };
    for (const [key, url] of Object.entries(toursMap)) {
      if (q.includes(key)) { window.location.href = url; return; }
    }
    window.location.href = 'tours/index.html';
  });
}

/* ---- TESTIMONIALS CAROUSEL ---- */
let carouselIndex = 0;
function initCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  function goTo(index) {
    slides.forEach((s, i) => { s.style.display = i === index ? 'block' : 'none'; });
    if (dots.length) dots.forEach((d, i) => d.classList.toggle('active', i === index));
    carouselIndex = index;
  }

  goTo(0);
  if (dots.length) dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo((carouselIndex + 1) % slides.length), 5000);
}

/* ---- LAZY IMAGES ---- */
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
          imgObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imgObserver.observe(img));
  }
}

/* ---- SET ACTIVE NAV LINK ---- */
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (path.endsWith(href) || path.includes(href.replace('.html', '').replace('index', ''))) {
      link.classList.add('active');
    }
  });
}

/* ---- MIN DATE FOR DATE PICKER ---- */
function initDatePicker() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }
}

/* ---- COUNTER ANIMATION ---- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let start = 0;
      const duration = 2000;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
        else el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      }, 16);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

/* ---- INIT ALL ---- */
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initThumbnailGallery();
  initBookingBox();
  initBookingForm();
  initEmailPopup();
  initHeroSearch();
  initCarousel();
  initLazyImages();
  setActiveNavLink();
  initDatePicker();
  initCounters();

  // Stagger animation delays
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});
