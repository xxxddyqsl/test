(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["finalModule"] = factory();
	else
		root["finalModule"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/testA.ts":
/*!*************************!*\
  !*** ./src/ts/testA.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewRtcClient = void 0;
//implements关键字代表该类实现该接口，该类必须定义接口中的方法
class testAPoint {
    // static 关键字 声明静态方法，就表示该方法不会被实例继承，可以直接通过类来调用， 不需要new 获取 类的实例
    static getInstance() {
        if (testAPoint._instance == null) {
            alert('new获取类');
            testAPoint._instance = new testAPoint();
        }
        return testAPoint._instance;
    }
    add(x, y) {
        return console.log('输出add函数==>', x + y);
    }
    setName(n) {
        return this.name = n;
    }
}
testAPoint._instance = null; // 关键字 private 声明私有变量 只能类内部访问
// export 导出的东西需要在导入的时候加
function NewRtcClient() {
    // 调用 testAPoint 类 设置的静态方法 getInstance 判断静态变量_instance 是否已经绑定了 testAPoint 类的实例  没有则 获取testAPoint类的实例 并把testAPoint类的实例绑定在 static 设置的静态变量 _instance 上 来调用内部方法
    return testAPoint.getInstance();
}
exports.NewRtcClient = NewRtcClient;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MakeRtcClient = void 0;
const testA_1 = __webpack_require__(/*! ./testA */ "./src/ts/testA.ts");
function MakeRtcClient() {
    return (0, testA_1.NewRtcClient)();
}
exports.MakeRtcClient = MakeRtcClient;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map