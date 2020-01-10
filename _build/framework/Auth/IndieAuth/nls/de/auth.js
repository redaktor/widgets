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
        warning: 'Warnung',
        error: 'Fehler',
        node: 'Benötigt node.js',
        js: 'Bitte aktiviere JavaScript um Dich zu authentifizieren !',
        _new: 'neu',
        _and: 'und',
        yes: 'ja',
        no: 'nein',
        chars: 'Buchstaben',
        mfs: 'Mikroformate',
        cardHeader: 'MELDE DICH AN',
        as: 'ALS',
        to: 'BEI',
        headerNote: 'mit einer der folgenden Methoden',
        client_id: 'Entweder wurde kein Parameter "client_id" gefunden oder ein interner Fehler trat auf !',
        me: 'Parameter "me" fehlt.',
        meInvalid: 'Ungültiger "me" Parameter. Der Wert muß eine gültige URL sein.',
        meInsecure: 'Unsicherer "me" Parameter. Der Wert muß eine gültige, registrierte URL sein, die dem /auth?me Wert entspricht.',
        verifyInvalid: 'Ungültiger "verify" Parameter. Der Wert muß eine gültige Provider-URL sein.',
        verifyInsecure: 'Unsicherer "verify" Parameter. Der Wert muß eine gültige, registrierte URL von /auth sein.',
        verifyNoCred: 'Konnte keine IndieAuth Server-Zugangsdaten für _{title} finden.',
        verifyNoMe: 'Konnte überhaupt keine rel="me" Links auf _{title} finden.',
        verifyInvalidMe: 'Konnte keinen passenden rel="me" Link auf _{title} finden.',
        verifyTmpInvalidMe: 'Konnte keinen passenden rel="me" Link finden!<br>Klicke um Dich zu authentifizieren indem Du Deine URL ' +
            'bei _{title} einträgst.',
        verifyNoHeader: 'Endpunkt hat nicht bestätigt, daß es ein "authorization endpoint" ist.<br>Der Endpunkt sollte den ' +
            '"IndieAuth: authorization_endpoint" header zurückgeben.',
        verifyNotSelf: 'Dieser Auth-Server kann nicht benutzt werden um sich selbst zu authentifizieren.',
        verifyNoProvider: 'Kein gültiger IndieAuth Provider',
        verifySuccess: 'OK! Authentifiziere Dich mit _{title}.',
        notSupported: 'Dies ist kein unterstützter IndieAuth-Provider.',
        accessInsecure: 'Unsicherer "authorize"/"access" Parameter. Der Wert muß eine gültige, registrierte URL von /auth sein.',
        accessInvalid: 'Dieser Provider konnte nicht verifiziert werden.',
        accessUserId: 'Konnte die Benutzer Id des Providers nicht verifizieren.',
        accessUserMe: 'Konnte den rel="me" link nicht mit dem Provider verifizieren.',
        msgPrepare: 'Wir erstellen eine Nachricht. Einen Moment...',
        sent: 'Wir haben Dir eine _{provider} gesendet.<br>Gib den Verifizierungs Code ein',
        sign: 'GPG Sign - Zeichne dieses Token<br>mit deinem privaten Schlüssel',
        secLeft: '_{seconds} Sekunden verbleiben !',
        noRes: 'keine Antwort',
        noSuccess: 'Die Antwort war nicht erfolgreich.',
        unknown: 'Ein unbekannter Fehler trat auf. Etwas lief schrecklich schief. Entschuldigung!',
        cFoundNot: 'Noch nicht installiert',
        cFoundAll: 'Alle Provider installiert'
    };
    exports.default = messages;
});
//# sourceMappingURL=auth.js.map