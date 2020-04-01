//import npm packages
const mongoose = require('mongoose');

const healthFoodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    typeFood: { type: String, required: true },
    name: { type: String, required: true },
    imageUri: { type: String, required: true },
    carb: { type: Number, required: true },
    fiber: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
    calo: { type: Number, required: true },
});

module.exports = mongoose.model('HealthFood', healthFoodSchema);