const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/atividades', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages/atividades.html'));
});
app.get('/equipamentos', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages/equipamentos.html'));
});
app.get('/trabalhe-conosco', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages/trabalhe-conosco.html'));
});
app.get('/locacao', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages/locacao.html'));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, need, date } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const text = `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nNecessidade: ${need}\nData: ${date}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Novo Contato - Take Fly Video',
      text
    });
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511920566022&text=${encodeURIComponent(text)}`;
    res.json({ success: true, whatsapp: whatsappUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
