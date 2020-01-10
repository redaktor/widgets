(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../lang/range"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var range_1 = require("../lang/range");
    var hasMin = function (n, min) {
        if (min === void 0) { min = 2; }
        return (typeof n === 'number' && n >= min);
    };
    function slice(start, end, step, length) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        var _a;
        _a = tslib_1.__read(range_1.default(this.value, start, end, step), 4), start = _a[0], end = _a[1], step = _a[2], length = _a[3];
        var r = new Array(length);
        var j = 0;
        for (var i = start; start <= end ? i < end : i > end; i += step) {
            r[j] = this.value[i];
            j++;
        }
        return r;
    }
    exports.slice = slice;
    function chunk(size, i, rI) {
        if (size === void 0) { size = 2; }
        if (i === void 0) { i = 0; }
        if (rI === void 0) { rI = 0; }
        size = Math.max(size, 0);
        var L = this.value.length;
        var R = new Array(Math.ceil(L / size));
        while (i < L) {
            R[rI++] = this.value.slice(i, (i += size));
        }
        return R;
    }
    exports.chunk = chunk;
    function drop(n) {
        if (n === void 0) { n = 1; }
        return hasMin(n) ? this.value.slice(n) : this.value.slice(1);
    }
    exports.drop = drop;
    function dropLast(n) {
        if (n === void 0) { n = 1; }
        return hasMin(n) ? this.value.slice(0, 0 - n) : this.value.slice(0, 1);
    }
    exports.dropLast = dropLast;
    function take(n) {
        if (n === void 0) { n = 1; }
        return hasMin(n) ? this.value.slice(0, n) : this.value[0];
    }
    exports.take = take;
    function takeLast(n) {
        if (n === void 0) { n = 1; }
        return hasMin(n) ? this.value.slice(this.value.length - n) : this.value[this.value.length - 1];
    }
    exports.takeLast = takeLast;
});
//# sourceMappingURL=slice.js.map