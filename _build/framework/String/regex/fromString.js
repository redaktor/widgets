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
    var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
    function regexString(str) {
        return str.replace(SPECIAL_CHARS_REGEX, '\\$&');
    }
    exports.regexString = regexString;
    function regexFromString(str) {
        return new RegExp(regexString(str));
    }
    exports.default = regexFromString;
});
//# sourceMappingURL=fromString.js.map