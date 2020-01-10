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
        description: 'Whats Happening. Notre mission : donner à chacun le pouvoir de créer ' +
            'et de partager des idées et des informations instantanément et sans entraves.',
        setup: {
            instructions: 'Please note: Your twitter account must be connected with a mobile ' +
                'phone number (https://twitter.com/settings/devices). ' +
                'Then open the developer page and click "Create New App" ...',
            key: 'Consumer Key (API Key)',
            secret: 'Consumer Secret (API Secret)'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map