const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/auth');
const protect = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;