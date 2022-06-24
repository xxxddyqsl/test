// post请求
// 要用到querystring，用来解析url的，querystring.parse()，用于将一个字符串转换为对象。
//post请求
var _http = require('http');
var querystring = require('querystring');

const POST_OPTIONS = {
    port: 4399,
    host: "127.0.0.1",
    path: "/",
    method: 'POST',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
};
_http.createServer(function (req, res) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { method, url } = req;
    // console.log(req)

    // 读取 post传递过来的数据
    // 读取方式 - 1
    var _data = '';
    // 读取方式 - 2
    // var _dataA = [];
    req.on('data', trunk => {
        // 读取方式 - 2
        // _dataA.push(...chunk)
        //
        // _data+= trunk ；等价于data=data.tostring()+trunk.tostring();
        _data += trunk;
        console.log('chunk: ', trunk.toString());
        console.log('_data: ', _data)
    })

    req.on('end', () => {
        //// 读取方式 - 2  把传递过来的数据转换为一个对象
        // let data = JSON.parse(new TextDecoder().decode(new Uint8Array(_dataA)))
        console.log('data: ', _data)
    })
    if (method == 'POST') {
        // 登录 请求接口
        if (url == '/login') {
            res.writeHead(200, {
                // 返回的数据格式
                'Content-Type': "application/json;charset=utf-8"
            });
            // 读取本地登录 json 文件 拉取本地测试数据 --非阻塞的方式文件读取  _fs.readFile() 和 _fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。
            // 这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。在这种情况下，更好的选择是使用流来读取文件的内容（_fs.createReadStream 会给你一个可读流。）。
            _fs.readFile('./login.json', function (err, data) {
                if (err) return console.error(err);
                 //data 直接输出会是个二进制的流，此时可以采用 toString() 方法 返回字符串
                 let msg = JSON.parse(data.toString());
                 let is = false;
                // 校验 post 传入的参数 本地是否存在
                for (let i in msg) {
                    if(msg[i].name == JSON.parse(_data).name){
                        console.log('msg==>' ,JSON.parse(_data).name);
                        is=true;
                        if( msg[i].password == JSON.parse(_data).password){ 
                            let _param={};
                            _param.Code=200;
                            _param.data=msg[i];
                            // 本地数据返回给前台
                            res.end(JSON.stringify(_param));
                        }else{
                              //  返回给前台
                            res.end(JSON.stringify({Code:200,message :'密码不正确'}));
                        };
                        //  退出循环
                        break;
                    } else {
                        is = false;
                    }
                };
                if(!is){
                    console.log('账号不存在')
                      //  返回给前台
                      res.end(JSON.stringify({Code:200,message :'账号不存在'}));
                };
                console.log(is,msg);
            })
        }

    }
    // console.log(method, url)
}).listen(4399);

//基于回调的非阻塞的文件读取
var _fs = require('fs');

// const content = '一些内容'

// try {
//     //文件写入成功。 此 API 会替换文件的内容（如果文件已经存在）。
//   const data = _fs.writeFileSync('./login.json', content)
  
// } catch (err) {
//   console.error(err)
// }