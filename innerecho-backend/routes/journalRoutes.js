// journalRoute.js

const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// POST - Add new journal entry
// routes/journalRoute.js
router.post('/add', async (req, res) => {
  try {
    const { email, text } = req.body;
    if (!email || !text) {
      return res.status(400).json({ message: 'Missing email or text' });
    }

    const newEntry = new Journal({
      email,
      text,
      date: new Date(),
    });

    const savedEntry = await newEntry.save();
    res.status(201).json({ entry: savedEntry });

  } catch (err) {
    console.error('💥 Error in /journal/add:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add this to journalRoute.js too
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const entries = await Journal.find({ email }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error('💥 Error in /journal/:email:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
