const express = require('express');
const router = express.Router();
const messageService = require('./service');

router.post('/api/messages', messageService.addMessage);
router.post('/api/get_messages', messageService.getMessages);
router.post('/api/remove_message', messageService.removeMessage);
router.post('/api/mark_as_read', messageService.markAsRead);

module.exports = router;
