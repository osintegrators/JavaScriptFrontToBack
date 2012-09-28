// where it all begins...


var mongodb = require('./db.js');
var httpServer = require('./server.js');

mongodb.init();
httpServer.init();



