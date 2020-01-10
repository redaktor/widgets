(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/nls/common", "./nls/Calendar", "@dojo/framework/widget-core/mixins/I18n", "../../framework/uuid", "./CalendarCell", "./DatePicker", "../icon/index", "../themes/redaktor-default/calendar.m.css", "../common/styles/base.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var common_1 = require("../common/nls/common");
    var Calendar_1 = require("./nls/Calendar");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var uuid_1 = require("../../framework/uuid");
    var CalendarCell_1 = require("./CalendarCell");
    var DatePicker_1 = require("./DatePicker");
    var index_1 = require("../icon/index");
    var css = require("../themes/redaktor-default/calendar.m.css");
    var baseCss = require("../common/styles/base.m.css");
    var DEFAULT_MONTHS = [
        { short: 'janShort', long: 'january' },
        { short: 'febShort', long: 'february' },
        { short: 'marShort', long: 'march' },
        { short: 'aprShort', long: 'april' },
        { short: 'mayShort', long: 'may' },
        { short: 'junShort', long: 'june' },
        { short: 'julShort', long: 'july' },
        { short: 'augShort', long: 'august' },
        { short: 'sepShort', long: 'september' },
        { short: 'octShort', long: 'october' },
        { short: 'novShort', long: 'november' },
        { short: 'decShort', long: 'december' }
    ];
    var DEFAULT_WEEKDAYS = [
        { short: 'sunShort', long: 'sunday' },
        { short: 'monShort', long: 'monday' },
        { short: 'tueShort', long: 'tuesday' },
        { short: 'wedShort', long: 'wednesday' },
        { short: 'thuShort', long: 'thursday' },
        { short: 'friShort', long: 'friday' },
        { short: 'satShort', long: 'saturday' }
    ];
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.ThemedBase);
    var CalendarBase = /** @class */ (function (_super) {
        tslib_1.__extends(CalendarBase, _super);
        function CalendarBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._callDateFocus = false;
            _this._defaultDate = new Date();
            _this._focusedDay = 1;
            _this._monthLabelId = uuid_1.default();
            _this._popupOpen = false;
            return _this;
        }
        CalendarBase.prototype._getMonthLength = function (month, year) {
            var lastDate = new Date(year, month + 1, 0);
            return lastDate.getDate();
        };
        CalendarBase.prototype._getMonths = function (commonMessages) {
            return DEFAULT_MONTHS.map(function (month) { return ({
                short: commonMessages[month.short],
                long: commonMessages[month.long]
            }); });
        };
        CalendarBase.prototype._getMonthYear = function () {
            var _a = this.properties, month = _a.month, _b = _a.selectedDate, selectedDate = _b === void 0 ? this._defaultDate : _b, year = _a.year;
            return {
                month: typeof month === 'number' ? month : selectedDate.getMonth(),
                year: typeof year === 'number' ? year : selectedDate.getFullYear()
            };
        };
        CalendarBase.prototype._getWeekdays = function (commonMessages) {
            return DEFAULT_WEEKDAYS.map(function (weekday) { return ({
                short: commonMessages[weekday.short],
                long: commonMessages[weekday.long]
            }); });
        };
        CalendarBase.prototype._goToDate = function (day) {
            var _a = this._getMonthYear(), month = _a.month, year = _a.year;
            var currentMonthLength = this._getMonthLength(month, year);
            var previousMonthLength = this._getMonthLength(month - 1, year);
            if (day < 1) {
                this._onMonthDecrement();
                day += previousMonthLength;
            }
            else if (day > currentMonthLength) {
                this._onMonthIncrement();
                day -= currentMonthLength;
            }
            this._focusedDay = day;
            this._callDateFocus = true;
            this.invalidate();
        };
        CalendarBase.prototype._onDateClick = function (date, disabled) {
            var _a, _b;
            var onDateSelect = this.properties.onDateSelect;
            var _c = this._getMonthYear(), month = _c.month, year = _c.year;
            if (disabled && date < 15) {
                (((((((((((((_a = this._onMonthIncrement(), month = _a.month, year = _a.year)))))))))))));
                this._callDateFocus = true;
            }
            else if (disabled && date >= 15) {
                (((((((((((((_b = this._onMonthDecrement(), month = _b.month, year = _b.year)))))))))))));
                this._callDateFocus = true;
            }
            this._focusedDay = date;
            onDateSelect && onDateSelect(new Date(year, month, date));
        };
        CalendarBase.prototype._onDateFocusCalled = function () {
            this._callDateFocus = false;
        };
        CalendarBase.prototype._onDateKeyDown = function (event, preventDefault) {
            var key = util_1.keyName(event);
            var _a = this._getMonthYear(), month = _a.month, year = _a.year;
            switch (key) {
                case 'ArrowUp':
                    preventDefault();
                    this._goToDate(this._focusedDay - 7);
                    break;
                case 'ArrowDown':
                    preventDefault();
                    this._goToDate(this._focusedDay + 7);
                    break;
                case 'ArrowLeft':
                    preventDefault();
                    this._goToDate(this._focusedDay - 1);
                    break;
                case 'ArrowRight':
                    preventDefault();
                    this._goToDate(this._focusedDay + 1);
                    break;
                case 'PageUp':
                    preventDefault();
                    this._goToDate(1);
                    break;
                case 'PageDown':
                    preventDefault();
                    var monthLengh = this._getMonthLength(month, year);
                    this._goToDate(monthLengh);
                    break;
                case 'Enter':
                case ' ':
                    var onDateSelect = this.properties.onDateSelect;
                    onDateSelect && onDateSelect(new Date(year, month, this._focusedDay));
            }
        };
        CalendarBase.prototype._onMonthDecrement = function () {
            var _a = this._getMonthYear(), month = _a.month, year = _a.year;
            var _b = this.properties, onMonthChange = _b.onMonthChange, onYearChange = _b.onYearChange;
            if (month === 0) {
                onMonthChange && onMonthChange(11);
                onYearChange && onYearChange(year - 1);
                return { month: 11, year: year - 1 };
            }
            onMonthChange && onMonthChange(month - 1);
            return { month: month - 1, year: year };
        };
        CalendarBase.prototype._onMonthIncrement = function () {
            var _a = this._getMonthYear(), month = _a.month, year = _a.year;
            var _b = this.properties, onMonthChange = _b.onMonthChange, onYearChange = _b.onYearChange;
            if (month === 11) {
                onMonthChange && onMonthChange(0);
                onYearChange && onYearChange(year + 1);
                return { month: 0, year: year + 1 };
            }
            onMonthChange && onMonthChange(month + 1);
            return { month: month + 1, year: year };
        };
        CalendarBase.prototype._onMonthPageDown = function (event) {
            event.stopPropagation();
            this._onMonthDecrement();
        };
        CalendarBase.prototype._onMonthPageUp = function (event) {
            event.stopPropagation();
            this._onMonthIncrement();
        };
        CalendarBase.prototype._renderDateGrid = function (selectedDate) {
            var _a = this._getMonthYear(), month = _a.month, year = _a.year;
            var currentMonthLength = this._getMonthLength(month, year);
            var previousMonthLength = this._getMonthLength(month - 1, year);
            var initialWeekday = new Date(year, month, 1).getDay();
            var todayString = new Date().toDateString();
            var dayIndex = 0;
            var date = initialWeekday > 0 ? previousMonthLength - initialWeekday : 0;
            var isCurrentMonth = initialWeekday > 0 ? false : true;
            var isSelectedDay;
            var weeks = [];
            var days;
            var dateString;
            var i;
            for (var week = 0; week < 6; week++) {
                days = [];
                for (i = 0; i < 7; i++) {
                    // find the next date
                    // if we've reached the end of the previous month, reset to 1
                    if (date > dayIndex && date >= previousMonthLength) {
                        date = 1;
                        isCurrentMonth = true;
                    }
                    // if we've reached the end of the current month, reset to 1
                    else if (date <= dayIndex && date >= currentMonthLength) {
                        date = 1;
                        isCurrentMonth = false;
                    }
                    else {
                        date++;
                    }
                    dayIndex++;
                    // set isSelectedDay if the dates match
                    dateString = new Date(year, month, date).toDateString();
                    if (isCurrentMonth && selectedDate && dateString === selectedDate.toDateString()) {
                        isSelectedDay = true;
                    }
                    else {
                        isSelectedDay = false;
                    }
                    var isToday = isCurrentMonth && dateString === todayString;
                    days.push(this.renderDateCell(date, week * 7 + i, isSelectedDay, isCurrentMonth, isToday));
                }
                weeks.push(Widget_1.v('tr', days));
            }
            return weeks;
        };
        CalendarBase.prototype.renderDateCell = function (date, index, selected, currentMonth, today) {
            var theme = this.properties.theme;
            return Widget_1.w(CalendarCell_1.default, {
                key: "date-" + index,
                callFocus: this._callDateFocus && currentMonth && date === this._focusedDay,
                date: date,
                disabled: !currentMonth,
                focusable: currentMonth && date === this._focusedDay,
                selected: selected,
                theme: theme,
                today: today,
                onClick: this._onDateClick,
                onFocusCalled: this._onDateFocusCalled,
                onKeyDown: this._onDateKeyDown
            });
        };
        CalendarBase.prototype.renderDatePicker = function (commonMessages, labels) {
            var _this = this;
            var _a = this.properties, _b = _a.monthNames, monthNames = _b === void 0 ? this._getMonths(commonMessages) : _b, renderMonthLabel = _a.renderMonthLabel, theme = _a.theme, onMonthChange = _a.onMonthChange, onYearChange = _a.onYearChange;
            var _c = this._getMonthYear(), month = _c.month, year = _c.year;
            return Widget_1.w(DatePicker_1.default, {
                key: 'date-picker',
                labelId: this._monthLabelId,
                labels: labels,
                month: month,
                monthNames: monthNames,
                renderMonthLabel: renderMonthLabel,
                theme: theme,
                year: year,
                onPopupChange: function (open) {
                    _this._popupOpen = open;
                },
                onRequestMonthChange: function (requestMonth) {
                    onMonthChange && onMonthChange(requestMonth);
                },
                onRequestYearChange: function (requestYear) {
                    onYearChange && onYearChange(requestYear);
                }
            });
        };
        CalendarBase.prototype.renderPagingButtonContent = function (type, labels) {
            var theme = this.properties.theme;
            var iconType = type === DatePicker_1.Paging.next ? 'rightIcon' : 'leftIcon';
            var labelText = type === DatePicker_1.Paging.next ? labels.nextMonth : labels.previousMonth;
            return [
                Widget_1.w(index_1.default, { type: iconType, theme: undefined }),
                Widget_1.v('span', { classes: [baseCss.visuallyHidden] }, [labelText])
            ];
        };
        CalendarBase.prototype.renderWeekdayCell = function (day) {
            var renderWeekdayCell = this.properties.renderWeekdayCell;
            return renderWeekdayCell ? renderWeekdayCell(day) : Widget_1.v('abbr', { title: day.long }, [day.short]);
        };
        CalendarBase.prototype.render = function () {
            var commonMessages = this.localizeBundle(common_1.default).messages;
            var _a = this.properties, _b = _a.labels, labels = _b === void 0 ? this.localizeBundle(Calendar_1.default).messages : _b, _c = _a.aria, aria = _c === void 0 ? {} : _c, selectedDate = _a.selectedDate, _d = _a.weekdayNames, weekdayNames = _d === void 0 ? this._getWeekdays(commonMessages) : _d;
            // Calendar Weekday array
            var weekdays = [];
            for (var weekday in weekdayNames) {
                weekdays.push(Widget_1.v('th', {
                    role: 'columnheader',
                    classes: this.theme(css.weekday)
                }, [
                    this.renderWeekdayCell(weekdayNames[weekday])
                ]));
            }
            return Widget_1.v('div', tslib_1.__assign({ classes: this.theme(css.root) }, util_1.formatAriaProperties(aria)), [
                // header
                this.renderDatePicker(commonMessages, labels),
                // date table
                Widget_1.v('table', {
                    cellspacing: '0',
                    cellpadding: '0',
                    role: 'grid',
                    'aria-labelledby': this._monthLabelId,
                    classes: [this.theme(css.dateGrid), this._popupOpen ? baseCss.visuallyHidden : null]
                }, [
                    Widget_1.v('thead', [
                        Widget_1.v('tr', weekdays)
                    ]),
                    Widget_1.v('tbody', this._renderDateGrid(selectedDate))
                ]),
                // controls
                Widget_1.v('div', {
                    classes: [this.theme(css.controls), this._popupOpen ? baseCss.visuallyHidden : null]
                }, [
                    Widget_1.v('button', {
                        classes: this.theme(css.previous),
                        tabIndex: this._popupOpen ? -1 : 0,
                        type: 'button',
                        onclick: this._onMonthPageDown
                    }, this.renderPagingButtonContent(DatePicker_1.Paging.previous, labels)),
                    Widget_1.v('button', {
                        classes: this.theme(css.next),
                        tabIndex: this._popupOpen ? -1 : 0,
                        type: 'button',
                        onclick: this._onMonthPageUp
                    }, this.renderPagingButtonContent(DatePicker_1.Paging.next, labels))
                ])
            ]);
        };
        CalendarBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-calendar',
                properties: [
                    'aria',
                    'selectedDate',
                    'month',
                    'year',
                    'renderMonthLabel',
                    'renderWeekdayCell',
                    'labels',
                    'monthNames',
                    'weekdayNames',
                    'theme'
                ],
                events: ['onDateSelect', 'onMonthChange', 'onYearChange']
            })
        ], CalendarBase);
        return CalendarBase;
    }(exports.i18nBase));
    exports.CalendarBase = CalendarBase;
    var Calendar = /** @class */ (function (_super) {
        tslib_1.__extends(Calendar, _super);
        function Calendar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Calendar;
    }(CalendarBase));
    exports.default = Calendar;
});
//# sourceMappingURL=index.js.map