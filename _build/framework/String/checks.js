(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./regex/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("./regex/common");
    /* EXPORTS WITH ONLY 1 ARGUMENT (a string) */
    function hasUnicode(str) {
        return common_1.HasUnicode.test(str);
    }
    exports.hasUnicode = hasUnicode;
    function hasUnicodeWord(str) {
        return common_1.HasUnicodeWord.test(str);
    }
    exports.hasUnicodeWord = hasUnicodeWord;
    function unicodeWords(str) {
        return str.match(common_1.UnicodeWord) || [];
    }
    exports.unicodeWords = unicodeWords;
    function asciiWords(str) {
        return str.match(common_1.AsciiWord) || [];
    }
    exports.asciiWords = asciiWords;
    function stringToArray(str, splitter) {
        if (splitter === void 0) { splitter = ''; }
        return hasUnicode(str) ? (str.match(common_1.Unicode) || []) : str.split(splitter);
    }
    exports.stringToArray = stringToArray;
});
//# sourceMappingURL=checks.js.map