// set up http server
var http = require('http');
var url = require('url');

exports.init = function(){
    var onRequest = function(request, response) {
        console.log('>> request recieved');
        response.writeHead(200, {"Content-Type":"application/json"});
        response.write('{"string":"json-test"}');
        response.end();
    }


    http.createServer(onRequest).listen(8080);
    console.log('>> HTTP server up, listening on port 8080');
};
