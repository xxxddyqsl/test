function getSearch(url){
    var a = url || location.search;
    var obj = {};
    var ps = a.substr(1,a.length).split('&')
    for(var i=0;i<ps.length;i++){
        var _a = ps[i].split('=');
        var k = _a[0],v = _a[1];
        if(obj[k]){
            obj[k] = [obj[k]];
            obj[k].push(v);
        }else{
            obj[k] = v;
        }
    }
    return obj;
}
var print = false;
if(console){
    // var old = console.log;
    // console.log = function(){
    //     if(!print){
    //         return;
    //     }
    //     old.apply(console,arguments);
    // }
    console.log1 = function(){
        var temp = arguments[0];
        var args = arguments;
        if(typeof temp === 'string'){
            var i = 1;
            if(temp.indexOf('%c') == 0){
                i = 2;
                temp = temp.replace(/%c/,arguments[1]);
            }
            temp = temp.replace(/%s/g,function(){
                var res;
                if(typeof args[i] === 'object'){
                    res = JSON.stringify(args[i]);
                }else{
                    res = args[i];
                }
                i++;
                return res;
            })
            if(i < args.length){
                for(var j=i;j<args.length;j++){
                    if(typeof args[j] === 'string'){
                        temp += args[j];
                    }else{
                        temp += JSON.stringify(args[i]);
                    }
                }
            }
            old.apply(console,[temp]);
        }else{
            var arr = [];
            for(var i=0;i<arguments.length;i++){
                if(typeof arguments[i] === 'object'){
                    arr.push(JSON.stringify(arguments[i]));
                }
            }
            old.apply(console,arr);
        }
    }
}
var search = getSearch();
console.log('窗体打开时间：%s，脚本开始执行时间：%s，花费：%s',search.time , new Date().getTime() , new Date().getTime() - search.time);

document.addEventListener('mousedown',function(e){
    if(e.which == 2) e.preventDefault();
})
var jsDir = 'js/';
function writeScript(list){
    for(var i=0;i<list.length;i++){
        document.write('<script src="'+ ROOT + jsDir + list[i] +'"><\/script>');
    }
}
var controllersFilesMap = {
    login : 'loginPageControllers.js',
    main : 'mainPageControllers.js',
    choose : 'chooseUserControllers.js',
    userProfile : 'userProfileControllers.js',
    setting : 'settingControllers.js',
    about : 'aboutControllers.js',
    backUpAndRestore : 'backupAndStoreControllers.js',
    forward : 'forwardControllers.js',
    sendFile : 'sendFileControllers.js',
    receiveFile : 'receiveFileControllers.js',
    history : 'historyControllers.js',
    preview : 'previewImgControllers.js',
    vidioMeeting :'vidioMeetingControllers.js',
    BookAMeeting:'BookAMeetingControllers.js'
}
var list = [
    'jquery1.7.2.js',
    'angular-1.2.28/angular.js',
    'angular-1.2.28/angular-animate.min.js',
    'angular-1.2.28/angular-ui.router.js',
    'ByteBufferAB.min.js',
    'Long.min.js',
    'jquery.scrollbar.js',
    'core.js',
    'enc-base64.js',
    'modules.js',
    'services.js',
    controllersFilesMap[PAGE],
    'directives.js',
    'filters.js',
];
console.log(location.href);
writeScript(list);

