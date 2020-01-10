(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../progress", "./styles/slider.m.css", "../themes/redaktor-default/slider.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var progress_1 = require("../progress");
    var fixedCss = require("./styles/slider.m.css");
    var css = require("../themes/redaktor-default/slider.m.css");
    /* TODO FIXME
    export class jsOutput extends Dimensions {
        set(key: string): any {
          const node = this.getNode(key);
            node && node.setAttribute('style', ``);
        }
    }*/
    var Slider = /** @class */ (function (_super) {
        tslib_1.__extends(Slider, _super);
        function Slider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._value = NaN;
            _this._role = 'slider';
            return _this;
        }
        Slider.prototype._onInput = function (event) {
            //    console.log('_onInput', (event.target as HTMLInputElement).value);
            event.stopPropagation();
            if (!!this.isComposing) {
                if (!this.has.compositionEvent) {
                    this.isComposing = false;
                }
                return;
            }
            // TODO autofill / spellchecker ? "insertReplacementText"
            this._value = parseFloat(event.target.value);
            this.readonlyProp('value', this._value, event);
            this.invalidate();
            this.properties.onInput && this.properties.onInput(event);
        };
        Slider.prototype._onChange = function (event) {
            console.log('on change', event.target.value);
            event.stopPropagation();
            this._value = parseFloat(event.target.value);
            this.readonlyProp('value', this._value, event);
            this.invalidate();
        };
        Slider.prototype.numberValue = function (nr) {
            var _a = this.properties.step, step = _a === void 0 ? 1 : _a;
            return Math.round(nr / step) * step;
        };
        Slider.prototype.getRootClasses = function () {
            var _a = this.properties, vertical = _a.vertical, tickLabels = _a.tickLabels;
            var stdRootClasses = tslib_1.__spread(this._getRootClasses(css), this.getSizeClasses());
            return stdRootClasses.concat([
                vertical ? css.vertical : css.horizontal,
                tickLabels ? css.labeled : null
            ]);
        };
        Slider.prototype.getInputClasses = function () { return [css.input]; };
        Slider.prototype.getWrapperClasses = function () {
            var _a = this.properties, _b = _a.leading, leading = _b === void 0 ? [] : _b, _c = _a.trailing, trailing = _c === void 0 ? [] : _c;
            return [
                leading.length > 0 ? css.hasPrefix : null,
                trailing.length > 0 ? css.hasSuffix : null,
                css.responsive,
                css.wrapper
            ];
        };
        Slider.prototype.getLegendClasses = function (labeled, even) {
            if (labeled === void 0) { labeled = false; }
            if (even === void 0) { even = false; }
            return labeled ? [css.tickLabels, !!even ? css.even : css.uneven, css.smallTypo] :
                [css.tickMarks, css.uneven];
        };
        Slider.prototype.getCurrentClass = function () { return css.current; };
        Slider.prototype.getTooltipClasses = function (position) {
            if (position === void 0) { position = 'above'; }
            return [];
        };
        Slider.prototype.getInputProperties = function () {
            var _a = this.properties, _b = _a.max, max = _b === void 0 ? 100 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.step, step = _d === void 0 ? 1 : _d, _e = _a.vertical, vertical = _e === void 0 ? false : _e, _f = _a.height, height = _f === void 0 ? '200px' : _f;
            return {
                styles: vertical ? { width: "calc(" + height + " + var(--ui-inner-h))" } : {},
                max: "" + max, min: "" + min, step: "" + step,
                type: 'range'
            };
        };
        Slider.prototype.renderInner = function (percentV) {
            if (percentV === void 0) { percentV = 0; }
            var _a = this.properties, _b = _a.vertical, vertical = _b === void 0 ? false : _b, _c = _a.height, height = _c === void 0 ? '200px' : _c;
            return Widget_1.v('div', {
                classes: [this.theme(css.track), fixedCss.trackFixed],
                'aria-hidden': 'true',
                styles: vertical ? { width: height } : {}
            }, [
                Widget_1.v('div', {
                    classes: [this.theme(css.fill), fixedCss.fillFixed],
                    styles: { width: this._value + "%" }
                }),
                this.renderControls(this._value),
                this.renderLegend(this._value),
                this.renderLegend(this._value, true)
            ]);
        };
        Slider.prototype.ariaInputWrapper = function () {
            return util_1.formatAriaProperties(this.properties.aria || {});
        };
        Slider.prototype.renderControls = function (percentV) {
            if (percentV === void 0) { percentV = 0; }
            return Widget_1.v('span', tslib_1.__assign({}, tslib_1.__assign({}, this._ariaInputWrapper(), { role: 'slider' }), { classes: this.theme(css.thumb), styles: { left: percentV + "%" } }));
        };
        Slider = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-slider',
                properties: [
                    'theme',
                    'size',
                    'aria',
                    'extraClasses',
                    'disabled',
                    'invalid',
                    'required',
                    'readOnly',
                    'output',
                    'max',
                    'min',
                    'outputDisplay',
                    'step',
                    'vertical',
                    'value'
                ],
                attributes: ['widgetId', 'height'],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
                    'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], Slider);
        return Slider;
    }(progress_1.ProgressBase));
    exports.default = Slider;
});
//# sourceMappingURL=index.js.map