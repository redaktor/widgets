(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/listbox.m.css", "../../../theme/combobox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var listboxCss = require("../../../theme/listbox.m.css");
    var css = require("../../../theme/combobox.m.css");
    var DELAY = 300;
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=combobox')
            .setFindTimeout(5000);
    }
    registerSuite('ComboBox', {
        'the results menu should be visible': function () {
            var inputWidth;
            return getPage(this.remote)
                .findByCssSelector("." + css.trigger)
                .click()
                .end()
                .findByCssSelector("." + css.controls + " input")
                .getSize()
                .then(function (_a) {
                var width = _a.width;
                inputWidth = width;
            })
                .end()
                .sleep(DELAY)
                .findByCssSelector("." + css.dropdown)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                assert.isAbove(height, 0);
            });
        },
        'the selected result menu should be visible': function () {
            var _a = this.remote.session.capabilities, browserName = _a.browserName, touchEnabled = _a.touchEnabled;
            if (touchEnabled || browserName === 'firefox' || browserName === 'safari') {
                // TODO: FirefoxDriver and SafariDriver update the input value with non-printable characters.
                // https://openradar.appspot.com/radar?id=6097023048613888
                this.skip('Arrow keys required for tests.');
            }
            var menuBottom;
            var menuTop;
            var itemHeight;
            return getPage(this.remote)
                .findByCssSelector("." + css.trigger)
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector("." + css.controls + " input")
                .type(keys_1.default.ARROW_UP)
                .end()
                .sleep(DELAY)
                .findByCssSelector("." + css.dropdown)
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                menuTop = y;
            })
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                menuBottom = menuTop + height;
            })
                .end()
                .findByCssSelector("." + listboxCss.activeOption)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                itemHeight = height;
            })
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                assert.isAtLeast(y, menuTop);
                assert.isAtMost(Math.floor(y), Math.ceil((menuBottom - itemHeight) * 1.05));
            });
        },
        'tab order': function () {
            var _this = this;
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'safari') {
                // TODO: https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5403
                this.skip('SafariDriver does not move focus with tab key.');
            }
            if (browserName === 'firefox') {
                this.skip('FirefoxDriver sends actual charcodes to the input.');
            }
            var initialTab = browserName === 'chrome' ?
                function () { return _this.remote.findByTagName('body').type(keys_1.default.TAB); } :
                function () { return _this.remote.pressKeys(keys_1.default.TAB); };
            return getPage(this.remote)
                .findByCssSelector("." + css.trigger)
                .click()
                .sleep(DELAY)
                .then(initialTab)
                .getActiveElement()
                .getProperty('textContent')
                .then(function (text) {
                assert.strictEqual(text, 'clear ', 'The "clear" button should receive focus.');
            })
                .type(keys_1.default.TAB)
                .getActiveElement()
                .getTagName()
                .then(function (tag) {
                assert.strictEqual(tag.toLowerCase(), 'input', 'The results menu and "open" button should not receive focus.');
            });
        },
        'the input should receive focus when the "clear" button is activated': function () {
            if (this.remote.session.capabilities.browserName === 'safari') {
                // TODO: https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5403
                this.skip('SafariDriver does not move focus with tab key.');
            }
            return getPage(this.remote)
                .findByCssSelector("." + css.clear)
                .click()
                .sleep(30)
                .getActiveElement()
                .getTagName()
                .then(function (tag) {
                assert.strictEqual(tag.toLowerCase(), 'input', 'The input should receive focus when the "clear" button is clicked.');
            })
                .type(keys_1.default.TAB)
                .getActiveElement()
                .type(keys_1.default.ENTER)
                .sleep(30)
                .getActiveElement()
                .getTagName()
                .then(function (tag) {
                assert.strictEqual(tag.toLowerCase(), 'input', 'The input should receive focus when the "clear" button is activated with the ENTER key.');
            });
        },
        'the input should receive focus when the "open" button is activated': function () {
            if (this.remote.session.capabilities.browserName === 'safari') {
                // TODO: https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5403
                this.skip('SafariDriver does not move focus with tab key.');
            }
            return getPage(this.remote)
                .findByCssSelector("." + css.trigger)
                .click()
                .sleep(30)
                .getActiveElement()
                .getTagName()
                .then(function (tag) {
                assert.strictEqual(tag.toLowerCase(), 'input', 'The input should receive focus when the "open" button is clicked.');
            })
                .type(keys_1.default.TAB)
                .getActiveElement()
                .type(keys_1.default.ENTER)
                .sleep(30)
                .getActiveElement()
                .getTagName()
                .then(function (tag) {
                assert.strictEqual(tag.toLowerCase(), 'input', 'The input should receive focus when the "open" button is activated with the ENTER key.');
            });
        }
    });
});
//# sourceMappingURL=ComboBox.js.map