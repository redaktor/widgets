(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/toolbar.m.css", "../../../theme/slide-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/toolbar.m.css");
    var slidePaneCss = require("../../../theme/slide-pane.m.css");
    function getPage(remote) {
        return remote
            .get('http://localhost:9000/_build/common/example/?module=toolbar')
            .setFindTimeout(5000);
    }
    var DELAY = 1000;
    var HEIGHT = 500;
    var WIDTH = 500;
    registerSuite('Toolbar', {
        'Should show menu when button is clicked': function () {
            if (this.remote.session.capabilities.browserName === 'safari') {
                this.skip('SafariDriver does not support setting a specific window size.');
            }
            return getPage(this.remote)
                .setWindowSize(WIDTH, HEIGHT)
                .sleep(DELAY)
                .findByCssSelector("body ." + css.menuButton)
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector("body ." + slidePaneCss.root)
                .isDisplayed()
                .then(function (displayed) {
                assert.isTrue(displayed);
            });
        },
        'Should close menu when button is clicked': function () {
            if (this.remote.session.capabilities.browserName === 'safari') {
                this.skip('SafariDriver does not support setting a specific window size.');
            }
            return getPage(this.remote)
                .setWindowSize(WIDTH, HEIGHT)
                .findByCssSelector("body ." + css.menuButton)
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector("body ." + slidePaneCss.close)
                .click()
                .end()
                .sleep(DELAY)
                .findByCssSelector("body ." + slidePaneCss.title)
                .getPosition()
                .then(function (position) {
                assert.isAbove(position.x, WIDTH - 50);
            });
        }
    });
});
//# sourceMappingURL=Toolbar.js.map