(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../../dojo/core/util", "../JSON/Pointer", "../JSON/webtoken", "../uuid", "../crypto", "../url", "../util/i18n", "../Request", "./nls/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    //import { OAuthArgs, OAuth2Options } from './OAuth/interfaces';
    var has_1 = require("@dojo/framework/has/has");
    var util_1 = require("../../dojo/core/util");
    var Pointer_1 = require("../JSON/Pointer");
    var webtoken_1 = require("../JSON/webtoken");
    var uuid_1 = require("../uuid");
    var crypto_1 = require("../crypto");
    var url_1 = require("../url");
    var i18n_1 = require("../util/i18n");
    var Request_1 = require("../Request");
    var common_1 = require("./nls/common");
    /*
    .options
    .protocolStr
    ._getUUID
    ._getNonce
    .isObject
    .debugLog
    .msg
    */
    var Auth = /** @class */ (function (_super) {
        tslib_1.__extends(Auth, _super);
        function Auth(authUrl, callbackUrl, kid, key, secret, scope, scopeSeparator, _nonceSize) {
            if (scopeSeparator === void 0) { scopeSeparator = ' '; }
            if (_nonceSize === void 0) { _nonceSize = 32; }
            var _this = _super.call(this) || this;
            _this.authUrl = authUrl;
            _this.callbackUrl = callbackUrl;
            _this.kid = kid;
            _this.key = key;
            _this.secret = secret;
            _this.scope = scope;
            _this.scopeSeparator = scopeSeparator;
            _this._nonceSize = _nonceSize;
            _this.debug = false;
            _this._protocol = 'BasicAuth';
            _this._version = '';
            _this._headerPrefix = 'Basic';
            _this.validity = (5 * 60);
            _this._sessionData = { date: (new Date()), pub: '' };
            _this._options = {
                followRedirects: true,
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    Connection: 'close',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'User-Agent': 'redaktor.auth'
                },
                query: {},
                cacheBust: true
                /*
                data: null,
                responseType: // either set manual OR 'json' if ends in json, else 'text'
                */
            };
            _this.isObject(authUrl) && util_1.mixin(_this, authUrl);
            _this.initAuth();
            /* e. g. IndieAuth has one constant kid per PW but others : */
            if (!_this.kid) {
                _this.kid = _this._getUUID((_this['authUrl'] || '') + "#" + Date.now());
            }
            return _this;
        }
        /* public, overwritable : */
        Auth.prototype.initAuth = function () { };
        /* i18n */
        Auth.prototype.i18nOptions = function (o) {
            var _this = this;
            if (o === void 0) { o = { req: {}, nls: common_1.default }; }
            return i18n_1.getCachedI18n(o.req, o.nls).then(function (mO) {
                return _this.options(util_1.mixin(o, mO));
            });
        };
        /* Validation and Error Handling */
        Auth.prototype.success = function (requestRes) {
            return requestRes.data || {};
        };
        Auth.prototype.resJSON = function (data, res, returnFn) {
            if (!!res) {
                res.status(200).json(data);
            }
            return !!(returnFn) ? returnFn(data) : data;
        };
        Auth.prototype.errJSON = function (errStr, res, status) {
            if (status === void 0) { status = 400; }
            this.resJSON(this.error('verifyInsecure', 400), res);
            return false;
        };
        /* default error handling */
        Auth.prototype._reqError = function (e, id) {
            if (!(id)) {
                id = !!(e.meta.id) ? e.meta.id : 'me';
            }
            if (!(e.statusMessage)) {
                e.statusMessage = this.msg() + ': ' + id;
            }
            this.debugLog({ error: e });
            return e;
        };
        Auth.prototype.error = function (id, statusCode, isPromise) {
            var _this = this;
            if (statusCode === void 0) { statusCode = 412; }
            if (isPromise === void 0) { isPromise = false; }
            if (id === 'me') {
                statusCode = -1;
            }
            var msg = this.msg(id);
            var e = {
                meta: { id: id }, statusCode: statusCode, statusMessage: msg,
                error: { code: statusCode, message: msg, id: id }
            };
            if (!!isPromise) {
                return function (eRes) {
                    e.error = eRes;
                    _this.debugLog({ warning: statusCode || '!' });
                    _this.debugLog([{ error: msg }, { list: e }]);
                    return e;
                };
            }
            this.debugLog({ error: msg });
            return e;
        };
        Auth.prototype.authError = function (id, statusCode) {
            if (id === void 0) { id = 'eRequest'; }
            if (statusCode === void 0) { statusCode = 412; }
            return this.error(id, statusCode, true);
        };
        /* token expiration */
        Auth.prototype.expires = function (validitySec) {
            return Math.floor(Date.now() + (((!!validitySec && validitySec) || this.validity) * 1000));
        };
        /* these functions can easily be overwritten by subclasses to be more specific */
        Auth.prototype.sessionData = function (req, kwArgs) {
            if (req === void 0) { req = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            var state = (!!req.requestOptions && req.requestOptions.state) ||
                this._getNonce(this._nonceSize);
            return util_1.mixin({}, this._sessionData, { state: state, client_state: state }, kwArgs);
        };
        Auth.prototype.sessionID = function () {
            return uuid_1.default(this.accessUrl || this.authUrl || (this.protocolStr + uuid_1.default(this.callbackUrl || ' ')));
        };
        Auth.prototype.meID = function (req) {
            if (req === void 0) { req = {}; }
            return [((!!req && req.me) || (!!req && !!req.query && req.query.me) ||
                    (!!req && !!req.body && req.body.me) || '/'),
                '#',
                (req.headers['x-forwarded-for'].replace(/ /g, '') || req.connection.remoteAddress)].join('');
        };
        Auth.prototype.meIP = function (meID) {
            var meIDarr = (typeof meID !== 'string' ? [] : meID.split('#'));
            return ((meIDarr.length === 2) && meIDarr[1]);
        };
        /* <--- */
        Auth.prototype.hasSession = function (req) {
            return (!!req.session && !!req.session.redaktor &&
                !!(req.session.redaktor[this.sessionID()]));
        };
        Auth.prototype.setSession = function (req, content) {
            var sId = this.sessionID();
            if (!req.session) {
                console.log([this._protocol, this._type, 'needs express-session!'].join(' '));
                this.debugLog({ error: 'See https://www.npmjs.com/package/express-session !' });
                return false;
            }
            if (!req.session.redaktor) {
                req.session.redaktor = {};
            }
            if (!req.session.redaktor[sId]) {
                req.session.redaktor[sId] = {};
            }
            req.session.redaktor[sId] = content;
            return req.session.redaktor[sId];
        };
        Auth.prototype.getSession = function (req) {
            var sId = this.sessionID();
            if (!req.session.redaktor || !req.session.redaktor[sId]) {
                return void 0;
            }
            return req.session.redaktor[sId];
        };
        Auth.prototype.session = function (req, content) {
            var s = this.getSession(req);
            if (!s) {
                s = this.setSession(req, (content || this.sessionData(req)));
            }
            return (this.isObject(content)) ? util_1.deepMixin(s, content) : s;
        };
        Auth.prototype.setToken = function (req, content, pw) {
            if (content === void 0) { content = {}; }
            if (!pw) {
                pw = this.sessionOrCookie(req).tokenSecret;
            }
            var payload = util_1.mixin({
                iss: this.protocolStr,
                exp: this.expires(),
                jti: this._getUUID()
            }, content);
            return webtoken_1.default.encode(payload, pw || '');
        };
        Auth.prototype.getTokenStr = function (req, key) {
            if (key === void 0) { key = 'state'; }
            return (!!(req.query) && req.query[key])
                || (!!(req.body) && req.body[key])
                || (!!(req.data) && req.data[key]);
        };
        Auth.prototype.getToken = function (req, pw, key) {
            if (key === void 0) { key = 'state'; }
            var s = this.sessionOrCookie(req);
            if (!pw) {
                pw = s.tokenSecret;
            }
            if (!pw || !s.state) {
                return void 0;
            }
            return webtoken_1.default.decode(this.getTokenStr(req, key), pw);
        };
        Auth.prototype.cbUrl = function (o, ks) {
            if (o === void 0) { o = {}; }
            if (ks === void 0) { ks = ['redirect_uri', 'callbackUrl']; }
            return (o.query && o.query[ks[0]]) || o[ks[1]] || this[ks[1]] || '';
        };
        Auth.prototype.getCookie = function () {
            var sId = this.sessionID();
            var cRegex = new RegExp('(?:(?:^|.*;\\s*)' + sId + '\\s*\\=\\s*([^;]*).*$)|^.*$');
            return JSON.parse(document.cookie.replace(cRegex, '$1'));
        };
        Auth.prototype.setCookie = function (content) {
            if (content === void 0) { content = {}; }
            var sId = this.sessionID();
            document.cookie = [sId, JSON.stringify(content)].join('=');
            return content;
        };
        Auth.prototype.isStateful = function (req) {
            if (req === void 0) { req = {}; }
            /* TODO implement stateless server check HERE for: !req.session */
            return !has_1.default('host-browser');
        };
        Auth.prototype.sessionOrCookie = function (req, content) {
            if (req === void 0) { req = {}; }
            /* TODO implement stateless server get/set HERE for: !req.session */
            if (this.isStateful(req)) {
                return (!!req.session && this.session(req, content));
            }
            var c = this.getCookie();
            if (!c) {
                return this.setCookie(content || this.sessionData(req));
            }
            else {
                return (this.isObject(content)) ? this.setCookie(util_1.mixin(c, content)) : c;
            }
        };
        Auth.prototype.oneTimePass = function (o, lengthOrPointer) {
            if (o === void 0) { o = {}; }
            if (typeof lengthOrPointer === 'string') {
                return this.verifyOneTimePass(o, lengthOrPointer);
            }
            if (typeof o.options.code !== 'string') {
                var l = (typeof lengthOrPointer === 'number' && lengthOrPointer > 1 && lengthOrPointer);
                o.options.code = this._getNonce(l || 12);
            }
            this.sessionOrCookie(o.req, { oneTimeSecret: uuid_1.default(o.options.code + this.kid) });
            return o;
        };
        Auth.prototype.verifyOneTimePass = function (o, pointer, code) {
            if (o === void 0) { o = {}; }
            var pass = (!code && typeof pointer === 'string') ?
                Pointer_1.default(o, pointer) :
                (code || o.req.code || o.req.body.code);
            var validation = {
                valid: (this.sessionOrCookie(o.req).oneTimeSecret === uuid_1.default(pass + this.kid))
            };
            this.sessionOrCookie(o.req, { oneTimeSecret: '' });
            if (validation.valid !== true) {
                return Promise.reject(validation);
            }
            return util_1.mixin(o, { data: { code: uuid_1.default() } });
        };
        /* auth STATE
         * see https://www.ietf.org/id/draft-bradley-oauth-jwt-encoded-state-06.pdf
         */
        Auth.prototype.rfpToken = function (o) {
            if (o === void 0) { o = {}; }
            //o.req, mixin(o.options||{}, o.req.body||{})
            var meId = this.meID(o.req);
            var rfp = JSON.stringify({ me: meId, id: this._getNonce(32) });
            var tokenSecret = this._getNonce(64);
            this.sessionOrCookie(o.req, {
                rfp: (!this.isStateful(o.req) ? uuid_1.default(rfp) : rfp),
                tokenSecret: tokenSecret
            });
            return {
                kid: this.kid,
                exp: this.expires(),
                rfp: rfp,
                as: this.cbUrl(o.options)
            };
        };
        Auth.prototype.rfpTokenInvalidate = function (req, token) {
            if (req === void 0) { req = {}; }
            if (token === void 0) { token = {}; }
            this.sessionOrCookie(req, { rfp: false, accessed: false, tokenSecret: false });
            if (!!token.rfp) {
                delete token.rfp;
            }
            return token;
        };
        Auth.prototype.stateHashObj = function (o, tokenLength, hashObj) {
            if (tokenLength === void 0) { tokenLength = 256; }
            if (hashObj === void 0) { hashObj = {}; }
            var ks = { c_hash: 'code', at_hash: 'access_token', ot_hash: 'oauth_token' };
            var keys = [];
            var k;
            for (k in ks) {
                if (!!o.data[ks[k]]) {
                    keys = [k, ks[k]];
                    break;
                }
            }
            if (!keys) {
                return void 0;
            }
            var tokenStr = this.getTokenStr(o.req);
            var hashLength = (!tokenStr) ? tokenLength : webtoken_1.default.algLength(tokenStr);
            var hash = crypto_1.default.hash(o.data[keys[1]], ('sha' + hashLength), 'base64'); // TODO had no out param before
            hashObj[keys[0]] = this._base64UrlEncode(hash.slice(0, (hash.length / 2)));
            return hashObj;
        };
        Auth.prototype.stateError = function (req, messageId, statusCode) {
            if (messageId === void 0) { messageId = 'unknown'; }
            if (statusCode === void 0) { statusCode = 403; }
            this.rfpTokenInvalidate(req);
            return this.error(messageId, statusCode);
        };
        Auth.prototype.state = function (o, cbPointer, cbUrl) {
            var _this = this;
            if (o === void 0) { o = {}; }
            if (cbUrl === void 0) { cbUrl = this.callbackUrl; }
            return new Promise(function (resolve, reject) {
                var kwArgs = util_1.mixin((o.options || {}), (o.req.body || {}));
                var s = _this.sessionOrCookie(o.req);
                if (!s) {
                    return reject(_this.error('eSession', 500));
                }
                var token;
                var codeResult = (!!(kwArgs.data) && kwArgs.data.code) || (!!(kwArgs.query) && kwArgs.query.code);
                if (!(o.finish) && !(kwArgs.oauth_token) && !(codeResult)) {
                    var scope = (kwArgs.scope || _this.scope);
                    if ((typeof scope === 'string' || Array.isArray(scope)) && scope.length) {
                        kwArgs.query.scope = Array.isArray(scope) ? scope.join(_this.scopeSeparator) : scope;
                    }
                    ;
                    token = _this.rfpToken(o);
                    _this.debugLog({ neutral: 'initial state, generated rfp token' });
                }
                else if (!s.tokenSecret) {
                    _this.rfpTokenInvalidate(o.req);
                    return reject(_this.error('eSessionSec', 500));
                }
                else {
                    token = _this.getToken(o.req);
                    if (!(token.iss) || token.iss !== _this.protocolStr) {
                        /* TODO FIXME 'ERROR : unsafe, issuer error' */
                        console.log('ERROR state 1');
                        return reject(_this.stateError(o.req, ''));
                    }
                    var checkRFP = (!_this.isStateful(o.req)) ? uuid_1.default(token.rfp) : token.rfp;
                    if (!s.rfp || checkRFP !== s.rfp || token.as !== _this.cbUrl(kwArgs)) {
                        /* TODO FIXME 'ERROR : unsafe, rfp error' */
                        console.log('ERROR state 2');
                        return reject(_this.stateError(o.req, ''));
                    }
                    var tokenMe = JSON.parse(token.rfp).me;
                    var subMe = _this.meID(o.req);
                    if (_this.meIP(tokenMe) !== _this.meIP(subMe)) {
                        /* TODO FIXME 'ERROR : unsafe me, rfp error' */
                        console.log('ERROR state 3', _this.meIP(tokenMe), _this.meIP(subMe));
                        return reject(_this.stateError(o.req, ''));
                    }
                    if (!(s.accessed) && !(o.finish)) {
                        _this.debugLog({ success: ['state token is valid,',
                                Math.floor((token.exp - Date.now()) / 1000), 'seconds were left ...'].join(' ') });
                        _this.sessionOrCookie(o.req, { accessed: Date.now(), exp: _this.expires(30) });
                    }
                    else {
                        _this.debugLog({ success: ['final state token is valid,', subMe, ':',
                                Math.floor((token.exp - Date.now()) / 1000), 'seconds were left ...'].join(' ') });
                        var hashObj = _this.stateHashObj(o);
                        if (!hashObj) {
                            /* TODO FIXME 'ERROR : missing param error' */
                            console.log('ERROR state 4');
                            return reject(_this.stateError(o.req, '', 412));
                        }
                        util_1.mixin(token, { exp: _this.expires(), sub: subMe }, hashObj);
                        token = _this.rfpTokenInvalidate(o.req, token);
                        token.state = s.state;
                        console.log('FINAL TOKEN', token);
                        console.log('FINAL RES', o.data);
                        console.log('FINAL S', s);
                        return resolve(token);
                    }
                }
                var stateToken = _this.setToken(o.req, token);
                var stateOptions = util_1.mixin({ exp: token.exp }, kwArgs);
                if (cbPointer) {
                    if (cbPointer.charAt(0) !== '/') {
                        cbPointer = '/' + cbPointer;
                    }
                    var u = url_1.default.withParameters(cbUrl, { state: stateToken });
                    Pointer_1.default(stateOptions, cbPointer, u);
                }
                else {
                    Pointer_1.default(stateOptions, '/query/state', stateToken);
                }
                o.options = stateOptions;
                resolve(o);
            });
        };
        Auth.prototype.hasMe = function (req, meArr) {
            var s = this.session(req);
            if (!(s) || !(s.urls.me) || !(s.urls.me.length)) {
                return false;
            }
            if (typeof meArr === 'string') {
                meArr = [meArr];
            }
            var urls = Array.isArray(meArr) ? meArr : meArr.data.rels.me;
            var i;
            for (i = 0; i < s.urls.me.length; i++) {
                if (url_1.default.hasIdentical(urls, s.urls.me[i])) {
                    return true;
                }
            }
            return false;
        };
        Auth.prototype.normalizeMe = function (u) { return this._normalizeUrl(u, true, 'http'); };
        /**
         * Basic Auth the user (many other Auth modules overwrite it)
        **/
        Auth.prototype.auth = function (req, res, kwArgs) {
            var _this = this;
            if (kwArgs === void 0) { kwArgs = {}; }
            /* TODO FIXME if (this.realm) {} */
            var options = this.options(kwArgs);
            return this.request(options)
                .then(function (o) { return _this.success(o); }, this.authError());
        };
        return Auth;
    }(Request_1.default));
    exports.default = Auth;
});
//# sourceMappingURL=index.js.map