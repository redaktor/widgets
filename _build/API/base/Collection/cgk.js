(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../lang/to", "./each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var _a;
    var to_1 = require("../lang/to");
    var each_1 = require("./each");
    function _cgk(a, fn, start, end, step, type) {
        if (type === void 0) { type = 'count'; }
        var reduceFn = function (o, v) {
            var k = to_1.toStr(v, fn);
            if (typeof k === 'string') {
                if (type === 'group') {
                    if (!Array.isArray(o[k])) {
                        o[k] = [];
                    }
                    o[k].push(v);
                }
                else {
                    o[k] = type === 'key' ? v : ((o[k] || 0) + 1);
                }
            }
            return o;
        };
        return each_1.reduce(a, reduceFn, {}, start, end, step);
    }
    function count(a, start, end, step) {
        if (start === void 0) { start = 0; }
        return _cgk(a, void 0, start, end, step);
    }
    exports.count = count;
    var cgkFns = ['countBy', 'groupBy', 'keyBy'];
    exports.countBy = (_a = tslib_1.__read(cgkFns.map(function (k) {
        return function (a, fn, start, end, step) {
            if (start === void 0) { start = 0; }
            return _cgk(a, fn, start, end, step);
        };
    }), 3), _a[0]), exports.groupBy = _a[1], exports.keyBy = _a[2];
});
//# sourceMappingURL=cgk.js.map