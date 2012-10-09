// Deal with different URL's being hit
// @jfreeman

var fs = require('fs');
exports.route = function(mapping, path, response, postData, method){
    var pathparts = path.split('/');
    var shortpath = '/'+pathparts[1] + '_'+method;
    if( path === '/') {
        fs.readFile('index.html', function(err, data) {
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data);
                response.end();
        });
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
