//import npm packages
const mongoose = require('mongoose');

const healthAdviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    formattedText: { type: String, required: true },
    imageUri: { type: String, required: true },
    titleButton: { type: String, required: true },
    query: { type: String, required: true },
});

module.exports = mongoose.model('HealthAdvice', healthAdviceSchema);