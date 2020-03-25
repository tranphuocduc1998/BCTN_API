//import modules
const { modelHandle } = require('./modelHandle');


//export module
module.exports.typeHandle = async function (payload) {
    const { type, voice, model } = payload;
    let response = {};
    switch (type) {
        case "textString":
            if (model) {
                response = await modelHandle(payload);
            }
            else {
                response = {
                    type: type,
                    voice: voice,
                    textString: voice
                }
            }
            break;
        case "basicCard":
            response = await modelHandle(payload);
            break;

        default:

            break;
    }
    return response;
};