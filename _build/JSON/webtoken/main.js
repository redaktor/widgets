/**
 * redaktor/auth/jwt
 *
 * JSON Web Token encode and decode module for browsers and node.js
 *
 * Copyright (c) 2016 Sebastian Lasse, redaktor foundation
 * TODO FIXME - CLEAR LICENSE when alpha
 */
/* derives from */
/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/main", "../../dojo/core/main", "../../util/log", "../../util/string/main", "../../crypto/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* TODO for jwt auth client : header: { 'Access-Control-Allow-Origin': '*' }
     * https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
     */
    /**
     * module dependencies
     */
    var main_1 = require("@dojo/framework/has/main");
    var main_2 = require("../../dojo/core/main");
    var log_1 = require("../../util/log");
    var main_3 = require("../../util/string/main");
    var main_4 = require("../../crypto/main");
    /**
     * support algorithm mapping JWT / redaktor.crypto
     */
    var algorithmMap = {
        HS256: 'sha256',
        HS384: 'sha384',
        HS512: 'sha512',
        RS256: 'RSA-SHA256' /* only node.js */
    };
    function getAlgos(method) {
        var uMethod = method.toUpperCase();
        if (algorithmMap.hasOwnProperty(uMethod)) {
            return { method: algorithmMap[uMethod], alg: uMethod };
        }
        else {
            return main_4.hmacAlgorithm(method, true);
        }
    }
    var jwt = /** @class */ (function () {
        function jwt() {
        }
        /**
         * Encode jwt
         *
         * @param {Object} payload
         * @param {String} key
         * @param {String} method
         * @param {Object} options
         * @return {String} token
         * @api public
         */
        jwt.encode = function (payload, key, method, options) {
            if (method === void 0) { method = 'HS256'; }
            if (options === void 0) { options = {}; }
            // Check key and make header
            if (typeof key != 'string') {
                if (jwt.debug) {
                    log_1.log('Encoding a JWT requires a "key" string.');
                }
                return '';
            }
            var m = getAlgos(method);
            var header = { typ: 'JWT', alg: m.alg };
            if (options.header) {
                main_2.lang.mixin(header, options.header);
            }
            // create segments, all segments should be base64Url string
            var segments = [];
            segments.push(main_3.base64UrlEncode(JSON.stringify(header)));
            segments.push(main_3.base64UrlEncode(JSON.stringify(payload)));
            segments.push(this.sign(segments.join('.'), key, m.method));
            return segments.join('.');
        };
        ;
        /**
         * Decode jwt
         *
         * @param {Object} token
         * @param {String} key
         * @param {String} method
         * @param {Boolean} doVerify
         * @return {Object} payload
         * @api public
         */
        jwt.decode = function (token, key, method, doVerify) {
            if (method === void 0) { method = 'HS256'; }
            if (doVerify === void 0) { doVerify = true; }
            // check token and segments
            if (!token) {
                if (jwt.debug) {
                    log_1.log('No token supplied');
                }
                return {};
            }
            var m = getAlgos(method);
            var segments = token.split('.');
            if (segments.length !== 3) {
                if (jwt.debug) {
                    log_1.log('Not enough or too many segments');
                }
                return {};
            }
            // all segment should be base64
            var s = {
                header: segments[0],
                payload: segments[1],
                signature: segments[2]
            };
            // base64 decode and parse JSON
            var header = JSON.parse(main_3.base64UrlDecode(s.header));
            var payload = JSON.parse(main_3.base64UrlDecode(s.payload));
            if (doVerify) {
                // Support for nbf and exp claims.
                if (jwt.validTime(payload.nbf) && Date.now() < payload.nbf) {
                    if (jwt.debug) {
                        log_1.log('Token not yet active');
                    }
                    return {};
                }
                if (jwt.validTime(payload.exp) && Date.now() > payload.exp) {
                    if (jwt.debug) {
                        log_1.log('Token expired');
                    }
                    return {};
                }
                // verify signature. `sign` will return base64 string.
                var signingInput = [s.header, s.payload].join('.');
                if (!this.verify(signingInput, key, s.signature, m.method)) {
                    if (jwt.debug) {
                        log_1.log('Signature verification failed');
                    }
                    return {};
                }
            }
            return payload;
        };
        ;
        jwt.sign = function (text, key, method) {
            if (method === void 0) { method = 'HS256'; }
            var base64str = '';
            var signMethod = (method === 'RSA-SHA256') ? method : null;
            if (signMethod) {
                base64str = main_4.default.sign(text, key, signMethod);
            }
            else {
                base64str = main_4.default.hmac(text, key, method);
            }
            return main_3.escape(base64str);
        };
        jwt.verify = function (text, key, signature, method) {
            if (method === void 0) { method = 'HS256'; }
            var signMethod = (method === 'RSA-SHA256') ? method : null;
            if (signMethod) {
                if (!main_1.default('host-node')) {
                    log_1.log({ warning: 'Signature RS verification only available in node.js' });
                    return false;
                }
                return main_4.default.verify(text, key, method, main_3.unescape(signature));
            }
            else {
                return (signature === this.sign(text, key, method));
            }
        };
        jwt.header = function (token) {
            if (typeof token !== 'string') {
                return void 0;
            }
            var o = JSON.parse(main_3.base64UrlDecode(token.split('.')[0]));
            if (!o || typeof o !== 'object' || !o.alg || !o.typ) {
                return void 0;
            }
            return o;
        };
        jwt.payload = function (token) {
            if (typeof token !== 'string') {
                return void 0;
            }
            return token.split('.')[1];
        };
        jwt.alg = function (token) {
            var header = jwt.header(token);
            if (!header) {
                return void 0;
            }
            return header.alg;
        };
        jwt.algLength = function (token) {
            var alg = jwt.alg(token);
            if (!alg || !algorithmMap[alg]) {
                return void 0;
            }
            return parseInt(alg.replace(/^(RS)|(HS)/, ''), 10);
        };
        jwt.validTime = function (timeNr) {
            return (timeNr && !isNaN(timeNr) && typeof timeNr === 'number');
        };
        jwt.version = '0.5.0';
        jwt.debug = false;
        return jwt;
    }());
    exports.default = jwt;
});
//# sourceMappingURL=main.js.map