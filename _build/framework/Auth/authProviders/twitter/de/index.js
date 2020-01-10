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
        description: 'Whats Happening. Unsere Mission: Es jedem zu ermöglichen, Ideen ' +
            'und Informationen sofort und ohne Barrieren zu erstellen und zu teilen.',
        setup: {
            instructions: 'Dein twitter account muss mit einer Mobilfunknummer verknüpft sein ' +
                '(https://twitter.com/settings/devices). ' +
                'Öffne dann die Entwicklerseite und klicke "Create New App" ...',
            key: 'Consumer Key (API Key)',
            secret: 'Consumer Secret (API Secret)'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map