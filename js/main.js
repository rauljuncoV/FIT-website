/**
 * Main JavaScript for Functional Interventions Therapy
 * Handles: Language toggle, navigation, scroll effects, service card accordions, carousel, lightbox
 */

(function () {
  'use strict';

  // ===== State =====
  let currentLang = 'en';

  // ===== Gallery Data =====
  var galleryItems = [
    { type: 'image', src: 'assets/gallery/front-1.jpeg', alt: 'Clinic storefront' },
    { type: 'image', src: 'assets/gallery/front-2.jpeg', alt: 'Clinic entrance and services sign' },
    { type: 'image', src: 'assets/gallery/photo.JPG', alt: 'Play area with alphabet mat and stuffed animals' },
    { type: 'image', src: 'assets/gallery/photo%200.jpg', alt: 'Play area with bean bags and TV' },
    { type: 'image', src: 'assets/gallery/photo%201.JPG', alt: 'Lounge area with bean bags and wall decorations' },
    { type: 'image', src: 'assets/gallery/photo%202.JPG', alt: 'Therapy room with toy storage and colorful play mat' },
    { type: 'image', src: 'assets/gallery/photo%203.JPG', alt: 'Play area with circus tent and activity stations' },
    { type: 'image', src: 'assets/gallery/photo%204.JPG', alt: 'Activity room with play tables and learning toys' },
    { type: 'image', src: 'assets/gallery/photo%205.JPG', alt: 'Full view of main therapy playroom' },
    { type: 'image', src: 'assets/gallery/photo%206.JPG', alt: 'Therapy room with toy storage and bean bag seating' },
    { type: 'image', src: 'assets/gallery/photo%207.JPG', alt: 'Therapy workstation with desk and supplies' },
    { type: 'image', src: 'assets/gallery/photo%208.JPG', alt: 'Small therapy room with activity table' },
    { type: 'image', src: 'assets/gallery/photo%209.JPG', alt: 'Hanging storage organizers in therapy room' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM.jpeg', alt: 'Physical therapy session with ring exercises' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(1).jpeg', alt: 'Therapist guiding child through balance activity' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(2).jpeg', alt: 'Physical therapy room with climbing wall and mats' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(3).jpeg', alt: 'Speech therapy reading session with child' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(4).jpeg', alt: 'Therapist reading to a toddler with parent' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(5).jpeg', alt: 'Speech therapy session with storybook' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(6).jpeg', alt: 'Child reaching for storybook during therapy' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.08%20PM%20(7).jpeg', alt: 'Toddler engaging with therapist during reading' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM.jpeg', alt: 'Child smiling during speech therapy session' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(1).jpeg', alt: 'Family speech therapy session' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(2).jpeg', alt: 'Therapist showing picture book to child' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(3).jpeg', alt: 'Child and parent during therapy reading activity' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(4).jpeg', alt: 'Speech therapist working with toddler and family' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(5).jpeg', alt: 'Reading activity during therapy session' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(6).jpeg', alt: 'Child laughing during therapy session' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(7).jpeg', alt: 'Staff member at reception desk' },
    { type: 'image', src: 'assets/gallery/WhatsApp%20Image%202026-03-04%20at%205.21.09%20PM%20(8).jpeg', alt: 'Administrative staff at front office' },
    { type: 'video', src: 'assets/gallery/WhatsApp%20Video%202026-03-04%20at%205.21.10%20PM.mp4', alt: 'Therapy session video' },
    { type: 'video', src: 'assets/gallery/WhatsApp%20Video%202026-03-04%20at%205.21.10%20PM%20(1).mp4', alt: 'Therapy activity video' },
    { type: 'video', src: 'assets/gallery/Therapy.mp4', alt: 'Therapy session video' }
  ];

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

    // Update aria-label elements
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (i18n[lang] && i18n[lang][key]) {
        el.setAttribute('aria-label', i18n[lang][key]);
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

    // Update carousel counter separator
    var counterSep = document.querySelector('.carousel__counter-sep');
    if (counterSep) {
      counterSep.textContent = i18n[lang].gallery_slide_of || 'of';
    }
    var lbCounterSep = document.querySelector('.lightbox__counter-sep');
    if (lbCounterSep) {
      lbCounterSep.textContent = i18n[lang].gallery_slide_of || 'of';
    }

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
        metaDesc.setAttribute('content', 'Functional Interventions Therapy ofrece servicios de Terapia del Lenguaje, Ocupacional y Física en Miami. Bilingüe inglés/español. Llame al 786.633.6245.');
      } else {
        metaDesc.setAttribute('content', 'Functional Interventions Therapy provides pediatric Speech, Occupational, and Physical Therapy services in Miami. Bilingual English/Spanish. Call 786.633.6245.');
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

  // ===== Carousel =====
  function initCarousel() {
    var track = document.querySelector('.carousel__track');
    var viewport = document.querySelector('.carousel__viewport');
    var prevBtn = document.querySelector('.carousel__arrow--prev');
    var nextBtn = document.querySelector('.carousel__arrow--next');
    var counterCurrent = document.querySelector('.carousel__counter-current');
    var counterTotal = document.querySelector('.carousel__counter-total');

    if (!track) return;

    var currentPosition = 0;
    var totalSlides = galleryItems.length;

    // Build slides dynamically
    galleryItems.forEach(function (item, i) {
      var slide = document.createElement('div');
      slide.className = 'carousel__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' / ' + totalSlides);

      var media = document.createElement('div');
      media.className = 'carousel__media' + (item.type === 'video' ? ' carousel__media--video' : '');
      media.setAttribute('tabindex', '0');
      media.setAttribute('role', 'button');
      media.dataset.index = i;
      media.dataset.type = item.type;

      if (item.type === 'image') {
        var img = document.createElement('img');
        img.alt = item.alt;
        img.draggable = false;
        // Lazy load: first 6 items load immediately
        if (i < 6) {
          img.src = item.src;
        } else {
          img.dataset.src = item.src;
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E6F7F9" width="400" height="300"/%3E%3C/svg%3E';
        }
        media.appendChild(img);
      } else {
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        if (i < 6) {
          video.src = item.src;
        } else {
          video.dataset.src = item.src;
        }
        media.appendChild(video);

        var overlay = document.createElement('div');
        overlay.className = 'carousel__play-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = '<i data-lucide="play-circle"></i>';
        media.appendChild(overlay);
      }

      slide.appendChild(media);
      track.appendChild(slide);
    });

    // Re-init Lucide for new play icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    counterTotal.textContent = totalSlides;

    // Lazy loading with IntersectionObserver
    if ('IntersectionObserver' in window) {
      var lazyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var mediaChild = el.querySelector('img[data-src], video[data-src]');
          if (mediaChild && mediaChild.dataset.src) {
            mediaChild.src = mediaChild.dataset.src;
            mediaChild.removeAttribute('data-src');
          }
          lazyObserver.unobserve(el);
        });
      }, { rootMargin: '300px', threshold: 0 });

      track.querySelectorAll('.carousel__slide').forEach(function (slide) {
        lazyObserver.observe(slide);
      });
    } else {
      // Fallback: load all
      track.querySelectorAll('[data-src]').forEach(function (el) {
        el.src = el.dataset.src;
        el.removeAttribute('data-src');
      });
    }

    // Sliding logic
    function getSlidesPerView() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }

    function getSlideWidth() {
      var firstSlide = track.querySelector('.carousel__slide');
      if (!firstSlide) return 0;
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      return firstSlide.getBoundingClientRect().width + gap;
    }

    function maxPosition() {
      return Math.max(0, totalSlides - 1);
    }

    function updatePosition() {
      var slideWidth = getSlideWidth();
      track.style.transform = 'translateX(' + -(currentPosition * slideWidth) + 'px)';
      counterCurrent.textContent = currentPosition + 1;
      prevBtn.disabled = currentPosition <= 0;
      nextBtn.disabled = currentPosition >= maxPosition();
    }

    function goTo(pos) {
      currentPosition = Math.max(0, Math.min(pos, maxPosition()));
      updatePosition();
    }

    prevBtn.addEventListener('click', function () { goTo(currentPosition - 1); });
    nextBtn.addEventListener('click', function () { goTo(currentPosition + 1); });

    // Keyboard navigation within carousel
    var carouselEl = document.querySelector('.carousel');
    carouselEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goTo(currentPosition - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goTo(currentPosition + 1); e.preventDefault(); }
    });

    // Touch swipe
    var startX = 0, isDragging = false, dragDelta = 0;
    var SWIPE_THRESHOLD = 50;

    viewport.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
      dragDelta = 0;
      track.classList.add('carousel__track--dragging');
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var dx = e.touches[0].clientX - startX;
      var dy = e.touches[0].clientY - (this._startY || e.touches[0].clientY);
      if (!this._startY) this._startY = e.touches[0].clientY;
      // If scrolling more vertically, release
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dragDelta) < 10) { isDragging = false; return; }
      dragDelta = dx;
      var slideWidth = getSlideWidth();
      var offset = -(currentPosition * slideWidth) + dragDelta;
      track.style.transform = 'translateX(' + offset + 'px)';
    }, { passive: true });

    viewport.addEventListener('touchend', function () {
      this._startY = null;
      if (!isDragging) { track.classList.remove('carousel__track--dragging'); return; }
      isDragging = false;
      track.classList.remove('carousel__track--dragging');
      if (dragDelta < -SWIPE_THRESHOLD) goTo(currentPosition + 1);
      else if (dragDelta > SWIPE_THRESHOLD) goTo(currentPosition - 1);
      else updatePosition();
      dragDelta = 0;
    });

    // Mouse drag
    var mouseStartX = 0, mouseReady = false, mouseDragging = false, mouseDelta = 0;

    viewport.addEventListener('mousedown', function (e) {
      mouseStartX = e.clientX;
      mouseReady = true;
      mouseDragging = false;
      mouseDelta = 0;
    });

    window.addEventListener('mousemove', function (e) {
      if (!mouseReady) return;
      mouseDelta = e.clientX - mouseStartX;
      // Only enter drag mode after moving a few pixels
      if (!mouseDragging && Math.abs(mouseDelta) > 5) {
        mouseDragging = true;
        track.classList.add('carousel__track--dragging');
      }
      if (!mouseDragging) return;
      e.preventDefault();
      var slideWidth = getSlideWidth();
      var offset = -(currentPosition * slideWidth) + mouseDelta;
      track.style.transform = 'translateX(' + offset + 'px)';
    });

    window.addEventListener('mouseup', function () {
      if (!mouseReady) return;
      mouseReady = false;
      if (!mouseDragging) { mouseDelta = 0; return; } // Was just a click, let click event through
      mouseDragging = false;
      track.classList.remove('carousel__track--dragging');
      if (mouseDelta < -SWIPE_THRESHOLD) goTo(currentPosition + 1);
      else if (mouseDelta > SWIPE_THRESHOLD) goTo(currentPosition - 1);
      else updatePosition();
      mouseDelta = 0;
    });

    // Recalc on resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        goTo(Math.min(currentPosition, maxPosition()));
      }, 150);
    });

    // Initial state
    updatePosition();
  }

  // ===== Lightbox =====
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var lightboxVideo = lightbox.querySelector('.lightbox__video');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var prevBtn = lightbox.querySelector('.lightbox__prev');
    var nextBtn = lightbox.querySelector('.lightbox__next');
    var overlay = lightbox.querySelector('.lightbox__overlay');
    var lbCounterCurrent = lightbox.querySelector('.lightbox__counter-current');
    var lbCounterTotal = lightbox.querySelector('.lightbox__counter-total');
    var currentIndex = 0;

    lbCounterTotal.textContent = galleryItems.length;

    function showItem(index) {
      currentIndex = index;
      var item = galleryItems[currentIndex];
      lbCounterCurrent.textContent = currentIndex + 1;

      if (item.type === 'image') {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxImg.style.display = '';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src');
      } else {
        lightboxVideo.src = item.src;
        lightboxVideo.style.display = '';
        lightboxImg.style.display = 'none';
        lightboxImg.src = '';
      }
    }

    function openLightbox(index) {
      showItem(index);
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
    }

    function showPrev() {
      showItem((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }

    function showNext() {
      showItem((currentIndex + 1) % galleryItems.length);
    }

    // Click on carousel media to open lightbox
    var track = document.querySelector('.carousel__track');
    if (track) {
      track.addEventListener('click', function (e) {
        var mediaEl = e.target.closest('.carousel__media');
        if (!mediaEl) return;
        // Ignore if user was dragging
        if (track.classList.contains('carousel__track--dragging')) return;
        var index = parseInt(mediaEl.dataset.index, 10);
        openLightbox(index);
      });

      // Keyboard activation
      track.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var mediaEl = e.target.closest('.carousel__media');
        if (!mediaEl) return;
        e.preventDefault();
        var index = parseInt(mediaEl.dataset.index, 10);
        openLightbox(index);
      });
    }

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
    initCarousel();
    initLightbox();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
