const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const indexRoute = require('./api/routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route
app.use('/ai', indexRoute);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

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