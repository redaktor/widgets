(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../JSON/Pointer", "./base/wrap"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Pointer_1 = require("../JSON/Pointer");
    var wrap_1 = require("./base/wrap");
    /* TODO
    https://jsfiddle.net/h9q5osgh/
    traps
    mutate = ADD, /value, r
    const operations = [
        { op: OperationType.ADD, path: new JsonPointer('/foo'), value: 'foo' },
        { op: OperationType.REPLACE, path: new JsonPointer('/bar'), value: 'bar' },
        { op: OperationType.REMOVE, path: new JsonPointer('/qux') },
    ];
    */
    /* TODO FIXME https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag */
    var _proxy;
    var _state = new WeakMap();
    var API = /** @class */ (function () {
        function API(_input, _options) {
            if (_options === void 0) { _options = {}; }
            var args = []; /* parent */
            for (var _i = 2 /* parent */; _i < arguments.length /* parent */; _i++ /* parent */) {
                args[_i - 2] = arguments[_i]; /* parent */
            }
            this._input = _input;
            this._options = _options;
            this.pointer = Pointer_1.default;
            // changes in subClasses ...
            this.isA = 'API'; // TODO JSON API self
            _state.set(this, { parent: args[0], result: { value: _input }, _last: 'value' });
            console.log('API input', _input);
            //this.value = _input;
        }
        API.prototype.init = function (o) {
            if (!!o.awaits && typeof o.awaits === 'object') {
                for (var k in o.awaits) {
                    this[k] = this.fn([o.awaits[k], k]);
                } // TODO FIXME path join
            }
            _proxy = (!!o.proxyHandler && typeof o.proxyHandler === 'object') ?
                new Proxy(this, o.proxyHandler) : false;
            return _proxy || this;
        };
        Object.defineProperty(API.prototype, "options", {
            get: function () { return this._options; },
            set: function (o) { this._options = o; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(API.prototype, "value", {
            /*
            get parent(): any { return _state.get(this).parent || this } // just a handy wrap
            set parent(p: any){ _state.set(this, parent = p }
            //get list(): any[] { return this.state.list || [] }
            //set list(a: any[]){ this.state.list = a }
            get value(): any { return this._state.result.value }
            set value(v: any){ this._state.result = {value: v} } // TODO array(), object() etc.
          */
            get: function () {
                var o = _state.get(this);
                return o.result[o._last];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(API.prototype, "parent", {
            get: function () { return _state.get(this).parent; },
            enumerable: true,
            configurable: true
        });
        API.prototype.$load = function (m) {
            return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                var _b;
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (_b = "./base/" + m, __syncRequire ? Promise.resolve().then(function () { return require(_b); }) : new Promise(function (resolve_1, reject_1) { require([_b], resolve_1, reject_1); }))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            }); });
        };
        API.prototype.$fn = function (m) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, M, F, fns, o;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = tslib_1.__read(typeof m === 'string' ? [m, 'default'] : m, 2), M = _a[0], F = _a[1];
                            return [4 /*yield*/, this.$load(M)];
                        case 1:
                            fns = _b.sent();
                            o = _state.get(this);
                            o.result[F] = fns[F].apply(fns, tslib_1.__spread([o.result[o._last]], args));
                            o._last = F;
                            _state.set(this, o);
                            //		this._state.result[F] = fns[F](this.value, ...args);
                            //    this.value = this._state.result[F];
                            //		console.log('!!', this._state.result);
                            return [2 /*return*/, _proxy || this];
                    }
                });
            });
        };
        API.prototype.fn = function (m) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return API._(_this.$fn.apply(_this, tslib_1.__spread([m], args)));
            };
        };
        API.options = function (defaultOptions) {
            if (defaultOptions === void 0) { defaultOptions = {}; }
            return function classDecorator(constructor) {
                /*
                const proto = Object.getPrototypeOf(new constructor());
                for (let p of Object.getOwnPropertyNames(proto)) {
                  if (p.charAt(0) === '_' || p === 'constructor') { continue }
                  console.log(Object.getOwnPropertyDescriptor(proto, p))
                }*/
                console.log('::', Object.getOwnPropertyNames(constructor), constructor);
                return /** @class */ (function (_super) {
                    tslib_1.__extends(class_1, _super);
                    function class_1() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var _this = _super.apply(this, tslib_1.__spread(args)) || this;
                        _this.isA = constructor.name;
                        _this.options = tslib_1.__assign({}, defaultOptions, args[0]);
                        return _this;
                    }
                    return class_1;
                }(constructor));
            };
        };
        API._ = wrap_1.default;
        return API;
    }());
    exports.default = API;
});
/*
export class ARRAY extends COLLECTION {
  get flat() { return this.flatten() }
  flatten(...args: any[]) { doFlat(this.value, 1, ...args); return this }
  //(a, predicate, r = []) => doFlat(a, 1, predicate, r),
}
*/
//api.a.b.a.a.c.hello.b.a;
//new TEST({opt1: false, opt2: true}).o
//# sourceMappingURL=main.js.map