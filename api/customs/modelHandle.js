//import modules
const { HealthAdvice } = require('../imports/models');

//export module
module.exports.modelHandle = async function (payload) {
    const { type, voice, model } = payload;
    let response = {};
    switch (model) {
        case "HealthAdvice":
            const healthAdvice = await HealthAdvice.find();
            response = {
                type: type,
                voice: voice,
                Data: healthAdvice.map(result => {
                    return {
                        _id: result._id,
                        title: result.title,
                        formattedText: result.formattedText,
                        imageUri: result.imageUri,
                        titleButton: result.titleButton,
                        query: result.query,
                    }
                })
            }
            break;

        default:
            break;
    }

    return response;
}