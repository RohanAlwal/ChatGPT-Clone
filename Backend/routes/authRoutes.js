const {registerUser, loginUser} = require('../controller/authController');
const express = require('express');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);

module.exports = router;