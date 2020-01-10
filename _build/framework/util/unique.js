(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../dojo/core/uuid", "../crypto/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uuid_1 = require("../../dojo/core/uuid");
    var main_1 = require("../crypto/main");
    /* UUID : if no argument version 4 else if string version 5 */
    function uuid(str) {
        if (typeof str === 'string') {
            /* uuid v5 : */
            var h = main_1.default.hash(str, 'sha1', 'buffer');
            h[8] = h[8] & 0x3f | 0xa0; /* variant */
            h[6] = h[6] & 0x0f | 0x50; /* version */
            return h.toString('hex', 0, 16).match(/.{1,8}/g).join('-');
        }
        else {
            /* uuid v4 */
            return uuid_1.default();
        }
    }
    exports.uuid = uuid;
    /* NONCE - if fixed variable length */
    function nonce(lengthOrMin, maxLength) {
        if (lengthOrMin === void 0) { lengthOrMin = 64; }
        var length = lengthOrMin;
        if (!!maxLength && typeof maxLength === 'number') {
            length = Math.round(Math.random() * (maxLength - lengthOrMin) + lengthOrMin);
        }
        return main_1.default.randomBytes(length).toString('base64').replace(/[^\w]/g, '');
    }
    exports.nonce = nonce;
});
//# sourceMappingURL=unique.js.map