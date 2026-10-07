/**
 * ====================================================================
 * CYBER AI VOICE ASSISTANT
 * Web Speech API + Web Audio Synthesizer
 * Welcomes Prashant on entry and says goodbye on leaving
 * ====================================================================
 */

(function () {
  let isVoiceEnabled = true;
  let hasGreetedWelcome = false;
  let audioCtx = null;

  // Initialize Web Audio Context on first interaction
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize futuristic cyberpunk chime using Web Audio API
  function playCyberChime(isAscending = true) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (isAscending) {
        // Welcome chime (Ascending: 523Hz C5 -> 784Hz G5)
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
      } else {
        // Goodbye chime (Descending: 784Hz G5 -> 440Hz A4)
        osc.frequency.setValueAtTime(783.99, now);
        osc.frequency.exponentialRampToValueAtTime(440.00, now + 0.2);
      }

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // AudioContext fallback
    }
  }

  // Speak using Web Speech API
  function speak(text, options = {}) {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.95; // Slightly measured, clear cadence
      utterance.pitch = options.pitch || 1.1; // Futuristic AI assistant tone
      utterance.volume = options.volume !== undefined ? options.volume : 1.0;

      // Select high-quality natural voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferred = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Karen') || v.name.includes('Siri'))
        ) || voices.find(v => v.lang.startsWith('en'));

        if (preferred) {
          utterance.voice = preferred;
        }
      }

      // Visual feedback on button during speech
      const btn = document.getElementById('voice-toggle-btn');
      utterance.onstart = () => {
        if (btn) btn.classList.add('speaking');
      };
      utterance.onend = () => {
        if (btn) btn.classList.remove('speaking');
      };
      utterance.onerror = () => {
        if (btn) btn.classList.remove('speaking');
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }

  // Get User's First Name
  function getUserFirstName() {
    const fullName = window.portfolioData?.personal?.name || 'Prashant';
    return fullName.trim().split(/\s+/)[0] || 'Prashant';
  }

  // Greet Welcome: "Hello Prashant! Welcome to your portfolio."
  function triggerWelcomeVoice() {
    if (hasGreetedWelcome || !isVoiceEnabled) return;
    hasGreetedWelcome = true;

    const firstName = getUserFirstName();
    playCyberChime(true);

    setTimeout(() => {
      speak(`Hello ${firstName}! Welcome to your portfolio website. All systems online.`);
      if (window.showToast) {
        window.showToast(`🎙️ AI Voice: "Hello ${firstName}!"`);
      }
    }, 180);
  }

  // Greet Farewell: "Goodbye Prashant! See you next time."
  function triggerFarewellVoice() {
    if (!isVoiceEnabled) return;
    const firstName = getUserFirstName();
    playCyberChime(false);
    speak(`Goodbye ${firstName}! Have a great day.`);
  }

  // Setup Voice Activation & Autoplay Handling
  function initVoiceAssistant() {
    // Attempt automatic welcome (may be restricted by browser autoplay policy until interaction)
    setTimeout(() => {
      triggerWelcomeVoice();
    }, 800);

    // Browser autoplay policy guard: First user interaction guarantees audio permissions
    const interactionEvents = ['click', 'pointerdown', 'keydown', 'scroll'];
    const onFirstUserAction = () => {
      getAudioContext();
      if (!hasGreetedWelcome) {
        triggerWelcomeVoice();
      }
      interactionEvents.forEach(evt => window.removeEventListener(evt, onFirstUserAction));
    };

    interactionEvents.forEach(evt => {
      window.addEventListener(evt, onFirstUserAction, { once: true, passive: true });
    });

    // Say Goodbye when user closes or leaves tab
    window.addEventListener('beforeunload', () => {
      triggerFarewellVoice();
    });

    // Detect tab switching / page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Tab is closing or user switched away
        triggerFarewellVoice();
      } else if (document.visibilityState === 'visible' && hasGreetedWelcome) {
        // Welcome back when returning to tab
        playCyberChime(true);
        const firstName = getUserFirstName();
        speak(`Welcome back, ${firstName}!`);
      }
    });

    // Voice Toggle Button setup
    const voiceBtn = document.getElementById('voice-toggle-btn');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isVoiceEnabled = !isVoiceEnabled;
        voiceBtn.classList.toggle('active', isVoiceEnabled);

        if (isVoiceEnabled) {
          voiceBtn.title = 'AI Voice Assistant: Enabled (Click to test greeting)';
          playCyberChime(true);
          const firstName = getUserFirstName();
          speak(`Hello ${firstName}! Voice assistant is now active.`);
          if (window.showToast) window.showToast('🎙️ AI Voice: ENABLED');
        } else {
          voiceBtn.title = 'AI Voice Assistant: Muted';
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          if (window.showToast) window.showToast('🔇 AI Voice: MUTED');
        }
      });
    }
  }

  // Ensure voices are loaded (some browsers load voices asynchronously)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Expose global methods
  window.triggerWelcomeVoice = triggerWelcomeVoice;
  window.triggerFarewellVoice = triggerFarewellVoice;

  document.addEventListener('DOMContentLoaded', initVoiceAssistant);
})();
