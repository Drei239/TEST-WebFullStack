const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

//Đăng ký tài khoản
const register = async (req, res) => {
    const { username, password } = req.body;
    const existUser = await userModel.findOne({ username });
    if (existUser) {
        res.status(400);
        res.send("Username đã tồn tại!");
    } else {
        const newUser = await userModel.create({ username, password });
        if (newUser) {
            res.status(200).json({ username: newUser.username });
        } else {
            res.status(400);
            res.send("Tạo tài khoản thất bại!");
        }
    }
}

//4.Đăng nhập - sign token 1d
const login = async (req, res) => {
    const { username, password } = req.body;
    const loginUser = await userModel.findOne({ username });
    if (loginUser && password === loginUser.password) {
        res.json({
            username: loginUser.username,
            token: jwt.sign({ id: userModel._id }, 'SecretKey', { expiresIn: "1d" })
        });
    } else {
        res.status(401);
        res.send("Đăng nhập thất bại - Kiểm tra lại username hoặc password!");
    }
}

module.exports = { register, login };
