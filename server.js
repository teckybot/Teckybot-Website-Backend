const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.post('/api/contact', async (req, res) => {
  const { name, email,phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'satyamallik2112@gmail.com', 
      pass: 'dbexcpzbwkrhcxdk',   
    },
  });

  // Email to user
  const mailToUser = {
    from: 'satyamallik2112@gmail.com',
    to: email,
    subject: 'Thanks for contacting us!',
    text: `<p>Hi ${name}, \n\nThanks for reaching out! We will get back to you in <strong>24–48 hours</strong>\n\nRegards,\nYour Team.</p>`
  };


  const mailToSelf = {
    from: 'satyamallik2112@gmail.com',
    to: 'satyamallik2112@gmail.com',
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone no: ${phone}\nMessage: \n${message}`,
  };

  try {
    await transporter.sendMail(mailToUser);
    await transporter.sendMail(mailToSelf);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
