(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/each", "../Collection/unique", "./flat"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var _c, _d;
    var each_1 = require("../Collection/each");
    var unique_1 = require("../Collection/unique");
    var flat_1 = require("./flat");
    function _RS() {
        return { R: [], S: new Set() };
    }
    // Difference, Intersection, Union - Base
    function _diuCheck(v, R, S, _is, iteratee) {
        if (_is === void 0) { _is = {}; }
        var computed = (!iteratee ? v : iteratee(v));
        (_is.intersection ? S.has(computed) : !S.has(computed)) && R.push(v);
    }
    function _diu(a, b, _is) {
        if (_is === void 0) { _is = { difference: 1 }; }
        if (_is.union) {
            return unique_1.makeUniq(a.concat(flat_1.flatten(b)));
        }
        var _c = _RS(), R = _c.R, S = _c.S;
        each_1.each(b, function (v) { S.add(v); });
        each_1.each(a, function (v) { return _diuCheck(v, R, S, _is); });
        return R;
    }
    function _diu_byWith(a, b, _is) {
        if (_is === void 0) { _is = { difference: 1 }; }
        var FN = b.pop(); // TODO FIXME get FN
        b = flat_1.flatten(b);
        var _c = _RS(), R = _c.R, S = _c.S;
        if (!_is.with) {
            if (_is.union) {
                return unique_1.uniqBy(a.concat(b), FN);
            }
            each_1.each(b, function (v) { return S.add(FN(v)); });
            each_1.each(a, function (v) { return _diuCheck(v, R, S, Object.keys(_is)[0], FN); });
            return _is.difference ? R : unique_1.uniqBy(R, FN);
        }
        if (_is.union) {
            return unique_1.uniqWith(a.concat(b), FN);
        }
        var BL = b.length;
        each_1.each(a, function (v, i, _a, next, stop, j) {
            if (j === void 0) { j = -1; }
            while (++j < BL) {
                if (FN(v, b[j])) {
                    return next;
                }
            }
            if (!S.has(v)) {
                !_is.intersection && R.push(v);
                S.add(v);
            }
        });
        if (_is.difference) {
            return R;
        }
        each_1.each(a, function (v) { return !S.has(v) && R.push(v); });
        return unique_1.uniqWith(R, FN);
    }
    // Symmetric Difference
    function _dx(a, b, byWith) {
        if (byWith === void 0) { byWith = ''; }
        var r;
        var FN = !byWith ? void 0 : a.pop();
        each_1.each(a.concat(b), function (v, i, _a, next, stop) {
            if (!Array.isArray(v)) {
                return next;
            }
            if (!i) {
                r = v;
                return next;
            }
            if (!byWith) {
                r = _diu(r, v, 'D').concat(_diu(v, r, 'D'));
            }
            else {
                var _is = { difference: 1, with: (byWith === 'with') };
                var A = _diu_byWith(r, v.concat([FN]), _is);
                r = A.concat(_diu_byWith(v, r.concat([FN]), _is));
            }
        });
        return !byWith ? unique_1.makeUniq(r) : ((byWith === 'by') ? unique_1.uniqBy(r, FN) : unique_1.uniqWith(r, FN));
    }
    function pullAll(a, values) { a.push.apply(a, _diu(a, values)); }
    exports.pullAll = pullAll;
    function pull(a) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        a.push.apply(a, _diu(a, values));
    }
    exports.pull = pull;
    function pullAllBy(a, b, iteratee) {
        var _b = tslib_1.__spread(b, [iteratee]);
        return a.push.apply(a, _diu_byWith(a, _b, { difference: 1, with: 1 }));
    }
    exports.pullAllBy = pullAllBy;
    function without(a) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return _diu(a, values);
    }
    exports.without = without;
    function xor(a) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return _dx(a, values);
    }
    exports.xor = xor;
    function xorBy(a) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return _dx(a, values, 'by');
    }
    exports.xorBy = xorBy;
    function xorWith(a) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return _dx(a, values, 'with');
    }
    exports.xorWith = xorWith;
    var diuFns = ['difference', 'intersection', 'union'];
    exports.difference = (_c = tslib_1.__read(diuFns.map(function (k) {
        return function (a) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            var _c;
            return _diu(a, values, (_c = {}, _c[k] = 1, _c));
        };
    }), 3), _c[0]), exports.intersection = _c[1], exports.union = _c[2];
    exports.differenceBy = (_d = tslib_1.__read(diuFns.reduce(function (a, k) { return a.concat([
        function (a) {
            var b = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                b[_i - 1] = arguments[_i];
            }
            var _c;
            return _diu_byWith(a, b, (_c = {}, _c[k] = 1, _c));
        },
        function (a) {
            var b = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                b[_i - 1] = arguments[_i];
            }
            var _c;
            return _diu_byWith(a, b, (_c = {}, _c[k] = 1, _c.with = 1, _c));
        }
    ]); }, []), 6), _d[0]), exports.differenceWith = _d[1], exports.intersectionBy = _d[2], exports.intersectionWith = _d[3], exports.unionBy = _d[4], exports.unionWith = _d[5];
});
//# sourceMappingURL=diu.js.map