(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/slider.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var css = require("../../../theme/slider.m.css");
    function getPage(test) {
        var browserName = test.remote.environmentType.browserName;
        if (browserName.toLowerCase() === 'microsoftedge') {
            test.skip('example page currently doesn\'t work in edge.');
        }
        var remote = test.remote;
        return remote
            .get('http://localhost:9000/_build/common/example/?module=slider')
            .setFindTimeout(5000);
    }
    function checkValue(command, values) {
        var notIE = command.session.capabilities.browserName.toLowerCase() !== 'internet explorer';
        var currentValue;
        return command
            .findByCssSelector("." + css.inputWrapper)
            .findByCssSelector("." + css.input)
            .getProperty('value')
            .then(function (value) {
            currentValue = parseInt(value, 10);
        })
            .end()
            .findByCssSelector("." + css.fill)
            .getAttribute('style')
            .then(function (style) {
            var absWidthRegex = /width:\s*(\d+)\.?\d*%/;
            var result = style.match(absWidthRegex);
            var width = result && result.length > 0 ? parseInt(result[1], 10) : -1;
            assert.lengthOf(result, 2);
            notIE && assert.closeTo(width, currentValue, 1);
        })
            .end()
            .findByCssSelector("." + css.thumb)
            .getAttribute('style')
            .then(function (style) {
            var absWidthRegex = /left:\s*(\d+)\.?\d*%/;
            var result = style.match(absWidthRegex);
            var width = result && result.length > 0 ? parseInt(result[1], 10) : -1;
            assert.lengthOf(result, 2);
            notIE && assert.closeTo(width, currentValue, 1);
            values && values.push(width);
        })
            .end()
            .end();
    }
    function clickToFocus(test, selector) {
        var _a = test.remote.session.capabilities, browserName = _a.browserName, mouseEnabled = _a.mouseEnabled;
        if (!mouseEnabled) {
            test.skip('Test requires mouse interactions.');
        }
        if (browserName === 'firefox') {
            test.skip('Fails in Firefox.');
        }
        if (browserName === 'safari') {
            test.skip('Fails in Safari 9.');
        }
        var remote = getPage(test);
        return remote
            .findByCssSelector("#example-s1 ." + css.root)
            .findByCssSelector(selector)
            .then(function (element) {
            return remote
                .moveMouseTo(element)
                .clickMouseButton(0);
        })
            .end()
            .end()
            .sleep(30)
            .execute("return document.activeElement === document.querySelector('#example-s1 ." + css.root + " input');")
            .then(function (isEqual) {
            assert.isTrue(isEqual);
        });
    }
    function slide(command, x, y) {
        return command.session.capabilities.brokenMouseEvents ?
            command
                .findByCssSelector("." + css.thumb)
                .moveMouseTo(x, y)
                .pressMouseButton()
                .end()
            :
                command
                    .findByCssSelector("." + css.thumb)
                    .moveMouseTo()
                    .pressMouseButton()
                    .moveMouseTo(x, y)
                    .releaseMouseButton()
                    .end();
    }
    registerSuite('Slider', {
        'horizontal slider': {
            'each component of a slider should be visible': function () {
                return getPage(this)
                    .findByCssSelector("#example-s1 ." + css.root)
                    .isDisplayed()
                    .findByCssSelector("." + css.input)
                    .isDisplayed()
                    .end()
                    .findByCssSelector("." + css.track)
                    .isDisplayed()
                    .end()
                    .findByCssSelector("." + css.output)
                    .isDisplayed()
                    .end()
                    .getSize()
                    .then(function (_a) {
                    var height = _a.height, width = _a.width;
                    assert.isAbove(height, 0, 'The height of the slider should be greater than zero.');
                    assert.isAbove(width, 0, 'The width of the slider should be greater than zero.');
                })
                    .end();
            },
            'label should be as defined': function () {
                return getPage(this)
                    .findByCssSelector("#example-s1 ." + css.root)
                    .getVisibleText()
                    .then(function (text) {
                    assert.include(text, 'How much do you like tribbles?');
                })
                    .end();
            },
            'slider value should be consistent in different part of the UI': function () {
                var command = getPage(this).findByCssSelector("#example-s1 ." + css.root);
                return checkValue(command).end();
            },
            'slider should be slidable with mouse': function () {
                var _a = this.remote.environmentType, browserName = _a.browserName, mouseEnabled = _a.mouseEnabled;
                if (!mouseEnabled) {
                    this.skip('Test requires mouse interactions.');
                }
                if (browserName.toLowerCase() === 'internet explorer') {
                    this.skip('mouse movements doesn\'t work in IE.');
                }
                if (browserName === 'firefox') {
                    this.skip('Fails in Firefox.');
                }
                if (browserName === 'safari') {
                    this.skip('Fails in Firefox.');
                }
                var sliderValues = [];
                var command = getPage(this).findByCssSelector("#example-s1 ." + css.root);
                command = checkValue(command, sliderValues);
                command = slide(command, -30, 0);
                command = checkValue(command, sliderValues);
                command = slide(command, 100, 0);
                command = checkValue(command, sliderValues);
                return command
                    .then(function () {
                    assert.lengthOf(sliderValues, 3);
                    assert.isTrue(sliderValues[0] > sliderValues[1] && sliderValues[2] > sliderValues[0]);
                })
                    .end();
            },
            'slider should be slidable with left and right arrow keys': function () {
                var _a = this.remote.environmentType, browserName = _a.browserName, supportsKeysCommand = _a.supportsKeysCommand;
                if (!supportsKeysCommand) {
                    this.skip('Arrow keys required for tests.');
                }
                if (browserName.toLowerCase() === 'safari' || browserName.toLowerCase() === 'internet explorer') {
                    this.skip('pressKeys with arrow keys doesn\'t work in iphone and IE.');
                }
                var sliderValues = [];
                var command = getPage(this)
                    .findByCssSelector("#example-s1 ." + css.root);
                command = checkValue(command, sliderValues)
                    .click()
                    .pressKeys(keys_1.default.ARROW_LEFT);
                command = checkValue(command, sliderValues)
                    .click()
                    .pressKeys([keys_1.default.ARROW_RIGHT, keys_1.default.ARROW_RIGHT]);
                return checkValue(command, sliderValues)
                    .then(function () {
                    assert.lengthOf(sliderValues, 3);
                    assert.isTrue(sliderValues[0] > sliderValues[1] && sliderValues[2] > sliderValues[0]);
                })
                    .end();
            },
            'Input box should gain focus when clicking on the slider thumb': function () {
                return clickToFocus(this, "." + css.thumb);
            },
            'Input box should gain focus when clicking on the slider fill': function () {
                return clickToFocus(this, "." + css.fill);
            },
            'Input box should gain focus when clicking on the slider label': function () {
                return clickToFocus(this, "label");
            }
        },
        'vertical slider': {
            'each component of a slider should be visible': function () {
                return getPage(this)
                    .findByCssSelector("#example-s2 ." + css.root)
                    .isDisplayed()
                    .findByCssSelector("." + css.input)
                    .isDisplayed()
                    .end()
                    .findByCssSelector("." + css.track)
                    .isDisplayed()
                    .end()
                    .findByCssSelector("." + css.output)
                    .isDisplayed()
                    .end()
                    .getSize()
                    .then(function (_a) {
                    var height = _a.height, width = _a.width;
                    assert.isAbove(height, 0, 'The height of the slider should be greater than zero.');
                    assert.isAbove(width, 0, 'The width of the slider should be greater than zero.');
                })
                    .end();
            },
            'label should be as defined': function () {
                return getPage(this)
                    .findByCssSelector("#example-s3 ." + css.root)
                    .getVisibleText()
                    .then(function (text) {
                    assert.include(text, 'Vertical Slider with default properties.');
                })
                    .end();
            },
            'slider value should be consistent in different part of the UI': function () {
                var command = getPage(this)
                    .findByCssSelector("#example-s2 ." + css.root);
                return checkValue(command)
                    .end();
            },
            'slider should be functional with mouse': function () {
                var _a = this.remote.environmentType, browserName = _a.browserName, mouseEnabled = _a.mouseEnabled;
                if (!mouseEnabled) {
                    this.skip('Test requires mouse interactions.');
                }
                if (browserName.toLowerCase() === 'internet explorer') {
                    this.skip('mouse movements doesn\'t work in IE.');
                }
                if (browserName === 'firefox') {
                    this.skip('Fails in Firefox.');
                }
                if (browserName === 'safari') {
                    this.skip('Fails in Safari.');
                }
                var sliderValues = [];
                var command = getPage(this)
                    .findByCssSelector("#example-s3 ." + css.root);
                command = checkValue(command, sliderValues);
                command = slide(command, 1, -30);
                command = checkValue(command, sliderValues);
                command = slide(command, 1, -40);
                command = checkValue(command, sliderValues);
                return command
                    .then(function () {
                    assert.lengthOf(sliderValues, 3);
                    assert.isTrue(sliderValues[1] > sliderValues[0] && sliderValues[2] > sliderValues[1]);
                })
                    .end();
            }
        }
    });
});
//# sourceMappingURL=Slider.js.map