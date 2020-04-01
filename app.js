//import npm packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//import module Routes
const { indexRoute, healthAdviceRoute, healthFoods } = require('./api/imports/routes');

//import module other
const { MONGO_ADMIN, MONGO_PASS } = require('./environment');

//Connecting MongoDB
mongoose.connect(`mongodb+srv://${MONGO_ADMIN}:${MONGO_PASS}@healthcareapi-notvf.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

//Setting bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setting module Routes
app.use('/ai', indexRoute);
app.use('/healthAdvice', healthAdviceRoute);
app.use('/healthFoods', healthFoods);

//Setting CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Setting Error
app.use((req, res, next) => {
    const error = new Error('Không tìm thấy');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;