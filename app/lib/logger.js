const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  'name': 'Budget Manager V3',
  'level': 10,
});
