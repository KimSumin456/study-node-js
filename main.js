var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var _query = url.parse(_url, true).query;
    var _pathname = url.parse(_url, true).pathname;
    
    if (_pathname == '/') {
      fs.readFile(`data/${_query.title}.html`, function(err, description){
        var title = _query.title;
        if (title == undefined) {
          title = 'Welcome';
          description = 'Hello, Node.js!';
        }

        var layout = `
        <!doctype html>
        <html>
        <head>
          <title>>${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/?title=WWW">WWW</a></h1>
          <ol>
            <li><a href="/?title=HTML">HTML</a></li>
            <li><a href="/?title=CSS">CSS</a></li>
            <li><a href="/?title=JS">JS</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(layout);
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

})
app.listen(3000);
