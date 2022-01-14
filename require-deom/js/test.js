// AMD模块的写法

// require.js加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写。

// 采用特定的define()函数来定义

define(function () {
    class main{
        add  (x, y) {
            return x + y;
        };
    }
    return  new main();
});