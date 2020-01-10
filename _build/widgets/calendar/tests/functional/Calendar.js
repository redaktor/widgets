(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/calendar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var css = require("../../../theme/calendar.m.css");
    var DELAY = 500;
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    function openMonthPicker(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=calendar')
            .setFindTimeout(5000)
            .findByCssSelector("." + css.monthTrigger)
            .click()
            .sleep(DELAY)
            .end();
    }
    function openYearPicker(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=calendar')
            .setFindTimeout(5000)
            .findByCssSelector("." + css.yearTrigger)
            .click()
            .sleep(DELAY)
            .end();
    }
    function clickDate(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=calendar')
            .setFindTimeout(5000)
            .findByCssSelector("tbody > tr:first-child > td:nth-child(" + (firstDay + 1) + ")")
            .click()
            .sleep(DELAY)
            .end();
    }
    registerSuite('Calendar', {
        'Open month picker': function () {
            return openMonthPicker(this.remote)
                .findByCssSelector("." + css.monthGrid)
                .getAttribute('aria-hidden')
                .then(function (hidden) {
                assert.strictEqual(hidden, 'false', 'The month dialog should open on first click');
            })
                .end()
                .getActiveElement()
                .getAttribute('value')
                .then(function (value) {
                assert.strictEqual(value, "" + today.getMonth(), 'focus moved to current month radio inside popup');
            });
        },
        'Close month picker': function () {
            return openMonthPicker(this.remote)
                .findByCssSelector("." + css.monthTrigger)
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector("." + css.monthGrid)
                .getAttribute('aria-hidden')
                .then(function (hidden) {
                assert.strictEqual(hidden, 'true', 'The month dialog should close on second click');
            })
                .end()
                .getActiveElement()
                .getAttribute('class')
                .then(function (className) {
                assert.include(className, css.monthTrigger, 'focus moved to button');
            });
        },
        'Open year picker': function () {
            return openYearPicker(this.remote)
                .findByCssSelector("." + css.yearGrid)
                .getAttribute('aria-hidden')
                .then(function (hidden) {
                assert.strictEqual(hidden, 'false', 'The month dialog should open on first click');
            })
                .end()
                .getActiveElement()
                .getAttribute('value')
                .then(function (value) {
                assert.strictEqual(value, "" + today.getFullYear(), 'focus moved to current year radio inside popup');
            });
        },
        'Clicking month radio selects month and closes popup': function () {
            var _a = this.remote.session.capabilities.browserName, browserName = _a === void 0 ? '' : _a;
            if (browserName.toLowerCase() === 'microsoftedge') {
                this.skip('Edge driver does not handle mouseup on click.');
            }
            return openMonthPicker(this.remote)
                .findByCssSelector('input[type=radio]')
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector("." + css.monthTrigger)
                .getVisibleText()
                .then(function (label) {
                assert.include(label, 'January', 'Clicking first month radio changes label text to January');
            })
                .end()
                .findByCssSelector("." + css.monthGrid)
                .getAttribute('aria-hidden')
                .then(function (hidden) {
                assert.strictEqual(hidden, 'true', 'Clicking month radio closes popup');
            });
        },
        'Correct dates are disabled': function () {
            var disabledDateSelector = firstDay === 0 ? 'tbody tr:last-child td:last-child' : "tbody tr:first-child td:nth-child(" + firstDay + ")";
            return clickDate(this.remote)
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '1', 'Month starts on correct day');
            })
                .end()
                .findByCssSelector(disabledDateSelector)
                .getAttribute('class')
                .then(function (className) {
                assert.include(className, css.inactiveDate, 'Disabled date has correct css class');
            });
        },
        'Arrow keys move date focus': function () {
            var _a = this.remote.session.capabilities, supportsKeysCommand = _a.supportsKeysCommand, _b = _a.browserName, browserName = _b === void 0 ? '' : _b;
            if (!supportsKeysCommand || browserName.toLowerCase() === 'safari') {
                this.skip('Arrow keys must be supported');
            }
            if (browserName.toLowerCase() === 'microsoftedge') {
                this.skip('Edge driver does not handle focus on click');
            }
            return clickDate(this.remote)
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.ARROW_RIGHT)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '2', 'Right arrow moves active element to second day');
            })
                .end()
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.ARROW_DOWN)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '9', 'Down arrow moves active element to next week');
            })
                .end()
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.ARROW_LEFT)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '8', 'Left arrow moves active element to previous day');
            })
                .end()
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.ARROW_UP)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '1', 'Up arrow moves active element to previous week');
            })
                .end()
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.PAGE_DOWN)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                var today = new Date();
                var monthLengh = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                assert.strictEqual(text, "" + monthLengh, 'Page down moves to last day');
            })
                .end()
                .findByCssSelector("tbody tr:first-child td:nth-child(" + (firstDay + 1) + ")")
                .pressKeys(keys_1.default.PAGE_UP)
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, '1', 'Page up moves to first day');
            })
                .end();
        },
        'Clicking disabled date moves focus': function () {
            var clickedDate = '';
            return clickDate(this.remote)
                .findByCssSelector("." + css.inactiveDate)
                .getVisibleText()
                .then(function (text) {
                clickedDate = text;
            })
                .click()
                .end()
                .sleep(DELAY)
                .getActiveElement()
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, clickedDate, 'Clicked date has focus');
            })
                .getAttribute('class')
                .then(function (className) {
                assert.include(className, css.selectedDate, 'Clicked date has selected class');
            });
        }
    });
});
//# sourceMappingURL=Calendar.js.map