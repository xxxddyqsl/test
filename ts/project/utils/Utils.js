"use strict";
exports.__esModule = true;
var md5_1 = require("./md5");
var crc32_1 = require("./crc32");
var utiljs = require("./utilsjs/utiljs.js");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.md5Hash = function (str) {
        var f = new md5_1["default"]();
        return f.hex_md5(str);
    };
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    Utils.checkPhone = function (phone) {
        var reg = /^1[3|4|5|7|8][0-9]{9}/;
        if (reg.test(phone)) {
            return true; //手机号码正确
        }
        return false;
    };
    Utils.randomString = function (count) {
        if (count < 1) {
            return "";
        }
        var orgs = ['1', 'h', '7', 'a',
            '0', 'b', '8', 'e', 't', 'z', 'v', 'y',
            'o', '4', 'f', '6', 'n', 'g', 'm',
            'p', '5', 'c', '3', 'i', 'j', 'k',
            'o', '4', 'f', '6', 'n', 'g', 'm',
            'p', '5', 'c', '3', 'i', 'j', 'k',
            '9', 'l', 's', '2', 'd', 'r', 'q',
            '1', 'h', '7', 'a', 'w', 'x', 'u'];
        var ret = '';
        for (var i = 0; i < count; i++) {
            var idx = Math.ceil(Math.random() * (orgs.length - 12));
            ret += orgs[idx];
        }
        return ret;
    };
    Utils.timestamp = function () {
        return Math.floor(Date.now() / 1000);
    };
    Utils.timeString = function () {
        var t = new Date();
        var hour = t.getHours();
        var minute = t.getMinutes();
        var second = t.getSeconds();
        var str = "";
        str = hour.toString();
        if (minute < 10) {
            str = str + ":0" + minute.toString();
        }
        else {
            str = str + ":" + minute.toString();
        }
        if (second < 10) {
            str = str + ":0" + second.toString();
        }
        else {
            str = str + ":" + second.toString();
        }
        return str;
    };
    Utils.base64Encode = function (buf) {
        return utiljs.Base64Encode(buf);
    };
    Utils.base64Decode = function (buf) {
        return utiljs.Base64Decode(buf);
    };
    Utils.crc32Sum = function (buf) {
        return crc32_1["default"].crcSum(buf);
    };
    Utils.uint8ToString = function (data) {
        var ret = "";
        for (var idx = 0; idx < data.length; idx++) {
            ret += String.fromCharCode(data[idx]);
        }
        return ret;
    };
    return Utils;
}());
exports["default"] = Utils;
