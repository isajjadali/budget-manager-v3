'use strict';

const app = require('./index');
const http = require('http');

const server = http.Server(app);

// global.io = require('socket.io').listen(server);

// global.io.on('connection', () => {
//     global.log.info('Connected to Socket IO');
// });

server.listen(process.env.PORT);

server.on('listening', function () {
  global.log.info(`Server listening on http://localhost:${this.address().port}`);
});
