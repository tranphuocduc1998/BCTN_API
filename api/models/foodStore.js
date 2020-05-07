//import npm packages
const mongoose = require('mongoose');

const foodStoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: String, required: true},
    address: { type: String, required: true},
    openDate: { type: String, required: true},
    openTime: { type: String, required: true},
    closingTime: { type: String, required: true},
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    image: {type: String, required: true},
    voice: { type: String, required: true },
});

module.exports = mongoose.model('FoodStore', foodStoreSchema);