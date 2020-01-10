(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../../label/index", "../../../radio/index", "../../../theme/radio.m.css", "../../../common/tests/support/test-helpers"], factory);
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
    var index_2 = require("../../../radio/index");
    var css = require("../../../theme/radio.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareForId]);
    var expected = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.label, label = _c === void 0 ? false : _c, _d = _b.rootOverrides, rootOverrides = _d === void 0 ? {} : _d, _e = _b.inputOverrides, inputOverrides = _e === void 0 ? {} : _e, _f = _b.states, states = _f === void 0 ? {} : _f, _g = _b.focused, focused = _g === void 0 ? false : _g;
        var disabled = states.disabled, invalid = states.invalid, required = states.required, readOnly = states.readOnly;
        var radioVdom = d_1.v('div', { classes: css.inputWrapper }, [
            d_1.v('input', tslib_1.__assign({ id: '', classes: css.input, checked: false, disabled: disabled, 'aria-invalid': invalid ? 'true' : null, name: undefined, readOnly: readOnly, 'aria-readonly': readOnly ? 'true' : null, required: required, type: 'radio', value: undefined, onblur: test_helpers_1.noop, onchange: test_helpers_1.noop, onclick: test_helpers_1.noop, onfocus: test_helpers_1.noop, onmousedown: test_helpers_1.noop, onmouseup: test_helpers_1.noop, ontouchstart: test_helpers_1.noop, ontouchend: test_helpers_1.noop, ontouchcancel: test_helpers_1.noop }, inputOverrides))
        ]);
        return d_1.v('div', tslib_1.__assign({ key: 'root', classes: [css.root, null, null, null, null, null, null, null] }, rootOverrides), [
            radioVdom,
            label ? d_1.w(index_1.default, {
                theme: undefined,
                disabled: disabled,
                focused: focused,
                hidden: undefined,
                invalid: invalid,
                readOnly: readOnly,
                required: required,
                forId: '',
                secondary: true
            }, ['foo']) : null
        ]);
    };
    registerSuite('Radio', {
        tests: {
            'default properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {}); });
                h.expect(expected);
            },
            'custom properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    aria: { describedBy: 'foo' },
                    checked: true,
                    widgetId: 'foo',
                    name: 'bar',
                    value: 'baz'
                }); });
                h.expect(function () { return expected({
                    inputOverrides: {
                        checked: true,
                        'aria-describedby': 'foo',
                        id: 'foo',
                        name: 'bar',
                        value: 'baz'
                    },
                    rootOverrides: {
                        classes: [css.root, css.checked, null, null, null, null, null, null]
                    }
                }); });
            },
            'label': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    label: 'foo'
                }); });
                h.expect(function () { return expected({ label: true }); });
            },
            'state classes': function () {
                var properties = {
                    invalid: true,
                    disabled: true,
                    readOnly: true,
                    required: true,
                    label: 'foo'
                };
                var h = harness(function () { return d_1.w(index_2.default, properties); });
                h.expect(function () { return expected({
                    label: true,
                    rootOverrides: {
                        classes: [css.root, null, css.disabled, null, css.invalid, null, css.readonly, css.required]
                    },
                    states: properties
                }); });
                properties.disabled = false;
                properties.invalid = false;
                properties.readOnly = false;
                properties.required = false;
                h.expect(function () { return expected({
                    label: true,
                    rootOverrides: {
                        classes: [css.root, null, null, null, null, css.valid, null, null]
                    },
                    states: properties
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
                var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), {}); }, [test_helpers_1.compareId]);
                h.expect(function () { return expected({
                    rootOverrides: {
                        classes: [css.root, null, null, css.focused, null, null, null, null]
                    },
                    focused: true
                }); });
            },
            events: function () {
                var onBlur = sinon.stub();
                var onChange = sinon.stub();
                var onClick = sinon.stub();
                var onFocus = sinon.stub();
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
                    onMouseDown: onMouseDown,
                    onMouseUp: onMouseUp,
                    onTouchStart: onTouchStart,
                    onTouchEnd: onTouchEnd,
                    onTouchCancel: onTouchCancel
                }); });
                h.trigger('input', 'onblur', test_helpers_1.stubEvent);
                assert.isTrue(onBlur.called, 'onBlur called');
                h.trigger('input', 'onchange', test_helpers_1.stubEvent);
                assert.isTrue(onChange.called, 'onChange called');
                h.trigger('input', 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onClick.called, 'onClick called');
                h.trigger('input', 'onfocus', test_helpers_1.stubEvent);
                assert.isTrue(onFocus.called, 'onFocus called');
                h.trigger('input', 'onmousedown', test_helpers_1.stubEvent);
                assert.isTrue(onMouseDown.called, 'onMouseDown called');
                h.trigger('input', 'onmouseup', test_helpers_1.stubEvent);
                assert.isTrue(onMouseUp.called, 'onMouseUp called');
                h.trigger('input', 'ontouchstart', test_helpers_1.stubEvent);
                assert.isTrue(onTouchStart.called, 'onTouchStart called');
                h.trigger('input', 'ontouchend', test_helpers_1.stubEvent);
                assert.isTrue(onTouchEnd.called, 'onTouchEnd called');
                h.trigger('input', 'ontouchcancel', test_helpers_1.stubEvent);
                assert.isTrue(onTouchCancel.called, 'onTouchCancel called');
            }
        }
    });
});
//# sourceMappingURL=Radio.js.map