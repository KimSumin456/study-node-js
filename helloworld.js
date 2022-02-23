// 터미널에서 node helloworld.js 로 실행
console.log("Hello world!");

// 터미널에서 node helloworld.js a b c 로 실행
var args = process.argv;
console.log(args);
console.log(args[2] + args[3]);