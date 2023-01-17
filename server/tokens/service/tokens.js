const jwt = require('jsonwebtoken');

const verifyToken = async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, 'admin4123');
        return res.status(200).json({success: true, admin: decoded.admin});
    } catch (error) {
        return res.status(403).json({success: false});
    }
}
module.exports = {
    verifyToken,
};
