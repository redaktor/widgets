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
        description: 'Whats Happening. 我们的使命：让每个人都能畅通无阻地随时提出和分享想法及资讯。',
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