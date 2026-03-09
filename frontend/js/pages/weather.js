// ============================================
// Weather Dashboard Page — Agri-Connect
// ============================================

import { getWeather, getForecast } from '../api.js';
import { showToast, setupMicButtons } from '../voice.js';
import { t } from '../i18n.js';

export function renderWeather() {
  return `
    <div class="page-section">
      <div class="page-header">
        <h1>${t('weather.title')}</h1>
        <p>${t('weather.subtitle')}</p>
      </div>

      <div class="card" style="margin-bottom:24px;">
        <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
          <div class="form-group" style="flex:1;min-width:200px;">
            <label>${t('weather.location')}</label>
            <div class="input-with-mic">
              <input type="text" class="form-input" id="weather-city" placeholder="${t('weather.placeholder')}" />
              <button class="mic-btn" title="Voice input">🎤</button>
            </div>
          </div>
          <button class="gps-btn" id="weather-gps-btn">${t('weather.useMyLocation')}</button>
          <button class="btn btn-primary" id="weather-search-btn">${t('weather.getWeather')}</button>
        </div>
      </div>

      <div id="weather-results"></div>
    </div>
  `;
}

export function initWeather() {
  const searchBtn = document.getElementById('weather-search-btn');
  const gpsBtn = document.getElementById('weather-gps-btn');
  const cityInput = document.getElementById('weather-city');

  searchBtn?.addEventListener('click', () => {
    const city = cityInput?.value.trim();
    if (!city) {
      showToast('Please enter a city name', 'error');
      return;
    }
    fetchWeatherData(city);
  });

  cityInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn?.click();
  });

  gpsBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation not supported in this browser', 'error');
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
          const city = data.city || data.locality || data.principalSubdivision || 'Unknown';
          cityInput.value = city;
          fetchWeatherData(city);
        } catch {
          showToast('Could not determine city from location', 'error');
        }
        gpsBtn.classList.remove('loading');
        gpsBtn.textContent = t('weather.useMyLocation');
      },
      () => {
        showToast('Location access denied', 'error');
        gpsBtn.classList.remove('loading');
        gpsBtn.textContent = t('weather.useMyLocation');
      }
    );
  });

  setupMicButtons();
}

async function fetchWeatherData(city) {
  const resultsEl = document.getElementById('weather-results');
  if (!resultsEl) return;

  resultsEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <div class="loading-text">Fetching weather for ${city}...</div>
    </div>
  `;

  try {
    const [weather, forecast] = await Promise.all([
      getWeather(city),
      getForecast(city),
    ]);

    let html = '';

    // Current weather card
    if (!weather.error) {
      html += `
        <div class="weather-hero-card" style="margin-bottom:24px;">
          <div>
            <div class="weather-temp">${weather.temperature}<span class="unit">°C</span></div>
            <div class="weather-desc">${weather.description}</div>
            <div class="weather-location">📍 ${weather.city} · Feels like ${weather.feels_like}°C</div>
          </div>
          <div class="weather-details-grid">
            <div class="weather-detail">
              <div class="value">${weather.humidity}%</div>
              <div class="label">${t('weather.humidity')}</div>
            </div>
            <div class="weather-detail">
              <div class="value">${weather.rainfall} mm</div>
              <div class="label">${t('weather.rainfallLabel')}</div>
            </div>
            <div class="weather-detail">
              <div class="value">${weather.wind_speed} m/s</div>
              <div class="label">${t('weather.wind')}</div>
            </div>
            <div class="weather-detail">
              <div class="value">${weather.clouds}%</div>
              <div class="label">${t('weather.clouds')}</div>
            </div>
          </div>
        </div>
      `;
    }

    // Forecast
    if (forecast.forecast && !forecast.error) {
      html += `<h3 class="section-title">${t('weather.forecast')}</h3>`;
      html += '<div class="forecast-grid">';
      for (const day of forecast.forecast) {
        const rainIcon = day.rainfall_total > 10 ? '🌧️' : day.rainfall_total > 2 ? '🌦️' : '☀️';
        html += `
          <div class="forecast-card">
            <div class="forecast-day">${day.day}</div>
            <div style="font-size:1.5rem;">${rainIcon}</div>
            <div class="forecast-temp">${day.temp_min}° — ${day.temp_max}°</div>
            <div class="forecast-info">💧 ${day.humidity_avg}%  ·  🌧 ${day.rainfall_total} mm</div>
            <div class="forecast-info">${day.description}</div>
          </div>
        `;
      }
      html += '</div>';

      // Farming advisory
      if (forecast.advisory && forecast.advisory.length > 0) {
        html += `<h3 class="section-title" style="margin-top:24px;">${t('weather.advisory')}</h3>`;
        html += '<div class="advisory-list">';
        for (const adv of forecast.advisory) {
          html += `
            <div class="advisory-item ${adv.type}">
              <div class="advisory-title">${adv.title}</div>
              <div class="advisory-message">${adv.message}</div>
            </div>
          `;
        }
        html += '</div>';
      }
    }

    resultsEl.innerHTML = html || '<p style="text-align:center;color:var(--c-text-muted);">No weather data available.</p>';

  } catch (err) {
    resultsEl.innerHTML = `
      <div class="card" style="text-align:center;color:var(--c-danger);">
        <p>⚠️ ${err.message}</p>
      </div>
    `;
  }
}
