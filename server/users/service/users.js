const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    const data = req.body;


    // TODO make this work
    // console.log('notyet')
    // const decoded = jwt.verify(req.token, 'admin4123')
    // console.log('decoded')
    // if (!decoded.admin) return res.status(403).json({success: false});

    try {
        const
            name = data.name,
            surname = data.surname,
            email = data.email,
            password = data.password,
            admin = data.admin;
            date = new Date();

        const user = await new User({name, surname, email, password, admin, date}).save();
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

        const users = await User.find().sort({date: -1}).limit(15);


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

module.exports = {
    addUser,
    getUsers
};