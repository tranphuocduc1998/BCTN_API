//export module
module.exports.execBMI = function (height, weight) {
    let response = {};
    const Quetelet = weight / Math.pow(height / 100, 2);
    if (Quetelet < 18.5) {
        response = {
            type: "BMI",
            voice: "Đây là chỉ số của bạn",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://media.istockphoto.com/vectors/cartoon-underweight-woman-vector-id511318006?k=6&m=511318006&s=170667a&w=0&h=Rwn8CDE10nIgp9satIWNmIuU8VUFhCPdxsMAiVLkghE=",
                classify: "Chỉ số BMI ở trên cho thấy bạn bị đang bị suy dinh dưỡng!",
            }
        }
    } else if (Quetelet <= 24.9) {
        response = {
            type: "BMI",
            voice: "Đây là chỉ số của bạn",
            Data: {
                weight: weight,
                height: height,
                BMI: Quetelet,
                imageUri: "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/s960x960/90985065_762115757651924_8954274709214593024_o.jpg?_nc_cat=103&_nc_sid=ca434c&_nc_ohc=jWzOmjyxiHYAX_B4vax&_nc_ht=scontent-hkt1-1.xx&_nc_tp=7&oh=597bde395c931559d91a24b69d9f1ca3&oe=5EA31CF4",
                classify: "Chúc mừng bạn! Bạn có chỉ số BMI bình thường!",
            }
        }
    } else if (Quetelet <= 29.9) {
        response = {
            type: "BMI",
            voice: "Đây là chỉ số của bạn",
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
            voice: "Đây là chỉ số của bạn",
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
            voice: "Đây là chỉ số của bạn",
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
            voice: "Đây là chỉ số của bạn",
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
    let voice = "Bạn chưa ăn gì hôm nay. Mức độ dinh dưỡng hôm nay";

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
        voice += " Mức độ dinh dưỡng hôm nay.";
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