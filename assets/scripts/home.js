document.getElementById('year').textContent = new Date().getFullYear();

  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function anim(){
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(anim);
  })();

  function toggleMenu(){
    document.getElementById('hamburger').classList.toggle('open');
    const mm = document.getElementById('mobileMenu');
    mm.classList.toggle('open');
    document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
  }
  function closeMobile(){
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Lightbox: passa a imagem clicada para o modal */
  function openLightbox(el){
    const img = el.querySelector('img');
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = img.alt;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightbox').addEventListener('click', function(e){
    if(e.target === this) closeLightbox();
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));