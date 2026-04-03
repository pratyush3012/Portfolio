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
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
  $$('a, button, .skill-card, .work-card, .why-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ============================================================
   SCROLL PROGRESS
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
   HERO — staggered reveal
   ============================================================ */
(function initHero() {
  setTimeout(() => {
    $('heroBadge').classList.add('visible');
    setTimeout(() => document.querySelector('.hero-title').classList.add('visible'), 150);
    setTimeout(() => $('heroRole').classList.add('visible'), 350);
    setTimeout(() => document.querySelector('.hero-desc').classList.add('visible'), 500);
    setTimeout(() => $('heroCta').classList.add('visible'), 650);
    setTimeout(() => $('heroImageWrap').classList.add('visible'), 300);
    setTimeout(() => $('heroScroll').classList.add('visible'), 900);
  }, 800);
})();

/* ============================================================
   HERO PARALLAX
   ============================================================ */
(function initHeroParallax() {
  const text = document.querySelector('.hero-text');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight && text) {
          const y = window.scrollY;
          text.style.transform = `translateY(${y * 0.15}px)`;
          text.style.opacity = String(1 - y / (window.innerHeight * 0.8));
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   SCROLL REVEAL
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
   COUNTER ANIMATION (staggered)
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
   TILT EFFECT
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
   ORBITAL SYSTEM (JS true circle)
   ============================================================ */
(function initOrbital() {
  const system = document.querySelector('.orbital-system');
  if (!system) return;
  const nodes = system.querySelectorAll('.orbit-node');
  const count = nodes.length;
  const radius = 170;
  let angle = 0;
  const speed = 0.0004;
  const offsets = Array.from({ length: count }, (_, i) => (2 * Math.PI / count) * i);
  const cx = system.offsetWidth / 2;
  const cy = system.offsetHeight / 2;
  let last = null;
  function tick(ts) {
    if (last !== null) angle += speed * (ts - last);
    last = ts;
    nodes.forEach((node, i) => {
      const a = angle + offsets[i];
      node.style.left = (cx + radius * Math.cos(a)) + 'px';
      node.style.top  = (cy + radius * Math.sin(a)) + 'px';
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

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
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });
})();

/* ============================================================
   CONTACT CARD SPOTLIGHT
   ============================================================ */
(function initContactSpotlight() {
  $$('.contact-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(124,58,237,0.15), rgba(255,255,255,0.03))`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
})();

/* ============================================================
   COPY EMAIL
   ============================================================ */
function copyEmail() {
  navigator.clipboard.writeText('Pratyushsharma1209@gmail.com').then(() => {
    const el = document.getElementById('emailText');
    const orig = el.innerText;
    el.innerText = 'Copied ✓';
    setTimeout(() => { el.innerText = orig; }, 2000);
  });
}

/* ============================================================
   CONTACT FORM → WHATSAPP
   ============================================================ */
(function initForm() {
  const form = $('contactForm');
  const btn  = $('sendBtn');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = $('fname').value.trim();
    const email   = $('femail').value.trim();
    const message = $('fmsg').value.trim();
    const text = `Hello Pratyush,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
    btn.textContent = 'Opening WhatsApp…';
    setTimeout(() => { btn.textContent = 'Send Message'; form.reset(); }, 2500);
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

/* ============================================================
   SECTION ACTIVE NAV HIGHLIGHT
   ============================================================ */
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));
})();

/* ============================================================
   SKILL CARD SPOTLIGHT
   ============================================================ */
(function initSkillSpotlight() {
  $$('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();
