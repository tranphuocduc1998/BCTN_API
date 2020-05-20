//import modules
const indexRoute = require('../routes/index');
const healthAdviceRoute = require('../routes/healthAdvice');
const healthFoods = require('../routes/healthFoods');
const foodStore = require('../routes/foodStore');
const menuOfStore = require('../routes/menuOfStore');

//export modules
module.exports = {
    indexRoute,
    healthAdviceRoute,
    healthFoods,
    foodStore,
    menuOfStore,
};