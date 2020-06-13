const http = require('http');
const app = require('./app');

const { Port } = require('./environment');

var port = Port;

const server = http.createServer(app);

server.listen(port);