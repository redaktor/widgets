(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/widget-core/d", "@dojo/framework/testing/harness", "../../index", "../../../theme/tooltip.m.css", "../../styles/tooltip.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var d_1 = require("@dojo/framework/widget-core/d");
    var harness_1 = require("@dojo/framework/testing/harness");
    var index_1 = require("../../index");
    var css = require("../../../theme/tooltip.m.css");
    var fixedCss = require("../../styles/tooltip.m.css");
    registerSuite('Tooltip', {
        tests: {
            'should construct Tooltip': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { content: '' }); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.right, fixedCss.rootFixed, fixedCss.rightFixed]
                }, [
                    d_1.v('div', { key: 'target' }, []),
                    null
                ]); });
            },
            'should render content if open': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    content: 'foobar',
                    open: true
                }); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.right, fixedCss.rootFixed, fixedCss.rightFixed]
                }, [
                    d_1.v('div', { key: 'target' }, []),
                    d_1.v('div', {
                        key: 'content',
                        classes: [css.content, fixedCss.contentFixed]
                    }, ['foobar'])
                ]); });
            },
            'should render correct orientation': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    orientation: index_1.Orientation.bottom,
                    content: 'foobar'
                }); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.bottom, fixedCss.rootFixed, fixedCss.bottomFixed]
                }, [
                    d_1.v('div', { key: 'target' }, []),
                    null
                ]); });
            },
            'should render aria properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    aria: { describedBy: 'foo' },
                    content: 'bar',
                    open: true
                }); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.right, fixedCss.rootFixed, fixedCss.rightFixed]
                }, [
                    d_1.v('div', { key: 'target' }, []),
                    d_1.v('div', {
                        key: 'content',
                        'aria-describedby': 'foo',
                        classes: [css.content, fixedCss.contentFixed]
                    }, ['bar'])
                ]); });
            }
        }
    });
});
//# sourceMappingURL=Tooltip.js.map