// ============================================
// Navbar Component — Agri-Connect
// ============================================

import { t, getCurrentLang, setLang } from '../i18n.js';

export function renderNavbar(activePage = '') {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const lang = getCurrentLang();

  nav.innerHTML = `
    <div class="navbar">
      <div class="navbar-brand" data-navigate="home">
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 2 L28 12 L28 28 L4 28 L4 12 Z" />
          <path d="M12 28 L12 18 L20 18 L20 28" />
          <circle cx="16" cy="10" r="2" fill="currentColor" />
        </svg>
        <span>${t('nav.brand')}<span class="brand-ai">AI</span></span>
      </div>
      <ul class="navbar-links" id="nav-links">
        <li><a href="#" data-navigate="home" class="${activePage === 'home' ? 'active' : ''}">${t('nav.home')}</a></li>
        <li><a href="#" data-navigate="analysis" class="${activePage === 'analysis' ? 'active' : ''}">${t('nav.analysis')}</a></li>
        <li><a href="#" data-navigate="market" class="${activePage === 'market' ? 'active' : ''}">${t('nav.market')}</a></li>
        <li><a href="#" data-navigate="weather" class="${activePage === 'weather' ? 'active' : ''}">${t('nav.weather')}</a></li>
        <li><a href="#" data-navigate="cropDoctor" class="${activePage === 'cropDoctor' ? 'active' : ''}">${t('nav.cropDoctor')}</a></li>
        <li><a href="#" data-navigate="carbon" class="${activePage === 'carbon' ? 'active' : ''}">${t('nav.carbon')}</a></li>
      </ul>
      <div class="navbar-right">
        <select class="lang-selector" id="lang-selector" title="Language">
          <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
          <option value="te" ${lang === 'te' ? 'selected' : ''}>తెలుగు</option>
          <option value="hi" ${lang === 'hi' ? 'selected' : ''}>हिंदी</option>
          <option value="mr" ${lang === 'mr' ? 'selected' : ''}>मराठी</option>
        </select>
        <button class="navbar-mobile-toggle" id="mobile-toggle" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Mobile toggle
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');
  toggle?.addEventListener('click', () => links?.classList.toggle('open'));

  // Navigation
  nav.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      links?.classList.remove('open');
      const page = el.dataset.navigate;
      window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
    });
  });

  // Language selector
  document.getElementById('lang-selector')?.addEventListener('change', (e) => {
    setLang(e.target.value);
  });
}
