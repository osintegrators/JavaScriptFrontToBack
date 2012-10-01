// Deal with different URL's being hit
// @jfreeman

var index = require('./index.js');
exports.route = function(mapping, path, response, postData){
    console.log('routing to: '+path);
    if( path === '/') {
        response.writeHead(404, {"Content-Type":"text/html"});
        response.write(index.HTML);
        response.end();
    }
    else if (typeof mapping[path] === 'function') {
        console.log('in router');
        mapping[path](response, postData);
    }
    else {
        //error out
        console.log('>> no mapping found');
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404: Not Found");
        response.end();
    }
};
