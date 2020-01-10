(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../baseInput", "../themes/redaktor-default/text-input.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var baseInput_1 = require("../baseInput");
    var css = require("../themes/redaktor-default/text-input.m.css");
    var TextInput = /** @class */ (function (_super) {
        tslib_1.__extends(TextInput, _super);
        function TextInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextInput = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-text-input',
                attributes: [
                    'widgetId', 'label', 'placeholder', 'leading', 'trailing', 'controls',
                    'type', 'size', 'schema', 'minLength', 'maxLength', 'value', 'name'
                ],
                properties: [
                    'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
                    'autofocus', 'size', 'theme', 'schema', 'extraClasses'
                ],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
                    'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], TextInput);
        return TextInput;
    }(baseInput_1.default));
    exports.default = TextInput;
});
//# sourceMappingURL=index.js.map