(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../theme/split-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var css = require("../../../theme/split-pane.m.css");
    var DELAY = 300;
    var ERROR_MARGIN = 5;
    function getPage(test) {
        var _a = test.remote.environmentType.browserName, browserName = _a === void 0 ? '' : _a;
        if (browserName === 'safari' || browserName === 'firefox' || browserName.toLowerCase() === 'microsoftedge') {
            test.skip('Tests do not run in these browsers.');
        }
        return test.remote
            .get('http://localhost:9000/_build/common/example/?module=split-pane')
            .setFindTimeout(5000);
    }
    function resize(command, x, y) {
        return command
            .findByCssSelector("." + css.divider)
            .moveMouseTo()
            .pressMouseButton(0)
            .moveMouseTo(x, y)
            .releaseMouseButton(0)
            .sleep(DELAY)
            .end();
    }
    function testResizes(command, resizes, expected) {
        assert.strictEqual(resizes.length, expected.length, 'Resizes array should match expected array.');
        var currentX;
        var currentY;
        command = command
            .findByCssSelector("." + css.divider)
            .getPosition()
            .then(function (_a) {
            var x = _a.x, y = _a.y;
            currentX = x;
            currentY = y;
        })
            .end();
        var _loop_1 = function (i) {
            var move = resizes[i];
            var delta = expected[i];
            command = resize(command, move.x, move.y)
                .findByCssSelector("." + css.divider)
                .getPosition()
                .then(function (_a) {
                var x = _a.x, y = _a.y;
                if (typeof delta.x === 'function') {
                    assert.isTrue(delta.x(x), "Resize " + i + " should pass x test.");
                }
                else {
                    assert.closeTo(x, currentX + delta.x, ERROR_MARGIN, "Resize " + i + " should move x by " + move.x + ".");
                }
                if (typeof delta.y === 'function') {
                    assert.isTrue(delta.y(y), "Resize " + i + " should pass y test.");
                }
                else {
                    assert.closeTo(y, currentY + delta.y, ERROR_MARGIN, "Resize " + i + " should move y by " + move.y + ".");
                }
                currentX = x;
                currentY = y;
            })
                .end();
        };
        for (var i = 0; i < resizes.length; i++) {
            _loop_1(i);
        }
        return command;
    }
    registerSuite('SplitPane', {
        'can slide horizontally': function () {
            return testResizes(getPage(this).findByCssSelector("#example-column ." + css.root), [{ x: -10, y: 0 }, { x: 20, y: 0 }], [{ x: -10, y: 0 }, { x: 20, y: 0 }]);
        },
        'can slide vertically': function () {
            return testResizes(getPage(this).findByCssSelector("#example-row ." + css.root), [{ x: 0, y: -10 }, { x: 0, y: 20 }], [{ x: 0, y: -10 }, { x: 0, y: 20 }]);
        },
        'can slide when nested': function () {
            var command = getPage(this).findByCssSelector("#example-nested ." + css.root);
            command = testResizes(command, [{ x: -10, y: 0 }, { x: 20, y: 0 }], [{ x: -10, y: 0 }, { x: 20, y: 0 }]);
            command = command.findByCssSelector("." + css.trailing);
            command = testResizes(command, [{ x: 0, y: -10 }, { x: 0, y: 20 }], [{ x: 0, y: -10 }, { x: 0, y: 20 }]);
            command = command.end();
            return command;
        },
        'there are limits with multiple vertical nested': function () {
            var command = getPage(this).findByCssSelector("#example-vertical-nested ." + css.root);
            command = testResizes(command, [{ x: -10, y: 0 }, { x: 20, y: 0 }], [{ x: -10, y: 0 }, { x: 20, y: 0 }]);
            var minX;
            command = command
                .findByCssSelector("." + css.divider)
                .getPosition()
                .then(function (_a) {
                var x = _a.x;
                minX = x;
            })
                .end();
            command = command.findByCssSelector("." + css.trailing);
            command = testResizes(command, [{ x: -9999, y: 0 }, { x: 10, y: 0 }], [{ x: function (x) { return x > minX; }, y: 0 }, { x: 10, y: 0 }]);
            command = command.end();
            return command;
        },
        'there are limits with multiple horizontal nested': function () {
            var command = getPage(this).findByCssSelector("#example-horizontal-nested ." + css.root);
            command = testResizes(command, [{ x: 0, y: -10 }, { x: 0, y: 20 }], [{ x: 0, y: -10 }, { x: 0, y: 20 }]);
            var minY;
            command = command
                .findByCssSelector("." + css.divider)
                .getPosition()
                .then(function (_a) {
                var y = _a.y;
                minY = y;
            })
                .end();
            command = command.findByCssSelector("." + css.trailing);
            command = testResizes(command, [{ x: 0, y: -9999 }, { x: 0, y: 10 }], [{ x: 0, y: function (y) { return y > minY; } }, { x: 0, y: 10 }]);
            command = command.end();
            return command;
        },
        'a maximum size should not be exceeded': function () {
            var command = getPage(this).findByCssSelector("#example-max ." + css.root);
            var containerWidth = 0;
            command = command
                .getSize()
                .then(function (_a) {
                var width = _a.width;
                containerWidth = width;
            });
            command = testResizes(command, [{ x: 9999, y: 0 }, { x: -10, y: 0 }], [{ x: function (x) { return x < (containerWidth - 10); }, y: 0 }, { x: -10, y: 0 }]);
            return command;
        },
        'a minimum size should not be exceeded': function () {
            var command = getPage(this).findByCssSelector("#example-max ." + css.root);
            var containerWidth = 0;
            command = command
                .getSize()
                .then(function (_a) {
                var width = _a.width;
                containerWidth = width;
            });
            command = testResizes(command, [{ x: 10, y: 0 }, { x: -9999, y: 0 }, { x: 10, y: 0 }], [{ x: 10, y: 0 }, { x: function (x) { return x > 10; }, y: 0 }, { x: 10, y: 0 }]);
            return command;
        }
    });
});
//# sourceMappingURL=SplitPane.js.map