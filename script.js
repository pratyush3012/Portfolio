/* ═══════════════════════════════════════
   LOADER
═══════════════════════════════════════ */
const loader = document.getElementById('loader');
const ldFill = document.getElementById('ldFill');
const ldPct  = document.getElementById('ldPct');
let prog = 0;
const ldInt = setInterval(() => {
  prog += Math.random() * 14 + 4;
  if (prog >= 100) {
    prog = 100;
    clearInterval(ldInt);
    setTimeout(() => {
      loader.classList.add('out');
      initHeroAnim();
    }, 300);
  }
  ldFill.style.width = prog + '%';
  ldPct.textContent  = Math.floor(prog) + '%';
}, 55);

/* ═══════════════════════════════════════
   CURSOR
═══════════════════════════════════════ */
const cur  = document.getElementById('cur');
const curF = document.getElementById('curF');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  setTimeout(() => { curF.style.left = mx + 'px'; curF.style.top = my + 'px'; }, 90);
});
function addHover(sel, label) {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('ch');
      if (label) curF.setAttribute('data-label', label);
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('ch');
      curF.removeAttribute('data-label');
    });
  });
}
addHover('a, button, .ct-link, .why-card, .sk-card', '');
addHover('.wk-card', 'Open');
addHover('.sh-item', 'View');

/* ═══════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════ */
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';
}, { passive: true });

/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('sc', window.scrollY > 60), { passive: true });

const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');
burger.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('on');
  const [s1,s2,s3] = burger.querySelectorAll('span');
  if (open) {
    s1.style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
    s2.style.opacity = '0'; s2.style.transform = 'scaleX(0)';
    s3.style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
  } else {
    [s1,s2,s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
  mobMenu.classList.remove('on');
  [burger.querySelectorAll('span')].flat().forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ═══════════════════════════════════════
   HERO CANVAS — PARTICLES
═══════════════════════════════════════ */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); particles = []; initP(); });

class P {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : (Math.random() > .5 ? -5 : canvas.height + 5);
    this.r = Math.random() * 1.2 + .2;
    this.vx = (Math.random() - .5) * .35;
    this.vy = (Math.random() - .5) * .35;
    this.a = Math.random() * .4 + .05;
    this.c = ['124,58,237','37,99,235','236,72,153','167,139,250'][Math.floor(Math.random()*4)];
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < -10 || this.x > canvas.width+10 || this.y < -10 || this.y > canvas.height+10) this.reset(false);
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill();
  }
}
function initP() { for (let i = 0; i < 130; i++) particles.push(new P()); }
initP();
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 90) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${.07*(1-d/90)})`; ctx.lineWidth = .5; ctx.stroke();
      }
    }
  }
}
(function animP() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animP);
})();

/* ═══════════════════════════════════════
   HERO ENTRANCE ANIMATION
═══════════════════════════════════════ */
function initHeroAnim() {
  const badge = document.getElementById('heroBadge');
  const hn1   = document.getElementById('hn1');
  const hn2   = document.getElementById('hn2');
  const role  = document.querySelector('.hero-role');
  const tag   = document.querySelector('.hero-tag');
  const cta   = document.querySelector('.hero-cta');
  const scr   = document.querySelector('.hero-scroll');

  setTimeout(() => badge.classList.add('in'), 100);
  setTimeout(() => hn1.classList.add('in'), 300);
  setTimeout(() => hn2.classList.add('in'), 450);
  setTimeout(() => role.classList.add('in'), 600);
  setTimeout(() => { tag.classList.add('in'); startTyping(); }, 750);
  setTimeout(() => cta.classList.add('in'), 900);
  setTimeout(() => scr.classList.add('in'), 1050);
}

/* ═══════════════════════════════════════
   ROTATING TEXT
═══════════════════════════════════════ */
const phrases = [
  'I create attention.',
  'I design engagement.',
  'I build digital experiences.',
  'I craft stories that land.'
];
let pi = 0, ci = 0, del = false;
const rotEl = document.getElementById('rotText');
function startTyping() {
  function type() {
    const cur = phrases[pi];
    if (del) {
      rotEl.textContent = cur.substring(0, ci--);
      if (ci < 0) { del = false; pi = (pi+1) % phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, 35);
    } else {
      rotEl.textContent = cur.substring(0, ci++);
      if (ci > cur.length) { del = true; setTimeout(type, 2200); return; }
      setTimeout(type, 55);
    }
  }
  type();
}

/* ═══════════════════════════════════════
   HERO PARALLAX
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const hi = document.querySelector('.hero-inner');
  if (hi && window.scrollY < window.innerHeight) {
    const r = window.scrollY / window.innerHeight;
    hi.style.transform = `translateY(${window.scrollY * .28}px)`;
    hi.style.opacity   = Math.max(0, 1 - r * 1.5);
  }
}, { passive: true });

/* ═══════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════ */
document.querySelectorAll('.mag').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .28;
    const y = (e.clientY - r.top  - r.height/2) * .28;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const d = parseFloat(entry.target.dataset.d || 0);
      setTimeout(() => entry.target.classList.add('in'), d * 1000);
      rvObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* ═══════════════════════════════════════
   SKILL BARS
═══════════════════════════════════════ */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sk-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 100 + 300);
      });
      skObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const skGrid = document.querySelector('.sk-grid');
if (skGrid) skObs.observe(skGrid);

/* SKILL TILT */
document.querySelectorAll('.sk-card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    c.style.transform = `perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
  });
  c.addEventListener('mouseleave', () => { c.style.transform = ''; });
});

/* ═══════════════════════════════════════
   ABOUT SCROLL STORY
═══════════════════════════════════════ */
(function() {
  const section = document.querySelector('.about-story');
  if (!section) return;
  const lines   = section.querySelectorAll('.as-line');
  const final   = document.getElementById('asFinal');
  const total   = lines.length + 1;

  function tick() {
    const rect     = section.getBoundingClientRect();
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (section.offsetHeight - window.innerHeight)));
    const step     = Math.floor(progress * total);

    lines.forEach((l, i) => l.classList.toggle('on', i === step - 1));

    if (step >= total) {
      final.classList.add('on');
      lines.forEach(l => l.classList.remove('on'));
      if (!final.dataset.counted) {
        final.dataset.counted = '1';
        final.querySelectorAll('.asn').forEach(el => {
          const t = parseInt(el.dataset.t), step = t / 60;
          let c = 0;
          const iv = setInterval(() => {
            c += step; if (c >= t) { c = t; clearInterval(iv); }
            el.textContent = Math.floor(c);
          }, 20);
        });
      }
    } else {
      final.classList.remove('on');
    }
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

/* ═══════════════════════════════════════
   WORK — FILTERS + TILT + MODAL
═══════════════════════════════════════ */
(function() {
  // Filters
  document.querySelectorAll('.wf').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wf').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.f;
      document.querySelectorAll('.wk-card').forEach(c => {
        c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });

  // Entrance
  const wkObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const d = parseFloat(entry.target.dataset.d || 0);
        setTimeout(() => { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)'; }, d*1000);
        wkObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.wk-card').forEach(c => {
    c.style.opacity = '0'; c.style.transform = 'translateY(40px)';
    c.style.transition = 'opacity .7s ease, transform .7s ease';
    wkObs.observe(c);
  });

  // Tilt
  document.querySelectorAll('.wk-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      c.style.transform = `perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-8px) scale(1.01)`;
    });
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });

  // Modal
  const modal = document.getElementById('csModal');
  const csBg  = document.getElementById('csBg');
  const csClose = document.getElementById('csClose');

  document.querySelectorAll('.wk-card').forEach(c => {
    c.addEventListener('click', () => {
      const style = c.querySelector('.wk-img').getAttribute('style') || '';
      const c1 = style.match(/--c1:([^;]+)/)?.[1]?.trim() || '#7c3aed';
      const c2 = style.match(/--c2:([^;]+)/)?.[1]?.trim() || '#2563eb';
      document.getElementById('csImg').style.background = `linear-gradient(135deg,${c1},${c2})`;
      document.getElementById('csCat').textContent   = c.dataset.clabel || '';
      document.getElementById('csTitle').textContent = c.dataset.title  || '';
      document.getElementById('csDesc').textContent  = c.dataset.desc   || '';
      document.getElementById('csI1').textContent    = c.dataset.i1     || '';
      document.getElementById('csI2').textContent    = c.dataset.i2     || '';
      document.getElementById('csLink').href         = c.dataset.link   || '#';
      modal.classList.add('on');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() { modal.classList.remove('on'); document.body.style.overflow = ''; }
  csBg.addEventListener('click', closeModal);
  csClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ═══════════════════════════════════════
   SHOWCASE — TILT + LIGHTBOX
═══════════════════════════════════════ */
(function() {
  const lb      = document.getElementById('shLb');
  const lbBg    = document.getElementById('shLbBg');
  const lbClose = document.getElementById('shLbClose');

  const shObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0) scale(1)'; }, i*80);
        shObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.sh-item').forEach(item => {
    item.style.opacity = '0'; item.style.transform = 'translateY(30px) scale(.97)';
    item.style.transition = 'opacity .6s ease, transform .6s ease';
    shObs.observe(item);

    item.addEventListener('mousemove', e => {
      const r = item.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      item.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.03) translateY(-4px)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });

    item.addEventListener('click', () => {
      document.getElementById('shLbImg').style.background = `linear-gradient(135deg,${item.dataset.c1},${item.dataset.c2})`;
      document.getElementById('shLbTitle').textContent = item.dataset.title || '';
      document.getElementById('shLbDesc').textContent  = item.dataset.desc  || '';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; }
  lbBg.addEventListener('click', closeLb);
  lbClose.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

/* ═══════════════════════════════════════
   CONTACT
═══════════════════════════════════════ */
(function() {
  // Copy email
  const emailEl = document.getElementById('emailCopy');
  const hint    = document.getElementById('copyHint');
  if (emailEl) {
    emailEl.addEventListener('click', () => {
      navigator.clipboard.writeText('prtyushsharma1209@gmail.com').then(() => {
        hint.textContent = 'Copied! ✓';
        hint.style.color = '#4ade80';
        setTimeout(() => { hint.textContent = 'Click to copy'; hint.style.color = ''; }, 2000);
      });
    });
  }

  // Form → WhatsApp
  const form   = document.getElementById('ctForm');
  const ctBtn  = document.getElementById('ctBtn');
  const ctOk   = document.getElementById('ctOk');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = document.getElementById('fn').value.trim();
      const email = document.getElementById('fe').value.trim();
      const msg   = document.getElementById('fm').value.trim();
      const text  = encodeURIComponent(`Hi Pratyush! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      ctBtn.style.opacity = '.5'; ctBtn.style.pointerEvents = 'none';
      ctOk.classList.add('on');
      setTimeout(() => {
        window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
        ctBtn.style.opacity = ''; ctBtn.style.pointerEvents = '';
        setTimeout(() => { ctOk.classList.remove('on'); form.reset(); }, 3000);
      }, 600);
    });
  }
})();
