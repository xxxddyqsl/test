// 数据 处理 
var NumberUtil = {
    //int整数转换为2字节的byte数组
    intToByte2: function (i) {
        var targets = [];
        targets[0] = (i & 0xFF);
        targets[1] = (i >> 8 & 0xFF);
        return targets;
    },
    //int整数转换为4字节的byte数组
    intToByte4: function (i) {
        var targets = [];
        targets[0] = (i & 0xFF);
        targets[1] = (i >> 8 & 0xFF);
        targets[2] = (i >> 16 & 0xFF);
        targets[3] = (i >> 24 & 0xFF);
        return targets;
    },
    //byte数组转换为int整数
    bytesToInt2: function (bytes, off) {
        var b3 = bytes[off] & 0xFF;
        var b2 = bytes[off + 1] & 0xFF;
        var b1 = bytes[off + 2] & 0xFF;
        var b0 = bytes[off + 3] & 0xFF;
        return (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
    },
    // 数组替换
    ArrSplice: function (starti, arr1, arr2) {
        arr2.forEach((item, index, array) => {
            arr1.splice(starti, 1, item);
            starti++;
        })
    },
    // 字符串转Uint8Array
    stringToUint8Array: function (str){
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }
        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array;
    },
    // Uint8Array 转 字符串
    Uint8ArrayToString:function (fileData){
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        } 
        return dataString; 
    },
    // 对字符串 转 base64
    encode(str){
        // 对字符串进行编码
        var encode = encodeURI(str);
        // 对编码的字符串转化base64
        var base64 = btoa(encode);
        return base64;
    },
     // base64转字符串
    decode(base64){
        // 对base64转编码
        var decode = atob(base64);
        // 编码转字符串
        var str = decodeURI(decode);
        return str;
    },
    // 解析 Object
    objParsing(obj){
        for(let i in obj){
        // 判断类型 是否是字符串
            if(Object.prototype.toString.call(obj[i])=="[object String]"){
                // base64 转 字符串
                var value = NumberUtil.decode(obj[i]);
                // 字符串 赋值 给 原Object对象 替换 base64
                obj[i]=value;
                // console.log(obj[i]);
                // 如果 值类型是 对象[object Object]  或者 数组对象[object Array]
            }else if(Object.prototype.toString.call(obj[i])=="[object Array]"||Object.prototype.toString.call(obj[i])=="[object Object]"){
                // console.log(obj[i]);
                // 再次调用 objParsing 传入 对象 验证 类型为字符串 base64转字符串
                NumberUtil.objParsing(obj[i]);
            }
       
        }
        //  console.log(obj);
         return obj;
    },
    // 根据 websocket 返回的数据类型 对数据进行 预处理 生成 Uint8Array 最后pb模块解析
    SocketType(data){  
        switch (websocket.Socket.binaryType){
            case "blob":
                NumberUtil.blobType(data);
                break;
            case "arraybuffer":
                 NumberUtil.bufferType(data); 
                break;
            default:
               console.log('error:未解析Socket');
        } 
    },
    //websocket  返回的数据类型 blob 预处理
   blobType(data){
    var reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onload = function (e) {
        let buf =new Uint8Array(reader.result);
        // 解析 返回的数据
        ParsingMsg(buf); 
    }
   },
   // websocket  返回的数据类型 ArrayBuffer 预处理
   bufferType(data){
    let buf = new Uint8Array(data, 0, data.byteLength);
    // 解析 返回的数据
    ParsingMsg(buf); 
   },
    // UTF8解码 转成汉字字符串 
    utf8ToSting(str){
        var rs = '';
        for(var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            // console.log(code);
            if((240 & code) == 240) {
                var code1 = str.charCodeAt(i + 1),
                code2 = str.charCodeAt(i + 2),
                code3 = str.charCodeAt(i + 3);
                rs += String.fromCodePoint(((code & 7) << 18) | ((code1 & 63) << 12) | ((code2 & 63) << 6) | (code3 & 63));
                i += 3;
            } else if((224 & code) == 224) {
                var code1 = str.charCodeAt(i + 1),
                code2 = str.charCodeAt(i + 2);
                rs += String.fromCodePoint(((code & 15) << 12) | ((code1 & 63) << 6) | (code2 & 63));
                i += 2;
            } else if((192 & code) == 192) {
                var code1 = str.charCodeAt(i + 1);
                rs += String.fromCodePoint(((code & 31) << 6) | (code1 & 63));
                i++;
            } else if((128 & code) == 0) {
                rs += String.fromCharCode(code);
            }
        }
        return rs;
    },
    //  汉字字符串转成 UTF8编码
    StingToUtf8(str){
        var rs = '';
        for(var i of str) {
            var code = i.codePointAt(0);
                if(code < 128) {
                    rs += i;
                } else if(code > 127 && code < 2048) {
                    rs += String.fromCharCode((code >> 6) | 192, (code & 63) | 128);
                } else if(code > 2047 && code < 65536) {
                    rs += String.fromCharCode((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128);
                } else if(code > 65536 && code < 1114112) {
                    rs += String.fromCharCode((code >> 18) | 240, ((code >> 12) & 63) | 128, ((code >> 6) & 63) | 128, (code & 63) | 128);
            }
        }
        console.log(rs);
        return rs;
    },
};