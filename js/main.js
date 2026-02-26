/**
 * Main JavaScript for Functional Interventions Therapy
 * Handles: Language toggle, navigation, scroll effects, service card accordions, animations
 */

(function () {
  'use strict';

  // ===== State =====
  let currentLang = 'en';

  // ===== DOM Elements =====
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const langBtns = document.querySelectorAll('.lang-btn');
  const serviceToggles = document.querySelectorAll('.service-card__toggle');
  const navLinks = document.querySelectorAll('.navbar__link');

  // ===== Language System =====
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);

    // Update simple text elements
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    // Update list elements
    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-list');
      if (i18n[lang] && i18n[lang][key] && Array.isArray(i18n[lang][key])) {
        el.innerHTML = '';
        i18n[lang][key].forEach(function (item) {
          var li = document.createElement('li');
          li.textContent = item;
          el.appendChild(li);
        });
      }
    });

    // Update toggle button text for open cards
    document.querySelectorAll('.service-card').forEach(function (card) {
      var toggle = card.querySelector('.service-card__toggle');
      if (card.classList.contains('is-open')) {
        toggle.textContent = i18n[lang].learn_less || 'Show Less';
      } else {
        toggle.textContent = i18n[lang].learn_more || 'Learn More';
      }
    });

    // Update active state on toggle buttons
    langBtns.forEach(function (btn) {
      var isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    // Update page title
    if (lang === 'es') {
      document.title = 'Functional Interventions Therapy | Servicios de Terapia Pediátrica en Miami';
    } else {
      document.title = 'Functional Interventions Therapy | Pediatric Therapy Services in Miami';
    }

    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (lang === 'es') {
        metaDesc.setAttribute('content', 'Functional Interventions Therapy ofrece servicios de Terapia del Lenguaje, Ocupacional, Física y del Comportamiento en Miami. Bilingüe inglés/español. Llame al 786.633.6245.');
      } else {
        metaDesc.setAttribute('content', 'Functional Interventions Therapy provides pediatric Speech, Occupational, Physical, and Behavior Therapy services in Miami. Bilingual English/Spanish. Call 786.633.6245.');
      }
    }

    // Persist preference
    localStorage.setItem('fit-lang', lang);
  }

  // Language toggle click handlers
  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.dataset.lang);
    });
  });

  // ===== Navbar Scroll Effect =====
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===== Hamburger Menu =====
  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.classList.toggle('active');
    mainNav.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mainNav.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== Active Nav Link Highlighting =====
  var sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');

      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          if (scrollPos >= top && scrollPos < bottom) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ===== Service Card Accordion =====
  serviceToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.service-card');
      var details = card.querySelector('.service-card__details');
      var isOpen = card.classList.toggle('is-open');

      btn.setAttribute('aria-expanded', isOpen);
      details.setAttribute('aria-hidden', !isOpen);

      // Update button text
      if (isOpen) {
        btn.textContent = i18n[currentLang].learn_less || 'Show Less';
      } else {
        btn.textContent = i18n[currentLang].learn_more || 'Learn More';
      }
    });
  });

  // ===== Scroll Animations =====
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all immediately
      animatedElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ===== Lightbox Gallery =====
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var prevBtn = lightbox.querySelector('.lightbox__prev');
    var nextBtn = lightbox.querySelector('.lightbox__next');
    var overlay = lightbox.querySelector('.lightbox__overlay');
    var galleryImages = document.querySelectorAll('.gallery-item img');
    var currentIndex = 0;

    // Toggle single-image class (hide prev/next when only 1 image)
    if (galleryImages.length <= 1) {
      lightbox.classList.add('lightbox--single');
    }

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = galleryImages[currentIndex].src;
      lightboxImg.alt = galleryImages[currentIndex].alt;
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // Return focus to the gallery image that was clicked
      if (galleryImages[currentIndex]) {
        galleryImages[currentIndex].closest('.gallery-item').focus();
      }
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
      lightboxImg.alt = galleryImages[currentIndex].alt;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
      lightboxImg.alt = galleryImages[currentIndex].alt;
    }

    // Click on gallery images to open
    galleryImages.forEach(function (img, index) {
      img.closest('.gallery-item').setAttribute('tabindex', '0');
      img.closest('.gallery-item').setAttribute('role', 'button');

      img.addEventListener('click', function () {
        openLightbox(index);
      });

      // Allow keyboard activation
      img.closest('.gallery-item').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    // Close handlers
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    // Navigation handlers
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-active')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
  }

  // ===== Initialize =====
  function init() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Set language from saved preference or browser language
    var saved = localStorage.getItem('fit-lang');
    var browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    setLanguage(saved || browserLang);

    // Initialize scroll effects
    handleNavbarScroll();
    highlightActiveNav();
    initScrollAnimations();
    initLightbox();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
