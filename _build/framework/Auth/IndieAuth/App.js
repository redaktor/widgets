(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/d", "./widgets/indieauth/IndieAuthProgress", "./widgets/indieauth/IndieAuthLogin", "./widgets/indieauth/IndieAuthContainer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var IndieAuthProgress_1 = require("./widgets/indieauth/IndieAuthProgress");
    var IndieAuthLogin_1 = require("./widgets/indieauth/IndieAuthLogin");
    var IndieAuthContainer_1 = require("./widgets/indieauth/IndieAuthContainer");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var providers = this.properties.me.data.best.providers;
            var w_IndieAuth = this.properties.me.statusCode < 0 ? IndieAuthLogin_1.default : IndieAuthContainer_1.default;
            return d_1.v('div', [
                d_1.w(IndieAuthProgress_1.default, { providers: Object.keys(providers).map(function (k) {
                        return { valid: providers[k].valid, url: providers[k].url };
                    }) }),
                d_1.w(w_IndieAuth, this.properties)
            ]);
        };
        return App;
    }(WidgetBase_1.WidgetBase));
    exports.default = App;
});
//# sourceMappingURL=App.js.map