// ============================================
// Home Page — Agri-Connect
// ============================================

import { t } from '../i18n.js';

export function renderHome() {
  return `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="dot"></span>
          ${t('hero.badge')}
        </div>
        <h1>
          ${t('hero.title1')}<br/>
          <span class="gradient-text">${t('hero.title2')}</span>
        </h1>
        <p>
          ${t('hero.subtitle')}
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" data-navigate="analysis">
            ${t('hero.startAnalysis')}
          </button>
          <button class="btn btn-secondary btn-lg" data-navigate="market">
            ${t('hero.checkMarket')}
          </button>
        </div>
      </div>
    </section>

    <div class="stats-bar">
      <div class="stat-item">
        <div class="stat-value">22+</div>
        <div class="stat-label">${t('stats.cropsSupported')}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">5-Day</div>
        <div class="stat-label">${t('stats.weatherForecast')}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">6+</div>
        <div class="stat-label">${t('stats.fertilizers')}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">🎤</div>
        <div class="stat-label">${t('stats.voiceInput')}</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">🌍</div>
        <div class="stat-label">${t('stats.carbonIPCC')}</div>
      </div>
    </div>

    <section class="features-section">
      <h2>${t('home.featuresTitle')}</h2>
      <p class="subtitle">${t('home.featuresSubtitle')}</p>

      <div class="features-grid">
        <div class="feature-card" data-navigate="analysis">
          <div class="feature-icon">🌾</div>
          <h3>${t('feature.cropRec.title')}</h3>
          <p>${t('feature.cropRec.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="analysis">
          <div class="feature-icon">🧪</div>
          <h3>${t('feature.soilHealth.title')}</h3>
          <p>${t('feature.soilHealth.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="market">
          <div class="feature-icon">💰</div>
          <h3>${t('feature.market.title')}</h3>
          <p>${t('feature.market.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="weather">
          <div class="feature-icon">🌤️</div>
          <h3>${t('feature.weather.title')}</h3>
          <p>${t('feature.weather.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="analysis">
          <div class="feature-icon">🧬</div>
          <h3>${t('feature.fertilizer.title')}</h3>
          <p>${t('feature.fertilizer.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="cropDoctor">
          <div class="feature-icon">🩺</div>
          <h3>${t('feature.cropDoctor.title')}</h3>
          <p>${t('feature.cropDoctor.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="carbon">
          <div class="feature-icon">🌍</div>
          <h3>${t('feature.carbon.title')}</h3>
          <p>${t('feature.carbon.desc')}</p>
        </div>

        <div class="feature-card" data-navigate="analysis">
          <div class="feature-icon">🎤</div>
          <h3>${t('feature.voice.title')}</h3>
          <p>${t('feature.voice.desc')}</p>
        </div>
      </div>
    </section>
  `;
}
