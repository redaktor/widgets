(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../dojo/core/util", "@dojo/framework/i18n/date", "nodemailer", "./nls/common", "./tpl", "../"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var util_1 = require("../../../dojo/core/util");
    var date_1 = require("@dojo/framework/i18n/date");
    var nodemailer = require("nodemailer");
    var common_1 = require("./nls/common");
    var tpl_1 = require("./tpl");
    var __1 = require("../");
    /*
      TODO - FIXME
      - Sign all messages DKIM : https://nodemailer.com/dkim/
      - Allow custom verify (see IndieAuth)
    */
    var MailAuth = /** @class */ (function (_super) {
        tslib_1.__extends(MailAuth, _super);
        function MailAuth(email /* string|MailOptions */, name, host, port, user, pass, callbackUrl, clientSecret, apiKey, mailer, xkcdCache, validity, _nonceSize, renderForm, iss, info, text, html) {
            if (mailer === void 0) { mailer = {}; }
            if (xkcdCache === void 0) { xkcdCache = {}; }
            if (validity === void 0) { validity = (5 * 60); }
            if (_nonceSize === void 0) { _nonceSize = 32; }
            if (renderForm === void 0) { renderForm = false; }
            if (iss === void 0) { iss = 'IndieAuth'; }
            if (info === void 0) { info = ''; }
            if (text === void 0) { text = tpl_1.default.text; }
            if (html === void 0) { html = tpl_1.default.html; }
            var _this = _super.call(this) || this;
            _this.email = email;
            _this.name = name;
            _this.host = host;
            _this.port = port;
            _this.user = user;
            _this.pass = pass;
            _this.callbackUrl = callbackUrl;
            _this.clientSecret = clientSecret;
            _this.apiKey = apiKey;
            _this.mailer = mailer;
            _this.xkcdCache = xkcdCache;
            _this.validity = validity;
            _this._nonceSize = _nonceSize;
            _this.renderForm = renderForm;
            _this.iss = iss;
            _this.info = info;
            _this.text = text;
            _this.html = html;
            _this.debug = false;
            _this._protocol = 'MailAuth';
            _this._version = '1.0';
            _this._type = 'JWT';
            _this.authOptions = {
                responseType: 'query',
                headers: { Sensitivity: 'private', Expires: 0 },
                to: '', from: '', subject: '', text: '', html: ''
            };
            _this.isObject(email) && util_1.mixin(_this, email);
            if (!_this.name) {
                _this.name = _this.email;
            }
            if (!_this.apiKey) {
                _this.mailer = nodemailer.createTransport({
                    host: _this.host, port: _this.port, auth: { user: _this.user, pass: _this.pass }
                    //,logger: true, debug: this.debug
                });
            }
            else {
                /* TODO FIXME mailgun */
            }
            if (!_this.clientSecret) {
                _this.clientSecret = _this._getNonce(_this._nonceSize);
            }
            _this.initDebugLog(['password', 'secret', 'clientSecret'], ['setup', 'svg', 'text', 'html']);
            _this.initMailAuth();
            return _this;
        }
        /* public, overwritable : */
        MailAuth.prototype.initMailAuth = function () { };
        MailAuth.prototype.localOptions = function (o) {
            if (o === void 0) { o = {}; }
            var TO = ((!!o.req.query && o.req.query.authorize) || o.options.to);
            return util_1.deepMixin({}, this.authOptions, {
                headers: { Expires: this.expires() },
                to: (this._decode(TO).replace(/^((?:\s)*mailto[:])/i, '') || void 0),
                from: { name: (this.name || this.email), address: this.email },
                subject: this.iss,
                text: this.text, html: (this.html || this.text)
            }, o.options);
        };
        MailAuth.prototype.mailgunOptions = function (o) {
            if (o === void 0) { o = {}; }
            return {}; /* TODO FIXME */
        };
        MailAuth.prototype.options = function (o) {
            if (o === void 0) { o = {}; }
            if (o.options.to === '') {
                o.options.to = (!!o.req.query && o.req.query.authorize);
            }
            if (!o.options.to) {
                return Promise.reject(this.errLog(o.messages.missingTo));
            }
            o.options = (!this.apiKey) ? this.localOptions(o) : this.mailgunOptions(o);
            if (typeof o.options.iss !== 'string') {
                o.options.iss = this.iss;
            }
            if (typeof o.options.info !== 'string') {
                o.options.info = this.info;
            }
            return o;
        };
        MailAuth.prototype._xkcd = function (o, xkcdData) {
            if (!!xkcdData) {
                this.xkcdCache = xkcdData;
            }
            o.options.xkcd = this.xkcdCache;
            return o;
        };
        MailAuth.prototype.xkcd = function (o) {
            var _this = this;
            if (!o.options || !o.options.xkcd) {
                return this._xkcd(o);
            }
            var c = this.xkcdCache;
            var d = new Date();
            return (d.getUTCMonth() + "_" + d.getUTCDate() === (c.month || '') + "_" + (c.day || '')) ?
                this._xkcd(o) :
                this.get('https://xkcd.com/info.0.json').then(function (xO) {
                    if (typeof xO.data === 'object' && !!(xO.data.img)) {
                        var x_1 = { img: xO.data.img, a: xO.data.alt || '', ext: '.png' };
                        util_1.mixin(x_1, { base: x_1.img.slice(0, 0 - x_1.ext.length), l: x_1.img.lastIndexOf(x_1.ext) });
                        xO.data.srcset = (x_1.l + x_1.ext.length === x_1.img.length) ? (x_1.base + "_2x.png 2x") : '';
                        xO.data.$img = (!xO.data.srcset.length) ? ("<img src=\"" + x_1.img + "\" title=\"" + x_1.a + "\" />") :
                            ("<img src=\"" + x_1.img + "\" srcset=\"" + xO.data.srcset + "\" title=\"" + x_1.a + "\" />");
                        return _this._xkcd(o, xO.data);
                    }
                    return _this._xkcd(o);
                }, function (e) { return _this._xkcd(o); });
        };
        MailAuth.prototype.challenge = function (o) {
            if (o === void 0) { o = {}; }
            var s = this.sessionOrCookie(o.req, { me: o.options.to });
            var token = this.setToken(o.req, { aud: o.options.to, code: o.options.code });
            o.options.code = token;
            return o;
        };
        MailAuth.prototype.verify = function (o) {
            if (o === void 0) { o = {}; }
            var s = this.sessionOrCookie(o.req);
            var token = this.getToken(o.req, null, 'code');
            if (token.aud !== s.me || !token.code) {
                return Promise.reject('Decrypt Problem with token: ' + token);
            }
            o.req.body.code = token.code;
            return o;
        };
        MailAuth.prototype.makeMessage = function (o) {
            var df = date_1.getDateFormatter({ datetime: 'medium' }, o.locale);
            var expO = {
                expRaw: (o.options.exp.toString() || ''),
                exp: !!(o.options.exp) ? df(new Date(o.options.exp)) : ''
            };
            var _html = (!!(o.options.html) && o.options.html) || o.options.text;
            var _data = util_1.mixin({}, o.options, o.messages || {}, expO);
            util_1.mixin(o.options.query, expO);
            util_1.mixin(o.options, {
                subject: this.msg(_data.messageSubject, _data),
                text: this.msg(o.options.text, _data),
                html: this.msg(_html, _data)
            });
            if (!!this.debug) {
                var debugOptions = util_1.mixin({}, o, { req: {}, res: {} });
                debugOptions.text = (o.text) || ''.slice(0, 128) + ' ...';
                debugOptions.html = (o.html) || ''.slice(0, 128) + ' ...';
                this.debugLog([{ neutral: 'Sending mail ...' }, { list: debugOptions }]);
            }
            return o;
        };
        MailAuth.prototype.sendMessage = function (o) {
            if (!this.apiKey) {
                return this.mailer.sendMail(o.options)
                    .then(function (status) { return util_1.mixin(o, { result: status }); });
            }
            /* TODO FIXME mailgun ... */
        };
        MailAuth.prototype.success = function (o, cb) {
            if (cb === void 0) { cb = this.callbackUrl; }
            var _data = util_1.mixin({}, o.messages || {}, o.options.query || {}, { url: cb });
            console.log('b', _data);
            o.result.form = this.msg(tpl_1.default.form, _data);
            o.result.formLabel = this.msg(_data.messageForm, _data);
            if (!!o.res.send && !!this.renderForm) {
                o.res.send(o.result.form);
            }
            else if (!!o.res.status) {
                o.res.status(200).json(o.result);
            }
            return o.result;
        };
        MailAuth.prototype.auth = function (req, res, kwArgs) {
            var _this = this;
            if (req === void 0) { req = {}; }
            if (res === void 0) { res = {}; }
            if (kwArgs === void 0) { kwArgs = {}; }
            /* TODO - should have 'state' in kwArgs */
            if (!!req.body && !!req.body.code) {
                return this.access(req, res);
            }
            if (kwArgs.html === true) {
                delete kwArgs.html;
            }
            return this.i18nOptions({ req: req, res: res, options: kwArgs, nls: common_1.default })
                .then(function (o) { return _this.xkcd(o); })
                .then(function (o) { return _this.state(o); })
                .then(function (o) { return _this.oneTimePass(o); })
                .then(function (o) { return _this.challenge(o); })
                .then(function (o) { return _this.makeMessage(o); })
                .then(function (o) { return _this.sendMessage(o); })
                .then(function (o) { return _this.success(o); });
        };
        MailAuth.prototype.access = function (req, res) {
            var _this = this;
            /* TODO - precheck req.body.state, req.body.code and method === 'POST' */
            return Promise.resolve({ req: req, res: res })
                .then(function (o) { return _this.verify(o); })
                .then(function (o) { return _this.oneTimePass(o, '/req/body/code'); })
                .then(function (o) { return _this.state(util_1.mixin(o, { finish: true })); });
        };
        return MailAuth;
    }(__1.default));
    exports.default = MailAuth;
});
//# sourceMappingURL=index.js.map