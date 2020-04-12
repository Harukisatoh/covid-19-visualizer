const express = require('express');

const dataProviderController = require('./controllers/dataProviderController');

const routes = express.Router();

routes.get('/report/:day', dataProviderController.provide);

module.exports = routes;