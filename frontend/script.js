const BACKEND_URL = 'https://paymentsystem-yrtc.onrender.com';
const payButton = document.getElementById('payButton');
const resultCard = document.getElementById('resultCard');
const resultText = document.getElementById('resultText');

payButton.addEventListener('click', async () => {
  const phone = document.getElementById('phone').value.trim();
  const amount = Number(document.getElementById('amount').value.trim());

  if (!phone || !amount) {
    alert('Please enter both phone and amount.');
    return;
  }

  payButton.disabled = true;
  payButton.textContent = 'Sending request...';

  try {
    const response = await fetch(`${BACKEND_URL}/api/mpesa/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, amount }),
    });

    const data = await response.json();
    resultCard.hidden = false;
    resultText.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultCard.hidden = false;
    resultText.textContent = `Network error: ${error.message}`;
  } finally {
    payButton.disabled = false;
    payButton.textContent = 'Send Payment Request';
  }
});
