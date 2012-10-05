// handle specific ajax requests here
// @jfreeman

var mongo = require('mongodb'),
    Server = mongo.Server,
    ObjectID = mongo.ObjectID,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('GrannyDB',server);

var respond = function(response, data, err) {
    var responseObj = {data: data, error: err};
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(responseObj));
    response.end();
};

exports.getAddresses = function(response){
    // TODO query the collection and return the list of addresses
    // Since we're dealing with a relatively small amount of data,
    // use toArray().  If more data is involved, stream it!
    db.open( function(err, db) {
        if(!err) {
            db.collection('addresses', function(err, coll) {
                if(!err) {
                    var cursor = coll.find();
                    
                    cursor.toArray(function(err, items) {
                        respond(response, items);
                    });
                }
                else {
                    console.log('error opening the collection in crud.js');
                }
            });

        }
        else {
            console.log('error opening the db in crud.js');
        }
        db.close();
    });
};

exports.getAddress = function(response, data, pathparts){
    var theid = pathparts.length > 2 ? pathparts[2] : data.data;
    // TODO query the collection with an ID and return a single address entry
    db.open( function(err, db) {
        if(!err) {
            db.collection('addresses', function(err, coll) {
                if(!err) {
                    coll.findOne({_id: ObjectID(theid)}, function(err, item){
                        //handles after the query for one
                        respond(response, item);
                    });
                }
                else {
                    console.log('error opening the collection in crud.js');
                }
            });

        }
        else {
            console.log('error opening the db in crud.js');
        }
        db.close();
    });
};

exports.updateAddress = function(response, data){
    db.open( function(err, db) {
        if(!err) {
            db.collection('addresses', function(err, coll) {
                if(!err) {
                    coll.update({_id: ObjectID(data._id)}, {$set: recreateAddressWithoutId(data)}, {safe:true}, function(err, result){
                    });
                    respond(response);
                }
                else {
                    console.log('error opening the collection in crud.js');
                }
            });

        }
        else {
            console.log('error opening the db in crud.js');
        }
        db.close();
    });
};

exports.createAddress = function(response, newEntry){
    // TODO insert a new address into the collection
    db.open( function(err, db) {
        if(!err) {
            db.collection('addresses', function(err, coll) {
                if(!err) {
                    coll.insert(newEntry, {safe:true}, function(err, result){
                    });
                    respond(response, {}, {});
                }
                else {
                    console.log('error opening the collection in crud.js');
                }
            });

        }
        else {
            console.log('error opening the db in crud.js');
        }
        db.close();
    });
};

exports.deleteAddress = function(response, data){
    //TODO delete a specified address from the collection
    db.open( function(err, db) {
        if(!err) {
            db.collection('addresses', function(err, coll) {
                if(!err) {
    		    coll.remove({_id: ObjectID(data._id)}, {safe:true}, function(err, result){
            		// handles after the remove
                    });
                    respond(response, {}, {});
                }
                else {
                    console.log('error opening the collection in crud.js');
                }
            });

        }
        else {
            console.log('error opening the db in crud.js');
        }
        db.close();
    });
};

recreateAddressWithoutId = function(address) {
  return {name: address.name, address: address.address, phone: address.phone, email: address.email};
}
