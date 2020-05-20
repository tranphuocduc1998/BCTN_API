//import npm packages
const mongoose = require('mongoose');

const menuOfStoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _foodStoreId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodStore', required: true },
    _healthFoodsId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthFood', required: true },
    price: { type: Number, required: true },
    dateUpdate: { type: Date, required: true},
    description: { type: String, required: true }
});

module.exports = mongoose.model('MenuOfStore', menuOfStoreSchema);