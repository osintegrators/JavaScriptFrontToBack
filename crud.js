// handle specific ajax requests here
// @jfreeman


exports.getAddressList = function(){
    // TODO query the collection and return the list of addresses
    // Since we're dealing with a relatively small amount of data,
    // use toArray().  If more data is involved, stream it!
//            collection.find().toArray(function(err, items){
//                // handle the array of addresses
//                console.log(items);
//                });
    return '{ "name":"Jonthan", "email":"jfreeman@osintegrators"}';
};

exports.getAddress = function(id){
    // TODO query the collection with an ID and return a single address entry
    collection.findOne({id:id}, function(err, item){
            //handles after the query for one
            });
};

exports.updateAddress = function(id, obj){
    // TODO send new address info to the collection
    collection.update({uniqueId:id}, {$set: obj}, {safe:true}, function(err, result){
            // handles after the update
            });
};

exports.createAddress = function(newEntry){
    // TODO insert a new address into the collection
    collection.insert(newEntry, {safe:true}, function(err, result){
            // handles after the insert
            if(!err)
            console.log('address added!');
            });
};

exports.deleteAddress = function(idToDelete){
    //TODO delete a specified address from the collection
    collection.remove({uniqueId:idToDelete}, {safe:true}, function(err, result){
            // handles after the remove
            });
};
