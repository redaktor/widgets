(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/dialog.m.css", "../../styles/dialog.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var css = require("../../../theme/dialog.m.css");
    var fixedCss = require("../../styles/dialog.m.css");
    var DELAY = 400;
    function openDialog(remote, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.closeable, closeable = _c === void 0 ? true : _c, modal = _b.modal, underlay = _b.underlay;
        var promise = remote
            .get('http://localhost:9000/_build/common/example/?module=dialog')
            .setFindTimeout(5000);
        if (!closeable) {
            promise = promise
                .findById('closeable')
                .click()
                .end();
        }
        if (modal) {
            promise = promise
                .findById('modal')
                .click()
                .end();
        }
        if (underlay) {
            promise = promise
                .findById('underlay')
                .click()
                .end();
        }
        return promise
            .findById('button')
            .click()
            .end()
            .sleep(DELAY);
    }
    function clickUnderlay(remote, options) {
        if (options === void 0) { options = { underlay: true }; }
        var mouseEnabled = remote.session.capabilities.mouseEnabled;
        if (mouseEnabled) {
            // `click` clicks the center of the element, which in this case is where the dialog node is.
            return openDialog(remote, options)
                .moveMouseTo(0, 0)
                .clickMouseButton(0)
                .sleep(DELAY);
        }
        return openDialog(remote, options)
            .moveFinger(0, 0)
            .pressFinger(0, 0)
            .sleep(100)
            .releaseFinger(0, 0)
            .sleep(DELAY);
    }
    registerSuite('Dialog', {
        'The dialog should be visibly centered by default': function () {
            var dialogSize;
            var viewportSize;
            return openDialog(this.remote)
                .getWindowSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                viewportSize = { height: height, width: width };
            })
                .findByCssSelector("." + css.main)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                dialogSize = { height: height, width: width };
            })
                .getPosition()
                .then(function (_a) {
                var x = _a.x, y = _a.y;
                var expectedX = (viewportSize.width - dialogSize.width) / 2;
                var expectedY = (viewportSize.height - dialogSize.height) / 2;
                assert.closeTo(x, expectedX, expectedX * 0.2);
                assert.closeTo(y, expectedY, expectedY * 0.2);
            });
        },
        'The underlay should cover the entire visible screen': function () {
            var viewportSize;
            return openDialog(this.remote, { underlay: true })
                .getWindowSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                viewportSize = { height: height, width: width };
            })
                .sleep(DELAY)
                .findByCssSelector("." + fixedCss.underlay)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAtLeast(height, viewportSize.height * 0.8);
                assert.isAtLeast(width, viewportSize.width * 0.9);
            });
        },
        'Clicking the underlay should destroy the dialog': function () {
            return clickUnderlay(this.remote)
                .findByCssSelector("." + css.root)
                .getProperty('children')
                .then(function (children) {
                assert.lengthOf(children, 0);
            });
        },
        'Clicking the underlay should not destroy the dialog when "modal" is true': function () {
            return clickUnderlay(this.remote, { underlay: true, modal: true })
                .findByCssSelector("." + css.root)
                .getProperty('children')
                .then(function (children) {
                assert.lengthOf(children, 2);
            });
        },
        'The dialog should not be closeable when "closeable" is false': function () {
            return clickUnderlay(this.remote, { underlay: true, closeable: false })
                .findByCssSelector("." + css.root)
                .getProperty('children')
                .then(function (children) {
                assert.lengthOf(children, 2, 'The dialog should not be destroyed when the underlay is clicked.');
            });
        },
        'The dialog should be hidden when the close button is clicked': function () {
            return openDialog(this.remote)
                .findByCssSelector("." + css.close)
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector("." + css.root)
                .getProperty('children')
                .then(function (children) {
                assert.lengthOf(children, 0);
            });
        },
        'The dialog should be hidden when the close button is activated with the enter key': function () {
            var _a = this.remote.session.capabilities.browserName, browserName = _a === void 0 ? '' : _a;
            if (browserName === 'safari') {
                // TODO: https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5403
                this.skip('SafariDriver does not move focus with tab key.');
            }
            if (browserName.toLowerCase() === 'microsoftedge' || browserName === 'firefox') {
                this.skip('Edge and Firefox are also having trouble with tab key focus.');
            }
            return openDialog(this.remote)
                .pressKeys(keys_1.default.TAB)
                .pressKeys(keys_1.default.ENTER)
                .sleep(DELAY)
                .findByCssSelector("." + css.root)
                .getProperty('children')
                .then(function (children) {
                assert.lengthOf(children, 0);
            });
        }
    });
});
//# sourceMappingURL=Dialog.js.map