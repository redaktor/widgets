(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../../common/util", "../support/defaults", "../../DatePicker", "../../../icon/index", "../../../themes/redaktor-default/calendar.m.css", "../../../common/styles/base.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var util_1 = require("../../../common/util");
    var defaults_1 = require("../support/defaults");
    var DatePicker_1 = require("../../DatePicker");
    var index_1 = require("../../../icon/index");
    var css = require("../../../themes/redaktor-default/calendar.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var testDate = new Date('June 3 2017');
    var requiredProps = {
        labels: defaults_1.DEFAULT_LABELS,
        month: testDate.getMonth(),
        monthNames: defaults_1.DEFAULT_MONTHS,
        year: testDate.getFullYear()
    };
    var customProps = {};
    var compareKey = { selector: 'label,input', property: 'key', comparator: function (property) { return typeof property === 'string'; } };
    var compareName = { selector: 'input', property: 'name', comparator: function (property) { return typeof property === 'string'; } };
    var monthRadios = function (open) {
        return defaults_1.DEFAULT_MONTHS.map(function (monthName, i) { return d_1.v('label', {
            key: '',
            classes: [css.monthRadio, i === 5 ? css.monthRadioChecked : null]
        }, [
            d_1.v('input', {
                checked: i === 5,
                classes: css.monthRadioInput,
                key: '',
                name: '',
                tabIndex: open ? 0 : -1,
                type: 'radio',
                value: "" + i,
                onchange: test_helpers_1.noop,
                onmouseup: test_helpers_1.noop
            }),
            d_1.v('abbr', {
                classes: css.monthRadioLabel,
                title: monthName.long
            }, [monthName.short])
        ]); });
    };
    var yearRadios = function (open, yearStart, yearEnd, checkedYear) {
        if (yearStart === void 0) { yearStart = 2000; }
        if (yearEnd === void 0) { yearEnd = 2020; }
        if (checkedYear === void 0) { checkedYear = 2017; }
        var radios = [];
        for (var i = yearStart; i < yearEnd; i++) {
            radios.push(d_1.v('label', {
                key: '',
                classes: [css.yearRadio, i === checkedYear ? css.yearRadioChecked : null]
            }, [
                d_1.v('input', {
                    checked: i === checkedYear,
                    classes: css.yearRadioInput,
                    tabIndex: open ? 0 : -1,
                    type: 'radio',
                    key: '',
                    name: '',
                    value: "" + i,
                    onchange: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop
                }),
                d_1.v('abbr', {
                    classes: css.yearRadioLabel
                }, ["" + i])
            ]));
        }
        return radios;
    };
    var expectedMonthPopup = function (open) {
        return d_1.v('div', {
            id: '',
            key: 'month-grid',
            'aria-hidden': "" + !open,
            'aria-labelledby': '',
            classes: [css.monthGrid, !open ? baseCss.visuallyHidden : null],
            role: 'dialog'
        }, [
            d_1.v('fieldset', {
                classes: css.monthFields,
                onkeydown: test_helpers_1.noop
            }, tslib_1.__spread([
                d_1.v('legend', {
                    classes: baseCss.visuallyHidden
                }, [defaults_1.DEFAULT_LABELS.chooseMonth])
            ], monthRadios(open)))
        ]);
    };
    var expectedYearPopup = function (open, yearStart, yearEnd) {
        return d_1.v('div', {
            key: 'year-grid',
            'aria-hidden': "" + !open,
            'aria-labelledby': '',
            classes: [css.yearGrid, !open ? baseCss.visuallyHidden : null],
            id: '',
            role: 'dialog'
        }, [
            d_1.v('fieldset', {
                classes: css.yearFields,
                onkeydown: test_helpers_1.noop
            }, tslib_1.__spread([
                d_1.v('legend', { classes: [baseCss.visuallyHidden] }, [defaults_1.DEFAULT_LABELS.chooseYear])
            ], yearRadios(open, yearStart, yearEnd))),
            d_1.v('div', {
                classes: css.controls
            }, [
                d_1.v('button', {
                    classes: css.previous,
                    tabIndex: open ? 0 : -1,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    d_1.w(index_1.default, { type: 'leftIcon', theme: undefined }),
                    d_1.v('span', { classes: baseCss.visuallyHidden }, [defaults_1.DEFAULT_LABELS.previousYears])
                ]),
                d_1.v('button', {
                    classes: css.next,
                    tabIndex: open ? 0 : -1,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    d_1.w(index_1.default, { type: 'rightIcon', theme: undefined }),
                    d_1.v('span', { classes: baseCss.visuallyHidden }, [defaults_1.DEFAULT_LABELS.nextYears])
                ])
            ])
        ]);
    };
    var expected = function (monthOpen, yearOpen, options) {
        if (monthOpen === void 0) { monthOpen = false; }
        if (yearOpen === void 0) { yearOpen = false; }
        if (options === void 0) { options = {}; }
        var yearStart = options.yearStart, yearEnd = options.yearEnd, _a = options.monthLabel, monthLabel = _a === void 0 ? 'June 2017' : _a;
        // new
        return d_1.v('div', {
            classes: css.datePicker
        }, [
            d_1.v('div', {
                classes: css.topMatter,
                role: 'menubar'
            }, [
                // hidden label
                d_1.v('label', {
                    id: customProps.labelId ? customProps.labelId : '',
                    classes: [baseCss.visuallyHidden],
                    'aria-live': 'polite',
                    'aria-atomic': 'false'
                }, [monthLabel]),
                // month trigger
                d_1.v('button', {
                    key: 'month-button',
                    'aria-controls': '',
                    'aria-expanded': "" + monthOpen,
                    'aria-haspopup': 'true',
                    id: '',
                    classes: [css.monthTrigger, monthOpen ? css.monthTriggerActive : null],
                    role: 'menuitem',
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, ['June']),
                // year trigger
                d_1.v('button', {
                    key: 'year-button',
                    'aria-controls': '',
                    'aria-expanded': "" + yearOpen,
                    'aria-haspopup': 'true',
                    id: '',
                    classes: [css.yearTrigger, yearOpen ? css.yearTriggerActive : null],
                    role: 'menuitem',
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, ['2017'])
            ]),
            // month picker
            expectedMonthPopup(monthOpen),
            // year picker
            expectedYearPopup(yearOpen, yearStart, yearEnd)
        ]);
    };
    registerSuite('Calendar DatePicker', {
        tests: {
            'Popup should render with default properties': function () {
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({}, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.expect(function () { return expected(); });
            },
            'Popup should render with custom properties': function () {
                customProps = {
                    labelId: 'foo',
                    yearRange: 25
                };
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ renderMonthLabel: function () { return 'bar'; } }, customProps, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.expect(function () { return expected(false, false, { yearStart: 2000, yearEnd: 2025, monthLabel: 'bar' }); });
            },
            'Year below 2000 calculates correctly': function () {
                var properties = tslib_1.__assign({}, requiredProps);
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, properties); }, [
                    compareKey, compareName, test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls
                ]);
                h.expect(expected);
                properties = tslib_1.__assign({}, requiredProps, { year: 1997 });
                h.expect(function () { return d_1.v('div', {
                    classes: css.datePicker
                }, [
                    d_1.v('div', {
                        classes: css.topMatter,
                        role: 'menubar'
                    }, [
                        // hidden label
                        d_1.v('label', {
                            id: '',
                            classes: [baseCss.visuallyHidden],
                            'aria-live': 'polite',
                            'aria-atomic': 'false'
                        }, ['June 1997']),
                        // month trigger
                        d_1.v('button', {
                            key: 'month-button',
                            'aria-controls': '',
                            'aria-expanded': 'false',
                            'aria-haspopup': 'true',
                            id: '',
                            classes: [css.monthTrigger, null],
                            role: 'menuitem',
                            type: 'button',
                            onclick: test_helpers_1.noop
                        }, ['June']),
                        // year trigger
                        d_1.v('button', {
                            key: 'year-button',
                            'aria-controls': '',
                            'aria-expanded': 'false',
                            'aria-haspopup': 'true',
                            id: '',
                            classes: [css.yearTrigger, null],
                            role: 'menuitem',
                            type: 'button',
                            onclick: test_helpers_1.noop
                        }, ['1997'])
                    ]),
                    d_1.v('div', {
                        id: '',
                        key: 'month-grid',
                        'aria-hidden': 'true',
                        'aria-labelledby': '',
                        classes: [css.monthGrid, baseCss.visuallyHidden],
                        role: 'dialog'
                    }, [
                        d_1.v('fieldset', {
                            classes: css.monthFields,
                            onkeydown: test_helpers_1.noop
                        }, tslib_1.__spread([
                            d_1.v('legend', {
                                classes: baseCss.visuallyHidden
                            }, [defaults_1.DEFAULT_LABELS.chooseMonth])
                        ], defaults_1.DEFAULT_MONTHS.map(function (monthName, i) { return d_1.v('label', {
                            key: '',
                            classes: [css.monthRadio, i === 5 ? css.monthRadioChecked : null]
                        }, [
                            d_1.v('input', {
                                checked: i === 5,
                                classes: css.monthRadioInput,
                                key: '',
                                name: '',
                                tabIndex: -1,
                                type: 'radio',
                                value: "" + i,
                                onchange: test_helpers_1.noop,
                                onmouseup: test_helpers_1.noop
                            }),
                            d_1.v('abbr', {
                                classes: css.monthRadioLabel,
                                title: monthName.long
                            }, [monthName.short])
                        ]); })))
                    ]),
                    d_1.v('div', {
                        key: 'year-grid',
                        'aria-hidden': 'true',
                        'aria-labelledby': '',
                        classes: [css.yearGrid, baseCss.visuallyHidden],
                        id: '',
                        role: 'dialog'
                    }, [
                        d_1.v('fieldset', {
                            classes: css.yearFields,
                            onkeydown: test_helpers_1.noop
                        }, tslib_1.__spread([
                            d_1.v('legend', { classes: [baseCss.visuallyHidden] }, [defaults_1.DEFAULT_LABELS.chooseYear])
                        ], yearRadios(false, 1980, 2000, 1997))),
                        d_1.v('div', {
                            classes: css.controls
                        }, [
                            d_1.v('button', {
                                classes: css.previous,
                                tabIndex: -1,
                                type: 'button',
                                onclick: test_helpers_1.noop
                            }, [
                                d_1.w(index_1.default, { type: 'leftIcon', theme: undefined }),
                                d_1.v('span', { classes: baseCss.visuallyHidden }, [defaults_1.DEFAULT_LABELS.previousYears])
                            ]),
                            d_1.v('button', {
                                classes: css.next,
                                tabIndex: -1,
                                type: 'button',
                                onclick: test_helpers_1.noop
                            }, [
                                d_1.w(index_1.default, { type: 'rightIcon', theme: undefined }),
                                d_1.v('span', { classes: baseCss.visuallyHidden }, [defaults_1.DEFAULT_LABELS.nextYears])
                            ])
                        ])
                    ])
                ]); });
            },
            'Month popup opens and closes on button click': function () {
                var isOpen;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ onPopupChange: function (open) { isOpen = open; } }, requiredProps)); });
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(isOpen, 'First click should open popup');
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                assert.isFalse(isOpen, 'Second click should close popup');
            },
            'Year popup opens and closes on button click': function () {
                var isOpen;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ onPopupChange: function (open) { isOpen = open; } }, requiredProps)); });
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(isOpen, 'First click should open popup');
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                assert.isFalse(isOpen, 'Second click should close popup');
            },
            'Popup switches between month and year': function () {
                var isOpen;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ onPopupChange: function (open) { isOpen = open; } }, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.expect(function () { return expected(false, false); });
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(true, false); });
                assert.isTrue(isOpen, 'Month button opens popup');
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                assert.isTrue(isOpen, 'After clicking year button, popup is still open');
            },
            'Month popup closes with correct Key': function () {
                var isOpen = true;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ onPopupChange: function (open) { isOpen = open; } }, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.expect(function () { return expected(false, false); });
                // escape key
                assert.isTrue(isOpen);
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(true, false); });
                h.trigger("." + css.monthGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Escape }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on escape key press');
                // enter key
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(true, false); });
                h.trigger("." + css.monthGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Enter }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on enter key press');
                // space key
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(true, false); });
                h.trigger("." + css.monthGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Space }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on space key press');
                // random key
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(true, false); });
                h.trigger("." + css.monthGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.PageDown }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(true, false); });
                assert.isTrue(isOpen, 'Other Key don\'t close popup');
            },
            'year popup closes with correct Key': function () {
                var isOpen = true;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({ onPopupChange: function (open) { isOpen = open; } }, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.expect(function () { return expected(false, false); });
                // escape key
                assert.isTrue(isOpen);
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                h.trigger("." + css.yearGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Escape }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on escape key press');
                // enter key
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                h.trigger("." + css.yearGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Enter }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on enter key press');
                // space key
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                h.trigger("." + css.yearGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.Space }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, false); });
                assert.isFalse(isOpen, 'Should close on space key press');
                // random key
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                h.trigger("." + css.yearGrid + " fieldset", 'onkeydown', tslib_1.__assign({ which: util_1.Key.PageDown }, test_helpers_1.stubEvent));
                h.expect(function () { return expected(false, true); });
                assert.isTrue(isOpen, 'Other Key don\'t close popup');
            },
            'Clicking buttons changes year page': function () {
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({}, requiredProps)); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true); });
                h.trigger("." + css.next, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true, { yearStart: 2020, yearEnd: 2040 }); });
                h.trigger("." + css.previous, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return expected(false, true, { yearStart: 2000, yearEnd: 2020 }); });
            },
            'Change month radios': function () {
                var currentMonth = testDate.getMonth();
                var isOpen = false;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({}, requiredProps, { onPopupChange: function (open) { isOpen = open; }, onRequestMonthChange: function (month) { currentMonth = month; } })); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.trigger('@month-button', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(isOpen, 'Month popup opens when clicking month button');
                h.trigger("." + css.monthRadio + ":nth-of-type(7) input", 'onchange', tslib_1.__assign({}, test_helpers_1.stubEvent, { target: { value: 6 } }));
                assert.strictEqual(currentMonth, 6, 'Change event on July sets month value');
                h.trigger("." + css.monthRadio + ":nth-of-type(7) input", 'onmouseup', test_helpers_1.stubEvent);
                assert.isFalse(isOpen, 'Clicking radios closes popup');
            },
            'Change year radios': function () {
                var currentYear = testDate.getMonth();
                var isOpen = false;
                var h = harness_1.default(function () { return d_1.w(DatePicker_1.default, tslib_1.__assign({}, requiredProps, { onPopupChange: function (open) { isOpen = open; }, onRequestYearChange: function (year) { currentYear = year; } })); }, [test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls, compareKey, compareName]);
                h.trigger('@year-button', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(isOpen, 'Year popup opens when clicking month button');
                h.trigger("." + css.yearRadio + ":nth-of-type(2) input", 'onchange', tslib_1.__assign({}, test_helpers_1.stubEvent, { target: { value: 2001 } }));
                assert.strictEqual(currentYear, 2001, 'Change event on second year radio changes year to 2001');
                h.trigger("." + css.yearRadio + ":nth-of-type(2) input", 'onmouseup', test_helpers_1.stubEvent);
                assert.isFalse(isOpen, 'Clicking radios closes popup');
            }
        }
    });
});
//# sourceMappingURL=DatePicker.js.map