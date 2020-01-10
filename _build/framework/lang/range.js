(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./to"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var to_1 = require("./to");
    function startEndStepLength(a, start, end, step, L) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        if (L === void 0) { L = 0; }
        var _a;
        var R = to_1.toValues(a);
        L = !L ? R.length : L;
        end = typeof end === 'undefined' || !end ? L : end;
        var parse = function (v, defaultValue, resolveNegative) {
            if (resolveNegative === void 0) { resolveNegative = true; }
            if (typeof v === 'undefined' || isNaN(v)) {
                return defaultValue;
            }
            if (resolveNegative && v < 0) {
                v += L;
            }
            return v;
        };
        step = parse(step, 1, false);
        if (step === 0) {
            return [start, end || L, step, L, R];
        }
        else if (step > 1 && L !== 0) {
            L = L / step;
        }
        _a = tslib_1.__read((step > 0) ? [parse(start, 0), parse(end, (start < 0) ? 0 : L)] : [parse(start, L - 1), parse(end, -1)], 2), start = _a[0], end = _a[1];
        return [start, end, step, L, R];
    }
    exports.default = startEndStepLength;
});
//# sourceMappingURL=range.js.map