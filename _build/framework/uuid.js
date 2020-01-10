(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./crypto"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = require("./crypto");
    function uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    exports.uuid4 = uuid4;
    /** UUID :
     * version 4 without arguments
     * version 5 with one string as arguments
    */
    function uuid(
    /** optionally provide a string for uuid v5 */
    v5name) {
        if (typeof v5name === 'string') {
            /* uuid v5 : */
            var h = crypto_1.default.hash(v5name, 'sha1', 'buffer');
            h[8] = h[8] & 0x3f | 0xa0; /* variant */
            h[6] = h[6] & 0x0f | 0x50; /* version */
            return (h.toString('hex', 0, 16).match(/.{1,8}/g) || []).join('-');
        }
        /* uuid v4 */
        return uuid4();
    }
    exports.default = uuid;
    /* NONCE - if fixed variable length */
    function nonce(lengthOrMin, maxLength) {
        if (lengthOrMin === void 0) { lengthOrMin = 64; }
        var length = lengthOrMin;
        if (!!maxLength && typeof maxLength === 'number') {
            length = Math.round(Math.random() * (maxLength - lengthOrMin) + lengthOrMin);
            return crypto_1.default.randomBytes(length).toString('base64')
                .substring(0, length).replace(/[^\w]/g, '');
        }
        return crypto_1.default.randomBytes(length).toString('base64').replace(/[^\w]/g, '');
    }
    exports.nonce = nonce;
});
//# sourceMappingURL=uuid.js.map