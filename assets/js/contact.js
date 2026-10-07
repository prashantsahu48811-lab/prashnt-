/**
 * ====================================================================
 * CONTACT & INTERACTIVE UTILITIES
 * Form validation, clipboard actions, and toast notifications
 * ====================================================================
 */

// Toast notification helper
function showToast(message, duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>✨</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Copy to Clipboard Utility
async function copyToClipboard(text, successMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or non-https
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(successMessage || `Copied "${text}" to clipboard!`);
  } catch (err) {
    console.error('Failed to copy: ', err);
    showToast('Failed to copy. Please copy manually.');
  }
}

// Initialize Contact Form Handlers
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(inputElement, errorText) {
    const parent = inputElement.closest('.form-group');
    if (parent) {
      parent.classList.add('has-error');
      const errSpan = parent.querySelector('.form-error');
      if (errSpan) errSpan.textContent = errorText;
    }
  }

  function clearError(inputElement) {
    const parent = inputElement.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-error');
    }
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => clearError(input));
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let hasError = false;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please enter your name.');
      hasError = true;
    } else if (nameInput.value.trim().length < 2) {
      setError(nameInput, 'Name must be at least 2 characters.');
      hasError = true;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Please enter your email address.');
      hasError = true;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address.');
      hasError = true;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Please enter a subject.');
      hasError = true;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setError(messageInput, 'Please write your message.');
      hasError = true;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, 'Message should be at least 10 characters.');
      hasError = true;
    }

    if (hasError) {
      showToast('Please fix the errors in the form.');
      return;
    }

    // Construct mailto link
    const recipientEmail = window.portfolioData?.contact?.email || 'your-email@example.com';
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
    const body = encodeURIComponent(
      `Hi,\n\nMy name is ${nameInput.value.trim()} (${emailInput.value.trim()}).\n\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}`
    );

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Opening Mail App...</span>`;
    submitBtn.disabled = true;

    // Trigger user mail client
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    showToast('Drafting your message! Thanks for reaching out.');

    // Reset Form
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Attach to DOM
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});
