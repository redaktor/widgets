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
    function exportReduce(o, isComma, hasWhitespace) {
        if (isComma === void 0) { isComma = true; }
        if (hasWhitespace === void 0) { hasWhitespace = false; }
        var result = {};
        for (var v in o) {
            var k = hasWhitespace ? o[v] : o[v].replace(/(?:\n\s*)/g, "");
            var a = isComma ? k.split(',') : Array.isArray(k) ? k : [k];
            var l = a.length;
            for (var i = 0; i < l; i++) {
                result[a[i]] = v;
            }
        }
        return result;
    }
    exports.default = exportReduce;
});
//# sourceMappingURL=exporter.js.map