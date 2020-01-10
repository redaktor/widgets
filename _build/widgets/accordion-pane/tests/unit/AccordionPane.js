(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/widget-core/d", "sinon", "@dojo/framework/testing/harness", "../../../theme/accordion-pane.m.css", "../../index", "../../../title-pane/index", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = intern.getPlugin('chai').assert;
    var registerSuite = intern.getInterface('object').registerSuite;
    var d_1 = require("@dojo/framework/widget-core/d");
    var sinon = require("sinon");
    var harness_1 = require("@dojo/framework/testing/harness");
    var css = require("../../../theme/accordion-pane.m.css");
    var index_1 = require("../../index");
    var index_2 = require("../../../title-pane/index");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    registerSuite('AccordionPane', {
        tests: {
            'default rendering': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {}); });
                h.expect(function () { return d_1.v('div', {
                    classes: css.root
                }, []); });
            },
            'default rendering with children': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { openKeys: [] }, [
                    d_1.w(index_2.default, { title: 'foo', key: 'foo', onRequestOpen: function () { } }),
                    null,
                    d_1.w(index_2.default, { title: 'bar', key: 'bar', onRequestClose: function () { } }),
                    d_1.w(index_2.default, { title: 'baz', key: 'baz' })
                ]); });
                h.expect(function () { return d_1.v('div', {
                    classes: css.root
                }, [
                    d_1.w(index_2.default, {
                        key: 'foo',
                        onRequestClose: test_helpers_1.noop,
                        onRequestOpen: test_helpers_1.noop,
                        open: false,
                        theme: undefined,
                        title: 'foo'
                    }),
                    d_1.w(index_2.default, {
                        key: 'bar',
                        onRequestClose: test_helpers_1.noop,
                        onRequestOpen: test_helpers_1.noop,
                        open: false,
                        theme: undefined,
                        title: 'bar'
                    }),
                    d_1.w(index_2.default, {
                        key: 'baz',
                        onRequestClose: test_helpers_1.noop,
                        onRequestOpen: test_helpers_1.noop,
                        open: false,
                        theme: undefined,
                        title: 'baz'
                    })
                ]); });
            },
            'onRequestOpen should be called': function () {
                var onRequestOpen = sinon.stub();
                var h = harness_1.default(function () { return d_1.w(index_1.default, { onRequestOpen: onRequestOpen }, [
                    d_1.w(index_2.default, { title: 'foo', key: 'foo' })
                ]); });
                h.trigger('@foo', 'onRequestOpen');
                assert.isTrue(onRequestOpen.calledWith('foo'));
            },
            'onRequestClose should be called': function () {
                var onRequestClose = sinon.stub();
                var h = harness_1.default(function () { return d_1.w(index_1.default, { onRequestClose: onRequestClose }, [
                    d_1.w(index_2.default, { title: 'foo', key: 'foo' })
                ]); });
                h.trigger('@foo', 'onRequestClose');
                assert.isTrue(onRequestClose.calledWith('foo'));
            }
        }
    });
});
//# sourceMappingURL=AccordionPane.js.map