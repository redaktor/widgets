(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@theintern/leadfoot/keys", "../../../theme/listbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var keys_1 = require("@theintern/leadfoot/keys");
    var css = require("../../../theme/listbox.m.css");
    var DELAY = 300;
    var ERROR_MARGIN = 5;
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=listbox')
            .setFindTimeout(5000);
    }
    registerSuite('Listbox', {
        'clicking option selects it': function () {
            var mouseEnabled = this.remote.session.capabilities.mouseEnabled;
            if (!mouseEnabled) {
                this.skip('Test requires mouse interactions.');
            }
            var selectedId = '';
            return getPage(this.remote)
                .findByCssSelector("." + css.root + " > div:nth-child(2) > div")
                .getAttribute('id')
                .then(function (id) {
                selectedId = id;
            })
                .click()
                .sleep(DELAY)
                .getAttribute('class')
                .then(function (className) {
                assert.include(className, css.activeOption, 'clicked option has activeOption class');
                assert.include(className, css.selectedOption, 'clicked option has selectedOption class');
            })
                .end()
                .findByCssSelector("." + css.root)
                .getAttribute('aria-activedescendant')
                .then(function (id) {
                assert.strictEqual(id, selectedId, 'listbox aria-activedescendant is equal to clicked option id');
            });
        },
        'the selected option should be visible': function () {
            var touchEnabled = this.remote.session.capabilities.touchEnabled;
            var menuBottom;
            var menuTop;
            var itemHeight;
            if (touchEnabled) {
                this.skip('Arrow keys required for tests.');
            }
            return getPage(this.remote)
                .findByCssSelector("." + css.root + " > div:first-child > div")
                .click()
                .end()
                .sleep(DELAY)
                .pressKeys(keys_1.default.ARROW_UP)
                .sleep(DELAY)
                .findByCssSelector("." + css.root)
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
                .findByCssSelector("." + css.activeOption)
                .getSize()
                .then(function (_a) {
                var height = _a.height;
                itemHeight = height;
            })
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                assert.isAtLeast(y, menuTop - ERROR_MARGIN);
                assert.isAtMost(Math.floor(y), Math.ceil(menuBottom - itemHeight) + ERROR_MARGIN, 'scrolled down');
            })
                .end()
                .pressKeys(keys_1.default.ARROW_DOWN)
                .sleep(DELAY)
                .findByCssSelector("." + css.root)
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                menuTop = y;
            })
                .end()
                .findByCssSelector("." + css.activeOption)
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                assert.isAtLeast(y, menuTop - ERROR_MARGIN, 'scroll back up');
            });
        },
        'keys move and select active option': function () {
            var _a = this.remote.session.capabilities, browserName = _a.browserName, touchEnabled = _a.touchEnabled;
            if (touchEnabled || browserName === 'safari') {
                // safari driver doesn't recognize focus on divs
                this.skip('Arrow keys required for tests.');
            }
            return getPage(this.remote)
                .findByCssSelector("." + css.root + " > div:nth-child(2) > div")
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector("." + css.root)
                .type(keys_1.default.ARROW_DOWN)
                .type(keys_1.default.ENTER)
                .sleep(DELAY)
                .end()
                .findByCssSelector("." + css.root + " > div:nth-child(3) > div")
                .getAttribute('class')
                .then(function (className) {
                assert.include(className, css.activeOption, 'down arrow moves active option');
                assert.include(className, css.selectedOption, 'enter selects option');
            });
        },
        'listbox is in tab order': function () {
            var browserName = this.remote.session.capabilities.browserName;
            if (browserName === 'safari') {
                // TODO: https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5403
                this.skip('SafariDriver does not move focus with tab key.');
            }
            return getPage(this.remote)
                .findByCssSelector("." + css.root)
                .click()
                .sleep(DELAY)
                .type(keys_1.default.TAB)
                .sleep(DELAY)
                .end()
                .getActiveElement()
                .getAttribute('id')
                .then(function (id) {
                assert.strictEqual(id, 'listbox2');
            });
        }
    });
});
//# sourceMappingURL=Listbox.js.map