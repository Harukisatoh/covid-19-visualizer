const scheduler = require('node-schedule');
const dataUpdaterController = require('./dataUpdaterController');

function schedule() {
  dataUpdaterController.updateCovidData();
  scheduler.scheduleJob('0 */6 * * *', dataUpdaterController.updateCovidData);
}

exports.schedule = schedule;