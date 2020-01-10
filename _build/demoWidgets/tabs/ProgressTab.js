(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/button", "../../widgets/progress", "../../styles/tabs.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var button_1 = require("../../widgets/button");
    var progress_1 = require("../../widgets/progress");
    var css = require("../../styles/tabs.m.css");
    var ProgressTab = /** @class */ (function (_super) {
        tslib_1.__extends(ProgressTab, _super);
        function ProgressTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._customOutputMax = 750;
            _this._completed = 0;
            _this._buffer = 0;
            _this._timer = false;
            _this._indeterminate = false;
            return _this;
        }
        ProgressTab.prototype._customOutput = function (value, percent) {
            return value + " of " + this._customOutputMax + " is " + percent + "%";
        };
        ProgressTab.prototype._bufferProgress = function () {
            if (this._completed > 100) {
                this._completed = 0;
                this._buffer = 10;
            }
            else {
                var diff = Math.random() * 8;
                this._completed = this._completed + 5;
                this._buffer = this._completed + diff;
                /*
          const diff2 = Math.random() * 10;
                this._completed = this._completed + diff;
                this._buffer = this._completed + diff + diff2;*/
            }
            this.invalidate();
        };
        ProgressTab.prototype.onBuffer = function () {
            this._indeterminate = false;
            if (!!this._timer) {
                clearInterval(this._timer);
                this._buffer = 0;
                this._timer = false;
            }
            else {
                this._buffer = 10;
                this._timer = setInterval(this._bufferProgress.bind(this), 500);
            }
            this.invalidate();
        };
        ProgressTab.prototype.onIndeterminate = function () {
            this._indeterminate = !this._indeterminate;
            if (!!this._timer) {
                clearInterval(this._timer);
                this._timer = false;
            }
            this.invalidate();
        };
        ProgressTab.prototype.render = function () {
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            return d_1.v('div', { classes: css.root }, [
                d_1.v('h3', ['Progress Bars']),
                d_1.v('div', [
                    d_1.v('h4', {}, ['value: 50%']),
                    d_1.w(progress_1.default, { size: size, label: 'countdown', outputDisplay: 'inline', value: 50, tickMarks: 10, tickLabels: 20 }),
                    d_1.v('h4', {}, ['value: 0.3, max: 1']),
                    d_1.w(progress_1.default, { size: size, value: 0.3, max: 1 }),
                    d_1.w(progress_1.default, { size: size, schema: 'primary', value: 0.3, max: 1, tickMarks: 0.1, tickLabels: 0.2 }),
                    d_1.w(progress_1.default, { size: size, schema: 'secondary', value: 0.3, max: 1 }),
                    d_1.v('h4', {}, ['animated ...']),
                    /* TODO Toggle button */
                    d_1.w(button_1.default, {
                        size: 'small', schema: 'primary', pressed: this._indeterminate, onClick: this.onIndeterminate
                    }, ['indeterminate']),
                    d_1.w(button_1.default, {
                        size: 'small', schema: 'primary', pressed: !!this._timer, onClick: this.onBuffer
                    }, ['buffer']),
                    d_1.w(progress_1.default, {
                        size: size, schema: 'secondary', min: 10, max: 100, value: this._completed,
                        buffer: this._buffer, indeterminate: this._indeterminate
                    }),
                    d_1.v('h4', {}, ['value: 250, custom output function']),
                    d_1.w(progress_1.default, {
                        size: size,
                        value: 250,
                        max: this._customOutputMax,
                        output: this._customOutput
                    }),
                    d_1.v('h4', {}, ['value: 10, showOutput: false']),
                    d_1.w(progress_1.default, { size: size, value: 10, outputDisplay: 'none' }),
                    d_1.v('h4', {}, ['circular']),
                    d_1.w(progress_1.CircularProgress, { size: size, indeterminate: false, value: 10, outputDisplay: 'none' }),
                    d_1.w(progress_1.CircularProgress, { size: size, schema: 'primary', indeterminate: false, value: 30, outputDisplay: 'none' }),
                    d_1.w(progress_1.CircularProgress, { size: size, schema: 'secondary', indeterminate: false, value: 50, outputDisplay: 'none' })
                ])
            ]);
        };
        return ProgressTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = ProgressTab;
});
//# sourceMappingURL=ProgressTab.js.map