(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/i18n/date", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/mixins/Themed", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "./setLocaleData", "../../time-picker/index", "../../common/styles/base.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var date_1 = require("@dojo/framework/i18n/date");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var setLocaleData_1 = require("./setLocaleData");
    var index_1 = require("../../time-picker/index");
    var baseCss = require("../../common/styles/base.m.css");
    setLocaleData_1.default();
    var TODAY = new Date();
    var getEnglishTime = date_1.getDateFormatter({ time: 'short' });
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._options = index_1.getOptions();
            _this._filteredOptions = [];
            _this._values = {};
            _this._invalid = false;
            return _this;
        }
        App.prototype.getFilteredOptions = function (key) {
            var value = this._values[key];
            var matching = [];
            if (value) {
                matching = this._options.filter(function (option) {
                    var hour = option.hour, _a = option.minute, minute = _a === void 0 ? 0 : _a;
                    var hours = hour >= 10 ? hour : "0" + hour;
                    var minutes = minute >= 10 ? minute : "0" + minute;
                    return (hours + ":" + minutes).indexOf(value) === 0;
                });
            }
            this._filteredOptions = matching.length ? matching : this._options;
            this.invalidate();
        };
        App.prototype.onChange = function (value, key) {
            this._values[key] = value;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.v('h1', ['TimePicker Examples']),
                d_1.v('p', {
                    id: 'description1',
                    classes: baseCss.visuallyHidden
                }, ['Accepts 24-hour time with a leading zero, rounded to the nearest half hour.']),
                d_1.v('h3', ['Filter options on input']),
                d_1.v('div', { id: 'example-filter-on-input' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        key: '1',
                        onChange: this.onChange,
                        onRequestOptions: this.getFilteredOptions,
                        options: this._filteredOptions,
                        value: this._values['1']
                    })
                ]),
                d_1.v('h3', ['Open on focus']),
                d_1.v('div', { id: 'example-open-on-focus' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        key: '2',
                        openOnFocus: true,
                        onChange: this.onChange,
                        step: 1800,
                        value: this._values['2']
                    })
                ]),
                d_1.v('h3', ['Disabled menu items']),
                d_1.v('p', {
                    id: 'description2',
                    classes: baseCss.visuallyHidden
                }, ['Accepts 24-hour time with a leading zero, rounded to the nearest hour.']),
                d_1.v('div', { id: 'example-disabled-items' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description2' },
                            placeholder: 'Enter a value'
                        },
                        isOptionDisabled: function (option) { return option.hour >= 12; },
                        key: '3',
                        onChange: this.onChange,
                        step: 3600,
                        value: this._values['3']
                    })
                ]),
                d_1.v('h3', ['Disabled']),
                d_1.v('div', { id: 'example-disabled' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        key: '4',
                        disabled: true
                    })
                ]),
                d_1.v('h3', ['Read Only']),
                d_1.v('div', { id: 'example-readonly' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        key: '5',
                        readOnly: true
                    })
                ]),
                d_1.v('h3', ['Labeled']),
                d_1.v('div', { id: 'example-labeled' }, [
                    d_1.w(index_1.default, {
                        key: '6',
                        inputProperties: {
                            aria: { describedBy: 'description1' }
                        },
                        label: 'Enter a value',
                        onChange: this.onChange,
                        step: 1800,
                        value: this._values['6']
                    })
                ]),
                d_1.v('h3', ['Required and validated']),
                d_1.v('div', { id: 'example-required-validated' }, [
                    d_1.w(index_1.default, {
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        invalid: this._invalid,
                        key: '7',
                        required: true,
                        onBlur: function (value) {
                            _this._invalid = value.trim().length === 0;
                            _this.invalidate();
                        },
                        onChange: function (value, key) {
                            _this._invalid = value.trim().length === 0;
                            _this.onChange(value, key);
                        },
                        step: 1800,
                        value: this._values['7']
                    })
                ]),
                d_1.v('h3', ['One second increment']),
                d_1.v('p', {
                    id: 'description8',
                    classes: baseCss.visuallyHidden
                }, ['Accepts 24-hour time with a leading zero, rounded to the nearest second.']),
                d_1.v('div', { id: 'example-every-second' }, [
                    d_1.w(index_1.default, {
                        end: '12:00:59',
                        inputProperties: {
                            aria: { describedBy: 'description8' },
                            placeholder: 'Enter a value'
                        },
                        key: '8',
                        onChange: this.onChange,
                        start: '12:00:00',
                        step: 1,
                        value: this._values['8']
                    })
                ]),
                d_1.v('h3', ['Use 12-hour time']),
                d_1.v('p', {
                    id: 'description9',
                    classes: baseCss.visuallyHidden
                }, ['Accepts 12-hour time without a leading zero, rounded to the nearest half hour.']),
                d_1.v('div', { id: 'example-12-hour' }, [
                    d_1.w(index_1.default, {
                        getOptionLabel: function (option) {
                            TODAY.setHours(option.hour);
                            TODAY.setMinutes(option.minute);
                            return getEnglishTime(TODAY);
                        },
                        inputProperties: {
                            aria: { describedBy: 'description9' },
                            placeholder: 'Enter a value'
                        },
                        key: '9',
                        onChange: this.onChange,
                        step: 1800,
                        value: this._values['9']
                    })
                ]),
                d_1.v('h3', ['Native `<input type="time">`']),
                d_1.v('div', { id: 'example-native' }, [
                    d_1.w(index_1.default, {
                        key: '10',
                        inputProperties: {
                            aria: { describedBy: 'description1' },
                            placeholder: 'Enter a value'
                        },
                        onChange: this.onChange,
                        step: 1800,
                        useNativeElement: true,
                        invalid: true,
                        label: 'foo',
                        value: this._values['10']
                    })
                ])
            ]);
        };
        App = tslib_1.__decorate([
            Themed_1.theme(baseCss)
        ], App);
        return App;
    }(Themed_1.ThemedMixin(WidgetBase_1.WidgetBase)));
    exports.App = App;
    var Projector = Projector_1.ProjectorMixin(App);
    var projector = new Projector();
    projector.append();
});
//# sourceMappingURL=index.js.map