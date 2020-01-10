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
        description: 'Die Seite für all deine Fotos.\nLade deine Fotos hoch, greife auf sie zu, ' +
            'sortiere, bearbeite und teile sie – über jedes Gerät und von überall auf der Welt aus.',
        setup: {
            instructions: 'Öffne die Entwicklerseite und klicke "Create an App", ' +
                'wähle dann aus, ob dein Key nicht-kommerziell oder kommerziell ist ...',
            key: 'Key',
            secret: 'Secret'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map