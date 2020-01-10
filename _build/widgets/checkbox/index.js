(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../baseCheck", "../themes/redaktor-default/checkbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var baseCheck_1 = require("../baseCheck");
    var css = require("../themes/redaktor-default/checkbox.m.css");
    /**
     * The type of UI to show for this Checkbox
     */
    var Mode;
    (function (Mode) {
        Mode["normal"] = "normal";
        Mode["toggle"] = "toggle";
    })(Mode = exports.Mode || (exports.Mode = {}));
    var Checkbox = /** @class */ (function (_super) {
        tslib_1.__extends(Checkbox, _super);
        function Checkbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Checkbox.prototype.renderToggle = function () {
            return [Widget_1.v('div', { key: 'toggle', classes: this.theme(css.toggleSwitch) })];
        };
        Checkbox.prototype.getRootClasses = function () {
            return tslib_1.__spread(this._getRootClasses(css), this.getSizeClasses());
        };
        Checkbox.prototype.renderContent = function () {
            return this.properties.mode !== Mode.toggle ? this.renderIcon() : this.renderToggle();
        };
        Checkbox.prototype.getModifierClasses = function () {
            return this.properties.mode !== Mode.toggle ? [css.normal] : [css.toggle];
        };
        Checkbox.prototype.getInnerClasses = function () {
            return [this.properties.mode !== Mode.toggle ? css.square : css.rectangle];
        };
        Checkbox = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-checkbox',
                attributes: ['label', 'value', 'mode', 'offLabel'],
                properties: [
                    'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
                    'size', 'theme', 'schema', 'extraClasses', 'checked'
                ],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
                    'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], Checkbox);
        return Checkbox;
    }(baseCheck_1.default));
    exports.default = Checkbox;
});
//# sourceMappingURL=index.js.map