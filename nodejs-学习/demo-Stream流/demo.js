// Stream流
// Stream流(简单理解就是一个在线读取的资源)，是一个抽象的接口，在nodejs当中，很多方法、对象。它们都实现了这个接口。

// 例如：之前创建一个服务，向服务器发起一个请求，request对象，它其实就是个Stream。

// 在nodejs当中，Stream有四种流类型：

// Readable —可读操作
// Writeable —可写操作
// Duple—可读可写操作
// Transform —操作被写入数据，然后读出结果
// 所有的Stream对象，都是EventEmitter的实例，常用的事件：

// data 当有数据可读取时触发
// end 没有更多的数据可读取时触发
// error 在接收和写入过程中，发生错误时触发
// finish 所有的数据读取完成时触发
// 虽然是从流中去读取文件，但是依然是在操作文件，所有还是要用到nodejs当中的fs模块。

// 读取流示例
const fs = require('fs');
var data = '';
//创建一个可读流
var readStream = fs.createReadStream("../test.json");
// console.log(readStream);
//目前Node.js仅支持 hex、utf8、ascii、binary、base64、ucs2 几种编码的转换 设置可读流的编码格式,utf-8 （数据流会返回UTF-8字符串）和 hex （数据流会返回16进制的字符串）
readStream.setEncoding('utf-8');
//处理流的事件,data,error,end
readStream.on('data', function (trunk) {
    // 如果这个文件读取流读取的是一个纯英文的文件，data += trunk 这段代码是能够正常输出的。但是如果我们再改变一下条件（例子在下方的 rs 中），将每次读取的buffer大小变成一个奇数，以模拟一个字符被分配在两个trunk中的场景。
    // data+=trunk；等价于data=data.tostring()+trunk.tostring();
    data += trunk;
    console.log('data ==>',trunk);
});

readStream.on('error', function () {
    console.log('error==>',data);
});
readStream.on('end', function (d) {
    console.log('end==>',data,d);
});
// 每次读取的buffer大小变成一个奇数 {bufferSize: 11}
var data_1='';
var rs = fs.createReadStream('../testdata.md', {bufferSize: 11});
rs.on("data", function (trunk){
    data_1 += trunk;
});
rs.on("end", function () {
    console.log(data_1);
});
console.log("读取完毕！");

// 创建进度条  Progress 是一个很棒的软件包，可在控制台中创建进度条。 使用 npm install progress 进行局部安装。
// 以下代码段会创建一个 10 步的进度条，每 100 毫秒完成一步。 当进度条结束时，则清除定时器：
const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`你叫什么名字?`, name => {
    console.log(`你好 ${name}!`)
    readline.close()
  })