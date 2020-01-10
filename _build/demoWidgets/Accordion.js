(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../widgets/accordion-pane", "../widgets/title-pane", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/shim/Set", "./panes/CalendarPane", "./panes/DialogPane", "./panes/ThemePane"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var accordion_pane_1 = require("../widgets/accordion-pane");
    var title_pane_1 = require("../widgets/title-pane");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Set_1 = require("@dojo/framework/shim/Set");
    var CalendarPane_1 = require("./panes/CalendarPane");
    var DialogPane_1 = require("./panes/DialogPane");
    var ThemePane_1 = require("./panes/ThemePane");
    ;
    var Accordion = /** @class */ (function (_super) {
        tslib_1.__extends(Accordion, _super);
        function Accordion() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._openKeys = new Set_1.Set(['dialog-title-pane']);
            return _this;
        }
        Accordion.prototype._requestOpen = function (key) {
            this._openKeys.add(key);
            // do stuff
        };
        Accordion.prototype._requestClose = function (key) {
            this._openKeys.delete(key);
            // do stuff
        };
        Accordion.prototype.render = function () {
            var _a = this.properties, themes = _a.themes, currentTheme = _a.currentTheme, onThemeChange = _a.onThemeChange;
            return d_1.w(accordion_pane_1.default, {
                //material: 'blue',
                exclusive: true,
                onRequestOpen: this._requestOpen,
                onRequestClose: this._requestClose,
                openKeys: Array.from(this._openKeys)
            }, [
                d_1.w(title_pane_1.default, {
                    title: 'Theme',
                    key: 'theme-title-pane'
                }, [d_1.w(ThemePane_1.default, {
                        themes: themes,
                        currentTheme: currentTheme,
                        onThemeChange: onThemeChange
                    })]),
                d_1.w(title_pane_1.default, {
                    title: 'Calendar',
                    key: 'calendar-title-pane'
                }, [d_1.w(CalendarPane_1.default, {})]),
                d_1.w(title_pane_1.default, {
                    title: 'Dialog',
                    key: 'dialog-title-pane'
                }, [d_1.w(DialogPane_1.default, {})])
            ]);
        };
        return Accordion;
    }(WidgetBase_1.WidgetBase));
    exports.default = Accordion;
});
//# sourceMappingURL=Accordion.js.map