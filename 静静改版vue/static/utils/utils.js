

// 数据 处理
export default {
  // 页面名称
  FRAMEID:'',
  // 引入外部文件
  writeScript(PAGE) {
    console.log('PAGE==>', PAGE)
    // Vue引入外部js 相对路径从static开始 或者绝对路径 否则会报错
    var controllersFilesMap = {
      login: './static/loginPageControllers.js',
      main: './static/mainPageControllers.js',
    };
    var list = [
      // 'jquery1.7.2.js',
      controllersFilesMap[PAGE],
    ];
    for (var i = 0; i < list.length; i++) {
      // 该方式直接操作DOM，只在当前组件插入js文件。
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = list[i];
      document.body.appendChild(script);
      // document.write('<script src="'+ list[i] +'"><\/script>');
    }
  },
  emojiImgToUnicode(html) {
    var reg1 = /<img[^>]+(title1="(\[([^>]+)\])")[^>]*\/*>/gi;
    html = html.replace(reg1, function (v1, v2, v3, v4) {
      var reg = /^emoji_/;
      if (reg.test(v4)) {
        v4 = v4.replace(reg, '');
        if (emojiTitleMap[v4]) {
          var code = parseInt(emojiTitleMap[v4].code, 16);
          return String.fromCodePoint(code);
        }
      }
      return v1;
    })
    return html;
  },
  getTime(needMs) {
    var now = (new Date()).getTime();
    return needMs ? now : parseInt(now / 1000);
  },
  getNow() {
    return this.getTime(1);
  },
  
  convertAtToMob(str, getEmpFn, getEmpNameFn) {
    var atReg = /<input(?:[^>]*)?(?:class="_at_emp"(?:[^>]*)?at="(([\w]+\|[^"]+))"|at="(([\w]+\|[^"]+))"(?:[^>]*)?class="_at_emp")(?:[^>]*)\/*>/gi;
    var xx = '\u200B';
    str = str.replace(atReg, function (v, v1, v2) {
      var userId = v1 || v2;
      var arr = userId.split('|');
      var name = arr[1];
      return '@' + name + ' ' + xx;
    })
    return str;
  },
 
  // 判断是否为string
  isString(str) {
    return ((str instanceof String) || (typeof str).toLowerCase() == 'string');
  },
  // 设置 localStorage
  setLs(k, v) {
    var _v;
    if (typeof v === 'string' || typeof v === 'number') {
      _v = v;
    } else {
      _v = JSON.stringify(v);
    }
    try {
      localStorage.setItem(k, _v);
      return true;
    } catch (e) {
      console.log('存储本地数据失败');
      return false;
    }
  },
  // 取出 localStorage
  getLs(k) {
    var str = localStorage.getItem(k);
    try {
      str = JSON.parse(str);
    } catch (e) {
    }
    return str === 'undefined' ? '' : str;
  },

};