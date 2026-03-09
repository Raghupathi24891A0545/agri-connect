// ============================================
// Market Prices Page — Agri-Connect
// ============================================

import { getMarketPrices } from '../api.js';
import { showToast, setupMicButtons } from '../voice.js';
import { t } from '../i18n.js';

export function renderMarket() {
  return `
    <div class="page-section">
      <div class="page-header">
        <h1>${t('market.title')}</h1>
        <p>${t('market.subtitle')}</p>
      </div>

      <div class="card" style="margin-bottom:24px;">
        <div class="form-grid">
          <div class="form-group">
            <label>${t('market.crop')}</label>
            <div class="input-with-mic">
              <input type="text" class="form-input" id="market-crop" placeholder="${t('market.cropPlaceholder')}" />
              <button class="mic-btn" title="Voice input">🎤</button>
            </div>
          </div>
          <div class="form-group">
            <label>${t('market.location')}</label>
            <div class="input-with-mic">
              <input type="text" class="form-input" id="market-location" placeholder="${t('market.locationPlaceholder')}" />
              <button class="mic-btn" title="Voice input">🎤</button>
            </div>
          </div>
          <div class="form-group">
            <label>${t('market.radius')} <span class="hint">(km)</span></label>
            <input type="number" class="form-input" id="market-radius" value="50" min="5" max="200" placeholder="50" />
          </div>
        </div>
        <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
          <button class="gps-btn" id="market-gps-btn">${t('market.useMyLocation')}</button>
          <button class="btn btn-primary" id="market-search-btn">${t('market.search')}</button>
        </div>
      </div>

      <div id="market-results"></div>
    </div>
  `;
}

export function initMarket() {
  const searchBtn = document.getElementById('market-search-btn');
  const gpsBtn = document.getElementById('market-gps-btn');
  const locationInput = document.getElementById('market-location');

  searchBtn?.addEventListener('click', () => {
    const crop = document.getElementById('market-crop')?.value.trim();
    const location = locationInput?.value.trim();
    const radius = parseFloat(document.getElementById('market-radius')?.value) || 50;

    if (!crop) { showToast('Please enter a crop name', 'error'); return; }
    if (!location) { showToast('Please enter your location', 'error'); return; }

    fetchPrices(crop, location, radius);
  });

  gpsBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation not supported', 'error');
      return;
    }
    gpsBtn.classList.add('loading');
    gpsBtn.textContent = '📍 Locating...';

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
          );
          const data = await res.json();
          locationInput.value = data.city || data.locality || data.principalSubdivision || 'Unknown';
        } catch {
          showToast('Could not get city name', 'error');
        }
        gpsBtn.classList.remove('loading');
        gpsBtn.textContent = t('market.useMyLocation');
      },
      () => {
        showToast('Location access denied', 'error');
        gpsBtn.classList.remove('loading');
        gpsBtn.textContent = t('market.useMyLocation');
      }
    );
  });

  setupMicButtons();
}

async function fetchPrices(crop, location, radius) {
  const resultsEl = document.getElementById('market-results');
  if (!resultsEl) return;

  resultsEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">Searching prices for ${crop} near ${location}...</div>
    </div>
  `;

  try {
    const data = await getMarketPrices({ crop, location, radius_km: radius });

    if (data.error) {
      resultsEl.innerHTML = `<div class="card" style="text-align:center;color:var(--c-danger);">⚠️ ${data.error}</div>`;
      return;
    }

    let html = '';

    // Summary
    html += `
      <div class="price-summary">
        <div class="price-summary-item">
          <div class="value" style="color:var(--c-accent);">₹${data.avg_price_per_kg}/kg</div>
          <div class="label">Average Price</div>
        </div>
        <div class="price-summary-item">
          <div class="value" style="color:var(--c-success);">₹${data.max_price_per_kg}/kg</div>
          <div class="label">Best Price</div>
        </div>
        <div class="price-summary-item">
          <div class="value" style="color:var(--c-danger);">₹${data.min_price_per_kg}/kg</div>
          <div class="label">Lowest Price</div>
        </div>
        <div class="price-summary-item">
          <div class="value" style="color:var(--c-primary-light);">${data.markets.length}</div>
          <div class="label">Markets Found</div>
        </div>
      </div>
    `;

    html += `<h3 class="section-title"><span class="icon">🏪</span> Markets for ${data.crop} near ${data.location} (${radius} km)</h3>`;

    // Market cards
    html += '<div style="display:flex;flex-direction:column;gap:12px;">';
    const bestName = data.best_market;

    for (const m of data.markets) {
      const isBest = m.name === bestName;
      const trendIcon = m.trend === 'up' ? '📈' : m.trend === 'down' ? '📉' : '➡️';

      html += `
        <div class="market-card ${isBest ? 'best-price' : ''}">
          <div>
            <div class="market-name">${isBest ? '⭐ ' : ''}${m.name}</div>
            <div class="market-distance">📍 ${m.distance_km} km away · Updated: ${m.last_updated}</div>
            <span class="trend-badge ${m.trend}">${trendIcon} ${m.trend}</span>
          </div>
          <div class="market-price">
            <div class="price-value">₹${m.price_per_kg}</div>
            <div class="price-unit">per kg</div>
            <div class="price-unit" style="margin-top:4px;">₹${m.price_per_quintal}/quintal</div>
          </div>
        </div>
      `;
    }
    html += '</div>';

    resultsEl.innerHTML = html;

  } catch (err) {
    resultsEl.innerHTML = `
      <div class="card" style="text-align:center;color:var(--c-danger);">
        <p>⚠️ ${err.message}</p>
      </div>
    `;
  }
}
