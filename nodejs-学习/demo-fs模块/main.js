
var fs = require("fs");
// //基于回调的非阻塞的文件读取 非阻塞的例子：.readFile()基于回调的异步读取文件
//第一个参数是要读取的文件名
//第二个参数是处理读取到的文件的内容的回调函数
fs.readFile('../test.json', function (err, data) {
    if (err) return console.error(err);
    //data 直接输出会是个二进制的流，此时可以采用toString方法
    // console.log(data);

    // 从缓冲区中读取数据。下面是其中的参数：
    console.log(data.toString('utf8', 0, 3));
    console.log(data.toString());
    // 从缓冲区中读取数据 数据格式转化
    let msg = JSON.parse(data.toString());
    msg.map((item, index) => {
        console.log('map==>'+index,item)
    });
    msg.forEach(myFunction)
});
function myFunction(item, index) {
    console.log('forEach==>',item, index)
}
// node main.js执行程序
console.log(" 程序执行结束!");
/*
我们不需要等待文件读取完成，可以在读取文件的时候同时去执行下面的代码，提高了js的性能。
*/



// 通过异步来处理大并发：
// 阻塞的例子：.readFileSync(文件名)是同步读取文件

//.readFileSync是同步读取文件
var _data = fs.readFileSync('./test.json');
//直接输出会是个二进制的流，此时可以采用toString方法
// console.log(_data);
/* 这种操作在本质上已经形成了阻塞 */
console.log(_data.toString());
console.log('阻塞的例子 ==> js已经执行结束');



// 回调的例子：回调的函数一般是作为最后一个形参出现。

// 实际工作中，最具体的应用就是jq的$.ajax()。

// <!-- 
// 在浏览器运行的一个回调的例子
//  -->

//  <script type="text/javascript">
//  	function aaa(a,b,callback){
//  		callback(a,b);
//  	}


//  	function num(a,b){
//  		console.log(a+b);
//  	}
 	
//  	aaa(1,2,num);
 	
//  	//在这个例子中，num就是作为回调函数传入aaa中的。

//  </script> 