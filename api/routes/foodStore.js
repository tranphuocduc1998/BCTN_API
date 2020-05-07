//import npm packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { FoodStore } = require('../imports/models');

//GET
router.get('/', async function (req, res, next) {
    const foodStore = await FoodStore.find();

    const response = {
        count: foodStore.length,
        advices: foodStore.map(result => {
            return {
                _id: result._id,
                name: result.name,
                phone: result.phone,
                address: result.address,
                openDate: result.openDate,
                openTime: result.openTime,
                closingTime: result.closingTime,
                latitude: result.latitude,
                longitude: result.longitude,
                image: result.image,
                voice: result.voice,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3030/foodStore/' + result._id
                }
            }
        })
    }
    res.status(200).json(response);
});

//POST
router.post('/request', async function (req, res, next) {
    const { name, phone, address, openDate, openTime, closingTime, latitude, longitude, image, voice } = req.body;

    const foodStore = new FoodStore({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        phone: phone,
        address: address,
        openDate: openDate,
        openTime: openTime,
        closingTime: closingTime,
        latitude: latitude,
        longitude: longitude,
        image: image,
        voice: voice,
    });

    const saved = await foodStore.save();

    const response = {
        message: "FoodStore",
        created: {
            _id: saved._id,
            name: saved.name,
            phone: saved.phone,
            address: saved.address,
            openDate: saved.openDate,
            openTime: saved.openTime,
            closingTime: saved.closingTime,
            latitude: saved.latitude,
            longitude: saved.longitude,
            image: saved.image,
            voice: saved.voice,
            request: {
                type: 'GET',
                url: 'http://localhost:3030/foodStore/' + saved._id
            }
        },
    }
    res.status(200).json(response);
});

//GET DETAIL
router.get('/:foodStoreId', async function (req, res, next) {
    const _id = req.params.foodStoreId;
    const foodStore = await FoodStore.findById(_id);
    const response = {
        advice: foodStore,
        request: {
            type: 'GET',
            url: 'http://localhost:3030/foodStore'
        }
    }
    res.status(200).json(response);
});


//DETELE
router.delete('/:foodStoreId', async function (req, res, next) {
    const _id = req.params.foodStoreId;
    await FoodStore.remove({ _id: _id });
    const response = {
        removed: "foodStore",
        request: {
            type: 'GET',
            url: 'http://localhost:3030/foodStore',
            body: {
                name: 'String',
                phone: 'String',
                address: 'String',
                openDate: 'String',
                openTime: 'String',
                closingTime: 'String',
                latitude: 'Number',
                longitude: 'Number',
                image: 'String',
                voice: 'String',
            }
        }
    }
    res.status(200).json(response);
});

module.exports = router;