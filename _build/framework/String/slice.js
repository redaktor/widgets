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
    * The base implementation of `_.slice`
    *
    * @private
    * @param {Array} array The array to slice.
    * @param {number} [start=0] The start position.
    * @param {number} [end=array.length] The end position.
    * @returns {Array} Returns the slice of `array`.
    */
    function baseSlice(array, start, end) {
        if (start === void 0) { start = 0; }
        var index = -1;
        var l = array.length;
        end = end === void 0 ? l : end;
        if (start < 0) {
            start = -start > l ? 0 : (l + start);
        }
        end = end > l ? l : end;
        if (end < 0) {
            end += l;
        }
        l = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;
        var result = Array(l);
        while (++index < l) {
            result[index] = array[index + start];
        }
        return result;
    }
    exports.baseSlice = baseSlice;
    /**
    * Casts `array` to a slice if it's needed.
    *
    * @private
    * @param {Array} array The array to inspect.
    * @param {number} start The start position.
    * @param {number} [end=array.length] The end position.
    * @returns {Array} Returns the cast slice.
    */
    function castSlice(array, start, end) {
        if (start === void 0) { start = 0; }
        var l = array.length;
        end = end === void 0 ? l : end;
        return (!start && end >= l) ? array : baseSlice(array, start, end);
    }
    exports.default = castSlice;
});
//# sourceMappingURL=slice.js.map