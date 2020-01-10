(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var util_1 = require("../../util");
    registerSuite('util', {
        keys: function () {
            assert.strictEqual(Keys.Down, 40);
            assert.strictEqual(Keys.End, 35);
            assert.strictEqual(Keys.Enter, 13);
            assert.strictEqual(Keys.Escape, 27);
            assert.strictEqual(Keys.Home, 36);
            assert.strictEqual(Keys.Left, 37);
            assert.strictEqual(Keys.PageDown, 34);
            assert.strictEqual(Keys.PageUp, 33);
            assert.strictEqual(Keys.Right, 39);
            assert.strictEqual(Keys.Space, 32);
            assert.strictEqual(Keys.Tab, 9);
            assert.strictEqual(Keys.Up, 38);
        },
        formatAriaProperties: function () {
            assert.deepEqual(util_1.formatAriaProperties({}), {}, 'handles empty object');
            var aria = {
                describedBy: 'foo',
                controls: 'bar'
            };
            var formattedAria = util_1.formatAriaProperties(aria);
            assert.strictEqual(Object.keys(formattedAria).length, 2);
            assert.strictEqual(formattedAria['aria-describedby'], 'foo');
            assert.strictEqual(formattedAria['aria-controls'], 'bar');
        }
    });
});
//# sourceMappingURL=util.js.map