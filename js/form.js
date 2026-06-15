/**
 * Form module - handles contact form submission.
 */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    const message = submitBtn?.dataset.success || 'Thank you for reaching out! We will get back to you soon.';
    alert(message);
    this.reset();
  });
}
