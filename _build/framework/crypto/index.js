/* TODO FIXME : crypto-browserify */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../String/tag/log", "crypto"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * redaktor/crypto
     *
     * TODO FIXME - DESCRIPTION when alpha
     *
     * Copyright (c) 2016 Sebastian Lasse, redaktor foundation
     * TODO FIXME - CLEAR LICENSE when alpha
     */
    var has_1 = require("@dojo/framework/has/has");
    var log_1 = require("../String/tag/log");
    //import { _ as log } from '../String/tag/log';
    var _crypto = require("crypto");
    var crypto = has_1.default('host-node') ? _crypto : require('crypto-browserify');
    /**
     * support algorithm mapping JWT / redaktor.crypto
     */
    var HMAC_ALGO = {
        md5: false,
        ripemd160: false,
        sha1: false,
        sha3: false,
        sha224: false,
        sha256: 'HS256',
        sha384: 'HS384',
        sha512: 'HS512'
    };
    var HASH_ALGO = {
        md5: 'MD5',
        sha1: 'SHA1',
        sha2: 'SHA2',
        sha224: 'SHA224',
        sha256: 'SHA256',
        sha384: 'SHA384',
        sha512: 'SHA512'
    };
    var env = has_1.default('host-node') ? 'node.js' : 'client';
    /* TODO - FIXME
    get const HOST_HMAC_ALGO for node.js by 'openssl list-message-digest-algorithms'
    */
    function hmacAlgorithm(algoStr, isJWT) {
        if (isJWT === void 0) { isJWT = false; }
        var algo = algoStr.toLowerCase();
        var allow = (isJWT) ?
            (typeof algo === 'string' && typeof HMAC_ALGO[algo] === 'string') :
            (typeof algo === 'string' && HMAC_ALGO.hasOwnProperty(algo));
        if (!allow) {
            var suffix = (isJWT) ? 'for JWT.' : '.';
            log_1.warning(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["[SECURITY] algorithm ", " not usable in ", " or to weak ", ".\n    Falling back to sha256."], ["[SECURITY] algorithm ", " not usable in ", " or to weak ", ".\n    Falling back to sha256."])), algoStr, env, suffix);
            return { method: 'sha256', alg: HMAC_ALGO['sha256'] };
        }
        return { method: algo, alg: HMAC_ALGO[algo] };
    }
    exports.hmacAlgorithm = hmacAlgorithm;
    var Crypto = /** @class */ (function () {
        function Crypto() {
        }
        Crypto.randomBytes = function (size) {
            if (size === void 0) { size = 32; }
            return crypto.randomBytes(size);
        };
        Crypto.hash = function (text, algo, out) {
            if (algo === void 0) { algo = 'sha256'; }
            if (out === void 0) { out = 'hex'; }
            if (out === 'buffer') {
                out = void 0;
            }
            if (crypto.getHashes().indexOf(algo.toLowerCase()) === -1) {
                log_1.warning(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["[SECURITY] algorithm ", " not usable in ", " or to weak.\n      Falling back to sha256."], ["[SECURITY] algorithm ", " not usable in ", " or to weak.\n      Falling back to sha256."])), algo, env);
                algo = 'sha256';
            }
            return crypto.createHash(algo.toLowerCase()).update(text).digest(out);
        };
        Crypto.hmac = function (text, key, out, algo) {
            if (out === void 0) { out = 'base64'; }
            if (algo === void 0) { algo = 'sha256'; }
            if (out === 'buffer') {
                out = void 0;
            }
            algo = hmacAlgorithm(algo).method;
            return crypto.createHmac(algo, key).update(text).digest(out);
        };
        Crypto.sign = function (text, key, algo, out) {
            if (algo === void 0) { algo = 'RSA-SHA256'; }
            if (out === void 0) { out = 'base64'; }
            return crypto.createSign(algo).update(text).sign(key, out);
        };
        Crypto.verify = function (text, key, algo, signature, out) {
            if (algo === void 0) { algo = 'sha256'; }
            if (signature === void 0) { signature = ''; }
            if (out === void 0) { out = 'base64'; }
            return crypto.createVerify(algo).update(text).verify(key, signature, out);
        };
        return Crypto;
    }());
    ;
    exports.default = Crypto;
    var templateObject_1, templateObject_2;
});
//# sourceMappingURL=index.js.map