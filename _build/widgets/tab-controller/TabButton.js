(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/I18n", "@dojo/framework/widget-core/mixins/Themed", "@dojo/framework/widget-core/meta/Focus", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../common/nls/common", "../common/util", "../themes/redaktor-default/tab-controller.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var common_1 = require("../common/nls/common");
    var util_1 = require("../common/util");
    var css = require("../themes/redaktor-default/tab-controller.m.css");
    exports.ThemedBase = I18n_1.I18nMixin(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase));
    var TabButtonBase = /** @class */ (function (_super) {
        tslib_1.__extends(TabButtonBase, _super);
        function TabButtonBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TabButtonBase.prototype._onClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, disabled = _a.disabled, index = _a.index, onClick = _a.onClick;
            !disabled && onClick && onClick(index);
        };
        TabButtonBase.prototype._onCloseClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, index = _a.index, onCloseClick = _a.onCloseClick;
            onCloseClick && onCloseClick(index);
        };
        TabButtonBase.prototype._onKeyDown = function (event) {
            event.stopPropagation();
            var _a = this.properties, closeable = _a.closeable, disabled = _a.disabled, index = _a.index, onCloseClick = _a.onCloseClick, onDownArrowPress = _a.onDownArrowPress, onEndPress = _a.onEndPress, onHomePress = _a.onHomePress, onLeftArrowPress = _a.onLeftArrowPress, onRightArrowPress = _a.onRightArrowPress, onUpArrowPress = _a.onUpArrowPress;
            if (disabled) {
                return;
            }
            // Accessibility
            switch (util_1.keyName(event)) {
                // Escape
                case 'Escape':
                    closeable && onCloseClick && onCloseClick(index);
                    break;
                // Left arrow
                case 'ArrowLeft':
                    onLeftArrowPress && onLeftArrowPress();
                    break;
                // Right arrow
                case 'ArrowRight':
                    onRightArrowPress && onRightArrowPress();
                    break;
                // Up arrow
                case 'ArrowUp':
                    onUpArrowPress && onUpArrowPress();
                    break;
                // Down arrow
                case 'ArrowDown':
                    onDownArrowPress && onDownArrowPress();
                    break;
                // Home
                case 'Home':
                    onHomePress && onHomePress();
                    break;
                // End
                case 'End':
                    onEndPress && onEndPress();
                    break;
            }
        };
        TabButtonBase.prototype.getContent = function (messages) {
            var _a = this.properties, active = _a.active, closeable = _a.closeable;
            return tslib_1.__spread(this.children, [
                closeable ? d_1.v('button', {
                    tabIndex: active ? 0 : -1,
                    classes: this.theme(css.close),
                    type: 'button',
                    onclick: this._onCloseClick
                }, [
                    messages.close
                ]) : null
            ]);
        };
        TabButtonBase.prototype.getModifierClasses = function () {
            var _a = this.properties, active = _a.active, closeable = _a.closeable, disabled = _a.disabled;
            return [
                active ? css.active : null,
                closeable ? css.closeable : null,
                disabled ? css.disabled : css.enabled
            ];
        };
        TabButtonBase.prototype.render = function () {
            var _a = this.properties, active = _a.active, callFocus = _a.callFocus, controls = _a.controls, disabled = _a.disabled, id = _a.id, index = _a.index, onFocusCalled = _a.onFocusCalled;
            var messages = this.localizeBundle(common_1.default).messages;
            if (callFocus) {
                this.meta(Focus_1.default).set('tab-button');
                onFocusCalled && onFocusCalled();
            }
            return d_1.v('label', {
                'aria-controls': controls,
                'aria-disabled': disabled ? 'true' : 'false',
                'aria-selected': active === true ? 'true' : 'false',
                classes: this.theme(tslib_1.__spread([css.tabButton], this.getModifierClasses())),
                id: id,
                for: id.replace('tabbutton', 'tabcontrol'),
                key: 'tab-button',
                onclick: this._onClick,
                onkeydown: this._onKeyDown,
                role: 'tab',
                tabIndex: active === true ? 0 : -1
            }, this.getContent(messages));
        };
        TabButtonBase = tslib_1.__decorate([
            Themed_1.theme(css)
        ], TabButtonBase);
        return TabButtonBase;
    }(exports.ThemedBase));
    exports.TabButtonBase = TabButtonBase;
    var TabButton = /** @class */ (function (_super) {
        tslib_1.__extends(TabButton, _super);
        function TabButton() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TabButton;
    }(TabButtonBase));
    exports.default = TabButton;
});
//# sourceMappingURL=TabButton.js.map