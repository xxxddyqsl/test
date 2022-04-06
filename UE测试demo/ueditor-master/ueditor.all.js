/*!
 * UEditor
 * version: ueditor
 * 打包步骤
 *      先安装uglify (npm install uglify-js -g)
 *      打包命令格式： uglifyjs[file] - m - c--safari10 - o[output] (https: //www.npmjs.com/package/uglify-js)
 *      具体命令：uglifyjs ueditor.all.evil.js -m -c --safari10 -o ../ueditor.all.evil.min.js (兼容safari10)
 * 
 * 新打包步骤:
 *      先安装uglify (npm install terser -g)
 *      打包命令格式： terser[file] - m - c--safari10 - o[output] (//https://www.npmjs.com/package/tersers)
 *      具体命令：terser ueditor.all.evil.js -m -c --safari10 -o ../ueditor.all.evil.min.js (兼容safari10)
 */
!
    function () {
        UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
        var baidu = window.baidu || {};
        window.baidu = baidu,
            window.UE = baidu.editor = window.UE || {},
            UE.plugins = {},
            UE.commands = {},
            UE.instants = {},
            UE.I18N = {},
            UE._customizeUI = {},
            UE.version = "1.4.3";
        var dom = UE.dom = {};
        function extendUE() {
            UE.insertAudioApi = insertAudioApi,
                UE.insertVideoApi = insertVideoApi
        }
        function precessUploadToMaterial(e) {
            if (e && !(e.length <= 0)) {
                for (var t = e.slice(0), i = [], n = 0, o = t.length; n < o; n++) i.push(transformImgInfo(t[n]));
                var r = setTimeout((function () {
                    uploadToMaterial(i),
                        clearTimeout(r),
                        r = null
                }), 300)
            }
        }
        function uploadToMaterial(e) {
            $.ajax({
                type: "POST",
                url: "/api/material/upload",
                dataType: "json",
                timeout: 6e4,
                data: {
                    data: e,
                    type: 1,
                    category_id: 7,
                    app_id: window.__app_id
                },
                success: function () { },
                error: function (t) {
                    console.log("上报素材中心失败", t, e)
                }
            })
        }
        function transformImgInfo(e) {
            var t = e.title;
            return e.title === e.type && e.url.replace(/.+\/(.+?)\./, (e, i) => (t = i + t, e)),
            {
                title: t,
                url: e.url,
                material_size: function (e) {
                    if (!e || isNaN(e) || e <= 0) return .5;
                    var t = e / 1024 / 1024;
                    return Math.ceil(100 * t) / 100
                }(e.size)
            }
        }
        function filterQcloudImg(e) {
            return /wechatapppro-1252524126\.file\.myqcloud\.com/.test(e)
        }
        function insertAudioApi(e, t, i) {
            var n = window.parent.MEDIA_IFRAME_API_SERVER || "https://iframe.xiaoeknow.com";
            $.ajax({
                url: n + "/api/richtext/set_audio_data",
                method: "POST",
                data: {
                    audio_data: e
                },
                dataType: "json",
                async: !1,
                success: function (e) {
                    if (0 == e.code) {
                        var o = document.createElement("iframe");
                        o.setAttribute("src", n + "/page/?id=" + e.data[0] + "&type=2"),
                            o.setAttribute("class", "xiaoe-iframe-audio"),
                            o.setAttribute("height", "72px"),
                            div = document.createElement("div"),
                            div.appendChild(o),
                            t && "function" == typeof t && t(div.innerHTML)
                    } else console.log("插入失败"),
                        i && "function" == typeof i && i(e.msg)
                }
            })
        }
        function insertVideoApi(e, t, i) {
            var n = window.parent.MEDIA_IFRAME_API_SERVER || "https://iframe.xiaoeknow.com";
            $.ajax({
                url: n + "/api/richtext/set_video_data",
                method: "POST",
                data: {
                    video_data: e
                },
                dataType: "json",
                async: !1,
                success: function (e) {
                    if (0 == e.code) {
                        var o = document.createElement("iframe");
                        o.setAttribute("src", n + "/page/?id=" + e.data[0] + "&type=3"),
                            o.setAttribute("class", "xiaoe-iframe-video"),
                            o.setAttribute("onload", "this.height=0.56*this.scrollWidth + 'px'"),
                            o.setAttribute("allowfullscreen", "true"),
                            o.setAttribute("webkitallowfullscreen", "true"),
                            o.setAttribute("mozallowfullscreen", "true"),
                            div = document.createElement("div"),
                            div.appendChild(o),
                            t && "function" == typeof t && t(div.innerHTML)
                    } else console.log("插入失败"),
                        i && "function" == typeof i && i(e)
                }
            })
        }
        extendUE();
        var browser = UE.browser = function () {
            var e = navigator.userAgent.toLowerCase(),
                t = window.opera,
                i = {
                    ie: /(msie\s|trident.*rv:)([\w.]+)/.test(e),
                    opera: !!t && t.version,
                    webkit: e.indexOf(" applewebkit/") > -1,
                    mac: e.indexOf("macintosh") > -1,
                    quirks: "BackCompat" == document.compatMode
                };
            i.gecko = "Gecko" == navigator.product && !i.webkit && !i.opera && !i.ie;
            var n = 0;
            if (i.ie) {
                var o = e.match(/(?:msie\s([\w.]+))/),
                    r = e.match(/(?:trident.*rv:([\w.]+))/);
                n = o && r && o[1] && r[1] ? Math.max(1 * o[1], 1 * r[1]) : o && o[1] ? 1 * o[1] : r && r[1] ? 1 * r[1] : 0,
                    i.ie11Compat = 11 == document.documentMode,
                    i.ie9Compat = 9 == document.documentMode,
                    i.ie8 = !!document.documentMode,
                    i.ie8Compat = 8 == document.documentMode,
                    i.ie7Compat = 7 == n && !document.documentMode || 7 == document.documentMode,
                    i.ie6Compat = n < 7 || i.quirks,
                    i.ie9above = n > 8,
                    i.ie9below = n < 9,
                    i.ie11above = n > 10,
                    i.ie11below = n < 11
            }
            if (i.gecko) {
                var a = e.match(/rv:([\d\.]+)/);
                a && (n = 1e4 * (a = a[1].split("."))[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0))
            }
            return /chrome\/(\d+\.\d)/i.test(e) && (i.chrome = +RegExp.$1),
                /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (i.safari = +(RegExp.$1 || RegExp.$2)),
                i.opera && (n = parseFloat(t.version())),
                i.webkit && (n = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),
                i.version = n,
                i.isCompatible = !i.mobile && (i.ie && n >= 6 || i.gecko && n >= 10801 || i.opera && n >= 9.5 || i.air && n >= 1 || i.webkit && n >= 522 || !1),
                i
        }(),
            ie = browser.ie,
            webkit = browser.webkit,
            gecko = browser.gecko,
            opera = browser.opera,
            utils = UE.utils = {
                each: function (e, t, i) {
                    if (null != e) if (e.length === +e.length) {
                        for (var n = 0,
                            o = e.length; n < o; n++) if (!1 === t.call(i, e[n], n, e)) return !1
                    } else for (var r in e) if (e.hasOwnProperty(r) && !1 === t.call(i, e[r], r, e)) return !1
                },
                makeInstance: function (e) {
                    var t = new Function;
                    return t.prototype = e,
                        e = new t,
                        t.prototype = null,
                        e
                },
                extend: function (e, t, i) {
                    if (t) for (var n in t) i && e.hasOwnProperty(n) || (e[n] = t[n]);
                    return e
                },
                extend2: function (e) {
                    for (var t = arguments,
                        i = 1; i < t.length; i++) {
                        var n = t[i];
                        for (var o in n) e.hasOwnProperty(o) || (e[o] = n[o])
                    }
                    return e
                },
                inherits: function (e, t) {
                    var i = e.prototype,
                        n = utils.makeInstance(t.prototype);
                    return utils.extend(n, i, !0),
                        e.prototype = n,
                        n.constructor = e
                },
                bind: function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                },
                defer: function (e, t, i) {
                    var n;
                    return function () {
                        i && clearTimeout(n),
                            n = setTimeout(e, t)
                    }
                },
                indexOf: function (e, t, i) {
                    var n = -1;
                    return i = this.isNumber(i) ? i : 0,
                        this.each(e, (function (e, o) {
                            if (o >= i && e === t) return n = o,
                                !1
                        })),
                        n
                },
                removeItem: function (e, t) {
                    for (var i = 0,
                        n = e.length; i < n; i++) e[i] === t && (e.splice(i, 1), i--)
                },
                trim: function (e) {
                    return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
                },
                listToMap: function (e) {
                    if (!e) return {};
                    e = utils.isArray(e) ? e : e.split(",");
                    for (var t, i = 0,
                        n = {}; t = e[i++];) n[t.toUpperCase()] = n[t] = 1;
                    return n
                },
                unhtml: function (e, t) {
                    return e ? e.replace(t || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, (function (e, t) {
                        return t ? e : {
                            "<": "&lt;",
                            "&": "&amp;",
                            '"': "&quot;",
                            ">": "&gt;",
                            "'": "&#39;"
                        }[e]
                    })) : ""
                },
                unhtmlForUrl: function (e, t) {
                    return e ? e.replace(t || /[<">']/g, (function (e) {
                        return {
                            "<": "&lt;",
                            "&": "&amp;",
                            '"': "&quot;",
                            ">": "&gt;",
                            "'": "&#39;"
                        }[e]
                    })) : ""
                },
                html: function (e) {
                    return e ? e.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, (function (e) {
                        return {
                            "&lt;": "<",
                            "&amp;": "&",
                            "&quot;": '"',
                            "&gt;": ">",
                            "&#39;": "'",
                            "&nbsp;": " "
                        }[e]
                    })) : ""
                },
                cssStyleToDomStyle: (test = document.createElement("div").style, cache = {
                    float: null != test.cssFloat ? "cssFloat" : null != test.styleFloat ? "styleFloat" : "float"
                },
                    function (e) {
                        return cache[e] || (cache[e] = e.toLowerCase().replace(/-./g, (function (e) {
                            return e.charAt(1).toUpperCase()
                        })))
                    }),
                loadFile: function () {
                    var e = [];
                    function t(t, i) {
                        try {
                            for (var n, o = 0; n = e[o++];) if (n.doc === t && n.url == (i.src || i.href)) return n
                        } catch (r) {
                            return null
                        }
                    }
                    return function (i, n, o) {
                        var r = t(i, n);
                        if (r) r.ready ? o && o() : r.funs.push(o);
                        else if (e.push({
                            doc: i,
                            url: n.src || n.href,
                            funs: [o]
                        }), i.body) {
                            if (!n.id || !i.getElementById(n.id)) {
                                var a = i.createElement(n.tag);
                                for (var s in delete n.tag,
                                    n) a.setAttribute(s, n[s]);
                                a.onload = a.onreadystatechange = function () {
                                    if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                        if ((r = t(i, n)).funs.length > 0) {
                                            r.ready = 1;
                                            for (var e; e = r.funs.pop();) e()
                                        }
                                        a.onload = a.onreadystatechange = null
                                    }
                                },
                                    a.onerror = function () {
                                        throw Error("The load " + (n.href || n.src) + " fails,check the url settings of file ueditor.config.js ")
                                    },
                                    i.getElementsByTagName("head")[0].appendChild(a)
                            }
                        } else {
                            var l = [];
                            for (var s in n) "tag" != s && l.push(s + '="' + n[s] + '"');
                            i.write("<" + n.tag + " " + l.join(" ") + " ></" + n.tag + ">")
                        }
                    }
                }(),
                isEmptyObject: function (e) {
                    if (null == e) return !0;
                    if (this.isArray(e) || this.isString(e)) return 0 === e.length;
                    for (var t in e) if (e.hasOwnProperty(t)) return !1;
                    return !0
                },
                fixColor: function (e, t) {
                    if (/color/i.test(e) && /rgba?/.test(t)) {
                        var i = t.split(",");
                        if (i.length > 3) return "";
                        t = "#";
                        for (var n, o = 0; n = i[o++];) t += 1 == (n = parseInt(n.replace(/[^\d]/gi, ""), 10).toString(16)).length ? "0" + n : n;
                        t = t.toUpperCase()
                    }
                    return t
                },
                optCss: function (e) {
                    var t, i;
                    function n(e, t) {
                        if (!e) return "";
                        var i = e.top,
                            n = e.bottom,
                            o = e.left,
                            r = e.right,
                            a = "";
                        if (i && o && n && r) a += ";" + t + ":" + (i == n && n == o && o == r ? i : i == n && o == r ? i + " " + o : o == r ? i + " " + o + " " + n : i + " " + r + " " + n + " " + o) + ";";
                        else for (var s in e) a += ";" + t + "-" + s + ":" + e[s] + ";";
                        return a
                    }
                    return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, (function (e, n, o, r) {
                        if (1 == r.split(" ").length) switch (n) {
                            case "padding":
                                return !t && (t = {}),
                                    t[o] = r,
                                    "";
                            case "margin":
                                return !i && (i = {}),
                                    i[o] = r,
                                    "";
                            case "border":
                                return "initial" == r ? "" : e
                        }
                        return e
                    })),
                        (e += n(t, "padding") + n(i, "margin")).replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, (function (e, t) {
                            return t ? t + ";;" : ";"
                        }))
                },
                clone: function (e, t) {
                    var i;
                    for (var n in t = t || {},
                        e) e.hasOwnProperty(n) && ("object" == typeof (i = e[n]) ? (t[n] = utils.isArray(i) ? [] : {},
                            utils.clone(e[n], t[n])) : t[n] = i);
                    return t
                },
                transUnitToPx: function (e) {
                    if (!/(pt|cm)/.test(e)) return e;
                    var t;
                    switch (e.replace(/([\d.]+)(\w+)/, (function (i, n, o) {
                        e = n,
                            t = o
                    })), t) {
                        case "cm":
                            e = 25 * parseFloat(e);
                            break;
                        case "pt":
                            e = Math.round(96 * parseFloat(e) / 72)
                    }
                    return e + (e ? "px" : "")
                },
                domReady: function () {
                    var e = [];
                    function t(t) {
                        t.isReady = !0;
                        for (var i; i = e.pop(); i());
                    }
                    return function (i, n) {
                        var o = (n = n || window).document;
                        i && e.push(i),
                            "complete" === o.readyState ? t(o) : (o.isReady && t(o), browser.ie && 11 != browser.version ? (!
                                function () {
                                    if (!o.isReady) {
                                        try {
                                            o.documentElement.doScroll("left")
                                        } catch (e) {
                                            return void setTimeout(arguments.callee, 0)
                                        }
                                        t(o)
                                    }
                                }(), n.attachEvent("onload", (function () {
                                    t(o)
                                }))) : (o.addEventListener("DOMContentLoaded", (function () {
                                    o.removeEventListener("DOMContentLoaded", arguments.callee, !1),
                                        t(o)
                                }), !1), n.addEventListener("load", (function () {
                                    t(o)
                                }), !1)))
                    }
                }(),
                cssRule: browser.ie && 11 != browser.version ?
                    function (e, t, i) {
                        var n, o;
                        return void 0 === t || t && t.nodeType && 9 == t.nodeType ? void 0 !== (o = (n = (i = t && t.nodeType && 9 == t.nodeType ? t : i || document).indexList || (i.indexList = {}))[e]) ? i.styleSheets[o].cssText : void 0 : (o = (n = (i = i || document).indexList || (i.indexList = {}))[e], "" === t ? void 0 !== o && (i.styleSheets[o].cssText = "", delete n[e], !0) : (void 0 !== o ? sheetStyle = i.styleSheets[o] : (sheetStyle = i.createStyleSheet("", o = i.styleSheets.length), n[e] = o), void (sheetStyle.cssText = t)))
                    } : function (e, t, i) {
                        var n;
                        return void 0 === t || t && t.nodeType && 9 == t.nodeType ? (n = (i = t && t.nodeType && 9 == t.nodeType ? t : i || document).getElementById(e)) ? n.innerHTML : void 0 : (n = (i = i || document).getElementById(e), "" === t ? !!n && (n.parentNode.removeChild(n), !0) : void (n ? n.innerHTML = t : ((n = i.createElement("style")).id = e, n.innerHTML = t, i.getElementsByTagName("head")[0].appendChild(n))))
                    },
                sort: function (e, t) {
                    t = t ||
                        function (e, t) {
                            return e.localeCompare(t)
                        };
                    for (var i = 0,
                        n = e.length; i < n; i++) for (var o = i,
                            r = e.length; o < r; o++) if (t(e[i], e[o]) > 0) {
                                var a = e[i];
                                e[i] = e[o],
                                    e[o] = a
                            }
                    return e
                },
                serializeParam: function (e) {
                    var t = [];
                    for (var i in e) if ("method" != i && "timeout" != i && "async" != i) if ("function" != (typeof e[i]).toLowerCase() && "object" != (typeof e[i]).toLowerCase()) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    else if (utils.isArray(e[i])) for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(e[i][n]));
                    return t.join("&")
                },
                formatUrl: function (e) {
                    var t = e.replace(/&&/g, "&");
                    return t = (t = (t = (t = t.replace(/\?&/g, "?")).replace(/&$/g, "")).replace(/&#/g, "#")).replace(/&+/g, "&")
                },
                isCrossDomainUrl: function (e) {
                    var t = document.createElement("a");
                    return t.href = e,
                        browser.ie && (t.href = t.href),
                        !(t.protocol == location.protocol && t.hostname == location.hostname && (t.port == location.port || "80" == t.port && "" == location.port || "" == t.port && "80" == location.port))
                },
                clearEmptyAttrs: function (e) {
                    for (var t in e) "" === e[t] && delete e[t];
                    return e
                },
                str2json: function (e) {
                    return utils.isString(e) ? window.JSON ? JSON.parse(e) : new Function("return " + utils.trim(e || ""))() : null
                },
                json2str: function () {
                    if (window.JSON) return JSON.stringify; {
                        var e = {
                            "\b": "\\b",
                            "\t": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        };
                        function t(e) {
                            return e < 10 ? "0" + e : e
                        }
                        return function (i) {
                            switch (typeof i) {
                                case "undefined":
                                    return "undefined";
                                case "number":
                                    return isFinite(i) ? String(i) : "null";
                                case "string":
                                    return /["\\\x00-\x1f]/.test(l = i) && (l = l.replace(/["\\\x00-\x1f]/g, (function (t) {
                                        var i = e[t];
                                        return i || (i = t.charCodeAt(), "\\u00" + Math.floor(i / 16).toString(16) + (i % 16).toString(16))
                                    }))),
                                        '"' + l + '"';
                                case "boolean":
                                    return String(i);
                                default:
                                    if (null === i) return "null";
                                    if (utils.isArray(i)) return function (e) {
                                        var t, i, n, o = ["["],
                                            r = e.length;
                                        for (i = 0; i < r; i++) switch (typeof (n = e[i])) {
                                            case "undefined":
                                            case "function":
                                            case "unknown":
                                                break;
                                            default:
                                                t && o.push(","),
                                                    o.push(utils.json2str(n)),
                                                    t = 1
                                        }
                                        return o.push("]"),
                                            o.join("")
                                    }(i);
                                    if (utils.isDate(i)) return function (e) {
                                        return '"' + e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + "T" + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + '"'
                                    }(i);
                                    var n, o, r = ["{"],
                                        a = utils.json2str;
                                    for (var s in i) if (Object.prototype.hasOwnProperty.call(i, s)) switch (typeof (o = i[s])) {
                                        case "undefined":
                                        case "unknown":
                                        case "function":
                                            break;
                                        default:
                                            n && r.push(","),
                                                n = 1,
                                                r.push(a(s) + ":" + a(o))
                                    }
                                    return r.push("}"),
                                        r.join("")
                            }
                            var l
                        }
                    }
                }()
            },
            test,
            cache;
        utils.each(["String", "Function", "Array", "Number", "RegExp", "Object", "Date"], (function (e) {
            UE.utils["is" + e] = function (t) {
                return Object.prototype.toString.apply(t) == "[object " + e + "]"
            }
        }));
        var EventBase = UE.EventBase = function () { };
        function getListener(e, t, i) {
            var n;
            return t = t.toLowerCase(),
                (n = e.__allListeners || i && (e.__allListeners = {})) && (n[t] || i && (n[t] = []))
        }
        EventBase.prototype = {
            addListener: function (e, t) {
                e = utils.trim(e).split(/\s+/);
                for (var i, n = 0; i = e[n++];) getListener(this, i, !0).push(t)
            },
            on: function (e, t) {
                return this.addListener(e, t)
            },
            off: function (e, t) {
                return this.removeListener(e, t)
            },
            trigger: function () {
                return this.fireEvent.apply(this, arguments)
            },
            removeListener: function (e, t) {
                e = utils.trim(e).split(/\s+/);
                for (var i, n = 0; i = e[n++];) utils.removeItem(getListener(this, i) || [], t)
            },
            fireEvent: function () {
                var e = arguments[0];
                e = utils.trim(e).split(" ");
                for (var t, i = 0; t = e[i++];) {
                    var n, o, r, a = getListener(this, t);
                    if (a) for (r = a.length; r--;) if (a[r]) {
                        if (!0 === (o = a[r].apply(this, arguments))) return o;
                        void 0 !== o && (n = o)
                    } (o = this["on" + t.toLowerCase()]) && (n = o.apply(this, arguments))
                }
                return n
            }
        };
        var dtd = dom.dtd = function () {
            function e(e) {
                for (var t in e) e[t.toUpperCase()] = e[t];
                return e
            }
            var t = utils.extend2,
                i = e({
                    isindex: 1,
                    fieldset: 1
                }),
                n = e({
                    input: 1,
                    button: 1,
                    select: 1,
                    textarea: 1,
                    label: 1
                }),
                o = t(e({
                    a: 1
                }), n),
                r = t({
                    iframe: 1
                },
                    o),
                a = e({
                    hr: 1,
                    ul: 1,
                    menu: 1,
                    div: 1,
                    blockquote: 1,
                    noscript: 1,
                    table: 1,
                    center: 1,
                    address: 1,
                    dir: 1,
                    pre: 1,
                    h5: 1,
                    dl: 1,
                    h4: 1,
                    noframes: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1
                }),
                s = e({
                    ins: 1,
                    del: 1,
                    script: 1,
                    style: 1
                }),
                l = t(e({
                    b: 1,
                    acronym: 1,
                    bdo: 1,
                    var: 1,
                    "#": 1,
                    abbr: 1,
                    code: 1,
                    br: 1,
                    i: 1,
                    cite: 1,
                    kbd: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    dfn: 1,
                    span: 1
                }), s),
                d = t(e({
                    sub: 1,
                    img: 1,
                    embed: 1,
                    object: 1,
                    sup: 1,
                    basefont: 1,
                    map: 1,
                    applet: 1,
                    font: 1,
                    big: 1,
                    small: 1
                }), l),
                c = t(e({
                    p: 1
                }), d),
                u = t(e({
                    iframe: 1
                }), d, n),
                m = e({
                    img: 1,
                    embed: 1,
                    noscript: 1,
                    br: 1,
                    kbd: 1,
                    center: 1,
                    button: 1,
                    basefont: 1,
                    h5: 1,
                    h4: 1,
                    samp: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1,
                    form: 1,
                    font: 1,
                    "#": 1,
                    select: 1,
                    menu: 1,
                    ins: 1,
                    abbr: 1,
                    label: 1,
                    code: 1,
                    table: 1,
                    script: 1,
                    cite: 1,
                    input: 1,
                    iframe: 1,
                    strong: 1,
                    textarea: 1,
                    noframes: 1,
                    big: 1,
                    small: 1,
                    span: 1,
                    hr: 1,
                    sub: 1,
                    bdo: 1,
                    var: 1,
                    div: 1,
                    object: 1,
                    sup: 1,
                    strike: 1,
                    dir: 1,
                    map: 1,
                    dl: 1,
                    applet: 1,
                    del: 1,
                    isindex: 1,
                    fieldset: 1,
                    ul: 1,
                    b: 1,
                    acronym: 1,
                    a: 1,
                    blockquote: 1,
                    i: 1,
                    u: 1,
                    s: 1,
                    tt: 1,
                    address: 1,
                    q: 1,
                    pre: 1,
                    p: 1,
                    em: 1,
                    dfn: 1
                }),
                f = t(e({
                    a: 0
                }), u),
                h = e({
                    tr: 1
                }),
                p = e({
                    "#": 1
                }),
                g = t(e({
                    param: 1
                }), m),
                b = t(e({
                    form: 1
                }), i, r, a, c),
                v = e({
                    li: 1,
                    ol: 1,
                    ul: 1
                }),
                y = e({
                    style: 1,
                    script: 1
                }),
                C = e({
                    base: 1,
                    link: 1,
                    meta: 1,
                    title: 1
                }),
                N = t(C, y),
                x = e({
                    head: 1,
                    body: 1
                }),
                w = e({
                    html: 1
                }),
                U = e({
                    address: 1,
                    blockquote: 1,
                    center: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    hr: 1,
                    isindex: 1,
                    menu: 1,
                    noframes: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    table: 1,
                    ul: 1
                }),
                E = e({
                    area: 1,
                    base: 1,
                    basefont: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    dialog: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    isindex: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1
                });
            return e({
                $nonBodyContent: t(w, x, C),
                $block: U,
                $inline: f,
                $inlineWithA: t(e({
                    a: 1
                }), f),
                $body: t(e({
                    script: 1,
                    style: 1
                }), U),
                $cdata: e({
                    script: 1,
                    style: 1
                }),
                $empty: E,
                $nonChild: e({
                    iframe: 1,
                    textarea: 1
                }),
                $listItem: e({
                    dd: 1,
                    dt: 1,
                    li: 1
                }),
                $list: e({
                    ul: 1,
                    ol: 1,
                    dl: 1
                }),
                $isNotEmpty: e({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1,
                    iframe: 1,
                    area: 1,
                    base: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    embed: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1
                }),
                $removeEmpty: e({
                    a: 1,
                    abbr: 1,
                    acronym: 1,
                    address: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    var: 1
                }),
                $removeEmptyBlock: e({
                    p: 1,
                    div: 1
                }),
                $tableContent: e({
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1,
                    table: 1
                }),
                $notTransContent: e({
                    pre: 1,
                    script: 1,
                    style: 1,
                    textarea: 1
                }),
                html: x,
                head: N,
                style: p,
                script: p,
                body: b,
                base: {},
                link: {},
                meta: {},
                title: p,
                col: {},
                tr: e({
                    td: 1,
                    th: 1
                }),
                img: {},
                embed: {},
                colgroup: e({
                    thead: 1,
                    col: 1,
                    tbody: 1,
                    tr: 1,
                    tfoot: 1
                }),
                noscript: b,
                td: b,
                br: {},
                th: b,
                center: b,
                kbd: f,
                button: t(c, a),
                basefont: {},
                h5: f,
                h4: f,
                samp: f,
                h6: f,
                ol: v,
                h1: f,
                h3: f,
                option: p,
                h2: f,
                form: t(i, r, a, c),
                select: e({
                    optgroup: 1,
                    option: 1
                }),
                font: f,
                ins: f,
                menu: v,
                abbr: f,
                label: f,
                table: e({
                    thead: 1,
                    col: 1,
                    tbody: 1,
                    tr: 1,
                    colgroup: 1,
                    caption: 1,
                    tfoot: 1
                }),
                code: f,
                tfoot: h,
                cite: f,
                li: b,
                input: {},
                iframe: b,
                strong: f,
                textarea: p,
                noframes: b,
                big: f,
                small: f,
                span: e({
                    "#": 1,
                    br: 1,
                    b: 1,
                    strong: 1,
                    u: 1,
                    i: 1,
                    em: 1,
                    sub: 1,
                    sup: 1,
                    strike: 1,
                    span: 1
                }),
                hr: f,
                dt: f,
                sub: f,
                optgroup: e({
                    option: 1
                }),
                param: {},
                bdo: f,
                var: f,
                div: b,
                object: g,
                sup: f,
                dd: b,
                strike: f,
                area: {},
                dir: v,
                map: t(e({
                    area: 1,
                    form: 1,
                    p: 1
                }), i, s, a),
                applet: g,
                dl: e({
                    dt: 1,
                    dd: 1
                }),
                del: f,
                isindex: {},
                fieldset: t(e({
                    legend: 1
                }), m),
                thead: h,
                ul: v,
                acronym: f,
                b: f,
                a: t(e({
                    a: 1
                }), u),
                blockquote: t(e({
                    td: 1,
                    tr: 1,
                    tbody: 1,
                    li: 1
                }), b),
                caption: f,
                i: f,
                u: f,
                tbody: h,
                s: f,
                address: t(r, c),
                tt: f,
                legend: f,
                q: f,
                pre: t(l, o),
                p: t(e({
                    a: 1
                }), f),
                em: f,
                dfn: f
            })
        }();
        function getDomNode(e, t, i, n, o, r) {
            var a, s = n && e[t];
            for (!s && (s = e[i]); !s && (a = (a || e).parentNode);) {
                if ("BODY" == a.tagName || r && !r(a)) return null;
                s = a[i]
            }
            return s && o && !o(s) ? getDomNode(s, t, i, !1, o) : s
        }
        var attrFix = ie && browser.version < 9 ? {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder"
        } : {
                tabindex: "tabIndex",
                readonly: "readOnly"
            },
            styleBlock = utils.listToMap(["-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption"]),
            domUtils = dom.domUtils = {
                NODE_ELEMENT: 1,
                NODE_DOCUMENT: 9,
                NODE_TEXT: 3,
                NODE_COMMENT: 8,
                NODE_DOCUMENT_FRAGMENT: 11,
                POSITION_IDENTICAL: 0,
                POSITION_DISCONNECTED: 1,
                POSITION_FOLLOWING: 2,
                POSITION_PRECEDING: 4,
                POSITION_IS_CONTAINED: 8,
                POSITION_CONTAINS: 16,
                fillChar: ie && "6" == browser.version ? "\ufeff" : "​",
                keys: {
                    8: 1,
                    46: 1,
                    16: 1,
                    17: 1,
                    18: 1,
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1,
                    13: 1
                },
                getPosition: function (e, t) {
                    if (e === t) return 0;
                    var i, n = [e],
                        o = [t];
                    for (i = e; i = i.parentNode;) {
                        if (i === t) return 10;
                        n.push(i)
                    }
                    for (i = t; i = i.parentNode;) {
                        if (i === e) return 20;
                        o.push(i)
                    }
                    if (n.reverse(), o.reverse(), n[0] !== o[0]) return 1;
                    for (var r = -1; n[++r] === o[r];);
                    for (e = n[r], t = o[r]; e = e.nextSibling;) if (e === t) return 4;
                    return 2
                },
                getNodeIndex: function (e, t) {
                    for (var i = e,
                        n = 0; i = i.previousSibling;) t && 3 == i.nodeType ? i.nodeType != i.nextSibling.nodeType && n++ : n++;
                    return n
                },
                inDoc: function (e, t) {
                    return 10 == domUtils.getPosition(e, t)
                },
                findParent: function (e, t, i) {
                    if (e && !domUtils.isBody(e)) for (e = i ? e : e.parentNode; e;) {
                        if (!t || t(e) || domUtils.isBody(e)) return t && !t(e) && domUtils.isBody(e) ? null : e;
                        e = e.parentNode
                    }
                    return null
                },
                findParentByTagName: function (e, t, i, n) {
                    return t = utils.listToMap(utils.isArray(t) ? t : [t]),
                        domUtils.findParent(e, (function (e) {
                            return t[e.tagName] && !(n && n(e))
                        }), i)
                },
                findParents: function (e, t, i, n) {
                    for (var o = t && (i && i(e) || !i) ? [e] : []; e = domUtils.findParent(e, i);) o.push(e);
                    return n ? o : o.reverse()
                },
                insertAfter: function (e, t) {
                    return e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t)
                },
                remove: function (e, t) {
                    var i, n = e.parentNode;
                    if (n) {
                        if (t && e.hasChildNodes()) for (; i = e.firstChild;) n.insertBefore(i, e);
                        n.removeChild(e)
                    }
                    return e
                },
                getNextDomNode: function (e, t, i, n) {
                    return getDomNode(e, "firstChild", "nextSibling", t, i, n)
                },
                getPreDomNode: function (e, t, i, n) {
                    return getDomNode(e, "lastChild", "previousSibling", t, i, n)
                },
                isBookmarkNode: function (e) {
                    return 1 == e.nodeType && e.id && /^_baidu_bookmark_/i.test(e.id)
                },
                getWindow: function (e) {
                    var t = e.ownerDocument || e;
                    return t.defaultView || t.parentWindow
                },
                getCommonAncestor: function (e, t) {
                    if (e === t) return e;
                    for (var i = [e], n = [t], o = e, r = -1; o = o.parentNode;) {
                        if (o === t) return o;
                        i.push(o)
                    }
                    for (o = t; o = o.parentNode;) {
                        if (o === e) return o;
                        n.push(o)
                    }
                    for (i.reverse(), n.reverse(); i[++r] === n[r];);
                    return 0 == r ? null : i[r - 1]
                },
                clearEmptySibling: function (e, t, i) {
                    function n(e, t) {
                        for (var i; e && !domUtils.isBookmarkNode(e) && (domUtils.isEmptyInlineElement(e) || !new RegExp("[^\t\n\r" + domUtils.fillChar + "]").test(e.nodeValue));) i = e[t],
                            domUtils.remove(e),
                            e = i
                    } !t && n(e.nextSibling, "nextSibling"),
                        !i && n(e.previousSibling, "previousSibling")
                },
                split: function (e, t) {
                    var i = e.ownerDocument;
                    if (browser.ie && t == e.nodeValue.length) {
                        var n = i.createTextNode("");
                        return domUtils.insertAfter(e, n)
                    }
                    var o = e.splitText(t);
                    if (browser.ie8) {
                        var r = i.createTextNode("");
                        domUtils.insertAfter(o, r),
                            domUtils.remove(r)
                    }
                    return o
                },
                isWhitespace: function (e) {
                    return !new RegExp("[^ \t\n\r" + domUtils.fillChar + "]").test(e.nodeValue)
                },
                getXY: function (e) {
                    for (var t = 0,
                        i = 0; e.offsetParent;) i += e.offsetTop,
                            t += e.offsetLeft,
                            e = e.offsetParent;
                    return {
                        x: t,
                        y: i
                    }
                },
                on: function (e, t, i) {
                    var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/),
                        o = n.length;
                    if (o) for (; o--;) if (t = n[o], e.addEventListener) e.addEventListener(t, i, !1);
                    else {
                        i._d || (i._d = {
                            els: []
                        });
                        var r = t + i.toString(),
                            a = utils.indexOf(i._d.els, e);
                        i._d[r] && -1 != a || (- 1 == a && i._d.els.push(e), i._d[r] || (i._d[r] = function (e) {
                            return i.call(e.srcElement, e || window.event)
                        }), e.attachEvent("on" + t, i._d[r]))
                    }
                    e = null
                },
                un: function (e, t, i) {
                    var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/),
                        o = n.length;
                    if (o) for (; o--;) if (t = n[o], e.removeEventListener) e.removeEventListener(t, i, !1);
                    else {
                        var r = t + i.toString();
                        try {
                            e.detachEvent("on" + t, i._d ? i._d[r] : i)
                        } catch (s) { }
                        if (i._d && i._d[r]) {
                            var a = utils.indexOf(i._d.els, e); - 1 != a && i._d.els.splice(a, 1),
                                0 == i._d.els.length && delete i._d[r]
                        }
                    }
                },
                isSameElement: function (e, t) {
                    if (e.tagName != t.tagName) return !1;
                    var i = e.attributes,
                        n = t.attributes;
                    if (!ie && i.length != n.length) return !1;
                    for (var o, r, a = 0,
                        s = 0,
                        l = 0; o = i[l++];) {
                        if ("style" == o.nodeName) {
                            if (o.specified && a++, domUtils.isSameStyle(e, t)) continue;
                            return !1
                        }
                        if (ie) {
                            if (!o.specified) continue;
                            a++,
                                r = n.getNamedItem(o.nodeName)
                        } else r = t.attributes[o.nodeName];
                        if (!r.specified || o.nodeValue != r.nodeValue) return !1
                    }
                    if (ie) {
                        for (l = 0; r = n[l++];) r.specified && s++;
                        if (a != s) return !1
                    }
                    return !0
                },
                isSameStyle: function (e, t) {
                    var i = e.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
                        n = t.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
                    if (browser.opera) {
                        if (i = e.style, n = t.style, i.length != n.length) return !1;
                        for (var o in i) if (!/^(\d+|csstext)$/i.test(o) && i[o] != n[o]) return !1;
                        return !0
                    }
                    if (!i || !n) return i == n;
                    if (i = i.split(";"), n = n.split(";"), i.length != n.length) return !1;
                    for (var r, a = 0; r = i[a++];) if (- 1 == utils.indexOf(n, r)) return !1;
                    return !0
                },
                isBlockElm: function (e) {
                    return 1 == e.nodeType && (dtd.$block[e.tagName] || styleBlock[domUtils.getComputedStyle(e, "display")]) && !dtd.$nonChild[e.tagName]
                },
                isBody: function (e) {
                    return e && 1 == e.nodeType && "body" == e.tagName.toLowerCase()
                },
                breakParent: function (e, t) {
                    var i, n, o, r = e,
                        a = e;
                    do {
                        for (r = r.parentNode, n ? ((i = r.cloneNode(!1)).appendChild(n), n = i, (i = r.cloneNode(!1)).appendChild(o), o = i) : o = (n = r.cloneNode(!1)).cloneNode(!1); i = a.previousSibling;) n.insertBefore(i, n.firstChild);
                        for (; i = a.nextSibling;) o.appendChild(i);
                        a = r
                    } while (t !== r);
                    return (i = t.parentNode).insertBefore(n, t),
                        i.insertBefore(o, t),
                        i.insertBefore(e, o),
                        domUtils.remove(t),
                        e
                },
                isEmptyInlineElement: function (e) {
                    if (1 != e.nodeType || !dtd.$removeEmpty[e.tagName]) return 0;
                    for (e = e.firstChild; e;) {
                        if (domUtils.isBookmarkNode(e)) return 0;
                        if (1 == e.nodeType && !domUtils.isEmptyInlineElement(e) || 3 == e.nodeType && !domUtils.isWhitespace(e)) return 0;
                        e = e.nextSibling
                    }
                    return 1
                },
                trimWhiteTextNode: function (e) {
                    function t(t) {
                        for (var i; (i = e[t]) && 3 == i.nodeType && domUtils.isWhitespace(i);) e.removeChild(i)
                    }
                    t("firstChild"),
                        t("lastChild")
                },
                mergeChild: function (e, t, i) {
                    for (var n, o = domUtils.getElementsByTagName(e, e.tagName.toLowerCase()), r = 0; n = o[r++];) if (n.parentNode && !domUtils.isBookmarkNode(n)) if ("span" != n.tagName.toLowerCase()) domUtils.isSameElement(e, n) && domUtils.remove(n, !0);
                    else {
                        if (e === n.parentNode && (domUtils.trimWhiteTextNode(e), 1 == e.childNodes.length)) {
                            e.style.cssText = n.style.cssText + ";" + e.style.cssText,
                                domUtils.remove(n, !0);
                            continue
                        }
                        if (n.style.cssText = e.style.cssText + ";" + n.style.cssText, i) {
                            var a = i.style;
                            if (a) {
                                a = a.split(";");
                                for (var s, l = 0; s = a[l++];) n.style[utils.cssStyleToDomStyle(s.split(":")[0])] = s.split(":")[1]
                            }
                        }
                        domUtils.isSameStyle(n, e) && domUtils.remove(n, !0)
                    }
                },
                getElementsByTagName: function (e, t, i) {
                    if (i && utils.isString(i)) {
                        var n = i;
                        i = function (e) {
                            return domUtils.hasClass(e, n)
                        }
                    }
                    t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var o, r = [], a = 0; o = t[a++];) for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++];) i && !i(s) || r.push(s);
                    return r
                },
                getElementsByTagNameStyle: function (e, t, i) {
                    if (i && utils.isString(i)) {
                        var n = i;
                        i = function (e) {
                            for (var t, i = n.split(","), o = !0, r = e.getAttribute("style"), a = 0; t = i[a++];) if (!r || r.indexOf(t) < 0) {
                                o = !1;
                                break
                            }
                            return o
                        }
                    }
                    t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var o, r = [], a = 0; o = t[a++];) for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++];) i && !i(s) || r.push(s);
                    return r
                },
                mergeToParent: function (e) {
                    for (var t = e.parentNode; t && dtd.$removeEmpty[t.tagName];) {
                        if (t.tagName == e.tagName || "A" == t.tagName) {
                            if (domUtils.trimWhiteTextNode(t), "SPAN" == t.tagName && !domUtils.isSameStyle(t, e) || "A" == t.tagName && "SPAN" == e.tagName) {
                                if (t.childNodes.length > 1 || t !== e.parentNode) {
                                    e.style.cssText = t.style.cssText + ";" + e.style.cssText,
                                        t = t.parentNode;
                                    continue
                                }
                                t.style.cssText += ";" + e.style.cssText,
                                    "A" == t.tagName && (t.style.textDecoration = "underline")
                            }
                            if ("A" != t.tagName) {
                                t === e.parentNode && domUtils.remove(e, !0);
                                break
                            }
                        }
                        t = t.parentNode
                    }
                },
                mergeSibling: function (e, t, i) {
                    function n(e, t, i) {
                        var n;
                        if ((n = i[e]) && !domUtils.isBookmarkNode(n) && 1 == n.nodeType && domUtils.isSameElement(i, n)) {
                            for (; n.firstChild;)"firstChild" == t ? i.insertBefore(n.lastChild, i.firstChild) : i.appendChild(n.firstChild);
                            domUtils.remove(n)
                        }
                    } !t && n("previousSibling", "firstChild", e),
                        !i && n("nextSibling", "lastChild", e)
                },
                unSelectable: ie && browser.ie9below || browser.opera ?
                    function (e) {
                        e.onselectstart = function () {
                            return !1
                        },
                            e.onclick = e.onkeyup = e.onkeydown = function () {
                                return !1
                            },
                            e.unselectable = "on",
                            e.setAttribute("unselectable", "on");
                        for (var t, i = 0; t = e.all[i++];) switch (t.tagName.toLowerCase()) {
                            case "iframe":
                            case "textarea":
                            case "input":
                            case "select":
                                break;
                            default:
                                t.unselectable = "on",
                                    e.setAttribute("unselectable", "on")
                        }
                    } : function (e) {
                        e.style.MozUserSelect = e.style.webkitUserSelect = e.style.msUserSelect = e.style.KhtmlUserSelect = "none"
                    },
                removeAttributes: function (e, t) {
                    t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var i, n = 0; i = t[n++];) {
                        switch (i = attrFix[i] || i) {
                            case "className":
                                e[i] = "";
                                break;
                            case "style":
                                e.style.cssText = "";
                                var o = e.getAttributeNode("style"); !browser.ie && o && e.removeAttributeNode(o)
                        }
                        e.removeAttribute(i)
                    }
                },
                createElement: function (e, t, i) {
                    return domUtils.setAttributes(e.createElement(t), i)
                },
                setAttributes: function (e, t) {
                    for (var i in t) if (t.hasOwnProperty(i)) {
                        var n = t[i];
                        switch (i) {
                            case "class":
                                e.className = n;
                                break;
                            case "style":
                                e.style.cssText = e.style.cssText + ";" + n;
                                break;
                            case "innerHTML":
                                e[i] = n;
                                break;
                            case "value":
                                e.value = n;
                                break;
                            default:
                                e.setAttribute(attrFix[i] || i, n)
                        }
                    }
                    return e
                },
                getComputedStyle: function (e, t) {
                    if ("width height top left".indexOf(t) > -1) return e["offset" + t.replace(/^\w/, (function (e) {
                        return e.toUpperCase()
                    }))] + "px";
                    if (3 == e.nodeType && (e = e.parentNode), browser.ie && browser.version < 9 && "font-size" == t && !e.style.fontSize && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName]) {
                        var i = e.ownerDocument.createElement("span");
                        i.style.cssText = "padding:0;border:0;font-family:simsun;",
                            i.innerHTML = ".",
                            e.appendChild(i);
                        var n = i.offsetHeight;
                        return e.removeChild(i),
                            i = null,
                            n + "px"
                    }
                    try {
                        var o = domUtils.getStyle(e, t) || (window.getComputedStyle ? domUtils.getWindow(e).getComputedStyle(e, "").getPropertyValue(t) : (e.currentStyle || e.style)[utils.cssStyleToDomStyle(t)])
                    } catch (r) {
                        return ""
                    }
                    return utils.transUnitToPx(utils.fixColor(t, o))
                },
                removeClasses: function (e, t) {
                    t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var i, n = 0,
                        o = e.className; i = t[n++];) o = o.replace(new RegExp("\\b" + i + "\\b"), ""); (o = utils.trim(o).replace(/[ ]{2,}/g, " ")) ? e.className = o : domUtils.removeAttributes(e, ["class"])
                },
                addClass: function (e, t) {
                    if (e) {
                        t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                        for (var i, n = 0,
                            o = e.className; i = t[n++];) new RegExp("\\b" + i + "\\b").test(o) || (o += " " + i);
                        e.className = utils.trim(o)
                    }
                },
                hasClass: function (e, t) {
                    if (utils.isRegExp(t)) return t.test(e.className);
                    t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var i, n = 0,
                        o = e.className; i = t[n++];) if (!new RegExp("\\b" + i + "\\b", "i").test(o)) return !1;
                    return n - 1 == t.length
                },
                preventDefault: function (e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                },
                removeStyle: function (e, t) {
                    browser.ie ? ("color" == t && (t = "(^|;)" + t), e.style.cssText = e.style.cssText.replace(new RegExp(t + "[^:]*:[^;]+;?", "ig"), "")) : e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(utils.cssStyleToDomStyle(t)),
                        e.style.cssText || domUtils.removeAttributes(e, ["style"])
                },
                getStyle: function (e, t) {
                    var i = e.style[utils.cssStyleToDomStyle(t)];
                    return utils.fixColor(t, i)
                },
                setStyle: function (e, t, i) {
                    e.style[utils.cssStyleToDomStyle(t)] = i,
                        utils.trim(e.style.cssText) || this.removeAttributes(e, "style")
                },
                setStyles: function (e, t) {
                    for (var i in t) t.hasOwnProperty(i) && domUtils.setStyle(e, i, t[i])
                },
                removeDirtyAttr: function (e) {
                    for (var t, i = 0,
                        n = e.getElementsByTagName("*"); t = n[i++];) t.removeAttribute("_moz_dirty");
                    e.removeAttribute("_moz_dirty")
                },
                getChildCount: function (e, t) {
                    var i = 0,
                        n = e.firstChild;
                    for (t = t ||
                        function () {
                            return 1
                        }; n;) t(n) && i++,
                            n = n.nextSibling;
                    return i
                },
                isEmptyNode: function (e) {
                    return !e.firstChild || 0 == domUtils.getChildCount(e, (function (e) {
                        return !domUtils.isBr(e) && !domUtils.isBookmarkNode(e) && !domUtils.isWhitespace(e)
                    }))
                },
                clearSelectedArr: function (e) {
                    for (var t; t = e.pop();) domUtils.removeAttributes(t, ["class"])
                },
                scrollToView: function (e, t, i) {
                    var n, o, r = (n = t.document, o = "CSS1Compat" == n.compatMode, {
                        width: (o ? n.documentElement.clientWidth : n.body.clientWidth) || 0,
                        height: (o ? n.documentElement.clientHeight : n.body.clientHeight) || 0
                    }).height,
                        a = -1 * r + i;
                    a += e.offsetHeight || 0,
                        a += domUtils.getXY(e).y;
                    var s = function (e) {
                        if ("pageXOffset" in e) return {
                            x: e.pageXOffset || 0,
                            y: e.pageYOffset || 0
                        };
                        var t = e.document;
                        return {
                            x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
                            y: t.documentElement.scrollTop || t.body.scrollTop || 0
                        }
                    }(t).y; (a > s || a < s - r) && t.scrollTo(0, a + (a < 0 ? -20 : 20))
                },
                isBr: function (e) {
                    return 1 == e.nodeType && "BR" == e.tagName
                },
                isFillChar: function (e, t) {
                    if (3 != e.nodeType) return !1;
                    var i = e.nodeValue;
                    return t ? new RegExp("^" + domUtils.fillChar).test(i) : !i.replace(new RegExp(domUtils.fillChar, "g"), "").length
                },
                isStartInblock: function (e) {
                    var t, i = e.cloneRange(),
                        n = 0,
                        o = i.startContainer;
                    if (1 == o.nodeType && o.childNodes[i.startOffset]) for (var r = (o = o.childNodes[i.startOffset]).previousSibling; r && domUtils.isFillChar(r);) o = r,
                        r = r.previousSibling;
                    for (this.isFillChar(o, !0) && 1 == i.startOffset && (i.setStartBefore(o), o = i.startContainer); o && domUtils.isFillChar(o);) t = o,
                        o = o.previousSibling;
                    for (t && (i.setStartBefore(t), o = i.startContainer), 1 == o.nodeType && domUtils.isEmptyNode(o) && 1 == i.startOffset && i.setStart(o, 0).collapse(!0); !i.startOffset;) {
                        if (o = i.startContainer, domUtils.isBlockElm(o) || domUtils.isBody(o)) {
                            n = 1;
                            break
                        }
                        var a;
                        if (r = i.startContainer.previousSibling) {
                            for (; r && domUtils.isFillChar(r);) a = r,
                                r = r.previousSibling;
                            a ? i.setStartBefore(a) : i.setStartBefore(i.startContainer)
                        } else i.setStartBefore(i.startContainer)
                    }
                    return n && !domUtils.isBody(i.startContainer) ? 1 : 0
                },
                isEmptyBlock: function (e, t) {
                    if (1 != e.nodeType) return 0;
                    if (t = t || new RegExp("[  \t\r\n" + domUtils.fillChar + "]", "g"), e[browser.ie ? "innerText" : "textContent"].replace(t, "").length > 0) return 0;
                    for (var i in dtd.$isNotEmpty) if (e.getElementsByTagName(i).length) return 0;
                    return 1
                },
                setViewportOffset: function (e, t) {
                    var i = 0 | parseInt(e.style.left),
                        n = 0 | parseInt(e.style.top),
                        o = e.getBoundingClientRect(),
                        r = t.left - o.left,
                        a = t.top - o.top;
                    r && (e.style.left = i + r + "px"),
                        a && (e.style.top = n + a + "px")
                },
                fillNode: function (e, t) {
                    var i = browser.ie ? e.createTextNode(domUtils.fillChar) : e.createElement("br");
                    t.innerHTML = "",
                        t.appendChild(i)
                },
                moveChild: function (e, t, i) {
                    for (; e.firstChild;) i && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild)
                },
                hasNoAttributes: function (e) {
                    return browser.ie ? /^<\w+\s*?>/.test(e.outerHTML) : 0 == e.attributes.length
                },
                isCustomeNode: function (e) {
                    return 1 == e.nodeType && e.getAttribute("_ue_custom_node_")
                },
                isTagNode: function (e, t) {
                    return 1 == e.nodeType && new RegExp("\\b" + e.tagName + "\\b", "i").test(t)
                },
                filterNodeList: function (e, t, i) {
                    var n = [];
                    if (!utils.isFunction(t)) {
                        var o = t;
                        t = function (e) {
                            return - 1 != utils.indexOf(utils.isArray(o) ? o : o.split(" "), e.tagName.toLowerCase())
                        }
                    }
                    return utils.each(e, (function (e) {
                        t(e) && n.push(e)
                    })),
                        0 == n.length ? null : 1 != n.length && i ? n : n[0]
                },
                isInNodeEndBoundary: function (e, t) {
                    var i = e.startContainer;
                    if (3 == i.nodeType && e.startOffset != i.nodeValue.length) return 0;
                    if (1 == i.nodeType && e.startOffset != i.childNodes.length) return 0;
                    for (; i !== t;) {
                        if (i.nextSibling) return 0;
                        i = i.parentNode
                    }
                    return 1
                },
                isBoundaryNode: function (e, t) {
                    for (; !domUtils.isBody(e);) if (e !== (e = e.parentNode)[t]) return !1;
                    return !0
                },
                fillHtml: browser.ie11below ? "&nbsp;" : "<br/>"
            },
            fillCharReg = new RegExp(domUtils.fillChar, "g"); !
                function () {
                    var e, t = 0,
                        i = domUtils.fillChar;
                    function n(e) {
                        return !e.collapsed && 1 == e.startContainer.nodeType && e.startContainer === e.endContainer && e.endOffset - e.startOffset == 1
                    }
                    function o(e, t, i, n) {
                        return 1 == t.nodeType && (dtd.$empty[t.tagName] || dtd.$nonChild[t.tagName]) && (i = domUtils.getNodeIndex(t) + (e ? 0 : 1), t = t.parentNode),
                            e ? (n.startContainer = t, n.startOffset = i, n.endContainer || n.collapse(!0)) : (n.endContainer = t, n.endOffset = i, n.startContainer || n.collapse(!1)),
                            function (e) {
                                e.collapsed = e.startContainer && e.endContainer && e.startContainer === e.endContainer && e.startOffset == e.endOffset
                            }(n),
                            n
                    }
                    function r(e, t) {
                        var i, n, o = e.startContainer,
                            r = e.endContainer,
                            a = e.startOffset,
                            s = e.endOffset,
                            l = e.document,
                            d = l.createDocumentFragment();
                        if (1 == o.nodeType && (o = o.childNodes[a] || (i = o.appendChild(l.createTextNode("")))), 1 == r.nodeType && (r = r.childNodes[s] || (n = r.appendChild(l.createTextNode("")))), o === r && 3 == o.nodeType) return d.appendChild(l.createTextNode(o.substringData(a, s - a))),
                            t && (o.deleteData(a, s - a), e.collapse(!0)),
                            d;
                        for (var c, u, m = d,
                            f = domUtils.findParents(o, !0), h = domUtils.findParents(r, !0), p = 0; f[p] == h[p];) p++;
                        for (var g, b = p; g = f[b]; b++) {
                            for (c = g.nextSibling, g == o ? i || (3 == e.startContainer.nodeType ? (m.appendChild(l.createTextNode(o.nodeValue.slice(a))), t && o.deleteData(a, o.nodeValue.length - a)) : m.appendChild(t ? o : o.cloneNode(!0))) : (u = g.cloneNode(!1), m.appendChild(u)); c && c !== r && c !== h[b];) g = c.nextSibling,
                                m.appendChild(t ? c : c.cloneNode(!0)),
                                c = g;
                            m = u
                        }
                        m = d,
                            f[p] || (m.appendChild(f[p - 1].cloneNode(!1)), m = m.firstChild);
                        var v;
                        for (b = p; v = h[b]; b++) {
                            if (c = v.previousSibling, v == r ? n || 3 != e.endContainer.nodeType || (m.appendChild(l.createTextNode(r.substringData(0, s))), t && r.deleteData(0, s)) : (u = v.cloneNode(!1), m.appendChild(u)), b != p || !f[p]) for (; c && c !== o;) v = c.previousSibling,
                                m.insertBefore(t ? c : c.cloneNode(!0), m.firstChild),
                                c = v;
                            m = u
                        }
                        return t && e.setStartBefore(h[p] ? f[p] ? h[p] : f[p - 1] : h[p - 1]).collapse(!0),
                            i && domUtils.remove(i),
                            n && domUtils.remove(n),
                            d
                    }
                    var a = dom.Range = function (e) {
                        var t = this;
                        t.startContainer = t.startOffset = t.endContainer = t.endOffset = null,
                            t.document = e,
                            t.collapsed = !0
                    };
                    function s(t, i) {
                        try {
                            if (e && domUtils.inDoc(e, t)) if (e.nodeValue.replace(fillCharReg, "").length) e.nodeValue = e.nodeValue.replace(fillCharReg, "");
                            else {
                                var n = e.parentNode;
                                for (domUtils.remove(e); n && domUtils.isEmptyInlineElement(n) && (browser.safari ? !(domUtils.getPosition(n, i) & domUtils.POSITION_CONTAINS) : !n.contains(i));) e = n.parentNode,
                                    domUtils.remove(n),
                                    n = e
                            }
                        } catch (o) { }
                    }
                    function l(e, t) {
                        var i;
                        for (e = e[t]; e && domUtils.isFillChar(e);) i = e[t],
                            domUtils.remove(e),
                            e = i
                    }
                    a.prototype = {
                        cloneContents: function () {
                            return this.collapsed ? null : r(this, 0)
                        },
                        deleteContents: function () {
                            var e;
                            return this.collapsed || r(this, 1),
                                browser.webkit && (3 != (e = this.startContainer).nodeType || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), domUtils.remove(e))),
                                this
                        },
                        extractContents: function () {
                            return this.collapsed ? null : r(this, 2)
                        },
                        setStart: function (e, t) {
                            return o(!0, e, t, this)
                        },
                        setEnd: function (e, t) {
                            return o(!1, e, t, this)
                        },
                        setStartAfter: function (e) {
                            return this.setStart(e.parentNode, domUtils.getNodeIndex(e) + 1)
                        },
                        setStartBefore: function (e) {
                            return this.setStart(e.parentNode, domUtils.getNodeIndex(e))
                        },
                        setEndAfter: function (e) {
                            return this.setEnd(e.parentNode, domUtils.getNodeIndex(e) + 1)
                        },
                        setEndBefore: function (e) {
                            return this.setEnd(e.parentNode, domUtils.getNodeIndex(e))
                        },
                        setStartAtFirst: function (e) {
                            return this.setStart(e, 0)
                        },
                        setStartAtLast: function (e) {
                            return this.setStart(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length)
                        },
                        setEndAtFirst: function (e) {
                            return this.setEnd(e, 0)
                        },
                        setEndAtLast: function (e) {
                            return this.setEnd(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length)
                        },
                        selectNode: function (e) {
                            return this.setStartBefore(e).setEndAfter(e)
                        },
                        selectNodeContents: function (e) {
                            return this.setStart(e, 0).setEndAtLast(e)
                        },
                        cloneRange: function () {
                            var e = this;
                            return new a(e.document).setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset)
                        },
                        collapse: function (e) {
                            var t = this;
                            return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset),
                                t.collapsed = !0,
                                t
                        },
                        shrinkBoundary: function (e) {
                            var t, i = this,
                                n = i.collapsed;
                            function o(e) {
                                return 1 == e.nodeType && !domUtils.isBookmarkNode(e) && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName]
                            }
                            for (; 1 == i.startContainer.nodeType && (t = i.startContainer.childNodes[i.startOffset]) && o(t);) i.setStart(t, 0);
                            if (n) return i.collapse(!0);
                            if (!e) for (; 1 == i.endContainer.nodeType && i.endOffset > 0 && (t = i.endContainer.childNodes[i.endOffset - 1]) && o(t);) i.setEnd(t, t.childNodes.length);
                            return i
                        },
                        getCommonAncestor: function (e, t) {
                            var i = this.startContainer,
                                o = this.endContainer;
                            return i === o ? e && n(this) && 1 == (i = i.childNodes[this.startOffset]).nodeType ? i : t && 3 == i.nodeType ? i.parentNode : i : domUtils.getCommonAncestor(i, o)
                        },
                        trimBoundary: function (e) {
                            this.txtToElmBoundary();
                            var t = this.startContainer,
                                i = this.startOffset,
                                n = this.collapsed,
                                o = this.endContainer;
                            if (3 == t.nodeType) {
                                if (0 == i) this.setStartBefore(t);
                                else if (i >= t.nodeValue.length) this.setStartAfter(t);
                                else {
                                    var r = domUtils.split(t, i);
                                    t === o ? this.setEnd(r, this.endOffset - i) : t.parentNode === o && (this.endOffset += 1),
                                        this.setStartBefore(r)
                                }
                                if (n) return this.collapse(!0)
                            }
                            return e || (i = this.endOffset, 3 == (o = this.endContainer).nodeType && (0 == i ? this.setEndBefore(o) : (i < o.nodeValue.length && domUtils.split(o, i), this.setEndAfter(o)))),
                                this
                        },
                        txtToElmBoundary: function (e) {
                            function t(e, t) {
                                var i = e[t + "Container"],
                                    n = e[t + "Offset"];
                                3 == i.nodeType && (n ? n >= i.nodeValue.length && e["set" + t.replace(/(\w)/, (function (e) {
                                    return e.toUpperCase()
                                })) + "After"](i) : e["set" + t.replace(/(\w)/, (function (e) {
                                    return e.toUpperCase()
                                })) + "Before"](i))
                            }
                            return !e && this.collapsed || (t(this, "start"), t(this, "end")),
                                this
                        },
                        insertNode: function (e) {
                            var t = e,
                                i = 1;
                            11 == e.nodeType && (t = e.firstChild, i = e.childNodes.length),
                                this.trimBoundary(!0);
                            var n = this.startContainer,
                                o = this.startOffset,
                                r = n.childNodes[o];
                            return r ? n.insertBefore(e, r) : n.appendChild(e),
                                t.parentNode === this.endContainer && (this.endOffset = this.endOffset + i),
                                this.setStartBefore(t)
                        },
                        setCursor: function (e, t) {
                            return this.collapse(!e).select(t)
                        },
                        createBookmark: function (e, i) {
                            var n, o = this.document.createElement("span");
                            return o.style.cssText = "display:none;line-height:0px;",
                                o.appendChild(this.document.createTextNode("‍")),
                                o.id = "_baidu_bookmark_start_" + (i ? "" : t++),
                                this.collapsed || ((n = o.cloneNode(!0)).id = "_baidu_bookmark_end_" + (i ? "" : t++)),
                                this.insertNode(o),
                                n && this.collapse().insertNode(n).setEndBefore(n),
                                this.setStartAfter(o),
                            {
                                start: e ? o.id : o,
                                end: n ? e ? n.id : n : null,
                                id: e
                            }
                        },
                        moveToBookmark: function (e) {
                            var t = e.id ? this.document.getElementById(e.start) : e.start,
                                i = e.end && e.id ? this.document.getElementById(e.end) : e.end;
                            return this.setStartBefore(t),
                                domUtils.remove(t),
                                i ? (this.setEndBefore(i), domUtils.remove(i)) : this.collapse(!0),
                                this
                        },
                        enlarge: function (e, t) {
                            var i, n, o = domUtils.isBody,
                                r = this.document.createTextNode("");
                            if (e) {
                                for (1 == (n = this.startContainer).nodeType ? n.childNodes[this.startOffset] ? i = n = n.childNodes[this.startOffset] : (n.appendChild(r), i = n = r) : i = n; ;) {
                                    if (domUtils.isBlockElm(n)) {
                                        for (n = i; (i = n.previousSibling) && !domUtils.isBlockElm(i);) n = i;
                                        this.setStartBefore(n);
                                        break
                                    }
                                    i = n,
                                        n = n.parentNode
                                }
                                for (1 == (n = this.endContainer).nodeType ? ((i = n.childNodes[this.endOffset]) ? n.insertBefore(r, i) : n.appendChild(r), i = n = r) : i = n; ;) {
                                    if (domUtils.isBlockElm(n)) {
                                        for (n = i; (i = n.nextSibling) && !domUtils.isBlockElm(i);) n = i;
                                        this.setEndAfter(n);
                                        break
                                    }
                                    i = n,
                                        n = n.parentNode
                                }
                                r.parentNode === this.endContainer && this.endOffset--,
                                    domUtils.remove(r)
                            }
                            if (!this.collapsed) {
                                for (; !(0 != this.startOffset || t && t(this.startContainer) || o(this.startContainer));) this.setStartBefore(this.startContainer);
                                for (; !(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || t && t(this.endContainer) || o(this.endContainer));) this.setEndAfter(this.endContainer)
                            }
                            return this
                        },
                        enlargeToBlockElm: function (e) {
                            for (; !domUtils.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer);
                            if (!e) for (; !domUtils.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer);
                            return this
                        },
                        adjustmentBoundary: function () {
                            if (!this.collapsed) {
                                for (; !domUtils.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
                                for (; !domUtils.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setEndBefore(this.endContainer)
                            }
                            return this
                        },
                        applyInlineStyle: function (e, t, i) {
                            if (this.collapsed) return this;
                            this.trimBoundary().enlarge(!1, (function (e) {
                                return 1 == e.nodeType && domUtils.isBlockElm(e)
                            })).adjustmentBoundary();
                            for (var n, o, r = this.createBookmark(), a = r.end, s = function (e) {
                                return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !domUtils.isWhitespace(e)
                            },
                                l = domUtils.getNextDomNode(r.start, !1, s), d = this.cloneRange(); l && domUtils.getPosition(l, a) & domUtils.POSITION_PRECEDING;) if (3 == l.nodeType || dtd[e][l.tagName]) {
                                    for (d.setStartBefore(l), n = l; n && (3 == n.nodeType || dtd[e][n.tagName]) && n !== a;) o = n,
                                        n = domUtils.getNextDomNode(n, 1 == n.nodeType, null, (function (t) {
                                            return dtd[e][t.tagName]
                                        }));
                                    var c, u, m = d.setEndAfter(o).extractContents();
                                    if (i && i.length > 0) {
                                        var f, h;
                                        h = f = i[0].cloneNode(!1);
                                        for (var p, g = 1; p = i[g++];) f.appendChild(p.cloneNode(!1)),
                                            f = f.firstChild;
                                        c = f
                                    } else c = d.document.createElement(e);
                                    if (t && domUtils.setAttributes(c, t), c.appendChild(m), d.insertNode(i ? h : c), "span" == e && t.style && /text\-decoration/.test(t.style) && (u = domUtils.findParentByTagName(c, "a", !0)) ? (domUtils.setAttributes(u, t), domUtils.remove(c, !0), c = u) : (domUtils.mergeSibling(c), domUtils.clearEmptySibling(c)), domUtils.mergeChild(c, t), l = domUtils.getNextDomNode(c, !1, s), domUtils.mergeToParent(c), n === a) break
                                } else l = domUtils.getNextDomNode(l, !0, s);
                            return this.moveToBookmark(r)
                        },
                        removeInlineStyle: function (e) {
                            if (this.collapsed) return this;
                            e = utils.isArray(e) ? e : [e],
                                this.shrinkBoundary().adjustmentBoundary();
                            for (var t = this.startContainer,
                                i = this.endContainer; ;) {
                                if (1 == t.nodeType) {
                                    if (utils.indexOf(e, t.tagName.toLowerCase()) > -1) break;
                                    if ("body" == t.tagName.toLowerCase()) {
                                        t = null;
                                        break
                                    }
                                }
                                t = t.parentNode
                            }
                            for (; ;) {
                                if (1 == i.nodeType) {
                                    if (utils.indexOf(e, i.tagName.toLowerCase()) > -1) break;
                                    if ("body" == i.tagName.toLowerCase()) {
                                        i = null;
                                        break
                                    }
                                }
                                i = i.parentNode
                            }
                            var n, o, r = this.createBookmark();
                            t && (n = (o = this.cloneRange().setEndBefore(r.start).setStartBefore(t)).extractContents(), o.insertNode(n), domUtils.clearEmptySibling(t, !0), t.parentNode.insertBefore(r.start, t)),
                                i && (n = (o = this.cloneRange().setStartAfter(r.end).setEndAfter(i)).extractContents(), o.insertNode(n), domUtils.clearEmptySibling(i, !1, !0), i.parentNode.insertBefore(r.end, i.nextSibling));
                            for (var a, s = domUtils.getNextDomNode(r.start, !1, (function (e) {
                                return 1 == e.nodeType
                            })); s && s !== r.end;) a = domUtils.getNextDomNode(s, !0, (function (e) {
                                return 1 == e.nodeType
                            })),
                                utils.indexOf(e, s.tagName.toLowerCase()) > -1 && domUtils.remove(s, !0),
                                s = a;
                            return this.moveToBookmark(r)
                        },
                        getClosedNode: function () {
                            var e;
                            if (!this.collapsed) {
                                var t = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                                if (n(t)) {
                                    var i = t.startContainer.childNodes[t.startOffset];
                                    i && 1 == i.nodeType && (dtd.$empty[i.tagName] || dtd.$nonChild[i.tagName]) && (e = i)
                                }
                            }
                            return e
                        },
                        select: browser.ie ?
                            function (t, n) {
                                var o;
                                this.collapsed || this.shrinkBoundary();
                                var r = this.getClosedNode();
                                if (r && !n) {
                                    try {
                                        (o = this.document.body.createControlRange()).addElement(r),
                                        o.select()
                                    } catch (h) { }
                                    return this
                                }
                                var a, d = this.createBookmark(),
                                    c = d.start;
                                if ((o = this.document.body.createTextRange()).moveToElementText(c), o.moveStart("character", 1), this.collapsed) {
                                    if (!t && 3 != this.startContainer.nodeType) {
                                        var u = this.document.createTextNode(i),
                                            m = this.document.createElement("span");
                                        m.appendChild(this.document.createTextNode(i)),
                                            c.parentNode.insertBefore(m, c),
                                            c.parentNode.insertBefore(u, c),
                                            s(this.document, u),
                                            e = u,
                                            l(m, "previousSibling"),
                                            l(c, "nextSibling"),
                                            o.moveStart("character", -1),
                                            o.collapse(!0)
                                    }
                                } else {
                                    var f = this.document.body.createTextRange();
                                    a = d.end,
                                        f.moveToElementText(a),
                                        o.setEndPoint("EndToEnd", f)
                                }
                                this.moveToBookmark(d),
                                    m && domUtils.remove(m);
                                try {
                                    o.select()
                                } catch (h) { }
                                return this
                            } : function (t) {
                                var n, o = domUtils.getWindow(this.document),
                                    r = o.getSelection();
                                if (browser.gecko ? this.document.body.focus() : o.focus(), r) {
                                    if (r.removeAllRanges(), this.collapsed && !t) {
                                        var a = this.startContainer,
                                            d = a;
                                        1 == a.nodeType && (d = a.childNodes[this.startOffset]),
                                            3 == a.nodeType && this.startOffset || (d ? d.previousSibling && 3 == d.previousSibling.nodeType : a.lastChild && 3 == a.lastChild.nodeType) || (n = this.document.createTextNode(i), this.insertNode(n), s(this.document, n), l(n, "previousSibling"), l(n, "nextSibling"), e = n, this.setStart(n, browser.webkit ? 1 : 0).collapse(!0))
                                    }
                                    var c = this.document.createRange();
                                    if (this.collapsed && browser.opera && 1 == this.startContainer.nodeType) if (d = this.startContainer.childNodes[this.startOffset]) {
                                        for (; d && domUtils.isBlockElm(d) && 1 == d.nodeType && d.childNodes[0];) d = d.childNodes[0];
                                        d && this.setStartBefore(d).collapse(!0)
                                    } else (d = this.startContainer.lastChild) && domUtils.isBr(d) && this.setStartBefore(d).collapse(!0); !
                                        function (e) {
                                            function t(t, i, n) {
                                                3 == t.nodeType && t.nodeValue.length < i && (e[n + "Offset"] = t.nodeValue.length)
                                            }
                                            t(e.startContainer, e.startOffset, "start"),
                                                t(e.endContainer, e.endOffset, "end")
                                        }(this),
                                        c.setStart(this.startContainer, this.startOffset),
                                        c.setEnd(this.endContainer, this.endOffset),
                                        r.addRange(c)
                                }
                                return this
                            },
                        scrollToView: function (e, t) {
                            e = e ? window : domUtils.getWindow(this.document);
                            var i = this.document.createElement("span");
                            return i.innerHTML = "&nbsp;",
                                this.cloneRange().insertNode(i),
                                domUtils.scrollToView(i, e, t),
                                domUtils.remove(i),
                                this
                        },
                        inFillChar: function () {
                            var e = this.startContainer;
                            return !(!this.collapsed || 3 != e.nodeType || e.nodeValue.replace(new RegExp("^" + domUtils.fillChar), "").length + 1 != e.nodeValue.length)
                        },
                        createAddress: function (e, t) {
                            var i = {},
                                n = this;
                            function o(e) {
                                for (var i, o = e ? n.startContainer : n.endContainer, r = domUtils.findParents(o, !0, (function (e) {
                                    return !domUtils.isBody(e)
                                })), a = [], s = 0; i = r[s++];) a.push(domUtils.getNodeIndex(i, t));
                                var l = 0;
                                if (t) if (3 == o.nodeType) {
                                    for (var d = o.previousSibling; d && 3 == d.nodeType;) l += d.nodeValue.replace(fillCharReg, "").length,
                                        d = d.previousSibling;
                                    l += e ? n.startOffset : n.endOffset
                                } else if (o = o.childNodes[e ? n.startOffset : n.endOffset]) l = domUtils.getNodeIndex(o, t);
                                else for (var c = (o = e ? n.startContainer : n.endContainer).firstChild; c;) if (domUtils.isFillChar(c)) c = c.nextSibling;
                                else if (l++, 3 == c.nodeType) for (; c && 3 == c.nodeType;) c = c.nextSibling;
                                else c = c.nextSibling;
                                else l = e ? domUtils.isFillChar(o) ? 0 : n.startOffset : n.endOffset;
                                return l < 0 && (l = 0),
                                    a.push(l),
                                    a
                            }
                            return i.startAddress = o(!0),
                                e || (i.endAddress = n.collapsed ? [].concat(i.startAddress) : o()),
                                i
                        },
                        moveToAddress: function (e, t) {
                            var i = this;
                            function n(e, t) {
                                for (var n, o, r, a = i.document.body,
                                    s = 0,
                                    l = e.length; s < l; s++) if (r = e[s], n = a, !(a = a.childNodes[r])) {
                                        o = r;
                                        break
                                    }
                                t ? a ? i.setStartBefore(a) : i.setStart(n, o) : a ? i.setEndBefore(a) : i.setEnd(n, o)
                            }
                            return n(e.startAddress, !0),
                                !t && e.endAddress && n(e.endAddress),
                                i
                        },
                        equals: function (e) {
                            for (var t in this) if (this.hasOwnProperty(t) && this[t] !== e[t]) return !1;
                            return !0
                        },
                        traversal: function (e, t) {
                            if (this.collapsed) return this;
                            for (var i = this.createBookmark(), n = i.end, o = domUtils.getNextDomNode(i.start, !1, t); o && o !== n && domUtils.getPosition(o, n) & domUtils.POSITION_PRECEDING;) {
                                var r = domUtils.getNextDomNode(o, !1, t);
                                e(o),
                                    o = r
                            }
                            return this.moveToBookmark(i)
                        }
                    }
                }(),
                function () {
                    function e(e, t) {
                        var i = domUtils.getNodeIndex; (e = e.duplicate()).collapse(t);
                        var n = e.parentElement();
                        if (!n.hasChildNodes()) return {
                            container: n,
                            offset: 0
                        };
                        for (var o, r, a = n.children,
                            s = e.duplicate(), l = 0, d = a.length - 1, c = -1; l <= d;) {
                            o = a[c = Math.floor((l + d) / 2)],
                                s.moveToElementText(o);
                            var u = s.compareEndPoints("StartToStart", e);
                            if (u > 0) d = c - 1;
                            else {
                                if (!(u < 0)) return {
                                    container: n,
                                    offset: i(o)
                                };
                                l = c + 1
                            }
                        }
                        if (- 1 == c) {
                            if (s.moveToElementText(n), s.setEndPoint("StartToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, a = n.childNodes, !r) return {
                                container: o = a[a.length - 1],
                                offset: o.nodeValue.length
                            };
                            for (var m = a.length; r > 0;) r -= a[--m].nodeValue.length;
                            return {
                                container: a[m],
                                offset: -r
                            }
                        }
                        if (s.collapse(u > 0), s.setEndPoint(u > 0 ? "StartToStart" : "EndToStart", e), !(r = s.text.replace(/(\r\n|\r)/g, "\n").length)) return dtd.$empty[o.tagName] || dtd.$nonChild[o.tagName] ? {
                            container: n,
                            offset: i(o) + (u > 0 ? 0 : 1)
                        } : {
                                container: o,
                                offset: u > 0 ? 0 : o.childNodes.length
                            };
                        for (; r > 0;) try {
                            var f = o;
                            r -= (o = o[u > 0 ? "previousSibling" : "nextSibling"]).nodeValue.length
                        } catch (h) {
                            return {
                                container: n,
                                offset: i(f)
                            }
                        }
                        return {
                            container: o,
                            offset: u > 0 ? -r : o.nodeValue.length + r
                        }
                    }
                    function t(e) {
                        var t;
                        try {
                            t = e.getNative().createRange()
                        } catch (n) {
                            return null
                        }
                        var i = t.item ? t.item(0) : t.parentElement();
                        return (i.ownerDocument || i) === e.document ? t : null
                    } (dom.Selection = function (e) {
                        var i, n = this;
                        n.document = e,
                            browser.ie9below && (i = domUtils.getWindow(e).frameElement, domUtils.on(i, "beforedeactivate", (function () {
                                n._bakIERange = n.getIERange()
                            })), domUtils.on(i, "activate", (function () {
                                try {
                                    !t(n) && n._bakIERange && n._bakIERange.select()
                                } catch (e) { }
                                n._bakIERange = null
                            }))),
                            i = e = null
                    }).prototype = {
                        rangeInBody: function (e, t) {
                            var i = browser.ie9below || t ? e.item ? e.item() : e.parentElement() : e.startContainer;
                            return i === this.document.body || domUtils.inDoc(i, this.document)
                        },
                        getNative: function () {
                            var e = this.document;
                            try {
                                return e ? browser.ie9below ? e.selection : domUtils.getWindow(e).getSelection() : null
                            } catch (t) {
                                return null
                            }
                        },
                        getIERange: function () {
                            var e = t(this);
                            return !e && this._bakIERange ? this._bakIERange : e
                        },
                        cache: function () {
                            this.clear(),
                                this._cachedRange = this.getRange(),
                                this._cachedStartElement = this.getStart(),
                                this._cachedStartElementPath = this.getStartElementPath()
                        },
                        getStartElementPath: function () {
                            if (this._cachedStartElementPath) return this._cachedStartElementPath;
                            var e = this.getStart();
                            return e ? domUtils.findParents(e, !0, null, !0) : []
                        },
                        clear: function () {
                            this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
                        },
                        isFocus: function () {
                            try {
                                if (browser.ie9below) {
                                    var e = t(this);
                                    return !(!e || !this.rangeInBody(e))
                                }
                                return !!this.getNative().rangeCount
                            } catch (i) {
                                return !1
                            }
                        },
                        getRange: function () {
                            var t = this;
                            function i(e) {
                                for (var i = t.document.body.firstChild,
                                    n = e.collapsed; i && i.firstChild;) e.setStart(i, 0),
                                        i = i.firstChild;
                                e.startContainer || e.setStart(t.document.body, 0),
                                    n && e.collapse(!0)
                            }
                            if (null != t._cachedRange) return this._cachedRange;
                            var n = new baidu.editor.dom.Range(t.document);
                            if (browser.ie9below) {
                                var o = t.getIERange();
                                if (o) try {
                                    !
                                    function (t, i) {
                                        if (t.item) i.selectNode(t.item(0));
                                        else {
                                            var n = e(t, !0);
                                            i.setStart(n.container, n.offset),
                                                0 != t.compareEndPoints("StartToEnd", t) && (n = e(t, !1), i.setEnd(n.container, n.offset))
                                        }
                                    }(o, n)
                                } catch (l) {
                                    i(n)
                                } else i(n)
                            } else {
                                var r = t.getNative();
                                if (r && r.rangeCount) {
                                    var a = r.getRangeAt(0),
                                        s = r.getRangeAt(r.rangeCount - 1);
                                    n.setStart(a.startContainer, a.startOffset).setEnd(s.endContainer, s.endOffset),
                                        n.collapsed && domUtils.isBody(n.startContainer) && !n.startOffset && i(n)
                                } else {
                                    if (this._bakRange && domUtils.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
                                    i(n)
                                }
                            }
                            return this._bakRange = n
                        },
                        getStart: function () {
                            if (this._cachedStartElement) return this._cachedStartElement;
                            var e, t, i, n, o = browser.ie9below ? this.getIERange() : this.getRange();
                            if (browser.ie9below) {
                                if (!o) return this.document.body.firstChild;
                                if (o.item) return o.item(0);
                                for ((e = o.duplicate()).text.length > 0 && e.moveStart("character", 1), e.collapse(1), t = e.parentElement(), n = i = o.parentElement(); i = i.parentNode;) if (i == t) {
                                    t = n;
                                    break
                                }
                            } else if (o.shrinkBoundary(), 1 == (t = o.startContainer).nodeType && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, o.startOffset)]), 3 == t.nodeType) return t.parentNode;
                            return t
                        },
                        getText: function () {
                            var e, t;
                            return this.isFocus() && (e = this.getNative()) ? (t = browser.ie9below ? e.createRange() : e.getRangeAt(0), browser.ie9below ? t.text : t.toString()) : ""
                        },
                        clearRange: function () {
                            this.getNative()[browser.ie9below ? "empty" : "removeAllRanges"]()
                        }
                    }
                }(),
                function () {
                    var e, t = 0;
                    function i(e, t) {
                        var i;
                        if (t.textarea) if (utils.isString(t.textarea)) {
                            for (var n, o = 0,
                                r = domUtils.getElementsByTagName(e, "textarea"); n = r[o++];) if (n.id == "ueditor_textarea_" + t.options.textarea) {
                                    i = n;
                                    break
                                }
                        } else i = t.textarea;
                        i || (e.appendChild(i = domUtils.createElement(document, "textarea", {
                            name: t.options.textarea,
                            id: "ueditor_textarea_" + t.options.textarea,
                            style: "display:none"
                        })), t.textarea = i),
                            !i.getAttribute("name") && i.setAttribute("name", t.options.textarea),
                            i.value = t.hasContents() ? t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, !0) : ""
                    }
                    function n(e) {
                        e.langIsReady = !0,
                            e.fireEvent("langReady")
                    }
                    var o = UE.Editor = function (e) {
                        var i = this;
                        i.uid = t++,
                            EventBase.call(i),
                            i.commands = {},
                            i.options = utils.extend(utils.clone(e || {}), UEDITOR_CONFIG, !0),
                            i.shortcutkeys = {},
                            i.inputRules = [],
                            i.outputRules = [],
                            i.setOpt(o.defaultOptions(i)),
                            i.loadServerConfig(),
                            utils.isEmptyObject(UE.I18N) ? utils.loadFile(document, {
                                src: i.options.langPath + i.options.lang + "/" + i.options.lang + ".js",
                                tag: "script",
                                type: "text/javascript",
                                defer: "defer"
                            },
                                (function () {
                                    UE.plugin.load(i),
                                        n(i)
                                })) : (i.options.lang = function (e) {
                                    for (var t in e) return t
                                }(UE.I18N), UE.plugin.load(i), n(i)),
                            UE.instants["ueditorInstant" + i.uid] = i
                    };
                    o.prototype = {
                        registerCommand: function (e, t) {
                            this.commands[e] = t
                        },
                        ready: function (e) {
                            e && (this.isReady ? e.apply(this) : this.addListener("ready", e))
                        },
                        setOpt: function (e, t) {
                            var i = {};
                            utils.isString(e) ? i[e] = t : i = e,
                                utils.extend(this.options, i, !0)
                        },
                        getOpt: function (e) {
                            return this.options[e]
                        },
                        destroy: function () {
                            var e = this;
                            e.fireEvent("destroy");
                            var t = e.container.parentNode,
                                i = e.textarea;
                            i ? i.style.display = "" : (i = document.createElement("textarea"), t.parentNode.insertBefore(i, t)),
                                i.style.width = e.iframe.offsetWidth + "px",
                                i.style.height = e.iframe.offsetHeight + "px",
                                i.value = e.getContent(),
                                i.id = e.key,
                                t.innerHTML = "",
                                domUtils.remove(t);
                            var n = e.key;
                            for (var o in e) e.hasOwnProperty(o) && delete this[o];
                            UE.delEditor(n)
                        },
                        render: function (e) {
                            var t = this.options,
                                i = function (t) {
                                    return parseInt(domUtils.getComputedStyle(e, t))
                                };
                            if (utils.isString(e) && (e = document.getElementById(e)), e) {
                                t.initialFrameWidth ? t.minFrameWidth = t.initialFrameWidth : t.minFrameWidth = t.initialFrameWidth = e.offsetWidth,
                                    t.initialFrameHeight ? t.minFrameHeight = t.initialFrameHeight : t.initialFrameHeight = t.minFrameHeight = e.offsetHeight,
                                    e.style.width = /%$/.test(t.initialFrameWidth) ? "100%" : t.initialFrameWidth - i("padding-left") - i("padding-right") + "px",
                                    e.style.height = /%$/.test(t.initialFrameHeight) ? "100%" : t.initialFrameHeight - i("padding-top") - i("padding-bottom") + "px",
                                    e.style.zIndex = t.zIndex;
                                var n = (ie && browser.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view_1' ><head><style type='text/css'>.view{word-wrap:break-word;cursor:text;height:100%;overflow:hidden;}\n.view_body{cursor:text;height:100%;padding:16px;overflow-y:scroll;}\n.xiaoe-iframe-video{width:100%;border:none;padding:0 1%;height:371.84000000000003px;}.xiaoe-iframe-outside{width:100%;border:none;padding:0 1%;height:371.84000000000003px;}.xiaoe-iframe-audio{width:100%;border:none;padding:0 1%;height:72px}a{color:#039be5;text-decoration:none;}p{margin:5px 0;}</style>" + (t.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + utils.unhtml(t.iframeCssUrl) + "'/>" : "") + (t.initialStyle ? "<style>" + t.initialStyle + "</style>" : "") + "</head><body class='view_1'></body><script type='text/javascript' " + (ie ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);<\/script></html>";
                                e.appendChild(domUtils.createElement(document, "iframe", {
                                    id: "ueditor_" + this.uid,
                                    width: "100%",
                                    height: "100%",
                                    frameborder: "0",
                                    src: "javascript:void(function(){document.open();" + (t.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + n + '");document.close();}())'
                                })),
                                    e.style.overflow = "hidden",
                                    setTimeout((function () {
                                        / %$ /.test(t.initialFrameWidth) && (t.minFrameWidth = t.initialFrameWidth = e.offsetWidth),
                                        /%$/.test(t.initialFrameHeight) && (t.minFrameHeight = t.initialFrameHeight = e.offsetHeight, e.style.height = t.initialFrameHeight + "px")
                                    }))
                            }
                        },
                        _setup: function (e) {
                            var t, n = this,
                                o = n.options;
                            ie ? (e.body.disabled = !0, e.body.contentEditable = !0, e.body.disabled = !1) : e.body.contentEditable = !0,
                                e.body.spellcheck = !1,
                                n.document = e,
                                n.window = e.defaultView || e.parentWindow,
                                n.iframe = n.window.frameElement,
                                n.body = e.body,
                                n.selection = new dom.Selection(e),
                                browser.gecko && (t = this.selection.getNative()) && t.removeAllRanges(),
                                this._initEvents();
                            for (var r = this.iframe.parentNode; !domUtils.isBody(r); r = r.parentNode) if ("FORM" == r.tagName) {
                                n.form = r,
                                    n.options.autoSyncData ? domUtils.on(n.window, "blur", (function () {
                                        i(r, n)
                                    })) : domUtils.on(r, "submit", (function () {
                                        i(this, n)
                                    }));
                                break
                            }
                            if (o.initialContent) if (o.autoClearinitialContent) {
                                var a = n.execCommand;
                                n.execCommand = function () {
                                    return n.fireEvent("firstBeforeExecCommand"),
                                        a.apply(n, arguments)
                                },
                                    this._setDefaultContent(o.initialContent)
                            } else this.setContent(o.initialContent, !1, !0);
                            domUtils.isEmptyNode(n.body) && (n.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>"),
                                o.focus && setTimeout((function () {
                                    n.focus(n.options.focusInEnd),
                                        !n.options.autoClearinitialContent && n._selectionChange()
                                }), 0),
                                n.container || (n.container = this.iframe.parentNode),
                                o.fullscreen && n.ui && n.ui.setFullScreen(!0);
                            try {
                                n.document.execCommand("2D-position", !1, !1)
                            } catch (s) { }
                            try {
                                n.document.execCommand("enableInlineTableEditing", !1, !1)
                            } catch (s) { }
                            try {
                                n.document.execCommand("enableObjectResizing", !1, !1)
                            } catch (s) { }
                            n._bindshortcutKeys(),
                                n.isReady = 1,
                                n.fireEvent("ready"),
                                o.onready && o.onready.call(n),
                                browser.ie9below || domUtils.on(n.window, ["blur", "focus"], (function (e) {
                                    if ("blur" == e.type) {
                                        n._bakRange = n.selection.getRange();
                                        try {
                                            n._bakNativeRange = n.selection.getNative().getRangeAt(0),
                                                n.selection.getNative().removeAllRanges()
                                        } catch (e) {
                                            n._bakNativeRange = null
                                        }
                                    } else try {
                                        n._bakRange && n._bakRange.select()
                                    } catch (e) { }
                                })),
                                browser.gecko && browser.version <= 10902 && (n.body.contentEditable = !1, setTimeout((function () {
                                    n.body.contentEditable = !0
                                }), 100), setInterval((function () {
                                    n.body.style.height = n.iframe.offsetHeight - 20 + "px"
                                }), 100)),
                                !o.isShow && n.setHide(),
                                o.readonly && n.setDisabled()
                        },
                        sync: function (e) {
                            var t = e ? document.getElementById(e) : domUtils.findParent(this.iframe.parentNode, (function (e) {
                                return "FORM" == e.tagName
                            }), !0);
                            t && i(t, this)
                        },
                        setHeight: function (e, t) {
                            e !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = e + "px"),
                                !t && (this.options.minFrameHeight = this.options.initialFrameHeight = e),
                                this.body.style.height = e + "px",
                                !t && this.trigger("setHeight")
                        },
                        addshortcutkey: function (e, t) {
                            var i = {};
                            t ? i[e] = t : i = e,
                                utils.extend(this.shortcutkeys, i)
                        },
                        _bindshortcutKeys: function () {
                            var e = this,
                                t = this.shortcutkeys;
                            e.addListener("keydown", (function (i, n) {
                                var o = n.keyCode || n.which;
                                for (var r in t) for (var a, s = t[r].split(","), l = 0; a = s[l++];) {
                                    var d = (a = a.split(":"))[0],
                                        c = a[1]; (/^(ctrl)(\+shift)?\+(\d+)$/.test(d.toLowerCase()) || /^(\d+)$/.test(d)) && ("ctrl" == RegExp.$1 && (n.ctrlKey || n.metaKey) && ("" == RegExp.$2 || n[RegExp.$2.slice(1) + "Key"]) && o == RegExp.$3 || o == RegExp.$1) && (- 1 != e.queryCommandState(r, c) && e.execCommand(r, c), domUtils.preventDefault(n))
                                }
                            }))
                        },
                        getContent: function (e, t, i, n, o) {
                            if (e && utils.isFunction(e) && (t = e, e = ""), t ? !t() : !this.hasContents()) return "";
                            this.fireEvent("beforegetcontent");
                            var r = UE.htmlparser(this.body.innerHTML, n);
                            if (this.filterOutputRule(r), this.fireEvent("aftergetcontent", e, r), r.getNodesByTagName("iframe").length >= 1) for (var a = 0; a <= r.getNodesByTagName("iframe").length - 1; a++)"xiaoe-iframe-audio" == r.getNodesByTagName("iframe")[a].getAttr("class") ? (r.getNodesByTagName("iframe")[a].setAttr("width", "100%"), r.getNodesByTagName("iframe")[a].setAttr("height", "72px"), r.getNodesByTagName("iframe")[a].setAttr("frameborder", "0"), r.getNodesByTagName("iframe")[a].setAttr("scrolling", "no")) : "xiaoe-iframe-video" == r.getNodesByTagName("iframe")[a].getAttr("class") ? (r.getNodesByTagName("iframe")[a].setAttr("width", "100%"), r.getNodesByTagName("iframe")[a].setAttr("frameborder", "0"), r.getNodesByTagName("iframe")[a].setAttr("scrolling", "no"), r.getNodesByTagName("iframe")[a].setAttr("allowfullscreen", "true"), r.getNodesByTagName("iframe")[a].setAttr("webkitallowfullscreen", "true"), r.getNodesByTagName("iframe")[a].setAttr("mozallowfullscreen", "true")) : "xiaoe-iframe-outside" == r.getNodesByTagName("iframe")[a].getAttr("class") && (r.getNodesByTagName("iframe")[a].setAttr("width", "100%"), r.getNodesByTagName("iframe")[a].setAttr("frameborder", "0"), r.getNodesByTagName("iframe")[a].setAttr("scrolling", "no"));
                            if (r.getNodesByTagName("blockquote").length >= 1) for (a = 0; a <= r.getNodesByTagName("blockquote").length - 1; a++) r.getNodesByTagName("blockquote")[a].setAttr("style", "margin: 0px; padding: 0px 10px; border-left: 3px solid rgb(219, 219, 219);");
                            if (r.getNodesByTagName("ol").length >= 1) for (a = 0; a <= r.getNodesByTagName("ol").length - 1; a++) r.getNodesByTagName("ol")[a].attrs && r.getNodesByTagName("ol")[a].attrs.style && -1 === r.getNodesByTagName("ol")[a].attrs.style.indexOf("padding-left") && r.getNodesByTagName("ol")[a].setAttr("style", r.getNodesByTagName("ol")[a].attrs.style + "padding-left:30px;");
                            if (r.getNodesByTagName("ul").length >= 1) for (a = 0; a <= r.getNodesByTagName("ul").length - 1; a++) r.getNodesByTagName("ul")[a].attrs && r.getNodesByTagName("ul")[a].attrs.style && -1 === r.getNodesByTagName("ul")[a].attrs.style.indexOf("padding-left") && r.getNodesByTagName("ul")[a].setAttr("style", r.getNodesByTagName("ul")[a].attrs.style + "padding-left:30px;");
                            return r.toHtml(o)
                        },
                        getAllHtml: function () {
                            var e = this,
                                t = [];
                            if (e.fireEvent("getAllHtml", t), browser.ie && browser.version > 8) {
                                var i = "";
                                utils.each(e.document.styleSheets, (function (e) {
                                    i += e.href ? '<link rel="stylesheet" type="text/css" href="' + e.href + '" />' : "<style>" + e.cssText + "</style>"
                                })),
                                    utils.each(e.document.getElementsByTagName("script"), (function (e) {
                                        i += e.outerHTML
                                    }))
                            }
                            return "<html><head>" + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>' : "") + (i || e.document.getElementsByTagName("head")[0].innerHTML) + t.join("\n") + "</head><body " + (ie && browser.version < 9 ? 'class="view"' : "") + ">" + e.getContent(null, null, !0) + "</body></html>"
                        },
                        getPlainTxt: function () {
                            var e = new RegExp(domUtils.fillChar, "g"),
                                t = this.body.innerHTML.replace(/[\n\r]/g, "");
                            return t = (t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n")
                                .replace(/<[^>/] + >/g, "").replace(/(\n)?<\/([^>]+)>/g, (function (e, t, i) { return dtd.$block[i] ? "\n" : t || "" })))
                                .replace(e, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ")
                        },
                        getContentTxt: function () {
                            var e = new RegExp(domUtils.fillChar, "g");
                            return this.body[browser.ie ? "innerText" : "textContent"].replace(e, "").replace(/\u00a0/g, " ")
                        },
                        setContent: function (e, t, n) {
                            var o = this;
                            o.fireEvent("beforesetcontent", e);
                            var r, a, s = UE.htmlparser(e);
                            if (s.getNodesByTagName("iframe").length >= 1) for (var l = 0; l <= s.getNodesByTagName("iframe").length - 1; l++)"xiaoe-iframe-audio" == s.getNodesByTagName("iframe")[l].getAttr("class") ? (s.getNodesByTagName("iframe")[l].setAttr("width", "100%"), s.getNodesByTagName("iframe")[l].setAttr("height", "72px"), s.getNodesByTagName("iframe")[l].setAttr("frameborder", "0"), s.getNodesByTagName("iframe")[l].setAttr("scrolling", "no")) : "xiaoe-iframe-video" == s.getNodesByTagName("iframe")[l].getAttr("class") ? (s.getNodesByTagName("iframe")[l].setAttr("width", "100%"), s.getNodesByTagName("iframe")[l].setAttr("frameborder", "0"), s.getNodesByTagName("iframe")[l].setAttr("scrolling", "no"), s.getNodesByTagName("iframe")[l].setAttr("allowfullscreen", "true"), s.getNodesByTagName("iframe")[l].setAttr("webkitallowfullscreen", "true"), s.getNodesByTagName("iframe")[l].setAttr("mozallowfullscreen", "true")) : "xiaoe-iframe-outside" == s.getNodesByTagName("iframe")[l].getAttr("class") && (s.getNodesByTagName("iframe")[l].setAttr("width", "100%"), s.getNodesByTagName("iframe")[l].setAttr("frameborder", "0"), s.getNodesByTagName("iframe")[l].setAttr("scrolling", "no"));
                            if (s.getNodesByTagName("blockquote").length >= 1) for (l = 0; l <= s.getNodesByTagName("blockquote").length - 1; l++) s.getNodesByTagName("blockquote")[l].setAttr("style", "margin: 0px; padding: 0px 10px; border-left: 3px solid rgb(219, 219, 219);");
                            if (s.getNodesByTagName("ol").length >= 1) for (l = 0; l <= s.getNodesByTagName("ol").length - 1; l++) s.getNodesByTagName("ol")[l].attrs && s.getNodesByTagName("ol")[l].attrs.style && -1 === s.getNodesByTagName("ol")[l].attrs.style.indexOf("padding-left") && s.getNodesByTagName("ol")[l].setAttr("style", s.getNodesByTagName("ol")[l].attrs.style + "padding-left:30px;");
                            if (s.getNodesByTagName("ul").length >= 1) for (l = 0; l <= s.getNodesByTagName("ul").length - 1; l++) s.getNodesByTagName("ul")[l].attrs && s.getNodesByTagName("ul")[l].attrs.style && -1 === s.getNodesByTagName("ul")[l].attrs.style.indexOf("padding-left") && s.getNodesByTagName("ul")[l].setAttr("style", s.getNodesByTagName("ul")[l].attrs.style + "padding-left:30px;");
                            if (o.filterInputRule(s), e = s.toHtml(), o.body.innerHTML = (t ? o.body.innerHTML : "") + e, "p" == o.options.enterTag) {
                                var d, c = this.body.firstChild;
                                if (!c || 1 == c.nodeType && (dtd.$cdata[c.tagName] || "DIV" == (r = c).tagName && r.getAttribute("cdata_tag") || domUtils.isCustomeNode(c)) && c === this.body.lastChild) this.body.innerHTML = "<p>" + (browser.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
                                else for (var u = o.document.createElement("p"); c;) {
                                    for (; c && (3 == c.nodeType || 1 == c.nodeType && dtd.p[c.tagName] && !dtd.$cdata[c.tagName]);) d = c.nextSibling,
                                        u.appendChild(c),
                                        c = d;
                                    if (u.firstChild) {
                                        if (!c) {
                                            o.body.appendChild(u);
                                            break
                                        }
                                        c.parentNode.insertBefore(u, c),
                                            u = o.document.createElement("p")
                                    }
                                    c = c.nextSibling
                                }
                            }
                            o.fireEvent("aftersetcontent"),
                                o.fireEvent("contentchange"),
                                !n && o._selectionChange(),
                                o._bakRange = o._bakIERange = o._bakNativeRange = null,
                                browser.gecko && (a = this.selection.getNative()) && a.removeAllRanges(),
                                o.options.autoSyncData && o.form && i(o.form, o)
                        },
                        focus: function (e) {
                            try {
                                var t = this.selection.getRange();
                                if (e) {
                                    (i = this.body.lastChild) && 1 == i.nodeType && !dtd.$empty[i.tagName] && (domUtils.isEmptyBlock(i) ? t.setStartAtFirst(i) : t.setStartAtLast(i), t.collapse(!0)),
                                    t.setCursor(!0)
                                } else {
                                    var i;
                                    if (!t.collapsed && domUtils.isBody(t.startContainer) && 0 == t.startOffset) (i = this.body.firstChild) && 1 == i.nodeType && !dtd.$empty[i.tagName] && t.setStartAtFirst(i).collapse(!0);
                                    t.select(!0)
                                }
                                this.fireEvent("focus selectionchange")
                            } catch (n) { }
                        },
                        isFocus: function () {
                            return this.selection.isFocus()
                        },
                        blur: function () {
                            var e = this.selection.getNative();
                            if (e.empty && browser.ie) {
                                var t = document.body.createTextRange();
                                t.moveToElementText(document.body),
                                    t.collapse(!0),
                                    t.select(),
                                    e.empty()
                            } else e.removeAllRanges()
                        },
                        _initEvents: function () {
                            var e = this,
                                t = e.document,
                                i = e.window;
                            e._proxyDomEvent = utils.bind(e._proxyDomEvent, e),
                                domUtils.on(t, ["click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart"], e._proxyDomEvent),
                                domUtils.on(i, ["focus", "blur"], e._proxyDomEvent),
                                domUtils.on(e.body, "drop", (function (t) {
                                    browser.gecko && t.stopPropagation && t.stopPropagation(),
                                        e.fireEvent("contentchange")
                                })),
                                domUtils.on(t, ["mouseup", "keydown"], (function (t) {
                                    "keydown" == t.type && (t.ctrlKey || t.metaKey || t.altKey) || 2 != t.button && e._selectionChange(250, t)
                                }))
                        },
                        _proxyDomEvent: function (e) {
                            return !1 !== this.fireEvent("before" + e.type.replace(/^on/, "").toLowerCase()) && (!1 !== this.fireEvent(e.type.replace(/^on/, ""), e) && this.fireEvent("after" + e.type.replace(/^on/, "").toLowerCase()))
                        },
                        _selectionChange: function (t, i) {
                            var n, o, r = this,
                                a = !1;
                            browser.ie && browser.version < 9 && i && "mouseup" == i.type && (this.selection.getRange().collapsed || (a = !0, n = i.clientX, o = i.clientY));
                            clearTimeout(e),
                                e = setTimeout((function () {
                                    if (r.selection && r.selection.getNative()) {
                                        var e, t;
                                        if (a && "None" == r.selection.getNative().type) {
                                            e = r.document.body.createTextRange();
                                            try {
                                                e.moveToPoint(n, o)
                                            } catch (s) {
                                                e = null
                                            }
                                        }
                                        e && (t = r.selection.getIERange, r.selection.getIERange = function () {
                                            return e
                                        }),
                                            r.selection.cache(),
                                            t && (r.selection.getIERange = t),
                                            r.selection._cachedRange && r.selection._cachedStartElement && (r.fireEvent("beforeselectionchange"), r.fireEvent("selectionchange", !!i), r.fireEvent("afterselectionchange"), r.selection.clear())
                                    }
                                }), t || 50)
                        },
                        _callCmdFn: function (e, t) {
                            var i, n, o = t[0].toLowerCase();
                            return n = (i = this.commands[o] || UE.commands[o]) && i[e],
                                i && n || "queryCommandState" != e ? n ? n.apply(this, t) : void 0 : 0
                        },
                        execCommand: function (e) {
                            e = e.toLowerCase();
                            var t, i = this,
                                n = i.commands[e] || UE.commands[e];
                            return n && n.execCommand ? (n.notNeedUndo || i.__hasEnterExecCommand ? (t = this._callCmdFn("execCommand", arguments), !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i.fireEvent("contentchange")) : (i.__hasEnterExecCommand = !0, -1 != i.queryCommandState.apply(i, arguments) && (i.fireEvent("saveScene"), i.fireEvent.apply(i, ["beforeexeccommand", e].concat(arguments)), t = this._callCmdFn("execCommand", arguments), i.fireEvent.apply(i, ["afterexeccommand", e].concat(arguments)), i.fireEvent("saveScene")), i.__hasEnterExecCommand = !1), !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i._selectionChange(), t) : null
                        },
                        queryCommandState: function (e) {
                            return this._callCmdFn("queryCommandState", arguments)
                        },
                        queryCommandValue: function (e) {
                            return this._callCmdFn("queryCommandValue", arguments)
                        },
                        hasContents: function (e) {
                            if (e) for (var t, i = 0; t = e[i++];) if (this.document.getElementsByTagName(t).length > 0) return !0;
                            if (!domUtils.isEmptyBlock(this.body)) return !0;
                            for (e = ["div"], i = 0; t = e[i++];) for (var n, o = domUtils.getElementsByTagName(this.document, t), r = 0; n = o[r++];) if (domUtils.isCustomeNode(n)) return !0;
                            return !1
                        },
                        reset: function () {
                            this.fireEvent("reset")
                        },
                        setEnabled: function () {
                            var e, t = this;
                            if ("false" == t.body.contentEditable) {
                                t.body.contentEditable = !0,
                                    e = t.selection.getRange();
                                try {
                                    e.moveToBookmark(t.lastBk),
                                        delete t.lastBk
                                } catch (i) {
                                    e.setStartAtFirst(t.body).collapse(!0)
                                }
                                e.select(!0),
                                    t.bkqueryCommandState && (t.queryCommandState = t.bkqueryCommandState, delete t.bkqueryCommandState),
                                    t.bkqueryCommandValue && (t.queryCommandValue = t.bkqueryCommandValue, delete t.bkqueryCommandValue),
                                    t.fireEvent("selectionchange")
                            }
                        },
                        enable: function () {
                            return this.setEnabled()
                        },
                        setDisabled: function (e) {
                            var t = this;
                            e = e ? utils.isArray(e) ? e : [e] : [],
                                "true" == t.body.contentEditable && (t.lastBk || (t.lastBk = t.selection.getRange().createBookmark(!0)), t.body.contentEditable = !1, t.bkqueryCommandState = t.queryCommandState, t.bkqueryCommandValue = t.queryCommandValue, t.queryCommandState = function (i) {
                                    return - 1 != utils.indexOf(e, i) ? t.bkqueryCommandState.apply(t, arguments) : -1
                                },
                                    t.queryCommandValue = function (i) {
                                        return - 1 != utils.indexOf(e, i) ? t.bkqueryCommandValue.apply(t, arguments) : null
                                    },
                                    t.fireEvent("selectionchange"))
                        },
                        disable: function (e) {
                            return this.setDisabled(e)
                        },
                        _setDefaultContent: function () {
                            function e() {
                                var t = this;
                                t.document.getElementById("initContent") && (t.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", t.removeListener("firstBeforeExecCommand focus", e), setTimeout((function () {
                                    t.focus(),
                                        t._selectionChange()
                                }), 0))
                            }
                            return function (t) {
                                this.body.innerHTML = '<p id="initContent">' + t + "</p>",
                                    this.addListener("firstBeforeExecCommand focus", e)
                            }
                        }(),
                        setShow: function () {
                            var e = this,
                                t = e.selection.getRange();
                            if ("none" == e.container.style.display) {
                                try {
                                    t.moveToBookmark(e.lastBk),
                                        delete e.lastBk
                                } catch (i) {
                                    t.setStartAtFirst(e.body).collapse(!0)
                                }
                                setTimeout((function () {
                                    t.select(!0)
                                }), 100),
                                    e.container.style.display = ""
                            }
                        },
                        show: function () {
                            return this.setShow()
                        },
                        setHide: function () {
                            this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0)),
                                this.container.style.display = "none"
                        },
                        hide: function () {
                            return this.setHide()
                        },
                        getLang: function (e) {
                            var t = UE.I18N[this.options.lang];
                            if (!t) throw Error("not import language file");
                            e = (e || "").split(".");
                            for (var i, n = 0; (i = e[n++]) && (t = t[i]););
                            return t
                        },
                        getContentLength: function (e, t) {
                            var i = this.getContent(!1, !1, !0).length;
                            if (e) {
                                t = (t || []).concat(["hr", "img", "iframe"]),
                                    i = this.getContentTxt().replace(/[\t\r\n]+/g, "").length;
                                for (var n, o = 0; n = t[o++];) i += this.document.getElementsByTagName(n).length
                            }
                            return i
                        },
                        addInputRule: function (e) {
                            this.inputRules.push(e)
                        },
                        filterInputRule: function (e) {
                            for (var t, i = 0; t = this.inputRules[i++];) t.call(this, e)
                        },
                        addOutputRule: function (e) {
                            this.outputRules.push(e)
                        },
                        filterOutputRule: function (e) {
                            for (var t, i = 0; t = this.outputRules[i++];) t.call(this, e)
                        },
                        getActionUrl: function (e) {
                            console.log(1)
                            var t = this.getOpt(e) || e,
                                i = this.getOpt("imageUrl"),
                                n = this.getOpt("serverUrl");
                            if (!n && i && (n = i.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2")), n) {
                                var o = "";
                                return null != document.getElementById("xcx_app_id") && (o = document.getElementById("xcx_app_id").value),
                                    n = n + (- 1 == n.indexOf("?") ? "?" : "&") + "action=" + (t || "") + "&app_id=" + o + "&url_app_id=" + o,
                                    utils.formatUrl(n)
                            }
                            return ""
                        }
                    },
                        utils.inherits(o, EventBase)
                }(),
                UE.Editor.defaultOptions = function (e) {
                    var t = e.options.UEDITOR_HOME_URL;
                    return {
                        isShow: !0,
                        initialContent: "",
                        initialStyle: "",
                        autoClearinitialContent: !1,
                        iframeCssUrl: t + "themes/iframe.evil.css",
                        textarea: "editorValue",
                        focus: !1,
                        focusInEnd: !0,
                        autoClearEmptyNode: !0,
                        fullscreen: !1,
                        readonly: !1,
                        zIndex: 999,
                        imagePopup: !0,
                        enterTag: "p",
                        customDomain: !1,
                        lang: "zh-cn",
                        langPath: t + "lang/",
                        theme: "default",
                        themePath: t + "themes/",
                        allHtmlEnabled: !1,
                        scaleEnabled: !1,
                        tableNativeEditInFF: !1,
                        autoSyncData: !0,
                        fileNameFormat: "{time}{rand:6}"
                    }
                },
                function () {
                    UE.Editor.prototype.loadServerConfig = function () {
                        var me = this;
                        function showErrorMsg(e) {
                            console && console.error(e)
                        }
                        setTimeout((function () {
                            try {
                                console.log(2)
                                me.options.imageUrl && me.setOpt("serverUrl", me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                                var configUrl = me.getActionUrl("config"),
                                    isJsonp = utils.isCrossDomainUrl(configUrl);
                                me._serverConfigLoaded = !1,
                                    configUrl && UE.ajax.request(configUrl, {
                                        method: "GET",
                                        dataType: isJsonp ? "jsonp" : "",
                                        onsuccess: function (r) {
                                            try {
                                                var config = isJsonp ? r : eval("(" + r.responseText + ")");
                                                utils.extend(me.options, config),
                                                    me.fireEvent("serverConfigLoaded"),
                                                    me._serverConfigLoaded = !0
                                            } catch (e) {
                                                showErrorMsg(me.getLang("loadconfigFormatError"))
                                            }
                                        },
                                        onerror: function () {
                                            showErrorMsg(me.getLang("loadconfigHttpError"))
                                        }
                                    })
                            } catch (e) {
                                showErrorMsg(me.getLang("loadconfigError"))
                            }
                        }))
                    },
                        UE.Editor.prototype.isServerConfigLoaded = function () {
                            return this._serverConfigLoaded || !1
                        },
                        UE.Editor.prototype.afterConfigReady = function (e) {
                            if (e && utils.isFunction(e)) {
                                var t = this,
                                    i = function () {
                                        e.apply(t, arguments),
                                            t.removeListener("serverConfigLoaded", i)
                                    };
                                t.isServerConfigLoaded() ? e.call(t, "serverConfigLoaded") : t.addListener("serverConfigLoaded", i)
                            }
                        }
                }(),
                UE.ajax = function () {
                    var e = "XMLHttpRequest()";
                    try {
                        new ActiveXObject("Msxml2.XMLHTTP"),
                            e = "ActiveXObject('Msxml2.XMLHTTP')"
                    } catch (o) {
                        try {
                            new ActiveXObject("Microsoft.XMLHTTP"),
                                e = "ActiveXObject('Microsoft.XMLHTTP')"
                        } catch (o) { }
                    }
                    var t = new Function("return new " + e);
                    function i(e) {
                        var t = [];
                        for (var i in e) if ("method" != i && "timeout" != i && "async" != i && "dataType" != i && "callback" != i && null != e[i] && null != e[i]) if ("function" != (typeof e[i]).toLowerCase() && "object" != (typeof e[i]).toLowerCase()) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                        else if (utils.isArray(e[i])) for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(e[i][n]));
                        return t.join("&")
                    }
                    function n(e, t) {
                        var n, r, a, s = t.onsuccess ||
                            function () { },
                            l = document.createElement("SCRIPT"),
                            d = t || {},
                            c = d.charset,
                            u = d.jsonp || "callback",
                            m = d.timeOut || 0,
                            f = new RegExp("(\\?|&)" + u + "=([^&]*)");
                        utils.isFunction(s) ? (n = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), window[n] = p(0)) : utils.isString(s) ? n = s : (a = f.exec(e)) && (n = a[2]),
                            (e = e.replace(f, "$1" + u + "=" + n)).search(f) < 0 && (e += (e.indexOf("?") < 0 ? "?" : "&") + u + "=" + n);
                        var h = i(t);
                        function p(e) {
                            return function () {
                                try {
                                    if (e) d.onerror && d.onerror();
                                    else try {
                                        clearTimeout(r),
                                            s.apply(window, arguments)
                                    } catch (o) { }
                                } catch (t) {
                                    d.onerror && d.onerror.call(window, t)
                                } finally {
                                    d.oncomplete && d.oncomplete.apply(window, arguments),
                                        l.parentNode && l.parentNode.removeChild(l),
                                        window[n] = null;
                                    try {
                                        delete window[n]
                                    } catch (o) { }
                                }
                            }
                        }
                        utils.isEmptyObject(t.data) || (h += (h ? "&" : "") + i(t.data)),
                            h && (e = e.replace(/\?/, "?" + h + "&")),
                            l.onerror = p(1),
                            m && (r = setTimeout(p(1), m)),
                            function (e, t, i) {
                                e.setAttribute("type", "text/javascript"),
                                    e.setAttribute("defer", "defer"),
                                    i && e.setAttribute("charset", i),
                                    e.setAttribute("src", t),
                                    document.getElementsByTagName("head")[0].appendChild(e)
                            }(l, e, c)
                    }
                    return {
                        request: function (e, o) {
                            o && "jsonp" == o.dataType ? n(e, o) : function (e, n) {
                                var o = t(),
                                    r = !1,
                                    a = {
                                        method: "POST",
                                        timeout: 5e3,
                                        async: !0,
                                        data: {},
                                        onsuccess: function () { },
                                        onerror: function () { }
                                    };
                                if ("object" == typeof e && (e = (n = e).url), o && e) {
                                    var s = n ? utils.extend(a, n) : a,
                                        l = i(s);
                                    utils.isEmptyObject(s.data) || (l += (l ? "&" : "") + i(s.data));
                                    var d = setTimeout((function () {
                                        4 != o.readyState && (r = !0, o.abort(), clearTimeout(d))
                                    }), s.timeout),
                                        c = s.method.toUpperCase(),
                                        u = e + (- 1 == e.indexOf("?") ? "?" : "&") + ("POST" == c ? "" : l + "&noCache=" + +new Date);
                                    o.open(c, u, s.async),
                                        o.onreadystatechange = function () {
                                            4 == o.readyState && (r || 200 != o.status ? s.onerror(o) : s.onsuccess(o))
                                        },
                                        "POST" == c ? (o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(l)) : o.send(null)
                                }
                            }(e, o)
                        },
                        getJSONP: function (e, t, i) {
                            n(e, {
                                data: t,
                                oncomplete: i
                            })
                        }
                    }
                }(),
                UE.cilpbordVersion = null;
        var filterWord = UE.filterWord = function () {
            function e(e) {
                return e = e.replace(/[\d.]+\w+/g, (function (e) {
                    return utils.transUnitToPx(e)
                }))
            }
            return function (t) {
                return /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/.test(t) ?
                    function (t) {
                        var i = t.replace(/[\t\r\n]+/g, " ").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, (function (t) {
                            if (browser.opera) return "";
                            try {
                                if (/Bitmap/i.test(t)) return "";
                                var i = t.match(/width:([ \d.]*p[tx])/i)[1],
                                    n = t.match(/height:([ \d.]*p[tx])/i)[1],
                                    o = t.match(/src=\s*"([^"]*)"/i)[1];
                                return '<img width="' + e(i) + '" height="' + e(n) + '" src="' + o + '" />'
                            } catch (r) {
                                return ""
                            }
                        })).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, (function (e, t, i, n) {
                            return "class" == t && "MsoListParagraph" == n ? e : ""
                        })).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, (function (e, t, i) {
                            return i.replace(/[\t\r\n ]+/g, " ")
                        })).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, (function (t, i, n, o) {
                            for (var r, a = [], s = o.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, (function (e) {
                                return utils.transUnitToPx(e)
                            })).split(/;\s*/g), l = 0; r = s[l]; l++) {
                                var d, c, u = r.split(":");
                                if (2 == u.length) {
                                    if (d = u[0].toLowerCase(), c = u[1].toLowerCase(), /^(background)\w*/.test(d) && 0 == c.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(d) && /^0\w+$/.test(c)) continue;
                                    switch (d) {
                                        case "mso-padding-alt":
                                        case "mso-padding-top-alt":
                                        case "mso-padding-right-alt":
                                        case "mso-padding-bottom-alt":
                                        case "mso-padding-left-alt":
                                        case "mso-margin-alt":
                                        case "mso-margin-top-alt":
                                        case "mso-margin-right-alt":
                                        case "mso-margin-bottom-alt":
                                        case "mso-margin-left-alt":
                                        case "mso-height":
                                        case "mso-width":
                                        case "mso-vertical-align-alt":
                                            /<table/.test(i) || (a[l] = d.replace(/^mso-|-alt$/g, "") + ":" + e(c));
                                            continue;
                                        case "horiz-align":
                                            a[l] = "text-align:" + c;
                                            continue;
                                        case "vert-align":
                                            a[l] = "vertical-align:" + c;
                                            continue;
                                        case "font-color":
                                        case "mso-foreground":
                                            a[l] = "color:" + c;
                                            continue;
                                        case "mso-background":
                                        case "mso-highlight":
                                            a[l] = "background:" + c;
                                            continue;
                                        case "mso-default-height":
                                            a[l] = "min-height:" + e(c);
                                            continue;
                                        case "mso-default-width":
                                            a[l] = "min-width:" + e(c);
                                            continue;
                                        case "mso-padding-between-alt":
                                            a[l] = "border-collapse:separate;border-spacing:" + e(c);
                                            continue;
                                        case "text-line-through":
                                            "single" != c && "double" != c || (a[l] = "text-decoration:line-through");
                                            continue;
                                        case "mso-zero-height":
                                            "yes" == c && (a[l] = "display:none");
                                            continue;
                                        case "margin":
                                            if (!/[1-9]/.test(c)) continue
                                    }
                                    if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(d) || /text\-indent|padding|margin/.test(d) && /\-[\d.]+/.test(c)) continue;
                                    a[l] = d + ":" + u[1]
                                }
                            }
                            return i + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g, ";") + '"' : "")
                        }));
                        return (i.match(/<img[^>]*>/gi) || []).forEach((function (e, t) {
                            var n = "";
                            n = UE.rtfIsEmpty ? e.replace(/src="(file:\/\/\/\/[^"]*)"/gi, "id=img_" + UE.cilpbordVersion + "_" + t) : e.replace(/src="(file:\/\/[^"]*)"/gi, "id=img_" + UE.cilpbordVersion + "_" + t),
                                i = i.replace(e, n)
                        })),
                            i
                    }(t) : t
            }
        }(); !
            function () {
                var e = UE.uNode = function (e) {
                    this.type = e.type,
                        this.data = e.data,
                        this.tagName = e.tagName,
                        this.parentNode = e.parentNode,
                        this.attrs = e.attrs || {},
                        this.children = e.children
                },
                    t = {
                        href: 1,
                        src: 1,
                        _src: 1,
                        _href: 1,
                        cdata_data: 1
                    },
                    i = {
                        style: 1,
                        script: 1
                    };
                function n(e, t, i) {
                    return e.push("\n"),
                        t + (i ? 1 : -1)
                }
                function o(e, t) {
                    for (var i = 0; i < t; i++) e.push("    ")
                }
                function r(e, a, s, l) {
                    switch (e.type) {
                        case "root":
                            for (var d, c = 0; d = e.children[c++];) s && "element" == d.type && !dtd.$inlineWithA[d.tagName] && c > 1 && (n(a, l, !0), o(a, l)),
                                r(d, a, s, l);
                            break;
                        case "text":
                            !
                                function (e, t) {
                                    "pre" == e.parentNode.tagName ? t.push(e.data) : t.push(i[e.parentNode.tagName] ? utils.html(e.data) : e.data.replace(/[ ]{2}/g, " &nbsp;"))
                                }(e, a);
                            break;
                        case "element":
                            !
                                function (e, i, a, s) {
                                    var l = "";
                                    if (e.attrs) {
                                        l = [];
                                        var d = e.attrs;
                                        for (var c in d) l.push(c + (void 0 !== d[c] ? '="' + (t[c] ? utils.html(d[c]).replace(/["]/g, (function (e) {
                                            return "&quot;"
                                        })) : utils.unhtml(d[c])) + '"' : ""));
                                        l = l.join(" ")
                                    }
                                    i.push("<" + e.tagName + (l ? " " + l : "") + (dtd.$empty[e.tagName] ? "/" : "") + ">"),
                                        a && !dtd.$inlineWithA[e.tagName] && "pre" != e.tagName && e.children && e.children.length && (s = n(i, s, !0), o(i, s));
                                    if (e.children && e.children.length) for (var u, m = 0; u = e.children[m++];) a && "element" == u.type && !dtd.$inlineWithA[u.tagName] && m > 1 && (n(i, s), o(i, s)),
                                        r(u, i, a, s);
                                    dtd.$empty[e.tagName] || (a && !dtd.$inlineWithA[e.tagName] && "pre" != e.tagName && e.children && e.children.length && (s = n(i, s), o(i, s)), i.push("</" + e.tagName + ">"))
                                }(e, a, s, l);
                            break;
                        case "comment":
                            !
                                function (e, t) {
                                    t.push("\x3c!--" + e.data + "--\x3e")
                                }(e, a)
                    }
                    return a
                }
                function a(e, t) {
                    var i;
                    if ("element" == e.type && e.getAttr("id") == t) return e;
                    if (e.children && e.children.length) for (var n, o = 0; n = e.children[o++];) if (i = a(n, t)) return i
                }
                function s(e, t, i) {
                    if ("element" == e.type && e.tagName == t && i.push(e), e.children && e.children.length) for (var n, o = 0; n = e.children[o++];) s(n, t, i)
                }
                e.createElement = function (t) {
                    return /[<>]/.test(t) ? UE.htmlparser(t).children[0] : new e({
                        type: "element",
                        children: [],
                        tagName: t
                    })
                },
                    e.createText = function (e, t) {
                        return new UE.uNode({
                            type: "text",
                            data: t ? e : utils.unhtml(e || "")
                        })
                    },
                    e.prototype = {
                        toHtml: function (e) {
                            var t = [];
                            return r(this, t, e, 0),
                                t.join("")
                        },
                        innerHTML: function (e) {
                            if ("element" != this.type || dtd.$empty[this.tagName]) return this;
                            if (utils.isString(e)) {
                                if (this.children) for (var t = 0; i = this.children[t++];) i.parentNode = null;
                                this.children = [];
                                var i, n = UE.htmlparser(e);
                                for (t = 0; i = n.children[t++];) this.children.push(i),
                                    i.parentNode = this;
                                return this
                            }
                            return (n = new UE.uNode({
                                type: "root",
                                children: this.children
                            })).toHtml()
                        },
                        innerText: function (t, i) {
                            if ("element" != this.type || dtd.$empty[this.tagName]) return this;
                            if (t) {
                                if (this.children) for (var n, o = 0; n = this.children[o++];) n.parentNode = null;
                                return this.children = [],
                                    this.appendChild(e.createText(t, i)),
                                    this
                            }
                            return this.toHtml().replace(/<[^>]+>/g, "")
                        },
                        getData: function () {
                            return "element" == this.type ? "" : this.data
                        },
                        firstChild: function () {
                            return this.children ? this.children[0] : null
                        },
                        lastChild: function () {
                            return this.children ? this.children[this.children.length - 1] : null
                        },
                        previousSibling: function () {
                            for (var e, t = this.parentNode,
                                i = 0; e = t.children[i]; i++) if (e === this) return 0 == i ? null : t.children[i - 1]
                        },
                        nextSibling: function () {
                            for (var e, t = this.parentNode,
                                i = 0; e = t.children[i++];) if (e === this) return t.children[i]
                        },
                        replaceChild: function (e, t) {
                            if (this.children) {
                                e.parentNode && e.parentNode.removeChild(e);
                                for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 1, e),
                                    t.parentNode = null,
                                    e.parentNode = this,
                                    e
                            }
                        },
                        appendChild: function (e) {
                            if ("root" == this.type || "element" == this.type && !dtd.$empty[this.tagName]) {
                                this.children || (this.children = []),
                                    e.parentNode && e.parentNode.removeChild(e);
                                for (var t, i = 0; t = this.children[i]; i++) if (t === e) {
                                    this.children.splice(i, 1);
                                    break
                                }
                                return this.children.push(e),
                                    e.parentNode = this,
                                    e
                            }
                        },
                        insertBefore: function (e, t) {
                            if (this.children) {
                                e.parentNode && e.parentNode.removeChild(e);
                                for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 0, e),
                                    e.parentNode = this,
                                    e
                            }
                        },
                        insertAfter: function (e, t) {
                            if (this.children) {
                                e.parentNode && e.parentNode.removeChild(e);
                                for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n + 1, 0, e),
                                    e.parentNode = this,
                                    e
                            }
                        },
                        removeChild: function (e, t) {
                            if (this.children) for (var i, n = 0; i = this.children[n]; n++) if (i === e) {
                                if (this.children.splice(n, 1), i.parentNode = null, t && i.children && i.children.length) for (var o, r = 0; o = i.children[r]; r++) this.children.splice(n + r, 0, o),
                                    o.parentNode = this;
                                return i
                            }
                        },
                        getAttr: function (e) {
                            return this.attrs && this.attrs[e.toLowerCase()]
                        },
                        setAttr: function (e, t) {
                            if (e) if (this.attrs || (this.attrs = {}), utils.isObject(e)) for (var i in e) e[i] ? this.attrs[i.toLowerCase()] = e[i] : delete this.attrs[i];
                            else t ? this.attrs[e.toLowerCase()] = t : delete this.attrs[e];
                            else delete this.attrs
                        },
                        getIndex: function () {
                            for (var e, t = this.parentNode,
                                i = 0; e = t.children[i]; i++) if (e === this) return i;
                            return - 1
                        },
                        getNodeById: function (e) {
                            var t;
                            if (this.children && this.children.length) for (var i, n = 0; i = this.children[n++];) if (t = a(i, e)) return t
                        },
                        getNodesByTagName: function (e) {
                            e = utils.trim(e).replace(/[ ]{2,}/g, " ").split(" ");
                            var t = [],
                                i = this;
                            return utils.each(e, (function (e) {
                                if (i.children && i.children.length) for (var n, o = 0; n = i.children[o++];) s(n, e, t)
                            })),
                                t
                        },
                        getStyle: function (e) {
                            var t = this.getAttr("style");
                            if (!t) return "";
                            var i = new RegExp("(^|;)\\s*" + e + ":([^;]+)", "i"),
                                n = t.match(i);
                            return n && n[0] ? n[2] : ""
                        },
                        setStyle: function (e, t) {
                            function i(e, t) {
                                var i = new RegExp("(^|;)\\s*" + e + ":([^;]+;?)", "gi");
                                n = n.replace(i, "$1"),
                                    t && (n = e + ":" + utils.unhtml(t) + ";" + n)
                            }
                            var n = this.getAttr("style");
                            if (n || (n = ""), utils.isObject(e)) for (var o in e) i(o, e[o]);
                            else i(e, t);
                            this.setAttr("style", utils.trim(n))
                        },
                        traversal: function (e) {
                            return this.children && this.children.length &&
                                function e(t, i) {
                                    if (t.children && t.children.length) for (var n, o = 0; n = t.children[o];) e(n, i),
                                        n.parentNode && (n.children && n.children.length && i(n), n.parentNode && o++);
                                    else i(t)
                                }(this, e),
                                this
                        }
                    }
            }();
        var htmlparser = UE.htmlparser = function (e, t) {
            var i = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
                n = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
                o = {
                    b: 1,
                    code: 1,
                    i: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    span: 1,
                    sub: 1,
                    img: 1,
                    sup: 1,
                    font: 1,
                    big: 1,
                    small: 1,
                    iframe: 1,
                    a: 1,
                    br: 1,
                    pre: 1
                };
            e = e.replace(new RegExp(domUtils.fillChar, "g"), ""),
                t || (e = e.replace(new RegExp("[\\r\\t\\n" + (t ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (t ? "" : " ") + "]*", "g"), (function (e, i) {
                    return i && o[i.toLowerCase()] ? e.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : e.replace(new RegExp("^[\\r\\n" + (t ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (t ? "" : " ") + "]+$"), "")
                })));
            var r = {
                href: 1,
                src: 1
            },
                a = UE.uNode,
                s = {
                    td: "tr",
                    tr: ["tbody", "thead", "tfoot"],
                    tbody: "table",
                    th: "tr",
                    thead: "table",
                    tfoot: "table",
                    caption: "table",
                    li: ["ul", "ol"],
                    dt: "dl",
                    dd: "dl",
                    option: "select"
                },
                l = {
                    ol: "li",
                    ul: "li"
                };
            function d(e, t) {
                if (l[e.tagName]) {
                    var i = a.createElement(l[e.tagName]);
                    e.appendChild(i),
                        i.appendChild(a.createText(t)),
                        e = i
                } else e.appendChild(a.createText(t))
            }
            function c(e, t, i) {
                var o;
                if (o = s[t]) {
                    for (var l, d = e;
                        "root" != d.type;) {
                        if (utils.isArray(o) ? -1 != utils.indexOf(o, d.tagName) : o == d.tagName) {
                            e = d,
                                l = !0;
                            break
                        }
                        d = d.parentNode
                    }
                    l || (e = c(e, utils.isArray(o) ? o[0] : o))
                }
                var u = new a({
                    parentNode: e,
                    type: "element",
                    tagName: t.toLowerCase(),
                    children: dtd.$empty[t] ? null : []
                });
                if (i) {
                    for (var m, f = {}; m = n.exec(i);) f[m[1].toLowerCase()] = r[m[1].toLowerCase()] ? m[2] || m[3] || m[4] : utils.unhtml(m[2] || m[3] || m[4]);
                    u.attrs = f
                }
                return e.children.push(u),
                    dtd.$empty[t] ? e : u
            }
            for (var u, m, f, h = 0,
                p = 0,
                g = new a({
                    type: "root",
                    children: []
                }), b = g; u = i.exec(e);) {
                h = u.index;
                try {
                    if (h > p && d(b, e.slice(p, h)), u[3]) dtd.$cdata[b.tagName] ? d(b, u[0]) : b = c(b, u[3].toLowerCase(), u[4]);
                    else if (u[1]) {
                        if ("root" != b.type) if (dtd.$cdata[b.tagName] && !dtd.$cdata[u[1]]) d(b, u[0]);
                        else {
                            for (var v = b;
                                "element" == b.type && b.tagName != u[1].toLowerCase();) if ("root" == (b = b.parentNode).type) throw b = v,
                                    "break";
                            b = b.parentNode
                        }
                    } else u[2] && (m = b, f = u[2], m.children.push(new a({
                        type: "comment",
                        data: f,
                        parentNode: m
                    })))
                } catch (y) { }
                p = i.lastIndex
            }
            return p < e.length && d(b, e.slice(p)),
                g
        },
            filterNode = UE.filterNode = function () {
                function e(t, i) {
                    switch (t.type) {
                        case "text":
                            break;
                        case "element":
                            var n;
                            if (n = i[t.tagName]) if ("-" === n) t.parentNode.removeChild(t);
                            else if (utils.isFunction(n)) {
                                var o = t.parentNode,
                                    r = t.getIndex();
                                if (n(t), t.parentNode) {
                                    if (t.children) for (var a = 0; m = t.children[a];) e(m, i),
                                        m.parentNode && a++
                                } else for (a = r; m = o.children[a];) e(m, i),
                                    m.parentNode && a++
                            } else {
                                var s = n.$;
                                if (s && t.attrs) {
                                    var l, d = {};
                                    for (var c in s) {
                                        if (l = t.getAttr(c), "style" == c && utils.isArray(s[c])) {
                                            var u = [];
                                            utils.each(s[c], (function (e) {
                                                var i; (i = t.getStyle(e)) && u.push(e + ":" + i)
                                            })),
                                                l = u.join(";")
                                        }
                                        l && (d[c] = l)
                                    }
                                    t.attrs = d
                                }
                                if (t.children) for (a = 0; m = t.children[a];) e(m, i),
                                    m.parentNode && a++
                            } else if (dtd.$cdata[t.tagName]) t.parentNode.removeChild(t);
                            else {
                                o = t.parentNode,
                                    r = t.getIndex();
                                t.parentNode.removeChild(t, !0);
                                var m;
                                for (a = r; m = o.children[a];) e(m, i),
                                    m.parentNode && a++
                            }
                            break;
                        case "comment":
                            t.parentNode.removeChild(t)
                    }
                }
                return function (t, i) {
                    if (utils.isEmptyObject(i)) return t;
                    var n; (n = i["-"]) && utils.each(n.split(" "), (function (e) {
                        i[e] = "-"
                    }));
                    for (var o, r = 0; o = t.children[r];) e(o, i),
                        o.parentNode && r++;
                    return t
                }
            }(),
            _plugins;
        UE.plugin = (_plugins = {},
        {
            register: function (e, t, i, n) {
                i && utils.isFunction(i) && (n = i, i = null),
                    _plugins[e] = {
                        optionName: i || e,
                        execFn: t,
                        afterDisabled: n
                    }
            },
            load: function (e) {
                utils.each(_plugins, (function (t) {
                    var i = t.execFn.call(e); !1 !== e.options[t.optionName] ? i && utils.each(i, (function (t, i) {
                        switch (i.toLowerCase()) {
                            case "shortcutkey":
                                e.addshortcutkey(t);
                                break;
                            case "bindevents":
                                utils.each(t, (function (t, i) {
                                    e.addListener(i, t)
                                }));
                                break;
                            case "bindmultievents":
                                utils.each(utils.isArray(t) ? t : [t], (function (t) {
                                    var i = utils.trim(t.type).split(/\s+/);
                                    utils.each(i, (function (i) {
                                        e.addListener(i, t.handler)
                                    }))
                                }));
                                break;
                            case "commands":
                                utils.each(t, (function (t, i) {
                                    e.commands[i] = t
                                }));
                                break;
                            case "outputrule":
                                e.addOutputRule(t);
                                break;
                            case "inputrule":
                                e.addInputRule(t);
                                break;
                            case "defaultoptions":
                                e.setOpt(t)
                        }
                    })) :
                        t.afterDisabled && t.afterDisabled.call(e)
                })),
                    utils.each(UE.plugins, (function (t) {
                        t.call(e)
                    }))
            },
            run: function (e, t) {
                var i = _plugins[e];
                i && i.exeFn.call(t)
            }
        });
        var keymap = UE.keymap = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            Shift: 16,
            Control: 17,
            Alt: 18,
            CapsLock: 20,
            Esc: 27,
            Spacebar: 32,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            Insert: 45,
            Del: 46,
            NumLock: 144,
            Cmd: 91,
            "=": 187,
            "-": 189,
            b: 66,
            i: 73,
            z: 90,
            y: 89,
            v: 86,
            x: 88,
            s: 83,
            n: 78
        },
            LocalStorage = UE.LocalStorage = (storage = window.localStorage || (container = document.createElement("div"), container.style.display = "none", container.addBehavior ? (container.addBehavior("#default#userdata"), {
                getItem: function (e) {
                    var t = null;
                    try {
                        document.body.appendChild(container),
                            container.load("localStorage"),
                            t = container.getAttribute(e),
                            document.body.removeChild(container)
                    } catch (i) { }
                    return t
                },
                setItem: function (e, t) {
                    document.body.appendChild(container),
                        container.setAttribute(e, t),
                        container.save("localStorage"),
                        document.body.removeChild(container)
                },
                removeItem: function (e) {
                    document.body.appendChild(container),
                        container.removeAttribute(e),
                        container.save("localStorage"),
                        document.body.removeChild(container)
                }
            }) : null) || null, {
                saveLocalData: function (e, t) {
                    return !(!storage || !t || (storage.setItem(e, t), 0))
                },
                getLocalData: function (e) {
                    return storage ? storage.getItem(e) : null
                },
                removeItem: function (e) {
                    storage && storage.removeItem(e)
                }
            }),
            container,
            storage,
            ROOTKEY,
            block,
            getObj,
            sourceEditors,
            UETable;
        ROOTKEY = "ueditor_preference",
            UE.Editor.prototype.setPreferences = function (e, t) {
                var i = {};
                utils.isString(e) ? i[e] = t : i = e;
                var n = LocalStorage.getLocalData(ROOTKEY);
                n && (n = utils.str2json(n)) ? utils.extend(n, i) : n = i,
                    n && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(n))
            },
            UE.Editor.prototype.getPreferences = function (e) {
                var t = LocalStorage.getLocalData(ROOTKEY);
                return t && (t = utils.str2json(t)) ? e ? t[e] : t : null
            },
            UE.Editor.prototype.removePreferences = function (e) {
                var t = LocalStorage.getLocalData(ROOTKEY);
                t && (t = utils.str2json(t)) && (t[e] = void 0, delete t[e]),
                    t && LocalStorage.saveLocalData(ROOTKEY, utils.json2str(t))
            },
            UE.plugins.defaultfilter = function () {
                var e = this;
                e.setOpt({
                    allowDivTransToP: !0,
                    disabledTableInTable: !0
                }),
                    e.addInputRule((function (t) {
                        var i, n = this.options.allowDivTransToP;
                        t.traversal((function (t) {
                            if ("element" == t.type) {
                                if (!dtd.$cdata[t.tagName] && e.options.autoClearEmptyNode && dtd.$inline[t.tagName] && !dtd.$empty[t.tagName] && (!t.attrs || utils.isEmptyObject(t.attrs))) return void (t.firstChild() ? "span" != t.tagName || t.attrs && !utils.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t));
                                switch (t.tagName) {
                                    case "style":
                                    case "script":
                                        t.setAttr({
                                            cdata_tag:
                                                t.tagName,
                                            cdata_data: t.innerHTML() || "",
                                            _ue_custom_node_: "true"
                                        }),
                                            t.tagName = "div",
                                            t.innerHTML("");
                                        break;
                                    case "a":
                                        (i = t.getAttr("href")) && t.setAttr("_href", i);
                                        break;
                                    case "img":
                                        if ((i = t.getAttr("src")) && /^data:/.test(i)) {
                                            t.parentNode.removeChild(t);
                                            break
                                        }
                                        t.setAttr("_src", t.getAttr("src"));
                                        break;
                                    case "span":
                                        browser.webkit && (i = t.getStyle("white-space")) && /nowrap|normal/.test(i) && (t.setStyle("white-space", ""), e.options.autoClearEmptyNode && utils.isEmptyObject(t.attrs) && t.parentNode.removeChild(t, !0)),
                                            (i = t.getAttr("id")) && /^_baidu_bookmark_/i.test(i) && t.parentNode.removeChild(t);
                                        break;
                                    case "p":
                                        (i = t.getAttr("align")) && (t.setAttr("align"), t.setStyle("text-align", i)),
                                            utils.each(t.children, (function (e) {
                                                if ("element" == e.type && "p" == e.tagName) {
                                                    var i = e.nextSibling();
                                                    t.parentNode.insertAfter(e, t);
                                                    for (var n = e; i;) {
                                                        var o = i.nextSibling();
                                                        t.parentNode.insertAfter(i, n),
                                                            n = i,
                                                            i = o
                                                    }
                                                    return !1
                                                }
                                            })),
                                            t.firstChild() || t.innerHTML(browser.ie ? "&nbsp;" : "<br/>");
                                        break;
                                    case "div":
                                        if (t.getAttr("cdata_tag")) break;
                                        if ((i = t.getAttr("class")) && /^line number\d+/.test(i)) break;
                                        if (!n) break;
                                        for (var o, r = UE.uNode.createElement("p"); o = t.firstChild();)"text" != o.type && UE.dom.dtd.$block[o.tagName] ? r.firstChild() ? (t.parentNode.insertBefore(r, t), r = UE.uNode.createElement("p")) : t.parentNode.insertBefore(o, t) : r.appendChild(o);
                                        r.firstChild() && t.parentNode.insertBefore(r, t),
                                            t.parentNode.removeChild(t);
                                        break;
                                    case "dl":
                                        t.tagName = "ul";
                                        break;
                                    case "dt":
                                    case "dd":
                                        t.tagName = "li";
                                        break;
                                    case "li":
                                        var a = t.getAttr("class");
                                        a && /list\-/.test(a) || t.setAttr();
                                        var s = t.getNodesByTagName("ol ul");
                                        UE.utils.each(s, (function (e) {
                                            t.parentNode.insertAfter(e, t)
                                        }));
                                        break;
                                    case "td":
                                    case "th":
                                    case "caption":
                                        t.children && t.children.length || t.appendChild(browser.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
                                        break;
                                    case "table":
                                        e.options.disabledTableInTable &&
                                            function (e) {
                                                for (; e && "element" == e.type;) {
                                                    if ("td" == e.tagName) return !0;
                                                    e = e.parentNode
                                                }
                                                return !1
                                            }(t) && (t.parentNode.insertBefore(UE.uNode.createText(t.innerText()), t), t.parentNode.removeChild(t))
                                }
                            }
                        }))
                    })),
                    e.addOutputRule((function (t) {
                        var i;
                        t.traversal((function (t) {
                            if ("element" == t.type) {
                                if (e.options.autoClearEmptyNode && dtd.$inline[t.tagName] && !dtd.$empty[t.tagName] && (!t.attrs || utils.isEmptyObject(t.attrs))) return void (t.firstChild() ? "span" != t.tagName || t.attrs && !utils.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t));
                                switch (t.tagName) {
                                    case "div":
                                        (i = t.getAttr("cdata_tag")) && (t.tagName = i, t.appendChild(UE.uNode.createText(t.getAttr("cdata_data"))), t.setAttr({
                                            cdata_tag: "",
                                            cdata_data: "",
                                            _ue_custom_node_: ""
                                        }));
                                        break;
                                    case "a":
                                        (i = t.getAttr("_href")) && t.setAttr({
                                            href: utils.html(i),
                                            _href: ""
                                        });
                                        break;
                                    case "span":
                                        (i = t.getAttr("id")) && /^_baidu_bookmark_/i.test(i) && t.parentNode.removeChild(t);
                                        break;
                                    case "img":
                                        (i = t.getAttr("_src")) && t.setAttr({
                                            src: t.getAttr("_src"),
                                            _src: ""
                                        })
                                }
                            }
                        }))
                    }))
            },
            UE.commands.inserthtml = {
                execCommand: function (e, t, i) {
                    var n, o, r = this;
                    if (t && !0 !== r.fireEvent("beforeinserthtml", t)) {
                        if ((o = (n = r.selection.getRange()).document.createElement("div")).style.display = "inline", !i) {
                            var a = UE.htmlparser(t);
                            r.options.filterRules && UE.filterNode(a, r.options.filterRules),
                                r.filterInputRule(a),
                                t = a.toHtml()
                        }
                        if (o.innerHTML = utils.trim(t), !n.collapsed) {
                            var s = n.startContainer;
                            if (domUtils.isFillChar(s) && n.setStartBefore(s), s = n.endContainer, domUtils.isFillChar(s) && n.setEndAfter(s), n.txtToElmBoundary(), n.endContainer && 1 == n.endContainer.nodeType && (s = n.endContainer.childNodes[n.endOffset]) && domUtils.isBr(s) && n.setEndAfter(s), 0 == n.startOffset && (s = n.startContainer, domUtils.isBoundaryNode(s, "firstChild") && (s = n.endContainer, n.endOffset == (3 == s.nodeType ? s.nodeValue.length : s.childNodes.length) && domUtils.isBoundaryNode(s, "lastChild") && (r.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", n.setStart(r.body.firstChild, 0).collapse(!0)))), !n.collapsed && n.deleteContents(), 1 == n.startContainer.nodeType) if ((l = n.startContainer.childNodes[n.startOffset]) && domUtils.isBlockElm(l) && (b = l.previousSibling) && domUtils.isBlockElm(b)) {
                                for (n.setEnd(b, b.childNodes.length).collapse(); l.firstChild;) b.appendChild(l.firstChild);
                                domUtils.remove(l)
                            }
                        }
                        var l, d, c, u, m = 0;
                        n.inFillChar() && (l = n.startContainer, domUtils.isFillChar(l) ? (n.setStartBefore(l).collapse(!0), domUtils.remove(l)) : domUtils.isFillChar(l, !0) && (l.nodeValue = l.nodeValue.replace(fillCharReg, ""), n.startOffset--, n.collapsed && n.collapse(!0)));
                        var f = domUtils.findParentByTagName(n.startContainer, "li", !0);
                        if (f) {
                            for (var h; l = o.firstChild;) {
                                for (; l && (3 == l.nodeType || !domUtils.isBlockElm(l) || "HR" == l.tagName);) v = l.nextSibling,
                                    n.insertNode(l).collapse(),
                                    h = l,
                                    l = v;
                                if (l) if (/^(ol|ul)$/i.test(l.tagName)) {
                                    for (; l.firstChild;) h = l.firstChild,
                                        domUtils.insertAfter(f, l.firstChild),
                                        f = f.nextSibling;
                                    domUtils.remove(l)
                                } else {
                                    var p;
                                    v = l.nextSibling,
                                        p = r.document.createElement("li"),
                                        domUtils.insertAfter(f, p),
                                        p.appendChild(l),
                                        h = l,
                                        l = v,
                                        f = p
                                }
                            }
                            f = domUtils.findParentByTagName(n.startContainer, "li", !0),
                                domUtils.isEmptyBlock(f) && domUtils.remove(f),
                                h && n.setStartAfter(h).collapse(!0).select(!0)
                        } else {
                            for (; l = o.firstChild;) {
                                if (m) {
                                    for (var g = r.document.createElement("p"); l && (3 == l.nodeType || !dtd.$block[l.tagName]);) u = l.nextSibling,
                                        g.appendChild(l),
                                        l = u;
                                    g.firstChild && (l = g)
                                }
                                if (n.insertNode(l), u = l.nextSibling, !m && l.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm(l) && (d = domUtils.findParent(l, (function (e) {
                                    return domUtils.isBlockElm(e)
                                }))) && "body" != d.tagName.toLowerCase() && (!dtd[d.tagName][l.nodeName] || l.parentNode !== d)) {
                                    if (dtd[d.tagName][l.nodeName]) for (c = l.parentNode; c !== d;) b = c,
                                        c = c.parentNode;
                                    else b = d;
                                    domUtils.breakParent(l, b || c);
                                    var b = l.previousSibling;
                                    domUtils.trimWhiteTextNode(b),
                                        b.childNodes.length || domUtils.remove(b),
                                        !browser.ie && (v = l.nextSibling) && domUtils.isBlockElm(v) && v.lastChild && !domUtils.isBr(v.lastChild) && v.appendChild(r.document.createElement("br")),
                                        m = 1
                                }
                                var v = l.nextSibling;
                                if (!o.firstChild && v && domUtils.isBlockElm(v)) {
                                    n.setStart(v, 0).collapse(!0);
                                    break
                                }
                                n.setEndAfter(l).collapse()
                            }
                            if (l = n.startContainer, u && domUtils.isBr(u) && domUtils.remove(u), domUtils.isBlockElm(l) && domUtils.isEmptyNode(l)) if (u = l.nextSibling) domUtils.remove(l),
                                1 == u.nodeType && dtd.$block[u.tagName] && n.setStart(u, 0).collapse(!0).shrinkBoundary();
                            else try {
                                l.innerHTML = browser.ie ? domUtils.fillChar : "<br/>"
                            } catch (y) {
                                n.setStartBefore(l),
                                    domUtils.remove(l)
                            }
                            try {
                                n.select(!0)
                            } catch (y) { }
                        }
                        setTimeout((function () {
                            (n = r.selection.getRange()).scrollToView(r.autoHeightEnabled, r.autoHeightEnabled ? domUtils.getXY(r.iframe).y : 0),
                            r.fireEvent("afterinserthtml", t)
                        }), 200)
                    }
                }
            },
            UE.plugins.autotypeset = function () {
                this.setOpt({
                    autotypeset: {
                        mergeEmptyline: !0,
                        removeClass: !0,
                        removeEmptyline: !1,
                        textAlign: "left",
                        imageBlockLine: "center",
                        pasteFilter: !1,
                        clearFontSize: !1,
                        clearFontFamily: !1,
                        removeEmptyNode: !1,
                        removeTagNames: utils.extend({
                            div: 1
                        },
                            dtd.$removeEmpty),
                        indent: !1,
                        indentValue: "2em",
                        bdc2sb: !1,
                        tobdc: !1
                    }
                });
                var e, t = this,
                    i = t.options.autotypeset,
                    n = {
                        selectTdClass: 1,
                        pagebreak: 1,
                        anchorclass: 1
                    },
                    o = {
                        li: 1
                    },
                    r = {
                        div: 1,
                        p: 1,
                        blockquote: 1,
                        center: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        span: 1
                    };
                i && (e = t.getPreferences("autotypeset"), utils.extend(t.options.autotypeset, e), i.pasteFilter && t.addListener("beforepaste", l), t.commands.autotypeset = {
                    execCommand: function () {
                        t.removeListener("beforepaste", l),
                            i.pasteFilter && t.addListener("beforepaste", l),
                            l.call(t)
                    }
                });
                function a(e, t) {
                    return e && 3 != e.nodeType ? domUtils.isBr(e) ? 1 : e && e.parentNode && r[e.tagName.toLowerCase()] ? e.getAttribute("pagebreak") ? 0 : t ? !domUtils.isEmptyBlock(e) : domUtils.isEmptyBlock(e, new RegExp("[\\s" + domUtils.fillChar + "]", "g")) : void 0 : 0
                }
                function s(e) {
                    e.style.cssText || (domUtils.removeAttributes(e, ["style"]), "span" == e.tagName.toLowerCase() && domUtils.hasNoAttributes(e) && domUtils.remove(e, !0))
                }
                function l(e, t) {
                    var r, l = this;
                    if (t) {
                        if (!i.pasteFilter) return; (r = l.document.createElement("div")).innerHTML = t.html
                    } else r = l.document.body;
                    for (var d, c, u = domUtils.getElementsByTagName(r, "*"), m = 0; d = u[m++];) if (!0 !== l.fireEvent("excludeNodeinautotype", d)) {
                        if (i.clearFontSize && d.style.fontSize && (domUtils.removeStyle(d, "font-size"), s(d)), i.clearFontFamily && d.style.fontFamily && (domUtils.removeStyle(d, "font-family"), s(d)), a(d)) {
                            if (i.mergeEmptyline) for (var f = d.nextSibling,
                                h = domUtils.isBr(d); a(f) && (f = (g = f).nextSibling, !h || f && (!f || domUtils.isBr(f)));) domUtils.remove(g);
                            if (i.removeEmptyline && domUtils.inDoc(d, r) && !o[d.parentNode.tagName.toLowerCase()]) {
                                if (domUtils.isBr(d) && (f = d.nextSibling) && !domUtils.isBr(f)) continue;
                                domUtils.remove(d);
                                continue
                            }
                        }
                        if (a(d, !0) && "SPAN" != d.tagName && (i.indent && (d.style.textIndent = i.indentValue), i.textAlign && (d.style.textAlign = i.textAlign)), i.removeClass && d.className && !n[d.className.toLowerCase()] && domUtils.removeAttributes(d, ["class"]), i.imageBlockLine && "img" == d.tagName.toLowerCase() && !d.getAttribute("emotion")) if (t) {
                            var p = d;
                            switch (i.imageBlockLine) {
                                case "left":
                                case "right":
                                case "none":
                                    for (var g, b, v = p.parentNode; dtd.$inline[v.tagName] || "A" == v.tagName;) v = v.parentNode;
                                    if ("P" == (g = v).tagName && "center" == domUtils.getStyle(g, "text-align") && !domUtils.isBody(g) && 1 == domUtils.getChildCount(g, (function (e) {
                                        return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                                    }))) if (b = g.previousSibling, f = g.nextSibling, b && f && 1 == b.nodeType && 1 == f.nodeType && b.tagName == f.tagName && domUtils.isBlockElm(b)) {
                                        for (b.appendChild(g.firstChild); f.firstChild;) b.appendChild(f.firstChild);
                                        domUtils.remove(g),
                                            domUtils.remove(f)
                                    } else domUtils.setStyle(g, "text-align", "");
                                    domUtils.setStyle(p, "float", i.imageBlockLine);
                                    break;
                                case "center":
                                    if ("center" != l.queryCommandValue("imagefloat")) {
                                        for (v = p.parentNode, domUtils.setStyle(p, "float", "none"), g = p; v && 1 == domUtils.getChildCount(v, (function (e) {
                                            return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                                        })) && (dtd.$inline[v.tagName] || "A" == v.tagName);) g = v,
                                            v = v.parentNode;
                                        var y = l.document.createElement("p");
                                        domUtils.setAttributes(y, {
                                            style: "text-align:center"
                                        }),
                                            g.parentNode.insertBefore(y, g),
                                            y.appendChild(g),
                                            domUtils.setStyle(g, "float", "")
                                    }
                            }
                        } else {
                            l.selection.getRange().selectNode(d).select(),
                                l.execCommand("imagefloat", i.imageBlockLine)
                        }
                        i.removeEmptyNode && i.removeTagNames[d.tagName.toLowerCase()] && domUtils.hasNoAttributes(d) && domUtils.isEmptyBlock(d) && domUtils.remove(d)
                    }
                    i.tobdc && ((c = UE.htmlparser(r.innerHTML)).traversal((function (e) {
                        "text" == e.type && (e.data = function (e) {
                            e = utils.html(e);
                            for (var t = "",
                                i = 0; i < e.length; i++) 32 == e.charCodeAt(i) ? t += String.fromCharCode(12288) : e.charCodeAt(i) < 127 ? t += String.fromCharCode(e.charCodeAt(i) + 65248) : t += e.charAt(i);
                            return t
                        }(e.data))
                    })), r.innerHTML = c.toHtml());
                    i.bdc2sb && ((c = UE.htmlparser(r.innerHTML)).traversal((function (e) {
                        "text" == e.type && (e.data = function (e) {
                            for (var t = "",
                                i = 0; i < e.length; i++) {
                                var n = e.charCodeAt(i);
                                t += n >= 65281 && n <= 65373 ? String.fromCharCode(e.charCodeAt(i) - 65248) : 12288 == n ? String.fromCharCode(e.charCodeAt(i) - 12288 + 32) : e.charAt(i)
                            }
                            return t
                        }(e.data))
                    })), r.innerHTML = c.toHtml());
                    t && (t.html = r.innerHTML)
                }
            },
            UE.plugin.register("autosubmit", (function () {
                return {
                    shortcutkey: {
                        autosubmit: "ctrl+13"
                    },
                    commands: {
                        autosubmit: {
                            execCommand: function () {
                                var e = domUtils.findParentByTagName(this.iframe, "form", !1);
                                if (e) {
                                    if (!1 === this.fireEvent("beforesubmit")) return;
                                    this.sync(),
                                        e.submit()
                                }
                            }
                        }
                    }
                }
            })),
            UE.plugin.register("background", (function () {
                var e, t = this,
                    i = "editor_background",
                    n = new RegExp("body[\\s]*\\{(.+)\\}", "i");
                function o(e) {
                    var t = {},
                        i = e.split(";");
                    return utils.each(i, (function (e) {
                        var i = e.indexOf(":"),
                            n = utils.trim(e.substr(0, i)).toLowerCase();
                        n && (t[n] = utils.trim(e.substr(i + 1) || ""))
                    })),
                        t
                }
                function r(e) {
                    if (e) {
                        var n = [];
                        for (var o in e) e.hasOwnProperty(o) && n.push(o + ":" + e[o] + "; ");
                        utils.cssRule(i, n.length ? "body{" + n.join("") + "}" : "", t.document)
                    } else utils.cssRule(i, "", t.document)
                }
                var a = t.hasContents;
                return t.hasContents = function () {
                    return !!t.queryCommandValue("background") || a.apply(t, arguments)
                },
                {
                    bindEvents: {
                        getAllHtml: function (e, i) {
                            var n = this.body,
                                o = domUtils.getComputedStyle(n, "background-image"),
                                r = "";
                            r = o.indexOf(t.options.imagePath) > 0 ? o.substring(o.indexOf(t.options.imagePath), o.length - 1).replace(/"|\(|\)/gi, "") : "none" != o ? o.replace(/url\("?|"?\)/gi, "") : "";
                            var a = '<style type="text/css">body{',
                                s = {
                                    "background-color": domUtils.getComputedStyle(n, "background-color") || "#ffffff",
                                    "background-image": r ? "url(" + r + ")" : "",
                                    "background-repeat": domUtils.getComputedStyle(n, "background-repeat") || "",
                                    "background-position": browser.ie ? domUtils.getComputedStyle(n, "background-position-x") + " " + domUtils.getComputedStyle(n, "background-position-y") : domUtils.getComputedStyle(n, "background-position"),
                                    height: domUtils.getComputedStyle(n, "height")
                                };
                            for (var l in s) s.hasOwnProperty(l) && (a += l + ":" + s[l] + "; ");
                            a += "}</style> ",
                                i.push(a)
                        },
                        aftersetcontent: function () {
                            0 == e && r()
                        }
                    },
                    inputRule: function (t) {
                        e = !1,
                            utils.each(t.getNodesByTagName("p"), (function (t) {
                                var i = t.getAttr("data-background");
                                i && (e = !0, r(o(i)), t.parentNode.removeChild(t))
                            }))
                    },
                    outputRule: function (e) {
                        var t = (utils.cssRule(i, this.document) || "").replace(/[\n\r]+/g, "").match(n);
                        t && e.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + utils.trim(t[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
                    },
                    commands: {
                        background: {
                            execCommand: function (e, t) {
                                r(t)
                            },
                            queryCommandValue: function () {
                                var e = (utils.cssRule(i, this.document) || "").replace(/[\n\r]+/g, "").match(n);
                                return e ? o(e[1]) : null
                            },
                            notNeedUndo: !0
                        }
                    }
                }
            })),
            UE.commands.imagefloat = {
                execCommand: function (e, t) {
                    var i = this,
                        n = i.selection.getRange();
                    if (!n.collapsed) {
                        var o = n.getClosedNode();
                        if (o && "IMG" == o.tagName) switch (t) {
                            case "left":
                            case "right":
                            case "none":
                                for (var r, a, s, l = o.parentNode; dtd.$inline[l.tagName] || "A" == l.tagName;) l = l.parentNode;
                                if ("P" == (r = l).tagName && "center" == domUtils.getStyle(r, "text-align")) {
                                    if (!domUtils.isBody(r) && 1 == domUtils.getChildCount(r, (function (e) {
                                        return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                                    }))) if (a = r.previousSibling, s = r.nextSibling, a && s && 1 == a.nodeType && 1 == s.nodeType && a.tagName == s.tagName && domUtils.isBlockElm(a)) {
                                        for (a.appendChild(r.firstChild); s.firstChild;) a.appendChild(s.firstChild);
                                        domUtils.remove(r),
                                            domUtils.remove(s)
                                    } else domUtils.setStyle(r, "text-align", "");
                                    n.selectNode(o).select()
                                }
                                domUtils.setStyle(o, "float", "none" == t ? "" : t),
                                    "none" == t && domUtils.removeAttributes(o, "align");
                                break;
                            case "center":
                                if ("center" != i.queryCommandValue("imagefloat")) {
                                    for (l = o.parentNode, domUtils.setStyle(o, "float", ""), domUtils.removeAttributes(o, "align"), r = o; l && 1 == domUtils.getChildCount(l, (function (e) {
                                        return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                                    })) && (dtd.$inline[l.tagName] || "A" == l.tagName);) r = l,
                                        l = l.parentNode;
                                    n.setStartBefore(r).setCursor(!1),
                                        (l = i.document.createElement("div")).appendChild(r),
                                        domUtils.setStyle(r, "float", ""),
                                        i.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + l.innerHTML + "</p>"),
                                        (r = i.document.getElementById("_img_parent_tmp")).removeAttribute("id"),
                                        r = r.firstChild,
                                        n.selectNode(r).select(),
                                        (s = r.parentNode.nextSibling) && domUtils.isEmptyNode(s) && domUtils.remove(s)
                                }
                        }
                    }
                },
                queryCommandValue: function () {
                    var e, t, i = this.selection.getRange();
                    return i.collapsed ? "none" : (e = i.getClosedNode()) && 1 == e.nodeType && "IMG" == e.tagName ? ("none" == (t = domUtils.getComputedStyle(e, "float") || e.getAttribute("align")) && (t = "center" == domUtils.getComputedStyle(e.parentNode, "text-align") ? "center" : t), {
                        left: 1,
                        right: 1,
                        center: 1
                    }[t] ? t : "none") : "none"
                },
                queryCommandState: function () {
                    var e, t = this.selection.getRange();
                    return t.collapsed ? -1 : (e = t.getClosedNode()) && 1 == e.nodeType && "IMG" == e.tagName ? 0 : -1
                }
            },
            UE.commands.insertimage = {
                execCommand: function (e, t) {
                    if ((t = utils.isArray(t) ? t : [t]).length) {
                        var i = this,
                            n = i.selection.getRange(),
                            o = n.getClosedNode();
                        if (!0 !== i.fireEvent("beforeinsertimage", t)) {
                            if (!o || !/img/i.test(o.tagName) || "edui-faked-video" == o.className && -1 == o.className.indexOf("edui-upload-video") || o.getAttribute("word_img")) {
                                var r, a = [],
                                    s = "";
                                if (r = t[0], 1 == t.length) u(r),
                                    s = '<img src="' + r.src + '" ' + (r._src ? ' _src="' + r._src + '" ' : "") + (r.width ? 'width="' + r.width + '" ' : "") + (r.height ? ' height="' + r.height + '" ' : "") + ("left" == r.floatStyle || "right" == r.floatStyle ? ' style="float:' + r.floatStyle + ';"' : "") + (r.title && "" != r.title ? ' title="' + r.title + '"' : "") + (r.border && "0" != r.border ? ' border="' + r.border + '"' : "") + (r.alt && "" != r.alt ? ' alt="' + r.alt + '"' : "") + (r.hspace && "0" != r.hspace ? ' hspace = "' + r.hspace + '"' : "") + (r.vspace && "0" != r.vspace ? ' vspace = "' + r.vspace + '"' : "") + "/>",
                                    "center" == r.floatStyle && (s = '<p style="text-align: center">' + s + "</p>"),
                                    a.push(s);
                                else for (var l = 0; r = t[l++];) u(r),
                                    s = "<p " + ("center" == r.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + r.src + '" ' + (r.width ? 'width="' + r.width + '" ' : "") + (r._src ? ' _src="' + r._src + '" ' : "") + (r.height ? ' height="' + r.height + '" ' : "") + ' style="' + (r.floatStyle && "center" != r.floatStyle ? "float:" + r.floatStyle + ";" : "") + (r.border || "") + '" ' + (r.title ? ' title="' + r.title + '"' : "") + " /></p>",
                                    a.push(s);
                                i.execCommand("insertHtml", a.join(""))
                            } else {
                                var d = t.shift(),
                                    c = d.floatStyle;
                                delete d.floatStyle,
                                    domUtils.setAttributes(o, d),
                                    i.execCommand("imagefloat", c),
                                    t.length > 0 && (n.setStartAfter(o).setCursor(!1, !0), i.execCommand("insertimage", t))
                            }
                            i.fireEvent("afterinsertimage", t)
                        }
                    }
                    function u(e) {
                        utils.each("width,height,border,hspace,vspace".split(","), (function (t) {
                            e[t] && (e[t] = parseInt(e[t], 10) || 0)
                        })),
                            utils.each("src,_src".split(","), (function (t) {
                                e[t] && (e[t] = utils.unhtmlForUrl(e[t]))
                            })),
                            utils.each("title,alt".split(","), (function (t) {
                                e[t] && (e[t] = utils.unhtml(e[t]))
                            }))
                    }
                }
            },
            UE.plugins.justify = function () {
                var e = domUtils.isBlockElm,
                    t = {
                        left: 1,
                        right: 1,
                        center: 1,
                        justify: 1
                    };
                UE.commands.justify = {
                    execCommand: function (t, i) {
                        var n, o = this.selection.getRange();
                        return o.collapsed && (n = this.document.createTextNode("p"), o.insertNode(n)),
                            function (t, i) {
                                var n = t.createBookmark(),
                                    o = function (e) {
                                        return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
                                    };
                                t.enlarge(!0);
                                for (var r, a = t.createBookmark(), s = domUtils.getNextDomNode(a.start, !1, o), l = t.cloneRange(); s && !(domUtils.getPosition(s, a.end) & domUtils.POSITION_FOLLOWING);) if (3 != s.nodeType && e(s)) s = domUtils.getNextDomNode(s, !0, o);
                                else {
                                    for (l.setStartBefore(s); s && s !== a.end && !e(s);) r = s,
                                        s = domUtils.getNextDomNode(s, !1, null, (function (t) {
                                            return !e(t)
                                        }));
                                    l.setEndAfter(r);
                                    var d = l.getCommonAncestor();
                                    if (!domUtils.isBody(d) && e(d)) domUtils.setStyles(d, utils.isString(i) ? {
                                        "text-align": i
                                    } : i),
                                        s = d;
                                    else {
                                        var c = t.document.createElement("p");
                                        domUtils.setStyles(c, utils.isString(i) ? {
                                            "text-align": i
                                        } : i);
                                        var u = l.extractContents();
                                        c.appendChild(u),
                                            l.insertNode(c),
                                            s = c
                                    }
                                    s = domUtils.getNextDomNode(s, !1, o)
                                }
                                t.moveToBookmark(a).moveToBookmark(n)
                            }(o, i),
                            n && (o.setStartBefore(n).collapse(!0), domUtils.remove(n)),
                            o.select(),
                            !0
                    },
                    queryCommandValue: function () {
                        var e = this.selection.getStart(),
                            i = domUtils.getComputedStyle(e, "text-align");
                        return t[i] ? i : "left"
                    },
                    queryCommandState: function () {
                        var e = this.selection.getStart();
                        return e && domUtils.findParentByTagName(e, ["td", "th", "caption"], !0) ? -1 : 0
                    }
                }
            },
            UE.plugins.font = function () {
                var e = {
                    forecolor: "color",
                    backcolor: "background-color",
                    fontsize: "font-size",
                    fontfamily: "font-family",
                    underline: "text-decoration",
                    strikethrough: "text-decoration",
                    fontborder: "border"
                },
                    t = {
                        underline: 1,
                        strikethrough: 1,
                        fontborder: 1
                    },
                    i = {
                        forecolor: "color",
                        backcolor: "background-color",
                        fontsize: "font-size",
                        fontfamily: "font-family"
                    };
                function n(e, t, n) {
                    var o, r = e.collapsed,
                        a = e.createBookmark();
                    if (r) for (o = a.start.parentNode; dtd.$inline[o.tagName];) o = o.parentNode;
                    else o = domUtils.getCommonAncestor(a.start, a.end);
                    utils.each(domUtils.getElementsByTagName(o, "span"), (function (e) {
                        if (e.parentNode && !domUtils.isBookmarkNode(e)) if (/\s*border\s*:\s*none;?\s*/i.test(e.style.cssText)) / ^\s * border\s * :\s * none; ? \s * $ /.test(e.style.cssText) ? domUtils.remove(e, !0) : domUtils.removeStyle(e, "border");
                        else {
                            if (/border/i.test(e.style.cssText) && "SPAN" == e.parentNode.tagName && /border/i.test(e.parentNode.style.cssText) && (e.style.cssText = e.style.cssText.replace(/border[^:]*:[^;]+;?/gi, "")), "fontborder" != t || "none" != n) for (var i = e.nextSibling; i && 1 == i.nodeType && "SPAN" == i.tagName;) if (domUtils.isBookmarkNode(i) && "fontborder" == t) e.appendChild(i),
                                i = e.nextSibling;
                            else {
                                if (i.style.cssText == e.style.cssText && (domUtils.moveChild(i, e), domUtils.remove(i)), e.nextSibling === i) break;
                                i = e.nextSibling
                            }
                            if (function (e) {
                                for (var t; (t = e.parentNode) && "SPAN" == t.tagName && 1 == domUtils.getChildCount(t, (function (e) {
                                    return !domUtils.isBookmarkNode(e) && !domUtils.isBr(e)
                                }));) t.style.cssText += e.style.cssText,
                                    domUtils.remove(e, !0),
                                    e = t
                            }(e), browser.ie && browser.version > 8) {
                                var o = domUtils.findParent(e, (function (e) {
                                    return "SPAN" == e.tagName && /background-color/.test(e.style.cssText)
                                }));
                                o && !/background-color/.test(e.style.cssText) && (e.style.backgroundColor = o.style.backgroundColor)
                            }
                        }
                    })),
                        e.moveToBookmark(a),
                        function (e, t, n) {
                            if (i[t] && (e.adjustmentBoundary(), !e.collapsed && 1 == e.startContainer.nodeType)) {
                                var o = e.startContainer.childNodes[e.startOffset];
                                if (o && domUtils.isTagNode(o, "span")) {
                                    var r = e.createBookmark();
                                    utils.each(domUtils.getElementsByTagName(o, "span"), (function (e) {
                                        e.parentNode && !domUtils.isBookmarkNode(e) && ("backcolor" == t && domUtils.getComputedStyle(e, "background-color").toLowerCase() === n || (domUtils.removeStyle(e, i[t]), 0 == e.style.cssText.replace(/^\s+$/, "").length && domUtils.remove(e, !0)))
                                    })),
                                        e.moveToBookmark(r)
                                }
                            }
                        }(e, t, n)
                }
                for (var o in this.setOpt({
                    fontfamily: [{
                        name: "songti",
                        val: "宋体,SimSun"
                    },
                    {
                        name: "yahei",
                        val: "微软雅黑,Microsoft YaHei"
                    },
                    {
                        name: "kaiti",
                        val: "楷体,楷体_GB2312, SimKai"
                    },
                    {
                        name: "heiti",
                        val: "黑体, SimHei"
                    },
                    {
                        name: "lishu",
                        val: "隶书, SimLi"
                    },
                    {
                        name: "andaleMono",
                        val: "andale mono"
                    },
                    {
                        name: "arial",
                        val: "arial, helvetica,sans-serif"
                    },
                    {
                        name: "arialBlack",
                        val: "arial black,avant garde"
                    },
                    {
                        name: "comicSansMs",
                        val: "comic sans ms"
                    },
                    {
                        name: "impact",
                        val: "impact,chicago"
                    },
                    {
                        name: "timesNewRoman",
                        val: "times new roman"
                    }],
                    fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
                }), this.addInputRule((function (e) {
                    utils.each(e.getNodesByTagName("u s del font strike"), (function (e) {
                        if ("font" == e.tagName) {
                            var t = [];
                            for (var i in e.attrs) switch (i) {
                                case "size":
                                    t.push("font-size:" + ({
                                        1: "10",
                                        2: "12",
                                        3: "16",
                                        4: "18",
                                        5: "24",
                                        6: "32",
                                        7: "48"
                                    }[e.attrs[i]] || e.attrs[i]) + "px");
                                    break;
                                case "color":
                                    t.push("color:" + e.attrs[i]);
                                    break;
                                case "face":
                                    t.push("font-family:" + e.attrs[i]);
                                    break;
                                case "style":
                                    t.push(e.attrs[i])
                            }
                            e.attrs = {
                                style: t.join(";")
                            }
                        } else {
                            var n = "u" == e.tagName ? "underline" : "line-through";
                            e.attrs = {
                                style: (e.getAttr("style") || "") + "text-decoration:" + n + ";"
                            }
                        }
                        e.tagName = "span"
                    }))
                })), e) !
                    function (e, i) {
                        UE.commands[e] = {
                            execCommand: function (o, r) {
                                r = r || (this.queryCommandState(o) ? "none" : "underline" == o ? "underline" : "fontborder" == o ? "1px solid #000" : "line-through");
                                var a, s = this,
                                    l = this.selection.getRange();
                                if ("default" == r) l.collapsed && (a = s.document.createTextNode("font"), l.insertNode(a).select()),
                                    s.execCommand("removeFormat", "span,a", i),
                                    a && (l.setStartBefore(a).collapse(!0), domUtils.remove(a)),
                                    n(l, o, r),
                                    l.select();
                                else if (l.collapsed) {
                                    var d = domUtils.findParentByTagName(l.startContainer, "span", !0);
                                    if (a = s.document.createTextNode("font"), !d || d.children.length || d[browser.ie ? "innerText" : "textContent"].replace(fillCharReg, "").length) {
                                        if (l.insertNode(a), l.selectNode(a).select(), d = l.document.createElement("span"), t[e]) {
                                            if (domUtils.findParentByTagName(a, "a", !0)) return l.setStartBefore(a).setCursor(),
                                                void domUtils.remove(a);
                                            s.execCommand("removeFormat", "span,a", i)
                                        }
                                        if (d.style.cssText = "fontsize" == o ? i + ":" + r + ";line-height:1.5;" : "underline" == o ? i + ":" + r + " !important" : i + ":" + r, a.parentNode.insertBefore(d, a), !browser.ie || browser.ie && 9 == browser.version) for (var c = d.parentNode; !domUtils.isBlockElm(c);)"SPAN" == c.tagName && (d.style.cssText = c.style.cssText + ";" + d.style.cssText),
                                            c = c.parentNode;
                                        opera ? setTimeout((function () {
                                            l.setStart(d, 0).collapse(!0),
                                                n(l, o, r),
                                                l.select()
                                        })) : (l.setStart(d, 0).collapse(!0), n(l, o, r), l.select())
                                    } else l.insertNode(a),
                                        t[e] && (l.selectNode(a).select(), s.execCommand("removeFormat", "span,a", i, null), d = domUtils.findParentByTagName(a, "span", !0), l.setStartBefore(a)),
                                        "fontsize" == o ? d && d.style && (d.style.cssText += ";" + i + ":" + r + ";line-height:1.5;") : "underline" == o ? d && d.style && (d.style.cssText += ";" + i + ":" + r + " !important") : d && d.style && (d.style.cssText += ";" + i + ":" + r),
                                        l.collapse(!0).select();
                                    domUtils.remove(a)
                                } else t[e] && s.queryCommandValue(e) && s.execCommand("removeFormat", "span,a", i),
                                    l = s.selection.getRange(),
                                    "fontsize" == o ? l.applyInlineStyle("span", {
                                        style: i + ":" + r + ";line-height:1.5;"
                                    }) : "underline" == o ? l.applyInlineStyle("span", {
                                        style: i + ":" + r + " !important"
                                    }) : l.applyInlineStyle("span", {
                                        style: i + ":" + r
                                    }),
                                    n(l, o, r),
                                    l.select();
                                return !0
                            },
                            queryCommandValue: function (e) {
                                var t = this.selection.getStart();
                                if ("underline" == e || "strikethrough" == e) {
                                    for (var n, o = t; o && !domUtils.isBlockElm(o) && !domUtils.isBody(o);) {
                                        if (1 == o.nodeType && "none" != (n = domUtils.getComputedStyle(o, i))) return n;
                                        o = o.parentNode
                                    }
                                    return "none"
                                }
                                if ("fontborder" == e) {
                                    for (var r, a = t; a && dtd.$inline[a.tagName];) {
                                        if ((r = domUtils.getComputedStyle(a, "border")) && /1px/.test(r) && /solid/.test(r)) return r;
                                        a = a.parentNode
                                    }
                                    return ""
                                }
                                if ("FontSize" == e) {
                                    var s = domUtils.getComputedStyle(t, i);
                                    return (a = /^([\d\.]+)(\w+)$/.exec(s)) ? Math.floor(a[1]) + a[2] : s
                                }
                                return domUtils.getComputedStyle(t, i)
                            },
                            queryCommandState: function (e) {
                                if (!t[e]) return 0;
                                var i = this.queryCommandValue(e);
                                return "fontborder" == e ? /1px/.test(i) && /solid/.test(i) : "underline" == e ? /underline/.test(i) : /line\-through/.test(i)
                            }
                        }
                    }(o, e[o])
            },
            UE.plugins.link = function () {
                function e(e) {
                    var t = e.startContainer,
                        i = e.endContainer; (t = domUtils.findParentByTagName(t, "a", !0)) && e.setStartBefore(t),
                            (i = domUtils.findParentByTagName(i, "a", !0)) && e.setEndAfter(i)
                }
                UE.commands.unlink = {
                    execCommand: function () {
                        var t, i = this.selection.getRange();
                        i.collapsed && !domUtils.findParentByTagName(i.startContainer, "a", !0) || (t = i.createBookmark(), e(i), i.removeInlineStyle("a").moveToBookmark(t).select())
                    },
                    queryCommandState: function () {
                        return !this.highlight && this.queryCommandValue("link") ? 0 : -1
                    }
                },
                    UE.commands.link = {
                        execCommand: function (t, i) {
                            var n;
                            i._href && (i._href = utils.unhtml(i._href, /[<">]/g)),
                                i.href && (i.href = utils.unhtml(i.href, /[<">]/g)),
                                i.textValue && (i.textValue = utils.unhtml(i.textValue, /[<">]/g)),
                                function (t, i, n) {
                                    var o = t.cloneRange(),
                                        r = n.queryCommandValue("link");
                                    e(t = t.adjustmentBoundary());
                                    var a = t.startContainer;
                                    if (1 == a.nodeType && r && (a = a.childNodes[t.startOffset]) && 1 == a.nodeType && "A" == a.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(a[browser.ie ? "innerText" : "textContent"]) && (a[browser.ie ? "innerText" : "textContent"] = utils.html(i.textValue || i.href)), o.collapsed && !r || (t.removeInlineStyle("a"), o = t.cloneRange()), o.collapsed) {
                                        var s = t.document.createElement("a"),
                                            l = "";
                                        i.textValue ? (l = utils.html(i.textValue), delete i.textValue) : l = utils.html(i.href),
                                            domUtils.setAttributes(s, i),
                                            (a = domUtils.findParentByTagName(o.startContainer, "a", !0)) && domUtils.isInNodeEndBoundary(o, a) && t.setStartAfter(a).collapse(!0),
                                            s[browser.ie ? "innerText" : "textContent"] = l,
                                            t.insertNode(s).selectNode(s)
                                    } else t.applyInlineStyle("a", i)
                                }(n = this.selection.getRange(), i, this),
                                n.collapse().select(!0)
                        },
                        queryCommandValue: function () {
                            var e, t = this.selection.getRange();
                            if (!t.collapsed) {
                                t.shrinkBoundary();
                                var i = 3 != t.startContainer.nodeType && t.startContainer.childNodes[t.startOffset] ? t.startContainer.childNodes[t.startOffset] : t.startContainer,
                                    n = 3 == t.endContainer.nodeType || 0 == t.endOffset ? t.endContainer : t.endContainer.childNodes[t.endOffset - 1],
                                    o = t.getCommonAncestor();
                                if (!(e = domUtils.findParentByTagName(o, "a", !0)) && 1 == o.nodeType) for (var r, a, s, l = o.getElementsByTagName("a"), d = 0; s = l[d++];) if (r = domUtils.getPosition(s, i), a = domUtils.getPosition(s, n), (r & domUtils.POSITION_FOLLOWING || r & domUtils.POSITION_CONTAINS) && (a & domUtils.POSITION_PRECEDING || a & domUtils.POSITION_CONTAINS)) {
                                    e = s;
                                    break
                                }
                                return e
                            }
                            if ((e = 1 == (e = t.startContainer).nodeType ? e : e.parentNode) && (e = domUtils.findParentByTagName(e, "a", !0)) && !domUtils.isInNodeEndBoundary(t, e)) return e
                        },
                        queryCommandState: function () {
                            var e = this.selection.getRange().getClosedNode();
                            return e && ("edui-faked-video" == e.className || -1 != e.className.indexOf("edui-upload-video")) ? -1 : 0
                        }
                    }
            },
            UE.plugins.insertframe = function () {
                var e = this;
                e.addListener("selectionchange", (function () {
                    e._iframe && delete e._iframe
                }))
            },
            UE.commands.scrawl = {
                queryCommandState: function () {
                    return browser.ie && browser.version <= 8 ? -1 : 0
                }
            },
            UE.plugins.removeformat = function () {
                this.setOpt({
                    removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
                    removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
                }),
                    this.commands.removeformat = {
                        execCommand: function (e, t, i, n, o) {
                            var r, a, s = new RegExp("^(?:" + (t || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
                                l = i ? [] : (n || this.options.removeFormatAttributes).split(","),
                                d = new dom.Range(this.document),
                                c = function (e) {
                                    return 1 == e.nodeType
                                };
                            function u(e) {
                                if (3 == e.nodeType || "span" != e.tagName.toLowerCase()) return 0;
                                if (browser.ie) {
                                    var t = e.attributes;
                                    if (t.length) {
                                        for (var i = 0,
                                            n = t.length; i < n; i++) if (t[i].specified) return 0;
                                        return 1
                                    }
                                }
                                return !e.attributes.length
                            } (function (e) {
                                var t = e.createBookmark();
                                if (e.collapsed && e.enlarge(!0), console.log(e), !o) {
                                    var n = domUtils.findParentByTagName(e.startContainer, "a", !0);
                                    n && e.setStartBefore(n),
                                        (n = domUtils.findParentByTagName(e.endContainer, "a", !0)) && e.setEndAfter(n)
                                }
                                for (p = (r = e.createBookmark()).start; (a = p.parentNode) && !domUtils.isBlockElm(a);) domUtils.breakParent(p, a),
                                    domUtils.clearEmptySibling(p);
                                if (r.end) {
                                    for (p = r.end; (a = p.parentNode) && !domUtils.isBlockElm(a);) domUtils.breakParent(p, a),
                                        domUtils.clearEmptySibling(p);
                                    console.log(r.start),
                                        console.log(r.end);
                                    for (var d, m = domUtils.getNextDomNode(r.start, !1, c); m && m != r.end;) d = domUtils.getNextDomNode(m, !0, c),
                                        dtd.$empty[m.tagName.toLowerCase()] || domUtils.isBookmarkNode(m) || (s.test(m.tagName) ? i ? (domUtils.removeStyle(m, i), u(m) && "text-decoration" != i && domUtils.remove(m, !0)) : domUtils.remove(m, !0) : dtd.$tableContent[m.tagName] || dtd.$list[m.tagName] || (domUtils.removeAttributes(m, l), u(m) && domUtils.remove(m, !0))),
                                        m = d
                                }
                                var f = r.start.parentNode; !domUtils.isBlockElm(f) || dtd.$tableContent[f.tagName] || dtd.$list[f.tagName] || domUtils.removeAttributes(f, l),
                                    f = r.end.parentNode,
                                    r.end && domUtils.isBlockElm(f) && !dtd.$tableContent[f.tagName] && !dtd.$list[f.tagName] && domUtils.removeAttributes(f, l),
                                    e.moveToBookmark(r).moveToBookmark(t);
                                for (var h, p = e.startContainer,
                                    g = e.collapsed; 1 == p.nodeType && domUtils.isEmptyNode(p) && dtd.$removeEmpty[p.tagName];) h = p.parentNode,
                                        e.setStartBefore(p),
                                        e.startContainer === e.endContainer && e.endOffset--,
                                        domUtils.remove(p),
                                        p = h;
                                if (!g) for (p = e.endContainer; 1 == p.nodeType && domUtils.isEmptyNode(p) && dtd.$removeEmpty[p.tagName];) h = p.parentNode,
                                    e.setEndBefore(p),
                                    domUtils.remove(p),
                                    p = h
                            })(d = this.selection.getRange()),
                                d.select()
                        }
                    }
            },
            UE.plugins.blockquote = function () {
                function e(e) {
                    return domUtils.filterNodeList(e.selection.getStartElementPath(), "blockquote")
                }
                this.commands.blockquote = {
                    execCommand: function (t, i) {
                        var n = this.selection.getRange(),
                            o = e(this),
                            r = dtd.blockquote,
                            a = n.createBookmark();
                        if (o) {
                            var s = n.startContainer,
                                l = domUtils.isBlockElm(s) ? s : domUtils.findParent(s, (function (e) {
                                    return domUtils.isBlockElm(e)
                                })),
                                d = n.endContainer,
                                c = domUtils.isBlockElm(d) ? d : domUtils.findParent(d, (function (e) {
                                    return domUtils.isBlockElm(e)
                                }));
                            l = domUtils.findParentByTagName(l, "li", !0) || l,
                                c = domUtils.findParentByTagName(c, "li", !0) || c,
                                "LI" == l.tagName || "TD" == l.tagName || l === o || domUtils.isBody(l) ? domUtils.remove(o, !0) : domUtils.breakParent(l, o),
                                l !== c && (o = domUtils.findParentByTagName(c, "blockquote")) && ("LI" == c.tagName || "TD" == c.tagName || domUtils.isBody(c) ? o.parentNode && domUtils.remove(o, !0) : domUtils.breakParent(c, o));
                            for (var u, m = domUtils.getElementsByTagName(this.document, "blockquote"), f = 0; u = m[f++];) u.childNodes.length ? domUtils.getPosition(u, l) & domUtils.POSITION_FOLLOWING && domUtils.getPosition(u, c) & domUtils.POSITION_PRECEDING && domUtils.remove(u, !0) : domUtils.remove(u)
                        } else {
                            for (var h = n.cloneRange(), p = 1 == h.startContainer.nodeType ? h.startContainer : h.startContainer.parentNode, g = p, b = 1; ;) {
                                if (domUtils.isBody(p)) {
                                    g !== p ? n.collapsed ? (h.selectNode(g), b = 0) : h.setStartBefore(g) : h.setStart(p, 0);
                                    break
                                }
                                if (!r[p.tagName]) {
                                    n.collapsed ? h.selectNode(g) : h.setStartBefore(g);
                                    break
                                }
                                g = p,
                                    p = p.parentNode
                            }
                            if (b) for (g = p = p = 1 == h.endContainer.nodeType ? h.endContainer : h.endContainer.parentNode; ;) {
                                if (domUtils.isBody(p)) {
                                    g !== p ? h.setEndAfter(g) : h.setEnd(p, p.childNodes.length);
                                    break
                                }
                                if (!r[p.tagName]) {
                                    h.setEndAfter(g);
                                    break
                                }
                                g = p,
                                    p = p.parentNode
                            }
                            p = n.document.createElement("blockquote"),
                                domUtils.setAttributes(p, {
                                    style: "margin: 0;padding: 0 10px;border-left:3px solid #DBDBDB;"
                                }),
                                p.appendChild(h.extractContents()),
                                h.insertNode(p);
                            var v, y = domUtils.getElementsByTagName(p, "blockquote");
                            for (f = 0; v = y[f++];) v.parentNode && domUtils.remove(v, !0)
                        }
                        n.moveToBookmark(a).select()
                    },
                    queryCommandState: function () {
                        return e(this) ? 1 : 0
                    }
                }
            },
            UE.commands.touppercase = UE.commands.tolowercase = {
                execCommand: function (e) {
                    var t = this.selection.getRange();
                    if (t.collapsed) return t;
                    for (var i = t.createBookmark(), n = i.end, o = function (e) {
                        return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                    },
                        r = domUtils.getNextDomNode(i.start, !1, o); r && domUtils.getPosition(r, n) & domUtils.POSITION_PRECEDING && (3 == r.nodeType && (r.nodeValue = r.nodeValue["touppercase" == e ? "toUpperCase" : "toLowerCase"]()), (r = domUtils.getNextDomNode(r, !0, o)) !== n););
                    t.moveToBookmark(i).select()
                }
            },
            UE.commands.indent = {
                execCommand: function () {
                    var e = this.queryCommandState("indent") ? "0em" : this.options.indentValue || "2em";
                    this.execCommand("Paragraph", "p", {
                        style: "text-indent:" + e
                    })
                },
                queryCommandState: function () {
                    var e = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
                    return e && e.style.textIndent && parseInt(e.style.textIndent) ? 1 : 0
                }
            },
            UE.commands.print = {
                execCommand: function () {
                    this.window.print()
                },
                notNeedUndo: 1
            },
            UE.commands.preview = {
                execCommand: function () {
                    var e = window.open("", "_blank", "").document;
                    e.open(),
                        e.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' + this.options.UEDITOR_HOME_URL + "ueditor.parse.js\"><\/script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)<\/script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>"),
                        e.close()
                },
                notNeedUndo: 1
            },
            UE.plugins.selectall = function () {
                this.commands.selectall = {
                    execCommand: function () {
                        var e = this.body,
                            t = this.selection.getRange();
                        t.selectNodeContents(e),
                            domUtils.isEmptyBlock(e) && (browser.opera && e.firstChild && 1 == e.firstChild.nodeType && t.setStartAtFirst(e.firstChild), t.collapse(!0)),
                            t.select(!0)
                    },
                    notNeedUndo: 1
                },
                    this.addshortcutkey({
                        selectAll: "ctrl+65"
                    })
            },
            UE.plugins.paragraph = function () {
                var e = domUtils.isBlockElm,
                    t = ["TD", "LI", "PRE"];
                this.setOpt("paragraph", {
                    p: "",
                    h1: "",
                    h2: "",
                    h3: "",
                    h4: "",
                    h5: "",
                    h6: ""
                }),
                    this.commands.paragraph = {
                        execCommand: function (i, n, o, r) {
                            var a = this.selection.getRange();
                            if (a.collapsed) {
                                var s = this.document.createTextNode("p");
                                if (a.insertNode(s), browser.ie) {
                                    var l = s.previousSibling;
                                    l && domUtils.isWhitespace(l) && domUtils.remove(l),
                                        (l = s.nextSibling) && domUtils.isWhitespace(l) && domUtils.remove(l)
                                }
                            }
                            if (a = function (i, n, o, r) {
                                var a, s = i.createBookmark(),
                                    l = function (e) {
                                        return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
                                    };
                                i.enlarge(!0);
                                for (var d, c = i.createBookmark(), u = domUtils.getNextDomNode(c.start, !1, l), m = i.cloneRange(); u && !(domUtils.getPosition(u, c.end) & domUtils.POSITION_FOLLOWING);) if (3 != u.nodeType && e(u)) u = domUtils.getNextDomNode(u, !0, l);
                                else {
                                    for (m.setStartBefore(u); u && u !== c.end && !e(u);) d = u,
                                        u = domUtils.getNextDomNode(u, !1, null, (function (t) {
                                            return !e(t)
                                        }));
                                    m.setEndAfter(d),
                                        a = i.document.createElement(n),
                                        o && (domUtils.setAttributes(a, o), r && "customstyle" == r && o.style && (a.style.cssText = o.style)),
                                        a.appendChild(m.extractContents()),
                                        domUtils.isEmptyNode(a) && domUtils.fillChar(i.document, a),
                                        m.insertNode(a);
                                    var f = a.parentNode;
                                    e(f) && !domUtils.isBody(a.parentNode) && -1 == utils.indexOf(t, f.tagName) && (r && "customstyle" == r || (f.getAttribute("dir") && a.setAttribute("dir", f.getAttribute("dir")), f.style.cssText && (a.style.cssText = f.style.cssText + ";" + a.style.cssText), f.style.textAlign && !a.style.textAlign && (a.style.textAlign = f.style.textAlign), f.style.textIndent && !a.style.textIndent && (a.style.textIndent = f.style.textIndent), f.style.padding && !a.style.padding && (a.style.padding = f.style.padding)), o && /h\d/i.test(f.tagName) && !/h\d/i.test(a.tagName) ? (domUtils.setAttributes(f, o), r && "customstyle" == r && o.style && (f.style.cssText = o.style), domUtils.remove(a, !0), a = f) : domUtils.remove(a.parentNode, !0)),
                                        u = -1 != utils.indexOf(t, f.tagName) ? f : a,
                                        u = domUtils.getNextDomNode(u, !1, l)
                                }
                                return i.moveToBookmark(c).moveToBookmark(s)
                            }(a, n, o, r), s && (a.setStartBefore(s).collapse(!0), pN = s.parentNode, domUtils.remove(s), domUtils.isBlockElm(pN) && domUtils.isEmptyNode(pN) && domUtils.fillNode(this.document, pN)), browser.gecko && a.collapsed && 1 == a.startContainer.nodeType) {
                                var d = a.startContainer.childNodes[a.startOffset];
                                d && 1 == d.nodeType && d.tagName.toLowerCase() == n && a.setStart(d, 0).collapse(!0)
                            }
                            return a.select(),
                                !0
                        },
                        queryCommandValue: function () {
                            var e = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
                            return e ? e.tagName.toLowerCase() : ""
                        }
                    }
            },
            block = domUtils.isBlockElm,
            getObj = function (e) {
                return domUtils.filterNodeList(e.selection.getStartElementPath(), (function (e) {
                    return e && 1 == e.nodeType && e.getAttribute("dir")
                }))
            },
            UE.commands.directionality = {
                execCommand: function (e, t) {
                    var i = this.selection.getRange();
                    if (i.collapsed) {
                        var n = this.document.createTextNode("d");
                        i.insertNode(n)
                    }
                    return function (e, t, i) {
                        var n, o = function (e) {
                            return 1 == e.nodeType ? !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
                        },
                            r = getObj(t);
                        if (r && e.collapsed) return r.setAttribute("dir", i),
                            e;
                        n = e.createBookmark(),
                            e.enlarge(!0);
                        for (var a, s = e.createBookmark(), l = domUtils.getNextDomNode(s.start, !1, o), d = e.cloneRange(); l && !(domUtils.getPosition(l, s.end) & domUtils.POSITION_FOLLOWING);) if (3 != l.nodeType && block(l)) l = domUtils.getNextDomNode(l, !0, o);
                        else {
                            for (d.setStartBefore(l); l && l !== s.end && !block(l);) a = l,
                                l = domUtils.getNextDomNode(l, !1, null, (function (e) {
                                    return !block(e)
                                }));
                            d.setEndAfter(a);
                            var c = d.getCommonAncestor();
                            if (!domUtils.isBody(c) && block(c)) c.setAttribute("dir", i),
                                l = c;
                            else {
                                var u = e.document.createElement("p");
                                u.setAttribute("dir", i);
                                var m = d.extractContents();
                                u.appendChild(m),
                                    d.insertNode(u),
                                    l = u
                            }
                            l = domUtils.getNextDomNode(l, !1, o)
                        }
                        e.moveToBookmark(s).moveToBookmark(n)
                    }(i, this, t),
                        n && (i.setStartBefore(n).collapse(!0), domUtils.remove(n)),
                        i.select(),
                        !0
                },
                queryCommandValue: function () {
                    var e = getObj(this);
                    return e ? e.getAttribute("dir") : "ltr"
                }
            },
            UE.plugins.horizontal = function () {
                this.commands.horizontal = {
                    execCommand: function (e) {
                        var t = this;
                        if (- 1 !== t.queryCommandState(e)) {
                            t.execCommand("insertHtml", "<hr>");
                            var i, n = t.selection.getRange(),
                                o = n.startContainer;
                            if (1 == o.nodeType && !o.childNodes[n.startOffset]) (i = o.childNodes[n.startOffset - 1]) && 1 == i.nodeType && "HR" == i.tagName && ("p" == t.options.enterTag ? (i = t.document.createElement("p"), n.insertNode(i), n.setStart(i, 0).setCursor()) : (i = t.document.createElement("br"), n.insertNode(i), n.setStartBefore(i).setCursor()));
                            return !0
                        }
                    },
                    queryCommandState: function () {
                        return domUtils.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
                    }
                },
                    this.addListener("delkeydown", (function (e, t) {
                        var i = this.selection.getRange();
                        if (i.txtToElmBoundary(!0), domUtils.isStartInblock(i)) {
                            var n = i.startContainer.previousSibling;
                            if (n && domUtils.isTagNode(n, "hr")) return domUtils.remove(n),
                                i.select(),
                                domUtils.preventDefault(t),
                                !0
                        }
                    }))
            },
            UE.commands.time = UE.commands.date = {
                execCommand: function (e, t) {
                    var i = new Date;
                    this.execCommand("insertHtml", "time" == e ?
                        function (e, t) {
                            var i = ("0" + e.getHours()).slice(- 2),
                                n = ("0" + e.getMinutes()).slice(- 2),
                                o = ("0" + e.getSeconds()).slice(- 2);
                            return (t = t || "hh:ii:ss").replace(/hh/gi, i).replace(/ii/gi, n).replace(/ss/gi, o)
                        }(i, t) : function (e, t) {
                            var i = ("000" + e.getFullYear()).slice(- 4),
                                n = i.slice(- 2),
                                o = ("0" + (e.getMonth() + 1)).slice(- 2),
                                r = ("0" + e.getDate()).slice(- 2);
                            return (t = t || "yyyy-mm-dd").replace(/yyyy/gi, i).replace(/yy/gi, n).replace(/mm/gi, o).replace(/dd/gi, r)
                        }(i, t))
                }
            },
            UE.plugins.rowspacing = function () {
                this.setOpt({
                    rowspacingtop: ["5", "10", "15", "20", "25"],
                    rowspacingbottom: ["5", "10", "15", "20", "25"]
                }),
                    this.commands.rowspacing = {
                        execCommand: function (e, t, i) {
                            return this.execCommand("paragraph", "p", {
                                style: "margin-" + i + ":" + t + "px"
                            }),
                                !0
                        },
                        queryCommandValue: function (e, t) {
                            var i = domUtils.filterNodeList(this.selection.getStartElementPath(), (function (e) {
                                return domUtils.isBlockElm(e)
                            }));
                            return i && domUtils.getComputedStyle(i, "margin-" + t).replace(/[^\d]/g, "") || 0
                        }
                    }
            },
            UE.plugins.lineheight = function () {
                this.setOpt({
                    lineheight: ["1", "1.5", "1.75", "2", "3", "4", "5"]
                }),
                    this.commands.lineheight = {
                        execCommand: function (e, t) {
                            return this.execCommand("paragraph", "p", {
                                style: "line-height:" + ("1" == t ? "normal" : t + "em")
                            }),
                                !0
                        },
                        queryCommandValue: function () {
                            var e = domUtils.filterNodeList(this.selection.getStartElementPath(), (function (e) {
                                return domUtils.isBlockElm(e)
                            }));
                            if (e) {
                                var t = domUtils.getComputedStyle(e, "line-height");
                                return "normal" == t ? 1 : t.replace(/[^\d.]*/gi, "")
                            }
                        }
                    }
            },
            UE.plugins.insertcode = function () {
                var e = this;
                e.ready((function () {
                    utils.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", e.document)
                })),
                    e.setOpt("insertcode", {
                        as3: "ActionScript3",
                        bash: "Bash/Shell",
                        cpp: "C/C++",
                        css: "Css",
                        cf: "CodeFunction",
                        "c#": "C#",
                        delphi: "Delphi",
                        diff: "Diff",
                        erlang: "Erlang",
                        groovy: "Groovy",
                        html: "Html",
                        java: "Java",
                        jfx: "JavaFx",
                        js: "Javascript",
                        pl: "Perl",
                        php: "Php",
                        plain: "Plain Text",
                        ps: "PowerShell",
                        python: "Python",
                        ruby: "Ruby",
                        scala: "Scala",
                        sql: "Sql",
                        vb: "Vb",
                        xml: "Xml"
                    }),
                    e.commands.insertcode = {
                        execCommand: function (e, t) {
                            var i = this,
                                n = i.selection.getRange(),
                                o = domUtils.findParentByTagName(n.startContainer, "pre", !0);
                            if (o) o.className = "brush:" + t + ";toolbar:false;";
                            else {
                                var r = "";
                                if (n.collapsed) r = browser.ie && browser.ie11below ? browser.version <= 8 ? "&nbsp;" : "" : "<br/>";
                                else {
                                    var a = n.extractContents(),
                                        s = i.document.createElement("div");
                                    s.appendChild(a),
                                        utils.each(UE.filterNode(UE.htmlparser(s.innerHTML.replace(/[\r\t]/g, "")), i.options.filterTxtRules).children, (function (e) {
                                            if (browser.ie && browser.ie11below && browser.version > 8) "element" == e.type ? "br" == e.tagName ? r += "\n" : dtd.$empty[e.tagName] || (utils.each(e.children, (function (t) {
                                                "element" == t.type ? "br" == t.tagName ? r += "\n" : dtd.$empty[e.tagName] || (r += t.innerText()) : r += t.data
                                            })), /\n$/.test(r) || (r += "\n")) : r += e.data + "\n",
                                                !e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ""));
                                            else if (browser.ie && browser.ie11below) "element" == e.type ? "br" == e.tagName ? r += "<br>" : dtd.$empty[e.tagName] || (utils.each(e.children, (function (t) {
                                                "element" == t.type ? "br" == t.tagName ? r += "<br>" : dtd.$empty[e.tagName] || (r += t.innerText()) : r += t.data
                                            })), /br>$/.test(r) || (r += "<br>")) : r += e.data + "<br>",
                                                !e.nextSibling() && /<br>$/.test(r) && (r = r.replace(/<br>$/, ""));
                                            else if (r += "element" == e.type ? dtd.$empty[e.tagName] ? "" : e.innerText() : e.data, !/br\/?\s*>$/.test(r)) {
                                                if (!e.nextSibling()) return;
                                                r += "<br>"
                                            }
                                        }))
                                }
                                i.execCommand("inserthtml", '<pre id="coder"class="brush:' + t + ';toolbar:false">' + r + "</pre>", !0),
                                    o = i.document.getElementById("coder"),
                                    domUtils.removeAttributes(o, "id");
                                var l = o.previousSibling;
                                l && (3 == l.nodeType && 1 == l.nodeValue.length && browser.ie && 6 == browser.version || domUtils.isEmptyBlock(l)) && domUtils.remove(l);
                                n = i.selection.getRange();
                                domUtils.isEmptyBlock(o) ? n.setStart(o, 0).setCursor(!1, !0) : n.selectNodeContents(o).select()
                            }
                        },
                        queryCommandValue: function () {
                            var e = this.selection.getStartElementPath(),
                                t = "";
                            return utils.each(e, (function (e) {
                                if ("PRE" == e.nodeName) {
                                    var i = e.className.match(/brush:([^;]+)/);
                                    return t = i && i[1] ? i[1] : "",
                                        !1
                                }
                            })),
                                t
                        }
                    },
                    e.addInputRule((function (e) {
                        utils.each(e.getNodesByTagName("pre"), (function (e) {
                            var t = e.getNodesByTagName("br");
                            if (t.length) browser.ie && browser.ie11below && browser.version > 8 && utils.each(t, (function (e) {
                                var t = UE.uNode.createText("\n");
                                e.parentNode.insertBefore(t, e),
                                    e.parentNode.removeChild(e)
                            }));
                            else if (!(browser.ie && browser.ie11below && browser.version > 8)) {
                                var i = e.innerText().split(/\n/);
                                e.innerHTML(""),
                                    utils.each(i, (function (t) {
                                        t.length && e.appendChild(UE.uNode.createText(t)),
                                            e.appendChild(UE.uNode.createElement("br"))
                                    }))
                            }
                        }))
                    })),
                    e.addOutputRule((function (e) {
                        utils.each(e.getNodesByTagName("pre"), (function (e) {
                            var t = "";
                            utils.each(e.children, (function (e) {
                                "text" == e.type ? t += e.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == e.tagName ? t += "\n" : t += dtd.$empty[e.tagName] ? e.innerText() : ""
                            })),
                                e.innerText(t.replace(/(&nbsp;|\n)+$/, ""))
                        }))
                    })),
                    e.notNeedCodeQuery = {
                        help: 1,
                        undo: 1,
                        redo: 1,
                        source: 1,
                        print: 1,
                        searchreplace: 1,
                        fullscreen: 1,
                        preview: 1,
                        insertparagraph: 1,
                        elementpath: 1,
                        insertcode: 1,
                        inserthtml: 1,
                        selectall: 1
                    };
                e.queryCommandState;
                e.queryCommandState = function (e) {
                    var t = this;
                    return !t.notNeedCodeQuery[e.toLowerCase()] && t.selection && t.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
                },
                    e.addListener("beforeenterkeydown", (function () {
                        var t = e.selection.getRange();
                        if (i = domUtils.findParentByTagName(t.startContainer, "pre", !0)) {
                            if (e.fireEvent("saveScene"), t.collapsed || t.deleteContents(), !browser.ie || browser.ie9above) {
                                var i, n = e.document.createElement("br");
                                for (t.insertNode(n).setStartAfter(n).collapse(!0), n.nextSibling || browser.ie && !(browser.version > 10) ? t.setStartAfter(n) : t.insertNode(n.cloneNode(!1)), i = n.previousSibling; i;) if (l = i, !(i = i.previousSibling) || "BR" == i.nodeName) {
                                    i = l;
                                    break
                                }
                                if (i) {
                                    for (var o = ""; i && "BR" != i.nodeName && new RegExp("^[\\s" + domUtils.fillChar + "]*$").test(i.nodeValue);) o += i.nodeValue,
                                        i = i.nextSibling;
                                    if ("BR" != i.nodeName) (d = i.nodeValue.match(new RegExp("^([\\s" + domUtils.fillChar + "]+)"))) && d[1] && (o += d[1]);
                                    o && (o = e.document.createTextNode(o), t.insertNode(o).setStartAfter(o))
                                }
                                t.collapse(!0).select(!0)
                            } else if (browser.version > 8) {
                                var r = e.document.createTextNode("\n"),
                                    a = t.startContainer;
                                if (0 == t.startOffset) {
                                    if (a.previousSibling) {
                                        t.insertNode(r);
                                        var s = e.document.createTextNode(" ");
                                        t.setStartAfter(r).insertNode(s).setStart(s, 0).collapse(!0).select(!0)
                                    }
                                } else {
                                    t.insertNode(r).setStartAfter(r);
                                    s = e.document.createTextNode(" "); (a = t.startContainer.childNodes[t.startOffset]) && !/^\n/.test(a.nodeValue) && t.setStartBefore(r),
                                        t.insertNode(s).setStart(s, 0).collapse(!0).select(!0)
                                }
                            } else {
                                var l;
                                n = e.document.createElement("br");
                                for (t.insertNode(n), t.insertNode(e.document.createTextNode(domUtils.fillChar)), t.setStartAfter(n), i = n.previousSibling; i;) if (l = i, !(i = i.previousSibling) || "BR" == i.nodeName) {
                                    i = l;
                                    break
                                }
                                if (i) {
                                    var d;
                                    for (o = ""; i && "BR" != i.nodeName && new RegExp("^[ " + domUtils.fillChar + "]*$").test(i.nodeValue);) o += i.nodeValue,
                                        i = i.nextSibling;
                                    if ("BR" != i.nodeName) (d = i.nodeValue.match(new RegExp("^([ " + domUtils.fillChar + "]+)"))) && d[1] && (o += d[1]);
                                    o = e.document.createTextNode(o),
                                        t.insertNode(o).setStartAfter(o)
                                }
                                t.collapse(!0).select()
                            }
                            return e.fireEvent("saveScene"),
                                !0
                        }
                    })),
                    e.addListener("tabkeydown", (function (t, i) {
                        var n = e.selection.getRange(),
                            o = domUtils.findParentByTagName(n.startContainer, "pre", !0);
                        if (o) {
                            if (e.fireEvent("saveScene"), i.shiftKey);
                            else if (n.collapsed) {
                                var r = e.document.createTextNode("    ");
                                n.insertNode(r).setStartAfter(r).collapse(!0).select(!0)
                            } else {
                                for (var a = n.createBookmark(), s = a.start.previousSibling; s;) {
                                    if (o.firstChild === s && !domUtils.isBr(s)) {
                                        o.insertBefore(e.document.createTextNode("    "), s);
                                        break
                                    }
                                    if (domUtils.isBr(s)) {
                                        o.insertBefore(e.document.createTextNode("    "), s.nextSibling);
                                        break
                                    }
                                    s = s.previousSibling
                                }
                                var l = a.end;
                                for (s = a.start.nextSibling, o.firstChild === a.start && o.insertBefore(e.document.createTextNode("    "), s.nextSibling); s && s !== l;) {
                                    if (domUtils.isBr(s) && s.nextSibling) {
                                        if (s.nextSibling === l) break;
                                        o.insertBefore(e.document.createTextNode("    "), s.nextSibling)
                                    }
                                    s = s.nextSibling
                                }
                                n.moveToBookmark(a).select()
                            }
                            return e.fireEvent("saveScene"),
                                !0
                        }
                    })),
                    e.addListener("beforeinserthtml", (function (e, t) {
                        var i = this,
                            n = i.selection.getRange();
                        if (domUtils.findParentByTagName(n.startContainer, "pre", !0)) {
                            n.collapsed || n.deleteContents();
                            var o = "";
                            if (browser.ie && browser.version > 8) {
                                utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, (function (e) {
                                    "element" == e.type ? "br" == e.tagName ? o += "\n" : dtd.$empty[e.tagName] || (utils.each(e.children, (function (t) {
                                        "element" == t.type ? "br" == t.tagName ? o += "\n" : dtd.$empty[e.tagName] || (o += t.innerText()) : o += t.data
                                    })), /\n$/.test(o) || (o += "\n")) : o += e.data + "\n",
                                        !e.nextSibling() && /\n$/.test(o) && (o = o.replace(/\n$/, ""))
                                }));
                                var r = i.document.createTextNode(utils.html(o.replace(/&nbsp;/g, " ")));
                                n.insertNode(r).selectNode(r).select()
                            } else {
                                var a = i.document.createDocumentFragment();
                                utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, (function (e) {
                                    "element" == e.type ? "br" == e.tagName ? a.appendChild(i.document.createElement("br")) : dtd.$empty[e.tagName] || (utils.each(e.children, (function (t) {
                                        "element" == t.type ? "br" == t.tagName ? a.appendChild(i.document.createElement("br")) : dtd.$empty[e.tagName] || a.appendChild(i.document.createTextNode(utils.html(t.innerText().replace(/&nbsp;/g, " ")))) : a.appendChild(i.document.createTextNode(utils.html(t.data.replace(/&nbsp;/g, " "))))
                                    })), "BR" != a.lastChild.nodeName && a.appendChild(i.document.createElement("br"))) : a.appendChild(i.document.createTextNode(utils.html(e.data.replace(/&nbsp;/g, " ")))),
                                        e.nextSibling() || "BR" != a.lastChild.nodeName || a.removeChild(a.lastChild)
                                })),
                                    n.insertNode(a).select()
                            }
                            return !0
                        }
                    })),
                    e.addListener("keydown", (function (e, t) {
                        if (40 == (t.keyCode || t.which)) {
                            var i, n = this.selection.getRange(),
                                o = n.startContainer;
                            if (n.collapsed && (i = domUtils.findParentByTagName(n.startContainer, "pre", !0)) && !i.nextSibling) {
                                for (var r = i.lastChild; r && "BR" == r.nodeName;) r = r.previousSibling; (r === o || n.startContainer === i && n.startOffset == i.childNodes.length) && (this.execCommand("insertparagraph"), domUtils.preventDefault(t))
                            }
                        }
                    })),
                    e.addListener("delkeydown", (function (t, i) {
                        var n = this.selection.getRange();
                        n.txtToElmBoundary(!0);
                        var o = n.startContainer;
                        if (domUtils.isTagNode(o, "pre") && n.collapsed && domUtils.isStartInblock(n)) {
                            var r = e.document.createElement("p");
                            return domUtils.fillNode(e.document, r),
                                o.parentNode.insertBefore(r, o),
                                domUtils.remove(o),
                                n.setStart(r, 0).setCursor(!1, !0),
                                domUtils.preventDefault(i),
                                !0
                        }
                    }))
            },
            UE.commands.cleardoc = {
                execCommand: function (e) {
                    var t = this,
                        i = t.options.enterTag,
                        n = t.selection.getRange();
                    "br" == i ? (t.body.innerHTML = "<br/>", n.setStart(t.body, 0).setCursor()) : (t.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", n.setStart(t.body.firstChild, 0).setCursor(!1, !0)),
                        setTimeout((function () {
                            t.fireEvent("clearDoc")
                        }), 0)
                }
            },
            UE.plugin.register("anchor", (function () {
                return {
                    bindEvents: {
                        ready: function () {
                            utils.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}", this.document)
                        }
                    },
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("img"), (function (e) {
                            var t; (t = e.getAttr("anchorname")) && (e.tagName = "a", e.setAttr({
                                anchorname: "",
                                name: t,
                                class: ""
                            }))
                        }))
                    },
                    inputRule: function (e) {
                        utils.each(e.getNodesByTagName("a"), (function (e) {
                            e.getAttr("name") && !e.getAttr("href") && (e.tagName = "img", e.setAttr({
                                anchorname: e.getAttr("name"),
                                class: "anchorclass"
                            }), e.setAttr("name"))
                        }))
                    },
                    commands: {
                        anchor: {
                            execCommand: function (e, t) {
                                var i = this.selection.getRange(),
                                    n = i.getClosedNode();
                                if (n && n.getAttribute("anchorname")) t ? n.setAttribute("anchorname", t) : (i.setStartBefore(n).setCursor(), domUtils.remove(n));
                                else if (t) {
                                    var o = this.document.createElement("img");
                                    i.collapse(!0),
                                        domUtils.setAttributes(o, {
                                            anchorname: t,
                                            class: "anchorclass"
                                        }),
                                        i.insertNode(o).setStartAfter(o).setCursor(!1, !0)
                                }
                            }
                        }
                    }
                }
            })),
            UE.plugins.wordcount = function () {
                var e, t = this;
                t.setOpt("wordCount", !0),
                    t.addListener("contentchange", (function () {
                        t.fireEvent("wordcount")
                    })),
                    t.addListener("ready", (function () {
                        var t = this;
                        domUtils.on(t.body, "keyup", (function (i) {
                            (i.keyCode || i.which) in {
                                16: 1,
                                18: 1,
                                20: 1,
                                37: 1,
                                38: 1,
                                39: 1,
                                40: 1
                            } || (clearTimeout(e), e = setTimeout((function () {
                                t.fireEvent("wordcount")
                            }), 200))
                        }))
                    }))
            },
            UE.plugins.pagebreak = function () {
                var e = this,
                    t = ["td"];
                function i(t) {
                    if (domUtils.isEmptyBlock(t)) {
                        for (var i, n = t.firstChild; n && 1 == n.nodeType && domUtils.isEmptyBlock(n);) i = n,
                            n = n.firstChild; !i && (i = t),
                                domUtils.fillNode(e.document, i)
                    }
                }
                function n(e) {
                    return e && 1 == e.nodeType && "HR" == e.tagName && "pagebreak" == e.className
                }
                e.setOpt("pageBreakTag", "_ueditor_page_break_tag_"),
                    e.ready((function () {
                        utils.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}", e.document)
                    })),
                    e.addInputRule((function (t) {
                        t.traversal((function (t) {
                            if ("text" == t.type && t.data == e.options.pageBreakTag) {
                                var i = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
                                t.parentNode.insertBefore(i, t),
                                    t.parentNode.removeChild(t)
                            }
                        }))
                    })),
                    e.addOutputRule((function (t) {
                        utils.each(t.getNodesByTagName("hr"), (function (t) {
                            if ("pagebreak" == t.getAttr("class")) {
                                var i = UE.uNode.createText(e.options.pageBreakTag);
                                t.parentNode.insertBefore(i, t),
                                    t.parentNode.removeChild(t)
                            }
                        }))
                    })),
                    e.commands.pagebreak = {
                        execCommand: function () {
                            var o = e.selection.getRange(),
                                r = e.document.createElement("hr");
                            domUtils.setAttributes(r, {
                                class: "pagebreak",
                                noshade: "noshade",
                                size: "5"
                            }),
                                domUtils.unSelectable(r);
                            var a = domUtils.findParentByTagName(o.startContainer, t, !0),
                                s = [];
                            if (a) switch (a.tagName) {
                                case "TD":
                                    if ((u = a.parentNode).previousSibling) u.parentNode.insertBefore(r, u),
                                        s = domUtils.findParents(r);
                                    else {
                                        var l = domUtils.findParentByTagName(u, "table");
                                        l.parentNode.insertBefore(r, l),
                                            s = domUtils.findParents(r, !0)
                                    }
                                    r !== (u = s[1]) && domUtils.breakParent(r, u),
                                        e.fireEvent("afteradjusttable", e.document)
                            } else {
                                if (!o.collapsed) {
                                    o.deleteContents();
                                    for (var d = o.startContainer; !domUtils.isBody(d) && domUtils.isBlockElm(d) && domUtils.isEmptyNode(d);) o.setStartBefore(d).collapse(!0),
                                        domUtils.remove(d),
                                        d = o.startContainer
                                }
                                o.insertNode(r);
                                for (var c, u = r.parentNode; !domUtils.isBody(u);) domUtils.breakParent(r, u),
                                    (c = r.nextSibling) && domUtils.isEmptyBlock(c) && domUtils.remove(c),
                                    u = r.parentNode;
                                c = r.nextSibling;
                                var m = r.previousSibling;
                                if (n(m) ? domUtils.remove(m) : m && i(m), c) n(c) ? domUtils.remove(c) : i(c),
                                    o.setEndAfter(r).collapse(!1);
                                else {
                                    var f = e.document.createElement("p");
                                    r.parentNode.appendChild(f),
                                        domUtils.fillNode(e.document, f),
                                        o.setStart(f, 0).collapse(!0)
                                }
                                o.select(!0)
                            }
                        }
                    }
            },
            UE.plugin.register("wordimage", (function () {
                var e = this,
                    t = [];
                return {
                    commands: {
                        wordimage: {
                            execCommand: function () {
                                for (var t, i = domUtils.getElementsByTagName(e.body, "img"), n = [], o = 0; t = i[o++];) {
                                    var r = t.getAttribute("word_img");
                                    r && n.push(r)
                                }
                                return n
                            },
                            queryCommandState: function () {
                                t = domUtils.getElementsByTagName(e.body, "img");
                                for (var i, n = 0; i = t[n++];) if (i.getAttribute("word_img")) return 1;
                                return - 1
                            },
                            notNeedUndo: !0
                        }
                    },
                    inputRule: function (t) {
                        utils.each(t.getNodesByTagName("img"), (function (t) {
                            var i = t.attrs,
                                n = parseInt(i.width) < 128 || parseInt(i.height) < 43,
                                o = e.options,
                                r = o.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
                            i.src && /^(?:(file:\/+))/.test(i.src) && t.setAttr({
                                width: i.width,
                                height: i.height,
                                alt: i.alt,
                                word_img: i.src,
                                src: r,
                                style: "background:url(" + (n ? o.themePath + o.theme + "/images/word.gif" : o.langPath + o.lang + "/images/notaccept.png") + ") no-repeat center center;border:1px solid #ddd"
                            })
                        }))
                    }
                }
            })),
            UE.plugins.dragdrop = function () {
                var e = this;
                e.ready((function () {
                    domUtils.on(this.body, "dragend", (function () {
                        var t = e.selection.getRange(),
                            i = t.getClosedNode() || e.selection.getStart();
                        if (i && "IMG" == i.tagName) {
                            for (var n, o = i.previousSibling; (n = i.nextSibling) && 1 == n.nodeType && "SPAN" == n.tagName && !n.firstChild;) domUtils.remove(n); (!o || 1 != o.nodeType || domUtils.isEmptyBlock(o)) && o || n && (!n || domUtils.isEmptyBlock(n)) || (o && "P" == o.tagName && !domUtils.isEmptyBlock(o) ? (o.appendChild(i), domUtils.moveChild(n, o), domUtils.remove(n)) : n && "P" == n.tagName && !domUtils.isEmptyBlock(n) && n.insertBefore(i, n.firstChild), o && "P" == o.tagName && domUtils.isEmptyBlock(o) && domUtils.remove(o), n && "P" == n.tagName && domUtils.isEmptyBlock(n) && domUtils.remove(n), t.selectNode(i).select(), e.fireEvent("saveScene"))
                        }
                    }))
                })),
                    e.addListener("keyup", (function (t, i) {
                        if (13 == (i.keyCode || i.which)) {
                            var n, o = e.selection.getRange(); (n = domUtils.findParentByTagName(o.startContainer, "p", !0)) && "center" == domUtils.getComputedStyle(n, "text-align") && domUtils.removeStyle(n, "text-align")
                        }
                    }))
            },
            UE.plugins.undo = function () {
                var e, t = this,
                    i = t.options.maxUndoCount || 20,
                    n = t.options.maxInputCount || 20,
                    o = new RegExp(domUtils.fillChar + "|</hr>", "gi"),
                    r = {
                        ol: 1,
                        ul: 1,
                        table: 1,
                        tbody: 1,
                        tr: 1,
                        body: 1
                    },
                    a = t.options.autoClearEmptyNode;
                function s(e, t) {
                    if (e.length != t.length) return 0;
                    for (var i = 0,
                        n = e.length; i < n; i++) if (e[i] != t[i]) return 0;
                    return 1
                }
                t.undoManger = new
                    function () {
                        this.list = [],
                            this.index = 0,
                            this.hasUndo = !1,
                            this.hasRedo = !1,
                            this.undo = function () {
                                if (this.hasUndo) {
                                    if (!this.list[this.index - 1] && 1 == this.list.length) return void this.reset();
                                    for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
                                    this.restore(--this.index)
                                }
                            },
                            this.redo = function () {
                                if (this.hasRedo) {
                                    for (; this.list[this.index].content == this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
                                    this.restore(++this.index)
                                }
                            },
                            this.restore = function () {
                                var e = this.editor,
                                    t = this.list[this.index],
                                    i = UE.htmlparser(t.content.replace(o, ""));
                                e.options.autoClearEmptyNode = !1,
                                    e.filterInputRule(i),
                                    e.options.autoClearEmptyNode = a,
                                    e.document.body.innerHTML = i.toHtml(),
                                    e.fireEvent("afterscencerestore"),
                                    browser.ie && utils.each(domUtils.getElementsByTagName(e.document, "td th caption p"), (function (t) {
                                        domUtils.isEmptyNode(t) && domUtils.fillNode(e.document, t)
                                    }));
                                try {
                                    var n = new dom.Range(e.document).moveToAddress(t.address);
                                    n.select(r[n.startContainer.nodeName.toLowerCase()])
                                } catch (s) { }
                                this.update(),
                                    this.clearKey(),
                                    e.fireEvent("reset", !0)
                            },
                            this.getScene = function () {
                                var e = this.editor,
                                    t = e.selection.getRange().createAddress(!1, !0);
                                e.fireEvent("beforegetscene");
                                var i = UE.htmlparser(e.body.innerHTML);
                                e.options.autoClearEmptyNode = !1,
                                    e.filterOutputRule(i),
                                    e.options.autoClearEmptyNode = a;
                                var n = i.toHtml();
                                return e.fireEvent("aftergetscene"),
                                {
                                    address: t,
                                    content: n
                                }
                            },
                            this.save = function (n, o) {
                                clearTimeout(e);
                                var r, a, l = this.getScene(o),
                                    d = this.list[this.index]; (d && d.content != l.content && t.trigger("contentchange"), d && d.content == l.content && (n || (r = d.address, a = l.address, r.collapsed == a.collapsed && s(r.startAddress, a.startAddress) && s(r.endAddress, a.endAddress)))) || (this.list = this.list.slice(0, this.index + 1), this.list.push(l), this.list.length > i && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
                            },
                            this.update = function () {
                                this.hasRedo = !!this.list[this.index + 1],
                                    this.hasUndo = !!this.list[this.index - 1]
                            },
                            this.reset = function () {
                                this.list = [],
                                    this.index = 0,
                                    this.hasUndo = !1,
                                    this.hasRedo = !1,
                                    this.clearKey()
                            },
                            this.clearKey = function () {
                                d = 0,
                                    null
                            }
                    },
                    t.undoManger.editor = t,
                    t.addListener("saveScene", (function () {
                        var e = Array.prototype.splice.call(arguments, 1);
                        this.undoManger.save.apply(this.undoManger, e)
                    })),
                    t.addListener("reset", (function (e, t) {
                        t || this.undoManger.reset()
                    })),
                    t.commands.redo = t.commands.undo = {
                        execCommand: function (e) {
                            this.undoManger[e]()
                        },
                        queryCommandState: function (e) {
                            return this.undoManger["has" + ("undo" == e.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
                        },
                        notNeedUndo: 1
                    };
                var l = {
                    16: 1,
                    17: 1,
                    18: 1,
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1
                },
                    d = 0,
                    c = !1;
                t.addListener("ready", (function () {
                    domUtils.on(this.body, "compositionstart", (function () {
                        c = !0
                    })),
                        domUtils.on(this.body, "compositionend", (function () {
                            c = !1
                        }))
                })),
                    t.addshortcutkey({
                        Undo: "ctrl+90",
                        Redo: "ctrl+89"
                    });
                var u = !0;
                t.addListener("keydown", (function (t, i) {
                    var o = this,
                        r = i.keyCode || i.which;
                    if (!(l[r] || i.ctrlKey || i.metaKey || i.altKey)) {
                        if (c) return;
                        if (!o.selection.getRange().collapsed) return o.undoManger.save(!1, !0),
                            void (u = !1);
                        function a(e) {
                            e.undoManger.save(!1, !0),
                                e.fireEvent("selectionchange")
                        }
                        0 == o.undoManger.list.length && o.undoManger.save(!0),
                            clearTimeout(e),
                            e = setTimeout((function () {
                                if (c) var e = setInterval((function () {
                                    c || (a(o), clearInterval(e))
                                }), 300);
                                else a(o)
                            }), 200),
                            r,
                            ++d >= n && a(o)
                    }
                })),
                    t.addListener("keyup", (function (e, t) {
                        var i = t.keyCode || t.which;
                        if (!(l[i] || t.ctrlKey || t.metaKey || t.altKey)) {
                            if (c) return;
                            u || (this.undoManger.save(!1, !0), u = !0)
                        }
                    })),
                    t.stopCmdUndo = function () {
                        t.__hasEnterExecCommand = !0
                    },
                    t.startCmdUndo = function () {
                        t.__hasEnterExecCommand = !1
                    }
            },
            UE.plugin.register("copy", (function () {
                var e = this;
                function t() {
                    ZeroClipboard.config({
                        debug: !1,
                        swfPath: e.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.swf"
                    });
                    var t = e.zeroclipboard = new ZeroClipboard;
                    t.on("copy", (function (t) {
                        var i = t.client,
                            n = e.selection.getRange(),
                            o = document.createElement("div");
                        o.appendChild(n.cloneContents()),
                            i.setText(o.innerText || o.textContent),
                            i.setHtml(o.innerHTML),
                            n.select()
                    })),
                        t.on("mouseover mouseout", (function (e) {
                            var t = e.target;
                            "mouseover" == e.type ? domUtils.addClass(t, "edui-state-hover") : "mouseout" == e.type && domUtils.removeClasses(t, "edui-state-hover")
                        })),
                        t.on("wrongflash noflash", (function () {
                            ZeroClipboard.destroy()
                        }))
                }
                return {
                    bindEvents: {
                        ready: function () {
                            browser.ie || (window.ZeroClipboard ? t() : utils.loadFile(document, {
                                src: e.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.js",
                                tag: "script",
                                type: "text/javascript",
                                defer: "defer"
                            },
                                (function () {
                                    t()
                                })))
                        }
                    },
                    commands: {
                        copy: {
                            execCommand: function (t) {
                                e.document.execCommand("copy") || alert(e.getLang("copymsg"))
                            }
                        }
                    }
                }
            })),
            UE.plugins.paste = function () {
                function e(e) {
                    var t = this.document;
                    if (!t.getElementById("baidu_pastebin")) {
                        var i = this.selection.getRange(),
                            n = i.createBookmark(),
                            o = t.createElement("div");
                        o.id = "baidu_pastebin",
                            browser.webkit && o.appendChild(t.createTextNode(domUtils.fillChar + domUtils.fillChar)),
                            t.body.appendChild(o),
                            n.start.style.display = "",
                            o.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + domUtils.getXY(n.start).y + "px",
                            i.selectNodeContents(o).select(!0),
                            setTimeout((function () {
                                if (browser.webkit) for (var r, a = 0,
                                    s = t.querySelectorAll("#baidu_pastebin"); r = s[a++];) {
                                    if (!domUtils.isEmptyNode(r)) {
                                        o = r;
                                        break
                                    }
                                    domUtils.remove(r)
                                }
                                try {
                                    o.parentNode.removeChild(o)
                                } catch (l) { }
                                i.moveToBookmark(n).select(!0),
                                    e(o)
                            }), 0)
                    }
                }
                var t, i, n, o = this;
                function r(e) {
                    return e.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, (function (e, t, i, n) {
                        return {
                            img: 1
                        }[i = i.toLowerCase()] ? e : (n = n.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, (function (e, t, i) {
                            return {
                                src: 1,
                                href: 1,
                                name: 1
                            }[t.toLowerCase()] ? t + "=" + i + " " : ""
                        })), {
                            span: 1,
                            div: 1
                        }[i] ? "" : "<" + t + i + " " + utils.trim(n) + ">")
                    }))
                }
                function a(e) {
                    var a;
                    if (e.firstChild) {
                        for (var s = domUtils.getElementsByTagName(e, "span"), l = 0; u = s[l++];) {
                            if ("_baidu_cut_start" != u.id && "_baidu_cut_end" != u.id || domUtils.remove(u), u.attributes && u.attributes.style && u.attributes.style.nodeValue && -1 !== u.attributes.style.nodeValue.indexOf("text-decoration-line")) c = (c = u.attributes.style.nodeValue).replace(/text-decoration-line/g, "text-decoration"),
                                u.setAttribute("style", c)
                        }
                        var d = domUtils.getElementsByTagName(e, "ol");
                        for (l = 0; u = d[l++];) if (u.attributes && u.attributes.style && u.attributes.style.nodeValue && -1 === u.attributes.style.nodeValue.indexOf("list-style-type")) {
                            var c = u.attributes.style.nodeValue + "list-style-type: decimal;";
                            u.setAttribute("style", c)
                        }
                        var u, m = domUtils.getElementsByTagName(e, "ul");
                        for (l = 0; u = m[l++];) if (u.attributes && u.attributes.style && u.attributes.style.nodeValue && -1 === u.attributes.style.nodeValue.indexOf("list-style-type")) {
                            c = u.attributes.style.nodeValue + "list-style-type: disc;";
                            u.setAttribute("style", c)
                        }
                        if (browser.webkit) {
                            var f, h = e.querySelectorAll("div br");
                            for (l = 0; f = h[l++];) {
                                var p = f.parentNode;
                                "DIV" == p.tagName && 1 == p.childNodes.length && (p.innerHTML = "<p><br/></p>", domUtils.remove(p))
                            }
                            var g, b = e.querySelectorAll("#baidu_pastebin");
                            for (l = 0; g = b[l++];) {
                                var v = o.document.createElement("p");
                                for (g.parentNode.insertBefore(v, g); g.firstChild;) v.appendChild(g.firstChild);
                                domUtils.remove(g)
                            }
                            var y = e.querySelectorAll("meta");
                            for (l = 0; N = y[l++];) domUtils.remove(N);
                            h = e.querySelectorAll("br");
                            for (l = 0; N = h[l++];)/^apple-/i.test(N.className) && domUtils.remove(N)
                        } if (browser.gecko) { var C = e.querySelectorAll("[_moz_dirty]"); for (l = 0; N = C[l++];)N.removeAttribute("_moz_dirty") } if (!browser.ie) { var N, x = e.querySelectorAll("span.Apple-style-span"); for (l = 0; N = x[l++];)domUtils.remove(N, !0) } a = e.innerHTML, a = UE.filterWord(a); var w = UE.htmlparser(a); if (o.options.filterRules && UE.filterNode(w, o.options.filterRules), o.filterInputRule(w), browser.webkit) { var U = w.lastChild(); U && "element" == U.type && "br" == U.tagName && w.removeChild(U), utils.each(o.body.querySelectorAll("div"), (function (e) { domUtils.isEmptyBlock(e) && domUtils.remove(e, !0) })) } if (a = { html: w.toHtml() }, o.fireEvent("beforepaste", a, w), !a.html) return; w = UE.htmlparser(a.html, !0), 1 === o.queryCommandState("pasteplain") ? o.execCommand("insertHtml", UE.filterNode(w, o.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(w, o.options.filterTxtRules), t = w.toHtml(), i = a.html, n = o.selection.getRange().createAddress(!0), o.execCommand("insertHtml", !0 === o.getOpt("retainOnlyLabelPasted") ? r(i) : i, !0)), o.fireEvent("afterpaste", a)
                    }
                } o.setOpt({ retainOnlyLabelPasted: !1 }), o.addListener("pasteTransfer", (function (e, a) { if (n && t && i && t != i) { var s = o.selection.getRange(); if (s.moveToAddress(n, !0), !s.collapsed) { for (; !domUtils.isBody(s.startContainer);) { var l = s.startContainer; if (1 == l.nodeType) { if (!(l = l.childNodes[s.startOffset])) { s.setStartBefore(s.startContainer); continue } var d = l.previousSibling; d && 3 == d.nodeType && new RegExp("^[\n\r\t " + domUtils.fillChar + "]*$").test(d.nodeValue) && s.setStartBefore(d) } if (0 != s.startOffset) break; s.setStartBefore(s.startContainer) } for (; !domUtils.isBody(s.endContainer);) { var c = s.endContainer; if (1 == c.nodeType) { if (!(c = c.childNodes[s.endOffset])) { s.setEndAfter(s.endContainer); continue } var u = c.nextSibling; u && 3 == u.nodeType && new RegExp("^[\n\r\t" + domUtils.fillChar + "]*$").test(u.nodeValue) && s.setEndAfter(u) } if (s.endOffset != s.endContainer[3 == s.endContainer.nodeType ? "nodeValue" : "childNodes"].length) break; s.setEndAfter(s.endContainer) } } s.deleteContents(), s.select(!0), o.__hasEnterExecCommand = !0; var m = i; 2 === a ? m = r(m) : a && (m = t), o.execCommand("inserthtml", m, !0), o.__hasEnterExecCommand = !1; for (var f = o.selection.getRange(); !domUtils.isBody(f.startContainer) && !f.startOffset && f.startContainer[3 == f.startContainer.nodeType ? "nodeValue" : "childNodes"].length;)f.setStartBefore(f.startContainer); var h = f.createAddress(!0); n.endAddress = h.startAddress } })), o.addListener("ready", (function () { domUtils.on(o.body, "cut", (function () { !o.selection.getRange().collapsed && o.undoManger && o.undoManger.save() })), domUtils.on(o.body, browser.ie || browser.opera ? "keydown" : "paste", (function (t) { (!browser.ie && !browser.opera || (t.ctrlKey || t.metaKey) && "86" == t.keyCode) && e.call(o, (function (e) { a(e) })) })) })), o.commands.paste = { execCommand: function (t) { browser.ie ? (e.call(o, (function (e) { a(e) })), o.document.execCommand("paste")) : alert(o.getLang("pastemsg")) } }
            }, UE.plugins.pasteplain = function () { this.setOpt({ pasteplain: !1, filterTxtRules: function () { function e(e) { e.tagName = "p", e.setStyle() } function t(e) { e.parentNode.removeChild(e, !0) } return { "-": "script style object iframe embed input select", p: { $: {} }, br: { $: {} }, div: function (e) { for (var t, i = UE.uNode.createElement("p"); t = e.firstChild();)"text" != t.type && UE.dom.dtd.$block[t.tagName] ? i.firstChild() ? (e.parentNode.insertBefore(i, e), i = UE.uNode.createElement("p")) : e.parentNode.insertBefore(t, e) : i.appendChild(t); i.firstChild() && e.parentNode.insertBefore(i, e), e.parentNode.removeChild(e) }, ol: t, ul: t, dl: t, dt: t, dd: t, li: t, caption: e, th: e, tr: e, h1: e, h2: e, h3: e, h4: e, h5: e, h6: e, td: function (e) { !!e.innerText() && e.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), e), e.parentNode.removeChild(e, e.innerText()) } } }() }); var e = this.options.pasteplain; this.commands.pasteplain = { queryCommandState: function () { return e ? 1 : 0 }, execCommand: function () { e = 0 | !e }, notNeedUndo: 1 } }, UE.plugins.list = function () {
                var e = this, t = { TD: 1, PRE: 1, BLOCKQUOTE: 1 }, i = { cn: "cn-1-", cn1: "cn-2-", cn2: "cn-3-", num: "num-1-", num1: "num-2-", num2: "num-3-", dash: "dash", dot: "dot" }; function n(e) { var t = []; for (var i in e) t.push(i); return t } e.setOpt({ autoTransWordToList: !1, insertorderedlist: { num: "", num1: "", num2: "", cn: "", cn1: "", cn2: "", decimal: "", "lower-alpha": "", "lower-roman": "", "upper-alpha": "", "upper-roman": "" }, insertunorderedlist: { circle: "", disc: "", square: "", dash: "", dot: "" }, listDefaultPaddingLeft: "30", listiconpath: "http://bs.baidu.com/listicon/", maxListLevel: -1, disablePInList: !1 }); var o = { OL: n(e.options.insertorderedlist), UL: n(e.options.insertunorderedlist) }, r = e.options.listiconpath; for (var a in i) e.options.insertorderedlist.hasOwnProperty(a) || e.options.insertunorderedlist.hasOwnProperty(a) || delete i[a]; function s(e) { var t = e.className; return domUtils.hasClass(e, /custom_/) ? t.match(/custom_(\w+)/)[1] : domUtils.getStyle(e, "list-style-type") } function l(e, t) { utils.each(domUtils.getElementsByTagName(e, "ol ul"), (function (n) { if (domUtils.inDoc(n, e)) { var r = n.parentNode; if (r.tagName == n.tagName) { var a = s(n) || ("OL" == n.tagName ? "decimal" : "disc"); if (a == (s(r) || ("OL" == r.tagName ? "decimal" : "disc"))) { var l = utils.indexOf(o[n.tagName], a); l = l + 1 == o[n.tagName].length ? 0 : l + 1, c(n, o[n.tagName][l]) } } var u = 0, m = 2; domUtils.hasClass(n, /custom_/) ? /[ou]l/i.test(r.tagName) && domUtils.hasClass(r, /custom_/) || (m = 1) : /[ou]l/i.test(r.tagName) && domUtils.hasClass(r, /custom_/) && (m = 3); var f = domUtils.getStyle(n, "list-style-type"); f && (n.style.cssText = "list-style-type:" + f), n.className = utils.trim(n.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + m, utils.each(domUtils.getElementsByTagName(n, "li"), (function (e) { if (e.style.cssText && (e.style.cssText = ""), e.firstChild) { if (e.parentNode === n) { if (u++, domUtils.hasClass(n, /custom_/)) { var t = 1, o = s(n); if ("OL" == n.tagName) { if (o) switch (o) { case "cn": case "cn1": case "cn2": u > 10 && (u % 10 == 0 || u > 10 && u < 20) ? t = 2 : u > 20 && (t = 3); break; case "num2": u > 9 && (t = 2) }e.className = "list-" + i[o] + u + " list-" + o + "-paddingleft-" + t } else e.className = "list-" + i[o] + " list-" + o + "-paddingleft" } else e.className = e.className.replace(/list-[\w\-]+/gi, ""); var r = e.getAttribute("class"); null === r || r.replace(/\s/g, "") || domUtils.removeAttributes(e, "class") } } else domUtils.remove(e) })), !t && d(n, n.tagName.toLowerCase(), s(n) || domUtils.getStyle(n, "list-style-type"), !0) } })) } function d(e, t, i, n) { var o = e.nextSibling; o && 1 == o.nodeType && o.tagName.toLowerCase() == t && (s(o) || domUtils.getStyle(o, "list-style-type") || ("ol" == t ? "decimal" : "disc")) == i && (domUtils.moveChild(o, e), 0 == o.childNodes.length && domUtils.remove(o)), o && domUtils.isFillChar(o) && domUtils.remove(o); var r = e.previousSibling; r && 1 == r.nodeType && r.tagName.toLowerCase() == t && (s(r) || domUtils.getStyle(r, "list-style-type") || ("ol" == t ? "decimal" : "disc")) == i && domUtils.moveChild(e, r), r && domUtils.isFillChar(r) && domUtils.remove(r), !n && domUtils.isEmptyBlock(e) && domUtils.remove(e), s(e) && l(e.ownerDocument, !0) } function c(e, t) { i[t] && (e.className = "custom_" + t); try { domUtils.setStyle(e, "list-style-type", t) } catch (n) { } } function u(e) { var t = e.previousSibling; t && domUtils.isEmptyBlock(t) && domUtils.remove(t), (t = e.nextSibling) && domUtils.isEmptyBlock(t) && domUtils.remove(t) } function m(e) { for (; e && !domUtils.isBody(e);) { if ("TABLE" == e.nodeName) return null; if ("LI" == e.nodeName) return e; e = e.parentNode } } e.ready((function () { var t = []; for (var n in i) { if ("dash" == n || "dot" == n) t.push("li.list-" + i[n] + "{background-image:url(" + r + i[n] + ".gif)}"), t.push("ul.custom_" + n + "{list-style:none;}ul.custom_" + n + " li{background-position:0 3px;background-repeat:no-repeat}"); else { for (var o = 0; o < 99; o++)t.push("li.list-" + i[n] + o + "{background-image:url(" + r + "list-" + i[n] + o + ".gif)}"); t.push("ol.custom_" + n + "{list-style:none;}ol.custom_" + n + " li{background-position:0 3px;background-repeat:no-repeat}") } switch (n) { case "cn": t.push("li.list-" + n + "-paddingleft-1{padding-left:25px}"), t.push("li.list-" + n + "-paddingleft-2{padding-left:40px}"), t.push("li.list-" + n + "-paddingleft-3{padding-left:55px}"); break; case "cn1": t.push("li.list-" + n + "-paddingleft-1{padding-left:30px}"), t.push("li.list-" + n + "-paddingleft-2{padding-left:40px}"), t.push("li.list-" + n + "-paddingleft-3{padding-left:55px}"); break; case "cn2": t.push("li.list-" + n + "-paddingleft-1{padding-left:40px}"), t.push("li.list-" + n + "-paddingleft-2{padding-left:55px}"), t.push("li.list-" + n + "-paddingleft-3{padding-left:68px}"); break; case "num": case "num1": t.push("li.list-" + n + "-paddingleft-1{padding-left:25px}"); break; case "num2": t.push("li.list-" + n + "-paddingleft-1{padding-left:35px}"), t.push("li.list-" + n + "-paddingleft-2{padding-left:40px}"); break; case "dash": t.push("li.list-" + n + "-paddingleft{padding-left:35px}"); break; case "dot": t.push("li.list-" + n + "-paddingleft{padding-left:20px}") } } t.push(".list-paddingleft-1{padding-left:0}"), t.push(".list-paddingleft-2{padding-left:" + e.options.listDefaultPaddingLeft + "px}"), t.push(".list-paddingleft-3{padding-left:" + 2 * e.options.listDefaultPaddingLeft + "px}"), utils.cssRule("list", "ol,ul{margin:0;pading:0;" + (browser.ie ? "" : "width:95%") + "}li{clear:both;}" + t.join("\n"), e.document) })), e.ready((function () { domUtils.on(e.body, "cut", (function () { setTimeout((function () { var t, i = e.selection.getRange(); if (!i.collapsed && (t = domUtils.findParentByTagName(i.startContainer, "li", !0)) && !t.nextSibling && domUtils.isEmptyBlock(t)) { var n, o = t.parentNode; if (n = o.previousSibling) domUtils.remove(o), i.setStartAtLast(n).collapse(!0), i.select(!0); else if (n = o.nextSibling) domUtils.remove(o), i.setStartAtFirst(n).collapse(!0), i.select(!0); else { var r = e.document.createElement("p"); domUtils.fillNode(e.document, r), o.parentNode.insertBefore(r, o), domUtils.remove(o), i.setStart(r, 0).collapse(!0), i.select(!0) } } })) })) })), e.addListener("beforepaste", (function (e, t) { var n, r = this.selection.getRange(), a = UE.htmlparser(t.html, !0); if (n = domUtils.findParentByTagName(r.startContainer, "li", !0)) { var l = n.parentNode, d = "OL" == l.tagName ? "ul" : "ol"; utils.each(a.getNodesByTagName(d), (function (t) { if (t.tagName = l.tagName, t.setAttr(), t.parentNode === a) e = s(l) || ("OL" == l.tagName ? "decimal" : "disc"); else { var n = t.parentNode.getAttr("class"); (e = n && /custom_/.test(n) ? n.match(/custom_(\w+)/)[1] : t.parentNode.getStyle("list-style-type")) || (e = "OL" == l.tagName ? "decimal" : "disc") } var r = utils.indexOf(o[l.tagName], e); t.parentNode !== a && (r = r + 1 == o[l.tagName].length ? 0 : r + 1); var d = o[l.tagName][r]; i[d] ? t.setAttr("class", "custom_" + d) : t.setStyle("list-style-type", d) })) } t.html = a.toHtml() })), !0 === e.getOpt("disablePInList") && e.addOutputRule((function (e) { utils.each(e.getNodesByTagName("li"), (function (e) { var t = [], i = 0; utils.each(e.children, (function (n) { if ("p" == n.tagName) { for (var o; o = n.children.pop();)t.splice(i, 0, o), o.parentNode = e, lastNode = o; if (!(o = t[t.length - 1]) || "element" != o.type || "br" != o.tagName) { var r = UE.uNode.createElement("br"); r.parentNode = e, t.push(r) } i = t.length } })), t.length && (e.children = t) })) })), e.addInputRule((function (t) { if (utils.each(t.getNodesByTagName("li"), (function (e) { for (var t, i = UE.uNode.createElement("p"), n = 0; t = e.children[n];)"text" == t.type || dtd.p[t.tagName] ? i.appendChild(t) : i.firstChild() ? (e.insertBefore(i, t), i = UE.uNode.createElement("p"), n += 2) : n++; (i.firstChild() && !i.parentNode || !e.firstChild()) && e.appendChild(i), i.firstChild() || i.innerHTML(browser.ie ? "&nbsp;" : "<br/>"); var o = e.firstChild(), r = o.lastChild(); r && "text" == r.type && /^\s*$/.test(r.data) && o.removeChild(r) })), e.options.autoTransWordToList) { var n = { num1: /^\d+\)/, decimal: /^\d+\./, "lower-alpha": /^[a-z]+\)/, "upper-alpha": /^[A-Z]+\./, cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/, cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/ }, o = { square: "n" }; function r(e, t) { var i = t.firstChild(); if (i && "element" == i.type && "span" == i.tagName && /Wingdings|Symbol/.test(i.getStyle("font-family"))) { for (var r in o) if (o[r] == i.data) return r; return "disc" } for (var r in n) if (n[r].test(e)) return r } utils.each(t.getNodesByTagName("p"), (function (t) { if ("MsoListParagraph" == t.getAttr("class")) { t.setStyle("margin", ""), t.setStyle("margin-left", ""), t.setAttr("class", ""); var o, a = t, s = t; if ("li" != t.parentNode.tagName && (o = r(t.innerText(), t))) { var l = UE.uNode.createElement(e.options.insertorderedlist.hasOwnProperty(o) ? "ol" : "ul"); for (i[o] ? l.setAttr("class", "custom_" + o) : l.setStyle("list-style-type", o); t && "li" != t.parentNode.tagName && r(t.innerText(), t);)(a = t.nextSibling()) || t.parentNode.insertBefore(l, t), c(l, t, o), t = a; !l.parentNode && t && t.parentNode && t.parentNode.insertBefore(l, t) } var d = s.firstChild(); d && "element" == d.type && "span" == d.tagName && /^\s*(&nbsp;)+\s*$/.test(d.innerText()) && d.parentNode.removeChild(d) } function c(e, t, i) { if ("ol" == e.tagName) if (browser.ie) { var o = t.firstChild(); "element" == o.type && "span" == o.tagName && n[i].test(o.innerText()) && t.removeChild(o) } else t.innerHTML(t.innerHTML().replace(n[i], "")); else t.removeChild(t.firstChild()); var r = UE.uNode.createElement("li"); r.appendChild(t), e.appendChild(r) } })) } })), e.addListener("contentchange", (function () { l(e.document) })), e.addListener("keydown", (function (t, i) { function n() { i.preventDefault ? i.preventDefault() : i.returnValue = !1, e.fireEvent("contentchange"), e.undoManger && e.undoManger.save() } function o(e, t) { for (; e && !domUtils.isBody(e);) { if (t(e)) return null; if (1 == e.nodeType && /[ou]l/i.test(e.tagName)) return e; e = e.parentNode } return null } var r = i.keyCode || i.which; if (13 == r && !i.shiftKey) { var a = e.selection.getRange(), s = domUtils.findParent(a.startContainer, (function (e) { return domUtils.isBlockElm(e) }), !0), l = domUtils.findParentByTagName(a.startContainer, "li", !0); if (s && "PRE" != s.tagName && !l) { var d = s.innerHTML.replace(new RegExp(domUtils.fillChar, "g"), ""); !!e.options.removeAutoList && e.options.removeAutoList || /^\s*1\s*\.[^\d]/.test(d) && (s.innerHTML = d.replace(/^\s*1\s*\./, ""), a.setStartAtLast(s).collapse(!0).select(), e.__hasEnterExecCommand = !0, e.execCommand("insertorderedlist"), e.__hasEnterExecCommand = !1) } var c = e.selection.getRange(), m = o(c.startContainer, (function (e) { return "TABLE" == e.tagName })), f = c.collapsed ? m : o(c.endContainer, (function (e) { return "TABLE" == e.tagName })); if (m && f && m === f) { if (!c.collapsed) { if (m = domUtils.findParentByTagName(c.startContainer, "li", !0), f = domUtils.findParentByTagName(c.endContainer, "li", !0), !m || !f || m !== f) { var h = c.cloneRange(), p = h.collapse(!1).createBookmark(); return c.deleteContents(), h.moveToBookmark(p), u(l = domUtils.findParentByTagName(h.startContainer, "li", !0)), h.select(), void n() } if (c.deleteContents(), (l = domUtils.findParentByTagName(c.startContainer, "li", !0)) && domUtils.isEmptyBlock(l)) return C = l.previousSibling, next = l.nextSibling, b = e.document.createElement("p"), domUtils.fillNode(e.document, b), N = l.parentNode, C && next ? (c.setStart(next, 0).collapse(!0).select(!0), domUtils.remove(l)) : ((C || next) && C ? l.parentNode.parentNode.insertBefore(b, N.nextSibling) : N.parentNode.insertBefore(b, N), domUtils.remove(l), N.firstChild || domUtils.remove(N), c.setStart(b, 0).setCursor()), void n() } if (l = domUtils.findParentByTagName(c.startContainer, "li", !0)) { if (domUtils.isEmptyBlock(l)) { if (p = c.createBookmark(), l !== (N = l.parentNode).lastChild ? (domUtils.breakParent(l, N), u(l)) : (N.parentNode.insertBefore(l, N.nextSibling), domUtils.isEmptyNode(N) && domUtils.remove(N)), !dtd.$list[l.parentNode.tagName]) if (domUtils.isBlockElm(l.firstChild)) domUtils.remove(l, !0); else { for (b = e.document.createElement("p"), l.parentNode.insertBefore(b, l); l.firstChild;)b.appendChild(l.firstChild); domUtils.remove(l) } c.moveToBookmark(p).select() } else { var g = l.firstChild; if (!g || !domUtils.isBlockElm(g)) { var b = e.document.createElement("p"); for (!l.firstChild && domUtils.fillNode(e.document, b); l.firstChild;)b.appendChild(l.firstChild); l.appendChild(b), g = b } var v = e.document.createElement("span"); c.insertNode(v), domUtils.breakParent(v, l); var y = v.nextSibling; (g = y.firstChild) || (b = e.document.createElement("p"), domUtils.fillNode(e.document, b), y.appendChild(b), g = b), domUtils.isEmptyNode(g) && (g.innerHTML = "", domUtils.fillNode(e.document, g)), c.setStart(g, 0).collapse(!0).shrinkBoundary().select(), domUtils.remove(v); var C = y.previousSibling; C && domUtils.isEmptyBlock(C) && (C.innerHTML = "<p></p>", domUtils.fillNode(e.document, C.firstChild)) } n() } } } if (8 == r && (c = e.selection.getRange()).collapsed && domUtils.isStartInblock(c) && (h = c.cloneRange().trimBoundary(), (l = domUtils.findParentByTagName(c.startContainer, "li", !0)) && domUtils.isStartInblock(h))) { if ((m = domUtils.findParentByTagName(c.startContainer, "p", !0)) && m !== l.firstChild) { var N = domUtils.findParentByTagName(m, ["ol", "ul"]); return domUtils.breakParent(m, N), u(m), e.fireEvent("contentchange"), c.setStart(m, 0).setCursor(!1, !0), e.fireEvent("saveScene"), void domUtils.preventDefault(i) } if (l && (C = l.previousSibling)) { if (46 == r && l.childNodes.length) return; if (dtd.$list[C.tagName] && (C = C.lastChild), e.undoManger && e.undoManger.save(), g = l.firstChild, domUtils.isBlockElm(g)) if (domUtils.isEmptyNode(g)) for (C.appendChild(g), c.setStart(g, 0).setCursor(!1, !0); l.firstChild;)C.appendChild(l.firstChild); else v = e.document.createElement("span"), c.insertNode(v), domUtils.isEmptyBlock(C) && (C.innerHTML = ""), domUtils.moveChild(l, C), c.setStartBefore(v).collapse(!0).select(!0), domUtils.remove(v); else if (domUtils.isEmptyNode(l)) { b = e.document.createElement("p"); C.appendChild(b), c.setStart(b, 0).setCursor() } else for (c.setEnd(C, C.childNodes.length).collapse().select(!0); l.firstChild;)C.appendChild(l.firstChild); return domUtils.remove(l), e.fireEvent("contentchange"), e.fireEvent("saveScene"), void domUtils.preventDefault(i) } if (l && !l.previousSibling) { N = l.parentNode, p = c.createBookmark(); if (domUtils.isTagNode(N.parentNode, "ol ul")) N.parentNode.insertBefore(l, N), domUtils.isEmptyNode(N) && domUtils.remove(N); else { for (; l.firstChild;)N.parentNode.insertBefore(l.firstChild, N); domUtils.remove(l), domUtils.isEmptyNode(N) && domUtils.remove(N) } return c.moveToBookmark(p).setCursor(!1, !0), e.fireEvent("contentchange"), e.fireEvent("saveScene"), void domUtils.preventDefault(i) } } })), e.addListener("keyup", (function (t, i) { if (8 == (i.keyCode || i.which)) { var n, o = e.selection.getRange(); (n = domUtils.findParentByTagName(o.startContainer, ["ol", "ul"], !0)) && d(n, n.tagName.toLowerCase(), s(n) || domUtils.getComputedStyle(n, "list-style-type"), !0) } })), e.addListener("tabkeydown", (function () {
                    var t = e.selection.getRange(); function i(t) { if (-1 != e.options.maxListLevel) { for (var i = t.parentNode, n = 0; /[ou]l/i.test(i.tagName);)n++, i = i.parentNode; if (n >= e.options.maxListLevel) return !0 } } var n = domUtils.findParentByTagName(t.startContainer, "li", !0);
                    if (n) {
                        var r;
                        if (!t.collapsed) {
                            e.fireEvent("saveScene"),
                                r = t.createBookmark();
                            for (var a, l, u = 0,
                                m = domUtils.findParents(n); l = m[u++];) if (domUtils.isTagNode(l, "ol ul")) {
                                    a = l;
                                    break
                                }
                            var f = n;
                            if (r.end) for (; f && !(domUtils.getPosition(f, r.end) & domUtils.POSITION_FOLLOWING);) if (i(f)) f = domUtils.getNextDomNode(f, !1, null, (function (e) {
                                return e !== a
                            }));
                            else {
                                b = f.parentNode,
                                    v = e.document.createElement(b.tagName);
                                var h = (p = utils.indexOf(o[v.tagName], s(b) || domUtils.getComputedStyle(b, "list-style-type"))) + 1 == o[v.tagName].length ? 0 : p + 1;
                                for (c(v, g = o[v.tagName][h]), b.insertBefore(v, f); f && !(domUtils.getPosition(f, r.end) & domUtils.POSITION_FOLLOWING);) {
                                    if (n = f.nextSibling, v.appendChild(f), !n || domUtils.isTagNode(n, "ol ul")) {
                                        if (n) for (; (n = n.firstChild) && "LI" != n.tagName;);
                                        else n = domUtils.getNextDomNode(f, !1, null, (function (e) {
                                            return e !== a
                                        }));
                                        break
                                    }
                                    f = n
                                }
                                d(v, v.tagName.toLowerCase(), g),
                                    f = n
                            }
                            return e.fireEvent("contentchange"),
                                t.moveToBookmark(r).select(),
                                !0
                        }
                        if (i(n)) return !0;
                        var p, g, b = n.parentNode,
                            v = e.document.createElement(b.tagName);
                        if (p = (p = utils.indexOf(o[v.tagName], s(b) || domUtils.getComputedStyle(b, "list-style-type"))) + 1 == o[v.tagName].length ? 0 : p + 1, c(v, g = o[v.tagName][p]), domUtils.isStartInblock(t)) return e.fireEvent("saveScene"),
                            r = t.createBookmark(),
                            b.insertBefore(v, n),
                            v.appendChild(n),
                            d(v, v.tagName.toLowerCase(), g),
                            e.fireEvent("contentchange"),
                            t.moveToBookmark(r).select(!0),
                            !0
                    }
                })),
                    e.commands.insertorderedlist = e.commands.insertunorderedlist = {
                        execCommand: function (e, i) {
                            i || (i = "insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
                            var n = this,
                                o = this.selection.getRange(),
                                r = function (e) {
                                    return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !domUtils.isWhitespace(e)
                                },
                                a = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul",
                                l = n.document.createDocumentFragment();
                            o.adjustmentBoundary().shrinkBoundary();
                            var u, f, h, p, g = o.createBookmark(!0),
                                b = m(n.document.getElementById(g.start)),
                                v = 0,
                                y = m(n.document.getElementById(g.end)),
                                C = 0;
                            if (b || y) {
                                if (b && (u = b.parentNode), g.end || (y = b), y && (f = y.parentNode), u === f) {
                                    for (; b !== y;) {
                                        if (p = b, b = b.nextSibling, !domUtils.isBlockElm(p.firstChild)) {
                                            for (var N = n.document.createElement("p"); p.firstChild;) N.appendChild(p.firstChild);
                                            p.appendChild(N)
                                        }
                                        l.appendChild(p)
                                    }
                                    if (p = n.document.createElement("span"), u.insertBefore(p, y), !domUtils.isBlockElm(y.firstChild)) {
                                        for (N = n.document.createElement("p"); y.firstChild;) N.appendChild(y.firstChild);
                                        y.appendChild(N)
                                    }
                                    l.appendChild(y),
                                        domUtils.breakParent(p, u),
                                        domUtils.isEmptyNode(p.previousSibling) && domUtils.remove(p.previousSibling),
                                        domUtils.isEmptyNode(p.nextSibling) && domUtils.remove(p.nextSibling);
                                    var x = s(u) || domUtils.getComputedStyle(u, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
                                    if (u.tagName.toLowerCase() == a && x == i) {
                                        for (var w = 0,
                                            U = n.document.createDocumentFragment(); O = l.firstChild;) if (domUtils.isTagNode(O, "ol ul")) U.appendChild(O);
                                            else for (; O.firstChild;) U.appendChild(O.firstChild),
                                                domUtils.remove(O);
                                        p.parentNode.insertBefore(U, p)
                                    } else c(h = n.document.createElement(a), i),
                                        h.appendChild(l),
                                        p.parentNode.insertBefore(h, p);
                                    return domUtils.remove(p),
                                        h && d(h, a, i),
                                        void o.moveToBookmark(g).select()
                                }
                                if (b) {
                                    for (; b;) {
                                        if (p = b.nextSibling, domUtils.isTagNode(b, "ol ul")) l.appendChild(b);
                                        else {
                                            for (var E = n.document.createDocumentFragment(), T = 0; b.firstChild;) domUtils.isBlockElm(b.firstChild) && (T = 1),
                                                E.appendChild(b.firstChild);
                                            if (T) l.appendChild(E);
                                            else {
                                                var S = n.document.createElement("p");
                                                S.appendChild(E),
                                                    l.appendChild(S)
                                            }
                                            domUtils.remove(b)
                                        }
                                        b = p
                                    }
                                    u.parentNode.insertBefore(l, u.nextSibling),
                                        domUtils.isEmptyNode(u) ? (o.setStartBefore(u), domUtils.remove(u)) : o.setStartAfter(u),
                                        v = 1
                                }
                                if (y && domUtils.inDoc(f, n.document)) {
                                    for (b = f.firstChild; b && b !== y;) {
                                        if (p = b.nextSibling, domUtils.isTagNode(b, "ol ul")) l.appendChild(b);
                                        else {
                                            for (E = n.document.createDocumentFragment(), T = 0; b.firstChild;) domUtils.isBlockElm(b.firstChild) && (T = 1),
                                                E.appendChild(b.firstChild);
                                            T ? l.appendChild(E) : ((S = n.document.createElement("p")).appendChild(E), l.appendChild(S)),
                                                domUtils.remove(b)
                                        }
                                        b = p
                                    }
                                    var k = domUtils.createElement(n.document, "div", {
                                        tmpDiv: 1
                                    });
                                    domUtils.moveChild(y, k),
                                        l.appendChild(k),
                                        domUtils.remove(y),
                                        f.parentNode.insertBefore(l, f),
                                        o.setEndBefore(f),
                                        domUtils.isEmptyNode(f) && domUtils.remove(f),
                                        C = 1
                                }
                            }
                            v || o.setStartBefore(n.document.getElementById(g.start)),
                                g.end && !C && o.setEndAfter(n.document.getElementById(g.end)),
                                o.enlarge(!0, (function (e) {
                                    return t[e.tagName]
                                })),
                                l = n.document.createDocumentFragment();
                            for (var B = o.createBookmark(), A = domUtils.getNextDomNode(B.start, !1, r), I = o.cloneRange(), _ = domUtils.isBlockElm; A && A !== B.end && domUtils.getPosition(A, B.end) & domUtils.POSITION_PRECEDING;) if (3 == A.nodeType || dtd.li[A.tagName]) {
                                if (1 == A.nodeType && dtd.$list[A.tagName]) {
                                    for (; A.firstChild;) l.appendChild(A.firstChild);
                                    L = domUtils.getNextDomNode(A, !1, r),
                                        domUtils.remove(A),
                                        A = L;
                                    continue
                                }
                                for (L = A, I.setStartBefore(A); A && A !== B.end && (!_(A) || domUtils.isBookmarkNode(A));) L = A,
                                    A = domUtils.getNextDomNode(A, !1, null, (function (e) {
                                        return !t[e.tagName]
                                    }));
                                A && _(A) && (p = domUtils.getNextDomNode(L, !1, r)) && domUtils.isBookmarkNode(p) && (A = domUtils.getNextDomNode(p, !1, r), L = p),
                                    I.setEndAfter(L),
                                    A = domUtils.getNextDomNode(L, !1, r);
                                var R = o.document.createElement("li");
                                if (R.appendChild(I.extractContents()), domUtils.isEmptyNode(R)) {
                                    for (var L = o.document.createElement("p"); R.firstChild;) L.appendChild(R.firstChild);
                                    R.appendChild(L)
                                }
                                l.appendChild(R)
                            } else A = domUtils.getNextDomNode(A, !0, r);
                            o.moveToBookmark(B).collapse(!0),
                                c(h = n.document.createElement(a), i),
                                h.appendChild(l),
                                o.insertNode(h),
                                d(h, a, i);
                            w = 0;
                            for (var O, D = domUtils.getElementsByTagName(h, "div"); O = D[w++];) O.getAttribute("tmpDiv") && domUtils.remove(O, !0);
                            o.moveToBookmark(g).select()
                        },
                        queryCommandState: function (e) {
                            for (var t, i = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", n = this.selection.getStartElementPath(), o = 0; t = n[o++];) {
                                if ("TABLE" == t.nodeName) return 0;
                                if (i == t.nodeName.toLowerCase()) return 1
                            }
                            return 0
                        },
                        queryCommandValue: function (e) {
                            for (var t, i, n = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", o = this.selection.getStartElementPath(), r = 0; i = o[r++];) {
                                if ("TABLE" == i.nodeName) {
                                    t = null;
                                    break
                                }
                                if (n == i.nodeName.toLowerCase()) {
                                    t = i;
                                    break
                                }
                            }
                            return t ? s(t) || domUtils.getComputedStyle(t, "list-style-type") : null
                        }
                    }
            },
            sourceEditors = {
                textarea: function (e, t) {
                    var i = t.ownerDocument.createElement("textarea");
                    return i.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;",
                        browser.ie && browser.version < 8 && (i.style.width = t.offsetWidth + "px", i.style.height = t.offsetHeight + "px", t.onresize = function () {
                            i.style.width = t.offsetWidth + "px",
                                i.style.height = t.offsetHeight + "px"
                        }),
                        t.appendChild(i),
                    {
                        setContent: function (e) {
                            i.value = e
                        },
                        getContent: function () {
                            return i.value
                        },
                        select: function () {
                            var e;
                            browser.ie ? ((e = i.createTextRange()).collapse(!0), e.select()) : (i.setSelectionRange(0, 0), i.focus())
                        },
                        dispose: function () {
                            t.removeChild(i),
                                t.onresize = null,
                                i = null,
                                t = null
                        }
                    }
                },
                codemirror: function (e, t) {
                    var i = window.CodeMirror(t, {
                        mode: "text/html",
                        tabMode: "indent",
                        lineNumbers: !0,
                        lineWrapping: !0
                    }),
                        n = i.getWrapperElement();
                    return n.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;',
                        i.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;",
                        i.refresh(),
                    {
                        getCodeMirror: function () {
                            return i
                        },
                        setContent: function (e) {
                            i.setValue(e)
                        },
                        getContent: function () {
                            return i.getValue()
                        },
                        select: function () {
                            i.focus()
                        },
                        dispose: function () {
                            t.removeChild(n),
                                n = null,
                                i = null
                        }
                    }
                }
            },
            UE.plugins.source = function () {
                var e, t, i, n, o, r = this,
                    a = this.options,
                    s = !1;
                a.sourceEditor = browser.ie ? "textarea" : a.sourceEditor || "codemirror",
                    r.setOpt({
                        sourceEditorFirst: !1
                    }),
                    r.commands.source = {
                        execCommand: function () {
                            if (s = !s) {
                                o = r.selection.getRange().createAddress(!1, !0),
                                    r.undoManger && r.undoManger.save(!0),
                                    browser.gecko && (r.body.contentEditable = !1),
                                    i = r.iframe.style.cssText,
                                    r.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;",
                                    r.fireEvent("beforegetcontent");
                                var l = UE.htmlparser(r.body.innerHTML);
                                r.filterOutputRule(l),
                                    l.traversal((function (e) {
                                        if ("element" == e.type) switch (e.tagName) {
                                            case "td":
                                            case "th":
                                            case "caption":
                                                e.children && 1 == e.children.length && "br" == e.firstChild().tagName && e.removeChild(e.firstChild());
                                                break;
                                            case "pre":
                                                e.innerText(e.innerText().replace(/&nbsp;/g, " "))
                                        }
                                    })),
                                    r.fireEvent("aftergetcontent");
                                var d = l.toHtml(!0);
                                f = r.iframe.parentNode,
                                    (e = sourceEditors["codemirror" == a.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](r, f)).setContent(d),
                                    t = r.setContent,
                                    r.setContent = function (t) {
                                        var i = UE.htmlparser(t);
                                        r.filterInputRule(i),
                                            t = i.toHtml(),
                                            e.setContent(t)
                                    },
                                    setTimeout((function () {
                                        e.select(),
                                            r.addListener("fullscreenchanged", (function () {
                                                try {
                                                    e.getCodeMirror().refresh()
                                                } catch (t) { }
                                            }))
                                    })),
                                    n = r.getContent,
                                    r.getContent = function () {
                                        return e.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>"
                                    }
                            } else {
                                r.iframe.style.cssText = i;
                                var c = e.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>";
                                c = c.replace(new RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), (function (e, t) {
                                    return t && !dtd.$inlineWithA[t.toLowerCase()] ? e.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : e.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
                                })),
                                    r.setContent = t,
                                    r.setContent(c),
                                    e.dispose(),
                                    e = null,
                                    r.getContent = n;
                                var u = r.body.firstChild;
                                if (u || (r.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", u = r.body.firstChild), r.undoManger && r.undoManger.save(!0), browser.gecko) {
                                    var m = document.createElement("input");
                                    m.style.cssText = "position:absolute;left:0;top:-32768px",
                                        document.body.appendChild(m),
                                        r.body.contentEditable = !1,
                                        setTimeout((function () {
                                            domUtils.setViewportOffset(m, {
                                                left: -32768,
                                                top: 0
                                            }),
                                                m.focus(),
                                                setTimeout((function () {
                                                    r.body.contentEditable = !0,
                                                        r.selection.getRange().moveToAddress(o).select(!0),
                                                        domUtils.remove(m)
                                                }))
                                        }))
                                } else try {
                                    r.selection.getRange().moveToAddress(o).select(!0)
                                } catch (h) { }
                            }
                            var f;
                            this.fireEvent("sourcemodechanged", s)
                        },
                        queryCommandState: function () {
                            return 0 | s
                        },
                        notNeedUndo: 1
                    };
                var l = r.queryCommandState;
                r.queryCommandState = function (e) {
                    return e = e.toLowerCase(),
                        s ? e in {
                            source: 1,
                            fullscreen: 1
                        } ? 1 : -1 : l.apply(this, arguments)
                },
                    "codemirror" == a.sourceEditor && r.addListener("ready", (function () {
                        utils.loadFile(document, {
                            src: a.codeMirrorJsUrl || a.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
                            tag: "script",
                            type: "text/javascript",
                            defer: "defer"
                        },
                            (function () {
                                a.sourceEditorFirst && setTimeout((function () {
                                    r.execCommand("source")
                                }), 0)
                            })),
                            utils.loadFile(document, {
                                tag: "link",
                                rel: "stylesheet",
                                type: "text/css",
                                href: a.codeMirrorCssUrl || a.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
                            })
                    }))
            },
            UE.plugins.enterkey = function () {
                var e, t = this,
                    i = t.options.enterTag;
                t.addListener("keyup", (function (i, n) {
                    if (13 == (n.keyCode || n.which)) {
                        var o, r = t.selection.getRange(),
                            a = r.startContainer;
                        if (browser.ie) t.fireEvent("saveScene", !0, !0);
                        else {
                            if (/h\d/i.test(e)) {
                                if (browser.gecko) domUtils.findParentByTagName(a, ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption", "table"], !0) || (t.document.execCommand("formatBlock", !1, "<p>"), o = 1);
                                else if (1 == a.nodeType) {
                                    var s, l = t.document.createTextNode("");
                                    if (r.insertNode(l), s = domUtils.findParentByTagName(l, "div", !0)) {
                                        for (var d = t.document.createElement("p"); s.firstChild;) d.appendChild(s.firstChild);
                                        s.parentNode.insertBefore(d, s),
                                            domUtils.remove(s),
                                            r.setStartBefore(l).setCursor(),
                                            o = 1
                                    }
                                    domUtils.remove(l)
                                }
                                t.undoManger && o && t.undoManger.save()
                            }
                            browser.opera && r.select()
                        }
                    }
                })),
                    t.addListener("keydown", (function (n, o) {
                        if (13 == (o.keyCode || o.which)) {
                            if (t.fireEvent("beforeenterkeydown")) return void domUtils.preventDefault(o);
                            t.fireEvent("saveScene", !0, !0),
                                e = "";
                            var r = t.selection.getRange();
                            if (!r.collapsed) {
                                var a = r.startContainer,
                                    s = r.endContainer,
                                    l = domUtils.findParentByTagName(a, "td", !0),
                                    d = domUtils.findParentByTagName(s, "td", !0);
                                if (l && d && l !== d || !l && d || l && !d) return void (o.preventDefault ? o.preventDefault() : o.returnValue = !1)
                            }
                            if ("p" == i) browser.ie || ((a = domUtils.findParentByTagName(r.startContainer, ["ol", "ul", "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption"], !0)) || browser.opera ? (e = a.tagName, "p" == a.tagName.toLowerCase() && browser.gecko && domUtils.removeDirtyAttr(a)) : (t.document.execCommand("formatBlock", !1, "<p>"), browser.gecko && (r = t.selection.getRange(), (a = domUtils.findParentByTagName(r.startContainer, "p", !0)) && domUtils.removeDirtyAttr(a))));
                            else if (o.preventDefault ? o.preventDefault() : o.returnValue = !1, r.collapsed) c = r.document.createElement("br"),
                                r.insertNode(c),
                                c.parentNode.lastChild === c ? (c.parentNode.insertBefore(c.cloneNode(!0), c), r.setStartBefore(c)) : r.setStartAfter(c),
                                r.setCursor();
                            else if (r.deleteContents(), 1 == (a = r.startContainer).nodeType && (a = a.childNodes[r.startOffset])) {
                                for (; 1 == a.nodeType;) {
                                    if (dtd.$empty[a.tagName]) return r.setStartBefore(a).setCursor(),
                                        t.undoManger && t.undoManger.save(),
                                        !1;
                                    if (!a.firstChild) {
                                        var c = r.document.createElement("br");
                                        return a.appendChild(c),
                                            r.setStart(a, 0).setCursor(),
                                            t.undoManger && t.undoManger.save(),
                                            !1
                                    }
                                    a = a.firstChild
                                }
                                a === r.startContainer.childNodes[r.startOffset] ? (c = r.document.createElement("br"), r.insertNode(c).setCursor()) : r.setStart(a, 0).setCursor()
                            } else c = r.document.createElement("br"),
                                r.insertNode(c).setStartAfter(c).setCursor()
                        }
                    }))
            },
            UE.plugins.keystrokes = function () {
                var e = this,
                    t = !0;
                e.addListener("keydown", (function (i, n) {
                    var o = n.keyCode || n.which,
                        r = e.selection.getRange();
                    if (!r.collapsed && !(n.ctrlKey || n.shiftKey || n.altKey || n.metaKey) && (o >= 65 && o <= 90 || o >= 48 && o <= 57 || o >= 96 && o <= 111 || {
                        13: 1,
                        8: 1,
                        46: 1
                    }[o])) {
                        var a = r.startContainer;
                        if (domUtils.isFillChar(a) && r.setStartBefore(a), a = r.endContainer, domUtils.isFillChar(a) && r.setEndAfter(a), r.txtToElmBoundary(), r.endContainer && 1 == r.endContainer.nodeType && (a = r.endContainer.childNodes[r.endOffset]) && domUtils.isBr(a) && r.setEndAfter(a), 0 == r.startOffset && (a = r.startContainer, domUtils.isBoundaryNode(a, "firstChild") && (a = r.endContainer, r.endOffset == (3 == a.nodeType ? a.nodeValue.length : a.childNodes.length) && domUtils.isBoundaryNode(a, "lastChild")))) return e.fireEvent("saveScene"),
                            e.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>",
                            r.setStart(e.body.firstChild, 0).setCursor(!1, !0),
                            void e._selectionChange()
                    }
                    if (o == keymap.Backspace) {
                        if (r = e.selection.getRange(), t = r.collapsed, e.fireEvent("delkeydown", n)) return;
                        var s, l;
                        if (r.collapsed && r.inFillChar() && (s = r.startContainer, domUtils.isFillChar(s) ? (r.setStartBefore(s).shrinkBoundary(!0).collapse(!0), domUtils.remove(s)) : (s.nodeValue = s.nodeValue.replace(new RegExp("^" + domUtils.fillChar), ""), r.startOffset--, r.collapse(!0).select(!0))), s = r.getClosedNode()) return e.fireEvent("saveScene"),
                            r.setStartBefore(s),
                            domUtils.remove(s),
                            r.setCursor(),
                            e.fireEvent("saveScene"),
                            void domUtils.preventDefault(n);
                        if (!browser.ie && (s = domUtils.findParentByTagName(r.startContainer, "table", !0), l = domUtils.findParentByTagName(r.endContainer, "table", !0), s && !l || !s && l || s !== l)) return void n.preventDefault()
                    }
                    if (o == keymap.Tab) {
                        var d = {
                            ol: 1,
                            ul: 1,
                            table: 1
                        };
                        if (e.fireEvent("tabkeydown", n)) return void domUtils.preventDefault(n);
                        var c = e.selection.getRange();
                        e.fireEvent("saveScene");
                        for (var u = 0,
                            m = "",
                            f = e.options.tabSize || 4,
                            h = e.options.tabNode || "&nbsp;"; u < f; u++) m += h;
                        var p = e.document.createElement("span");
                        if (p.innerHTML = m + domUtils.fillChar, c.collapsed) c.insertNode(p.cloneNode(!0).firstChild).setCursor(!0);
                        else {
                            var g = function (e) {
                                return domUtils.isBlockElm(e) && !d[e.tagName.toLowerCase()]
                            };
                            if (s = domUtils.findParent(c.startContainer, g, !0), l = domUtils.findParent(c.endContainer, g, !0), s && l && s === l) c.deleteContents(),
                                c.insertNode(p.cloneNode(!0).firstChild).setCursor(!0);
                            else {
                                var b = c.createBookmark();
                                c.enlarge(!0);
                                for (var v = c.createBookmark(), y = domUtils.getNextDomNode(v.start, !1, g); y && !(domUtils.getPosition(y, v.end) & domUtils.POSITION_FOLLOWING);) y.insertBefore(p.cloneNode(!0).firstChild, y.firstChild),
                                    y = domUtils.getNextDomNode(y, !1, g);
                                c.moveToBookmark(v).moveToBookmark(b).select()
                            }
                        }
                        domUtils.preventDefault(n)
                    }
                    if (browser.gecko && 46 == o && (c = e.selection.getRange()).collapsed && (s = c.startContainer, domUtils.isEmptyBlock(s))) {
                        for (var C = s.parentNode; 1 == domUtils.getChildCount(C) && !domUtils.isBody(C);) s = C,
                            C = C.parentNode;
                        s === C.lastChild && n.preventDefault()
                    } else;
                })),
                    e.addListener("keyup", (function (e, i) {
                        var n;
                        if ((i.keyCode || i.which) == keymap.Backspace) {
                            if (this.fireEvent("delkeyup")) return;
                            if ((n = this.selection.getRange()).collapsed) {
                                if ((a = domUtils.findParentByTagName(n.startContainer, ["h1", "h2", "h3", "h4", "h5", "h6"], !0)) && domUtils.isEmptyBlock(a)) {
                                    var o = a.previousSibling;
                                    if (o && "TABLE" != o.nodeName) return domUtils.remove(a),
                                        void n.setStartAtLast(o).setCursor(!1, !0);
                                    var r = a.nextSibling;
                                    if (r && "TABLE" != r.nodeName) return domUtils.remove(a),
                                        void n.setStartAtFirst(r).setCursor(!1, !0)
                                }
                                if (domUtils.isBody(n.startContainer)) {
                                    var a = domUtils.createElement(this.document, "p", {
                                        innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
                                    });
                                    n.insertNode(a).setStart(a, 0).setCursor(!1, !0)
                                }
                            }
                            if (!t && (3 == n.startContainer.nodeType || 1 == n.startContainer.nodeType && domUtils.isEmptyBlock(n.startContainer))) if (browser.ie) {
                                var s = n.document.createElement("span");
                                n.insertNode(s).setStartBefore(s).collapse(!0),
                                    n.select(),
                                    domUtils.remove(s)
                            } else n.select()
                        }
                    }))
            },
            UE.plugins.fiximgclick = function () {
                var e, t = !1;
                function n() {
                    this.editor = null,
                        this.resizer = null,
                        this.cover = null,
                        this.doc = document,
                        this.prePos = {
                            x: 0,
                            y: 0
                        },
                        this.startPos = {
                            x: 0,
                            y: 0
                        }
                }
                return e = [[0, 0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]],
                    n.prototype = {
                        init: function (e) {
                            var t = this;
                            t.editor = e,
                                t.startPos = this.prePos = {
                                    x: 0,
                                    y: 0
                                },
                                t.dragId = -1;
                            var n = [],
                                o = t.cover = document.createElement("div"),
                                r = t.resizer = document.createElement("div");
                            for (o.id = t.editor.ui.id + "_imagescale_cover", o.style.cssText = "position:absolute;display:none;z-index:" + t.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;", domUtils.on(o, "mousedown click", (function () {
                                t.editor.focus(),
                                    t.hide()
                            })), i = 0; i < 8; i++) n.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
                            r.id = t.editor.ui.id + "_imagescale",
                                r.className = "edui-editor-imagescale",
                                r.innerHTML = n.join(""),
                                r.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + t.editor.options.zIndex + ";",
                                t.editor.ui.getDom().appendChild(o),
                                t.editor.ui.getDom().appendChild(r),
                                t.initStyle(),
                                t.initEvents()
                        },
                        initStyle: function () {
                            utils.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
                        },
                        initEvents: function () {
                            this.startPos.x = this.startPos.y = 0,
                                this.isDraging = !1
                        },
                        _eventHandler: function (e) {
                            var i = this;
                            switch (console.log(e.type), e.type) {
                                case "mousedown":
                                    var n; - 1 != (n = e.target || e.srcElement).className.indexOf("edui-editor-imagescale-hand") && -1 == i.dragId && (i.dragId = n.className.slice(- 1), i.startPos.x = i.prePos.x = e.clientX, i.startPos.y = i.prePos.y = e.clientY, domUtils.on(i.doc, "mousemove", i.proxy(i._eventHandler, i)));
                                    break;
                                case "mousemove":
                                    -1 != i.dragId && (i.updateContainerStyle(i.dragId, {
                                        x: e.clientX - i.prePos.x,
                                        y: e.clientY - i.prePos.y
                                    }), i.prePos.x = e.clientX, i.prePos.y = e.clientY, t = !0, i.updateTargetElement());
                                    break;
                                case "mouseup":
                                    -1 != i.dragId && (i.updateContainerStyle(i.dragId, {
                                        x: e.clientX - i.prePos.x,
                                        y: e.clientY - i.prePos.y
                                    }), i.updateTargetElement(), i.target.parentNode && i.attachTo(i.target), i.dragId = -1),
                                        domUtils.un(i.doc, "mousemove", i.proxy(i._eventHandler, i)),
                                        t && (t = !1, i.editor.fireEvent("contentchange"))
                            }
                        },
                        updateTargetElement: function () {
                            var e = this,
                                t = parseInt(e.resizer.style.width),
                                i = parseInt(e.target.naturalHeight) * t / parseInt(e.target.naturalWidth);
                            domUtils.setStyles(e.target, {
                                width: e.resizer.style.width,
                                height: i + "px"
                            });
                            var n = parseInt(e.target.height) / parseInt(e.target.width);
                            e.target.width = parseInt(e.resizer.style.width),
                                e.target.height = parseInt(e.target.width) * n,
                                e.target.width = parseInt(e.resizer.style.width),
                                e.target.height = parseInt(e.resizer.style.height),
                                e.attachTo(e.target)
                        },
                        updateContainerStyle: function (t, i) {
                            var n, o = this,
                                r = o.resizer;
                            0 != e[t][0] && (n = parseInt(r.style.left) + i.x, r.style.left = o._validScaledProp("left", n) + "px"),
                                0 != e[t][1] && (n = parseInt(r.style.top) + i.y, r.style.top = o._validScaledProp("top", n) + "px"),
                                0 != e[t][2] && (n = r.clientWidth + e[t][2] * i.x, r.style.width = o._validScaledProp("width", n) + "px"),
                                0 != e[t][3] && (n = r.clientHeight + e[t][3] * i.y, r.style.height = o._validScaledProp("height", n) + "px")
                        },
                        _validScaledProp: function (e, t) {
                            var i = this.resizer,
                                n = document;
                            switch (t = isNaN(t) ? 0 : t, e) {
                                case "left":
                                    return t < 0 ? 0 : t + i.clientWidth > n.clientWidth ? n.clientWidth - i.clientWidth : t;
                                case "top":
                                    return t < 0 ? 0 : t + i.clientHeight > n.clientHeight ? n.clientHeight - i.clientHeight : t;
                                case "width":
                                    return t <= 0 ? 1 : t + i.offsetLeft > n.clientWidth ? n.clientWidth - i.offsetLeft : t;
                                case "height":
                                    return t <= 0 ? 1 : t + i.offsetTop > n.clientHeight ? n.clientHeight - i.offsetTop : t
                            }
                        },
                        hideCover: function () {
                            this.cover.style.display = "none"
                        },
                        showCover: function () {
                            var e = this,
                                t = domUtils.getXY(e.editor.ui.getDom()),
                                i = domUtils.getXY(e.editor.iframe);
                            domUtils.setStyles(e.cover, {
                                width: e.editor.iframe.offsetWidth + "px",
                                height: e.editor.iframe.offsetHeight + "px",
                                top: i.y - t.y + "px",
                                left: i.x - t.x + "px",
                                position: "absolute",
                                display: ""
                            })
                        },
                        show: function (e) {
                            var t = this;
                            t.resizer.style.display = "block",
                                e && t.attachTo(e),
                                domUtils.on(this.resizer, "mousedown", t.proxy(t._eventHandler, t)),
                                domUtils.on(t.doc, "mouseup", t.proxy(t._eventHandler, t)),
                                t.showCover(),
                                t.editor.fireEvent("afterscaleshow", t),
                                t.editor.fireEvent("saveScene")
                        },
                        hide: function () {
                            var e = this;
                            e.hideCover(),
                                e.resizer.style.display = "none",
                                domUtils.un(e.resizer, "mousedown", e.proxy(e._eventHandler, e)),
                                domUtils.un(e.doc, "mouseup", e.proxy(e._eventHandler, e)),
                                e.editor.fireEvent("afterscalehide", e)
                        },
                        proxy: function (e, t) {
                            return function (i) {
                                return e.apply(t || this, arguments)
                            }
                        },
                        attachTo: function (e) {
                            var t = this,
                                i = t.target = e,
                                n = this.resizer,
                                o = domUtils.getXY(i),
                                r = domUtils.getXY(t.editor.iframe),
                                a = domUtils.getXY(n.parentNode),
                                s = r.y + o.y - t.editor.document.body.scrollTop - a.y - parseInt(n.style.borderTopWidth);
                            s -= t.editor.body.parentNode.scrollTop,
                                domUtils.setStyles(n, {
                                    width: i.width + "px",
                                    height: i.height + "px",
                                    left: r.x + o.x - t.editor.document.body.scrollLeft - a.x - parseInt(n.style.borderLeftWidth) + "px",
                                    top: s + "px"
                                })
                        }
                    },
                    function () {
                        var e, t = this;
                        t.setOpt("imageScaleEnabled", !0),
                            !browser.ie && t.options.imageScaleEnabled && t.addListener("click", (function (i, o) {
                                var r = t.selection.getRange().getClosedNode();
                                if (r && "IMG" == r.tagName && "false" != t.body.contentEditable) {
                                    if (o.pageX > r.offsetWidth + r.offsetLeft || o.pageX < r.offsetLeft) return;
                                    if (o.pageY > r.offsetTop + r.offsetHeight || o.pageY < r.offsetTop) return;
                                    if (- 1 != r.className.indexOf("edui-faked-music") || r.getAttribute("anchorname") || domUtils.hasClass(r, "loadingclass") || domUtils.hasClass(r, "loaderrorclass")) return;
                                    if (!e) {
                                        (e = new n).init(t),
                                        t.ui.getDom().appendChild(e.resizer);
                                        var a, s = function (i) {
                                            e.hide(),
                                                e.target && t.selection.getRange().selectNode(e.target).select()
                                        },
                                            l = function (e) {
                                                var t = e.target || e.srcElement; !t || void 0 !== t.className && -1 != t.className.indexOf("edui-editor-imagescale") || s()
                                            };
                                        t.addListener("afterscaleshow", (function (e) {
                                            t.addListener("beforekeydown", s),
                                                t.addListener("beforemousedown", l),
                                                domUtils.on(document, "keydown", s),
                                                domUtils.on(document, "mousedown", l),
                                                t.selection.getNative().removeAllRanges()
                                        })),
                                            t.addListener("afterscalehide", (function (i) {
                                                t.removeListener("beforekeydown", s),
                                                    t.removeListener("beforemousedown", l),
                                                    domUtils.un(document, "keydown", s),
                                                    domUtils.un(document, "mousedown", l);
                                                var n = e.target;
                                                n.parentNode && t.selection.getRange().selectNode(n).select()
                                            })),
                                            domUtils.on(e.resizer, "mousedown", (function (i) {
                                                t.selection.getNative().removeAllRanges();
                                                var n = i.target || i.srcElement;
                                                n && -1 == n.className.indexOf("edui-editor-imagescale-hand") && (a = setTimeout((function () {
                                                    e.hide(),
                                                        e.target && t.selection.getRange().selectNode(n).select()
                                                }), 200))
                                            })),
                                            domUtils.on(e.resizer, "mouseup", (function (e) {
                                                var t = e.target || e.srcElement;
                                                t && -1 == t.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(a)
                                            }))
                                    }
                                    e.show(r)
                                } else e && "none" != e.resizer.style.display && e.hide()
                            })),
                            browser.webkit && t.addListener("click", (function (e, i) {
                                "IMG" == i.target.tagName && "false" != t.body.contentEditable && new dom.Range(t.document).selectNode(i.target).select()
                            }))
                    }
            }(), UE.plugin.register("autolink", (function () {
                return browser.ie ? {} : {
                    bindEvents: {
                        reset: function () {
                            0
                        },
                        keydown: function (e, t) {
                            var i = this,
                                n = t.keyCode || t.which;
                            if (32 == n || 13 == n) {
                                for (var o, r, a = i.selection.getNative(), s = a.getRangeAt(0).cloneRange(), l = s.startContainer; 1 == l.nodeType && s.startOffset > 0 && (l = s.startContainer.childNodes[s.startOffset - 1]);) s.setStart(l, 1 == l.nodeType ? l.childNodes.length : l.nodeValue.length),
                                    s.collapse(!0),
                                    l = s.startContainer;
                                do {
                                    if (0 == s.startOffset) {
                                        for (l = s.startContainer.previousSibling; l && 1 == l.nodeType;) l = l.lastChild;
                                        if (!l || domUtils.isFillChar(l)) break;
                                        o = l.nodeValue.length
                                    } else l = s.startContainer, o = s.startOffset;
                                    s.setStart(l, o - 1), r = s.toString().charCodeAt(0)
                                } while (160 != r && 32 != r);
                                if (s.toString().replace(new RegExp(domUtils.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
                                    for (; s.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(s.toString());) try {
                                        s.setStart(s.startContainer, s.startOffset + 1)
                                    } catch (m) {
                                        for (l = s.startContainer; !(next = l.nextSibling);) {
                                            if (domUtils.isBody(l)) return;
                                            l = l.parentNode
                                        }
                                        s.setStart(next, 0)
                                    }
                                    if (domUtils.findParentByTagName(s.startContainer, "a", !0)) return;
                                    var d, c = i.document.createElement("a"),
                                        u = i.document.createTextNode(" ");
                                    i.undoManger && i.undoManger.save(),
                                        c.appendChild(s.extractContents()),
                                        c.href = c.innerHTML = c.innerHTML.replace(/<[^>]+>/g, ""),
                                        d = c.getAttribute("href").replace(new RegExp(domUtils.fillChar, "g"), ""),
                                        d = /^(?:https?:\/\/)/gi.test(d) ? d : "http://" + d,
                                        c.setAttribute("_src", utils.html(d)),
                                        c.href = utils.html(d),
                                        s.insertNode(c),
                                        c.parentNode.insertBefore(u, c.nextSibling),
                                        s.setStart(u, 0),
                                        s.collapse(!0),
                                        a.removeAllRanges(),
                                        a.addRange(s),
                                        i.undoManger && i.undoManger.save()
                                }
                            }
                        }
                    }
                }
            }), (function () {
                var e = {
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1,
                    13: 1,
                    32: 1
                };
                browser.ie && this.addListener("keyup", (function (t, i) {
                    var n = i.keyCode;
                    if (e[n]) {
                        var o = this.selection.getRange(),
                            r = o.startContainer;
                        if (13 == n) {
                            for (; r && !domUtils.isBody(r) && !domUtils.isBlockElm(r);) r = r.parentNode;
                            var a;
                            if (r && !domUtils.isBody(r) && "P" == r.nodeName) if ((a = r.previousSibling) && 1 == a.nodeType) (a = function (e) {
                                if (3 == e.nodeType) return null;
                                if ("A" == e.nodeName) return e;
                                for (var t = e.lastChild; t;) {
                                    if ("A" == t.nodeName) return t;
                                    if (3 == t.nodeType) {
                                        if (domUtils.isWhitespace(t)) {
                                            t = t.previousSibling;
                                            continue
                                        }
                                        return null
                                    }
                                    t = t.lastChild
                                }
                            }(a)) && !a.getAttribute("_href") && domUtils.remove(a, !0)
                        } else if (32 == n) 3 == r.nodeType && /^\s$/.test(r.nodeValue) && (r = r.previousSibling) && "A" == r.nodeName && !r.getAttribute("_href") && domUtils.remove(r, !0);
                        else if ((r = domUtils.findParentByTagName(r, "a", !0)) && !r.getAttribute("_href")) {
                            var s = o.createBookmark();
                            domUtils.remove(r, !0),
                                o.moveToBookmark(s).select(!0)
                        }
                    }
                }))
            })), UE.plugins.autoheight = function () {
                var e = this;
                if (e.autoHeightEnabled = !1 !== e.options.autoHeightEnabled, e.scrollStatus = !1, e.autoHeightEnabled) {
                    var t, i, n, o, r = 0,
                        a = e.options;
                    e.addListener("fullscreenchanged", (function (e, t) {
                        o = t
                    })),
                        e.addListener("destroy", (function () {
                            e.removeListener("contentchange afterinserthtml keyup mouseup aftersimpleupload", s)
                        })),
                        e.enableAutoHeight = function () {
                            var e = this;
                            if (e.autoHeightEnabled) {
                                var i = e.document;
                                e.autoHeightEnabled = !0,
                                    t = i.body.style.overflowY,
                                    i.body.style.overflowY = "hidden",
                                    e.addListener("contentchange afterinserthtml keyup mouseup aftersimpleupload", s),
                                    setTimeout((function () {
                                        s.call(e)
                                    }), browser.gecko ? 100 : 0),
                                    e.fireEvent("autoheightchanged", e.autoHeightEnabled)
                            }
                        },
                        e.disableAutoHeight = function () {
                            e.body.style.overflowY = t || "",
                                e.removeListener("contentchange", s),
                                e.removeListener("keyup", s),
                                e.removeListener("mouseup", s),
                                e.autoHeightEnabled = !1,
                                e.fireEvent("autoheightchanged", e.autoHeightEnabled)
                        },
                        e.on("setHeight", (function () {
                            e.disableAutoHeight()
                        })),
                        e.addListener("ready", (function () {
                            var t, i;
                            e.enableAutoHeight(),
                                domUtils.on(browser.ie ? e.body : e.document, browser.webkit ? "dragover" : "drop", (function () {
                                    clearTimeout(t),
                                        t = setTimeout((function () {
                                            s.call(e)
                                        }), 100)
                                })),
                                window.onscroll = function () {
                                    null === i ? i = this.scrollY : 0 == this.scrollY && 0 != i && (e.window.scrollTo(0, 0), i = null)
                                }
                        }))
                }
                function s() {
                    var e = this;
                    clearTimeout(n),
                        o || (!e.queryCommandState || e.queryCommandState && 1 != e.queryCommandState("source")) && (n = setTimeout((function () {
                            for (var t = e.body.lastChild,
                                n = e.options.autoHeightLimit ? e.options.autoHeightLimit : 600; t && 1 != t.nodeType;) t = t.previousSibling;
                            t && 1 == t.nodeType && (t.style.clear = "both", ((i = Math.max(domUtils.getXY(t).y + t.offsetHeight + 25, Math.max(a.minFrameHeight, a.initialFrameHeight))) != r || e.simpleUploadStatus) && (e.simpleUploadStatus = !1, i > n ? (e.body.setAttribute("style", "overflow-y: auto"), i !== parseInt(e.iframe.parentNode.style.height) && (e.iframe.parentNode.style.height = n + "px"), e.body.style.height = i + "px", 0 == e.scrollStatus && (e.body.scrollTop = i + 50, e.scrollStatus = !0), r = i) : (e.scrollStatus = !1, e.body.setAttribute("style", "overflow-y: hidden"), i !== parseInt(e.iframe.parentNode.style.height) && (e.iframe.parentNode.style.height = i + "px"), e.body.style.height = i + "px", r = i)), domUtils.removeStyle(t, "clear"))
                        }), 50))
                }
            },
            UE.plugins.autofloat = function () {
                var e = this,
                    t = e.getLang();
                e.setOpt({
                    topOffset: 0
                });
                var i = !1 !== e.options.autoFloatEnabled,
                    n = e.options.topOffset;
                if (i) {
                    var o, r, a, s, l = UE.ui.uiUtils,
                        d = browser.ie && browser.version <= 6,
                        c = browser.quirks,
                        u = document.createElement("div"),
                        m = !0,
                        f = utils.defer((function () {
                            p()
                        }), browser.ie ? 200 : 100, !0);
                    e.addListener("destroy", (function () {
                        domUtils.un(window, ["scroll", "resize"], p),
                            e.removeListener("keydown", f)
                    })),
                        e.addListener("ready", (function () {
                            if (UE.ui || (alert(t.autofloatMsg), 0)) {
                                if (!e.ui) return;
                                s = l.getClientRect,
                                    r = e.ui.getDom("toolbarbox"),
                                    a = s(r).top,
                                    o = r.style.cssText,
                                    u.style.height = r.offsetHeight + "px",
                                    d && ((i = document.body.style).backgroundImage = 'url("about:blank")', i.backgroundAttachment = "fixed"),
                                    domUtils.on(window, ["scroll", "resize"], p),
                                    e.addListener("keydown", f),
                                    e.addListener("beforefullscreenchange", (function (e, t) {
                                        t && h()
                                    })),
                                    e.addListener("fullscreenchanged", (function (e, t) {
                                        t || p()
                                    })),
                                    e.addListener("sourcemodechanged", (function (e, t) {
                                        setTimeout((function () {
                                            p()
                                        }), 0)
                                    })),
                                    e.addListener("clearDoc", (function () {
                                        setTimeout((function () {
                                            p()
                                        }), 0)
                                    }))
                            }
                            var i
                        }))
                }
                function h() {
                    m = !0,
                        u.parentNode && u.parentNode.removeChild(u),
                        r.style.cssText = o
                }
                function p() {
                    var t, i, o, l = s(e.container),
                        f = e.options.toolbarTopOffset || 0;
                    l.top < 0 && l.bottom - r.offsetHeight > f ? (t = domUtils.getXY(r), i = domUtils.getComputedStyle(r, "position"), o = domUtils.getComputedStyle(r, "left"), r.style.width = r.offsetWidth + "px", r.style.zIndex = 1 * e.options.zIndex + 1, r.parentNode.insertBefore(u, r), d || c && browser.ie ? ("absolute" != r.style.position && (r.style.position = "absolute"), r.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - a + n + "px") : (browser.ie7Compat && m && (m = !1, r.style.left = domUtils.getXY(r).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != r.style.position && (r.style.position = "fixed", r.style.top = n + "px", ("absolute" == i || "relative" == i) && parseFloat(o) && (r.style.left = t.x + "px")))) : h()
                }
            },
            UE.plugins.video = function () {
                var e = this;
                function t(t, i, n, o, r, a, s) {
                    var l;
                    switch (t = utils.unhtmlForUrl(t), r = utils.unhtml(r), a = utils.unhtml(a), i = parseInt(i, 10) || 0, n = parseInt(n, 10) || 0, s) {
                        case "image":
                            l = "<img " + (o ? 'id="' + o + '"' : "") + ' width="' + i + '" height="' + n + '" _url="' + t + '" class="' + a.replace(/\bvideo-js\b/, "") + '" src=' + e.options.UEDITOR_HOME_URL + '"../themes/default/images/spacer.gif" style="background:url(' + e.options.UEDITOR_HOME_URL + "../themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (r ? "float:" + r + ";" : "") + '" />';
                            break;
                        case "embed":
                            l = '<embed type="application/x-shockwave-flash" class="' + a + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + utils.html(t) + '" width="' + i + '" height="' + n + '"' + (r ? ' style="float:' + r + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                            break;
                        case "video":
                            var d = t.substr(t.lastIndexOf(".") + 1);
                            "ogv" == d && (d = "ogg"),
                                l = "<video" + (o ? ' id="' + o + '"' : "") + ' class="' + a + ' video-js" ' + (r ? ' style="float:' + r + '"' : "") + ' controls preload="none" width="' + i + '" height="' + n + '" src="' + t + '" data-setup="{}"><source src="' + t + '" type="video/' + d + '" /></video>'
                    }
                    return l
                }
                function i(e, i) {
                    utils.each(e.getNodesByTagName(i ? "img" : "embed video"), (function (e) {
                        var n = e.getAttr("class");
                        if (n && -1 != n.indexOf("edui-faked-video")) {
                            var o = t(i ? e.getAttr("_url") : e.getAttr("src"), e.getAttr("width"), e.getAttr("height"), null, e.getStyle("float") || "", n, i ? "embed" : "image");
                            e.parentNode.replaceChild(UE.uNode.createElement(o), e)
                        }
                        if (n && -1 != n.indexOf("edui-upload-video")) {
                            o = t(i ? e.getAttr("_url") : e.getAttr("src"), e.getAttr("width"), e.getAttr("height"), null, e.getStyle("float") || "", n, i ? "video" : "image");
                            e.parentNode.replaceChild(UE.uNode.createElement(o), e)
                        }
                    }))
                }
                e.addOutputRule((function (e) {
                    i(e, !0)
                })),
                    e.addInputRule((function (e) {
                        i(e)
                    })),
                    e.commands.insertvideo = {
                        execCommand: function (i, n, o) {
                            for (var r, a, s = [], l = 0, d = (n = utils.isArray(n) ? n : [n]).length; l < d; l++) a = n[l],
                                r = "upload" == o ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video",
                                s.push(t(a.url, a.width || 420, a.height || 280, "tmpVedio" + l, null, r, "video"));
                            e.execCommand("inserthtml", s.join(""), !0);
                            var c = this.selection.getRange();
                            for (l = 0, d = n.length; l < d; l++) {
                                var u = this.document.getElementById("tmpVedio" + l);
                                domUtils.removeAttributes(u, "id"),
                                    c.selectNode(u).select(),
                                    e.execCommand("imagefloat", n[l].align)
                            }
                        },
                        queryCommandState: function () {
                            var t = e.selection.getRange().getClosedNode();
                            return t && ("edui-faked-video" == t.className || -1 != t.className.indexOf("edui-upload-video")) ? 1 : 0
                        }
                    }
            },
            UETable = UE.UETable = function (e) {
                this.table = e,
                    this.indexTable = [],
                    this.selectedTds = [],
                    this.cellsRange = {},
                    this.update(e)
            },
            UETable.removeSelectedClass = function (e) {
                utils.each(e, (function (e) {
                    domUtils.removeClasses(e, "selectTdClass")
                }))
            },
            UETable.addSelectedClass = function (e) {
                utils.each(e, (function (e) {
                    domUtils.addClass(e, "selectTdClass")
                }))
            },
            UETable.isEmptyBlock = function (e) {
                var t = new RegExp(domUtils.fillChar, "g");
                if (e[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length > 0) return 0;
                for (var i in dtd.$isNotEmpty) if (dtd.$isNotEmpty.hasOwnProperty(i) && e.getElementsByTagName(i).length) return 0;
                return 1
            },
            UETable.getWidth = function (e) {
                return e ? parseInt(domUtils.getComputedStyle(e, "width"), 10) : 0
            },
            UETable.getTableCellAlignState = function (e) {
                !utils.isArray(e) && (e = [e]);
                var t = {},
                    i = ["align", "valign"],
                    n = null,
                    o = !0;
                return utils.each(e, (function (e) {
                    return utils.each(i, (function (i) {
                        if (n = e.getAttribute(i), !t[i] && n) t[i] = n;
                        else if (!t[i] || n !== t[i]) return o = !1,
                            !1
                    })),
                        o
                })),
                    o ? t : null
            },
            UETable.getTableItemsByRange = function (e) {
                var t = e.selection.getStart();
                t && t.id && 0 === t.id.indexOf("_baidu_bookmark_start_") && t.nextSibling && (t = t.nextSibling);
                var i = t && domUtils.findParentByTagName(t, ["td", "th"], !0),
                    n = i && i.parentNode,
                    o = t && domUtils.findParentByTagName(t, "caption", !0);
                return {
                    cell: i,
                    tr: n,
                    table: o ? o.parentNode : n && n.parentNode.parentNode,
                    caption: o
                }
            },
            UETable.getUETableBySelected = function (e) {
                var t = UETable.getTableItemsByRange(e).table;
                return t && t.ueTable && t.ueTable.selectedTds.length ? t.ueTable : null
            },
            UETable.getDefaultValue = function (e, t) {
                var i, n, o, r, a = {
                    thin: "0px",
                    medium: "1px",
                    thick: "2px"
                };
                if (t) return s = t.getElementsByTagName("td")[0],
                    r = domUtils.getComputedStyle(t, "border-left-width"),
                    i = parseInt(a[r] || r, 10),
                    r = domUtils.getComputedStyle(s, "padding-left"),
                    n = parseInt(a[r] || r, 10),
                    r = domUtils.getComputedStyle(s, "border-left-width"),
                {
                    tableBorder: i,
                    tdPadding: n,
                    tdBorder: o = parseInt(a[r] || r, 10)
                }; (t = e.document.createElement("table")).insertRow(0).insertCell(0).innerHTML = "xxx",
                    e.body.appendChild(t);
                var s = t.getElementsByTagName("td")[0];
                return r = domUtils.getComputedStyle(t, "border-left-width"),
                    i = parseInt(a[r] || r, 10),
                    r = domUtils.getComputedStyle(s, "padding-left"),
                    n = parseInt(a[r] || r, 10),
                    r = domUtils.getComputedStyle(s, "border-left-width"),
                    o = parseInt(a[r] || r, 10),
                    domUtils.remove(t),
                {
                    tableBorder: i,
                    tdPadding: n,
                    tdBorder: o
                }
            },
            UETable.getUETable = function (e) {
                var t = e.tagName.toLowerCase();
                return (e = "td" == t || "th" == t || "caption" == t ? domUtils.findParentByTagName(e, "table", !0) : e).ueTable || (e.ueTable = new UETable(e)),
                    e.ueTable
            },
            UETable.cloneCell = function (e, t, i) {
                if (!e || utils.isString(e)) return this.table.ownerDocument.createElement(e || "td");
                var n = domUtils.hasClass(e, "selectTdClass");
                n && domUtils.removeClasses(e, "selectTdClass");
                var o = e.cloneNode(!0);
                return t && (o.rowSpan = o.colSpan = 1),
                    !i && domUtils.removeAttributes(o, "width height"),
                    !i && domUtils.removeAttributes(o, "style"),
                    o.style.borderLeftStyle = "",
                    o.style.borderTopStyle = "",
                    o.style.borderLeftColor = e.style.borderRightColor,
                    o.style.borderLeftWidth = e.style.borderRightWidth,
                    o.style.borderTopColor = e.style.borderBottomColor,
                    o.style.borderTopWidth = e.style.borderBottomWidth,
                    n && domUtils.addClass(e, "selectTdClass"),
                    o
            },
            UETable.prototype = {
                getMaxRows: function () {
                    for (var e, t = this.table.rows,
                        i = 1,
                        n = 0; e = t[n]; n++) {
                        for (var o, r = 1,
                            a = 0; o = e.cells[a++];) r = Math.max(o.rowSpan || 1, r);
                        i = Math.max(r + n, i)
                    }
                    return i
                },
                getMaxCols: function () {
                    for (var e, t = this.table.rows,
                        i = 0,
                        n = {},
                        o = 0; e = t[o]; o++) {
                        for (var r, a = 0,
                            s = 0; r = e.cells[s++];) if (a += r.colSpan || 1, r.rowSpan && r.rowSpan > 1) for (var l = 1; l < r.rowSpan; l++) n["row_" + (o + l)] ? n["row_" + (o + l)]++ : n["row_" + (o + l)] = r.colSpan || 1;
                        a += n["row_" + o] || 0,
                            i = Math.max(a, i)
                    }
                    return i
                },
                getCellColIndex: function (e) { },
                getHSideCell: function (e, t) {
                    try {
                        var i, n, o = this.getCellInfo(e),
                            r = this.selectedTds.length,
                            a = this.cellsRange;
                        return !t && (r ? !a.beginColIndex : !o.colIndex) || t && (r ? a.endColIndex == this.colsNum - 1 : o.colIndex == this.colsNum - 1) ? null : (i = r ? a.beginRowIndex : o.rowIndex, n = t ? r ? a.endColIndex + 1 : o.colIndex + 1 : r ? a.beginColIndex - 1 : o.colIndex < 1 ? 0 : o.colIndex - 1, this.getCell(this.indexTable[i][n].rowIndex, this.indexTable[i][n].cellIndex))
                    } catch (s) { }
                },
                getTabNextCell: function (e, t) {
                    var i, n = this.getCellInfo(e),
                        o = t || n.rowIndex,
                        r = n.colIndex + 1 + (n.colSpan - 1);
                    try {
                        i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex)
                    } catch (a) {
                        try {
                            o = 1 * o + 1,
                                r = 0,
                                i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex)
                        } catch (a) { }
                    }
                    return i
                },
                getVSideCell: function (e, t, i) {
                    try {
                        var n, o, r = this.getCellInfo(e),
                            a = this.selectedTds.length && !i,
                            s = this.cellsRange;
                        return !t && 0 == r.rowIndex || t && (a ? s.endRowIndex == this.rowsNum - 1 : r.rowIndex + r.rowSpan > this.rowsNum - 1) ? null : (n = t ? a ? s.endRowIndex + 1 : r.rowIndex + r.rowSpan : a ? s.beginRowIndex - 1 : r.rowIndex - 1, o = a ? s.beginColIndex : r.colIndex, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex))
                    } catch (l) { }
                },
                getSameEndPosCells: function (e, t) {
                    try {
                        for (var i = "x" === t.toLowerCase(), n = domUtils.getXY(e)[i ? "x" : "y"] + e["offset" + (i ? "Width" : "Height")], o = this.table.rows, r = null, a = [], s = 0; s < this.rowsNum; s++) {
                            r = o[s].cells;
                            for (var l, d = 0; l = r[d++];) {
                                var c = domUtils.getXY(l)[i ? "x" : "y"] + l["offset" + (i ? "Width" : "Height")];
                                if (c > n && i) break;
                                if ((e == l || n == c) && (1 == l[i ? "colSpan" : "rowSpan"] && a.push(l), i)) break
                            }
                        }
                        return a
                    } catch (u) { }
                },
                setCellContent: function (e, t) {
                    e.innerHTML = t || (browser.ie ? domUtils.fillChar : "<br />")
                },
                cloneCell: UETable.cloneCell,
                getSameStartPosXCells: function (e) {
                    try {
                        for (var t, i = domUtils.getXY(e).x + e.offsetWidth, n = this.table.rows, o = [], r = 0; r < this.rowsNum; r++) {
                            t = n[r].cells;
                            for (var a, s = 0; a = t[s++];) {
                                var l = domUtils.getXY(a).x;
                                if (l > i) break;
                                if (l == i && 1 == a.colSpan) {
                                    o.push(a);
                                    break
                                }
                            }
                        }
                        return o
                    } catch (d) { }
                },
                update: function (e) {
                    this.table = e || this.table,
                        this.selectedTds = [],
                        this.cellsRange = {},
                        this.indexTable = [];
                    for (var t = this.table.rows,
                        i = this.getMaxRows(), n = i - t.length, o = this.getMaxCols(); n--;) this.table.insertRow(t.length);
                    this.rowsNum = i,
                        this.colsNum = o;
                    for (var r = 0,
                        a = t.length; r < a; r++) this.indexTable[r] = new Array(o);
                    for (var s, l = 0; s = t[l]; l++) for (var d, c = 0,
                        u = s.cells; d = u[c]; c++) {
                        d.rowSpan > i && (d.rowSpan = i);
                        for (var m = c,
                            f = d.rowSpan || 1,
                            h = d.colSpan || 1; this.indexTable[l][m];) m++;
                        for (var p = 0; p < f; p++) for (var g = 0; g < h; g++) this.indexTable[l + p][m + g] = {
                            rowIndex: l,
                            cellIndex: c,
                            colIndex: m,
                            rowSpan: f,
                            colSpan: h
                        }
                    }
                    for (p = 0; p < i; p++) for (g = 0; g < o; g++) void 0 === this.indexTable[p][g] && (d = (d = (s = t[p]).cells[s.cells.length - 1]) ? d.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(d), 1 !== d.colSpan && (d.colSpan = 1), 1 !== d.rowSpan && (d.rowSpan = 1), s.appendChild(d), this.indexTable[p][g] = {
                        rowIndex: p,
                        cellIndex: d.cellIndex,
                        colIndex: g,
                        rowSpan: 1,
                        colSpan: 1
                    });
                    var b = domUtils.getElementsByTagName(this.table, "td"),
                        v = [];
                    if (utils.each(b, (function (e) {
                        domUtils.hasClass(e, "selectTdClass") && v.push(e)
                    })), v.length) {
                        var y = v[0],
                            C = v[v.length - 1],
                            N = this.getCellInfo(y),
                            x = this.getCellInfo(C);
                        this.selectedTds = v,
                            this.cellsRange = {
                                beginRowIndex: N.rowIndex,
                                beginColIndex: N.colIndex,
                                endRowIndex: x.rowIndex + x.rowSpan - 1,
                                endColIndex: x.colIndex + x.colSpan - 1
                            }
                    }
                    if (!domUtils.hasClass(this.table.rows[0], "firstRow")) for (domUtils.addClass(this.table.rows[0], "firstRow"), r = 1; r < this.table.rows.length; r++) domUtils.removeClasses(this.table.rows[r], "firstRow")
                },
                getCellInfo: function (e) {
                    if (e) for (var t = e.cellIndex,
                        i = e.parentNode.rowIndex,
                        n = this.indexTable[i], o = this.colsNum, r = t; r < o; r++) {
                        var a = n[r];
                        if (a.rowIndex === i && a.cellIndex === t) return a
                    }
                },
                getCell: function (e, t) {
                    return e < this.rowsNum && this.table.rows[e].cells[t] || null
                },
                deleteCell: function (e, t) {
                    t = "number" == typeof t ? t : e.parentNode.rowIndex,
                        this.table.rows[t].deleteCell(e.cellIndex)
                },
                getCellsRange: function (e, t) {
                    try {
                        var i = this,
                            n = i.getCellInfo(e);
                        if (e === t) return {
                            beginRowIndex: n.rowIndex,
                            beginColIndex: n.colIndex,
                            endRowIndex: n.rowIndex + n.rowSpan - 1,
                            endColIndex: n.colIndex + n.colSpan - 1
                        };
                        var o = i.getCellInfo(t);
                        return function e(t, n, o, r) {
                            var a, s, l, d = t,
                                c = n,
                                u = o,
                                m = r;
                            if (t > 0) for (s = n; s < r; s++)(l = (a = i.indexTable[t][s]).rowIndex) < t && (d = Math.min(l, d));
                            if (r < i.colsNum) for (l = t; l < o; l++)(s = (a = i.indexTable[l][r]).colIndex + a.colSpan - 1) > r && (m = Math.max(s, m));
                            if (o < i.rowsNum) for (s = n; s < r; s++)(l = (a = i.indexTable[o][s]).rowIndex + a.rowSpan - 1) > o && (u = Math.max(l, u));
                            if (n > 0) for (l = t; l < o; l++)(s = (a = i.indexTable[l][n]).colIndex) < n && (c = Math.min(a.colIndex, c));
                            return d != t || c != n || u != o || m != r ? e(d, c, u, m) : {
                                beginRowIndex: t,
                                beginColIndex: n,
                                endRowIndex: o,
                                endColIndex: r
                            }
                        }(Math.min(n.rowIndex, o.rowIndex), Math.min(n.colIndex, o.colIndex), Math.max(n.rowIndex + n.rowSpan - 1, o.rowIndex + o.rowSpan - 1), Math.max(n.colIndex + n.colSpan - 1, o.colIndex + o.colSpan - 1))
                    } catch (r) { }
                },
                getCells: function (e) {
                    this.clearSelected();
                    for (var t, i, n, o = e.beginRowIndex,
                        r = e.beginColIndex,
                        a = e.endRowIndex,
                        s = e.endColIndex,
                        l = {},
                        d = [], c = o; c <= a; c++) for (var u = r; u <= s; u++) {
                            var m = (i = (t = this.indexTable[c][u]).rowIndex) + "|" + (n = t.colIndex);
                            if (!l[m]) {
                                if (l[m] = 1, i < c || n < u || i + t.rowSpan - 1 > a || n + t.colSpan - 1 > s) return null;
                                d.push(this.getCell(i, t.cellIndex))
                            }
                        }
                    return d
                },
                clearSelected: function () {
                    UETable.removeSelectedClass(this.selectedTds),
                        this.selectedTds = [],
                        this.cellsRange = {}
                },
                setSelected: function (e) {
                    var t = this.getCells(e);
                    UETable.addSelectedClass(t),
                        this.selectedTds = t,
                        this.cellsRange = e
                },
                isFullRow: function () {
                    var e = this.cellsRange;
                    return e.endColIndex - e.beginColIndex + 1 == this.colsNum
                },
                isFullCol: function () {
                    var e = this.cellsRange,
                        t = this.table.getElementsByTagName("th"),
                        i = e.endRowIndex - e.beginRowIndex + 1;
                    return t.length ? i == this.rowsNum || i == this.rowsNum - 1 : i == this.rowsNum
                },
                getNextCell: function (e, t, i) {
                    try {
                        var n, o, r = this.getCellInfo(e),
                            a = this.selectedTds.length && !i,
                            s = this.cellsRange;
                        return !t && 0 == r.rowIndex || t && (a ? s.endRowIndex == this.rowsNum - 1 : r.rowIndex + r.rowSpan > this.rowsNum - 1) ? null : (n = t ? a ? s.endRowIndex + 1 : r.rowIndex + r.rowSpan : a ? s.beginRowIndex - 1 : r.rowIndex - 1, o = a ? s.beginColIndex : r.colIndex, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex))
                    } catch (l) { }
                },
                getPreviewCell: function (e, t) {
                    try {
                        var i, n, o = this.getCellInfo(e),
                            r = this.selectedTds.length,
                            a = this.cellsRange;
                        return !t && (r ? !a.beginColIndex : !o.colIndex) || t && (r ? a.endColIndex == this.colsNum - 1 : o.rowIndex > this.colsNum - 1) ? null : (i = t ? r ? a.beginRowIndex : o.rowIndex < 1 ? 0 : o.rowIndex - 1 : r ? a.beginRowIndex : o.rowIndex, n = t ? r ? a.endColIndex + 1 : o.colIndex : r ? a.beginColIndex - 1 : o.colIndex < 1 ? 0 : o.colIndex - 1, this.getCell(this.indexTable[i][n].rowIndex, this.indexTable[i][n].cellIndex))
                    } catch (s) { }
                },
                moveContent: function (e, t) {
                    if (!UETable.isEmptyBlock(t)) if (UETable.isEmptyBlock(e)) e.innerHTML = t.innerHTML;
                    else {
                        var i = e.lastChild;
                        for (3 != i.nodeType && dtd.$block[i.tagName] || e.appendChild(e.ownerDocument.createElement("br")); i = t.firstChild;) e.appendChild(i)
                    }
                },
                mergeRight: function (e) {
                    var t = this.getCellInfo(e),
                        i = t.colIndex + t.colSpan,
                        n = this.indexTable[t.rowIndex][i],
                        o = this.getCell(n.rowIndex, n.cellIndex);
                    e.colSpan = t.colSpan + n.colSpan,
                        e.removeAttribute("width"),
                        this.moveContent(e, o),
                        this.deleteCell(o, n.rowIndex),
                        this.update()
                },
                mergeDown: function (e) {
                    var t = this.getCellInfo(e),
                        i = t.rowIndex + t.rowSpan,
                        n = this.indexTable[i][t.colIndex],
                        o = this.getCell(n.rowIndex, n.cellIndex);
                    e.rowSpan = t.rowSpan + n.rowSpan,
                        e.removeAttribute("height"),
                        this.moveContent(e, o),
                        this.deleteCell(o, n.rowIndex),
                        this.update()
                },
                mergeRange: function () {
                    var e = this.cellsRange,
                        t = this.getCell(e.beginRowIndex, this.indexTable[e.beginRowIndex][e.beginColIndex].cellIndex);
                    if ("TH" == t.tagName && e.endRowIndex !== e.beginRowIndex) {
                        var i = this.indexTable,
                            n = this.getCellInfo(t);
                        t = this.getCell(1, i[1][n.colIndex].cellIndex),
                            e = this.getCellsRange(t, this.getCell(i[this.rowsNum - 1][n.colIndex].rowIndex, i[this.rowsNum - 1][n.colIndex].cellIndex))
                    }
                    for (var o, r = this.getCells(e), a = 0; o = r[a++];) o !== t && (this.moveContent(t, o), this.deleteCell(o));
                    if (t.rowSpan = e.endRowIndex - e.beginRowIndex + 1, t.rowSpan > 1 && t.removeAttribute("height"), t.colSpan = e.endColIndex - e.beginColIndex + 1, t.colSpan > 1 && t.removeAttribute("width"), t.rowSpan == this.rowsNum && 1 != t.colSpan && (t.colSpan = 1), t.colSpan == this.colsNum && 1 != t.rowSpan) {
                        var s = t.parentNode.rowIndex;
                        if (this.table.deleteRow) {
                            a = s + 1;
                            for (var l = s + 1,
                                d = t.rowSpan; a < d; a++) this.table.deleteRow(l)
                        } else for (a = 0, d = t.rowSpan - 1; a < d; a++) {
                            var c = this.table.rows[s + 1];
                            c.parentNode.removeChild(c)
                        }
                        t.rowSpan = 1
                    }
                    this.update()
                },
                insertRow: function (e, t) {
                    var i, n = this.colsNum,
                        o = this.table.insertRow(e),
                        r = "string" == typeof t && "TH" == t.toUpperCase();
                    function a(e, t, i) {
                        if (0 == e) {
                            var n = (i.nextSibling || i.previousSibling).cells[e];
                            "TH" == n.tagName && ((n = t.ownerDocument.createElement("th")).appendChild(t.firstChild), i.insertBefore(n, t), domUtils.remove(t))
                        } else if ("TH" == t.tagName) {
                            var o = t.ownerDocument.createElement("td");
                            o.appendChild(t.firstChild),
                                i.insertBefore(o, t),
                                domUtils.remove(t)
                        }
                    }
                    if (0 == e || e == this.rowsNum) for (var s = 0; s < n; s++) i = this.cloneCell(t, !0),
                        this.setCellContent(i),
                        i.getAttribute("vAlign") && i.setAttribute("vAlign", i.getAttribute("vAlign")),
                        o.appendChild(i),
                        r || a(s, i, o);
                    else {
                        var l = this.indexTable[e];
                        for (s = 0; s < n; s++) {
                            var d = l[s];
                            d.rowIndex < e ? (i = this.getCell(d.rowIndex, d.cellIndex)).rowSpan = d.rowSpan + 1 : (i = this.cloneCell(t, !0), this.setCellContent(i), o.appendChild(i)),
                                r || a(s, i, o)
                        }
                    }
                    return this.update(),
                        o
                },
                deleteRow: function (e) {
                    for (var t = this.table.rows[e], i = this.indexTable[e], n = this.colsNum, o = 0, r = 0; r < n;) {
                        var a = i[r],
                            s = this.getCell(a.rowIndex, a.cellIndex);
                        if (s.rowSpan > 1 && a.rowIndex == e) {
                            var l = s.cloneNode(!0);
                            l.rowSpan = s.rowSpan - 1,
                                l.innerHTML = "",
                                s.rowSpan = 1;
                            var d, c = e + 1,
                                u = this.table.rows[c],
                                m = this.getPreviewMergedCellsNum(c, r) - o;
                            m < r ? (d = r - m - 1, domUtils.insertAfter(u.cells[d], l)) : u.cells.length && u.insertBefore(l, u.cells[0]),
                                o += 1
                        }
                        r += s.colSpan || 1
                    }
                    var f = [],
                        h = {};
                    for (r = 0; r < n; r++) {
                        var p = i[r].rowIndex,
                            g = i[r].cellIndex,
                            b = p + "_" + g;
                        h[b] || (h[b] = 1, s = this.getCell(p, g), f.push(s))
                    }
                    var v = [];
                    utils.each(f, (function (e) {
                        1 == e.rowSpan ? e.parentNode.removeChild(e) : v.push(e)
                    })),
                        utils.each(v, (function (e) {
                            e.rowSpan--
                        })),
                        t.parentNode.removeChild(t),
                        this.update()
                },
                insertCol: function (e, t, i) {
                    var n, o, r, a = this.rowsNum,
                        s = 0,
                        l = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10),
                        d = "string" == typeof t && "TH" == t.toUpperCase();
                    function c(e, t, i) {
                        if (0 == e) {
                            var n = t.nextSibling || t.previousSibling;
                            "TH" == n.tagName && ((n = t.ownerDocument.createElement("th")).appendChild(t.firstChild), i.insertBefore(n, t), domUtils.remove(t))
                        } else if ("TH" == t.tagName) {
                            var o = t.ownerDocument.createElement("td");
                            o.appendChild(t.firstChild),
                                i.insertBefore(o, t),
                                domUtils.remove(t)
                        }
                    }
                    if (0 == e || e == this.colsNum) for (; s < a; s++) r = (n = this.table.rows[s]).cells[0 == e ? e : n.cells.length],
                        o = this.cloneCell(t, !0),
                        this.setCellContent(o),
                        o.setAttribute("vAlign", o.getAttribute("vAlign")),
                        r && o.setAttribute("width", r.getAttribute("width")),
                        e ? domUtils.insertAfter(n.cells[n.cells.length - 1], o) : n.insertBefore(o, n.cells[0]),
                        d || c(s, o, n);
                    else for (; s < a; s++) {
                        var u = this.indexTable[s][e];
                        u.colIndex < e ? (o = this.getCell(u.rowIndex, u.cellIndex)).colSpan = u.colSpan + 1 : (r = (n = this.table.rows[s]).cells[u.cellIndex], o = this.cloneCell(t, !0), this.setCellContent(o), o.setAttribute("vAlign", o.getAttribute("vAlign")), r && o.setAttribute("width", r.getAttribute("width")), r ? n.insertBefore(o, r) : n.appendChild(o)),
                            d || c(s, o, n)
                    }
                    this.update(),
                        this.updateWidth(l, i || {
                            tdPadding: 10,
                            tdBorder: 1
                        })
                },
                updateWidth: function (e, t) {
                    var i = this.table,
                        n = UETable.getWidth(i) - 2 * t.tdPadding - t.tdBorder + e;
                    if (n < i.ownerDocument.body.offsetWidth) i.setAttribute("width", n);
                    else {
                        var o = domUtils.getElementsByTagName(this.table, "td th");
                        utils.each(o, (function (t) {
                            t.setAttribute("width", e)
                        }))
                    }
                },
                deleteCol: function (e) {
                    for (var t = this.indexTable,
                        i = this.table.rows,
                        n = this.table.getAttribute("width"), o = 0, r = this.rowsNum, a = {},
                        s = 0; s < r;) {
                        var l = t[s][e],
                            d = l.rowIndex + "_" + l.colIndex;
                        if (!a[d]) {
                            a[d] = 1;
                            var c = this.getCell(l.rowIndex, l.cellIndex);
                            o || (o = c && parseInt(c.offsetWidth / c.colSpan, 10).toFixed(0)),
                                c.colSpan > 1 ? c.colSpan-- : i[s].deleteCell(l.cellIndex),
                                s += l.rowSpan || 1
                        }
                    }
                    this.table.setAttribute("width", n - o),
                        this.update()
                },
                splitToCells: function (e) {
                    var t = this,
                        i = this.splitToRows(e);
                    utils.each(i, (function (e) {
                        t.splitToCols(e)
                    }))
                },
                splitToRows: function (e) {
                    var t = this.getCellInfo(e),
                        i = t.rowIndex,
                        n = t.colIndex,
                        o = [];
                    e.rowSpan = 1,
                        o.push(e);
                    for (var r = i,
                        a = i + t.rowSpan; r < a; r++) if (r != i) {
                            var s = this.table.rows[r].insertCell(n - this.getPreviewMergedCellsNum(r, n));
                            s.colSpan = t.colSpan,
                                this.setCellContent(s),
                                s.setAttribute("vAlign", e.getAttribute("vAlign")),
                                s.setAttribute("align", e.getAttribute("align")),
                                e.style.cssText && (s.style.cssText = e.style.cssText),
                                o.push(s)
                        }
                    return this.update(),
                        o
                },
                getPreviewMergedCellsNum: function (e, t) {
                    for (var i = this.indexTable[e], n = 0, o = 0; o < t;) {
                        var r = i[o].colSpan;
                        n += r - (i[o].rowIndex == e ? 1 : 0),
                            o += r
                    }
                    return n
                },
                splitToCols: function (e) {
                    var t = (e.offsetWidth / e.colSpan - 22).toFixed(0),
                        i = this.getCellInfo(e),
                        n = i.rowIndex,
                        o = i.colIndex,
                        r = [];
                    e.colSpan = 1,
                        e.setAttribute("width", t),
                        r.push(e);
                    for (var a = o,
                        s = o + i.colSpan; a < s; a++) if (a != o) {
                            var l = this.table.rows[n],
                                d = l.insertCell(this.indexTable[n][a].cellIndex + 1);
                            if (d.rowSpan = i.rowSpan, this.setCellContent(d), d.setAttribute("vAlign", e.getAttribute("vAlign")), d.setAttribute("align", e.getAttribute("align")), d.setAttribute("width", t), e.style.cssText && (d.style.cssText = e.style.cssText), "TH" == e.tagName) {
                                var c = e.ownerDocument.createElement("th");
                                c.appendChild(d.firstChild),
                                    c.setAttribute("vAlign", e.getAttribute("vAlign")),
                                    c.rowSpan = d.rowSpan,
                                    l.insertBefore(c, d),
                                    domUtils.remove(d)
                            }
                            r.push(d)
                        }
                    return this.update(),
                        r
                },
                isLastCell: function (e, t, i) {
                    t = t || this.rowsNum,
                        i = i || this.colsNum;
                    var n = this.getCellInfo(e);
                    return n.rowIndex + n.rowSpan == t && n.colIndex + n.colSpan == i
                },
                getLastCell: function (e) {
                    e = e || this.table.getElementsByTagName("td"),
                        this.getCellInfo(e[0]);
                    var t, i = this,
                        n = e[0],
                        o = n.parentNode,
                        r = 0,
                        a = 0;
                    return utils.each(e, (function (e) {
                        e.parentNode == o && (a += e.colSpan || 1),
                            r += e.rowSpan * e.colSpan || 1
                    })),
                        t = r / a,
                        utils.each(e, (function (e) {
                            if (i.isLastCell(e, t, a)) return n = e,
                                !1
                        })),
                        n
                },
                selectRow: function (e) {
                    var t = this.indexTable[e],
                        i = this.getCell(t[0].rowIndex, t[0].cellIndex),
                        n = this.getCell(t[this.colsNum - 1].rowIndex, t[this.colsNum - 1].cellIndex),
                        o = this.getCellsRange(i, n);
                    this.setSelected(o)
                },
                selectTable: function () {
                    var e = this.table.getElementsByTagName("td"),
                        t = this.getCellsRange(e[0], e[e.length - 1]);
                    this.setSelected(t)
                },
                setBackground: function (e, t) {
                    if ("string" == typeof t) utils.each(e, (function (e) {
                        e.style.backgroundColor = t
                    }));
                    else if ("object" == typeof t) {
                        t = utils.extend({
                            repeat: !0,
                            colorList: ["#ddd", "#fff"]
                        },
                            t);
                        for (var i, n = this.getCellInfo(e[0]).rowIndex, o = 0, r = t.colorList, a = 0; i = e[a++];) {
                            var s = this.getCellInfo(i);
                            i.style.backgroundColor = (l = r, d = n + o == s.rowIndex ? o : ++o, c = t.repeat, l[d] ? l[d] : c ? l[d % l.length] : "")
                        }
                    }
                    var l, d, c
                }, removeBackground: function (e) {
                    utils.each(e, (function (e) {
                        e.style.backgroundColor = ""
                    }))
                }
            },
            function () {
                var e = UE.UETable,
                    t = function (t) {
                        return e.getTableItemsByRange(t)
                    },
                    i = function (t) {
                        return e.getUETableBySelected(t)
                    },
                    n = function (t, i) {
                        return e.getDefaultValue(t, i)
                    },
                    o = function (t) {
                        return e.getUETable(t)
                    };
                function r(e, t) {
                    var i = domUtils.getElementsByTagName(e, "td th");
                    utils.each(i, (function (e) {
                        e.removeAttribute("width")
                    })),
                        e.setAttribute("width",
                            function (e, t, i) {
                                var n = e.body;
                                return n.offsetWidth - (t ? 2 * parseInt(domUtils.getComputedStyle(n, "margin-left"), 10) : 0) - 2 * i.tableBorder - (e.options.offsetWidth || 0)
                            }(t, !0, n(t, e)));
                    var o = [];
                    setTimeout((function () {
                        utils.each(i, (function (e) {
                            1 == e.colSpan && o.push(e.offsetWidth)
                        })),
                            utils.each(i, (function (e, t) {
                                1 == e.colSpan && e.setAttribute("width", o[t] + "")
                            }))
                    }), 0)
                }
                function a(e) {
                    var i = t(e).cell;
                    if (i) {
                        var n = o(i);
                        return n.selectedTds.length ? n.selectedTds : [i]
                    }
                    return []
                }
                UE.commands.inserttable = {
                    queryCommandState: function () {
                        return t(this).table ? -1 : 0
                    },
                    execCommand: function (e, t) {
                        t || (t = utils.extend({},
                            {
                                numCols: this.options.defaultCols,
                                numRows: this.options.defaultRows,
                                tdvalign: this.options.tdvalign
                            }));
                        var i = this.selection.getRange().startContainer,
                            o = domUtils.findParent(i, (function (e) {
                                return domUtils.isBlockElm(e)
                            }), !0) || this.body,
                            r = n(this),
                            a = o.offsetWidth,
                            s = Math.floor(a / t.numCols - 2 * r.tdPadding - r.tdBorder); !t.tdvalign && (t.tdvalign = this.options.tdvalign),
                                this.execCommand("inserthtml",
                                    function (e, t) {
                                        for (var i = [], n = e.numRows, o = e.numCols, r = 0; r < n; r++) {
                                            i.push("<tr" + (0 == r ? ' class="firstRow"' : "") + ">");
                                            for (var a = 0; a < o; a++) i.push('<td width="' + t + '"  vAlign="' + e.tdvalign + '" >' + (browser.ie && browser.version < 11 ? domUtils.fillChar : "<br/>") + "</td>");
                                            i.push("</tr>")
                                        }
                                        return "<table><tbody>" + i.join("") + "</tbody></table>"
                                    }(t, s))
                    }
                },
                    UE.commands.insertparagraphbeforetable = {
                        queryCommandState: function () {
                            return t(this).cell ? 0 : -1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            if (e) {
                                var i = this.document.createElement("p");
                                i.innerHTML = browser.ie ? "&nbsp;" : "<br />",
                                    e.parentNode.insertBefore(i, e),
                                    this.selection.getRange().setStart(i, 0).setCursor()
                            }
                        }
                    },
                    UE.commands.deletetable = {
                        queryCommandState: function () {
                            var e = this.selection.getRange();
                            return domUtils.findParentByTagName(e.startContainer, "table", !0) ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i = this.selection.getRange();
                            if (t = t || domUtils.findParentByTagName(i.startContainer, "table", !0)) {
                                var n = t.nextSibling;
                                n || (n = domUtils.createElement(this.document, "p", {
                                    innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
                                }), t.parentNode.insertBefore(n, t)),
                                    domUtils.remove(t),
                                    i = this.selection.getRange(),
                                    3 == n.nodeType ? i.setStartBefore(n) : i.setStart(n, 0),
                                    i.setCursor(!1, !0),
                                    this.fireEvent("tablehasdeleted")
                            }
                        }
                    },
                    UE.commands.cellalign = {
                        queryCommandState: function () {
                            return a(this).length ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i = a(this);
                            if (i.length) for (var n, o = 0; n = i[o++];) n.setAttribute("align", t)
                        }
                    },
                    UE.commands.cellvalign = {
                        queryCommandState: function () {
                            return a(this).length ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i = a(this);
                            if (i.length) for (var n, o = 0; n = i[o++];) n.setAttribute("vAlign", t)
                        }
                    },
                    UE.commands.insertcaption = {
                        queryCommandState: function () {
                            var e = t(this).table;
                            return e && 0 == e.getElementsByTagName("caption").length ? 1 : -1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            if (e) {
                                var i = this.document.createElement("caption");
                                i.innerHTML = browser.ie ? domUtils.fillChar : "<br/>",
                                    e.insertBefore(i, e.firstChild),
                                    this.selection.getRange().setStart(i, 0).setCursor()
                            }
                        }
                    },
                    UE.commands.deletecaption = {
                        queryCommandState: function () {
                            var e = this.selection.getRange(),
                                t = domUtils.findParentByTagName(e.startContainer, "table");
                            return t ? 0 == t.getElementsByTagName("caption").length ? -1 : 1 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                t = domUtils.findParentByTagName(e.startContainer, "table");
                            t && (domUtils.remove(t.getElementsByTagName("caption")[0]), this.selection.getRange().setStart(t.rows[0].cells[0], 0).setCursor())
                        }
                    },
                    UE.commands.inserttitle = {
                        queryCommandState: function () {
                            var e = t(this).table;
                            if (e) {
                                var i = e.rows[0];
                                return "th" != i.cells[i.cells.length - 1].tagName.toLowerCase() ? 0 : -1
                            }
                            return - 1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            e && o(e).insertRow(0, "th");
                            var i = e.getElementsByTagName("th")[0];
                            this.selection.getRange().setStart(i, 0).setCursor(!1, !0)
                        }
                    },
                    UE.commands.deletetitle = {
                        queryCommandState: function () {
                            var e = t(this).table;
                            if (e) {
                                var i = e.rows[0];
                                return "th" == i.cells[i.cells.length - 1].tagName.toLowerCase() ? 0 : -1
                            }
                            return - 1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            e && domUtils.remove(e.rows[0]);
                            var i = e.getElementsByTagName("td")[0];
                            this.selection.getRange().setStart(i, 0).setCursor(!1, !0)
                        }
                    },
                    UE.commands.inserttitlecol = {
                        queryCommandState: function () {
                            var e = t(this).table;
                            return e ? e.rows[e.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1
                        },
                        execCommand: function (e) {
                            var i = t(this).table;
                            i && o(i).insertCol(0, "th"),
                                r(i, this);
                            var n = i.getElementsByTagName("th")[0];
                            this.selection.getRange().setStart(n, 0).setCursor(!1, !0)
                        }
                    },
                    UE.commands.deletetitlecol = {
                        queryCommandState: function () {
                            var e = t(this).table;
                            return e && e.rows[e.rows.length - 1].getElementsByTagName("th").length ? 0 : -1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            if (e) for (var i = 0; i < e.rows.length; i++) domUtils.remove(e.rows[i].children[0]);
                            r(e, this);
                            var n = e.getElementsByTagName("td")[0];
                            this.selection.getRange().setStart(n, 0).setCursor(!1, !0)
                        }
                    },
                    UE.commands.mergeright = {
                        queryCommandState: function (e) {
                            var i = t(this),
                                n = i.table,
                                r = i.cell;
                            if (!n || !r) return - 1;
                            var a = o(n);
                            if (a.selectedTds.length) return - 1;
                            var s = a.getCellInfo(r),
                                l = s.colIndex + s.colSpan;
                            if (l >= a.colsNum) return - 1;
                            var d = a.indexTable[s.rowIndex][l],
                                c = n.rows[d.rowIndex].cells[d.cellIndex];
                            return c && r.tagName == c.tagName && d.rowIndex == s.rowIndex && d.rowSpan == s.rowSpan ? 0 : -1
                        },
                        execCommand: function (e) {
                            var i = this.selection.getRange(),
                                n = i.createBookmark(!0),
                                r = t(this).cell;
                            o(r).mergeRight(r),
                                i.moveToBookmark(n).select()
                        }
                    },
                    UE.commands.mergedown = {
                        queryCommandState: function (e) {
                            var i = t(this),
                                n = i.table,
                                r = i.cell;
                            if (!n || !r) return - 1;
                            var a = o(n);
                            if (a.selectedTds.length) return - 1;
                            var s = a.getCellInfo(r),
                                l = s.rowIndex + s.rowSpan;
                            if (l >= a.rowsNum) return - 1;
                            var d = a.indexTable[l][s.colIndex],
                                c = n.rows[d.rowIndex].cells[d.cellIndex];
                            return c && r.tagName == c.tagName && d.colIndex == s.colIndex && d.colSpan == s.colSpan ? 0 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this).cell;
                            o(n).mergeDown(n),
                                e.moveToBookmark(i).select()
                        }
                    },
                    UE.commands.mergecells = {
                        queryCommandState: function () {
                            return i(this) ? 0 : -1
                        },
                        execCommand: function () {
                            var e = i(this);
                            if (e && e.selectedTds.length) {
                                var t = e.selectedTds[0];
                                e.mergeRange();
                                var n = this.selection.getRange();
                                domUtils.isEmptyBlock(t) ? n.setStart(t, 0).collapse(!0) : n.selectNodeContents(t),
                                    n.select()
                            }
                        }
                    },
                    UE.commands.insertrow = {
                        queryCommandState: function () {
                            var e = t(this),
                                i = e.cell;
                            return i && ("TD" == i.tagName || "TH" == i.tagName && e.tr !== e.table.rows[0]) && o(e.table).rowsNum < this.options.maxRowNum ? 0 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this),
                                r = n.cell,
                                a = n.table,
                                s = o(a),
                                l = s.getCellInfo(r);
                            if (s.selectedTds.length) for (var d = s.cellsRange,
                                c = 0,
                                u = d.endRowIndex - d.beginRowIndex + 1; c < u; c++) s.insertRow(d.beginRowIndex, r);
                            else s.insertRow(l.rowIndex, r);
                            e.moveToBookmark(i).select(),
                                "enabled" === a.getAttribute("interlaced") && this.fireEvent("interlacetable", a)
                        }
                    },
                    UE.commands.insertrownext = {
                        queryCommandState: function () {
                            var e = t(this),
                                i = e.cell;
                            return i && "TD" == i.tagName && o(e.table).rowsNum < this.options.maxRowNum ? 0 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this),
                                r = n.cell,
                                a = n.table,
                                s = o(a),
                                l = s.getCellInfo(r);
                            if (s.selectedTds.length) for (var d = s.cellsRange,
                                c = 0,
                                u = d.endRowIndex - d.beginRowIndex + 1; c < u; c++) s.insertRow(d.endRowIndex + 1, r);
                            else s.insertRow(l.rowIndex + l.rowSpan, r);
                            e.moveToBookmark(i).select(),
                                "enabled" === a.getAttribute("interlaced") && this.fireEvent("interlacetable", a)
                        }
                    },
                    UE.commands.deleterow = {
                        queryCommandState: function () {
                            return t(this).cell ? 0 : -1
                        },
                        execCommand: function () {
                            var e = t(this).cell,
                                i = o(e),
                                n = i.cellsRange,
                                r = i.getCellInfo(e),
                                a = i.getVSideCell(e),
                                s = i.getVSideCell(e, !0),
                                l = this.selection.getRange();
                            if (utils.isEmptyObject(n)) i.deleteRow(r.rowIndex);
                            else for (var d = n.beginRowIndex; d < n.endRowIndex + 1; d++) i.deleteRow(n.beginRowIndex);
                            var c = i.table;
                            if (c.getElementsByTagName("td").length) if (1 == r.rowSpan || r.rowSpan == n.endRowIndex - n.beginRowIndex + 1) (s || a) && l.selectNodeContents(s || a).setCursor(!1, !0);
                            else {
                                var u = i.getCell(r.rowIndex, i.indexTable[r.rowIndex][r.colIndex].cellIndex);
                                u && l.selectNodeContents(u).setCursor(!1, !0)
                            } else {
                                var m = c.nextSibling;
                                domUtils.remove(c),
                                    m && l.setStart(m, 0).setCursor(!1, !0)
                            }
                            "enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
                        }
                    },
                    UE.commands.insertcol = {
                        queryCommandState: function (e) {
                            var i = t(this),
                                n = i.cell;
                            return n && ("TD" == n.tagName || "TH" == n.tagName && n !== i.tr.cells[0]) && o(i.table).colsNum < this.options.maxColNum ? 0 : -1
                        },
                        execCommand: function (e) {
                            var i = this.selection.getRange(),
                                n = i.createBookmark(!0);
                            if (- 1 != this.queryCommandState(e)) {
                                var r = t(this).cell,
                                    a = o(r),
                                    s = a.getCellInfo(r);
                                if (a.selectedTds.length) for (var l = a.cellsRange,
                                    d = 0,
                                    c = l.endColIndex - l.beginColIndex + 1; d < c; d++) a.insertCol(l.beginColIndex, r);
                                else a.insertCol(s.colIndex, r);
                                i.moveToBookmark(n).select(!0)
                            }
                        }
                    },
                    UE.commands.insertcolnext = {
                        queryCommandState: function () {
                            var e = t(this);
                            return e.cell && o(e.table).colsNum < this.options.maxColNum ? 0 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this).cell,
                                r = o(n),
                                a = r.getCellInfo(n);
                            if (r.selectedTds.length) for (var s = r.cellsRange,
                                l = 0,
                                d = s.endColIndex - s.beginColIndex + 1; l < d; l++) r.insertCol(s.endColIndex + 1, n);
                            else r.insertCol(a.colIndex + a.colSpan, n);
                            e.moveToBookmark(i).select()
                        }
                    },
                    UE.commands.deletecol = {
                        queryCommandState: function () {
                            return t(this).cell ? 0 : -1
                        },
                        execCommand: function () {
                            var e = t(this).cell,
                                i = o(e),
                                n = i.cellsRange,
                                r = i.getCellInfo(e),
                                a = i.getHSideCell(e),
                                s = i.getHSideCell(e, !0);
                            if (utils.isEmptyObject(n)) i.deleteCol(r.colIndex);
                            else for (var l = n.beginColIndex; l < n.endColIndex + 1; l++) i.deleteCol(n.beginColIndex);
                            var d = i.table,
                                c = this.selection.getRange();
                            if (d.getElementsByTagName("td").length) domUtils.inDoc(e, this.document) ? c.setStart(e, 0).setCursor(!1, !0) : s && domUtils.inDoc(s, this.document) ? c.selectNodeContents(s).setCursor(!1, !0) : a && domUtils.inDoc(a, this.document) && c.selectNodeContents(a).setCursor(!0, !0);
                            else {
                                var u = d.nextSibling;
                                domUtils.remove(d),
                                    u && c.setStart(u, 0).setCursor(!1, !0)
                            }
                        }
                    },
                    UE.commands.splittocells = {
                        queryCommandState: function () {
                            var e = t(this),
                                i = e.cell;
                            return i ? o(e.table).selectedTds.length > 0 ? -1 : i && (i.colSpan > 1 || i.rowSpan > 1) ? 0 : -1 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this).cell;
                            o(n).splitToCells(n),
                                e.moveToBookmark(i).select()
                        }
                    },
                    UE.commands.splittorows = {
                        queryCommandState: function () {
                            var e = t(this),
                                i = e.cell;
                            return i ? o(e.table).selectedTds.length > 0 ? -1 : i && i.rowSpan > 1 ? 0 : -1 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this).cell;
                            o(n).splitToRows(n),
                                e.moveToBookmark(i).select()
                        }
                    },
                    UE.commands.splittocols = {
                        queryCommandState: function () {
                            var e = t(this),
                                i = e.cell;
                            return i ? o(e.table).selectedTds.length > 0 ? -1 : i && i.colSpan > 1 ? 0 : -1 : -1
                        },
                        execCommand: function () {
                            var e = this.selection.getRange(),
                                i = e.createBookmark(!0),
                                n = t(this).cell;
                            o(n).splitToCols(n),
                                e.moveToBookmark(i).select()
                        }
                    },
                    UE.commands.adaptbytext = UE.commands.adaptbywindow = {
                        queryCommandState: function () {
                            return t(this).table ? 0 : -1
                        },
                        execCommand: function (e) {
                            var i = t(this).table;
                            if (i) if ("adaptbywindow" == e) r(i, this);
                            else {
                                var n = domUtils.getElementsByTagName(i, "td th");
                                utils.each(n, (function (e) {
                                    e.removeAttribute("width")
                                })),
                                    i.removeAttribute("width")
                            }
                        }
                    },
                    UE.commands.averagedistributecol = {
                        queryCommandState: function () {
                            var e = i(this);
                            return e && (e.isFullRow() || e.isFullCol()) ? 0 : -1
                        },
                        execCommand: function (e) {
                            var t = this,
                                o = i(t);
                            o && o.selectedTds.length &&
                                function (e) {
                                    utils.each(domUtils.getElementsByTagName(o.table, "th"), (function (e) {
                                        e.setAttribute("width", "")
                                    }));
                                    var t = o.isFullRow() ? domUtils.getElementsByTagName(o.table, "td") : o.selectedTds;
                                    utils.each(t, (function (t) {
                                        1 == t.colSpan && t.setAttribute("width", e)
                                    }))
                                }(function () {
                                    var e = o.table,
                                        i = 0,
                                        r = 0,
                                        a = n(t, e);
                                    if (o.isFullRow()) i = e.offsetWidth,
                                        r = o.colsNum;
                                    else for (var s, l = o.cellsRange.beginColIndex,
                                        d = o.cellsRange.endColIndex,
                                        c = l; c <= d;) i += (s = o.selectedTds[c]).offsetWidth,
                                            c += s.colSpan,
                                            r += 1;
                                    return Math.ceil(i / r) - 2 * a.tdBorder - 2 * a.tdPadding
                                }())
                        }
                    },
                    UE.commands.averagedistributerow = {
                        queryCommandState: function () {
                            var e = i(this);
                            return e ? e.selectedTds && /th/gi.test(e.selectedTds[0].tagName) ? -1 : e.isFullRow() || e.isFullCol() ? 0 : -1 : -1
                        },
                        execCommand: function (e) {
                            var t = this,
                                o = i(t);
                            o && o.selectedTds.length &&
                                function (e) {
                                    var t = o.isFullCol() ? domUtils.getElementsByTagName(o.table, "td") : o.selectedTds;
                                    utils.each(t, (function (t) {
                                        1 == t.rowSpan && t.setAttribute("height", e)
                                    }))
                                }(function () {
                                    var e, i = 0,
                                        r = o.table,
                                        a = n(t, r),
                                        s = parseInt(domUtils.getComputedStyle(r.getElementsByTagName("td")[0], "padding-top"));
                                    if (o.isFullCol()) {
                                        var l, d, c = domUtils.getElementsByTagName(r, "caption"),
                                            u = domUtils.getElementsByTagName(r, "th");
                                        c.length > 0 && (l = c[0].offsetHeight),
                                            u.length > 0 && (d = u[0].offsetHeight),
                                            i = r.offsetHeight - (l || 0) - (d || 0),
                                            e = 0 == u.length ? o.rowsNum : o.rowsNum - 1
                                    } else {
                                        for (var m = o.cellsRange.beginRowIndex,
                                            f = o.cellsRange.endRowIndex,
                                            h = 0,
                                            p = domUtils.getElementsByTagName(r, "tr"), g = m; g <= f; g++) i += p[g].offsetHeight,
                                                h += 1;
                                        e = h
                                    }
                                    return browser.ie && browser.version < 9 ? Math.ceil(i / e) : Math.ceil(i / e) - 2 * a.tdBorder - 2 * s
                                }())
                        }
                    },
                    UE.commands.cellalignment = {
                        queryCommandState: function () {
                            return t(this).table ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var n = i(this);
                            if (n) utils.each(n.selectedTds, (function (e) {
                                domUtils.setAttributes(e, t)
                            }));
                            else {
                                var o = this.selection.getStart(),
                                    r = o && domUtils.findParentByTagName(o, ["td", "th", "caption"], !0);
                                /caption/gi.test(r.tagName) ? (r.style.textAlign = t.align, r.style.verticalAlign = t.vAlign) : domUtils.setAttributes(r, t),
                                    this.selection.getRange().setCursor(!0)
                            }
                        },
                        queryCommandValue: function (e) {
                            var i = t(this).cell;
                            if (i || (i = a(this)[0]), i) {
                                var n = UE.UETable.getUETable(i).selectedTds;
                                return !n.length && (n = i),
                                    UE.UETable.getTableCellAlignState(n)
                            }
                            return null
                        }
                    },
                    UE.commands.tablealignment = {
                        queryCommandState: function () {
                            return browser.ie && browser.version < 8 ? -1 : t(this).table ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i = this.selection.getStart(),
                                n = i && domUtils.findParentByTagName(i, ["table"], !0);
                            n && n.setAttribute("align", t)
                        }
                    },
                    UE.commands.edittable = {
                        queryCommandState: function () {
                            return t(this).table ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i = this.selection.getRange(),
                                n = domUtils.findParentByTagName(i.startContainer, "table");
                            if (n) {
                                var o = domUtils.getElementsByTagName(n, "td").concat(domUtils.getElementsByTagName(n, "th"), domUtils.getElementsByTagName(n, "caption"));
                                utils.each(o, (function (e) {
                                    e.style.borderColor = t
                                }))
                            }
                        }
                    },
                    UE.commands.edittd = {
                        queryCommandState: function () {
                            return t(this).table ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var n = i(this);
                            if (n) utils.each(n.selectedTds, (function (e) {
                                e.style.backgroundColor = t
                            }));
                            else {
                                var o = this.selection.getStart(),
                                    r = o && domUtils.findParentByTagName(o, ["td", "th", "caption"], !0);
                                r && (r.style.backgroundColor = t)
                            }
                        }
                    },
                    UE.commands.settablebackground = {
                        queryCommandState: function () {
                            return a(this).length > 1 ? 0 : -1
                        },
                        execCommand: function (e, t) {
                            var i;
                            i = a(this),
                                o(i[0]).setBackground(i, t)
                        }
                    },
                    UE.commands.cleartablebackground = {
                        queryCommandState: function () {
                            var e = a(this);
                            if (!e.length) return - 1;
                            for (var t, i = 0; t = e[i++];) if ("" !== t.style.backgroundColor) return 0;
                            return - 1
                        },
                        execCommand: function () {
                            var e = a(this);
                            o(e[0]).removeBackground(e)
                        }
                    },
                    UE.commands.interlacetable = UE.commands.uninterlacetable = {
                        queryCommandState: function (e) {
                            var i = t(this).table;
                            if (!i) return - 1;
                            var n = i.getAttribute("interlaced");
                            return "interlacetable" == e ? "enabled" === n ? -1 : 0 : n && "disabled" !== n ? 0 : -1
                        },
                        execCommand: function (e, i) {
                            var n = t(this).table;
                            "interlacetable" == e ? (n.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", n, i)) : (n.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", n))
                        }
                    },
                    UE.commands.setbordervisible = {
                        queryCommandState: function (e) {
                            return t(this).table ? 0 : -1
                        },
                        execCommand: function () {
                            var e = t(this).table;
                            utils.each(domUtils.getElementsByTagName(e, "td"), (function (e) {
                                e.style.borderWidth = "1px",
                                    e.style.borderStyle = "solid"
                            }))
                        }
                    }
            }(), UE.plugins.table = function () {
                var e = this,
                    t = null,
                    i = !1,
                    n = 0,
                    o = null,
                    r = UE.UETable,
                    a = function (e) {
                        return r.getUETable(e)
                    },
                    s = function (e) {
                        return r.getUETableBySelected(e)
                    },
                    l = function (e, t) {
                        return r.getDefaultValue(e, t)
                    },
                    d = function (e) {
                        return r.removeSelectedClass(e)
                    };
                e.ready((function () {
                    var e = this,
                        t = e.selection.getText;
                    e.selection.getText = function () {
                        var i = s(e);
                        if (i) {
                            var n = "";
                            return utils.each(i.selectedTds, (function (e) {
                                n += e[browser.ie ? "innerText" : "textContent"]
                            })),
                                n
                        }
                        return t.call(e.selection)
                    }
                }));
                var c = null,
                    u = null,
                    m = "",
                    f = !1,
                    h = null,
                    p = !1,
                    g = null,
                    b = null,
                    v = !1;
                e.setOpt({
                    maxColNum: 20,
                    maxRowNum: 100,
                    defaultCols: 5,
                    defaultRows: 5,
                    tdvalign: "top",
                    cursorpath: e.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
                    tableDragable: !1,
                    classList: ["ue-table-interlace-color-single", "ue-table-interlace-color-double"]
                }),
                    e.getUETable = a;
                var y = {
                    deletetable: 1,
                    inserttable: 1,
                    cellvalign: 1,
                    insertcaption: 1,
                    deletecaption: 1,
                    inserttitle: 1,
                    deletetitle: 1,
                    mergeright: 1,
                    mergedown: 1,
                    mergecells: 1,
                    insertrow: 1,
                    insertrownext: 1,
                    deleterow: 1,
                    insertcol: 1,
                    insertcolnext: 1,
                    deletecol: 1,
                    splittocells: 1,
                    splittorows: 1,
                    splittocols: 1,
                    adaptbytext: 1,
                    adaptbywindow: 1,
                    adaptbycustomer: 1,
                    insertparagraph: 1,
                    insertparagraphbeforetable: 1,
                    averagedistributecol: 1,
                    averagedistributerow: 1
                };
                function C(e, t) {
                    N(e, "width", !0),
                        N(e, "height", !0)
                }
                function N(e, t, i) {
                    e.style[t] && (i && e.setAttribute(t, parseInt(e.style[t], 10)), e.style[t] = "")
                }
                function x(e) {
                    return "TD" == e.tagName || "TH" == e.tagName ? e : (t = domUtils.findParentByTagName(e, "td", !0) || domUtils.findParentByTagName(e, "th", !0)) ? t : null;
                    var t
                }
                function w(e) {
                    var t = new RegExp(domUtils.fillChar, "g");
                    if (e[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length > 0) return 0;
                    for (var i in dtd.$isNotEmpty) if (e.getElementsByTagName(i).length) return 0;
                    return 1
                }
                function U(t) {
                    return t.pageX || t.pageY ? {
                        x: t.pageX,
                        y: t.pageY
                    } : {
                            x: t.clientX + e.document.body.scrollLeft - e.document.body.clientLeft,
                            y: t.clientY + e.document.body.scrollTop - e.document.body.clientTop
                        }
                }
                function E(t) {
                    if (!P()) try {
                        var r, s = x(t.target || t.srcElement);
                        if (i && (e.body.style.webkitUserSelect = "none", (Math.abs(o.x - t.clientX) > 10 || Math.abs(o.y - t.clientY) > 10) && (R(), i = !1, n = 0, L(t))), m && b) return n = 0,
                            e.body.style.webkitUserSelect = "none",
                            e.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](),
                            r = U(t),
                            k(e, !0, m, r, s),
                            void ("h" == m ? g.style.left = function (t, i) {
                                var n = a(t);
                                if (n) {
                                    var o = n.getSameEndPosCells(t, "x")[0],
                                        r = n.getSameStartPosXCells(t)[0],
                                        s = U(i).x,
                                        l = (o ? domUtils.getXY(o).x : domUtils.getXY(n.table).x) + 20,
                                        d = r ? domUtils.getXY(r).x + r.offsetWidth - 20 : e.body.offsetWidth + 5 || parseInt(domUtils.getComputedStyle(e.body, "width"), 10);
                                    return d -= 5,
                                        s < (l += 5) ? l : s > d ? d : s
                                }
                            }(b, t) + "px" : "v" == m && (g.style.top = function (e, t) {
                                try {
                                    var i = domUtils.getXY(e).y,
                                        n = U(t).y;
                                    return n < i ? i : n
                                } catch (o) { }
                            }(b, t) + "px"));
                        if (s) {
                            if (!0 === e.fireEvent("excludetable", s)) return;
                            var l = B(s, r = U(t)),
                                d = domUtils.findParentByTagName(s, "table", !0);
                            if (S(d, s, t, !0)) {
                                if (!0 === e.fireEvent("excludetable", d)) return;
                                e.body.style.cursor = "url(" + e.options.cursorpath + "h.png),pointer"
                            } else if (S(d, s, t)) {
                                if (!0 === e.fireEvent("excludetable", d)) return;
                                e.body.style.cursor = "url(" + e.options.cursorpath + "v.png),pointer"
                            } else {
                                e.body.style.cursor = "text";
                                /\d/.test(l) && (l = l.replace(/\d/, ""), s = a(s).getPreviewCell(s, "v" == l)),
                                    k(e, !!s && !!l, s ? l : "", r, s)
                            }
                        } else T(!1, d, e)
                    } catch (c) { }
                }
                function T(e, t, i) {
                    if (e) !
                        function (e, t) {
                            var i, n = domUtils.getXY(e),
                                o = e.ownerDocument;
                            if (h && h.parentNode) return h; (h = o.createElement("div")).contentEditable = !1,
                                h.innerHTML = "",
                                h.style.cssText = "width:15px;height:15px;background-image:url(" + t.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (n.y - 15) + "px;left:" + n.x + "px;",
                                domUtils.unSelectable(h),
                                h.onmouseover = function (e) {
                                    p = !0
                                },
                                h.onmouseout = function (e) {
                                    p = !1
                                },
                                domUtils.on(h, "click", (function (n, o) {
                                    var r;
                                    r = this,
                                        clearTimeout(i),
                                        i = setTimeout((function () {
                                            t.fireEvent("tableClicked", e, r)
                                        }), 300)
                                })),
                                domUtils.on(h, "dblclick", (function (n, o) {
                                    !
                                    function (n) {
                                        clearTimeout(i);
                                        var o = a(e),
                                            r = e.rows[0].cells[0],
                                            s = o.getLastCell(),
                                            l = o.getCellsRange(r, s);
                                        t.selection.getRange().setStart(r, 0).setCursor(!1, !0),
                                            o.setSelected(l)
                                    }()
                                })),
                                domUtils.on(h, "dragstart", (function (e, t) {
                                    domUtils.preventDefault(t)
                                })),
                                o.body.appendChild(h)
                        }(t, i);
                    else {
                        if (p) return;
                        setTimeout((function () {
                            !p && h && h.parentNode && h.parentNode.removeChild(h)
                        }), 2e3)
                    }
                }
                function S(e, t, i, n) {
                    var o = U(i),
                        r = B(t, o);
                    if (n) {
                        var a = e.getElementsByTagName("caption")[0],
                            s = a ? a.offsetHeight : 0;
                        return "v1" == r && o.y - domUtils.getXY(e).y - s < 8
                    }
                    return "h1" == r && o.x - domUtils.getXY(e).x < 8
                }
                function k(e, t, i, n, o) {
                    try {
                        e.body.style.cursor = "h" == i ? "col-resize" : "v" == i ? "row-resize" : "text",
                            browser.ie && (!i || v || s(e) ? V(e) : (q(e, e.document), z(i, o))),
                            f = t
                    } catch (r) { }
                }
                function B(e, t) {
                    var i = domUtils.getXY(e);
                    return i ? i.x + e.offsetWidth - t.x < 5 ? "h" : t.x - i.x < 5 ? "h1" : i.y + e.offsetHeight - t.y < 5 ? "v" : t.y - i.y < 5 ? "v1" : "" : ""
                }
                function A(t, i) {
                    if (!P()) if (o = {
                        x: i.clientX,
                        y: i.clientY
                    },
                        2 == i.button) {
                        var n = s(e),
                            r = !1;
                        if (n) {
                            var a = j(e, i);
                            utils.each(n.selectedTds, (function (e) {
                                e === a && (r = !0)
                            })),
                                r ? (a = n.selectedTds[0], setTimeout((function () {
                                    e.selection.getRange().setStart(a, 0).setCursor(!1, !0)
                                }), 0)) : (d(domUtils.getElementsByTagName(e.body, "th td")), n.clearSelected())
                        }
                    } else _(i)
                }
                function I(t) {
                    n = 0;
                    var i, o = x((t = t || e.window.event).target || t.srcElement);
                    if (o && (i = B(o, U(t)))) {
                        if (V(e), "h1" == i) if (i = "h", S(domUtils.findParentByTagName(o, "table"), o, t)) e.execCommand("adaptbywindow");
                        else if (o = a(o).getPreviewCell(o)) e.selection.getRange().selectNodeContents(o).setCursor(!0, !0);
                        if ("h" == i) {
                            var r = a(o),
                                s = H(o, r.table, !0);
                            s = function (e, t) {
                                for (var i = [], n = null, o = 0, r = e.length; o < r; o++)(n = e[o][t]) && i.push(n);
                                return i
                            }(s, "left"),
                                r.width = r.offsetWidth;
                            var l = [],
                                d = [];
                            utils.each(s, (function (e) {
                                l.push(e.offsetWidth)
                            })),
                                utils.each(s, (function (e) {
                                    e.removeAttribute("width")
                                })),
                                window.setTimeout((function () {
                                    var e = !0;
                                    utils.each(s, (function (t, i) {
                                        var n = t.offsetWidth;
                                        if (n > l[i]) return e = !1,
                                            !1;
                                        d.push(n)
                                    }));
                                    var t = e ? d : l;
                                    utils.each(s, (function (e, i) {
                                        e.width = t[i] - $()
                                    }))
                                }), 0)
                        }
                    }
                }
                function _(n) {
                    if (d(domUtils.getElementsByTagName(e.body, "td th")), utils.each(e.document.getElementsByTagName("table"), (function (e) {
                        e.ueTable = null
                    })), c = j(e, n)) {
                        var o = domUtils.findParentByTagName(c, "table", !0);
                        ut = a(o),
                            ut && ut.clearSelected(),
                            f ?
                                function (e) {
                                    browser.ie && (e = function (e) {
                                        var t = ["pageX", "pageY", "clientX", "clientY", "srcElement", "target"],
                                            i = {};
                                        if (e) for (var n, o, r = 0; n = t[r]; r++)(o = e[n]) && (i[n] = o);
                                        return i
                                    }(e));
                                    R(),
                                        i = !0,
                                        t = setTimeout((function () {
                                            L(e)
                                        }), 360)
                                }(n) : (e.document.body.style.webkitUserSelect = "", v = !0, e.addListener("mouseover", D))
                    }
                }
                function R() {
                    t && clearTimeout(t),
                        t = null
                }
                function L(t) {
                    if (i = !1, c = t.target || t.srcElement) {
                        var n = B(c, U(t));
                        /\d/.test(n) && (n = n.replace(/\d/, ""), c = a(c).getPreviewCell(c, "v" == n)),
                            V(e),
                            q(e, e.document),
                            e.fireEvent("saveScene"),
                            z(n, c),
                            v = !0,
                            m = n,
                            b = c
                    }
                }
                function O(e, t) {
                    if (!P()) {
                        if (R(), i = !1, f && (n = ++n % 3, o = {
                            x: t.clientX,
                            y: t.clientY
                        },
                            setTimeout((function () {
                                n > 0 && n--
                            }), 360), 2 === n)) return n = 0,
                                void I(t);
                        if (2 != t.button) {
                            var r = this,
                                s = r.selection.getRange(),
                                l = domUtils.findParentByTagName(s.startContainer, "table", !0),
                                d = domUtils.findParentByTagName(s.endContainer, "table", !0);
                            if ((l || d) && (l === d ? (l = domUtils.findParentByTagName(s.startContainer, ["td", "th", "caption"], !0)) !== (d = domUtils.findParentByTagName(s.endContainer, ["td", "th", "caption"], !0)) && r.selection.clearRange() : r.selection.clearRange()), v = !1, r.document.body.style.webkitUserSelect = "", m && b && (r.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), n = 0, g = r.document.getElementById("ue_tableDragLine"))) {
                                var u = domUtils.getXY(b),
                                    h = domUtils.getXY(g);
                                switch (m) {
                                    case "h":
                                        !
                                            function (e, t) {
                                                var i = a(e);
                                                if (i) {
                                                    var n = i.table,
                                                        o = H(e, n);
                                                    if (n.style.width = "", n.removeAttribute("width"), t = function (e, t, i) {
                                                        if ((e -= $()) < 0) return 0;
                                                        var n = (e -= F(t)) < 0 ? "left" : "right";
                                                        return e = Math.abs(e),
                                                            utils.each(i, (function (t) {
                                                                var i = t[n];
                                                                i && (e = Math.min(e, F(i) - 5))
                                                            })),
                                                            e = e < 0 ? 0 : e,
                                                            "left" === n ? -e : e
                                                    }(t, e, o), e.nextSibling) {
                                                        utils.each(o, (function (e) {
                                                            e.left.width = +e.left.width + t,
                                                                e.right && (e.right.width = +e.right.width - t)
                                                        }))
                                                    } else utils.each(o, (function (e) {
                                                        e.left.width -= -t
                                                    }))
                                                }
                                            }(b, h.x - u.x);
                                        break;
                                    case "v":
                                        !
                                            function (e, t) {
                                                if (Math.abs(t) < 10) return;
                                                var i = a(e);
                                                if (i) for (var n, o = i.getSameEndPosCells(e, "y"), r = o[0] ? o[0].offsetHeight : 0, s = 0; n = o[s++];) M(n, t, r)
                                            }(b, h.y - u.y - b.offsetHeight)
                                }
                                return m = "",
                                    b = null,
                                    V(r),
                                    void r.fireEvent("saveScene")
                            }
                            if (c) {
                                var p = a(c),
                                    y = p ? p.selectedTds[0] : null;
                                if (y) s = new dom.Range(r.document),
                                    domUtils.isEmptyBlock(y) ? s.setStart(y, 0).setCursor(!1, !0) : s.selectNodeContents(y).shrinkBoundary().setCursor(!1, !0);
                                else if (!(s = r.selection.getRange().shrinkBoundary()).collapsed) {
                                    l = domUtils.findParentByTagName(s.startContainer, ["td", "th"], !0),
                                        d = domUtils.findParentByTagName(s.endContainer, ["td", "th"], !0); (l && !d || !l && d || l && d && l !== d) && s.setCursor(!1, !0)
                                }
                                c = null,
                                    r.removeListener("mouseover", D)
                            } else {
                                var C = domUtils.findParentByTagName(t.target || t.srcElement, "td", !0);
                                if (C || (C = domUtils.findParentByTagName(t.target || t.srcElement, "th", !0)), C && ("TD" == C.tagName || "TH" == C.tagName)) {
                                    if (!0 === r.fireEvent("excludetable", C)) return; (s = new dom.Range(r.document)).setStart(C, 0).setCursor(!1, !0)
                                }
                            }
                            r._selectionChange(250, t)
                        }
                    }
                }
                function D(e, t) {
                    if (!P()) {
                        var i = t.target || t.srcElement;
                        if (u = domUtils.findParentByTagName(i, "td", !0) || domUtils.findParentByTagName(i, "th", !0), c && u && ("TD" == c.tagName && "TD" == u.tagName || "TH" == c.tagName && "TH" == u.tagName) && domUtils.findParentByTagName(c, "table") == domUtils.findParentByTagName(u, "table")) {
                            var n = a(u);
                            if (c != u) {
                                this.document.body.style.webkitUserSelect = "none",
                                    this.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"]();
                                var o = n.getCellsRange(c, u);
                                n.setSelected(o)
                            } else this.document.body.style.webkitUserSelect = "",
                                n.clearSelected()
                        }
                        t.preventDefault ? t.preventDefault() : t.returnValue = !1
                    }
                }
                function M(e, t, i) {
                    var n = parseInt(domUtils.getComputedStyle(e, "line-height"), 10),
                        o = i + t;
                    t = o < n ? n : o,
                        e.style.height && (e.style.height = ""),
                        1 == e.rowSpan ? e.setAttribute("height", t) : e.removeAttribute && e.removeAttribute("height")
                }
                function P() {
                    return "false" === e.body.contentEditable
                }
                function H(e, t, i) {
                    if (t || (t = domUtils.findParentByTagName(e, "table")), !t) return null;
                    domUtils.getNodeIndex(e);
                    for (var n = e,
                        o = t.rows,
                        r = 0; n;) 1 === n.nodeType && (r += n.colSpan || 1),
                            n = n.previousSibling;
                    n = null;
                    var a = [];
                    return utils.each(o, (function (e) {
                        var t = e.cells,
                            n = 0;
                        utils.each(t, (function (e) {
                            return (n += e.colSpan || 1) === r ? (a.push({
                                left: e,
                                right: e.nextSibling || null
                            }), !1) : n > r ? (i && a.push({
                                left: e
                            }), !1) : void 0
                        }))
                    })),
                        a
                }
                function F(e) {
                    var t = 0;
                    t = e.offsetWidth - $();
                    e.nextSibling || (t -=
                        function (e) {
                            if (tab = domUtils.findParentByTagName(e, "table", !1), void 0 === tab.offsetVal) {
                                var t = e.previousSibling;
                                tab.offsetVal = t && e.offsetWidth - t.offsetWidth === r.borderWidth ? r.borderWidth : 0
                            }
                            return tab.offsetVal
                        }(e)),
                        t = t < 0 ? 0 : t;
                    try {
                        e.width = t
                    } catch (i) { }
                    return t
                }
                function $() {
                    if (void 0 === r.tabcellSpace) {
                        var t = e.document.createElement("table"),
                            i = e.document.createElement("tbody"),
                            n = e.document.createElement("tr"),
                            o = e.document.createElement("td"),
                            a = null;
                        o.style.cssText = "border: 0;",
                            o.width = 1,
                            n.appendChild(o),
                            n.appendChild(a = o.cloneNode(!1)),
                            i.appendChild(n),
                            t.appendChild(i),
                            t.style.cssText = "visibility: hidden;",
                            e.body.appendChild(t),
                            r.paddingSpace = o.offsetWidth - 1;
                        var s = t.offsetWidth;
                        o.style.cssText = "",
                            a.style.cssText = "",
                            r.borderWidth = (t.offsetWidth - s) / 3,
                            r.tabcellSpace = r.paddingSpace + r.borderWidth,
                            e.body.removeChild(t)
                    }
                    return $ = function () {
                        return r.tabcellSpace
                    },
                        r.tabcellSpace
                }
                function q(e, t) {
                    v || (g = e.document.createElement("div"), domUtils.setAttributes(g, {
                        id: "ue_tableDragLine",
                        unselectable: "on",
                        contenteditable: !1,
                        onresizestart: "return false",
                        ondragstart: "return false",
                        onselectstart: "return false",
                        style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
                    }), e.body.appendChild(g))
                }
                function V(e) {
                    if (!v) for (var t; t = e.document.getElementById("ue_tableDragLine");) domUtils.remove(t)
                }
                function z(e, t) {
                    if (t) {
                        var i, n = domUtils.findParentByTagName(t, "table"),
                            o = n.getElementsByTagName("caption"),
                            r = n.offsetWidth,
                            a = n.offsetHeight - (o.length > 0 ? o[0].offsetHeight : 0),
                            s = domUtils.getXY(n),
                            l = domUtils.getXY(t);
                        switch (e) {
                            case "h":
                                i = "height:" + a + "px;top:" + (s.y + (o.length > 0 ? o[0].offsetHeight : 0)) + "px;left:" + (l.x + t.offsetWidth),
                                    g.style.cssText = i + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
                                break;
                            case "v":
                                i = "width:" + r + "px;left:" + s.x + "px;top:" + (l.y + t.offsetHeight),
                                    g.style.cssText = i + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
                        }
                    }
                }
                function W(e, t) {
                    for (var i, n, o = domUtils.getElementsByTagName(e.body, "table"), r = 0; n = o[r++];) {
                        var a = domUtils.getElementsByTagName(n, "td");
                        a[0] && (t ? (i = a[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/gi.test(i) && domUtils.addClass(n, "noBorderTable")) : domUtils.removeClasses(n, "noBorderTable"))
                    }
                }
                function j(e, t) {
                    var i, n = domUtils.findParentByTagName(t.target || t.srcElement, ["td", "th"], !0);
                    if (!n) return null;
                    if (i = B(n, U(t)), !n) return null;
                    if ("h1" === i && n.previousSibling) {
                        var o = domUtils.getXY(n),
                            r = n.offsetWidth;
                        Math.abs(o.x + r - t.clientX) > r / 3 && (n = n.previousSibling)
                    } else if ("v1" === i && n.parentNode.previousSibling) {
                        o = domUtils.getXY(n);
                        var a = n.offsetHeight;
                        Math.abs(o.y + a - t.clientY) > a / 3 && (n = n.parentNode.previousSibling.firstChild)
                    }
                    return n && !0 !== e.fireEvent("excludetable", n) ? n : null
                }
                e.ready((function () {
                    var t, i, n, o;
                    utils.cssRule("table", ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}", e.document),
                        e.addListener("keydown", (function (e, o) {
                            var r = this,
                                a = o.keyCode || o.which;
                            if (8 == a) {
                                var l; (l = s(r)) && l.selectedTds.length && (l.isFullCol() ? r.execCommand("deletecol") : l.isFullRow() ? r.execCommand("deleterow") : r.fireEvent("delcells"), domUtils.preventDefault(o));
                                var d = domUtils.findParentByTagName(r.selection.getStart(), "caption", !0),
                                    c = r.selection.getRange();
                                if (c.collapsed && d && w(d)) {
                                    r.fireEvent("saveScene");
                                    var u = d.parentNode;
                                    domUtils.remove(d),
                                        u && c.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0),
                                        r.fireEvent("saveScene")
                                }
                            }
                            if (46 == a && (l = s(r))) {
                                r.fireEvent("saveScene");
                                for (var m = 0; y = l.selectedTds[m++];) domUtils.fillNode(r.document, y);
                                r.fireEvent("saveScene"),
                                    domUtils.preventDefault(o)
                            }
                            if (13 == a) {
                                var f = r.selection.getRange();
                                if (d = domUtils.findParentByTagName(f.startContainer, "caption", !0)) {
                                    var u = domUtils.findParentByTagName(d, "table");
                                    return f.collapsed ? d && f.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0) : (f.deleteContents(), r.fireEvent("saveScene")),
                                        void domUtils.preventDefault(o)
                                }
                                if (f.collapsed) if (u = domUtils.findParentByTagName(f.startContainer, "table")) {
                                    var h = u.rows[0].cells[0],
                                        p = domUtils.findParentByTagName(r.selection.getStart(), ["td", "th"], !0),
                                        g = u.previousSibling;
                                    if (h === p && (!g || 1 == g.nodeType && "TABLE" == g.tagName) && domUtils.isStartInblock(f)) {
                                        var b = domUtils.findParent(r.selection.getStart(), (function (e) {
                                            return domUtils.isBlockElm(e)
                                        }), !0);
                                        b && (/t(h|d)/i.test(b.tagName) || b === p.firstChild) && (r.execCommand("insertparagraphbeforetable"), domUtils.preventDefault(o))
                                    }
                                }
                            }
                            if ((o.ctrlKey || o.metaKey) && "67" == o.keyCode && (t = null, l = s(r))) {
                                var v = l.selectedTds;
                                i = l.isFullCol(),
                                    n = l.isFullRow(),
                                    t = [[l.cloneCell(v[0], null, !0)]];
                                var y;
                                for (m = 1; y = v[m]; m++) y.parentNode !== v[m - 1].parentNode ? t.push([l.cloneCell(y, null, !0)]) : t[t.length - 1].push(l.cloneCell(y, null, !0))
                            }
                        })),
                        e.addListener("tablehasdeleted", (function () {
                            k(this, !1, "", null),
                                h && domUtils.remove(h)
                        })),
                        e.addListener("beforepaste", (function (e, o) {
                            var d = this,
                                c = d.selection.getRange();
                            if (domUtils.findParentByTagName(c.startContainer, "caption", !0)) return (u = d.document.createElement("div")).innerHTML = o.html,
                                void (o.html = u[browser.ie9below ? "innerText" : "textContent"]);
                            var u, m, f = s(d);
                            if (t) {
                                d.fireEvent("saveScene");
                                c = d.selection.getRange();
                                var h, p, g = domUtils.findParentByTagName(c.startContainer, ["td", "th"], !0);
                                if (g) {
                                    var b = a(g);
                                    if (n) {
                                        var v = b.getCellInfo(g).rowIndex;
                                        "TH" == g.tagName && v++;
                                        for (var y = 0; T = t[y++];) {
                                            for (var N = b.insertRow(v++, "td"), x = 0; B = T[x]; x++) {
                                                var U = N.cells[x];
                                                U || (U = N.insertCell(x)),
                                                    U.innerHTML = B.innerHTML,
                                                    B.getAttribute("width") && U.setAttribute("width", B.getAttribute("width")),
                                                    B.getAttribute("vAlign") && U.setAttribute("vAlign", B.getAttribute("vAlign")),
                                                    B.getAttribute("align") && U.setAttribute("align", B.getAttribute("align")),
                                                    B.style.cssText && (U.style.cssText = B.style.cssText)
                                            }
                                            for (x = 0; (B = N.cells[x]) && T[x]; x++) B.innerHTML = T[x].innerHTML,
                                                T[x].getAttribute("width") && B.setAttribute("width", T[x].getAttribute("width")),
                                                T[x].getAttribute("vAlign") && B.setAttribute("vAlign", T[x].getAttribute("vAlign")),
                                                T[x].getAttribute("align") && B.setAttribute("align", T[x].getAttribute("align")),
                                                T[x].style.cssText && (B.style.cssText = T[x].style.cssText)
                                        }
                                    } else {
                                        if (i) {
                                            k = b.getCellInfo(g);
                                            for (var E = 0,
                                                T = (x = 0, t[0]); B = T[x++];) E += B.colSpan || 1;
                                            for (d.__hasEnterExecCommand = !0, y = 0; y < E; y++) d.execCommand("insertcol");
                                            d.__hasEnterExecCommand = !1,
                                                "TH" == (g = b.table.rows[0].cells[k.cellIndex]).tagName && (g = b.table.rows[1].cells[k.cellIndex])
                                        }
                                        for (y = 0; T = t[y++];) {
                                            h = g;
                                            for (x = 0; B = T[x++];) if (g) g.innerHTML = B.innerHTML,
                                                B.getAttribute("width") && g.setAttribute("width", B.getAttribute("width")),
                                                B.getAttribute("vAlign") && g.setAttribute("vAlign", B.getAttribute("vAlign")),
                                                B.getAttribute("align") && g.setAttribute("align", B.getAttribute("align")),
                                                B.style.cssText && (g.style.cssText = B.style.cssText),
                                                p = g,
                                                g = g.nextSibling;
                                            else {
                                                var S = B.cloneNode(!0);
                                                domUtils.removeAttributes(S, ["class", "rowSpan", "colSpan"]),
                                                    p.parentNode.appendChild(S)
                                            }
                                            if (g = b.getNextCell(h, !0, !0), !t[y]) break;
                                            if (!g) {
                                                var k = b.getCellInfo(h);
                                                b.table.insertRow(b.table.rows.length),
                                                    b.update(),
                                                    g = b.getVSideCell(h, !0)
                                            }
                                        }
                                    }
                                    b.update()
                                } else {
                                    f = d.document.createElement("table");
                                    for (y = 0; T = t[y++];) {
                                        var B;
                                        for (N = f.insertRow(f.rows.length), x = 0; B = T[x++];) S = r.cloneCell(B, null, !0),
                                            domUtils.removeAttributes(S, ["class"]),
                                            N.appendChild(S);
                                        2 == x && S.rowSpan > 1 && (S.rowSpan = 1)
                                    }
                                    var A = l(d),
                                        I = d.body.offsetWidth - 2 * parseInt(domUtils.getComputedStyle(d.body, "margin-left"), 10) - 2 * A.tableBorder - (d.options.offsetWidth || 0);
                                    d.execCommand("insertHTML", "<table  " + (i && n ? 'width="' + I + '"' : "") + ">" + f.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
                                }
                                return d.fireEvent("contentchange"),
                                    d.fireEvent("saveScene"),
                                    o.html = "",
                                    !0
                            } (u = d.document.createElement("div")).innerHTML = o.html,
                                m = u.getElementsByTagName("table"),
                                domUtils.findParentByTagName(d.selection.getStart(), "table") ? (utils.each(m, (function (e) {
                                    domUtils.remove(e)
                                })), domUtils.findParentByTagName(d.selection.getStart(), "caption", !0) && (u.innerHTML = u[browser.ie ? "innerText" : "textContent"])) : utils.each(m, (function (e) {
                                    C(e, !0),
                                        domUtils.removeAttributes(e, ["style", "border"]),
                                        utils.each(domUtils.getElementsByTagName(e, "td"), (function (e) {
                                            w(e) && domUtils.fillNode(d.document, e),
                                                C(e, !0)
                                        }))
                                })),
                                o.html = u.innerHTML
                        })),
                        e.addListener("afterpaste", (function () {
                            utils.each(domUtils.getElementsByTagName(e.body, "table"), (function (t) {
                                if (t.offsetWidth > e.body.offsetWidth) {
                                    var i = l(e, t);
                                    t.style.width = e.body.offsetWidth - 2 * parseInt(domUtils.getComputedStyle(e.body, "margin-left"), 10) - 2 * i.tableBorder - (e.options.offsetWidth || 0) + "px"
                                }
                            }))
                        })),
                        e.addListener("blur", (function () {
                            t = null
                        })),
                        e.addListener("keydown", (function () {
                            clearTimeout(o),
                                o = setTimeout((function () {
                                    var t = e.selection.getRange(),
                                        i = domUtils.findParentByTagName(t.startContainer, ["th", "td"], !0);
                                    if (i) {
                                        var n = i.parentNode.parentNode.parentNode;
                                        n.offsetWidth > n.getAttribute("width") && (i.style.wordBreak = "break-all")
                                    }
                                }), 100)
                        })),
                        e.addListener("selectionchange", (function () {
                            k(e, !1, "", null)
                        })),
                        e.addListener("contentchange", (function () {
                            var e = this;
                            if (V(e), !s(e)) {
                                var t = e.selection.getRange().startContainer;
                                t = domUtils.findParentByTagName(t, ["td", "th"], !0),
                                    utils.each(domUtils.getElementsByTagName(e.document, "table"), (function (t) {
                                        !0 !== e.fireEvent("excludetable", t) && (t.ueTable = new r(t), t.onmouseover = function () {
                                            e.fireEvent("tablemouseover", t)
                                        },
                                            t.onmousemove = function () {
                                                e.fireEvent("tablemousemove", t),
                                                    e.options.tableDragable && T(!0, this, e),
                                                    utils.defer((function () {
                                                        e.fireEvent("contentchange", 50)
                                                    }), !0)
                                            },
                                            t.onmouseout = function () {
                                                e.fireEvent("tablemouseout", t),
                                                    k(e, !1, "", null),
                                                    V(e)
                                            },
                                            t.onclick = function (t) {
                                                var i = x((t = e.window.event || t).target || t.srcElement);
                                                if (i) {
                                                    var n, o = a(i),
                                                        r = o.table,
                                                        s = o.getCellInfo(i),
                                                        l = e.selection.getRange();
                                                    if (S(r, i, t, !0)) {
                                                        var d = o.getCell(o.indexTable[o.rowsNum - 1][s.colIndex].rowIndex, o.indexTable[o.rowsNum - 1][s.colIndex].cellIndex);
                                                        t.shiftKey && o.selectedTds.length ? o.selectedTds[0] !== d ? (n = o.getCellsRange(o.selectedTds[0], d), o.setSelected(n)) : l && l.selectNodeContents(d).select() : i !== d ? (n = o.getCellsRange(i, d), o.setSelected(n)) : l && l.selectNodeContents(d).select()
                                                    } else if (S(r, i, t)) {
                                                        var c = o.getCell(o.indexTable[s.rowIndex][o.colsNum - 1].rowIndex, o.indexTable[s.rowIndex][o.colsNum - 1].cellIndex);
                                                        t.shiftKey && o.selectedTds.length ? o.selectedTds[0] !== c ? (n = o.getCellsRange(o.selectedTds[0], c), o.setSelected(n)) : l && l.selectNodeContents(c).select() : i !== c ? (n = o.getCellsRange(i, c), o.setSelected(n)) : l && l.selectNodeContents(c).select()
                                                    }
                                                }
                                            })
                                    })),
                                    W(e, !0)
                            }
                        })),
                        domUtils.on(e.document, "mousemove", E),
                        domUtils.on(e.document, "mouseout", (function (t) {
                            "TABLE" == (t.target || t.srcElement).tagName && k(e, !1, "", null)
                        })),
                        e.addListener("interlacetable", (function (e, t, i) {
                            if (t) for (var n, o, r, a = t.rows,
                                s = a.length,
                                l = 0; l < s; l++) a[l].className = (n = i || this.options.classList, r = !0, n[o = l] ? n[o] : r ? n[o % n.length] : "")
                        })),
                        e.addListener("uninterlacetable", (function (e, t) {
                            if (t) for (var i = t.rows,
                                n = this.options.classList,
                                o = i.length,
                                r = 0; r < o; r++) domUtils.removeClasses(i[r], n)
                        })),
                        e.addListener("mousedown", A),
                        e.addListener("mouseup", O),
                        domUtils.on(e.body, "dragstart", (function (t) {
                            O.call(e, "dragstart", t)
                        })),
                        e.addOutputRule((function (e) {
                            utils.each(e.getNodesByTagName("div"), (function (e) {
                                "ue_tableDragLine" == e.getAttr("id") && e.parentNode.removeChild(e)
                            }))
                        }));
                    var c = 0;
                    e.addListener("mousedown", (function () {
                        c = 0
                    })),
                        e.addListener("tabkeydown", (function () {
                            var t = this.selection.getRange(),
                                i = t.getCommonAncestor(!0, !0),
                                n = domUtils.findParentByTagName(i, "table");
                            if (n) {
                                if (domUtils.findParentByTagName(i, "caption", !0)) {
                                    (o = domUtils.getElementsByTagName(n, "th td")) && o.length && t.setStart(o[0], 0).setCursor(!1, !0)
                                } else {
                                    var o = domUtils.findParentByTagName(i, ["td", "th"], !0),
                                        r = a(o);
                                    c = o.rowSpan > 1 ? c : r.getCellInfo(o).rowIndex;
                                    var s = r.getTabNextCell(o, c);
                                    s ? w(s) ? t.setStart(s, 0).setCursor(!1, !0) : t.selectNodeContents(s).select() : (e.fireEvent("saveScene"), e.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), e.__hasEnterExecCommand = !1, (t = this.selection.getRange()).setStart(n.rows[n.rows.length - 1].cells[0], 0).setCursor(), e.fireEvent("saveScene"))
                                }
                                return !0
                            }
                        })),
                        browser.ie && e.addListener("selectionchange", (function () {
                            k(this, !1, "", null)
                        })),
                        e.addListener("keydown", (function (e, t) {
                            var i = t.keyCode || t.which;
                            if (8 != i && 46 != i) {
                                var n = !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey);
                                n && d(domUtils.getElementsByTagName(this.body, "td"));
                                var o = s(this);
                                o && n && o.clearSelected()
                            }
                        })),
                        e.addListener("beforegetcontent", (function () {
                            W(this, !1),
                                browser.ie && utils.each(this.document.getElementsByTagName("caption"), (function (e) {
                                    domUtils.isEmptyNode(e) && (e.innerHTML = "&nbsp;")
                                }))
                        })),
                        e.addListener("aftergetcontent", (function () {
                            W(this, !0)
                        })),
                        e.addListener("getAllHtml", (function () {
                            d(e.document.getElementsByTagName("td"))
                        })),
                        e.addListener("fullscreenchanged", (function (t, i) {
                            if (!i) {
                                var n = this.body.offsetWidth / document.body.offsetWidth,
                                    o = domUtils.getElementsByTagName(this.body, "table");
                                utils.each(o, (function (t) {
                                    if (t.offsetWidth < e.body.offsetWidth) return !1;
                                    var i = domUtils.getElementsByTagName(t, "td"),
                                        o = [];
                                    utils.each(i, (function (e) {
                                        o.push(e.offsetWidth)
                                    }));
                                    for (var r, a = 0; r = i[a]; a++) r.setAttribute("width", Math.floor(o[a] * n));
                                    t.setAttribute("width", Math.floor(function (e, t, i) {
                                        var n = e.body;
                                        return n.offsetWidth - (t ? 2 * parseInt(domUtils.getComputedStyle(n, "margin-left"), 10) : 0) - 2 * i.tableBorder - (e.options.offsetWidth || 0)
                                    }(e, !0, l(e))))
                                }))
                            }
                        }));
                    var u = e.execCommand;
                    e.execCommand = function (e, t) {
                        var i = this;
                        e = e.toLowerCase();
                        var n, o, r = s(i),
                            a = new dom.Range(i.document),
                            l = i.commands[e] || UE.commands[e];
                        if (l) {
                            if (!r || y[e] || l.notNeedUndo || i.__hasEnterExecCommand) o = u.apply(i, arguments);
                            else {
                                i.__hasEnterExecCommand = !0,
                                    i.fireEvent("beforeexeccommand", e),
                                    n = r.selectedTds;
                                for (var d, c, m, f = -2,
                                    h = -2,
                                    p = 0; m = n[p]; p++) w(m) ? a.setStart(m, 0).setCursor(!1, !0) : a.selectNode(m).select(!0),
                                        c = i.queryCommandState(e),
                                        d = i.queryCommandValue(e),
                                        -1 != c && (f === c && h === d || (i._ignoreContentChange = !0, o = u.apply(i, arguments), i._ignoreContentChange = !1), f = i.queryCommandState(e), h = i.queryCommandValue(e), domUtils.isEmptyBlock(m) && domUtils.fillNode(i.document, m));
                                a.setStart(n[0], 0).shrinkBoundary(!0).setCursor(!1, !0),
                                    i.fireEvent("contentchange"),
                                    i.fireEvent("afterexeccommand", e),
                                    i.__hasEnterExecCommand = !1,
                                    i._selectionChange()
                            }
                            return o
                        }
                    }
                }))
            },
            UE.UETable.prototype.sortTable = function (e, t) {
                var i = this.table,
                    n = i.rows,
                    o = [],
                    r = "TH" === n[0].cells[0].tagName,
                    a = 0;
                if (this.selectedTds.length) {
                    for (var s = this.cellsRange,
                        l = s.endRowIndex + 1,
                        d = s.beginRowIndex; d < l; d++) o[d] = n[d];
                    o.splice(0, s.beginRowIndex),
                        a = s.endRowIndex + 1 === this.rowsNum ? 0 : s.endRowIndex + 1
                } else for (d = 0, l = n.length; d < l; d++) o[d] = n[d];
                var c = {
                    reversecurrent: function (e, t) {
                        return 1
                    },
                    orderbyasc: function (e, t) {
                        var i = e.innerText || e.textContent,
                            n = t.innerText || t.textContent;
                        return i.localeCompare(n)
                    },
                    reversebyasc: function (e, t) {
                        var i = e.innerHTML;
                        return t.innerHTML.localeCompare(i)
                    },
                    orderbynum: function (e, t) {
                        var i = e[browser.ie ? "innerText" : "textContent"].match(/\d+/),
                            n = t[browser.ie ? "innerText" : "textContent"].match(/\d+/);
                        return i && (i = +i[0]),
                            n && (n = +n[0]),
                            (i || 0) - (n || 0)
                    },
                    reversebynum: function (e, t) {
                        var i = e[browser.ie ? "innerText" : "textContent"].match(/\d+/),
                            n = t[browser.ie ? "innerText" : "textContent"].match(/\d+/);
                        return i && (i = +i[0]),
                            n && (n = +n[0]),
                            (n || 0) - (i || 0)
                    }
                };
                i.setAttribute("data-sort-type", t && "string" == typeof t && c[t] ? t : ""),
                    r && o.splice(0, 1),
                    o = utils.sort(o, (function (i, n) {
                        return t && "function" == typeof t ? t.call(this, i.cells[e], n.cells[e]) : t && "number" == typeof t ? 1 : t && "string" == typeof t && c[t] ? c[t].call(this, i.cells[e], n.cells[e]) : c.orderbyasc.call(this, i.cells[e], n.cells[e])
                    }));
                var u = i.ownerDocument.createDocumentFragment(),
                    m = 0;
                for (l = o.length; m < l; m++) u.appendChild(o[m]);
                var f = i.getElementsByTagName("tbody")[0];
                a ? f.insertBefore(u, n[a - s.endRowIndex + s.beginRowIndex - 1]) : f.appendChild(u)
            },
            UE.plugins.tablesort = function () {
                var e = this,
                    t = UE.UETable,
                    i = function (e) {
                        return t.getTableItemsByRange(e)
                    };
                e.ready((function () {
                    utils.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" + e.options.themePath + e.options.theme + "/images/sortable.png);}", e.document),
                        e.addListener("afterexeccommand", (function (e, t) {
                            "mergeright" != t && "mergedown" != t && "mergecells" != t || this.execCommand("disablesort")
                        }))
                })),
                    UE.commands.sorttable = {
                        queryCommandState: function () {
                            var e = i(this);
                            if (!e.cell) return - 1;
                            for (var t, n = e.table.getElementsByTagName("td"), o = 0; t = n[o++];) if (1 != t.rowSpan || 1 != t.colSpan) return - 1;
                            return 0
                        },
                        execCommand: function (e, n) {
                            var o, r = this.selection.getRange(),
                                a = r.createBookmark(!0),
                                s = i(this),
                                l = s.cell,
                                d = (o = s.table, t.getUETable(o)),
                                c = d.getCellInfo(l);
                            d.sortTable(c.cellIndex, n),
                                r.moveToBookmark(a);
                            try {
                                r.select()
                            } catch (u) { }
                        }
                    },
                    UE.commands.enablesort = UE.commands.disablesort = {
                        queryCommandState: function (e) {
                            var t = i(this).table;
                            if (t && "enablesort" == e) for (var n = domUtils.getElementsByTagName(t, "th td"), o = 0; o < n.length; o++) if (n[o].getAttribute("colspan") > 1 || n[o].getAttribute("rowspan") > 1) return - 1;
                            return t ? "enablesort" == e ^ "sortEnabled" != t.getAttribute("data-sort") ? -1 : 0 : -1
                        },
                        execCommand: function (e) {
                            var t = i(this).table;
                            t.setAttribute("data-sort", "enablesort" == e ? "sortEnabled" : "sortDisabled"),
                                "enablesort" == e ? domUtils.addClass(t, "sortEnabled") : domUtils.removeClasses(t, "sortEnabled")
                        }
                    }
            },
            UE.plugins.contextmenu = function () {
                var e = this;
                if (e.setOpt("enableContextMenu", !0), !1 !== e.getOpt("enableContextMenu")) {
                    var t, i = e.getLang("contextMenu"),
                        n = e.options.contextMenu || [{
                            label: i.selectall,
                            cmdName: "selectall"
                        },
                        {
                            label: i.cleardoc,
                            cmdName: "cleardoc",
                            exec: function () {
                                confirm(i.confirmclear) && this.execCommand("cleardoc")
                            }
                        },
                            "-", {
                            label: i.unlink,
                            cmdName: "unlink"
                        },
                            "-", {
                            group: i.paragraph,
                            icon: "justifyjustify",
                            subMenu: [{
                                label: i.justifyleft,
                                cmdName: "justify",
                                value: "left",
                                className: "justifyleft"
                            },
                            {
                                label: i.justifyright,
                                cmdName: "justify",
                                value: "right",
                                className: "justifyright"
                            },
                            {
                                label: i.justifycenter,
                                cmdName: "justify",
                                value: "center",
                                className: "justifycenter"
                            },
                            {
                                label: i.justifyjustify,
                                cmdName: "justify",
                                value: "justify",
                                className: "justifyjustify"
                            }]
                        },
                            "-", {
                            group: i.table,
                            icon: "table",
                            subMenu: [{
                                label: i.inserttable,
                                cmdName: "inserttable"
                            },
                            {
                                label: i.deletetable,
                                cmdName: "deletetable"
                            },
                                "-", {
                                label: i.deleterow,
                                cmdName: "deleterow"
                            },
                            {
                                label: i.deletecol,
                                cmdName: "deletecol"
                            },
                            {
                                label: i.insertcol,
                                cmdName: "insertcol"
                            },
                            {
                                label: i.insertcolnext,
                                cmdName: "insertcolnext"
                            },
                            {
                                label: i.insertrow,
                                cmdName: "insertrow"
                            },
                            {
                                label: i.insertrownext,
                                cmdName: "insertrownext"
                            },
                                "-", {
                                label: i.insertcaption,
                                cmdName: "insertcaption"
                            },
                            {
                                label: i.deletecaption,
                                cmdName: "deletecaption"
                            },
                            {
                                label: i.inserttitle,
                                cmdName: "inserttitle"
                            },
                            {
                                label: i.deletetitle,
                                cmdName: "deletetitle"
                            },
                            {
                                label: i.inserttitlecol,
                                cmdName: "inserttitlecol"
                            },
                            {
                                label: i.deletetitlecol,
                                cmdName: "deletetitlecol"
                            },
                                "-", {
                                label: i.mergecells,
                                cmdName: "mergecells"
                            },
                            {
                                label: i.mergeright,
                                cmdName: "mergeright"
                            },
                            {
                                label: i.mergedown,
                                cmdName: "mergedown"
                            },
                                "-", {
                                label: i.splittorows,
                                cmdName: "splittorows"
                            },
                            {
                                label: i.splittocols,
                                cmdName: "splittocols"
                            },
                            {
                                label: i.splittocells,
                                cmdName: "splittocells"
                            },
                                "-", {
                                label: i.averageDiseRow,
                                cmdName: "averagedistributerow"
                            },
                            {
                                label: i.averageDisCol,
                                cmdName: "averagedistributecol"
                            },
                                "-", {
                                label: i.edittd,
                                cmdName: "edittd",
                                exec: function () {
                                    UE.ui.edittd && new UE.ui.edittd(this),
                                        this.getDialog("edittd").open()
                                }
                            },
                            {
                                label: i.edittable,
                                cmdName: "edittable",
                                exec: function () {
                                    UE.ui.edittable && new UE.ui.edittable(this),
                                        this.getDialog("edittable").open()
                                }
                            },
                            {
                                label: i.setbordervisible,
                                cmdName: "setbordervisible"
                            }]
                        },
                        {
                            group: i.tablesort,
                            icon: "tablesort",
                            subMenu: [{
                                label: i.enablesort,
                                cmdName: "enablesort"
                            },
                            {
                                label: i.disablesort,
                                cmdName: "disablesort"
                            },
                                "-", {
                                label: i.reversecurrent,
                                cmdName: "sorttable",
                                value: "reversecurrent"
                            },
                            {
                                label: i.orderbyasc,
                                cmdName: "sorttable",
                                value: "orderbyasc"
                            },
                            {
                                label: i.reversebyasc,
                                cmdName: "sorttable",
                                value: "reversebyasc"
                            },
                            {
                                label: i.orderbynum,
                                cmdName: "sorttable",
                                value: "orderbynum"
                            },
                            {
                                label: i.reversebynum,
                                cmdName: "sorttable",
                                value: "reversebynum"
                            }]
                        },
                        {
                            group: i.borderbk,
                            icon: "borderBack",
                            subMenu: [{
                                label: i.setcolor,
                                cmdName: "interlacetable",
                                exec: function () {
                                    this.execCommand("interlacetable")
                                }
                            },
                            {
                                label: i.unsetcolor,
                                cmdName: "uninterlacetable",
                                exec: function () {
                                    this.execCommand("uninterlacetable")
                                }
                            },
                            {
                                label: i.setbackground,
                                cmdName: "settablebackground",
                                exec: function () {
                                    this.execCommand("settablebackground", {
                                        repeat: !0,
                                        colorList: ["#bbb", "#ccc"]
                                    })
                                }
                            },
                            {
                                label: i.unsetbackground,
                                cmdName: "cleartablebackground",
                                exec: function () {
                                    this.execCommand("cleartablebackground")
                                }
                            },
                            {
                                label: i.redandblue,
                                cmdName: "settablebackground",
                                exec: function () {
                                    this.execCommand("settablebackground", {
                                        repeat: !0,
                                        colorList: ["red", "blue"]
                                    })
                                }
                            },
                            {
                                label: i.threecolorgradient,
                                cmdName: "settablebackground",
                                exec: function () {
                                    this.execCommand("settablebackground", {
                                        repeat: !0,
                                        colorList: ["#aaa", "#bbb", "#ccc"]
                                    })
                                }
                            }]
                        },
                        {
                            group: i.aligntd,
                            icon: "aligntd",
                            subMenu: [{
                                cmdName: "cellalignment",
                                value: {
                                    align: "left",
                                    vAlign: "top"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "center",
                                    vAlign: "top"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "right",
                                    vAlign: "top"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "left",
                                    vAlign: "middle"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "center",
                                    vAlign: "middle"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "right",
                                    vAlign: "middle"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "left",
                                    vAlign: "bottom"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "center",
                                    vAlign: "bottom"
                                }
                            },
                            {
                                cmdName: "cellalignment",
                                value: {
                                    align: "right",
                                    vAlign: "bottom"
                                }
                            }]
                        },
                        {
                            group: i.aligntable,
                            icon: "aligntable",
                            subMenu: [{
                                cmdName: "tablealignment",
                                className: "left",
                                label: i.tableleft,
                                value: "left"
                            },
                            {
                                cmdName: "tablealignment",
                                className: "center",
                                label: i.tablecenter,
                                value: "center"
                            },
                            {
                                cmdName: "tablealignment",
                                className: "right",
                                label: i.tableright,
                                value: "right"
                            }]
                        },
                            "-", {
                            label: i.copy,
                            cmdName: "copy"
                        },
                        {
                            label: i.paste,
                            cmdName: "paste"
                        }];
                    if (n.length) {
                        var o = UE.ui.uiUtils;
                        e.addListener("contextmenu", (function (r, a) {
                            var s = o.getViewportOffsetByEvent(a);
                            e.fireEvent("beforeselectionchange"),
                                t && t.destroy();
                            for (var l, d = 0,
                                c = []; l = n[d]; d++) {
                                var u; !
                                    function (t) {
                                        if ("-" == t) (u = c[c.length - 1]) && "-" !== u && c.push("-");
                                        else if (t.hasOwnProperty("group")) {
                                            for (var n, o = 0,
                                                r = []; n = t.subMenu[o]; o++) !
                                                    function (t) {
                                                        "-" == t ? (u = r[r.length - 1]) && "-" !== u ? r.push("-") : r.splice(r.length - 1) : (e.commands[t.cmdName] || UE.commands[t.cmdName] || t.query) && (t.query ? t.query() : e.queryCommandState(t.cmdName)) > -1 && r.push({
                                                            label: t.label || e.getLang("contextMenu." + t.cmdName + (t.value || "")) || "",
                                                            className: "edui-for-" + t.cmdName + (t.className ? " edui-for-" + t.cmdName + "-" + t.className : ""),
                                                            onclick: t.exec ?
                                                                function () {
                                                                    t.exec.call(e)
                                                                } : function () {
                                                                    e.execCommand(t.cmdName, t.value)
                                                                }
                                                        })
                                                    }(n);
                                            if (r.length) {
                                                c.push({
                                                    label: function () {
                                                        switch (t.icon) {
                                                            case "table":
                                                                return e.getLang("contextMenu.table");
                                                            case "justifyjustify":
                                                                return e.getLang("contextMenu.paragraph");
                                                            case "aligntd":
                                                                return e.getLang("contextMenu.aligntd");
                                                            case "aligntable":
                                                                return e.getLang("contextMenu.aligntable");
                                                            case "tablesort":
                                                                return i.tablesort;
                                                            case "borderBack":
                                                                return i.borderbk;
                                                            default:
                                                                return ""
                                                        }
                                                    }(),
                                                    className: "edui-for-" + t.icon,
                                                    subMenu: {
                                                        items: r,
                                                        editor: e
                                                    }
                                                })
                                            }
                                        } else (e.commands[t.cmdName] || UE.commands[t.cmdName] || t.query) && (t.query ? t.query.call(e) : e.queryCommandState(t.cmdName)) > -1 && c.push({
                                            label: t.label || e.getLang("contextMenu." + t.cmdName),
                                            className: "edui-for-" + (t.icon ? t.icon : t.cmdName + (t.value || "")),
                                            onclick: t.exec ?
                                                function () {
                                                    t.exec.call(e)
                                                } : function () {
                                                    e.execCommand(t.cmdName, t.value)
                                                }
                                        })
                                    }(l)
                            }
                            if ("-" == c[c.length - 1] && c.pop(), (t = new UE.ui.Menu({
                                items: c,
                                className: "edui-contextmenu",
                                editor: e
                            })).render(), t.showAt(s), e.fireEvent("aftershowcontextmenu", t), domUtils.preventDefault(a), browser.ie) {
                                var m;
                                try {
                                    m = e.selection.getNative().createRange()
                                } catch (f) {
                                    return
                                }
                                if (m.item) new dom.Range(e.document).selectNode(m.item(0)).select(!0, !0)
                            }
                        })),
                            e.addListener("aftershowcontextmenu", (function (t, i) {
                                if (e.zeroclipboard) {
                                    var n = i.items;
                                    for (var o in n) "edui-for-copy" == n[o].className && e.zeroclipboard.clip(n[o].getDom())
                                }
                            }))
                    }
                }
            },
            UE.plugins.shortcutmenu = function () {
                var e, t = this.options.shortcutMenu || [];
                t.length && (this.addListener("contextmenu mouseup", (function (i, n) {
                    var o = this,
                        r = {
                            type: i,
                            target: n.target || n.srcElement,
                            screenX: n.screenX,
                            screenY: n.screenY,
                            clientX: n.clientX,
                            clientY: n.clientY
                        };
                    if (setTimeout((function () {
                        !1 !== o.selection.getRange().collapsed && "contextmenu" != i || (e || ((e = new baidu.editor.ui.ShortCutMenu({
                            editor: o,
                            items: t,
                            theme: o.options.theme,
                            className: "edui-shortcutmenu"
                        })).render(), o.fireEvent("afterrendershortcutmenu", e)), e.show(r, !!UE.plugins.contextmenu))
                    })), "contextmenu" == i && (domUtils.preventDefault(n), browser.ie9below)) {
                        var a;
                        try {
                            a = o.selection.getNative().createRange()
                        } catch (n) {
                            return
                        }
                        if (a.item) new dom.Range(o.document).selectNode(a.item(0)).select(!0, !0)
                    }
                })), this.addListener("keydown", (function (t) {
                    "keydown" == t && e && !e.isHidden && e.hide()
                })))
            },
            UE.plugins.basestyle = function () {
                var e = {
                    bold: ["strong", "b"],
                    italic: ["em", "i"],
                    subscript: ["sub"],
                    superscript: ["sup"]
                },
                    t = function (e, t) {
                        return domUtils.filterNodeList(e.selection.getStartElementPath(), t)
                    },
                    i = this;
                for (var n in i.addshortcutkey({
                    Bold: "ctrl+66",
                    Italic: "ctrl+73",
                    Underline: "ctrl+85"
                }), i.addInputRule((function (e) {
                    utils.each(e.getNodesByTagName("b i"), (function (e) {
                        switch (e.tagName) {
                            case "b":
                                e.tagName = "strong";
                                break;
                            case "i":
                                e.tagName = "em"
                        }
                    }))
                })), e) !
                    function (e, n) {
                        i.commands[e] = {
                            execCommand: function (e) {
                                var o = i.selection.getRange(),
                                    r = t(this, n);
                                if (o.collapsed) {
                                    if (r) {
                                        var a = i.document.createTextNode("");
                                        o.insertNode(a).removeInlineStyle(n),
                                            o.setStartBefore(a),
                                            domUtils.remove(a)
                                    } else {
                                        var s = o.document.createElement(n[0]);
                                        "superscript" != e && "subscript" != e || (a = i.document.createTextNode(""), o.insertNode(a).removeInlineStyle(["sub", "sup"]).setStartBefore(a).collapse(!0)),
                                            o.insertNode(s).setStart(s, 0)
                                    }
                                    o.collapse(!0)
                                } else "superscript" != e && "subscript" != e || r && r.tagName.toLowerCase() == e || o.removeInlineStyle(["sub", "sup"]),
                                    r ? o.removeInlineStyle(n) : o.applyInlineStyle(n[0]);
                                o.select()
                            },
                            queryCommandState: function () {
                                return t(this, n) ? 1 : 0
                            }
                        }
                    }(n, e[n])
            },
            UE.plugins.elementpath = function () {
                var e, t, i = this;
                i.setOpt("elementPathEnabled", !0),
                    i.options.elementPathEnabled && (i.commands.elementpath = {
                        execCommand: function (n, o) {
                            var r = t[o],
                                a = i.selection.getRange();
                            e = 1 * o,
                                a.selectNode(r).select()
                        },
                        queryCommandValue: function () {
                            var i = [].concat(this.selection.getStartElementPath()).reverse(),
                                n = [];
                            t = i;
                            for (var o, r = 0; o = i[r]; r++) if (3 != o.nodeType) {
                                var a = o.tagName.toLowerCase();
                                if ("img" == a && o.getAttribute("anchorname") && (a = "anchor"), n[r] = a, e == r) {
                                    e = -1;
                                    break
                                }
                            }
                            return n
                        }
                    })
            },
            UE.plugins.formatmatch = function () {
                var e, t = this,
                    i = [],
                    n = 0;
                function o(r, a) {
                    if (browser.webkit) var s = "IMG" == a.target.tagName ? a.target : null;
                    t.undoManger && t.undoManger.save();
                    var l = t.selection.getRange(),
                        d = s || l.getClosedNode();
                    if (e && d && "IMG" == d.tagName) d.style.cssText += ";float:" + (e.style.cssFloat || e.style.styleFloat || "none") + ";display:" + (e.style.display || "inline"),
                        e = null;
                    else if (!e) {
                        if (l.collapsed) {
                            var c = t.document.createTextNode("match");
                            l.insertNode(c).select()
                        }
                        t.__hasEnterExecCommand = !0;
                        var u = t.options.removeFormatAttributes;
                        t.options.removeFormatAttributes = "",
                            t.execCommand("removeformat"),
                            t.options.removeFormatAttributes = u,
                            t.__hasEnterExecCommand = !1,
                            l = t.selection.getRange(),
                            i.length &&
                            function (e) {
                                c && e.selectNode(c),
                                    e.applyInlineStyle(i[i.length - 1].tagName, null, i)
                            }(l),
                            c && l.setStartBefore(c).collapse(!0),
                            l.select(),
                            c && domUtils.remove(c)
                    }
                    t.undoManger && t.undoManger.save(),
                        t.removeListener("mouseup", o),
                        n = 0
                }
                t.addListener("reset", (function () {
                    i = [],
                        n = 0
                })),
                    t.commands.formatmatch = {
                        execCommand: function (r) {
                            if (n) return n = 0,
                                i = [],
                                void t.removeListener("mouseup", o);
                            var a = t.selection.getRange();
                            if (!(e = a.getClosedNode()) || "IMG" != e.tagName) {
                                a.collapse(!0).shrinkBoundary();
                                var s = a.startContainer;
                                i = domUtils.findParents(s, !0, (function (e) {
                                    return !domUtils.isBlockElm(e) && 1 == e.nodeType
                                }));
                                for (var l, d = 0; l = i[d]; d++) if ("A" == l.tagName) {
                                    i.splice(d, 1);
                                    break
                                }
                            }
                            t.addListener("mouseup", o),
                                n = 1
                        },
                        queryCommandState: function () {
                            return n
                        },
                        notNeedUndo: 1
                    }
            },
            UE.plugin.register("searchreplace", (function () {
                var e = this,
                    t = {
                        table: 1,
                        tbody: 1,
                        tr: 1,
                        ol: 1,
                        ul: 1
                    };
                function i(e, t, i) {
                    var n = t.searchStr; - 1 == t.dir && (e = e.split("").reverse().join(""), n = n.split("").reverse().join(""), i = e.length - i);
                    for (var o, r = new RegExp(n, "g" + (t.casesensitive ? "" : "i")); o = r.exec(e);) if (o.index >= i) return - 1 == t.dir ? e.length - o.index - t.searchStr.length : o.index;
                    return - 1
                }
                function n(e, t, i) {
                    for (var o, r = 0,
                        a = e.firstChild,
                        s = 0; a;) {
                        if (3 == a.nodeType) {
                            if ((r += s = a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length) >= t) return {
                                node: a,
                                index: s - (r - t)
                            }
                        } else if (!dtd.$empty[a.tagName] && (r += s = a[browser.ie ? "innerText" : "textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length) >= t && (o = n(a, s - (r - t), i))) return o;
                        a = domUtils.getNextDomNode(a)
                    }
                }
                function o(e, o) {
                    var a, s = e.selection.getRange(),
                        l = o.searchStr,
                        d = e.document.createElement("span");
                    if (d.innerHTML = "$$ueditor_searchreplace_key$$", s.shrinkBoundary(!0), !s.collapsed) {
                        s.select();
                        var c = e.selection.getText();
                        if (new RegExp("^" + o.searchStr + "$", o.casesensitive ? "" : "i").test(c)) {
                            if (null != o.replaceStr) return r(s, o.replaceStr),
                                s.select(),
                                !0;
                            s.collapse(- 1 == o.dir)
                        }
                    }
                    s.insertNode(d),
                        s.enlargeToBlockElm(!0);
                    var u = (a = s.startContainer)[browser.ie ? "innerText" : "textContent"].indexOf("$$ueditor_searchreplace_key$$");
                    s.setStartBefore(d),
                        domUtils.remove(d);
                    var m = function (e, n, o) {
                        var r, a = o.all || 1 == o.dir ? "getNextDomNode" : "getPreDomNode";
                        for (domUtils.isBody(e) && (e = e.firstChild); e;) {
                            if (0, -1 != (r = i(3 == e.nodeType ? e.nodeValue : e[browser.ie ? "innerText" : "textContent"], o, n))) return {
                                node: e,
                                index: r
                            };
                            for (e = domUtils[a](e); e && t[e.nodeName.toLowerCase()];) e = domUtils[a](e, !0);
                            e && (n = -1 == o.dir ? (3 == e.nodeType ? e.nodeValue : e[browser.ie ? "innerText" : "textContent"]).length : 0)
                        }
                    }(a, u, o);
                    if (m) {
                        var f = n(m.node, m.index, l),
                            h = n(m.node, m.index + l.length, l);
                        return s.setStart(f.node, f.index).setEnd(h.node, h.index),
                            void 0 !== o.replaceStr && r(s, o.replaceStr),
                            s.select(),
                            !0
                    }
                    s.setCursor()
                }
                function r(t, i) {
                    i = e.document.createTextNode(i),
                        t.deleteContents().insertNode(i)
                }
                return {
                    commands: {
                        searchreplace: {
                            execCommand: function (t, i) {
                                utils.extend(i, {
                                    all: !1,
                                    casesensitive: !1,
                                    dir: 1
                                },
                                    !0);
                                var n = 0;
                                if (i.all) {
                                    var r = e.selection.getRange(),
                                        a = e.body.firstChild;
                                    for (a && 1 == a.nodeType ? (r.setStart(a, 0), r.shrinkBoundary(!0)) : 3 == a.nodeType && r.setStartBefore(a), r.collapse(!0).select(!0), void 0 !== i.replaceStr && e.fireEvent("saveScene"); o(this, i);) n++;
                                    n && e.fireEvent("saveScene")
                                } else void 0 !== i.replaceStr && e.fireEvent("saveScene"),
                                    o(this, i) && n++,
                                    n && e.fireEvent("saveScene");
                                return n
                            },
                            notNeedUndo: 1
                        }
                    }
                }
            })), UE.plugins.customstyle = function () {
                var e = this;
                e.setOpt({
                    customstyle: [{
                        tag: "h1",
                        name: "tc",
                        style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
                    },
                    {
                        tag: "h1",
                        name: "tl",
                        style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
                    },
                    {
                        tag: "span",
                        name: "im",
                        style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
                    },
                    {
                        tag: "span",
                        name: "hi",
                        style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
                    }]
                }),
                    e.commands.customstyle = {
                        execCommand: function (e, t) {
                            var i, n, o = this,
                                r = t.tag,
                                a = domUtils.findParent(o.selection.getStart(), (function (e) {
                                    return e.getAttribute("label")
                                }), !0),
                                s = {};
                            for (var l in t) void 0 !== t[l] && (s[l] = t[l]);
                            if (delete s.tag, a && a.getAttribute("label") == t.label) {
                                if (n = (i = this.selection.getRange()).createBookmark(), i.collapsed) if (dtd.$block[a.tagName]) {
                                    var d = o.document.createElement("p");
                                    domUtils.moveChild(a, d),
                                        a.parentNode.insertBefore(d, a),
                                        domUtils.remove(a)
                                } else domUtils.remove(a, !0);
                                else {
                                    var c = domUtils.getCommonAncestor(n.start, n.end),
                                        u = domUtils.getElementsByTagName(c, r);
                                    new RegExp(r, "i").test(c.tagName) && u.push(c);
                                    for (var m, f = 0; m = u[f++];) if (m.getAttribute("label") == t.label) {
                                        var h = domUtils.getPosition(m, n.start),
                                            p = domUtils.getPosition(m, n.end);
                                        if ((h & domUtils.POSITION_FOLLOWING || h & domUtils.POSITION_CONTAINS) && (p & domUtils.POSITION_PRECEDING || p & domUtils.POSITION_CONTAINS) && dtd.$block[r]) {
                                            d = o.document.createElement("p");
                                            domUtils.moveChild(m, d),
                                                m.parentNode.insertBefore(d, m)
                                        }
                                        domUtils.remove(m, !0)
                                    } (a = domUtils.findParent(c, (function (e) {
                                        return e.getAttribute("label") == t.label
                                    }), !0)) && domUtils.remove(a, !0)
                                }
                                i.moveToBookmark(n).select()
                            } else if (dtd.$block[r]) {
                                if (this.execCommand("paragraph", r, s, "customstyle"), !(i = o.selection.getRange()).collapsed) {
                                    i.collapse(),
                                        a = domUtils.findParent(o.selection.getStart(), (function (e) {
                                            return e.getAttribute("label") == t.label
                                        }), !0);
                                    var g = o.document.createElement("p");
                                    domUtils.insertAfter(a, g),
                                        domUtils.fillNode(o.document, g),
                                        i.setStart(g, 0).setCursor()
                                }
                            } else {
                                if ((i = o.selection.getRange()).collapsed) return a = o.document.createElement(r),
                                    domUtils.setAttributes(a, s),
                                    void i.insertNode(a).setStart(a, 0).setCursor();
                                n = i.createBookmark(),
                                    i.applyInlineStyle(r, s).moveToBookmark(n).select()
                            }
                        },
                        queryCommandValue: function () {
                            var e = domUtils.filterNodeList(this.selection.getStartElementPath(), (function (e) {
                                return e.getAttribute("label")
                            }));
                            return e ? e.getAttribute("label") : ""
                        }
                    },
                    e.addListener("keyup", (function (t, i) {
                        var n = i.keyCode || i.which;
                        if (32 == n || 13 == n) {
                            var o = e.selection.getRange();
                            if (o.collapsed) {
                                var r = domUtils.findParent(e.selection.getStart(), (function (e) {
                                    return e.getAttribute("label")
                                }), !0);
                                if (r && dtd.$block[r.tagName] && domUtils.isEmptyNode(r)) {
                                    var a = e.document.createElement("p");
                                    domUtils.insertAfter(r, a),
                                        domUtils.fillNode(e.document, a),
                                        domUtils.remove(r),
                                        o.setStart(a, 0).setCursor()
                                }
                            }
                        }
                    }))
            },
            UE.plugins.catchremoteimage = function () {
                var me = this,
                    ajax = UE.ajax; !1 !== me.options.catchRemoteImageEnable && (me.setOpt({
                        catchRemoteImageEnable: !1
                    }), me.addListener("afterpaste", (function () {
                        me.fireEvent("catchRemoteImage")
                    })), me.addListener("catchRemoteImage", (function () {
                        for (var catcherLocalDomain = me.getOpt("catcherLocalDomain"), catcherActionUrl = me.getActionUrl(me.getOpt("catcherActionName")), catcherUrlPrefix = me.getOpt("catcherUrlPrefix"), catcherFieldName = me.getOpt("catcherFieldName"), remoteImages = [], imgs = domUtils.getElementsByTagName(me.document, "img"), test = function (e, t) {
                            if (- 1 != e.indexOf(location.host) || /(^\.)|(^\/)/.test(e)) return !0;
                            if (t) for (var i, n = 0; i = t[n++];) if (- 1 !== e.indexOf(i)) return !0;
                            return !1
                        },
                            backImgs = domUtils.getElementsByTagNameStyle(me.document, "section div p", "background,url"), remoteBackImgs = [], l = 0, ei; ei = backImgs[l++];) if (ei.getAttribute("style") && "true" != ei.getAttribute("is_updata")) {
                                var src = ei.getAttribute("style");
                                if (!filterQcloudImg(src)) {
                                    if (src.indexOf('url("') > 0) src = src.split('url("')[1].split('")')[0];
                                    else if (src.indexOf("url('") > 0) src = src.split("url('")[1].split("')")[0];
                                    else {
                                        if (!(src.indexOf("url(") > 0)) continue;
                                        src = src.split("url(")[1].split(")")[0]
                                    }
                                    /^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain) && (src.indexOf("?") >= 0 && (src = src.split("?")[0]), remoteBackImgs.push(src))
                                }
                            }
                        for (var i = 0,
                            ci; ci = imgs[i++];) if (!ci.getAttribute("word_img") && "true" != ci.getAttribute("is_updata")) {
                                var src = ci.getAttribute("_src") || ci.src || "";
                                filterQcloudImg(src) || (/^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain) && (src.indexOf("?") >= 0 && (src = src.split("?")[0]), remoteImages.push(src)), domUtils.addClass(ci, "loadingclass"), domUtils.setAttributes(ci, {
                                    src: me.options.UEDITOR_HOME_URL + "themes/default/images/spacer.gif"
                                }))
                            }
                        function catchremoteimage(e, t) {
                            var i = utils.serializeParam(me.queryCommandValue("serverparam")) || "",
                                n = utils.formatUrl(catcherActionUrl + (- 1 == catcherActionUrl.indexOf("?") ? "?" : "&") + i),
                                o = {
                                    method: "POST",
                                    dataType: utils.isCrossDomainUrl(n) ? "jsonp" : "",
                                    timeout: 6e4,
                                    onsuccess: t.success,
                                    onerror: t.error
                                };
                            o[catcherFieldName] = e,
                                ajax.request(n, o)
                        }
                        remoteBackImgs.length && catchremoteimage(remoteBackImgs, {
                            success: function (r) {
                                console.log("成功抓取");
                                try {
                                    var info = void 0 !== r.state ? r : eval("(" + r.responseText + ")")
                                } catch (e) {
                                    return void console.log("catch " + e)
                                }
                                var i, j, ci, cj, oldSrc, newSrc, styleText, list = info.list;
                                for (i = 0; ci = backImgs[i++];) {
                                    if (styleText = ci.getAttribute("style"), oldSrc = styleText, oldSrc.indexOf('url("') > 0) oldSrc = oldSrc.split('url("')[1].split('")')[0];
                                    else if (oldSrc.indexOf("url('") > 0) oldSrc = oldSrc.split("url('")[1].split("')")[0];
                                    else {
                                        if (!(oldSrc.indexOf("url(") > 0)) continue;
                                        oldSrc = oldSrc.split("url(")[1].split(")")[0]
                                    }
                                    for (oldSrc.indexOf("?") >= 0 && (oldSrc = oldSrc.split("?")[0]), j = 0; cj = list[j++];) if (oldSrc == cj.source && "SUCCESS" == cj.state) {
                                        newSrc = catcherUrlPrefix + cj.url,
                                            styleText = styleText.replace(oldSrc, newSrc),
                                            domUtils.setAttributes(ci, {
                                                style: styleText
                                            }),
                                            domUtils.setAttributes(ci, {
                                                is_updata: "true"
                                            });
                                        break
                                    }
                                    precessUploadToMaterial(list)
                                }
                            },
                            error: function () { }
                        }),
                            remoteImages.length && catchremoteimage(remoteImages, {
                                success: function (r) {
                                    console.log("贴贴图片上传 - 白"),
                                        console.log(r);
                                    try {
                                        var info = void 0 !== r.state ? r : eval("(" + r.responseText + ")")
                                    } catch (e) {
                                        return void console.log("catch " + e)
                                    }
                                    var i, j, m, n, ci, cj, oldSrc, newSrc, cashItem, list = info.list,
                                        cashList = [],
                                        cashImgs = [];
                                    for (m = 0; cashItem = list[m++];) for (i = 0; ci = imgs[i++];) if (oldSrc = ci.getAttribute("_src") || ci.src || "", oldSrc.indexOf("?") >= 0 && (oldSrc = oldSrc.split("?")[0]), oldSrc == cashItem.source && "SUCCESS" == cashItem.state) {
                                        cashImgs[m] = ci,
                                            cashList[m] = new Image,
                                            cashList[m].src = cashItem.url,
                                            cashList[m].onload = setCashImg(cashList[m].src, cashImgs[m]),
                                            me.fireEvent("imgUploadSuccess");
                                        break
                                    }
                                    function setCashImg(e, t) {
                                        domUtils.removeClasses(ci, "loadingclass"),
                                            domUtils.setAttributes(t, {
                                                src: e,
                                                _src: e
                                            }),
                                            domUtils.setAttributes(t, {
                                                is_updata: "true"
                                            }),
                                            precessUploadToMaterial(list)
                                    }
                                    console.log("上报上报", list)
                                },
                                error: function () { }
                            })
                    })))
            },
            UE.plugin.register("snapscreen", (function () {
                var me = this,
                    snapplugin;
                function getLocation(e) {
                    var t, i = document.createElement("a"),
                        n = utils.serializeParam(me.queryCommandValue("serverparam")) || "";
                    return i.href = e,
                        browser.ie && (i.href = i.href),
                        t = i.search,
                        n && (t = (t = t + (- 1 == t.indexOf("?") ? "?" : "&") + n).replace(/[&]+/gi, "&")),
                    {
                        port: i.port,
                        hostname: i.hostname,
                        path: i.pathname + t || +i.hash
                    }
                }
                return {
                    commands: {
                        snapscreen: {
                            execCommand: function (cmd) {
                                var url, local, res, lang = me.getLang("snapScreen_plugin");
                                if (!snapplugin) {
                                    var container = me.container,
                                        doc = me.container.ownerDocument || me.container.document;
                                    snapplugin = doc.createElement("object");
                                    try {
                                        snapplugin.type = "application/x-pluginbaidusnap"
                                    } catch (e) {
                                        return
                                    }
                                    snapplugin.style.cssText = "position:absolute;left:-9999px;width:0;height:0;",
                                        snapplugin.setAttribute("width", "0"),
                                        snapplugin.setAttribute("height", "0"),
                                        container.appendChild(snapplugin)
                                }
                                function onSuccess(rs) {
                                    try {
                                        if (rs = eval("(" + rs + ")"), "SUCCESS" == rs.state) {
                                            var opt = me.options;
                                            me.execCommand("insertimage", {
                                                src: opt.snapscreenUrlPrefix + rs.url,
                                                _src: opt.snapscreenUrlPrefix + rs.url,
                                                alt: rs.title || "",
                                                floatStyle: opt.snapscreenImgAlign
                                            })
                                        } else alert(rs.state)
                                    } catch (e) {
                                        alert(lang.callBackErrorMsg)
                                    }
                                }
                                url = me.getActionUrl(me.getOpt("snapscreenActionName")),
                                    local = getLocation(url),
                                    setTimeout((function () {
                                        try {
                                            res = snapplugin.saveSnapshot(local.hostname, local.path, local.port)
                                        } catch (e) {
                                            return void me.ui._dialogs.snapscreenDialog.open()
                                        }
                                        onSuccess(res)
                                    }), 50)
                            },
                            queryCommandState: function () {
                                return - 1 != navigator.userAgent.indexOf("Windows", 0) ? 0 : -1
                            }
                        }
                    }
                }
            })), UE.commands.insertparagraph = {
                execCommand: function (e, t) {
                    for (var i, n = this.selection.getRange(), o = n.startContainer; o && !domUtils.isBody(o);) i = o,
                        o = o.parentNode;
                    if (i) {
                        var r = this.document.createElement("p");
                        t ? i.parentNode.insertBefore(r, i) : i.parentNode.insertBefore(r, i.nextSibling),
                            domUtils.fillNode(this.document, r),
                            n.setStart(r, 0).setCursor(!1, !0)
                    }
                }
            },
            UE.plugin.register("webapp", (function () {
                var e = this;
                function t(t, i) {
                    return i ? '<iframe class="edui-faked-webapp" title="' + t.title + '" ' + (t.align && !t.cssfloat ? 'align="' + t.align + '"' : "") + (t.cssfloat ? 'style="float:' + t.cssfloat + '"' : "") + 'width="' + t.width + '" height="' + t.height + '"  scrolling="no" frameborder="0" src="' + t.url + '" logo_url = "' + t.logo + '"></iframe>' : '<img title="' + t.title + '" width="' + t.width + '" height="' + t.height + '" src=' + e.options.UEDITOR_HOME_URL + '"../themes/default/images/spacer.gif" _logo_url="' + t.logo + '" style="background:url(' + t.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + t.url + '" ' + (t.align && !t.cssfloat ? 'align="' + t.align + '"' : "") + (t.cssfloat ? 'style="float:' + t.cssfloat + '"' : "") + "/>"
                }
                return {
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("img"), (function (e) {
                            var i;
                            if ("edui-faked-webapp" == e.getAttr("class")) {
                                i = t({
                                    title: e.getAttr("title"),
                                    width: e.getAttr("width"),
                                    height: e.getAttr("height"),
                                    align: e.getAttr("align"),
                                    cssfloat: e.getStyle("float"),
                                    url: e.getAttr("_url"),
                                    logo: e.getAttr("_logo_url")
                                },
                                    !0);
                                var n = UE.uNode.createElement(i);
                                e.parentNode.replaceChild(n, e)
                            }
                        }))
                    },
                    inputRule: function (e) {
                        utils.each(e.getNodesByTagName("iframe"), (function (e) {
                            if ("edui-faked-webapp" == e.getAttr("class")) {
                                var i = UE.uNode.createElement(t({
                                    title: e.getAttr("title"),
                                    width: e.getAttr("width"),
                                    height: e.getAttr("height"),
                                    align: e.getAttr("align"),
                                    cssfloat: e.getStyle("float"),
                                    url: e.getAttr("src"),
                                    logo: e.getAttr("logo_url")
                                }));
                                e.parentNode.replaceChild(i, e)
                            }
                        }))
                    },
                    commands: {
                        webapp: {
                            execCommand: function (e, i) {
                                var n = t(utils.extend(i, {
                                    align: "none"
                                }), !1);
                                this.execCommand("inserthtml", n)
                            },
                            queryCommandState: function () {
                                var e = this.selection.getRange().getClosedNode();
                                return e && "edui-faked-webapp" == e.className ? 1 : 0
                            }
                        }
                    }
                }
            })), UE.plugins.template = function () {
                UE.commands.template = {
                    execCommand: function (e, t) {
                        t.html && this.execCommand("inserthtml", t.html)
                    }
                },
                    this.addListener("click", (function (e, t) {
                        var i = t.target || t.srcElement,
                            n = this.selection.getRange(),
                            o = domUtils.findParent(i, (function (e) {
                                if (e.className && domUtils.hasClass(e, "ue_t")) return e
                            }), !0);
                        o && n.selectNode(o).shrinkBoundary().select()
                    })),
                    this.addListener("keydown", (function (e, t) {
                        var i = this.selection.getRange();
                        if (!i.collapsed && !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
                            var n = domUtils.findParent(i.startContainer, (function (e) {
                                if (e.className && domUtils.hasClass(e, "ue_t")) return e
                            }), !0);
                            n && domUtils.removeClasses(n, ["ue_t"])
                        }
                    }))
            },
            UE.plugin.register("music", (function () {
                var e = this;
                function t(t, i, n, o, r, a) {
                    return a ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + t + '" width="' + i + '" height="' + n + '" ' + (o && !r ? 'align="' + o + '"' : "") + (r ? 'style="float:' + r + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : "<img " + (o && !r ? 'align="' + o + '"' : "") + (r ? 'style="float:' + r + '"' : "") + ' width="' + i + '" height="' + n + '" _url="' + t + '" class="edui-faked-music" src="' + e.options.langPath + e.options.lang + '/images/music.png" />'
                }
                return {
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("img"), (function (e) {
                            var i;
                            if ("edui-faked-music" == e.getAttr("class")) {
                                var n = e.getStyle("float"),
                                    o = e.getAttr("align");
                                i = t(e.getAttr("_url"), e.getAttr("width"), e.getAttr("height"), o, n, !0);
                                var r = UE.uNode.createElement(i);
                                e.parentNode.replaceChild(r, e)
                            }
                        }))
                    },
                    inputRule: function (e) {
                        utils.each(e.getNodesByTagName("embed"), (function (e) {
                            if ("edui-faked-music" == e.getAttr("class")) {
                                var i = e.getStyle("float"),
                                    n = e.getAttr("align");
                                html = t(e.getAttr("src"), e.getAttr("width"), e.getAttr("height"), n, i, !1);
                                var o = UE.uNode.createElement(html);
                                e.parentNode.replaceChild(o, e)
                            }
                        }))
                    },
                    commands: {
                        music: {
                            execCommand: function (e, i) {
                                var n = t(i.url, i.width || 400, i.height || 95, "none", !1);
                                this.execCommand("inserthtml", n)
                            },
                            queryCommandState: function () {
                                var e = this.selection.getRange().getClosedNode();
                                return e && "edui-faked-music" == e.className ? 1 : 0
                            }
                        }
                    }
                }
            })), UE.plugin.register("autoupload", (function () {
                function e(e, t) {
                    const {
                        hex: i,
                        type: n
                    } = e;
                    let o = window.atob(function (e) {
                        let t = "";
                        for (var i = 0; i < e.length; i += 2) t += String.fromCharCode(parseInt(e.substr(i, 2), 16));
                        return btoa(t)
                    }(i)),
                        r = new ArrayBuffer(o.length),
                        a = new Uint8Array(r);
                    for (let l = 0; l < o.length; l++) a[l] = o.charCodeAt(l);
                    let s = new Blob([a], {
                        type: n
                    });
                    return new File([s], t, {
                        type: n
                    })
                }
                function t(t) {
                    let i = [];
                    if (t.clipboardData) {
                        if (- 1 !== t.clipboardData.types.indexOf("Files") && 1 === t.clipboardData.types.length) {
                            let e = t.clipboardData.items[0].getAsFile();
                            e && /^image\//.test(e.type) && i.push(e)
                        }
                        if (- 1 !== t.clipboardData.types.indexOf("text/rtf") && t.clipboardData.getData("text/rtf")) {
                            (function (e) {
                                if (!e) return [];
                                const t = /{\\pict\{[\s\S]+?\\bliptag-?\d+(\\blipupi-?\d+)?({\\\*\\blipuid\s?[\da-fA-F]+)?[\s}]*?/,
                                    i = new RegExp("(?:(" + t.source + "))([\\da-fA-F\\s]+)\\}", "g"),
                                    n = e.match(i),
                                    o = [];
                                if (n) for (const r of n) {
                                    let e = !1; - 1 !== r.indexOf("\\pngblip") ? e = "image/png" : -1 !== r.indexOf("\\jpegblip") && (e = "image/jpeg"),
                                        o.push({
                                            hex: e ? r.replace(t, "").replace(/[^\da-fA-F]/g, "") : null,
                                            type: e
                                        })
                                }
                                return o
                            })(t.clipboardData.getData("text/rtf")).forEach((function (t) {
                                let n = t.type ? "picture." + t.type.split("/")[1] : "unknown",
                                    o = t.hex ? e(t, n) : {};
                                i.push(Object.assign(o, {
                                    dataFrom: "rtf"
                                }))
                            }))
                        }
                    }
                    return i
                }
                return {
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("img"), (function (e) {
                            / \b(loaderrorclass) | (bloaderrorclass)\b /.test(e.getAttr("class")) && e.parentNode.removeChild(e)
                        })),
                            utils.each(e.getNodesByTagName("p"), (function (e) {
                                / \bloadpara\b /.test(e.getAttr("class")) && e.parentNode.removeChild(e)
                            }))
                    },
                    bindEvents: {
                        ready: function (e) {
                            var i = this;
                            window.FormData && window.FileReader && (domUtils.on(i.body, "paste drop", (function (e) {
                                var n = null;
                                "paste" === e.type ? (UE.cilpbordVersion = Date.now().toString(36), n = t(e) || []) : n = function (e) {
                                    return e.dataTransfer && e.dataTransfer.files ? Array.from(e.dataTransfer.files) : []
                                }(e) || [],
                                    e.clipboardData.getData("text/rtf") ? UE.rtfIsEmpty = !1 : UE.rtfIsEmpty = !0,
                                    n.forEach((function (t, n) {
                                        let o = null;
                                        "rtf" !== t.dataFrom || UE.rtfIsEmpty || (o = "img_" + UE.cilpbordVersion + "_" + n),
                                            t.size ?
                                                function (e, t, i) {
                                                    var n, o, r, a, s, l, d, c, u = t,
                                                        m = /image\/\w+/i.test(e.type) ? "image" : "file",
                                                        f = "rtf" === e.dataFrom;
                                                    if (i = f ? i : "loading_" + (+ new Date).toString(36), n = u.getOpt(m + "FieldName"), o = u.getOpt(m + "UrlPrefix"), r = u.getOpt(m + "MaxSize"), a = u.getOpt(m + "AllowFiles"), s = u.getActionUrl(u.getOpt(m + "ActionName")), d = function (e) {
                                                        var t = u.document.getElementById(i);
                                                        t && domUtils.remove(t),
                                                            u.fireEvent("showmessage", {
                                                                id: i,
                                                                content: e,
                                                                type: "error",
                                                                timeout: 4e3
                                                            })
                                                    },
                                                        "image" == m && (f || (l = '<img class="loadingclass" id="' + i + '" src="' + u.options.themePath + u.options.theme + '/images/spacer.gif" title="' + (u.getLang("autoupload.loading") || "") + '" >', u.execCommand("inserthtml", l)), c = function (e) {
                                                            var t = o + e.url,
                                                                n = u.document.getElementById(i);
                                                            n && (n.setAttribute("src", t), n.setAttribute("_src", t), n.setAttribute("title", e.title || ""), n.setAttribute("alt", e.original || ""), n.removeAttribute("id"), domUtils.removeClasses(n, "loadingclass"), u.fireEvent("contentChange"), setTimeout((function () {
                                                                u.fireEvent("aftersimpleupload")
                                                            }), 500)),
                                                                precessUploadToMaterial([e])
                                                        }), u.getOpt(m + "ActionName")) if (e.size > r) d(u.getLang("autoupload.exceedSizeError"));
                                                        else {
                                                            var h = e.name ? e.name.substr(e.name.lastIndexOf(".")) : "";
                                                            if (h && "image" != m || a && -1 == (a.join("") + ".").indexOf(h.toLowerCase() + ".")) d(u.getLang("autoupload.exceedTypeError"));
                                                            else {
                                                                var p = new XMLHttpRequest,
                                                                    g = new FormData,
                                                                    b = utils.serializeParam(u.queryCommandValue("serverparam")) || "",
                                                                    v = utils.formatUrl(s + (- 1 == s.indexOf("?") ? "?" : "&") + b);
                                                                g.append(n, e, e.name || "blob." + e.type.substr("image/".length)),
                                                                    g.append("type", "ajax"),
                                                                    p.open("post", v, !0),
                                                                    p.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                                                    p.addEventListener("load", (function (e) {
                                                                        setTimeout((function () {
                                                                            try {
                                                                                var t = new Function("return " + utils.trim(e.target.response))();
                                                                                "SUCCESS" == t.state && t.url ? c(t) : d(t.state)
                                                                            } catch (i) {
                                                                                d(u.getLang("autoupload.loadError"))
                                                                            }
                                                                        }), 100)
                                                                    })),
                                                                    p.onerror = function () {
                                                                        setTimeout((function () {
                                                                            d(u.getLang("autoupload.loadError"))
                                                                        }), 100)
                                                                    },
                                                                    p.send(g)
                                                            }
                                                        } else d(u.getLang("autoupload.errorLoadConfig"))
                                                }(t, i, o) : setTimeout((function () {
                                                    var e = i.document.getElementById(o);
                                                    e && domUtils.remove(e)
                                                }), 100),
                                            "drop" === e.type && e.preventDefault()
                                    }))
                            })), domUtils.on(i.body, "dragover", (function (e) {
                                "Files" == e.dataTransfer.types[0] && e.preventDefault()
                            })), utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document))
                        }
                    }
                }
            })), UE.plugin.register("autosave", (function () {
                var e = this,
                    t = (new Date, null);
                return {
                    defaultOptions: {
                        saveInterval: 500
                    },
                    bindEvents: {
                        ready: function () {
                            var i = null;
                            i = e.key ? e.key + "-drafts-data" : (e.container.parentNode.id || "ue-common") + "-drafts-data",
                                t = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + i
                        },
                        contentchange: function () {
                            t && e._saveFlag && window.clearTimeout(e._saveFlag)
                        }
                    },
                    commands: {
                        clearlocaldata: {
                            execCommand: function (i, n) {
                                t && e.getPreferences(t) && e.removePreferences(t)
                            },
                            notNeedUndo: !0,
                            ignoreContentChange: !0
                        },
                        getlocaldata: {
                            execCommand: function (i, n) {
                                return t && e.getPreferences(t) || ""
                            },
                            notNeedUndo: !0,
                            ignoreContentChange: !0
                        },
                        drafts: {
                            execCommand: function (i, n) {
                                t && (e.body.innerHTML = e.getPreferences(t) || "<p>" + domUtils.fillHtml + "</p>", e.focus(!0))
                            },
                            queryCommandState: function () {
                                return t ? null === e.getPreferences(t) ? -1 : 0 : -1
                            },
                            notNeedUndo: !0,
                            ignoreContentChange: !0
                        }
                    }
                }
            })), UE.plugin.register("charts", (function () {
                var e = this;
                return {
                    bindEvents: {
                        chartserror: function () { }
                    },
                    commands: {
                        charts: {
                            execCommand: function (i, n) {
                                var o = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0),
                                    r = [],
                                    a = {};
                                if (!o) return !1;
                                if (!t(o)) return e.fireEvent("chartserror"),
                                    !1;
                                for (var s in a.title = n.title || "",
                                    a.subTitle = n.subTitle || "",
                                    a.xTitle = n.xTitle || "",
                                    a.yTitle = n.yTitle || "",
                                    a.suffix = n.suffix || "",
                                    a.tip = n.tip || "",
                                    a.dataFormat = n.tableDataFormat || "",
                                    a.chartType = n.chartType || 0,
                                    a) a.hasOwnProperty(s) && r.push(s + ":" + a[s]);
                                o.setAttribute("data-chart", r.join(";")),
                                    domUtils.addClass(o, "edui-charts-table")
                            },
                            queryCommandState: function (e, i) {
                                var n = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0);
                                return n && t(n) ? 0 : -1
                            }
                        }
                    },
                    inputRule: function (e) {
                        utils.each(e.getNodesByTagName("table"), (function (e) {
                            void 0 !== e.getAttr("data-chart") && e.setAttr("style")
                        }))
                    },
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("table"), (function (e) {
                            void 0 !== e.getAttr("data-chart") && e.setAttr("style", "display: none;")
                        }))
                    }
                };
                function t(e) {
                    var t, i;
                    if (e.rows.length < 2) return !1;
                    if (e.rows[0].cells.length < 2) return !1;
                    i = (t = e.rows[0].cells).length;
                    for (var n = 0; r = t[n]; n++) if ("th" !== r.tagName.toLowerCase()) return !1;
                    var o;
                    for (n = 1; o = e.rows[n]; n++) {
                        if (o.cells.length != i) return !1;
                        if ("th" !== o.cells[0].tagName.toLowerCase()) return !1;
                        for (var r, a = 1; r = o.cells[a]; a++) {
                            var s = utils.trim(r.innerText || r.textContent || "");
                            if (s = s.replace(new RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), !/^\d*\.?\d+$/.test(s)) return !1
                        }
                    }
                    return !0
                }
            })), UE.plugin.register("section", (function () {
                function e(e) {
                    this.tag = "",
                        this.level = -1,
                        this.dom = null,
                        this.nextSection = null,
                        this.previousSection = null,
                        this.parentSection = null,
                        this.startAddress = [],
                        this.endAddress = [],
                        this.children = []
                }
                function t(t) {
                    var i = new e;
                    return utils.extend(i, t)
                }
                function i(e, t) {
                    for (var i = t,
                        n = 0; n < e.length; n++) {
                        if (!i.childNodes) return null;
                        i = i.childNodes[e[n]]
                    }
                    return i
                }
                var n = this;
                return {
                    bindMultiEvents: {
                        type: "aftersetcontent afterscencerestore",
                        handler: function () {
                            n.fireEvent("updateSections")
                        }
                    },
                    bindEvents: {
                        ready: function () {
                            n.fireEvent("updateSections"),
                                domUtils.on(n.body, "drop paste", (function () {
                                    n.fireEvent("updateSections")
                                }))
                        },
                        afterexeccommand: function (e, t) {
                            "paragraph" == t && n.fireEvent("updateSections")
                        },
                        keyup: function (e, t) {
                            if (1 != this.selection.getRange().collapsed) this.fireEvent("updateSections");
                            else {
                                var i = t.keyCode || t.which;
                                13 != i && 8 != i && 46 != i || this.fireEvent("updateSections")
                            }
                        }
                    },
                    commands: {
                        getsections: {
                            execCommand: function (e, i) {
                                for (var n = i || ["h1", "h2", "h3", "h4", "h5", "h6"], o = 0; o < n.length; o++)"string" == typeof n[o] ? n[o] = function (e) {
                                    return function (t) {
                                        return t.tagName == e.toUpperCase()
                                    }
                                }(n[o]) : "function" != typeof n[o] && (n[o] = function (e) {
                                    return null
                                });
                                function r(e) {
                                    for (var t = 0; t < n.length; t++) if (n[t](e)) return t;
                                    return - 1
                                }
                                var a = this,
                                    s = t({
                                        level: -1,
                                        title: "root"
                                    }),
                                    l = s;
                                return function e(i, n) {
                                    for (var o, s, d, c = null,
                                        u = i.childNodes,
                                        m = 0,
                                        f = u.length; m < f; m++) if ((o = r(d = u[m])) >= 0) {
                                            var h = a.selection.getRange().selectNode(d).createAddress(!0).startAddress,
                                                p = t({
                                                    tag: d.tagName,
                                                    title: d.innerText || d.textContent || "",
                                                    level: o,
                                                    dom: d,
                                                    startAddress: utils.clone(h, []),
                                                    endAddress: utils.clone(h, []),
                                                    children: []
                                                });
                                            for (l.nextSection = p, p.previousSection = l, s = l; o <= s.level;) s = s.parentSection;
                                            p.parentSection = s,
                                                s.children.push(p),
                                                c = l = p
                                        } else 1 === d.nodeType && e(d, n),
                                            c && c.endAddress[c.endAddress.length - 1]++
                                }(a.body, s),
                                    s
                            },
                            notNeedUndo: !0
                        },
                        movesection: {
                            execCommand: function (e, t, n, o) {
                                var r, a;
                                if (t && n && -1 != n.level && (a = i(r = o ? n.endAddress : n.startAddress, this.body), r && a && !
                                    function (e, t, i) {
                                        for (var n = !1,
                                            o = !1,
                                            r = 0; r < e.length && !(r >= i.length); r++) {
                                            if (i[r] > e[r]) {
                                                n = !0;
                                                break
                                            }
                                            if (i[r] < e[r]) break
                                        }
                                        for (r = 0; r < t.length && !(r >= i.length); r++) {
                                            if (i[r] < e[r]) {
                                                o = !0;
                                                break
                                            }
                                            if (i[r] > e[r]) break
                                        }
                                        return n && o
                                    }(t.startAddress, t.endAddress, r))) {
                                    var s, l, d = i(t.startAddress, this.body),
                                        c = i(t.endAddress, this.body);
                                    if (o) for (s = c; s && !(domUtils.getPosition(d, s) & domUtils.POSITION_FOLLOWING) && (l = s.previousSibling, domUtils.insertAfter(a, s), s != d);) s = l;
                                    else for (s = d; s && !(domUtils.getPosition(s, c) & domUtils.POSITION_FOLLOWING) && (l = s.nextSibling, a.parentNode.insertBefore(s, a), s != c);) s = l;
                                    this.fireEvent("updateSections")
                                }
                            }
                        },
                        deletesection: {
                            execCommand: function (e, t, i) {
                                var n = this;
                                if (t) {
                                    var o, r = l(t.startAddress),
                                        a = l(t.endAddress),
                                        s = r;
                                    if (i) domUtils.remove(s);
                                    else for (; s && domUtils.inDoc(a, n.document) && !(domUtils.getPosition(s, a) & domUtils.POSITION_FOLLOWING);) o = s.nextSibling,
                                        domUtils.remove(s),
                                        s = o;
                                    n.fireEvent("updateSections")
                                }
                                function l(e) {
                                    for (var t = n.body,
                                        i = 0; i < e.length; i++) {
                                        if (!t.childNodes) return null;
                                        t = t.childNodes[e[i]]
                                    }
                                    return t
                                }
                            }
                        },
                        selectsection: {
                            execCommand: function (e, t) {
                                if (!t && !t.dom) return !1;
                                var i = this.selection.getRange(),
                                    n = {
                                        startAddress: utils.clone(t.startAddress, []),
                                        endAddress: utils.clone(t.endAddress, [])
                                    };
                                return n.endAddress[n.endAddress.length - 1]++,
                                    i.moveToAddress(n).select().scrollToView(),
                                    !0
                            },
                            notNeedUndo: !0
                        },
                        scrolltosection: {
                            execCommand: function (e, t) {
                                if (!t && !t.dom) return !1;
                                var i = this.selection.getRange(),
                                    n = {
                                        startAddress: t.startAddress,
                                        endAddress: t.endAddress
                                    };
                                return n.endAddress[n.endAddress.length - 1]++,
                                    i.moveToAddress(n).scrollToView(),
                                    !0
                            },
                            notNeedUndo: !0
                        }
                    }
                }
            })), UE.plugin.register("simpleupload", (function () {
                var e, t = this,
                    i = !1;
                function n() {
                    var n = e.offsetWidth || 20,
                        o = e.offsetHeight || 20,
                        r = document.createElement("iframe"),
                        a = "display:block;width:" + n + "px;height:" + o + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
                    domUtils.on(r, "load", (function () {
                        var e, s, l, d = (+ new Date).toString(36);
                        l = (s = r.contentDocument || r.contentWindow.document).body,
                            (e = s.createElement("div")).innerHTML = '<form id="edui_form_' + d + '" target="edui_iframe_' + d + '" method="POST" enctype="multipart/form-data" action="' + t.getOpt("serverUrl") + '" style="' + a + '"><input id="edui_input_' + d + '" type="file" accept="image/jpg,image/jpeg,image/gif,image/png" name="' + t.options.imageFieldName + '" style="' + a + '"></form><iframe id="edui_iframe_' + d + '" name="edui_iframe_' + d + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>',
                            e.className = "edui-" + t.options.theme,
                            e.id = t.ui.id + "_iframeupload",
                            l.style.cssText = a,
                            l.style.width = n + "px",
                            l.style.height = o + "px",
                            l.appendChild(e),
                            l.parentNode && (l.parentNode.style.width = n + "px", l.parentNode.style.height = n + "px");
                        var c, u = s.getElementById("edui_form_" + d),
                            m = s.getElementById("edui_input_" + d),
                            f = s.getElementById("edui_iframe_" + d);
                        domUtils.on(m, "change", (function () {
                            if (m.value) {
                                var e = "loading_" + (+ new Date).toString(36),
                                    i = utils.serializeParam(t.queryCommandValue("serverparam")) || "",
                                    n = t.getActionUrl(t.getOpt("imageActionName")),
                                    o = t.getOpt("imageAllowFiles");
                                if (t.focus(), t.execCommand("inserthtml", '<img class="loadingclass" id="' + e + '" src="' + t.options.themePath + t.options.theme + '/images/spacer.gif" title="' + (t.getLang("simpleupload.loading") || "") + '" >'), t.getOpt("imageActionName")) {
                                    var r = m.value,
                                        a = r ? r.substr(r.lastIndexOf(".")) : ""; !a || o && -1 == (o.join("") + ".").indexOf(a.toLowerCase() + ".") ? s(t.getLang("simpleupload.exceedTypeError")) : (domUtils.on(f, "load", (function i() {
                                            try {
                                                var n, o, r, a = (f.contentDocument || f.contentWindow.document).body,
                                                    l = a.innerText || a.textContent || "";
                                                o = new Function("return " + l)(),
                                                    n = t.options.imageUrlPrefix + o.url,
                                                    "SUCCESS" == o.state && o.url ? ((r = t.document.getElementById(e)).setAttribute("src", n), r.setAttribute("_src", n), r.setAttribute("title", o.title || ""), r.setAttribute("alt", o.original || ""), r.setAttribute("width", "100%"), r.setAttribute("height", "auto"), r.removeAttribute("id"), domUtils.removeClasses(r, "loadingclass"), t.simpleUploadStatus = !0, t.fireEvent("contentChange"), setTimeout((function () {
                                                        t.fireEvent("aftersimpleupload")
                                                    }), 500)) : s && s(o.state)
                                            } catch (d) {
                                                s && s(t.getLang("simpleupload.loadError"))
                                            }
                                            u.reset(),
                                                domUtils.un(f, "load", i)
                                        })), u.action = utils.formatUrl(n + (- 1 == n.indexOf("?") ? "?" : "&") + i), u.submit())
                                } else errorHandler(t.getLang("autoupload.errorLoadConfig"))
                            }
                            function s(i) {
                                if (e) {
                                    var n = t.document.getElementById(e);
                                    n && domUtils.remove(n),
                                        t.fireEvent("showmessage", {
                                            id: e,
                                            content: i,
                                            type: "error",
                                            timeout: 4e3
                                        })
                                }
                            }
                        })),
                            t.addListener("selectionchange", (function () {
                                clearTimeout(c),
                                    c = setTimeout((function () {
                                        var e = t.queryCommandState("simpleupload");
                                        m.disabled = -1 == e && "disabled"
                                    }), 400)
                            })),
                            i = !0
                    })),
                        r.style.cssText = a,
                        e.appendChild(r)
                }
                return {
                    bindEvents: {
                        ready: function () {
                            utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
                        },
                        simpleuploadbtnready: function (i, o) {
                            e = o,
                                t.afterConfigReady(n)
                        }
                    },
                    outputRule: function (e) {
                        utils.each(e.getNodesByTagName("img"), (function (e) {
                            / \b(loaderrorclass) | (bloaderrorclass)\b /.test(e.getAttr("class")) && e.parentNode.removeChild(e)
                        }))
                    },
                    commands: {
                        simpleupload: {
                            queryCommandState: function () {
                                return i ? 0 : -1
                            }
                        }
                    }
                }
            })), UE.plugin.register("serverparam", (function () {
                var e = {};
                return {
                    commands: {
                        serverparam: {
                            execCommand: function (t, i, n) {
                                null == i ? e = {} : utils.isString(i) ? null == n ? delete e[i] : e[i] = n : utils.isObject(i) ? utils.extend(e, i, !0) : utils.isFunction(i) && utils.extend(e, i(), !0)
                            },
                            queryCommandValue: function () {
                                return e || {}
                            }
                        }
                    }
                }
            })), UE.plugin.register("insertfile", (function () {
                var e = this;
                return {
                    commands: {
                        insertfile: {
                            execCommand: function (t, i) {
                                i = utils.isArray(i) ? i : [i];
                                var n, o, r, a, s, l, d, c = "",
                                    u = e.getOpt("UEDITOR_HOME_URL"),
                                    m = u + ("/" == u.substr(u.length - 1) ? "" : "/") + "dialogs/attachment/fileTypeImages/";
                                for (n = 0; n < i.length; n++) o = i[n],
                                    r = m + (s = o.url, l = void 0, d = void 0, l = s.substr(s.lastIndexOf(".") + 1).toLowerCase(), (d = {
                                        rar: "icon_rar.gif",
                                        zip: "icon_rar.gif",
                                        tar: "icon_rar.gif",
                                        gz: "icon_rar.gif",
                                        bz2: "icon_rar.gif",
                                        doc: "icon_doc.gif",
                                        docx: "icon_doc.gif",
                                        pdf: "icon_pdf.gif",
                                        mp3: "icon_mp3.gif",
                                        xls: "icon_xls.gif",
                                        chm: "icon_chm.gif",
                                        ppt: "icon_ppt.gif",
                                        pptx: "icon_ppt.gif",
                                        avi: "icon_mv.gif",
                                        rmvb: "icon_mv.gif",
                                        wmv: "icon_mv.gif",
                                        flv: "icon_mv.gif",
                                        swf: "icon_mv.gif",
                                        rm: "icon_mv.gif",
                                        exe: "icon_exe.gif",
                                        psd: "icon_psd.gif",
                                        txt: "icon_txt.gif",
                                        jpg: "icon_jpg.gif",
                                        png: "icon_jpg.gif",
                                        jpeg: "icon_jpg.gif",
                                        gif: "icon_jpg.gif",
                                        ico: "icon_jpg.gif",
                                        bmp: "icon_jpg.gif"
                                    })[l] ? d[l] : d.txt),
                                    a = o.title || o.url.substr(o.url.lastIndexOf("/") + 1),
                                    c += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' + r + '" _src="' + r + '" /><a style="font-size:12px; color:#0066cc;" href="' + o.url + '" title="' + a + '">' + a + "</a></p>";
                                e.execCommand("insertHtml", c)
                            }
                        }
                    }
                }
            })), UE.plugins.xssFilter = function () {
                var e, t = UEDITOR_CONFIG,
                    i = t.whitList;
                function n(e) {
                    var t = e.tagName,
                        n = e.attrs;
                    if (!i.hasOwnProperty(t)) return e.parentNode.removeChild(e),
                        !1;
                    UE.utils.each(n, (function (n, o) {
                        - 1 === i[t].indexOf(o) && e.setAttr(o)
                    }))
                }
                i && t.xssFilterRules && (this.options.filterRules = (e = {},
                    UE.utils.each(i, (function (t, i) {
                        e[i] = function (e) {
                            return n(e)
                        }
                    })), e));
                var o = [];
                UE.utils.each(i, (function (e, t) {
                    o.push(t)
                })),
                    i && t.inputXssFilter && this.addInputRule((function (e) {
                        e.traversal((function (e) {
                            if ("element" !== e.type) return !1;
                            n(e)
                        }))
                    })),
                    i && t.outputXssFilter && this.addOutputRule((function (e) {
                        e.traversal((function (e) {
                            if ("element" !== e.type) return !1;
                            n(e)
                        }))
                    }))
            };
        var baidu = baidu || {}; baidu.editor = baidu.editor || {},
            UE.ui = baidu.editor.ui = {},
            function () {
                var e = baidu.editor.browser,
                    t = baidu.editor.dom.domUtils,
                    i = window.$EDITORUI = {},
                    n = 0,
                    o = baidu.editor.ui.uiUtils = {
                        uid: function (e) {
                            return e ? e.ID$EDITORUI || (e.ID$EDITORUI = ++n) : ++n
                        },
                        hook: function (e, t) {
                            var i;
                            return e && e._callbacks ? i = e : (i = function () {
                                var t;
                                e && (t = e.apply(this, arguments));
                                for (var n = i._callbacks,
                                    o = n.length; o--;) {
                                    var r = n[o].apply(this, arguments);
                                    void 0 === t && (t = r)
                                }
                                return t
                            })._callbacks = [],
                                i._callbacks.push(t),
                                i
                        },
                        createElementByHtml: function (e) {
                            var t = document.createElement("div");
                            return t.innerHTML = e,
                                (t = t.firstChild).parentNode.removeChild(t),
                                t
                        },
                        getViewportElement: function () {
                            return e.ie && e.quirks ? document.body : document.documentElement
                        },
                        getClientRect: function (e) {
                            var i;
                            try {
                                i = e.getBoundingClientRect()
                            } catch (r) {
                                i = {
                                    left: 0,
                                    top: 0,
                                    height: 0,
                                    width: 0
                                }
                            }
                            for (var n, o = {
                                left: Math.round(i.left),
                                top: Math.round(i.top),
                                height: Math.round(i.bottom - i.top),
                                width: Math.round(i.right - i.left)
                            }; (n = e.ownerDocument) !== document && (e = t.getWindow(n).frameElement);) i = e.getBoundingClientRect(),
                                o.left += i.left,
                                o.top += i.top;
                            return o.bottom = o.top + o.height,
                                o.right = o.left + o.width,
                                o
                        },
                        getViewportRect: function () {
                            var e = o.getViewportElement(),
                                t = 0 | (window.innerWidth || e.clientWidth),
                                i = 0 | (window.innerHeight || e.clientHeight);
                            return {
                                left: 0,
                                top: 0,
                                height: i,
                                width: t,
                                bottom: i,
                                right: t
                            }
                        },
                        setViewportOffset: function (e, i) {
                            var n = o.getFixedLayer();
                            e.parentNode === n ? (e.style.left = i.left + "px", e.style.top = i.top + "px") : t.setViewportOffset(e, i)
                        },
                        getEventOffset: function (e) {
                            var t = e.target || e.srcElement,
                                i = o.getClientRect(t),
                                n = o.getViewportOffsetByEvent(e);
                            return {
                                left: n.left - i.left,
                                top: n.top - i.top
                            }
                        },
                        getViewportOffsetByEvent: function (e) {
                            var i = e.target || e.srcElement,
                                n = t.getWindow(i).frameElement,
                                r = {
                                    left: e.clientX,
                                    top: e.clientY
                                };
                            if (n && i.ownerDocument !== document) {
                                var a = o.getClientRect(n);
                                r.left += a.left,
                                    r.top += a.top
                            }
                            return r
                        },
                        setGlobal: function (e, t) {
                            return i[e] = t,
                                '$EDITORUI["' + e + '"]'
                        },
                        unsetGlobal: function (e) {
                            delete i[e]
                        },
                        copyAttributes: function (i, n) {
                            for (var o = n.attributes,
                                r = o.length; r--;) {
                                var a = o[r];
                                "style" == a.nodeName || "class" == a.nodeName || e.ie && !a.specified || i.setAttribute(a.nodeName, a.nodeValue)
                            }
                            n.className && t.addClass(i, n.className),
                                n.style.cssText && (i.style.cssText += ";" + n.style.cssText)
                        },
                        removeStyle: function (e, t) {
                            if (e.style.removeProperty) e.style.removeProperty(t);
                            else {
                                if (!e.style.removeAttribute) throw "";
                                e.style.removeAttribute(t)
                            }
                        },
                        contains: function (e, t) {
                            return e && t && e !== t && (e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t))
                        },
                        startDrag: function (e, t, i) {
                            i = i || document;
                            var n = e.clientX,
                                o = e.clientY;
                            function r(e) {
                                var i = e.clientX - n,
                                    r = e.clientY - o;
                                t.ondragmove(i, r, e),
                                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                            }
                            if (i.addEventListener) {
                                function a(e) {
                                    i.removeEventListener("mousemove", r, !0),
                                        i.removeEventListener("mouseup", a, !0),
                                        window.removeEventListener("mouseup", a, !0),
                                        t.ondragstop()
                                }
                                i.addEventListener("mousemove", r, !0),
                                    i.addEventListener("mouseup", a, !0),
                                    window.addEventListener("mouseup", a, !0),
                                    e.preventDefault()
                            } else {
                                var s = e.srcElement;
                                function l() {
                                    s.releaseCapture(),
                                        s.detachEvent("onmousemove", r),
                                        s.detachEvent("onmouseup", l),
                                        s.detachEvent("onlosecaptrue", l),
                                        t.ondragstop()
                                }
                                s.setCapture(),
                                    s.attachEvent("onmousemove", r),
                                    s.attachEvent("onmouseup", l),
                                    s.attachEvent("onlosecaptrue", l),
                                    e.returnValue = !1
                            }
                            t.ondragstart()
                        },
                        getFixedLayer: function () {
                            var i = document.getElementById("edui_fixedlayer");
                            return null == i && ((i = document.createElement("div")).id = "edui_fixedlayer", document.body.appendChild(i), e.ie && e.version <= 8 ? (i.style.position = "absolute", t.on(window, "scroll", r), t.on(window, "resize", baidu.editor.utils.defer(r, 0, !0)), setTimeout(r)) : i.style.position = "fixed", i.style.left = "0", i.style.top = "0", i.style.width = "0", i.style.height = "0"),
                                i
                        },
                        makeUnselectable: function (t) {
                            if (e.opera || e.ie && e.version < 9) {
                                if (t.unselectable = "on", t.hasChildNodes()) for (var i = 0; i < t.childNodes.length; i++) 1 == t.childNodes[i].nodeType && o.makeUnselectable(t.childNodes[i])
                            } else void 0 !== t.style.MozUserSelect ? t.style.MozUserSelect = "none" : void 0 !== t.style.WebkitUserSelect ? t.style.WebkitUserSelect = "none" : void 0 !== t.style.KhtmlUserSelect && (t.style.KhtmlUserSelect = "none")
                        }
                    };
                function r() {
                    var e = document.getElementById("edui_fixedlayer");
                    o.setViewportOffset(e, {
                        left: 0,
                        top: 0
                    })
                }
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.EventBase,
                    n = baidu.editor.ui.UIBase = function () { };
                n.prototype = {
                    className: "",
                    uiName: "",
                    initOptions: function (e) {
                        for (var i in e) this[i] = e[i];
                        this.id = this.id || "edui" + t.uid()
                    },
                    initUIBase: function () {
                        this._globalKey = e.unhtml(t.setGlobal(this.id, this))
                    },
                    render: function (e) {
                        for (var i, n = this.renderHtml(), o = t.createElementByHtml(n), r = domUtils.getElementsByTagName(o, "*"), a = "edui-" + (this.theme || this.editor.options.theme), s = document.getElementById("edui_fixedlayer"), l = 0; i = r[l++];) domUtils.addClass(i, a);
                        domUtils.addClass(o, a),
                            s && (s.className = "", domUtils.addClass(s, a));
                        var d = this.getDom();
                        null != d ? (d.parentNode.replaceChild(o, d), t.copyAttributes(o, d)) : ("string" == typeof e && (e = document.getElementById(e)), e = e || t.getFixedLayer(), domUtils.addClass(e, a), e.appendChild(o)),
                            this.postRender()
                    },
                    getDom: function (e) {
                        return e ? document.getElementById(this.id + "_" + e) : document.getElementById(this.id)
                    },
                    postRender: function () {
                        this.fireEvent("postrender")
                    },
                    getHtmlTpl: function () {
                        return ""
                    },
                    formatHtml: function (e) {
                        var t = "edui-" + this.uiName;
                        return e.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? t + "-" : "").replace(/%%/g, (this.uiName ? t : "") + " " + this.className).replace(/\$\$/g, this._globalKey)
                    },
                    renderHtml: function () {
                        return this.formatHtml(this.getHtmlTpl())
                    },
                    dispose: function () {
                        var e = this.getDom();
                        e && baidu.editor.dom.domUtils.remove(e),
                            t.unsetGlobal(this.id)
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.UIBase,
                    i = baidu.editor.ui.Separator = function (e) {
                        this.initOptions(e),
                            this.initSeparator()
                    };
                i.prototype = {
                    uiName: "separator",
                    initSeparator: function () {
                        this.initUIBase()
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-box %%"></div>'
                    }
                },
                    e.inherits(i, t)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.dom.domUtils,
                    i = baidu.editor.ui.UIBase,
                    n = baidu.editor.ui.uiUtils,
                    o = baidu.editor.ui.Mask = function (e) {
                        this.initOptions(e),
                            this.initUIBase()
                    };
                o.prototype = {
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
                    },
                    postRender: function () {
                        var e = this;
                        t.on(window, "resize", (function () {
                            setTimeout((function () {
                                e.isHidden() || e._fill()
                            }))
                        }))
                    },
                    show: function (e) {
                        this._fill(),
                            this.getDom().style.display = "",
                            this.getDom().style.zIndex = e
                    },
                    hide: function () {
                        this.getDom().style.display = "none",
                            this.getDom().style.zIndex = ""
                    },
                    isHidden: function () {
                        return "none" == this.getDom().style.display
                    },
                    _onMouseDown: function () {
                        return !1
                    },
                    _onClick: function (e, t) {
                        this.fireEvent("click", e, t)
                    },
                    _fill: function () {
                        var e = this.getDom(),
                            t = n.getViewportRect();
                        e.style.width = t.width + "px",
                            e.style.height = t.height + "px"
                    }
                },
                    e.inherits(o, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.dom.domUtils,
                    n = baidu.editor.ui.UIBase,
                    o = baidu.editor.ui.Popup = function (e) {
                        this.initOptions(e),
                            this.initPopup()
                    },
                    r = [];
                function a(e, t) {
                    for (var i = 0; i < r.length; i++) {
                        var n = r[i];
                        if (!n.isHidden() && !1 !== n.queryAutoHide(t)) {
                            if (e && /scroll/gi.test(e.type) && "edui-wordpastepop" == n.className) return;
                            n.hide()
                        }
                    }
                    r.length && n.editor.fireEvent("afterhidepop")
                }
                o.postHide = a;
                var s = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
                o.prototype = {
                    SHADOW_RADIUS: 5,
                    content: null,
                    _hidden: !1,
                    autoRender: !0,
                    canSideLeft: !0,
                    canSideUp: !0,
                    initPopup: function () {
                        this.initUIBase(),
                            r.push(this)
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>"
                    },
                    getContentHtmlTpl: function () {
                        return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : ""
                    },
                    _UIBase_postRender: n.prototype.postRender,
                    postRender: function () {
                        if (this.content instanceof n && this.content.postRender(), this.captureWheel && !this.captured) {
                            this.captured = !0;
                            var e = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
                                o = this.getDom().offsetHeight,
                                r = t.getClientRect(this.combox.getDom()).top,
                                a = this.getDom("content"),
                                s = this.getDom("body").getElementsByTagName("iframe"),
                                l = this;
                            for (s.length && (s = s[0]); r + o > e;) o -= 30;
                            a.style.height = o + "px",
                                s && (s.style.height = o + "px"),
                                window.XMLHttpRequest ? i.on(a, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", (function (e) {
                                    e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                                        e.wheelDelta ? a.scrollTop -= e.wheelDelta / 120 * 60 : a.scrollTop -= e.detail / -3 * 60
                                })) : i.on(this.getDom(), "mousewheel", (function (e) {
                                    e.returnValue = !1,
                                        l.getDom("content").scrollTop -= e.wheelDelta / 120 * 60
                                }))
                        }
                        this.fireEvent("postRenderAfter"),
                            this.hide(!0),
                            this._UIBase_postRender()
                    },
                    _doAutoRender: function () {
                        !this.getDom() && this.autoRender && this.render()
                    },
                    mesureSize: function () {
                        var e = this.getDom("content");
                        return t.getClientRect(e)
                    },
                    fitSize: function () {
                        if (this.captureWheel && this.sized) return this.__size;
                        this.sized = !0;
                        var e = this.getDom("body");
                        e.style.width = "",
                            e.style.height = "";
                        var t = this.mesureSize();
                        if (this.captureWheel) {
                            e.style.width = -(- 20 - t.width) + "px";
                            var i = parseInt(this.getDom("content").style.height, 10); !window.isNaN(i) && (t.height = i)
                        } else e.style.width = t.width + "px";
                        return e.style.height = t.height + "px",
                            this.__size = t,
                            this.captureWheel && (this.getDom("content").style.overflow = "auto"),
                            t
                    },
                    showAnchor: function (e, i) {
                        this.showAnchorRect(t.getClientRect(e), i)
                    },
                    showAnchorRect: function (e, n, o) {
                        this._doAutoRender();
                        var r = t.getViewportRect();
                        this.getDom().style.visibility = "hidden",
                            this._show();
                        var a, l, d, c, u = this.fitSize();
                        n ? (a = this.canSideLeft && e.right + u.width > r.right && e.left > u.width, l = this.canSideUp && e.top + u.height > r.bottom && e.bottom > u.height, d = a ? e.left - u.width : e.right, c = l ? e.bottom - u.height : e.top) : (a = this.canSideLeft && e.right + u.width > r.right && e.left > u.width, l = this.canSideUp && e.top + u.height > r.bottom && e.bottom > u.height, d = a ? e.right - u.width : e.left, c = l ? e.top - u.height : e.bottom);
                        var m = this.getDom();
                        t.setViewportOffset(m, {
                            left: d,
                            top: c
                        }),
                            i.removeClasses(m, s),
                            m.className += " " + s[2 * (l ? 1 : 0) + (a ? 1 : 0)],
                            this.editor && (m.style.zIndex = 1 * this.editor.container.style.zIndex + 10, baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = m.style.zIndex - 1),
                            this.getDom().style.visibility = "visible"
                    },
                    showAt: function (e) {
                        var t = e.left,
                            i = e.top,
                            n = {
                                left: t,
                                top: i,
                                right: t,
                                bottom: i,
                                height: 0,
                                width: 0
                            };
                        this.showAnchorRect(n, !1, !0)
                    },
                    _show: function () {
                        this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"))
                    },
                    isHidden: function () {
                        return this._hidden
                    },
                    show: function () {
                        this._doAutoRender(),
                            this._show()
                    },
                    hide: function (e) {
                        !this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, e || this.fireEvent("hide"))
                    },
                    queryAutoHide: function (e) {
                        return !e || !t.contains(this.getDom(), e)
                    }
                },
                    e.inherits(o, n),
                    i.on(document, "mousedown", (function (e) {
                        a(e, e.target || e.srcElement)
                    })),
                    i.on(window, "scroll", (function (e, t) {
                        a(e, t)
                    }))
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.UIBase,
                    i = baidu.editor.ui.ColorPicker = function (e) {
                        this.initOptions(e),
                            this.noColorText = this.noColorText || this.editor.getLang("clearColor"),
                            this.initUIBase()
                    };
                i.prototype = {
                    getHtmlTpl: function () {
                        return function (e, t) {
                            for (var i = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + e + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + t.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', o = 0; o < n.length; o++) o && o % 10 == 0 && (i += "</tr>" + (60 == o ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + t.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == o ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"),
                                i += o < 70 ? '<td style="padding: 0 2px;"><a hidefocus title="' + n[o] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + n[o] + '" style="background-color:#' + n[o] + ";border:solid #ccc;" + (o < 10 || o >= 60 ? "border-width:1px;" : o >= 10 && o < 20 ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
                            return i += "</tr></table></div>"
                        }(this.noColorText, this.editor)
                    },
                    _onTableClick: function (e) {
                        var t = (e.target || e.srcElement).getAttribute("data-color");
                        t && this.fireEvent("pickcolor", t)
                    },
                    _onTableOver: function (e) {
                        var t = (e.target || e.srcElement).getAttribute("data-color");
                        t && (this.getDom("preview").style.backgroundColor = t)
                    },
                    _onTableOut: function () {
                        this.getDom("preview").style.backgroundColor = ""
                    },
                    _onPickNoColor: function () {
                        this.fireEvent("picknocolor")
                    }
                },
                    e.inherits(i, t);
                var n = "ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,d8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,".split(",")
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.ui.UIBase,
                    n = baidu.editor.ui.TablePicker = function (e) {
                        this.initOptions(e),
                            this.initTablePicker()
                    };
                n.prototype = {
                    defaultNumRows: 10,
                    defaultNumCols: 10,
                    maxNumRows: 20,
                    maxNumCols: 20,
                    numRows: 10,
                    numCols: 10,
                    lengthOfCellSide: 22,
                    initTablePicker: function () {
                        this.initUIBase()
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
                    },
                    _UIBase_render: i.prototype.render,
                    render: function (e) {
                        this._UIBase_render(e),
                            this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
                    },
                    _track: function (e, t) {
                        var i = this.getDom("overlay").style,
                            n = this.lengthOfCellSide;
                        i.width = e * n + "px",
                            i.height = t * n + "px",
                            this.getDom("label").innerHTML = e + this.editor.getLang("t_col") + " x " + t + this.editor.getLang("t_row"),
                            this.numCols = e,
                            this.numRows = t
                    },
                    _onMouseOver: function (e, i) {
                        var n = e.relatedTarget || e.fromElement;
                        t.contains(i, n) || i === n || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
                    },
                    _onMouseOut: function (e, i) {
                        var n = e.relatedTarget || e.toElement;
                        t.contains(i, n) || i === n || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
                    },
                    _onMouseMove: function (e, i) {
                        this.getDom("overlay").style;
                        var n = t.getEventOffset(e),
                            o = this.lengthOfCellSide,
                            r = Math.ceil(n.left / o),
                            a = Math.ceil(n.top / o);
                        this._track(r, a)
                    },
                    _onClick: function () {
                        this.fireEvent("picktable", this.numCols, this.numRows)
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e = baidu.editor.browser,
                    t = baidu.editor.dom.domUtils,
                    i = baidu.editor.ui.uiUtils,
                    n = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (e.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
                baidu.editor.ui.Stateful = {
                    alwalysHoverable: !1,
                    target: null,
                    Stateful_init: function () {
                        this._Stateful_dGetHtmlTpl = this.getHtmlTpl,
                            this.getHtmlTpl = this.Stateful_getHtmlTpl
                    },
                    Stateful_getHtmlTpl: function () {
                        return this._Stateful_dGetHtmlTpl().replace(/stateful/g, (function () {
                            return n
                        }))
                    },
                    Stateful_onMouseEnter: function (e, t) {
                        if (this.target = t, !this.isDisabled() || this.alwalysHoverable) {
                            this.addState("hover");
                            var i = document.getElementById("newTitleSpan");
                            if (i && i.parentNode.removeChild(i), t.children[0].children[0].getAttribute("newtitle") || t.getAttribute("newtitle")) {
                                var n = t.children[0].children[0].getAttribute("newtitle") ? t.children[0].children[0].getAttribute("newtitle") : t.getAttribute("newtitle"),
                                    o = document.createElement("span");
                                o.setAttribute("id", "newTitleSpan"),
                                    o.setAttribute("class", "newTitlePosition"),
                                    "全屏" == n ? o.setAttribute("style", "top:" + (e.clientY + 25) + "px; left: " + (e.clientX - 25) + "px;") : o.setAttribute("style", "top:" + (e.clientY + 25) + "px; left: " + e.clientX + "px;");
                                var r = document.createTextNode(n);
                                o.appendChild(r),
                                    t.parentNode.parentNode.appendChild(o)
                            }
                            this.fireEvent("over")
                        }
                    },
                    Stateful_onMouseLeave: function (e, t) {
                        if (!this.isDisabled() || this.alwalysHoverable) {
                            this.removeState("hover"),
                                this.removeState("active");
                            var i = document.getElementById("newTitleSpan");
                            i && i.parentNode.removeChild(i),
                                this.fireEvent("out")
                        }
                    },
                    Stateful_onMouseOver: function (e, t) {
                        var n = e.relatedTarget;
                        i.contains(t, n) || t === n || this.Stateful_onMouseEnter(e, t)
                    },
                    Stateful_onMouseOut: function (e, t) {
                        var n = e.relatedTarget;
                        i.contains(t, n) || t === n || this.Stateful_onMouseLeave(e, t)
                    },
                    Stateful_onMouseDown: function (e, t) {
                        this.isDisabled() || this.addState("active")
                    },
                    Stateful_onMouseUp: function (e, t) {
                        this.isDisabled() || this.removeState("active")
                    },
                    Stateful_postRender: function () {
                        this.disabled && !this.hasState("disabled") && this.addState("disabled")
                    },
                    hasState: function (e) {
                        return t.hasClass(this.getStateDom(), "edui-state-" + e)
                    },
                    addState: function (e) {
                        this.hasState(e) || (this.getStateDom().className += " edui-state-" + e)
                    },
                    removeState: function (e) {
                        this.hasState(e) && t.removeClasses(this.getStateDom(), ["edui-state-" + e])
                    },
                    getStateDom: function () {
                        return this.getDom("state")
                    },
                    isChecked: function () {
                        return this.hasState("checked")
                    },
                    setChecked: function (e) {
                        !this.isDisabled() && e ? this.addState("checked") : this.removeState("checked")
                    },
                    isDisabled: function () {
                        return this.hasState("disabled")
                    },
                    setDisabled: function (e) {
                        e ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
                    }
                }
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.UIBase,
                    i = baidu.editor.ui.Stateful,
                    n = baidu.editor.ui.Button = function (e) {
                        if (e.name) {
                            var t = e.name,
                                i = e.cssRules;
                            e.className || (e.className = "edui-for-" + t),
                                e.cssRules = ".edui-default  .edui-for-" + t + " .edui-icon {" + i + "}"
                        }
                        this.initOptions(e),
                            this.initButton()
                    };
                n.prototype = {
                    uiName: "button",
                    label: "",
                    title: "",
                    showIcon: !0,
                    showText: !0,
                    cssRules: "",
                    initButton: function () {
                        this.initUIBase(),
                            this.Stateful_init(),
                            this.cssRules && e.cssRule("edui-customize-" + this.name + "-style", this.cssRules)
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'newtitle="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>"
                    },
                    postRender: function () {
                        this.Stateful_postRender(),
                            this.setDisabled(this.disabled)
                    },
                    _onMouseDown: function (e) {
                        var t = e.target || e.srcElement,
                            i = t && t.tagName && t.tagName.toLowerCase();
                        if ("input" == i || "object" == i || "object" == i) return !1
                    },
                    _onClick: function () {
                        this.isDisabled() || this.fireEvent("click")
                    },
                    setTitle: function (e) {
                        this.getDom("label").innerHTML = e
                    },
                    setTitle: function () {
                        console.log(this)
                    }
                },
                    e.inherits(n, t),
                    e.extend(n.prototype, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = (baidu.editor.dom.domUtils, baidu.editor.ui.UIBase),
                    n = baidu.editor.ui.Stateful,
                    o = baidu.editor.ui.SplitButton = function (e) {
                        this.initOptions(e),
                            this.initSplitButton()
                    };
                o.prototype = {
                    popup: null,
                    uiName: "splitbutton",
                    title: "",
                    initSplitButton: function () {
                        this.initUIBase(),
                            this.Stateful_init();
                        if (null != this.popup) {
                            var e = this.popup;
                            this.popup = null,
                                this.setPopup(e)
                        }
                    },
                    _UIBase_postRender: i.prototype.postRender,
                    postRender: function () {
                        this.Stateful_postRender(),
                            this._UIBase_postRender()
                    },
                    setPopup: function (i) {
                        this.popup !== i && (null != this.popup && this.popup.dispose(), i.addListener("show", e.bind(this._onPopupShow, this)), i.addListener("hide", e.bind(this._onPopupHide, this)), i.addListener("postrender", e.bind((function () {
                            i.getDom("body").appendChild(t.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (t.getClientRect(this.getDom()).width + 20) + 'px"></div>')),
                                i.getDom().className += " " + this.className
                        }), this)), this.popup = i)
                    },
                    _onPopupShow: function () {
                        this.addState("opened")
                    },
                    _onPopupHide: function () {
                        this.removeState("opened")
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'newtitle="' + this.title + '"' : "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
                    },
                    showPopup: function () {
                        var e = t.getClientRect(this.getDom());
                        e.top -= this.popup.SHADOW_RADIUS,
                            e.height += this.popup.SHADOW_RADIUS,
                            this.popup.showAnchorRect(e)
                    },
                    _onArrowClick: function (e, t) {
                        this.isDisabled() || this.showPopup()
                    },
                    _onButtonClick: function () {
                        this.isDisabled() || this.fireEvent("buttonclick")
                    }
                },
                    e.inherits(o, i),
                    e.extend(o.prototype, n, !0)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.ui.ColorPicker,
                    n = baidu.editor.ui.Popup,
                    o = baidu.editor.ui.SplitButton,
                    r = baidu.editor.ui.ColorButton = function (e) {
                        this.initOptions(e),
                            this.initColorButton()
                    };
                r.prototype = {
                    initColorButton: function () {
                        var e = this;
                        this.popup = new n({
                            content: new i({
                                noColorText: e.editor.getLang("clearColor"),
                                editor: e.editor,
                                onpickcolor: function (t, i) {
                                    e._onPickColor(i)
                                },
                                onpicknocolor: function (t, i) {
                                    e._onPickNoColor(i)
                                }
                            }),
                            editor: e.editor
                        }),
                            this.initSplitButton()
                    },
                    _SplitButton_postRender: o.prototype.postRender,
                    postRender: function () {
                        this._SplitButton_postRender(),
                            this.getDom("button_body").appendChild(t.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')),
                            this.getDom().className += " edui-colorbutton"
                    },
                    setColor: function (e) {
                        this.getDom("colorlump").style.backgroundColor = e,
                            this.color = e
                    },
                    _onPickColor: function (e) {
                        !1 !== this.fireEvent("pickcolor", e) && (this.setColor(e), this.popup.hide())
                    },
                    _onPickNoColor: function (e) {
                        !1 !== this.fireEvent("picknocolor") && this.popup.hide()
                    }
                },
                    e.inherits(r, o)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Popup,
                    i = baidu.editor.ui.TablePicker,
                    n = baidu.editor.ui.SplitButton,
                    o = baidu.editor.ui.TableButton = function (e) {
                        this.initOptions(e),
                            this.initTableButton()
                    };
                o.prototype = {
                    initTableButton: function () {
                        var e = this;
                        this.popup = new t({
                            content: new i({
                                editor: e.editor,
                                onpicktable: function (t, i, n) {
                                    e._onPickTable(i, n)
                                }
                            }),
                            editor: e.editor
                        }),
                            this.initSplitButton()
                    },
                    _onPickTable: function (e, t) {
                        !1 !== this.fireEvent("picktable", e, t) && this.popup.hide()
                    }
                },
                    e.inherits(o, n)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.UIBase,
                    i = baidu.editor.ui.AutoTypeSetPicker = function (e) {
                        this.initOptions(e),
                            this.initAutoTypeSetPicker()
                    };
                i.prototype = {
                    initAutoTypeSetPicker: function () {
                        this.initUIBase()
                    },
                    getHtmlTpl: function () {
                        var e = this.editor,
                            t = e.options.autotypeset,
                            i = e.getLang("autoTypeSet"),
                            n = "textAlignValue" + e.uid,
                            o = "imageBlockLineValue" + e.uid,
                            r = "symbolConverValue" + e.uid;
                        return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (t.mergeEmptyline ? "checked" : "") + ">" + i.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (t.removeEmptyline ? "checked" : "") + ">" + i.delLine + '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (t.removeClass ? "checked" : "") + ">" + i.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (t.indent ? "checked" : "") + ">" + i.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (t.textAlign ? "checked" : "") + ">" + i.alignment + '</td><td colspan="2" id="' + n + '"><input type="radio" name="' + n + '" value="left" ' + (t.textAlign && "left" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + n + '" value="center" ' + (t.textAlign && "center" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + n + '" value="right" ' + (t.textAlign && "right" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (t.imageBlockLine ? "checked" : "") + ">" + i.imageFloat + '</td><td nowrap id="' + o + '"><input type="radio" name="' + o + '" value="none" ' + (t.imageBlockLine && "none" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("default") + '<input type="radio" name="' + o + '" value="left" ' + (t.imageBlockLine && "left" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + o + '" value="center" ' + (t.imageBlockLine && "center" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + o + '" value="right" ' + (t.imageBlockLine && "right" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (t.clearFontSize ? "checked" : "") + ">" + i.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (t.clearFontFamily ? "checked" : "") + ">" + i.removeFontFamily + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (t.removeEmptyNode ? "checked" : "") + ">" + i.removeHtml + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (t.pasteFilter ? "checked" : "") + ">" + i.pasteFilter + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (t.bdc2sb || t.tobdc ? "checked" : "") + ">" + i.symbol + '</td><td id="' + r + '"><input type="radio" name="bdc" value="bdc2sb" ' + (t.bdc2sb ? "checked" : "") + ">" + i.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (t.tobdc ? "checked" : "") + ">" + i.tobdc + '</td><td nowrap align="right"><button >' + i.run + "</button></td></tr></table></div></div>"
                    },
                    _UIBase_render: t.prototype.render
                },
                    e.inherits(i, t)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Popup,
                    i = baidu.editor.ui.AutoTypeSetPicker,
                    n = baidu.editor.ui.SplitButton,
                    o = baidu.editor.ui.AutoTypeSetButton = function (e) {
                        this.initOptions(e),
                            this.initAutoTypeSetButton()
                    };
                function r(t) {
                    for (var i, n = {},
                        o = t.getDom(), r = t.editor.uid, a = null, s = domUtils.getElementsByTagName(o, "input"), l = s.length - 1; i = s[l--];) if ("checkbox" == i.getAttribute("type")) if (n[a = i.getAttribute("name")] && delete n[a], i.checked) {
                            var d = document.getElementById(a + "Value" + r);
                            if (d) {
                                if (/input/gi.test(d.tagName)) n[a] = d.value;
                                else for (var c, u = d.getElementsByTagName("input"), m = u.length - 1; c = u[m--];) if (c.checked) {
                                    n[a] = c.value;
                                    break
                                }
                            } else n[a] = !0
                        } else n[a] = !1;
                        else n[i.getAttribute("value")] = i.checked;
                    var f, h = domUtils.getElementsByTagName(o, "select");
                    for (l = 0; f = h[l++];) {
                        var p = f.getAttribute("name");
                        n[p] = n[p] ? f.value : ""
                    }
                    e.extend(t.editor.options.autotypeset, n),
                        t.editor.setPreferences("autotypeset", n)
                }
                o.prototype = {
                    initAutoTypeSetButton: function () {
                        var e = this;
                        this.popup = new t({
                            content: new i({
                                editor: e.editor
                            }),
                            editor: e.editor,
                            hide: function () {
                                !this._hidden && this.getDom() && (r(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
                            }
                        });
                        var n = 0;
                        this.popup.addListener("postRenderAfter", (function () {
                            var t = this;
                            if (!n) {
                                var i = this.getDom();
                                i.getElementsByTagName("button")[0].onclick = function () {
                                    r(t),
                                        e.editor.execCommand("autotypeset"),
                                        t.hide()
                                },
                                    domUtils.on(i, "click", (function (i) {
                                        var n = i.target || i.srcElement,
                                            o = e.editor.uid;
                                        if (n && "INPUT" == n.tagName) {
                                            if ("imageBlockLine" == n.name || "textAlign" == n.name || "symbolConver" == n.name) for (var a = n.checked,
                                                s = document.getElementById(n.name + "Value" + o).getElementsByTagName("input"), l = {
                                                    imageBlockLine: "none",
                                                    textAlign: "left",
                                                    symbolConver: "tobdc"
                                                },
                                                d = 0; d < s.length; d++) a ? s[d].value == l[n.name] && (s[d].checked = "checked") : s[d].checked = !1;
                                            if (n.name == "imageBlockLineValue" + o || n.name == "textAlignValue" + o || "bdc" == n.name) {
                                                var c = n.parentNode.previousSibling.getElementsByTagName("input");
                                                c && (c[0].checked = !0)
                                            }
                                            r(t)
                                        }
                                    })),
                                    n = 1
                            }
                        })),
                            this.initSplitButton()
                    }
                },
                    e.inherits(o, n)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Popup,
                    i = baidu.editor.ui.Stateful,
                    n = baidu.editor.ui.UIBase,
                    o = baidu.editor.ui.CellAlignPicker = function (e) {
                        this.initOptions(e),
                            this.initSelected(),
                            this.initCellAlignPicker()
                    };
                o.prototype = {
                    initSelected: function () {
                        var e = {
                            top: 0,
                            middle: 1,
                            bottom: 2
                        },
                            t = {
                                left: 0,
                                center: 1,
                                right: 2
                            },
                            i = 3;
                        this.selected && (this.selectedIndex = e[this.selected.valign] * i + t[this.selected.align])
                    },
                    initCellAlignPicker: function () {
                        this.initUIBase(),
                            this.Stateful_init()
                    },
                    getHtmlTpl: function () {
                        for (var e = ["left", "center", "right"], t = null, i = -1, n = [], o = 0; o < 9; o++) t = this.selectedIndex === o ? ' class="edui-cellalign-selected" ' : "",
                            0 === (i = o % 3) && n.push("<tr>"),
                            n.push('<td index="' + o + '" ' + t + ' stateful><div class="edui-icon edui-' + e[i] + '"></div></td>'),
                            2 === i && n.push("</tr>");
                        return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + n.join("") + "</table></div></div>"
                    },
                    getStateDom: function () {
                        return this.target
                    },
                    _onClick: function (e) {
                        var i = e.target || e.srcElement;
                        /icon/.test(i.className) && (this.items[i.parentNode.getAttribute("index")].onclick(), t.postHide(e))
                    },
                    _UIBase_render: n.prototype.render
                },
                    e.inherits(o, n),
                    e.extend(o.prototype, i, !0)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Stateful,
                    i = baidu.editor.ui.uiUtils,
                    n = baidu.editor.ui.UIBase,
                    o = baidu.editor.ui.PastePicker = function (e) {
                        this.initOptions(e),
                            this.initPastePicker()
                    };
                o.prototype = {
                    initPastePicker: function () {
                        this.initUIBase(),
                            this.Stateful_init()
                    },
                    getHtmlTpl: function () {
                        return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
                    },
                    getStateDom: function () {
                        return this.target
                    },
                    format: function (e) {
                        this.editor.ui._isTransfer = !0,
                            this.editor.fireEvent("pasteTransfer", e)
                    },
                    _onClick: function (e) {
                        var t = domUtils.getNextDomNode(e),
                            n = i.getViewportRect().height,
                            o = i.getClientRect(t);
                        o.top + o.height > n ? t.style.top = -o.height - e.offsetHeight + "px" : t.style.top = "",
                            /hidden/gi.test(domUtils.getComputedStyle(t, "visibility")) ? (t.style.visibility = "visible", domUtils.addClass(e, "edui-state-opened")) : (t.style.visibility = "hidden", domUtils.removeClasses(e, "edui-state-opened"))
                    },
                    _UIBase_render: n.prototype.render
                },
                    e.inherits(o, n),
                    e.extend(o.prototype, t, !0)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.ui.UIBase,
                    n = baidu.editor.ui.Toolbar = function (e) {
                        this.initOptions(e),
                            this.initToolbar()
                    };
                n.prototype = {
                    items: null,
                    initToolbar: function () {
                        this.items = this.items || [],
                            this.initUIBase()
                    },
                    add: function (e, t) {
                        void 0 === t ? this.items.push(e) : this.items.splice(t, 0, e)
                    },
                    getHtmlTpl: function () {
                        for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
                        return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + e.join("") + "</div>"
                    },
                    postRender: function () {
                        for (var e = this.getDom(), i = 0; i < this.items.length; i++) this.items[i].postRender();
                        t.makeUnselectable(e)
                    },
                    _onMouseDown: function (e) {
                        var t = e.target || e.srcElement,
                            i = t && t.tagName && t.tagName.toLowerCase();
                        if ("input" == i || "object" == i || "object" == i) return !1
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.dom.domUtils,
                    i = baidu.editor.ui.uiUtils,
                    n = baidu.editor.ui.UIBase,
                    o = baidu.editor.ui.Popup,
                    r = baidu.editor.ui.Stateful,
                    a = baidu.editor.ui.CellAlignPicker,
                    s = baidu.editor.ui.Menu = function (e) {
                        this.initOptions(e),
                            this.initMenu()
                    },
                    l = {
                        renderHtml: function () {
                            return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
                        },
                        postRender: function () { },
                        queryAutoHide: function () {
                            return !0
                        }
                    };
                s.prototype = {
                    items: null,
                    uiName: "menu",
                    initMenu: function () {
                        this.items = this.items || [],
                            this.initPopup(),
                            this.initItems()
                    },
                    initItems: function () {
                        for (var e = 0; e < this.items.length; e++) {
                            var t = this.items[e];
                            "-" == t ? this.items[e] = this.getSeparator() : t instanceof d || (t.editor = this.editor, t.theme = this.editor.options.theme, this.items[e] = this.createItem(t))
                        }
                    },
                    getSeparator: function () {
                        return l
                    },
                    createItem: function (e) {
                        return e.menu = this,
                            new d(e)
                    },
                    _Popup_getContentHtmlTpl: o.prototype.getContentHtmlTpl,
                    getContentHtmlTpl: function () {
                        if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
                        for (var e = [], t = 0; t < this.items.length; t++) {
                            var i = this.items[t];
                            e[t] = i.renderHtml()
                        }
                        return '<div class="%%-body">' + e.join("") + "</div>"
                    },
                    _Popup_postRender: o.prototype.postRender,
                    postRender: function () {
                        for (var e = this,
                            n = 0; n < this.items.length; n++) {
                            var o = this.items[n];
                            o.ownerMenu = this,
                                o.postRender()
                        }
                        t.on(this.getDom(), "mouseover", (function (t) {
                            var n = (t = t || event).relatedTarget || t.fromElement,
                                o = e.getDom();
                            i.contains(o, n) || o === n || e.fireEvent("over")
                        })),
                            this._Popup_postRender()
                    },
                    queryAutoHide: function (e) {
                        if (e) {
                            if (i.contains(this.getDom(), e)) return !1;
                            for (var t = 0; t < this.items.length; t++) {
                                if (!1 === this.items[t].queryAutoHide(e)) return !1
                            }
                        }
                    },
                    clearItems: function () {
                        for (var e = 0; e < this.items.length; e++) {
                            var t = this.items[e];
                            clearTimeout(t._showingTimer),
                                clearTimeout(t._closingTimer),
                                t.subMenu && t.subMenu.destroy()
                        }
                        this.items = []
                    },
                    destroy: function () {
                        this.getDom() && t.remove(this.getDom()),
                            this.clearItems()
                    },
                    dispose: function () {
                        this.destroy()
                    }
                },
                    e.inherits(s, o);
                var d = baidu.editor.ui.MenuItem = function (e) {
                    if (this.initOptions(e), this.initUIBase(), this.Stateful_init(), this.subMenu && !(this.subMenu instanceof s)) if (e.className && -1 != e.className.indexOf("aligntd")) {
                        var i = this;
                        this.subMenu.selected = this.editor.queryCommandValue("cellalignment"),
                            this.subMenu = new o({
                                content: new a(this.subMenu),
                                parentMenu: i,
                                editor: i.editor,
                                destroy: function () {
                                    this.getDom() && t.remove(this.getDom())
                                }
                            }),
                            this.subMenu.addListener("postRenderAfter", (function () {
                                t.on(this.getDom(), "mouseover", (function () {
                                    i.addState("opened")
                                }))
                            }))
                    } else this.subMenu = new s(this.subMenu)
                };
                d.prototype = {
                    label: "",
                    subMenu: null,
                    ownerMenu: null,
                    uiName: "menuitem",
                    alwalysHoverable: !0,
                    getHtmlTpl: function () {
                        return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
                    },
                    postRender: function () {
                        var e = this;
                        this.addListener("over", (function () {
                            e.ownerMenu.fireEvent("submenuover", e),
                                e.subMenu && e.delayShowSubMenu()
                        })),
                            this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out", (function () {
                                e.delayHideSubMenu()
                            })), this.subMenu.addListener("over", (function () {
                                clearTimeout(e._closingTimer),
                                    e._closingTimer = null,
                                    e.addState("opened")
                            })), this.ownerMenu.addListener("hide", (function () {
                                e.hideSubMenu()
                            })), this.ownerMenu.addListener("submenuover", (function (t, i) {
                                i !== e && e.delayHideSubMenu()
                            })), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function (t) {
                                return (!t || !i.contains(e.getDom(), t)) && this._bakQueryAutoHide(t)
                            }),
                            this.getDom().style.tabIndex = "-1",
                            i.makeUnselectable(this.getDom()),
                            this.Stateful_postRender()
                    },
                    delayShowSubMenu: function () {
                        var e = this;
                        e.isDisabled() || (e.addState("opened"), clearTimeout(e._showingTimer), clearTimeout(e._closingTimer), e._closingTimer = null, e._showingTimer = setTimeout((function () {
                            e.showSubMenu()
                        }), 250))
                    },
                    delayHideSubMenu: function () {
                        var e = this;
                        e.isDisabled() || (e.removeState("opened"), clearTimeout(e._showingTimer), e._closingTimer || (e._closingTimer = setTimeout((function () {
                            e.hasState("opened") || e.hideSubMenu(),
                                e._closingTimer = null
                        }), 400)))
                    },
                    renderLabelHtml: function () {
                        return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
                    },
                    getStateDom: function () {
                        return this.getDom()
                    },
                    queryAutoHide: function (e) {
                        if (this.subMenu && this.hasState("opened")) return this.subMenu.queryAutoHide(e)
                    },
                    _onClick: function (e, t) {
                        this.hasState("disabled") || !1 !== this.fireEvent("click", e, t) && (this.subMenu ? this.showSubMenu() : o.postHide(e))
                    },
                    showSubMenu: function () {
                        var e = i.getClientRect(this.getDom());
                        e.right -= 5,
                            e.left += 2,
                            e.width -= 7,
                            e.top -= 4,
                            e.bottom += 4,
                            e.height += 8,
                            this.subMenu.showAnchorRect(e, !0, !0)
                    },
                    hideSubMenu: function () {
                        this.subMenu.hide()
                    }
                },
                    e.inherits(d, n),
                    e.extend(d.prototype, r, !0)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.ui.Menu,
                    n = baidu.editor.ui.SplitButton,
                    o = baidu.editor.ui.Combox = function (e) {
                        this.initOptions(e),
                            this.initCombox()
                    };
                o.prototype = {
                    uiName: "combox",
                    onbuttonclick: function () {
                        this.showPopup()
                    },
                    initCombox: function () {
                        var e = this;
                        this.items = this.items || [];
                        for (var t = 0; t < this.items.length; t++) {
                            var n = this.items[t];
                            n.uiName = "listitem",
                                n.index = t,
                                n.onclick = function () {
                                    e.selectByIndex(this.index)
                                }
                        }
                        this.popup = new i({
                            items: this.items,
                            uiName: "list",
                            editor: this.editor,
                            captureWheel: !0,
                            combox: this
                        }),
                            this.initSplitButton()
                    },
                    _SplitButton_postRender: n.prototype.postRender,
                    postRender: function () {
                        this._SplitButton_postRender(),
                            this.setLabel(this.label || ""),
                            this.setValue(this.initValue || "")
                    },
                    showPopup: function () {
                        var e = t.getClientRect(this.getDom());
                        e.top += 1,
                            e.bottom -= 1,
                            e.height -= 2,
                            this.popup.showAnchorRect(e)
                    },
                    getValue: function () {
                        return this.value
                    },
                    setValue: function (e) {
                        var t = this.indexByValue(e); - 1 != t ? (this.selectedIndex = t, this.setLabel(this.items[t].label), this.value = this.items[t].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(e)), this.value = e)
                    },
                    setLabel: function (e) {
                        this.getDom("button_body").innerHTML = e,
                            this.label = e
                    },
                    getLabelForUnknowValue: function (e) {
                        return e
                    },
                    indexByValue: function (e) {
                        for (var t = 0; t < this.items.length; t++) if (e == this.items[t].value) return t;
                        return - 1
                    },
                    getItem: function (e) {
                        return this.items[e]
                    },
                    selectByIndex: function (e) {
                        e < this.items.length && !1 !== this.fireEvent("select", e) && (this.selectedIndex = e, this.value = this.items[e].value, this.setLabel(this.items[e].label))
                    }
                },
                    e.inherits(o, n)
            }(),
            function () {
                var e, t, i, n = baidu.editor.utils,
                    o = baidu.editor.dom.domUtils,
                    r = baidu.editor.ui.uiUtils,
                    a = baidu.editor.ui.Mask,
                    s = baidu.editor.ui.UIBase,
                    l = baidu.editor.ui.Button,
                    d = baidu.editor.ui.Dialog = function (e) {
                        if (e.name) {
                            var t = e.name,
                                i = e.cssRules;
                            e.className || (e.className = "edui-for-" + t),
                                i && (e.cssRules = ".edui-default .edui-for-" + t + " .edui-dialog-content  {" + i + "}")
                        }
                        this.initOptions(n.extend({
                            autoReset: !0,
                            draggable: !0,
                            onok: function () { },
                            oncancel: function () { },
                            onclose: function (e, t) {
                                return t ? this.onok() : this.oncancel()
                            },
                            holdScroll: !1
                        },
                            e)),
                            this.initDialog()
                    };
                d.prototype = {
                    draggable: !1,
                    uiName: "dialog",
                    initDialog: function () {
                        var o = this,
                            r = this.editor.options.theme;
                        if (this.cssRules && n.cssRule("edui-customize-" + this.name + "-style", this.cssRules), this.initUIBase(), this.modalMask = e || (e = new a({
                            className: "edui-dialog-modalmask",
                            theme: r,
                            onclick: function () {
                                i && i.close(!1)
                            }
                        })), this.dragMask = t || (t = new a({
                            className: "edui-dialog-dragmask",
                            theme: r
                        })), this.closeButton = new l({
                            className: "edui-dialog-closebutton",
                            title: o.closeDialog,
                            theme: r,
                            onclick: function () {
                                o.close(!1)
                            }
                        }), this.fullscreen && this.initResizeEvent(), this.buttons) for (var s = 0; s < this.buttons.length; s++) this.buttons[s] instanceof l || (this.buttons[s] = new l(n.extend(this.buttons[s], {
                            editor: this.editor
                        },
                            !0)))
                    },
                    initResizeEvent: function () {
                        var e = this;
                        o.on(window, "resize", (function () {
                            e._hidden || void 0 === e._hidden || (e.__resizeTimer && window.clearTimeout(e.__resizeTimer), e.__resizeTimer = window.setTimeout((function () {
                                e.__resizeTimer = null;
                                var t = e.getDom(),
                                    i = e.getDom("content"),
                                    n = UE.ui.uiUtils.getClientRect(t),
                                    o = UE.ui.uiUtils.getClientRect(i),
                                    a = r.getViewportRect();
                                i.style.width = a.width - n.width + o.width + "px",
                                    i.style.height = a.height - n.height + o.height + "px",
                                    t.style.width = a.width + "px",
                                    t.style.height = a.height + "px",
                                    e.fireEvent("resize")
                            }), 100))
                        }))
                    },
                    fitSize: function () {
                        var e = this.getDom("body"),
                            t = this.mesureSize();
                        return e.style.width = t.width + "px",
                            e.style.height = t.height + "px",
                            t
                    },
                    safeSetOffset: function (e) {
                        var t = this.getDom(),
                            i = r.getViewportRect(),
                            n = r.getClientRect(t),
                            o = e.left;
                        o + n.width > i.right && (o = i.right - n.width);
                        var a = e.top;
                        a + n.height > i.bottom && (a = i.bottom - n.height),
                            t.style.left = Math.max(o, 0) + "px",
                            t.style.top = Math.max(a, 0) + "px"
                    },
                    showAtCenter: function () {
                        var e = r.getViewportRect();
                        if (this.fullscreen) {
                            var t = this.getDom(),
                                i = this.getDom("content");
                            t.style.display = "block";
                            var n = UE.ui.uiUtils.getClientRect(t),
                                a = UE.ui.uiUtils.getClientRect(i);
                            t.style.left = "-100000px",
                                i.style.width = e.width - n.width + a.width + "px",
                                i.style.height = e.height - n.height + a.height + "px",
                                t.style.width = e.width + "px",
                                t.style.height = e.height + "px",
                                t.style.left = 0,
                                this._originalContext = {
                                    html: {
                                        overflowX: document.documentElement.style.overflowX,
                                        overflowY: document.documentElement.style.overflowY
                                    },
                                    body: {
                                        overflowX: document.body.style.overflowX,
                                        overflowY: document.body.style.overflowY
                                    }
                                },
                                document.documentElement.style.overflowX = "hidden",
                                document.documentElement.style.overflowY = "hidden",
                                document.body.style.overflowX = "hidden",
                                document.body.style.overflowY = "hidden"
                        } else {
                            this.getDom().style.display = "";
                            var s = this.fitSize(),
                                l = 0 | this.getDom("titlebar").offsetHeight,
                                d = e.width / 2 - s.width / 2,
                                c = e.height / 2 - (s.height - l) / 2 - l,
                                u = this.getDom();
                            this.safeSetOffset({
                                left: Math.max(0 | d, 0),
                                top: Math.max(0 | c, 0)
                            }),
                                o.hasClass(u, "edui-state-centered") || (u.className += " edui-state-centered")
                        }
                        this._show()
                    },
                    getContentHtml: function () {
                        var e = "";
                        return "string" == typeof this.content ? e = this.content : this.iframeUrl && (e = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>'),
                            e
                    },
                    getHtmlTpl: function () {
                        var e = "";
                        if (this.buttons) {
                            for (var t = [], i = 0; i < this.buttons.length; i++) t[i] = this.buttons[i].renderHtml();
                            e = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + t.join("") + "</div></div>"
                        }
                        return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + e + "</div></div></div>"
                    },
                    postRender: function () {
                        this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide()),
                            this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
                        var e = this;
                        if (this.addListener("show", (function () {
                            e.modalMask.show(this.getDom().style.zIndex - 2)
                        })), this.addListener("hide", (function () {
                            e.modalMask.hide()
                        })), this.buttons) for (var t = 0; t < this.buttons.length; t++) this.buttons[t].postRender();
                        o.on(window, "resize", (function () {
                            setTimeout((function () {
                                e.isHidden() || e.safeSetOffset(r.getClientRect(e.getDom()))
                            }))
                        })),
                            this._hide()
                    },
                    mesureSize: function () {
                        var e = this.getDom("body"),
                            t = r.getClientRect(this.getDom("content")).width;
                        return e.style.width = t,
                            r.getClientRect(e)
                    },
                    _onTitlebarMouseDown: function (e, t) {
                        if (this.draggable) {
                            r.getViewportRect();
                            var i, n = this;
                            r.startDrag(e, {
                                ondragstart: function () {
                                    i = r.getClientRect(n.getDom()),
                                        n.getDom("contmask").style.visibility = "visible",
                                        n.dragMask.show(n.getDom().style.zIndex - 1)
                                },
                                ondragmove: function (e, t) {
                                    var o = i.left + e,
                                        r = i.top + t;
                                    n.safeSetOffset({
                                        left: o,
                                        top: r
                                    })
                                },
                                ondragstop: function () {
                                    n.getDom("contmask").style.visibility = "hidden",
                                        o.removeClasses(n.getDom(), ["edui-state-centered"]),
                                        n.dragMask.hide()
                                }
                            })
                        }
                    },
                    reset: function () {
                        this.getDom("content").innerHTML = this.getContentHtml(),
                            this.fireEvent("dialogafterreset")
                    },
                    _show: function () {
                        this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
                    },
                    isHidden: function () {
                        return this._hidden
                    },
                    _hide: function () {
                        if (!this._hidden) {
                            var e = this.getDom();
                            e.style.display = "none",
                                e.style.zIndex = "",
                                e.style.width = "",
                                e.style.height = "",
                                this._hidden = !0,
                                this.fireEvent("hide")
                        }
                    },
                    open: function () {
                        if (this.autoReset) try {
                            this.reset()
                        } catch (e) {
                            this.render(),
                                this.open()
                        }
                        if (this.showAtCenter(), this.iframeUrl) try {
                            this.getDom("iframe").focus()
                        } catch (t) { }
                        i = this
                    },
                    _onCloseButtonClick: function (e, t) {
                        this.close(!1)
                    },
                    close: function (e) {
                        if (!1 !== this.fireEvent("close", e)) {
                            this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext),
                                this._hide();
                            var t = this.getDom("content"),
                                i = this.getDom("iframe");
                            if (t && i) {
                                var n = i.contentDocument || i.contentWindow.document;
                                n && (n.body.innerHTML = ""),
                                    o.remove(t)
                            }
                        }
                    }
                },
                    n.inherits(d, s)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Menu,
                    i = baidu.editor.ui.SplitButton,
                    n = baidu.editor.ui.MenuButton = function (e) {
                        this.initOptions(e),
                            this.initMenuButton()
                    };
                n.prototype = {
                    initMenuButton: function () {
                        var e = this;
                        this.uiName = "menubutton",
                            this.popup = new t({
                                items: e.items,
                                className: e.className,
                                editor: e.editor
                            }),
                            this.popup.addListener("show", (function () {
                                for (var t = 0; t < this.items.length; t++) this.items[t].removeState("checked"),
                                    this.items[t].value == e._value && (this.items[t].addState("checked"), this.value = e._value)
                            })),
                            this.initSplitButton()
                    },
                    setValue: function (e) {
                        this._value = e
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.Popup,
                    i = baidu.editor.ui.SplitButton,
                    n = baidu.editor.ui.MultiMenuPop = function (e) {
                        this.initOptions(e),
                            this.initMultiMenu()
                    };
                n.prototype = {
                    initMultiMenu: function () {
                        var e = this;
                        this.popup = new t({
                            content: "",
                            editor: e.editor,
                            iframe_rendered: !1,
                            onshow: function () {
                                this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + e.id + '_iframe" src="' + e.iframeUrl + '" frameborder="0"></iframe>', e.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * e.editor.container.style.zIndex + 1))
                            }
                        }),
                            this.onbuttonclick = function () {
                                this.showPopup()
                            },
                            this.initSplitButton()
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e, t = baidu.editor.ui,
                    i = t.UIBase,
                    n = t.uiUtils,
                    o = baidu.editor.utils,
                    r = baidu.editor.dom.domUtils,
                    a = [],
                    s = !1,
                    l = t.ShortCutMenu = function (e) {
                        this.initOptions(e),
                            this.initShortCutMenu()
                    };
                function d(e) {
                    var t = e.target || e.srcElement;
                    if (!r.findParent(t, (function (e) {
                        return r.hasClass(e, "edui-shortcutmenu") || r.hasClass(e, "edui-popup")
                    }), !0)) for (var i, n = 0; i = a[n++];) i.hide()
                }
                l.postHide = d,
                    l.prototype = {
                        isHidden: !0,
                        SPACE: 5,
                        initShortCutMenu: function () {
                            this.items = this.items || [],
                                this.initUIBase(),
                                this.initItems(),
                                this.initEvent(),
                                a.push(this)
                        },
                        initEvent: function () {
                            var t = this,
                                i = t.editor.document;
                            r.on(i, "mousemove", (function (i) {
                                if (!1 === t.isHidden) {
                                    if (t.getSubMenuMark() || "contextmenu" == t.eventType) return;
                                    var n = !0,
                                        o = t.getDom(),
                                        r = o.offsetWidth,
                                        a = o.offsetHeight,
                                        s = r / 2 + t.SPACE,
                                        l = a / 2,
                                        d = Math.abs(i.screenX - t.left),
                                        c = Math.abs(i.screenY - t.top);
                                    clearTimeout(e),
                                        e = setTimeout((function () {
                                            c > 0 && c < l ? t.setOpacity(o, "1") : c > l && c < l + 70 ? (t.setOpacity(o, "0.5"), n = !1) : c > l + 70 && c < l + 140 && t.hide(),
                                                n && d > 0 && d < s ? t.setOpacity(o, "1") : d > s && d < s + 70 ? t.setOpacity(o, "0.5") : d > s + 70 && d < s + 140 && t.hide()
                                        }))
                                }
                            })),
                                browser.chrome && r.on(i, "mouseout", (function (e) {
                                    var i = e.relatedTarget || e.toElement;
                                    null != i && "HTML" != i.tagName || t.hide()
                                })),
                                t.editor.addListener("afterhidepop", (function () {
                                    t.isHidden || (s = !0)
                                }))
                        },
                        initItems: function () {
                            if (o.isArray(this.items)) for (var e = 0,
                                i = this.items.length; e < i; e++) {
                                var n = this.items[e].toLowerCase();
                                t[n] && (this.items[e] = new t[n](this.editor), this.items[e].className += " edui-shortcutsubmenu ")
                            }
                        },
                        setOpacity: function (e, t) {
                            browser.ie && browser.version < 9 ? e.style.filter = "alpha(opacity = " + 100 * parseFloat(t) + ");" : e.style.opacity = t
                        },
                        getSubMenuMark: function () {
                            s = !1;
                            for (var e, t = n.getFixedLayer(), i = r.getElementsByTagName(t, "div", (function (e) {
                                return r.hasClass(e, "edui-shortcutsubmenu edui-popup")
                            })), o = 0; e = i[o++];)"none" != e.style.display && (s = !0);
                            return s
                        },
                        show: function (e, t) {
                            var i = this,
                                o = {},
                                a = this.getDom(),
                                s = n.getFixedLayer();
                            function l(e) {
                                e.left < 0 && (e.left = 0),
                                    e.top < 0 && (e.top = 0),
                                    a.style.cssText = "position:absolute;left:" + e.left + "px;top:" + e.top + "px;"
                            }
                            function d(e) {
                                e.tagName || (e = e.getDom()),
                                    o.left = parseInt(e.style.left),
                                    o.top = parseInt(e.style.top),
                                    o.top -= a.offsetHeight + 15,
                                    l(o)
                            }
                            if (i.eventType = e.type, a.style.cssText = "display:block;left:-9999px", "contextmenu" == e.type && t) {
                                var c = r.getElementsByTagName(s, "div", "edui-contextmenu")[0];
                                c ? d(c) : i.editor.addListener("aftershowcontextmenu", (function (e, t) {
                                    d(t)
                                }))
                            } else (o = n.getViewportOffsetByEvent(e)).top -= a.offsetHeight + i.SPACE,
                                o.left += i.SPACE + 20,
                                l(o),
                                i.setOpacity(a, .2);
                            i.isHidden = !1,
                                i.left = e.screenX + a.offsetWidth / 2 - i.SPACE,
                                i.top = e.screenY - a.offsetHeight / 2 - i.SPACE,
                                i.editor && (a.style.zIndex = 1 * i.editor.container.style.zIndex + 10, s.style.zIndex = a.style.zIndex - 1)
                        },
                        hide: function () {
                            this.getDom() && (this.getDom().style.display = "none"),
                                this.isHidden = !0
                        },
                        postRender: function () {
                            if (o.isArray(this.items)) for (var e, t = 0; e = this.items[t++];) e.postRender()
                        },
                        getHtmlTpl: function () {
                            var e;
                            if (o.isArray(this.items)) {
                                e = [];
                                for (var t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
                                e = e.join("")
                            } else e = this.items;
                            return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + e + "</div>"
                        }
                    },
                    o.inherits(l, i),
                    r.on(document, "mousedown", (function (e) {
                        d(e)
                    })),
                    r.on(window, "scroll", (function (e) {
                        d(e)
                    }))
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.UIBase,
                    i = baidu.editor.ui.Breakline = function (e) {
                        this.initOptions(e),
                            this.initSeparator()
                    };
                i.prototype = {
                    uiName: "Breakline",
                    initSeparator: function () {
                        this.initUIBase()
                    },
                    getHtmlTpl: function () {
                        return "<br/>"
                    }
                },
                    e.inherits(i, t)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.dom.domUtils,
                    i = baidu.editor.ui.UIBase,
                    n = baidu.editor.ui.Message = function (e) {
                        this.initOptions(e),
                            this.initMessage()
                    };
                n.prototype = {
                    initMessage: function () {
                        this.initUIBase()
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">×</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
                    },
                    reset: function (e) {
                        var t = this;
                        e.keepshow || (clearTimeout(this.timer), t.timer = setTimeout((function () {
                            t.hide()
                        }), e.timeout || 4e3)),
                            void 0 !== e.content && t.setContent(e.content),
                            void 0 !== e.type && t.setType(e.type),
                            t.show()
                    },
                    postRender: function () {
                        var e = this,
                            i = this.getDom("closer");
                        i && t.on(i, "click", (function () {
                            e.hide()
                        }))
                    },
                    setContent: function (e) {
                        this.getDom("content").innerHTML = e
                    },
                    setType: function (e) {
                        e = e || "info";
                        var t = this.getDom("body");
                        t.className = t.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" + e)
                    },
                    getContent: function () {
                        return this.getDom("content").innerHTML
                    },
                    getType: function () {
                        var e = this.getDom("body").match(/edui-message-type-([\w-]+)/);
                        return e ? e[1] : ""
                    },
                    show: function () {
                        this.getDom().style.display = "block"
                    },
                    hide: function () {
                        var e = this.getDom();
                        e && (e.style.display = "none", e.parentNode && e.parentNode.removeChild(e))
                    }
                },
                    e.inherits(n, i)
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui,
                    i = t.Dialog;
                t.buttons = {},
                    t.Dialog = function (e) {
                        var t = new i(e);
                        return t.addListener("hide", (function () {
                            if (t.editor) {
                                var e = t.editor;
                                try {
                                    if (browser.gecko) {
                                        var i = e.window.scrollY,
                                            n = e.window.scrollX;
                                        e.body.focus(),
                                            e.window.scrollTo(n, i)
                                    } else e.focus()
                                } catch (o) { }
                            }
                        })),
                            t
                    };
                for (var n = {
                    anchor: "~/dialogs/anchor/anchor.html",
                    insertimage: "~/dialogs/image/image.html",
                    link: "~/dialogs/link/link.html",
                    spechars: "~/dialogs/spechars/spechars.html",
                    searchreplace: "~/dialogs/searchreplace/searchreplace.html",
                    map: "~/dialogs/map/map.html",
                    gmap: "~/dialogs/gmap/gmap.html",
                    insertvideo: "~/dialogs/video/video.html",
                    help: "~/dialogs/help/help.html",
                    preview: "~/dialogs/preview/preview.html",
                    emotion: "~/dialogs/emotion/emotion.html",
                    wordimage: "~/dialogs/wordimage/wordimage.html",
                    attachment: "~/dialogs/attachment/attachment.html",
                    insertframe: "~/dialogs/insertframe/insertframe.html?version=1",
                    edittip: "~/dialogs/table/edittip.html",
                    edittable: "~/dialogs/table/edittable.html",
                    edittd: "~/dialogs/table/edittd.html",
                    webapp: "~/dialogs/webapp/webapp.html",
                    snapscreen: "~/dialogs/snapscreen/snapscreen.html",
                    scrawl: "~/dialogs/scrawl/scrawl.html",
                    music: "~/dialogs/music/music.html",
                    template: "~/dialogs/template/template.html",
                    background: "~/dialogs/background/background.html",
                    charts: "~/dialogs/charts/charts.html",
                    mydialog: "~/dialogs/mydialog/mydialog.html"
                },
                    o = ["undo", "redo", "formatmatch", "bold", "italic", "underline", "fontborder", "touppercase", "tolowercase", "strikethrough", "subscript", "superscript", "source", "indent", "outdent", "blockquote", "pasteplain", "pagebreak", "selectall", "print", "horizontal", "removeformat", "time", "date", "unlink", "insertparagraphbeforetable", "insertrow", "insertcol", "mergeright", "mergedown", "deleterow", "deletecol", "splittorows", "splittocols", "splittocells", "mergecells", "deletetable", "drafts", "mydialog"], r = 0; l = o[r++];) l = l.toLowerCase(),
                        t[l] = function (e) {
                            return function (i) {
                                var n = new t.Button({
                                    className: "edui-for-" + e,
                                    title: i.options.labelMap[e] || i.getLang("labelMap." + e) || "",
                                    onclick: function () {
                                        i.execCommand(e)
                                    },
                                    theme: i.options.theme,
                                    showText: !1
                                });
                                return t.buttons[e] = n,
                                    i.addListener("selectionchange", (function (t, o, r) {
                                        var a = i.queryCommandState(e); - 1 == a ? (n.setDisabled(!0), n.setChecked(!1)) : r || (n.setDisabled(!1), n.setChecked(a))
                                    })),
                                    n
                            }
                        }(l);
                t.cleardoc = function (e) {
                    var i = new t.Button({
                        className: "edui-for-cleardoc",
                        title: e.options.labelMap.cleardoc || e.getLang("labelMap.cleardoc") || "",
                        theme: e.options.theme,
                        onclick: function () {
                            confirm(e.getLang("confirmClear")) && e.execCommand("cleardoc")
                        }
                    });
                    return t.buttons.cleardoc = i,
                        e.addListener("selectionchange", (function () {
                            i.setDisabled(- 1 == e.queryCommandState("cleardoc"))
                        })),
                        i
                };
                var a = {
                    justify: ["left", "right", "center", "justify"],
                    imagefloat: ["none", "left", "center", "right"],
                    directionality: ["ltr", "rtl"]
                };
                for (var s in a) !
                    function (e, i) {
                        for (var n, o = 0; n = i[o++];) !
                            function (i) {
                                t[e.replace("float", "") + i] = function (n) {
                                    var o = new t.Button({
                                        className: "edui-for-" + e.replace("float", "") + i,
                                        title: n.options.labelMap[e.replace("float", "") + i] || n.getLang("labelMap." + e.replace("float", "") + i) || "",
                                        theme: n.options.theme,
                                        onclick: function () {
                                            n.execCommand(e, i)
                                        }
                                    });
                                    return t.buttons[e] = o,
                                        n.addListener("selectionchange", (function (t, r, a) {
                                            o.setDisabled(- 1 == n.queryCommandState(e)),
                                                o.setChecked(n.queryCommandValue(e) == i && !a)
                                        })),
                                        o
                                }
                            }(n)
                    }(s, a[s]);
                var l;
                for (r = 0; l = ["backcolor", "forecolor"][r++];) t[l] = function (e) {
                    return function (i) {
                        var n = new t.ColorButton({
                            className: "edui-for-" + e,
                            color: "default",
                            title: i.options.labelMap[e] || i.getLang("labelMap." + e) || "",
                            editor: i,
                            onpickcolor: function (t, n) {
                                i.execCommand(e, n)
                            },
                            onpicknocolor: function () {
                                i.execCommand(e, "default"),
                                    this.setColor("transparent"),
                                    this.color = "default"
                            },
                            onbuttonclick: function () {
                                i.execCommand(e, this.color)
                            }
                        });
                        return t.buttons[e] = n,
                            i.addListener("selectionchange", (function () {
                                n.setDisabled(- 1 == i.queryCommandState(e))
                            })),
                            n
                    }
                }(l);
                var d = {
                    noOk: ["searchreplace", "help", "spechars", "webapp", "preview"],
                    ok: ["attachment", "anchor", "link", "insertimage", "map", "gmap", "insertframe", "wordimage", "insertvideo", "insertframe", "edittip", "edittable", "edittd", "scrawl", "template", "music", "background", "charts", "mydialog"]
                };
                for (var s in d) !
                    function (i, o) {
                        for (var r, a = 0; r = o[a++];) browser.opera && "searchreplace" === r ||
                            function (o) {
                                t[o] = function (r, a, s) {
                                    a = a || (r.options.iframeUrlMap || {})[o] || n[o],
                                        s = r.options.labelMap[o] || r.getLang("labelMap." + o) || "";
                                    var l;
                                    a && (l = new t.Dialog(e.extend({
                                        iframeUrl: r.ui.mapUrl(a),
                                        editor: r,
                                        className: "edui-for-" + o,
                                        title: s,
                                        holdScroll: "insertimage" === o,
                                        fullscreen: /charts|preview/.test(o),
                                        closeDialog: r.getLang("closeDialog")
                                    },
                                        "ok" == i ? {
                                            buttons: [{
                                                className: "edui-cancelbutton",
                                                label: r.getLang("cancel"),
                                                editor: r,
                                                onclick: function () {
                                                    l.close(!1)
                                                }
                                            },
                                            {
                                                className: "edui-okbutton",
                                                label: r.getLang("ok"),
                                                editor: r,
                                                onclick: function () {
                                                    l.close(!0)
                                                }
                                            }]
                                        } : {})), r.ui._dialogs[o + "Dialog"] = l);
                                    var d = new t.Button({
                                        className: "edui-for-" + o,
                                        title: s,
                                        onclick: function () {
                                            if (l) switch (o) {
                                                case "wordimage":
                                                    var e = r.execCommand("wordimage");
                                                    e && e.length && (l.render(), l.open());
                                                    break;
                                                case "scrawl":
                                                    -1 != r.queryCommandState("scrawl") && (l.render(), l.open());
                                                    break;
                                                default:
                                                    l.render(),
                                                        l.open()
                                            }
                                        },
                                        theme: r.options.theme,
                                        disabled: "scrawl" == o && -1 == r.queryCommandState("scrawl") || "charts" == o
                                    });
                                    return t.buttons[o] = d,
                                        r.addListener("selectionchange", (function () {
                                            if (!(o in {
                                                edittable: 1
                                            })) {
                                                var e = r.queryCommandState(o);
                                                d.getDom() && (d.setDisabled(- 1 == e), d.setChecked(e))
                                            }
                                        })),
                                        d
                                }
                            }(r.toLowerCase())
                    }(s, d[s]);
                t.snapscreen = function (e, i, o) {
                    o = e.options.labelMap.snapscreen || e.getLang("labelMap.snapscreen") || "";
                    var r = new t.Button({
                        className: "edui-for-snapscreen",
                        title: o,
                        onclick: function () {
                            e.execCommand("snapscreen")
                        },
                        theme: e.options.theme
                    });
                    if (t.buttons.snapscreen = r, i = i || (e.options.iframeUrlMap || {}).snapscreen || n.snapscreen) {
                        var a = new t.Dialog({
                            iframeUrl: e.ui.mapUrl(i),
                            editor: e,
                            className: "edui-for-snapscreen",
                            title: o,
                            buttons: [{
                                className: "edui-okbutton",
                                label: e.getLang("ok"),
                                editor: e,
                                onclick: function () {
                                    a.close(!0)
                                }
                            },
                            {
                                className: "edui-cancelbutton",
                                label: e.getLang("cancel"),
                                editor: e,
                                onclick: function () {
                                    a.close(!1)
                                }
                            }]
                        });
                        a.render(),
                            e.ui._dialogs.snapscreenDialog = a
                    }
                    return e.addListener("selectionchange", (function () {
                        r.setDisabled(- 1 == e.queryCommandState("snapscreen"))
                    })),
                        r
                },
                    t.insertcode = function (i, n, o) {
                        n = i.options.insertcode || [],
                            o = i.options.labelMap.insertcode || i.getLang("labelMap.insertcode") || "";
                        var r = [];
                        e.each(n, (function (e, t) {
                            r.push({
                                label: e,
                                value: t,
                                theme: i.options.theme,
                                renderLabelHtml: function () {
                                    return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
                                }
                            })
                        }));
                        var a = new t.Combox({
                            editor: i,
                            items: r,
                            onselect: function (e, t) {
                                i.execCommand("insertcode", this.items[t].value)
                            },
                            onbuttonclick: function () {
                                this.showPopup()
                            },
                            title: o,
                            initValue: o,
                            className: "edui-for-insertcode",
                            indexByValue: function (e) {
                                if (e) for (var t, i = 0; t = this.items[i]; i++) if (- 1 != t.value.indexOf(e)) return i;
                                return - 1
                            }
                        });
                        return t.buttons.insertcode = a,
                            i.addListener("selectionchange", (function (e, t, n) {
                                if (!n) if (- 1 == i.queryCommandState("insertcode")) a.setDisabled(!0);
                                else {
                                    a.setDisabled(!1);
                                    var r = i.queryCommandValue("insertcode");
                                    if (!r) return void a.setValue(o);
                                    r && (r = r.replace(/['"]/g, "").split(",")[0]),
                                        a.setValue(r)
                                }
                            })),
                            a
                    },
                    t.fontfamily = function (i, n, o) {
                        if (n = i.options.fontfamily || [], o = i.options.labelMap.fontfamily || i.getLang("labelMap.fontfamily") || "", n.length) {
                            for (var r, a = 0,
                                s = []; r = n[a]; a++) {
                                var l = i.getLang("fontfamily")[r.name] || "";
                                d = r.label || l,
                                    c = r.val,
                                    s.push({
                                        label: d,
                                        value: c,
                                        theme: i.options.theme,
                                        renderLabelHtml: function () {
                                            return '<div class="edui-label %%-label" style="font-family:' + e.unhtml(this.value) + '">' + (this.label || "") + "</div>"
                                        }
                                    })
                            }
                            var d, c, u = new t.Combox({
                                editor: i,
                                items: s,
                                onselect: function (e, t) {
                                    i.execCommand("FontFamily", this.items[t].value)
                                },
                                onbuttonclick: function () {
                                    this.showPopup()
                                },
                                title: o,
                                initValue: o,
                                className: "edui-for-fontfamily",
                                indexByValue: function (e) {
                                    if (e) for (var t, i = 0; t = this.items[i]; i++) if (- 1 != t.value.indexOf(e)) return i;
                                    return - 1
                                }
                            });
                            return t.buttons.fontfamily = u,
                                i.addListener("selectionchange", (function (e, t, n) {
                                    if (!n) if (- 1 == i.queryCommandState("FontFamily")) u.setDisabled(!0);
                                    else {
                                        u.setDisabled(!1);
                                        var o = i.queryCommandValue("FontFamily");
                                        o && (o = o.replace(/['"]/g, "").split(",")[0]),
                                            u.setValue(o)
                                    }
                                })),
                                u
                        }
                    },
                    t.fontsize = function (e, i, n) {
                        if (n = e.options.labelMap.fontsize || e.getLang("labelMap.fontsize") || "", (i = i || e.options.fontsize || []).length) {
                            for (var o = [], r = 0; r < i.length; r++) {
                                var a = i[r] + "px";
                                o.push({
                                    label: a,
                                    value: a,
                                    theme: e.options.theme,
                                    renderLabelHtml: function () {
                                        return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
                                    }
                                })
                            }
                            var s = new t.Combox({
                                editor: e,
                                items: o,
                                title: n,
                                initValue: n,
                                onselect: function (t, i) {
                                    e.execCommand("FontSize", this.items[i].value)
                                },
                                onbuttonclick: function () {
                                    this.showPopup()
                                },
                                className: "edui-for-fontsize"
                            });
                            return t.buttons.fontsize = s,
                                e.addListener("selectionchange", (function (t, i, n) {
                                    n || (- 1 == e.queryCommandState("FontSize") ? s.setDisabled(!0) : (s.setDisabled(!1), s.setValue(e.queryCommandValue("FontSize"))))
                                })),
                                s
                        }
                    },
                    t.paragraph = function (i, n, o) {
                        if (o = i.options.labelMap.paragraph || i.getLang("labelMap.paragraph") || "", n = i.options.paragraph || [], !e.isEmptyObject(n)) {
                            var r = [];
                            for (var a in n) r.push({
                                value: a,
                                label: n[a] || i.getLang("paragraph")[a],
                                theme: i.options.theme,
                                renderLabelHtml: function () {
                                    return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>"
                                }
                            });
                            var s = new t.Combox({
                                editor: i,
                                items: r,
                                title: o,
                                initValue: o,
                                className: "edui-for-paragraph",
                                onselect: function (e, t) {
                                    i.execCommand("Paragraph", this.items[t].value)
                                },
                                onbuttonclick: function () {
                                    this.showPopup()
                                }
                            });
                            return t.buttons.paragraph = s,
                                i.addListener("selectionchange", (function (e, t, n) {
                                    if (!n) if (- 1 == i.queryCommandState("Paragraph")) s.setDisabled(!0);
                                    else {
                                        s.setDisabled(!1);
                                        var o = i.queryCommandValue("Paragraph"); - 1 != s.indexByValue(o) ? s.setValue(o) : s.setValue(s.initValue)
                                    }
                                })),
                                s
                        }
                    },
                    t.customstyle = function (e) {
                        var i = e.options.customstyle || [],
                            n = e.options.labelMap.customstyle || e.getLang("labelMap.customstyle") || "";
                        if (i.length) {
                            for (var o, r = e.getLang("customstyle"), a = 0, s = []; o = i[a++];) !
                                function (t) {
                                    var i = {};
                                    i.label = t.label ? t.label : r[t.name],
                                        i.style = t.style,
                                        i.className = t.className,
                                        i.tag = t.tag,
                                        s.push({
                                            label: i.label,
                                            value: i,
                                            theme: e.options.theme,
                                            renderLabelHtml: function () {
                                                return '<div class="edui-label %%-label"><' + i.tag + " " + (i.className ? ' class="' + i.className + '"' : "") + (i.style ? ' style="' + i.style + '"' : "") + ">" + i.label + "</" + i.tag + "></div>"
                                            }
                                        })
                                }(o);
                            var l = new t.Combox({
                                editor: e,
                                items: s,
                                title: n,
                                initValue: n,
                                className: "edui-for-customstyle",
                                onselect: function (t, i) {
                                    e.execCommand("customstyle", this.items[i].value)
                                },
                                onbuttonclick: function () {
                                    this.showPopup()
                                },
                                indexByValue: function (e) {
                                    for (var t, i = 0; t = this.items[i++];) if (t.label == e) return i - 1;
                                    return - 1
                                }
                            });
                            return t.buttons.customstyle = l,
                                e.addListener("selectionchange", (function (t, i, n) {
                                    if (!n) if (- 1 == e.queryCommandState("customstyle")) l.setDisabled(!0);
                                    else {
                                        l.setDisabled(!1);
                                        var o = e.queryCommandValue("customstyle"); - 1 != l.indexByValue(o) ? l.setValue(o) : l.setValue(l.initValue)
                                    }
                                })),
                                l
                        }
                    },
                    t.inserttable = function (e, i, n) {
                        n = e.options.labelMap.inserttable || e.getLang("labelMap.inserttable") || "";
                        var o = new t.TableButton({
                            editor: e,
                            title: n,
                            className: "edui-for-inserttable",
                            onpicktable: function (t, i, n) {
                                e.execCommand("InsertTable", {
                                    numRows: n,
                                    numCols: i,
                                    border: 1
                                })
                            },
                            onbuttonclick: function () {
                                this.showPopup()
                            }
                        });
                        return t.buttons.inserttable = o,
                            e.addListener("selectionchange", (function () {
                                o.setDisabled(- 1 == e.queryCommandState("inserttable"))
                            })),
                            o
                    },
                    t.lineheight = function (e) {
                        var i = e.options.lineheight || [];
                        if (i.length) {
                            for (var n, o = 0,
                                r = []; n = i[o++];) r.push({
                                    label: n,
                                    value: n,
                                    theme: e.options.theme,
                                    onclick: function () {
                                        e.execCommand("lineheight", this.value)
                                    }
                                });
                            var a = new t.MenuButton({
                                editor: e,
                                className: "edui-for-lineheight",
                                title: e.options.labelMap.lineheight || e.getLang("labelMap.lineheight") || "",
                                items: r,
                                onbuttonclick: function () {
                                    var t = e.queryCommandValue("LineHeight") || this.value;
                                    e.execCommand("LineHeight", t)
                                }
                            });
                            return t.buttons.lineheight = a,
                                e.addListener("selectionchange", (function () {
                                    var t = e.queryCommandState("LineHeight");
                                    if (- 1 == t) a.setDisabled(!0);
                                    else {
                                        a.setDisabled(!1);
                                        var i = e.queryCommandValue("LineHeight");
                                        i && a.setValue((i + "").replace(/cm/, "")),
                                            a.setChecked(t)
                                    }
                                })),
                                a
                        }
                    };
                for (var c, u = ["top", "bottom"], m = 0; c = u[m++];) !
                    function (e) {
                        t["rowspacing" + e] = function (i) {
                            var n = i.options["rowspacing" + e] || [];
                            if (!n.length) return null;
                            for (var o, r = 0,
                                a = []; o = n[r++];) a.push({
                                    label: o,
                                    value: o,
                                    theme: i.options.theme,
                                    onclick: function () {
                                        i.execCommand("rowspacing", this.value, e)
                                    }
                                });
                            var s = new t.MenuButton({
                                editor: i,
                                className: "edui-for-rowspacing" + e,
                                title: i.options.labelMap["rowspacing" + e] || i.getLang("labelMap.rowspacing" + e) || "",
                                items: a,
                                onbuttonclick: function () {
                                    var t = i.queryCommandValue("rowspacing", e) || this.value;
                                    i.execCommand("rowspacing", t, e)
                                }
                            });
                            return t.buttons[e] = s,
                                i.addListener("selectionchange", (function () {
                                    var t = i.queryCommandState("rowspacing", e);
                                    if (- 1 == t) s.setDisabled(!0);
                                    else {
                                        s.setDisabled(!1);
                                        var n = i.queryCommandValue("rowspacing", e);
                                        n && s.setValue((n + "").replace(/%/, "")),
                                            s.setChecked(t)
                                    }
                                })),
                                s
                        }
                    }(c);
                for (var f, h = ["insertorderedlist", "insertunorderedlist"], p = 0; f = h[p++];) !
                    function (e) {
                        t[e] = function (i) {
                            var n = i.options[e],
                                o = function () {
                                    i.execCommand(e, this.value)
                                },
                                r = [];
                            for (var a in n) r.push({
                                label: n[a] || i.getLang()[e][a] || "",
                                value: a,
                                theme: i.options.theme,
                                onclick: o
                            });
                            var s = new t.MenuButton({
                                editor: i,
                                className: "edui-for-" + e,
                                title: i.getLang("labelMap." + e) || "",
                                items: r,
                                onbuttonclick: function () {
                                    var t = i.queryCommandValue(e) || this.value;
                                    i.execCommand(e, t)
                                }
                            });
                            return t.buttons[e] = s,
                                i.addListener("selectionchange", (function () {
                                    var t = i.queryCommandState(e);
                                    if (- 1 == t) s.setDisabled(!0);
                                    else {
                                        s.setDisabled(!1);
                                        var n = i.queryCommandValue(e);
                                        s.setValue(n),
                                            s.setChecked(t)
                                    }
                                })),
                                s
                        }
                    }(f);
                t.fullscreen = function (e, i) {
                    i = e.options.labelMap.fullscreen || e.getLang("labelMap.fullscreen") || "";
                    var n = new t.Button({
                        className: "edui-for-fullscreen",
                        title: i,
                        theme: e.options.theme,
                        onclick: function () {
                            e.ui && e.ui.setFullScreen(!e.ui.isFullScreen()),
                                this.setChecked(e.ui.isFullScreen())
                        }
                    });
                    return t.buttons.fullscreen = n,
                        e.addListener("selectionchange", (function () {
                            var t = e.queryCommandState("fullscreen");
                            n.setDisabled(- 1 == t),
                                n.setChecked(e.ui.isFullScreen())
                        })),
                        n
                },
                    t.emotion = function (e, i) {
                        var o = "emotion",
                            r = new t.MultiMenuPop({
                                title: e.options.labelMap[o] || e.getLang("labelMap." + o) || "",
                                editor: e,
                                className: "edui-for-" + o,
                                iframeUrl: e.ui.mapUrl(i || (e.options.iframeUrlMap || {})[o] || n[o])
                            });
                        return t.buttons[o] = r,
                            e.addListener("selectionchange", (function () {
                                r.setDisabled(- 1 == e.queryCommandState(o))
                            })),
                            r
                    },
                    t.autotypeset = function (e) {
                        var i = new t.AutoTypeSetButton({
                            editor: e,
                            title: e.options.labelMap.autotypeset || e.getLang("labelMap.autotypeset") || "",
                            className: "edui-for-autotypeset",
                            onbuttonclick: function () {
                                e.execCommand("autotypeset")
                            }
                        });
                        return t.buttons.autotypeset = i,
                            e.addListener("selectionchange", (function () {
                                i.setDisabled(- 1 == e.queryCommandState("autotypeset"))
                            })),
                            i
                    },
                    t.simpleupload = function (e) {
                        var i = "simpleupload",
                            n = new t.Button({
                                className: "edui-for-" + i,
                                title: e.options.labelMap[i] || e.getLang("labelMap." + i) || "",
                                onclick: function () { },
                                theme: e.options.theme,
                                showText: !1
                            });
                        return t.buttons[i] = n,
                            e.addListener("ready", (function () {
                                var t = n.getDom("body").children[0];
                                e.fireEvent("simpleuploadbtnready", t)
                            })),
                            e.addListener("selectionchange", (function (t, o, r) {
                                var a = e.queryCommandState(i); - 1 == a ? (n.setDisabled(!0), n.setChecked(!1)) : r || (n.setDisabled(!1), n.setChecked(a))
                            })),
                            n
                    },
                    t.addimgv2 = function (e) {
                        var i = "addimgv2",
                            n = new t.Button({
                                className: "edui-for-" + i,
                                title: e.options.labelMap[i] || e.getLang("labelMap." + i) || "",
                                onclick: function () {
                                    e.fireEvent("addimgv2")
                                },
                                theme: e.options.theme,
                                showText: !1
                            });
                        return t.buttons[i] = n,
                            n
                    },
                    t.addaudiov2 = function (e) {
                        var i = "addaudiov2",
                            n = new t.Button({
                                className: "edui-for-" + i,
                                title: e.options.labelMap[i] || e.getLang("labelMap." + i) || "",
                                onclick: function () {
                                    e.fireEvent("addaudiov2")
                                },
                                theme: e.options.theme,
                                showText: !1
                            });
                        return t.buttons[i] = n,
                            n
                    },
                    t.addvideov2 = function (e) {
                        var i = "addvideov2",
                            n = new t.Button({
                                className: "edui-for-" + i,
                                title: e.options.labelMap[i] || e.getLang("labelMap." + i) || "",
                                onclick: function () {
                                    e.fireEvent("addvideov2")
                                },
                                theme: e.options.theme,
                                showText: !1
                            });
                        return t.buttons[i] = n,
                            n
                    }
            }(),
            function () {
                var e = baidu.editor.utils,
                    t = baidu.editor.ui.uiUtils,
                    i = baidu.editor.ui.UIBase,
                    n = baidu.editor.dom.domUtils,
                    o = [];
                function r(e) {
                    this.initOptions(e),
                        this.initEditorUI()
                }
                r.prototype = {
                    uiName: "editor",
                    initEditorUI: function () {
                        this.editor.ui = this,
                            this._dialogs = {},
                            this.initUIBase(),
                            this._initToolbars();
                        var e = this.editor,
                            t = this;
                        e.addListener("ready", (function () {
                            if (e.getDialog = function (t) {
                                return e.ui._dialogs[t + "Dialog"]
                            },
                                n.on(e.window, "scroll", (function (e) {
                                    baidu.editor.ui.Popup.postHide(e)
                                })), e.ui._actualFrameWidth = e.options.initialFrameWidth, UE.browser.ie && 6 === UE.browser.version && e.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0), e.options.elementPathEnabled && (e.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + e.getLang("elementPathTip") + ":</div>"), e.options.wordCount) {
                                n.on(e.document, "click", (function () {
                                    a(e, t),
                                        n.un(e.document, "click", arguments.callee)
                                })),
                                    e.ui.getDom("wordcount").innerHTML = e.getLang("wordCountTip")
                            }
                            e.ui._scale(),
                                e.options.scaleEnabled ? (e.autoHeightEnabled && e.disableAutoHeight(), t.enableScale()) : t.disableScale(),
                                e.options.elementPathEnabled || e.options.wordCount || e.options.scaleEnabled || (e.ui.getDom("elementpath").style.display = "none", e.ui.getDom("wordcount").style.display = "none", e.ui.getDom("scale").style.display = "none"),
                                e.selection.isFocus() && e.fireEvent("selectionchange", !1, !0)
                        })),
                            e.addListener("mousedown", (function (e, t) {
                                var i = t.target || t.srcElement;
                                baidu.editor.ui.Popup.postHide(t, i),
                                    baidu.editor.ui.ShortCutMenu.postHide(t)
                            })),
                            e.addListener("delcells", (function () {
                                UE.ui.edittip && new UE.ui.edittip(e),
                                    e.getDialog("edittip").open()
                            }));
                        var i, o, r = !1;
                        function a(e, t) {
                            e.setOpt({
                                wordCount: !0,
                                maximumWords: 1e4,
                                wordCountMsg: e.options.wordCountMsg || e.getLang("wordCountMsg"),
                                wordOverFlowMsg: e.options.wordOverFlowMsg || e.getLang("wordOverFlowMsg")
                            });
                            var i = e.options,
                                n = i.maximumWords,
                                o = i.wordCountMsg,
                                r = i.wordOverFlowMsg,
                                a = t.getDom("wordcount");
                            if (i.wordCount) {
                                var s = e.getContentLength(!0);
                                s > n ? (a.innerHTML = r, e.fireEvent("wordcountoverflow")) : a.innerHTML = o.replace("{#leave}", n - s).replace("{#count}", s)
                            }
                        }
                        e.addListener("afterpaste", (function () {
                            e.queryCommandState("pasteplain") || (baidu.editor.ui.PastePicker && (i = new baidu.editor.ui.Popup({
                                content: new baidu.editor.ui.PastePicker({
                                    editor: e
                                }),
                                editor: e,
                                className: "edui-wordpastepop"
                            })).render(), r = !0)
                        })),
                            e.addListener("afterinserthtml", (function () {
                                clearTimeout(o),
                                    o = setTimeout((function () {
                                        if (i && (r || e.ui._isTransfer)) {
                                            if (i.isHidden()) {
                                                var t = n.createElement(e.document, "span", {
                                                    style: "line-height:0px;",
                                                    innerHTML: "\ufeff"
                                                });
                                                e.selection.getRange().insertNode(t);
                                                var o = getDomNode(t, "firstChild", "previousSibling");
                                                o && i.showAnchor(3 == o.nodeType ? o.parentNode : o),
                                                    n.remove(t)
                                            } else i.show();
                                            delete e.ui._isTransfer,
                                                r = !1
                                        }
                                    }), 200)
                            })),
                            e.addListener("contextmenu", (function (e, t) {
                                baidu.editor.ui.Popup.postHide(t)
                            })),
                            e.addListener("keydown", (function (e, t) {
                                i && i.dispose(t);
                                var n = t.keyCode || t.which;
                                t.altKey && 90 == n && UE.ui.buttons.fullscreen.onclick()
                            })),
                            e.addListener("wordcount", (function (e) {
                                a(this, t)
                            })),
                            e.addListener("selectionchange", (function () {
                                e.options.elementPathEnabled && t[(- 1 == e.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"](),
                                    e.options.scaleEnabled && t[(- 1 == e.queryCommandState("scale") ? "dis" : "en") + "ableScale"]()
                            }));
                        var s = new baidu.editor.ui.Popup({
                            editor: e,
                            content: "",
                            className: "edui-bubble",
                            _onEditButtonClick: function () {
                                this.hide(),
                                    e.ui._dialogs.linkDialog.open()
                            },
                            _onImgEditButtonClick: function (t) {
                                this.hide(),
                                    e.ui._dialogs[t] && e.ui._dialogs[t].open()
                            },
                            _onImgSetFloat: function (t) {
                                this.hide(),
                                    e.execCommand("imagefloat", t)
                            },
                            _setIframeAlign: function (e) {
                                var t = s.anchorEl,
                                    i = t.cloneNode(!0);
                                switch (e) {
                                    case - 2: i.setAttribute("align", "");
                                        break;
                                    case - 1: i.setAttribute("align", "left");
                                        break;
                                    case 1:
                                        i.setAttribute("align", "right")
                                }
                                t.parentNode.insertBefore(i, t),
                                    n.remove(t),
                                    s.anchorEl = i,
                                    s.showAnchor(s.anchorEl)
                            },
                            _updateIframe: function () {
                                var t = e._iframe = s.anchorEl;
                                n.hasClass(t, "ueditor_baidumap") ? (e.selection.getRange().selectNode(t).select(), e.ui._dialogs.mapDialog.open(), s.hide()) : (e.ui._dialogs.insertframeDialog.open(), s.hide())
                            },
                            _onRemoveButtonClick: function (t) {
                                e.execCommand(t),
                                    this.hide()
                            },
                            queryAutoHide: function (t) {
                                return t && t.ownerDocument == e.document && ("img" == t.tagName.toLowerCase() || n.findParentByTagName(t, "a", !0)) ? t !== s.anchorEl : baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, t)
                            }
                        });
                        s.render(),
                            e.options.imagePopup && (e.addListener("mouseover", (function (t, i) {
                                var n = (i = i || window.event).target || i.srcElement;
                                if (e.ui._dialogs.insertframeDialog && /iframe/gi.test(n.tagName)) {
                                    var o = s.formatHtml("<nobr>" + e.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + e.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + e.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + e.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + e.getLang("modify") + "</span></nobr>");
                                    o ? (s.getDom("content").innerHTML = o, s.anchorEl = n, s.showAnchor(s.anchorEl)) : s.hide()
                                }
                            })), e.addListener("selectionchange", (function (t, i) {
                                if (i) {
                                    var o = "",
                                        r = "",
                                        a = e.selection.getRange().getClosedNode(),
                                        l = e.ui._dialogs;
                                    if (a && "IMG" == a.tagName) {
                                        var d = "insertimageDialog";
                                        if (- 1 == a.className.indexOf("edui-faked-video") && -1 == a.className.indexOf("edui-upload-video") || (d = "insertvideoDialog"), -1 != a.className.indexOf("edui-faked-webapp") && (d = "webappDialog"), -1 != a.src.indexOf("http://api.map.baidu.com") && (d = "mapDialog"), -1 != a.className.indexOf("edui-faked-music") && (d = "musicDialog"), -1 != a.src.indexOf("http://maps.google.com/maps/api/staticmap") && (d = "gmapDialog"), a.getAttribute("anchorname") && (d = "anchorDialog", o = s.formatHtml("<nobr>" + e.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + e.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + e.getLang("delete") + "</span></nobr>")), a.getAttribute("word_img") && (e.word_img = [a.getAttribute("word_img")], d = "wordimageDialog"), (n.hasClass(a, "loadingclass") || n.hasClass(a, "loaderrorclass")) && (d = ""), !l[d]) return;
                                        r = "<nobr>" + e.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + e.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + e.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + e.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + e.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + d + '\');" class="edui-clickable">' + e.getLang("modify") + "</span></nobr>",
                                            !o && (o = s.formatHtml(r))
                                    }
                                    if (e.ui._dialogs.linkDialog) {
                                        var c, u = e.queryCommandValue("link");
                                        if (u && (c = u.getAttribute("_href") || u.getAttribute("href", 2))) {
                                            var m = c;
                                            c.length > 30 && (m = c.substring(0, 20) + "..."),
                                                o && (o += '<div style="height:5px;"></div>'),
                                                o += s.formatHtml("<nobr>" + e.getLang("anthorMsg") + ': <a target="_blank" href="' + c + '" title="' + c + '" >' + m + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + e.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + e.getLang("clear") + "</span></nobr>"),
                                                s.showAnchor(u)
                                        }
                                    }
                                    o ? (s.getDom("content").innerHTML = o, s.anchorEl = a || u, s.showAnchor(s.anchorEl)) : s.hide()
                                }
                            })))
                    },
                    _initToolbars: function () {
                        for (var t = this.editor,
                            i = this.toolbars || [], n = [], o = 0; o < i.length; o++) {
                            for (var r = i[o], a = new baidu.editor.ui.Toolbar({
                                theme: t.options.theme
                            }), s = 0; s < r.length; s++) {
                                var l = r[s],
                                    d = null;
                                if ("string" == typeof l) {
                                    if ("|" == (l = l.toLowerCase()) && (l = "Separator"), "||" == l && (l = "Breakline"), baidu.editor.ui[l] && (d = new baidu.editor.ui[l](t)), "fullscreen" == l) {
                                        n && n[0] ? n[0].items.splice(0, 0, d) : d && a.items.splice(0, 0, d);
                                        continue
                                    }
                                } else d = l;
                                d && d.id && a.add(d)
                            }
                            n[o] = a
                        }
                        e.each(UE._customizeUI, (function (e, i) {
                            var n, o;
                            if (e.id && e.id != t.key) return !1; (n = e.execFn.call(t, t, i)) && (void 0 === (o = e.index) && (o = a.items.length), a.add(n, o))
                        })),
                            this.toolbars = n
                    },
                    getHtmlTpl: function () {
                        return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar">友情提示：支持粘贴第三方编辑器复制内容</td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
                    },
                    showWordImageDialog: function () {
                        this._dialogs.wordimageDialog.open()
                    },
                    renderToolbarBoxHtml: function () {
                        for (var e = [], t = 0; t < this.toolbars.length; t++) e.push(this.toolbars[t].renderHtml());
                        return e.join("")
                    },
                    setFullScreen: function (e) {
                        var t = this.editor,
                            i = t.container.parentNode.parentNode;
                        if (this._fullscreen != e) {
                            if (this._fullscreen = e, this.editor.fireEvent("beforefullscreenchange", e), baidu.editor.browser.gecko) var n = t.selection.getRange().createBookmark();
                            if (e) {
                                for (;
                                    "BODY" != i.tagName;) {
                                    var r = baidu.editor.dom.domUtils.getComputedStyle(i, "position");
                                    o.push(r),
                                        i.style.position = "static",
                                        i = i.parentNode
                                }
                                this._bakHtmlOverflow = document.documentElement.style.overflow,
                                    this._bakBodyOverflow = document.body.style.overflow,
                                    this._bakAutoHeight = this.editor.autoHeightEnabled,
                                    this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                                    this._bakEditorContaninerWidth = t.iframe.parentNode.offsetWidth,
                                    this._bakAutoHeight && (t.autoHeightEnabled = !1, this.editor.disableAutoHeight()),
                                    document.documentElement.style.overflow = "hidden",
                                    window.scrollTo(0, window.scrollY),
                                    this._bakCssText = this.getDom().style.cssText,
                                    this._bakCssText1 = this.getDom("iframeholder").style.cssText,
                                    t.iframe.parentNode.style.width = "",
                                    this._updateFullScreen()
                            } else {
                                for (;
                                    "BODY" != i.tagName;) i.style.position = o.shift(),
                                        i = i.parentNode;
                                this.getDom().style.cssText = this._bakCssText,
                                    this.getDom("iframeholder").style.cssText = this._bakCssText1,
                                    this._bakAutoHeight && (t.autoHeightEnabled = !0, this.editor.enableAutoHeight()),
                                    document.documentElement.style.overflow = this._bakHtmlOverflow,
                                    document.body.style.overflow = this._bakBodyOverflow,
                                    t.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px",
                                    window.scrollTo(0, this._bakScrollTop)
                            }
                            if (browser.gecko && "true" === t.body.contentEditable) {
                                var a = document.createElement("input");
                                document.body.appendChild(a),
                                    t.body.contentEditable = !1,
                                    setTimeout((function () {
                                        a.focus(),
                                            setTimeout((function () {
                                                t.body.contentEditable = !0,
                                                    t.fireEvent("fullscreenchanged", e),
                                                    t.selection.getRange().moveToBookmark(n).select(!0),
                                                    baidu.editor.dom.domUtils.remove(a),
                                                    e && window.scroll(0, 0)
                                            }), 0)
                                    }), 0)
                            }
                            "true" === t.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", e), this.triggerLayout())
                        }
                    },
                    _updateFullScreen: function () {
                        if (this._fullscreen) {
                            var e = t.getViewportRect();
                            if (this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + e.width + "px;height:" + e.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100), t.setViewportOffset(this.getDom(), {
                                left: 0,
                                top: this.editor.options.topOffset || 0
                            }), this.editor.setHeight(e.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0), browser.gecko) try {
                                window.onresize()
                            } catch (i) { }
                        }
                    },
                    _updateElementPath: function () {
                        var e, t = this.getDom("elementpath");
                        if (this.elementPathEnabled && (e = this.editor.queryCommandValue("elementpath"))) {
                            for (var i, n = [], o = 0; i = e[o]; o++) n[o] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + o + '&quot;);">' + i + "</span>");
                            t.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + n.join(" &gt; ") + "</div>"
                        } else t.style.display = "none"
                    },
                    disableElementPath: function () {
                        var e = this.getDom("elementpath");
                        e.innerHTML = "",
                            e.style.display = "none",
                            this.elementPathEnabled = !1
                    },
                    enableElementPath: function () {
                        this.getDom("elementpath").style.display = "",
                            this.elementPathEnabled = !0,
                            this._updateElementPath()
                    },
                    _scale: function () {
                        var e = document,
                            t = this.editor,
                            i = t.container,
                            o = t.document,
                            r = this.getDom("toolbarbox"),
                            a = this.getDom("bottombar"),
                            s = this.getDom("scale"),
                            l = this.getDom("scalelayer"),
                            d = !1,
                            c = null,
                            u = 0,
                            m = t.options.minFrameWidth,
                            f = 0,
                            h = 0,
                            p = 0,
                            g = 0;
                        function b() {
                            c = n.getXY(i),
                                u || (u = t.options.minFrameHeight + r.offsetHeight + a.offsetHeight),
                                l.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + i.offsetWidth + "px;height:" + i.offsetHeight + "px;z-index:" + (t.options.zIndex + 1),
                                n.on(e, "mousemove", y),
                                n.on(o, "mouseup", C),
                                n.on(e, "mouseup", C)
                        }
                        var v = this;
                        function y(t) {
                            N();
                            var i = t || window.event;
                            f = i.pageX || e.documentElement.scrollLeft + i.clientX,
                                h = i.pageY || e.documentElement.scrollTop + i.clientY,
                                p = f - c.x,
                                g = h - c.y,
                                p >= m && (d = !0, l.style.width = p + "px"),
                                g >= u && (d = !0, l.style.height = g + "px")
                        }
                        function C() {
                            d && (d = !1, t.ui._actualFrameWidth = l.offsetWidth - 2, i.style.width = t.ui._actualFrameWidth + "px", t.setHeight(l.offsetHeight - a.offsetHeight - r.offsetHeight - 2, !0)),
                                l && (l.style.display = "none"),
                                N(),
                                n.un(e, "mousemove", y),
                                n.un(o, "mouseup", C),
                                n.un(e, "mouseup", C)
                        }
                        function N() {
                            browser.ie ? e.selection.clear() : window.getSelection().removeAllRanges()
                        }
                        this.editor.addListener("fullscreenchanged", (function (e, t) {
                            if (t) v.disableScale();
                            else if (v.editor.options.scaleEnabled) {
                                v.enableScale();
                                var i = v.editor.document.createElement("span");
                                v.editor.body.appendChild(i),
                                    v.editor.body.style.height = Math.max(n.getXY(i).y, v.editor.iframe.offsetHeight - 20) + "px",
                                    n.remove(i)
                            }
                        })),
                            this.enableScale = function () {
                                1 != t.queryCommandState("source") && (s.style.display = "", this.scaleEnabled = !0, n.on(s, "mousedown", b))
                            },
                            this.disableScale = function () {
                                s.style.display = "none",
                                    this.scaleEnabled = !1,
                                    n.un(s, "mousedown", b)
                            }
                    },
                    isFullScreen: function () {
                        return this._fullscreen
                    },
                    postRender: function () {
                        i.prototype.postRender.call(this);
                        for (var e = 0; e < this.toolbars.length; e++) this.toolbars[e].postRender();
                        var t, n = this,
                            o = baidu.editor.dom.domUtils,
                            r = function () {
                                clearTimeout(t),
                                    t = setTimeout((function () {
                                        n._updateFullScreen()
                                    }))
                            };
                        o.on(window, "resize", r),
                            n.addListener("destroy", (function () {
                                o.un(window, "resize", r),
                                    clearTimeout(t)
                            }))
                    },
                    showToolbarMsg: function (e, t) {
                        (this.getDom("toolbarmsg_label").innerHTML = e, this.getDom("toolbarmsg").style.display = "", t) || (this.getDom("upload_dialog").style.display = "none")
                    },
                    hideToolbarMsg: function () {
                        this.getDom("toolbarmsg").style.display = "none"
                    },
                    mapUrl: function (e) {
                        return e ? e.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
                    },
                    triggerLayout: function () {
                        var e = this.getDom();
                        "1" == e.style.zoom ? e.style.zoom = "100%" : e.style.zoom = "1"
                    }
                },
                    e.inherits(r, baidu.editor.ui.UIBase);
                var a = {};
                UE.ui.Editor = function (t) {
                    var i = new UE.Editor(t);
                    i.options.editor = i,
                        e.loadFile(document, {
                            href: i.options.themePath + i.options.theme + "/css/ueditor.evil.css?v1",
                            tag: "link",
                            type: "text/css",
                            rel: "stylesheet"
                        });
                    var o = i.render;
                    return i.render = function (t) {
                        t.constructor === String && (i.key = t, a[t] = i),
                            e.domReady((function () {
                                function e() {
                                    if (i.setOpt({
                                        labelMap: i.options.labelMap || i.getLang("labelMap")
                                    }), new r(i.options), t && (t.constructor === String && (t = document.getElementById(t)), t && t.getAttribute("name") && (i.options.textarea = t.getAttribute("name")), t && /script|textarea/gi.test(t.tagName))) {
                                        var e = document.createElement("div");
                                        t.parentNode.insertBefore(e, t);
                                        var a = t.value || t.innerHTML;
                                        i.options.initialContent = /^[\t\r\n ]*$/.test(a) ? i.options.initialContent : a.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><"),
                                            t.className && (e.className = t.className),
                                            t.style.cssText && (e.style.cssText = t.style.cssText),
                                            /textarea/i.test(t.tagName) ? (i.textarea = t, i.textarea.style.display = "none") : t.parentNode.removeChild(t),
                                            t.id && (e.id = t.id, n.removeAttributes(t, "id")),
                                            (t = e).innerHTML = ""
                                    }
                                    n.addClass(t, "edui-" + i.options.theme),
                                        i.ui.render(t);
                                    var s = i.options;
                                    i.container = i.ui.getDom();
                                    for (var l = n.findParents(t, !0), d = [], c = 0; m = l[c]; c++) d[c] = m.style.display,
                                        m.style.display = "block";
                                    if (s.initialFrameWidth) s.minFrameWidth = s.initialFrameWidth;
                                    else {
                                        s.minFrameWidth = s.initialFrameWidth = t.offsetWidth;
                                        var u = t.style.width;
                                        /%$/.test(u) && (s.initialFrameWidth = u)
                                    }
                                    s.initialFrameHeight ? s.minFrameHeight = s.initialFrameHeight : s.initialFrameHeight = s.minFrameHeight = t.offsetHeight;
                                    var m;
                                    for (c = 0; m = l[c]; c++) m.style.display = d[c];
                                    t.style.height && (t.style.height = ""),
                                        i.container.style.width = s.initialFrameWidth + (/%$/.test(s.initialFrameWidth) ? "" : "px"),
                                        i.container.style.zIndex = s.zIndex,
                                        o.call(i, i.ui.getDom("iframeholder")),
                                        i.fireEvent("afteruiready")
                                }
                                i.langIsReady ? e() : i.addListener("langReady", e)
                            }))
                    },
                        i
                },
                    UE.getEditor = function (e, t) {
                        var i = a[e];
                        return i || (i = a[e] = new UE.ui.Editor(t)).render(e),
                            i
                    },
                    UE.delEditor = function (e) {
                        var t; (t = a[e]) && (t.key && t.destroy(), delete a[e])
                    },
                    UE.registerUI = function (t, i, n, o) {
                        e.each(t.split(/\s+/), (function (e) {
                            UE._customizeUI[e] = {
                                id: o,
                                execFn: i,
                                index: n
                            }
                        }))
                    }
            }(), UE.registerUI("message", (function (e) {
                var t, i = baidu.editor.ui.Message,
                    n = [],
                    o = e;
                function r() {
                    var e = o.ui.getDom("toolbarbox");
                    e && (t.style.top = e.offsetHeight + 3 + "px"),
                        t.style.zIndex = Math.max(o.options.zIndex, o.iframe.style.zIndex) + 1
                }
                o.addListener("ready", (function () {
                    t = document.getElementById(o.ui.id + "_message_holder"),
                        r(),
                        setTimeout((function () {
                            r()
                        }), 500)
                })),
                    o.addListener("showmessage", (function (e, a) {
                        a = utils.isString(a) ? {
                            content: a
                        } : a;
                        var s = new i({
                            timeout: a.timeout,
                            type: a.type,
                            content: a.content,
                            keepshow: a.keepshow,
                            editor: o
                        }),
                            l = a.id || "msg_" + (+ new Date).toString(36);
                        return s.render(t),
                            n[l] = s,
                            s.reset(a),
                            r(),
                            l
                    })),
                    o.addListener("updatemessage", (function (e, i, o) {
                        o = utils.isString(o) ? {
                            content: o
                        } : o;
                        var r = n[i];
                        r.render(t),
                            r && r.reset(o)
                    })),
                    o.addListener("hidemessage", (function (e, t) {
                        var i = n[t];
                        i && i.hide()
                    }))
            })), UE.registerUI("autosave", (function (e) {
                var t = null,
                    i = null;
                e.on("afterautosave", (function () {
                    clearTimeout(t),
                        t = setTimeout((function () {
                            i && e.trigger("hidemessage", i),
                                i = e.trigger("showmessage", {
                                    content: e.getLang("autosave.success"),
                                    timeout: 2e3
                                })
                        }), 2e3)
                }))
            }))
    }(), window.onload = function () {
        var e = document.getElementsByClassName("edui-editor-bottombar");
        if (console.log(e), e.length) for (var t = 0; n = e[t++];) n.innerHTML = "友情提示：支持第三方微信编辑器的内容复制";
        var i = document.getElementsByClassName("edui-for-xiumi-connect");
        if (i.length) {
            var n;
            for (t = 0; n = i[t++];) n.className = n.className + " active"
        }
    };