(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../../../dojo/core/util", "../../util/string", "../../url", ".."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var has_1 = require("@dojo/framework/has/has");
    var util_1 = require("../../../dojo/core/util");
    var string_1 = require("../../util/string");
    var url_1 = require("../../url");
    var __1 = require("..");
    var OAuthTwoClient = /** @class */ (function (_super) {
        tslib_1.__extends(OAuthTwoClient, _super);
        function OAuthTwoClient(authUrl, accessUrl, callbackUrl, scope, clientId, clientSecret, _nonceSize, implicit, verify) {
            if (_nonceSize === void 0) { _nonceSize = 32; }
            if (implicit === void 0) { implicit = false; }
            if (verify === void 0) { verify = (function (o) { return o; }); }
            var _this = _super.call(this) || this;
            _this.authUrl = authUrl;
            _this.accessUrl = accessUrl;
            _this.callbackUrl = callbackUrl;
            _this.scope = scope;
            _this.clientId = clientId;
            _this.clientSecret = clientSecret;
            _this._nonceSize = _nonceSize;
            _this.implicit = implicit;
            _this.verify = verify;
            _this._protocol = 'OAuth';
            _this._version = '2';
            _this._headerPrefix = 'Bearer';
            _this.authOptions = {
                responseType: 'query',
                query: { client_id: '', response_type: 'code' }
            };
            _this.accessOptions = {
                responseType: 'json',
                query: { client_id: '', grant_type: 'authorization_code' }
            };
            /* _originURL, client, headers, data ... */
            _this.accessTokenName = 'access_token';
            _this.isObject(authUrl) && util_1.mixin(_this, authUrl);
            _this._init();
            return _this;
        }
        Object.defineProperty(OAuthTwoClient.prototype, "user", {
            /* Resource Owner Password flow (grant_type = password) */
            get: function () { return this.key; },
            set: function (user) { this.key = user; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OAuthTwoClient.prototype, "password", {
            get: function () { return this.secret; },
            set: function (pw) { this.secret = pw; },
            enumerable: true,
            configurable: true
        });
        OAuthTwoClient.prototype._init = function () {
            if (this._type === '3legged') {
                this.implicit = false;
            }
            this.clientId = this._encode(this.clientId);
            this.authOptions.query.client_id = this.clientId;
            this.accessOptions.query.client_id = this.clientId;
            if (this.clientSecret && this._type === '3legged') {
                this.clientSecret = this._encode(this.clientSecret);
                this.accessOptions.query.client_secret = this.clientSecret;
            }
            else {
                this.clientSecret = void 0;
            }
            if (this.callbackUrl) {
                this.authOptions.query.redirect_uri = this.callbackUrl;
                this.accessOptions.query.redirect_uri = this.callbackUrl;
            }
            this.initDebugLog(['clientSecret'], ['setup', 'svg']);
            this.initOAuthTwo();
        };
        /* public, overwritable : */
        OAuthTwoClient.prototype.initOAuthTwo = function () { };
        OAuthTwoClient.prototype.type = function (t) { return (!t) ? this._type : util_1.mixin(this, { _type: t }); };
        // Builds the OAuth2 authorization header. In particular, the part after the colon,
        // e.g. Authorization: Bearer <token> -> Build "Bearer <token>"
        OAuthTwoClient.prototype.getAuthHeader = function (kwArgs) {
            if (typeof kwArgs === 'object' && kwArgs.hasOwnProperty(this.accessTokenName)) {
                var TOKEN = kwArgs[this.accessTokenName];
                if (typeof kwArgs.token_type === 'string' && kwArgs.token_type.length) {
                    this._headerPrefix = string_1.capitalize(kwArgs.token_type);
                }
                return [this._headerPrefix, TOKEN].join(' ');
            }
            else {
                var TOKEN = (typeof kwArgs != 'string') ?
                    [this.clientId, this.clientSecret].join(':') : kwArgs;
                return this._headerPrefix + " " + string_1.base64Encode(TOKEN);
            }
        };
        /* TODO FIXME check URLS : (!!hasCode && !this.accessUrl && !has('host-browser')) ?
              { error: 'No "accessUrl" was found for 3legged OAuth2 ...' } :
              { error: 'No "authUrl" was found for OAuth2 ' + this._type + '...' } ); */
        OAuthTwoClient.prototype.initOAuth2 = function (o) {
            if (o === void 0) { o = {}; }
            if (!o.options.user && !this.user && !this.implicit && !!this.callbackUrl) {
                return o; /* grant_type: 'authorization_code' */
            }
            var _query = {};
            var _responseType = 'query';
            if ((typeof o.options.user === 'string' || typeof this.user === 'string') &&
                (typeof o.options.password === 'string' || typeof this.password === 'string')) {
                _query = {
                    grant_type: 'password',
                    user: (typeof o.options.user === 'string' && o.options.user) || this.user,
                    password: (typeof o.options.password === 'string' && o.options.password) || this.password
                };
                _responseType = 'json';
            }
            else if (!this.callbackUrl && has_1.default('host-node')) {
                _query = { grant_type: 'client_credentials', client_secret: this.clientSecret };
                _responseType = 'json';
            }
            else if (this.implicit) {
                /* NOTE grant_type = 'implicit' (browser) : "Implicit was previously recommended
                 * for clients without a secret, but has been superceded by using the Authorization Code
                 * grant with no secret." :: Set {implicit: true} in the options (explicitly) to use it !
                 */
                _query = { grant_type: 'implicit', response_type: 'token' };
                this.clientSecret = void 0;
            }
            util_1.deepMixin(o.options, { query: _query, responseType: _responseType });
            return o;
        };
        OAuthTwoClient.prototype.rewrite = function (o) {
            if (o === void 0) { o = {}; }
            var kw = o.options;
            /* e.g. Facebook and Github use(d) rev05 of the spec, correct it unobstrusive : */
            if (!kw.set) {
                kw.set = {};
            }
            kw.set.json = function (data, res) {
                if (res === void 0) { res = {}; }
                try {
                    res = JSON.parse(data);
                }
                catch (e) {
                    res = url_1.default.parse(data, true).query;
                }
                return JSON.stringify(res);
            };
            /* for POST/PUT send query as key-value pairs in the request body (URL parameter string) : */
            if (this.isPutPost(kw) && !(kw.data)) {
                kw.data = this._fixEncode(url_1.default.parameters(url_1.default.withParameters('', kw.query)).toString());
                kw.query = {};
            }
            return o;
        };
        OAuthTwoClient.prototype.react = function (o) {
            if (!!(o.options.query.grant_type)) {
                this.debugLog({ neutral: 'Directly getting an accessToken ...' });
                return this.request(o);
            }
            this.debugLog({ neutral: "Redirecting to authUrl: " + this.authUrl });
            return this.redirect(o);
        };
        /* Validation and Error Handling */
        OAuthTwoClient.prototype.success = function (o, req, res, finish) {
            if (o === void 0) { o = {}; }
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (finish === void 0) { finish = false; }
            util_1.mixin(o, { req: req, res: res, finish: finish });
            var tokenStr = finish ? 'access token' : 'code';
            /* auth FIXME TODO :
            // Client credentials and password MUST have JSON access_token w token_type Bearer
            // !finish MUST HAVE code, state ELSE access_token, expires_in,
            refresh_token, refresh METHOD, see http://oauthbible.com/#oauth-2-three-legged
            */
            if (this.debug) {
                var urlStr = finish ? '!' : ('and authUrl: ' + this.authUrl);
                this.debugLog([{ success: "Valid " + tokenStr + " " + urlStr }, { list: o.data }]);
            }
            return this.state(o);
        };
        /**
         * Send user to OAuth provider for granting access or getting the code.
        **/
        OAuthTwoClient.prototype.auth = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            return this.options({ id: 'auth', req: req, res: res, options: kwArgs })
                .then(function (o) { return _this.initOAuth2(o); })
                .then(function (o) { return _this.forceHTTPS(o); })
                .then(function (o) { return _this.state(o); })
                .then(function (o) { return _this.react(o); })
                .then(function (o) { return _this.success(o, req, res); }, this.authError());
        };
        /**
           * Exchange the given code from the OAuth provider for an access token.
          **/
        OAuthTwoClient.prototype.access = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = { url: window.location.href }; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            this.debugLog([{ neutral: 'Getting an access token ...' }]);
            var optionArgs = { id: 'access', req: req, res: res, options: kwArgs };
            var accessArgs = { query: (req.url && url_1.default.parse(req.url, true).query) || {} };
            return this.options(optionArgs, accessArgs)
                .then(function (o) { return _this.forceHTTPS(o); })
                .then(function (o) { return _this.state(o); })
                .then(function (o) { return _this.rewrite(o); })
                .then(function (o) { return _this.request(o); })
                .then(function (o) { return _this.success(o, req, res, true); }, this.authError('eAccess'));
        };
        return OAuthTwoClient;
    }(__1.default));
    exports.default = OAuthTwoClient;
});
//# sourceMappingURL=two.js.map