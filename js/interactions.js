/**
 * Interactions module - adds subtle, high-end micro-interactions.
 * Currently handles a magnetic hover effect on key interactive elements.
 */

export function initMagneticButtons() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (prefersReducedMotion || isTouch) return;

  const selectors = '.btn, .theme-toggle, .scroll-top, .mobile-menu-btn';
  const buttons = document.querySelectorAll(selectors);
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    let rafId = null;

    const move = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const max = 10;
      const mx = (x / rect.width) * max;
      const my = (y / rect.height) * max;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        btn.style.setProperty('--mx', mx.toFixed(2));
        btn.style.setProperty('--my', my.toFixed(2));
      });
    };

    const reset = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        btn.style.setProperty('--mx', 0);
        btn.style.setProperty('--my', 0);
      });
    };

    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', reset);
  });
}
