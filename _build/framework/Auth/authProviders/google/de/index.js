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
        description: 'Teilen wie im richtigen Leben, neu erfunden für das Web.',
        setup: {
            instructions: 'Öffne die Entwicklerseite und erstelle Deine Zugangsdaten...',
            key: 'Client-ID',
            secret: 'Clientkey [Clientschlüssel ...]'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map