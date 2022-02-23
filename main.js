var http = require('http');
var url = require('url');
var fs = require('fs');

function getLayoutList(files) {
  var list = ``;

  for (var i = 0; i < files.length; i++) {
    list += `<li><a href="/?title=${files[i]}">${files[i]}</a></li>`;
  }

  return list;
}

function getLayout(list, title, description) {
  var layout = `
  <!doctype html>
  <html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/?title=WEB">WEB</a></h1>
    <ol>
      ${list}
    </ol>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `;
  
  return layout;
}

var app = http.createServer(function(request, response){
    var _url = request.url;
    var _query = url.parse(_url, true).query;
    var _pathname = url.parse(_url, true).pathname;
    
    if (_pathname == '/') {
      fs.readdir('data/', function(error, files) {
        var list = getLayoutList(files);

        fs.readFile(`data/${_query.title}`, function(error, description){
          var title = _query.title;
          if (title == undefined) {
            title = 'Welcome';
            description = 'Hello, Node.js!';
          }
  
          var layout = getLayout(list, title, description);

          response.writeHead(200);
          response.end(layout);
        });
      })
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
})
app.listen(3000);
