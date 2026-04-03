/* ===== LOADER ===== */
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
  loaderFill.style.width = progress + '%';
}, 80);

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  setTimeout(() => {
    follower.style.left = mouseX + 'px';
    follower.style.top = mouseY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-card, .work-card, .masonry-item, .why-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ===== SCROLL PROGRESS ===== */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = pct + '%';
});

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
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

/* ===== PARTICLE CANVAS ===== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    const colors = ['124,58,237', '37,99,235', '236,72,153'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== TYPED TEXT ===== */
const phrases = [
  'I craft engaging content, visuals, and digital experiences.',
  'I turn ideas into stories that people actually remember.',
  'I build brands that feel real, bold, and unforgettable.'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeEffect, 500); return; }
    setTimeout(typeEffect, 40);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
    setTimeout(typeEffect, 60);
  }
}
setTimeout(typeEffect, 1500);

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ===== TILT EFFECT ===== */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');

document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    const placeholder = item.querySelector('.masonry-placeholder');
    const bg = getComputedStyle(placeholder).background;
    lightboxImg.style.background = bg;
    lightboxTitle.textContent = item.dataset.title || 'Creative Work';
    lightboxDesc.textContent = item.dataset.desc || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sent ✓';
  btn.style.background = 'linear-gradient(135deg, #059669, #0891b2)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

/* ===== PARALLAX HERO ===== */
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroGlow = document.querySelector('.hero-bg-glow');
  if (heroContent && window.scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    heroContent.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.8);
    if (heroGlow) heroGlow.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
  }
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
