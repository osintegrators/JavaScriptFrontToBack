// Deal with different URL's being hit
// @jfreeman

var index = require('./index.js');
exports.route = function(mapping, path, response, postData, method){
    var pathparts = path.split('/');
    var shortpath = '/'+pathparts[1] + '_'+method;
    if( path === '/') {
        response.writeHead(404, {"Content-Type":"text/html"});
        response.write(index.HTML);
        response.end();
    }
    else if (typeof mapping[shortpath] === 'function') {
        mapping[shortpath](response, postData, pathparts);
    }
    else {
        //error out
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404: Not Found");
        response.end();
    }
};
