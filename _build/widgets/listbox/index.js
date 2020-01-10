(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Focus", "../common/Widget", "../common/WidgetLabeled", "../common/util", "@dojo/framework/widget-core/diff", "@dojo/framework/widget-core/decorators/diffProperty", "@dojo/framework/widget-core/meta/Focus", "../../framework/uuid", "../themes/redaktor-default/listbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
    var Widget_1 = require("../common/Widget");
    var WidgetLabeled_1 = require("../common/WidgetLabeled");
    var util_1 = require("../common/util");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
    var uuid_1 = require("../../framework/uuid");
    var css = require("../themes/redaktor-default/listbox.m.css");
    var Operation;
    (function (Operation) {
        Operation[Operation["increase"] = 1] = "increase";
        Operation[Operation["decrease"] = -1] = "decrease";
    })(Operation = exports.Operation || (exports.Operation = {}));
    var ListboxBase = /** @class */ (function (_super) {
        tslib_1.__extends(ListboxBase, _super);
        function ListboxBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._boundRenderOption = _this.renderOption.bind(_this);
            _this._idBase = uuid_1.default();
            _this._bottom = false;
            _this._activeIndex = -1;
            return _this;
            /*
            protected animateScroll(scrollValue: number) {
              this.meta(ScrollMeta).scroll('options', scrollValue);
            }
            @diffProperty('activeIndex', auto)
            protected calculateScroll(previousProperties: ListboxProperties, { activeIndex = 0 }: ListboxProperties) {
              const menuDimensions = this.meta(Dimensions).get('options');
              const scrollOffset = menuDimensions.scroll.top;
              const menuHeight = menuDimensions.offset.height;
              const optionOffset = this.meta(Dimensions).get(this._getOptionId(activeIndex)).offset;
          
              if (optionOffset.top - scrollOffset < 0) {
                this.animateScroll(optionOffset.top);
              }
          
              else if ((optionOffset.top + optionOffset.height) > (scrollOffset + menuHeight)) {
                this.animateScroll(optionOffset.top + optionOffset.height - menuHeight);
              }
            }
          
            protected getModifierClasses() {
              const { raised, readOnly, required } = this.properties;
              return [
                this.getDisabledClass(css),
                this.getValidClass(css),
                ...this.getStyleClasses(css),
                raised ? css.raised : null, // TODO getStyleClasses
                readOnly ? css.readonly : null,
                required ? css.required : null
              ];
            }
            */
            /*
            protected getOptionWrapperClasses(ui = css) {
              return [
                this.theme(ui.optionWrapper),
                this.getDisabledClass(ui),
                ...this.getSchemaClasses(ui, true),
                this.getSizeClasses(ui)[0]
              ]
            }
            protected getOptionClasses(active: boolean, disabled: boolean, selected: boolean, ui = css) {
              return [
                ui.option,
                active ? ui.activeOption : null,
                selected ? ui.selectedOption : null
              ];
            }
            */
            /* TODO
              protected renderExpandIcon(): DNode {
                    const { theme, classes } = this.properties;
                    return v('span', { classes: this.theme(css.arrow) }, [
                        w(Icon, { type: 'downIcon', theme, classes })
                    ]);
                }
            */
        }
        ListboxBase.prototype._getOptionDisabled = function (option, index) {
            var getOptionDisabled = this.properties.getOptionDisabled;
            return getOptionDisabled ? getOptionDisabled(option, index) : option.disabled || false;
        };
        ListboxBase.prototype._getOptionId = function (index) {
            if (index === void 0) { index = this._activeIndex; }
            var _a = this.properties, _b = _a.optionData, optionData = _b === void 0 ? [] : _b, getOptionId = _a.getOptionId;
            return getOptionId ? getOptionId(optionData[index], index) :
                typeof index === 'number' ? this._idBase + "-" + index : undefined;
        };
        // KEYBOARD NAVIGATION
        ListboxBase.prototype._moveActiveIndex = function (operation) {
            var _a = this.properties, key = _a.key, onActiveIndexChange = _a.onActiveIndexChange, _b = _a.widgetId, widgetId = _b === void 0 ? this._idBase : _b, _c = _a.optionData, optionData = _c === void 0 ? [] : _c;
            var total = optionData.length;
            var nextIndex = ((this._activeIndex) + operation + total) % total;
            if (this._selected.has(nextIndex)) {
                this._activeIndex = nextIndex;
                this._moveActiveIndex(operation);
            }
            else {
                this._activeIndex = nextIndex;
                //this.meta(Focus).set(`${widgetId}-option-${nextIndex}`);
                onActiveIndexChange ? onActiveIndexChange && onActiveIndexChange(nextIndex, key) :
                    this.invalidate();
            }
        };
        ListboxBase.prototype._onKeyDown = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var _a = this.properties, key = _a.key, _b = _a.optionData, optionData = _b === void 0 ? [] : _b, onActiveIndexChange = _a.onActiveIndexChange, onOptionSelect = _a.onOptionSelect, onKeyDown = _a.onKeyDown;
            if (!optionData.length) {
                this._activeIndex = -1;
                this.invalidate();
                return;
            }
            else if (this._activeIndex < 0) {
                this._activeIndex = 0;
                this.invalidate();
                return;
            }
            onKeyDown && onKeyDown(event, key);
            var pressed = util_1.keyName(event);
            var activeItem = optionData[this._activeIndex];
            switch (pressed) {
                case 'ArrowUp':
                    this._moveActiveIndex(Operation.decrease);
                    break;
                case 'ArrowDown':
                    this._moveActiveIndex(Operation.increase);
                    break;
                case 'Home':
                    this._activeIndex = 0;
                    //this.meta(Focus).set(`${widgetId}-option-0`);
                    onActiveIndexChange ? onActiveIndexChange && onActiveIndexChange(0, key) :
                        this.invalidate();
                    break;
                case 'End':
                    this._activeIndex = optionData.length - 1;
                    //this.meta(Focus).set(`${widgetId}-option-${this._activeIndex}`);
                    onActiveIndexChange ? onActiveIndexChange(this._activeIndex, key) :
                        this.invalidate();
                    break;
                case 'Enter':
                case ' ':
                    if (!this._getOptionDisabled(activeItem, this._activeIndex)) {
                        this.select();
                        onOptionSelect && onOptionSelect(this._activeIndex, key);
                    }
                    break;
            }
        };
        ListboxBase.prototype._onOptionClick = function (option, index, key) {
            var _a = this.properties, onActiveIndexChange = _a.onActiveIndexChange, onOptionSelect = _a.onOptionSelect, _b = _a.multiple, multiple = _b === void 0 ? false : _b;
            if (!this._getOptionDisabled(option, index)) {
                this.select(index);
                onActiveIndexChange && onActiveIndexChange(index, key);
                onOptionSelect && onOptionSelect(index, key);
            }
            var active = this.meta(Focus_2.Focus).get('root').active;
            if (!active || !multiple) {
                this.meta(Focus_2.Focus).set('root');
            }
            if (active && !multiple) {
                ("activeElement" in document) && document.activeElement.blur();
            }
        };
        ListboxBase.prototype._getOptionLabel = function (option, index) {
            var getOptionLabel = this.properties.getOptionLabel;
            return getOptionLabel ? getOptionLabel(option, index) : (typeof option !== 'object' ?
                "" + option : (typeof option.label === 'string' ? option.label : (typeof option.value === 'string' ? option.value : '')));
        };
        ListboxBase.prototype.select = function (index) {
            if (index === void 0) { index = this._activeIndex; }
            var _a = this.properties.multiple, multiple = _a === void 0 ? false : _a;
            if (multiple) {
                this._selected[this._selected.has(index) ? 'delete' : 'add'](index);
            }
            else {
                this._selected.clear();
                this._selected.add(index);
            }
            this._activeIndex = -1;
            this.invalidate();
        };
        ListboxBase.prototype.renderOption = function (a, option, index) {
            var _this = this;
            var _a = this.properties, _b = _a.autoOpen, autoOpen = _b === void 0 ? true : _b, _c = _a.widgetId, widgetId = _c === void 0 ? this._idBase : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.required, required = _e === void 0 ? false : _e, getOptionSelected = _a.getOptionSelected, theme = _a.theme;
            var disabled = this._getOptionDisabled(option, index);
            var checked = getOptionSelected ? getOptionSelected(option, index) :
                this._selected.has(index);
            var selected = index === this._activeIndex;
            var firstChecked = Math.min.apply(Math, tslib_1.__spread(this._selected)) === index;
            var id = this._getOptionId(index);
            var label = this._getOptionLabel(option, index);
            a.push(Widget_1.v('input', {
                id: id,
                key: widgetId + "-optioncontrol-" + index,
                // TODO better naming & multple different names :
                name: widgetId + "-optioncontrol" + (multiple ? index : ''),
                type: multiple ? 'checkbox' : 'radio',
                'aria-hidden': true,
                classes: [checked ? this.theme(css.selected) : null],
                onchange: function (event) {
                    event.stopPropagation();
                    _this._onOptionClick(option, index);
                },
                value: "" + index,
                checked: checked
            }));
            a.push(Widget_1.v('label', {
                for: id,
                key: widgetId + "-option-" + index,
                role: 'option',
                classes: [
                    this.theme(css.option),
                    firstChecked ? this.theme(css.first) : null,
                    disabled ? this.theme(css.disabled) : null,
                    selected ? css.selected : null
                ],
                onclick: function (event) {
                    if (_this._selected.has(index)) {
                        // TODO
                        _this._onOptionClick(option, index);
                    }
                }
            }, [label]));
            return a;
        };
        ListboxBase.prototype.renderOptions = function () {
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._idBase : _b, _c = _a.optionData, optionData = _c === void 0 ? [] : _c, _d = _a.autoOrder, autoOrder = _d === void 0 ? true : _d;
            var options = optionData.reduce(this._boundRenderOption, []);
            ;
            return options.concat((!autoOrder ? [] : [
                Widget_1.v('div', {
                    key: widgetId + "-optionborder",
                    classes: this.theme(css.border), innerHTML: '&nbsp;',
                    style: this.borderStyle()
                })
            ]));
        };
        ListboxBase.prototype.renderCustomSelect = function () {
            var _a = this.properties, focus = _a.focus, visualFocus = _a.visualFocus, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.widgetId, widgetId = _c === void 0 ? this._idBase : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.multiple, multiple = _e === void 0 ? false : _e, _f = _a.optionData, optionData = _f === void 0 ? [] : _f, label = _a.label, _g = _a.tabIndex, tabIndex = _g === void 0 ? 0 : _g;
            /*
            if (this._focusedIndex === undefined) {
                    options.map(getOptionSelected).forEach((isSelected, index) => {
                        if (isSelected) {
                            this._focusedIndex = index;
                        }
                    });
                }
            */
            return Widget_1.v('div', tslib_1.__assign({ widgetId: widgetId, key: 'options', role: 'listbox' }, util_1.formatAriaProperties(aria), { 'aria-activedescendant': this._getOptionId(), 'aria-multiselectable': multiple ? 'true' : null, classes: tslib_1.__spread(this.theme([
                    css.options
                    /*visualFocus ? css.open : null,*/ /* TODO */
                ]), this.getSchemaClasses(css)) }), this.renderOptions());
            /* TODO ??? */
            /*
            'aria-invalid': invalid ? 'true' : null,
            'aria-readonly': readOnly ? 'true' : null,
            tabIndex: _open ? 0 : -1,
        
            getOptionDisabled,
            getOptionId,
            getOptionLabel,
            getOptionSelected,
            onfocusout: this._onListboxBlur
            onActiveIndexChange: (index: number) => {
                this._focusedIndex = index;
                this.invalidate();
              },
              onOptionSelect: (option: any) => {
                onChange && onChange(option, key);
                this._closeSelect();
                this.focus();
              },
              onKeyDown: (event: KeyboardEvent) => {
                const index = this._getSelectedIndexOnInput(event);
                if (index !== undefined) {
                  this._focusedIndex = index;
                  this.invalidate();
                }
              }
            */
        };
        ListboxBase.prototype.renderNativeSelect = function () {
            return Widget_1.v('p', ['TODO']); /* TODO FIXME */
        };
        ListboxBase.prototype._getRootClasses = function (ui) {
            if (ui === void 0) { ui = css; }
            var _a = this.properties, _b = _a.responsive, responsive = _b === void 0 ? false : _b, _c = _a.raised, raised = _c === void 0 ? false : _c, _d = _a.readOnly, readOnly = _d === void 0 ? false : _d, _e = _a.required, required = _e === void 0 ? false : _e, _f = _a.autoOrder, autoOrder = _f === void 0 ? true : _f, _g = _a.autoOpen, autoOpen = _g === void 0 ? true : _g, _h = _a.closed, closed = _h === void 0 ? false : _h, _j = _a.muted, muted = _j === void 0 ? false : _j, _k = _a.multiple, multiple = _k === void 0 ? false : _k, _l = _a.scroll, scroll = _l === void 0 ? true : _l, _m = _a.animated, animated = _m === void 0 ? true : _m, _o = _a._opening, _opening = _o === void 0 ? false : _o, helperText = _a.helperText;
            var focus = this.meta(Focus_2.Focus).get('root');
            return tslib_1.__spread([
                ui.root,
                this.getDisabledClass(ui),
                this.getValidClass(ui)
            ], this.getStyleClasses(ui), [
                focus.containsFocus ? ui.focused : null,
                responsive === true ? ui.responsive : null,
                raised === true ? css.raised : null,
                readOnly === true ? css.readonly : null,
                required === true ? ui.required : null,
                animated === true ? css.animated : null,
                muted === true ? css.muted : null,
                !!scroll ? css.scroll : css.noscroll,
                !!helperText ? css.hasHelperText : css.noHelperText,
                autoOrder === true ? css.autoOrder : css.fixedOrder,
                autoOpen === true ? css.expandable : css.expanded,
                closed === true ? css.closed : css.open,
                multiple === true ? css.multi : css.single,
                autoOpen === false && _opening === true ? css.opening : null
            ]);
        };
        ListboxBase.prototype.getRootClasses = function () { return this._getRootClasses(); };
        ListboxBase.prototype.render = function () {
            var _this = this;
            /* // TODO:
            autoOrder Default
            ComboBox MUST set label on Input but helperText on Listbox !!!
            */
            var _a = this.properties, _b = _a.autoOpen, autoOpen = _b === void 0 ? true : _b, _c = _a.optionData, optionData = _c === void 0 ? [] : _c, _d = _a.scroll, scroll = _d === void 0 ? true : _d, _e = _a.tabIndex, tabIndex = _e === void 0 ? 0 : _e, _f = _a.multiple, multiple = _f === void 0 ? false : _f, _g = _a.useNativeElement, useNativeElement = _g === void 0 ? false : _g, _h = _a.activeIndex, activeIndex = _h === void 0 ? -1 : _h, _j = _a.bottom, bottom = _j === void 0 ? false : _j, onFocus = _a.onFocus, onBlur = _a.onBlur;
            var scrollMin = typeof scroll === 'boolean' ? (scroll ? 7 : 0) :
                (typeof scroll === 'number' ? Math.max(scroll, 3) : 7);
            var indices = Array.isArray(activeIndex) ? activeIndex : [activeIndex];
            if (!this._selected) {
                this._selected = new Set(indices.filter(function (i) { return i > -1; }));
            }
            /*
            if (multiple || (!multiple && this._activeIndex < 0)) {
              this._activeIndex = indices[0];
            }
            */
            return Widget_1.v('div', {
                key: 'root',
                style: !!scrollMin && scrollMin !== 7 ? "--lines: " + scrollMin + ";" : null,
                classes: tslib_1.__spread(this.theme(tslib_1.__spread(this.getRootClasses(), [
                    bottom === true || this._bottom === true ? css.bottom : css.top
                ])), this.getSizeClasses(), this.getSchemaClasses(css, true)),
                tabIndex: tabIndex,
                focus: this.shouldFocus,
                onkeydown: this._onKeyDown,
                onfocus: function () {
                    if (autoOpen) {
                        var _offset_1 = !!scroll ? 0 : _this.meta(Widget_1.Dimensions).get('options').offset.height + 16;
                        setTimeout(function () {
                            var _a = _this.meta(Widget_1.Dimensions).get('root'), position = _a.position, rootOffset = _a.offset;
                            var offset = _this.meta(Widget_1.Dimensions).get('options').offset;
                            var isBottom = (position.top + offset.height) > window.innerHeight;
                            var scrollHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
                            if (isBottom && scrollHeight > scrollY + (position.top + offset.height)) {
                                //console.log(scrollHeight, scrollY + (position.top + offset.height), offset.height);
                                isBottom = false;
                                window.scrollBy({
                                    top: Math.round(offset.height - (window.innerHeight - position.top) + _offset_1),
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }
                            if (_this._bottom !== isBottom) {
                                _this._bottom = isBottom;
                                _this.invalidate();
                            }
                        });
                    }
                    onFocus && onFocus(_this.properties.key || '');
                    // TODO this.onFocus
                },
                onblur: function () { return onBlur && onBlur(_this.properties.key || ''); }
            }, [
                this.renderLabel(true, false),
                useNativeElement ? this.renderNativeSelect() : this.renderCustomSelect(),
                this.renderHelperText()
            ]);
        };
        ListboxBase.prototype.borderStyle = function () {
            var e_1, _a;
            var _b = this.properties, _c = _b.widgetId, widgetId = _c === void 0 ? this._idBase : _c, _d = _b.optionData, optionData = _d === void 0 ? [] : _d, _e = _b.autoOpen, autoOpen = _e === void 0 ? true : _e, _f = _b.autoOrder, autoOrder = _f === void 0 ? true : _f, _g = _b.required, required = _g === void 0 ? false : _g, _h = _b.multiple, multiple = _h === void 0 ? false : _h, _j = _b.scroll, scroll = _j === void 0 ? true : _j;
            var oId = widgetId + "-option-";
            var topHeight = 0;
            if (required && multiple && !this._selected.size) {
                return "top: var(--ui-border-width-emphasized);";
            }
            else if (scroll || (!multiple && !autoOpen)) {
                var curDim = this.meta(Widget_1.Dimensions).get(widgetId + "-option-" + Math.min.apply(Math, tslib_1.__spread(this._selected)));
                topHeight = curDim.offset.height;
                return "top: " + topHeight + "px;";
            }
            else if (multiple) {
                try {
                    for (var _k = tslib_1.__values(this._selected), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var index = _l.value;
                        var curDim = this.meta(Widget_1.Dimensions).get(widgetId + "-option-" + index);
                        topHeight += curDim.offset.height;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_a = _k.return)) _a.call(_k);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return "top: " + topHeight + "px;";
            }
            return null;
        };
        ListboxBase = tslib_1.__decorate([
            Widget_1.theme(css),
            diffProperty_1.diffProperty('optionData', diff_1.reference),
            Widget_1.customElement({
                tag: 'redaktor-listbox',
                properties: [
                    'activeIndex',
                    'focus',
                    'multiple',
                    'raised',
                    'tabIndex',
                    'visualFocus',
                    'optionData',
                    'getOptionDisabled',
                    'getOptionId',
                    'getOptionLabel',
                    'getOptionSelected'
                ],
                attributes: [
                    'widgetId'
                ],
                events: [
                    'onActiveIndexChange',
                    'onOptionSelect',
                    'onKeyDown',
                    'onFocus',
                    'onBlur'
                ]
            })
        ], ListboxBase);
        return ListboxBase;
    }(Focus_1.FocusMixin(WidgetLabeled_1.LabeledBase)));
    exports.ListboxBase = ListboxBase;
    var Listbox = /** @class */ (function (_super) {
        tslib_1.__extends(Listbox, _super);
        function Listbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Listbox;
    }(ListboxBase));
    exports.default = Listbox;
});
//# sourceMappingURL=index.js.map