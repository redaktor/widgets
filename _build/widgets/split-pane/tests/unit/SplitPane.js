(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/testing/harness", "../../../theme/split-pane.m.css", "../../styles/split-pane.m.css", "../../index", "../../../global-event/index", "@dojo/framework/widget-core/meta/Dimensions", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon_1 = require("sinon");
    var d_1 = require("@dojo/framework/widget-core/d");
    var harness_1 = require("@dojo/framework/testing/harness");
    var css = require("../../../theme/split-pane.m.css");
    var fixedCss = require("../../styles/split-pane.m.css");
    var index_1 = require("../../index");
    var index_2 = require("../../../global-event/index");
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    function createVNodeSelector(type, name) {
        return function (node) {
            if (d_1.isWNode(node) && node.properties[type] !== undefined) {
                var globalFuncs = node.properties[type];
                return globalFuncs ? globalFuncs[name] : undefined;
            }
        };
    }
    registerSuite('SplitPane', {
        tests: {
            'Should construct SplitPane with passed properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {}); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root, null, css.column, fixedCss.rootFixed, fixedCss.columnFixed, null],
                    key: 'root'
                }, [
                    d_1.w(index_2.GlobalEvent, {
                        key: 'global',
                        window: {
                            mouseup: test_helpers_1.noop,
                            mousemove: test_helpers_1.noop,
                            touchmove: test_helpers_1.noop,
                            resize: test_helpers_1.noop
                        }
                    }),
                    d_1.v('div', {
                        classes: [css.leading, fixedCss.leadingFixed],
                        key: 'leading',
                        styles: { width: '100px' }
                    }, []),
                    d_1.v('div', {
                        classes: [css.divider, fixedCss.dividerFixed],
                        key: 'divider',
                        onmousedown: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        ontouchstart: test_helpers_1.noop
                    }),
                    d_1.v('div', {
                        classes: [css.trailing, fixedCss.trailingFixed],
                        key: 'trailing'
                    }, [])
                ]); });
            },
            'Should construct SplitPane with default properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    direction: index_1.Direction.row,
                    onResize: test_helpers_1.noop,
                    size: 200
                }, [
                    'abc',
                    'def'
                ]); });
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root, null, css.row, fixedCss.rootFixed, fixedCss.rowFixed, null],
                    key: 'root'
                }, [
                    d_1.w(index_2.GlobalEvent, {
                        key: 'global',
                        window: {
                            mouseup: test_helpers_1.noop,
                            mousemove: test_helpers_1.noop,
                            touchmove: test_helpers_1.noop,
                            resize: test_helpers_1.noop
                        }
                    }),
                    d_1.v('div', {
                        classes: [css.leading, fixedCss.leadingFixed],
                        key: 'leading',
                        styles: { height: '200px' }
                    }, ['abc']),
                    d_1.v('div', {
                        classes: [css.divider, fixedCss.dividerFixed],
                        key: 'divider',
                        onmousedown: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        ontouchstart: test_helpers_1.noop
                    }),
                    d_1.v('div', {
                        classes: [css.trailing, fixedCss.trailingFixed],
                        key: 'trailing'
                    }, ['def'])
                ]); });
            },
            'Pane should not be a negative size': function () {
                var setSize;
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                mockDimensionsGet.withArgs('root').returns({
                    offset: {
                        width: 200
                    }
                });
                mockDimensionsGet.withArgs('divider').returns({
                    offset: {
                        width: 100
                    }
                });
                mockMeta.withArgs(Dimensions_1.Dimensions).returns({
                    get: mockDimensionsGet
                });
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), {
                    onResize: function (size) { return setSize = size; }
                }); });
                h.trigger('@global', createVNodeSelector('window', 'mousemove'), tslib_1.__assign({ clientX: 0 }, test_helpers_1.stubEvent));
                h.trigger('@divider', 'onmousedown', tslib_1.__assign({ clientX: 500 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mousemove'), tslib_1.__assign({ clientX: 0 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mouseup'), test_helpers_1.stubEvent);
                assert.strictEqual(setSize, 0);
            },
            'Pane should not be greater than root widget': function () {
                var setSize;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onResize: function (size) { return setSize = size; }
                }); });
                h.trigger('@divider', 'onmousedown', tslib_1.__assign({ clientX: 0 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mousemove'), tslib_1.__assign({ clientX: 500 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mouseup'), tslib_1.__assign({ clientX: 0 }, test_helpers_1.stubEvent));
                assert.strictEqual(setSize, 0);
            },
            'Mouse move should call onResize for column': function () {
                var called = false;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onResize: function () { return called = true; }
                }); });
                h.trigger('@divider', 'onmousedown', tslib_1.__assign({ clientX: 110 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mousemove'), tslib_1.__assign({ clientX: 150 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mouseup'), test_helpers_1.stubEvent);
                assert.isTrue(called);
            },
            'Should collapse when width is less than collapse width': function () {
                var onCollapse = sinon_1.stub();
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                mockDimensionsGet.withArgs('root').returns({
                    size: {
                        width: 500
                    }
                });
                var metaReturn = {
                    get: mockDimensionsGet,
                    has: function () { return false; }
                };
                mockMeta.withArgs(Dimensions_1.Dimensions).returns(metaReturn);
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), { onCollapse: onCollapse }); });
                metaReturn.has = function () { return true; };
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.calledOnce);
                assert.isTrue(onCollapse.calledWith(true));
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.calledOnce);
            },
            'Should expand when width is greater than collapse width': function () {
                var onCollapse = sinon_1.stub();
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                var dimensions = {
                    size: {
                        width: 500
                    }
                };
                mockDimensionsGet.withArgs('root').returns(dimensions);
                var metaReturn = {
                    get: mockDimensionsGet,
                    has: function () { return false; }
                };
                mockMeta.withArgs(Dimensions_1.Dimensions).returns(metaReturn);
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), { onCollapse: onCollapse }); });
                metaReturn.has = function () { return true; };
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.calledOnce);
                assert.isTrue(onCollapse.calledWith(true));
                dimensions.size.width = 700;
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.calledTwice);
                assert.isTrue(onCollapse.calledWith(false));
            },
            'Should collapse when width is less than custom collapse width': function () {
                var onCollapse = sinon_1.stub();
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                var dimensions = {
                    size: {
                        width: 500
                    }
                };
                mockDimensionsGet.withArgs('root').returns(dimensions);
                var metaReturn = {
                    get: mockDimensionsGet,
                    has: function () { return false; }
                };
                mockMeta.withArgs(Dimensions_1.Dimensions).returns(metaReturn);
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), { onCollapse: onCollapse, collapseWidth: 400 }); });
                metaReturn.has = function () { return true; };
                dimensions.size.width = 300;
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.calledOnce);
                assert.isTrue(onCollapse.calledWith(true));
                h.expectPartial('@leading', function () { return d_1.v('div', {
                    classes: [
                        css.leading,
                        fixedCss.leadingFixed
                    ],
                    key: 'leading',
                    styles: { width: 'auto' }
                }, []); });
            },
            'collapse is ignored when using Direction.Row configuration': function () {
                var onCollapse = sinon_1.stub();
                var mockMeta = sinon_1.stub();
                var mockDimensionsGet = sinon_1.stub();
                mockDimensionsGet.withArgs('root').returns({
                    size: {
                        width: 500
                    }
                });
                mockMeta.withArgs(Dimensions_1.Dimensions).returns({
                    get: mockDimensionsGet
                });
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), { onCollapse: onCollapse, direction: index_1.Direction.row }); });
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                assert.isTrue(onCollapse.notCalled);
            },
            'Mouse move should call onResize for row': function () {
                var called = false;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onResize: function () { return called = true; },
                    direction: index_1.Direction.row
                }); });
                h.trigger('@divider', 'onmousedown', tslib_1.__assign({ clientX: 110 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mousemove'), tslib_1.__assign({ clientX: 150 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'mouseup'), test_helpers_1.stubEvent);
                assert.isTrue(called);
            },
            'Touch move should call onResize for column': function () {
                var called = false;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onResize: function () { return called = true; },
                    direction: index_1.Direction.column,
                    size: 100
                }); });
                h.trigger('@divider', 'ontouchstart', tslib_1.__assign({ clientX: 110 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchmove'), tslib_1.__assign({ clientX: 150 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchend'), test_helpers_1.stubEvent);
                assert.isTrue(called);
            },
            'Touch move should call onResize for row': function () {
                var called = 0;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onResize: function () { return called++; },
                    direction: index_1.Direction.row
                }); });
                h.trigger('@divider', 'ontouchstart', tslib_1.__assign({ clientX: 110 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchmove'), tslib_1.__assign({ clientX: 150 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchend'), test_helpers_1.stubEvent);
                h.trigger('@divider', 'ontouchstart', tslib_1.__assign({ clientX: 110 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchmove'), tslib_1.__assign({ clientX: 150 }, test_helpers_1.stubEvent));
                h.trigger('@global', createVNodeSelector('window', 'touchend'), test_helpers_1.stubEvent);
                assert.strictEqual(called, 2);
            }
        }
    });
});
//# sourceMappingURL=SplitPane.js.map