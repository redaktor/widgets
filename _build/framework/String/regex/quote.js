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
    exports.singleQuote = /[\u2018\u2019\u201A\u201B\u2032\u2035]+/g;
    exports.doubleQuote = /[\u201C\u201D\u201E\u201F\u2033\u2036"]+/g;
    exports.startQuote = /^["'\u201B\u201C\u2033\u201F\u2018]/;
    exports.endQuote = /.["'\u201D\u2036\u2019]([;:,.])?$/;
    function isQuote(s) {
        return !![exports.singleQuote, exports.doubleQuote, exports.startQuote, exports.endQuote].filter(function (r) { return r.test(s); }).length;
    }
    exports.default = isQuote;
});
//# sourceMappingURL=quote.js.map