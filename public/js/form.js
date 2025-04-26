// form.js
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success) {
      window.open(json.whatsapp, '_blank');
    } else {
      alert('Erro ao enviar. Tente novamente.');
    }
  } catch {
    alert('Erro de rede. Tente novamente.');
  }
});
