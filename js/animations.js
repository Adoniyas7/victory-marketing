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
