//import httploader = require('./httploader.js');

export default class HttpHelper {
  private mReq : XMLHttpRequest = null;
  private mCb : any = null;
  private mContext:string  = "";

  Open(url:string, method:string, context:string = "") {
      this.mReq = new window.XMLHttpRequest;//httploader.NewXMLHttpRequest(); 
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
  }

  SetHeader(header:string, value:string) {
      this.mReq.setRequestHeader(header, value);
  }

  Send(data:string = "", cb : any = null) {
      this.mCb = cb;
      this.mReq.send(data);
  }

  private OnHttpFuncion() {
      if (this.mReq.readyState == 4 && (this.mReq.status >= 200 && this.mReq.status < 400)) { 
          //var res = JSON.parse(this.mReq.responseText);
          if (null != this.mCb) {
              this.mCb(200, this.mReq.responseText, this.mContext);
          }
      }
  }

  private OnError(e : ErrorEvent) {

      if (null != this.mCb) {
          this.mCb(404, "", this.mContext);
      }
  }

  private OnTimeout(e:ProgressEvent) {
      if (null != this.mCb) {
          this.mCb(505, "", this.mContext);
      }
  }

  private OnAbort(e:Event) {
      if (null != this.mCb) {
          this.mCb(550, "", this.mContext);
      }
  }
}