// nodejs的事件(一)
// nodejs是一个单进程单线程的应用程序，由于V8引擎提供了异步执行回调的接口，通过这些接口处理大的并发请求，性能很高。

// 基本上nodejs所有的事件机制，都是基于设计模式中的“观察者模式”来实现的。

// nodejs使用事件驱动的模型：每当接收到一个请求，就把它关掉进行处理，当这个请求完成，就把它放到处理队列当中，最后把结果返回给用户。

// 由于nodejs的服务一直都是处理接收请求，但不等待任何的读写操作，所以性能很高，这也叫“非阻塞式的I/O或是事件驱动I/O"。

// nodejs的事件是使用 events 模块(require(“events”))，通过实例化( var event = new xx.EventEmitter)它里面的 EventEmitter 类来绑定和监听事件。

// 绑定事件：event.on(…)

// 监听事件：event.emit(…)
// node中的js，依然还是那个js，依然是从上到下一行一行的读取的解释型的脚本语言。编写时依然要注意顺序。

/*
nodejs 事件 nodejs里面所有异步的io操作，都会在完成时，发送一个事件到事件队列。
events这个模块只有一个对象events.EventEmitter，它的核心就是“事件触发与监听功能的封装”。
*/
var _events = require("events");
//EventEmitter的一个实例
var _EventEmitter = new _events.EventEmitter();
console.log(_EventEmitter)
//这里的事件名，完全不同于浏览器的各种事件，这里完全就只是一个标识，它其实是绑定了一个回调函数。
// EventEmitter，它的每个事件都是由：
// 1.事件名，是一个字符串
// 2.若干个参数

// 通过on绑定事件
_EventEmitter.on("xx123",function(arg1,arg2){
	console.log("xx123事件已经被触发",arg1,arg2);
	//事件的嵌套
	_EventEmitter.emit("xx456",arg1,arg2);
});

_EventEmitter.on("xx456",xx456fn);

function xx456fn(arg1,arg2){
	console.log("xx456事件已经被触发==>",arg1,arg2);
}

// 通过 .emit()方法触发并传参。如下实例：
_EventEmitter.emit("xx123","参数1111","参数2222");

// 通过on绑定事件 事件名，是一个字符串
_EventEmitter.on("timeout",function(msg,callback){
    //调用 传入的 回调函数
    callback('触发回调函数',1,2)
    console.log("timeout 事件被触发！",msg);
})
// 函数
function aaa(s,a, b) {
    console.log(s,a + b);
}
setTimeout(function(){
    // 通过emit()方法触发事件并传参，可传若干个参数  aaa作为回调函数传入timeout事件中
    _EventEmitter.emit("timeout",'参数测试',aaa);
},2000)

//可以在一个实例上，通过on绑定多个事件，然后通过同一个.emit()方法触发并传参
_EventEmitter.on("xx1",function(arg1,arg2){
	console.log("xx11111",arg1);
})

_EventEmitter.on("xx1",function(arg1,arg2){
	console.log("xx22222",arg2);
})

_EventEmitter.emit("xx1","这是1111","这是2222");
//start  监听这些事件   在这个库实例化的时候，“start”事件会被立刻触发执行，但此时事件的回调函数还没有准备好，所以在客户端根本无法接收到这个事件。同样，我们可以用process.nextTick()来改写事件触发的过程
process.nextTick(function() {
    _EventEmitter.emit('start');
});
_EventEmitter.on('start', function() {
    console.log('Reading has started');
});
console.log(_EventEmitter);