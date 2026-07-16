/* ============================================================
   MAYDAY — Global Scripts
   ============================================================ */

(async () => {

  // ── Font Awesome ──
  const fa = document.createElement('link');
  fa.rel = 'stylesheet';
  fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(fa);

  // ── Load partials ──
  const headerEl = document.querySelector('[data-include="header"]');
  const footerEl = document.querySelector('[data-include="footer"]');

  if (headerEl) {
    const r = await fetch('partials/header.html');
    headerEl.outerHTML = await r.text();
  }
  if (footerEl) {
    const r = await fetch('partials/footer.html');
    footerEl.outerHTML = await r.text();
  }

  // ── Mark active nav link ──
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.hdr__nav a, .mob__links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });

  // ── Header: solid on non-home pages, toggle on scroll for home ──
  const hdr = document.querySelector('.hdr');
  const isHome = page === 'index.html' || page === '';
  if (hdr) {
    if (!isHome) {
      hdr.classList.add('hdr--solid');
    } else {
      window.addEventListener('scroll', () => {
        hdr.classList.toggle('hdr--solid', window.scrollY > 60);
      });
    }
  }

  // ── Mobile menu ──
  const burger = document.getElementById('burgerBtn') || document.querySelector('.hdr__burger');
  const mob = document.getElementById('mobileMenu');

  function closeMenu() {
    if (burger) burger.classList.remove('on');
    if (mob) mob.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger && mob) {
    burger.addEventListener('click', () => {
      const isOpen = mob.classList.toggle('open');
      burger.classList.toggle('on');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
  }

  // ── ESC key ──
  const lb = document.getElementById('lightbox');
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lb && lb.classList.contains('open')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
      closeMenu();
    }
  });

  // ── Lightbox ──
  if (lb) {
    window.openLightbox = (el) => {
      const img = el.querySelector('img');
      const lbImg = document.getElementById('lb-img');
      if (img && lbImg) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };
    window.closeLightbox = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  }

  // ── Fade-in observer ──
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fi').forEach(el => obs.observe(el));

})();
