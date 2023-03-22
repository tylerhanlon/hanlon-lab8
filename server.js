var http = require('http');
var fs = require('fs');

var port = 1337;

//Create a function called serverStaticFile tries to read file located at path being
// passed in. Function should check if no http status message and log is okay
//Try to read file at path, if error tell there is an internal error
// If no error, provide browser w/ response code, content type, and data that is passed in


function serverStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) {
        responseCode = 200;
    }

    //Try to read file located at path

    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            console.log("err");
            res.writeHead(500,{ 'Content-Type':'text/plain'});

            res.end('500 - Internal Error');
        }
        else {
            console.log(__dirname + path);
            console.log(contentType);
            res.writeHead(responseCode,
                {'Content-Type' : contentType});
                res.end(data);
        }
    });
}

http.createServer(function(req,res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {

        case '':
            serverStaticFile(res, '/public/index.html', 'text/html');
            //serverStaticFile(res, '/public/css/style.css', 'text/css');
            break;

        case '/index':
            serverStaticFile(res, '/public/index.html', 'text/html');
            serverStaticFile(res, '/public/css/style.css', 'text/css');
            break;

        case '/contact':
            serverStaticFile(res, '/public/contact.html', 'text/html');
            break;

        case '/posts':
            serverStaticFile(res, '/public/posts.html', 'text/html');
            break;

        case '/under-construction':
            serverStaticFile(res, '/public/under-construction.html', 'text/html');
            break;

        case '/404':
            serverStaticFile(res, '/public/404.html', 'text/html', 404);
            break;

        case '/css/style.css':
            console.log("load css");
            serverStaticFile(res, '/public/css/style.css', 'text/css');
            break;

        case "/images/blogging.png":
            serverStaticFile(res, "/public/images/blogging.png", "image/png");
            break;
            
        case "/images/computer-typing.jpeg":
            serverStaticFile(res, "/public/images/computer-typing.jpeg", "image/jpeg");
            break;	
                
        case "/images/logo.png":
            serverStaticFile(res, "/public/images/logo.png", "image/png");
            break;	
                
        case "/images/construction.png":
            serverStaticFile(res, "/public/images/construction.png", "image/png");
            break;	
                
        case "/images/merch.png":
            serverStaticFile(res, "/public/images/merch.png", "image/png");
            break;	

        default:
            serverStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }

}).listen(1337);

console.log("Listening Go to http://localhost:" + port);