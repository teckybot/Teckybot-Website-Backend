import Contact from '../models/Contact.js';
import { sendUserEmail, sendAdminEmail } from '../services/emailService.js';

export const handleContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    await sendUserEmail(email, name);
    await sendAdminEmail(name, email, phone, message);

    res.status(200).json({ success: true, message: 'Message saved and emails sent' });
  } catch (error) {
    console.error('ContactController Error:', error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};


