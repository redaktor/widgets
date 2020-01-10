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
    function isEmpty(v) {
        if (v === void 0 || v === null || (v instanceof Error && !v.message.length)) {
            return true;
        }
        var vt = typeof v;
        if (vt === 'string' || vt === 'function' || Array.isArray(v)) {
            return !v.length;
        }
        if (vt === 'number') {
            return isNaN(v);
        }
        if (v.toString.toString() === Object.prototype.toString.toString()) {
            if (v.toString() !== '[object Object]') {
                return v.size === 0;
            }
            var k = void 0;
            for (k in v) {
                if (v.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    exports.default = isEmpty;
});
//# sourceMappingURL=isEmpty.js.map