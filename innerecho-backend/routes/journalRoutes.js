// journalRoute.js

const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// POST - Add new journal entry
router.post('/add', async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ message: 'Missing userId or text' });
    }

    const newEntry = new Journal({
      userId,
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

module.exports = router;
