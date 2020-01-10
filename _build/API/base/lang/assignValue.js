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
    function eq(a, b) { return a === b || (a !== a && b !== b); }
    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} o The o to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(o, key, value) {
        if (key == '__proto__' && Object.defineProperty) {
            Object.defineProperty(o, key, {
                configurable: true, enumerable: true, value: value, writable: true
            });
        }
        else {
            o[key] = value;
        }
    }
    /**
     * Assigns `value` to `key` of `o` if the existing value is not equivalent
     *
     * @private
     * @param {Object} o The o to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(o, key, value) {
        var objValue = o[key];
        if (!(Object.hasOwnProperty.call(o, key) && eq(objValue, value)) ||
            (value === undefined && !(key in o))) {
            baseAssignValue(o, key, value);
        }
    }
    exports.default = assignValue;
});
//# sourceMappingURL=assignValue.js.map