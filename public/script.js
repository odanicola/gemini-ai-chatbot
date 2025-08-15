const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Simulasi dummy balasan bot (placeholder)
  setTimeout(() => {
    appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
  }, 1000);

  // Send the user message to the server
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userMessage }]
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    appendMessage('bot', data.response);
  } catch (error) {
    console.error('Error sending message:', error);
    appendMessage('bot', 'Error sending message. Please try again.'); 
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
