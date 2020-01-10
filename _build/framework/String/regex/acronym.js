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
    exports.oneLetterAcronym = /^[A-Z]\.$/;
    exports.noPeriodAcronym = /[A-Z]{3}$/;
    exports.periodAcronym = /([A-Z]\.)+[A-Z]?$/;
    function isAcronym(s) {
        return !![exports.oneLetterAcronym, exports.noPeriodAcronym, exports.periodAcronym].filter(function (r) { return r.test(s); }).length;
    }
    exports.default = isAcronym;
});
//# sourceMappingURL=acronym.js.map