const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const data = req.body;


    try {
        const user = await User.findOne({'email': data.email});

        // console.log(user);
        // console.log(req.url)
        if (user.admin === true && req.url === '/api/admin/login') {
            // Admin Login
            if (!user) return res.status(200).json({success: false});

            if (data.password === user.password && user.admin) {
                const token = jwt.sign({email: user.email, admin: user.admin}, 'admin4123');

                return res.status(200).json({success: true, token});
            }
        } else {
            // User Login
            if (!user) return res.status(200).json({success: false});

            if (data.password === user.password) {
                const token = jwt.sign({email: user.email}, 'admin4123');

                return res.status(200).json({success: true, token, email: user.email});
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false});
    }
};

module.exports = {
    login,
};