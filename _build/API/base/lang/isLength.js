(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require("../constants");
    function isLength(v) {
        return typeof v == 'number' && v > -1 && v % 1 === 0 && v <= constants_1.MAX_SAFE_INTEGER;
    }
    exports.isLength = isLength;
});
//# sourceMappingURL=isLength.js.map