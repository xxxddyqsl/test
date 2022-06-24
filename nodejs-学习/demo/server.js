//创建一个服务

//引入一个模块，把这个模块保存在 http 变量当中
var http = require('http');
http.createServer(function (req, res) {
    console.log(res.statusCode);
    //http头部的信息
    // HTTP 状态值: 200 : OK
    //内容的类型：text/plain(纯文本), text/html(html形式)..., xml
    res.writeHead(200, { 'Content-Type': 'application/json' });

    //向客户端发送数据 "Hello World"
    res.end("<h1>hello nodejs-1</h1>");
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');