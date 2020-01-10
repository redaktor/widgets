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
    exports.rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
    exports.rsComboSymbolsRange = '\\u20d0-\\u20f0';
    /**
    * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
    * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
    */
    var comboMark = RegExp("[" + exports.rsComboMarksRange + exports.rsComboSymbolsRange + "]", 'g');
    exports.default = comboMark;
});
//# sourceMappingURL=regexComboMark.js.map