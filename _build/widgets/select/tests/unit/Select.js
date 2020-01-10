(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../../icon/index", "../../index", "../../../listbox/index", "../../../label/index", "../../../theme/select.m.css", "../../../common/tests/support/test-helpers"], factory);
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
    var index_1 = require("../../../icon/index");
    var index_2 = require("../../index");
    var index_3 = require("../../../listbox/index");
    var index_4 = require("../../../label/index");
    var css = require("../../../theme/select.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareWidgetId, test_helpers_1.compareAriaControls]);
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
        aria: { describedBy: 'foo' },
        getOptionDisabled: function (option, index) { return !!option.disabled; },
        getOptionId: function (option, index) { return option.value; },
        getOptionLabel: function (option) { return option.label; },
        getOptionSelected: function (option, index) { return option.value === 'two'; },
        getOptionValue: function (option, index) { return option.value; },
        widgetId: 'foo',
        name: 'foo',
        options: testOptions,
        value: 'two'
    };
    var testStateProperties = tslib_1.__assign({}, testProperties, { disabled: true, invalid: true, readOnly: true, required: true });
    var expectedNative = function (useTestProperties, withStates) {
        if (useTestProperties === void 0) { useTestProperties = false; }
        if (withStates === void 0) { withStates = false; }
        var describedBy = useTestProperties ? { 'aria-describedby': 'foo' } : {};
        var vdom = d_1.v('div', { classes: css.inputWrapper }, [
            d_1.v('select', tslib_1.__assign({ classes: css.input, disabled: useTestProperties ? true : undefined, 'aria-invalid': useTestProperties ? 'true' : null, id: useTestProperties ? 'foo' : test_helpers_1.compareId, name: useTestProperties ? 'foo' : undefined, readOnly: useTestProperties ? true : undefined, 'aria-readonly': useTestProperties ? 'true' : null, required: useTestProperties ? true : undefined, value: useTestProperties ? 'two' : undefined, onblur: test_helpers_1.noop, onchange: test_helpers_1.noop, onfocus: test_helpers_1.noop }, describedBy), [
                d_1.v('option', {
                    value: useTestProperties ? 'one' : '',
                    id: useTestProperties ? 'one' : undefined,
                    disabled: useTestProperties ? false : undefined,
                    selected: useTestProperties ? false : undefined
                }, [useTestProperties ? 'One' : "" + testOptions[0]]),
                d_1.v('option', {
                    value: useTestProperties ? 'two' : '',
                    id: useTestProperties ? 'two' : undefined,
                    disabled: useTestProperties ? false : undefined,
                    selected: useTestProperties ? true : undefined
                }, [useTestProperties ? 'Two' : "" + testOptions[1]]),
                d_1.v('option', {
                    value: useTestProperties ? 'three' : '',
                    id: useTestProperties ? 'three' : undefined,
                    disabled: useTestProperties ? true : undefined,
                    selected: useTestProperties ? false : undefined
                }, [useTestProperties ? 'Three' : "" + testOptions[2]])
            ]),
            d_1.v('span', { classes: css.arrow }, [
                d_1.w(index_1.default, { type: 'downIcon', theme: undefined })
            ])
        ]);
        return vdom;
    };
    var expectedSingle = function (useTestProperties, withStates, open, placeholder, activeIndex, focus) {
        if (useTestProperties === void 0) { useTestProperties = false; }
        if (withStates === void 0) { withStates = false; }
        if (open === void 0) { open = false; }
        if (placeholder === void 0) { placeholder = ''; }
        if (activeIndex === void 0) { activeIndex = 0; }
        if (focus === void 0) { focus = false; }
        var describedBy = useTestProperties ? { 'aria-describedby': 'foo' } : {};
        var vdom = d_1.v('div', {
            classes: [css.inputWrapper, open ? css.open : null],
            key: 'wrapper'
        }, [
            d_1.v('button', tslib_1.__assign({ 'aria-controls': '', 'aria-expanded': open ? 'true' : 'false', 'aria-haspopup': 'listbox', 'aria-invalid': withStates ? 'true' : null, 'aria-required': withStates ? 'true' : null, classes: [css.trigger, useTestProperties && !placeholder ? null : css.placeholder], disabled: withStates ? true : undefined, key: 'trigger', type: 'button', value: useTestProperties ? 'two' : undefined, onblur: test_helpers_1.noop, onclick: test_helpers_1.noop, onfocus: test_helpers_1.noop, onkeydown: test_helpers_1.noop, onmousedown: test_helpers_1.noop }, describedBy), [placeholder ? placeholder : useTestProperties ? 'Two' : '']),
            d_1.v('span', { classes: css.arrow }, [
                d_1.w(index_1.default, { type: 'downIcon', theme: undefined })
            ]),
            d_1.v('div', {
                classes: css.dropdown,
                onfocusout: test_helpers_1.noop,
                onkeydown: test_helpers_1.noop
            }, [
                d_1.w(index_3.default, {
                    activeIndex: activeIndex,
                    focus: focus,
                    widgetId: useTestProperties ? 'foo' : '',
                    key: 'listbox',
                    optionData: useTestProperties ? testOptions : [],
                    tabIndex: open ? 0 : -1,
                    getOptionDisabled: useTestProperties ? test_helpers_1.noop : undefined,
                    getOptionId: useTestProperties ? test_helpers_1.noop : undefined,
                    getOptionLabel: useTestProperties ? test_helpers_1.noop : undefined,
                    getOptionSelected: test_helpers_1.noop,
                    theme: undefined,
                    onActiveIndexChange: test_helpers_1.noop,
                    onOptionSelect: test_helpers_1.noop
                })
            ])
        ]);
        return vdom;
    };
    var expected = function (selectVdom, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.classes, classes = _c === void 0 ? [css.root, null, null, null, null, null, null] : _c, _d = _b.label, label = _d === void 0 ? false : _d, states = _b.states, _e = _b.focus, focus = _e === void 0 ? false : _e;
        return d_1.v('div', {
            key: 'root',
            classes: classes
        }, [
            label ? d_1.w(index_4.default, {
                theme: undefined,
                disabled: undefined,
                focused: focus,
                hidden: undefined,
                invalid: undefined,
                readOnly: undefined,
                required: undefined,
                forId: ''
            }, ['foo']) : null,
            selectVdom
        ]);
    };
    registerSuite('Select', {
        tests: {
            'Native Single Select': {
                'default properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, {
                        options: testOptions,
                        useNativeElement: true
                    }); });
                    h.expect(function () { return expected(expectedNative()); });
                },
                'custom properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, tslib_1.__assign({}, testStateProperties, { useNativeElement: true })); });
                    h.expect(function () { return expected(expectedNative(true), {
                        classes: [css.root, css.disabled, null, css.invalid, null, css.readonly, css.required]
                    }); });
                },
                'focused class': function () {
                    var mockMeta = sinon.stub();
                    var mockFocusGet = sinon.stub().returns({
                        active: false,
                        containsFocus: true
                    });
                    mockMeta.withArgs(Focus_1.default).returns({
                        get: mockFocusGet
                    });
                    var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), {
                        options: testOptions,
                        useNativeElement: true
                    }); });
                    h.expect(function () { return expected(expectedNative(), {
                        classes: [css.root, null, css.focused, null, null, null, null],
                        focus: true
                    }); });
                },
                'basic events': function () {
                    var onBlur = sinon.stub();
                    var onFocus = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, {
                        useNativeElement: true,
                        onBlur: onBlur,
                        onFocus: onFocus
                    }); });
                    h.trigger('select', 'onblur');
                    h.trigger('select', 'onfocus');
                    assert.isTrue(onBlur.called, 'onBlur called');
                    assert.isTrue(onFocus.called, 'onFocus called');
                },
                'onChange called with correct option': function () {
                    var onChange = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, {
                        getOptionValue: testProperties.getOptionValue,
                        options: testOptions,
                        useNativeElement: true,
                        onChange: onChange
                    }); });
                    h.trigger('select', 'onchange', tslib_1.__assign({}, test_helpers_1.stubEvent, { target: { value: 'one' } }));
                    assert.isTrue(onChange.calledWith(testOptions[0]), 'onChange should be called with the first entry in the testOptions array');
                },
                'events called with widget key': function () {
                    var onBlur = sinon.stub();
                    var onFocus = sinon.stub();
                    var onChange = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, {
                        key: 'foo',
                        getOptionValue: testProperties.getOptionValue,
                        useNativeElement: true,
                        options: testOptions,
                        onBlur: onBlur,
                        onFocus: onFocus,
                        onChange: onChange
                    }); });
                    h.trigger('select', 'onblur', { target: { value: 'one' } });
                    assert.isTrue(onBlur.calledWith('foo'), 'onBlur called with foo key');
                    h.trigger('select', 'onfocus', { target: { value: 'one' } });
                    assert.isTrue(onFocus.calledWith('foo'), 'onFocus called with foo key');
                    h.trigger('select', 'onchange', tslib_1.__assign({}, test_helpers_1.stubEvent, { target: { value: 'one' } }));
                    assert.isTrue(onChange.calledWith(testOptions[0], 'foo'), 'onChange called with foo key');
                }
            },
            'Custom Single-select': {
                'default properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, {}); });
                    h.expect(function () { return expected(expectedSingle()); });
                },
                'custom properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, testStateProperties); });
                    h.expect(function () { return expected(expectedSingle(true, true), {
                        classes: [css.root, css.disabled, null, css.invalid, null, css.readonly, css.required]
                    }); });
                },
                'placeholder': function () {
                    var properties = tslib_1.__assign({}, testProperties, { placeholder: 'foo' });
                    var h = harness(function () { return d_1.w(index_2.default, properties); });
                    h.expect(function () { return expected(expectedSingle(true)); });
                    properties = tslib_1.__assign({}, testProperties, { getOptionSelected: function () { return false; }, placeholder: 'bar' });
                    h.expect(function () { return expected(expectedSingle(true, false, false, 'bar')); });
                },
                'open/close on trigger click': function () {
                    var h = harness(function () { return d_1.w(index_2.default, testProperties); });
                    h.expect(function () { return expected(expectedSingle(true)); });
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.expect(function () { return expected(expectedSingle(true)); });
                },
                'select options': function () {
                    var onChange = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, tslib_1.__assign({}, testProperties, { options: testOptions, onChange: onChange })); });
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger('@listbox', 'onOptionSelect', testOptions[1]);
                    h.expect(function () { return expected(expectedSingle(true)); });
                    assert.isTrue(onChange.calledOnce, 'onChange handler called when option selected');
                    // open widget a second time
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger('@trigger', 'onmousedown');
                    h.trigger("." + css.dropdown, 'onfocusout');
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.expect(function () { return expected(expectedSingle(true)); });
                },
                'default for getOptionSelected': function () {
                    var properties = tslib_1.__assign({}, testProperties, { getOptionSelected: undefined });
                    var h = harness(function () { return d_1.w(index_2.default, properties); });
                    h.expect(function () { return expected(expectedSingle(true)); });
                    var simpleOptions = ['one', 'two', 'three'];
                    properties = {
                        options: simpleOptions,
                        value: 'two'
                    };
                    h.expect(function () { return d_1.v('div', {
                        key: 'root',
                        classes: [css.root, null, null, null, null, null, null]
                    }, [
                        null,
                        d_1.v('div', {
                            classes: [css.inputWrapper, null],
                            key: 'wrapper'
                        }, [
                            d_1.v('button', {
                                'aria-controls': '',
                                'aria-expanded': 'false',
                                'aria-haspopup': 'listbox',
                                'aria-invalid': null,
                                'aria-required': null,
                                classes: [css.trigger, null],
                                disabled: undefined,
                                key: 'trigger',
                                type: 'button',
                                value: 'two',
                                onblur: test_helpers_1.noop,
                                onclick: test_helpers_1.noop,
                                onfocus: test_helpers_1.noop,
                                onkeydown: test_helpers_1.noop,
                                onmousedown: test_helpers_1.noop
                            }, ['two']),
                            d_1.v('span', { classes: css.arrow }, [
                                d_1.w(index_1.default, { type: 'downIcon', theme: undefined })
                            ]),
                            d_1.v('div', {
                                classes: css.dropdown,
                                onfocusout: test_helpers_1.noop,
                                onkeydown: test_helpers_1.noop
                            }, [
                                d_1.w(index_3.default, {
                                    activeIndex: 0,
                                    widgetId: '',
                                    focus: false,
                                    key: 'listbox',
                                    optionData: simpleOptions,
                                    tabIndex: -1,
                                    getOptionDisabled: undefined,
                                    getOptionId: undefined,
                                    getOptionLabel: undefined,
                                    getOptionSelected: test_helpers_1.noop,
                                    theme: undefined,
                                    onActiveIndexChange: test_helpers_1.noop,
                                    onOptionSelect: test_helpers_1.noop
                                })
                            ])
                        ])
                    ]); });
                },
                'change active option': function () {
                    var h = harness(function () { return d_1.w(index_2.default, testProperties); });
                    h.expect(function () { return expected(expectedSingle(true)); });
                    h.trigger('@listbox', 'onActiveIndexChange', 1);
                    h.expect(function () { return expected(expectedSingle(true, false, false, '', 1)); });
                },
                'open/close with keyboard': function () {
                    var h = harness(function () { return d_1.w(index_2.default, tslib_1.__assign({}, testProperties, { options: testOptions })); });
                    h.trigger('@trigger', 'onkeydown', tslib_1.__assign({ which: Keys.Down }, test_helpers_1.stubEvent));
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger("." + css.dropdown, 'onkeydown', tslib_1.__assign({ which: Keys.Down }, test_helpers_1.stubEvent));
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger("." + css.dropdown, 'onkeydown', tslib_1.__assign({ which: Keys.Escape }, test_helpers_1.stubEvent));
                    h.expect(function () { return expected(expectedSingle(true)); });
                    h.trigger("." + css.dropdown, 'onkeydown', tslib_1.__assign({ which: Keys.Down }, test_helpers_1.stubEvent));
                    h.expect(function () { return expected(expectedSingle(true)); });
                },
                'close on listbox blur': function () {
                    var onBlur = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, tslib_1.__assign({}, testProperties, { options: testOptions, onBlur: onBlur })); });
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.trigger('@trigger', 'onblur');
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger("." + css.dropdown, 'onfocusout');
                    h.expect(function () { return expected(expectedSingle(true)); });
                    assert.isTrue(onBlur.calledOnce, 'onBlur callback should only be called once for last blur event');
                },
                'close on trigger blur': function () {
                    var onBlur = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, tslib_1.__assign({}, testProperties, { options: testOptions, onBlur: onBlur })); });
                    h.trigger('@trigger', 'onclick', test_helpers_1.stubEvent);
                    h.trigger('@trigger', 'onblur');
                    h.expect(function () { return expected(expectedSingle(true, false, true, '', 0, true)); });
                    h.trigger('@trigger', 'onblur');
                    h.expect(function () { return expected(expectedSingle(true)); });
                    assert.isTrue(onBlur.calledOnce, 'onBlur callback should only be called once for last blur event');
                },
                'events called with widget key': function () {
                    var onBlur = sinon.stub();
                    var h = harness(function () { return d_1.w(index_2.default, { key: 'foo', onBlur: onBlur }); });
                    h.trigger('@trigger', 'onblur');
                    assert.isTrue(onBlur.calledWith('foo'), 'Trigger blur event called with foo key');
                    h.trigger('@trigger', 'onblur');
                    h.trigger("." + css.dropdown, 'onfocusout');
                    assert.isTrue(onBlur.getCall(1).calledWith('foo'), 'Dropdown blur event called with foo key');
                }
            }
        }
    });
});
//# sourceMappingURL=Select.js.map