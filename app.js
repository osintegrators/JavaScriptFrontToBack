// where it all begins...
// @jfreeman


var mongodb = require('./db.js');
var httpServer = require('./server.js');
var requestMapping = require('./crud.js');

var mapping = {};
mapping["/"] = requestMapping.index;
mapping["/addresses_GET"] = requestMapping.getAddresses;
mapping["/address_GET"] = requestMapping.getAddress;
mapping["/address_POST"] = requestMapping.updateAddress;
mapping["/address_PUT"] = requestMapping.createAddress;
mapping["/address_DELETE"] = requestMapping.deleteAddress;

mongodb.init();
httpServer.init(mapping);



