var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var _query = url.parse(_url, true).query;
    
    fs.readFile(`data/${_query.title}.html`, function(err, description){
      var title = _query.title;
      var layout = `
      <!doctype html>
      <html>
      <head>
        <title>>${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/?title=index">WEB</a></h1>
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
})
app.listen(3000);
