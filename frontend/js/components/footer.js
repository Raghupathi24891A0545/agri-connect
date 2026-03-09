// ============================================
// Footer Component — Agri-Connect
// ============================================

import { t } from '../i18n.js';

export function renderFooter() {
  const footer = document.getElementById('footer-root');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer">
      <div class="footer-content">
        <div class="footer-brand">${t('footer.brand')}</div>
        <p class="footer-text">
          ${t('footer.desc')}
        </p>
        <div class="footer-links">
          <a href="#" data-navigate="home">${t('nav.home')}</a>
          <a href="#" data-navigate="analysis">${t('nav.analysis')}</a>
          <a href="#" data-navigate="market">${t('nav.market')}</a>
          <a href="#" data-navigate="weather">${t('nav.weather')}</a>
          <a href="#" data-navigate="cropDoctor">${t('nav.cropDoctor')}</a>
        </div>
        <p class="footer-text" style="margin-top:16px;font-size:0.75rem;">
          ${t('footer.copyright')}
        </p>
      </div>
    </div>
  `;

  footer.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('navigate', { detail: el.dataset.navigate }));
    });
  });
}
