/*   Set up the MongoDB instance
    @jfreeman
 */

var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('GrannyDB',server);

exports.init = function() {

    //initialize the database
    db.open( function(err, db) {
            if(!err){
            console.log('>>DB open');
            console.log('>>Dropping old addresses collection...');
            // drop the collection if it exists
            db.dropCollection('addresses', function(err, result){
                console.log('>> Collection dropped');
                });
            // Get the collection set up, if not existing already
            db.createCollection('addresses', {safe:true}, function(err, collection){


                if(!err) {
                //do something
                console.log('>> Collection Created, DB ready for use');
                collection.insert({name:'Freeman, Jonathan', phone:'+1.919.321.0119', address:'345 West Main St, Durham, NC 27701', email:'info@osintegrators.com'}, {safe:true}, function( err, result) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('fake doc added');
                }
                });
                }
                else {
                    console.log('error');
                    console.log(err);
                }
                });
            }
        db.close();
    });
};
