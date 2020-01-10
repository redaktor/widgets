(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./fromStringOrArray"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fromStringOrArray_1 = require("./fromStringOrArray");
    var replacements = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss', 'ph': 'f' };
    var replaceRegex = new RegExp("[" + Object.keys(replacements).join(']|[') + "]", 'g');
    var codes = { aeijouy: 0, bp: 1, dt: 2, fvw: 3, cgkq: 4, x: 48, l: 5, mn: 6, r: 7, csz: 8 };
    var exceptions = {
        prefix: {
            ca: 4, ch: 4, ck: 4, cl: 4, co: 4, cq: 4, cu: 4, cx: 4,
            dc: 8, ds: 8, dz: 8, tc: 8, ts: 8, tz: 8
        },
        suffix: {
            sc: 8, zc: 8, cx: 8, kx: 8, qx: 8
        }
    };
    function colognePhonetic(word, index, arr) {
        if (typeof word !== 'string') {
            return '';
        }
        var values = [];
        word = word.replace(replaceRegex, function (s) { return replacements[s]; });
        var l = word.length;
        var _loop_1 = function () {
            var char = word.charAt(i);
            var patterns = ["" + char + word.charAt(i + 1), "" + word.charAt(i - 1) + char];
            values.push((i === 0 && l > 1 && patterns[0] === 'cr') ? '4' : '');
            ['prefix', 'suffix'].forEach(function (key, i) {
                var code = exceptions[key][patterns[i]];
                if (code) {
                    values[i] = "" + code;
                }
            });
            if (values[i] === '') {
                for (var chars in codes) {
                    if (chars.indexOf(char) > -1) {
                        values[i] = "" + codes[chars];
                        break;
                    }
                }
            }
            if (!!i && (values[i] === values[i - 1] || values[i] === '0')) {
                values[i] = '';
            }
        };
        for (var i = 0; i < l; i++) {
            _loop_1();
        }
        return values.join('');
    }
    function colognePhonetics(pattern) {
        return fromStringOrArray_1.default(pattern, colognePhonetic);
    }
    exports.default = colognePhonetics;
});
//# sourceMappingURL=colognePhonetics.js.map