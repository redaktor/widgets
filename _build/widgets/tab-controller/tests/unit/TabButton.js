(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/testing/harness", "../../../../dojo/core/lang", "../../TabButton", "../../../theme/tab-controller.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon = require("sinon");
    var d_1 = require("@dojo/framework/widget-core/d");
    var harness_1 = require("@dojo/framework/testing/harness");
    var lang_1 = require("../../../../dojo/core/lang");
    var TabButton_1 = require("../../TabButton");
    var css = require("../../../theme/tab-controller.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var props = function (props) {
        if (props === void 0) { props = {}; }
        return lang_1.assign({
            controls: 'foo',
            id: 'foo',
            index: 0
        }, props);
    };
    var testChildren = [
        d_1.v('p', ['lorem ipsum']),
        d_1.v('a', { href: '#foo' }, ['foo'])
    ];
    var expected = function (closeable, disabled, activeTab, children) {
        if (closeable === void 0) { closeable = false; }
        if (disabled === void 0) { disabled = false; }
        if (activeTab === void 0) { activeTab = -1; }
        if (children === void 0) { children = []; }
        children.push(closeable ? d_1.v('button', {
            tabIndex: activeTab,
            classes: css.close,
            type: 'button',
            onclick: test_helpers_1.noop
        }, ['close']) : null);
        return d_1.v('div', {
            'aria-controls': 'foo',
            'aria-disabled': disabled ? 'true' : 'false',
            'aria-selected': activeTab !== -1 ? 'true' : 'false',
            classes: [
                css.tabButton,
                activeTab !== -1 ? css.activeTabButton : null,
                closeable ? css.closeable : null,
                disabled ? css.disabledTabButton : null
            ],
            dir: '',
            id: 'foo',
            key: 'tab-button',
            lang: null,
            onclick: test_helpers_1.noop,
            onkeydown: test_helpers_1.noop,
            role: 'tab',
            tabIndex: activeTab
        }, children);
    };
    registerSuite('TabButton', {
        tests: {
            'default properties': function () {
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props()); });
                h.expect(expected);
            },
            'custom properties': function () {
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props({
                    closeable: true,
                    disabled: true
                }), testChildren); });
                h.expect(function () { return expected(true, true, -1, testChildren); });
            },
            'active tab': function () {
                var extraProps = {
                    active: true
                };
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props(extraProps)); });
                h.expect(function () { return expected(false, false, 0); });
                extraProps = {
                    active: true,
                    closeable: true
                };
                h.expect(function () { return expected(true, false, 0); });
            },
            onCloseClick: function () {
                var onCloseClick = sinon.stub();
                var stopPropagation = sinon.stub();
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props({
                    closeable: true,
                    onCloseClick: onCloseClick
                })); });
                h.trigger('button', 'onclick', { stopPropagation: stopPropagation });
                assert.isTrue(onCloseClick.called, 'onCloseClick handler called when close button clicked');
            },
            onClick: function () {
                var onClick = sinon.stub();
                var stopPropagation = sinon.stub();
                var extraProps = {
                    onClick: onClick
                };
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props(extraProps)); });
                h.trigger('@tab-button', 'onclick', { stopPropagation: stopPropagation });
                assert.isTrue(onClick.calledOnce, 'onClick handler called when tab is clicked');
                assert.isTrue(onClick.calledWith(0), 'onClick called with index as argument');
                extraProps = {
                    disabled: true,
                    onClick: onClick
                };
                h.trigger('@tab-button', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onClick.calledOnce, 'onClick handler not called when tab is disabled');
            },
            'keyboard navigation': function () {
                var onDownArrowPress = sinon.stub();
                var onEndPress = sinon.stub();
                var onHomePress = sinon.stub();
                var onLeftArrowPress = sinon.stub();
                var onRightArrowPress = sinon.stub();
                var onUpArrowPress = sinon.stub();
                var stopPropagation = sinon.stub();
                var extraProps = {
                    onDownArrowPress: onDownArrowPress,
                    onEndPress: onEndPress,
                    onHomePress: onHomePress,
                    onLeftArrowPress: onLeftArrowPress,
                    onRightArrowPress: onRightArrowPress,
                    onUpArrowPress: onUpArrowPress
                };
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props(extraProps)); });
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Down, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onDownArrowPress.calledOnce, 'Down arrow event handler called on down arrow press');
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.End, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onEndPress.calledOnce, 'End key event handler called on end key press');
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Home, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onHomePress.calledOnce, 'Home event handler called on home key press');
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Left, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onLeftArrowPress.calledOnce, 'Left arrow event handler called on left arrow press');
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Right, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onRightArrowPress.calledOnce, 'Right arrow event handler called on right arrow press');
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Up, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onUpArrowPress.calledOnce, 'Up arrow event handler called on up arrow press');
                extraProps = {
                    disabled: true,
                    onDownArrowPress: onDownArrowPress,
                    onEndPress: onEndPress,
                    onHomePress: onHomePress,
                    onLeftArrowPress: onLeftArrowPress,
                    onRightArrowPress: onRightArrowPress,
                    onUpArrowPress: onUpArrowPress
                };
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Down, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onDownArrowPress.calledOnce, 'key handlers not called when tab is disabled');
            },
            'Escape should close tab': function () {
                var onCloseClick = sinon.stub();
                var stopPropagation = sinon.stub();
                var extraProps = {
                    onCloseClick: onCloseClick
                };
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props(extraProps)); });
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Escape, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isFalse(onCloseClick.called, 'onCloseClick not called if closeable is false');
                extraProps = {
                    closeable: true,
                    onCloseClick: onCloseClick
                };
                h.trigger('@tab-button', 'onkeydown', tslib_1.__assign({ which: Keys.Escape, stopPropagation: stopPropagation }, test_helpers_1.stubEvent));
                assert.isTrue(onCloseClick.called, 'onCloseClick handler called on escape keydown if closeable');
            },
            'Focus is restored after render': function () {
                var onFocusCalled = sinon.stub();
                var extraProps = {
                    onFocusCalled: onFocusCalled,
                    callFocus: true
                };
                var h = harness_1.default(function () { return d_1.w(TabButton_1.default, props(extraProps)); });
                assert.isTrue(onFocusCalled.calledOnce, 'onFocusCalled called on render if callFocus is true');
                extraProps = {
                    callFocus: false,
                    onFocusCalled: onFocusCalled
                };
                h.expect(function () { return expected(false, false); });
                assert.isTrue(onFocusCalled.calledOnce, 'onFocusCalled not called if callFocus is false');
            }
        }
    });
});
//# sourceMappingURL=TabButton.js.map