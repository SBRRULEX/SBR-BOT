const express = require('express');
const router = express.Router();

// Example route
router.get('/status', (req, res) => {
  res.json({ message: 'Other route working' });
});

module.exports = router;
