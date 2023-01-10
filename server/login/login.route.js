const express = require('express');
const router = express.Router();
const loginService = require('./service');

router.post('/api/user/login', loginService.login);
router.post('/api/admin/login', loginService.login);


module.exports = router;
