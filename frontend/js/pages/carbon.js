// ============================================
// Carbon Estimation Page — Agri-Connect
// ============================================

import { t } from '../i18n.js';
import { showToast } from '../voice.js';

const API_BASE = 'http://127.0.0.1:5000';

export function renderCarbon() {
  return `
    <div class="page-carbon">
      <div class="page-header">
        <h1>🌍 ${t('carbon.title')}</h1>
        <p class="page-subtitle">${t('carbon.subtitle')}</p>
      </div>

      <div class="carbon-layout">
        <!-- INPUT FORM -->
        <div class="carbon-form-card card">
          <h2>📋 ${t('carbon.formTitle')}</h2>

          <div class="form-group">
            <label>${t('carbon.crop')} *</label>
            <select id="c-crop" class="form-input">
              <option value="">-- Select Crop --</option>
              <option value="rice">Rice (Paddy)</option>
              <option value="wheat">Wheat</option>
              <option value="maize">Maize (Corn)</option>
              <option value="cotton">Cotton</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="chickpea">Chickpea</option>
              <option value="lentil">Lentil</option>
              <option value="soybean">Soybean</option>
              <option value="groundnut">Groundnut</option>
              <option value="tomato">Tomato</option>
              <option value="potato">Potato</option>
              <option value="onion">Onion</option>
              <option value="mango">Mango</option>
              <option value="banana">Banana</option>
              <option value="grapes">Grapes</option>
              <option value="vegetables">Vegetables (Other)</option>
            </select>
          </div>

          <div class="form-group">
            <label>${t('carbon.area')} (hectares) *</label>
            <input type="number" id="c-area" class="form-input" placeholder="e.g. 2.5" min="0.01" step="0.01" />
            <small class="form-hint">1 acre = 0.405 hectares</small>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>${t('carbon.fertilizer')} *</label>
              <select id="c-fert-type" class="form-input">
                <option value="urea">Urea</option>
                <option value="dap">DAP</option>
                <option value="npk">NPK</option>
                <option value="compost">Compost / FYM</option>
                <option value="mop">MOP</option>
                <option value="none">None</option>
              </select>
            </div>
            <div class="form-group">
              <label>${t('carbon.fertQty')} (kg/season) *</label>
              <input type="number" id="c-fert-qty" class="form-input" placeholder="e.g. 100" min="0" step="1" />
            </div>
          </div>

          <div class="form-group">
            <label>${t('carbon.irrigation')} *</label>
            <select id="c-irrigation" class="form-input">
              <option value="flood">Flood Irrigation</option>
              <option value="sprinkler">Sprinkler</option>
              <option value="drip">Drip Irrigation</option>
              <option value="rainfed">Rainfed (No Irrigation)</option>
            </select>
          </div>

          <div class="form-group">
            <label>${t('carbon.tillage')} *</label>
            <select id="c-tillage" class="form-input">
              <option value="conventional">Conventional Tillage</option>
              <option value="minimum">Minimum Tillage</option>
              <option value="zero">Zero-Till / No-Till</option>
            </select>
          </div>

          <div class="form-group">
            <label>${t('carbon.residue')} *</label>
            <select id="c-residue" class="form-input">
              <option value="incorporated">Incorporated into Soil</option>
              <option value="mulched">Used as Mulch</option>
              <option value="removed">Removed / Sold</option>
              <option value="burned">Burned (Open Field)</option>
            </select>
          </div>

          <div class="form-group">
            <label>🌿 ${t('carbon.practices')}</label>
            <div class="checkbox-grid">
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="compost_organic" />
                <span>Compost / Organic manure</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="cover_cropping" />
                <span>Cover cropping (green manure)</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="agroforestry" />
                <span>Agroforestry (boundary trees)</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="biochar" />
                <span>Biochar application</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="drip_irrigation" />
                <span>Drip / precision irrigation</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="practice" value="zero_tillage" />
                <span>Zero-tillage / conservation tillage</span>
              </label>
            </div>
          </div>

          <button class="btn btn-primary btn-lg" id="carbon-submit-btn" style="width:100%">
            🌍 ${t('carbon.calculate')}
          </button>
        </div>

        <!-- RESULTS PANEL -->
        <div id="carbon-results" class="carbon-results-panel">
          <div class="carbon-placeholder">
            <div class="placeholder-icon">🌍</div>
            <h3>${t('carbon.resultsPlaceholder')}</h3>
            <p>${t('carbon.resultsPlaceholderDesc')}</p>
          </div>
        </div>
      </div>

      <!-- INFO NOTE -->
      <div class="info-note">
        <strong>📊 Data Source:</strong> ${t('carbon.dataSource')}
      </div>
    </div>
  `;
}

export function initCarbon() {
  document.getElementById('carbon-submit-btn')?.addEventListener('click', calculateCarbon);
}

async function calculateCarbon() {
  const crop = document.getElementById('c-crop')?.value;
  const area = parseFloat(document.getElementById('c-area')?.value);
  const fertType = document.getElementById('c-fert-type')?.value;
  const fertQty = parseFloat(document.getElementById('c-fert-qty')?.value);
  const irrigation = document.getElementById('c-irrigation')?.value;
  const tillage = document.getElementById('c-tillage')?.value;
  const residue = document.getElementById('c-residue')?.value;

  if (!crop) { showToast('Please select a crop', 'error'); return; }
  if (!area || isNaN(area) || area <= 0) { showToast('Please enter a valid area', 'error'); return; }
  if (isNaN(fertQty) || fertQty < 0) { showToast('Please enter fertilizer quantity (0 if none)', 'error'); return; }

  const practices = Array.from(document.querySelectorAll('input[name="practice"]:checked'))
    .map(el => el.value);

  const btn = document.getElementById('carbon-submit-btn');
  const resultsEl = document.getElementById('carbon-results');

  btn.disabled = true;
  btn.textContent = '⏳ Calculating...';

  resultsEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">Calculating carbon footprint...</div>
    </div>
  `;

  try {
    const response = await fetch(`${API_BASE}/api/carbon-estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop, area_hectares: area,
        fertilizer_type: fertType, fertilizer_qty_kg: fertQty || 0,
        irrigation_type: irrigation, tillage_type: tillage,
        residue_management: residue, practices,
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    resultsEl.innerHTML = renderCarbonResults(data, crop);
    resultsEl.querySelector('#carbon-download-btn')
      ?.addEventListener('click', () => downloadCarbonReport(data, crop, area));

  } catch (err) {
    resultsEl.innerHTML = `<div class="error-card">❌ ${err.message}</div>`;
    showToast('Error calculating carbon footprint', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = `🌍 ${t('carbon.calculate')}`;
  }
}

function getRatingLabel(rating) {
  const labels = { A: 'Excellent', B: 'Good', C: 'Average', D: 'High', E: 'Very High' };
  return labels[rating] || rating;
}

function renderCarbonResults(data, crop) {
  const ratingClass = `rating-${data.rating.toLowerCase()}`;
  const vsNat = data.comparison.vs_national;
  const vsText = vsNat > 0
    ? `${vsNat.toFixed(0)}% above national average`
    : `${Math.abs(vsNat).toFixed(0)}% below national average`;
  const vsClass = vsNat > 15 ? 'text-danger' : vsNat > 0 ? 'text-warning' : 'text-success';

  const breakdown = data.breakdown;
  const total = data.total_emissions_kg || 1;
  const bars = Object.entries(breakdown).map(([key, val]) => {
    const pct = Math.round((val / total) * 100);
    const icons = { crop: '🌱', fertilizer: '🧪', irrigation: '💧', tillage: '🚜', residue: '🔥' };
    return `
      <div class="breakdown-row">
        <span class="breakdown-label">${icons[key] || '•'} ${key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <div class="breakdown-bar-wrap">
          <div class="breakdown-bar" style="width:${Math.max(pct, 1)}%"></div>
        </div>
        <span class="breakdown-value">${val.toLocaleString()} kg</span>
      </div>
    `;
  }).join('');

  const suggestions = data.suggestions.map(s =>
    `<li class="suggestion-item">💡 ${s}</li>`
  ).join('');

  return `
    <div class="carbon-results-content">
      <!-- Rating Badge -->
      <div class="rating-section">
        <div class="rating-badge ${ratingClass}">
          <span class="rating-letter">${data.rating}</span>
          <span class="rating-label">${getRatingLabel(data.rating)}</span>
        </div>
        <div class="rating-info">
          <div class="net-emissions">${data.net_emissions_kg.toLocaleString()} kg CO₂-eq</div>
          <div class="net-label">${t('carbon.netEmissions')}</div>
          <div class="${vsClass}">${vsText}</div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="carbon-metrics">
        <div class="metric-card">
          <div class="metric-icon">🏭</div>
          <div class="metric-value">${data.total_emissions_kg.toLocaleString()}</div>
          <div class="metric-label">${t('carbon.totalEmissions')} (kg CO₂-eq)</div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">📐</div>
          <div class="metric-value">${data.per_hectare_emissions.toLocaleString()}</div>
          <div class="metric-label">${t('carbon.perHectare')} (kg/ha)</div>
        </div>
        <div class="metric-card sequestration">
          <div class="metric-icon">🌳</div>
          <div class="metric-value">${Math.abs(data.sequestration_kg).toLocaleString()}</div>
          <div class="metric-label">${t('carbon.sequestration')} (kg CO₂-eq)</div>
        </div>
      </div>

      <!-- Breakdown Bar Chart -->
      <div class="breakdown-section">
        <h3>📊 ${t('carbon.breakdown')}</h3>
        <div class="breakdown-chart">${bars}</div>
      </div>

      <!-- Comparison -->
      <div class="comparison-section">
        <h3>📈 ${t('carbon.comparison')}</h3>
        <div class="comparison-bars">
          <div class="comp-row">
            <span>Your Farm</span>
            <div class="comp-bar-wrap">
              <div class="comp-bar yours" style="width:${Math.min(100, (data.comparison.your_farm_per_ha / (data.comparison.national_avg_per_ha * 1.5)) * 100)}%"></div>
            </div>
            <span>${data.comparison.your_farm_per_ha} kg/ha</span>
          </div>
          <div class="comp-row">
            <span>National Avg</span>
            <div class="comp-bar-wrap">
              <div class="comp-bar national" style="width:${Math.min(100, (data.comparison.national_avg_per_ha / (data.comparison.national_avg_per_ha * 1.5)) * 100)}%"></div>
            </div>
            <span>${data.comparison.national_avg_per_ha} kg/ha</span>
          </div>
        </div>
      </div>

      <!-- CO2 Equivalents -->
      <div class="equivalents-section">
        <h3>🔄 ${t('carbon.equivalents')}</h3>
        <div class="equivalents-grid">
          <div class="equiv-card">
            <div class="equiv-icon">🚗</div>
            <div class="equiv-value">${data.equivalent.car_km.toLocaleString()} km</div>
            <div class="equiv-label">${t('carbon.equivalent.cars')}</div>
          </div>
          <div class="equiv-card">
            <div class="equiv-icon">🌲</div>
            <div class="equiv-value">${data.equivalent.trees_needed.toLocaleString()}</div>
            <div class="equiv-label">${t('carbon.equivalent.trees')}</div>
          </div>
          <div class="equiv-card">
            <div class="equiv-icon">✈️</div>
            <div class="equiv-value">${data.equivalent.flight_hours}</div>
            <div class="equiv-label">${t('carbon.equivalent.flights')}</div>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      ${data.suggestions.length > 0 ? `
      <div class="suggestions-section">
        <h3>💡 ${t('carbon.suggestions')}</h3>
        <ul class="suggestions-list">${suggestions}</ul>
      </div>
      ` : ''}

      <button class="btn btn-secondary" id="carbon-download-btn">
        📄 ${t('carbon.download')}
      </button>
    </div>
  `;
}

function downloadCarbonReport(data, crop, area) {
  const lines = [
    'AGRI-CONNECT — CARBON FOOTPRINT REPORT',
    '========================================',
    `Crop: ${crop}`,
    `Area: ${area} hectares`,
    '',
    'EMISSIONS SUMMARY',
    '-----------------',
    `Total Emissions: ${data.total_emissions_kg} kg CO2-eq`,
    `Per Hectare: ${data.per_hectare_emissions} kg CO2-eq/ha`,
    `Sequestration: ${data.sequestration_kg} kg CO2-eq`,
    `Net Emissions: ${data.net_emissions_kg} kg CO2-eq`,
    `Rating: ${data.rating} (${data.net_emissions_kg < data.comparison.national_avg_per_ha * area ? 'Below' : 'Above'} national average)`,
    '',
    'BREAKDOWN',
    '---------',
    ...Object.entries(data.breakdown).map(([k, v]) => `${k}: ${v} kg CO2-eq`),
    '',
    'EQUIVALENTS',
    '-----------',
    `Car travel: ${data.equivalent.car_km} km`,
    `Trees needed to offset: ${data.equivalent.trees_needed}`,
    `Flight hours: ${data.equivalent.flight_hours}`,
    '',
    'SUGGESTIONS TO REDUCE FOOTPRINT',
    '--------------------------------',
    ...data.suggestions.map((s, i) => `${i + 1}. ${s}`),
    '',
    'Data based on IPCC AR5 Tier 1 emission factors for Indian agriculture.',
    `Generated by Agri-Connect on ${new Date().toLocaleDateString('en-IN')}`,
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `carbon_report_${crop}_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
}
