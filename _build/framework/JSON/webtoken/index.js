/**
 * redaktor/auth/jwt
 *
 * JSON Web Token encode and decode module for browsers and node.js
 *
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../../String/tag/log", "../../String/base64", "../../crypto"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /* TODO for jwt auth client : header: { 'Access-Control-Allow-Origin': '*' }
     * https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication
     * TODO exp nbf https://github.com/zeit/ms
     */
    /**
     * module dependencies
     */
    var has_1 = require("@dojo/framework/has/has");
    var log_1 = require("../../String/tag/log");
    var base64_1 = require("../../String/base64");
    var crypto_1 = require("../../crypto");
    var JWT = 'JSON webtoken: ';
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
            return crypto_1.hmacAlgorithm(method, true);
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
                    log_1.log(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["", "Encoding a JWT requires a \"key\" string."], ["", "Encoding a JWT requires a \"key\" string."])), JWT);
                }
                throw new Error(JWT + "Encoding a JWT requires a \"key\" string.");
            }
            var m = getAlgos(method);
            var header = { typ: 'JWT', alg: m.alg };
            if (options.header) {
                header = tslib_1.__assign({}, header, options.header);
            }
            // create segments, all segments should be base64Url string
            var segments = [];
            segments.push(base64_1.urlEncode(JSON.stringify(header)));
            segments.push(base64_1.urlEncode(JSON.stringify(payload)));
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
                    log_1.log(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["", "No token supplied."], ["", "No token supplied."])), JWT);
                }
                throw new Error(JWT + "No token supplied.");
            }
            var m = getAlgos(method);
            var segments = token.split('.');
            if (segments.length !== 3) {
                if (jwt.debug) {
                    log_1.log(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["", "Not enough or too many segments."], ["", "Not enough or too many segments."])), JWT);
                }
                throw new Error(JWT + "Not enough or too many segments.");
            }
            // all segment should be base64
            var s = {
                header: segments[0],
                payload: segments[1],
                signature: segments[2]
            };
            // base64 decode and parse JSON
            var header = JSON.parse(base64_1.urlDecode(s.header));
            var payload = JSON.parse(base64_1.urlDecode(s.payload));
            if (doVerify) {
                // Support for nbf and exp claims.
                if (jwt.validTime(payload.nbf) && Date.now() < payload.nbf) {
                    if (jwt.debug) {
                        log_1.log(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["", "Token not yet active."], ["", "Token not yet active."])), JWT);
                    }
                    throw new Error(JWT + "Token not yet active.");
                }
                if (jwt.validTime(payload.exp) && Date.now() > payload.exp) {
                    if (jwt.debug) {
                        log_1.log(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["", "Token expired."], ["", "Token expired."])), JWT);
                    }
                    throw new Error(JWT + "Token expired.");
                }
                // verify signature. `sign` will return base64 string.
                var signingInput = [s.header, s.payload].join('.');
                if (!jwt.verify(signingInput, key, s.signature, m.method)) {
                    if (jwt.debug) {
                        log_1.log(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["", "Signature verification failed."], ["", "Signature verification failed."])), JWT);
                    }
                    throw new Error(JWT + "Signature verification failed.");
                }
            }
            return payload;
        };
        ;
        jwt.sign = function (text, key, method) {
            if (method === void 0) { method = 'HS256'; }
            var signMethod = (method === 'RSA-SHA256') ? method : null;
            var base64str = '';
            if (signMethod) {
                base64str = crypto_1.default.sign(text, key, signMethod);
            }
            else {
                base64str = crypto_1.default.hmac(text, key, 'base64', method);
            }
            return base64_1.escape(base64str);
        };
        jwt.verify = function (text, key, signature, method) {
            if (method === void 0) { method = 'HS256'; }
            var signMethod = (method === 'RSA-SHA256') ? method : null;
            if (signMethod) {
                if (!has_1.default('host-node')) {
                    log_1.warning('Signature RS verification only available in node.js');
                    return false;
                }
                return crypto_1.default.verify(text, key, method, base64_1.unescape(signature));
            }
            else {
                return (signature === this.sign(text, key, method));
            }
        };
        jwt.header = function (token) {
            if (typeof token !== 'string') {
                return void 0;
            }
            var o = JSON.parse(base64_1.urlDecode(token.split('.')[0]));
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
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
});
//# sourceMappingURL=index.js.map