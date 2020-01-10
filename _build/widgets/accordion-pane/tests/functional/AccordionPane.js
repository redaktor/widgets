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
            .get('http://localhost:9000/_build/common/example/?module=accordion-pane')
            .setFindTimeout(5000);
    }
    var DELAY = 750;
    registerSuite('AccordionPane', {
        'Child panes should open on click': function () {
            return getPage(this.remote)
                .sleep(DELAY)
                .findByCssSelector('#pane > div > :first-child')
                .getSize()
                .then(function (size) {
                assert.isBelow(size.height, 50);
            })
                .findByCssSelector('button')
                .click()
                .end()
                .sleep(DELAY)
                .getSize()
                .then(function (size) {
                assert.isAbove(size.height, 50);
            });
        }
    });
});
//# sourceMappingURL=AccordionPane.js.map