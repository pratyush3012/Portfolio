/* ============================================================
   UTILITY
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   LOADER
   ============================================================ */
(function initLoader() {
  const loader = $('loader');
  const fill = $('loaderFill');
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(t); setTimeout(() => loader.classList.add('hidden'), 350); }
    fill.style.width = p + '%';
  }, 60);
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const dot = $('cursor');
  const ring = $('cursorFollower');
  let fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    // ring follows with slight lag via rAF
    fx += (e.clientX - fx) * 0.18;
    fy += (e.clientY - fy) * 0.18;
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  $$('a, button, .skill-card, .work-card, .masonry-item, .why-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ============================================================
   SCROLL PROGRESS  (debounced via rAF)
   ============================================================ */
(function initScrollProgress() {
  const bar = $('scrollProgress');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        bar.style.width = pct + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   NAVBAR
   ============================================================ */
(function initNavbar() {
  const nav = $('navbar');
  const hamburger = $('hamburger');
  const menu = $('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
      s2.style.opacity = '0';
      s3.style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    } else {
      [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  $$('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

/* ============================================================
   HERO — letter-by-letter reveal
   ============================================================ */
(function initHero() {
  function splitLetters(el, text) {
    el.innerHTML = text.split('').map(ch =>
      ch === ' ' ? ' ' : `<span class="letter">${ch}</span>`
    ).join('');
  }

  splitLetters($('heroLine1'), 'Pratyush');
  splitLetters($('heroLine2'), 'Sharma');

  // Stagger reveal after loader
  setTimeout(() => {
    // Badge
    $('heroBadge').classList.add('visible');

    // Line 1 letters
    const l1 = $$('#heroLine1 .letter');
    l1.forEach((l, i) => setTimeout(() => l.classList.add('visible'), 200 + i * 55));

    // Line 2 letters
    const l2 = $$('#heroLine2 .letter');
    l2.forEach((l, i) => setTimeout(() => l.classList.add('visible'), 500 + i * 55));

    // Role, tagline, cta, scroll
    setTimeout(() => $('heroRole').classList.add('visible'), 900);
    setTimeout(() => document.querySelector('.hero-tagline').classList.add('visible'), 1050);
    setTimeout(() => $('heroCta').classList.add('visible'), 1200);
    setTimeout(() => $('heroScroll').classList.add('visible'), 1450);
  }, 800);
})();

/* ============================================================
   TYPED TEXT
   ============================================================ */
(function initTyped() {
  const phrases = [
    'I craft engaging content, visuals, and digital experiences.',
    'I turn ideas into stories that people actually remember.',
    'I build brands that feel real, bold, and unforgettable.'
  ];
  let pi = 0, ci = 0, deleting = false;
  const el = $('typedText');

  function tick() {
    const cur = phrases[pi];
    if (deleting) {
      el.textContent = cur.slice(0, --ci);
      if (ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 500); return; }
      setTimeout(tick, 35);
    } else {
      el.textContent = cur.slice(0, ++ci);
      if (ci > cur.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 55);
    }
  }
  setTimeout(tick, 1600);
})();

/* ============================================================
   HERO PARALLAX  (debounced)
   ============================================================ */
(function initHeroParallax() {
  const content = document.querySelector('.hero-content');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight) {
          const y = window.scrollY;
          content.style.transform = `translateY(${y * 0.22}px)`;
          content.style.opacity = String(1 - y / (window.innerHeight * 0.75));
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   SCROLL REVEAL  (IntersectionObserver)
   ============================================================ */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  $$('.reveal-up, .reveal-right').forEach(el => obs.observe(el));
})();

/* ============================================================
   COUNTER ANIMATION  (staggered)
   ============================================================ */
(function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.stat-num').forEach((el, i) => {
        setTimeout(() => {
          const target = parseInt(el.dataset.target);
          let cur = 0;
          const step = target / 55;
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.floor(cur);
            if (cur >= target) clearInterval(t);
          }, 22);
        }, i * 200);
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  const stats = document.querySelector('.about-stats');
  if (stats) obs.observe(stats);
})();

/* ============================================================
   TILT EFFECT  (subtle, only on non-touch)
   ============================================================ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ============================================================
   ORBITAL RANDOM SPEEDS  (removed — each axis has its own duration)
   ============================================================ */

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
(function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ============================================================
   WORK FILTER
   ============================================================ */
(function initWorkFilter() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('.work-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();

/* ============================================================
   WORK MODAL
   ============================================================ */
(function initWorkModal() {
  const modal = $('workModal');
  const overlay = $('workModalOverlay');
  const closeBtn = $('workModalClose');
  const modalImg = $('modalImg');
  const modalTag = $('modalTag');
  const modalTitle = $('modalTitle');
  const modalDesc = $('modalDesc');
  const modalInsight = $('modalInsight');
  const modalLink = $('modalLink');

  $$('.work-card').forEach(card => {
    card.addEventListener('click', e => {
      // Don't open modal if clicking the read button directly
      if (e.target.closest('.work-read-btn')) return;

      const bg = card.querySelector('.work-img-bg');
      const c1 = bg.style.getPropertyValue('--c1');
      const c2 = bg.style.getPropertyValue('--c2');
      modalImg.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      modalTag.textContent = card.querySelector('.work-tag').textContent;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalInsight.textContent = '💡 ' + card.dataset.insight;
      modalLink.href = card.dataset.link || '#';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ============================================================
   SHOWCASE LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const lb = $('lightbox');
  const overlay = $('lightboxOverlay');
  const closeBtn = $('lightboxClose');
  const img = $('lightboxImg');
  const title = $('lightboxTitle');
  const desc = $('lightboxDesc');

  $$('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      const bg = item.querySelector('.masonry-bg');
      const c1 = bg.style.getPropertyValue('--c1');
      const c2 = bg.style.getPropertyValue('--c2');
      img.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      title.textContent = item.dataset.title || '';
      desc.textContent = item.dataset.desc || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ============================================================
   COPY EMAIL
   ============================================================ */
(function initCopyEmail() {
  const btn = $('copyEmailBtn');
  const badge = $('copyBadge');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText('pratyush@email.com').then(() => {
      badge.classList.add('show');
      setTimeout(() => badge.classList.remove('show'), 2000);
    });
  });
  btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') btn.click(); });
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function initForm() {
  const form = $('contactForm');
  const btn = $('submitBtn');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.classList.add('sent');
    setTimeout(() => {
      btn.classList.remove('sent');
      form.reset();
    }, 3000);
  });
})();

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
