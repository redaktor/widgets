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
    exports.rsApos = "['\u2019]";
    /** Used to match apostrophes. */
    exports.Apos = RegExp(exports.rsApos, 'g');
    exports.default = exports.Apos;
});
//# sourceMappingURL=regexApostroph.js.map