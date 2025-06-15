// backend/routes/messageRoute.js

const express = require('express');
const router = express.Router();

// Message controller ko require karte hain
const messageController = require('../core/messageController');

// POST route: /send-message
router.post('/send-message', messageController);

// Export router
module.exports = router;
