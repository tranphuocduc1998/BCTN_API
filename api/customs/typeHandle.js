//import modules
const { modelHandle } = require('./modelHandle');
const { execBMI, execNutrition } = require('./execute');

//export module
module.exports.typeHandle = async function (payload, healthCare, ListHealthFoods) {
    const { type, voice, model, bonus } = payload;
    let response = {};
    switch (type) {
        case "textString":
            if (model) {
                response = await modelHandle(payload);
            }
            else {
                if (healthCare.height === 0 && healthCare.weight === 0) {
                    response = {
                        type: type,
                        voice: voice,
                    }
                } else if (healthCare.height === 0) {
                    response = {
                        type: type,
                        voice: "Bạn cần cung cấp thêm chiều cao của bạn",
                    }
                } else if (healthCare.weight === 0) {
                    response = {
                        type: type,
                        voice: "Bạn cần cung cấp thêm cân nặng của bạn",
                    }
                } else {
                    response = execBMI(healthCare.height, healthCare.weight);
                }
            }
            break;

        case "basicCard":
            response = await modelHandle(payload);
            break;

        case "HealthFoods":
            response = await modelHandle(payload);
            break;

        case "Height":
            let height = Number(bonus);
            if (healthCare.weight === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm cân nặng của bạn",
                    Data: {
                        weight: healthCare.weight,
                        height: height,
                    }
                }
            } else {
                response = execBMI(height, healthCare.weight);
            }
            break;

        case "Weight":
            let weight = Number(bonus);

            if (healthCare.height === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm chiều cao của bạn",
                    Data: {
                        weight: weight,
                        height: healthCare.height,
                    }
                }
            } else {
                response = execBMI(healthCare.height, weight);
            }
            break;

        case "BMI":
            if (healthCare.height === 0 && healthCare.weight === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp cân nặng và chiều cao trước khi tính BMI",
                }
            } else if (healthCare.height === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm chiều cao của bạn",
                }
            } else if (healthCare.weight === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm cân nặng của bạn",
                }
            } else {
                response = execBMI(healthCare.height, healthCare.weight);
            }
            break;
            
        case "Nutrition":
            if (healthCare.height === 0 && healthCare.weight === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp cân nặng và chiều cao trước khi tính BMI",
                }
            } else if (healthCare.height === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm chiều cao của bạn",
                }
            } else if (healthCare.weight === 0) {
                response = {
                    type: "textString",
                    voice: "Bạn cần cung cấp thêm cân nặng của bạn",
                }
            } else {
                response = execNutrition(healthCare.height, healthCare.weight, ListHealthFoods);
            }
            break;

        default:

            break;
    }
    return response;
};