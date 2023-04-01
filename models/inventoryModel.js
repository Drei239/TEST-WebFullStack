const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instock: {
        type: Number,
        required: true
    }
})

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;