(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var each_1 = require("../Collection/each");
    var REGEXPS = {
        default: /\S/,
        punctuations: /(\S.+?[.!?])(?=\s+|$)/g,
        line: /(\n+)/,
        periodDigit: /\d[.]\s*?$/,
        /* abbreviation  :: */
        oneLetter: /(^|\s|\.)[a-z][.]\s*?$/i,
        noVowel: /(^|\s|\.)[^aeiouy]+[.]\s*?$/i,
        acronym: /[ |.][A-Z].?( *)?$/i,
        ellipsis: /[.]\.+( +)?$/,
    };
    function splitBy(s, rName) {
        if (rName === void 0) { rName = 'default'; }
        if (!REGEXPS[rName]) {
            return [s];
        }
        return array(s.split(REGEXPS[rName]));
    }
    function $splitSentences(text, sentences) {
        if (sentences === void 0) { sentences = []; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var s, chunks, splits;
            return tslib_1.__generator(this, function (_b) {
                s = String(text);
                if (!s) {
                    return [2 /*return*/, sentences];
                }
                chunks = array();
                splits = splitBy(s, 'line').map(function (l) { return splitBy(l, 'punctuations'); }) //.flatten();
                ;
                console.log(splits);
                // filter-out the grap ones
                each_1.each(splits, function (sp, i, _a, next, stop) {
                    if (!sp) {
                        return next;
                    }
                    // this is meaningful whitespace, add it to the last one or the next one ?
                    if (!/\S/.test(sp)) {
                        if (chunks[-1]) {
                            chunks[-1] += sp;
                            return next;
                        }
                        else {
                            var nI = i + 1;
                            if (splits[nI]) {
                                splits[nI] = "" + sp + splits[nI];
                                return next;
                            }
                        }
                    } // else, only whitespace, no terms, no sentence
                    chunks.push(sp);
                });
                console.log('c2', chunks);
                throw ('');
            });
        });
    }
    exports.$splitSentences = $splitSentences;
});
//# sourceMappingURL=sentences.js.map