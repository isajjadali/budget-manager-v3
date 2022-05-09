'use strict';

// Define Global Keys
require('dotenv').config();
require('./global-keys');

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const kraken = require('kraken-js');
const cors = require('cors');

const customResponseMethodAppender = require('customize-response-appender')({
  reponsesConfigFilePath: '/app/config/responses-config.js',
});
const fieldAuthenticationManager = require('field-authentication-manager')({
  requiredFieldDirectoryPath: '/app/routes-payload-handlers',
});

const app = express();

/*
 * Kraken-js Configurations
 */
const options = {
  onconfig: function (config, next) {
    next(null, config);
  }
};
app.use(kraken(options));

// <<<<<---------------MIDDLEWARES------------------------>>>>>
// For custom configuration you just have to pass false as a prameter and update config file accordingly

// parse application/json
app.use(bodyParser.json());

app.use(cors(require(`${global.paths.config}/cors-options`)()));

app.all('*', customResponseMethodAppender);

app.all('*', (req, res, next) => {
  const error = fieldAuthenticationManager({req, mountPath: '/api/'});
  if (error) {
    return res.http400(error);
  }
  next();
});

// <<<<<--------------------------------------->>>>>


app.on('start', function () {
  global.log.info('Application ready to serve requests.');
  global.log.info('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
