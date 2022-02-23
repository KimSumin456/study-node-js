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

/* pm2 사용법
* npm init 로 package.json 생성
* npm install --save-dev pm2 로 설치
* npx pm2 start main.js 로 실행
* pm2 start main.js --watch 로 실행하면 코드 변경 시 자동으로 노드 재시작해 수정사항 반영됨
* pm2 log 로 진행사항 및 에러 확인 가능
*
* pm2 monit 로 pm2에 의해 실행되고 있는 프로그램 확인 가능
* pm2 list 로 현재 실행 중인 프로세스 확인 가능
* pm2 stop main 으로 종료 가능
*/
