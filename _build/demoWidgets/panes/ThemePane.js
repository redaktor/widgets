(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/radio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var radio_1 = require("../../widgets/radio");
    var ThemePane = /** @class */ (function (_super) {
        tslib_1.__extends(ThemePane, _super);
        function ThemePane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ThemePane.prototype._radioChange = function (evt) {
            this.properties.onThemeChange && this.properties.onThemeChange(evt.value);
        };
        ThemePane.prototype.render = function () {
            var _this = this;
            var _a = this.properties, themes = _a.themes, currentTheme = _a.currentTheme;
            return d_1.v('div', [
                d_1.v('h3', ['Change Theme']),
                d_1.v('div', themes.map(function (theme) {
                    var checked = currentTheme === theme;
                    return d_1.w(radio_1.default, {
                        key: theme + "-radio",
                        checked: checked,
                        value: theme,
                        label: theme,
                        name: 'theme-radios',
                        onChange: _this._radioChange
                    });
                }))
            ]);
        };
        return ThemePane;
    }(WidgetBase_1.WidgetBase));
    exports.default = ThemePane;
});
//# sourceMappingURL=ThemePane.js.map