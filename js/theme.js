/**
 * Theme module - handles light/dark mode switching, system preference detection,
 * and localStorage persistence. The initial theme is set inline in index.html
 * to prevent a flash of the wrong mode on load.
 */

export function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
    updateToggle(theme);
  };

  const updateToggle = (theme) => {
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    if (theme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
  };

  const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  updateToggle(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }
}
