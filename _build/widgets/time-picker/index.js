(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "@dojo/framework/shim/string", "@dojo/framework/widget-core/decorators/diffProperty", "@dojo/framework/widget-core/diff", "../../framework/uuid", "@dojo/framework/widget-core/meta/Focus", "../combobox/index", "../label/index", "../themes/redaktor-default/time-picker.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var string_1 = require("@dojo/framework/shim/string");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var uuid_1 = require("../../framework/uuid");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var index_1 = require("../combobox/index");
    var index_2 = require("../label/index");
    var css = require("../themes/redaktor-default/time-picker.m.css");
    /**
     * @private
     * Regular epression that matches a standard time string ('HH:mm:ss').
     */
    var TIME_PATTERN = /^\d{2}:\d{2}(:\d{2})?$/;
    /**
     * Generate an array of time unit objects from the specified start date to the specified end date.
     *
     * @param start    The start time. Defaults to midnight.
     * @param end      The end time. Defaults to 23:59:59.
     * @param step     The amount of time in seconds between each step. Defaults to 60.
     * @return         An array of time unit objects.
     */
    function getOptions(start, end, step) {
        if (start === void 0) { start = '00:00:00'; }
        if (end === void 0) { end = '23:59:59'; }
        if (step === void 0) { step = 60; }
        var endUnits = parseUnits(end);
        var startUnits = parseUnits(start);
        var endTime = getTime(endUnits);
        var date = new Date();
        var time = getTime(startUnits, date);
        var i = step * 1000;
        var options = [];
        while (time <= endTime) {
            options.push(time);
            time += i;
        }
        return options.map(function (time) {
            date.setTime(time);
            return {
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            };
        });
    }
    exports.getOptions = getOptions;
    /**
     * @private
     * Create a numeric timestamp for the specified hour, minute, and second units.
     *
     * @param units   An object containing the hours, minutes, and seconds for the time.
     * @param date    An optional date object.
     * @return        The timestamp, in milliseconds, according to universal time.
     */
    function getTime(units, date) {
        if (date === void 0) { date = new Date(); }
        var hour = units.hour, minute = units.minute, second = units.second;
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(0);
        return date.getTime();
    }
    /**
     * Convert a standard time string into an object with `hour`, `minute`, and `second` number properties.
     *
     * For example, '12:30' is converted to `{ hour: 12, minute: 30, second: 0 }`, and '19:03:27' is converted
     * to `{ hour: 19, minute: 3, second: 27 }`.
     *
     * @param value   A standard time string or an object with `hour`, `minute`, and `second` properties.
     * @return        An object containing `hour`, `second`, and `number` properties.
     */
    function parseUnits(value) {
        if (typeof value === 'string') {
            if (!TIME_PATTERN.test(value)) {
                throw new Error('Time strings must be in the format HH:mm or HH:mm:ss');
            }
            var _a = tslib_1.__read(value.split(':').map(function (unit) { return parseInt(unit, 10); }), 3), hour = _a[0], minute = _a[1], _b = _a[2], second = _b === void 0 ? 0 : _b;
            return { hour: hour, minute: minute, second: second };
        }
        return value;
    }
    exports.parseUnits = parseUnits;
    var TimePickerBase = /** @class */ (function (_super) {
        tslib_1.__extends(TimePickerBase, _super);
        function TimePickerBase() {
            var _this = _super.call(this) || this;
            _this.options = null;
            _this._uuid = uuid_1.default();
            return _this;
        }
        TimePickerBase.prototype._formatUnits = function (units) {
            var _a = this.properties.step, step = _a === void 0 ? 60 : _a;
            var hour = units.hour, minute = units.minute, second = units.second;
            return (step >= 60 ? [hour, minute] : [hour, minute, second])
                .map(function (unit) { return string_1.padStart(String(unit), 2, '0'); })
                .join(':');
        };
        TimePickerBase.prototype._getOptionLabel = function (value) {
            var getOptionLabel = this.properties.getOptionLabel;
            var units = parseUnits(value);
            return getOptionLabel ? getOptionLabel(units) : this._formatUnits(units);
        };
        TimePickerBase.prototype._onFocus = function (evt) {
            var _a = this.properties, key = _a.key, _b = _a.value, value = _b === void 0 ? '' : _b, onFocus = _a.onFocus;
            onFocus && onFocus(evt, value, key);
        };
        TimePickerBase.prototype._onBlur = function (evt) {
            var _a = this.properties, key = _a.key, _b = _a.value, value = _b === void 0 ? '' : _b, onBlur = _a.onBlur;
            onBlur && onBlur(evt, value, key);
        };
        TimePickerBase.prototype._onChange = function (value, key) {
            var /*key, value = '',*/ onChange = this.properties.onChange;
            onChange && onChange(value, 0, key);
        };
        TimePickerBase.prototype._onMenuChange = function (open) {
            var _a = this.properties, key = _a.key, onMenuChange = _a.onMenuChange;
            onMenuChange && onMenuChange(open, key);
        };
        TimePickerBase.prototype._onNativeFocus = function (event) {
            var _a = this.properties, key = _a.key, _b = _a.value, value = _b === void 0 ? '' : _b, onFocus = _a.onFocus;
            onFocus && onFocus(event, value, key);
        };
        TimePickerBase.prototype._onNativeBlur = function (event) {
            var _a = this.properties, key = _a.key, _b = _a.value, value = _b === void 0 ? '' : _b, onBlur = _a.onBlur;
            onBlur && onBlur(event, value, key);
        };
        TimePickerBase.prototype._onNativeChange = function (event) {
            var _a = this.properties, key = _a.key, _b = _a.value, value = _b === void 0 ? '' : _b, onChange = _a.onChange;
            onChange && onChange(value, 0, key);
        };
        TimePickerBase.prototype._sortMenu = function (query) {
            console.log('TimePicker sort');
            return this.properties.results;
        };
        TimePickerBase.prototype._onRequestOptions = function () {
            var _a = this.properties, onRequestOptions = _a.onRequestOptions, key = _a.key;
            onRequestOptions && onRequestOptions(key);
        };
        TimePickerBase.prototype.getRootClasses = function () {
            var _a = this.properties, disabled = _a.disabled, valid = _a.valid, readOnly = _a.readOnly, required = _a.required;
            var focus = this.meta(Focus_1.default).get('root');
            return [
                css.root,
                disabled ? css.disabled : null,
                focus.containsFocus ? css.focused : null,
                valid === false ? css.invalid : null,
                readOnly ? css.readonly : null,
                required ? css.required : null
            ];
        };
        TimePickerBase.prototype.getOptions = function () {
            if (this.options) {
                return this.options;
            }
            var _a = this.properties, end = _a.end, start = _a.start, step = _a.step;
            this.options = getOptions(start, end, step);
            return this.options;
        };
        TimePickerBase.prototype.onPropertiesChanged = function () {
            this.options = null;
        };
        TimePickerBase.prototype.renderCustomInput = function () {
            var _a = this.properties, clearable = _a.clearable, disabled = _a.disabled, extraClasses = _a.extraClasses, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, inputProperties = _a.inputProperties, valid = _a.valid, isOptionDisabled = _a.isOptionDisabled, label = _a.label, labelAfter = _a.labelAfter, labelHidden = _a.labelHidden, openOnFocus = _a.openOnFocus, _c = _a.options, options = _c === void 0 ? this.getOptions() : _c, readOnly = _a.readOnly, required = _a.required, theme = _a.theme, value = _a.value;
            return Widget_1.w(index_1.default, {
                key: 'combo',
                sortable: false,
                clearable: clearable,
                disabled: disabled,
                extraClasses: extraClasses,
                getOptionLabel: this._getOptionLabel.bind(this),
                onToken: function (n) { return [n]; },
                widgetId: widgetId,
                //inputProperties, // TODO FIXME
                valid: valid === true || undefined,
                getOptionDisabled: isOptionDisabled,
                label: label,
                labelAfter: labelAfter,
                labelHidden: labelHidden,
                onBlur: this._onBlur,
                onChange: this._onChange,
                onFocus: this._onFocus,
                onMenuChange: this._onMenuChange,
                onRequestResults: this._onRequestOptions.bind(this),
                openOnFocus: openOnFocus,
                readOnly: readOnly,
                required: required,
                results: options,
                theme: theme,
                value: value
            });
        };
        TimePickerBase.prototype.renderNativeInput = function () {
            var _a = this.properties, disabled = _a.disabled, end = _a.end, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, _c = _a.inputProperties, inputProperties = _c === void 0 ? {} : _c, valid = _a.valid, name = _a.name, readOnly = _a.readOnly, required = _a.required, start = _a.start, step = _a.step, value = _a.value, label = _a.label, theme = _a.theme, _d = _a.labelHidden, labelHidden = _d === void 0 ? false : _d, _e = _a.labelAfter, labelAfter = _e === void 0 ? false : _e;
            var focus = this.meta(Focus_1.default).get('root');
            var _f = inputProperties.aria, aria = _f === void 0 ? {} : _f;
            var children = [
                label ? Widget_1.w(index_2.default, {
                    theme: theme,
                    disabled: disabled,
                    focused: focus.containsFocus,
                    valid: valid === true || undefined,
                    readOnly: readOnly,
                    required: required,
                    hidden: labelHidden,
                    forId: widgetId
                }, [label]) : null,
                Widget_1.v('input', tslib_1.__assign({ id: widgetId }, util_1.formatAriaProperties(aria), { 'aria-invalid': valid === false ? 'true' : null, 'aria-readonly': readOnly === true ? 'true' : null, classes: this.theme(css.input), disabled: disabled, valid: valid === true || undefined, key: 'native-input', max: end, min: start, name: name, onblur: this._onNativeBlur, onchange: this._onNativeChange, onfocus: this._onNativeFocus, readOnly: readOnly,
                    required: required,
                    step: step, type: 'time', value: value }))
            ];
            return Widget_1.v('div', {
                key: 'root',
                classes: this.theme(this.getRootClasses())
            }, labelAfter ? children.reverse() : children);
        };
        TimePickerBase.prototype.render = function () {
            var useNativeElement = this.properties.useNativeElement;
            return useNativeElement ? this.renderNativeInput() : this.renderCustomInput();
        };
        tslib_1.__decorate([
            diffProperty_1.diffProperty('start', diff_1.auto),
            diffProperty_1.diffProperty('end', diff_1.auto),
            diffProperty_1.diffProperty('step', diff_1.auto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], TimePickerBase.prototype, "onPropertiesChanged", null);
        TimePickerBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-time-picker',
                properties: [
                    'theme',
                    'extraClasses',
                    'isOptionDisabled',
                    'getOptionLabel',
                    'autoBlur',
                    'clearable',
                    'inputProperties',
                    'openOnFocus',
                    'options',
                    'useNativeElement',
                    'step'
                ],
                attributes: ['widgetId', 'value', 'start', 'end'],
                events: [
                    'onBlur',
                    'onChange',
                    'onFocus',
                    'onMenuChange',
                    'onRequestOptions'
                ]
            }),
            tslib_1.__metadata("design:paramtypes", [])
        ], TimePickerBase);
        return TimePickerBase;
    }(Widget_1.ThemedBase));
    exports.TimePickerBase = TimePickerBase;
    var TimePicker = /** @class */ (function (_super) {
        tslib_1.__extends(TimePicker, _super);
        function TimePicker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TimePicker;
    }(TimePickerBase));
    exports.default = TimePicker;
});
//# sourceMappingURL=index.js.map