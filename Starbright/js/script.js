/**
 * Starbright Real Estate — Main Script
 * Handles: transparent navbar scroll effect, scroll animations (Intersection Observer), mobile menu
 */
(function () {
  'use strict';

  // ─── Navbar Scroll Effect ─────────────────────────────────
  const navbar = document.querySelector('.navbar');
  const isHomepageHero = navbar && navbar.classList.contains('navbar-transparent');

  function handleNavbarScroll() {
    if (!navbar) return;
    const scrolled = window.scrollY > 60;

    if (isHomepageHero) {
      // Homepage: transparent → solid on scroll
      if (scrolled) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('navbar-transparent');
      }
    } else {
      // Sub-pages: subtle shadow toggle
      navbar.classList.toggle('navbar-scrolled', scrolled);
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run once on load

  // ─── Scroll Animations (Intersection Observer) ────────────
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ─── Mobile Menu Toggle ───────────────────────────────────
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  // ─── Close mobile menu on nav link click ──────────────────
  if (mobileMenu) {
    var menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

})();
