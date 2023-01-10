const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   sender: {
        type: String,
        required: true,
   },
    receiver: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    }
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;