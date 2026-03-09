// ============================================
// Carbon Footprint Estimation Page — Agri-Connect
// 100% IPCC-sourced data. Zero mock/random values.
// ============================================

import { t } from '../i18n.js';
import { getCarbonEstimate } from '../api.js';

// ============================================
// RENDER
// ============================================
export function renderCarbon() {
  return `
    <section class="carbon-page">
      <!-- Hero Header -->
      <div class="carbon-hero">
        <div class="carbon-hero-content">
          <div class="hero-badge">
            <span class="dot"></span>
            IPCC 2019 · FAO · IFA 2018
          </div>
          <h1>${t('carbon.title')}</h1>
          <p>${t('carbon.subtitle')}</p>
        </div>
      </div>

      <!-- Input Form -->
      <div class="carbon-form-wrapper" id="carbon-form-section">
        <div class="carbon-form-card">
          <h2>🌾 Farm Details</h2>

          <div class="carbon-form-grid">
            <!-- Crop Type -->
            <div class="form-group">
              <label for="c-crop">
                <span class="form-icon">🌾</span>
                ${t('carbon.crop')}
              </label>
              <select id="c-crop" class="form-control">
                <option value="rice">🌾 Rice (Paddy)</option>
                <option value="wheat">🌿 Wheat</option>
                <option value="maize">🌽 Maize / Corn</option>
                <option value="cotton">🪴 Cotton</option>
                <option value="sugarcane">🎋 Sugarcane</option>
                <option value="chickpea">🫘 Chickpea</option>
                <option value="potato">🥔 Potato</option>
                <option value="tomato">🍅 Tomato</option>
                <option value="banana">🍌 Banana</option>
                <option value="mango">🥭 Mango</option>
                <option value="coffee">☕ Coffee</option>
                <option value="default">Other Crop</option>
              </select>
            </div>

            <!-- Area -->
            <div class="form-group">
              <label for="c-area">
                <span class="form-icon">📐</span>
                ${t('carbon.area')}
              </label>
              <input type="number" id="c-area" class="form-control" placeholder="e.g. 2.5" min="0.1" step="0.1" value="1" />
            </div>

            <!-- Fertilizer Type -->
            <div class="form-group">
              <label for="c-fert">
                <span class="form-icon">🧪</span>
                ${t('carbon.fertilizer')}
              </label>
              <select id="c-fert" class="form-control">
                <option value="Urea">Urea (46-0-0) — 5.8 kg CO₂e/kg</option>
                <option value="DAP">DAP (18-46-0) — 3.85 kg CO₂e/kg</option>
                <option value="NPK">NPK (17-17-17) — 3.09 kg CO₂e/kg</option>
                <option value="MOP">MOP (0-0-60) — 0.58 kg CO₂e/kg</option>
                <option value="SSP">SSP — 0.95 kg CO₂e/kg</option>
                <option value="Zinc Sulphate">Zinc Sulphate — 1.2 kg CO₂e/kg</option>
                <option value="Compost">Compost — 0.22 kg CO₂e/kg ✅ Low</option>
              </select>
            </div>

            <!-- Fertilizer Quantity -->
            <div class="form-group">
              <label for="c-fert-qty">
                <span class="form-icon">⚖️</span>
                ${t('carbon.fert_qty')}
              </label>
              <input type="number" id="c-fert-qty" class="form-control" placeholder="e.g. 100" min="0" step="1" value="100" />
            </div>

            <!-- Irrigation Method -->
            <div class="form-group">
              <label for="c-irrigation">
                <span class="form-icon">💧</span>
                ${t('carbon.irrigation')}
              </label>
              <select id="c-irrigation" class="form-control">
                <option value="Flood">Flood Irrigation — 1200 kg CO₂e/ha ⚠️</option>
                <option value="Sprinkler">Sprinkler — 350 kg CO₂e/ha</option>
                <option value="Drip">Drip Irrigation — 150 kg CO₂e/ha ✅ Best</option>
                <option value="Rainfed">Rainfed — 0 kg CO₂e/ha ✅</option>
              </select>
            </div>

            <!-- Tillage Practice -->
            <div class="form-group">
              <label for="c-tillage">
                <span class="form-icon">🚜</span>
                ${t('carbon.tillage')}
              </label>
              <select id="c-tillage" class="form-control">
                <option value="Conventional">Conventional Tillage — 430 kg CO₂e/ha ⚠️</option>
                <option value="Reduced">Reduced Tillage — 210 kg CO₂e/ha</option>
                <option value="Zero">Zero-Till — 30 kg CO₂e/ha ✅ Best</option>
              </select>
            </div>
          </div>

          <!-- Organic Practices (multi-checkbox) -->
          <div class="form-group carbon-practices">
            <label>
              <span class="form-icon">🌿</span>
              ${t('carbon.organic')}
              <span class="label-hint">(Select all that apply — each reduces your footprint)</span>
            </label>
            <div class="practices-grid">
              <label class="practice-check">
                <input type="checkbox" value="organic_farming" />
                <span class="checkmark"></span>
                <div>
                  <strong>Organic Farming</strong>
                  <small>−500 kg CO₂e/ha · IPCC 2019 Vol4</small>
                </div>
              </label>
              <label class="practice-check">
                <input type="checkbox" value="cover_crops" />
                <span class="checkmark"></span>
                <div>
                  <strong>Cover Crops / Green Manure</strong>
                  <small>−350 kg CO₂e/ha · FAO CA guidelines</small>
                </div>
              </label>
              <label class="practice-check">
                <input type="checkbox" value="crop_residue_retention" />
                <span class="checkmark"></span>
                <div>
                  <strong>Retain Crop Residues (No Burning)</strong>
                  <small>−200 kg CO₂e/ha · IPCC Vol4 Ch5</small>
                </div>
              </label>
              <label class="practice-check">
                <input type="checkbox" value="agroforestry" />
                <span class="checkmark"></span>
                <div>
                  <strong>Agroforestry (Trees on Farm)</strong>
                  <small>−800 kg CO₂e/ha · IPCC 2019</small>
                </div>
              </label>
              <label class="practice-check">
                <input type="checkbox" value="biochar_application" />
                <span class="checkmark"></span>
                <div>
                  <strong>Biochar Application</strong>
                  <small>−600 kg CO₂e/ha · IPCC 2019</small>
                </div>
              </label>
              <label class="practice-check">
                <input type="checkbox" value="mulching" />
                <span class="checkmark"></span>
                <div>
                  <strong>Mulching</strong>
                  <small>−150 kg CO₂e/ha · FAO guidelines</small>
                </div>
              </label>
            </div>
          </div>

          <button class="btn btn-primary btn-lg carbon-submit-btn" id="carbon-calculate-btn">
            ${t('carbon.calculate')}
          </button>
        </div>
      </div>

      <!-- Results Section (hidden until calculation) -->
      <div id="carbon-results" class="carbon-results hidden"></div>
    </section>
  `;
}

// ============================================
// RESULTS RENDERER
// ============================================
function renderResults(data) {
  const ratingColors = {
    A: '#22C55E', B: '#84CC16', C: '#F59E0B', D: '#F97316', E: '#EF4444'
  };
  const ratingColor = ratingColors[data.rating] || '#9BB5A3';

  const totalForChart = data.total_emission_kg_co2e || 1;
  const breakdown = data.breakdown || {};
  const cropPct   = Math.round((breakdown.crop_emissions / totalForChart) * 100);
  const fertPct   = Math.round((breakdown.fertilizer_emissions / totalForChart) * 100);
  const irrPct    = Math.round((breakdown.irrigation_emissions / totalForChart) * 100);
  const tillPct   = Math.round((breakdown.tillage_emissions / totalForChart) * 100);

  // conic-gradient segments for donut chart
  const segments = [
    { pct: cropPct,   color: '#2DA858', label: 'Crop' },
    { pct: fertPct,   color: '#F59E0B', label: 'Fertilizer' },
    { pct: irrPct,    color: '#3B82F6', label: 'Irrigation' },
    { pct: tillPct,   color: '#EF4444', label: 'Tillage' },
  ];
  let conicStr = '';
  let cumulative = 0;
  segments.forEach(s => {
    conicStr += `${s.color} ${cumulative}% ${cumulative + s.pct}%, `;
    cumulative += s.pct;
  });
  if (cumulative < 100) conicStr += `#2A4031 ${cumulative}% 100%`;
  else conicStr = conicStr.slice(0, -2); // trim trailing comma

  const comp = data.comparison || {};
  const indiaPct  = comp.india_avg_per_ha  || 2500;
  const globalPct = comp.global_avg_per_ha || 3200;
  const maxBar    = Math.max(data.per_hectare_emission, indiaPct, globalPct, 1);
  const myBarW    = Math.min(100, Math.round((data.per_hectare_emission / maxBar) * 100));
  const indiaBarW = Math.min(100, Math.round((indiaPct / maxBar) * 100));
  const globalBarW= Math.min(100, Math.round((globalPct / maxBar) * 100));

  const tipsHTML = (data.reduction_tips || []).map((tip, i) => `
    <div class="carbon-tip-card" id="tip-${i}">
      <div class="tip-header" onclick="toggleTip(${i})">
        <span class="tip-saving">−${tip.saving_kg_co2e?.toLocaleString() || 0} kg CO₂e</span>
        <strong>${tip.title}</strong>
        <span class="tip-chevron">▼</span>
      </div>
      <div class="tip-body">
        <p>${tip.detail}</p>
        <small class="carbon-source">📖 Source: ${tip.source}</small>
      </div>
    </div>
  `).join('');

  const sourcesHTML = (data.sources || []).map(s => `
    <div class="carbon-source-item">📖 ${s}</div>
  `).join('');

  const seqHTML = Object.entries(data.sequestration_breakdown || {}).map(([k, v]) =>
    `<span class="seq-badge">✅ ${k.replace(/_/g, ' ')}: −${v.toLocaleString()} kg</span>`
  ).join('');

  return `
    <!-- Score Ring + Rating -->
    <div class="carbon-score-section">
      <div class="carbon-score-ring-wrapper">
        <div class="carbon-score-ring" style="background: conic-gradient(${conicStr})">
          <div class="carbon-score-hole">
            <div class="score-inner">
              <span class="score-rating" style="color:${ratingColor}; text-shadow: 0 0 20px ${ratingColor}55">${data.rating}</span>
              <span class="score-label">${data.rating_label}</span>
            </div>
          </div>
        </div>
        <div class="carbon-donut-legend">
          ${segments.map(s => `
            <div class="legend-item">
              <span class="legend-dot" style="background:${s.color}"></span>
              <span>${s.label} <strong>${s.pct}%</strong></span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Key Numbers -->
    <div class="carbon-metrics-grid">
      <div class="carbon-metric-card">
        <div class="metric-icon">💨</div>
        <div class="metric-value">${data.total_emission_kg_co2e?.toLocaleString()}</div>
        <div class="metric-label">Total Emission (kg CO₂e)</div>
      </div>
      <div class="carbon-metric-card highlight">
        <div class="metric-icon">🎯</div>
        <div class="metric-value">${data.net_emission?.toLocaleString()}</div>
        <div class="metric-label">Net Emission (after offsets)</div>
      </div>
      <div class="carbon-metric-card">
        <div class="metric-icon">📐</div>
        <div class="metric-value">${data.per_hectare_emission?.toLocaleString()}</div>
        <div class="metric-label">Per Hectare (kg CO₂e/ha)</div>
      </div>
      <div class="carbon-metric-card sequestration">
        <div class="metric-icon">🌿</div>
        <div class="metric-value">−${data.sequestration_offset?.toLocaleString()}</div>
        <div class="metric-label">Sequestration Offset</div>
        <div class="seq-badges">${seqHTML || '<small>No organic practices selected</small>'}</div>
      </div>
    </div>

    <!-- Emission Breakdown Bars -->
    <div class="carbon-breakdown-card">
      <h3>📊 ${t('carbon.breakdown')}</h3>
      <div class="carbon-bars">
        ${[
          { label: '🌾 Crop Emissions', value: breakdown.crop_emissions, color: '#2DA858', source: 'IPCC 2006/2019 Ch5 & Ch11' },
          { label: '🧪 Fertilizer Emissions', value: breakdown.fertilizer_emissions, color: '#F59E0B', source: 'IFA 2018 + IPCC N2O EF' },
          { label: '💧 Irrigation Emissions', value: breakdown.irrigation_emissions, color: '#3B82F6', source: 'IARI pumping energy data' },
          { label: '🚜 Tillage Emissions', value: breakdown.tillage_emissions, color: '#EF4444', source: 'FAO CA guidelines' },
        ].map(bar => {
          const pct = Math.min(100, Math.round((bar.value / totalForChart) * 100));
          return `
            <div class="carbon-bar-row">
              <div class="bar-meta">
                <span class="bar-label">${bar.label}</span>
                <span class="bar-value">${bar.value?.toLocaleString()} kg CO₂e</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width:${pct}%; background:${bar.color}" data-width="${pct}"></div>
              </div>
              <small class="bar-source">📖 ${bar.source}</small>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Comparison Section -->
    <div class="carbon-comparison-card">
      <h3>📈 How You Compare</h3>
      <div class="comparison-bars">
        <div class="cmp-row">
          <span class="cmp-label">Your Farm</span>
          <div class="cmp-track">
            <div class="cmp-fill your-farm" style="width:${myBarW}%" data-width="${myBarW}"></div>
          </div>
          <span class="cmp-val">${data.per_hectare_emission?.toLocaleString()} kg/ha</span>
        </div>
        <div class="cmp-row">
          <span class="cmp-label">🇮🇳 India Avg</span>
          <div class="cmp-track">
            <div class="cmp-fill india-avg" style="width:${indiaBarW}%" data-width="${indiaBarW}"></div>
          </div>
          <span class="cmp-val">${indiaPct.toLocaleString()} kg/ha</span>
        </div>
        <div class="cmp-row">
          <span class="cmp-label">🌐 Global Avg</span>
          <div class="cmp-track">
            <div class="cmp-fill global-avg" style="width:${globalBarW}%" data-width="${globalBarW}"></div>
          </div>
          <span class="cmp-val">${globalPct.toLocaleString()} kg/ha</span>
        </div>
      </div>
      <div class="comparison-badges">
        <span class="cmp-badge ${comp.vs_india_pct < 0 ? 'better' : 'worse'}">
          ${comp.vs_india_label || ''}
        </span>
        <span class="cmp-badge ${comp.vs_global_pct < 0 ? 'better' : 'worse'}">
          ${comp.vs_global_label || ''}
        </span>
      </div>
      <small class="cmp-source">📖 India avg: INCCA 2010 National Report · Global avg: FAO 2019</small>
    </div>

    <!-- Equivalences -->
    <div class="carbon-equivalence-card">
      <h3>🌳 What This Means in Real Life</h3>
      <div class="equiv-grid">
        <div class="equiv-item">
          <div class="equiv-icon">🌳</div>
          <div class="equiv-num">${data.equivalent_trees?.toLocaleString()}</div>
          <div class="equiv-label">Trees needed to absorb this<br/><small>~22 kg CO₂/tree/year · US Forest Service</small></div>
        </div>
        <div class="equiv-item">
          <div class="equiv-icon">🚗</div>
          <div class="equiv-num">${data.equivalent_car_km?.toLocaleString()}</div>
          <div class="equiv-label">Car kilometres equivalent<br/><small>~0.21 kg CO₂/km · IPCC 2019</small></div>
        </div>
      </div>
    </div>

    <!-- Reduction Tips -->
    ${tipsHTML ? `
    <div class="carbon-tips-card">
      <h3>💡 ${t('carbon.tips')}</h3>
      <p class="tips-subtitle">Specific, actionable reductions based on your farm profile:</p>
      ${tipsHTML}
    </div>
    ` : ''}

    <!-- Science Sources (accordion) -->
    <div class="carbon-sources-card">
      <div class="sources-header" id="sources-toggle" onclick="toggleSources()">
        <h3>🔬 ${t('carbon.sources')}</h3>
        <span id="sources-chevron">▼</span>
      </div>
      <div class="sources-body" id="sources-body">
        <p class="methodology">${data.methodology}</p>
        <div class="sources-list">
          ${sourcesHTML}
          <div class="carbon-source-item">📖 Tree absorption: US Forest Service — 22 kg CO₂/tree/year</div>
          <div class="carbon-source-item">📖 Car emissions: IPCC 2019 — 0.21 kg CO₂/km petrol car</div>
        </div>
      </div>
    </div>

    <!-- Recalculate Button -->
    <div class="carbon-recalculate">
      <button class="btn btn-secondary" id="carbon-recalculate-btn">
        ${t('carbon.recalculate')}
      </button>
    </div>
  `;
}

// ============================================
// INIT
// ============================================
export function initCarbon() {
  const calcBtn = document.getElementById('carbon-calculate-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', handleCalculate);
  }
}

async function handleCalculate() {
  const btn = document.getElementById('carbon-calculate-btn');
  const resultsEl = document.getElementById('carbon-results');

  const cropType      = document.getElementById('c-crop')?.value;
  const area          = parseFloat(document.getElementById('c-area')?.value);
  const fertType      = document.getElementById('c-fert')?.value;
  const fertQty       = parseFloat(document.getElementById('c-fert-qty')?.value);
  const irrigation    = document.getElementById('c-irrigation')?.value;
  const tillage       = document.getElementById('c-tillage')?.value;
  const organicChecks = document.querySelectorAll('.practices-grid input[type=checkbox]:checked');
  const organicPractices = Array.from(organicChecks).map(el => el.value);

  if (!cropType || !area || area <= 0 || !fertType || isNaN(fertQty) || fertQty < 0 || !irrigation || !tillage) {
    showError(resultsEl, 'Please fill in all required fields with valid values.');
    return;
  }

  btn.disabled = true;
  btn.textContent = t('carbon.calculating');

  resultsEl.classList.remove('hidden');
  resultsEl.innerHTML = `
    <div class="carbon-loading">
      <div class="loading-spinner"></div>
      <p>Calculating using IPCC 2019 emission factors…</p>
    </div>
  `;
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

  try {
    const data = await getCarbonEstimate({
      crop_type: cropType,
      area_hectares: area,
      fertilizer_type: fertType,
      fertilizer_qty_kg: fertQty,
      irrigation_method: irrigation,
      tillage_practice: tillage,
      organic_practices: organicPractices,
    });

    resultsEl.innerHTML = `
      <div class="results-header">
        <h2>${t('carbon.result_title')}</h2>
        <p>Farm: <strong>${area} ha</strong> · Crop: <strong>${cropType}</strong> · Fertilizer: <strong>${fertType} (${fertQty} kg)</strong></p>
      </div>
      ${renderResults(data)}
    `;

    // Animate bars after render
    setTimeout(animateBars, 100);

    // Attach tip toggle handlers
    window.toggleTip = (i) => {
      const card = document.getElementById(`tip-${i}`);
      card?.classList.toggle('open');
    };
    window.toggleSources = () => {
      const body = document.getElementById('sources-body');
      const chevron = document.getElementById('sources-chevron');
      if (body) body.classList.toggle('open');
      if (chevron) chevron.textContent = body?.classList.contains('open') ? '▲' : '▼';
    };

    // Recalculate button
    document.getElementById('carbon-recalculate-btn')?.addEventListener('click', () => {
      resultsEl.classList.add('hidden');
      resultsEl.innerHTML = '';
      document.getElementById('carbon-form-section')?.scrollIntoView({ behavior: 'smooth' });
    });

  } catch (err) {
    showError(resultsEl, err.message || 'Calculation failed. Make sure the backend is running.');
  } finally {
    btn.disabled = false;
    btn.textContent = t('carbon.calculate');
  }
}

function showError(el, msg) {
  el.classList.remove('hidden');
  el.innerHTML = `<div class="error-message">⚠️ ${msg}</div>`;
}

function animateBars() {
  document.querySelectorAll('.bar-fill, .cmp-fill').forEach(bar => {
    const target = bar.dataset.width || bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = target + (target.endsWith('%') ? '' : '%');
    }, 50);
  });
}
