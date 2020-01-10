(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/icon", "../../widgets/slider", "../../styles/tabs.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var icon_1 = require("../../widgets/icon");
    var slider_1 = require("../../widgets/slider");
    var css = require("../../styles/tabs.m.css");
    var SliderTab = /** @class */ (function (_super) {
        tslib_1.__extends(SliderTab, _super);
        function SliderTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._horizontalValue = 50;
            _this._verticalValue = 0;
            _this._verticalInvalid = false;
            return _this;
        }
        SliderTab.prototype._onHorizontalInput = function (evt) {
            this._horizontalValue = parseFloat(evt.value);
            //console.log(evt)
            //FIXME EVENT: this._horizontalValue = evt.value;
            //this.invalidate();
        };
        SliderTab.prototype._onVerticalInput = function (evt) {
            this._verticalValue = parseFloat(evt.value);
        };
        SliderTab.prototype.render = function () {
            var _this = this;
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            return d_1.v('div', { classes: css.root }, [
                d_1.v('h3', ['Sliders']),
                d_1.v('div', [
                    d_1.v('h4', {}, ['Horizontal slider, value: 50']),
                    d_1.w(slider_1.default, {
                        key: 's1',
                        size: size,
                        label: 'How much do you like tribbles?',
                        min: 0,
                        max: 100,
                        value: this._horizontalValue,
                        onChange: this._onHorizontalInput,
                        onInput: this._onHorizontalInput
                    }),
                    d_1.w(slider_1.default, {
                        key: 's1p',
                        size: size,
                        schema: 'primary',
                        label: 'How much do you like tribbles?',
                        min: 0,
                        max: 100,
                        output: function (value) {
                            if (value < 20) {
                                return 'I am a Klingon';
                            }
                            if (value < 40) {
                                return 'Tribbles only cause trouble';
                            }
                            if (value < 60) {
                                return 'They\`re kind of cute';
                            }
                            if (value < 80) {
                                return 'Most of my salary goes to tribble food';
                            }
                            else {
                                return 'I permanently altered the ecology of a planet for my tribbles';
                            }
                        }
                    }),
                    d_1.w(slider_1.default, {
                        key: 's1s',
                        size: size,
                        schema: 'secondary',
                        label: 'How much do you like tribbles?',
                        min: 0,
                        max: 100,
                        step: 10,
                        tickMarks: 10,
                        tickLabels: [0, 20, 50, 80, 100],
                        output: function (value) {
                            if (value < 20) {
                                return 'I am a Klingon';
                            }
                            if (value < 40) {
                                return 'Tribbles only cause trouble';
                            }
                            if (value < 60) {
                                return 'They\`re kind of cute';
                            }
                            if (value < 80) {
                                return 'Most of my salary goes to tribble food';
                            }
                            else {
                                return 'I permanently altered the ecology of a planet for my tribbles';
                            }
                        },
                        tickOutput: function (value) { return value + "%"; }
                    }),
                    d_1.v('h4', {}, ['Disabled slider, value: 30']),
                    d_1.w(slider_1.default, {
                        key: 's2d',
                        size: size,
                        label: 'Disabled Slider',
                        outputDisplay: 'inline',
                        min: 0,
                        max: 100,
                        step: 1,
                        value: 30,
                        disabled: true
                    }),
                    d_1.w(slider_1.default, {
                        key: 's2i',
                        size: size,
                        label: 'Volume',
                        outputDisplay: 'inline',
                        leading: [d_1.v('span', ['X'])],
                        trailing: [d_1.w(icon_1.default, { type: 'plusIcon' })],
                        min: 0,
                        max: 100,
                        step: 10,
                        tickMarks: 10,
                        tickLabels: 20
                        //value: this._horizontalValue,
                        //onChange: this._onHorizontalInput,
                        //onInput: this._onHorizontalInput
                    }),
                    d_1.v('h4', {}, ['Vertical slider with validation']),
                    /* FIXME EVENT:
                    */
                    d_1.w(slider_1.default, {
                        key: 's2v',
                        size: size,
                        label: 'Vertical Slider with default properties. Anything over 50 is invalid:',
                        value: this._verticalValue,
                        vertical: true,
                        invalid: this._verticalInvalid,
                        output: function (value) {
                            return d_1.v('span', {
                                innerHTML: _this._verticalInvalid ? value + ' !' : value + ''
                            });
                        },
                        //tickMarks: 10,
                        //tickLabels: [0,20,50,80,100],
                        //outputIsTooltip: true,
                        onChange: this._onVerticalInput,
                        onInput: this._onVerticalInput
                    }),
                    d_1.v('br'), d_1.v('br'), d_1.v('br')
                ])
            ]);
        };
        return SliderTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = SliderTab;
});
//# sourceMappingURL=SliderTab.js.map