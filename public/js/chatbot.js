// Configuration
const FLASK_API_URL = 'http://localhost:5000';

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');
const sendButton = document.getElementById('sendButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

/**
 * Send message to the Flask chatbot backend
 * @param {Event} event - Form submit event
 */
async function sendMessage(event) {
  event.preventDefault();
  
  const message = messageInput.value.trim();
  if (!message) return;

  // Display user message
  addMessageToChat(message, 'user');
  messageInput.value = '';
  
  // Disable send button and show loading
  sendButton.disabled = true;
  loadingIndicator.style.display = 'flex';
  errorMessage.style.display = 'none';

  try {
    // Send message to Flask backend
    const response = await fetch(`${FLASK_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    if (data.success && data.response) {
      // Display bot response
      addMessageToChat(data.response, 'bot');
    } else if (data.error) {
      showError(`Error: ${data.error}`);
    } else {
      showError('Unexpected response from server');
    }
  } catch (error) {
    showError(`Connection error: ${error.message}. Make sure the Flask backend is running on port 5000.`);
  } finally {
    // Re-enable send button and hide loading
    sendButton.disabled = false;
    loadingIndicator.style.display = 'none';
    messageInput.focus();
  }
}

/**
 * Add a message to the chat display
 * @param {string} content - Message content
 * @param {string} sender - 'user' or 'bot'
 */
function addMessageToChat(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = content;
  
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
}

/**
 * Handle Enter key press
 */
document.addEventListener('DOMContentLoaded', function () {
  messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(new Event('submit'));
    }
  });
});