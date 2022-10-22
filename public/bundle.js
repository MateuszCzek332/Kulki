/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ball.ts":
/*!*********************!*\
  !*** ./src/Ball.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ball\": () => (/* binding */ Ball)\n/* harmony export */ });\nvar Ball = /** @class */ (function () {\r\n    function Ball() {\r\n        var _this = this;\r\n        this.select = function () {\r\n            _this.html.style.width = \"38px\";\r\n            _this.html.style.height = \"38px\";\r\n            _this.html.style.margin = \"3px\";\r\n        };\r\n        this.unSelect = function () {\r\n            _this.html.style.width = \"30px\";\r\n            _this.html.style.height = \"30px\";\r\n            _this.html.style.margin = \"7px\";\r\n        };\r\n        this.html = document.createElement(\"div\");\r\n        this.html.className = \"ball\";\r\n        this.color = Math.floor(Math.random() * Ball.collors.length);\r\n        this.html.style.backgroundColor = Ball.collors[this.color];\r\n    }\r\n    Ball.collors = ['red', 'orange', 'yellow', 'green', 'blue', 'black', 'white'];\r\n    return Ball;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Ball.ts?");

/***/ }),

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./src/Field.ts\");\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.ts\");\n\r\n\r\nvar Board = /** @class */ (function () {\r\n    function Board() {\r\n        var _this = this;\r\n        this.queue = [];\r\n        this.path = [];\r\n        this.qBalls = [];\r\n        this.init = function () {\r\n            _this.createBoard();\r\n            _this.createBallsQ();\r\n        };\r\n        this.createBoard = function () {\r\n            _this.html = document.createElement(\"div\");\r\n            _this.html.className = \"board\";\r\n            for (var i = 0; i < _this.height; i++) {\r\n                _this.fields[i] = [];\r\n                for (var j = 0; j < _this.width; j++) {\r\n                    var f = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(i, j, function () { _this.findPath(); });\r\n                    _this.fields[i][j] = f;\r\n                    _this.html.appendChild(f.html);\r\n                }\r\n            }\r\n            document.body.appendChild(_this.html);\r\n        };\r\n        this.createBallsQ = function () {\r\n            _this.ballsDiv = document.createElement(\"div\");\r\n            document.body.appendChild(_this.ballsDiv);\r\n            _this.ballsToQ();\r\n            _this.spawnBalls();\r\n        };\r\n        this.ballsToQ = function () {\r\n            for (var i = 0; i < 3; i++) {\r\n                var b = new _Ball__WEBPACK_IMPORTED_MODULE_1__.Ball();\r\n                _this.qBalls[i] = b;\r\n                _this.ballsDiv.appendChild(b.html);\r\n            }\r\n        };\r\n        this.spawnBalls = function () {\r\n            var i = 0;\r\n            while (i < _this.qBalls.length) {\r\n                var x = Math.floor(Math.random() * _this.width);\r\n                var y = Math.floor(Math.random() * _this.height);\r\n                if (_this.fields[x][y].ball == null) {\r\n                    _this.fields[x][y].spawnBall(_this.qBalls[i]);\r\n                    i++;\r\n                }\r\n            }\r\n            _this.ballsToQ();\r\n        };\r\n        this.findPath = function () {\r\n            if (Board.firstField != null) {\r\n                _this.queue = [Board.firstField,];\r\n                _this.queue[0].val = 1;\r\n                while (_this.queue.length > 0) {\r\n                    if (Board.lastField == _this.queue[0]) {\r\n                        _this.queue[0].html.style.backgroundColor = \"blue\";\r\n                        // this.queue[0].html.innerText = \"M\"\r\n                        _this.goBack();\r\n                        break;\r\n                    }\r\n                    _this.queue[0].visited = true;\r\n                    // this.queue[0].html.style.backgroundColor = \"red\"\r\n                    // this.queue[0].html.innerText = this.queue[0].val.toString()\r\n                    _this.dodajSasiadow(_this.queue[0].val + 1);\r\n                    _this.queue.shift();\r\n                }\r\n            }\r\n        };\r\n        this.goBack = function () {\r\n            _this.path = [];\r\n            var min = Board.lastField;\r\n            min.val = 20;\r\n            do {\r\n                var newmin = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(0, 0, 0);\r\n                if (min.x + 1 < _this.width && _this.fields[min.x + 1][min.y].val > 0 && _this.fields[min.x + 1][min.y].val < min.val) {\r\n                    newmin = _this.fields[min.x + 1][min.y];\r\n                }\r\n                if (min.x - 1 >= 0 && _this.fields[min.x - 1][min.y].val > 0 && _this.fields[min.x - 1][min.y].val < min.val) {\r\n                    newmin = _this.fields[min.x - 1][min.y];\r\n                }\r\n                if (min.y + 1 < _this.height && _this.fields[min.x][min.y + 1].val > 0 && _this.fields[min.x][min.y + 1].val < min.val) {\r\n                    newmin = _this.fields[min.x][min.y + 1];\r\n                }\r\n                if (min.y - 1 >= 0 && _this.fields[min.x][min.y - 1].val > 0 && _this.fields[min.x][min.y - 1].val < min.val) {\r\n                    newmin = _this.fields[min.x][min.y - 1];\r\n                }\r\n                _this.path.push(newmin);\r\n                // newmin.html.style.backgroundColor = \"green\"\r\n                if (newmin.val == 0 || newmin.val == 1)\r\n                    break;\r\n                min = newmin;\r\n            } while (true);\r\n            _this.selectPath();\r\n            _this.moveball();\r\n        };\r\n        this.dodajSasiadow = function (i) {\r\n            var x = _this.queue[0].x;\r\n            var y = _this.queue[0].y;\r\n            if (x + 1 < _this.width && !_this.fields[x + 1][y].visited && _this.fields[x + 1][y].ball == null) {\r\n                _this.fields[x + 1][y].val = i;\r\n                _this.queue.push(_this.fields[x + 1][y]);\r\n            }\r\n            if (x - 1 >= 0 && !_this.fields[x - 1][y].visited && _this.fields[x - 1][y].ball == null) {\r\n                _this.fields[x - 1][y].val = i;\r\n                _this.queue.push(_this.fields[x - 1][y]);\r\n            }\r\n            if (y + 1 < _this.height && !_this.fields[x][y + 1].visited && _this.fields[x][y + 1].ball == null) {\r\n                _this.fields[x][y + 1].val = i;\r\n                _this.queue.push(_this.fields[x][y + 1]);\r\n            }\r\n            if (y - 1 >= 0 && !_this.fields[x][y - 1].visited && _this.fields[x][y - 1].ball == null) {\r\n                _this.fields[x][y - 1].val = i;\r\n                _this.queue.push(_this.fields[x][y - 1]);\r\n            }\r\n        };\r\n        this.moveball = function () {\r\n            Board.move = false;\r\n            console.log(Board.firstField.ball);\r\n            console.log(Board.lastField);\r\n            Board.lastField.spawnBall(Board.firstField.ball);\r\n            Board.lastField.ball.unSelect();\r\n            Board.firstField.ball = null;\r\n            Board.firstField = null;\r\n            // Board.lastField.ball.unSelect()\r\n            // Board.firstField.ball = null\r\n            setTimeout(function () { _this.unselectPath(); }, 1000);\r\n        };\r\n        this.selectPath = function () {\r\n            _this.path.forEach(function (el) {\r\n                el.html.style.backgroundColor = 'green';\r\n            });\r\n        };\r\n        this.unselectPath = function () {\r\n            _this.path.forEach(function (el) {\r\n                el.html.style.backgroundColor = 'white';\r\n            });\r\n            Board.lastField.html.style.backgroundColor = 'white';\r\n            Board.lastField = null;\r\n            for (var i = 0; i < _this.width; i++)\r\n                for (var j = 0; j < _this.height; j++) {\r\n                    _this.fields[i][j].val = 0;\r\n                    _this.fields[i][j].visited = false;\r\n                }\r\n            Board.move = true;\r\n            _this.spawnBalls();\r\n        };\r\n        this.fields = [];\r\n        this.width = 9;\r\n        this.height = 9;\r\n        this.init();\r\n    }\r\n    Board.move = true;\r\n    Board.firstField = null;\r\n    Board.lastField = null;\r\n    return Board;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Board.ts?");

/***/ }),

/***/ "./src/Field.ts":
/*!**********************!*\
  !*** ./src/Field.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => (/* binding */ Field)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\nvar Field = /** @class */ (function () {\r\n    function Field(i, j, pf) {\r\n        var _this = this;\r\n        this.ball = null;\r\n        this.val = 0;\r\n        this.visited = false;\r\n        this.spawnBall = function (b) {\r\n            _this.html.appendChild(b.html);\r\n            _this.ball = b;\r\n        };\r\n        this.onClick = function () {\r\n            if (_this.ball == null && _Board__WEBPACK_IMPORTED_MODULE_0__.Board.move) {\r\n                _Board__WEBPACK_IMPORTED_MODULE_0__.Board.lastField = _this;\r\n                //console.log(Board.lastField)\r\n                _this.pf();\r\n            }\r\n            else if (_this.ball != null) {\r\n                switch (_Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField) {\r\n                    case null:\r\n                        _this.ball.select();\r\n                        _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = _this;\r\n                        break;\r\n                    case _this:\r\n                        _this.ball.unSelect();\r\n                        _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = null;\r\n                        break;\r\n                    default:\r\n                        _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField.ball.unSelect();\r\n                        _this.ball.select();\r\n                        _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = _this;\r\n                }\r\n            }\r\n        };\r\n        this.x = i;\r\n        this.y = j;\r\n        this.html = document.createElement(\"div\");\r\n        // this.html.addEventListener(\"click\", () => { pf() });\r\n        this.pf = function () { pf(); };\r\n        this.html.addEventListener(\"click\", this.onClick);\r\n        this.html.className = \"field\";\r\n        this.html.id = i + '-' + j;\r\n    }\r\n    return Field;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Field.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\nnew _Board__WEBPACK_IMPORTED_MODULE_0__.Board();\r\n\n\n//# sourceURL=webpack://kulki/./src/app.ts?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;