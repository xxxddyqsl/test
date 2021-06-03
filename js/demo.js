// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined'
// 		? (module.exports = factory())
// 		: typeof define === 'function' && define.amd
// 		? define(factory)
// 		: (global.RongScreenShare = factory(global));
// 	alert(11111);
// })(window, function (win) {
// 	'use strict';
// 	var Keys = {
// 		CHECK: 'rong-check-share-installed',
// 		CHECK_RESPONSE: 'rong-share-installed',
// 		GET: 'rong-share-get',
// 		GET_RESPONSE: 'rong-share-get-response',
// 		CLEAR_BOX: 'rong-share-clear-box',
// 	};
// });
// (function( global, factory ) {

// }(this,function(window){}));

// (function (global, factory) {
// 	if (typeof module === 'object' && typeof module.exports === 'object') {
// 		module.exports = global.document
// 			? factory(global, true)
// 			: function (w) {
// 					if (!w.document) {
// 						throw new Error(
// 							'jQuery requires a window with a document'
// 						);
// 					}

// 					return factory(w);
// 			  };
// 	} else {
// 		factory(global);
// 	}
// })(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
// 	var mode = {
// 		key: 0,
// 		ale: function (e) {
// 			alert(e);
// 		},
// 	};
// 	var jQuery = function (a) {
// 		alert(a);
// 		console.log('jQuery');
// 	};

// 	// if (typeof define === 'function' && define.amd) {
// 	// 	define('mode', [], function () {
// 	// 		return mode;
// 	// 	});
// 	// }

// 	strundefined = typeof undefined;

// 	if (typeof noGlobal === strundefined) {
// 		window.mode = window.$ = mode;
// 	}

// 	return mode;
// });

(function (global, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		// AMD规范. 注册一个匿名模块，兼容AMD与CMD
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		//CommonJS规范，NodeJS运行环境
		module.exports = factory();
	} else {
		//浏览器全局对象注册
		global.UMD = factory();
	}
})(this, function () {
	var msg = 'UMD!';
	//返回要导出的对象

	var mode = {
		show: function (e) {
			console.log('Hello ' + msg);
		},
	};
	return mode;
});
