const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'OK', message: 'API running properly!' });
});

module.exports = router;
