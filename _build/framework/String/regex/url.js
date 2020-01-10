(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lexicon/abbreviations/TLD"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TLD_1 = require("../lexicon/abbreviations/TLD");
    exports.urlCheap = /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/;
    exports.urlTLD = new RegExp("^[w./]+.(" + TLD_1.default + ")");
    exports.TLD = new RegExp("^(" + TLD_1.default + ")");
    function isUrl(s) {
        return !![exports.urlCheap, exports.urlTLD].filter(function (r) { return r.test(s); }).length;
    }
    exports.default = isUrl;
});
//# sourceMappingURL=url.js.map