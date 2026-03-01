(() => {
  const C = SITE_CONFIG;

  // ── Helpers ──
  const $ = (sel) => document.querySelector(sel);
  const h = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    }
    children.forEach(c => {
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else if (c) el.appendChild(c);
    });
    return el;
  };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const stars = (n) => '⭐'.repeat(n);

  // ── Tracking Pixels ──
  function initTracking() {
    const t = C.tracking;
    if (!t) return;

    // Facebook Pixel
    if (t.facebookPixelId) {
      !function(f,b,e,v,n,t2,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t2=b.createElement(e);t2.async=!0;
      t2.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t2,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', t.facebookPixelId);
      fbq('track', 'PageView');
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1; img.width = 1; img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${t.facebookPixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    }

    // Google Analytics (gtag.js)
    if (t.googleAnalyticsId) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${t.googleAnalyticsId}`;
      document.head.appendChild(gtagScript);
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', t.googleAnalyticsId);
    }

    // Google Tag Manager
    if (t.googleTagManagerId) {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',t.googleTagManagerId);
    }

    // Hotjar
    if (t.hotjarId) {
      (function(h2,o,t2,j,a,r){
        h2.hj=h2.hj||function(){(h2.hj.q=h2.hj.q||[]).push(arguments)};
        h2._hjSettings={hjid:t.hotjarId,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src='https://static.hotjar.com/c/hotjar-'+h2._hjSettings.hjid+'.js?sv='+h2._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document);
    }

    // Custom head script
    if (t.customHeadScript) {
      const div = document.createElement('div');
      div.innerHTML = t.customHeadScript;
      Array.from(div.children).forEach(child => {
        if (child.tagName === 'SCRIPT') {
          const s = document.createElement('script');
          if (child.src) { s.src = child.src; s.async = true; }
          else s.textContent = child.textContent;
          document.head.appendChild(s);
        } else {
          document.head.appendChild(child);
        }
      });
    }
  }

  // Helper: track custom events (call from anywhere)
  window.trackEvent = function(eventName, params) {
    if (window.fbq) fbq('track', eventName, params);
    if (window.gtag) gtag('event', eventName, params);
    if (window.hj) hj('event', eventName);
  };

  // ── Apply colors as CSS custom properties ──
  function applyTheme() {
    const root = document.documentElement.style;
    const map = {
      primary: '--primary', primaryDark: '--primary-dark', primaryLight: '--primary-light',
      accent: '--accent', accentDark: '--accent-dark', accentLight: '--accent-light',
      surface: '--surface', surfaceWhite: '--surface-white',
      text: '--text', textSecondary: '--text-secondary', textMuted: '--text-muted',
      border: '--border', success: '--success', error: '--error',
    };
    for (const [key, prop] of Object.entries(map)) {
      if (C.colors[key]) root.setProperty(prop, C.colors[key]);
    }
    if (C.font?.family) root.setProperty('--font', C.font.family);
  }

  // ── Meta & Fonts ──
  function renderMeta() {
    document.title = `${C.brand.name} — ${C.brand.tagline}`;
    $('#metaDesc')?.setAttribute('content', C.brand.description);
    if (C.font?.googleFontsUrl) $('#fontLink')?.setAttribute('href', C.font.googleFontsUrl);
  }

  // ── Logo helper ──
  function logoHTML() {
    return `<span class="logo-icon">${C.brand.logoIcon}</span><span class="logo-text">${esc(C.brand.name)}</span>`;
  }

  // ── Navbar ──
  function renderNav() {
    $('#navLogo').innerHTML = logoHTML();
    const ul = $('#navLinks');
    ul.innerHTML = '';
    C.nav.links.forEach(l => {
      const li = h('li', {}, h('a', { href: l.href, text: l.text }));
      ul.appendChild(li);
    });
    const ctaLi = h('li', {},
      h('a', { href: C.nav.ctaHref, class: 'btn btn-accent btn-sm', text: C.nav.ctaText })
    );
    ul.appendChild(ctaLi);
  }

  // ── Hero ──
  function renderHero() {
    $('#heroBadge').textContent = C.hero.badge;
    $('#heroTitle').innerHTML = `${esc(C.hero.titleLine1)}<br/><span class="text-accent">${esc(C.hero.titleLine2)}</span>`;
    $('#heroSubtitle').textContent = C.hero.subtitle;

    const actions = $('#heroActions');
    actions.innerHTML = '';
    actions.appendChild(h('a', { href: C.hero.ctaPrimary.link, class: 'btn btn-accent btn-lg', text: C.hero.ctaPrimary.text }));
    actions.appendChild(h('a', { href: C.hero.ctaSecondary.link, class: 'btn btn-outline btn-lg', text: C.hero.ctaSecondary.text }));

    const statsEl = $('#heroStats');
    statsEl.innerHTML = '';
    C.hero.stats.forEach((s, i) => {
      if (i > 0) statsEl.appendChild(h('div', { class: 'stat-divider' }));
      const stat = h('div', { class: 'stat' },
        h('span', { class: 'stat-number', text: s.value }),
        h('span', { class: 'stat-label', text: s.label })
      );
      statsEl.appendChild(stat);
    });

    if (C.images.heroBackground) {
      $('#hero').style.background = `url('${C.images.heroBackground}') center/cover no-repeat`;
    }

    // Phone mockup
    const phone = $('#heroPhone');
    phone.innerHTML = '';
    const header = h('div', { class: 'phone-header' },
      h('span', { class: 'phone-greeting', text: C.phoneMockup.greeting }),
      h('span', { class: 'phone-app', text: C.brand.name })
    );
    phone.appendChild(header);
    C.phoneMockup.products.forEach(p => {
      phone.appendChild(h('div', { class: 'phone-card' },
        h('div', { class: 'phone-card-icon', text: p.icon }),
        h('div', { class: 'phone-card-text' },
          h('strong', { text: p.name }),
          h('span', { text: p.detail })
        )
      ));
    });
    phone.appendChild(h('div', { class: 'phone-btn', text: C.phoneMockup.orderButton }));

    // Floating emojis
    const floats = $('#heroFloats');
    floats.innerHTML = '';
    C.hero.floatingEmojis.forEach((emoji, i) => {
      floats.appendChild(h('div', { class: `hero-float hero-float-${i + 1}`, text: emoji }));
    });
  }

  // ── Social Proof ──
  function renderSocialProof() {
    $('#proofHeadline').textContent = C.socialProof.headline;
    const container = $('#proofItems');
    container.innerHTML = '';
    C.socialProof.items.forEach(item => {
      container.appendChild(h('div', { class: 'proof-item' },
        h('span', { class: 'proof-icon', text: item.icon }),
        h('span', { text: item.text })
      ));
    });
  }

  // ── Section header helper ──
  function sectionHeader(parentId, tag, title, desc) {
    const el = $(`#${parentId}`);
    el.innerHTML = '';
    el.appendChild(h('p', { class: 'section-tag', text: tag }));
    el.appendChild(h('h2', { class: 'section-title', text: title }));
    if (desc) el.appendChild(h('p', { class: 'section-desc', text: desc }));
  }

  // ── How It Works ──
  function renderHowItWorks() {
    const hiw = C.howItWorks;
    sectionHeader('hiwHeader', hiw.tag, hiw.title, hiw.description);
    const grid = $('#stepsGrid');
    grid.innerHTML = '';
    hiw.steps.forEach((step, i) => {
      if (i > 0) {
        const connector = h('div', { class: 'step-connector' });
        connector.innerHTML = '<svg width="60" height="24" viewBox="0 0 60 24"><path d="M0 12H50M50 12L40 4M50 12L40 20" stroke="' + C.colors.accent + '" stroke-width="2" fill="none"/></svg>';
        grid.appendChild(connector);
      }
      const card = h('div', { class: 'step-card', 'data-step': String(i + 1) },
        h('div', { class: 'step-number', text: String(i + 1).padStart(2, '0') }),
        h('div', { class: 'step-icon', text: step.icon }),
        h('h3', { text: step.title }),
        h('p', { text: step.desc })
      );
      grid.appendChild(card);
    });
  }

  // ── Features ──
  function renderFeatures() {
    const f = C.features;
    sectionHeader('featuresHeader', f.tag, f.title, f.description);
    const grid = $('#featuresGrid');
    grid.innerHTML = '';
    f.items.forEach(item => {
      grid.appendChild(h('div', { class: 'feature-card' },
        h('div', { class: 'feature-icon', text: item.icon }),
        h('h3', { text: item.title }),
        h('p', { text: item.desc })
      ));
    });
  }

  // ── Pricing ──
  function renderPricing() {
    const p = C.pricing;
    sectionHeader('pricingHeader', p.tag, p.title, p.description);

    const grid = $('#pricingGrid');
    grid.innerHTML = '';
    p.plans.forEach(plan => {
      const card = h('div', { class: `pricing-card${plan.featured ? ' pricing-featured' : ''}` });
      if (plan.badge) card.appendChild(h('div', { class: 'pricing-badge', text: plan.badge }));
      card.appendChild(h('div', { class: 'pricing-header' },
        h('h3', { text: plan.name }),
        h('p', { class: 'pricing-desc', text: plan.desc })
      ));
      card.appendChild(h('div', { class: 'pricing-amount' },
        h('span', { class: 'price', text: plan.price }),
        h('span', { class: 'price-unit', text: plan.unit })
      ));
      const ul = h('ul', { class: 'pricing-features' });
      plan.features.forEach(f => ul.appendChild(h('li', { text: `✓ ${f}` })));
      card.appendChild(ul);
      card.appendChild(h('a', {
        href: '#download',
        class: `btn btn-${plan.buttonStyle} btn-block`,
        text: plan.buttonText,
      }));
      grid.appendChild(card);
    });

    $('#pricingNote').innerHTML = `<p>${esc(p.note)}</p>`;
  }

  // ── Societies ──
  function renderSocieties() {
    const s = C.societies;
    const layout = $('#societiesLayout');
    layout.innerHTML = '';

    const content = h('div', { class: 'societies-content' });
    content.appendChild(h('p', { class: 'section-tag', text: s.tag }));
    content.appendChild(h('h2', { class: 'section-title text-left', text: s.title }));
    content.appendChild(h('p', { class: 'societies-desc', text: s.description }));

    const benefitsList = h('ul', { class: 'societies-benefits' });
    s.benefits.forEach(b => {
      benefitsList.appendChild(h('li', {},
        h('span', { class: 'benefit-icon', text: b.icon }),
        h('div', {},
          h('strong', { text: b.title }),
          h('p', { text: b.desc })
        )
      ));
    });
    content.appendChild(benefitsList);
    content.appendChild(h('a', { href: '#contact', class: 'btn btn-primary btn-lg', text: s.ctaText }));
    layout.appendChild(content);

    const visual = h('div', { class: 'societies-visual' });
    const stack = h('div', { class: 'society-card-stack' });
    s.stats.forEach(st => {
      stack.appendChild(h('div', { class: 'society-stat-card' },
        h('div', { class: 'ssc-icon', text: st.icon }),
        h('div', { class: 'ssc-info' },
          h('span', { class: 'ssc-number', text: st.number }),
          h('span', { class: 'ssc-label', text: st.label })
        )
      ));
    });
    visual.appendChild(stack);
    layout.appendChild(visual);
  }

  // ── Testimonials ──
  function renderTestimonials() {
    const t = C.testimonials;
    sectionHeader('testimonialsHeader', t.tag, t.title, '');

    const grid = $('#testimonialsGrid');
    grid.innerHTML = '';
    t.items.forEach(item => {
      const card = h('div', { class: 'testimonial-card' },
        h('div', { class: 'testimonial-stars', text: stars(item.stars) }),
        h('p', { text: `"${item.quote}"` }),
        h('div', { class: 'testimonial-author' },
          h('div', { class: 'author-avatar', text: item.name.charAt(0) }),
          h('div', {},
            h('strong', { text: item.name }),
            h('span', { text: item.role })
          )
        )
      );
      grid.appendChild(card);
    });
  }

  // ── Download ──
  function renderDownload() {
    const d = C.download;
    const layout = $('#downloadLayout');
    layout.innerHTML = '';

    const content = h('div', { class: 'download-content' });
    content.appendChild(h('h2', { class: 'section-title text-left', html: d.title }));
    content.appendChild(h('p', { class: 'download-desc', text: d.description }));

    const buttons = h('div', { class: 'download-buttons' });
    buttons.innerHTML = `
      <a href="${d.playStoreUrl}" class="store-btn">
        <svg class="store-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l10 10-10 10c-.48-.22-1-.67-1-1.5zm2-14.5l7 7-7 7V6zm8.5 7L5 4.5l12.5 7.2-4 1.3zm0 0l4 1.3L7 21.5l6.5-8.5z"/></svg>
        <div><span class="store-label">Get it on</span><span class="store-name">Google Play</span></div>
      </a>
      <a href="${d.appStoreUrl}" class="store-btn">
        <svg class="store-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        <div><span class="store-label">Download on the</span><span class="store-name">App Store</span></div>
      </a>`;
    content.appendChild(buttons);

    if (d.showQR) {
      content.appendChild(h('div', { class: 'download-qr', html: '<div class="qr-placeholder"><span>📱</span><p>Scan to Download</p></div>' }));
    }
    layout.appendChild(content);

    // Tracking phone mockup
    const visual = h('div', { class: 'download-visual' });
    const mockup = h('div', { class: 'phone-mockup phone-mockup-large' });
    const screen = h('div', { class: 'phone-screen' });

    screen.appendChild(h('div', { class: 'phone-header-alt' },
      h('span', { class: 'pha-title', text: 'Your Order' }),
      h('span', { class: 'pha-status', text: 'Grinding...' })
    ));

    const tracking = h('div', { class: 'tracking-steps' });
    C.trackingSteps.forEach(step => {
      const stepEl = h('div', { class: `track-step ${step.status}` },
        h('div', { class: 'track-dot' }),
        h('span', { text: step.label })
      );
      tracking.appendChild(stepEl);
    });
    screen.appendChild(tracking);

    const order = C.phoneMockup.trackingOrder;
    screen.appendChild(h('div', { class: 'phone-card' },
      h('div', { class: 'phone-card-icon', text: '🌾' }),
      h('div', { class: 'phone-card-text' },
        h('strong', { text: order.name }),
        h('span', { text: order.detail })
      )
    ));

    mockup.appendChild(screen);
    visual.appendChild(mockup);
    layout.appendChild(visual);
  }

  // ── Contact ──
  function renderContact() {
    const c = C.contact;
    sectionHeader('contactHeader', c.tag, c.title, c.description);

    const layout = $('#contactLayout');
    layout.innerHTML = '';

    const cards = h('div', { class: 'contact-cards' });
    const contactItems = [
      { icon: '📧', title: 'Email Us', value: c.email },
      { icon: '📞', title: 'Call Us', value: c.phone },
      { icon: '📍', title: 'Based In', value: c.location },
    ];
    contactItems.forEach(item => {
      cards.appendChild(h('div', { class: 'contact-card' },
        h('div', { class: 'contact-icon', text: item.icon }),
        h('h3', { text: item.title }),
        h('p', { text: item.value })
      ));
    });
    layout.appendChild(cards);

    const form = h('form', { class: 'contact-form', id: 'contactForm' });

    const row = h('div', { class: 'form-row' });
    row.innerHTML = `
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />
      </div>`;
    form.appendChild(row);

    const selectGroup = h('div', { class: 'form-group' });
    selectGroup.appendChild(h('label', { for: 'subject', text: "I'm interested in..." }));
    const select = h('select', { id: 'subject', name: 'subject' });
    c.formSubjects.forEach(s => select.appendChild(h('option', { value: s.value, text: s.label })));
    selectGroup.appendChild(select);
    form.appendChild(selectGroup);

    const msgGroup = h('div', { class: 'form-group' });
    msgGroup.innerHTML = '<label for="message">Message</label><textarea id="message" name="message" rows="4" placeholder="Tell us more..." required></textarea>';
    form.appendChild(msgGroup);

    form.appendChild(h('button', { type: 'submit', class: 'btn btn-accent btn-lg btn-block', text: 'Send Message' }));
    layout.appendChild(form);
  }

  // ── Footer ──
  function renderFooter() {
    const footer = $('#footer');
    footer.innerHTML = '';
    const container = h('div', { class: 'container' });

    const grid = h('div', { class: 'footer-grid' });

    // Brand column
    const brand = h('div', { class: 'footer-brand' });
    brand.innerHTML = `<a href="#" class="nav-logo">${logoHTML()}</a>`;
    brand.appendChild(h('p', { text: `${C.brand.tagline}. Ground at your society, delivered to your door.` }));

    const social = h('div', { class: 'footer-social' });
    const socialSvgs = {
      instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    };
    for (const [key, svg] of Object.entries(socialSvgs)) {
      if (C.social[key]) {
        const a = h('a', { href: C.social[key], 'aria-label': key });
        a.innerHTML = svg;
        social.appendChild(a);
      }
    }
    brand.appendChild(social);
    grid.appendChild(brand);

    // Link columns
    C.footer.columns.forEach(col => {
      const div = h('div', { class: 'footer-links' });
      div.appendChild(h('h4', { text: col.title }));
      const ul = h('ul');
      col.links.forEach(l => ul.appendChild(h('li', {}, h('a', { href: l.href, text: l.text }))));
      div.appendChild(ul);
      grid.appendChild(div);
    });

    container.appendChild(grid);

    const bottom = h('div', { class: 'footer-bottom' });
    bottom.appendChild(h('p', { html: `&copy; ${C.brand.year} ${esc(C.brand.name)}. All rights reserved.` }));
    bottom.appendChild(h('p', { text: C.brand.madeIn }));
    container.appendChild(bottom);

    footer.appendChild(container);
  }

  // ── Interactions ──
  function setupInteractions() {
    // Navbar scroll
    const navbar = $('#navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    const navToggle = $('#navToggle');
    const navLinks = $('#navLinks');
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Scroll-reveal
    const fadeEls = document.querySelectorAll(
      '.step-card, .feature-card, .pricing-card, .testimonial-card, .society-stat-card, .contact-card, .societies-benefits li'
    );
    fadeEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));

    // Staggered delays
    document.querySelectorAll('.features-grid, .pricing-grid, .testimonials-grid, .society-card-stack')
      .forEach(grid => {
        grid.querySelectorAll('.fade-in').forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
        });
      });

    // Counter animation
    const animateCounter = (el, target, suffix) => {
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
      }, 30);
    };

    const statObserver = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/(\d+)/);
          if (match) {
            animateCounter(el, parseInt(match[1]), text.replace(match[1], ''));
          }
          statObserver.unobserve(el);
        }
      }),
      { threshold: 0.5 }
    );
    document.querySelectorAll('.ssc-number').forEach(el => statObserver.observe(el));

    // Contact form
    const form = $('#contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Message Sent!';
          btn.style.background = C.colors.success;
          form.reset();
          setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
        }, 1000);
      });
    }
  }

  // ── Track key user actions ──
  function setupEventTracking() {
    // Track CTA clicks
    document.querySelectorAll('a.btn, .store-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const label = btn.textContent.trim();
        const href = btn.getAttribute('href') || '';
        window.trackEvent('CtaClick', { label, href });
      });
    });

    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.trackEvent('SectionView', { section: entry.target.id });
          sectionObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.3 }
    );
    sections.forEach(s => sectionObserver.observe(s));

    // Track form submission
    const form = $('#contactForm');
    if (form) {
      form.addEventListener('submit', () => {
        const subject = form.querySelector('#subject')?.value || '';
        window.trackEvent('Lead', { content_name: 'ContactForm', subject });
      }, true);
    }

    // Track scroll depth milestones
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const fired = new Set();
    window.addEventListener('scroll', () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (pct > maxScroll) maxScroll = pct;
      milestones.forEach(m => {
        if (maxScroll >= m && !fired.has(m)) {
          fired.add(m);
          window.trackEvent('ScrollDepth', { percent: m });
        }
      });
    }, { passive: true });
  }

  // ── Init ──
  document.addEventListener('DOMContentLoaded', () => {
    initTracking();
    applyTheme();
    renderMeta();
    renderNav();
    renderHero();
    renderSocialProof();
    renderHowItWorks();
    renderFeatures();
    renderPricing();
    renderSocieties();
    renderTestimonials();
    renderDownload();
    renderContact();
    renderFooter();
    setupInteractions();
    setupEventTracking();
  });
})();
