/* Renegade Fitness — interactions */
(function () {
  'use strict';

  /* ── Mobile nav ── */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal (split panels + .reveal elements) ── */
  var targets = document.querySelectorAll('.reveal, .split');
  if (targets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Gallery lightbox ── */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid a'));
    var idx = 0;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var src = items[idx].getAttribute('href');
      lbImg.src = src;
    };
    var open = function (i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    var close = function () { lb.classList.remove('open'); document.body.style.overflow = ''; };
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
