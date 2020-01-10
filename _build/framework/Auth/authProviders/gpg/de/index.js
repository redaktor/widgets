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
        title: 'GPG',
        description: 'Melde Dich mit GPG an.',
        setup: { instructions: 'Öffne die Entwicklerseite ...' }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map