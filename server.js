// set up http server
// @jfreeman

var http = require('http');
var url = require('url');
var router = require('./router.js');

exports.init = function(mapping){
    var onRequest = function(request, response) {
        var path = url.parse(request.url).pathname;
        var content;
        var postData = '';

        if( path !== "/favicon.ico"){
            console.log('>> request for '+path+' recieved');
        }
        // get post data
        request.setEncoding("utf8");
        request.addListener("data", function(chunk) {
            postData += chunk;
        });
        request.addListener("end", function() {
            if(postData){
                postData = JSON.parse(postData);
            }
            content = router.route(mapping, path, response, postData);
        });

    }


    http.createServer(onRequest).listen(8080);
    console.log('>> HTTP server up, listening on port 8080');
};
