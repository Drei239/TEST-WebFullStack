var express = require('express');
var router = express.Router();
const { getAllProduct, getLowQuantityProducts } = require('../controller/inventoryController');
const { loggedInMiddleware } = require('../middleware/authMiddleware');

//2.Lấy tất cả sản phẩm từ collection inventory
router.get('/all', getAllProduct);

//3.Lấy sản phẩm có low quantity (<100)
//5.Đăng nhập và truyền Token mới cấp quyền truy cập
router.get('/lowqtt', loggedInMiddleware, getLowQuantityProducts)

module.exports = router;