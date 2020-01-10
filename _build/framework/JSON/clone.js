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
    * Deeply conform to JSON spec (e.g. no undefined)
    * @param  {any} value value to clone
    * @return {any} cloned obj
    */
    function deepClone(value, forceObject) {
        if (forceObject === void 0) { forceObject = false; }
        //if (forceObject && Array.isArray(value)) { value = {value} }
        switch (typeof value) {
            case "string":
                return forceObject ? JSON.parse(value) : value;
            case "object":
                return JSON.parse(JSON.stringify(value));
            case "undefined":
                return null;
            default:
                return forceObject ? JSON.parse(JSON.stringify({ value: value })) : value;
        }
    }
    exports.default = deepClone;
});
//# sourceMappingURL=clone.js.map