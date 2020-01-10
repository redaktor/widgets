(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./irregular"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var irregular_1 = require("./irregular");
    var C = {
        /* {irregulars, check: function, transforms: [RegExp, string], fallback: function|string} */
        Adjective: {
            Adverb: {
                irregulars: irregular_1.adjective.toAdverb,
                transforms: [
                    [/al$/i, 'ally'], [/ly$/i, 'ly'], [/(.{3})y$/i, '$1ily'], [/que$/i, 'quely'],
                    [/ue$/i, 'uly'], [/ic$/i, 'ically'], [/ble$/i, 'bly'], [/l$/i, 'ly']
                ],
                notMatches: [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/],
                fallback: function (s) { return s + "ly"; }
            },
            Comparative: {
                irregulars: irregular_1.adjective.toComparative,
                transforms: [
                    [/y$/i, 'ier'], [/([aeiou])t$/i, '$1tter'], [/([aeou])de$/i, '$1der'], [/nge$/i, 'nger']
                ],
                matches: [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/],
                notMatches: [/ary$/, /ous$/],
                fallback: function (s) {
                    var mts = C.Adjective.Comparative.matches;
                    for (var i = 0; i < mts.length; i++) {
                        if (!!mts[i].test(s)) {
                            return s + "er";
                        }
                    }
                    return "" + s + (!!/e$/.test(s) ? 'r' : 'er');
                },
                // special
                uncomparable: function (s) { return "more " + s; }
            },
            Superlative: {
                irregulars: irregular_1.adjective.toSuperlative,
                transforms: [
                    [/y$/i, 'iest'], [/([aeiou])t$/i, '$1ttest'], [/([aeou])de$/i, '$1dest'],
                    [/nge$/i, 'ngest'], [/([aeiou])te$/i, '$1test']
                ],
                matches: [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/],
                notMatches: [/ary$/],
                fallback: function (s) {
                    var mts = C.Adjective.Superlative.matches;
                    for (var i = 0; i < mts.length; i++) {
                        if (!!mts[i].test(s)) {
                            return "" + s + ((s.charAt(s.length - 1) === 'e') ? 'st' : 'est');
                        }
                    }
                    return s + "est";
                },
                // special
                uncomparable: function (s) { return "most " + s; }
            },
            Noun: {
                irregulars: irregular_1.adjective.toNoun,
                transforms: [
                    [/y$/, 'iness'], [/le$/, 'ility'], [/ial$/, 'y'], [/al$/, 'ality'], [/ting$/, 'ting'],
                    [/ring$/, 'ring'], [/bing$/, 'bingness'], [/sing$/, 'se'], [/ing$/, 'ment'],
                    [/ess$/, 'essness'], [/ous$/, 'ousness']
                ],
                check: function (s) {
                    var lastChar = s.charAt(s.length - 1);
                    return !(lastChar === 'w' || lastChar === 's');
                },
                fallback: function (s) { return s + "ness"; }
            },
            Verb: {
                irregulars: irregular_1.adjective.toNoun,
                fallback: function (s) { return "" + s + (!!/e$/.test(s) ? 'n' : 'en'); }
            }
        },
        Adverb: {
            Adjective: {
                irregulars: irregular_1.adverb.toAdjective,
                transforms: [
                    [/bly$/i, 'ble'], [/gically$/i, 'gical'], [/([rsdh])ically$/i, '$1ical'],
                    [/ically$/i, 'ic'], [/uly$/i, 'ue'], [/ily$/i, 'y'], [/(.{3})ly$/i, '$1']
                ],
                fallback: function (s) { return s; }
            }
        },
        Noun: {
            Plural: {
                irregulars: irregular_1.noun.toPlural,
                transforms: [
                    [/(ax|test)is$/i, '$1es'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
                    [/(octop|vir)i$/i, '$1i'], [/(kn|l|w)ife$/i, '$1ives'],
                    [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
                    [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/(alias|status)$/i, '$1es'],
                    [/(bu)s$/i, '$1ses'], [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'], [/([ti])um$/i, '$1a'],
                    [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(hive)$/i, '$1s'],
                    [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh|s|z)$/i, '$1es'],
                    [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/([m|l])ouse$/i, '$1ice'],
                    [/([m|l])ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'],
                    [/(quiz)$/i, '$1zes'], [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
                    [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(.*)/i, '$1s']
                ],
                fallback: function (s) { return null; }
            },
            Singular: {
                irregulars: irregular_1.noun.toSingle,
                transforms: [
                    [/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'],
                    [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'],
                    [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'],
                    [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
                    [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
                    [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
                    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
                    [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'],
                    [/(x|ch|ss|sh|s|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'],
                    [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'],
                    [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'],
                    [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']
                ],
                fallback: function (s) { return null; }
                /* TODO FIXME
                // inflect first word of preposition-phrase
                if (/([a-z]*) (of|in|by|for) [a-z]/.test(str) === true) {
                  const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
                  if (first) {
                    const better_first = toSingle(first); // recursive
                    return better_first + str.replace(first, '');
                  }
                }
                */
            }
        },
        Verb: {
            Adjective: {
                irregulars: irregular_1.verb.toAdjective,
                transforms: [
                    [/y$/, 'i'],
                    [/([aeiou][n])$/, '$1n'] // win - winnable
                ],
                fallback: function (s) { return "" + s + ((!!irregular_1.verb.suffixes[s]) ? 'ible' : 'able'); }
            },
            Actor: {
                irregulars: irregular_1.verb.toActor,
                notMatches: {
                    be: 1, aid: 1, fail: 1, appear: 1, happen: 1, seem: 1, try: 1, say: 1, marry: 1,
                    forbid: 1, understand: 1, bet: 1
                },
                transforms: [
                    [/e$/i, 'er'], [/([aeiou])([mlgp])$/i, '$1$2$2er'],
                    [/([rlf])y$/i, '$1ier'], [/^(.?.[aeiou])t$/i, '$1tter']
                ]
            }
        }
    };
    function convert(s, from, to, uncomparable) {
        if (to === void 0) { to = 'Adverb'; }
        if (uncomparable === void 0) { uncomparable = false; }
        if (!C[from] || !C[from][to]) {
            return s;
        }
        if (!!uncomparable) {
            if (typeof C[from][to].uncomparable === 'function') {
                return C[from][to].uncomparable(s);
            }
            return s;
        }
        var _a = C[from][to], irregulars = _a.irregulars, check = _a.check, nm = _a.notMatches, tr = _a.transforms, fb = _a.fallback;
        if (!!irregulars && !!irregulars.hasOwnProperty(s)) {
            return irregulars[s];
        }
        if (!!nm) {
            for (var i = 0; i < nm.length; i++) {
                if (!!nm[i].test(s)) {
                    return null;
                }
            }
        }
        if (typeof check === 'function' && !check(s)) {
            return null;
        }
        if (!!tr) {
            for (var i = 0; i < tr.length; i++) {
                if (!!tr[i][0].test(s)) {
                    return s.replace(tr[i][0], tr[i][1]);
                }
            }
        }
        if (!!fb) {
            return (typeof fb === 'function') ? fb(s) : fb;
        }
        return s;
    }
    exports.default = convert;
});
//# sourceMappingURL=convert.js.map