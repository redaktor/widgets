(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../dojo/core/util", "../"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var util_1 = require("../../../dojo/core/util");
    var __1 = require("../");
    var SMSAuth = /** @class */ (function (_super) {
        tslib_1.__extends(SMSAuth, _super);
        function SMSAuth(authUrl, callbackUrl, key, secret, scope, text) {
            if (text === void 0) { text = ''; }
            var _this = _super.call(this) || this;
            _this.authUrl = authUrl;
            _this.callbackUrl = callbackUrl;
            _this.key = key;
            _this.secret = secret;
            _this.scope = scope;
            _this.text = text;
            _this._E = {
                AUTH: 'Missing recipient: No "to" or "req.query.authorize" found',
                PROP: 'Missing property:'
            };
            _this.debug = false;
            _this._protocol = 'SMSAuth';
            _this._version = '1.0';
            _this._type = 'code';
            _this.isObject(authUrl) && util_1.mixin(_this, authUrl);
            _this.initSMSAuth();
            return _this;
        }
        /* public, overwritable : */
        SMSAuth.prototype.initSMSAuth = function () { };
        SMSAuth.prototype.auth = function (req, res, kwArgs) {
            if (kwArgs === void 0) { kwArgs = {}; }
            if (!kwArgs.to && !req.query.authorize) {
                throw new TypeError(this.errLog(this._E.AUTH));
            }
            var options = {}; //TODO FIXME this.getOptions(kwArgs, req);
            if (!!this.debug) {
                var debugOptions = util_1.mixin({}, options, { text: (options.text || '').slice(0, 128) + ' ...' });
                this.debugLog([{ neutral: 'Sending SMS ...' }, { list: debugOptions }]);
            }
        };
        SMSAuth.prototype.access = function (req, res) { return this.verifyToken(req); };
        return SMSAuth;
    }(__1.default));
    exports.default = SMSAuth;
});
//# sourceMappingURL=index.js.map