const express = require('express');
const router = express.Router();
const Schema = require('./models/Schema');


const { Answer, Contact } = require('./models/Schema');

// Survey-vastausten käsittely
router.post('/submitAnswer', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newAnswer = new Answer({ question, answer });
    const savedAnswer = await newAnswer.save();
    res.json(savedAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Contact Formin käsittely
router.post('/submitContact', async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;
    const newContact = new Contact({ name, email, company, phone, message });
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
