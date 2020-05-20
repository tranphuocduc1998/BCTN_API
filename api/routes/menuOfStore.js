//import npm packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { MenuOfStore } = require('../imports/models');

//GET
router.get('/', async function (req, res, next) {
    const menuOfStore = await MenuOfStore.find()
        .populate('_foodStoreId', ['name'])
        .populate('_healthFoodsId', ['name']).exec();

    const response = {
        count: menuOfStore.length,
        advices: menuOfStore.map(result => {
            return {
                _id: result._id,
                _foodStoreId: result._foodStoreId,
                _healthFoodsId: result._healthFoodsId,
                price: result.price,
                dateUpdate: result.date,
                description: result.description,
                request: [{
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/foodStore/' + result._foodStoreId._id,
                    description: `danh sách thực đơn của ${result._foodStoreId.name}`,
                }, {
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/healthFoods/' + result._healthFoodsId._id,
                    description: `danh sách cửa hàng có ${result._healthFoodsId.name}`,
                }, {
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/' + result._id
                }]
            }
        })
    }
    res.status(200).json(response);
});

//POST
router.post('/request', async function (req, res, next) {
    const { _foodStoreId, _healthFoodsId, price, description } = req.body;
    const date = new Date()
    console.log(req.body)
    const menuOfStore = new MenuOfStore({
        _id: new mongoose.Types.ObjectId(),
        _foodStoreId: _foodStoreId,
        _healthFoodsId: _healthFoodsId,
        price: price,
        dateUpdate: date,
        description: description,
    });

    const saved = await (await menuOfStore.save())
        .populate('_foodStoreId', ['name'])
        .populate('_healthFoodsId', ['name']).exec();

    const response = {
        message: "menuOfStore",
        created: {
            _id: saved._id,
            _foodStoreId: saved._foodStoreId,
            _healthFoodsId: saved._healthFoodsId,
            price: saved.price,
            dateUpdate: saved.date,
            description: saved.description,
            request: [{
                type: 'GET',
                url: 'http://localhost:3030/menuOfStore/foodStore/' + saved._foodStoreId._id,
                description: `danh sách thực đơn của ${saved._foodStoreId.name}`,
            }, {
                type: 'GET',
                url: 'http://localhost:3030/menuOfStore/healthFoods/' + saved._healthFoodsId._id,
                description: `danh sách cửa hàng có ${saved._healthFoodsId.name}`,
            }, {
                type: 'GET',
                url: 'http://localhost:3030/menuOfStore/' + saved._id
            }]
        },
    }
    res.status(200).json(response);
});

//GET DETAIL FoodStore
router.get('/foodStore/:foodStoreId', async function (req, res, next) {
    const _id = req.params.foodStoreId;
    const menuOfStore = await MenuOfStore.find({ _foodStoreId: _id })
        .populate('_foodStoreId', ['name'])
        .populate('_healthFoodsId', ['name', 'imageUri']).exec();
    const response = {
        count: menuOfStore.length,
        advices: menuOfStore.map(result => {
            return {
                _id: result._id,
                _foodStoreId: result._foodStoreId,
                _healthFoodsId: result._healthFoodsId,
                price: result.price,
                dateUpdate: result.date,
                description: result.description,
                request: [{
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/healthFoods/' + result._healthFoodsId._id,
                    description: `danh sách cửa hàng có ${result._healthFoodsId.name}`,
                }, {
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/' + result._id
                }]
            }
        }),
        request: {
            type: 'GET',
            url: 'http://localhost:3030/menuOfStore'
        }
    }
    res.status(200).json(response);
});

//GET DETAIL HealthFoods
router.get('/healthFoods/:healthFoodsId', async function (req, res, next) {
    const _id = req.params.healthFoodsId;
    const menuOfStore = await MenuOfStore.find({ _healthFoodsId: _id })
        .populate('_foodStoreId', ['name'])
        .populate('_healthFoodsId', ['name']).exec();
    const response = {
        count: menuOfStore.length,
        advices: menuOfStore.map(result => {
            return {
                _id: result._id,
                _foodStoreId: result._foodStoreId,
                _healthFoodsId: result._healthFoodsId,
                price: result.price,
                dateUpdate: result.date,
                description: result.description,
                request: [{
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/foodStore/' + result._foodStoreId._id,
                    description: `danh sách thực đơn của ${result._foodStoreId.name}`,
                }, {
                    type: 'GET',
                    url: 'http://localhost:3030/menuOfStore/' + result._id
                }]
            }
        }),
        request: {
            type: 'GET',
            url: 'http://localhost:3030/menuOfStore'
        }
    }
    res.status(200).json(response);
});

//GET DETAIL MenuOfStore
router.get('/:menuOfStoreId', async function (req, res, next) {
    const _id = req.params.menuOfStoreId;
    const menuOfStore = await MenuOfStore.findById(_id)
        .populate('_foodStoreId', ['name'])
        .populate('_healthFoodsId', ['name']).exec()
    const response = {
        advice: menuOfStore,
        request: {
            type: 'GET',
            url: 'http://localhost:3030/menuOfStore'
        }
    }
    res.status(200).json(response);
});


//DETELE MenuOfStore
router.delete('/:menuOfStoreId', async function (req, res, next) {
    const _id = req.params.menuOfStoreId;
    const result = await MenuOfStore.remove({ _id: _id });
    console.log(result);
    const response = {
        removed: "MenuOfStore",
        body: {
            price: 'Number',
            dateUpdate: 'Date',
            description: 'String',
        },
        request: [{
            type: 'GET',
            url: 'http://localhost:3030/menuOfStore',
        }]
    }
    res.status(200).json(response);
});

module.exports = router;