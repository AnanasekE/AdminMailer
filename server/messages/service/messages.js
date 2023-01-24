const Message = require('../../models/message');

const getMessages = async (req, res) => {
    const client = req.body;
    const messages = await Message.find({$or: [{receiver: client.email}, {sender: client.email}]}).sort({date: -1});


    const response = {
        success: true,
        messagesSent: messages.filter(message => message.sender === client.email),
        messagesReceived: messages.filter(message => message.receiver === client.email),
    };

    return res.status(200).json(response);
};

const markAsRead = async (req, res) => {
    const {id} = req.body;
    try {
        const message = await Message.findById(id);
        if (message.read === false) {
            message.read = true;
            await message.save();
        } else {
            message.read = false;
            await message.save();
        }

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
    removeMessage,
    markAsRead,
};