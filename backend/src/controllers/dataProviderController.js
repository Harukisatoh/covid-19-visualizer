const fs = require('fs');

module.exports = {
  provide(req, res) {
    const day = req.params.day;
    const rawData = fs.readFileSync('./src/data/covidData.json');
    const allCovidData = JSON.parse(rawData);
    let covidData = {};
    let maxCases = {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    };

    Object.keys(allCovidData).forEach((country) => {
      covidData[country] = {};
    });

    Object.keys(covidData).forEach((country) => {
      covidData[country]['lat'] = allCovidData[country]['lat'];
      covidData[country]['long'] = allCovidData[country]['long'];
      covidData[country]['report'] = allCovidData[country]['reports'][day];
    });

    const firstDayDate = allCovidData['Brazil']['reports'][0]['date'];
    const dayDate = allCovidData['Brazil']['reports'][day]['date'];
    const totalDays = allCovidData['Brazil']['reports'].length;

    Object.keys(allCovidData).forEach((country) => {
      if (allCovidData[country]['reports'][totalDays - 1]['confirmed'] > maxCases['confirmed']) {
        maxCases['confirmed'] = allCovidData[country]['reports'][totalDays - 1]['confirmed'];
      }

      if (allCovidData[country]['reports'][totalDays - 1]['deaths'] > maxCases['deaths']) {
        maxCases['deaths'] = allCovidData[country]['reports'][totalDays - 1]['deaths'];
      }

      if (allCovidData[country]['reports'][totalDays - 1]['recovered'] > maxCases['recovered']) {
        maxCases['recovered'] = allCovidData[country]['reports'][totalDays - 1]['recovered'];
      }
    });

    res.set({
      'X-First-Day-Date': firstDayDate,
      'X-Day-Date': dayDate,
      'X-Total-Days': totalDays,
      'X-Max-Confirmed-Case': maxCases['confirmed'],
      'X-Max-Deaths-Case': maxCases['deaths'],
      'X-Max-Recovered-Case': maxCases['recovered']
    });

    return res.json(covidData);
  }
};