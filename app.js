// where it all begins...
// @jfreeman


var mongodb = require('./db.js');
var httpServer = require('./server.js');
var requestMapping = require('./crud.js');

var mapping = {};
mapping["/"] = requestMapping.index;
mapping["/getAddressList"] = requestMapping.getAddressList;
mapping["/getAddress"] = requestMapping.getAddress;
mapping["/updateAddress"] = requestMapping.updateAddress;
mapping["/createAddress"] = requestMapping.createAddress;
mapping["/deleteAddress"] = requestMapping.deleteAddress;

mongodb.init();
httpServer.init(mapping);



