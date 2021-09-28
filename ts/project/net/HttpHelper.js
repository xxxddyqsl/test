"use strict";
//import httploader = require('./httploader.js');
exports.__esModule = true;
var HttpHelper = /** @class */ (function () {
    function HttpHelper() {
        this.mReq = null;
        this.mCb = null;
        this.mContext = "";
    }
    HttpHelper.prototype.Open = function (url, method, context) {
        if (context === void 0) { context = ""; }
        this.mReq = new window.XMLHttpRequest; //httploader.NewXMLHttpRequest(); 
        this.mReq.timeout = 5000;
        this.mContext = context;
        this.mReq.onreadystatechange = this.OnHttpFuncion.bind(this);
        if (method == null || method === undefined) {
            method = "POST";
        }
        if (method.toUpperCase() !== "POST" && method.toUpperCase() !== "GET") {
            method = "POST";
        }
        this.mReq.open(method, url, true);
        this.mReq.onerror = this.OnError.bind(this);
        this.mReq.ontimeout = this.OnTimeout.bind(this);
        this.mReq.onabort = this.OnAbort.bind(this);
    };
    HttpHelper.prototype.SetHeader = function (header, value) {
        this.mReq.setRequestHeader(header, value);
    };
    HttpHelper.prototype.Send = function (data, cb) {
        if (data === void 0) { data = ""; }
        if (cb === void 0) { cb = null; }
        this.mCb = cb;
        this.mReq.send(data);
    };
    HttpHelper.prototype.OnHttpFuncion = function () {
        if (this.mReq.readyState == 4 && (this.mReq.status >= 200 && this.mReq.status < 400)) {
            //var res = JSON.parse(this.mReq.responseText);
            if (null != this.mCb) {
                this.mCb(200, this.mReq.responseText, this.mContext);
            }
        }
    };
    HttpHelper.prototype.OnError = function (e) {
        if (null != this.mCb) {
            this.mCb(404, "", this.mContext);
        }
    };
    HttpHelper.prototype.OnTimeout = function (e) {
        if (null != this.mCb) {
            this.mCb(505, "", this.mContext);
        }
    };
    HttpHelper.prototype.OnAbort = function (e) {
        if (null != this.mCb) {
            this.mCb(550, "", this.mContext);
        }
    };
    return HttpHelper;
}());
exports["default"] = HttpHelper;
