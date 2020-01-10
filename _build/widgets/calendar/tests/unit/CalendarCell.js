(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../CalendarCell", "../../../theme/calendar.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var CalendarCell_1 = require("../../CalendarCell");
    var css = require("../../../theme/calendar.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    registerSuite('CalendarCell', {
        tests: {
            'Calendar cell with default properties': function () {
                var h = harness_1.default(function () { return d_1.w(CalendarCell_1.default, {
                    date: 1
                }); });
                h.expect(function () { return d_1.v('td', {
                    key: 'root',
                    role: 'gridcell',
                    'aria-selected': 'false',
                    tabIndex: -1,
                    classes: [css.date, null, null, null],
                    onclick: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop
                }, [
                    d_1.v('span', {}, ['1'])
                ]); });
            },
            'Calendar cell with custom properties': function () {
                var h = harness_1.default(function () { return d_1.w(CalendarCell_1.default, {
                    date: 2,
                    disabled: true,
                    focusable: true,
                    selected: true,
                    today: true
                }); });
                h.expect(function () { return d_1.v('td', {
                    key: 'root',
                    role: 'gridcell',
                    'aria-selected': 'true',
                    tabIndex: 0,
                    classes: [css.date, css.inactiveDate, css.selectedDate, css.todayDate],
                    onclick: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop
                }, [
                    d_1.v('span', {}, ['2'])
                ]); });
            },
            'Click handler called with correct arguments': function () {
                var clickedDate = 0;
                var clickedDisabled = false;
                var date = 1;
                var disabled = true;
                var h = harness_1.default(function () { return d_1.w(CalendarCell_1.default, {
                    date: date,
                    disabled: disabled,
                    onClick: function (date, disabled) {
                        clickedDate = date;
                        clickedDisabled = disabled;
                    }
                }); });
                h.trigger('td', 'onclick', test_helpers_1.stubEvent);
                assert.strictEqual(clickedDate, 1);
                assert.isTrue(clickedDisabled);
                disabled = false;
                date = 2;
                h.trigger('td', 'onclick', test_helpers_1.stubEvent);
                assert.strictEqual(clickedDate, 2);
                assert.isFalse(clickedDisabled, 'disabled defaults to false');
            },
            'Keydown handler called': function () {
                var called = false;
                var h = harness_1.default(function () { return d_1.w(CalendarCell_1.default, {
                    date: 1,
                    onKeyDown: function () {
                        called = true;
                    }
                }); });
                h.trigger('td', 'onkeydown', test_helpers_1.stubEvent);
                assert.isTrue(called);
            },
            'Focus is set with callback': function () {
                var callFocus = true;
                var date = 1;
                var h = harness_1.default(function () { return d_1.w(CalendarCell_1.default, {
                    callFocus: callFocus,
                    date: date,
                    onFocusCalled: function () {
                        callFocus = false;
                    }
                }); });
                h.expect(function () { return d_1.v('td', {
                    key: 'root',
                    role: 'gridcell',
                    'aria-selected': 'false',
                    tabIndex: -1,
                    classes: [css.date, null, null, null],
                    onclick: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop
                }, [
                    d_1.v('span', {}, ['1'])
                ]); });
                assert.isFalse(callFocus, 'Focus callback should set callFocus to false');
                callFocus = true;
                date = 2;
                h.expect(function () { return d_1.v('td', {
                    key: 'root',
                    role: 'gridcell',
                    'aria-selected': 'false',
                    tabIndex: -1,
                    classes: [css.date, null, null, null],
                    onclick: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop
                }, [
                    d_1.v('span', {}, ['2'])
                ]); });
                assert.isFalse(callFocus, 'Focus callback should set callFocus to false');
            }
        }
    });
});
//# sourceMappingURL=CalendarCell.js.map