import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendUserEmail = async (to, name) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Thanks for contacting us!',
    text: `Hi ${name},\n\nThanks for reaching out! We will get back to you in 24–48 hours.\n\nBest Regards,\nYour Team Teckybot.`,
  });
};

export const sendAdminEmail = async (name, email, phone, message) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
  });
};
