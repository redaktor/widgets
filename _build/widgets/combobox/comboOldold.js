(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/decorators/diffProperty", "../common/util", "@dojo/framework/widget-core/diff", "@dojo/framework/widget-core/mixins/I18n", "@dojo/framework/widget-core/meta/Focus", "../../dojo/core/uuid", "../icon/index", "../listbox/index", "../text-input", "../common/util", "../common/nls/common", "../themes/redaktor-default/combobox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var util_1 = require("../common/util");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var uuid_1 = require("../../dojo/core/uuid");
    var index_1 = require("../icon/index");
    var index_2 = require("../listbox/index");
    var text_input_1 = require("../text-input");
    var util_2 = require("../common/util");
    var common_1 = require("../common/nls/common");
    var css = require("../themes/redaktor-default/combobox.m.css");
    // Enum used when traversing items using arrow keys
    var Operation;
    (function (Operation) {
        Operation[Operation["increase"] = 1] = "increase";
        Operation[Operation["decrease"] = -1] = "decrease";
    })(Operation = exports.Operation || (exports.Operation = {}));
    //extends TextInputBase<EnhancedTextInputProperties> {
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.ThemedBase);
    var ComboBoxBase = /** @class */ (function (_super) {
        tslib_1.__extends(ComboBoxBase, _super);
        function ComboBoxBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._activeIndex = 0;
            _this._callInputFocus = false;
            _this._idBase = uuid_1.default();
            _this._menuHasVisualFocus = false;
            _this._value = '';
            _this._defaultValue = '';
            return _this;
        }
        ComboBoxBase.prototype._closeMenu = function () {
            this._open = false;
            this.invalidate();
        };
        ComboBoxBase.prototype._getMenuId = function () {
            return this._idBase + "-menu";
        };
        ComboBoxBase.prototype._getResultLabel = function (result) {
            var getResultLabel = this.properties.getResultLabel;
            return getResultLabel ? getResultLabel(result) : "" + result;
        };
        ComboBoxBase.prototype._getResultSelected = function (result, index) {
            var getResultSelected = this.properties.getResultSelected;
            return getResultSelected ?
                getResultSelected(result, index, this._activeIndex) : index === this._activeIndex;
        };
        ComboBoxBase.prototype._getResultId = function (result, index) {
            return this._idBase + "-result" + index;
        };
        ComboBoxBase.prototype._onTriggerClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly;
            if (!disabled && !readOnly) {
                this._callInputFocus = true;
                this._openMenu();
            }
        };
        ComboBoxBase.prototype._onClearClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, key = _a.key, onChange = _a.onChange;
            this._callInputFocus = true;
            this._value = '';
            this.invalidate();
            onChange && onChange('', key);
        };
        ComboBoxBase.prototype._onInput = function (value) {
            var _a = this.properties, key = _a.key, disabled = _a.disabled, readOnly = _a.readOnly, onChange = _a.onChange;
            this._value = value;
            onChange && onChange(value, key);
            !disabled && !readOnly && this._openMenu();
        };
        ComboBoxBase.prototype._onInputBlur = function (event) {
            var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
            if (this._ignoreBlur) {
                this._ignoreBlur = false;
                return;
            }
            onBlur && onBlur(this._value, key);
            this._closeMenu();
        };
        ComboBoxBase.prototype._onInputFocus = function (value) {
            var _a = this.properties, key = _a.key, disabled = _a.disabled, readOnly = _a.readOnly, onFocus = _a.onFocus, openOnFocus = _a.openOnFocus;
            onFocus && onFocus(value, key);
            !disabled && !readOnly && openOnFocus && this._openMenu();
        };
        ComboBoxBase.prototype._onInputKeyDown = function (event, preventDefault) {
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly, _b = _a.results, results = _b === void 0 ? [] : _b, _c = _a.isResultDisabled, isResultDisabled = _c === void 0 ? function () { return false; } : _c;
            this._menuHasVisualFocus = true;
            var key = util_1.keyName(event);
            switch (key) {
                case 'ArrowUp':
                    preventDefault();
                    this._moveActiveIndex(Operation.decrease);
                    break;
                case 'ArrowDown':
                    preventDefault();
                    if (!this._open && !disabled && !readOnly) {
                        this._openMenu();
                    }
                    else if (this._open) {
                        this._moveActiveIndex(Operation.increase);
                    }
                    break;
                case 'Escape':
                    this._open && this._closeMenu();
                    break;
                case 'Enter':
                case ' ':
                    if (this._open && results.length > 0) {
                        if (isResultDisabled(results[this._activeIndex])) {
                            return;
                        }
                        this._selectIndex(this._activeIndex);
                    }
                    break;
                case 'Home':
                    this._activeIndex = 0;
                    this.invalidate();
                    break;
                case 'End':
                    this._activeIndex = results.length - 1;
                    this.invalidate();
                    break;
            }
        };
        ComboBoxBase.prototype._onMenuChange = function () {
            var _a = this.properties, key = _a.key, onMenuChange = _a.onMenuChange;
            if (!onMenuChange) {
                return;
            }
            this._open && !this._wasOpen && onMenuChange(true, key);
            !this._open && this._wasOpen && onMenuChange(false, key);
        };
        ComboBoxBase.prototype._onResultHover = function () {
            this._menuHasVisualFocus = false;
            this.invalidate();
        };
        ComboBoxBase.prototype._onResultMouseDown = function (event) {
            event.stopPropagation();
            // Maintain underlying input focus on next render
            this._ignoreBlur = true;
        };
        ComboBoxBase.prototype._openMenu = function () {
            var _a = this.properties, key = _a.key, onRequestResults = _a.onRequestResults;
            /*this._activeIndex = 0;*/
            this._open = true;
            onRequestResults && onRequestResults(key);
            this.invalidate();
        };
        ComboBoxBase.prototype._selectIndex = function (index) {
            var _a = this.properties, key = _a.key, onChange = _a.onChange, _b = _a.results, results = _b === void 0 ? [] : _b;
            this._callInputFocus = true;
            this._closeMenu();
            onChange && onChange(this._getResultLabel(results[index]), key);
        };
        ComboBoxBase.prototype._moveActiveIndex = function (operation) {
            var _a = this.properties.results, results = _a === void 0 ? [] : _a;
            if (results.length === 0) {
                this._activeIndex = 0;
                this.invalidate();
                return;
            }
            var total = results.length;
            var nextIndex = (this._activeIndex + operation + total) % total;
            this._activeIndex = nextIndex;
            this.invalidate();
        };
        ComboBoxBase.prototype.getDisabledClass = function () {
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly;
            if (disabled === true) {
                return css.disabled;
            }
            if (readOnly === true) {
                return css.readonly;
            }
            return css.enabled;
        };
        ComboBoxBase.prototype.getRootClasses = function () {
            var _a = this.properties, clearable = _a.clearable, invalid = _a.invalid;
            var focus = this.meta(Focus_1.default).get('root');
            return [
                css.root,
                this.getDisabledClass(),
                this._open ? css.open : null,
                clearable ? css.clearable : null,
                focus.containsFocus ? css.focused : null,
                invalid === true ? css.invalid : null,
                invalid === false ? css.valid : null
            ];
        };
        ComboBoxBase.prototype.getValue = function () {
            var v = this.properties.value;
            if (!this._value) {
                return v ? v : this._defaultValue;
            }
            return this._value ? this._value : this._defaultValue;
        };
        ComboBoxBase.prototype.renderInput = function (messages) {
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._idBase : _b, theme = _a.theme, schema = _a.schema, label = _a.label, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, disabled = _a.disabled, labelHidden = _a.labelHidden, labelAfter = _a.labelAfter, _c = _a.clearable, clearable = _c === void 0 ? false : _c, _d = _a.inputProperties, inputProperties = _d === void 0 ? {} : _d, _e = _a.results, results = _e === void 0 ? [] : _e;
            var focusInput = this._callInputFocus;
            if (this._callInputFocus) {
                this._callInputFocus = false;
            }
            /*return '' FIXME EVENT:
            
            this.readonlyProp('key', key, event);
            this.readonlyProp('option', option, event);
            this.readonlyProp('value', option.value, event);
            */
            return Widget_1.w(text_input_1.default, tslib_1.__assign({}, inputProperties, { key: 'textinput', aria: {
                    activedescendant: this._getResultId(results[this._activeIndex], this._activeIndex),
                    controls: this._getMenuId(),
                    owns: this._getMenuId()
                }, widgetId: widgetId,
                label: label,
                invalid: invalid,
                readOnly: readOnly,
                required: required,
                disabled: disabled,
                labelHidden: labelHidden,
                labelAfter: labelAfter,
                theme: theme,
                schema: schema, value: this.getValue(), shouldFocus: focusInput, 
                //onBlur: this._onInputBlur,
                //onFocus: this._onInputFocus,
                //onInput: this._onInput,
                onKeyDown: this._onInputKeyDown, addonBefore: clearable ? [this.renderClearButton(messages)] : [], addonAfter: [this.renderMenuButton(messages)] }));
        };
        ComboBoxBase.prototype.renderClearButton = function (messages) {
            var _this = this;
            var _a = this.properties, _b = _a.label, label = _b === void 0 ? '' : _b, disabled = _a.disabled, readOnly = _a.readOnly, theme = _a.theme, schema = _a.schema;
            return Widget_1.v('button', {
                key: 'clear',
                'aria-controls': this._getMenuId(),
                classes: this.theme([
                    css.clear,
                    (schema in util_2.MaterialSchema) ? css[schema] : css.parentSchema
                ]),
                disabled: disabled || readOnly,
                type: 'button',
                onclick: function (event) { return _this._onClearClick(event); },
                'aria-label': messages.clear + " " + label
            }, [
                Widget_1.w(index_1.default, { type: 'closeIcon', theme: theme })
            ]);
        };
        ComboBoxBase.prototype.renderMenuButton = function (messages) {
            var _this = this;
            var _a = this.properties, _b = _a.label, label = _b === void 0 ? '' : _b, disabled = _a.disabled, readOnly = _a.readOnly, theme = _a.theme, schema = _a.schema;
            return Widget_1.v('button', {
                key: 'trigger',
                classes: this.theme([
                    css.trigger,
                    (schema in util_2.MaterialSchema) ? css[schema] : css.parentSchema
                ]),
                disabled: disabled || readOnly,
                tabIndex: -1,
                type: 'button',
                onclick: function (event) { return _this._onTriggerClick(event); },
                'aria-label': messages.open + " " + label
            }, [
                Widget_1.w(index_1.default, { type: 'downIcon', theme: theme })
            ]);
        };
        ComboBoxBase.prototype.renderMenu = function (results) {
            var _this = this;
            var _a = this.properties, theme = _a.theme, isResultDisabled = _a.isResultDisabled;
            if (results.length === 0 || !this._open) {
                return null;
            }
            return Widget_1.v('div', {
                key: 'dropdown',
                classes: this.theme(css.dropdown),
                onmouseover: this._onResultHover,
                onmousedown: this._onResultMouseDown
            }, [
                Widget_1.w(index_2.default, {
                    raised: true,
                    key: 'listbox',
                    activeIndex: this._activeIndex,
                    widgetId: this._getMenuId(),
                    visualFocus: this._menuHasVisualFocus,
                    optionData: results,
                    tabIndex: -1,
                    getOptionDisabled: isResultDisabled,
                    getOptionId: this._getResultId,
                    getOptionLabel: this._getResultLabel,
                    getOptionSelected: this._getResultSelected,
                    onActiveIndexChange: function (index) {
                        _this._activeIndex = index;
                        _this.invalidate();
                    },
                    onOptionSelect: function (option, index) {
                        _this._selectIndex(index);
                    },
                    theme: theme
                })
            ]);
        };
        ComboBoxBase.prototype.render = function () {
            var _a = this.properties, _b = _a.clearable, clearable = _b === void 0 ? false : _b, _c = _a.widgetId, widgetId = _c === void 0 ? this._idBase : _c, label = _a.label, invalid = _a.invalid, readOnly = _a.readOnly, required = _a.required, disabled = _a.disabled, labelHidden = _a.labelHidden, labelAfter = _a.labelAfter, theme = _a.theme, _d = _a.results, results = _d === void 0 ? [] : _d;
            var messages = this.localizeBundle(common_1.default).messages;
            var focus = this.meta(Focus_1.default).get('root');
            var menu = this.renderMenu(results);
            this._onMenuChange();
            this._wasOpen = this._open;
            //console.log(results, menu);
            var controls = [
                Widget_1.v('div', { classes: this.theme(css.controls) }, [this.renderInput(messages)]),
                menu
            ];
            return Widget_1.v('div', {
                'aria-expanded': this._open ? 'true' : 'false',
                'aria-haspopup': 'true',
                'aria-readonly': readOnly ? 'true' : null,
                'aria-required': required ? 'true' : null,
                classes: this.theme(this.getRootClasses()),
                key: 'root',
                role: 'combobox'
            }, labelAfter ? controls.reverse() : controls);
        };
        ComboBoxBase = tslib_1.__decorate([
            Widget_1.theme(css),
            diffProperty_1.diffProperty('results', diff_1.reference),
            Widget_1.customElement({
                tag: 'redaktor-combo-box',
                properties: [
                    'theme', 'extraClasses', 'labelAfter', 'labelHidden', 'clearable',
                    'required', 'disabled', 'readOnly', 'invalid', 'isResultDisabled',
                    'openOnFocus', 'inputProperties', 'results', 'resultsRequired'
                ],
                attributes: ['widgetId', 'label', 'value'],
                events: ['onBlur', 'onChange', 'onFocus', 'onMenuChange', 'onRequestResults']
            })
        ], ComboBoxBase);
        return ComboBoxBase;
    }(exports.i18nBase));
    exports.ComboBoxBase = ComboBoxBase;
    var ComboBox = /** @class */ (function (_super) {
        tslib_1.__extends(ComboBox, _super);
        function ComboBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ComboBox;
    }(ComboBoxBase));
    exports.default = ComboBox;
});
//# sourceMappingURL=comboOldold.js.map