(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/combobox.m.css", "../../../theme/listbox.m.css", "../../../theme/text-input.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var comboboxCss = require("../../../theme/combobox.m.css");
    var listboxCss = require("../../../theme/listbox.m.css");
    var textinputCss = require("../../../theme/text-input.m.css");
    var DELAY = 300;
    function getPage(remote, exampleId) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=time-picker')
            .setFindTimeout(5000)
            .findById(exampleId);
    }
    function testDisabledPicker(remote, exampleId, readOnly) {
        if (readOnly === void 0) { readOnly = false; }
        return getPage(remote, exampleId)
            .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.input)
            .click()
            .sleep(DELAY)
            .execute("return document.activeElement === document.querySelector('#" + exampleId + " ." + comboboxCss.controls + " ." + textinputCss.input + "');")
            .then(function (isEqual) {
            if (isEqual) {
                return this.parent
                    .type('1')
                    .sleep(DELAY)
                    .getProperty('value')
                    .then(function (value) {
                    assert.strictEqual(value, '', 'The input should not allow text entry.');
                });
            }
        })
            .end()
            .setFindTimeout(100)
            .findAllByCssSelector("." + comboboxCss.dropdown)
            .then(function (elements) {
            assert.strictEqual(elements.length, 0);
        })
            .end()
            .setFindTimeout(5000)
            .findByCssSelector("." + comboboxCss.controls + " ." + comboboxCss.trigger)
            .click()
            .end()
            .sleep(DELAY)
            .execute("return document.activeElement === document.querySelector('#" + exampleId + " ." + comboboxCss.controls + " ." + textinputCss.input + "');")
            .then(function (isEqual) {
            if (!readOnly) {
                assert.isFalse(isEqual, 'Input should not gain focus when dropdown trigger is clicked.');
            }
        })
            .setFindTimeout(100)
            .findAllByCssSelector("." + comboboxCss.dropdown)
            .then(function (elements) {
            assert.strictEqual(elements.length, 0);
        })
            .end();
    }
    registerSuite('TimePicker', {
        'picker opens on input': function () {
            var exampleId = 'example-filter-on-input';
            return getPage(this.remote, exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.input)
                .type('1')
                .end()
                .sleep(DELAY)
                .execute("return document.activeElement === document.querySelector('#" + exampleId + " ." + comboboxCss.controls + " ." + textinputCss.input + "');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            })
                .findByCssSelector("." + comboboxCss.dropdown)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                assert.isAbove(height, 0);
            })
                .end();
        },
        'picker opens on focus': function () {
            var _a = this.remote.session.capabilities.browserName, browserName = _a === void 0 ? '' : _a;
            if (browserName.toLowerCase() === 'microsoftedge') {
                this.skip('Edge driver does not handle focus on click');
            }
            var exampleId = 'example-open-on-focus';
            return getPage(this.remote, exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.input)
                .click()
                .end()
                .sleep(DELAY)
                .execute("return document.activeElement === document.querySelector('#" + exampleId + " ." + comboboxCss.controls + " ." + textinputCss.input + "');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            })
                .findByCssSelector("." + comboboxCss.dropdown)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                assert.isAbove(height, 0);
            })
                .end();
        },
        'disabled menu items cannot be clicked': function () {
            var exampleId = 'example-disabled-items';
            return getPage(this.remote, exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + comboboxCss.trigger)
                .click()
                .end()
                .sleep(DELAY)
                .execute("return document.activeElement === document.querySelector('#" + exampleId + " ." + comboboxCss.controls + " ." + textinputCss.input + "');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            })
                .findByCssSelector("." + comboboxCss.dropdown)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                assert.isAbove(height, 0);
            })
                .end()
                .findByCssSelector("." + comboboxCss.dropdown + " ." + listboxCss.disabledOption)
                .click()
                .end()
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.input)
                .getProperty('value')
                .then(function (value) {
                assert.strictEqual(value, '', 'The input value should not contain the disabled value.');
            })
                .end()
                .findByCssSelector("." + comboboxCss.dropdown)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                assert.isAbove(height, 0, 'The dropdown should remain open.');
            })
                .end();
        },
        'disabled timepickers cannot be opened': function () {
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'firefox') {
                this.skip('Firefox does not like clicking on disabled things.');
            }
            return testDisabledPicker(this.remote, 'example-disabled');
        },
        'readonly timepickers cannot be opened': function () {
            return testDisabledPicker(this.remote, 'example-readonly', true);
        },
        'validated inputs update on input': function () {
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'internet explorer') {
                this.skip('Test does not work on Internet Explorer');
            }
            var exampleId = 'example-required-validated';
            return getPage(this.remote, exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.root)
                .findByCssSelector("." + textinputCss.input)
                .click()
                .end()
                .sleep(DELAY)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, textinputCss.invalid);
            })
                .findByCssSelector("." + textinputCss.input)
                .type('1')
                .end()
                .sleep(DELAY)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, textinputCss.invalid);
            })
                .findByCssSelector("." + textinputCss.input)
                .type(keys_1.default.BACKSPACE)
                .end()
                .sleep(DELAY)
                .getProperty('className')
                .then(function (className) {
                assert.include(className, textinputCss.invalid);
            })
                .end();
        },
        'validated inputs update on focus change': function () {
            var _a = this.remote.session.capabilities.browserName, browserName = _a === void 0 ? '' : _a;
            if (browserName.toLowerCase() === 'microsoftedge') {
                this.skip('Edge driver does not handle focus on click');
            }
            if (browserName === 'internet explorer') {
                this.skip('Test does not work on Internet Explorer');
            }
            var exampleId = 'example-required-validated';
            return getPage(this.remote, exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.root)
                .findByCssSelector("." + textinputCss.input)
                .click()
                .end()
                .sleep(DELAY)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, textinputCss.invalid);
            })
                .end()
                .end()
                .findByCssSelector("#example-filter-on-input ." + comboboxCss.controls + " ." + textinputCss.root)
                .click()
                .end()
                .sleep(DELAY)
                .findById(exampleId)
                .findByCssSelector("." + comboboxCss.controls + " ." + textinputCss.root)
                .getProperty('className')
                .then(function (className) {
                assert.include(className, textinputCss.invalid);
            })
                .end();
        }
    });
});
//# sourceMappingURL=TimePicker.js.map