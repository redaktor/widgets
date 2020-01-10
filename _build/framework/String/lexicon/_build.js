(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../main", "../lang/en/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var main_1 = require("../main");
    var convert_1 = require("../lang/en/convert");
    // inflect 'Singulars', conjugate 'Infinitives', and convert 'Comparables'
    function build(lex, options) {
        if (options === void 0) { options = {}; }
        // handle default options
        options = options || {};
        var _loop_1 = function (s) {
            // conjugate infinitive Verbs
            if (!!options.conjugate && lex[s] === 'Infinitive') {
                var V = main_1.VerbTerms.fromString(s);
                var o = V.fastConjugate(s);
                for (var t in o) {
                    if (lex[o[t]] === void 0) {
                        lex[o[t]] = t;
                        return "continue-lexiLoop";
                    }
                }
            }
            // inflect singular nouns
            if (!!options.inflect && lex[s] === 'Singular') {
                var N = main_1.NounTerms.fromString(s);
                var plural = N.toPlural(s).out();
                lex[plural] = 'Plural';
                return "continue-lexiLoop";
            }
            // conjugate comparable adjectives
            if (lex[s] === 'Comparable') {
                ['Comparative', 'Superlative', 'Noun', 'Adverb'].forEach(function (type) {
                    var w = convert_1.default(s, 'Adjective', type);
                    if (lex[w] === void 0) {
                        lex[w] = type;
                    }
                });
                return "continue-lexiLoop";
            }
        };
        lexiLoop: /* loops through each word in lexicon */ for (var s in lex) {
            var state_1 = _loop_1(s);
            switch (state_1) {
                case "continue-lexiLoop": continue lexiLoop;
            }
        }
        // ..just in case
        delete lex[''];
        return lex;
    }
    exports.build = build;
    ;
    // collect the first-words of multiple-word-terms, for quicker lookup
    function firstWords(lex) {
        var firstWords = {};
        var keys = Object.keys(lex);
        var hasSpace = / /;
        for (var i = 0; i < keys.length; i++) {
            if (hasSpace.test(keys[i]) === true) {
                var words = keys[i].split(/ /g);
                firstWords[words[0]] = firstWords[words[0]] || [];
                var str = words.slice(1).join(' ');
                firstWords[words[0]][str] = true;
            }
        }
        return firstWords;
    }
    exports.firstWords = firstWords;
    ;
});
//# sourceMappingURL=_build.js.map