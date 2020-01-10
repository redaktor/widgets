(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "@dojo/framework/widget-core/meta/Focus", "../../framework/uuid", "../icon/index", "../common/styles/base.m.css", "../themes/redaktor-default/calendar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var uuid_1 = require("../../framework/uuid");
    var index_1 = require("../icon/index");
    var baseCss = require("../common/styles/base.m.css");
    var css = require("../themes/redaktor-default/calendar.m.css");
    /**
     * Enum for next/previous buttons
     */
    var Paging;
    (function (Paging) {
        Paging["next"] = "next";
        Paging["previous"] = "previous";
    })(Paging = exports.Paging || (exports.Paging = {}));
    /**
     * Enum for month or year controls
     */
    var Controls;
    (function (Controls) {
        Controls["month"] = "month";
        Controls["year"] = "year";
    })(Controls = exports.Controls || (exports.Controls = {}));
    var BASE_YEAR = 2000;
    var DatePickerBase = /** @class */ (function (_super) {
        tslib_1.__extends(DatePickerBase, _super);
        function DatePickerBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._idBase = uuid_1.default();
            _this._monthPopupOpen = false;
            _this._yearPopupOpen = false;
            _this._yearPage = 0;
            return _this;
        }
        DatePickerBase.prototype._closeMonthPopup = function (event) {
            if (event) {
                event.stopPropagation();
            }
            var onPopupChange = this.properties.onPopupChange;
            this._monthPopupOpen = false;
            this.meta(Focus_1.default).set('month-button');
            this.invalidate();
            onPopupChange && onPopupChange(this._getPopupState());
        };
        DatePickerBase.prototype._closeYearPopup = function (event) {
            if (event) {
                event.stopPropagation();
            }
            var onPopupChange = this.properties.onPopupChange;
            this._yearPopupOpen = false;
            this.meta(Focus_1.default).set('year-button');
            this.invalidate();
            onPopupChange && onPopupChange(this._getPopupState());
        };
        DatePickerBase.prototype._getMonthInputKey = function (month) {
            return this._idBase + "_month_input_" + month;
        };
        DatePickerBase.prototype._getPopupState = function () {
            return this._monthPopupOpen || this._yearPopupOpen;
        };
        DatePickerBase.prototype._getYearInputKey = function (year) {
            return this._idBase + "_year_input_" + year;
        };
        DatePickerBase.prototype._getYearRange = function () {
            var _a = this.properties, year = _a.year, _b = _a.yearRange, yearRange = _b === void 0 ? 20 : _b;
            var offset = (year - BASE_YEAR) % yearRange - yearRange * this._yearPage;
            if (year >= BASE_YEAR) {
                return { first: year - offset, last: year + yearRange - offset };
            }
            else {
                return { first: year - (yearRange + offset), last: year - offset };
            }
        };
        DatePickerBase.prototype._onMonthButtonClick = function (event) {
            event.stopPropagation();
            this._monthPopupOpen ? this._closeMonthPopup() : this._openMonthPopup();
        };
        DatePickerBase.prototype._onMonthRadioChange = function (event) {
            event.stopPropagation();
            var onRequestMonthChange = this.properties.onRequestMonthChange;
            onRequestMonthChange && onRequestMonthChange(parseInt(event.target.value, 10));
        };
        DatePickerBase.prototype._onPopupKeyDown = function (event) {
            event.stopPropagation();
            // close popup on escape, or if a value is selected with enter/space
            if (util_1.keyName(event, 'Escape', 'Enter', ' ')) {
                this._monthPopupOpen && this._closeMonthPopup();
                this._yearPopupOpen && this._closeYearPopup();
            }
        };
        DatePickerBase.prototype._onYearButtonClick = function (event) {
            event.stopPropagation();
            this._yearPopupOpen ? this._closeYearPopup() : this._openYearPopup();
        };
        DatePickerBase.prototype._onYearPageDown = function (event) {
            event.stopPropagation();
            this._yearPage--;
            this._yearPopupOpen && this.invalidate();
        };
        DatePickerBase.prototype._onYearPageUp = function (event) {
            event.stopPropagation();
            this._yearPage++;
            this._yearPopupOpen && this.invalidate();
        };
        DatePickerBase.prototype._onYearRadioChange = function (event) {
            event.stopPropagation();
            var onRequestYearChange = this.properties.onRequestYearChange;
            this._yearPage = 0;
            onRequestYearChange && onRequestYearChange(parseInt(event.target.value, 10));
        };
        DatePickerBase.prototype._openMonthPopup = function () {
            var _a = this.properties, month = _a.month, onPopupChange = _a.onPopupChange;
            this._monthPopupOpen = true;
            this.meta(Focus_1.default).set(this._getMonthInputKey(month));
            this._yearPopupOpen = false;
            this.invalidate();
            onPopupChange && onPopupChange(this._getPopupState());
        };
        DatePickerBase.prototype._openYearPopup = function () {
            var _a = this.properties, year = _a.year, onPopupChange = _a.onPopupChange;
            this._yearPopupOpen = true;
            this.meta(Focus_1.default).set(this._getYearInputKey(year));
            this._monthPopupOpen = false;
            this.invalidate();
            onPopupChange && onPopupChange(this._getPopupState());
        };
        DatePickerBase.prototype.renderControlsTrigger = function (type) {
            var _a = this.properties, month = _a.month, monthNames = _a.monthNames, year = _a.year;
            var content = type === Controls.month ? monthNames[month].long : "" + year;
            var open = type === Controls.month ? this._monthPopupOpen : this._yearPopupOpen;
            var onclick = type === Controls.month ? this._onMonthButtonClick : this._onYearButtonClick;
            return Widget_1.v('button', {
                key: type + "-button",
                'aria-controls': this._idBase + "_" + type + "_dialog",
                'aria-expanded': "" + open,
                'aria-haspopup': 'true',
                id: this._idBase + "_" + type + "_button",
                classes: this.theme([
                    css[type + "Trigger"],
                    open ? css[type + "TriggerActive"] : null
                ]),
                role: 'menuitem',
                type: 'button',
                onclick: onclick
            }, [content]);
        };
        DatePickerBase.prototype.renderMonthLabel = function (month, year) {
            var _a = this.properties, monthNames = _a.monthNames, renderMonthLabel = _a.renderMonthLabel;
            return renderMonthLabel ? renderMonthLabel(month, year) : monthNames[month].long + " " + year;
        };
        DatePickerBase.prototype.renderMonthRadios = function () {
            var _this = this;
            var month = this.properties.month;
            return this.properties.monthNames.map(function (monthName, i) { return Widget_1.v('label', {
                key: _this._idBase + "_month_radios_" + i,
                classes: _this.theme([css.monthRadio, i === month ? css.monthRadioChecked : null])
            }, [
                Widget_1.v('input', {
                    checked: i === month,
                    classes: _this.theme(css.monthRadioInput),
                    key: _this._getMonthInputKey(i),
                    name: _this._idBase + "_month_radios",
                    tabIndex: _this._monthPopupOpen ? 0 : -1,
                    type: 'radio',
                    value: "" + i,
                    onchange: _this._onMonthRadioChange,
                    onmouseup: _this._closeMonthPopup
                }),
                Widget_1.v('abbr', {
                    classes: _this.theme(css.monthRadioLabel),
                    title: monthName.long
                }, [monthName.short])
            ]); });
        };
        DatePickerBase.prototype.renderPagingButtonContent = function (type) {
            var labels = this.properties.labels;
            var iconType = type === Paging.next ? 'rightIcon' : 'leftIcon';
            var labelText = type === Paging.next ? labels.nextYears : labels.previousYears;
            return [
                Widget_1.w(index_1.default, { type: iconType, theme: undefined }),
                Widget_1.v('span', { classes: baseCss.visuallyHidden }, [labelText])
            ];
        };
        DatePickerBase.prototype.renderYearRadios = function () {
            var year = this.properties.year;
            var radios = [];
            var yearLimits = this._getYearRange();
            for (var i = yearLimits.first; i < yearLimits.last; i++) {
                radios.push(Widget_1.v('label', {
                    key: this._idBase + "_year_radios_" + i,
                    classes: this.theme([css.yearRadio, i === year ? css.yearRadioChecked : null])
                }, [
                    Widget_1.v('input', {
                        checked: i === year,
                        classes: this.theme(css.yearRadioInput),
                        key: this._getYearInputKey(i),
                        name: this._idBase + "_year_radios",
                        tabIndex: this._yearPopupOpen ? 0 : -1,
                        type: 'radio',
                        value: "" + i,
                        onchange: this._onYearRadioChange,
                        onmouseup: this._closeYearPopup
                    }),
                    Widget_1.v('abbr', {
                        classes: this.theme(css.yearRadioLabel)
                    }, ["" + i])
                ]));
            }
            return radios;
        };
        DatePickerBase.prototype.render = function () {
            var _a = this.properties, _b = _a.labelId, labelId = _b === void 0 ? this._idBase + "_label" : _b, labels = _a.labels, month = _a.month, year = _a.year;
            return Widget_1.v('div', {
                classes: this.theme(css.datePicker)
            }, [
                Widget_1.v('div', {
                    classes: this.theme(css.topMatter),
                    role: 'menubar'
                }, [
                    // hidden label
                    Widget_1.v('label', {
                        id: labelId,
                        classes: [baseCss.visuallyHidden],
                        'aria-live': 'polite',
                        'aria-atomic': 'false'
                    }, [this.renderMonthLabel(month, year)]),
                    // month trigger
                    this.renderControlsTrigger(Controls.month),
                    // year trigger
                    this.renderControlsTrigger(Controls.year)
                ]),
                // month grid
                Widget_1.v('div', {
                    key: 'month-grid',
                    'aria-hidden': "" + !this._monthPopupOpen,
                    'aria-labelledby': this._idBase + "_month_button",
                    classes: [this.theme(css.monthGrid), !this._monthPopupOpen ? baseCss.visuallyHidden : null],
                    id: this._idBase + "_month_dialog",
                    role: 'dialog'
                }, [
                    Widget_1.v('fieldset', {
                        classes: this.theme(css.monthFields),
                        onkeydown: this._onPopupKeyDown
                    }, tslib_1.__spread([
                        Widget_1.v('legend', { classes: baseCss.visuallyHidden }, [labels.chooseMonth])
                    ], this.renderMonthRadios()))
                ]),
                // year grid
                Widget_1.v('div', {
                    key: 'year-grid',
                    'aria-hidden': "" + !this._yearPopupOpen,
                    'aria-labelledby': this._idBase + "_year_button",
                    classes: [this.theme(css.yearGrid), !this._yearPopupOpen ? baseCss.visuallyHidden : null],
                    id: this._idBase + "_year_dialog",
                    role: 'dialog'
                }, [
                    Widget_1.v('fieldset', {
                        classes: this.theme(css.yearFields),
                        onkeydown: this._onPopupKeyDown
                    }, tslib_1.__spread([
                        Widget_1.v('legend', { classes: [baseCss.visuallyHidden] }, [labels.chooseYear])
                    ], this.renderYearRadios())),
                    Widget_1.v('div', {
                        classes: this.theme(css.controls)
                    }, [
                        Widget_1.v('button', {
                            classes: this.theme(css.previous),
                            tabIndex: this._yearPopupOpen ? 0 : -1,
                            type: 'button',
                            onclick: this._onYearPageDown
                        }, this.renderPagingButtonContent(Paging.previous)),
                        Widget_1.v('button', {
                            classes: this.theme(css.next),
                            tabIndex: this._yearPopupOpen ? 0 : -1,
                            type: 'button',
                            onclick: this._onYearPageUp
                        }, this.renderPagingButtonContent(Paging.next))
                    ])
                ])
            ]);
        };
        DatePickerBase = tslib_1.__decorate([
            Widget_1.theme(css)
        ], DatePickerBase);
        return DatePickerBase;
    }(Widget_1.ThemedBase));
    exports.DatePickerBase = DatePickerBase;
    var DatePicker = /** @class */ (function (_super) {
        tslib_1.__extends(DatePicker, _super);
        function DatePicker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DatePicker;
    }(DatePickerBase));
    exports.default = DatePicker;
});
//# sourceMappingURL=DatePicker.js.map