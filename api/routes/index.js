//import npm packages
const express = require('express');
const router = express.Router();

//import modules
const { project_id } = require('../../environment');
const { detectPayloadIntent, updateContext, payloadHandler, typeHandle } = require('../imports/customs');

let context;

//GET
router.get('/', async (req, res, next) => {
    const intentResponse = await detectPayloadIntent(project_id, 'Xin chào', 'en-US', context);
    const payload = payloadHandler(intentResponse);
    context = updateContext(intentResponse);
    let response = await typeHandle(payload);


    res.status(200).json(response);
});

//POST
router.post('/request', async (req, res, next) => {
    const { query } = req.body;
    const intentResponse = await detectPayloadIntent(project_id, query, 'en-US', context);
    const payload = payloadHandler(intentResponse);
    context = updateContext(intentResponse);
    let response = await typeHandle(payload);


    res.status(200).json(response);
})

module.exports = router;