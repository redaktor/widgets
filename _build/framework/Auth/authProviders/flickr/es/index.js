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
        description: 'El hogar de todas tus fotos.\nSube tus fotos, accede a tu contenido, ' +
            'organízalo, edítalo y compártelo desde cualquier dispositivo y desde cualquier parte del mundo.',
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