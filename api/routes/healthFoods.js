//import npm packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { HealthFoods } = require('../imports/models');

//GET
router.get('/', async function (req, res, next) {
    const healthFoods = await HealthFoods.find();

    const response = {
        count: healthFoods.length,
        advices: healthFoods.map(result => {
            return {
                _id: result._id,
                typeFood: result.typeFood,
                name: result.name,
                imageUri: result.imageUri,
                carb: result.carb,
                fiber: result.fiber,
                fat: result.fat,
                protein: result.protein,
                calo: result.calo,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3030/healthFoods/' + result._id
                }
            }
        })
    }
    res.status(200).json(response);
});

//POST
router.post('/request', async function (req, res, next) {
    const { typeFood, name, imageUri, carb, fiber, fat, protein, calo } = req.body;

    const healthFoods = new HealthFoods({
        _id: new mongoose.Types.ObjectId(),
        typeFood: typeFood,
        name: name,
        imageUri: imageUri,
        carb: carb,
        fiber: fiber,
        fat: fat,
        protein: protein,
        calo: calo
    });

    const saved = await healthFoods.save();

    const response = {
        message: "healthFood",
        created: {
            _id: saved._id,
            typeFood: saved.typeFood,
            name: saved.name,
            imageUri: saved.imageUri,
            carb: saved.carb,
            fiber: saved.fiber,
            fat: saved.fat,
            protein: saved.protein,
            calo: saved.calo,
            request: {
                type: 'GET',
                url: 'http://localhost:3030/healthFoods/' + saved._id
            }
        },
    }
    res.status(200).json(response);
});

//GET DETAIL
router.get('/:healthFoodId', async function (req, res, next) {
    const _id = req.params.healthFoodId;
    const healthFoods = await HealthFoods.findById(_id);
    const response = {
        healthFood: healthFoods,
        request: {
            type: 'GET',
            url: 'http://localhost:3030/healthFoods'
        }
    }
    res.status(200).json(response);
});

//DETELE
router.delete('/:healthFoodId', async function (req, res, next) {
    const _id = req.params.healthFoodId;
    await HealthFoods.remove({ _id: _id });
    const response = {
        removed: "healthFood",
        request: {
            type: 'GET',
            url: 'http://localhost:3030/healthFoods',
            body: {
                typeFood: 'String',
                name: 'String',
                imageUri: 'String',
                carb: 'Number',
                fiber: 'Number',
                fat: 'Number',
                protein: 'Number',
                calo: 'Number',
            }
        }
    }
    res.status(200).json(response);
});

module.exports = router;