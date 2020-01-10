(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./one", "../../../dojo/core/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var one_1 = require("./one");
    var util_1 = require("../../../dojo/core/util");
    var OAuthEcho = /** @class */ (function (_super) {
        tslib_1.__extends(OAuthEcho, _super);
        function OAuthEcho(realm, verify_credentials) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var _this = _super.call(this, util_1.mixin({
                consumerKey: realm,
                consumerSecret: verify_credentials
            }, args)) || this;
            _this.realm = realm;
            _this.verify_credentials = verify_credentials;
            _this._type = 'Echo';
            _this._authKey = 'X-Verify-Credentials-Authorization';
            return _this;
        }
        Object.defineProperty(OAuthEcho.prototype, "_headerPrefix", {
            get: function () {
                return ['OAuth realm="', this.realm, '",'].join('');
            },
            enumerable: true,
            configurable: true
        });
        OAuthEcho.prototype._getOAuthParams = function (kwArgs) {
            var oauthParams = this.OAuthParams;
            if (kwArgs.oauth_token) {
                oauthParams['oauth_token'] = kwArgs.oauth_token;
            }
            util_1.mixin(kwArgs, {
                method: 'GET',
                url: this['verify_credentials']
            });
            oauthParams.oauth_signature = this._getSignature(kwArgs, oauthParams);
            return this._sortParams(oauthParams);
        };
        return OAuthEcho;
    }(one_1.default));
    exports.OAuthEcho = OAuthEcho;
    exports.default = OAuthEcho;
});
//# sourceMappingURL=oneEcho.js.map