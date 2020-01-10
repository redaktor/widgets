(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/radio.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/radio.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=radio')
            .setFindTimeout(5000);
    }
    registerSuite('Radio Button', {
        'radio button should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root + ":first-of-type")
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The radio button height should be greater than zero.');
                assert.isAbove(width, 0, 'The radio width should be greater than zero.');
            })
                .end();
        },
        'radio button label text should be as defined': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root + ":first-of-type")
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'First option');
            })
                .end();
        },
        'radio button can be selected by clicking on its label': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root + ":first-of-type")
                .click()
                .findByCssSelector("." + css.input)
                .isSelected()
                .then(function (selected) {
                assert.isTrue(selected, '2nd radio button should be selected.');
            })
                .end()
                .end();
        },
        'radio buttons should be selectable': function () {
            return getPage(this.remote)
                .findByCssSelector('#example-1')
                .findByCssSelector("." + css.root + ":first-of-type ." + css.input)
                .isSelected()
                .then(function (checked) {
                assert.isTrue(checked, 'Initially the first radio button should be selected');
            })
                .end()
                .findByCssSelector("." + css.root + ":nth-of-type(3) ." + css.input)
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked, 'Initially the 3rd radio button should not be selected');
            })
                .click()
                .isSelected()
                .then(function (checked) {
                assert.isTrue(checked);
            })
                .end()
                .findByCssSelector("." + css.root + ":first-of-type ." + css.input)
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked);
            })
                .end()
                .end();
        },
        'disabled radio buttons should not be selectable': function () {
            return getPage(this.remote)
                .findByCssSelector('#example-2')
                .findByCssSelector("." + css.root + ":first-of-type ." + css.input)
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked, 'Initially the first radio button should not be selected');
            })
                .click()
                .then(undefined, function (err) { })
                .isSelected()
                .then(function (checked) {
                assert.isFalse(checked);
            })
                .end();
        }
    });
});
//# sourceMappingURL=Radio.js.map