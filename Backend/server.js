const express = require("express");
var cors = require("cors");
const Data = require("./banks.json");

const app = express();

app.use(cors());
/**
 * Function name: checkDirectConvert
 * @param {*list of all the banks and their convert rates} data 
 * @param {*origin country to the currency} originCountry 
 * @param {*destination currency} destCurrency 
 * @param {*amount to convert} amount 
 * @returns transfered currency.
 * 
 * checking if we have direct convertion from the origin currency to the destination currency
 */
const checkDirectConvert = (data, originCountry, destCurrency, amount) => {
  if (data[originCountry][destCurrency] * amount) {
    const result = data[originCountry][destCurrency] * amount;
    return result;
  }
}


/**
 * function name: checkThirdSide
 * @param {*list of all the banks and their convert rates} data 
 * @param {*amount to convert} amount 
 * @param {*array of all the countries in the DB} countriesArr 
 * @param {*array of all the currencies. HARD CODED} currencies 
 * @param {*destination Currency} destCurrency 
 * @param {*origin Country} originCountry 
 * @returns Max value convert
 * 
 * First for loop: finding currencies with direct convertion to the destination currency
 * second for loop: finding intersect between the origin currency to the currencies in the object from the first for loop
 * return the max value.
 */
 const checkThirdSide = (data, amount,countriesArr,currencies,destCurrency,originCountry) =>{
  var arrOfdestCurrency = []; // in this array, we will have the currency type and the rate transfer for the destCurrency
  for (const country in countriesArr) {
    if (destCurrency in data[countriesArr[country]]) {
        arrOfdestCurrency.push({
        currency: currencies[country],
        rate: data[countriesArr[country]][destCurrency],
      });
    }
  }
  var values = [];
  for (const obj in arrOfdestCurrency) {
    if (arrOfdestCurrency[obj].currency in data[originCountry]) {
      values.push(
        arrOfdestCurrency[obj].rate *
        data[originCountry][arrOfdestCurrency[obj].currency] *
          amount
      );
    }
  }
  if (values.length === 0){
    return 0
  }
  else{
    const maxValue = Math.max(...values);
  return maxValue
  }
  
}

/**
 * Function name: checkPath
 * @param {*list of all the banks and their convert rates} data 
 * @param {*origin Currency} originCurrency    
 * @param {*destination Currency} destCurrency 
 * @param {*amount to convert} amount 
 * @param {*array of all the countries in the DB} countriesArr 
 * @param {*array of all the currencies. HARD CODED} currencies 
 * @returns transfered currency.
 * 
 * isVisited: array init to false, each spot in the array represent if we used the country already to conver, avoid infinity loop
 * 
 * starting from the destCurrency, and track back untill finding convertion from multiple banks
 * Using while loop becuse we know for sure we will find calculate rate. "you can assume that by using all banks you can eventually calculate every rate."
 * return a converted currency, MAY NOT BE THE BEST CONVERT.
 * for seeing the path., check res and destCurrency 
 */


const checkPath = (data, originCurrency, amount,countriesArr,destCurrency,currencies) =>{
  let res = 1 // to multiple the rates
  var isVisited = []
  for(var i = 0;i<countriesArr.length;i++)
  {
    isVisited.push(false)
  }

  while (destCurrency != originCurrency) {
    for (const country in countriesArr) {
      if (destCurrency in data[countriesArr[country]]) {
        if(!isVisited[country])
        {
          res = res * data[countriesArr[country]][destCurrency];
          if (currencies[country] == originCurrency) {
            const result = res*amount
            return result
        } else {
          isVisited[country] = true
          destCurrency = currencies[country];
          break;
        }
        }
        
      }
    }
  }
  return false
}



app.get("/news", (req, res) => {
  console.log("!")
  var originCurrency = req.query.c1;
  var destCurrency = req.query.c2;
  var amount = req.query.amount;
  const data = Data.banks
  const countriesArr = Object.keys(data).map((val) => val); // [IL,GB,US,PH,IT,RR]
  var originCountry// = originCurrency.slice(0, -1);
 
  for(const country in countriesArr)
  {
    if(data[countriesArr[country]]['countryCurrency'] == originCurrency)
    {
      originCountry = countriesArr[country]
    }
  }
  
  const currencies = [] // ['ILS','GBP','USD','PHP','RRR']

  for(const country in countriesArr) // set the currencies array
    {
      currencies.push(data[countriesArr[country]]['countryCurrency'])
    }
  
    
  let JSONresult;

  let convertedRes = checkDirectConvert(data, originCountry, destCurrency, amount)
  if(convertedRes){
    JSONresult = JSON.stringify(convertedRes);
    res.send(JSONresult);
    return;
  }
  convertedRes = checkThirdSide(data, amount,countriesArr,currencies,destCurrency,originCountry)

  if(convertedRes){
    
    JSONresult = JSON.stringify(convertedRes);
    res.send(JSONresult);
    return;
  }

  convertedRes = checkPath(data, originCurrency, amount,countriesArr,destCurrency,currencies)
  if(convertedRes){
    JSONresult = JSON.stringify(convertedRes);
    res.send(JSONresult);
    return;
  }

  return 0;
});

app.listen(3000);
