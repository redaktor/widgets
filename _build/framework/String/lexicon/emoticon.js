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
    var emoticons = {
        ':(': 1,
        ':)': 1,
        ':P': 1,
        ':p': 1,
        ':O': 1,
        ':3': 1,
        ':|': 1,
        ':/': 1,
        ':\\': 1,
        ':$': 1,
        ':*': 1,
        ':@': 1,
        ':-(': 1,
        ':-)': 1,
        ':-P': 1,
        ':-p': 1,
        ':-O': 1,
        ':-3': 1,
        ':-|': 1,
        ':-/': 1,
        ':-\\': 1,
        ':-$': 1,
        ':-*': 1,
        ':-@': 1,
        ':^(': 1,
        ':^)': 1,
        ':^P': 1,
        ':^p': 1,
        ':^O': 1,
        ':^3': 1,
        ':^|': 1,
        ':^/': 1,
        ':^\\': 1,
        ':^$': 1,
        ':^*': 1,
        ':^@': 1,
        '):': 1,
        '(:': 1,
        '$:': 1,
        '*:': 1,
        ')-:': 1,
        '(-:': 1,
        '$-:': 1,
        '*-:': 1,
        ')^:': 1,
        '(^:': 1,
        '$^:': 1,
        '*^:': 1,
        '<3': 1,
        '</3': 1,
        '<\\3': 1
    };
    exports.default = emoticons;
});
//# sourceMappingURL=emoticon.js.map