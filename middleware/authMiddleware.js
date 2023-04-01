const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

//5.Xác thực đăng nhập bằng Bearer Token
const loggedInMiddleware = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, 'SecretKey');
            const userId = userVerify.id;
            const userInfo = await userModel.findById(userId).select('-password');
            req.user = userInfo;
            next();
        } catch (error) {
            res.status(401);
            res.send("Token không hợp lệ!");
        }
    } else {
        res.status(401);
        res.send("Xác thực thất bại hoặc không tìm thấy Token!");
    }
});

module.exports = {
    loggedInMiddleware
}