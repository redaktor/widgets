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
    var Error = /** @class */ (function (_super) {
        tslib_1.__extends(Error, _super);
        function Error() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Error.prototype.render = function () {
            var _a = this.properties, _b = _a.me, me = _b === void 0 ? {} : _b, _c = _a.client_id, client_id = _c === void 0 ? {} : _c, _d = _a.statusCode, statusCode = _d === void 0 ? 0 : _d;
            var containerStr = 'div.ui.container.meContainer';
            if (statusCode === 0) {
                return d_1.v(containerStr, [
                    d_1.v('h5.red.text', ['{{error}}, {{noRes}}.']),
                    d_1.v('p.red.text', ['{{statusMessage}}'])
                ]);
            }
            else if (me.statusCode !== 200) {
                return d_1.v(containerStr, [
                    d_1.v('h5.red.text', ['{{noRes}}']),
                    d_1.v('p.red.text', ['{{me.statusCode}} ', '– {{me.statusMessage|safe}}'])
                ]);
            }
            else {
                return d_1.v(containerStr, [
                    d_1.v('h5.red.text', ['{{unknown}}']),
                    d_1.v('p.red.text', ['{{me.statusCode}} ', '– {{me.statusMessage|safe}}'])
                ]);
            }
        };
        return Error;
    }(WidgetBase_1.default));
    exports.default = Error;
});
//# sourceMappingURL=IndieAuthError.js.map