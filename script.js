/* ===== LOADER ===== */
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderPct = document.getElementById('loaderPct');
let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 12 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => loader.classList.add('done'), 300);
  }
  if (loaderFill) loaderFill.style.width = progress + '%';
  if (loaderPct) loaderPct.textContent = Math.floor(progress) + '%';
}, 55);

/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  setTimeout(() => { follower.style.left = mx + 'px'; follower.style.top = my + 'px'; }, 90);
});
document.querySelectorAll('a,button,.skill-card,.work-card,.masonry-item,.why-card,.clink').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ===== SCROLL PROGRESS ===== */
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = pct + '%';
});

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px,4.5px)';
    spans[1].style.opacity = '0'; spans[1].style.transform = 'scaleX(0)';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px,-4.5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); particles = []; initParticles(); });

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : (Math.random() > .5 ? -5 : canvas.height + 5);
    this.size = Math.random() * 1.2 + 0.2;
    this.speedX = (Math.random() - .5) * .35;
    this.speedY = (Math.random() - .5) * .35;
    this.opacity = Math.random() * .4 + .05;
    this.color = ['124,58,237','37,99,235','236,72,153','167,139,250'][Math.floor(Math.random()*4)];
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < -10 || this.x > canvas.width+10 || this.y < -10 || this.y > canvas.height+10) this.reset(false);
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`; ctx.fill();
  }
}
function initParticles() { for (let i = 0; i < 130; i++) particles.push(new Particle()); }
initParticles();
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i+1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 90) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${.07*(1-d/90)})`; ctx.lineWidth = .5; ctx.stroke();
      }
    }
  }
}
(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
})();

/* ===== TYPED TEXT ===== */
const phrases = [
  'I craft engaging content, visuals, and digital experiences.',
  'I turn ideas into stories that people actually remember.',
  'I build brands that feel real, bold, and unforgettable.'
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type() {
  const cur = phrases[pIdx];
  if (deleting) {
    typedEl.textContent = cur.substring(0, cIdx--);
    if (cIdx < 0) { deleting = false; pIdx = (pIdx+1) % phrases.length; setTimeout(type, 400); return; }
    setTimeout(type, 35);
  } else {
    typedEl.textContent = cur.substring(0, cIdx++);
    if (cIdx > cur.length) { deleting = true; setTimeout(type, 2200); return; }
    setTimeout(type, 55);
  }
}
setTimeout(type, 1800);

/* ===== SCROLL REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal-up,.reveal-right').forEach(el => revealObs.observe(el));

/* ===== SKILL BARS ===== */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sk-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 100 + 300);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const sg = document.querySelector('.skills-grid');
if (sg) skillObs.observe(sg);

/* ===== COUNTERS ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let cur = 0; const step = target / 55;
  const t = setInterval(() => {
    cur += step; if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = Math.floor(cur);
  }, 22);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObs.observe(statsEl);

/* ===== TILT ===== */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ===== ABOUT CARD TILT ===== */
const aboutCard = document.getElementById('aboutCard');
if (aboutCard) {
  aboutCard.addEventListener('mousemove', e => {
    const r = aboutCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    aboutCard.style.transform = `perspective(1000px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`;
  });
  aboutCard.addEventListener('mouseleave', () => { aboutCard.style.transform = ''; });
}

/* ===== MAGNETIC ===== */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .28;
    const y = (e.clientY - r.top - r.height/2) * .28;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('lbImg').style.background = `linear-gradient(135deg,${item.dataset.c1},${item.dataset.c2})`;
    document.getElementById('lbTitle').textContent = item.dataset.title || '';
    document.getElementById('lbDesc').textContent = item.dataset.desc || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeLb() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('lbOverlay').addEventListener('click', closeLb);
document.getElementById('lbClose').addEventListener('click', closeLb);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ===== WHATSAPP FORM ===== */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  const text = encodeURIComponent(`Hi Pratyush! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
});

/* ===== PARALLAX ===== */
window.addEventListener('scroll', () => {
  const hc = document.querySelector('.hero-content');
  if (hc && window.scrollY < window.innerHeight) {
    const r = window.scrollY / window.innerHeight;
    hc.style.transform = `translateY(${window.scrollY * .28}px)`;
    hc.style.opacity = Math.max(0, 1 - r * 1.4);
  }
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
