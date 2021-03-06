const dbLogger = require('../lib/logger').child({
  type: 'database',
});

const path = require('path');
const { existsSync } = require('fs');
const { extend } = require('lodash');

const env = process.env.NODE_ENV || 'development';
const config = {
  username: 'USER',
  password: 'PASSWORD',
  database: 'DATABASE',
  host: 'host',
  dialect: 'mysql',
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  },
  migrationStorageTableName: 'sequelize_meta',
  // logging: message => dbLogger.debug(message),
  logging: false,

};

const envConfigPath = path.resolve(path.join(__dirname, `./database.${env}.js`));

if (existsSync(envConfigPath)) {
  const envConfig = require(envConfigPath);
  extend(config, envConfig);
}

module.exports = config;
