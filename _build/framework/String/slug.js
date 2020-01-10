(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./regex/regexComboMark", "./regex/regexNotUrlSafe", "./lexicon/unicode", "./trim"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    //import latin from './regex/regexLatin';
    var regexComboMark_1 = require("./regex/regexComboMark");
    var regexNotUrlSafe_1 = require("./regex/regexNotUrlSafe");
    var unicode_1 = require("./lexicon/unicode");
    var trim = require("./trim");
    function deburr(str, options) {
        if (options === void 0) { options = {
            unicode: true,
            customReplace: {}
        }; }
        str = ("" + str).replace(regexComboMark_1.default, '');
        var r = tslib_1.__assign({}, unicode_1.default, options.customReplace);
        for (var k in r) {
            str = str.replace(new RegExp("[" + k + "]", 'gu'), r[k]);
        }
        return str;
    }
    exports.deburr = deburr;
    function slug(str, optionsOrSeparatorStr) {
        if (optionsOrSeparatorStr === void 0) { optionsOrSeparatorStr = {
            separator: '-',
            lowercase: true,
            leading: false,
            trailing: false,
            decamelize: true,
            customReplace: {}
        }; }
        var options = typeof optionsOrSeparatorStr === 'string' ?
            { separator: optionsOrSeparatorStr } : optionsOrSeparatorStr;
        options.separator = "" + options.separator;
        var separator = regexNotUrlSafe_1.default.test(options.separator) ? '-' : options.separator;
        var decamelize = options.decamelize, leading = options.leading, trailing = options.trailing;
        if (options.decamelize) {
            str = str.replace(/([a-z\d])([A-Z])/g, '$1 $2');
        }
        str = deburr(str.trim(), options).normalize('NFKD')
            .replace(regexNotUrlSafe_1.default, separator).replace(/\\/g, '');
        if (options.lowercase) {
            str = str.toLowerCase();
        }
        if (leading && trailing) {
            return str;
        }
        var trimKey = !leading && !trailing ? 'trim' : (!leading ? 'trimStart' : 'trimEnd');
        return trim[trimKey](str, separator);
    }
    exports.default = slug;
});
//# sourceMappingURL=slug.js.map