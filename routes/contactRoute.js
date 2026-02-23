const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST 
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
