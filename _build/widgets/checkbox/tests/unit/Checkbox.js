(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "@dojo/framework/testing/harness", "../../../label/index", "../../index", "../../../theme/checkbox.m.css", "../../../common/tests/support/test-helpers"], factory);
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
    var harness_1 = require("@dojo/framework/testing/harness");
    var index_1 = require("../../../label/index");
    var index_2 = require("../../index");
    var css = require("../../../theme/checkbox.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var expectedToggle = function (labels, checked) {
        if (labels === void 0) { labels = false; }
        if (checked === void 0) { checked = false; }
        if (labels) {
            return [
                d_1.v('div', {
                    key: 'offLabel',
                    classes: css.offLabel,
                    'aria-hidden': checked ? 'true' : null
                }, ['off']),
                d_1.v('div', {
                    key: 'toggle',
                    classes: css.toggleSwitch
                }),
                d_1.v('div', {
                    key: 'onLabel',
                    classes: css.onLabel,
                    'aria-hidden': checked ? null : 'true'
                }, ['on'])
            ];
        }
        return [
            null,
            d_1.v('div', {
                key: 'toggle',
                classes: css.toggleSwitch
            }),
            null
        ];
    };
    var compareId = { selector: 'input', property: 'id', comparator: function (property) { return typeof property === 'string'; } };
    var compareForId = { selector: '@label', property: 'forId', comparator: function (property) { return typeof property === 'string'; } };
    var expected = function (label, toggle, toggleLabels, checked) {
        if (label === void 0) { label = false; }
        if (toggle === void 0) { toggle = false; }
        if (toggleLabels === void 0) { toggleLabels = false; }
        if (checked === void 0) { checked = false; }
        return d_1.v('div', {
            key: 'root',
            classes: [css.root, toggle ? css.toggle : null, checked ? css.checked : null, null, null, null, null, null, null]
        }, [
            d_1.v('div', { classes: css.inputWrapper }, tslib_1.__spread((toggle ? expectedToggle(toggleLabels, checked) : []), [
                d_1.v('input', {
                    id: '',
                    classes: css.input,
                    checked: checked,
                    disabled: undefined,
                    'aria-invalid': null,
                    name: undefined,
                    readOnly: undefined,
                    'aria-readonly': null,
                    required: undefined,
                    type: 'checkbox',
                    value: undefined,
                    onblur: test_helpers_1.noop,
                    onchange: test_helpers_1.noop,
                    onclick: test_helpers_1.noop,
                    onfocus: test_helpers_1.noop,
                    onmousedown: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchcancel: test_helpers_1.noop
                })
            ])),
            label ? d_1.w(index_1.default, {
                key: 'label',
                theme: undefined,
                disabled: undefined,
                focused: false,
                hidden: undefined,
                invalid: undefined,
                readOnly: undefined,
                required: undefined,
                forId: '',
                secondary: true
            }, ['foo']) : null
        ]);
    };
    registerSuite('Checkbox', {
        tests: {
            'default properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {}); }, [compareId]);
                h.expect(function () { return expected(); });
            },
            'custom properties': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {
                    aria: {
                        describedBy: 'foo'
                    },
                    checked: true,
                    id: 'foo',
                    name: 'bar',
                    value: 'baz'
                }); }, [compareId]);
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, css.checked, null, null, null, null, null, null]
                }, [
                    d_1.v('div', { classes: css.inputWrapper }, [
                        d_1.v('input', {
                            id: '',
                            'aria-describedby': 'foo',
                            name: 'bar',
                            classes: css.input,
                            checked: true,
                            disabled: undefined,
                            'aria-invalid': null,
                            readOnly: undefined,
                            'aria-readonly': null,
                            required: undefined,
                            type: 'checkbox',
                            value: 'baz',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        })
                    ])
                ]); });
            },
            'label': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {
                    label: 'foo'
                }); }, [compareId, compareForId]);
                h.expect(function () { return expected(true); });
            },
            'state classes': function () {
                var invalid = true;
                var disabled = true;
                var readOnly = true;
                var required = true;
                var h = harness_1.default(function () { return d_1.w(index_2.default, {
                    invalid: invalid,
                    disabled: disabled,
                    readOnly: readOnly,
                    required: required
                }); }, [compareForId, compareId]);
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, css.disabled, null, css.invalid, null, css.readonly, css.required]
                }, [
                    d_1.v('div', { classes: css.inputWrapper }, [
                        d_1.v('input', {
                            id: '',
                            classes: css.input,
                            checked: false,
                            'aria-invalid': 'true',
                            'aria-readonly': 'true',
                            type: 'checkbox',
                            value: undefined,
                            name: undefined,
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop,
                            disabled: true,
                            readOnly: true,
                            required: true
                        })
                    ])
                ]); });
                invalid = false;
                disabled = false;
                readOnly = false;
                required = false;
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, null, null, null, css.valid, null, null]
                }, [
                    d_1.v('div', { classes: css.inputWrapper }, [
                        d_1.v('input', {
                            id: '',
                            classes: css.input,
                            checked: false,
                            'aria-invalid': null,
                            'aria-readonly': null,
                            type: 'checkbox',
                            value: undefined,
                            name: undefined,
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop,
                            disabled: false,
                            readOnly: false,
                            required: false
                        })
                    ])
                ]); });
            },
            'state properties on label': function () {
                var h = harness_1.default(function () { return d_1.w(index_2.default, {
                    label: 'foo',
                    invalid: true,
                    disabled: true,
                    readOnly: true,
                    required: true
                }); }, [compareId, compareForId]);
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [
                        css.root,
                        null,
                        null,
                        css.disabled,
                        null,
                        css.invalid,
                        null,
                        css.readonly,
                        css.required
                    ]
                }, [
                    d_1.v('div', { classes: css.inputWrapper }, [
                        d_1.v('input', {
                            disabled: true,
                            classes: css.input,
                            'aria-invalid': 'true',
                            readOnly: true,
                            'aria-readonly': 'true',
                            required: true,
                            checked: false,
                            name: undefined,
                            type: 'checkbox',
                            value: undefined,
                            id: '',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        })
                    ]),
                    d_1.w(index_1.default, {
                        key: 'label',
                        disabled: true,
                        focused: false,
                        theme: undefined,
                        readOnly: true,
                        required: true,
                        invalid: true,
                        hidden: undefined,
                        forId: '',
                        secondary: true
                    }, ['foo'])
                ]); });
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
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), {}); }, [compareId]);
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, null, css.focused, null, null, null, null]
                }, [
                    d_1.v('div', { classes: css.inputWrapper }, [
                        d_1.v('input', {
                            id: '',
                            classes: css.input,
                            checked: false,
                            disabled: undefined,
                            'aria-invalid': null,
                            name: undefined,
                            readOnly: undefined,
                            'aria-readonly': null,
                            required: undefined,
                            type: 'checkbox',
                            value: undefined,
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        })
                    ])
                ]); });
            },
            'toggle mode': function () {
                var properties = {
                    mode: index_2.Mode.toggle
                };
                var h = harness_1.default(function () { return d_1.w(index_2.default, properties); }, [compareId, compareForId]);
                h.expect(function () { return expected(false, true); });
                properties = {
                    mode: index_2.Mode.toggle,
                    offLabel: 'off',
                    onLabel: 'on'
                };
                h.expect(function () { return expected(false, true, true); });
                properties = {
                    checked: true,
                    mode: index_2.Mode.toggle,
                    offLabel: 'off',
                    onLabel: 'on'
                };
                h.expect(function () { return expected(false, true, true, true); });
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
                var h = harness_1.default(function () { return d_1.w(index_2.default, {
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
//# sourceMappingURL=Checkbox.js.map