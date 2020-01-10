(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Collection/each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var each_1 = require("../Collection/each");
    /**
    * Recursively checks whether an object has any undefined values inside.
    */
    function hasUndefined(o) {
        if (o === undefined) {
            return true;
        }
        if (!!o && typeof o === 'object' && each_1.some(o, hasUndefined)) {
            return true;
        }
        return false;
    }
    exports.default = hasUndefined;
});
//# sourceMappingURL=hasUndefined.js.map