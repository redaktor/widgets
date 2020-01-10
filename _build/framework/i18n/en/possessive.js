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
    function possessive() {
        var _this = this;
        var isPossessive = function (x) {
            var afterWord = /[a-z]s'$/;
            var apostrophe = /[a-z]'s$/;
            // these are always contractions
            var blacklist = { "it's": 1, "that's": 1 };
            var a = [_this.get(x), _this.get(x + 1)];
            // these are always contractions, not possessive
            if (!!blacklist[a[0].normal]) {
                return false;
            }
            // "spencers'" - this is always possessive - eg "flanders'"
            if (!!afterWord.test(a[0].normal)) {
                return true;
            }
            // if no apostrophe s, return or some parts-of-speech can't be possessive
            if (!apostrophe.test(a[0].normal) || !!a[0].tags.Pronoun) {
                return false;
            }
            // last word is possessive  - "better than spencer's" or next word is 'house'
            if (!a[1] || !!a[1].tags.Noun) {
                return true;
            }
            // rocket's red glare
            return (a[1].tags.Adjective && _this.get(x + 2) && _this.get(x + 2).tags.Noun);
        };
        for (var i = 0; i < this.length; i++) {
            if (isPossessive(i)) {
                var t = this.get(i);
                // if it's not already a noun, co-erce it to one
                if (!t.tags['Noun']) {
                    t.tag('Noun', 'possessive_pass');
                }
                t.tag('Possessive', 'possessive_pass');
            }
        }
        return this;
    }
    exports.default = possessive;
});
//# sourceMappingURL=possessive.js.map