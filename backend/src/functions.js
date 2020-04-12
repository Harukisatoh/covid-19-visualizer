// countriesInfo = {
//   country: {
//     cca2: '',
//     lat: 0,
//     long: 0
//   }
// }

// covidCasesData = {
//   country: [{
//     date: '',
//     confirmed: 0,
//     deaths: 0,
//     recovered: 0
//   }]
// }

// structure = {
//   country: {
//     cca2: '',
//     lat: 0,
//     long: 0,
//     report: [{}]
//   }
// }


// https://github.com/codeforamerica/click_that_hood/blob/master/public/data/brazil-states.geojson

// https://github.com/mledoze/countries/

// https://github.com/pomber/covid19


const fs = require('fs');
const fetch = require("node-fetch");

// Self-invoking function, it's necessary because getData() is an async function
(async function setup() {
  // Gets COVID-19 data
  const covidData = await getCovidData();

  // Gets countries info
  const countriesData = await getCountriesData();

  // Joins COVID-19 data and countries data into one structure
  const allData = joinData(covidData, countriesData);
})()

// Gets COVID-19 data from public API
async function getCovidData() {
  return await fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json()).then(data => {
      return data;
    });
}

// Gets info of every country
async function getCountriesData() {
  const file = await fs.readFileSync('./countriesInfo.json', (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(file);
}

// Joins COVID-19 data and countries data
function joinData(covidData, countriesData) {
  let allData = {};

  Object.keys(covidData).forEach((country) => {
    if (countriesData[country] != undefined) {
      allData[country] = {};
    }
  });

  Object.keys(allData).forEach((country) => {
    allData[country]['cca2'] = countriesData[country]['cca2'];
    allData[country]['lat'] = countriesData[country]['lat'];
    allData[country]['long'] = countriesData[country]['long'];
    allData[country]['reports'] = covidData[country];
  });

  return allData;
}

// function createMapMarkers(allData) {

//   const firstDay = 0;
  // Gets the days quantity since the day 0 (2020-1-22), all countries has
  // the same amount of days so it doesn't matter if Brazil is hard coded
  // const currentDay = allData['Brazil']['reports'].length - 1;

  // const date = 60;
  // const option = 'c';

  // Object.keys(allData).forEach((country) => {
  //   console.log(country);
  // });

  // Object.keys(covidCasesData).forEach((country) => {
  //   let countryData = covidCasesData[country];


  //   countryData.forEach((dayData, index) => {
  //     if (index === date) {
  //       switch (option) {
  //         case 'c':
  //           createConfirmedMark(country, index, dayData);
  //           break;
  //         case 'd':
  //           console.log(`Deaths: ${dayData['deaths']}`);
  //           break;
  //         case 'r':
  //           console.log(`Recovered: ${dayData['recovered']}`);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   });
  // });
// }