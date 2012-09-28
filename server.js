// set up http server
// @jfreeman

var http = require('http');
var url = require('url');
var router = require('./router.js');

exports.init = function(mapping){
    var onRequest = function(request, response) {
        var path = url.parse(request.url).pathname;
        var content;
        if( path !== "/favicon.ico"){
            console.log('>> request for '+path+' recieved');
        }

        content = router.route(mapping, path, response);       
    }


    http.createServer(onRequest).listen(8080);
    console.log('>> HTTP server up, listening on port 8080');
};
