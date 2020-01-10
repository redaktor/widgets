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
    /**
     * Determines whether two values are the same value.
     *
     * @param a First value to compare
     * @param b Second value to compare
     * @return true if the values are the same; false otherwise;
     */
    function isIdentical(a, b) {
        return (a === b ||
            /* both values are NaN */
            (a !== a && b !== b));
    }
    exports.isIdentical = isIdentical;
});
//# sourceMappingURL=isIdentical.js.map