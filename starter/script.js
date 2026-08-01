const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const sessionId = crypto.randomUUID();
const API_URL = 'http://localhost:3001/chat';

// Fallback: kalau marked.js gagal dimuat, bersihkan markdown secara manual
function renderText(text) {
  if (typeof marked !== 'undefined') {
    return marked.parse(text);
  }
  // fallback manual: hapus simbol markdown umum
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^---$/gim, '<hr>')
    .replace(/\n/g, '<br>');
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  const loadingMsg = appendMessage('bot', 'Jelajah AI is planning your route...');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, sessionId }),
    });

    const data = await response.json();

    if (!response.ok) {
      loadingMsg.textContent = 'Sorry, something went wrong: ' + (data.error || 'unknown error');
      return;
    }

    loadingMsg.innerHTML = renderText(data.result);
  } catch (err) {
    loadingMsg.textContent = 'Could not connect to the server. Make sure the backend is running on port 3001.';
    console.error(err);
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  if (sender === 'bot') {
    msg.innerHTML = renderText(text);
  } else {
    msg.textContent = text;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// const form = document.getElementById('chat-form');
// const input = document.getElementById('user-input');
// const chatBox = document.getElementById('chat-box');

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const userMessage = input.value.trim();
//   if (!userMessage) return;

//   appendMessage('user', userMessage);
//   input.value = '';

//   // Simulasi dummy balasan bot (placeholder)
//   setTimeout(() => {
//     appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
//   }, 1000);
// });

// function appendMessage(sender, text) {
//   const msg = document.createElement('div');
//   msg.classList.add('message', sender);
//   msg.textContent = text;
//   chatBox.appendChild(msg);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }
