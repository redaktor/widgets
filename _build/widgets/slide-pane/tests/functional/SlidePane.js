(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/slide-pane.m.css", "../../styles/slide-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/slide-pane.m.css");
    var fixedCss = require("../../styles/slide-pane.m.css");
    var DELAY = 400;
    function openSlidePane(remote, alignRight) {
        var promise = remote
            .get('http://localhost:9000/_build/common/example/?module=slide-pane')
            .setFindTimeout(5000)
            .findById('underlay')
            .click()
            .end();
        if (alignRight) {
            promise = promise
                .findById('alignRight')
                .click()
                .end();
        }
        return promise
            .findById('button')
            .click()
            .end()
            .sleep(DELAY);
    }
    function swipeSlidePane(remote, distance, alignRight) {
        if (typeof distance === 'boolean') {
            alignRight = distance;
            distance = 250;
        }
        else if (typeof distance === 'undefined') {
            alignRight = undefined;
            distance = 250;
        }
        var mouseEnabled = remote.session.capabilities.mouseEnabled;
        var initialX = alignRight ? 10 : 300;
        if (mouseEnabled) {
            var finalX_1 = alignRight ? distance : -distance;
            return openSlidePane(remote, alignRight)
                .moveMouseTo(undefined, initialX, 10)
                .pressMouseButton()
                .moveMouseTo(undefined, finalX_1, 0)
                .releaseMouseButton()
                .sleep(DELAY);
        }
        var finalX = alignRight ? initialX + distance : initialX - distance;
        return openSlidePane(remote, alignRight)
            .pressFinger(initialX, 10)
            .moveFinger(finalX, 10)
            .releaseFinger(finalX, 10)
            .sleep(DELAY);
    }
    registerSuite('SlidePane', {
        'the underlay should cover the screen': function () {
            var viewportSize;
            return openSlidePane(this.remote)
                .getWindowSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                viewportSize = { height: height, width: width };
            })
                .findByCssSelector("." + fixedCss.underlay)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.closeTo(height, viewportSize.height, viewportSize.height * 0.2);
                assert.closeTo(width, viewportSize.width, viewportSize.width * 0.2);
            });
        },
        'the underlay should not be destroyed when the slidepane is clicked': function () {
            return openSlidePane(this.remote)
                .findByCssSelector("." + css.content)
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector("." + fixedCss.underlay)
                .getAttribute('class')
                .then(function (className) {
                assert.match(className, new RegExp(fixedCss.underlay), 'the underlay should not be removed.');
            });
        },
        'the slidepane should not be hidden when it is clicked': function () {
            return openSlidePane(this.remote)
                .findByCssSelector("." + css.content)
                .click()
                .sleep(DELAY)
                .getPosition()
                .then(function (_a) {
                var x = _a.x;
                assert.strictEqual(x, 0, 'The slidepane should be visible.');
            });
        },
        'a left-aligned slidepane should close when swiping from right to left': function () {
            var _a = this.remote.session.capabilities, _b = _a.browserName, browserName = _b === void 0 ? '' : _b, mouseEnabled = _a.mouseEnabled, touchEnabled = _a.touchEnabled;
            if (!mouseEnabled && !touchEnabled) {
                this.skip('Test requires mouse or touch interactions.');
            }
            if (browserName.toLowerCase() === 'microsoftedge' || browserName.toLowerCase() === 'internet explorer') {
                // TODO: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11469232/
                this.skip('Edge driver does not handle mouse movements correctly.');
            }
            var width = 0;
            return swipeSlidePane(this.remote)
                .findByCssSelector("." + css.content)
                .getSize()
                .then(function (size) {
                width = size.width;
            })
                .getPosition()
                .then(function (_a) {
                var x = _a.x;
                assert.closeTo(x, -width, 15);
            });
        },
        'a right-aligned slidepane should close when swiping from left to right': function () {
            var _a = this.remote.session.capabilities, _b = _a.browserName, browserName = _b === void 0 ? '' : _b, mouseEnabled = _a.mouseEnabled, touchEnabled = _a.touchEnabled;
            if (!mouseEnabled && !touchEnabled) {
                this.skip('Test requires mouse or touch interactions.');
            }
            if (browserName.toLowerCase() === 'microsoftedge' || browserName.toLowerCase() === 'internet explorer') {
                // TODO: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11469232/
                this.skip('Edge driver does not handle mouse movements correctly.');
            }
            var viewportWidth = 0;
            return swipeSlidePane(this.remote, true)
                .getWindowSize()
                .then(function (_a) {
                var width = _a.width;
                viewportWidth = width;
            })
                .findByCssSelector("." + css.content)
                .getPosition()
                .then(function (_a) {
                var x = _a.x;
                // Edge/IE11/Chrome on Windows visually hide the slidepane correctly, but the position
                // is slightly less than expected (the viewport width).
                var expected = viewportWidth * 0.95;
                assert.isAtLeast(x, expected, 'The slidepane should be hidden off to the right.');
            });
        },
        'minor swipe movements should not close the slidepane': function () {
            var _a = this.remote.session.capabilities, _b = _a.browserName, browserName = _b === void 0 ? '' : _b, mouseEnabled = _a.mouseEnabled, touchEnabled = _a.touchEnabled;
            if (!mouseEnabled && !touchEnabled) {
                this.skip('Test requires mouse or touch interactions.');
            }
            if (browserName.toLowerCase() === 'microsoftedge') {
                // TODO: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11469232/
                this.skip('Edge driver does not handle mouse movements correctly.');
            }
            return swipeSlidePane(this.remote, 50)
                .findByCssSelector("." + css.content)
                .getPosition()
                .then(function (_a) {
                var x = _a.x;
                assert.strictEqual(x, 0, 'The slidepane should be open.');
            });
        }
    });
});
//# sourceMappingURL=SlidePane.js.map