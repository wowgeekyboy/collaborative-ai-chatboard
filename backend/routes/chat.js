const express = require('express');
const { getMessages, sendMessage, generateAIResponse } = require('../controllers/chat');
const protect = require('../middleware/auth');
const router = express.Router();

// Chat routes
router.get('/', protect, getMessages);
router.post('/', protect, sendMessage);
router.post('/ai-response', protect, generateAIResponse);

module.exports = router;