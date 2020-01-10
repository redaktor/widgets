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
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var locales = {
        de: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./de'); }) : new Promise(function (resolve_1, reject_1) { require(['./de'], resolve_1, reject_1); }); }
    };
    /* TODO FIXME - consolidate TPL for MailAuth ! */
    var messages = {
        codeName: 'GPG message',
        messageForm: 'GPG - Sign this token with your private key',
        missingProp: 'Missing property:',
        missingKey: 'Missing public key: No GPG public key found',
        rejected: 'The GPG signature did not match !'
    };
    exports.default = { locales: locales, messages: messages };
});
//# sourceMappingURL=index.js.map