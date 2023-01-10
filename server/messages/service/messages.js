const Message = require('../../models/message');

const getMessages = async (req, res) => {
    const messages = await Message.find().sort({date: -1}).limit(20);

    const response = {
        success: true,
        messages,
    };

    return res.status(200).json(response);
};

const addMessage = async (req, res) => {
    const message = req.body.message;
    try {
        const newMessage = await new Message(message).save();
        return res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false});
    }
};


module.exports = {
    getMessages,
    addMessage,
};