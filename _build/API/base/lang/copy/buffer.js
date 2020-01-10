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
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    var hasFrom = Buffer.hasOwnProperty('from') && typeof Buffer.from === 'function';
    function copyBuffer(buf, isDeep) {
        if (isDeep === void 0) { isDeep = false; }
        if (isDeep) {
            return buf.slice();
        }
        if (hasFrom) {
            return Buffer.from(buf);
        }
        var copy = new Buffer(buf.length);
        buf.copy(copy);
        return copy;
    }
    exports.default = copyBuffer;
});
//# sourceMappingURL=buffer.js.map