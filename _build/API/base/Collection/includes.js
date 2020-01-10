(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lang/isEqual", "../lang/to", "../Array/diu"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isEqual_1 = require("../lang/isEqual");
    var to_1 = require("../lang/to");
    var diu_1 = require("../Array/diu");
    function includes(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        return (diu_1.differenceBy(to_1.toValues(a), b, isEqual_1.default).length === 0);
    }
    exports.includes = includes;
});
//# sourceMappingURL=includes.js.map