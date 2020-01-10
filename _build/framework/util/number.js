(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sign(n) {
        /* only needed for IE off course */
        if (typeof Math.sign === 'undefined') {
            if (!n) {
                return 0;
            }
            return (n > 0) ? 1 : -1;
        }
        return Math.sign(n);
    }
    function preciseRound(n, exp) {
        if (exp === void 0) { exp = 4; }
        var t = Math.pow(10, exp);
        var f = (10 / Math.pow(100, exp));
        var a = ((n * t) + (exp > 0 ? 1 : 0) * (sign(n) * f));
        return parseFloat((Math.round(a) / t).toFixed(exp));
    }
    exports.preciseRound = preciseRound;
});
//# sourceMappingURL=number.js.map