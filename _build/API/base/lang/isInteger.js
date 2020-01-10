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
    // much faster than cached /^\d+$/.test(str)
    function isIntegerString(s) {
        if (typeof s === 'number') {
            s = "" + s;
        }
        var i = 0;
        var len = s.length;
        var charCode;
        while (i < len) {
            charCode = s.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) {
                i++;
                continue;
            }
            return false;
        }
        return true;
    }
    exports.isIntegerString = isIntegerString;
    function isInteger(n) {
        return typeof n === 'number' && isIntegerString("" + n);
    }
    exports.default = isInteger;
});
//# sourceMappingURL=isInteger.js.map