/**
 * Main entry point - loads all JSON content, renders sections,
 * and initializes interactive features.
 */

import { ContentLoader } from './content-loader.js';
import { initNavigation } from './navigation.js';
import { initParticles, initStatCounters, initScrollReveal, initServiceCardGlow } from './animations.js';
import { initContactForm } from './form.js';

async function init() {
  const loader = new ContentLoader();

  try {
    // Fetch all JSON content
    await loader.loadAll();

    // Render all sections into the DOM
    loader.renderAll();

    // Initialize interactive features after content is rendered
    initParticles();
    initNavigation();
    initStatCounters();
    initScrollReveal();
    initServiceCardGlow();
    initContactForm();
  } catch (error) {
    console.error('Failed to initialize website:', error);
  } finally {
    // Hide the loader
    setTimeout(() => {
      const loaderEl = document.getElementById('loader');
      if (loaderEl) loaderEl.classList.add('hidden');
    }, 500);
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
