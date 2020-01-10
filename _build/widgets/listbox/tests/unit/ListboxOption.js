(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "sinon", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../ListboxOption", "../../../theme/listbox.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon = require("sinon");
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var ListboxOption_1 = require("../../ListboxOption");
    var css = require("../../../theme/listbox.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    registerSuite('ListboxOption', {
        tests: {
            'default render': function () {
                var h = harness_1.default(function () { return d_1.w(ListboxOption_1.default, {
                    label: 'foo',
                    id: 'bar',
                    index: 0,
                    option: 'baz'
                }); });
                h.expect(function () { return d_1.v('div', {
                    'aria-disabled': null,
                    'aria-selected': 'false',
                    classes: [],
                    id: 'bar',
                    role: 'option',
                    onclick: test_helpers_1.noop
                }, ['foo']); });
            },
            'custom properties': function () {
                var h = harness_1.default(function () { return d_1.w(ListboxOption_1.default, {
                    active: true,
                    classes: [css.option],
                    disabled: true,
                    label: 'foo',
                    id: 'bar',
                    index: 1,
                    option: 'baz',
                    selected: true
                }); });
                h.expect(function () { return d_1.v('div', {
                    'aria-disabled': 'true',
                    'aria-selected': null,
                    classes: [css.option],
                    id: 'bar',
                    role: 'option',
                    onclick: test_helpers_1.noop
                }, ['foo']); });
            },
            'option click': function () {
                var onClick = sinon.stub();
                var h = harness_1.default(function () { return d_1.w(ListboxOption_1.default, {
                    label: 'foo',
                    id: 'bar',
                    classes: [css.option],
                    index: 1,
                    option: 'baz',
                    onClick: onClick
                }); });
                h.trigger("." + css.option, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onClick.calledWith('baz', 1));
            }
        }
    });
});
//# sourceMappingURL=ListboxOption.js.map