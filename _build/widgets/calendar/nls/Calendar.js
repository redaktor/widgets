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
    var locales = {};
    var messages = {
        chooseMonth: 'Choose Month',
        chooseYear: 'Choose Year',
        previousMonth: 'Previous Month',
        nextMonth: 'Next Month',
        previousYears: 'Earlier years',
        nextYears: 'Later years'
    };
    exports.default = { locales: locales, messages: messages };
});
//# sourceMappingURL=Calendar.js.map