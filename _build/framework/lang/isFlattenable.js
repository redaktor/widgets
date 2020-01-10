(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isArgs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArgs_1 = require("./isArgs");
    function isFlattenable(v) {
        return Array.isArray(v) || isArgs_1.default(v) ||
            !!(Symbol.isConcatSpreadable && v && v[Symbol.isConcatSpreadable]);
    }
    exports.default = isFlattenable;
});
//# sourceMappingURL=isFlattenable.js.map