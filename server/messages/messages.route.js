const express = require('express');
const router = express.Router();
const messageService = require('./service');

router.post('/api/messages', messageService.addMessage);
router.get('/api/messages', messageService.getMessages);

module.exports = router;
