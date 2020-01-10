(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/main", "../lang/range"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("../Collection/main");
    var range_1 = require("../lang/range");
    var _a = tslib_1.__read(['Collection/', 'Array/'], 2), _C = _a[0], _A = _a[1];
    var _b = tslib_1.__read([_C + "each", _C + "slice", _C + "unique", _C + "while"], 4), E = _b[0], S = _b[1], U = _b[2], W = _b[3];
    var _c = tslib_1.__read([_A + "diu", _A + "flat", _A + "zip"], 3), D = _c[0], F = _c[1], Z = _c[2];
    //@Collection.options({hello: 'world'})
    var ARRAY = /** @class */ (function (_super) {
        tslib_1.__extends(ARRAY, _super);
        function ARRAY(_input, _options) {
            if (_input === void 0) { _input = []; }
            if (_options === void 0) { _options = {}; }
            var _this = _super.call(this, _input) || this;
            _this._input = _input;
            _this._options = _options;
            return _this.init({ proxyHandler: VIRTUAL_ARRAY, awaits: {
                    chunk: S, drop: S, dropLast: S, take: S, takeLast: S,
                    zip: Z, zipWith: Z, unzip: Z, unzipWith: Z, pullAt: E, slice: S,
                    without: D, difference: D, differenceBy: D, differenceWith: D, intersection: D,
                    intersectionBy: D, intersectionWith: D, union: D, unionBy: D, unionWith: D,
                    xor: D, xorBy: D, xorWith: D, pull: D, pullAll: D, pullAllBy: D,
                    makeUniq: U, uniqBy: U, uniqWith: U, flatten: F, flattenDeep: F, flattenDepth: F,
                    findIndex: W, findLastIndex: W, dropWhile: W, dropLastWhile: W,
                    takeWhile: W, takeLastWhile: W, fromPairs: E, fill: E
                } });
        }
        return ARRAY;
    }(main_1.default));
    exports.default = ARRAY;
    var NATIVE_METHODS = Object.getOwnPropertyNames(Object.getPrototypeOf([]));
    var aGets = {
        rest: 'drop', tail: 'drop', initial: 'dropLast',
        compact: 'excludeFalsy', reversed: 'reverse', uniq: 'makeUniq', unique: 'makeUniq',
        flat: 'flatten', deepFlat: 'flattenDeep', sampled: 'sample', shuffled: 'shuffle'
    };
    var aAlias = {
        size: 'length', makeUnique: 'makeUniq', uniqueBy: 'uniqBy', uniqueWith: 'uniqWith'
    };
    function doIndex(a, s) {
        if (s === 'first' || s === 'head') {
            return 0;
        }
        if (s === 'last') {
            return a.length - 1;
        }
        var nr = parseInt(s, 10);
        return nr < 0 ? a.length + nr : nr;
    }
    function pythonRange(target /* TODO FIXME */, prop, indices) {
        if (indices === void 0) { indices = false; }
        var PYTHON_INDEX_REG = /^[+-\d:]+$/;
        if (!PYTHON_INDEX_REG.test(prop)) {
            return void 0;
        }
        var _a = tslib_1.__read(prop.split(':').map(function (part) { return parseInt(part, 10); }), 3), start = _a[0], end = _a[1], step = _a[2];
        return !indices ? target.slice(start, end, step) : range_1.default(target.value, start, end, step);
    }
    var INDEX_REG = (/index(?:of|by)?$/gi);
    var VIRTUAL_ARRAY = {
        has: function (target /* TODO FIXME */, prop) {
            return (typeof prop === 'string' && prop.charAt(0) !== '_');
        },
        get: function (target /* TODO FIXME */, prop) {
            var v = target.value;
            /*if (prop === 'inspect') {
              return v
            }*/
            if (aAlias[prop]) {
                prop = aAlias[prop];
            }
            if (aGets[prop]) {
                prop = aGets[prop];
            }
            console.log('pv', prop, v);
            // see https://github.com/nodejs/node/issues/10731 :
            if (typeof prop !== 'string') {
                return Reflect.get(v, prop);
            }
            if (prop === 'prototype') {
                return void 0;
            }
            if (prop === 'name') {
                return ARRAY;
            }
            /* TODO FIXME LENGTH 0 :: push, concat etc. ...
            const L = a.length;
            if (!L) {
              if (INDEX_REG.test(prop)) { return -1 }
              return typeof doIndex(target, prop) === 'number' ? void 0 : this
            } */
            if (Reflect.has(target, prop)) {
                console.log('PROXY:', prop, Reflect.get(target, prop));
                return Reflect.get(target, prop);
            }
            if (prop === 'get' || prop === 'nth') {
                return function (p) { return (typeof p === 'undefined' && target) || target[doIndex(target, p)]; };
            }
            // TODO prop === 'set' with default value to fill
            if (prop.indexOf(':') > -1) {
                return (prop === ':') ? tslib_1.__spread(v) : pythonRange(v, prop);
            }
            if (!!NATIVE_METHODS[prop]) {
                return Reflect.get(v, prop);
            }
            // TODO if string begins with '/' JSON Pointer TODO FIXME
            return v[doIndex(v, prop)];
        },
        set: function (target, prop, val) {
            var v = target.value;
            if (typeof prop !== 'string') {
                return Reflect.set(v, prop, val);
            }
            if (prop.indexOf(':') > -1) {
                if (!Array.isArray(val)) {
                    val = Array.of(val);
                }
                var j_1 = 0;
                target.each.apply(target, tslib_1.__spread([function (_v, i) {
                        // Reflect does basically : 	this.get(target, 'remove')(i)
                        if (j_1 >= val.length) {
                            return Reflect.deleteProperty(v, i) && j_1++;
                        }
                        v[i] = val[j_1];
                        j_1++;
                    }], pythonRange(v, prop, true)));
            }
            else {
                v[doIndex(v, prop)] = val;
            }
            // TODO if string begins with '/' JSON Pointer TODO FIXME
            return true;
        } /*,
        apply: function(target: any, prop: string, args: any[]) {
          console.log('APPLY', prop)
        }*/
    };
});
//# sourceMappingURL=main.js.map