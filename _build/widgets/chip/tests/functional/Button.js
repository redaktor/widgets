(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/button.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/button.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=button')
            .setFindTimeout(5000);
    }
    var DELAY = 750;
    registerSuite('Button', {
        'button should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The button height should be greater than zero.');
                assert.isAbove(width, 0, 'The button width should be greater than zero.');
            })
                .end();
        },
        'button text should be as defined': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Basic Button');
            })
                .end();
        },
        'button should be disabled': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-2 ." + css.root)
                .isEnabled()
                .then(function (enabled) {
                assert.isTrue(!enabled, 'The button should be disabled.');
            })
                .end();
        },
        'button should be toggle-able': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-4 ." + css.root)
                .getAttribute('aria-pressed')
                .then(function (pressed) {
                assert.isNull(pressed, 'Initial state should be null');
            })
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector("#example-4 ." + css.root)
                .getAttribute('aria-pressed')
                .then(function (pressed) {
                assert.strictEqual(pressed, 'true');
            })
                .click()
                .end()
                .findByCssSelector("#example-4 ." + css.root)
                .getAttribute('aria-pressed')
                .then(function (pressed) {
                assert.strictEqual(pressed, 'false');
            })
                .end();
        }
    });
});
//# sourceMappingURL=Button.js.map