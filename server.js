const http = require('http');
const app = require('./app');

const { Port } = require('./environment');

const server = http.createServer(app);

server.listen(Port || 3000);