// ============================================
// Agri-Connect — Main Application Router
// ============================================

import '../css/style.css';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderWeather, initWeather } from './pages/weather.js';
import { renderMarket, initMarket } from './pages/market.js';
import { renderAnalysis, initAnalysis } from './pages/analysis.js';
import { renderCropDoctor, initCropDoctor } from './pages/cropDoctor.js';
import { initVoice } from './voice.js';
import { onLangChange } from './i18n.js';

// ============================================
// ROUTER
// ============================================
const routes = {
    home: { render: renderHome, init: null },
    analysis: { render: renderAnalysis, init: initAnalysis },
    market: { render: renderMarket, init: initMarket },
    weather: { render: renderWeather, init: initWeather },
    cropDoctor: { render: renderCropDoctor, init: initCropDoctor },
};

let currentPage = 'home';

function navigateTo(page) {
    const route = routes[page];
    if (!route) return;

    currentPage = page;

    // Update navbar
    renderNavbar(page);

    // Render page content
    const app = document.getElementById('app');
    app.innerHTML = route.render();

    // Initialize page-specific logic
    if (route.init) route.init();

    // Re-attach navigation listeners inside page content
    app.querySelectorAll('[data-navigate]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(el.dataset.navigate);
        });
    });

    // Show/hide voice FAB
    const fab = document.getElementById('voice-fab');
    if (fab) {
        fab.classList.toggle('hidden', page === 'home');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// INIT
// ============================================
function init() {
    // Render footer (stays on all pages)
    renderFooter();

    // Initialize voice support
    initVoice();

    // Listen for custom navigation events
    window.addEventListener('navigate', (e) => {
        navigateTo(e.detail);
    });

    // Re-render current page on language change
    onLangChange(() => {
        navigateTo(currentPage);
    });

    // Start at home
    navigateTo('home');
}

// Boot
document.addEventListener('DOMContentLoaded', init);
