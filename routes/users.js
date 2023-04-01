var express = require('express');
var router = express.Router();
const { register, login } = require('../controller/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//4.Login & Sign Token
router.post('/login', login);

module.exports = router;
