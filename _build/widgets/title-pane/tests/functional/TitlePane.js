(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=title-pane')
            .setFindTimeout(5000);
    }
    var DELAY = 400;
    registerSuite('TitlePane', {
        'Should be fully visible when `open`': function () {
            return getPage(this.remote)
                .findByCssSelector('#titlePane2 > div > :last-child')
                .getComputedStyle('margin-top')
                .then(function (marginTop) {
                assert.strictEqual(marginTop, '0px');
            });
        },
        'Should be hidden when not `open`': function () {
            var height;
            return getPage(this.remote)
                .findByCssSelector('#titlePane2 > div > :last-child')
                .getSize()
                .then(function (size) {
                height = size.height;
            })
                .end()
                .findByCssSelector('#titlePane2 button')
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector('#titlePane2 > div > :last-child')
                .getComputedStyle('margin-top')
                .then(function (marginTop) {
                assert.closeTo(parseInt(marginTop, 10), -height, 2);
            });
        }
    });
});
//# sourceMappingURL=TitlePane.js.map