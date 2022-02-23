var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

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

    <a href="/create">Create</a>

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
    } else if (_pathname == '/create') {      
      fs.readdir('data/', function(error, files){
        var list = getLayoutList(files);

        var title = 'Create';
        var description = `
        <form action="/create_process" method="post">
          <div><input type="submit"></div>
          <div><input type="text" name="title" placeholder="title"></div>
          <div><textarea name="description" placeholder="description"></textarea></div>
        </form>
        `;

        var layout = getLayout(list, title, description);

        response.writeHead(200);
        response.end(layout);
      });
    } else if (_pathname == '/create_process') {
      fs.readdir('data/', function(error, files){
        var list = getLayoutList(files);

        var data = '';
        request.on('data', function(chunk){
          data += chunk;        
        });
        request.on('end', function(){
          var dataParsed = qs.parse(data);
          var title = dataParsed.title;
          var description = dataParsed.description;
          
          fs.writeFile(`data/${title}`, description, function(err){
            if (err) throw err;
            response.writeHead(302, { 'Location': `/?id=${title}` });
            response.end();
          });
        });
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
})
app.listen(3000);
