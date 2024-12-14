const converttsp = (curM, measurement) => {
    if (measurement === 'tbsp') {
        newM = curM * 0.333;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.020;
        return newM;
    }
    if (measurement === 'ounces' || measurement === 'fluid ounces') {
        newM = curM * 0.166;
        return newM;
    }
    if (measurement === 'grams') {
        newM = curM * 4.766;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM * 0.0047;
        return newM;
    }
    if (measurement === 'pounds') {
        newM = curM * 0.0104;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 0.0104;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.0052;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.0013;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 4.9289;
        return newM;
    }
    return false;
};

 const converttbsp = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 3.000;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.0625;
        return newM;
    }
    if (measurement === 'ounces' || measurement === 'fluid ounces') {
        newM = curM * 0.5;
        return newM;
    }
    if (measurement === 'grams') {
        newM = curM * 14.15;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM * 0.0141;
        return newM;
    }
    if (measurement === 'pounds') {
        newM = curM * 0.0312;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 0.0312;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.0156;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.0039;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 14.786;
        return newM;
    }
    return false;
};
 const convertCups = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 48.00;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 16.00;
        return newM;
    }
    if (measurement === 'ounces' || measurement === 'fluid ounces') {
        newM = curM * 8.00;
        return newM;
    }
    if (measurement === 'grams') {
        newM = curM * 226.3;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM * 0.2263;
        return newM;
    }
    if (measurement === 'pounds') {
        newM = curM * 0.5;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 0.5;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.25;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.0625;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 273.0;
        return newM;
    }
    return false;
};

 const convertOunces = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 6.00;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.125;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 3.00;
        return newM;
    }
    if (measurement === 'grams') {
        newM = curM * 28.3;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM * 0.0283;
        return newM;
    }
    if (measurement === 'pounds') {
        newM = curM * 28.35;
        return newM;
    }
    return false;
};

 const convertPounds = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 96.00;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 2.00;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 32.00;
        return newM;
    }
    if (measurement === 'grams') {
        newM = curM * 453.60;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM * 0.4536;
        return newM;
    }
    if (measurement === 'ounces' || measurement === 'fluid ounces') {
        newM = curM * 16.00;
        return newM;
    }
    return false;
};
 const convertGrams = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 0.2097;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.0044;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 0.0706;
        return newM;
    }
    if (measurement === 'pounds') {
        newM = curM * 0.0022;
        return newM;
    }
    if (measurement === 'ounces' || measurement === 'fluid ounces') {
        newM = curM * 0.0353;
        return newM;
    }
    if (measurement === 'kg') {
        newM = curM / 1000;
        return newM;
    }
    return false;
};

const convertFluidOunces = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 6.00;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.125;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 3.00;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 0.0625;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.0312;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.0078;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 34.125;
        return newM;
    }
    if (measurement === 'liters') {
        newM = curM * 0.0341;
        return newM;
    }
    return false;
};
const convertPints = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 96.0;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 2.0;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 32.0;
        return newM;
    }
    if (measurement === 'flOz') {
        newM = curM * 16.0;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.5;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.125;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 473.176;
        return newM;
    }
    if (measurement === 'liters') {
        newM = curM * 0.4731;
        return newM;
    }
    return false;
};
const convertQuarts = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 192.0;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 2.0;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 64.0;
        return newM;
    }
    if (measurement === 'floz') {
        newM = curM * 32.0;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 2.0;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * 0.25;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 946.353;
        return newM;
    }
    if (measurement === 'liters') {
        newM = curM * 0.9463;
        return newM;
    }
    return false;
};
const convertGallons = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 768.0;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 16.0;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 256.0;
        return newM;
    }
    if (measurement === 'floz') {
        newM = curM * 128.0;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 8.0;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 4.0;
        return newM;
    }
    if (measurement === 'ml') {
        newM = curM * 3785.41;
        return newM;
    }
    if (measurement === 'liters') {
        newM = curM * 3.7854;
        return newM;
    }
    return false;
};
const convertMl = (curM, measurement) => {
    if (measurement === 'tsp') {
        newM = curM * 0.2028;
        return newM;
    }
    if (measurement === 'cups') {
        newM = curM * 0.0042;
        return newM;
    }
    if (measurement === 'tbsp') {
        newM = curM * 0.0676;
        return newM;
    }
    if (measurement === 'floz') {
        newM = curM * 0.0338;
        return newM;
    }
    if (measurement === 'pints') {
        newM = curM * 0.0021;
        return newM;
    }
    if (measurement === 'quarts') {
        newM = curM * 0.0010;
        return newM;
    }
    if (measurement === 'gallons') {
        newM = curM * .00026;
        return newM;
    }
    if (measurement === 'liters') {
        newM = curM / 1000;
        return newM;
    }
    return false;
};

const convertLiters = (curM, measurement) => {
    let convertedM = convertMl(curM, measurement);
    if (!convertedM) return false;
    convertedM = convertedM * 1000;
    return convertedM;
};
const convertKg = (curM, measurement) => {
    let convertedM = convertGrams(curM, measurement);
    if (!convertedM) return false;
    convertedM = convertedM * 1000;
    return convertedM;
};

const convertMeasurements = (curM, curU, measurement) => {
    if (curU === 'tbsp') {
        let newM = converttbsp(curM, measurement);
        return newM;
    }
    if (curU === 'tsp') {
        let newM = converttsp(curM, measurement);
        return newM;
    }
    if (curU === 'oz') {
        let newM = convertOunces(curM, measurement);
        return newM;
    }
    if (curU === 'grams') {
        let newM = convertGrams(curM, measurement);
        return newM;
    }
    if (curU === 'floz') {
        let newM = convertFluidOunces(curM, measurement);
        return newM;
    }
    if (curU === 'lb') {
        let newM = convertPounds(curM, measurement);
        return newM;
    }
    if (curU === 'pints') {
        let newM = convertPints(curM, measurement);
        return newM;
    }
    if (curU === 'quarts') {
        let newM = convertQuarts(curM, measurement);
        return newM;
    }
    if (curU === 'gallons') {
        let newM = convertGallons(curM, measurement);
        return newM;
    }
    if (curU === 'ml') {
        let newM = convertMl(curM, measurement);
        return newM;
    }
    if (curU === 'cups') {
        let newM = convertCups(curM, measurement);
        return newM;
    }
    if (curU === 'kg') {
        let newM = convertKg(curM, measurement);
        return newM;
    }
    if (curU === 'liters') {
        let newM = convertLiters(curM, measurement);
        return newM;
    }
    return false;

};

const measurementParse = (measurement) => {
    let charCount = 0;
    for (let i = 0; i < measurement.length; i++) {
        if (measurement[i] === '/' || measurement[i] === '\\' || measurement[i] === '.') { // check if there is valid inputs for fractions or dec
            charCount += 1;
        }
    }
    let amount;

    if (charCount <= 1) {
        measurement = measurement.trim();
        if (measurement.includes('/') || measurement.includes('\\')) {
            if (measurement.includes(' ')) {
                splitAmount = measurement.split(" ", 2);  // split if amount is "1 1/2"
                let wholeNum = splitAmount[0];
                let fraction = splitAmount[1];
                let [numerator, denominator] = fraction.split('/').map(Number);
                if (isNaN(numerator) || isNaN(denominator) || denominator === 0) throw "Invalid fraction";
                amount = ((wholeNum * denominator) + numerator) / denominator;
            }
            else {
                let [numerator, denominator] = measurement.split('/').map(Number);
                if (isNaN(numerator) || isNaN(denominator) || denominator === 0) throw "Invalid fraction";
                amount = (numerator / denominator);
            }
            return amount;
        } else {
            return measurement;
        }
        
    } else {
         return false;
    }

};

let measurementForm = document.getElementById('measurement-form');

if (measurementForm) {
    let myUl = document.getElementById('conversionResults');

    measurementForm.addEventListener('submit', (event) => {
        console.log('Form submission fired');
        event.preventDefault();

        let amountEntered = document.getElementById('amount');
        let initialUnitSelected = document.getElementById('fromUnit');
        let newUnitSelected = document.getElementById('toUnit');
        let amount = amountEntered.value;
        let initialUnit = initialUnitSelected.value;
        let newUnit = newUnitSelected.value;
        let mAmount = measurementParse(amount);
       
       if (amount.trim()===''){
            let li = document.createElement('li');
            li.classList.add('error');
            li.innerHTML = `Please enter a valid amount (ex: 1.1, 2, 1/4...).`;
            myUl.appendChild(li);
            measurementForm.reset(); 
        }
        else if (!mAmount){
            let li = document.createElement('li');
            li.classList.add('error');
            li.innerHTML = `Could not convert ${amount}${initialUnit} to ${newUnit}, amount input not valid. Please enter a valid amount (ex: 1.1, 2, 1/4...).`;
            myUl.appendChild(li);
            measurementForm.reset();
        }
        
        else if (!convertMeasurements(mAmount, initialUnit, newUnit)){
            let li = document.createElement('li');
            li.classList.add('error');
            li.innerHTML = `Cannot convert ${initialUnit} to ${newUnit}. Please chose a different Unit to convert to`;
            myUl.appendChild(li);
            measurementForm.reset(); 
        }
        else {
            let li = document.createElement('li');
            measurementForm.reset();
            let convertedNum = convertMeasurements(mAmount, initialUnit, newUnit);
            li.innerHTML = `${amount}${initialUnit} converted to ${newUnit} is ${convertedNum.toFixed(2)}${newUnit}.`;
            myUl.appendChild(li);
            measurementForm.reset();
        }
    });
}
