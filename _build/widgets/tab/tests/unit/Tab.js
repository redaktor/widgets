(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../index", "../../../theme/tab-controller.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var css = require("../../../theme/tab-controller.m.css");
    registerSuite('Tab', {
        tests: {
            'default properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { key: 'foo' }); });
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': undefined,
                    classes: [css.tab, css.hidden],
                    id: undefined,
                    role: 'tabpanel'
                }, []); });
            },
            'custom properties and children': function () {
                var testChildren = [
                    d_1.v('p', ['lorem ipsum']),
                    d_1.v('a', { href: '#foo' }, ['foo'])
                ];
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    aria: { describedBy: 'foo' },
                    closeable: true,
                    disabled: true,
                    show: true,
                    id: 'foo',
                    key: 'bar',
                    label: 'baz',
                    labelledBy: 'id'
                }, testChildren); });
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': 'id',
                    'aria-describedby': 'foo',
                    classes: [css.tab, null],
                    id: 'foo',
                    role: 'tabpanel'
                }, testChildren); });
            }
        }
    });
});
//# sourceMappingURL=Tab.js.map