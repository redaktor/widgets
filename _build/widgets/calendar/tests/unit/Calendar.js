(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "../support/defaults", "../../index", "../../CalendarCell", "../../DatePicker", "../../../icon/index", "../../../theme/calendar.m.css", "../../../common/styles/base.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var d_1 = require("@dojo/framework/widget-core/d");
    var defaults_1 = require("../support/defaults");
    var index_1 = require("../../index");
    var CalendarCell_1 = require("../../CalendarCell");
    var DatePicker_1 = require("../../DatePicker");
    var index_2 = require("../../../icon/index");
    var css = require("../../../theme/calendar.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var testDate = new Date('June 3 2017');
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareLabelId, test_helpers_1.compareAriaLabelledBy]);
    var dateIndex = -1;
    var expectedDateCell = function (date, active, selectedIndex) {
        if (selectedIndex === void 0) { selectedIndex = 0; }
        dateIndex++;
        return d_1.w(CalendarCell_1.default, {
            key: "date-" + dateIndex,
            callFocus: false,
            date: date,
            disabled: !active,
            focusable: date === 1 && active,
            selected: dateIndex === selectedIndex,
            theme: undefined,
            today: active && new Date().toDateString() === new Date("June " + date + " 2017").toDateString(),
            onClick: test_helpers_1.noop,
            onFocusCalled: test_helpers_1.noop,
            onKeyDown: test_helpers_1.noop
        });
    };
    var expected = function (popupOpen, selectedIndex, weekdayLabel, customMonthLabel, describedby) {
        if (popupOpen === void 0) { popupOpen = false; }
        if (selectedIndex === void 0) { selectedIndex = -1; }
        if (weekdayLabel === void 0) { weekdayLabel = ''; }
        if (customMonthLabel === void 0) { customMonthLabel = false; }
        if (describedby === void 0) { describedby = ''; }
        var overrides = describedby ? { 'aria-describedby': describedby } : {};
        dateIndex = -1;
        return d_1.v('div', tslib_1.__assign({ classes: css.root, dir: '', lang: null }, overrides), [
            d_1.w(DatePicker_1.default, {
                key: 'date-picker',
                labelId: '',
                labels: defaults_1.DEFAULT_LABELS,
                month: 5,
                monthNames: defaults_1.DEFAULT_MONTHS,
                renderMonthLabel: customMonthLabel ? test_helpers_1.noop : undefined,
                theme: undefined,
                year: 2017,
                onPopupChange: test_helpers_1.noop,
                onRequestMonthChange: test_helpers_1.noop,
                onRequestYearChange: test_helpers_1.noop
            }),
            d_1.v('table', {
                cellspacing: '0',
                cellpadding: '0',
                role: 'grid',
                'aria-labelledby': '',
                classes: [css.dateGrid, popupOpen ? baseCss.visuallyHidden : null]
            }, [
                d_1.v('thead', [
                    d_1.v('tr', defaults_1.DEFAULT_WEEKDAYS.map(function (weekday) { return d_1.v('th', {
                        role: 'columnheader',
                        classes: css.weekday
                    }, [
                        weekdayLabel ? weekdayLabel : d_1.v('abbr', { title: weekday.long }, [weekday.short])
                    ]); }))
                ]),
                d_1.v('tbody', [
                    d_1.v('tr', [
                        expectedDateCell(28, false, selectedIndex),
                        expectedDateCell(29, false, selectedIndex),
                        expectedDateCell(30, false, selectedIndex),
                        expectedDateCell(31, false, selectedIndex),
                        expectedDateCell(1, true, selectedIndex),
                        expectedDateCell(2, true, selectedIndex),
                        expectedDateCell(3, true, selectedIndex)
                    ]),
                    d_1.v('tr', [
                        expectedDateCell(4, true, selectedIndex),
                        expectedDateCell(5, true, selectedIndex),
                        expectedDateCell(6, true, selectedIndex),
                        expectedDateCell(7, true, selectedIndex),
                        expectedDateCell(8, true, selectedIndex),
                        expectedDateCell(9, true, selectedIndex),
                        expectedDateCell(10, true, selectedIndex)
                    ]),
                    d_1.v('tr', [
                        expectedDateCell(11, true, selectedIndex),
                        expectedDateCell(12, true, selectedIndex),
                        expectedDateCell(13, true, selectedIndex),
                        expectedDateCell(14, true, selectedIndex),
                        expectedDateCell(15, true, selectedIndex),
                        expectedDateCell(16, true, selectedIndex),
                        expectedDateCell(17, true, selectedIndex)
                    ]),
                    d_1.v('tr', [
                        expectedDateCell(18, true, selectedIndex),
                        expectedDateCell(19, true, selectedIndex),
                        expectedDateCell(20, true, selectedIndex),
                        expectedDateCell(21, true, selectedIndex),
                        expectedDateCell(22, true, selectedIndex),
                        expectedDateCell(23, true, selectedIndex),
                        expectedDateCell(24, true, selectedIndex)
                    ]),
                    d_1.v('tr', [
                        expectedDateCell(25, true, selectedIndex),
                        expectedDateCell(26, true, selectedIndex),
                        expectedDateCell(27, true, selectedIndex),
                        expectedDateCell(28, true, selectedIndex),
                        expectedDateCell(29, true, selectedIndex),
                        expectedDateCell(30, true, selectedIndex),
                        expectedDateCell(1, false, selectedIndex)
                    ]),
                    d_1.v('tr', [
                        expectedDateCell(2, false, selectedIndex),
                        expectedDateCell(3, false, selectedIndex),
                        expectedDateCell(4, false, selectedIndex),
                        expectedDateCell(5, false, selectedIndex),
                        expectedDateCell(6, false, selectedIndex),
                        expectedDateCell(7, false, selectedIndex),
                        expectedDateCell(8, false, selectedIndex)
                    ])
                ])
            ]),
            d_1.v('div', {
                classes: [css.controls, popupOpen ? baseCss.visuallyHidden : null]
            }, [
                d_1.v('button', {
                    classes: css.previous,
                    tabIndex: popupOpen ? -1 : 0,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    d_1.w(index_2.default, { type: 'leftIcon', theme: undefined }),
                    d_1.v('span', { classes: [baseCss.visuallyHidden] }, ['Previous Month'])
                ]),
                d_1.v('button', {
                    classes: css.next,
                    tabIndex: popupOpen ? -1 : 0,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    d_1.w(index_2.default, { type: 'rightIcon', theme: undefined }),
                    d_1.v('span', { classes: [baseCss.visuallyHidden] }, ['Next Month'])
                ])
            ])
        ]);
    };
    registerSuite('Calendar', {
        tests: {
            'Render specific month with default props': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: testDate.getMonth(),
                    year: testDate.getFullYear()
                }); });
                h.expect(expected);
            },
            'Render specific month and year with selectedDate': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    selectedDate: testDate
                }); });
                h.expect(function () { return expected(false, 6); });
            },
            'Renders with custom properties': function () {
                var properties = {
                    aria: { describedBy: 'foo' },
                    labels: defaults_1.DEFAULT_LABELS,
                    month: testDate.getMonth(),
                    monthNames: defaults_1.DEFAULT_MONTHS,
                    selectedDate: new Date('June 1 2017'),
                    weekdayNames: defaults_1.DEFAULT_WEEKDAYS,
                    year: testDate.getFullYear(),
                    renderMonthLabel: function (month, year) { return 'Foo'; },
                    renderWeekdayCell: function (day) { return 'Bar'; }
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.expect(function () { return expected(false, 4, 'Bar', true, 'foo'); });
                properties = {
                    month: testDate.getMonth(),
                    year: testDate.getFullYear()
                };
                h.expect(expected);
            },
            'Click to select date': function () {
                var selectedDate = testDate;
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: testDate.getMonth(),
                    year: testDate.getFullYear(),
                    onDateSelect: function (date) {
                        selectedDate = date;
                    }
                }); });
                h.trigger('@date-4', 'onClick', 1, false);
                assert.strictEqual(selectedDate.getDate(), 1, 'Clicking cell selects correct date');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Clicking active date has correct month');
                assert.strictEqual(selectedDate.getFullYear(), 2017, 'Clicking date keeps current year');
            },
            'Clicking on disabled dates changes month': function () {
                var currentMonth = testDate.getMonth();
                var selectedDate = testDate;
                var properties = {
                    month: currentMonth,
                    year: testDate.getFullYear(),
                    onMonthChange: function (month) {
                        currentMonth = month;
                    },
                    onDateSelect: function (date) {
                        selectedDate = date;
                    }
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger('@date-34', 'onClick', 1, true);
                assert.strictEqual(currentMonth, 6, 'Month changes to July');
                assert.strictEqual(selectedDate.getMonth(), 6, 'selected date in July');
                assert.strictEqual(selectedDate.getDate(), 1, 'selected correct date in July');
                h.trigger('@date-2', 'onClick', 30, true);
                assert.strictEqual(currentMonth, 4, 'Month changes to May');
                assert.strictEqual(selectedDate.getMonth(), 4, 'selected date in May');
                assert.strictEqual(selectedDate.getDate(), 30, 'selected correct date in May');
            },
            'Keyboard date select': function () {
                var selectedDate = testDate;
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: testDate.getMonth(),
                    year: testDate.getFullYear(),
                    onDateSelect: function (date) {
                        selectedDate = date;
                    }
                }); });
                // right arrow, then select
                h.trigger('@date-4', 'onKeyDown', Keys.Right, function () { });
                h.trigger('@date-4', 'onFocusCalled');
                h.trigger('@date-5', 'onKeyDown', Keys.Enter, function () { });
                assert.strictEqual(selectedDate.getDate(), 2, 'Right arrow + enter selects second day');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
                h.trigger('@date-5', 'onKeyDown', Keys.Down, function () { });
                h.trigger('@date-12', 'onKeyDown', Keys.Enter, function () { });
                assert.strictEqual(selectedDate.getDate(), 9, 'Down arrow + enter selects one week down');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
                h.trigger('@date-12', 'onKeyDown', Keys.Left, function () { });
                h.trigger('@date-11', 'onKeyDown', Keys.Space, function () { });
                assert.strictEqual(selectedDate.getDate(), 8, 'Left arrow + space selects previous day');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
                h.trigger('@date-11', 'onKeyDown', Keys.Up, function () { });
                h.trigger('@date-4', 'onKeyDown', Keys.Space, function () { });
                assert.strictEqual(selectedDate.getDate(), 1, 'Left arrow + space selects previous day');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
                h.trigger('@date-4', 'onKeyDown', Keys.PageDown, function () { });
                h.trigger('@date-33', 'onKeyDown', Keys.Space, function () { });
                assert.strictEqual(selectedDate.getDate(), 30, 'Page Down + space selects last day');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
                h.trigger('@date-33', 'onKeyDown', Keys.PageUp, function () { });
                h.trigger('@date-4', 'onKeyDown', Keys.Space, function () { });
                assert.strictEqual(selectedDate.getDate(), 1, 'Page Up + space selects first day');
                assert.strictEqual(selectedDate.getMonth(), 5, 'Selected date is same month');
            },
            'Arrow keys can change month': function () {
                var currentMonth = testDate.getMonth();
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: currentMonth,
                    year: testDate.getFullYear(),
                    onMonthChange: function (month) {
                        currentMonth = month;
                    }
                }); });
                h.trigger('@date-4', 'onKeyDown', Keys.Left, function () { });
                assert.strictEqual(currentMonth, testDate.getMonth() - 1, 'Going left from the first day goes to previous month');
                h.trigger('@date-4', 'onKeyDown', Keys.PageDown, function () { });
                h.trigger('@date-4', 'onKeyDown', Keys.Right, function () { });
                assert.strictEqual(currentMonth, testDate.getMonth(), 'Going right from the last day goes to next month');
            },
            'Month changes wrap and change year': function () {
                var currentMonth = 0;
                var currentYear = 2017;
                var properties = {
                    month: currentMonth,
                    year: currentYear,
                    onMonthChange: function (month) {
                        currentMonth = month;
                    },
                    onYearChange: function (year) {
                        currentYear = year;
                    }
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger('@date-0', 'onKeyDown', Keys.Up, function () { });
                assert.strictEqual(currentMonth, 11, 'Previous month wraps from January to December');
                assert.strictEqual(currentYear, 2016, 'Year decrements when month wraps');
                properties = {
                    month: 11,
                    year: 2017,
                    onMonthChange: function (month) {
                        currentMonth = month;
                    },
                    onYearChange: function (year) {
                        currentYear = year;
                    }
                };
                h.trigger('@date-35', 'onKeyDown', Keys.Down, function () { });
                assert.strictEqual(currentMonth, 0, 'Next month wraps from December to January');
                assert.strictEqual(currentYear, 2018, 'Year increments when month wraps');
            },
            'Month popup events change month and year': function () {
                var currentMonth = testDate.getMonth();
                var currentYear = testDate.getFullYear();
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: currentMonth,
                    year: currentYear,
                    onMonthChange: function (month) {
                        currentMonth = month;
                    },
                    onYearChange: function (year) {
                        currentYear = year;
                    }
                }); });
                h.trigger('@date-picker', 'onRequestMonthChange', 2);
                assert.strictEqual(currentMonth, 2, 'Popup month change event triggers calendar month change event');
                h.trigger('@date-picker', 'onRequestYearChange', 2018);
                assert.strictEqual(currentYear, 2018, 'Popup year change triggers calendar year change');
            },
            'Previous button should decrement month': function () {
                var currentMonth = testDate.getMonth();
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: currentMonth,
                    onMonthChange: function (month) {
                        currentMonth = month;
                    }
                }); });
                h.trigger("." + css.previous, 'onclick', test_helpers_1.stubEvent);
                assert.strictEqual(currentMonth, testDate.getMonth() - 1, 'Previous button decrements month');
            },
            'Next button should increment month': function () {
                var currentMonth = testDate.getMonth();
                var h = harness(function () { return d_1.w(index_1.default, {
                    month: currentMonth,
                    onMonthChange: function (month) {
                        currentMonth = month;
                    }
                }); });
                h.trigger("." + css.next, 'onclick', test_helpers_1.stubEvent);
                assert.strictEqual(currentMonth, testDate.getMonth() + 1, 'Next button increments month');
            },
            'onPopupChange should control visibility': function () {
                var properties = {};
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger('@date-picker', 'onPopupChange', true);
                properties = {
                    month: testDate.getMonth(),
                    year: testDate.getFullYear()
                };
                h.expect(function () { return expected(true); });
            }
        }
    });
});
//# sourceMappingURL=Calendar.js.map