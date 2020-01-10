(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "@dojo/framework/widget-core/registerCustomElement", "../baseClick", "../themes/redaktor-default/chip.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var registerCustomElement_1 = require("@dojo/framework/widget-core/registerCustomElement");
    var baseClick_1 = require("../baseClick");
    var css = require("../themes/redaktor-default/chip.m.css");
    var Chip = /** @class */ (function (_super) {
        tslib_1.__extends(Chip, _super);
        function Chip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Chip.prototype.onDeleteIconClick = function (event) {
            // Stop the event from bubbling up to the `Chip`
            event.stopPropagation();
            var onDelete = this.properties.onDelete;
            if (onDelete) {
                onDelete(event);
            }
        };
        ;
        Chip.prototype.onKeyDown = function (event) {
            // Ignore events from children of `Chip`.
            if (event.currentTarget !== event.target) {
                return;
            }
            var _a = this.properties, onClick = _a.onClick, onDelete = _a.onDelete, onKeyDown = _a.onKeyDown;
            var key = util_1.keyName(event);
            if (onClick && (key === ' ' || key === 'Enter')) {
                event.preventDefault();
                onClick(new MouseEvent(''));
            }
            else if (onDelete && key === 'Backspace') {
                event.preventDefault();
                onDelete(event);
            }
            else if (key === 'Escape') {
                event.preventDefault();
                if (this.chipRef) {
                    this.chipRef.blur();
                }
            }
            if (onKeyDown) {
                this._onKeyDown(event);
            }
        };
        Chip = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-chip',
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
        ], Chip);
        return Chip;
    }(baseClick_1.default));
    exports.default = Chip;
});
//# sourceMappingURL=index.js.map