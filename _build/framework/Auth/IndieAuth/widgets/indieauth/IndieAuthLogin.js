(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Login = /** @class */ (function (_super) {
        tslib_1.__extends(Login, _super);
        function Login() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Login.prototype.render = function () {
            var _a = this.properties, _b = _a.client_id, client_id = _b === void 0 ? '/' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? 'yourdomain.com' : _c;
            return d_1.v('div.ui.authLogin', [
                d_1.v('h3.ui.orange.header', ['Enter your Web Address:']),
                d_1.v('form.ui.labeled.action.input', [
                    d_1.v('div.ui.label', [d_1.v('i.orange.text.icon.linkify'), 'http://']),
                    d_1.v('input', { type: 'text', name: 'me', placeholder: placeholder }),
                    d_1.v('input', { type: 'hidden', name: 'client_id', value: client_id }),
                    d_1.v('button.ui.green.button', { type: 'submit' }, ['Sign In'])
                ])
            ]);
        };
        return Login;
    }(WidgetBase_1.default));
    exports.default = Login;
});
//# sourceMappingURL=IndieAuthLogin.js.map