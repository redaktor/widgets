(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/widget-core/meta/Dimensions", "@dojo/framework/widget-core/d", "@dojo/framework/testing/harness", "sinon", "../../../icon/index", "../../index", "../../../slide-pane/index", "../../styles/toolbar.m.css", "../../../theme/toolbar.m.css", "../../../global-event/index", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var d_1 = require("@dojo/framework/widget-core/d");
    var harness_1 = require("@dojo/framework/testing/harness");
    var sinon_1 = require("sinon");
    var index_1 = require("../../../icon/index");
    var index_2 = require("../../index");
    var index_3 = require("../../../slide-pane/index");
    var fixedCss = require("../../styles/toolbar.m.css");
    var css = require("../../../theme/toolbar.m.css");
    var index_4 = require("../../../global-event/index");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    registerSuite('Toolbar', {
        tests: {
            'default rendering': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {}); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, null],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    null,
                    null,
                    null
                ]); });
            },
            'expanded rendering': function () {
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                mockDimensionsGet.returns({
                    offset: { height: 100, left: 100, top: 100, width: 100 },
                    position: { bottom: 200, left: 100, right: 200, top: 100 },
                    scroll: { height: 100, left: 100, top: 100, width: 100 },
                    size: { width: 100, height: 100 }
                });
                mockMeta.withArgs(Dimensions_1.Dimensions).returns({
                    get: mockDimensionsGet
                });
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), { collapseWidth: 10 }); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, null],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    null,
                    null,
                    null
                ]); });
            },
            'custom title rendering': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, { heading: 'test' }); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, null],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    d_1.v('div', {
                        classes: css.title
                    }, ['test']),
                    null,
                    null
                ]); });
            },
            'actions rendering': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {}, ['test']); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, null],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    null,
                    d_1.v('div', {
                        classes: css.actions,
                        key: 'menu'
                    }, [
                        'test'
                    ]),
                    null
                ]); });
            },
            'open and close menu': function () {
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                mockDimensionsGet.returns({
                    offset: { height: 100, left: 100, top: 100, width: 100 },
                    position: { bottom: 200, left: 100, right: 200, top: 100 },
                    scroll: { height: 100, left: 100, top: 100, width: 100 },
                    size: { width: 100, height: 100 }
                });
                mockMeta.withArgs(Dimensions_1.Dimensions).returns({
                    get: mockDimensionsGet
                });
                var properties = {
                    collapseWidth: 1000,
                    onCollapse: function () { }
                };
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), properties, ['test']); });
                var slidePaneVDom = d_1.w(index_3.default, {
                    align: index_3.Align.right,
                    closeText: 'close',
                    key: 'slide-pane-menu',
                    onRequestClose: test_helpers_1.noop,
                    open: false,
                    theme: undefined,
                    title: 'foo'
                }, [
                    'test'
                ]);
                var buttonVDom = d_1.v('button', {
                    classes: css.menuButton,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    'open',
                    d_1.w(index_1.default, { type: 'barsIcon', theme: undefined })
                ]);
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, null],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    null,
                    d_1.v('div', {
                        classes: css.actions,
                        key: 'menu'
                    }, [
                        'test'
                    ]),
                    null
                ]); });
                properties = { heading: 'foo' };
                h.trigger('@global', function (node) {
                    if (d_1.isWNode(node) && node.properties.window !== undefined) {
                        return node.properties.window ? node.properties.window.resize : undefined;
                    }
                });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, css.collapsed],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    d_1.v('div', {
                        classes: css.title
                    }, ['foo']),
                    slidePaneVDom,
                    buttonVDom
                ]); });
                h.trigger("." + css.menuButton, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@slide-pane-menu', 'onRequestClose');
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    lang: null,
                    classes: [fixedCss.rootFixed, css.root, css.collapsed],
                    dir: ''
                }, [
                    d_1.w(index_4.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
                    d_1.v('div', {
                        classes: css.title
                    }, ['foo']),
                    slidePaneVDom,
                    buttonVDom
                ]); });
            }
        }
    });
});
//# sourceMappingURL=Toolbar.js.map