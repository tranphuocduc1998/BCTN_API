//import modules
const { HealthAdvice, HealthFoods, FoodStore } = require('../imports/models');

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
                    typeFood: healthFoods[0].typeFood,
                    imageUrl: healthFoods[0].imageUri,
                    name: healthFoods[0].name,
                    nutrition: [`kcal: ${healthFoods[0].calo} calo`, `Chất đạm: ${healthFoods[0].protein} g`, `Chất béo: ${healthFoods[0].fat} g`, `Tinh bột: ${healthFoods[0].carb} g`, `Chất xơ: ${healthFoods[0].fiber} g`],
                },
                addFood: {
                    name: healthFoods[0].name,
                    carb: healthFoods[0].carb,
                    fiber: healthFoods[0].fiber,
                    fat: healthFoods[0].fat,
                    protein: healthFoods[0].protein,
                    calo: healthFoods[0].calo,
                    _v: 1
                }
            }
            break;

        case "foodStore":
            const foodStore = await FoodStore.find();
            response = {
                type: type,
                voice: voice,
                foodStore: foodStore
            }
            break;

        default:
            break;
    }

    return response;
}