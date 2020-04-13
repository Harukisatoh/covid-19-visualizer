const express = require('express');
const cors = require('cors');

const corsOptions = {
  exposedHeaders: ['X-First-Day-Date', 'X-Day-Date', 'X-Total-Days', 'X-Max-Confirmed-Case', 'X-Max-Deaths-Case', 'X-Max-Recovered-Case']
};

const routes = require('./routes');

const schedulerController = require('./controllers/schedulerController');

const app = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, schedulerController.schedule);

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