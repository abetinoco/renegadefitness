/* Renegade Fitness — interactions */
(function () {
  'use strict';

  /* ── Mobile nav ── */
  var hamburger = document.querySelector('.hamburger');
  var menu = document.getElementById('mmenu');
  if (hamburger && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    hamburger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) setMenu(false);
    });
  }

  /* ── Sticky mobile CTA: show after scrolling past the hero ── */
  var bar = document.getElementById('stickyCta');
  var hero = document.getElementById('top');
  if (bar && hero) {
    var updBar = function () {
      bar.classList.toggle('show', window.scrollY > hero.offsetTop + hero.offsetHeight - 60);
    };
    window.addEventListener('scroll', updBar, { passive: true });
    updBar();
  }

  /* ── Gallery lightbox ── */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid a'));
    var idx = 0;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      lbImg.src = items[idx].getAttribute('href');
    };
    var open = function (i) {
      show(i);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    items.forEach(function (a, i) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ── Contact form (demo — no backend) ── */
  var form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp input') && form.querySelector('.hp input').value) return; // honeypot
      form.style.display = 'none';
      var ok = document.querySelector('#formSuccess');
      if (ok) ok.classList.add('show');
    });
  }
})();
