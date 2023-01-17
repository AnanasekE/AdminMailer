const express = require('express');
const router = express.Router();
const userService = require('./service/tokens');

router.post('/api/token/verify', userService.verifyToken);
module.exports = router;
