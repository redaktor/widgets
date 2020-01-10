(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lang/isFlattenable", "../Collection/each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isFlattenable_1 = require("../lang/isFlattenable");
    var each_1 = require("../Collection/each");
    var IE_MAX = 20670;
    function _flat(a, depth, iteratee, R) {
        if (depth === void 0) { depth = 1; }
        if (R === void 0) { R = []; }
        depth--;
        var hasIteratee = typeof iteratee === 'function';
        each_1.each(a, function (v, i, _a, goOn) {
            if (hasIteratee && !iteratee(v, i, a)) {
                return goOn;
            }
            (depth > -1 && isFlattenable_1.default(v)) ? _flat(v, depth, iteratee, R) : R.push(v);
        });
        return R;
    }
    function flatten(a, predicate) { return _flat(a, 1, predicate); }
    exports.flatten = flatten;
    function flattenDeep(a, predicate) { return _flat(a, IE_MAX, predicate); }
    exports.flattenDeep = flattenDeep;
    function flattenDepth(a, depth, predicate) {
        if (depth === void 0) { depth = IE_MAX; }
        return _flat(a, depth, predicate);
    }
    exports.flattenDepth = flattenDepth;
});
//# sourceMappingURL=flat.js.map