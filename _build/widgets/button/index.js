(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/registerCustomElement", "../baseClick", "../themes/redaktor-default/button.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var registerCustomElement_1 = require("@dojo/framework/widget-core/registerCustomElement");
    var baseClick_1 = require("../baseClick");
    var css = require("../themes/redaktor-default/button.m.css");
    var Button = /** @class */ (function (_super) {
        tslib_1.__extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-button',
                childType: registerCustomElement_1.CustomElementChildType.TEXT,
                attributes: ['id', 'name', 'value'],
                properties: [
                    'disabled', 'size', 'depth', 'schema', 'pressed', 'popup', 'theme', 'aria', 'extraClasses'
                ],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
                    'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], Button);
        return Button;
    }(baseClick_1.default));
    exports.default = Button;
});
//# sourceMappingURL=index.js.map