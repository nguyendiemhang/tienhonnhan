/* ============================================
   main.js — Tiền Hôn Nhân
   Menu mobile + fade-up + active menu + smooth scroll
   ============================================ */

(function () {
  'use strict';

  /* --------------------------------------------
     1. MENU MOBILE
     -------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    // Bấm nút 3 gạch → mở/đóng menu
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Click ra ngoài menu → đóng
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });

    // Bấm vào 1 link trong menu → đóng menu
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------
     2. ĐÁNH DẤU MENU ĐANG ACTIVE
     -------------------------------------------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav a').forEach(function (link) {
    const linkPath = link.getAttribute('href').replace(/\/$/, '');
    if (linkPath === currentPath || (currentPath === '/' && linkPath === '')) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------
     3. FADE-UP KHI CUỘN TRANG
     -------------------------------------------- */
  const fadeTargets = document.querySelectorAll(
    '.card, .lesson-item, .info-box, .pricing-card, .step-card, .prep-item, .faq-item, .team-avatar, .outcome-list li'
  );

  if (fadeTargets.length && 'IntersectionObserver' in window) {
    // Set trạng thái ban đầu
    fadeTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Delay nhẹ so le để mượt hơn
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, Math.min(index * 60, 300));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------
     4. SMOOTH SCROLL CHO ANCHOR LINK
     -------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --------------------------------------------
     5. THÊM CLASS KHI ĐÃ CUỘN (cho header co lại)
     -------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

})();
