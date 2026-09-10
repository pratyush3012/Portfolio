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
   HERO — mouse parallax blobs + ambient particles
   ============================================================ */
(function initHeroBlobParallax() {
  const hero = document.querySelector('.hero');
  const layer = $('heroBlobLayer');
  if (!hero || !layer || window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  hero.addEventListener('mousemove', e => {
    const relX = (e.clientX / window.innerWidth - 0.5) * 40;
    const relY = (e.clientY / window.innerHeight - 0.5) * 40;
    layer.style.transform = `translate(${relX}px, ${relY}px)`;
  });
})();

(function initHeroParticles() {
  const container = $('heroParticles');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const COUNT = 18;
  const colors = ['#a78bfa', '#60a5fa', '#f472b6'];
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 2 + Math.random() * 2.5;
    p.style.left = Math.random() * 100 + '%';
    p.style.top = 35 + Math.random() * 60 + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = colors[i % colors.length];
    p.style.boxShadow = `0 0 ${size * 2}px ${colors[i % colors.length]}`;
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
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
   ORBITAL SYSTEM (JS true circle — two rings, sun in the centre)
   ============================================================ */
(function initOrbital() {
  const system = document.querySelector('.orbital-system');
  if (!system) return;
  const cx = system.offsetWidth / 2;
  const cy = system.offsetHeight / 2;

  const rings = [
    { el: system.querySelector('.orbit--inner'), radiusRatio: 0.30, speed: 0.00022, dir: 1 },
    { el: system.querySelector('.orbit--outer'), radiusRatio: 0.48, speed: 0.00011, dir: -1 },
  ]
    .filter(r => r.el)
    .map(r => {
      const nodes = r.el.querySelectorAll('.orbit-node');
      const count = nodes.length;
      const offsets = Array.from({ length: count }, (_, i) => (2 * Math.PI / count) * i);
      return { ...r, nodes, offsets, radius: system.offsetWidth * r.radiusRatio };
    });

  let angle = 0;
  let last = null;
  function tick(ts) {
    if (last !== null) angle += (ts - last);
    last = ts;
    rings.forEach(r => {
      r.nodes.forEach((node, i) => {
        const a = r.dir * angle * r.speed + r.offsets[i];
        node.style.left = (cx + r.radius * Math.cos(a)) + 'px';
        node.style.top  = (cy + r.radius * Math.sin(a)) + 'px';
      });
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ============================================================
   EXPERIENCE DURATION (auto-counts up until marked final)
   ============================================================ */
const EXPERIENCE = {
  startDate: '2026-04-01',
  ongoing: true,
  // When the role ends: set ongoing to false and fill in endDate ('YYYY-MM-DD')
  // to freeze the counter instead of letting it keep counting.
  endDate: null,
};

(function initExperienceDuration() {
  const el = $('expPeriod');
  if (!el) return;

  const start = new Date(EXPERIENCE.startDate);
  const end = EXPERIENCE.ongoing ? new Date() : new Date(EXPERIENCE.endDate);

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  months = Math.max(months, 0);

  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const durationParts = [];
  if (yrs) durationParts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
  if (mos || !yrs) durationParts.push(`${mos} mo${mos !== 1 ? 's' : ''}`);
  const duration = durationParts.join(' ');

  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const startLabel = fmt(start);
  const endLabel = EXPERIENCE.ongoing ? 'Present' : fmt(end);

  el.textContent = `${startLabel} — ${endLabel} · ${duration}`;
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
        const show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => card.classList.remove('fade-out'));
        } else if (!card.classList.contains('hidden')) {
          card.classList.add('fade-out');
          setTimeout(() => card.classList.add('hidden'), 300);
        }
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
  const form  = $('contactForm');
  const btn   = $('sendBtn');
  const label = btn ? btn.querySelector('span') : null;
  if (!form || !label) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = $('fname').value.trim();
    const email   = $('femail').value.trim();
    const message = $('fmsg').value.trim();
    const text = `Hello Pratyush,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
    btn.classList.add('sent');
    label.textContent = '✓ Opening WhatsApp';
    setTimeout(() => {
      btn.classList.remove('sent');
      label.textContent = 'Send Message';
      form.reset();
    }, 2500);
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
  const wrap = document.querySelector('.nav-links-wrap');
  const indicator = $('navIndicator');

  function moveIndicator(link) {
    if (!indicator || !wrap) return;
    if (!link) { indicator.style.opacity = '0'; return; }
    const wrapRect = wrap.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicator.style.left = (linkRect.left - wrapRect.left) + 'px';
    indicator.style.width = linkRect.width + 'px';
    indicator.style.opacity = '1';
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) {
          active.classList.add('active');
          moveIndicator(active);
        } else {
          moveIndicator(null);
        }
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));

  if (indicator) {
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => moveIndicator(link));
      link.addEventListener('mouseleave', () => moveIndicator(document.querySelector('.nav-link.active')));
    });
    window.addEventListener('resize', () => moveIndicator(document.querySelector('.nav-link.active')), { passive: true });
  }
})();

/* ============================================================
   WHY-ME MARQUEE (auto-scroll, pauses on hover, clones for a seamless loop)
   ============================================================ */
(function initWhyMarquee() {
  const wrap  = document.querySelector('.why-track-wrap');
  const track = document.querySelector('.why-track');
  if (!wrap || !track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  Array.from(track.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.remove('reveal-up');
    clone.removeAttribute('data-delay');
    clone.style.opacity = '';
    clone.style.transform = '';
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  wrap.classList.add('auto-scroll');
  track.classList.add('marquee');
})();

/* ============================================================
   BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = $('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.7);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
