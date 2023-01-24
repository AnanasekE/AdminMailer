const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token;
    try {
        jwt.verify(token, 'admin4123');
        next();
    } catch (error) {
        return res.status(403).json({success: false});
    }
}
module.exports = {
    verifyToken,
};
