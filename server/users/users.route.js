const express = require('express');
const router = express.Router();
const userService = require('./service/users');

router.post('/api/users', userService.addUser);
router.get('/api/users', userService.getUsers);
router.get('/api/users/emails', userService.getEmails);
router.post('/api/users/remove', userService.removeUser);

module.exports = router;
