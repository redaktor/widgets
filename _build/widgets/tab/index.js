(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../themes/redaktor-default/tab-controller.m.css", "@dojo/framework/widget-core/registerCustomElement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var css = require("../themes/redaktor-default/tab-controller.m.css");
    var registerCustomElement_1 = require("@dojo/framework/widget-core/registerCustomElement");
    var TabBase = /** @class */ (function (_super) {
        tslib_1.__extends(TabBase, _super);
        function TabBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TabBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, id = _a.id, labelledBy = _a.labelledBy, _c = _a.show, show = _c === void 0 ? false : _c;
            return Widget_1.v('section', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-labelledby': labelledBy, classes: this.theme([css.tab /*, !show ? css.hidden : null*/]), id: id, role: 'tabpanel' }), this.children);
        };
        TabBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-tab',
                childType: registerCustomElement_1.CustomElementChildType.NODE,
                properties: ['theme', 'aria', 'extraClasses', 'closeable', 'disabled', 'label', 'show'],
                attributes: ['key', 'labelledBy', 'id', 'label'],
                events: []
            })
        ], TabBase);
        return TabBase;
    }(Widget_1.ThemedBase));
    exports.TabBase = TabBase;
    var Tab = /** @class */ (function (_super) {
        tslib_1.__extends(Tab, _super);
        function Tab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Tab;
    }(TabBase));
    exports.default = Tab;
});
//# sourceMappingURL=index.js.map