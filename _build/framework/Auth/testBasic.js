(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _1 = require(".");
    var basic = new _1.default({
        debug: true,
        authUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/basic',
        test: 'https://redaktor.circinus.uberspace.de/redaktornode{/key}',
        key: 'sebi',
        secret: 'sebi'
    });
    basic.auth().then(function (verifyRes) { console.log('auth verifyRes', verifyRes); });
});
//# sourceMappingURL=testBasic.js.map