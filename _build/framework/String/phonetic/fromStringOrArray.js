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
    function stringOrArray(pattern, fn) {
        var patterns = Array.isArray(pattern) ? pattern : [];
        if (typeof pattern === 'string') {
            if (pattern.indexOf(' ') !== -1) {
                patterns = pattern.toLowerCase().split(' ');
            }
            else {
                patterns.push(pattern.toLowerCase());
            }
        }
        return patterns.map(fn);
    }
    exports.default = stringOrArray;
});
//# sourceMappingURL=fromStringOrArray.js.map