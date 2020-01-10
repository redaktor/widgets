(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/styles/base.m.css", "../themes/redaktor-default/label.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var baseCss = require("../common/styles/base.m.css");
    var css = require("../themes/redaktor-default/label.m.css");
    var LabelBase = /** @class */ (function (_super) {
        tslib_1.__extends(LabelBase, _super);
        function LabelBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rootElement = 'label';
            return _this;
        }
        LabelBase.prototype.getRootClasses = function () {
            var _a = this.properties, _b = _a.focused, focused = _b === void 0 ? false : _b, muted = _a.muted, required = _a.required, schema = _a.schema, size = _a.size;
            return [
                css.root,
                this.getDisabledClass(css),
                this.getValidClass(css),
                focused && (schema in util_1.MaterialSchema) ? css[schema] : null,
                focused ? css.focused : null,
                required ? css.required : null,
                muted ? css.muted : null
            ].concat(size in util_1.Size ? this.getSizeClasses(css) : []);
        };
        LabelBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, forId = _a.forId, style = _a.style, tabIndex = _a.tabIndex, hidden = _a.hidden;
            return Widget_1.v(this._rootElement, tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: tslib_1.__spread(this.theme(this.getRootClasses()), [
                    hidden ? baseCss.visuallyHidden : null
                ]), for: forId, style: style,
                tabIndex: tabIndex }), this.children);
        };
        LabelBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-label',
                properties: [
                    'theme', 'schema', 'size', 'aria', 'extraClasses', 'focused',
                    'disabled', 'readOnly', 'required', 'valid', 'hidden', 'muted'
                ],
                attributes: [],
                events: []
            })
        ], LabelBase);
        return LabelBase;
    }(Widget_1.RedaktorWidgetBase));
    exports.LabelBase = LabelBase;
    var Label = /** @class */ (function (_super) {
        tslib_1.__extends(Label, _super);
        function Label() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Label;
    }(LabelBase));
    exports.default = Label;
});
//# sourceMappingURL=index.js.map