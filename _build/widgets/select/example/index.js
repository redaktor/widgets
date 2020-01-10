(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../select/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../select/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._selectOptions = [
                {
                    value: 'cat',
                    label: 'Cat'
                },
                {
                    value: 'dog',
                    label: 'Dog'
                },
                {
                    value: 'hamster',
                    label: 'Hamster'
                },
                {
                    value: 'goat',
                    label: 'Goat',
                    disabled: true
                }
            ];
            _this._moreSelectOptions = [
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
            _this._evenMoreSelectOptions = ['Maru', 'Garfield', 'Grumpy Cat', 'Hobbes'];
            return _this;
        }
        App.prototype.getOptionSettings = function () {
            return {
                getOptionDisabled: function (option) { return option.disabled; },
                getOptionLabel: function (option) { return option.label; },
                getOptionValue: function (option) { return option.value; }
            };
        };
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.w(index_1.default, tslib_1.__assign({ key: 'select1' }, this.getOptionSettings(), { getOptionSelected: function (option) { return !!_this._value1 && option.value === _this._value1; }, label: 'Native select', options: this._selectOptions, useNativeElement: true, value: this._value1, onChange: function (option) {
                        _this._value1 = option.value;
                        _this.invalidate();
                    } })),
                d_1.v('p', {
                    innerHTML: 'Result value: ' + this._value1
                }),
                d_1.w(index_1.default, tslib_1.__assign({ key: 'select2' }, this.getOptionSettings(), { label: 'Custom select box', options: this._moreSelectOptions, value: this._value2, onChange: function (option) {
                        _this._value2 = option.value;
                        _this.invalidate();
                    } })),
                d_1.v('br'),
                d_1.w(index_1.default, {
                    key: 'select3',
                    getOptionSelected: function (option) { return !!_this._value3 && option === _this._value3; },
                    label: 'Custom select with placeholder',
                    options: this._evenMoreSelectOptions,
                    placeholder: 'Choose a cat',
                    value: this._value3,
                    onChange: function (option) {
                        _this._value3 = option;
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