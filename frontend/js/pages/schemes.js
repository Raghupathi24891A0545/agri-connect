// ============================================
// Government Schemes Page — Agri-Connect
// ============================================

import { t } from '../i18n.js';

const API_BASE = 'http://127.0.0.1:5000';

export function renderSchemes() {
  return `
    <div class="page-schemes">
      <div class="page-header">
        <h1>🏛️ ${t('schemes.title')}</h1>
        <p class="page-subtitle">${t('schemes.subtitle')}</p>
      </div>

      <div class="schemes-filters card">
        <div class="filter-row">
          <div class="form-group" style="flex:1">
            <input
              type="text"
              id="schemes-search"
              class="form-input"
              placeholder="🔍 Search schemes (e.g. insurance, loan, solar)..."
            />
          </div>
          <div class="form-group">
            <select id="schemes-category" class="form-input">
              <option value="">All Categories</option>
              <option value="Income Support">Income Support</option>
              <option value="Crop Insurance">Crop Insurance</option>
              <option value="Credit">Credit / Loan</option>
              <option value="Soil Health">Soil Health</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Market Access">Market Access</option>
              <option value="Organic Farming">Organic Farming</option>
              <option value="Agricultural Development">Agricultural Development</option>
            </select>
          </div>
        </div>
      </div>

      <div id="schemes-results" class="schemes-grid">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <div class="loading-text">Loading government schemes...</div>
        </div>
      </div>
    </div>
  `;
}

export function initSchemes() {
  loadSchemes();

  const searchInput = document.getElementById('schemes-search');
  const categorySelect = document.getElementById('schemes-category');

  // Debounced search
  let searchTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadSchemes, 300);
  });
  categorySelect?.addEventListener('change', loadSchemes);
}

async function loadSchemes() {
  const search = document.getElementById('schemes-search')?.value?.trim() || '';
  const category = document.getElementById('schemes-category')?.value || '';
  const resultsEl = document.getElementById('schemes-results');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);

    const response = await fetch(`${API_BASE}/api/schemes?${params}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    if (!data.schemes || data.schemes.length === 0) {
      resultsEl.innerHTML = `
        <div class="empty-state">
          <div class="placeholder-icon">🔍</div>
          <p>No schemes found for "<strong>${search || category}</strong>"</p>
        </div>
      `;
      return;
    }

    resultsEl.innerHTML = data.schemes.map(renderSchemeCard).join('');

    // Attach expand/collapse listeners
    resultsEl.querySelectorAll('.scheme-expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.scheme-card');
        card?.classList.toggle('expanded');
        btn.textContent = card?.classList.contains('expanded') ? '▲ Less' : '▼ More';
      });
    });

  } catch (err) {
    resultsEl.innerHTML = `<div class="error-card">❌ ${err.message}</div>`;
  }
}

function renderSchemeCard(scheme) {
  const categoryColors = {
    'Income Support': 'badge-green',
    'Crop Insurance': 'badge-blue',
    'Credit': 'badge-purple',
    'Soil Health': 'badge-orange',
    'Renewable Energy': 'badge-yellow',
    'Market Access': 'badge-teal',
    'Organic Farming': 'badge-lime',
    'Agricultural Development': 'badge-gray',
  };
  const badgeClass = categoryColors[scheme.category] || 'badge-gray';

  return `
    <div class="scheme-card card">
      <div class="scheme-header">
        <div class="scheme-icon">${scheme.icon || '🏛️'}</div>
        <div class="scheme-title-area">
          <h3 class="scheme-name">${scheme.name}</h3>
          <div class="scheme-full-name">${scheme.full_name}</div>
          <span class="category-badge ${badgeClass}">${scheme.category}</span>
        </div>
      </div>

      <div class="scheme-benefit">
        <strong>💰 ${t('schemes.benefit')}:</strong>
        <span>${scheme.benefit_amount}</span>
      </div>

      <p class="scheme-description">${scheme.description}</p>

      <div class="scheme-details">
        <div class="scheme-detail">
          <strong>✅ ${t('schemes.eligibility')}:</strong>
          <p>${scheme.eligibility}</p>
        </div>
        <div class="scheme-detail">
          <strong>📝 ${t('schemes.howToApply')}:</strong>
          <p>${scheme.how_to_apply}</p>
        </div>
        <div class="scheme-detail">
          <strong>🏢 Ministry:</strong>
          <p>${scheme.ministry}</p>
        </div>
      </div>

      <div class="scheme-actions">
        <a href="${scheme.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary scheme-apply-btn">
          ${t('schemes.apply')} ↗
        </a>
        <button class="btn btn-secondary scheme-expand-btn">▼ More</button>
      </div>
    </div>
  `;
}
