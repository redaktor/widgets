(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../JSON/webtoken"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var webtoken_1 = require("../JSON/webtoken");
    var jToken = webtoken_1.default.encode({ hello: 'world' }, 'secret', 'sha256');
    var result = webtoken_1.default.decode(jToken, 'secret');
    console.log('jToken', jToken);
    console.log('result', result);
});
//# sourceMappingURL=testJwt.js.map