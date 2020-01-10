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
        faq: 'Oft gestellte Fragen',
        q1: 'Wie unterscheidet sich das von OpenID?',
        a1: main_1._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["Die Ziele von OpenID und IndieAuth sind \u00E4hnlich. Beide ermutigen dich, beim Anmelden bei\n    einer Webseite deinen eigenen Domainnamen zu verwenden. Wie auch immer, OpenID verfehlte\n    eine breite Unterst\u00FCtzung, zumindest in Hinsicht auf die Komplexit\u00E4t des Protokolls.\n    IndieAuth ist eine einfachere Implementation des gleichen Ziels, indem es andere\n    OAuth Provider zul\u00E4sst und Verhalten adoptiert, an das Menschen bereits gew\u00F6hnt sind"], ["Die Ziele von OpenID und IndieAuth sind \u00E4hnlich. Beide ermutigen dich, beim Anmelden bei\n    einer Webseite deinen eigenen Domainnamen zu verwenden. Wie auch immer, OpenID verfehlte\n    eine breite Unterst\u00FCtzung, zumindest in Hinsicht auf die Komplexit\u00E4t des Protokolls.\n    IndieAuth ist eine einfachere Implementation des gleichen Ziels, indem es andere\n    OAuth Provider zul\u00E4sst und Verhalten adoptiert, an das Menschen bereits gew\u00F6hnt sind"]))),
        q2: 'Können die rel="me" Links auf meiner Homepage versteckt sein?',
        a2: main_1._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["Ja, deine rel=\"me\" links m\u00FCssen nicht sichtbar sein, aber das html Fragment muss sich\n    auf deiner Homepage befinden. Du kannst die links mit CSS verstecken, oder erfasse sie\n    als &lt;link&gt; tags in deinem html head."], ["Ja, deine rel=\"me\" links m\u00FCssen nicht sichtbar sein, aber das html Fragment muss sich\n    auf deiner Homepage befinden. Du kannst die links mit CSS verstecken, oder erfasse sie\n    als &lt;link&gt; tags in deinem html head."]))),
        q3: 'Und wenn ein rel="me" Link privat ist?',
        a3: "Wir arbeiten an einer L\u00F6sung mit JWT. Infos folgen.",
        q4: 'Müssen Benutzer einen Domainnamen besitzen?',
        a4: main_1._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["Ja &mdash; die Annahme ist, da\u00DF die Leute bereit sind, ihre\n    <a href=\"http://indiewebcamp.com/why\">eigenen Online Identit\u00E4ten</a>\n    in der Form eines Domainnamens zu besitzen. Es wird einfacher und einfacher, Inhalte auf deiner\n    eigenen Domain bereitzustellen. Siehe\n    \"<a href=\"http://indiewebcamp.com/Getting_Started\">Getting Started on the Indie Web</a>\"\n    f\u00FCr einige Vorschl\u00E4ge, inkl. \"Mapping your domain to a Tumblr blog\", oder melde Dich bei\n    einem Webhoster an, z. B. <a href=\"https://www.uberspace.de\">Uberspace</a>\n    oder <a href=\"http://www.dreamhost.com/r.cgi?426455\">Dreamhost</a>."], ["Ja &mdash; die Annahme ist, da\u00DF die Leute bereit sind, ihre\n    <a href=\"http://indiewebcamp.com/why\">eigenen Online Identit\u00E4ten</a>\n    in der Form eines Domainnamens zu besitzen. Es wird einfacher und einfacher, Inhalte auf deiner\n    eigenen Domain bereitzustellen. Siehe\n    \"<a href=\"http://indiewebcamp.com/Getting_Started\">Getting Started on the Indie Web</a>\"\n    f\u00FCr einige Vorschl\u00E4ge, inkl. \"Mapping your domain to a Tumblr blog\", oder melde Dich bei\n    einem Webhoster an, z. B. <a href=\"https://www.uberspace.de\">Uberspace</a>\n    oder <a href=\"http://www.dreamhost.com/r.cgi?426455\">Dreamhost</a>."]))),
        q5: 'Aber macht mich das nicht abhängig von Eurer Seite, indieauth.com?',
        a5: main_1._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["Dieser Service existiert f\u00FCr Webseitenbetreiber, die nicht eigenen OAuth code\n    f\u00FCr jeden Provider bereitstellen wollen. Als anmeldende BenutzerIn brauchst Du dir keine Sorgen zu machen,\n    ob die Seite indieauth.com oder einen anderen RelMeAuth Service benutzt."], ["Dieser Service existiert f\u00FCr Webseitenbetreiber, die nicht eigenen OAuth code\n    f\u00FCr jeden Provider bereitstellen wollen. Als anmeldende BenutzerIn brauchst Du dir keine Sorgen zu machen,\n    ob die Seite indieauth.com oder einen anderen RelMeAuth Service benutzt."]))),
        q6: 'Was ist, wenn IndieAuth.com nicht erreichbar ist?',
        a6: main_1._(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["Wenn eine Anwendung IndieAuth.com als Auth Service benutzt und IndieAuth.com ist nicht erreichbar,\n    dann werden LogIns zu dieser Webseite nicht funktionieren, aber das ist dasselbe als wenn der eigene\n    interne Auth Service down ist. Wegen dieses potentiellen Risikos ist es m\u00F6glich, das Anwendungen eine\n    eigene Instanz von IndieAuth (Ruby, node.js) betreiben oder einen anderen\n    <a href=\"http://indiewebcamp.com/RelMeAuth\">RelMeAuth</a> Service direkt nutzten um nicht von\n    Dritten abh\u00E4ngig zu sein."], ["Wenn eine Anwendung IndieAuth.com als Auth Service benutzt und IndieAuth.com ist nicht erreichbar,\n    dann werden LogIns zu dieser Webseite nicht funktionieren, aber das ist dasselbe als wenn der eigene\n    interne Auth Service down ist. Wegen dieses potentiellen Risikos ist es m\u00F6glich, das Anwendungen eine\n    eigene Instanz von IndieAuth (Ruby, node.js) betreiben oder einen anderen\n    <a href=\"http://indiewebcamp.com/RelMeAuth\">RelMeAuth</a> Service direkt nutzten um nicht von\n    Dritten abh\u00E4ngig zu sein."]))),
        q7: 'Ich betreibe einen Authentifikationsanbieter, wie kommt der in die "supported providers" Liste?',
        a7: main_1._(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["Neue Provider sind sehr willkommen! Das Ziel ist es, soviele Benutzer wie m\u00F6glich zu unterst\u00FCtzen.\n    Das musst Du tun um von IndieAuth unterst\u00FCtzt zu werden:"], ["Neue Provider sind sehr willkommen! Das Ziel ist es, soviele Benutzer wie m\u00F6glich zu unterst\u00FCtzen.\n    Das musst Du tun um von IndieAuth unterst\u00FCtzt zu werden:"]))),
        a7_1: main_1._(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["Stelle sicher, da\u00DF deine Benutzer eine M\u00F6glichkeit haben, ihre Webseiten-Adresse in der \"Profil\"\n    Sektion Deiner Anbieterseite zu ver\u00F6ffentlichen"], ["Stelle sicher, da\u00DF deine Benutzer eine M\u00F6glichkeit haben, ihre Webseiten-Adresse in der \"Profil\"\n    Sektion Deiner Anbieterseite zu ver\u00F6ffentlichen"]))),
        a7_2: main_1._(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["Wo das HTML der Benutzer-Seite gerendert wird, stelle sicher, das ein\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a> Attribut im Linktag ist."], ["Wo das HTML der Benutzer-Seite gerendert wird, stelle sicher, das ein\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a> Attribut im Linktag ist."]))),
        a7_3: 'Schreibe einen client um die Authentifizierung mit deiner API zu erledigen und übermittle es.',
        a7_4: main_1._(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["Integriere den neuen Provider in die IndieAuth source codes, oder \u00F6ffne einfach\n    <a href=\"https://github.com/aaronpk/IndieAuth/issues/new\">ein issue</a> mit deiner Anfrage."], ["Integriere den neuen Provider in die IndieAuth source codes, oder \u00F6ffne einfach\n    <a href=\"https://github.com/aaronpk/IndieAuth/issues/new\">ein issue</a> mit deiner Anfrage."]))),
        q8: 'Warum wird Google+ momentan nicht unterstützt?',
        a8: main_1._(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["Google+ Profile haben alle rel=\"me\" Attribute bei Links verloren.\n    Dies war das Resultat, als google das \"klassische google plus\" in 2017 eingestellt hat ...<br>\n    YouTube wird unterst\u00FCtzt."], ["Google+ Profile haben alle rel=\"me\" Attribute bei Links verloren.\n    Dies war das Resultat, als google das \"klassische google plus\" in 2017 eingestellt hat ...<br>\n    YouTube wird unterst\u00FCtzt."]))),
        q9: 'Warum muß IndieAuth.com meine tweets und wem ich folge sehen?',
        a9: main_1._(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["IndieAuth.com fragt jeden OAuth Provider nach minimalen Erlaubnissen.\n    In manchen F\u00E4llen haben Anbieter keinen \"scope\", das nur die Identit\u00E4t verifiziert\n    ohne gleichzeitig Daten auszuliefern, wie z. B. \u00F6ffentliche tweets."], ["IndieAuth.com fragt jeden OAuth Provider nach minimalen Erlaubnissen.\n    In manchen F\u00E4llen haben Anbieter keinen \"scope\", das nur die Identit\u00E4t verifiziert\n    ohne gleichzeitig Daten auszuliefern, wie z. B. \u00F6ffentliche tweets."])))
    };
    exports.default = messages;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
});
//# sourceMappingURL=faq.js.map