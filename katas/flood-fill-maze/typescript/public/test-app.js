/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FloodFillMaze.ts":
/*!******************************!*\
  !*** ./src/FloodFillMaze.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var FloodFillMaze = /*#__PURE__*/function () {
  function FloodFillMaze() {
    _classCallCheck(this, FloodFillMaze);
    this.maze = [];
    this.visited = [];
  }
  _createClass(FloodFillMaze, [{
    key: "setMaze",
    value: function setMaze(maze) {
      this.maze = maze;
    }
  }, {
    key: "getMaze",
    value: function getMaze() {
      return this.maze;
    }
  }, {
    key: "getVisited",
    value: function getVisited() {
      return this.visited;
    }
  }, {
    key: "fill",
    value: function fill(x, y) {
      var currentDistance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      // If outside maze
      if (x < 0 || x > this.maze.length - 1 || y < 0 || y > this.maze[x].length - 1) {
        return;
      }
      // If already visited
      if (this.visited.filter(function (cell) {
        return cell.x === x && cell.y === y;
      }).length > 0) {
        return;
      }
      // If is wall
      if (this.maze[x][y] === 1) {
        return;
      }
      var cell = {
        x: x,
        y: y,
        distance: currentDistance
      };
      this.visited.push(cell);
      this.fill(x + 1, y, currentDistance + 1);
      this.fill(x - 1, y, currentDistance + 1);
      this.fill(x, y + 1, currentDistance + 1);
      this.fill(x, y - 1, currentDistance + 1);
    }
  }]);
  return FloodFillMaze;
}();
exports["default"] = FloodFillMaze;

/***/ }),

/***/ "./src/test-app.ts":
/*!*************************!*\
  !*** ./src/test-app.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var FloodFillMaze_1 = __importDefault(__webpack_require__(/*! ./FloodFillMaze */ "./src/FloodFillMaze.ts"));
var maze = [[0, 1, 0, 0, 1], [0, 0, 1, 0, 0], [1, 0, 0, 1, 0], [0, 1, 0, 0, 0], [0, 0, 0, 1, 0]];
var x = 0;
var y = 3;
var ffm = new FloodFillMaze_1["default"]();
ffm.setMaze(maze);
ffm.fill(x, y);
var visited = ffm.getVisited();
visited.sort(function (a, b) {
  return a.distance - b.distance;
}).forEach(function (cell, idx) {
  console.log(cell, idx);
});

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/test-app.ts");
/******/ 	
/******/ })()
;