(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/label.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/label.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=label')
            .setFindTimeout(5000);
    }
    registerSuite('Label', {
        'Label should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The label height should be greater than zero.');
                assert.isAbove(width, 0, 'The label width should be greater than zero.');
            })
                .end();
        },
        'Label text should be as defined': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-1 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Type Something');
            })
                .end();
        },
        'Input box should gain focus when clicking on the label': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-3 ." + css.root)
                .click()
                .end()
                .sleep(250)
                .execute("return document.activeElement === document.querySelector('#example-3 input');")
                .then(function (isEqual) {
                assert.isTrue(isEqual);
            });
        },
        'Hidden label text should not be displayed': function () {
            return getPage(this.remote)
                .findByCssSelector("#example-2 ." + css.root)
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'Can\'t read me!');
            })
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAtMost(height, 1, 'The label text height should be no more than 1px.');
                assert.isAtMost(width, 1, 'The label text width should be no more than 1px.');
            })
                .end();
        }
    });
});
//# sourceMappingURL=Label.js.map