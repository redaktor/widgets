(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../themes/redaktor-default/app-bar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var css = require("../themes/redaktor-default/app-bar.m.css");
    var AppBarBase = /** @class */ (function (_super) {
        tslib_1.__extends(AppBarBase, _super);
        function AppBarBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppBarBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.position, position = _c === void 0 ? 'fixed' : _c;
            return Widget_1.v('div', {
                classes: tslib_1.__spread([this.theme(css.root)], this.getSchemaClasses(css), this.getSizeClasses(css))
            }, this.children);
        };
        AppBarBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-icon',
                properties: [
                    'theme',
                    'aria',
                    'extraClasses'
                ],
                attributes: ['position']
            })
        ], AppBarBase);
        return AppBarBase;
    }(Widget_1.RedaktorWidgetBase));
    exports.AppBarBase = AppBarBase;
    var AppBar = /** @class */ (function (_super) {
        tslib_1.__extends(AppBar, _super);
        function AppBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AppBar;
    }(AppBarBase));
    exports.default = AppBar;
});
//# sourceMappingURL=index.js.map