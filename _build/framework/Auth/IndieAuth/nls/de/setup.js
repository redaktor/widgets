(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../util/string/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("../../../../util/string/main");
    var messages = {
        _generateHcard: 'Erstelle deine h-card',
        description: 'Dokumentation',
        lead1: 'Verlinke zu deinen verschiedenen sozialen Services',
        text1: main_1._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["Erstelle auf deiner Homepage Links zu deinen Profilen mit einem <code>rel=\"me\"</code>\n    Attribut.<br/>Das k\u00F6nnte so aussehen:"], ["Erstelle auf deiner Homepage Links zu deinen Profilen mit einem <code>rel=\"me\"</code>\n    Attribut.<br/>Das k\u00F6nnte so aussehen:"]))),
        text1_2: main_1._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["Falls Du keine sichtbaren Links auf der Homepage m\u00F6chtest, kannst du stattdessen\n    <code>&lt;link&gt;</code> tags<br/>in deinem html header verwenden."], ["Falls Du keine sichtbaren Links auf der Homepage m\u00F6chtest, kannst du stattdessen\n    <code>&lt;link&gt;</code> tags<br/>in deinem html header verwenden."]))),
        lead2: 'Stelle sicher, daß jedes Profil zurückverlinkt',
        text2: main_1._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["Du mu\u00DFt sicherstellen, da\u00DF jeder Service auch einen Link zu Deiner Homepage hat.<br/>\n    Die \"Profil \u00E4ndern\" Links f\u00FCr einige unterst\u00FCtzte Services findest Du unten."], ["Du mu\u00DFt sicherstellen, da\u00DF jeder Service auch einen Link zu Deiner Homepage hat.<br/>\n    Die \"Profil \u00E4ndern\" Links f\u00FCr einige unterst\u00FCtzte Services findest Du unten."]))),
        lead3: 'Und fertig!',
        text3: main_1._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["Alles klar. Jetzt kannst Du deine Domain benutzen um dich bei allen Seiten anzumelden,\n    die IndieAuth unterst\u00FCtzen!"], ["Alles klar. Jetzt kannst Du deine Domain benutzen um dich bei allen Seiten anzumelden,\n    die IndieAuth unterst\u00FCtzen!"])))
    };
    exports.default = messages;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
});
//# sourceMappingURL=setup.js.map