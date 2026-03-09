// ============================================
// Farm Analysis Page — Multi-Step Wizard
// ============================================

import { getWeather, predictCrop, predictFertilizer, getSoilAnalysis } from '../api.js';
import { showToast, setupMicButtons } from '../voice.js';
import { t } from '../i18n.js';

let wizardStep = 1;
let collectedData = {};

export function renderAnalysis() {
  wizardStep = 1;
  collectedData = {};

  return `
    <div class="page-section">
      <div class="page-header">
        <h1>${t('analysis.title')}</h1>
        <p>${t('analysis.subtitle')}</p>
      </div>

      <div class="wizard">
        <div class="wizard-progress">
          <div class="wizard-step-indicator">
            <div class="wizard-step-dot active" id="dot-1">1</div>
            <div class="wizard-step-line" id="line-1"></div>
            <div class="wizard-step-dot" id="dot-2">2</div>
            <div class="wizard-step-line" id="line-2"></div>
            <div class="wizard-step-dot" id="dot-3">3</div>
            <div class="wizard-step-line" id="line-3"></div>
            <div class="wizard-step-dot" id="dot-4">4</div>
          </div>
        </div>

        <!-- Step 1: Location -->
        <div class="wizard-panel active" id="step-1">
          <div class="card">
            <h3 class="section-title"><span class="icon">📍</span> ${t('analysis.step1')}</h3>
            <p style="color:var(--c-text-secondary);margin-bottom:16px;">${t('analysis.step1.desc')}</p>
            <div class="form-grid">
              <div class="form-group" style="grid-column:1/-1;">
                <label>${t('analysis.location')}</label>
                <div class="input-with-mic">
                  <input type="text" class="form-input" id="w-location" placeholder="${t('analysis.locationPlaceholder')}" />
                  <button class="mic-btn" title="Voice input">🎤</button>
                </div>
              </div>
              <div class="form-group">
                <label>${t('analysis.landArea')} <span class="hint">${t('analysis.acres')}</span></label>
                <input type="number" class="form-input" id="w-acres" value="5" min="0.5" step="0.5" placeholder="5" />
              </div>
              <div class="form-group">
                <label>${t('analysis.region')}</label>
                <select class="form-select" id="w-region">
                  <option value="South">${t('common.south')}</option>
                  <option value="North">${t('common.north')}</option>
                  <option value="East">${t('common.east')}</option>
                  <option value="West">${t('common.west')}</option>
                </select>
              </div>
            </div>
            <div style="margin-top:12px;">
              <button class="gps-btn" id="analysis-gps-btn">${t('analysis.useLocation')}</button>
            </div>
            <div class="wizard-actions">
              <div></div>
              <button class="btn btn-primary" id="step1-next">${t('analysis.nextCrop')}</button>
            </div>
          </div>
        </div>

        <!-- Step 2: Previous Crop & Chemicals -->
        <div class="wizard-panel" id="step-2">
          <div class="card">
            <h3 class="section-title"><span class="icon">🌿</span> ${t('analysis.step2')}</h3>
            <p style="color:var(--c-text-secondary);margin-bottom:16px;">${t('analysis.step2.desc')}</p>
            <div class="form-grid">
              <div class="form-group">
                <label>${t('analysis.prevCrop')}</label>
                <select class="form-select" id="w-prev-crop">
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Maize">Maize</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Potato">Potato</option>
                  <option value="Tomato">Tomato</option>
                </select>
              </div>
              <div class="form-group">
                <label>${t('analysis.season')}</label>
                <select class="form-select" id="w-season">
                  <option value="Kharif">Kharif (Jun–Oct)</option>
                  <option value="Rabi">Rabi (Oct–Mar)</option>
                  <option value="Zaid">Zaid (Mar–Jun)</option>
                </select>
              </div>
              <div class="form-group">
                <label>${t('analysis.prevFertilizer')}</label>
                <select class="form-select" id="w-prev-fert">
                  <option value="Urea">Urea</option>
                  <option value="DAP">DAP</option>
                  <option value="NPK">NPK</option>
                  <option value="MOP">MOP</option>
                  <option value="Compost">Compost</option>
                  <option value="Zinc Sulphate">Zinc Sulphate</option>
                  <option value="SSP">SSP</option>
                </select>
              </div>
              <div class="form-group">
                <label>${t('analysis.prevPesticide')}</label>
                <select class="form-select" id="w-prev-pest">
                  <option value="Neem oil">Neem oil (Organic)</option>
                  <option value="Imidacloprid">Imidacloprid</option>
                  <option value="Chlorpyrifos">Chlorpyrifos</option>
                  <option value="Glyphosate">Glyphosate</option>
                  <option value="Spinosad">Spinosad</option>
                  <option value="Emamectin benzoate">Emamectin benzoate</option>
                </select>
              </div>
              <div class="form-group">
                <label>${t('analysis.lastYield')} <span class="hint">${t('analysis.kgTotal')}</span></label>
                <input type="number" class="form-input" id="w-yield-last" value="4000" min="0" placeholder="4000" />
              </div>
              <div class="form-group">
                <label>${t('analysis.irrigation')}</label>
                <select class="form-select" id="w-irrigation">
                  <option value="Drip">Drip</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood">Flood</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>
            <div class="wizard-actions">
              <button class="btn btn-secondary" id="step2-back">${t('analysis.back')}</button>
              <button class="btn btn-primary" id="step2-next">${t('analysis.nextSoil')}</button>
            </div>
          </div>
        </div>

        <!-- Step 3: Soil Details -->
        <div class="wizard-panel" id="step-3">
          <div class="card">
            <h3 class="section-title"><span class="icon">🧪</span> ${t('analysis.step3')}</h3>
            <p style="color:var(--c-text-secondary);margin-bottom:16px;">${t('analysis.step3.desc')}</p>
            <div class="form-grid">
              <div class="form-group">
                <label>${t('analysis.soilType')}</label>
                <select class="form-select" id="w-soil-type">
                  <option value="Loamy">Loamy</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Silt">Silt</option>
                </select>
              </div>
              <div class="form-group">
                <label>${t('analysis.nitrogen')} <span class="hint">0–140</span></label>
                <input type="number" class="form-input" id="w-n" min="0" max="140" placeholder="e.g. 90" />
              </div>
              <div class="form-group">
                <label>${t('analysis.phosphorus')} <span class="hint">0–145</span></label>
                <input type="number" class="form-input" id="w-p" min="0" max="145" placeholder="e.g. 42" />
              </div>
              <div class="form-group">
                <label>${t('analysis.potassium')} <span class="hint">0–205</span></label>
                <input type="number" class="form-input" id="w-k" min="0" max="205" placeholder="e.g. 43" />
              </div>
              <div class="form-group">
                <label>${t('analysis.soilPh')} <span class="hint">3.5–10</span></label>
                <input type="number" class="form-input" id="w-ph" min="3.5" max="10" step="0.1" placeholder="e.g. 6.5" />
              </div>
              <div class="form-group">
                <label>${t('analysis.rainfall')} <span class="hint">(mm)</span></label>
                <input type="number" class="form-input" id="w-rainfall" min="20" max="500" placeholder="e.g. 200" />
              </div>
              <div class="form-group">
                <label>${t('analysis.soilMoisture')} <span class="hint">20–80%</span></label>
                <input type="number" class="form-input" id="w-moisture" min="20" max="80" placeholder="e.g. 40" />
              </div>
              <div class="form-group">
                <label>${t('analysis.organicCarbon')} <span class="hint">0.5–2.0</span></label>
                <input type="number" class="form-input" id="w-oc" min="0.5" max="2.0" step="0.1" placeholder="e.g. 1.2" />
              </div>
              <div class="form-group">
                <label>${t('analysis.ec')} <span class="hint">0–2</span></label>
                <input type="number" class="form-input" id="w-ec" min="0" max="2" step="0.1" placeholder="e.g. 0.5" />
              </div>
            </div>
            <div class="wizard-actions">
              <button class="btn btn-secondary" id="step3-back">${t('analysis.back')}</button>
              <button class="btn btn-accent btn-lg" id="step3-submit">${t('analysis.analyze')}</button>
            </div>
          </div>
        </div>

        <!-- Step 4: Results -->
        <div class="wizard-panel" id="step-4">
          <div id="analysis-results"></div>
        </div>
      </div>
    </div>
  `;
}

export function initAnalysis() {
  // GPS
  document.getElementById('analysis-gps-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('analysis-gps-btn');
    const input = document.getElementById('w-location');
    if (!navigator.geolocation) { showToast('Geolocation not supported', 'error'); return; }

    btn.classList.add('loading');
    btn.textContent = '📍 Locating...';

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
          );
          const data = await res.json();
          input.value = data.city || data.locality || data.principalSubdivision || 'Unknown';
          showToast(`📍 Location: ${input.value}`, 'success');
        } catch { showToast('Could not get location', 'error'); }
        btn.classList.remove('loading');
        btn.textContent = t('analysis.useLocation');
      },
      () => {
        showToast('Location access denied', 'error');
        btn.classList.remove('loading');
        btn.textContent = t('analysis.useLocation');
      }
    );
  });

  // Step navigation
  document.getElementById('step1-next')?.addEventListener('click', () => {
    const loc = document.getElementById('w-location')?.value.trim();
    if (!loc) { showToast('Please enter your location', 'error'); return; }
    collectedData.location = loc;
    collectedData.acres = parseFloat(document.getElementById('w-acres')?.value) || 5;
    collectedData.region = document.getElementById('w-region')?.value || 'South';
    goToStep(2);
  });

  document.getElementById('step2-back')?.addEventListener('click', () => goToStep(1));
  document.getElementById('step2-next')?.addEventListener('click', async () => {
    collectedData.previous_crop = document.getElementById('w-prev-crop')?.value;
    collectedData.season = document.getElementById('w-season')?.value;
    collectedData.previous_fertilizer = document.getElementById('w-prev-fert')?.value;
    collectedData.previous_pesticide = document.getElementById('w-prev-pest')?.value;
    collectedData.yield_last = parseFloat(document.getElementById('w-yield-last')?.value) || 4000;
    collectedData.irrigation = document.getElementById('w-irrigation')?.value;

    // PRE-FETCH SOIL DATA BASED ON LOCATION
    if (collectedData.location) {
      const btn = document.getElementById('step2-next');
      const originalText = btn.textContent;
      btn.textContent = 'Loading...';
      btn.classList.add('loading');

      try {
        const res = await fetch(`http://127.0.0.1:5000/api/soil-data?location=${encodeURIComponent(collectedData.location)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.soil_profile) {
            const p = data.soil_profile;
            document.getElementById('w-soil-type').value = p.soil_type;
            document.getElementById('w-n').value = p.N;
            document.getElementById('w-p').value = p.P;
            document.getElementById('w-k').value = p.K;
            document.getElementById('w-ph').value = p.ph;
            document.getElementById('w-moisture').value = p.moisture;
            document.getElementById('w-oc').value = p.organic_carbon;
            document.getElementById('w-ec').value = p.ec;

            showToast(`✅ Synced regional soil profile for ${data.location}`, 'success');
          }
        }
      } catch (err) {
        console.warn("Could not fetch soil data automatically", err);
      } finally {
        btn.textContent = originalText;
        btn.classList.remove('loading');
      }
    }

    goToStep(3);
  });

  document.getElementById('step3-back')?.addEventListener('click', () => goToStep(2));
  document.getElementById('step3-submit')?.addEventListener('click', () => submitAnalysis());

  setupMicButtons();
}

function goToStep(step) {
  wizardStep = step;
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`step-${step}`)?.classList.add('active');

  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot-${i}`);
    const line = document.getElementById(`line-${i}`);
    if (dot) {
      dot.classList.remove('active', 'completed');
      if (i < step) dot.classList.add('completed');
      if (i === step) dot.classList.add('active');
    }
    if (line) {
      line.classList.toggle('completed', i < step);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitAnalysis() {
  collectedData.soil_type = document.getElementById('w-soil-type')?.value;

  // Validate and collect required soil fields — no random fallbacks
  const fieldValidations = [
    { id: 'w-n',        key: 'N',              label: 'Nitrogen (N)',        parse: parseFloat },
    { id: 'w-p',        key: 'P',              label: 'Phosphorus (P)',      parse: parseFloat },
    { id: 'w-k',        key: 'K',              label: 'Potassium (K)',       parse: parseFloat },
    { id: 'w-ph',       key: 'ph',             label: 'Soil pH',             parse: parseFloat },
    { id: 'w-rainfall', key: 'rainfall',       label: 'Rainfall',            parse: parseFloat },
    { id: 'w-moisture', key: 'soil_moisture',  label: 'Soil Moisture',       parse: parseFloat },
    { id: 'w-oc',       key: 'organic_carbon', label: 'Organic Carbon',      parse: parseFloat },
    { id: 'w-ec',       key: 'ec',             label: 'Electrical Conductivity', parse: parseFloat },
  ];

  for (const field of fieldValidations) {
    const raw = document.getElementById(field.id)?.value?.trim();
    const val = field.parse(raw);
    if (!raw || isNaN(val)) {
      showToast(`Please fill in ${field.label} value`, 'error');
      return;
    }
    collectedData[field.key] = val;
  }

  goToStep(4);

  const resultsEl = document.getElementById('analysis-results');
  resultsEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">${t('analysis.analyzing')}</div>
      <div class="loading-text" style="font-size:0.8rem;">Fetching weather • Predicting crop • Analyzing soil</div>
    </div>
  `;

  try {
    // 1. Fetch weather
    const weather = await getWeather(collectedData.location);
    if (weather.error) throw new Error(`Weather: ${weather.error}`);

    const temperature = weather.temperature;
    const humidity = weather.humidity;

    // 2. Predict crop
    const cropResult = await predictCrop({
      N: collectedData.N,
      P: collectedData.P,
      K: collectedData.K,
      temperature,
      humidity,
      ph: collectedData.ph,
      rainfall: collectedData.rainfall,
    });

    // 3. Predict fertilizer
    const fertResult = await predictFertilizer({
      soil_type: collectedData.soil_type,
      soil_ph: collectedData.ph,
      soil_moisture: collectedData.soil_moisture,
      organic_carbon: collectedData.organic_carbon,
      electrical_conductivity: collectedData.ec,
      N: collectedData.N,
      P: collectedData.P,
      K: collectedData.K,
      temperature,
      humidity,
      rainfall: collectedData.rainfall,
      crop_type: collectedData.previous_crop,
      growth_stage: 'Vegetative',
      season: collectedData.season,
      irrigation: collectedData.irrigation,
      previous_crop: collectedData.previous_crop,
      region: collectedData.region,
      fertilizer_usage: collectedData.previous_fertilizer,
      yield_last: collectedData.yield_last,
    });

    // 4. Soil analysis
    const soilResult = await getSoilAnalysis({
      previous_pesticides: [collectedData.previous_pesticide],
      previous_fertilizers: [collectedData.previous_fertilizer],
      soil_type: collectedData.soil_type,
      previous_crop: collectedData.previous_crop,
    });

    // Render results
    renderResults(weather, cropResult, fertResult, soilResult);

  } catch (err) {
    resultsEl.innerHTML = `
      <div class="card" style="text-align:center;">
        <p style="color:var(--c-danger);font-size:1.1rem;">⚠️ ${err.message}</p>
        <button class="btn btn-secondary" style="margin-top:16px;" onclick="document.getElementById('dot-1').click()">${t('analysis.back')}</button>
      </div>
    `;
  }
}

function renderResults(weather, cropResult, fertResult, soilResult) {
  const resultsEl = document.getElementById('analysis-results');
  const best = cropResult.best_crop;
  const profit = best?.profit;
  const pests = best?.pests;
  const bestFert = fertResult.best_fertilizer;
  const acres = collectedData.acres || 1;
  const hectares = acres * 0.4047;

  let html = '';

  // ========== HERO RESULT ==========
  html += `
    <div class="result-card best" style="margin-bottom:24px;">
      <div class="result-hero">
        <div style="font-size:0.9rem;color:var(--c-text-muted);margin-bottom:4px;">AI RECOMMENDS</div>
        <div class="crop-name">${best.crop.toUpperCase()}</div>
        <div class="confidence">Confidence: ${best.confidence}%</div>
        <div class="confidence-bar" style="max-width:300px;margin:12px auto 0;">
          <div class="confidence-fill" style="width:${best.confidence}%;"></div>
        </div>
      </div>
    </div>
  `;

  // ========== WEATHER + LOCATION ==========
  html += `
    <div class="results-grid" style="margin-bottom:24px;">
      <div class="card">
        <h3 class="section-title"><span class="icon">📍</span> Location & Weather</h3>
        <div class="metric-row"><span class="metric-label">Location</span><span class="metric-value">${collectedData.location}</span></div>
        <div class="metric-row"><span class="metric-label">Land Area</span><span class="metric-value">${acres} acres (${hectares.toFixed(2)} ha)</span></div>
        <div class="metric-row"><span class="metric-label">Temperature</span><span class="metric-value">${weather.temperature}°C</span></div>
        <div class="metric-row"><span class="metric-label">Humidity</span><span class="metric-value">${weather.humidity}%</span></div>
        <div class="metric-row"><span class="metric-label">Weather</span><span class="metric-value">${weather.description}</span></div>
      </div>

      <div class="card">
        <h3 class="section-title"><span class="icon">🧪</span> Soil Summary</h3>
        <div class="metric-row"><span class="metric-label">Soil Type</span><span class="metric-value">${collectedData.soil_type}</span></div>
        <div class="metric-row"><span class="metric-label">N · P · K</span><span class="metric-value">${collectedData.N} · ${collectedData.P} · ${collectedData.K}</span></div>
        <div class="metric-row"><span class="metric-label">pH Level</span><span class="metric-value">${collectedData.ph}</span></div>
        <div class="metric-row"><span class="metric-label">Moisture</span><span class="metric-value">${collectedData.soil_moisture}%</span></div>
        <div class="metric-row"><span class="metric-label">Organic Carbon</span><span class="metric-value">${collectedData.organic_carbon}</span></div>
      </div>
    </div>
  `;

  // ========== PROFIT ESTIMATE ==========
  if (profit) {
    const totalProfit = Math.round(profit.net_profit * hectares);
    const totalIncome = Math.round(profit.gross_income * hectares);
    const totalCost = Math.round(profit.total_cost * hectares);

    html += `
      <div class="card" style="margin-bottom:24px;">
        <h3 class="section-title"><span class="icon">💰</span> Profit Estimate (${acres} acres)</h3>
        <div class="results-grid">
          <div>
            <div class="metric-row"><span class="metric-label">Price per kg (Govt MSP)</span><span class="metric-value">₹${profit.price_per_kg}</span></div>
            <div class="metric-row"><span class="metric-label">Expected Yield</span><span class="metric-value">${Math.round(profit.estimated_yield_kg * hectares).toLocaleString()} kg</span></div>
            <div class="metric-row"><span class="metric-label">Gross Income</span><span class="metric-value profit">₹${totalIncome.toLocaleString()}</span></div>
          </div>
          <div>
            <div class="metric-row"><span class="metric-label">Fertilizer Cost</span><span class="metric-value cost">₹${Math.round(profit.cost_breakdown.fertilizer * hectares).toLocaleString()}</span></div>
            <div class="metric-row"><span class="metric-label">Seeds + Labor + Other</span><span class="metric-value cost">₹${Math.round((profit.cost_breakdown.seeds + profit.cost_breakdown.labor + profit.cost_breakdown.other) * hectares).toLocaleString()}</span></div>
            <div class="metric-row"><span class="metric-label">Total Cost</span><span class="metric-value cost">₹${totalCost.toLocaleString()}</span></div>
            <div class="metric-row" style="border-bottom:none;"><span class="metric-label" style="font-weight:700;color:var(--c-text);">NET PROFIT</span><span class="metric-value profit" style="font-size:1.3rem;">₹${totalProfit.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  // ========== FERTILIZER RECOMMENDATION ==========
  if (bestFert) {
    html += `
      <div class="card" style="margin-bottom:24px;">
        <h3 class="section-title"><span class="icon">🧬</span> Fertilizer Recommendation</h3>
        <div class="metric-row"><span class="metric-label">Best Fertilizer</span><span class="metric-value" style="color:var(--c-accent);">${bestFert.fertilizer}</span></div>
        <div class="metric-row"><span class="metric-label">Confidence</span><span class="metric-value">${bestFert.confidence}%</span></div>
        <div class="metric-row"><span class="metric-label">NPK Ratio</span><span class="metric-value">${bestFert.details?.npk || 'N/A'}</span></div>
        <div class="metric-row"><span class="metric-label">Quantity / Hectare</span><span class="metric-value">${bestFert.details?.qty_per_ha || 'N/A'} kg</span></div>
        <div class="metric-row"><span class="metric-label">Cost per kg</span><span class="metric-value">₹${bestFert.details?.cost_per_kg || 'N/A'}</span></div>
        ${fertResult.alternatives?.length ? `
          <div style="margin-top:12px;">
            <div style="font-size:0.85rem;color:var(--c-text-muted);margin-bottom:8px;">Alternatives:</div>
            ${fertResult.alternatives.map(a => `
              <div class="metric-row">
                <span class="metric-label">${a.fertilizer}</span>
                <span class="metric-value">${a.confidence}%</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ========== PEST ALERT ==========
  if (pests) {
    html += `
      <div class="card" style="margin-bottom:24px;">
        <h3 class="section-title"><span class="icon">🐛</span> Pest Alert for ${best.crop}</h3>
        <div class="metric-row"><span class="metric-label">Common Pests</span><span class="metric-value">${pests.pests?.join(', ') || 'N/A'}</span></div>
        <div class="metric-row"><span class="metric-label">Organic Solution</span><span class="metric-value">${pests.organic?.join(', ') || 'N/A'}</span></div>
        <div class="metric-row"><span class="metric-label">Chemical Option</span><span class="metric-value">${pests.chemical?.join(', ') || 'N/A'}</span></div>
      </div>
    `;
  }

  // ========== SOIL HEALTH ANALYSIS ==========
  if (soilResult && !soilResult.error) {
    const scoreColor = soilResult.soil_health_score >= 70 ? 'var(--c-success)' :
      soilResult.soil_health_score >= 50 ? 'var(--c-warning)' : 'var(--c-danger)';

    html += `
      <div class="card" style="margin-bottom:24px;">
        <h3 class="section-title"><span class="icon">🔬</span> Soil Health Analysis</h3>
        <div style="text-align:center;margin-bottom:20px;">
          <div class="soil-health-ring" style="background:conic-gradient(${scoreColor} ${soilResult.soil_health_score * 3.6}deg, var(--c-surface) 0deg);">
            <div style="width:110px;height:110px;border-radius:50%;background:var(--c-bg-card);display:flex;align-items:center;justify-content:center;flex-direction:column;">
              <span class="score" style="color:${scoreColor};">${soilResult.soil_health_score}</span>
              <span style="font-size:0.7rem;color:var(--c-text-muted);">/100</span>
            </div>
          </div>
          <div style="margin-top:8px;">
            <span class="severity-badge ${soilResult.overall_severity}">${soilResult.overall_severity} impact</span>
          </div>
          <p style="color:var(--c-text-secondary);margin-top:8px;font-size:0.9rem;">${soilResult.recommendation}</p>
        </div>

        ${soilResult.pesticide_analysis?.length ? `
          <div style="margin-bottom:16px;">
            <div style="font-weight:700;margin-bottom:8px;">Pesticide Effects (${collectedData.previous_pesticide}):</div>
            ${soilResult.pesticide_analysis.map(p => `
              <div style="margin-bottom:8px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span style="font-weight:600;">${p.name}</span>
                  <span class="severity-badge ${p.severity}">${p.severity}</span>
                  <span style="font-size:0.75rem;color:var(--c-text-muted);">${p.persistence || ''}</span>
                </div>
                <ul style="list-style:none;padding:0;">
                  ${p.effects.map(e => `<li style="font-size:0.85rem;color:var(--c-text-secondary);padding:2px 0;">⚠️ ${e}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${soilResult.fertilizer_analysis?.length ? `
          <div style="margin-bottom:16px;">
            <div style="font-weight:700;margin-bottom:8px;">Fertilizer Effects (${collectedData.previous_fertilizer}):</div>
            ${soilResult.fertilizer_analysis.map(f => `
              <div style="margin-bottom:4px;">
                <span style="font-weight:600;">${f.name}</span>
                <span class="severity-badge ${f.severity}" style="margin-left:8px;">${f.severity}</span>
                <ul style="list-style:none;padding:0;">
                  ${f.effects.map(e => `<li style="font-size:0.85rem;color:var(--c-text-secondary);padding:2px 0;">⚠️ ${e}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div>
          <div style="font-weight:700;margin-bottom:8px;">✅ Solutions to Improve Soil Health:</div>
          <ul class="solution-list">
            ${soilResult.remediation_solutions?.map(s => `<li>${s}</li>`).join('') || ''}
          </ul>
        </div>
      </div>
    `;
  }

  // ========== ALTERNATIVE CROPS ==========
  if (cropResult.alternatives?.length) {
    html += `
      <div class="card" style="margin-bottom:24px;">
        <h3 class="section-title"><span class="icon">🌱</span> Alternative Crops</h3>
        <table class="alt-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Confidence</th>
              <th>Net Profit/ha</th>
              <th>Yield/ha</th>
            </tr>
          </thead>
          <tbody>
            ${cropResult.alternatives.map(alt => `
              <tr>
                <td style="font-weight:600;text-transform:capitalize;">${alt.crop}</td>
                <td>${alt.confidence}%</td>
                <td style="color:var(--c-success);">₹${alt.profit?.net_profit?.toLocaleString() || 'N/A'}</td>
                <td>${alt.profit?.estimated_yield_kg?.toLocaleString() || 'N/A'} kg</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ========== NEW ANALYSIS BUTTON ==========
  html += `
    <div style="text-align:center;margin-top:24px;">
      <button class="btn btn-secondary btn-lg" id="new-analysis-btn">${t('analysis.newAnalysis')}</button>
    </div>
  `;

  resultsEl.innerHTML = html;

  document.getElementById('new-analysis-btn')?.addEventListener('click', () => {
    collectedData = {};
    goToStep(1);

    // Reset form inputs
    const locationInput = document.getElementById('w-location');
    if (locationInput) locationInput.value = '';
  });
}
