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
    exports.oneLetter = /(^|\s|\.)[a-z][.]\s*?$/i;
    exports.ellipsis = /[.]\.+( +)?$/;
    exports.acronym = /[ |.][A-Z].?( *)?$/i;
    exports.noVowel = /(^|\s|\.)[^aeiouy]+[.]\s*?$/i;
    function isAbbreviation(s) {
        return !![exports.oneLetter, exports.ellipsis, exports.acronym].filter(function (r) { return r.test(s); }).length;
    }
    exports.default = isAbbreviation;
});
//# sourceMappingURL=abbreviation.js.map