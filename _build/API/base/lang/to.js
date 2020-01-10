(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./isFlattenable", "./isObjectTypes", "../Object/keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var isFlattenable_1 = require("./isFlattenable");
    var isObjectTypes_1 = require("./isObjectTypes");
    var keys_1 = require("../Object/keys");
    function toStr(v, fn) {
        if (typeof fn === 'function') {
            v = fn(v);
        }
        return typeof v === 'string' ? v : JSON.stringify(v);
    }
    exports.toStr = toStr;
    function toValues(v) {
        var isF = isFlattenable_1.default(v);
        return !isF && isObjectTypes_1.isObjectLike(v) ? keys_1.values(v) : (isF || typeof v === 'string' ? v : tslib_1.__spread(v));
    }
    exports.toValues = toValues;
});
//# sourceMappingURL=to.js.map