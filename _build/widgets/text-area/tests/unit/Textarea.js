(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../../label/index", "../../index", "../../../theme/text-area.m.css", "../../../common/tests/support/test-helpers"], factory);
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
    var index_1 = require("../../../label/index");
    var index_2 = require("../../index");
    var css = require("../../../theme/text-area.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareForId]);
    var expected = function (label, inputOverrides, states, focused) {
        if (label === void 0) { label = false; }
        if (inputOverrides === void 0) { inputOverrides = {}; }
        if (states === void 0) { states = {}; }
        if (focused === void 0) { focused = false; }
        var disabled = states.disabled, required = states.required, readOnly = states.readOnly, invalid = states.invalid;
        return d_1.v('div', {
            key: 'root',
            classes: [css.root, disabled ? css.disabled : null, focused ? css.focused : null, invalid ? css.invalid : null, invalid === false ? css.valid : null, readOnly ? css.readonly : null, required ? css.required : null]
        }, [
            label ? d_1.w(index_1.default, {
                theme: undefined,
                disabled: disabled,
                focused: focused,
                hidden: undefined,
                invalid: invalid,
                readOnly: readOnly,
                required: required,
                forId: ''
            }, ['foo']) : null,
            d_1.v('div', { classes: css.inputWrapper }, [
                d_1.v('textarea', tslib_1.__assign({ classes: css.input, id: '', key: 'input', cols: null, disabled: disabled, 'aria-invalid': invalid ? 'true' : null, maxlength: null, minlength: null, name: undefined, placeholder: undefined, readOnly: readOnly, 'aria-readonly': readOnly ? 'true' : null, required: required, rows: null, value: undefined, wrap: undefined, onblur: test_helpers_1.noop, onchange: test_helpers_1.noop, onclick: test_helpers_1.noop, onfocus: test_helpers_1.noop, oninput: test_helpers_1.noop, onkeydown: test_helpers_1.noop, onkeypress: test_helpers_1.noop, onkeyup: test_helpers_1.noop, onmousedown: test_helpers_1.noop, onmouseup: test_helpers_1.noop, ontouchstart: test_helpers_1.noop, ontouchend: test_helpers_1.noop, ontouchcancel: test_helpers_1.noop }, inputOverrides))
            ])
        ]);
    };
    registerSuite('Textarea', {
        tests: {
            'default properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {}); });
                h.expect(expected);
            },
            'custom properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    aria: { describedBy: 'foo' },
                    columns: 15,
                    widgetId: 'foo',
                    maxLength: 50,
                    minLength: 10,
                    name: 'bar',
                    placeholder: 'baz',
                    rows: 42,
                    value: 'qux',
                    wrapText: 'soft'
                }); });
                h.expect(function () { return expected(false, {
                    cols: '15',
                    'aria-describedby': 'foo',
                    id: 'foo',
                    maxlength: '50',
                    minlength: '10',
                    name: 'bar',
                    placeholder: 'baz',
                    rows: '42',
                    value: 'qux',
                    wrap: 'soft'
                }); });
            },
            'label': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    label: 'foo'
                }); });
                h.expect(function () { return expected(true); });
            },
            'state classes': function () {
                var properties = {
                    invalid: true,
                    disabled: true,
                    readOnly: true,
                    required: true
                };
                var h = harness(function () { return d_1.w(index_2.default, properties); });
                h.expect(function () { return expected(false, {}, properties); });
                properties = {
                    invalid: false,
                    disabled: false,
                    readOnly: false,
                    required: false
                };
                h.expect(function () { return expected(false, {}, properties); });
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
                var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), {}); });
                h.expect(function () { return expected(false, {}, {}, true); });
            },
            events: function () {
                var onBlur = sinon.stub();
                var onChange = sinon.stub();
                var onClick = sinon.stub();
                var onFocus = sinon.stub();
                var onInput = sinon.stub();
                var onKeyDown = sinon.stub();
                var onKeyPress = sinon.stub();
                var onKeyUp = sinon.stub();
                var onMouseDown = sinon.stub();
                var onMouseUp = sinon.stub();
                var onTouchStart = sinon.stub();
                var onTouchEnd = sinon.stub();
                var onTouchCancel = sinon.stub();
                var h = harness(function () { return d_1.w(index_2.default, {
                    onBlur: onBlur,
                    onChange: onChange,
                    onClick: onClick,
                    onFocus: onFocus,
                    onInput: onInput,
                    onKeyDown: onKeyDown,
                    onKeyPress: onKeyPress,
                    onKeyUp: onKeyUp,
                    onMouseDown: onMouseDown,
                    onMouseUp: onMouseUp,
                    onTouchStart: onTouchStart,
                    onTouchEnd: onTouchEnd,
                    onTouchCancel: onTouchCancel
                }); });
                h.trigger('@input', 'onblur', test_helpers_1.stubEvent);
                assert.isTrue(onBlur.called, 'onBlur called');
                h.trigger('@input', 'onchange', test_helpers_1.stubEvent);
                assert.isTrue(onChange.called, 'onChange called');
                h.trigger('@input', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onClick.called, 'onClick called');
                h.trigger('@input', 'onfocus', test_helpers_1.stubEvent);
                assert.isTrue(onFocus.called, 'onFocus called');
                h.trigger('@input', 'oninput', test_helpers_1.stubEvent);
                assert.isTrue(onInput.called, 'onInput called');
                h.trigger('@input', 'onkeydown', test_helpers_1.stubEvent);
                assert.isTrue(onKeyDown.called, 'onKeyDown called');
                h.trigger('@input', 'onkeypress', test_helpers_1.stubEvent);
                assert.isTrue(onKeyPress.called, 'onKeyPress called');
                h.trigger('@input', 'onkeyup', test_helpers_1.stubEvent);
                assert.isTrue(onKeyUp.called, 'onKeyUp called');
                h.trigger('@input', 'onmousedown', test_helpers_1.stubEvent);
                assert.isTrue(onMouseDown.called, 'onMouseDown called');
                h.trigger('@input', 'onmouseup', test_helpers_1.stubEvent);
                assert.isTrue(onMouseUp.called, 'onMouseUp called');
                h.trigger('@input', 'ontouchstart', test_helpers_1.stubEvent);
                assert.isTrue(onTouchStart.called, 'onTouchStart called');
                h.trigger('@input', 'ontouchend', test_helpers_1.stubEvent);
                assert.isTrue(onTouchEnd.called, 'onTouchEnd called');
                h.trigger('@input', 'ontouchcancel', test_helpers_1.stubEvent);
                assert.isTrue(onTouchCancel.called, 'onTouchCancel called');
            }
        }
    });
});
//# sourceMappingURL=Textarea.js.map