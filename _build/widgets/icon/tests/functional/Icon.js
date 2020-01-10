(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/icon.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var iconCss = require("../../../theme/icon.m.css");
    var DELAY = 300;
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=icon')
            .setFindTimeout(5000);
    }
    registerSuite('Icon', {
        'the icons should be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("." + iconCss.icon)
                .getSize()
                .then(function (_a) {
                var height = _a.height, width = _a.width;
                assert.isAbove(height, 0);
                assert.isAbove(width, 0);
            })
                .end()
                .sleep(DELAY)
                .findByCssSelector("." + iconCss.alertIcon)
                .getSize()
                .then(function (_a) {
                var width = _a.width, height = _a.height;
                assert.isAbove(height, 0);
                assert.isAbove(width, 0);
            });
        },
        'alt text should not be visible': function () {
            return getPage(this.remote)
                .findByCssSelector("." + iconCss.leftIcon)
                .getVisibleText()
                .then(function (text) {
                assert.equal(text, '');
            });
        }
    });
});
//# sourceMappingURL=Icon.js.map