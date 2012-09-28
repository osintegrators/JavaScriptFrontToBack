/*   Set up the MongoDB instance
 */

exports.init = function() {
    var mongo = require('mongodb'),
        Server = mongo.Server,
        Db = mongo.Db;

    var server = new Server('localhost', 27017, {auto_reconnect: true});
    var db = new Db('GrannyDB',server);

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
            db.createCollection('addresses', {save:true}, function(err, collection){


                if(!err) {
                //do something
                console.log('>> Collection Created, DB ready for use');
                }

                });
            }
    });
};
