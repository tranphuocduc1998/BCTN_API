//export module
module.exports.execBMI = function (height, weight) {
    let response = {};
    const Quetelet = weight / Math.pow(height / 100, 2);
    if (Quetelet < 18.5) {
        response = {
            type: "BMI",
            voice: "Chỉ số BMI ở trên cho thấy bạn đang bị suy dinh dưỡng!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://media.istockphoto.com/vectors/cartoon-underweight-woman-vector-id511318006?k=6&m=511318006&s=170667a&w=0&h=Rwn8CDE10nIgp9satIWNmIuU8VUFhCPdxsMAiVLkghE=",
                classify: "Chỉ số BMI ở trên cho thấy bạn đang bị suy dinh dưỡng!",
            }
        }
    } else if (Quetelet <= 24.9) {
        response = {
            type: "BMI",
            voice: "Chúc mừng bạn! Bạn có chỉ số BMI bình thường!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://c.pxhere.com/photos/b5/19/adult_bowl_cute_daylight_eat_eating_healthy_enjoyment_face-1550297.jpg!s",
                classify: "Chúc mừng bạn! Bạn có chỉ số BMI bình thường!",
            }
        }
    } else if (Quetelet <= 29.9) {
        response = {
            type: "BMI",
            voice: "Chỉ số BMI ở trên cho thấy bạn bị thừa cân!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://image.thanhnien.vn/768/uploaded/ngocquy/2018_04_03/phu-nu-thua-can-shutterstock_mizx.jpg",
                classify: "Chỉ số BMI ở trên cho thấy bạn bị thừa cân!",
            }
        }
    } else if (Quetelet <= 34.9) {
        response = {
            type: "BMI",
            voice: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ 1!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://cdnimg.vietnamplus.vn/uploaded/lepz/2019_10_11/beophi.jpg",
                classify: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ I!",
            }
        }
    } else if (Quetelet <= 39.9) {
        response = {
            type: "BMI",
            voice: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ 2!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://anh.24h.com.vn/upload/1-2017/images/2017-01-19/1484791084-148473614470826-beo-phi.jpg",
                classify: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ II!",
            }
        }
    } else if (Quetelet >= 40) {
        response = {
            type: "BMI",
            voice: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ 3!",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://www.lanui.vn/image/catalog/tin-tuc/D%C6%AF%20ANH/beo-phi.jpg",
                classify: "Chỉ số BMI ở trên cho thấy bạn bị béo phì độ III!",
            }
        }
    }

    return response;
}

module.exports.execNutrition = function (healthCare, ListHealthFoods) {
    const { increaseKg, dropKg, height, weight } = healthCare;

    const BMR = (9.99 * weight) + (6.25 * height) - (4.92 * 22) + 5;
    const TDEE = BMR * 1.55;
    let sumKcal = TDEE;
    let sumProtein = 2.2 * weight;
    let sumFat = 0.25 * TDEE;
    let sumFiber = 12 * (sumKcal / 1000);
    let sumCarb = (TDEE - (sumProtein + sumFat)) / 4;
    let sumKcalAdded = sumProteinAdded = sumFatAdded = sumFiberAdded = sumCarbAdded = 0;
    let percentKcalAdded = percentProteinAdded = percentFatAdded = percentFiberAdded = percentCarbAdded = 0;
    let voice = "Bạn chưa ăn gì hôm nay. Mức độ dinh dưỡng ngày hôm nay";

    if (ListHealthFoods.length >= 1) {
        voice = "Hôm nay bạn đã ăn";
        ListHealthFoods.forEach(element => {
            sumKcalAdded += element.calo * element._v;
            sumProteinAdded += element.protein * element._v;
            sumFatAdded += element.fat * element._v;
            sumFiberAdded += element.fiber * element._v;
            sumCarbAdded += element.carb * element._v;
            if ((ListHealthFoods.length - 1) === ListHealthFoods.indexOf(element)) {
                voice += ` ${element._v} ${element.name}.`;
            } else {
                voice += ` ${element._v} ${element.name},`;
            }
        });
        voice += " Mức độ dinh dưỡng ngày hôm nay.";
        percentKcalAdded = ((sumKcalAdded / sumKcal) * 100);
        percentProteinAdded = ((sumProteinAdded / sumProtein) * 100);
        percentFatAdded = ((sumFatAdded / sumFat) * 100);
        percentFiberAdded = ((sumFiberAdded / sumFiber) * 100);
        percentCarbAdded = ((sumCarbAdded / sumCarb) * 100);
    }

    let response = {
        type: 'Nutrition',
        voice: voice,
        Data: [
            { _id: '1', title: `Kcal/ngày: ${sumKcal.toFixed(2)} calo`, added: `${sumKcalAdded.toFixed(2)} calo`, percentAdded: percentKcalAdded <= 100 ? percentKcalAdded : 100 },
            { _id: '2', title: `Chất đạm/ngày: ${sumProtein.toFixed(2)} g`, added: `${sumProteinAdded.toFixed(2)} g`, percentAdded: percentProteinAdded <= 100 ? percentProteinAdded : 100 },
            { _id: '3', title: `Chất béo/ngày: ${sumFat.toFixed(2)} g`, added: `${sumFatAdded.toFixed(2)} g`, percentAdded: percentFatAdded <= 100 ? percentFatAdded : 100 },
            { _id: '4', title: `Tinh bột/ngày: ${sumCarb.toFixed(2)} g`, added: `${sumCarbAdded.toFixed(2)} g`, percentAdded: percentCarbAdded <= 100 ? percentCarbAdded : 100 },
            { _id: '5', title: `Chất xơ/ngày: ${sumFiber.toFixed(2)} g`, added: `${sumFiberAdded.toFixed(2)} g`, percentAdded: percentFiberAdded <= 100 ? percentFiberAdded : 100 }
        ],
    }
    return response;
}