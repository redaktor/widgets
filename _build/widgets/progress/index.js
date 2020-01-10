(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/meta/Dimensions", "@dojo/framework/widget-core/meta/Intersection", "../baseInput", "../common/util", "../output", "./styles/progress.m.css", "../themes/redaktor-default/progressLinear.m.css", "../themes/redaktor-default/progressCircular.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var Intersection_1 = require("@dojo/framework/widget-core/meta/Intersection");
    var baseInput_1 = require("../baseInput");
    var util_1 = require("../common/util");
    var output_1 = require("../output");
    var fixedCss = require("./styles/progress.m.css");
    var css = require("../themes/redaktor-default/progressLinear.m.css");
    var cssCircular = require("../themes/redaktor-default/progressCircular.m.css");
    var OutputDisplay;
    (function (OutputDisplay) {
        OutputDisplay["above"] = "above";
        OutputDisplay["none"] = "none";
        OutputDisplay["inline"] = "inline";
        OutputDisplay["tooltip"] = "tooltip";
        OutputDisplay["below"] = "below";
    })(OutputDisplay || (OutputDisplay = {}));
    var jsOutput = /** @class */ (function (_super) {
        tslib_1.__extends(jsOutput, _super);
        function jsOutput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        jsOutput.prototype.set = function (key) {
            var node = this.getNode(key);
            node && node.setAttribute('style', "");
        };
        return jsOutput;
    }(Dimensions_1.default));
    exports.jsOutput = jsOutput;
    var ProgressBase = /** @class */ (function (_super) {
        tslib_1.__extends(ProgressBase, _super);
        function ProgressBase() {
            /* TODO FIXME  widgetId for role="progress" // lines statt height */
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._hasRange = false;
            _this._value = NaN;
            return _this;
        }
        ProgressBase.prototype.getInputClasses = function () { return [css.input]; };
        ProgressBase.prototype.getWrapperClasses = function () {
            var _a = this.properties, _b = _a.leading, leading = _b === void 0 ? [] : _b, _c = _a.trailing, trailing = _c === void 0 ? [] : _c;
            return [
                leading.length > 0 ? css.hasPrefix : null,
                trailing.length > 0 ? css.hasSuffix : null,
                css.responsive,
                css.wrapper
            ];
        };
        ProgressBase.prototype.getLegendClasses = function (labeled, even) {
            if (labeled === void 0) { labeled = false; }
            if (even === void 0) { even = false; }
            return labeled ? [css.tickLabels, !!even ? css.even : css.uneven, css.smallTypo] :
                [css.tickMarks, !!even ? css.even : css.uneven];
        };
        ProgressBase.prototype.getCurrentClass = function () { return css.current; };
        ProgressBase.prototype.getFixedRootClasses = function () { return [fixedCss.rootFixed]; };
        ProgressBase.prototype.getFixedInputClasses = function () { return [fixedCss.nativeInput]; };
        ProgressBase.prototype.getTooltipClasses = function (position) {
            if (position === void 0) { position = 'above'; }
            return [
                position === 'none' ? this.theme(css.outputNone) : null,
                position === 'inline' ? this.theme(css.outputInline) : null,
                position === 'tooltip' ? this.theme(css.outputTooltip) : null
            ];
        };
        ProgressBase.prototype.renderLegend = function (percentV, labeled) {
            var _this = this;
            if (percentV === void 0) { percentV = 100; }
            if (labeled === void 0) { labeled = false; }
            var _a = this.properties, _b = _a.max, max = _b === void 0 ? 100 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, tickMarks = _a.tickMarks, tickLabels = _a.tickLabels, tickOutput = _a.tickOutput;
            var ticks = labeled ? tickLabels : tickMarks;
            if (!ticks) {
                return null;
            }
            var range = Math.abs(max - min);
            var el = labeled ? 'data' : 'i';
            if (Array.isArray(ticks)) {
                return Widget_1.v('div', {
                    classes: this.theme(this.getLegendClasses(labeled))
                }, ticks.map(function (tick) {
                    var percent = _this.numberPercent(tick)[1];
                    var tickContent = labeled ? [tickOutput ? tickOutput(tick) : "" + tick] : [];
                    return Widget_1.v(el, {
                        classes: _this.theme([percent >= percentV ? _this.getCurrentClass() : null]),
                        styles: { left: percent + "%" },
                        value: "" + tick
                    }, tickContent);
                }));
            }
            if (typeof ticks !== 'number') {
                return null;
            }
            var tickCount = Math.round(range / ticks + 1);
            var stepCurrent = Math.floor((percentV / 100) * tickCount);
            var percentBase = Math.floor(this.numberPercent(ticks)[1]);
            return Widget_1.v('div', {
                classes: this.theme(this.getLegendClasses(labeled, true))
            }, tslib_1.__spread(Array(tickCount)).map(function (t, i) {
                var tick = min + ticks * i;
                var tickContent = labeled ? [tickOutput ? tickOutput(tick) : "" + tick] : [];
                return Widget_1.v(el, {
                    classes: _this.theme([i === stepCurrent ? _this.getCurrentClass() : null]),
                    styles: labeled ? { left: percentBase * i + "%" } : {},
                    value: "" + tick
                }, tickContent);
            }));
        };
        /*
            protected renderLegend(percentV: number = 100, labeled = false) {
                const {
                    max = 100, min = 0, tickMarks, tickLabels, tickOutput,
                    indeterminate = false, vertical = false
                } = this.properties;
        
                const ticks = labeled ? tickLabels : tickMarks;
                if (!ticks) { return null }
        
                const range = Math.abs(max - min);
                const el = labeled ? 'data' : 'i';
                if (Array.isArray(ticks)) {
                    return v('div', {
                        classes: this.theme(this.getLegendClasses(labeled))
                    }, ticks.map((tick) => {
                        const percent = this.numberPercent(tick)[1];
                        const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
                        return v(el, {
                            classes: this.theme([ percent >= percentV ? this.getCurrentClass() : null ]),
                            styles: {left: `${percent}%`},
                            value: `${tick}`
                        }, tickContent);
                    }));
                }
                const tickCount = Math.round(range / ticks + 1);
                const stepCurrent = Math.floor((percentV / 100) * tickCount);
                const percentBase = Math.floor(this.numberPercent(ticks)[1]);
                return v('div', {
                    classes: this.theme(this.getLegendClasses(labeled, true))
                }, [...Array(tickCount)].map((t,i) => {
                    const tick = min + ticks * i;
                    const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
                    return v(el, {
                        classes: this.theme([ i === stepCurrent ? this.getCurrentClass() : null ]),
                        styles: labeled ? {left: `${percentBase * i}%`} : {},
                        value: `${tick}`
                    }, tickContent)
                }))
            }
        */
        ProgressBase.prototype.renderControls = function (percentV) {
            if (percentV === void 0) { percentV = 0; }
            var _a = this.properties, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, buffer = _a.buffer, indeterminate = _a.indeterminate;
            var isIntersecting = this.meta(Intersection_1.Intersection).get('wrapper').isIntersecting;
            if (indeterminate) {
                return Widget_1.v('div', { classes: this.theme(css.absorb) });
            }
            else if (typeof buffer === 'number') {
                var bufferPercent = Math.min(this.numberPercent(buffer)[1] + percentV, 100);
                return Widget_1.v('div', {
                    classes: this.theme(css.absorb),
                    styles: { width: bufferPercent + "%" }
                });
            }
            return null;
        };
        ProgressBase.prototype.renderInner = function (percentV) {
            if (percentV === void 0) { percentV = 0; }
            var _a = this.properties, _b = _a.vertical, vertical = _b === void 0 ? false : _b, _c = _a.height, height = _c === void 0 ? '200px' : _c, _d = _a.indeterminate, indeterminate = _d === void 0 ? false : _d;
            return Widget_1.v('div', {
                classes: [this.theme(css.track), fixedCss.trackFixed],
                'aria-hidden': 'true',
                styles: vertical ? { width: height } : {}
            }, [
                Widget_1.v('div', {
                    classes: [this.theme(css.fill), fixedCss.fillFixed],
                    styles: indeterminate ? {} : { width: percentV + "%" }
                }),
                this.renderControls(percentV),
                this.renderLegend(percentV),
                this.renderLegend(percentV, true)
            ]);
        };
        ProgressBase.prototype.renderLabelWrapper = function (value, percentV) {
            if (value === void 0) { value = 0; }
            if (percentV === void 0) { percentV = 0; }
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, _c = _a.size, size = _c === void 0 ? 'default' : _c, label = _a.label, output = _a.output, _d = _a.outputDisplay, outputDisplay = _d === void 0 ? 'above' : _d, _e = _a.indeterminate, indeterminate = _e === void 0 ? false : _e, _f = _a.vertical, vertical = _f === void 0 ? false : _f;
            var hasLabel = (typeof label === 'string' && label.length);
            var outputNode = output ? output(value, percentV) : "" + value;
            // output styles
            var outputStyles = {};
            if (outputDisplay === 'tooltip') {
                outputStyles = vertical ? { top: 100 - percentV + "%" } : { left: percentV + "%" };
            }
            return Widget_1.v('span', {
                classes: tslib_1.__spread([
                    outputDisplay === 'tooltip' ? fixedCss.outputTooltip : null
                ], this.getTooltipClasses(outputDisplay))
            }, [
                hasLabel ? this.renderLabel() : null,
                !indeterminate && hasLabel && outputDisplay === 'above' ? Widget_1.v('br') : null,
                !indeterminate ? Widget_1.w(output_1.default, {
                    key: 'output',
                    size: size,
                    forId: widgetId,
                    style: outputStyles,
                    tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
                }, [outputNode]) : null,
                outputDisplay === 'inline' ? Widget_1.v('br') : null
            ]);
        };
        ProgressBase.prototype._ariaInputWrapper = function () {
            var _a = this.properties, _b = _a.value, value = _b === void 0 ? this._value : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.aria, aria = _e === void 0 ? {} : _e, output = _a.output;
            return tslib_1.__assign({}, util_1.formatAriaProperties(aria), { role: 'progressbar', 'aria-valuemin': "" + min, 'aria-valuemax': "" + max, 'aria-valuenow': "" + value, 'aria-valuetext': output || (function () { return "" + value; }) });
        };
        ProgressBase.prototype.ariaInputWrapper = function () {
            return this._ariaInputWrapper();
        };
        ProgressBase.prototype.renderInputWrapper = function (value, percentV) {
            var _this = this;
            if (value === void 0) { value = 0; }
            if (percentV === void 0) { percentV = 0; }
            var _a = this.properties, _b = _a.responsive, responsive = _b === void 0 ? true : _b, _c = _a.leading, leading = _c === void 0 ? [] : _c, _d = _a.trailing, trailing = _d === void 0 ? [] : _d, _e = _a.vertical, vertical = _e === void 0 ? false : _e, _f = _a.height, height = _f === void 0 ? '200px' : _f;
            var _input = this.renderInput();
            var _prefixes = leading.map(function (addon) { return _this.renderAddon(addon, true); });
            var _suffixes = trailing.map(function (addon) { return _this.renderAddon(addon); });
            return Widget_1.v('div', tslib_1.__assign({ key: 'wrapper' }, this.ariaInputWrapper(), { classes: tslib_1.__spread([
                    fixedCss.wrapperFixed
                ], this.getSizeClasses(css), this.getSchemaClasses(css), this.theme(this.getWrapperClasses())), styles: vertical ? { height: height } : {} }), tslib_1.__spread([_input], _prefixes, [this.renderInner(percentV)], _suffixes));
        };
        ProgressBase.prototype.numberValue = function (nr) { return nr; }; /* needed to round e.g. to 'step' */
        ProgressBase.prototype.numberPercent = function (forValue) {
            var _a = this.properties, _b = _a.value, value = _b === void 0 ? this._value : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.min, min = _d === void 0 ? 0 : _d;
            var range = Math.abs(max - min);
            var v = typeof forValue === 'number' ? forValue : value;
            var _nrV = typeof v === 'number' && isNaN(v) ? ((max + min) / 2) :
                (typeof v === 'number' ? v : parseFloat(v));
            var nrV = this.numberValue(Math.max(min, Math.min(max, _nrV)));
            return [nrV, ((nrV / range) * 100)];
        };
        ProgressBase.prototype.render = function () {
            var _a = this.properties, _b = _a.max, max = _b === void 0 ? 100 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c;
            if (typeof this._value === 'number' && isNaN(this._value)) {
                this._value = ((max + min) / 2);
            }
            var nr_p = this.numberPercent();
            return Widget_1.v('div', {
                key: 'root',
                classes: tslib_1.__spread(this.getRootClasses(), this.getFixedRootClasses())
            }, [
                this.renderLabelWrapper.apply(this, tslib_1.__spread(nr_p)),
                this.renderInputWrapper.apply(this, tslib_1.__spread(nr_p))
            ]);
        };
        return ProgressBase;
    }(baseInput_1.default));
    exports.ProgressBase = ProgressBase;
    var Progress = /** @class */ (function (_super) {
        tslib_1.__extends(Progress, _super);
        function Progress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Progress.prototype.renderInput = function () { return null; };
        Progress.prototype.getTooltipClasses = function (position) {
            if (position === void 0) { position = 'above'; }
            return [];
        };
        Progress.prototype.getRootClasses = function () {
            var _a = this.properties, vertical = _a.vertical, tickLabels = _a.tickLabels, indeterminate = _a.indeterminate, buffer = _a.buffer;
            var stdRootClasses = tslib_1.__spread(this._getRootClasses(css), this.getSizeClasses());
            var isIntersecting = this.meta(Intersection_1.Intersection).get('wrapper').isIntersecting;
            return stdRootClasses.concat([
                vertical ? css.vertical : css.horizontal,
                tickLabels ? css.labeled : null,
                isIntersecting && indeterminate ? css.indeterminate : css.determinate,
                buffer ? css.buffer : null
            ]);
        };
        Progress = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-progress',
                properties: [
                    'theme', 'size', 'aria', 'extraClasses', 'disabled', 'invalid', 'readOnly',
                    'required', 'buffer', 'indeterminate', 'output', 'outputDisplay', 'max', 'min',
                    'vertical', 'value'
                ],
                attributes: ['widgetId', 'height'],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
                    'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], Progress);
        return Progress;
    }(ProgressBase));
    exports.default = Progress;
    var CircularProgress = /** @class */ (function (_super) {
        tslib_1.__extends(CircularProgress, _super);
        function CircularProgress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CircularProgress.prototype.renderInput = function () { return null; };
        CircularProgress.prototype.getTooltipClasses = function (position) {
            if (position === void 0) { position = 'above'; }
            return [
                position === 'none' ? this.theme(cssCircular.outputNone) : null,
                position === 'inline' ? this.theme(cssCircular.outputInline) : null,
                position === 'tooltip' ? this.theme(cssCircular.outputTooltip) : null
            ];
        };
        CircularProgress.prototype.getRootClasses = function () {
            var _a = this.properties, vertical = _a.vertical, tickLabels = _a.tickLabels, indeterminate = _a.indeterminate;
            var stdRootClasses = this._getRootClasses(cssCircular);
            return stdRootClasses.concat([
                tickLabels ? cssCircular.labeled : null
            ]);
            /* style={{ width: size, height: size, ...rootStyle, ...style }} */
        };
        CircularProgress.prototype.renderInputWrapper = function (value, percentV) {
            var _this = this;
            if (value === void 0) { value = 0; }
            if (percentV === void 0) { percentV = 0; }
            var SIZE = 80;
            var THICK = 3.6;
            /* <--- TODO FIXME goes properties */
            var _a = this.properties, indeterminate = _a.indeterminate, _b = _a.leading, leading = _b === void 0 ? [] : _b, _c = _a.trailing, trailing = _c === void 0 ? [] : _c;
            var _prefixes = leading.map(function (addon) { return _this.renderAddon(addon, true); });
            var _suffixes = trailing.map(function (addon) { return _this.renderAddon(addon); });
            var easeIn = function (t) { return t * t; };
            var easeOut = function (t) {
                t = Math.min(Math.max(0, t), 1);
                t = (t -= 1) * t * t + 1; // https://gist.github.com/gre/1650294
                return t;
            };
            var styles = {
                transform: "rotate(" + (indeterminate ? (easeOut(value / 70) * 270).toFixed(3) : -90) + "deg)"
            };
            var circle = Widget_1.v('svg', {
                styles: styles,
                classes: this.theme([cssCircular.inner, cssCircular.svg])
                /*viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`*/
            }, [
                Widget_1.v('circle', {
                    classes: this.theme([cssCircular.circle, cssCircular.track])
                }),
                Widget_1.v('circle', {
                    styles: indeterminate ? {} : {
                        strokeDashoffset: "calc(var(--circumference) - " + percentV / 100 + " * var(--circumference))"
                    },
                    classes: this.theme(cssCircular.circle)
                })
            ]);
            var isIntersecting = this.meta(Intersection_1.Intersection).get('wrapper').isIntersecting;
            return Widget_1.v('div', tslib_1.__assign({ key: 'wrapper' }, this.ariaInputWrapper(), { classes: tslib_1.__spread(this.getSizeClasses(css), this.getSchemaClasses(css), this.theme([
                    isIntersecting && indeterminate ? cssCircular.indeterminate : cssCircular.determinate,
                    leading.length > 0 ? cssCircular.hasPrefix : null,
                    trailing.length > 0 ? cssCircular.hasSuffix : null,
                    cssCircular.wrapper
                ])) }), tslib_1.__spread(_prefixes, [circle], _suffixes));
        };
        CircularProgress = tslib_1.__decorate([
            Widget_1.theme(cssCircular),
            Widget_1.customElement({
                tag: 'redaktor-progress',
                properties: [
                    'theme', 'size', 'aria', 'extraClasses', 'disabled', 'invalid', 'readOnly',
                    'required', 'indeterminate', 'output', 'outputDisplay', 'max', 'min',
                    'vertical', 'value'
                ],
                attributes: ['widgetId', 'height'],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
                    'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            })
        ], CircularProgress);
        return CircularProgress;
    }(ProgressBase));
    exports.CircularProgress = CircularProgress;
});
//# sourceMappingURL=index.js.map