/**
 * Navigation module - handles navbar scroll effect, mobile menu toggle,
 * smooth scrolling for anchor links, and scroll-to-top button.
 */

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const scrollTopBtn = document.getElementById('scrollTop');

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
        mobileMenuBtn.focus();
      }
    });
  }

  // Scroll to top button
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
