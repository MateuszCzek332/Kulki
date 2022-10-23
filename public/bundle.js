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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ball\": () => (/* binding */ Ball)\n/* harmony export */ });\nvar Ball = /** @class */ (function () {\r\n    /**\r\n     * Tworzenie kolki z losowym kolorem\r\n     */\r\n    function Ball() {\r\n        var _this = this;\r\n        /**\r\n         * wybranie kulki - zmiana stylow - powiekszenie\r\n         */\r\n        this.select = function () {\r\n            _this.html.style.width = \"38px\";\r\n            _this.html.style.height = \"38px\";\r\n            _this.html.style.margin = \"3px\";\r\n        };\r\n        /**\r\n         * odzanczenie kulki - zmiana stylow - pomniejszenie\r\n         */\r\n        this.unSelect = function () {\r\n            _this.html.style.width = \"30px\";\r\n            _this.html.style.height = \"30px\";\r\n            _this.html.style.margin = \"7px\";\r\n        };\r\n        this.html = document.createElement(\"div\");\r\n        this.html.className = \"ball\";\r\n        this.color = Math.floor(Math.random() * Ball.collors.length);\r\n        this.html.style.backgroundColor = Ball.collors[this.color];\r\n    }\r\n    Ball.collors = ['red', 'orange', 'yellow', 'green', 'blue', 'black', 'white'];\r\n    return Ball;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Ball.ts?");

/***/ }),

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./src/Field.ts\");\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.ts\");\n\r\n\r\nvar Board = /** @class */ (function () {\r\n    /**\r\n     * inicjowanie wartoci wysokosci i szerokosci, wywolanie funki init - tworzenie elementow na stronie\r\n     */\r\n    function Board() {\r\n        var _this = this;\r\n        this.fields = [];\r\n        this.queue = [];\r\n        this.path = [];\r\n        this.qBalls = [];\r\n        /**\r\n         * wywowanie metod tworzacych na starcie\r\n         */\r\n        this.init = function () {\r\n            _this.createBoard();\r\n            _this.createBallsQ();\r\n        };\r\n        /**\r\n         * Tworzenie tablicy 9x9, dodawanie jej do tablicy i html'a\r\n         */\r\n        this.createBoard = function () {\r\n            _this.html = document.createElement(\"div\");\r\n            _this.html.className = \"board\";\r\n            for (var i = 0; i < _this.height; i++) {\r\n                _this.fields[i] = [];\r\n                for (var j = 0; j < _this.width; j++) {\r\n                    var f = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(i, j, function () { _this.findPath(); }, function () { _this.unselectPath(); }, function () { _this.moveball(); }, function (x, y) { return _this.checkBall(x, y); });\r\n                    _this.fields[i][j] = f;\r\n                    _this.html.appendChild(f.html);\r\n                }\r\n            }\r\n            document.body.appendChild(_this.html);\r\n        };\r\n        /**\r\n         * Tworzenie kolejki nastepnych kulek, pierwszy sppanw kulek na planszy\r\n         */\r\n        this.createBallsQ = function () {\r\n            _this.ballsDiv = document.createElement(\"div\");\r\n            document.body.appendChild(_this.ballsDiv);\r\n            _this.ballsToQ();\r\n            _this.spawnBalls();\r\n        };\r\n        /**\r\n         * Dodawanie kulek do kolejki\r\n         */\r\n        this.ballsToQ = function () {\r\n            for (var i = 0; i < 3; i++) {\r\n                var b = new _Ball__WEBPACK_IMPORTED_MODULE_1__.Ball();\r\n                _this.qBalls[i] = b;\r\n                _this.ballsDiv.appendChild(b.html);\r\n            }\r\n        };\r\n        /**\r\n         * Spawn kulekk z kkolejki w losowym miejscu na planszy, dobranie kolejnych kulek do kolejki\r\n         */\r\n        this.spawnBalls = function () {\r\n            var i = 0;\r\n            while (i < _this.qBalls.length) {\r\n                var x = Math.floor(Math.random() * _this.width);\r\n                var y = Math.floor(Math.random() * _this.height);\r\n                if (_this.fields[x][y].ball == null) {\r\n                    _this.fields[x][y].spawnBall(_this.qBalls[i]);\r\n                    i++;\r\n                }\r\n            }\r\n            _this.ballsToQ();\r\n        };\r\n        /**\r\n         * Funkcja sprawdza czy mozna wykonac ruch kulka na polu o podanych wspolrzednych\r\n         * @param x wspolrzedna x sprawdzanego pola\r\n         * @param y wspolrzedna y sprawdzanego pola\r\n         * @returns czy mozna zaznaczyc kulke(true/false) - mozna tylko wtedy gdy jakies pole obok jest wolne - czytaj mozna wykonac jakikolwiek ruch\r\n         */\r\n        this.checkBall = function (x, y) {\r\n            switch (true) {\r\n                case x + 1 < _this.width && _this.fields[x + 1][y].ball == null:\r\n                    return true;\r\n                case x - 1 >= 0 && _this.fields[x - 1][y].ball == null:\r\n                    return true;\r\n                case y + 1 < _this.height && _this.fields[x][y + 1].ball == null:\r\n                    return true;\r\n                case y - 1 >= 0 && _this.fields[x][y - 1].ball == null:\r\n                    return true;\r\n                default:\r\n                    return false;\r\n            }\r\n        };\r\n        /**\r\n         * główna fynkja path findingu, nadaje polom value - ilosc skokow od pierwszego pola, zatrzymuje sie gdy trafi na stanie pole\r\n         * Po czym wywoluje funkcje goBack\r\n         */\r\n        this.findPath = function () {\r\n            if (Board.firstField != null) {\r\n                _this.queue = [Board.firstField,];\r\n                _this.queue[0].val = 1;\r\n                while (_this.queue.length > 0) {\r\n                    if (Board.lastField == _this.queue[0]) {\r\n                        _this.queue[0].html.style.backgroundColor = \"blue\";\r\n                        _this.goBack();\r\n                        break;\r\n                    }\r\n                    _this.queue[0].visited = true;\r\n                    _this.addNeighbors(_this.queue[0].val + 1);\r\n                    _this.queue.shift();\r\n                }\r\n            }\r\n        };\r\n        /**\r\n         * poprzez znajdywanie najmniejszej wartosci wyznacza sciezke od pola koncowego do poczatkowego\r\n         */\r\n        this.goBack = function () {\r\n            _this.path = [];\r\n            var min = Board.lastField;\r\n            min.val = 40;\r\n            do {\r\n                var newmin = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(0, 0);\r\n                if (min.x + 1 < _this.width && _this.fields[min.x + 1][min.y].val > 0 && _this.fields[min.x + 1][min.y].val < min.val) {\r\n                    newmin = _this.fields[min.x + 1][min.y];\r\n                }\r\n                if (min.x - 1 >= 0 && _this.fields[min.x - 1][min.y].val > 0 && _this.fields[min.x - 1][min.y].val < min.val) {\r\n                    newmin = _this.fields[min.x - 1][min.y];\r\n                }\r\n                if (min.y + 1 < _this.height && _this.fields[min.x][min.y + 1].val > 0 && _this.fields[min.x][min.y + 1].val < min.val) {\r\n                    newmin = _this.fields[min.x][min.y + 1];\r\n                }\r\n                if (min.y - 1 >= 0 && _this.fields[min.x][min.y - 1].val > 0 && _this.fields[min.x][min.y - 1].val < min.val) {\r\n                    newmin = _this.fields[min.x][min.y - 1];\r\n                }\r\n                _this.path.push(newmin);\r\n                if (newmin.val == 0 || newmin.val == 1)\r\n                    break;\r\n                min = newmin;\r\n            } while (true);\r\n            _this.selectPath();\r\n        };\r\n        /**\r\n         * nadaje wartosci sasiada sprawdzanego pola(o ile istnieja) oraz dodaje ich do kolejki sprawdzanych pol\r\n         * @param i wartosc jaka zosranie przypisana sasiadom\r\n         */\r\n        this.addNeighbors = function (i) {\r\n            var x = _this.queue[0].x;\r\n            var y = _this.queue[0].y;\r\n            if (x + 1 < _this.width && !_this.fields[x + 1][y].visited && _this.fields[x + 1][y].ball == null) {\r\n                _this.fields[x + 1][y].val = i;\r\n                _this.queue.push(_this.fields[x + 1][y]);\r\n            }\r\n            if (x - 1 >= 0 && !_this.fields[x - 1][y].visited && _this.fields[x - 1][y].ball == null) {\r\n                _this.fields[x - 1][y].val = i;\r\n                _this.queue.push(_this.fields[x - 1][y]);\r\n            }\r\n            if (y + 1 < _this.height && !_this.fields[x][y + 1].visited && _this.fields[x][y + 1].ball == null) {\r\n                _this.fields[x][y + 1].val = i;\r\n                _this.queue.push(_this.fields[x][y + 1]);\r\n            }\r\n            if (y - 1 >= 0 && !_this.fields[x][y - 1].visited && _this.fields[x][y - 1].ball == null) {\r\n                _this.fields[x][y - 1].val = i;\r\n                _this.queue.push(_this.fields[x][y - 1]);\r\n            }\r\n        };\r\n        /**\r\n         * rusza kulka z pola poczatkowego do koncowegpo(o ile sciezka zostala znaleziona - dlugosc sciezki wieksza od 0)\r\n         */\r\n        this.moveball = function () {\r\n            Board.move = false;\r\n            if (_this.path.length > 0) {\r\n                Board.lastField.spawnBall(Board.firstField.ball);\r\n                Board.lastField.ball.unSelect();\r\n                Board.firstField.ball = null;\r\n                Board.firstField = null;\r\n                setTimeout(function () {\r\n                    Board.move = true;\r\n                    _this.unselectPath();\r\n                    _this.spawnBalls();\r\n                }, 1000);\r\n            }\r\n        };\r\n        /**\r\n         * zanaczenie znalezionej sciezki\r\n         */\r\n        this.selectPath = function () {\r\n            _this.path.forEach(function (el) {\r\n                el.html.style.backgroundColor = 'green';\r\n            });\r\n        };\r\n        /**\r\n         * odznaczenie sciezki - wyzerowanie wartosci - przugotowanie do ponownego wyznaczania sciezki\r\n         */\r\n        this.unselectPath = function () {\r\n            if (Board.move) {\r\n                _this.path.push(Board.lastField);\r\n                _this.path.forEach(function (el) {\r\n                    el.html.style.backgroundColor = 'white';\r\n                });\r\n                Board.lastField = null;\r\n                for (var i = 0; i < _this.width; i++)\r\n                    for (var j = 0; j < _this.height; j++) {\r\n                        _this.fields[i][j].val = 0;\r\n                        _this.fields[i][j].visited = false;\r\n                    }\r\n                Board.move = true;\r\n            }\r\n        };\r\n        this.width = 9;\r\n        this.height = 9;\r\n        this.init();\r\n    }\r\n    Board.move = true;\r\n    Board.firstField = null;\r\n    Board.lastField = null;\r\n    return Board;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Board.ts?");

/***/ }),

/***/ "./src/Field.ts":
/*!**********************!*\
  !*** ./src/Field.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => (/* binding */ Field)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\nvar Field = /** @class */ (function () {\r\n    /**\r\n     *\r\n     * @param i wspolrzedna x w tablicy rodzica\r\n     * @param j wspolrzedna y w talblicy rodzica\r\n     * @param pf funkcja odpowiadajaca za znalezienie sciezki\r\n     * @param clear funkcja czyszczaca tablice rodzica\r\n     * @param move ruch kulki\r\n     * @param check sprawdzenie czy kulka ma dostepne ruchy\r\n     */\r\n    function Field(i, j, pf, clear, move, check) {\r\n        var _this = this;\r\n        this.ball = null;\r\n        this.val = 0;\r\n        this.visited = false;\r\n        /**\r\n         * evet przy najechaniu na pole znalezienie sciezki do pola od wybranej kulki (o ile istnieje)\r\n         */\r\n        this.mouseIn = function () {\r\n            _Board__WEBPACK_IMPORTED_MODULE_0__.Board.lastField = _this;\r\n            _this.pf();\r\n        };\r\n        /**\r\n         * odznaczenie zaznaczonej sciezki po opuszeczeniu danego pola\r\n         */\r\n        this.mouseOut = function () {\r\n            if (_Board__WEBPACK_IMPORTED_MODULE_0__.Board.move)\r\n                _Board__WEBPACK_IMPORTED_MODULE_0__.Board.lastField = _this;\r\n            _this.clear();\r\n        };\r\n        /**\r\n         * funkcja ktora na podanym polu generuje podana w argumencie kulke\r\n         * @param b kulka ktora ma zostac wygenerowana na tym polu\r\n         */\r\n        this.spawnBall = function (b) {\r\n            _this.html.appendChild(b.html);\r\n            _this.ball = b;\r\n        };\r\n        /**\r\n         * funkcja obslugujaca klikniecie na pole\r\n         * Jezeli nie ma na polu kulki to wykonaj ruch kulki z pola poczatkowego(jezeli mozliwy)\r\n         * jezli to pole to pole poczatkowe to zaznacz/odnacz kulke\r\n         * jezeli na tym polu jest kulka to odznacz kulke na poprzednim poczatkowym(o ile takie istnialo) i ustaw to jako poczatkowe\r\n         */\r\n        this.onClick = function () {\r\n            if (_this.ball == null && _Board__WEBPACK_IMPORTED_MODULE_0__.Board.move) {\r\n                _this.move();\r\n            }\r\n            else if (_this.ball != null) {\r\n                switch (_Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField) {\r\n                    case null:\r\n                        if (_Board__WEBPACK_IMPORTED_MODULE_0__.Board.move && _this.check()) {\r\n                            _this.ball.select();\r\n                            _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = _this;\r\n                        }\r\n                        break;\r\n                    case _this:\r\n                        _this.ball.unSelect();\r\n                        _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = null;\r\n                        break;\r\n                    default:\r\n                        if (_this.check()) {\r\n                            _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField.ball.unSelect();\r\n                            _this.ball.select();\r\n                            _Board__WEBPACK_IMPORTED_MODULE_0__.Board.firstField = _this;\r\n                        }\r\n                }\r\n            }\r\n        };\r\n        this.x = i;\r\n        this.y = j;\r\n        this.html = document.createElement(\"div\");\r\n        this.pf = function () { pf(); };\r\n        this.clear = function () { clear(); };\r\n        this.move = function () { move(); };\r\n        this.check = function () {\r\n            console.log(check(_this.x, _this.y));\r\n            return check(_this.x, _this.y);\r\n        };\r\n        this.html.addEventListener(\"mouseenter\", this.mouseIn);\r\n        this.html.addEventListener(\"mouseleave\", this.mouseOut);\r\n        this.html.addEventListener(\"click\", this.onClick);\r\n        this.html.className = \"field\";\r\n        this.html.id = i + '-' + j;\r\n    }\r\n    return Field;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://kulki/./src/Field.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\n/**\r\n * stworzenie planszy :)\r\n */\r\nnew _Board__WEBPACK_IMPORTED_MODULE_0__.Board();\r\n\n\n//# sourceURL=webpack://kulki/./src/app.ts?");

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