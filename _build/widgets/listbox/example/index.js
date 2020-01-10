(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../listbox/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../listbox/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._listbox1Index = 0;
            _this._listbox2Index = 0;
            _this._options = [
                { value: 'Maine' },
                { value: 'New Hampshire' },
                { value: 'Vermont' },
                { value: 'Massachusetts' },
                { value: 'Connecticut' },
                { value: 'Rhode Island' },
                { value: 'New York' },
                { value: 'New Jersey' },
                { value: 'Pennsylvania' },
                { value: 'Delaware' },
                { value: 'Maryland' },
                { value: 'Virginia' },
                { value: 'Florida' },
                { value: 'Texas' },
                { value: 'Kentucky' },
                { value: 'Tennessee' },
                { value: 'North Carolina' },
                { value: 'South Carolina' },
                { value: 'Georgia' },
                { value: 'Alabama' },
                { value: 'Mississippi' },
                { value: 'Arkansas' },
                { value: 'Louisiana' },
                { value: 'Missouri' },
                { value: 'Oklahoma', disabled: true },
                { value: 'Ohio' },
                { value: 'Nebraska' },
                { value: 'Michigan' },
                { value: 'Indiana' },
                { value: 'Wisconsin' },
                { value: 'Illinois' },
                { value: 'Minnesota' },
                { value: 'Iowa' },
                { value: 'North Dakota' },
                { value: 'South Dakota' },
                { value: 'Kansas' },
                { value: 'Colorado' },
                { value: 'New Mexico' },
                { value: 'Arizona' },
                { value: 'Nevada' },
                { value: 'California' },
                { value: 'Wyoming' },
                { value: 'Montana' },
                { value: 'Utah' },
                { value: 'Idaho' },
                { value: 'Washington' },
                { value: 'Oregon' },
                { value: 'Alaska' },
                { value: 'Hawaii' },
                { value: 'West Virginia' }
            ];
            _this._moreOptions = [
                {
                    value: 'seattle',
                    label: 'Seattle'
                },
                {
                    value: 'los-angeles',
                    label: 'Los Angeles'
                },
                {
                    value: 'austin',
                    label: 'Austin'
                },
                {
                    value: 'boston',
                    label: 'Boston'
                }
            ];
            return _this;
        }
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.v('label', { for: 'listbox1' }, ['Single-select listbox example']),
                d_1.w(index_1.default, {
                    key: 'listbox1',
                    activeIndex: this._listbox1Index,
                    widgetId: 'listbox1',
                    optionData: this._options,
                    getOptionLabel: function (option) { return option.value; },
                    getOptionDisabled: function (option) { return !!option.disabled; },
                    getOptionSelected: function (option) { return option.value === _this._listbox1Value; },
                    onActiveIndexChange: function (index) {
                        _this._listbox1Index = index;
                        _this.invalidate();
                    },
                    onOptionSelect: function (option, index) {
                        _this._listbox1Value = option.value;
                        _this._options = tslib_1.__spread(_this._options);
                        _this.invalidate();
                    }
                }),
                d_1.v('br'),
                d_1.v('label', { for: 'listbox2' }, ['Multi-select listbox example']),
                d_1.w(index_1.default, {
                    key: 'listbox2',
                    activeIndex: this._listbox2Index,
                    widgetId: 'listbox2',
                    optionData: this._moreOptions,
                    getOptionLabel: function (option) { return option.label; },
                    getOptionDisabled: function (option) { return !!option.disabled; },
                    getOptionSelected: function (option) { return !!option.selected; },
                    onActiveIndexChange: function (index) {
                        _this._listbox2Index = index;
                        _this.invalidate();
                    },
                    onOptionSelect: function (option, index) {
                        _this._moreOptions[index].selected = !_this._moreOptions[index].selected;
                        _this._moreOptions = tslib_1.__spread(_this._moreOptions);
                        _this.invalidate();
                    }
                })
            ]);
        };
        return App;
    }(WidgetBase_1.WidgetBase));
    exports.App = App;
    var Projector = Projector_1.ProjectorMixin(App);
    var projector = new Projector();
    projector.append();
});
//# sourceMappingURL=index.js.map