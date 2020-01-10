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
        description: 'Le site de toutes vos photos.\nImportez, regardez, organisez, retouchez ' +
            'et partagez vos photos depuis n\'importe quel appareil, où que vous soyez.',
        setup: {
            instructions: 'Please note: Open the developer page and click "Create an App", ' +
                'then choose non-commercial or commercial key ...',
            key: 'Key',
            secret: 'Secret'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map