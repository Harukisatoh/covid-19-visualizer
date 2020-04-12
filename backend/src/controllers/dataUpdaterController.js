const fetch = require('node-fetch');
const fs = require('fs');

async function updateCovidData() {
  const covidData = await fetchCovidData();
  const countriesData = await getCountriesData();

  let joinedData = {};

  Object.keys(covidData).forEach((country) => {
    if (countriesData[country] != undefined) {
      joinedData[country] = {};
    }
  });

  Object.keys(joinedData).forEach((country) => {
    joinedData[country]['cca2'] = countriesData[country]['cca2'];
    joinedData[country]['lat'] = countriesData[country]['lat'];
    joinedData[country]['long'] = countriesData[country]['long'];
    joinedData[country]['reports'] = covidData[country];
  });

  saveUpdatedData(joinedData);
}

// Gets COVID-19 data from public API
async function fetchCovidData() {
  // console.log('Fetching COVID-19 data...');
  const covidData = await fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json()).then(data => {
      // console.log('COVID-19 data succesfully fetched!');
      return data;
    });

  return covidData;
}

// Gets info of every country
async function getCountriesData() {
  const file = await fs.readFileSync('./src/data/countriesInfo.json', (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(file);
}

// Creates a file with the joined data
function saveUpdatedData(joinedData) {
  // console.log('Saving updated data...');
  fs.writeFile('./src/data/covidData.json', JSON.stringify(joinedData), (err) => {
    if (err) throw err;
    // console.log('COVID-19 data succesfully updated!');
    console.log('COVID-19 data updated at ' + new Date());
  });
}

exports.updateCovidData = updateCovidData;