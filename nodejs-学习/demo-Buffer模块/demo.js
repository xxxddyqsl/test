// Buffer（缓冲区/缓存）
// nodejs的开发语言就是js，JavaScript语言自身只有字符串数据类型，没有二进制数据类型。
// nodejs有时会操作一些文件，或者说是tcp流之类的东西，那就必须操作二进制数据。
// 在nodejs中，有一个buffer类，它用来创建一个专门存放二进制数据的缓存区。
// buffer类是随nodejs的核心一起安装的，直接引入即可，这些原始数据是存储在buffer类的实例里，一个buffer类相当于是一个整数的数组，它相当于是划出了一块自己的内存空间。
// buffer类的实例用于表示 编码字符 的序列，它支持utf-8，base64，ascii等。

// 1.创建一个Buffer类：
// Buffer.alloc，它是返回一个指定大小的Buffer实例。
//创建一个长度为10，并且用0填充的buffer
const buf1 = Buffer.alloc(26);
// buf1 返回 二进制的流
console.log(buf1,'buf1长度===>'+buf1.length);
// 2..write()向buffer实例中写入内容：
let text = buf1.write('喜洋洋');
console.log("写入的字节数："+text);
// 3. 通过 toString()，从缓冲区中读取数据- 返回字符串 string。：
let data = buf1.toString();
console.log('data===>', data,typeof data)
//  toString() 传入参数 读取数据的位置 从 0-3

// 1 -- 默认编码格式是 utf8
// 2 -- start，开始位置
// 3 -- end，结束位置
let data_1= buf1.toString('utf8',0,3);
let data_2= buf1.toString('utf8',3,6);
console.log('data_2===>',data_1, data_2);

//批量输出26个字母 例子：
for(var i=0;i<26;i++){
    buf1[i] = 97 + i;
};
console.log(buf1.toString());
console.log(buf1.toString("ascii"));


// 4.将Buffer转换为JSON对象：
// buf1.toJSON()，它的返回值是一个json对象。
const buf2 =buf1.toJSON();
console.log('toJSON===>',buf2);
// 调用Buffer.from()，它是返回一个被array的值，初始化之后的新的Buffer实例。  array之中的元素只能是数字，否则会被0覆盖。
//0x加数字表示是16进制的数字
const buf3 =Buffer.from([0x4,0x2,'被0覆盖了']);
// 将JavaScript值（对象/数组）转化为一个JSON字符串。
const _json = JSON.stringify(buf3);
console.log(buf3,_json, JSON.parse(_json));


