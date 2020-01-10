(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./irregularNoun", "./irregularVerb"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var irregularNoun_1 = require("./irregularNoun");
    var irregularVerb_1 = require("./irregularVerb");
    /* ADVERBS */
    exports.Adverb = {
        toAdjective: {
            idly: 'idle', sporadically: 'sporadic', basically: 'basic', grammatically: 'grammatical',
            alphabetically: 'alphabetical', economically: 'economical', conically: 'conical',
            politically: 'political', vertically: 'vertical', practically: 'practical',
            theoretically: 'theoretical', critically: 'critical', fantastically: 'fantastic',
            mystically: 'mystical', pornographically: 'pornographic', fully: 'full',
            jolly: 'jolly', wholly: 'whole'
        }
    };
    /* ADJECTIVES */
    // adjectives that have irregular conjugations to adverb / comparative / superlative forms
    var Adjective = {
        toAdverb: {
            bad: 'badly', best: 'best', early: 'early', fast: 'fast', good: 'well', hard: 'hard',
            icy: 'icily', idle: 'idly', late: 'late', latter: 'latter', little: 'little',
            long: 'long', low: 'low', male: 'manly', public: 'publicly', simple: 'simply',
            single: 'singly', special: 'especially', straight: 'straight', vague: 'vaguely',
            well: 'well', whole: 'wholly', wrong: 'wrong'
        },
        toComparative: {
            grey: 'greyer', gray: 'grayer', green: 'greener', yellow: 'yellower',
            red: 'redder', good: 'better', well: 'better', bad: 'worse', sad: 'sadder', big: 'bigger'
        },
        toSuperlative: {
            nice: 'nicest', late: 'latest', hard: 'hardest', inner: 'innermost', outer: 'outermost',
            far: 'furthest', worse: 'worst', bad: 'worst', good: 'best', big: 'biggest'
        },
        toNoun: { clean: 'cleanliness', naivety: 'naivety', hurt: 'hurt' },
        toVerb: { red: 'redden', sad: 'sadden', fat: 'fatten' },
        lexicon: {}
    };
    var combine = function (lexicon, tag) {
        if (tag === void 0) { tag = 'Adverb'; }
        var o = Adjective["to" + tag];
        for (var k in o) {
            lexicon[k] = 'Comparable';
            if (!lexicon[o[k]]) {
                lexicon[o[k]] = tag;
            }
        }
        return lexicon;
    };
    ['Superlative', 'Comparative', 'Adverb', 'Noun', 'Verb'].forEach(function (tag, i) {
        var o = Adjective["to" + tag];
        if (typeof o === 'object') {
            for (var k in o) {
                Adjective.lexicon[k] = 'Comparable';
                if (!Adjective.lexicon[o[k]]) {
                    Adjective.lexicon[o[k]] = tag;
                }
            }
        }
    });
    exports.noun = irregularNoun_1.default;
    exports.verb = irregularVerb_1.default;
    exports.adverb = exports.Adverb;
    exports.adjective = Adjective;
});
//# sourceMappingURL=irregular.js.map