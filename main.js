/**
 * ====================================================================
 * MAIN APPLICATION LOGIC
 * Dynamic data rendering, theme management, scroll-spy, and modals
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme
  initTheme();

  // 2. Load any stored customizations from browser localStorage
  loadStoredCustomizations();

  // 3. Render Data from portfolio-data.js (with stored customizations)
  if (window.portfolioData) {
    renderPortfolio(window.portfolioData);
  } else {
    console.warn('portfolioData not detected. Falling back to default DOM elements.');
  }

  // 4. Initialize Interactive UI Components
  initNavigation();
  initSkillsFilter();
  initCertificateModal();
  initBackToTop();
  initAvatarCustomizer();
  initQuickCustomizer();
});

/* ====================================================================
   THEME TOGGLER (Dark / Light Mode)
   ==================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme-preference');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme-preference', theme);
}

/* ====================================================================
   DATA RENDERING LOGIC
   ==================================================================== */
function renderPortfolio(data) {
  const { personal, about, skills, skillCategories, certifications, contact } = data;

  // ------------------------------------------------------------------
  // 1. Personal & Hero Section
  // ------------------------------------------------------------------
  if (personal) {
    // Brand & Document Title
    const brandName = document.getElementById('nav-brand-name');
    if (brandName) brandName.textContent = personal.name;
    document.title = `${personal.name} | Portfolio`;

    // Hero Text
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = personal.name;

    const heroRole = document.getElementById('hero-role');
    if (heroRole) heroRole.textContent = personal.role;

    const heroIntro = document.getElementById('hero-intro');
    if (heroIntro) heroIntro.textContent = personal.intro;

    const statusBadgeText = document.getElementById('status-badge-text');
    if (statusBadgeText) statusBadgeText.textContent = personal.statusBadge || 'Available for opportunities';

    // Profile Avatar (Supports Image file, Image URL, or Text Initials Monogram)
    const heroAvatar = document.getElementById('hero-avatar');
    const heroAvatarText = document.getElementById('hero-avatar-text');

    if (personal.avatarType === 'text') {
      if (heroAvatar) heroAvatar.style.display = 'none';
      if (heroAvatarText) {
        heroAvatarText.style.display = 'flex';
        heroAvatarText.textContent = personal.avatarText || getInitials(personal.name);
      }
    } else {
      if (heroAvatarText) heroAvatarText.style.display = 'none';
      if (heroAvatar) {
        heroAvatar.style.display = 'block';
        heroAvatar.src = personal.avatar || 'assets/images/avatar-placeholder.svg';
        heroAvatar.alt = personal.name;
      }
    }

    // Resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn && personal.resumeUrl) {
      resumeBtn.href = personal.resumeUrl;
      if (personal.resumeUrl.endsWith('.pdf')) {
        resumeBtn.setAttribute('target', '_blank');
      }
    }

    // Footer brand & copy
    const footerName = document.getElementById('footer-brand-name');
    if (footerName) footerName.textContent = personal.name;

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------
  // 2. About Section
  // ------------------------------------------------------------------
  if (about) {
    // Bio
    const bioContainer = document.getElementById('about-bio-container');
    if (bioContainer && about.bio) {
      bioContainer.innerHTML = about.bio.map(paragraph => `<p class="about-bio-text">${paragraph}</p>`).join('');
    }

    // Education Timeline
    const educationContainer = document.getElementById('education-timeline');
    if (educationContainer && about.education) {
      educationContainer.innerHTML = about.education.map(edu => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card card-glass">
            <div class="timeline-header">
              <h4 class="degree-title">${edu.degree}</h4>
              <span class="timeline-year">${edu.year}</span>
            </div>
            <div class="institution-title">${edu.institution}</div>
            ${edu.score ? `<div class="timeline-score">${edu.score}</div>` : ''}
            <p class="timeline-desc">${edu.description}</p>
          </div>
        </div>
      `).join('');
    }

    // Hobbies Grid
    const hobbiesContainer = document.getElementById('hobbies-grid');
    if (hobbiesContainer && about.hobbies) {
      hobbiesContainer.innerHTML = about.hobbies.map(hobby => `
        <div class="hobby-card card-glass">
          <div class="hobby-icon-wrap">${hobby.icon || '✨'}</div>
          <div class="hobby-info">
            <h4>${hobby.title}</h4>
            <p>${hobby.description}</p>
          </div>
        </div>
      `).join('');
    }

    // Achievements Grid
    const achievementsContainer = document.getElementById('achievements-grid');
    if (achievementsContainer && about.achievements) {
      achievementsContainer.innerHTML = about.achievements.map(achieve => `
        <div class="achievement-card card-glass">
          <div class="achievement-header">
            <h4 class="achievement-title">${achieve.title}</h4>
            <span class="achievement-badge">🏆</span>
          </div>
          <div class="achievement-org">${achieve.organization}</div>
          <p class="achievement-desc">${achieve.description}</p>
          <div class="achievement-footer">
            <span>📅</span>
            <span>${achieve.year}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // ------------------------------------------------------------------
  // 3. Skills & Certifications Section
  // ------------------------------------------------------------------
  if (skills && skillCategories) {
    // Filter tabs
    const filterTabsContainer = document.getElementById('skills-filter-tabs');
    if (filterTabsContainer) {
      filterTabsContainer.innerHTML = skillCategories.map((cat, idx) => `
        <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat.id}">
          ${cat.label}
        </button>
      `).join('');
    }

    // Skills Cards
    renderSkillsList(skills, 'all');
  }

  // Certifications
  if (certifications) {
    const certsContainer = document.getElementById('certs-grid');
    if (certsContainer) {
      certsContainer.innerHTML = certifications.map((cert, index) => `
        <div class="cert-card card-glass">
          <div class="cert-preview-box" onclick="openCertModal(${index})">
            <img src="${cert.image}" alt="${cert.title}">
            <div class="cert-zoom-overlay">
              <span>🔍 Click to Preview</span>
            </div>
          </div>
          <div class="cert-info">
            <h4>${cert.title}</h4>
            <div class="cert-issuer">${cert.issuer}</div>
            <div class="cert-meta">
              <span>Issued: ${cert.date}</span>
              ${cert.credentialId ? `<span>ID: ${cert.credentialId}</span>` : ''}
            </div>
            ${cert.skillsCovered ? `
              <div class="cert-tags">
                ${cert.skillsCovered.map(tag => `<span class="cert-tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="cert-btn-wrap">
            <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width: 100%;">
              <span>Verify Credential ↗</span>
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  // ------------------------------------------------------------------
  // 4. Contact Section
  // ------------------------------------------------------------------
  if (contact) {
    // Phone
    const phoneDisplay = document.getElementById('contact-phone-display');
    const phoneLink = document.getElementById('contact-phone-link');
    const phoneCopyBtn = document.getElementById('copy-phone-btn');
    if (phoneDisplay && contact.phone) {
      phoneDisplay.textContent = contact.phone;
      if (phoneLink) phoneLink.href = `tel:${contact.phoneClean || contact.phone.replace(/\s+/g, '')}`;
      if (phoneCopyBtn) {
        phoneCopyBtn.onclick = () => copyToClipboard(contact.phone, 'Phone number copied to clipboard!');
      }
    }

    // Email
    const emailDisplay = document.getElementById('contact-email-display');
    const emailLink = document.getElementById('contact-email-link');
    const emailCopyBtn = document.getElementById('copy-email-btn');
    if (emailDisplay && contact.email) {
      emailDisplay.textContent = contact.email;
      if (emailLink) emailLink.href = `mailto:${contact.email}`;
      if (emailCopyBtn) {
        emailCopyBtn.onclick = () => copyToClipboard(contact.email, 'Email address copied to clipboard!');
      }
    }

    // Address
    const addressDisplay = document.getElementById('contact-address-display');
    if (addressDisplay && contact.address) {
      addressDisplay.textContent = contact.address;
    }

    // Socials List in Contact
    const socialsList = document.getElementById('contact-socials-list');
    if (socialsList && contact.socials) {
      socialsList.innerHTML = Object.keys(contact.socials).map(key => {
        const item = contact.socials[key];
        const iconSymbol = key === 'linkedin' ? '💼' : key === 'github' ? '🐙' : key === 'instagram' ? '📸' : '🔗';
        return `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="social-item-link">
            <div class="social-item-left">
              <span class="social-icon-badge">${iconSymbol}</span>
              <div>
                <div class="social-title">${item.name}</div>
                <div class="social-handle">${item.username}</div>
              </div>
            </div>
            <span style="color: var(--accent-primary);">↗</span>
          </a>
        `;
      }).join('');
    }

    // Quick Social Chips in Hero
    const heroChips = document.getElementById('hero-social-chips-list');
    if (heroChips && contact.socials) {
      heroChips.innerHTML = Object.keys(contact.socials).map(key => {
        const item = contact.socials[key];
        const iconSymbol = key === 'linkedin' ? '💼' : key === 'github' ? '🐙' : '📸';
        return `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="chip-link">
            <span>${iconSymbol}</span>
            <span>${item.name}</span>
          </a>
        `;
      }).join('');
    }
  }
}

// Render filtered skills
function renderSkillsList(skills, selectedCategory) {
  const skillsContainer = document.getElementById('skills-grid');
  if (!skillsContainer) return;

  const filtered = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  skillsContainer.innerHTML = filtered.map(skill => `
    <div class="skill-card card-glass">
      <div class="skill-card-top">
        <div class="skill-title-wrap">
          <span class="skill-icon">${skill.icon || '⚡'}</span>
          <span class="skill-name">${skill.name}</span>
        </div>
        <span class="skill-level-number">${skill.level}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
      </div>
    </div>
  `).join('');
}

// Setup Skills Filter buttons
function initSkillsFilter() {
  const container = document.getElementById('skills-filter-tabs');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Toggle active state
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-category');
    if (window.portfolioData && window.portfolioData.skills) {
      renderSkillsList(window.portfolioData.skills, cat);
    }
  });
}

/* ====================================================================
   NAVIGATION & SCROLL SPY
   ==================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');

  // Sticky Navbar blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile drawer open/close
  if (mobileMenuBtn && mobileDrawer && mobileOverlay) {
    const toggleDrawer = () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleDrawer);
    mobileOverlay.addEventListener('click', toggleDrawer);

    // Close when clicking any nav link
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll Spy for active nav link
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ====================================================================
   CERTIFICATE MODAL LIGHTBOX
   ==================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  const closeModal = () => modal.classList.remove('open');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

// Global modal opener
window.openCertModal = function(index) {
  const modal = document.getElementById('cert-modal');
  const cert = window.portfolioData?.certifications?.[index];
  if (!modal || !cert) return;

  document.getElementById('modal-cert-img').src = cert.image;
  document.getElementById('modal-cert-title').textContent = cert.title;
  document.getElementById('modal-cert-issuer').textContent = `${cert.issuer} • ${cert.date}`;
  const linkBtn = document.getElementById('modal-cert-link');
  if (linkBtn) linkBtn.href = cert.credentialUrl;

  modal.classList.add('open');
};

/* ====================================================================
   BACK TO TOP
   ==================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ====================================================================
   STORAGE & UTILITY HELPERS
   ==================================================================== */
function getInitials(name) {
  if (!name) return 'PS';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function loadStoredCustomizations() {
  try {
    const raw = localStorage.getItem('user_portfolio_customizations');
    if (!raw) return;
    const custom = JSON.parse(raw);
    if (!window.portfolioData) return;

    if (custom.personal) {
      window.portfolioData.personal = { ...window.portfolioData.personal, ...custom.personal };
    }
    if (custom.contact) {
      window.portfolioData.contact = { 
        ...window.portfolioData.contact, 
        ...custom.contact,
        socials: { ...window.portfolioData.contact.socials, ...(custom.contact.socials || {}) }
      };
    }
  } catch (err) {
    console.error('Error loading stored customizations:', err);
  }
}

function saveCustomizationsToStorage() {
  try {
    const payload = {
      personal: window.portfolioData.personal,
      contact: window.portfolioData.contact
    };
    localStorage.setItem('user_portfolio_customizations', JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/* ====================================================================
   AVATAR CUSTOMIZER (Photo Image vs Text Initials)
   ==================================================================== */
function initAvatarCustomizer() {
  const changeBtn = document.getElementById('change-avatar-btn');
  const modal = document.getElementById('avatar-modal');
  const closeBtn = document.getElementById('avatar-modal-close-btn');

  if (!changeBtn || !modal) return;

  // Tabs
  const btnAnime = document.getElementById('choice-btn-anime');
  const btnUpload = document.getElementById('choice-btn-upload');
  const btnUrl = document.getElementById('choice-btn-url');
  const btnText = document.getElementById('choice-btn-text');

  const paneAnime = document.getElementById('avatar-anime-pane');
  const paneUpload = document.getElementById('avatar-upload-pane');
  const paneUrl = document.getElementById('avatar-url-pane');
  const paneText = document.getElementById('avatar-text-pane');

  // Inputs
  const fileInput = document.getElementById('avatar-file-input');
  const urlInput = document.getElementById('avatar-url-input');
  const textInput = document.getElementById('avatar-text-input');

  // Preview elements
  const previewImg = document.getElementById('modal-avatar-preview-img');
  const previewText = document.getElementById('modal-avatar-preview-text');

  // Actions
  const applyBtn = document.getElementById('avatar-apply-btn');
  const resetBtn = document.getElementById('avatar-reset-btn');

  let currentChoice = 'anime'; // 'anime' | 'upload' | 'url' | 'text'
  let stagedImage = window.portfolioData?.personal?.avatar || 'assets/images/anime-dev-male.jpg';
  let stagedText = window.portfolioData?.personal?.avatarText || getInitials(window.portfolioData?.personal?.name);

  // Preset Card Clicks
  const presetCards = modal.querySelectorAll('.anime-preset-card');
  presetCards.forEach(card => {
    card.addEventListener('click', () => {
      presetCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const imgSrc = card.getAttribute('data-img');
      if (imgSrc) {
        stagedImage = imgSrc;
        previewImg.style.display = 'block';
        previewText.style.display = 'none';
        previewImg.src = stagedImage;
        showToast('Selected anime preset!');
      }
    });
  });

  const switchTab = (choice) => {
    currentChoice = choice;
    [btnAnime, btnUpload, btnUrl, btnText].forEach(b => b && b.classList.remove('active'));
    [paneAnime, paneUpload, paneUrl, paneText].forEach(p => p && (p.style.display = 'none'));

    if (choice === 'anime') {
      if (btnAnime) btnAnime.classList.add('active');
      if (paneAnime) paneAnime.style.display = 'block';
      previewImg.style.display = 'block';
      previewText.style.display = 'none';
      previewImg.src = stagedImage;
    } else if (choice === 'upload') {
      btnUpload.classList.add('active');
      paneUpload.style.display = 'block';
      previewImg.style.display = 'block';
      previewText.style.display = 'none';
      previewImg.src = stagedImage;
    } else if (choice === 'url') {
      btnUrl.classList.add('active');
      paneUrl.style.display = 'block';
      previewImg.style.display = 'block';
      previewText.style.display = 'none';
      previewImg.src = stagedImage;
    } else if (choice === 'text') {
      btnText.classList.add('active');
      paneText.style.display = 'block';
      previewImg.style.display = 'none';
      previewText.style.display = 'flex';
      previewText.textContent = stagedText || getInitials(window.portfolioData?.personal?.name);
    }
  };

  if (btnAnime) btnAnime.addEventListener('click', () => switchTab('anime'));
  btnUpload.addEventListener('click', () => switchTab('upload'));
  btnUrl.addEventListener('click', () => switchTab('url'));
  btnText.addEventListener('click', () => switchTab('text'));

  // Open modal
  changeBtn.addEventListener('click', () => {
    stagedImage = window.portfolioData?.personal?.avatar || 'assets/images/anime-dev-male.jpg';
    stagedText = window.portfolioData?.personal?.avatarText || getInitials(window.portfolioData?.personal?.name);
    
    if (window.portfolioData?.personal?.avatarType === 'text') {
      textInput.value = stagedText;
      switchTab('text');
    } else if (stagedImage.includes('anime-dev')) {
      switchTab('anime');
    } else {
      urlInput.value = stagedImage.startsWith('data:') ? '' : stagedImage;
      switchTab('upload');
    }
    modal.classList.add('open');
  });

  const closeModal = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // File upload reader
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      stagedImage = event.target.result;
      previewImg.src = stagedImage;
      showToast('Image loaded into preview!');
    };
    reader.readAsDataURL(file);
  });

  // URL input handler
  urlInput.addEventListener('input', () => {
    const val = urlInput.value.trim();
    if (val) {
      stagedImage = val;
      previewImg.src = stagedImage;
    }
  });

  // Text input handler
  textInput.addEventListener('input', () => {
    const val = textInput.value.trim().toUpperCase();
    stagedText = val || getInitials(window.portfolioData?.personal?.name);
    previewText.textContent = stagedText;
  });

  // Apply Changes
  applyBtn.addEventListener('click', () => {
    if (!window.portfolioData.personal) window.portfolioData.personal = {};

    if (currentChoice === 'text') {
      window.portfolioData.personal.avatarType = 'text';
      window.portfolioData.personal.avatarText = stagedText || getInitials(window.portfolioData.personal.name);
    } else {
      window.portfolioData.personal.avatarType = 'image';
      window.portfolioData.personal.avatar = stagedImage;
    }

    saveCustomizationsToStorage();
    renderPortfolio(window.portfolioData);
    closeModal();
    showToast('Avatar updated successfully!');
  });

  // Reset to default
  resetBtn.addEventListener('click', () => {
    window.portfolioData.personal.avatarType = 'image';
    window.portfolioData.personal.avatar = 'assets/images/avatar-placeholder.svg';
    window.portfolioData.personal.avatarText = 'PS';
    saveCustomizationsToStorage();
    renderPortfolio(window.portfolioData);
    closeModal();
    showToast('Avatar reset to default placeholder.');
  });
}

/* ====================================================================
   QUICK EDIT DETAILS CUSTOMIZER MODAL
   ==================================================================== */
function initQuickCustomizer() {
  const toggleBtn = document.getElementById('customizer-toggle-btn');
  const modal = document.getElementById('customizer-modal');
  const closeBtn = document.getElementById('customizer-close-btn');

  if (!toggleBtn || !modal) return;

  const tabBtns = modal.querySelectorAll('.customizer-tab-btn');
  const tabContents = modal.querySelectorAll('.customizer-tab-content');

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // Open modal & populate fields
  toggleBtn.addEventListener('click', () => {
    const p = window.portfolioData?.personal || {};
    const c = window.portfolioData?.contact || {};
    const s = c.socials || {};

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('edit-name', p.name);
    setVal('edit-role', p.role);
    setVal('edit-status', p.statusBadge);
    setVal('edit-intro', p.intro);
    setVal('edit-phone', c.phone);
    setVal('edit-email', c.email);
    setVal('edit-location', c.address);
    setVal('edit-linkedin', s.linkedin?.url);
    setVal('edit-github', s.github?.url);
    setVal('edit-instagram', s.instagram?.url);

    modal.classList.add('open');
  });

  const closeModal = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Save & Apply
  const saveBtn = document.getElementById('customizer-save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const getVal = (id) => document.getElementById(id)?.value?.trim() || '';

      const p = window.portfolioData.personal;
      const c = window.portfolioData.contact;

      p.name = getVal('edit-name') || p.name;
      p.role = getVal('edit-role') || p.role;
      p.statusBadge = getVal('edit-status') || p.statusBadge;
      p.intro = getVal('edit-intro') || p.intro;

      c.phone = getVal('edit-phone') || c.phone;
      c.phoneClean = c.phone.replace(/\s+/g, '');
      c.email = getVal('edit-email') || c.email;
      c.address = getVal('edit-location') || c.address;

      if (!c.socials) c.socials = {};
      if (getVal('edit-linkedin')) {
        c.socials.linkedin = { ...c.socials.linkedin, url: getVal('edit-linkedin') };
      }
      if (getVal('edit-github')) {
        c.socials.github = { ...c.socials.github, url: getVal('edit-github') };
      }
      if (getVal('edit-instagram')) {
        c.socials.instagram = { ...c.socials.instagram, url: getVal('edit-instagram') };
      }

      saveCustomizationsToStorage();
      renderPortfolio(window.portfolioData);
      closeModal();
      showToast('Website details updated and saved!');
    });
  }

  // Reset to Defaults
  const resetBtn = document.getElementById('customizer-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all details back to the default settings?')) {
        localStorage.removeItem('user_portfolio_customizations');
        location.reload();
      }
    });
  }

  // Export Updated JS File
  const exportBtn = document.getElementById('customizer-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportPortfolioDataJs();
    });
  }
}

/* ====================================================================
   EXPORT PORTFOLIO DATA FILE
   ==================================================================== */
function exportPortfolioDataJs() {
  const content = `/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ====================================================================
 * Generated automatically from your website customizations.
 */

const portfolioData = ${JSON.stringify(window.portfolioData, null, 2)};

// Make accessible to browser window
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
`;

  const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'portfolio-data.js';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Downloaded updated portfolio-data.js! Replace your project file with this.');
}

