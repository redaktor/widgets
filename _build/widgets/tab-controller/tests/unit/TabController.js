(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "../../index", "../../TabButton", "../../../tab/index", "../../../theme/tab-controller.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon = require("sinon");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var TabButton_1 = require("../../TabButton");
    var index_2 = require("../../../tab/index");
    var css = require("../../../theme/tab-controller.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var compareLabelledBy = { selector: '*', property: 'labelledBy', comparator: test_helpers_1.isStringComparator };
    var compareControls = { selector: '*', property: 'controls', comparator: test_helpers_1.isStringComparator };
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, compareControls, compareLabelledBy]);
    var tabChildren = function (tabs) {
        if (tabs === void 0) { tabs = 2; }
        var children = [
            d_1.w(index_2.default, {
                key: '0'
            }, ['tab content 1']),
            d_1.w(index_2.default, {
                closeable: true,
                disabled: true,
                key: '1',
                label: 'foo'
            }, ['tab content 2'])
        ];
        if (tabs > 2) {
            for (var i = 2; i < tabs; i++) {
                children.push(d_1.w(index_2.default, {
                    key: "" + i
                }, ["tab content " + i]));
            }
        }
        return children;
    };
    var expectedTabButtons = function (empty, activeIndex, callFocus) {
        if (empty === void 0) { empty = false; }
        if (activeIndex === void 0) { activeIndex = 0; }
        if (callFocus === void 0) { callFocus = false; }
        if (empty) {
            return d_1.v('div', {
                key: 'buttons',
                classes: css.tabButtons
            }, []);
        }
        return d_1.v('div', {
            key: 'buttons',
            classes: css.tabButtons
        }, [
            d_1.w(TabButton_1.default, {
                callFocus: false,
                active: activeIndex === 0,
                closeable: undefined,
                controls: '',
                disabled: undefined,
                id: '',
                index: 0,
                key: '0-tabbutton',
                onClick: test_helpers_1.noop,
                onCloseClick: test_helpers_1.noop,
                onDownArrowPress: test_helpers_1.noop,
                onEndPress: test_helpers_1.noop,
                onFocusCalled: test_helpers_1.noop,
                onHomePress: test_helpers_1.noop,
                onLeftArrowPress: test_helpers_1.noop,
                onRightArrowPress: test_helpers_1.noop,
                onUpArrowPress: test_helpers_1.noop,
                theme: undefined
            }, [null]),
            d_1.w(TabButton_1.default, {
                callFocus: false,
                active: activeIndex === 1,
                closeable: true,
                controls: '',
                disabled: true,
                id: '',
                index: 1,
                key: '1-tabbutton',
                onClick: test_helpers_1.noop,
                onCloseClick: test_helpers_1.noop,
                onDownArrowPress: test_helpers_1.noop,
                onEndPress: test_helpers_1.noop,
                onFocusCalled: test_helpers_1.noop,
                onHomePress: test_helpers_1.noop,
                onLeftArrowPress: test_helpers_1.noop,
                onRightArrowPress: test_helpers_1.noop,
                onUpArrowPress: test_helpers_1.noop,
                theme: undefined
            }, ['foo'])
        ]);
    };
    var expectedTabContent = function (index) {
        if (index === void 0) { index = 0; }
        if (index < 0 || index > 1) {
            return null;
        }
        var tabs = [
            d_1.w(index_2.default, {
                key: '0',
                id: '',
                labelledBy: '',
                show: index === 0
            }, ['tab content 1']),
            d_1.w(index_2.default, {
                closeable: true,
                disabled: true,
                key: '1',
                label: 'foo',
                id: '',
                show: index === 1,
                labelledBy: ''
            }, ['tab content 2'])
        ];
        return d_1.v('div', {
            key: 'tabs',
            classes: css.tabs
        }, tabs);
    };
    var expected = function (children, describedby, classes, vertical) {
        if (children === void 0) { children = []; }
        if (describedby === void 0) { describedby = ''; }
        if (classes === void 0) { classes = [null, css.root]; }
        if (vertical === void 0) { vertical = false; }
        var overrides = describedby ? {
            'aria-describedby': describedby
        } : null;
        return d_1.v('div', tslib_1.__assign({ 'aria-orientation': vertical ? 'vertical' : 'horizontal', classes: classes, role: 'tablist' }, overrides), children);
    };
    registerSuite('TabController', {
        tests: {
            'default properties': function () {
                var children = [];
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 0
                }, children); });
                var tabButtons = expectedTabButtons(true);
                var tabContent = null;
                h.expect(function () { return expected([tabButtons, tabContent]); });
                children = tabChildren();
                tabButtons = expectedTabButtons();
                tabContent = expectedTabContent();
                h.expect(function () { return expected([tabButtons, tabContent]); });
            },
            'aria properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 0,
                    aria: {
                        describedBy: 'foo',
                        orientation: 'overridden'
                    }
                }); });
                h.expect(function () { return expected([expectedTabButtons(true), null], 'foo'); });
            },
            'custom orientation': function () {
                var properties = {
                    activeIndex: 0,
                    alignButtons: index_1.Align.bottom
                };
                var h = harness(function () { return d_1.w(index_1.default, properties, tabChildren()); });
                var tabButtons = expectedTabButtons();
                var tabContent = expectedTabContent();
                h.expect(function () { return expected([tabContent, tabButtons], '', [css.alignBottom, css.root]); });
                properties = {
                    activeIndex: 0,
                    alignButtons: index_1.Align.right
                };
                tabButtons = expectedTabButtons();
                tabContent = expectedTabContent();
                h.expect(function () { return expected([tabContent, tabButtons], '', [css.alignRight, css.root], true); });
                properties = {
                    activeIndex: 0,
                    alignButtons: index_1.Align.left
                };
                h.expect(function () { return expected([tabButtons, tabContent], '', [css.alignLeft, css.root], true); });
            },
            'Clicking tab should change activeIndex': function () {
                var onRequestTabChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 2,
                    onRequestTabChange: onRequestTabChange
                }, tabChildren(3)); });
                h.trigger('@0-tabbutton', 'onClick', 0);
                assert.isTrue(onRequestTabChange.calledOnce, 'onRequestTabChange called when tab is clicked');
                assert.isTrue(onRequestTabChange.calledWith(0, '0'), 'onRequestTabChange called with correct index and key');
                h.trigger('@1-tabbutton', 'onClick', 1);
                assert.isTrue(onRequestTabChange.calledOnce, 'onRequestTabChange not called on disabled tabs');
                h.trigger('@2-tabbutton', 'onClick', 2);
                assert.isTrue(onRequestTabChange.calledOnce, 'onRequestTabChange not called on the active tab');
            },
            'Closing a tab should change tabs': function () {
                var onRequestTabClose = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 2,
                    onRequestTabClose: onRequestTabClose
                }, tabChildren(3)); });
                h.trigger('@2-tabbutton', 'onCloseClick', 2);
                assert.isTrue(onRequestTabClose.calledOnce, 'onRequestTabClose called when a tab\'s onCloseClick fires');
                assert.isTrue(onRequestTabClose.calledWith(2, '2'), 'onRequestTabClose called with correct index and key');
            },
            'Basic keyboard navigation': function () {
                var onRequestTabChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 2,
                    onRequestTabChange: onRequestTabChange
                }, tabChildren(5)); });
                h.trigger('@2-tabbutton', 'onRightArrowPress', 2);
                assert.strictEqual(onRequestTabChange.getCall(0).args[0], 3, 'Right arrow moves to next tab');
                h.trigger('@2-tabbutton', 'onDownArrowPress', 2);
                assert.isTrue(onRequestTabChange.calledOnce, 'Down arrow does nothing on horizontal tabs');
                h.trigger('@2-tabbutton', 'onLeftArrowPress', 2);
                assert.strictEqual(onRequestTabChange.getCall(1).args[0], 0, 'Left arrow moves to previous tab, skipping disabled tab');
                h.trigger('@2-tabbutton', 'onUpArrowPress', 2);
                assert.isTrue(onRequestTabChange.calledTwice, 'Up arrow does nothing on horizontal tabs');
                h.trigger('@2-tabbutton', 'onHomePress', 2);
                assert.strictEqual(onRequestTabChange.getCall(2).args[0], 0, 'Home moves to first tab');
                h.trigger('@2-tabbutton', 'onEndPress', 2);
                assert.strictEqual(onRequestTabChange.getCall(3).args[0], 4, 'End moves to last tab');
            },
            'Arrow keys wrap to first and last tab': function () {
                var onRequestTabChange = sinon.stub();
                var properties = {
                    activeIndex: 0,
                    onRequestTabChange: onRequestTabChange
                };
                var h = harness(function () { return d_1.w(index_1.default, properties, tabChildren(3)); });
                h.trigger('@0-tabbutton', 'onLeftArrowPress', 2);
                assert.isTrue(onRequestTabChange.calledWith(2), 'Left arrow wraps from first to last tab');
                properties = {
                    activeIndex: 2,
                    onRequestTabChange: onRequestTabChange
                };
                h.trigger('@2-tabbutton', 'onRightArrowPress', 2);
                assert.isTrue(onRequestTabChange.calledWith(0), 'Right arrow wraps from last to first tab');
            },
            'Arrow keys on vertical tabs': function () {
                var onRequestTabChange = sinon.stub();
                var properties = {
                    activeIndex: 0,
                    alignButtons: index_1.Align.right,
                    onRequestTabChange: onRequestTabChange
                };
                var h = harness(function () { return d_1.w(index_1.default, properties, tabChildren(5)); });
                h.trigger('@0-tabbutton', 'onDownArrowPress', 0);
                assert.strictEqual(onRequestTabChange.getCall(0).args[0], 2, 'Down arrow moves to next tab, skipping disabled tab');
                h.trigger('@0-tabbutton', 'onRightArrowPress', 0);
                assert.strictEqual(onRequestTabChange.getCall(1).args[0], 2, 'Right arrow works on vertical tabs');
                h.trigger('@0-tabbutton', 'onUpArrowPress', 0);
                assert.strictEqual(onRequestTabChange.getCall(2).args[0], 4, 'Up arrow moves to previous tab');
                h.trigger('@0-tabbutton', 'onLeftArrowPress', 0);
                assert.strictEqual(onRequestTabChange.getCall(3).args[0], 4, 'Left arrow works on vertical tabs');
                properties = {
                    activeIndex: 0,
                    alignButtons: index_1.Align.left,
                    onRequestTabChange: onRequestTabChange
                };
                h.trigger('@0-tabbutton', 'onDownArrowPress', 0);
                assert.strictEqual(onRequestTabChange.getCall(4).args[0], 2, 'Down arrow works on left-aligned tabs');
            },
            'Should default to last tab if invalid activeIndex passed': function () {
                var onRequestTabChange = sinon.stub();
                harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 5,
                    onRequestTabChange: onRequestTabChange
                }, tabChildren(5)); });
                assert.isTrue(onRequestTabChange.calledWith(4));
            },
            'Should skip tab if activeIndex is disabled': function () {
                var onRequestTabChange = sinon.stub();
                harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 1,
                    onRequestTabChange: onRequestTabChange
                }, tabChildren(5)); });
                assert.isTrue(onRequestTabChange.calledWith(2));
            },
            'Clicking on tab button sets callFocus to true': function () {
                var properties = {
                    activeIndex: 1
                };
                var children = [
                    d_1.w(index_2.default, {
                        key: '0',
                        show: false
                    }, ['tab content 1']),
                    d_1.w(index_2.default, {
                        closeable: true,
                        key: '1',
                        label: 'foo',
                        show: true
                    }, ['tab content 2'])
                ];
                var h = harness(function () { return d_1.w(index_1.default, properties, children); });
                var tabButtons = d_1.v('div', {
                    key: 'buttons',
                    classes: css.tabButtons
                }, [
                    d_1.w(TabButton_1.default, {
                        callFocus: false,
                        active: false,
                        closeable: undefined,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 0,
                        key: '0-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, [null]),
                    d_1.w(TabButton_1.default, {
                        callFocus: false,
                        active: true,
                        closeable: true,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 1,
                        key: '1-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, ['foo'])
                ]);
                var tabContent = d_1.v('div', {
                    key: 'tabs',
                    classes: css.tabs
                }, [
                    d_1.w(index_2.default, {
                        id: '',
                        key: '0',
                        labelledBy: '',
                        show: false
                    }, ['tab content 1']),
                    d_1.w(index_2.default, {
                        id: '',
                        labelledBy: '',
                        closeable: true,
                        key: '1',
                        show: true,
                        label: 'foo'
                    }, ['tab content 2'])
                ]);
                h.expect(function () { return expected([tabButtons, tabContent]); });
                h.trigger('@0-tabbutton', 'onClick', 0);
                properties = {
                    activeIndex: 0
                };
                tabContent = d_1.v('div', {
                    key: 'tabs',
                    classes: css.tabs
                }, [
                    d_1.w(index_2.default, {
                        id: '',
                        labelledBy: '',
                        show: true,
                        key: '0'
                    }, ['tab content 1']),
                    d_1.w(index_2.default, {
                        id: '',
                        labelledBy: '',
                        closeable: true,
                        key: '1',
                        label: 'foo',
                        show: false
                    }, ['tab content 2'])
                ]);
                tabButtons = d_1.v('div', {
                    key: 'buttons',
                    classes: css.tabButtons
                }, [
                    d_1.w(TabButton_1.default, {
                        callFocus: true,
                        active: true,
                        closeable: undefined,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 0,
                        key: '0-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, [null]),
                    d_1.w(TabButton_1.default, {
                        callFocus: false,
                        active: false,
                        closeable: true,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 1,
                        key: '1-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, ['foo'])
                ]);
                h.expect(function () { return expected([tabButtons, tabContent]); });
                h.trigger('@0-tabbutton', 'onFocusCalled', 0);
                tabContent = d_1.v('div', {
                    key: 'tabs',
                    classes: css.tabs
                }, [
                    d_1.w(index_2.default, {
                        id: '',
                        labelledBy: '',
                        key: '0',
                        show: true
                    }, ['tab content 1']),
                    d_1.w(index_2.default, {
                        id: '',
                        labelledBy: '',
                        closeable: true,
                        key: '1',
                        label: 'foo',
                        show: false
                    }, ['tab content 2'])
                ]);
                tabButtons = d_1.v('div', {
                    key: 'buttons',
                    classes: css.tabButtons
                }, [
                    d_1.w(TabButton_1.default, {
                        callFocus: false,
                        active: true,
                        closeable: undefined,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 0,
                        key: '0-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, [null]),
                    d_1.w(TabButton_1.default, {
                        callFocus: false,
                        active: false,
                        closeable: true,
                        controls: '',
                        disabled: undefined,
                        id: '',
                        index: 1,
                        key: '1-tabbutton',
                        onClick: test_helpers_1.noop,
                        onCloseClick: test_helpers_1.noop,
                        onDownArrowPress: test_helpers_1.noop,
                        onEndPress: test_helpers_1.noop,
                        onFocusCalled: test_helpers_1.noop,
                        onHomePress: test_helpers_1.noop,
                        onLeftArrowPress: test_helpers_1.noop,
                        onRightArrowPress: test_helpers_1.noop,
                        onUpArrowPress: test_helpers_1.noop,
                        theme: undefined
                    }, ['foo'])
                ]);
                h.expect(function () { return expected([tabButtons, tabContent]); });
            }
        }
    });
});
//# sourceMappingURL=TabController.js.map