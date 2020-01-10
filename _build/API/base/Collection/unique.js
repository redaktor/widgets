(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var each_1 = require("./each");
    function _unique(a, iteratee, comparator, retSet) {
        if (retSet === void 0) { retSet = false; }
        var _b = { R: [], S: new Set() }, R = _b.R, S = _b.S;
        if (!iteratee && !comparator) {
            return each_1.each(a, function (v) { return S.add(v); }) && tslib_1.__spread(S);
        }
        var rl = 0, _v;
        each_1.each(a, function (v, i, _a, next, stop, j) {
            if (j === void 0) { j = -1; }
            _v = !iteratee ? v : iteratee(v);
            if (S.has(_v)) {
                return next;
            }
            else {
                S.add(_v);
            }
            if (comparator) {
                while (++j < rl) {
                    if (comparator(v, R[j])) {
                        return next;
                    }
                }
            }
            if (!retSet) {
                R.push(a[i]);
            }
            rl++;
        });
        return !retSet ? R : S;
    }
    function makeUniq(a) { return _unique(a); }
    exports.makeUniq = makeUniq;
    // TODO FIXME CB types -->
    function uniqBy(a, iteratee) { return _unique(a, iteratee); }
    exports.uniqBy = uniqBy;
    function uniqWith(a, comparator) { return _unique(a, comparator); }
    exports.uniqWith = uniqWith;
});
//# sourceMappingURL=unique.js.map