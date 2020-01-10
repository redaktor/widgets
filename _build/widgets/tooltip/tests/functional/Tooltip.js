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
            .get('http://localhost:9000/_build/common/example/?module=tooltip')
            .setFindTimeout(5000);
    }
    var DELAY = 750;
    registerSuite('Tooltip', {
        'should render when triggered': function () {
            return getPage(this.remote)
                .sleep(DELAY)
                .findByCssSelector('#example-1 button')
                .click()
                .sleep(DELAY)
                .end()
                .findByCssSelector('#example-1 > div:first-child > div:last-child')
                .getVisibleText()
                .then(function (text) {
                assert.strictEqual(text, 'This is a right-oriented tooltip that opens and closes based on child click.');
            });
        }
    });
});
//# sourceMappingURL=Tooltip.js.map