// ============================================
// Crop Calendar Page — Agri-Connect
// ============================================

import { t } from '../i18n.js';
import { showToast } from '../voice.js';

const API_BASE = 'http://127.0.0.1:5000';

// Month order for "in season" detection
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const NOW_MONTH = new Date().getMonth(); // 0-indexed

export function renderCropCalendar() {
  return `
    <div class="page-crop-calendar">
      <div class="page-header">
        <h1>🗓️ ${t('cropCalendar.title')}</h1>
        <p class="page-subtitle">${t('cropCalendar.subtitle')}</p>
      </div>

      <div class="calendar-filters card">
        <div class="filter-row">
          <div class="form-group">
            <label>🗺️ ${t('cropCalendar.region')}</label>
            <select id="cal-region" class="form-input">
              <option value="">All Regions</option>
              <option value="North">North India</option>
              <option value="South">South India</option>
              <option value="East">East India</option>
              <option value="West">West India</option>
              <option value="Central">Central India</option>
            </select>
          </div>
          <div class="form-group">
            <label>☀️ ${t('cropCalendar.season')}</label>
            <select id="cal-season" class="form-input">
              <option value="">All Seasons</option>
              <option value="Kharif">Kharif (Jun–Nov)</option>
              <option value="Rabi">Rabi (Nov–Apr)</option>
              <option value="Zaid">Zaid (Apr–Jun)</option>
            </select>
          </div>
          <div class="form-group" style="align-self:flex-end;">
            <button class="btn btn-primary" id="cal-load-btn">🗓️ ${t('cropCalendar.load')}</button>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="calendar-legend">
        <span class="legend-item legend-current">🟢 Currently In Season</span>
        <span class="legend-item legend-upcoming">🟡 Upcoming</span>
        <span class="legend-item legend-off">⚪ Off Season</span>
      </div>

      <div id="calendar-results">
        <div class="calendar-placeholder">
          <div class="placeholder-icon">🗓️</div>
          <p>${t('cropCalendar.placeholder')}</p>
        </div>
      </div>
    </div>
  `;
}

export function initCropCalendar() {
  document.getElementById('cal-load-btn')?.addEventListener('click', loadCalendar);
  // Auto-load with default filters
  loadCalendar();
}

async function loadCalendar() {
  const region = document.getElementById('cal-region')?.value || '';
  const season = document.getElementById('cal-season')?.value || '';
  const resultsEl = document.getElementById('calendar-results');

  resultsEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">Loading crop calendar...</div>
    </div>
  `;

  try {
    const params = new URLSearchParams();
    if (region) params.append('region', region);
    if (season) params.append('season', season);

    const response = await fetch(`${API_BASE}/api/crop-calendar?${params}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error);
    if (!data.calendar || data.calendar.length === 0) {
      resultsEl.innerHTML = `<div class="empty-state">No crops found for selected filters.</div>`;
      return;
    }

    resultsEl.innerHTML = renderCalendarResults(data.calendar);

  } catch (err) {
    resultsEl.innerHTML = `<div class="error-card">❌ ${err.message}</div>`;
  }
}

function getSeasonStatus(sowWindow, harvestWindow) {
  // Simple heuristic: check if current month falls roughly in sow or harvest window
  const text = `${sowWindow} ${harvestWindow}`.toLowerCase();
  const monthNames = MONTHS.map(m => m.toLowerCase());
  const currentMonthName = monthNames[NOW_MONTH];

  if (text.includes(currentMonthName)) {
    return 'current';  // in season now
  }
  // Check upcoming months (next 1-2 months)
  const nextMonth = monthNames[(NOW_MONTH + 1) % 12];
  const nextMonth2 = monthNames[(NOW_MONTH + 2) % 12];
  if (text.includes(nextMonth) || text.includes(nextMonth2)) {
    return 'upcoming';
  }
  return 'off';
}

function renderCalendarResults(calendar) {
  // Group by crop
  const byCrop = {};
  calendar.forEach(entry => {
    if (!byCrop[entry.crop]) byCrop[entry.crop] = [];
    byCrop[entry.crop].push(entry);
  });

  const cards = Object.entries(byCrop).map(([crop, entries]) => {
    const rows = entries.map(e => {
      const status = getSeasonStatus(e.sow_window, e.harvest_window);
      const statusIcon = status === 'current' ? '🟢' : status === 'upcoming' ? '🟡' : '⚪';
      const statusClass = `cal-status-${status}`;
      return `
        <div class="calendar-entry ${statusClass}">
          <div class="cal-region-season">
            <span class="cal-region-tag">${e.region}</span>
            <span class="cal-season-tag">${e.season}</span>
            <span class="cal-status-icon">${statusIcon}</span>
          </div>
          <div class="cal-windows">
            <div class="cal-window">
              <span class="cal-window-icon">🌱</span>
              <span class="cal-window-label">Sow:</span>
              <span class="cal-window-value">${e.sow_window}</span>
            </div>
            <div class="cal-window">
              <span class="cal-window-icon">🌾</span>
              <span class="cal-window-label">Harvest:</span>
              <span class="cal-window-value">${e.harvest_window}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="calendar-crop-card card">
        <h3 class="calendar-crop-name">🌿 ${crop}</h3>
        <div class="calendar-entries">${rows}</div>
      </div>
    `;
  }).join('');

  return `<div class="calendar-grid">${cards}</div>`;
}
