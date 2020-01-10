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
        _okRes: 'Eine erfolgreiche Beispielantwort',
        _errRes: 'Eine fehlerhafte Beispielantwort',
        description: 'für Entwickler',
        introHead: 'Benutze IndieAuth.com, damit Benutzer sich bei deiner Webseite anmelden können',
        introLead: 'Erstelle eine Web Sign-in Form',
        intro: main_1._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["Wenn Du eine Webseite baust und Leute sollen sich einloggen,\n    kannst Du IndieAuth.com benutzen um Web Sign-In zu erm\u00F6glichen. Du\n    musst keinen OAuth code f\u00FCr jeden Anbieter verstehen."], ["Wenn Du eine Webseite baust und Leute sollen sich einloggen,\n    kannst Du IndieAuth.com benutzen um Web Sign-In zu erm\u00F6glichen. Du\n    musst keinen OAuth code f\u00FCr jeden Anbieter verstehen."]))),
        paramHead: 'Form Parameter',
        paramAction: main_1._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["<b>action</b>: Die action der Form bestimmt der IndieAuth Service\n    (Du kannst <code>https://indieauth.com/auth</code> nutzen &mdash; oder\n    <a href=\"https://github.com/redaktor/IndieAuth\">den Quellcode herunterladen</a>\n    und deinen eigenen Server nutzen)."], ["<b>action</b>: Die action der Form bestimmt der IndieAuth Service\n    (Du kannst <code>https://indieauth.com/auth</code> nutzen &mdash; oder\n    <a href=\"https://github.com/redaktor/IndieAuth\">den Quellcode herunterladen</a>\n    und deinen eigenen Server nutzen)."]))),
        paramMe: '<b>me</b>: Der "me" Parameter ist die URL, welche die Benutzer eingeben können',
        paramClientId: main_1._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["<b>client_id</b>: Trage die client_id in ein \"hidden field\" ein: La\u00DF uns wissen,\n    bei welcher Seite der Anwendung die Benutzer sich anmelden"], ["<b>client_id</b>: Trage die client_id in ein \"hidden field\" ein: La\u00DF uns wissen,\n    bei welcher Seite der Anwendung die Benutzer sich anmelden"]))),
        paramRedirectUri: main_1._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["<b>redirect_uri</b>: Trage die client_id in ein \"hidden field\" ein: La\u00DF uns wissen,\n    wohin wir zur\u00FCckleiten sollen, nachdem die Authentifizierung komplett ist"], ["<b>redirect_uri</b>: Trage die client_id in ein \"hidden field\" ein: La\u00DF uns wissen,\n    wohin wir zur\u00FCckleiten sollen, nachdem die Authentifizierung komplett ist"]))),
        lead1: 'Die Benutzer melden sich mit ihrer Domain an',
        text1: main_1._(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["Nachdem die Benutzer ihre Domain in die Sign-In Form eingegeben und \u00FCbermittelt haben,\n    scannt IndieAuth die Domain auf der Suche nach rel=\"me\" Links von Anbietern,\n    die es kennt (siehe <a href=\"./index.html#providers\">Supported Providers</a>).\n    Au\u00DFerdem verifiziert es, da\u00DF Webseiten Dritter zur\u00FCckverlinken zur Domain der Benutzer\n    (ebenfalls mit einem rel=\"me\" Link)."], ["Nachdem die Benutzer ihre Domain in die Sign-In Form eingegeben und \u00FCbermittelt haben,\n    scannt IndieAuth die Domain auf der Suche nach rel=\"me\" Links von Anbietern,\n    die es kennt (siehe <a href=\"./index.html#providers\">Supported Providers</a>).\n    Au\u00DFerdem verifiziert es, da\u00DF Webseiten Dritter zur\u00FCckverlinken zur Domain der Benutzer\n    (ebenfalls mit einem rel=\"me\" Link)."]))),
        lead2: 'Die Benutzer werden zu deiner Seite zurückgebracht',
        text2: main_1._(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["Wenn alles erfolgreich ist, wird der Benutzer zur redirect_uri (Form Parameter) geleitet.\n    Ein Token findet sich in den Query String Parametern."], ["Wenn alles erfolgreich ist, wird der Benutzer zur redirect_uri (Form Parameter) geleitet.\n    Ein Token findet sich in den Query String Parametern."]))),
        lead3: 'Verifiziere den Authentifizierungs-Code mit indieauth.com',
        text3: main_1._(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["An diesem Punkt angekommen musst du den Code verifizieren um die Domain des\n    authentifizierten Benutzers zu bekommen. Stelle eine POST Anfrage an indieauth.com/auth\n    mit dem Code und allen Originalparametern der Anfrage und Du bekommst den Domainnamen\n    des authentifizierten Benutzers zur\u00FCck."], ["An diesem Punkt angekommen musst du den Code verifizieren um die Domain des\n    authentifizierten Benutzers zu bekommen. Stelle eine POST Anfrage an indieauth.com/auth\n    mit dem Code und allen Originalparametern der Anfrage und Du bekommst den Domainnamen\n    des authentifizierten Benutzers zur\u00FCck."]))),
        lead4: 'Fertig!',
        text4: main_1._(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["Nun kennst Du die Domain, die der authentifizierten Person geh\u00F6rt.\n    Du kannst die Domain in einer sicheren Session speichern und Benutzer\n    sind mit ihrer Domain-Identit\u00E4t angemeldet. K\u00FCmmer dich nicht darum ob sie\n    mit YouTube, Twitter oder Github eingeloggt sind, ihre Identit\u00E4t ist ihre\n    Domain! Du brauchst Dich nicht um doppelte Accounts zu k\u00FCmmern."], ["Nun kennst Du die Domain, die der authentifizierten Person geh\u00F6rt.\n    Du kannst die Domain in einer sicheren Session speichern und Benutzer\n    sind mit ihrer Domain-Identit\u00E4t angemeldet. K\u00FCmmer dich nicht darum ob sie\n    mit YouTube, Twitter oder Github eingeloggt sind, ihre Identit\u00E4t ist ihre\n    Domain! Du brauchst Dich nicht um doppelte Accounts zu k\u00FCmmern."])))
    };
    exports.default = messages;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
});
//# sourceMappingURL=developers.js.map