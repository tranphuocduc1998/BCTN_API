//import npm packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { HealthAdvice } = require('../imports/models');

//GET
router.get('/', async function (req, res, next) {
    const healthAdvice = await HealthAdvice.find();

    const response = {
        count: healthAdvice.length,
        advices: healthAdvice.map(result => {
            return {
                _id: result._id,
                title: result.title,
                formattedText: result.formattedText,
                imageUri: result.imageUri,
                titleButton: result.titleButton,
                query: result.query,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3030/healthAdvice/' + result._id
                }
            }
        })
    }
    res.status(200).json(response);
});

//POST
router.post('/request', async function (req, res, next) {
    const { title, formattedText, imageUri, titleButton, query } = req.body;

    const healthAdvice = new HealthAdvice({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        formattedText: formattedText,
        imageUri: imageUri,
        titleButton: titleButton,
        query: query
    });

    const saved = await healthAdvice.save();

    const response = {
        message: "HealthAdvice",
        created: {
            _id: saved._id,
            title: saved.title,
            formattedText: saved.formattedText,
            imageUri: saved.imageUri,
            titleButton: saved.titleButton,
            query: saved.query,
            request: {
                type: 'GET',
                url: 'http://localhost:3030/healthAdvice/' + saved._id
            }
        },
    }
    res.status(200).json(response);
});

//GET DETAIL
router.get('/:healthAdviceId', async function (req, res, next) {
    const _id = req.params.healthAdviceId;
    const healthAdvice = await HealthAdvice.findById(_id);
    const response = {
        advice: healthAdvice,
        request: {
            type: 'GET',
            url: 'http://localhost:3030/healthAdvice'
        }
    }
    res.status(200).json(response);
});

//DETELE
router.delete('/:healthAdviceId', async function (req, res, next) {
    const _id = req.params.healthAdviceId;
    await HealthAdvice.remove({ _id: _id });
    const response = {
        removed: "HealthAdvice",
        request: {
            type: 'GET',
            url: 'http://localhost:3030/healthAdvice',
            body: {
                title: 'String',
                formattedText: 'String',
                imageUri: 'String',
                titleButton: 'String',
                query: 'String',
            }
        }
    }
    res.status(200).json(response);
});

module.exports = router;