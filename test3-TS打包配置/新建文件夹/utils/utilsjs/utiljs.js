module.exports.Base64Encode = function(buf) {
    var b64 = require('base64');
    return b64.b64Encode(buf);
}

module.exports.Base64Decode = function(buf) {
    var b64 = require('base64');
    return b64.b64Decode(buf);
}