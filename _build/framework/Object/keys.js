(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../JSON/Pointer", "../lang/isArgs", "../lang/isPrototype", "../lang/isObjectTypes", "../lang/isArrayTypes", "../lang/to", "../Collection/each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Pointer_1 = require("../JSON/Pointer");
    var isArgs_1 = require("../lang/isArgs");
    var isPrototype_1 = require("../lang/isPrototype");
    var isObjectTypes_1 = require("../lang/isObjectTypes");
    var isArrayTypes_1 = require("../lang/isArrayTypes");
    var to_1 = require("../lang/to");
    var each_1 = require("../Collection/each");
    //export const each = E; // CYCLICAL !
    var hasOwnProperty = Object.hasOwnProperty;
    var oIs = function (v) {
        var _is = {
            arr: Array.isArray(v), buf: (typeof Buffer !== 'undefined' && Buffer.isBuffer(v)), args: isArgs_1.default(v)
        };
        _is.typed = !_is.buf && isArrayTypes_1.isTypedArray(v);
        return _is;
    };
    var pathArr = function (v) { return Array.isArray(v) ? (Array.isArray(v[0]) ? v[0] : v) : [v]; };
    var noPath = function (paths) {
        paths = pathArr(paths);
        return function (k) { return (paths.indexOf(k) < 0 && paths.indexOf(k.slice(1)) < 0); };
    };
    function enumerableInherited(o, R) {
        if (R === void 0) { R = []; }
        if (o === null) {
            return [];
        }
        if (!isObjectTypes_1.isObject(o)) {
            o = Object(o) || {};
        } // TODO FIXME initial in Proxy
        var isProto = isPrototype_1.default(o);
        for (var k in o) {
            !(k === 'constructor' && (isProto || !hasOwnProperty.call(o, k))) && R.push(k);
        }
        return R;
    }
    function doTimes(n, iteratee, i) {
        if (i === void 0) { i = -1; }
        var R = Array(n);
        while (++i < n) {
            R[i] = iteratee(i);
        }
        return R;
    }
    function _keys(o, inherited) {
        if (inherited === void 0) { inherited = false; }
        if (o instanceof Set || o instanceof Map) {
            return o.keys();
        }
        if (!isArrayTypes_1.isArrayLike(o)) {
            return !!inherited ? enumerableInherited(o) : Object.keys(o);
        }
        var _is = oIs(o);
        var _no = { buf: { offset: 1, parent: 1 }, typed: { buffer: 1, byteLength: 1, byteOffset: 1 } };
        _is.typed = !_is.buf && isArrayTypes_1.isTypedArray(o);
        var skip = _is.arr || _is.buf || _is.args || _is.typed;
        var R = skip ? doTimes(o.length || 0, String) : [];
        var L = R.length;
        for (var k in o) {
            var doSkip = (isArrayTypes_1.isIndex(k, length) || k === 'length' || (_is.buf && !!_no.buf[k]) ||
                (_is.typed && !!_no.typed[k]));
            if ((inherited || hasOwnProperty.call(o, k)) && !(skip && doSkip)) {
                R.push(k);
            }
        }
        return R;
    }
    function eachKeys(o, inherited, start, fn) {
        var myKeys = _keys(o, inherited);
        return each_1.each(myKeys, fn, start);
    }
    exports.eachKeys = eachKeys;
    function keys(o) { return _keys(o); }
    exports.keys = keys;
    function keysIn(o) { return _keys(o, true); }
    exports.keysIn = keysIn;
    function forIn(o, iteratee) { return eachKeys(o, true, 0, iteratee); }
    exports.forIn = forIn;
    function forInRight(o, iteratee) { return eachKeys(o, true, -1, iteratee); }
    exports.forInRight = forInRight;
    function forOwn(o, iteratee) { return eachKeys(o, false, 0, iteratee); }
    exports.forOwn = forOwn;
    function forOwnRight(o, iteratee) { return eachKeys(o, false, -1, iteratee); }
    exports.forOwnRight = forOwnRight;
    function invert(o) {
        return each_1.reduce(o, function (_o, v, k) { _o[to_1.toStr(v)] = k; return _o; }, {});
    }
    exports.invert = invert;
    function invertBy(o, fn) {
        return each_1.reduce(o, function (_o, v, k) { _o[fn(v, k, _o)] = k; return _o; }, {});
    }
    exports.invertBy = invertBy;
    function mapKeys(o, fn) {
        return each_1.reduce(keys(o), function (_o, k) { _o[fn(o[k], k, _o)] = o[k]; return _o; }, {});
    }
    exports.mapKeys = mapKeys;
    function mapKeysIn(o, fn) {
        return each_1.reduce(keysIn(o), function (_o, k) { _o[fn(o[k], k, _o)] = o[k]; return _o; }, {});
    }
    exports.mapKeysIn = mapKeysIn;
    function mapValues(o, fn) {
        return each_1.reduce(o, function (_o, v, k) { _o["" + k] = fn(v, k, _o); return _o; }, {});
    }
    exports.mapValues = mapValues;
    function unset(o) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return each_1.map(pathArr(paths), function (p) { return Pointer_1.default(o).remove(p); }) && o;
    }
    exports.unset = unset;
    function values(o) { return each_1.map(keys(o), function (k) { return o[k]; }); }
    exports.values = values;
    function valuesIn(o) { return each_1.map(keysIn(o), function (k) { return o[k]; }); }
    exports.valuesIn = valuesIn;
    function functions(o, inherited) {
        if (inherited === void 0) { inherited = false; }
        return !o ? [] : each_1.filter(_keys(o, inherited), function (k) { return (typeof o[k] === 'function'); });
    }
    exports.functions = functions;
    function functionsIn(o) { return functions(o, true); }
    exports.functionsIn = functionsIn;
    function pick(o) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return each_1.reduce(pathArr(paths), function (_o, p, i) { return Pointer_1.default(_o, p, Pointer_1.default(o, p)) && _o; }, {});
    }
    exports.pick = pick;
    function pickBy(o, fn, _o) {
        if (_o === void 0) { _o = {}; }
        return Pointer_1.default(o).walk(function (v, k) { return !!fn(v) && Pointer_1.default(_o, k, v); }) && _o;
    }
    exports.pickBy = pickBy;
    function omit(o) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return pick.apply(void 0, tslib_1.__spread([o], Object.keys(Pointer_1.default(o).dict()).filter(noPath(paths))));
    }
    exports.omit = omit;
    function omitBy(o, fn, _o) {
        if (_o === void 0) { _o = {}; }
        return Pointer_1.default(o).walk(function (v, k) { return !fn(v) && Pointer_1.default(_o, k, v); }) && _o;
    }
    exports.omitBy = omitBy;
    function toPairs(o, inherited) {
        if (inherited === void 0) { inherited = false; }
        if (o instanceof Set || o instanceof Map) {
            return o.entries();
        }
        return each_1.map(_keys(o, inherited), function (k) { return [k, o[k]]; });
    }
    exports.toPairs = toPairs;
    function toPairsIn(o) { return toPairs(o, true); } // TODO
    exports.toPairsIn = toPairsIn;
});
//# sourceMappingURL=keys.js.map