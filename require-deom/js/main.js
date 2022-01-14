require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"],
         // paths还可以配置多个路径，如果远程cdn库没有加载成功，可以加载本地的库，如下：
         // "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
        "test" : "test",//test.js
    }
})
    // 加载模块的标准方式
require(["jquery","test"],function($,test){
    console.log($,test);
    $(function(){
       alert( a.add(2,3));// 5
    })
})