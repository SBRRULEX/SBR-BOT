const express = require('express');
const router = express.Router();
const messageController = require('../core/messageController');
const verifyLogin = require('../middleware/verifyLogin');

router.post('/send', verifyLogin, messageController.sendMessage);
router.post('/start-bot', verifyLogin, messageController.startBot);
router.post('/stop-bot', verifyLogin, messageController.stopBot);

module.exports = router;
