/**
 * Animations module - handles stat counter animation, scroll reveal for cards,
 * and service card mouse glow effect.
 */

/** Animate stat counters when they scroll into view */
export function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => observer.observe(stat));
}

/** Scroll reveal animation for cards and process steps */
export function initScrollReveal() {
  const selectors = '.mvo-card, .service-card, .why-card, .team-card, .process-step, .portfolio-card';
  const elements = document.querySelectorAll(selectors);
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => {
    el.classList.add('reveal');

    if (!prefersReducedMotion) {
      const siblings = Array.from(el.parentElement?.children || []).filter((child) =>
        child.classList.contains('reveal')
      );
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${index * 60}ms`;
    }

    observer.observe(el);
  });
}

/** Mouse-tracking glow effect on service cards */
export function initServiceCardGlow() {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

/** Hero network particle animation on canvas */
export function initHeroParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');
  let animId;

  const resize = () => {
    if (!hero) return;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // Parse accent color from CSS variable
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--accent').trim() || '#f59e0b';
  const r = parseInt(accent.slice(1,3), 16);
  const g = parseInt(accent.slice(3,5), 16);
  const b = parseInt(accent.slice(5,7), 16);

  const PARTICLE_COUNT = 45;
  const CONNECTION_DIST = 130;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1.5,
    });
  }

  let mouse = { x: -1000, y: -1000 };
  const onMouse = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };
  canvas.addEventListener('mousemove', onMouse);
  canvas.addEventListener('mouseleave', onLeave);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.45)`;
      ctx.fill();

      // Connections between particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = 1 - dist / CONNECTION_DIST;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.12})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Connection to mouse
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST * 1.5) {
        const alpha = 1 - dist / (CONNECTION_DIST * 1.5);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    animId = requestAnimationFrame(draw);
  }

  draw();
}
