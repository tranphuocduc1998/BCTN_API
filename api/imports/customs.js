//import modules
const { detectPayloadIntent, updateContext, payloadHandler } = require('../customs/detectIntent');
const { typeHandle } = require('../customs/typeHandle');

//export modules
module.exports = {
    detectPayloadIntent,
    updateContext,
    payloadHandler,
    typeHandle
};
