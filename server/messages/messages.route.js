const express = require('express');
const router = express.Router();
const messageService = require('./service');

router.post('/api/messages', messageService.addMessage);
router.post('/api/getMessages', messageService.getMessages);
router.post('/api/getMessagesSent', messageService.getMessagesSent);
router.post('/api/removeMessage', messageService.removeMessage);
router.post('/api/markAsRead', messageService.markAsRead);

module.exports = router;
