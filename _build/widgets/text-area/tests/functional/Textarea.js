(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/text-area.m.css", "../../../common/styles/base.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var css = require("../../../theme/text-area.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=text-area')
            .setFindTimeout(5000);
    }
    registerSuite('Textarea', {
        'should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-t1 ." + css.root)
                .isDisplayed()
                .findByCssSelector("." + css.input)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The height of the textarea should be greater than zero.');
                assert.isAbove(width, 0, 'The width of the textarea should be greater than zero.');
            })
                .end()
                .end();
        },
        'label should be as defined': function () {
            var _a = this.remote.session.capabilities.browserName, browserName = _a === void 0 ? '' : _a;
            if (browserName.toLowerCase() === 'internet explorer') {
                this.skip('Label is including textarea placeholder.');
            }
            return getPage(this.remote)
                .findByCssSelector("#example-t1 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Type Something');
            })
                .end();
        },
        'should gain focus when clicking on the label': function () {
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'firefox') {
                this.skip('Firefox is not locating the input.');
            }
            return getPage(this.remote)
                .findByCssSelector("#example-t1 ." + css.root + " label")
                .click()
                .sleep(1000)
                .end()
                .execute("return document.activeElement === document.querySelector('#example-t1 ." + css.input + "');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            });
        },
        'should allow input to be typed': function () {
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'firefox') {
                this.skip('Firefox is not locating the input.');
            }
            var testInput = 'test text';
            return getPage(this.remote)
                .findByCssSelector("#example-t1 ." + css.input)
                .click()
                .type(testInput)
                .getProperty('value')
                .then(function (value) {
                assert.strictEqual(value, testInput);
            })
                .end();
        },
        'disabled should not allow input to be typed': function () {
            var initValue = 'Initial value';
            return getPage(this.remote)
                .findByCssSelector("#example-t2 ." + css.root + " ." + css.input)
                .click()
                .then(null, function () { })
                .type('text')
                .then(null, function () { })
                .getProperty('value')
                .then(function (value) {
                assert.strictEqual(value, initValue);
            })
                .end();
        },
        'validated should update style based on validity': function () {
            var _a = this.remote.session.capabilities, browserName = _a.browserName, version = _a.version;
            // Validated working manually in both safari and edge but functional just does not work
            if (browserName === 'safari' || browserName.toLowerCase() === 'microsoftedge') {
                this.skip('Classes are not being updated for this unit test in Safari or Edge, have been validated manually' + version);
            }
            var validText = 'exists';
            var backspaces = [];
            for (var i = 0; i < validText.length; i++) {
                backspaces.push(keys_1.default.BACKSPACE);
            }
            return getPage(this.remote)
                .findByCssSelector("#example-t3 ." + css.root)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.invalid);
                assert.notInclude(className, css.valid);
            })
                .findByCssSelector("." + css.input)
                .click()
                .type(validText)
                .end()
                .end()
                // focus another input
                .findByCssSelector("#example-t1 ." + css.root + " ." + css.input)
                .click()
                .end()
                .sleep(500)
                // enter invalid value
                .findByCssSelector("#example-t3 ." + css.root)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.invalid);
                assert.include(className, css.valid);
            })
                .findByCssSelector("." + css.input)
                .click()
                .type(backspaces)
                .end()
                .end()
                // focus another input
                .findByCssSelector("#example-t1 ." + css.root + " ." + css.input)
                .click()
                .end()
                .sleep(500)
                .findByCssSelector("#example-t3 ." + css.root)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.valid);
                assert.include(className, css.invalid);
            })
                .end();
        },
        'hidden label should not be displayed': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-t4 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.isTrue(text && text.length > 0);
            })
                .findByCssSelector("." + baseCss.visuallyHidden)
                .then(function (element) {
                assert(element, 'element with specified class "visuallyHidden" should exist.`');
            })
                .end()
                .end();
        }
    });
});
//# sourceMappingURL=Textarea.js.map