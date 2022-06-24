测试==》事件循环和请求对象
造成这个问题的根源在于data += trunk语句里隐藏的错误，在默认的情况下，trunk是一个Buffer对象。这句话的实质是隐藏了toString的变换的：data = data.toString() + trunk.toString();
由于汉字不是用一个字节来存储的，导致有被截破的汉字的存在，于是出现乱码。解决这个问题有一个简单的方案，是设置编码集：

var rs = fs.createReadStream('testdata.md', {encoding: 'utf-8', bufferSize: 11}); 