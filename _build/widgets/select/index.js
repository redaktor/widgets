(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/decorators/diffProperty", "@dojo/framework/widget-core/diff", "../../framework/uuid", "../listbox/index", "../themes/redaktor-default/listbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var uuid_1 = require("../../framework/uuid");
    var index_1 = require("../listbox/index");
    var css = require("../themes/redaktor-default/listbox.m.css");
    var Select = /** @class */ (function (_super) {
        tslib_1.__extends(Select, _super);
        function Select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Select.prototype._getOptionValue = function (option) {
            if (typeof option === 'string') {
                return option;
            }
            return typeof option.value === 'string' ? option.value : '';
        };
        /*
          private _getOptionSelected = (option: any, index: number) => {
            const { getOptionValue, value } = this.properties;
            return getOptionValue ? getOptionValue(option, index) === value : option === value;
          }
        
          // native select events
          private _onNativeChange (event: Event) {
            const { key, getOptionValue, options = [], onChange } = this.properties;
            event.stopPropagation();
            const value = (<HTMLInputElement> event.target).value;
            const option = find(options, (option: any, index: number) => getOptionValue ?
              getOptionValue(option, index) === value : false);
            // FIXME EVENT:
            this.readonlyProp('key', key, event);
            this.readonlyProp('option', option, event);
            this.readonlyProp('value', value, event);
            option && onChange && onChange(<Input>event);
          }
        */
        Select.prototype.render = function () {
            var _a = this.properties, _b = _a.activeIndex, activeIndex = _b === void 0 ? -1 : _b, _c = _a.options, options = _c === void 0 ? [] : _c, onOptionSelect = _a.onOptionSelect, onChange = _a.onChange;
            var listProperties = this.properties;
            return Widget_1.w(index_1.default, tslib_1.__assign({}, listProperties, { widgetId: "" + listProperties.widgetId || uuid_1.default(), autoOpen: true, autoOrder: true, optionData: options, onOptionSelect: function (index, key) {
                    onOptionSelect && onOptionSelect(index, key);
                    // onChange && onChange(option, key); // TODO
                } }));
        };
        Select = tslib_1.__decorate([
            Widget_1.theme(css),
            diffProperty_1.diffProperty('options', diff_1.reference),
            Widget_1.customElement({
                tag: 'redaktor-listbox',
                properties: [
                    'activeIndex',
                    'focus',
                    'multiple',
                    'raised',
                    'tabIndex',
                    'visualFocus',
                    'options',
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
                    'onBlur',
                    'onChange'
                ]
            })
        ], Select);
        return Select;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = Select;
});
//# sourceMappingURL=index.js.map