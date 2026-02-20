const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST contact form
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

module.exports = router;
