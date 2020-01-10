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
    var _b;
    var constants_1 = require("../constants");
    var isFlattenable_1 = require("../lang/isFlattenable");
    var range_1 = require("../lang/range");
    // TODO FIXME reduceCB
    function pullAt(a, indexes) {
        var e_1, _b;
        var r = [];
        var _a = new Map(a.map(function (v, i) { return [i, v]; }));
        try {
            for (var indexes_1 = tslib_1.__values(indexes), indexes_1_1 = indexes_1.next(); !indexes_1_1.done; indexes_1_1 = indexes_1.next()) {
                var key = indexes_1_1.value;
                r.push(_a.get(key));
                _a.delete(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (indexes_1_1 && !indexes_1_1.done && (_b = indexes_1.return)) _b.call(indexes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return ((a.length = 0) || a.push.apply(a, Array.from(_a.values()))) && r;
    }
    exports.pullAt = pullAt;
    function _each(a, fn, start, end, step, _is, v, R, T, L) {
        if (_is === void 0) { _is = { each: 1 }; }
        var _b;
        _b = tslib_1.__read(range_1.default(a, start, end, step), 5), start = _b[0], end = _b[1], step = _b[2], L = _b[3], R = _b[4];
        var _end = !end ? L : end;
        var countFn = (start <= _end ? function (i) { return i < _end; } : function (i) { return i > _end; });
        var isPlain = !!a && !isFlattenable_1.default(a) && typeof a === 'object';
        if (_is.reduce) {
            if (typeof v === 'undefined') {
                v = R[0];
            }
            for (var i = start; countFn(i); i += step) {
                v = fn(R[i], (isPlain ? Object.keys(a)[i] : i), R, constants_1.CONTINUE, constants_1.BREAK);
                if (v === constants_1.BREAK) {
                    break;
                }
            }
            return v;
        }
        else if (_is.filter || _is.reject || _is.partition) {
            //    console.log('FILTER', _is.filter, a, fn)
            var OK = [];
            for (var i = start; countFn(i); i += step) {
                v = fn(R[i], (isPlain ? Object.keys(a)[i] : i), R, constants_1.CONTINUE, constants_1.BREAK);
                if ((_is.reject && !v) || (!_is.reject && !!v)) {
                    OK.push(R[i]);
                }
                if (v === constants_1.BREAK) {
                    break;
                }
                else if (!_is.partition || v === constants_1.CONTINUE) {
                    continue;
                }
                pullAt(a, [i]);
            }
            return OK;
        } // each, map, every, some :
        for (var i = start; countFn(i); i += step) {
            v = fn(R[i], (isPlain ? Object.keys(a)[i] : i), R, constants_1.CONTINUE, constants_1.BREAK);
            if (v === constants_1.CONTINUE || _is.each) {
                continue;
            }
            else if (v === constants_1.BREAK) {
                break;
            }
            if (_is.every && !v) {
                return false;
            }
            else if (_is.some && !!v) {
                return true;
            }
            if (_is.map) {
                R[i] = v;
            }
        }
        return (_is.every || _is.some) ? !!_is.every : R;
    }
    var eachFns = ['each', 'every', 'filter', 'map', 'partition', 'reject', 'some'];
    exports.each = (_b = tslib_1.__read(eachFns.map(function (k) {
        return function (a, fn, start, end, step) {
            if (start === void 0) { start = 0; }
            var _b;
            return _each(a, fn, start, end, step, (_b = {}, _b[k] = 1, _b));
        };
    }), 7), _b[0]), exports.every = _b[1], exports.filter = _b[2], exports.map = _b[3], exports.partition = _b[4], exports.reject = _b[5], exports.some = _b[6];
    function reduce(a, fn, accumulator, start, end, step) {
        if (start === void 0) { start = 0; }
        return _each(a, fn, start, end, step, { reduce: 1 }, accumulator);
    }
    exports.reduce = reduce;
    function remove(a, fn) {
        // TODO get Iteratee - can be index:
        if (typeof fn === 'number') {
            var nr_1 = fn;
            fn = function (v, i) { return (nr_1 === i); };
        }
        var R = [];
        pullAt(a, _each(a, function (v, i) { if (fn(v, i)) {
            R.push(v);
            return i;
        } }, 0, void 0, 1, { map: 1 }));
        return R;
    }
    exports.remove = remove;
    function fromPairs(a, r) {
        if (r === void 0) { r = {}; }
        return _each(a, function (v) { r[v[0]] = v[1]; }) && r;
    }
    exports.fromPairs = fromPairs;
    function fill(a, value, start, end) {
        return _each(a, function (v) { return value; }, start, end, 1, { map: 1 });
    } // TODO FIXME fill: (a, value, start, end) => map(a, (v) => value, start, end), // value = void 0
    exports.fill = fill;
    function excludeFalsy(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        return _each(a, function (v) { return v; }, 0, void 0, 1, { filter: 1 });
    }
    exports.excludeFalsy = excludeFalsy;
    function zipObject(a, b, o) {
        if (o === void 0) { o = {}; }
        return _each(a, function (r, v, i) { r[v] = b[i]; return r; }, 0, void 0, 1, { reduce: 1 }, o);
    }
    exports.zipObject = zipObject;
});
//# sourceMappingURL=each.js.map