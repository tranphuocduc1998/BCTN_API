const http = require('http');
const app = require('./app');

const { Port } = require('./environment');

var port = process.env.PORT || Port;

const server = http.createServer(app);

server.listen(port);