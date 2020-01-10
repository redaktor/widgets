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
        slogan: 'Sei einfach &ldquo;Du&rdquo;.',
        providers: 'Provider',
        what: 'Was ist IndieAuth?',
        whatText: main_1._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["Mit IndieAuth kannst Du deinen eigenen Domainnamen nutzen um dich bei Webseiten\n    anzumelden.<br />\n    Verlinke Deine Homepage mit einem oder mehreren Authentifikations-Anbietern, wie\n    Twitter oder GitHub. Danach kannst Du deinen Domainnamen bei Webseiten eingeben,\n    die IndieAuth unterst\u00FCtzen."], ["Mit IndieAuth kannst Du deinen eigenen Domainnamen nutzen um dich bei Webseiten\n    anzumelden.<br />\n    Verlinke Deine Homepage mit einem oder mehreren Authentifikations-Anbietern, wie\n    Twitter oder GitHub. Danach kannst Du deinen Domainnamen bei Webseiten eingeben,\n    die IndieAuth unterst\u00FCtzen."]))),
        why: 'Warum IndieAuth?',
        whyText: main_1._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["IndieAuth ist Teil der <a href=\"http://indiewebcamp.com/why\">IndieWeb Bewegung</a>\n    um die Kontrolle \u00FCber Deine Online Identit\u00E4t zur\u00FCckzuerlangen. Anstatt dich anzumelden als\n    &ldquo;Du bei Twitter&rdquo; oder &ldquo;Du bei Facebook&rdquo;,\n    sollte es Dir m\u00F6glich sein, dich einfach als &ldquo;Du&rdquo; anzumelden.<br/><br/>\n    Wir sollten nicht von <a href=\"https://indieweb.org/silo\">SILOs</a> abh\u00E4ngig sein um unsere\n    gepr\u00FCften Identit\u00E4ten bereitzustellen, der eigene Domainname sollte der Schl\u00FCssel sein um\n    \u00FCberall angemeldet zu sein."], ["IndieAuth ist Teil der <a href=\"http://indiewebcamp.com/why\">IndieWeb Bewegung</a>\n    um die Kontrolle \u00FCber Deine Online Identit\u00E4t zur\u00FCckzuerlangen. Anstatt dich anzumelden als\n    &ldquo;Du bei Twitter&rdquo; oder &ldquo;Du bei Facebook&rdquo;,\n    sollte es Dir m\u00F6glich sein, dich einfach als &ldquo;Du&rdquo; anzumelden.<br/><br/>\n    Wir sollten nicht von <a href=\"https://indieweb.org/silo\">SILOs</a> abh\u00E4ngig sein um unsere\n    gepr\u00FCften Identit\u00E4ten bereitzustellen, der eigene Domainname sollte der Schl\u00FCssel sein um\n    \u00FCberall angemeldet zu sein."]))),
        how: 'Wie kann ich IndieAuth nutzen?',
        how1: main_1._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["Erstelle auf Deiner Homepage Links zu deinen sozialen Profilen<br/>mit dem Attribut\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a>."], ["Erstelle auf Deiner Homepage Links zu deinen sozialen Profilen<br/>mit dem Attribut\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a>."]))),
        how2: 'Stelle sicher, daß Deine Profil-Links zurückverlinken zur Homepage.',
        howLabel: 'Komplette Anleitung',
        join: 'Sei dabei!',
        attend: 'Besuche ein',
        eventN: 'in der Nähe',
        join1: main_1._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["Trage dich in die IndieWebCamp G\u00E4steliste ein,<br/>nachdem Du dich mit eigener Domain\n    anmeldest ..."], ["Trage dich in die IndieWebCamp G\u00E4steliste ein,<br/>nachdem Du dich mit eigener Domain\n    anmeldest ..."]))),
        join2: 'Trage Dein eigenes IndieWeb Projekt in die Projektliste ein'
    };
    exports.default = messages;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
});
//# sourceMappingURL=index.js.map