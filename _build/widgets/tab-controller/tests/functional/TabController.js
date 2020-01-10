(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/tab-controller.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/tab-controller.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=tab-controller')
            .setFindTimeout(5000);
    }
    registerSuite('TabController', {
        'tab pane should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("." + css.root)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0, 'The tab pane should be greater than zero.');
                assert.isAbove(width, 0, 'The tab pane should be greater than zero.');
            })
                .end();
        },
        'tabs should be changable': function () {
            return getPage(this.remote)
                .findByCssSelector("." + css.root)
                .findByCssSelector("." + css.tabButton + ":last-child")
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.activeTabButton, 'The last tab should not be selected initially.');
            })
                .click()
                .end()
                .findByCssSelector("." + css.tabButton + ":last-child")
                .getProperty('className')
                .then(function (className) {
                assert.include(className, css.activeTabButton, 'The last tab should be selected after being clicked.');
            })
                .end()
                .end();
        },
        'tab content should be changed when tab is changed': function () {
            var tabContent;
            return getPage(this.remote)
                .findByCssSelector("." + css.root)
                .findByCssSelector("." + css.tab)
                .getVisibleText()
                .then(function (text) {
                tabContent = text;
            })
                .end()
                .findByCssSelector("." + css.tabButton + ":last-child")
                .click()
                .end()
                .sleep(300)
                .findByCssSelector("." + css.tab)
                .getVisibleText()
                .then(function (text) {
                assert.notStrictEqual(text, tabContent);
            })
                .end()
                .end();
        },
        'disabled tab should not be selectable': function () {
            return getPage(this.remote)
                .findByCssSelector("." + css.root)
                .findByCssSelector("." + css.disabledTabButton)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.activeTabButton, 'Disabled tab should not be selected.');
            })
                .click()
                .end()
                .findByCssSelector("." + css.disabledTabButton)
                .getProperty('className')
                .then(function (className) {
                assert.notInclude(className, css.activeTabButton, 'Disabled tab should be selected after being clicked.');
            })
                .end()
                .end();
        },
        'tabs should be closeable': function () {
            var childElementCount;
            return getPage(this.remote)
                .findByCssSelector("." + css.tabButtons)
                .getProperty('childElementCount')
                .then(function (count) {
                childElementCount = count;
            })
                .findByCssSelector("." + css.close)
                .click()
                .end()
                .end()
                .sleep(300)
                .findByCssSelector("." + css.tabButtons)
                .getProperty('childElementCount')
                .then(function (count) {
                assert.strictEqual(count, childElementCount - 1);
            })
                .end();
        }
    });
});
//# sourceMappingURL=TabController.js.map