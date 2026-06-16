/**
 * Main entry point - loads all JSON content, renders sections,
 * and initializes interactive features.
 */

import { ContentLoader } from './content-loader.js';
import { initNavigation } from './navigation.js';
import { initStatCounters, initScrollReveal, initServiceCardGlow } from './animations.js';
import { initContactForm } from './form.js';

async function init() {
  const loader = new ContentLoader();

  try {
    // Fetch all JSON content
    await loader.loadAll();

    // Render all sections into the DOM
    loader.renderAll();

    // Initialize interactive features after content is rendered
    initNavigation();
    initStatCounters();
    initScrollReveal();
    initServiceCardGlow();
    initContactForm();
  } catch (error) {
    console.error('Failed to initialize website:', error);
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
