/**
 * ContentLoader - Fetches JSON content and renders all website sections.
 * Each section has a dedicated render method that populates a container
 * identified by a data-section attribute in the HTML.
 */
export class ContentLoader {
  constructor() {
    this.data = {};
  }

  /** Fetch a single JSON file from the content directory */
  async loadJSON(filename) {
    const response = await fetch(`content/${filename}`);
    if (!response.ok) throw new Error(`Failed to load ${filename}: ${response.status}`);
    return response.json();
  }

  /** Load all JSON content files in parallel */
  async loadAll() {
    const [site, hero, about, mission, services, whyUs, process, team, testimonials, contact, footer] =
      await Promise.all([
        this.loadJSON('site.json'),
        this.loadJSON('hero.json'),
        this.loadJSON('about.json'),
        this.loadJSON('mission.json'),
        this.loadJSON('services.json'),
        this.loadJSON('why-us.json'),
        this.loadJSON('process.json'),
        this.loadJSON('team.json'),
        this.loadJSON('testimonials.json'),
        this.loadJSON('contact.json'),
        this.loadJSON('footer.json'),
      ]);

    this.data = { site, hero, about, mission, services, whyUs, process, team, testimonials, contact, footer };
    return this.data;
  }

  /** Render all sections into the DOM */
  renderAll() {
    this.renderNav();
    this.renderHero();
    this.renderAbout();
    this.renderMission();
    this.renderServices();
    this.renderWhyUs();
    this.renderProcess();
    this.renderTestimonials();
    this.renderTeam();
    this.renderCTA();
    this.renderContact();
    this.renderFooter();
  }

  /* ===== NAVIGATION ===== */
  renderNav() {
    const { site } = this.data;
    const logoImg = document.querySelector('.nav-logo img');
    const logoText = document.querySelector('.nav-logo span');
    if (logoImg) logoImg.src = site.brand.logo;
    if (logoText) {
      logoText.innerHTML = `${site.brand.name.replace(site.brand.nameAccent, '')} <span>${site.brand.nameAccent}</span>`;
    }
    // Loader logo
    const loaderLogo = document.querySelector('.loader-logo');
    if (loaderLogo) loaderLogo.src = site.brand.logo;
  }

  /* ===== HERO ===== */
  renderHero() {
    const container = document.querySelector('[data-section="hero"]');
    if (!container) return;
    const { hero } = this.data;
    const hl = hero.headline;

    container.innerHTML = `
      <div class="hero-bg"></div>
      <div class="hero-grid"></div>
      <div class="floating-particles" id="particles"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <i class="${hero.badge.icon}"></i>
          ${hero.badge.text}
        </div>
        <h1>
          ${hl.before}<span class="highlight">${hl.highlight1}</span>${hl.middle}<span class="highlight">${hl.highlight2}</span>
        </h1>
        <p>${hero.description}</p>
        <div class="hero-buttons">
          ${hero.buttons.map(btn => `
            <a href="${btn.link}" class="btn ${btn.style}">
              <i class="${btn.icon}"></i>
              ${btn.label}
            </a>
          `).join('')}
        </div>
        <div class="hero-stats">
          ${hero.stats.map(stat => `
            <div class="stat-item">
              <span class="stat-number" data-target="${stat.target}" data-suffix="${stat.suffix}">0</span>
              <span class="stat-label">${stat.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ===== ABOUT ===== */
  renderAbout() {
    const container = document.querySelector('[data-section="about"]');
    if (!container) return;
    const { about } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${about.header.tag}</span>
        <h2>${about.header.title}</h2>
        <p>${about.header.description}</p>
      </div>
      <div class="about-grid">
        <div class="about-visual">
          <div class="about-image">
            <img src="${about.image.src}" alt="${about.image.alt}" />
          </div>
          <div class="about-card">
            <h4><i class="${about.card.icon}"></i> ${about.card.title}</h4>
            <p>${about.card.text}</p>
          </div>
        </div>
        <div class="about-text">
          <h3>${about.heading}</h3>
          ${about.paragraphs.map(p => `<p>${p}</p>`).join('')}
          <div class="about-features">
            ${about.features.map(f => `
              <div class="about-feature">
                <i class="fas fa-check-circle"></i>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* ===== MISSION / VISION / OBJECTIVE ===== */
  renderMission() {
    const container = document.querySelector('[data-section="mission"]');
    if (!container) return;
    const { mission } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${mission.header.tag}</span>
        <h2>${mission.header.title}</h2>
        <p>${mission.header.description}</p>
      </div>
      <div class="mvo-grid">
        ${mission.cards.map(card => `
          <div class="mvo-card">
            <div class="mvo-icon"><i class="${card.icon}"></i></div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===== SERVICES ===== */
  renderServices() {
    const container = document.querySelector('[data-section="services"]');
    if (!container) return;
    const { services } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${services.header.tag}</span>
        <h2>${services.header.title}</h2>
        <p>${services.header.description}</p>
      </div>
      <div class="services-grid">
        ${services.services.map(svc => `
          <div class="service-card">
            <div class="service-icon"><i class="${svc.icon}"></i></div>
            <h3>${svc.title}</h3>
            <p>${svc.description}</p>
            <ul class="service-list">
              ${svc.items.map(item => `
                <li><i class="fas fa-chevron-right"></i> ${item}</li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===== WHY US ===== */
  renderWhyUs() {
    const container = document.querySelector('[data-section="why-us"]');
    if (!container) return;
    const { whyUs } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${whyUs.header.tag}</span>
        <h2>${whyUs.header.title}</h2>
        <p>${whyUs.header.description}</p>
      </div>
      <div class="why-grid">
        ${whyUs.reasons.map(r => `
          <div class="why-card">
            <div class="why-icon"><i class="${r.icon}"></i></div>
            <h3>${r.title}</h3>
            <p>${r.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===== PROCESS ===== */
  renderProcess() {
    const container = document.querySelector('[data-section="process"]');
    if (!container) return;
    const { process } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${process.header.tag}</span>
        <h2>${process.header.title}</h2>
        <p>${process.header.description}</p>
      </div>
      <div class="process-timeline">
        ${process.steps.map(step => `
          <div class="process-step">
            <div class="step-number">${step.number}</div>
            <h3>${step.title}</h3>
            <p>${step.text}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===== TESTIMONIALS ===== */
  renderTestimonials() {
    const container = document.querySelector('[data-section="testimonials"]');
    if (!container) return;
    const { testimonials } = this.data;

    const renderStars = (count) =>
      Array(count).fill('<i class="fas fa-star"></i>').join('');

    const renderCard = (t) => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${renderStars(t.stars)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initials}</div>
          <div class="testimonial-author-info">
            <h4>${t.author}</h4>
            <span>${t.title}</span>
          </div>
        </div>
      </div>
    `;

    // Duplicate cards for infinite scroll effect
    const allCards = [...testimonials.testimonials, ...testimonials.testimonials]
      .map(renderCard)
      .join('');

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${testimonials.header.tag}</span>
        <h2>${testimonials.header.title}</h2>
        <p>${testimonials.header.description}</p>
      </div>
      <div style="overflow: hidden">
        <div class="testimonials-slider">${allCards}</div>
      </div>
    `;
  }

  /* ===== TEAM ===== */
  renderTeam() {
    const container = document.querySelector('[data-section="team"]');
    if (!container) return;
    const { team } = this.data;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${team.header.tag}</span>
        <h2>${team.header.title}</h2>
        <p>${team.header.description}</p>
      </div>
      <div class="team-grid">
        ${team.members.map(m => `
          <div class="team-card">
            <div class="team-avatar">${m.initials}</div>
            <h3>${m.name}</h3>
            <div class="team-role">${m.role}</div>
            <p>${m.bio}</p>
            <div class="team-social">
              ${m.social.linkedin ? `<a href="${m.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>` : ''}
              ${m.social.twitter ? `<a href="${m.social.twitter}"><i class="fab fa-twitter"></i></a>` : ''}
              ${m.social.instagram ? `<a href="${m.social.instagram}"><i class="fab fa-instagram"></i></a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ===== CTA BANNER ===== */
  renderCTA() {
    const container = document.querySelector('[data-section="cta"]');
    if (!container) return;
    const { footer } = this.data;
    const cta = footer.cta;

    container.innerHTML = `
      <div class="cta-banner">
        <h2>${cta.heading}</h2>
        <p>${cta.description}</p>
        <a href="${cta.button.link}" class="btn btn-primary">
          <i class="${cta.button.icon}"></i>
          ${cta.button.label}
        </a>
      </div>
    `;
  }

  /* ===== CONTACT ===== */
  renderContact() {
    const container = document.querySelector('[data-section="contact"]');
    if (!container) return;
    const { contact } = this.data;

    // Build form fields
    const halfFields = contact.form.fields.filter(f => f.half);
    const fullFields = contact.form.fields.filter(f => !f.half);
    const sel = contact.form.selectField;
    const msg = contact.form.messageField;
    const submit = contact.form.submitButton;

    container.innerHTML = `
      <div class="section-header">
        <span class="section-tag">${contact.header.tag}</span>
        <h2>${contact.header.title}</h2>
        <p>${contact.header.description}</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>${contact.info.heading}</h3>
          <p>${contact.info.description}</p>
          ${contact.info.items.map(item => `
            <div class="contact-item">
              <div class="contact-icon"><i class="${item.icon}"></i></div>
              <div>
                <h4>${item.label}</h4>
                <p>${item.value}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="contact-form">
          <form id="contactForm">
            <div class="form-row">
              ${halfFields.map(f => `
                <div class="form-group">
                  <label>${f.label}</label>
                  <input type="${f.type}" placeholder="${f.placeholder}" ${f.required ? 'required' : ''} />
                </div>
              `).join('')}
            </div>
            ${fullFields.map(f => `
              <div class="form-group">
                <label>${f.label}</label>
                <input type="${f.type}" placeholder="${f.placeholder}" ${f.required ? 'required' : ''} />
              </div>
            `).join('')}
            <div class="form-group">
              <label>${sel.label}</label>
              <select>
                <option>${sel.placeholder}</option>
                ${sel.options.map(opt => `<option>${opt}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>${msg.label}</label>
              <textarea placeholder="${msg.placeholder}"></textarea>
            </div>
            <button type="submit" class="submit-btn" data-success="${contact.form.successMessage}">
              <i class="${submit.icon}"></i>
              ${submit.label}
            </button>
          </form>
        </div>
      </div>
    `;
  }

  /* ===== FOOTER ===== */
  renderFooter() {
    const container = document.querySelector('[data-section="footer"]');
    if (!container) return;
    const { site, footer } = this.data;

    container.innerHTML = `
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="${site.brand.logo}" alt="${site.brand.name} Logo" />
          <p>${footer.brandDescription}</p>
        </div>
        ${footer.columns.map(col => `
          <div class="footer-col">
            <h4>${col.title}</h4>
            <ul>
              ${col.links.map(link => `
                <li><a href="${link.href}">${link.label}</a></li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="footer-bottom">
        <p>${site.copyright}</p>
        <div class="footer-social">
          <a href="${site.social.facebook}"><i class="fab fa-facebook-f"></i></a>
          <a href="${site.social.instagram}"><i class="fab fa-instagram"></i></a>
          <a href="${site.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>
          <a href="${site.social.tiktok}"><i class="fab fa-tiktok"></i></a>
          <a href="${site.social.twitter}"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    `;
  }
}
