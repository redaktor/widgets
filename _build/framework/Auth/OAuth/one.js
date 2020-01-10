(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../dojo/core/util", "../../url", "../../crypto", ".."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var util_1 = require("../../../dojo/core/util");
    var url_1 = require("../../url");
    var crypto_1 = require("../../crypto");
    var __1 = require("..");
    var SIGNATURES;
    (function (SIGNATURES) {
        SIGNATURES[SIGNATURES["HMAC-SHA1"] = 0] = "HMAC-SHA1";
        SIGNATURES[SIGNATURES["RSA-SHA1"] = 1] = "RSA-SHA1";
        SIGNATURES[SIGNATURES["PLAINTEXT"] = 2] = "PLAINTEXT";
    })(SIGNATURES || (SIGNATURES = {}));
    ;
    var OAuthOneClient = /** @class */ (function (_super) {
        tslib_1.__extends(OAuthOneClient, _super);
        /* NOTE : Please use kwArgs like { consumerKey: '', ... }
         * Ordered Arguments fallback for minimal compatibility with node-oauth ...
        */
        function OAuthOneClient(authUrl, accessUrl, requestUrl, callbackUrl, consumerKey, consumerSecret, _signMethod, _nonceSize, verify) {
            if (_signMethod === void 0) { _signMethod = 'HMAC-SHA1'; }
            if (_nonceSize === void 0) { _nonceSize = 32; }
            if (verify === void 0) { verify = (function (o) { return o; }); }
            var _this = _super.call(this) || this;
            _this.authUrl = authUrl;
            _this.accessUrl = accessUrl;
            _this.requestUrl = requestUrl;
            _this.callbackUrl = callbackUrl;
            _this.consumerKey = consumerKey;
            _this.consumerSecret = consumerSecret;
            _this._signMethod = _signMethod;
            _this._nonceSize = _nonceSize;
            _this.verify = verify;
            _this._protocol = 'OAuth';
            _this._version = '1.0';
            _this._headerPrefix = 'OAuth';
            _this.requestOptions = { responseType: 'query' };
            _this.accessOptions = { responseType: 'query' };
            _this._E = {
                STATELESS: 'Stateless OAuth1 (e.g. only in the Browser) is not supported. ' +
                    'Use OAuth2 !',
                SIGN: 'Unsupported signature method:',
                PROP: 'Missing property:'
            };
            _this.isObject(authUrl) && util_1.mixin(_this, authUrl);
            /* TODO - simple this.validate (JSON SCHEMA) HERE ... */
            if (!SIGNATURES.hasOwnProperty(_this._signMethod)) {
                throw new TypeError(_this.errLog(_this._E.SIGN + " " + _this._signMethod));
            }
            else if (_this._signMethod === 'RSA-SHA1') {
                _this._privateKey = _this.consumerSecret;
            }
            _this.consumerSecret = _this._encode(_this.consumerSecret);
            if (!_this.callbackUrl) {
                _this._type = '1legged';
            }
            _this.initDebugLog(['consumerSecret'], ['setup', 'svg']);
            _this.initOAuthOne();
            return _this;
        }
        Object.defineProperty(OAuthOneClient.prototype, "OAuthParams", {
            get: function () {
                return {
                    oauth_timestamp: this._getTimestamp(),
                    oauth_nonce: this._getNonce(this._nonceSize),
                    oauth_version: this._version,
                    oauth_signature_method: this._signMethod,
                    oauth_consumer_key: this.consumerKey
                };
            },
            enumerable: true,
            configurable: true
        });
        /* public, overwritable : */
        OAuthOneClient.prototype.initOAuthOne = function () { };
        /* Sorts the encoded key value pairs by encoded key */
        OAuthOneClient.prototype._sortParams = function (o) {
            var ordered = {};
            Object.keys(o).sort().forEach(function (key) { ordered[key] = o[key]; });
            return ordered;
        };
        OAuthOneClient.prototype._normalizeParams = function (o) {
            var _this = this;
            var argStrings = [];
            var orderedKeys = Object.keys(o).map(function (k) {
                return _this._encode(k);
            }).sort().forEach(function (k) {
                argStrings.push([k, '=', _this._encode(o[k])].join(''));
            });
            return argStrings.join('&');
        };
        OAuthOneClient.prototype._getSignature = function (kwArgs, oauthParams) {
            var _url = this._encode(this._normalizeUrl(kwArgs.url, false));
            var _params = this._encode(this._normalizeParams(oauthParams));
            var _secret = this._encode(kwArgs.oauth_token_secret);
            var _base = [kwArgs.method.toUpperCase(), _url, _params].join('&');
            if (this._signMethod === 'RSA-SHA1') {
                var key = this._privateKey || '';
                return crypto_1.default.sign(_base, key, 'RSA-SHA1');
            }
            else {
                var key = [this.consumerSecret, _secret].join('&');
                return (this._signMethod === 'PLAINTEXT') ? key : crypto_1.default.hmac(_base, key, 'base64', 'sha1');
            }
        };
        OAuthOneClient.prototype._getOAuthParams = function (kwArgs) {
            var newParams = this.OAuthParams;
            ['oauth_callback', 'oauth_token', 'oauth_verifier'].forEach(function (k) {
                if (typeof kwArgs[k] === 'string') {
                    newParams[k] = kwArgs[k];
                    delete kwArgs[k];
                }
            });
            util_1.mixin(newParams, (url_1.default.parse(kwArgs.url, true).query || {}));
            newParams.oauth_signature = this._getSignature(kwArgs, newParams);
            return this._sortParams(newParams);
        };
        /* Builds the OAuth request authorization header */
        OAuthOneClient.prototype.getAuthHeader = function (kwArgs) {
            var _this = this;
            var oauthParams = this._getOAuthParams(util_1.mixin({}, kwArgs));
            // Only 1.0 "oauth_" arguments should appear within the authorization header
            var header = Object.keys(oauthParams).map(function (key) {
                return (key.slice(0, 6) === 'oauth_') ?
                    [_this._encode(key), '="', _this._encode(oauthParams[key]), '"'].join('') : '';
            }).join(',');
            return [this._headerPrefix, header].join(' ');
        };
        /* Validation and Error Handling */
        OAuthOneClient.prototype.success = function (o, req, res, finish) {
            if (o === void 0) { o = {}; }
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (finish === void 0) { finish = false; }
            util_1.mixin(o, { req: req, res: res, options: { url: this.authUrl }, finish: finish });
            var key = 'oauth_token';
            var tokenStr = finish ? 'access token' : 'request token';
            var token = (this.isObject(o.data) && o.data[key]);
            if (typeof token !== 'string') {
                var eMsg = this._E.PROP + " \"" + key + "\" in " + tokenStr + " result!";
                return Promise.reject(this.error(eMsg, 412));
            }
            if (this.debug) {
                var uStr = finish ? '!' : ('& authUrl: ' + this.authUrl);
                this.debugLog({ success: "Valid " + tokenStr + " " + uStr + " " });
                (!finish && this.debugLog({ neutral: 'Redirecting to authUrl ...' }));
            }
            return (!finish) ? this.redirect(o, { oauth_token: token }) : this.state(o);
        };
        /**
         * Gets a request token from the OAuth provider and passes that information
         * back to the calling code.
         * Depending on the arguments it either
         * 1) Returns a Promise for {oauth_token:'', oauth_verifier:'', authUrl:''}
       * 2) Redirects the User to it's .authUrl (with oauth_ arguments)
         * This method has optional parameters and can be called in two ways:
         *
         * 1) Does a basic request with no extra parameters
         *  auth().then
         *
         * 2) Allows for provision of middleware arguments and extra parameters to be
            sent as part of the query to the server.
         *  auth(req, res) ---> res.redirect
         *
         * NOTE - This method will HTTP POST by default, if you wish to override
       * this behaviour you will need to provide {method: ''} in requestOptions
       * when creating the client.
         *
         **/ /* TYPESCRIPT TODO any = express.req / express.res : */
        OAuthOneClient.prototype.auth = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            if (!this.isStateful(req)) {
                return Promise.reject(this.errLog(this._E.STATELESS));
            }
            this.debugLog({ neutral: 'Getting a request token ...' });
            return this.options({ id: 'request', req: req, res: res, options: kwArgs })
                .then(function (o) { return _this.state(o, '/oauth_callback'); })
                .then(function (o) { return _this.request(o); })
                .then(function (o) { return _this.success(o, req, res); }, this.authError());
        };
        /**
         * Exchange the request token and verifier from the OAuth provider
         * for an access token.
       * As above but for 1) needs at least {oauth_token: '', oauth_verifier?: ''}
       * and oauth_token_secret in either url parameters or session from requestUrl ...
         **/
        OAuthOneClient.prototype.access = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = { url: window.location.href }; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            this.debugLog({ neutral: 'Getting an access token ...' });
            var accessArgs = (req && req.url && url_1.default.parse(req.url, true).query) || {};
            return this.options({ id: 'access', req: req, res: res, options: kwArgs }, accessArgs)
                .then(function (o) { return _this.state(o); })
                .then(function (o) { return _this.request(o); })
                .then(function (o) { return _this.success(o, req, res, true); }, this.authError('eAccess'));
        };
        return OAuthOneClient;
    }(__1.default));
    exports.default = OAuthOneClient;
});
//# sourceMappingURL=one.js.map