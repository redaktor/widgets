(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var X = /** @class */ (function (_super) {
        tslib_1.__extends(X, _super);
        function X() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        X.prototype.render = function () {
            var _a = this.properties.X, X = _a === void 0 ? '' : _a;
            return d_1.v('', []);
        };
        return X;
    }(WidgetBase_1.WidgetBase));
    exports.default = X;
});
//# sourceMappingURL=_blank.js.map