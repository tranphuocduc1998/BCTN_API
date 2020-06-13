//import npm packages
const express = require('express');
const router = express.Router();

//import modules
const { project_id } = require('../../environment');
const { detectPayloadIntent, updateContext, payloadHandler, typeHandle } = require('../imports/customs');


//GET
router.get('/', async (req, res, next) => {
    // const intentResponse = await detectPayloadIntent(project_id, 'Xin chào', 'en-US', context);
    // const intentResponse = await detectPayloadIntent(project_id, 'Tôi cần bổ xung gì hôm nay', 'en-US', context);
    const intentResponse = await detectPayloadIntent(project_id, 'Tôi đã ăn 10 quả chuối', 'en-US', context);
    const payload = payloadHandler(intentResponse);
    context = updateContext(intentResponse);
    let response = await typeHandle(payload, healthCare, ListHealthFoods);
    let { Data, addFood } = response;
    if (Data) {
        let { height, weight } = Data;
        if (height) {
            healthCare.height = height;
        }
        if (weight) {
            healthCare.weight = weight;
        }
    }
    if (addFood) {
        const checkFood = ListHealthFoods.find((value) => {
            console.log(value.name);
            return String(value.name) === String(addFood.name);
        });
        if (checkFood) {
            checkFood._v += addFood._v;
        } else {
            ListHealthFoods.push(addFood);
        }
    }

    res.status(200).json(response);
});

//POST
router.post('/request', async (req, res, next) => {
    const { query, context, ListHealthFoods, healthCare } = req.body;
    let ListHealthFoodsUpdate = ListHealthFoods;
    const intentResponse = await detectPayloadIntent("api-ai-hnioee", query, 'en-US', context);
    const payload = payloadHandler(intentResponse);
    const contextUpdate = updateContext(intentResponse);
    let response = await typeHandle(payload, healthCare, ListHealthFoods);
    let { Data, addFood } = response;
    if (Data) {
        let { height, weight } = Data;
        if (height) {
            healthCare.height = height;
        }
        if (weight) {
            healthCare.weight = weight;
        }
    }
    if (addFood) {
        const checkFood = ListHealthFoodsUpdate.find((value) => {
            return String(value.name) === String(addFood.name);
        });
        if (checkFood) {
            checkFood._v += addFood._v;
        } else {
            ListHealthFoodsUpdate.push(addFood);
        }
    }
    response.context = contextUpdate;
    response.healthCare = healthCare;
    response.ListHealthFoods = ListHealthFoodsUpdate;
    res.status(200).json(response);
})

module.exports = router;