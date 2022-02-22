var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(request, response){
    var _url = request.url;

    var content = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - Welcome</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="index.html">WEB</a></h1>
      <ol>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ol>
      <h2>WEB</h2>
      <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
      </p>
    </body>
    </html>
    `;
    
    if (_url == '/index.html') {
      fs.readFile('index.html', function(err, data){
        response.writeHead(200);
        response.end(data);
      });
    } else if (_url == '/1.html') {
      fs.readFile('1.html', function(err, data){
        response.writeHead(200);
        response.end(data);
      });
    } else if (_url == '/2.html') {
      fs.readFile('2.html', function(err, data){
        response.writeHead(200);
        response.end(data);
      });
    } else if (_url == '/3.html') {
      fs.readFile('3.html', function(err, data){
        response.writeHead(200);
        response.end(data);
      });
    } else {
      response.writeHead(200);
      return response.end(content);
    }
})
app.listen(3000);
