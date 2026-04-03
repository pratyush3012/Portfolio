/* ============================================================
   UTILITY
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   GSAP — loaded from CDN in HTML
   All GSAP code runs after DOMContentLoaded
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  // Mark body so CSS fallback transitions are disabled when GSAP is present
  if (window.gsap) {
    document.body.classList.add('gsap-active');
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ----------------------------------------------------------
     LOADER
  ---------------------------------------------------------- */
  const loader = $('loader');
  const fill   = $('loaderFill');
  let p = 0;
  const lt = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) {
      p = 100; clearInterval(lt);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        // GSAP page-load: fade entire body up
        if (window.gsap) {
          gsap.from('body', { opacity: 0, duration: 0.6, ease: 'power2.out' });
          runHeroAnimation();
        } else {
          runHeroAnimation();
        }
      }, 350);
    }
    fill.style.width = p + '%';
  }, 60);

  /* ----------------------------------------------------------
     HERO ANIMATION (GSAP timeline)
  ---------------------------------------------------------- */
  function runHeroAnimation() {
    if (window.gsap) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.availability-badge', { opacity: 0, y: 16, duration: 0.6 })
        .from('.hero-title',         { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
        .from('#heroRole',           { opacity: 0, y: 16, duration: 0.5 }, '-=0.4')
        .from('.hero-desc',          { opacity: 0, duration: 0.5 },        '-=0.3')
        .from('.hero-buttons',       { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
        .from('#heroImageWrap',      { opacity: 0, x: 40, duration: 0.8 }, '-=0.6')
        .from('#heroScroll',         { opacity: 0, duration: 0.5 },        '-=0.2');

      // floating animation on hero image
      gsap.to('#heroImageWrap img', {
        y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1
      });

      // animated gradient blobs
      gsap.to('.hero-blob', {
        scale: 1.15, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1
      });
      gsap.to('.hero-blob--2', {
        scale: 1.2, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2
      });
    } else {
      // fallback: add visible classes
      $$('.availability-badge, .hero-title, #heroRole, .hero-desc, .hero-buttons, #heroImageWrap, #heroScroll')
        .forEach(el => el.classList.add('visible'));
    }
  }

  /* ----------------------------------------------------------
     CUSTOM CURSOR
  ---------------------------------------------------------- */
  const dot  = $('cursor');
  const ring = $('cursorFollower');
  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      dot.style.left  = e.clientX + 'px';
      dot.style.top   = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    });
    $$('a, button, .skill-card, .work-card, .why-card, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ----------------------------------------------------------
     SCROLL PROGRESS
  ---------------------------------------------------------- */
  const bar = $('scrollProgress');
  let spTick = false;
  window.addEventListener('scroll', () => {
    if (!spTick) {
      requestAnimationFrame(() => {
        if (bar) bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
        spTick = false;
      });
      spTick = true;
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     NAVBAR
  ---------------------------------------------------------- */
  const nav       = $('navbar');
  const hamburger = $('hamburger');
  const menu      = $('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
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

  /* ----------------------------------------------------------
     SCROLL REVEAL — GSAP + ScrollTrigger OR IntersectionObserver
  ---------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {

    // Generic section reveals
    $$('.reveal-up').forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        opacity: 0, y: 40, duration: 0.7, delay, ease: 'power3.out'
      });
    });
    $$('.reveal-right').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        opacity: 0, x: 50, duration: 0.8, ease: 'power3.out'
      });
    });

    // Stagger skill cards
    gsap.from('.skill-card', {
      scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', once: true },
      opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out'
    });

    // Stagger work cards
    gsap.from('.work-card', {
      scrollTrigger: { trigger: '.work-grid', start: 'top 80%', once: true },
      opacity: 0, y: 40, stagger: 0.12, duration: 0.65, ease: 'power3.out'
    });

    // Stats counter trigger
    ScrollTrigger.create({
      trigger: '.about-stats',
      start: 'top 80%',
      once: true,
      onEnter: runCounters
    });

    // Why cards stagger
    gsap.from('.why-card', {
      scrollTrigger: { trigger: '.why-track', start: 'top 85%', once: true },
      opacity: 0, x: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out'
    });

    // Contact section
    gsap.from('.contact-left', {
      scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%', once: true },
      opacity: 0, x: -40, duration: 0.7, ease: 'power3.out'
    });
    gsap.from('.contact-right', {
      scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%', once: true },
      opacity: 0, x: 40, duration: 0.7, delay: 0.15, ease: 'power3.out'
    });

    // Hero parallax via ScrollTrigger
    gsap.to('.hero-text', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      y: 80, opacity: 0
    });

  } else {
    // Fallback IntersectionObserver
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal-up, .reveal-right').forEach(el => obs.observe(el));

    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runCounters(); statsObs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    const stats = document.querySelector('.about-stats');
    if (stats) statsObs.observe(stats);
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATION
  ---------------------------------------------------------- */
  function runCounters() {
    $$('.stat-num').forEach((el, i) => {
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
  }

  /* ----------------------------------------------------------
     TILT EFFECT
  ---------------------------------------------------------- */
  if (!window.matchMedia('(hover: none)').matches) {
    $$('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (window.gsap) {
          gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, translateY: -6,
            duration: 0.4, ease: 'power2.out', transformPerspective: 700 });
        } else {
          card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        }
      });
      card.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(card, { rotateY: 0, rotateX: 0, translateY: 0, duration: 0.5, ease: 'power2.out' });
        } else {
          card.style.transform = '';
        }
      });
    });
  }

  /* ----------------------------------------------------------
     MAGNETIC BUTTONS
  ---------------------------------------------------------- */
  if (!window.matchMedia('(hover: none)').matches) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        if (window.gsap) {
          gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        } else {
          btn.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        } else {
          btn.style.transform = '';
        }
      });
    });
  }

  /* ----------------------------------------------------------
     ORBITAL SYSTEM (JS true circle)
  ---------------------------------------------------------- */
  const system = document.querySelector('.orbital-system');
  if (system) {
    const nodes  = system.querySelectorAll('.orbit-node');
    const count  = nodes.length;
    const radius = 170;
    let angle    = 0;
    const speed  = 0.0004;
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
  }

  /* ----------------------------------------------------------
     WORK FILTER
  ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     CONTACT CARD SPOTLIGHT
  ---------------------------------------------------------- */
  $$('.contact-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(124,58,237,0.15), rgba(255,255,255,0.03))`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });

  /* ----------------------------------------------------------
     SKILL CARD SPOTLIGHT
  ---------------------------------------------------------- */
  $$('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ----------------------------------------------------------
     ACTIVE NAV HIGHLIGHT
  ---------------------------------------------------------- */
  const navLinks = $$('.nav-link');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  $$('section[id]').forEach(s => sectionObs.observe(s));

  /* ----------------------------------------------------------
     COPY EMAIL
  ---------------------------------------------------------- */
  window.copyEmail = function() {
    navigator.clipboard.writeText('Pratyushsharma1209@gmail.com').then(() => {
      const el = document.getElementById('emailText');
      const orig = el.innerText;
      el.innerText = 'Copied ✓';
      setTimeout(() => { el.innerText = orig; }, 2000);
    });
  };

  /* ----------------------------------------------------------
     CONTACT FORM → WHATSAPP
  ---------------------------------------------------------- */
  const form = $('contactForm');
  const sendBtn = $('sendBtn');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name    = $('fname').value.trim();
      const email   = $('femail').value.trim();
      const message = $('fmsg').value.trim();
      const text = `Hello Pratyush,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
      window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
      sendBtn.textContent = 'Opening WhatsApp…';
      setTimeout(() => { sendBtn.textContent = 'Send Message'; form.reset(); }, 2500);
    });
  }

  /* ----------------------------------------------------------
     SMOOTH SCROLL
  ---------------------------------------------------------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

}); // end DOMContentLoaded
