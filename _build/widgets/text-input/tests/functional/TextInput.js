(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/text-input.m.css", "../../../common/styles/base.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/text-input.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=text-input')
            .setFindTimeout(5000);
    }
    registerSuite('TextInput', {
        'TextInput should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-text ." + css.root)
                .isDisplayed()
                .findByCssSelector("." + css.input)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The height of the input should be greater than zero.');
                assert.isAbove(width, 0, 'The width of the input should be greater than zero.');
            })
                .end()
                .end();
        },
        'TextInput label should be as defined': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-text ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Name');
            });
        },
        'TextInput should gain focus when clicking on the label': function () {
            var _this = this;
            var browserName = this.remote.session.capabilities.browserName;
            return getPage(this.remote)
                .findByCssSelector("#example-text ." + css.root + " label")
                .then(function (element) {
                if (browserName === 'firefox') {
                    return _this.remote
                        .moveMouseTo(element, 5, 5)
                        .clickMouseButton(0);
                }
                else {
                    return element.click();
                }
            })
                .end()
                .sleep(250)
                .execute("return document.activeElement === document.querySelector('#example-text ." + css.root + " ." + css.input + "');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            });
        },
        'TextInput should allow input to be typed': function () {
            var testInput = 'test text';
            return getPage(this.remote)
                .findByCssSelector("#example-validated ." + css.input)
                .type(testInput)
                .getProperty('value')
                .then(function (value) {
                assert.strictEqual(value, testInput);
            })
                .end();
        },
        'Hidden label should not be displayed': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-hidden-label ." + css.root)
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
        },
        'Disabled TextInput should not allow input to be typed': function () {
            var initValue = 'Initial value';
            return getPage(this.remote)
                .findByCssSelector("#example-disabled ." + css.root + " ." + css.input)
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
        'Validated TextInput should update style based on validity': function () {
            var validText = 'foo';
            var invalidText = 'foobar';
            return getPage(this.remote)
                .findByCssSelector("#example-validated ." + css.root)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.invalid);
                assert.notInclude(className, css.valid);
            })
                .findByCssSelector("." + css.input)
                .click()
                .type(validText)
                .end()
                .sleep(10)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.invalid);
                assert.include(className, css.valid);
            })
                .findByCssSelector("." + css.input)
                .type(invalidText)
                .end()
                .sleep(10)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.valid);
                assert.include(className, css.invalid);
            })
                .end();
        }
    });
});
//# sourceMappingURL=TextInput.js.map