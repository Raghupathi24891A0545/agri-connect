// ============================================
// Voice Input — Web Speech API (Multilanguage)
// ============================================

import { getSpeechLang, t } from './i18n.js';

let recognition = null;
let isListening = false;
let currentTarget = null;

export function initVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Speech Recognition not supported');
        return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getSpeechLang();

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        if (currentTarget) {
            currentTarget.value = transcript;
            currentTarget.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

    recognition.onend = () => {
        isListening = false;
        updateVoiceUI(false);
    };

    recognition.onerror = (event) => {
        console.error('Speech error:', event.error);
        isListening = false;
        updateVoiceUI(false);
        if (event.error === 'not-allowed') {
            showToast(t('common.micDenied'), 'error');
        }
    };

    setupVoiceFAB();
    setupMicButtons();
    return true;
}

function setupVoiceFAB() {
    const fab = document.getElementById('voice-fab');
    if (!fab) return;

    fab.classList.remove('hidden');
    fab.addEventListener('click', () => {
        // Find the first visible input/textarea on the page
        const inputs = document.querySelectorAll('.form-input:not([type="hidden"])');
        for (const input of inputs) {
            if (input.offsetParent !== null) {
                toggleVoice(input);
                return;
            }
        }
        showToast('No input field found on this page', 'info');
    });
}

export function setupMicButtons() {
    document.querySelectorAll('.mic-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.closest('.input-with-mic')?.querySelector('.form-input');
            if (input) toggleVoice(input, btn);
        });
    });
}

function toggleVoice(inputEl, micBtn = null) {
    if (!recognition) {
        showToast(t('common.noVoice'), 'error');
        return;
    }

    if (isListening) {
        recognition.stop();
        isListening = false;
        updateVoiceUI(false, micBtn);
    } else {
        currentTarget = inputEl;
        inputEl.focus();
        // Update language before starting recognition
        recognition.lang = getSpeechLang();
        try {
            recognition.start();
            isListening = true;
            updateVoiceUI(true, micBtn);
            showToast(t('common.listening'), 'info');
        } catch (err) {
            console.error('Voice start failed:', err);
        }
    }
}

function updateVoiceUI(recording, micBtn = null) {
    const fab = document.getElementById('voice-fab');
    if (fab) {
        fab.classList.toggle('recording', recording);
    }
    if (micBtn) {
        micBtn.classList.toggle('recording', recording);
    }
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export { showToast };
