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
    var messages = {
        yourPW: "Dein Passwort",
        scores: "erzielt",
        // known warnings
        zxcvbn_b650cc59: "Gerade Schl\u00FCsselreihen lassen sich leicht erraten!",
        zxcvbn_223a3503: "Kurze Tastaturmuster lassen sich leicht erraten!",
        zxcvbn_2ffd818f: "Wiederholungen wie \"mimimi\" lassen sich leicht erraten!",
        zxcvbn_cd8df245: "Wiederholungen wie \"abcabcabc\" sind nur wenig schwerer zu erraten als \"abc\"!",
        zxcvbn_82618fe9: "Sequenzen wie \"abc\" or \"6543\" lassen sich leicht erraten!",
        zxcvbn_5587ab99: "Die letzten Jahre lassen sich leicht erraten!",
        zxcvbn_6ad47ea8: "Ein Datum ist oft einfach zu erraten!",
        zxcvbn_6f46b03b: "Dies ist ein Top-10 verbreitetes Passwort!",
        zxcvbn_acb43cee: "Dies ist ein Top-100 verbreitetes Passwort!",
        zxcvbn_db5735c6: "Dies ist ein sehr verbreitetes Passwort!",
        zxcvbn_6587648a: "Dies ist \u00E4hnlich zu einem verbreitet genutzen Passwort!",
        zxcvbn_5e908a41: "Ein einziges Wort ist leicht zu erraten!",
        zxcvbn_5e199e28: "Namen und Nachnamen alleine lassen sich leicht erraten!",
        zxcvbn_37ef74f0: "Gebr\u00E4uchliche Namen und Nachnamen lassen sich leicht erraten!",
        // known suggestions
        zxcvbn_7b213d01: "Benutze einige W\u00F6rter, vermeide verbreitete Phrasen.",
        zxcvbn_491034d4: "Keine Notwendigkeit f\u00FCr Symbole, Ziffern oder Gro\u00DFbuchstaben.",
        zxcvbn_62089321: "F\u00FCge ein, zwei weitere W\u00F6rter und Buchstaben zu. Unverbreitete W\u00F6rter sind besser.",
        zxcvbn_4f86e029: "Benutze ein l\u00E4ngeres Tastaturmuster und andere Buchstaben.",
        zxcvbn_49d4bbde: "Vemeide wiederholte W\u00F6rter und Buchstaben.",
        zxcvbn_0fe0383b: "Vemeide Sequenzen.",
        zxcvbn_dde33d39: "Vemeide die letzten Jahre.",
        zxcvbn_e0c8c1cd: "Vemeide Jahre, die mit Dir verkn\u00FCpft sind.",
        zxcvbn_b82a8043: "Vemeide Zeitpunkte, die mit Dir verkn\u00FCpft sind.",
        zxcvbn_5251e95b: "Alles GROSS oder kleingeschrieben ist sehr einfach.",
        zxcvbn_95bcf9ea: "Kapitalisierung hilft nicht viel.",
        zxcvbn_6e18ff4f: "R\u00FCckw\u00E4rtsgechriebene W\u00F6rter sind nicht viel schwieriger zu erraten.",
        zxcvbn_affbaac9: "Vorhersagbare Substitutionen wie '@' statt 'a' helfen nicht viel."
    };
    exports.default = messages;
});
//# sourceMappingURL=index.js.map