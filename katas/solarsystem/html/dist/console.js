/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Drawable.ts":
/*!*************************!*\
  !*** ./src/Drawable.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Drawable = /*#__PURE__*/function () {
  function Drawable(solarsystem) {
    _classCallCheck(this, Drawable);
    this.min_display_size = 10;
    this.display_log_base = 1.1;
    this.x = 0;
    this.y = 0;
    this.color = '#fff';
    this.display_size = 0;
    this.distance_travelled = 0;
    this.minDistanceToStar = Number.MAX_SAFE_INTEGER;
    this.maxDistanceToStar = 0;
    this.name = '';
    this.mass = 0;
    this.initialPosition = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.initialVelocity = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.solarsystem = solarsystem;
  }
  _createClass(Drawable, [{
    key: "getPosition",
    value: function getPosition() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "setPosition",
    value: function setPosition(coordinates) {
      this.x = coordinates.x;
      this.y = coordinates.y;
    }
  }, {
    key: "setColor",
    value: function setColor() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
      this.color = color;
    }
  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "dot",
    value: function dot(size) {
      var origStrokeStyle = this.solarsystem.context.strokeStyle;
      var origFillStyle = this.solarsystem.context.fillStyle;
      this.solarsystem.context.strokeStyle = this.color;
      this.solarsystem.context.fillStyle = this.color;
      this.solarsystem.context.beginPath();
      this.solarsystem.context.arc(this.x, this.y, size / 2, 0, 2 * Math.PI);
      this.solarsystem.context.fill();
      this.solarsystem.context.stroke();
      this.solarsystem.context.closePath();
      this.solarsystem.context.font = '12px Arial';
      this.solarsystem.context.fillStyle = '#fff';
      this.solarsystem.context.fillText(this.name, this.x + 15, this.y + 5);
      this.solarsystem.context.strokeStyle = origStrokeStyle;
      this.solarsystem.context.fillStyle = origFillStyle;
    }
  }, {
    key: "distance",
    value: function distance(otherBody) {
      return Math.sqrt(Math.pow(otherBody.x - this.x, 2) + Math.pow(otherBody.y - this.y, 2));
    }
  }, {
    key: "towards",
    value: function towards(otherBody) {
      // in radians
      return Math.atan2(otherBody.y - this.y, otherBody.x - this.x);
    }
  }]);
  return Drawable;
}();
exports["default"] = Drawable;

/***/ }),

/***/ "./src/Planet.ts":
/*!***********************!*\
  !*** ./src/Planet.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var SolarSystemBody_1 = __importDefault(__webpack_require__(/*! ./SolarSystemBody */ "./src/SolarSystemBody.ts"));
var Planet = /*#__PURE__*/function (_SolarSystemBody_1$de) {
  _inherits(Planet, _SolarSystemBody_1$de);
  var _super = _createSuper(Planet);
  function Planet(solarsystem) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      mass: 10,
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      color: 'white',
      name: ''
    };
    _classCallCheck(this, Planet);
    return _super.call(this, solarsystem, properties);
  }
  return _createClass(Planet);
}(SolarSystemBody_1["default"]);
exports["default"] = Planet;

/***/ }),

/***/ "./src/Run.ts":
/*!********************!*\
  !*** ./src/Run.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Planet_1 = __importDefault(__webpack_require__(/*! ./Planet */ "./src/Planet.ts"));
var Star_1 = __importDefault(__webpack_require__(/*! ./Star */ "./src/Star.ts"));
var Run = /*#__PURE__*/function () {
  function Run(solarsystem) {
    _classCallCheck(this, Run);
    this.totalRuns = 0;
    this.totalStats = [];
    this.solarsystem = solarsystem;
  }
  _createClass(Run, [{
    key: "updateStats",
    value: function updateStats() {
      var starBody = Array.from(this.solarsystem.bodies).find(function (body) {
        return body instanceof Star_1["default"];
      });
      this.solarsystem.bodies.forEach(function (body) {
        var distanceToStar = 0;
        if (starBody && body instanceof Planet_1["default"]) {
          distanceToStar = Math.floor(body.distance(starBody));
          if (distanceToStar < body.minDistanceToStar) {
            body.minDistanceToStar = distanceToStar;
          } else if (distanceToStar > body.maxDistanceToStar) {
            body.maxDistanceToStar = distanceToStar;
          }
        }
      });
    }
  }, {
    key: "setBrowserStats",
    value: function setBrowserStats(_ref) {
      var fps = _ref.fps,
        iterations = _ref.iterations;
      if (fps) {
        var statsFPS = document.getElementById('currentfps');
        statsFPS.innerHTML = fps.toString();
      }
      if (iterations) {
        var statsIterations = document.getElementById('iterations');
        statsIterations.innerHTML = iterations.toString();
      }
      var statsTotalRuns = document.getElementById('totalruns');
      statsTotalRuns.innerHTML = this.totalRuns.toString();
      function createLabelValuePair(id, title, value) {
        var label = document.createElement('label');
        label.setAttribute('for', id);
        var spanlabel = document.createElement('span');
        spanlabel.classList.add('label');
        spanlabel.innerHTML = title;
        var spanvalue = document.createElement('span');
        spanvalue.classList.add('value');
        spanvalue.id = id;
        spanvalue.innerHTML = value;
        label.appendChild(spanlabel);
        label.appendChild(spanvalue);
        return label;
      }
      var bodiesStats = document.getElementById('bodiesstats');
      bodiesStats.innerHTML = '';
      function createBodyStatsTable(_ref2) {
        var name = _ref2.name,
          radius = _ref2.radius,
          mass = _ref2.mass,
          distance_travelled = _ref2.distance_travelled,
          distance_to_star = _ref2.distance_to_star,
          initialPosition = _ref2.initialPosition,
          position = _ref2.position,
          initialVelocity = _ref2.initialVelocity,
          velocity = _ref2.velocity;
        var bodydiv = document.createElement('div');
        bodydiv.classList.add('body');
        bodydiv.appendChild(createLabelValuePair('name', 'Name', name));
        bodydiv.appendChild(createLabelValuePair('radius', 'Radius', radius));
        bodydiv.appendChild(createLabelValuePair('mass', 'Mass', mass));
        bodydiv.appendChild(createLabelValuePair('initpos', 'Initial position', "[".concat(initialPosition.x, ",").concat(initialPosition.y, "]")));
        // bodydiv.appendChild(createLabelValuePair('curpos', 'Position', `[${position.x.toPrecision(1)},${position.y.toPrecision(1)}]`));
        bodydiv.appendChild(createLabelValuePair('initvel', 'Initial velocity', "[".concat(initialVelocity.x, ",").concat(initialVelocity.y, "]")));
        // bodydiv.appendChild(createLabelValuePair('curvel', 'Velocity', `[${velocity.x.toPrecision(1)},${velocity.y.toPrecision(1)}]`));
        bodydiv.appendChild(createLabelValuePair('distance_travelled', 'Distance travelled', distance_travelled));
        bodydiv.appendChild(createLabelValuePair('distance_to_star', 'Distance to star', distance_to_star));
        bodiesStats.appendChild(bodydiv);
        bodiesStats.appendChild(document.createElement('hr'));
      }
      var starBody = Array.from(this.solarsystem.bodies).find(function (body) {
        return body instanceof Star_1["default"];
      });
      this.solarsystem.bodies.forEach(function (body) {
        /*
        let distanceToStar = 0;
        if (starBody && body instanceof Planet) {
            distanceToStar = Math.floor((<Planet>body).distance(starBody));
            if (distanceToStar < body.minDistanceToStar) {
                body.minDistanceToStar = distanceToStar;
            } else if (distanceToStar > body.maxDistanceToStar) {
                body.maxDistanceToStar = distanceToStar;
            }
        }
        */
        return createBodyStatsTable({
          name: body.name,
          mass: body.mass,
          radius: Math.round(body.display_size / 2),
          position: body.getPosition(),
          initialPosition: body.initialPosition,
          velocity: body.velocity,
          initialVelocity: body.initialVelocity,
          distance_travelled: Math.floor(body.distance_travelled),
          distance_to_star: starBody && body instanceof Planet_1["default"] ? Math.floor(body.distance(starBody)) : 0
        });
      });
    }
  }, {
    key: "storeStats",
    value: function storeStats(_ref3) {
      var iterations = _ref3.iterations;
      var runStats = {
        iterations: iterations,
        bodies: [],
        causeOfFailure: this.solarsystem.causeOfFailure
      };
      var starBody = Array.from(this.solarsystem.bodies).find(function (body) {
        return body instanceof Star_1["default"];
      });
      this.solarsystem.bodies.forEach(function (body) {
        runStats.bodies.push({
          name: body.name,
          mass: body.mass,
          radius: Math.round(body.display_size / 2),
          position: body.getPosition(),
          initialPosition: body.initialPosition,
          velocity: body.velocity,
          initialVelocity: body.initialVelocity,
          distance_travelled: body.distance_travelled,
          distance_to_star: body instanceof Planet_1["default"] ? Math.floor(body.distance(starBody)) : 0,
          minDistanceToStar: body.minDistanceToStar,
          maxDistanceToStar: body.maxDistanceToStar
        });
      });
      this.totalStats.push(runStats);
    }
  }, {
    key: "startBrowserRun",
    value: function () {
      var _startBrowserRun = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var fps,
          i,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              fps = _args.length > 0 && _args[0] !== undefined ? _args[0] : 60;
              this.totalRuns++;
              this.solarsystem.resetCanvas();
              this.solarsystem.isRunning = true;
              i = 0;
            case 5:
              if (!(this.solarsystem.isRunning && i < this.solarsystem.maxIterations)) {
                _context.next = 15;
                break;
              }
              i++;
              this.solarsystem.calculateAllBodyInteractions();
              this.solarsystem.updateAll();
              this.updateStats();
              this.setBrowserStats({
                fps: fps,
                iterations: i
              });
              _context.next = 13;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1000 / fps);
              });
            case 13:
              _context.next = 5;
              break;
            case 15:
              if (i === this.solarsystem.maxIterations) {
                this.solarsystem.causeOfFailure = this.solarsystem.possibleCauses.MAX_ITERATIONS_EXCEEDED;
                this.storeStats({
                  iterations: i
                });
                document.getElementById('output').value = JSON.stringify(this.totalStats);
              }
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function startBrowserRun() {
        return _startBrowserRun.apply(this, arguments);
      }
      return startBrowserRun;
    }()
  }, {
    key: "startConsoleRun",
    value: function () {
      var _startConsoleRun = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.totalRuns++;
              this.solarsystem.isRunning = true;
              i = 0;
              while (this.solarsystem.isRunning && i < this.solarsystem.maxIterations) {
                i++;
                this.solarsystem.calculateAllBodyInteractions();
                this.solarsystem.updateAll();
                this.updateStats();
              }
              if (i === this.solarsystem.maxIterations) {
                this.solarsystem.causeOfFailure = this.solarsystem.possibleCauses.MAX_ITERATIONS_EXCEEDED;
                this.storeStats({
                  iterations: i
                });
              }
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function startConsoleRun() {
        return _startConsoleRun.apply(this, arguments);
      }
      return startConsoleRun;
    }()
  }]);
  return Run;
}();
exports["default"] = Run;

/***/ }),

/***/ "./src/SolarSystem.ts":
/*!****************************!*\
  !*** ./src/SolarSystem.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RunMode = void 0;
var Planet_1 = __importDefault(__webpack_require__(/*! ./Planet */ "./src/Planet.ts"));
var Star_1 = __importDefault(__webpack_require__(/*! ./Star */ "./src/Star.ts"));
var RunMode;
(function (RunMode) {
  RunMode["Browser"] = "browser";
  RunMode["Console"] = "console";
})(RunMode || (exports.RunMode = RunMode = {}));
var SolarSystem = /*#__PURE__*/function () {
  function SolarSystem(runMode, canvas) {
    _classCallCheck(this, SolarSystem);
    this.isRunning = true;
    this.runMode = RunMode.Browser;
    this.maxDistance = 10000;
    this.maxIterations = 10000;
    this.causeOfFailure = '';
    this.possibleCauses = {
      COLLISION: 'collision',
      DISTANCE_EXCEEDED: 'exceeded distance',
      NEGLIBLE_FORCE: 'not in orbit',
      MAX_ITERATIONS_EXCEEDED: 'max iterations exceeded',
      PLANETS_IN_SAME_POSITION: 'planets spawned in same position'
    };
    this.runMode = runMode;
    if (runMode === RunMode.Browser) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.context.translate(this.width / 2, this.height / 2);
    }
    this.bodies = new Set();
  }
  _createClass(SolarSystem, [{
    key: "log",
    value: function log() {
      if (this.runMode === RunMode.Browser) {
        var _console;
        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.bodies = new Set();
      this.causeOfFailure = '';
    }
  }, {
    key: "resetCanvas",
    value: function resetCanvas() {
      var origFillStyle = this.context.fillStyle;
      this.context.fillStyle = '#000';
      this.context.rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
      this.context.fill();
      this.context.fillStyle = origFillStyle;
    }
  }, {
    key: "addBody",
    value: function addBody(body) {
      this.bodies.add(body);
    }
  }, {
    key: "removeBody",
    value: function removeBody(body) {
      this.bodies["delete"](body);
    }
  }, {
    key: "updateAll",
    value: function updateAll() {
      if (this.runMode === RunMode.Browser) {
        this.resetCanvas();
        this.bodies.forEach(function (body) {
          body.move();
          body.draw();
        });
      } else {
        this.bodies.forEach(function (body) {
          body.move();
        });
      }
    }
  }, {
    key: "accelerateDueToGravity",
    value: function accelerateDueToGravity(first, second) {
      var force = first.mass * second.mass / Math.pow(first.distance(second), 2);
      var angle = first.towards(second);
      if (force > 0 && force < 0.00001) {
        this.isRunning = false;
        this.causeOfFailure = this.possibleCauses.NEGLIBLE_FORCE;
        this.log("Body \"".concat(first.name, "\" was ejected!"));
      }
      var reverse = 1;
      var bodies = [first, second];
      bodies.forEach(function (body) {
        var acceleration = force / body.mass;
        var acc_x = acceleration * Math.cos(angle);
        var acc_y = acceleration * Math.sin(angle);
        body.velocity = {
          x: body.velocity.x + reverse * acc_x,
          y: body.velocity.y + reverse * acc_y
        };
        reverse = -1;
      });
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(first, second) {
      var _this = this;
      if (first instanceof Planet_1["default"] && second instanceof Planet_1["default"]) {
        if (first.name === second.name) return;
        if (first.initialPosition.x === second.initialPosition.x && first.initialPosition.y === second.initialPosition.y) {
          this.isRunning = false;
          this.causeOfFailure = this.possibleCauses.PLANETS_IN_SAME_POSITION;
        }
        return;
      }
      if (first.distance(second) < first.display_size / 2 + second.display_size / 2) {
        [first, second].forEach(function (body) {
          if (body instanceof Planet_1["default"]) {
            _this.isRunning = false;
            _this.causeOfFailure = _this.possibleCauses.COLLISION;
            _this.log("Body \"".concat(first.name, "\" has collided with \"").concat(second.name, "\"!"));
            // this.removeBody(body);
          }
        });
      }
    }
  }, {
    key: "checkEjection",
    value: function checkEjection(body) {
      var starBody = Array.from(this.bodies).find(function (body) {
        return body instanceof Star_1["default"];
      });
      if (starBody && body.distance(starBody) > this.maxDistance) {
        this.isRunning = false;
        this.causeOfFailure = this.possibleCauses.DISTANCE_EXCEEDED;
        this.log("Body \"".concat(body.name, "\" exceeded distance max of ").concat(this.maxDistance, "!"));
      }
    }
  }, {
    key: "calculateAllBodyInteractions",
    value: function calculateAllBodyInteractions() {
      var bodiesArray = Array.from(this.bodies);
      for (var i = 0; i < bodiesArray.length; i++) {
        for (var j = i + 1; j < bodiesArray.length; j++) {
          this.accelerateDueToGravity(bodiesArray[i], bodiesArray[j]);
          this.checkCollision(bodiesArray[i], bodiesArray[j]);
        }
        this.checkEjection(bodiesArray[i]);
      }
    }
  }]);
  return SolarSystem;
}();
exports["default"] = SolarSystem;

/***/ }),

/***/ "./src/SolarSystemBody.ts":
/*!********************************!*\
  !*** ./src/SolarSystemBody.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Drawable_1 = __importDefault(__webpack_require__(/*! ./Drawable */ "./src/Drawable.ts"));
var SolarSystemBody = /*#__PURE__*/function (_Drawable_1$default) {
  _inherits(SolarSystemBody, _Drawable_1$default);
  var _super = _createSuper(SolarSystemBody);
  function SolarSystemBody(solarsystem) {
    var _this;
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      mass: 10,
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      color: 'white',
      name: ''
    };
    _classCallCheck(this, SolarSystemBody);
    _this = _super.call(this, solarsystem);
    _this.name = properties.name;
    _this.mass = properties.mass;
    _this.initialVelocity = properties.velocity;
    _this.velocity = properties.velocity;
    _this.initialPosition = properties.position;
    _this.setPosition(properties.position);
    _this.setColor(properties.color);
    _this.display_size = Math.max(Math.log(_this.mass) / Math.log(_this.display_log_base), _this.min_display_size);
    _this.distance_travelled = 0;
    solarsystem.addBody(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(SolarSystemBody, [{
    key: "draw",
    value: function draw() {
      this.clear();
      this.dot(this.display_size);
    }
  }, {
    key: "move",
    value: function move() {
      var origin = this.getPosition();
      var target = {
        x: origin.x + this.velocity.x,
        y: origin.y + this.velocity.y
      };
      var distance = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2));
      this.distance_travelled += distance;
      this.setPosition(target);
    }
  }]);
  return SolarSystemBody;
}(Drawable_1["default"]);
exports["default"] = SolarSystemBody;

/***/ }),

/***/ "./src/Star.ts":
/*!*********************!*\
  !*** ./src/Star.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var SolarSystemBody_1 = __importDefault(__webpack_require__(/*! ./SolarSystemBody */ "./src/SolarSystemBody.ts"));
var Star = /*#__PURE__*/function (_SolarSystemBody_1$de) {
  _inherits(Star, _SolarSystemBody_1$de);
  var _super = _createSuper(Star);
  function Star(solarsystem) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      mass: 10,
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      color: 'yellow',
      name: ''
    };
    _classCallCheck(this, Star);
    return _super.call(this, solarsystem, properties);
  }
  _createClass(Star, [{
    key: "move",
    value: function move() {
      /*
      const origin = this.getPosition();
      const target = {
          x: origin.x + this.velocity.x,
          y: origin.y + this.velocity.y,
      };
       const distance = Math.sqrt((target.x - origin.x) ** 2 + (target.y - origin.y) ** 2);
       this.distance_travelled += distance;
       this.setPosition(target);
      */
    }
  }]);
  return Star;
}(SolarSystemBody_1["default"]);
exports["default"] = Star;

/***/ }),

/***/ "./src/console.ts":
/*!************************!*\
  !*** ./src/console.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



// import fs from 'fs';
// import path from 'path';
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var SolarSystem_1 = __importStar(__webpack_require__(/*! ./SolarSystem */ "./src/SolarSystem.ts"));
var Star_1 = __importDefault(__webpack_require__(/*! ./Star */ "./src/Star.ts"));
var Planet_1 = __importDefault(__webpack_require__(/*! ./Planet */ "./src/Planet.ts"));
var Run_1 = __importDefault(__webpack_require__(/*! ./Run */ "./src/Run.ts"));
var solarsystem = new SolarSystem_1["default"](SolarSystem_1.RunMode.Console);
var run = new Run_1["default"](solarsystem);
var starProps = {
  mass: 10000,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'yellow',
  name: 'A'
};
var minMaxValues = {
  mass: {
    min: 5,
    max: 20,
    step: 1
  },
  position: {
    min: -400,
    max: 400,
    step: 10
  },
  velocity: {
    min: -10,
    max: 10,
    step: 0.1
  }
};
function getRandomPlanetProps() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var mass = Math.floor(Math.random() * (minMaxValues.mass.max - minMaxValues.mass.min)) + minMaxValues.mass.min;
  var positionX = Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min;
  var positionY = Math.floor(Math.floor(Math.random() * (minMaxValues.position.max - minMaxValues.position.min)) / 10) * 10 + minMaxValues.position.min;
  var velocityX = Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min;
  var velocityY = Math.floor(Math.random() * (minMaxValues.velocity.max - minMaxValues.velocity.min) / 2) + minMaxValues.velocity.min;
  return {
    name: "Planet ".concat(name),
    color: '#fff',
    mass: mass,
    position: {
      x: (Math.random() > 0.5 ? -1 : 1) * positionX,
      y: (Math.random() > 0.5 ? -1 : 1) * positionY
    },
    velocity: {
      x: (Math.random() > 0.5 ? -1 : 1) * velocityX,
      y: (Math.random() > 0.5 ? -1 : 1) * velocityY
    }
  };
}
function performRun(_x) {
  return _performRun.apply(this, arguments);
}
function _performRun() {
  _performRun = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(options) {
    var previousRun,
      i,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          previousRun = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];
          run.totalRuns = 0;
          run.totalStats = [];
          if (!(previousRun.length > 0)) {
            _context3.next = 7;
            break;
          }
          previousRun.forEach( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(prevRun) {
              var i, body;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    solarsystem.reset();
                    solarsystem.maxIterations = options.maxIterations;
                    solarsystem.maxDistance = options.maxDistance;
                    new Star_1["default"](solarsystem, starProps);
                    i = 0;
                  case 5:
                    if (!(i < prevRun.bodies.length)) {
                      _context2.next = 13;
                      break;
                    }
                    body = prevRun.bodies[i];
                    if (!(body.name === 'A')) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("continue", 10);
                  case 9:
                    new Planet_1["default"](solarsystem, {
                      name: body.name,
                      color: '#fff',
                      mass: body.mass,
                      position: body.initialPosition,
                      velocity: body.initialVelocity
                    });
                  case 10:
                    i++;
                    _context2.next = 5;
                    break;
                  case 13:
                    _context2.next = 15;
                    return run.startConsoleRun();
                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
          _context3.next = 17;
          break;
        case 7:
          if (!(run.totalRuns < options.maxRuns)) {
            _context3.next = 17;
            break;
          }
          solarsystem.reset();
          solarsystem.maxIterations = options.maxIterations;
          solarsystem.maxDistance = options.maxDistance;
          new Star_1["default"](solarsystem, starProps);
          for (i = 0; i < options.numberOfPlanets; i++) {
            new Planet_1["default"](solarsystem, getRandomPlanetProps(String(i + 1)));
          }
          _context3.next = 15;
          return run.startConsoleRun();
        case 15:
          _context3.next = 7;
          break;
        case 17:
          return _context3.abrupt("return", run.totalStats);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _performRun.apply(this, arguments);
}
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var options, stats, i;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        options = {
          maxRuns: 10000000,
          maxIterations: 1000,
          maxDistance: 10000,
          numberOfPlanets: 5
        };
        stats = [];
        i = 0;
      case 3:
        if (!(i < 5)) {
          _context.next = 12;
          break;
        }
        _context.next = 6;
        return performRun(options, stats);
      case 6:
        stats = _context.sent;
        // options.maxRuns *= 2;
        options.maxIterations *= 2;
        options.maxDistance *= 2;
      case 9:
        i++;
        _context.next = 3;
        break;
      case 12:
        console.log(JSON.stringify(stats));
        /*
        const outputFilename = path.resolve(__dirname, `./results/planets${options.numberOfPlanets}-runs${options.maxRuns}-results.json`);
        fs.writeFile(outputFilename, JSON.stringify(stats), (err) => {
            if (err) console.error(err);
            console.log(`Written ${stats.length} results to ${outputFilename}`);
        });
        */
      case 13:
      case "end":
        return _context.stop();
    }
  }, _callee);
}))();

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/console.ts");
/******/ 	
/******/ })()
;