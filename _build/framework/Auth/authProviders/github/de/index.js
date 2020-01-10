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
        description: 'Mache Software besser, zusammen.\nEine Community, wo mehr als ' +
            '15 Millionen Menschen lernen, teilen und zusammenarbeiten um Software zu bauen.',
        setup: {
            instructions: 'Öffne die Entwicklerseite und wähle "Register a new application" ...',
            key: 'Consumer Key (API Key)',
            secret: 'Consumer Secret (API Secret)',
            url: 'https://github.com/settings/developers'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map