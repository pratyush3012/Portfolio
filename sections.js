/* ============================================================
   SECTIONS.JS — About scroll story, Work modal, Gallery, Contact
   ============================================================ */

/* ===== ABOUT — SCROLL STORY ===== */
(function initAboutStory() {
  const section = document.querySelector('.about-story');
  if (!section) return;

  const lines = section.querySelectorAll('.as-line');
  const reveal = document.getElementById('asReveal');
  const totalSteps = lines.length + 1; // lines + final reveal

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const scrolled = -rect.top; // how far we've scrolled into the section
    const progress = Math.max(0, Math.min(1, scrolled / (sectionH - window.innerHeight)));
    const step = Math.floor(progress * totalSteps);

    lines.forEach((line, i) => {
      if (i === step - 1) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    if (step >= totalSteps) {
      reveal.classList.add('active');
      lines.forEach(l => l.classList.remove('active'));
      // Trigger counters once
      if (!reveal.dataset.counted) {
        reveal.dataset.counted = '1';
        reveal.querySelectorAll('.as-num').forEach(el => {
          const target = parseInt(el.dataset.target);
          let cur = 0;
          const step = target / 60;
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(t); }
            el.textContent = Math.floor(cur);
          }, 20);
        });
      }
    } else {
      reveal.classList.remove('active');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== WORK V2 — FILTERS + CASE STUDY MODAL ===== */
(function initWorkV2() {
  // Filter
  const filterBtns = document.querySelectorAll('.wf-btn');
  const cards = document.querySelectorAll('.wv2-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'wv2FadeIn .5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Staggered entrance
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay * 1000);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity .7s ease, transform .7s ease';
    obs.observe(card);
  });

  // 3D tilt
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Modal
  const modal = document.getElementById('csModal');
  const backdrop = document.getElementById('csBackdrop');
  const closeBtn = document.getElementById('csClose');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('csImg').style.background =
        `linear-gradient(135deg, ${getComputedStyle(card.querySelector('.wv2-img')).getPropertyValue('--c1') || '#7c3aed'}, ${getComputedStyle(card.querySelector('.wv2-img')).getPropertyValue('--c2') || '#2563eb'})`;

      // Read colors from inline style
      const imgEl = card.querySelector('.wv2-img');
      const style = imgEl.getAttribute('style') || '';
      const c1 = style.match(/--c1:([^;]+)/)?.[1]?.trim() || '#7c3aed';
      const c2 = style.match(/--c2:([^;]+)/)?.[1]?.trim() || '#2563eb';
      document.getElementById('csImg').style.background = `linear-gradient(135deg, ${c1}, ${c2})`;

      document.getElementById('csCat').textContent = card.dataset.catLabel || '';
      document.getElementById('csTitle').textContent = card.dataset.title || '';
      document.getElementById('csDesc').textContent = card.dataset.desc || '';
      document.getElementById('csI1').textContent = card.dataset.insight1 || '';
      document.getElementById('csI2').textContent = card.dataset.insight2 || '';
      document.getElementById('csLink').href = card.dataset.link || '#';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ===== GALLERY V2 — LIGHTBOX + TILT ===== */
(function initGalleryV2() {
  const items = document.querySelectorAll('.gv2-item');
  const lightbox = document.getElementById('gv2Lightbox');
  const lbBg = document.getElementById('gv2LbBg');
  const lbClose = document.getElementById('gv2LbClose');

  // Staggered entrance
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px) scale(.97)';
    item.style.transition = 'opacity .6s ease, transform .6s ease';
    obs.observe(item);

    // 3D tilt
    item.addEventListener('mousemove', e => {
      const r = item.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      item.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03) translateY(-4px)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });

    // Lightbox
    item.addEventListener('click', () => {
      const c1 = item.dataset.c1 || '#7c3aed';
      const c2 = item.dataset.c2 || '#2563eb';
      document.getElementById('gv2LbImg').style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      document.getElementById('gv2LbTitle').textContent = item.dataset.title || '';
      document.getElementById('gv2LbDesc').textContent = item.dataset.desc || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  if (lbBg) lbBg.addEventListener('click', closeLb);
  if (lbClose) lbClose.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

/* ===== CONTACT V2 ===== */
(function initContactV2() {
  // Click-to-copy email
  const emailLink = document.getElementById('emailCopy');
  if (emailLink) {
    emailLink.addEventListener('click', e => {
      e.preventDefault();
      navigator.clipboard.writeText('prtyushsharma1209@gmail.com').then(() => {
        const hint = emailLink.querySelector('.cv2-copy-hint');
        if (hint) {
          hint.textContent = 'Copied!';
          hint.style.color = '#4ade80';
          setTimeout(() => { hint.textContent = 'Click to copy'; hint.style.color = ''; }, 2000);
        }
      });
    });
  }

  // Cursor glow follow on fields
  document.querySelectorAll('.cv2-field input, .cv2-field textarea').forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.style.setProperty('--glow', '1');
    });
    field.addEventListener('blur', () => {
      field.parentElement.style.setProperty('--glow', '0');
    });
  });

  // Form submit → WhatsApp
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('cv2Submit');
  const successEl = document.getElementById('cv2Success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      const msg = document.getElementById('fmsg').value.trim();
      const text = encodeURIComponent(`Hi Pratyush! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

      if (submitBtn) {
        submitBtn.style.opacity = '.6';
        submitBtn.style.pointerEvents = 'none';
      }
      if (successEl) successEl.classList.add('show');

      setTimeout(() => {
        window.open(`https://wa.me/919599071825?text=${text}`, '_blank');
        if (submitBtn) { submitBtn.style.opacity = ''; submitBtn.style.pointerEvents = ''; }
        setTimeout(() => {
          if (successEl) successEl.classList.remove('show');
          form.reset();
        }, 3000);
      }, 600);
    });
  }

  // Magnetic submit button
  if (submitBtn) {
    submitBtn.addEventListener('mousemove', e => {
      const r = submitBtn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .25;
      const y = (e.clientY - r.top - r.height / 2) * .25;
      submitBtn.style.transform = `translate(${x}px, ${y}px)`;
    });
    submitBtn.addEventListener('mouseleave', () => { submitBtn.style.transform = ''; });
  }
})();

/* ===== CURSOR TEXT MORPH ===== */
(function initCursorMorph() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  document.querySelectorAll('.wv2-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.setAttribute('data-text', 'Open');
      follower.classList.add('cursor-text');
    });
    el.addEventListener('mouseleave', () => {
      follower.removeAttribute('data-text');
      follower.classList.remove('cursor-text');
    });
  });

  document.querySelectorAll('.gv2-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.setAttribute('data-text', 'View');
      follower.classList.add('cursor-text');
    });
    el.addEventListener('mouseleave', () => {
      follower.removeAttribute('data-text');
      follower.classList.remove('cursor-text');
    });
  });
})();
