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
        codeName: 'GPG Nachricht',
        messageForm: 'GPG Sign - Zeichne dieses Token mit deinem privaten Schlüssel',
        missingProp: 'Fehlende Eigenschaft:',
        missingKey: 'Öffentlicher Schlüssel fehlt: Kein GPG public key gefunden',
        rejected: 'Die GPG signature passt nicht !'
    };
    exports.default = messages;
});
//# sourceMappingURL=index.js.map