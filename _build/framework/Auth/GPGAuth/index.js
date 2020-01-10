(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../", "@dojo/framework/shim/Promise", "../../../dojo/core/util", "./nls", "./tpl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var __1 = require("../");
    var Promise_1 = require("@dojo/framework/shim/Promise");
    var util_1 = require("../../../dojo/core/util");
    var nls_1 = require("./nls");
    var tpl_1 = require("./tpl");
    var kbpgp = require('kbpgp');
    var GPGAuth = /** @class */ (function (_super) {
        tslib_1.__extends(GPGAuth, _super);
        function GPGAuth(clientSecret, validity, _nonceSize, renderForm, iss) {
            if (validity === void 0) { validity = (5 * 60 * 1000); }
            if (_nonceSize === void 0) { _nonceSize = 32; }
            if (renderForm === void 0) { renderForm = false; }
            if (iss === void 0) { iss = 'IndieAuth'; }
            var _this = _super.call(this) || this;
            _this.clientSecret = clientSecret;
            _this.validity = validity;
            _this._nonceSize = _nonceSize;
            _this.renderForm = renderForm;
            _this.iss = iss;
            _this.debug = false;
            _this._protocol = 'GPGAuth';
            _this._version = '1.0';
            _this._type = 'JWT';
            _this.isObject(clientSecret) && util_1.mixin(_this, clientSecret);
            if (!_this.clientSecret) {
                _this.clientSecret = _this._getNonce(_this._nonceSize);
            }
            _this.initDebugLog(['password', 'secret', 'clientSecret'], ['setup', 'svg']);
            _this.initGPGAuth();
            return _this;
        }
        /* public, overwritable : */
        GPGAuth.prototype.initGPGAuth = function () { };
        GPGAuth.prototype.options = function (o) {
            if (o === void 0) { o = {}; }
            var keyURL = ((!!o.req.query && o.req.query.authorize) || o.options.publicKey);
            if (!keyURL) {
                return Promise_1.default.reject(this.errLog(o.messages.missingKey));
            }
            return o;
        };
        GPGAuth.prototype.challenge = function (o) {
            var _this = this;
            if (o === void 0) { o = {}; }
            var keyURL = ((!!o.req.query && o.req.query.authorize) || o.options.publicKey);
            /* TODO FIXME PUB KEY error */
            return this.get({ url: keyURL, responseType: 'text' }).then(function (res) {
                var s = _this.sessionOrCookie(o.req, { me: keyURL, pub: res.data });
                var token = _this.setToken(o.req, { aud: keyURL, code: o.options.code });
                util_1.mixin(o.options.query, { pub: s.pub, code: token });
                return o;
            });
        };
        GPGAuth.prototype.verify = function (o) {
            var _this = this;
            if (o === void 0) { o = {}; }
            return new Promise_1.default(function (resolve, reject) {
                var s = _this.sessionOrCookie(o.req);
                kbpgp.KeyManager.import_from_armored_pgp({ armored: s.pub }, function (err, myGPG) {
                    if (!!err) { /* TODO FIXME error i18n MESSAGES ... */
                        return reject('Decrypt Problem with session: ' + err);
                    }
                    var ring = new kbpgp.keyring.KeyRing();
                    ring.add_key_manager(myGPG);
                    kbpgp.unbox({ keyfetch: ring, armored: o.req.body.code }, function (err, myArr) {
                        if (!!err) {
                            reject('Decrypt Problem: ' + err);
                        }
                        else {
                            var km, fingerprint;
                            var ds = myArr[0].get_data_signer();
                            if (!!ds && !!ds.get_key_manager) {
                                km = ds.get_key_manager();
                            }
                            if (!!km && !!km.get_pgp_fingerprint) {
                                fingerprint = km.get_pgp_fingerprint().toString('hex');
                            }
                            if (!fingerprint) {
                                return reject('Decrypt Problem with fingerprint');
                            }
                            o.req.body.code = myArr[0].toString();
                            // exchange for one time pass if decrypted token is valid
                            var token = _this.getToken(o.req, null, 'code');
                            if (token.aud !== s.me || !token.code) {
                                return reject('Decrypt Problem with token: ' + token);
                            }
                            o.req.body.code = token.code;
                            o.result = { code: fingerprint };
                            return resolve(o);
                        }
                    });
                });
            });
        };
        GPGAuth.prototype.success = function (o, cb) {
            if (cb === void 0) { cb = this.callbackUrl; }
            var _data = util_1.mixin({}, o.messages || {}, o.options.query || {}, { url: cb });
            util_1.mixin(o, { result: {
                    form: this.msg(tpl_1.default.form, _data),
                    formLabel: this.msg(_data.messageForm, _data)
                } });
            if (!!o.res.send && !!this.renderForm) {
                o.res.send(o.result.form);
            }
            else if (!!o.res.status) {
                o.res.status(200).json(o.result);
            }
            return o.result;
        };
        GPGAuth.prototype.auth = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            return this.i18nOptions({ req: req, res: res, options: kwArgs, nls: nls_1.default })
                .then(function (o) { return _this.state(o); })
                .then(function (o) { return _this.oneTimePass(o); })
                .then(function (o) { return _this.challenge(o); })
                .then(function (o) { return _this.success(o); });
        };
        GPGAuth.prototype.access = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            return Promise_1.default.resolve({ req: req, res: res })
                .then(function (o) { return _this.verify(o); })
                .then(function (o) { return _this.oneTimePass(o, '/req/body/code'); })
                .then(function (o) { return _this.state(util_1.mixin(o, { finish: true })); });
        };
        return GPGAuth;
    }(__1.default));
    exports.default = GPGAuth;
});
//# sourceMappingURL=index.js.map