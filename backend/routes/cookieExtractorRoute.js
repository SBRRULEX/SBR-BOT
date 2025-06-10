const express = require('express');
const router = express.Router();
const { extractCookies } = require('../core/cookieExtractor');

router.post('/extract-cookies', async (req, res) => {
  const { email, password, twoFactorCode } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const cookies = await extractCookies(email, password, twoFactorCode);
    res.json({ success: true, cookies });
  } catch (error) {
    console.error('Cookie extraction failed:', error.message);
    res.status(500).json({ success: false, message: 'Cookie extraction failed.', error: error.message });
  }
});

module.exports = router;
