(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/shim/Promise", "./array/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* import { global, lang } from '@dojo/core/main'; */
    var Promise_1 = require("@dojo/framework/shim/Promise");
    var main_1 = require("./array/main");
    function objectPromiseAll(obj, mapFn) {
        var _keys = Object.keys(obj);
        return Promise_1.default.all(_keys.map(function (k) { return mapFn ? mapFn(obj[k], k) : obj[k]; }))
            .then(function (result) { return result.reduce(main_1.toObject(_keys), {}); });
    }
    exports.objectPromiseAll = objectPromiseAll;
    ;
});
//# sourceMappingURL=promise.js.map