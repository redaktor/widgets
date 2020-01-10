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
    var provider = {
        setup: {
            instructions: 'Öffne die Entwicklerseite und erstelle Deine Zugangsdaten... \n' +
                'Stelle sicher, daß die YouTube API für Dein Projekt aktiviert ist.',
            key: 'Client-ID',
            secret: 'Clientkey [Clientschlüssel ...]'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map