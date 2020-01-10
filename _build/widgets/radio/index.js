(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../baseCheck", "../themes/redaktor-default/radio.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var baseCheck_1 = require("../baseCheck");
    var css = require("../themes/redaktor-default/radio.m.css");
    var RadioBase = /** @class */ (function (_super) {
        tslib_1.__extends(RadioBase, _super);
        function RadioBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._type = 'radio';
            return _this;
        }
        RadioBase.prototype.getInputClasses = function () { return tslib_1.__spread([css.input], this.getSchemaClasses(css)); };
        RadioBase.prototype.getRootClasses = function () {
            return tslib_1.__spread(this._getRootClasses(css), this.getSizeClasses());
        };
        RadioBase.prototype.getModifierClasses = function () { return [css.normal, css.radio]; };
        RadioBase.prototype.renderInputWrapper = function () {
            return [
                this.renderInput(),
                Widget_1.v('div', {
                    classes: tslib_1.__spread(this.getSchemaClasses(css), this.getSizeClasses(), [
                        this.theme(css.inner)
                    ])
                }, [])
            ];
        };
        RadioBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-radio',
                attributes: ['widgetId', 'label', 'value', 'name'],
                properties: [
                    'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
                    'size', 'theme', 'schema', 'extraClasses', 'checked'
                ],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
                    'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], RadioBase);
        return RadioBase;
    }(baseCheck_1.default));
    exports.RadioBase = RadioBase;
    var Radio = /** @class */ (function (_super) {
        tslib_1.__extends(Radio, _super);
        function Radio() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Radio;
    }(RadioBase));
    exports.default = Radio;
});
//# sourceMappingURL=index.js.map