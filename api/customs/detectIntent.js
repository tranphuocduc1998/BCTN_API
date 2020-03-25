//import npm packages
const dialogflow = require('dialogflow');
const uuid = require('uuid');

//export modules
module.exports.detectPayloadIntent = function (projectId, query, languageCode, context) {
    const sessionId = uuid.v4();
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: 'D:/research/Report/NodeAPI/api/models/Api-Ai-2bf1d2d33ddd.json',
    });

    async function detectIntent(projectId, sessionId, query, contexts, languageCode) {
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
        };

        if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }

        const responses = await sessionClient.detectIntent(request);
        return responses[0];
    }
    async function executeQuery(projectId, sessionId, query, languageCode) {
        let intentResponse = [];
        try {
            console.log(`Sending Query: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            );
            console.log('Detected intent');

            return intentResponse;
        } catch (error) {
            console.log(error);
        }
    }
    return executeQuery(projectId, sessionId, query, languageCode);
}

module.exports.updateContext = function (intentResponse) {
    return intentResponse.queryResult.outputContexts;
}

module.exports.payloadHandler = function (intentResponse) {
    const { payload } = intentResponse.queryResult.fulfillmentMessages[0];
    const model = payload.fields.model;
    if (model) {
        return {
            type: payload.fields.type.stringValue,
            voice: payload.fields.voice.stringValue,
            model: payload.fields.model.stringValue,
        };
    }
    return {
        type: payload.fields.type.stringValue,
        voice: payload.fields.voice.stringValue,
    };
}