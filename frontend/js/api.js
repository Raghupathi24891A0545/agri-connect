// ============================================
// API Client — Backend Communication
// ============================================

const API_BASE = 'http://127.0.0.1:5000';
const DISEASE_API_BASE = 'http://127.0.0.1:5001';

async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const data = await res.json();
    if (!res.ok && data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Make sure the Flask backend is running on port 5000.');
    }
    throw err;
  }
}

export async function getWeather(city) {
  return apiFetch(`/api/weather?city=${encodeURIComponent(city)}`);
}

export async function getForecast(city) {
  return apiFetch(`/api/forecast?city=${encodeURIComponent(city)}`);
}

export async function predictCrop(data) {
  return apiFetch('/api/predict/crop', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function predictFertilizer(data) {
  return apiFetch('/api/predict/fertilizer', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMarketPrices(data) {
  return apiFetch('/api/market-prices', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSoilAnalysis(data) {
  return apiFetch('/api/soil-analysis', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ============================================
// Disease Detection API (Image Detection Backend)
// ============================================
export async function predictDisease(file, language = 'en') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const res = await fetch(`${DISEASE_API_BASE}/api/predict`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok && data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Cannot connect to disease detection server. Make sure the image detection backend is running on port 5001.');
    }
    throw err;
  }
}
