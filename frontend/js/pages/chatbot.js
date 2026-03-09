// ============================================
// Chatbot Page — Agri-Connect
// ============================================

import { t } from '../i18n.js';
import { showToast } from '../voice.js';

const API_BASE = 'http://127.0.0.1:5000';

let chatHistory = [];

export function renderChatbot() {
  return `
    <div class="page-chatbot">
      <div class="page-header">
        <h1>💬 ${t('chatbot.title')}</h1>
        <p class="page-subtitle">${t('chatbot.subtitle')}</p>
      </div>

      <div class="chatbot-container">
        <div class="chat-messages" id="chat-messages">
          <!-- Welcome message -->
          <div class="chat-message bot">
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble bot-bubble">
              <p>${t('chatbot.welcome')}</p>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="chat-suggestions" id="chat-suggestions">
          <button class="suggestion-chip" data-msg="When to sow rice?">When to sow rice?</button>
          <button class="suggestion-chip" data-msg="Wheat fertilizer schedule">Wheat fertilizer</button>
          <button class="suggestion-chip" data-msg="Cotton pest control">Cotton pests</button>
          <button class="suggestion-chip" data-msg="Market price for tomato">Tomato price</button>
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <div class="chat-input-row">
            <input
              type="text"
              id="chat-input"
              class="chat-input"
              placeholder="${t('chatbot.placeholder')}"
              autocomplete="off"
            />
            <button class="btn btn-primary chat-send-btn" id="chat-send-btn">
              ${t('chatbot.send')} ➤
            </button>
          </div>
          <div class="chat-lang-hint" id="chat-lang-hint">
            ${t('chatbot.langHint')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initChatbot() {
  chatHistory = [];

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Suggestion chips
  document.getElementById('chat-suggestions')?.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-msg]');
    if (chip) {
      const msg = chip.dataset.msg;
      if (input) input.value = msg;
      sendMessage();
    }
  });
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input?.value?.trim();
  if (!message) return;

  input.value = '';

  // Add user message to chat
  appendMessage('user', message);

  // Show typing indicator
  const typingId = showTyping();

  try {
    const response = await fetch(`${API_BASE}/api/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language: 'auto' }),
    });

    const data = await response.json();
    removeTyping(typingId);

    if (data.error) {
      appendMessage('bot', `❌ Error: ${data.error}`);
      return;
    }

    appendMessage('bot', data.reply);

    // Update suggestion chips
    if (data.suggestions && data.suggestions.length > 0) {
      updateSuggestions(data.suggestions);
    }

  } catch (err) {
    removeTyping(typingId);
    appendMessage('bot', '❌ Could not reach the server. Please make sure the backend is running at ' + API_BASE);
  }
}

function appendMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `chat-message ${role}`;

  // Format text with newlines
  const formatted = text.replace(/\n/g, '<br/>');

  div.innerHTML = role === 'bot'
    ? `<div class="chat-avatar">🤖</div><div class="chat-bubble bot-bubble"><p>${formatted}</p></div>`
    : `<div class="chat-bubble user-bubble"><p>${formatted}</p></div>`;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;

  chatHistory.push({ role, text });
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  if (!container) return null;

  const id = `typing-${Date.now()}`;
  const div = document.createElement('div');
  div.className = 'chat-message bot';
  div.id = id;
  div.innerHTML = `
    <div class="chat-avatar">🤖</div>
    <div class="chat-bubble bot-bubble typing-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  if (id) document.getElementById(id)?.remove();
}

function updateSuggestions(suggestions) {
  const container = document.getElementById('chat-suggestions');
  if (!container) return;
  container.innerHTML = suggestions.map(s =>
    `<button class="suggestion-chip" data-msg="${s}">${s}</button>`
  ).join('');
}
