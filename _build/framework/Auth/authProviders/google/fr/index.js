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
        description: 'Partagez le Web comme vous le vivez.',
        setup: {
            instructions: 'Please note: Open the developer page and create your credentials...',
            key: 'Client-ID',
            secret: 'Clientkey'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map