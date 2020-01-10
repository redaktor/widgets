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
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/nls') + '/common');
    var locales = ['de'];
    var messages = {
        eSession: 'Error: Could not find a properly configured session middleware',
        eSessionSec: 'Error: Could not find a properly configured session token secret',
        eRequest: 'Error: Could not receive a "request token"',
        eAccess: 'Error: Could not exchange the given credential for an "access token"'
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
});
//# sourceMappingURL=common.js.map