const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const data = req.body;


    try {
        const user = await User.findOne({'email': data.email});

        // console.log(user);
        // console.log(req.url)
        // console.log(user);
        // console.log(user.admin)
        if (user.admin && req.url === '/api/admin/login') {
            // Admin Login
            console.log('admin login')
            // console.log(user)
            if (!user) return res.status(200).json({success: false});

            if (data.password === user.password && user.admin) {
                console.log('admin login success')
                const token = jwt.sign({email: user.email, admin: user.admin}, 'admin4123');

                return res.status(200).json({success: true, token});
            }
        } else {
            // User Login
            console.log('user login')
            if (!user) return res.status(200).json({success: false});

            if (data.password === user.password) {
                console.log('user login success')
                const token = jwt.sign({email: user.email}, 'admin4123');

                return res.status(200).json({success: true, token});
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