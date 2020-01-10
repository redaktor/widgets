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
        _yes: 'Ja',
        _no: 'Nein',
        _try: 'Probier es aus!',
        _domainStub: 'deinedomain.com',
        _signIn: 'Anmelden',
        _start: 'Leg Los',
        _sample: 'Beispiel-Code',
        _profile: 'Profil',
        _profiles: 'Profile',
        _setupInstructions: 'Setup Anleitung',
        navDev: 'Entwickler',
        navFAQ: 'FAQ',
        navSetup: 'Anleitung',
        description: 'Anmelden mit deiner Domain',
        footerWhy: 'Warum Indie Web?',
        footerStart: 'Anleitung',
        footerList: 'Liste von Projekten',
        footerHistory: 'Die Geschichte von IndieAuth',
        footerMfs: 'Mikroformate'
    };
    exports.default = messages;
});
//# sourceMappingURL=common.js.map