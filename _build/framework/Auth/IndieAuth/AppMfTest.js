(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../webcomponents/WidgetBase", "../../../dojo/core/uuid", "@dojo/framework/widget-core/d", "../../webcomponents/redaktor/card/Card"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../webcomponents/WidgetBase");
    var uuid_1 = require("../../../dojo/core/uuid");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Card_1 = require("../../webcomponents/redaktor/card/Card"); //'./widgets/microformats/MfCard';
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var _a = this.properties.me, me = _a === void 0 ? {} : _a;
            return d_1.v('div.ui.container', [
                d_1.v('div.ui.cards', [
                    d_1.w(Card_1.default, {
                        locale: 'de',
                        description: 'TEST',
                        card: me.data.best.hCard.properties,
                        type: me.data.best.hCard.type,
                        representative: me.data.best.hCard.representative,
                        key: uuid_1.default()
                    }, me.data.best.hCard.children || [])
                ])
            ]);
        };
        return App;
    }(WidgetBase_1.default));
    exports.default = App;
});
//# sourceMappingURL=AppMfTest.js.map