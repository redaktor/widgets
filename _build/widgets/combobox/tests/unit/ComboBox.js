(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../index", "../../../icon/index", "../../../label/index", "../../../listbox/index", "../../../text-input/index", "../../../theme/combobox.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon = require("sinon");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var index_1 = require("../../index");
    var index_2 = require("../../../icon/index");
    var index_3 = require("../../../label/index");
    var index_4 = require("../../../listbox/index");
    var index_5 = require("../../../text-input/index");
    var css = require("../../../theme/combobox.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareWidgetId, test_helpers_1.compareAria, test_helpers_1.compareAriaControls]);
    var testOptions = [
        {
            label: 'One',
            value: 'one'
        },
        {
            label: 'Two',
            value: 'two'
        },
        {
            label: 'Three',
            value: 'three',
            disabled: true
        }
    ];
    var testProperties = {
        clearable: true,
        getResultLabel: function (result) { return result.label; },
        widgetId: 'foo',
        label: 'foo',
        results: testOptions,
        value: 'one',
        theme: {}
    };
    var getExpectedControls = function (useTestProperties, label, states, callFocus) {
        if (states === void 0) { states = {}; }
        if (callFocus === void 0) { callFocus = false; }
        var disabled = states.disabled, invalid = states.invalid, readOnly = states.readOnly, required = states.required;
        var controlsVdom = d_1.v('div', {
            classes: css.controls
        }, [
            d_1.w(index_5.default, {
                key: 'textinput',
                aria: {
                    activedescendant: '',
                    controls: '',
                    owns: ''
                },
                disabled: disabled,
                shouldFocus: callFocus,
                widgetId: useTestProperties ? 'foo' : '',
                invalid: invalid,
                readOnly: readOnly,
                required: required,
                theme: useTestProperties ? {} : undefined,
                value: useTestProperties ? 'one' : '',
                onBlur: test_helpers_1.noop,
                onFocus: test_helpers_1.noop,
                onInput: test_helpers_1.noop,
                onKeyDown: test_helpers_1.noop
            }),
            useTestProperties ? d_1.v('button', {
                'aria-controls': '',
                key: 'clear',
                classes: css.clear,
                disabled: disabled || readOnly,
                type: 'button',
                onclick: test_helpers_1.noop
            }, [
                useTestProperties ? 'clear foo' : 'clear ',
                d_1.w(index_2.default, { type: 'closeIcon', theme: useTestProperties ? {} : undefined })
            ]) : null,
            d_1.v('button', {
                key: 'trigger',
                classes: css.trigger,
                disabled: disabled || readOnly,
                tabIndex: -1,
                type: 'button',
                onclick: test_helpers_1.noop
            }, [
                useTestProperties ? 'open foo' : 'open ',
                d_1.w(index_2.default, { type: 'downIcon', theme: useTestProperties ? {} : undefined })
            ])
        ]);
        return controlsVdom;
    };
    var getExpectedMenu = function (useTestProperties, open, overrides) {
        if (overrides === void 0) { overrides = {}; }
        if (!open || !useTestProperties) {
            return null;
        }
        return d_1.v('div', {
            key: 'dropdown',
            classes: css.dropdown,
            onmouseover: test_helpers_1.noop,
            onmousedown: test_helpers_1.noop
        }, [
            d_1.w(index_4.default, tslib_1.__assign({ activeIndex: 0, widgetId: '', key: 'listbox', visualFocus: false, optionData: testOptions, tabIndex: -1, getOptionDisabled: undefined, getOptionId: test_helpers_1.noop, getOptionLabel: test_helpers_1.noop, getOptionSelected: test_helpers_1.noop, onActiveIndexChange: test_helpers_1.noop, onOptionSelect: test_helpers_1.noop, theme: useTestProperties ? {} : undefined }, overrides))
        ]);
    };
    var getExpectedVdom = function (useTestProperties, open, label, states, callFocus, focused) {
        if (useTestProperties === void 0) { useTestProperties = false; }
        if (open === void 0) { open = false; }
        if (label === void 0) { label = false; }
        if (states === void 0) { states = {}; }
        if (callFocus === void 0) { callFocus = false; }
        if (focused === void 0) { focused = false; }
        var menuVdom = getExpectedMenu(useTestProperties, open);
        var controlsVdom = getExpectedControls(useTestProperties, label, states, callFocus);
        var disabled = states.disabled, invalid = states.invalid, readOnly = states.readOnly, required = states.required;
        return d_1.v('div', {
            'aria-expanded': open ? 'true' : 'false',
            'aria-haspopup': 'true',
            'aria-readonly': readOnly ? "" + readOnly : null,
            'aria-required': null,
            dir: '',
            classes: [
                css.root,
                open ? css.open : null,
                useTestProperties ? css.clearable : null,
                focused ? css.focused : null,
                null,
                null
            ],
            key: 'root',
            lang: null,
            role: 'combobox'
        }, [
            label ? d_1.w(index_3.default, {
                key: 'label',
                theme: useTestProperties ? {} : undefined,
                disabled: disabled,
                focused: focused,
                hidden: undefined,
                invalid: invalid,
                readOnly: readOnly,
                required: required,
                forId: useTestProperties ? 'foo' : ''
            }, ['foo']) : null,
            controlsVdom,
            menuVdom
        ]);
    };
    registerSuite('ComboBox', {
        tests: {
            'renders with default properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {}); });
                h.expect(getExpectedVdom);
            },
            'renders with custom properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, testProperties); });
                h.expect(function () { return getExpectedVdom(true, false, true); });
            },
            'dropdown renders correctly when open': function () {
                var h = harness(function () { return d_1.w(index_1.default, testProperties); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return getExpectedVdom(true, true, true, {}, true); });
            },
            'arrow click opens menu': function () {
                var onRequestResults = sinon.stub();
                var onMenuChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onRequestResults: onRequestResults,
                    onMenuChange: onMenuChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return getExpectedVdom(true, true, true, {}, true); });
                assert.isTrue(onRequestResults.calledOnce, 'onRequestResults called when menu is opened');
                assert.isTrue(onMenuChange.calledOnce, 'onMenuChange called when menu is opened');
            },
            'menu opens on input': function () {
                var onChange = sinon.stub();
                var onRequestResults = sinon.stub();
                var onMenuChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { label: undefined, onChange: onChange,
                    onRequestResults: onRequestResults,
                    onMenuChange: onMenuChange })); });
                h.trigger('@textinput', 'onInput', 'foo');
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
                assert.isTrue(onChange.calledWith('foo'), 'onChange callback called with input value');
                assert.isTrue(onRequestResults.calledOnce, 'onRequestResults callback called');
                assert.isTrue(onMenuChange.calledOnce, 'onMenuChange called when menu is opened');
            },
            'menu closes on input blur': function () {
                var onBlur = sinon.stub();
                var onMenuChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onBlur: onBlur,
                    onMenuChange: onMenuChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
                h.trigger('@textinput', 'onBlur', 'foo');
                h.expect(function () { return getExpectedVdom(true, false, true); });
                assert.isTrue(onBlur.calledWith('foo'), 'onBlur callback called with input value');
                assert.isTrue(onMenuChange.calledTwice, 'onMenuChange called twice');
            },
            'blur ignored when clicking option': function () {
                var onBlur = sinon.stub();
                var onMenuChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onBlur: onBlur,
                    onMenuChange: onMenuChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
                h.trigger('@dropdown', 'onmousedown', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onBlur', 'foo');
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
                assert.isFalse(onBlur.called, 'onBlur not called for dropdown click');
                assert.isFalse(onMenuChange.calledTwice, 'onMenuChange only called once');
            },
            'menu closes on result selection': function () {
                var onChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onChange: onChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@listbox', 'onOptionSelect', testOptions[1], 1);
                assert.isTrue(onChange.calledWith('Two'), 'onChange callback called with label of second option');
                h.expect(function () { return getExpectedVdom(true, false, true, {}, true); });
            },
            'keyboard opens and closes menu': function () {
                var onRequestResults = sinon.stub();
                var preventDefault = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onRequestResults: onRequestResults })); });
                h.trigger('@textinput', 'onKeyDown', Keys.Down, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true }); });
                assert.isTrue(onRequestResults.calledOnce, 'onRequestResults called when menu is opened');
                assert.isTrue(preventDefault.calledOnce, 'down key press prevents default page scroll');
                h.trigger('@textinput', 'onKeyDown', Keys.Escape, preventDefault);
                h.expect(function () { return getExpectedVdom(true, false, true); });
            },
            'listbox onActiveIndexChange': function () {
                var h = harness(function () { return d_1.w(index_1.default, testProperties); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@listbox', 'onActiveIndexChange', 1);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { activeIndex: 1 }); });
            },
            'keyboard navigates options': function () {
                var preventDefault = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, testProperties); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onKeyDown', Keys.Down, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 1 }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Up, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 0 }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Up, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 2 }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Down, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 0 }); });
                h.trigger('@textinput', 'onKeyDown', Keys.End, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 2 }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Home, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true, activeIndex: 0 }); });
                assert.strictEqual(preventDefault.callCount, 4, 'preventDefault called four times for up and down keys');
            },
            'enter and space select option': function () {
                var onChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onChange: onChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onKeyDown', Keys.Enter, function () { });
                assert.isTrue(onChange.calledWith('One'), 'enter triggers onChange callback called with label of first option');
                h.expect(function () { return getExpectedVdom(true, false, true, {}, true); });
                h.trigger('@textinput', 'onKeyDown', Keys.Enter, function () { });
                assert.isFalse(onChange.calledTwice, 'enter does not trigger onChange when menu is closed');
                onChange.reset();
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onKeyDown', Keys.Space, function () { });
                assert.isTrue(onChange.calledWith('One'), 'space triggers onChange callback called with label of first option');
                h.expect(function () { return getExpectedVdom(true, false, true, {}, true); });
            },
            'disabled options are not selected': function () {
                var onChange = sinon.stub();
                var preventDefault = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { isResultDisabled: function (result) { return !!result.disabled; }, onChange: onChange })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onKeyDown', Keys.Up, preventDefault);
                h.trigger('@textinput', 'onKeyDown', Keys.Enter, preventDefault);
                assert.isFalse(onChange.called, 'onChange not called for disabled option');
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, {
                    visualFocus: true,
                    getOptionDisabled: test_helpers_1.noop,
                    activeIndex: 2
                }); });
            },
            'keyboard does not trigger onChange with no results': function () {
                var onChange = sinon.stub();
                var preventDefault = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, { onChange: onChange }); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return getExpectedVdom(false, true, false, {}, true); });
                h.trigger('@textinput', 'onKeyDown', Keys.Down, preventDefault);
                h.trigger('@textinput', 'onKeyDown', Keys.Enter, preventDefault);
                assert.isFalse(onChange.called, 'onChange not called for no results');
            },
            'clear button clears input': function () {
                var onChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { onChange: onChange })); });
                h.trigger("." + css.clear, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onChange.calledWith(''), 'clear button calls onChange with an empty string');
            },
            'inputProperties transferred to child input': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    inputProperties: {
                        placeholder: 'foo'
                    }
                }); });
                h.expectPartial('@textinput', function () { return d_1.w(index_5.default, {
                    key: 'textinput',
                    aria: {
                        activedescendant: '',
                        controls: '',
                        owns: ''
                    },
                    placeholder: 'foo',
                    shouldFocus: false,
                    disabled: undefined,
                    widgetId: '',
                    invalid: undefined,
                    readOnly: undefined,
                    required: undefined,
                    theme: undefined,
                    value: '',
                    onBlur: test_helpers_1.noop,
                    onFocus: test_helpers_1.noop,
                    onInput: test_helpers_1.noop,
                    onKeyDown: test_helpers_1.noop
                }); });
            },
            'input opens on shouldFocus with openOnFocus': function () {
                var onFocus = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { openOnFocus: true, onFocus: onFocus })); });
                h.trigger('@textinput', 'onFocus', 'foo');
                assert.isTrue(onFocus.calledWith('foo'), 'onFocus handler called with input value');
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
            },
            'widget states render correctly': function () {
                var invalid = true;
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { disabled: true, invalid: invalid, readOnly: true, required: true })); });
                h.expectPartial('@textinput', function () { return d_1.w(index_5.default, {
                    key: 'textinput',
                    aria: {
                        activedescendant: '',
                        controls: '',
                        owns: ''
                    },
                    widgetId: 'foo',
                    shouldFocus: false,
                    disabled: true,
                    invalid: true,
                    readOnly: true,
                    required: true,
                    theme: {},
                    value: 'one',
                    onBlur: test_helpers_1.noop,
                    onFocus: test_helpers_1.noop,
                    onInput: test_helpers_1.noop,
                    onKeyDown: test_helpers_1.noop
                }); });
                h.expectPartial('@label', function () { return d_1.w(index_3.default, {
                    key: 'label',
                    theme: {},
                    disabled: true,
                    focused: false,
                    readOnly: true,
                    invalid: true,
                    required: true,
                    hidden: undefined,
                    forId: 'foo'
                }, ['foo']); });
                h.expectPartial('@clear', function () { return d_1.v('button', {
                    'aria-controls': '',
                    key: 'clear',
                    classes: css.clear,
                    disabled: true,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    'clear foo',
                    d_1.w(index_2.default, { type: 'closeIcon', theme: {} })
                ]); });
                h.expectPartial('@trigger', function () { return d_1.v('button', {
                    key: 'trigger',
                    classes: css.trigger,
                    disabled: true,
                    tabIndex: -1,
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    'open foo',
                    d_1.w(index_2.default, { type: 'downIcon', theme: {} })
                ]); });
                invalid = false;
                h.expectPartial('@textinput', function () { return d_1.w(index_5.default, {
                    key: 'textinput',
                    aria: {
                        activedescendant: '',
                        controls: '',
                        owns: ''
                    },
                    widgetId: 'foo',
                    shouldFocus: false,
                    disabled: true,
                    invalid: false,
                    readOnly: true,
                    required: true,
                    theme: {},
                    value: 'one',
                    onBlur: test_helpers_1.noop,
                    onFocus: test_helpers_1.noop,
                    onInput: test_helpers_1.noop,
                    onKeyDown: test_helpers_1.noop
                }); });
            },
            'focused widget renders correctly': function () {
                var mockMeta = sinon.stub();
                var mockFocusGet = sinon.stub().returns({
                    active: false,
                    containsFocus: true
                });
                mockMeta.withArgs(Focus_1.default).returns({
                    get: mockFocusGet
                });
                var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), {}); }, [test_helpers_1.compareId]);
                h.expect(function () { return getExpectedVdom(false, false, false, {}, false, true); });
            },
            'disabled state blocks menu opening': function () {
                var onMenuChange = sinon.stub();
                var onRequestResults = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { disabled: true, onMenuChange: onMenuChange,
                    onRequestResults: onRequestResults })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return getExpectedVdom(true, false, true, { disabled: true }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Down, function () { });
                h.expect(function () { return getExpectedVdom(true, false, true, { disabled: true }); });
                assert.isFalse(onMenuChange.called, 'onMenuChange never called');
                assert.isFalse(onRequestResults.called, 'onRequestResults never called');
            },
            'readOnly state blocks menu opening': function () {
                var onMenuChange = sinon.stub();
                var onRequestResults = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties, { readOnly: true, onMenuChange: onMenuChange,
                    onRequestResults: onRequestResults })); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.expect(function () { return getExpectedVdom(true, false, true, { readOnly: true }); });
                h.trigger('@textinput', 'onKeyDown', Keys.Down, function () { });
                h.expect(function () { return getExpectedVdom(true, false, true, { readOnly: true }); });
                assert.isFalse(onMenuChange.called, 'onMenuChange never called');
                assert.isFalse(onRequestResults.called, 'onRequestResults never called');
            },
            'hover and keyboard events toggle visualFocus': function () {
                var preventDefault = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, tslib_1.__assign({}, testProperties)); });
                h.expect(function () { return getExpectedVdom(true, false, true); });
                h.trigger("." + css.trigger, 'onclick', test_helpers_1.stubEvent);
                h.trigger('@textinput', 'onKeyDown', Keys.Up, preventDefault);
                h.trigger('@textinput', 'onKeyDown', Keys.Down, preventDefault);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true, { visualFocus: true }); });
                h.trigger('@dropdown', 'onmouseover', test_helpers_1.stubEvent);
                h.expectPartial('@dropdown', function () { return getExpectedMenu(true, true); });
            }
        }
    });
});
//# sourceMappingURL=ComboBox.js.map