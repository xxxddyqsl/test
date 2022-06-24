// 获得get请求的内容，它的内容是在URL的？号之后的部分（例如：?a=1&b=2&c=3）：
// util（nodejs的工具对象，有许多许多的方法）
// util.inspect，用来把对象转换为字符串
// url，是nodejs的url模块
// url.parse，解析url请求之类的东西

// get请求
var _http = require('http');
var _util = require('util');
var _url = require('url');
_http.createServer(function (req, res) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");  
    // res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.setHeader("X-Powered-By",' 3.2.1')  
    // res.setHeader("Content-Type", "application/json;charset=utf-8");  
    // 指定 允许跨域的域名 "http://127.0.0.1:5501/"
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501/");
    //获取调用接口 url 后的参数
    var data = _url.parse(req.url, true).query;
    console.log(data);
    console.log('end ===>',JSON.stringify(data));//数据全部到达
    var _param = {};
    
    // 跨域 请求返回 数据发送
    // jsonp的原理：   //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback) 可自定义 函数名称
    // 首先在客户端注册一个 callback (如:自定义 'jsoncallback' 默认函数名称为callback ), 然后把callback的名字(如:success_jsonpCallback)传给服务器端对应的处理函数。
    // 服务器先生成需要返回给客户端的 json 数据。然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数(jsoncallback)的值(success_jsonpCallback) 。
    // if (data.jsoncallback) {

    //     // //状态码 ：200 成功
    //     _param.status = res.statusCode
    //     _param.Data = [{
    //         name: '测试get请求返回数据',
    //         age: 18
    //     }];
    //     var renderStr = data.jsoncallback + "(" + JSON.stringify(_param) + ")";
    //     console.log(JSON.stringify(_param))
    //     res.end(renderStr);
    // } else
    console.log(req);
    console.log(req.method+'：请求')
    if (data.code) {
        res.writeHead(200, {
            // 返回的数据格式
            'Content-Type': "application/json;charset=utf-8"
        });
        // //状态码 ：200 成功
        _param.status = res.statusCode
        _param.Data = [{
            name: '测试get请求返回数据',
            age: 18
        }];
        //校验 是否跨域  跨域会接收到 前端 自定义的jsonp回调函数名称( data.jsoncallback == success_jsonpCallback)，不写默认为jQuery自动生成的随机函数名
        if (data.jsoncallback || data.callback) {
            //  data.jsoncallback 的值其实就是：success_jsonpCallback
            // 请求返回 数据发送 
            _param.message = '已经跨域那';
            // 函数名称 data.jsoncallback 返回给前台 javascript 语法的方式，生成一个function 要返回的数据 当参数传入
            var renderStr = data.jsoncallback || data.callback + "(" + JSON.stringify(_param) + ")";
            res.end(renderStr);
        } else {
            // 未跨域
            _param.message = '没有跨域哦';
            // 为什么要用JSON.stringfy转换成字符串？因为end()里只能接字符串，所以把对象转换成字符串
            res.end(JSON.stringify(_param));
        }
        console.log(res.statusCode + '==>', _param);
    } else {
        // 没有code 由返回404
        res.writeHead(404, {
            // 返回的数据格式
            'Content-Type': "application/json;charset=utf-8"
        });
        // //状态码 ：200 成功
        _param.status = 404;
        _param.Message = [{
            text: '操作失败缺失code参数',
        }]
        var _param = JSON.stringify(_param);
        // 为什么要用JSON.stringfy转换成字符串？因为end()里只能接字符串，所以把对象转换成字符串
        res.end(_param);
        console.log(_param);
    }

    // res.end('xx123')
    //end方法只能向页面发送字符
    //res.end(_url.parse(req._url));error：_url.parse(req._url)是一个对
    // res.end(_util.inspect(_url.parse(req._url)));

}).listen(5642);
// http://172.18.70.26:5642 等于 http://127.0.0.1:5642
console.log('5642端口服务已经打开==>url 中输入测试地址 http://127.0.0.1:5642/?code=19945&name=%E6%B5%8B%E8%AF%95&age=16 或者 ip地址 http://172.18.70.26:5642?code=19945&name=%E6%B5%8B%E8%AF%95&age=16');


// 浏览器 控制台 输出  
// document.write('<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">' + '<\/script>');
//浏览器 URL == http://172.18.70.26:5642 控制输出  同源策略： 主机 端口 协议 未跨域
// function getFun(){
//     $.ajax({ 
//         type: "GET",//必须是get请求
//         url: "http://127.0.0.1:5642/?code="+code+'&codeA=codeA',
//         data: {aa:'测试data',bb:'测试b'},
//         success: function (res) {
//             console.log(res);
//         },error:function(err){
//             console.log(err)
//         }
//     });
// }
// // 跨域请求 在地址 - http://127.0.0.1:5501/nodejs-学习/demo-get请求/index.html 中测试使用 （同域名下端口号不同）
// function getFunJsonp(){
//     $.ajax({
//         async:false,
//         type: "GET",//必须是get请求
//         url: "http://127.0.0.1:5642/?code="+code+'&codeA=codeA',
//         dataType: 'jsonp',
//          //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
//         jsonp: 'jsoncallback',
//         data: {aa:'测试data',bb:'测试b'},
//         //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名  //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
//         jsonpCallback:"success_jsonpCallback",
//         success: function (res) {
//             console.log(res);
//         },error:function(err){
//             console.log(err)
//         }
//     });
// }