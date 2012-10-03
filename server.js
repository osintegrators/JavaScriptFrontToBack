// set up http server
// @jfreeman

var http = require('http');
var url = require('url');
var router = require('./router.js');

exports.init = function(mapping){
    var onRequest = function(request, response) {
        var urlobj = url.parse(request.url);
        var path = urlobj.pathname;
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
            } else if (request.method == 'GET' && urlobj.query && urlobj.query.length > 1) {
                postData = JSON.parse(decodeURIComponent(urlobj.query)); 
                console.log('postData after parse qs :'+postData);
            }
            content = router.route(mapping, path, response, postData, request.method);
        });

    }


    http.createServer(onRequest).listen(8080);
    console.log('>> HTTP server up, listening on port 8080');
};
