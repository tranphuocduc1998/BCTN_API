const express = require('express');
const router = express.Router();
const { project_id } = require('../../environment');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

let contexts = [];

async function runSample(query, projectId = project_id) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: 'D:/research/Report/NodeAPI/api/models/Api-Ai-2bf1d2d33ddd.json'
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: query,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    contexts = result.outputContexts;
    // console.log(` contexts: ${result.outputContexts}`);
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    // if (result.intent) {a
    //     console.log(`  Intent: ${result.intent.displayName}`);
    // } else {
    //     console.log(`  No intent matched.`);
    // }
    return result.fulfillmentText;
}

router.get('/', async (req, res, next) => {
    const result = await runSample('Xin chào');
    const response = {
        mess: 'Đã lên được',
        result: result,
    }

    res.status(200).json(response);
});

router.post('/request', async (req, res, next) => {
    const { query } = req.body;
    console.log(query);
    const result = await runSample(query);
    const response = {
        mess: 'Đã lên được',
        result: result,
    }

    res.status(200).json(response);
})

module.exports = router;