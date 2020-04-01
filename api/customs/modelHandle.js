//import modules
const { HealthAdvice, HealthFoods } = require('../imports/models');

//export module
module.exports.modelHandle = async function (payload) {
    const { type, voice, model, bonus } = payload;
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

        case "Quantum":
            const number = Number(bonus.split('=')[0]);
            const nameFood = bonus.split('=')[1];
            const healthFoodsQ = await HealthFoods.find({ name: nameFood });
            const { carb, fiber, fat, protein, calo, typeFood, name, imageUri } = healthFoodsQ[0];
            response = {
                type: type,
                voice: 'Tổng mức dinh dưỡng của món ăn bạn đã tiêu thụ vào cơ thể.',
                Data: {
                    number: number,
                    typeFood: typeFood,
                    imageUrl: imageUri,
                    name: name,
                    nutrition: [`kcal: ${calo * number} calo`, `Chất đạm: ${protein * number} g`, `Chất béo: ${fat * number} g`, `Tinh bột: ${carb * number} g`, `Chất xơ: ${fiber * number} g`],
                },
                addFood: {
                    name: name,
                    carb: carb,
                    fiber: fiber,
                    fat: fat,
                    protein: protein,
                    calo: calo,
                    _v: number
                }
            }
            break;

        case "NotQuantum":
            const healthFoods = await HealthFoods.find({ name: bonus });
            response = {
                type: type,
                voice: 'Tổng mức dinh dưỡng của món ăn bạn đã tiêu thụ vào cơ thể.',
                Data: {
                    number: 1,
                    typeFood: typeFood,
                    imageUrl: imageUri,
                    name: name,
                    nutrition: [`kcal: ${calo * number} calo`, `Chất đạm: ${protein * number} g`, `Chất béo: ${fat * number} g`, `Tinh bột: ${carb * number} g`, `Chất xơ: ${fiber * number} g`],
                },
                addFood: {
                    name: name,
                    carb: carb,
                    fiber: fiber,
                    fat: fat,
                    protein: protein,
                    calo: calo,
                    _v: 1
                }
            }
            break;

        default:
            break;
    }

    return response;
}