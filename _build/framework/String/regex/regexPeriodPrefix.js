(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lexicon/abbreviations/TLD", "../lexicon/abbreviations/fileExtension"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TLD_1 = require("../lexicon/abbreviations/TLD");
    var fileExtension_1 = require("../lexicon/abbreviations/fileExtension");
    var periodPrefix = new RegExp(TLD_1.default + "|" + fileExtension_1.default);
    exports.default = periodPrefix;
});
//# sourceMappingURL=regexPeriodPrefix.js.map