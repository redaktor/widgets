(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../combobox/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../combobox/index");
    var data = [
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
        { value: 'Oklahoma' },
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
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._results = [];
            _this._value1 = '';
            _this._value2 = '';
            _this._value5 = '';
            _this._value6 = '';
            _this._value7 = '';
            _this._value8 = '';
            _this._value9 = '';
            _this._invalid = false;
            return _this;
        }
        App.prototype.onChange = function (value, key) {
            if (!key) {
                return;
            }
            this["_value" + key] = value;
            this.invalidate();
        };
        App.prototype.onRequestResults = function (key) {
            var value = this["_value" + key];
            var results = data.filter(function (item) {
                var match = item.value.toLowerCase().match(new RegExp('^' + value.toLowerCase()));
                return Boolean(match && match.length > 0);
            });
            this._results = results.sort(function (a, b) { return a.value < b.value ? -1 : 1; });
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            var _a = this, onChange = _a.onChange, onRequestResults = _a.onRequestResults;
            return d_1.v('div', {
                styles: { maxWidth: '256px' }
            }, [
                d_1.v('h1', ['ComboBox Examples']),
                d_1.v('h3', ['Clearable']),
                d_1.w(index_1.default, {
                    key: '2',
                    clearable: true,
                    onChange: onChange,
                    getResultLabel: function (result) { return result.value; },
                    onRequestResults: onRequestResults,
                    results: this._results,
                    value: this._value2,
                    inputProperties: {
                        placeholder: 'Enter a value'
                    }
                }),
                d_1.v('h3', ['Open on focus']),
                d_1.w(index_1.default, {
                    key: '1',
                    openOnFocus: true,
                    onChange: onChange,
                    getResultLabel: function (result) { return result.value; },
                    onRequestResults: onRequestResults,
                    results: this._results,
                    value: this._value1,
                    inputProperties: {
                        placeholder: 'Enter a value'
                    }
                }),
                d_1.v('h3', ['Disabled menu items']),
                d_1.w(index_1.default, {
                    key: '5',
                    onChange: onChange,
                    getResultLabel: function (result) { return result.value; },
                    onRequestResults: onRequestResults,
                    results: this._results,
                    value: this._value5,
                    isResultDisabled: function (result) { return result.value.length > 9; },
                    inputProperties: {
                        placeholder: 'Enter a value'
                    }
                }),
                d_1.v('h3', ['Disabled']),
                d_1.w(index_1.default, {
                    key: '6',
                    disabled: true,
                    inputProperties: {
                        placeholder: 'Enter a value'
                    },
                    onChange: onChange,
                    onRequestResults: onRequestResults,
                    value: this._value6
                }),
                d_1.v('h3', ['Read Only']),
                d_1.w(index_1.default, {
                    key: '7',
                    readOnly: true,
                    inputProperties: {
                        placeholder: 'Enter a value'
                    },
                    onChange: onChange,
                    onRequestResults: onRequestResults,
                    value: this._value7
                }),
                d_1.v('h3', ['Label']),
                d_1.w(index_1.default, {
                    key: '8',
                    onChange: onChange,
                    getResultLabel: function (result) { return result.value; },
                    onRequestResults: onRequestResults,
                    results: this._results,
                    value: this._value8,
                    label: 'Enter a value'
                }),
                d_1.v('h3', ['Required and validated']),
                d_1.w(index_1.default, {
                    key: '9',
                    required: true,
                    onChange: function (value) {
                        _this._value9 = value;
                        _this._invalid = value.trim().length === 0;
                        _this.invalidate();
                    },
                    getResultLabel: function (result) { return result.value; },
                    onRequestResults: onRequestResults,
                    results: this._results,
                    value: this._value9,
                    invalid: this._invalid,
                    inputProperties: {
                        placeholder: 'Enter a value'
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