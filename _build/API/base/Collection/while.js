(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../constants", "../lang/isFlattenable", "../lang/range"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var constants_1 = require("../constants");
    var isFlattenable_1 = require("../lang/isFlattenable");
    var range_1 = require("../lang/range");
    function _while(a, fn, i, end, _is, st, L, R) {
        if (i === void 0) { i = 0; }
        if (_is === void 0) { _is = { key: 1 }; }
        var _a;
        _a = tslib_1.__read(range_1.default(a, i, end), 5), i = _a[0], end = _a[1], st = _a[2], L = _a[3], R = _a[4];
        if (i > end) {
            i++;
        }
        else {
            i--;
        }
        var countFn = i > end ? (function () { return (--i > end); }) : (function () { return (++i < end); });
        var isPlain = !!a && !isFlattenable_1.default(a) && typeof a === 'object';
        var kArgs = function (k) { return [R[k], (isPlain ? Object.keys(a)[k] : k), R, constants_1.CONTINUE, constants_1.BREAK]; };
        if (_is.key) {
            var _args = void 0;
            while (countFn()) {
                _args = kArgs(i);
                if (fn.apply(void 0, tslib_1.__spread(_args))) {
                    return _args[1];
                }
            }
            return -1;
        }
        else if (_is.value) {
            while (countFn()) {
                if (fn.apply(void 0, tslib_1.__spread(kArgs(i)))) {
                    return R[i];
                }
            }
            return void 0;
        }
        while (countFn() && fn.apply(void 0, tslib_1.__spread(kArgs(i)))) { }
        return R.slice.apply(R, tslib_1.__spread((i > end ? (_is.drop ? [0, i + 1] : [i + 1, L]) : (_is.drop ? [i, L] : [0, i]))));
    }
    // TODO FIXME CB type
    function find(a, fn, start, end) {
        if (start === void 0) { start = 0; }
        return _while(a, fn, start, end, { value: 1 });
    }
    exports.find = find;
    function findLast(a, fn, start, end) {
        if (start === void 0) { start = -1; }
        return _while(a, fn, start, end, { value: 1 });
    }
    exports.findLast = findLast;
    function findIndex(a, predicate, start, end) {
        if (start === void 0) { start = 0; }
        return _while(a, predicate, start, end, { key: 1 });
    }
    exports.findIndex = findIndex;
    function findLastIndex(a, predicate, start, end) {
        if (start === void 0) { start = -1; }
        return _while(a, predicate, start, end, { key: 1 });
    }
    exports.findLastIndex = findLastIndex;
    function dropWhile(a, predicate, start, end) {
        if (start === void 0) { start = 0; }
        return _while(a, predicate, start, end, { drop: 1 });
    }
    exports.dropWhile = dropWhile;
    function dropLastWhile(a, predicate, start, end) {
        if (start === void 0) { start = -1; }
        return _while(a, predicate, start, end, { drop: 1 });
    }
    exports.dropLastWhile = dropLastWhile;
    function takeWhile(a, predicate, start, end) {
        if (start === void 0) { start = 0; }
        return _while(a, predicate, start, end);
    }
    exports.takeWhile = takeWhile;
    function takeLastWhile(a, predicate, start, end) {
        if (start === void 0) { start = -1; }
        return _while(a, predicate, start, end);
    }
    exports.takeLastWhile = takeLastWhile;
});
//# sourceMappingURL=while.js.map