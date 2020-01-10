(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var main_1 = require("@dojo/framework/has/main");
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/MailAuth/nls') + '/common');
    var locales = ['de'];
    /* TODO FIXME - consolidate TPL for MailAuth ! */
    var messages = {
        codeName: 'Verification Token',
        messageSubject: '_{iss} _{codeName}',
        messageHeader: 'Did you want to sign in with _{iss} ?',
        messageBody: 'If you just wanted to sign in with _{iss}, this is your token :',
        messageAsText: '[token as text] : ',
        messageValid: 'This _{codeName} is valid until _{exp}',
        messageFooter: 'Copyright &copy; people of the IndieWeb.',
        messageForm: 'We have sent you a mail.<br>Enter the _{codeName}',
        messageFormValid: 'Du hast Zeit bis _{exp}',
        messageFormRemain: '_{sec} seconds remain',
        messageFormExpired: 'The challenge is expired.',
        messageFormSubmitted: 'Checking the _{codeName} ...',
        missingProp: 'Missing property:',
        missingTo: 'Missing recipient: No "to" or "req.query.authorize" found',
        rejected: 'The eMail was rejected !'
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
});
//# sourceMappingURL=common.js.map