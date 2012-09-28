// Deal with different URL's being hit
// @jfreeman


exports.route = function(mapping, path, response){
    console.log('routing to: '+path);
    if (typeof mapping[path] === 'function') {
        response.writeHead(200, {"Content-Type":"application/json"});
        response.write("data: "+mapping[path]());
        response.end();
    }
    else {
        //error out
        console.log('>> no mapping found');
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404: Not Found");
        response.end();
    }
};
