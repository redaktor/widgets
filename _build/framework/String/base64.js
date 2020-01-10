(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/has"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var has_1 = require("@dojo/framework/has/has");
    function _repeat(str, num) { return new Array(num + 1).join(str); }
    ;
    function escape(str) {
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    exports.escape = escape;
    function unescape(str) {
        str = str.toString();
        var mod = str.length % 4;
        if (mod !== 0) {
            str += _repeat('=', 4 - mod);
        }
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }
    exports.unescape = unescape;
    function encode(str) {
        if (has_1.default('host-node')) {
            return Buffer.from(str, 'utf8').toString('base64');
        }
        else {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (m, p1) {
                return String.fromCharCode(parseInt(('0x' + p1), 16));
            }));
        }
    }
    exports.encode = encode;
    function decode(b64String) {
        b64String = b64String.toString();
        if (has_1.default('host-node')) {
            return Buffer.from(b64String, 'base64').toString('utf8');
        }
        else {
            return decodeURIComponent(b64String.split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    }
    exports.decode = decode;
    function urlEncode(str) {
        return escape(encode(str));
    }
    exports.urlEncode = urlEncode;
    function urlDecode(b64String) {
        b64String = b64String.toString();
        return decode(unescape(b64String));
    }
    exports.urlDecode = urlDecode;
});
//# sourceMappingURL=base64.js.map