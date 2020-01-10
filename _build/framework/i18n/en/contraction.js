(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../lexicon/regex", "../../lexicon/tagset"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regex_1 = require("../../lexicon/regex");
    var tagset_1 = require("../../lexicon/tagset");
    var possessiveRegex = /[a-z]s'$/i;
    /* in sentences */
    exports.silentTerms = ['am', 'will', 'did'];
    exports.contractionNeg = {
        everyone: 'no one', everybody: 'nobody', someone: 'no one',
        somebody: 'nobody', always: 'never' // everything: 'nothing'
    };
    exports.contractionPos = { never: 'always', nothing: 'everything' };
    exports.contractionTags = {
        'not': 'Negative', will: tagset_1.VB, would: tagset_1.MD, have: tagset_1.VB, are: tagset_1.CP, is: tagset_1.CP, am: tagset_1.VB
    };
    exports.contractionIrregular = {
        wanna: ['want', 'to'], gonna: ['going', 'to'], im: ['i', 'am'], alot: ['a', 'lot'],
        dont: ['do', 'not'], dun: ['do', 'not'],
        ive: ['i', 'have'],
        "won't": ['will', 'not'], wont: ['will', 'not'],
        "can't": ['can', 'not'], cant: ['can', 'not'], cannot: ['can', 'not'],
        aint: ['is', 'not'], "ain't": ['is', 'not'], "shan't": ['should', 'not'],
        imma: ['I', 'will'],
        "where'd": ['where', 'did'], whered: ['where', 'did'], "when'd": ['when', 'did'],
        whend: ['when', 'did'], "how'd": ['how', 'did'], howd: ['how', 'did'],
        "what'd": ['what', 'did'], whatd: ['what', 'did'], "let's": ['let', 'us'],
        // multiple word contractions
        dunno: ['do', 'not', 'know'], brb: ['be', 'right', 'back'], gtg: ['got', 'to', 'go'],
        irl: ['in', 'real', 'life'], tbh: ['to', 'be', 'honest'], imo: ['in', 'my', 'opinion'],
        til: ['today', 'i', 'learned'], rn: ['right', 'now'], '@': ['at']
        // 'idk': ['i', 'don\'t', 'know'],
    };
    // find contractable, expanded-contractions
    function findContraction(r) {
        var remain = r.not('#Contraction');
        var m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)');
        m.concat(remain.match('(they|we|you|i) have'));
        m.concat(remain.match('i am'));
        m.concat(remain.match('(#Copula|#Modal|do) not'));
        m.list.forEach(function (ts) { ts.expanded = true; });
        return m;
    }
    exports.findContraction = findContraction;
    ;
    function split(t) {
        var allowed = { re: 1, ve: 1, ll: 1, t: 1, s: 1, d: 1, m: 1 };
        var parts = t.text.match(regex_1.regexps.contraction);
        if (parts && parts[1] && allowed[parts[2]] === 1) {
            // handle n't
            if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
                parts[1] = parts[1].replace(/n$/, '');
                parts[2] = 'n\'t'; // dunno..
            }
            // fix titlecase
            if (t.tags.TitleCase === true) {
                parts[1] = parts[1].replace(/^[a-z]/, function (s) { return s.toUpperCase(); });
            }
            return { start: parts[1], end: parts[2] };
        }
        // "flanders' house"
        if (possessiveRegex.test(t.text)) {
            return { start: t.normal.replace(/s'?$/, ''), end: '' };
        }
    }
    exports.split = split;
    function contraction() {
        var _this = this;
        /* IRREGULAR Contraction */
        for (var k in exports.contractionIrregular) {
            for (var t = 0; t < this.terms.length; t++) {
                if (this.terms[t].normal === k) {
                    this.fixContraction(exports.contractionIrregular[k], t);
                    break;
                }
            }
        }
        /* HARD Contraction */
        // "'s" may be a contraction or a possessive - 'spencer's house' vs 'spencer's good'
        var isPossessive = function (i) {
            var blacklist = { "that's": 1 };
            var a = [_this.terms[i], _this.terms[i + 1], _this.terms[i + 2]];
            // a pronoun can't be possessive - "he's house"
            if (a[0].tags.Pronoun || a[0].tags.QuestionWord || blacklist[a[0].normal]) {
                return false;
            }
            // if end of sentence, it is possessive - "was spencer's"
            if (!a[1]) {
                return true;
            }
            // a gerund suggests 'is walking'
            if (a[1].tags.VerbPhrase) {
                return false;
            }
            // spencer's house or rocket's red glare
            if (a[1].tags.Noun || (a[1].tags.Adjective && !!a[2] && a[2].tags.Noun)) {
                return true;
            }
            return false;
        };
        for (var i = 0; i < this.terms.length; i++) {
            if (this.terms[i].silentTerm) {
                continue;
            }
            var parts = split(this.terms[i]);
            // have we found a hard one like spencer's house :
            if (parts && parts.end === 's') {
                if (isPossessive(i)) {
                    this.terms[i].tag('#Possessive', 'hard-contraction');
                    continue;
                }
                // is vs was
                var arr = [parts.start, 'is'];
                this.fixContraction(arr, i);
                i += 1;
            }
        }
        /* EASY Contraction */
        // the formulaic contraction types:
        var easy_ends = { ll: 'will', ve: 'have', re: 'are', m: 'am', "n't": 'not' };
        /* these ones are a bit trickier:
        // 'd': 'would',
        // 't': 'not',
        // 's': 'is' //or was
        */
        for (var i = 0; i < this.terms.length; i++) {
            if (this.terms[i].silentTerm) {
                continue;
            }
            var parts = split(this.terms[i]);
            if (parts) {
                parts.start = parts.start.toLowerCase();
                // make sure its an easy one
                if (easy_ends[parts.end]) {
                    var arr = [parts.start, easy_ends[parts.end]];
                    this.fixContraction(arr, i);
                    i += 1;
                }
                // handle i'd -> 'i would' vs 'i had'
                if (parts.end === 'd') {
                    var a = [this.terms[i + 1], this.terms[i + 2]];
                    var arr = [parts.start, 'would']; // assume 'would'
                    // if next verb is past-tense, choose 'had' or also support '#Adverb #PastTense'
                    if ((!!a[0] && a[0].tags.PastTense) ||
                        (!!a[1] && a[1].tags.PastTense && a[0].tags.Adverb)) {
                        arr[1] = 'had';
                    }
                    this.fixContraction(arr, i);
                    i += 1;
                }
            }
        }
        // this.numberContraction();
        return this;
    }
    exports.default = contraction;
});
//# sourceMappingURL=contraction.js.map