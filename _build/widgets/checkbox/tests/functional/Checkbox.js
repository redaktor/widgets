(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/checkbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/checkbox.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=checkbox')
            .setFindTimeout(5000);
    }
    function nthCheckbox(n) {
        return "#example-" + n + " ." + css.root + " ." + css.input;
    }
    registerSuite('Checkbox', {
        'checkbox should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(1))
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The checkbox height should be greater than zero.');
                assert.isAbove(width, 0, 'The checkbox width should be greater than zero.');
            })
                .end();
        },
        'checkbox label text should be as defined': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Sample checkbox that starts checked');
            })
                .end();
        },
        'checkbox should be disabled': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(2))
                .isEnabled()
                .then(function (enabled) {
                assert.isTrue(!enabled, 'The checkbox should be disabled.');
            })
                .end();
        },
        'checkbox should be required': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(3))
                .getProperty('required')
                .then(function (required) {
                assert.isTrue(required, 'The checkbox should be required.');
            })
                .end();
        },
        'checkbox should be toggle-able': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(1))
                .isSelected()
                .then(function (checked) {
                assert.isTrue(checked, 'Initial state should be true');
            })
                .click()
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked);
            })
                .click()
                .isSelected()
                .then(function (checked) {
                assert.isTrue(checked);
            })
                .end();
        },
        '`toggle` mode checkbox should be toggle-able': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(4))
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked, 'Initial state should be false');
            })
                .click()
                .isSelected()
                .then(function (checked) {
                assert.isTrue(checked);
            })
                .click()
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked);
            })
                .end();
        },
        'disabled checkbox should not be toggle-able': function () {
            return getPage(this.remote)
                .findByCssSelector(nthCheckbox(2))
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked, 'Initial state should be false');
            })
                .click()
                // the error callback is needed only in FireFox with Firefox Driver. See: https://github.com/dojo/meta/issues/182
                .then(undefined, function (err) { })
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked);
            })
                .end();
        }
    });
});
//# sourceMappingURL=Checkbox.js.map