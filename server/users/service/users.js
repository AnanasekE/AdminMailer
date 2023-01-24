const User = require('../../models/user');
const addUser = async (req, res) => {
    const data = req.body;

    try {
        const
            name = data.name,
            surname = data.surname,
            email = data.email,
            password = data.password,
            admin = data.admin;
            date = new Date();

        await new User({name, surname, email, password, admin, date}).save();
        // await User.create(data);

        return res.status(200).json({success: true});

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false});
    }
}

const getUsers = async (req, res) => {
    try {
        // const token = req.query.token;
        // const decoded = jwt.verify(token, 'admin4123');
        //
        // if (!decoded.admin) return res.status(403).json({success: false});

        const users = await User.find().sort({date: -1});


        const response = {
            success: true,
            users,
        };

        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false});
    }
}

const removeUser = async (req, res) => {
    const id = req.body.id;

    try {
        const user1 = await User.findById(id);
        if (user1.admin) return res.status(403).json({success: false});

        await User.findByIdAndDelete(id);

        const response = {
            success: true,
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false});
    }
}
const getEmails = async (req, res) => {
    try {
        // get emails of all users
        const users = await User.find().sort({date: -1}).limit(15);
        const emails = users.map(user => user.email);


        const response = {
            success: true,
            emails,
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false});
    }
};

module.exports = {
    addUser,
    getUsers,
    getEmails,
    removeUser,
};