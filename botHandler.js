// botHandler.js (root)
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log("🤖 Bot logic triggered");
    // Your future bot logic
    res.status(200).json({ message: 'Bot executed successfully' });
  } catch (err) {
    console.error('❌ Bot error:', err);
    res.status(500).json({ error: 'Bot failed to execute' });
  }
});

module.exports = router;
