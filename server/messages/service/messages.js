const Message = require('../../models/message');

const getMessages = async (req, res) => {
    const {receiver} = req.body;
    const messages = await Message.find().where('receiver').equals(receiver).limit(20).sort({date: -1});

    const response = {
        success: true,
        messages,
    };

    return res.status(200).json(response);
};

const getMessagesSent = async (req, res) => {

    const {sender} = req.body;
    const messagesSent = await Message.find().where('sender').equals(sender).limit(20).sort({date: -1});



    const response = {
        success: true,
        messagesSent,
    };

    return res.status(200).json(response);
}
const markAsRead = async (req, res) => {
    const {id} = req.body;
    try {
        const message = await Message.findById(id);
        message.read = true;
        await message.save();

        const response = {
            success: true,
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false});
    }
}

const removeMessage = async (req, res) => {

    const {id} = req.body;
    try {
        await Message.findByIdAndDelete(id);
        const response = {
            success: true,
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false});
    }
}

const addMessage = async (req, res) => {
    const message = req.body;
    try {
        await new Message(message).save();
        return res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false});
    }
};


module.exports = {
    getMessages,
    addMessage,
    getMessagesSent,
    removeMessage,
    markAsRead,
};