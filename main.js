var http = require('http');

var app = http.createServer(function(request, response){
    response.writeHead(200);
    response.end("Hello Node.js!");
})
app.listen(3000);

//터미널에서 node main.js 로 실행 후
//웹브라우저에서 localhost:3000 로 접속