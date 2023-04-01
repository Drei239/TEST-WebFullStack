const inventoryModel = require('../models/inventoryModel');

const getAllProduct = async (req, res) => {
    const product = await inventoryModel.find({});
    if (product) {
        res.status(200);
        res.send(product);
    } else {
        res.status(401);
        res.send("Không tìm thấy sản phẩm tồn kho!");
    }
}

const getLowQuantityProducts = async (req, res) => {
    const product = await inventoryModel.find({ instock: { $lt: 100 } });
    if (product) {
        res.status(200);
        res.send(product);
    } else {
        res.status(401);
        res.send("Không tìm thấy sản phẩm theo yêu cầu!");
    }
}

module.exports = { getAllProduct, getLowQuantityProducts };