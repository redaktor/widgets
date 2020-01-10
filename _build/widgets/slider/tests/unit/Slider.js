(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../../label/index", "../../index", "../../../theme/slider.m.css", "../../styles/slider.m.css", "../../../common/tests/support/test-helpers"], factory);
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
    var css = require("../../../theme/slider.m.css");
    var fixedCss = require("../../styles/slider.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var compareFor = { selector: '*', property: 'for', comparator: function (property) { return typeof property === 'string'; } };
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareForId, compareFor]);
    var expected = function (label, tooltip, overrides, child, progress, focused) {
        if (label === void 0) { label = false; }
        if (tooltip === void 0) { tooltip = false; }
        if (overrides === void 0) { overrides = {}; }
        if (child === void 0) { child = '0'; }
        if (progress === void 0) { progress = '0%'; }
        if (focused === void 0) { focused = false; }
        return d_1.v('div', {
            key: 'root',
            classes: [css.root, null, focused ? css.focused : null, null, null, null, null, null, fixedCss.rootFixed]
        }, [
            label ? d_1.w(index_1.default, {
                theme: undefined,
                disabled: undefined,
                focused: focused,
                hidden: undefined,
                invalid: undefined,
                readOnly: undefined,
                required: undefined,
                forId: ''
            }, ['foo']) : null,
            d_1.v('div', {
                classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                styles: {}
            }, [
                d_1.v('input', tslib_1.__assign({ key: 'input', classes: [css.input, fixedCss.nativeInput], disabled: undefined, id: '', 'aria-invalid': null, max: '100', min: '0', name: undefined, readOnly: undefined, 'aria-readonly': null, required: undefined, step: '1', styles: {}, type: 'range', value: '0', onblur: test_helpers_1.noop, onchange: test_helpers_1.noop, onclick: test_helpers_1.noop, onfocus: test_helpers_1.noop, oninput: test_helpers_1.noop, onkeydown: test_helpers_1.noop, onkeypress: test_helpers_1.noop, onkeyup: test_helpers_1.noop, onmousedown: test_helpers_1.noop, onmouseup: test_helpers_1.noop, ontouchstart: test_helpers_1.noop, ontouchend: test_helpers_1.noop, ontouchcancel: test_helpers_1.noop }, overrides)),
                d_1.v('div', {
                    classes: [css.track, fixedCss.trackFixed],
                    'aria-hidden': 'true',
                    styles: {}
                }, [
                    d_1.v('span', {
                        classes: [css.fill, fixedCss.fillFixed],
                        styles: { width: progress }
                    }),
                    d_1.v('span', {
                        classes: [css.thumb, fixedCss.thumbFixed],
                        styles: { left: progress }
                    })
                ]),
                d_1.v('output', {
                    classes: [css.output, tooltip ? fixedCss.outputTooltip : null],
                    for: '',
                    tabIndex: -1,
                    styles: progress !== '0%' ? { left: progress } : {}
                }, [child])
            ])
        ]);
    };
    registerSuite('Slider', {
        tests: {
            'default properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {}); });
                h.expect(expected);
            },
            'custom properties': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    aria: { describedBy: 'foo' },
                    widgetId: 'foo',
                    max: 60,
                    min: 10,
                    name: 'bar',
                    output: function () { return 'tribbles'; },
                    outputIsTooltip: true,
                    step: 5,
                    value: 35
                }); });
                h.expect(function () { return expected(false, true, {
                    'aria-describedby': 'foo',
                    id: 'foo',
                    max: '60',
                    min: '10',
                    name: 'bar',
                    step: '5',
                    value: '35'
                }, 'tribbles', '50%'); });
            },
            'focussed class': function () {
                var mockMeta = sinon.stub();
                var mockFocusGet = sinon.stub().returns({
                    active: false,
                    containsFocus: true
                });
                mockMeta.withArgs(Focus_1.default).returns({
                    get: mockFocusGet
                });
                var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_2.default, mockMeta), {}); });
                h.expect(function () { return expected(false, false, {}, '0', '0%', true); });
            },
            'vertical slider': {
                'default properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, {
                        vertical: true
                    }); });
                    h.expect(function () { return d_1.v('div', {
                        key: 'root',
                        classes: [css.root, null, null, null, null, null, null, css.vertical, fixedCss.rootFixed]
                    }, [
                        null,
                        d_1.v('div', {
                            classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                            styles: {
                                height: '200px'
                            }
                        }, [
                            d_1.v('input', {
                                key: 'input',
                                classes: [css.input, fixedCss.nativeInput],
                                disabled: undefined,
                                id: '',
                                'aria-invalid': null,
                                max: '100',
                                min: '0',
                                name: undefined,
                                readOnly: undefined,
                                'aria-readonly': null,
                                required: undefined,
                                step: '1',
                                styles: {
                                    width: '200px'
                                },
                                type: 'range',
                                value: '0',
                                onblur: test_helpers_1.noop,
                                onchange: test_helpers_1.noop,
                                onclick: test_helpers_1.noop,
                                onfocus: test_helpers_1.noop,
                                oninput: test_helpers_1.noop,
                                onkeydown: test_helpers_1.noop,
                                onkeypress: test_helpers_1.noop,
                                onkeyup: test_helpers_1.noop,
                                onmousedown: test_helpers_1.noop,
                                onmouseup: test_helpers_1.noop,
                                ontouchstart: test_helpers_1.noop,
                                ontouchend: test_helpers_1.noop,
                                ontouchcancel: test_helpers_1.noop
                            }),
                            d_1.v('div', {
                                classes: [css.track, fixedCss.trackFixed],
                                'aria-hidden': 'true',
                                styles: {
                                    width: '200px'
                                }
                            }, [
                                d_1.v('span', {
                                    classes: [css.fill, fixedCss.fillFixed],
                                    styles: { width: '0%' }
                                }),
                                d_1.v('span', {
                                    classes: [css.thumb, fixedCss.thumbFixed],
                                    styles: { left: '0%' }
                                })
                            ]),
                            d_1.v('output', {
                                classes: [css.output, null],
                                for: '',
                                styles: {},
                                tabIndex: -1
                            }, ['0'])
                        ])
                    ]); });
                },
                'custom properties': function () {
                    var h = harness(function () { return d_1.w(index_2.default, {
                        max: 10,
                        min: 5,
                        outputIsTooltip: true,
                        value: 6,
                        vertical: true,
                        verticalHeight: '100px'
                    }); });
                    h.expect(function () { return d_1.v('div', {
                        key: 'root',
                        classes: [css.root, null, null, null, null, null, null, css.vertical, fixedCss.rootFixed]
                    }, [
                        null,
                        d_1.v('div', {
                            classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                            styles: {
                                height: '100px'
                            }
                        }, [
                            d_1.v('input', {
                                key: 'input',
                                classes: [css.input, fixedCss.nativeInput],
                                disabled: undefined,
                                id: '',
                                'aria-invalid': null,
                                max: '10',
                                min: '5',
                                name: undefined,
                                readOnly: undefined,
                                'aria-readonly': null,
                                required: undefined,
                                step: '1',
                                styles: { width: '100px' },
                                type: 'range',
                                value: '6',
                                onblur: test_helpers_1.noop,
                                onchange: test_helpers_1.noop,
                                onclick: test_helpers_1.noop,
                                onfocus: test_helpers_1.noop,
                                oninput: test_helpers_1.noop,
                                onkeydown: test_helpers_1.noop,
                                onkeypress: test_helpers_1.noop,
                                onkeyup: test_helpers_1.noop,
                                onmousedown: test_helpers_1.noop,
                                onmouseup: test_helpers_1.noop,
                                ontouchstart: test_helpers_1.noop,
                                ontouchend: test_helpers_1.noop,
                                ontouchcancel: test_helpers_1.noop
                            }),
                            d_1.v('div', {
                                classes: [css.track, fixedCss.trackFixed],
                                'aria-hidden': 'true',
                                styles: {
                                    width: '100px'
                                }
                            }, [
                                d_1.v('span', {
                                    classes: [css.fill, fixedCss.fillFixed],
                                    styles: { width: '20%' }
                                }),
                                d_1.v('span', {
                                    classes: [css.thumb, fixedCss.thumbFixed],
                                    styles: { left: '20%' }
                                })
                            ]),
                            d_1.v('output', {
                                classes: [css.output, fixedCss.outputTooltip],
                                for: '',
                                styles: { top: '80%' },
                                tabIndex: -1
                            }, ['6'])
                        ])
                    ]); });
                }
            },
            'max value should be respected': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    max: 40,
                    value: 100
                }); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, null, null, null, null, null, fixedCss.rootFixed]
                }, [
                    null,
                    d_1.v('div', {
                        classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                        styles: {}
                    }, [
                        d_1.v('input', {
                            key: 'input',
                            classes: [css.input, fixedCss.nativeInput],
                            disabled: undefined,
                            id: '',
                            'aria-invalid': null,
                            max: '40',
                            min: '0',
                            name: undefined,
                            readOnly: undefined,
                            'aria-readonly': null,
                            required: undefined,
                            step: '1',
                            styles: {},
                            type: 'range',
                            value: '40',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            oninput: test_helpers_1.noop,
                            onkeydown: test_helpers_1.noop,
                            onkeypress: test_helpers_1.noop,
                            onkeyup: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        }),
                        d_1.v('div', {
                            classes: [css.track, fixedCss.trackFixed],
                            'aria-hidden': 'true',
                            styles: {}
                        }, [
                            d_1.v('span', {
                                classes: [css.fill, fixedCss.fillFixed],
                                styles: { width: '100%' }
                            }),
                            d_1.v('span', {
                                classes: [css.thumb, fixedCss.thumbFixed],
                                styles: { left: '100%' }
                            })
                        ]),
                        d_1.v('output', {
                            classes: [css.output, null],
                            for: '',
                            styles: {},
                            tabIndex: -1
                        }, ['40'])
                    ])
                ]); });
            },
            'min value should be respected': function () {
                var h = harness(function () { return d_1.w(index_2.default, {
                    min: 30,
                    value: 20
                }); });
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, null, null, null, null, null, fixedCss.rootFixed]
                }, [
                    null,
                    d_1.v('div', {
                        classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                        styles: {}
                    }, [
                        d_1.v('input', {
                            key: 'input',
                            classes: [css.input, fixedCss.nativeInput],
                            disabled: undefined,
                            id: '',
                            'aria-invalid': null,
                            max: '100',
                            min: '30',
                            name: undefined,
                            readOnly: undefined,
                            'aria-readonly': null,
                            required: undefined,
                            step: '1',
                            styles: {},
                            type: 'range',
                            value: '30',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            oninput: test_helpers_1.noop,
                            onkeydown: test_helpers_1.noop,
                            onkeypress: test_helpers_1.noop,
                            onkeyup: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        }),
                        d_1.v('div', {
                            classes: [css.track, fixedCss.trackFixed],
                            'aria-hidden': 'true',
                            styles: {}
                        }, [
                            d_1.v('span', {
                                classes: [css.fill, fixedCss.fillFixed],
                                styles: { width: '0%' }
                            }),
                            d_1.v('span', {
                                classes: [css.thumb, fixedCss.thumbFixed],
                                styles: { left: '0%' }
                            })
                        ]),
                        d_1.v('output', {
                            classes: [css.output, null],
                            for: '',
                            styles: {},
                            tabIndex: -1
                        }, ['30'])
                    ])
                ]); });
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
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, css.disabled, null, css.invalid, null, css.readonly, css.required, null, fixedCss.rootFixed]
                }, [
                    null,
                    d_1.v('div', {
                        classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                        styles: {}
                    }, [
                        d_1.v('input', {
                            disabled: true,
                            'aria-invalid': 'true',
                            readOnly: true,
                            'aria-readonly': 'true',
                            required: true,
                            key: 'input',
                            classes: [css.input, fixedCss.nativeInput],
                            id: '',
                            max: '100',
                            min: '0',
                            name: undefined,
                            step: '1',
                            styles: {},
                            type: 'range',
                            value: '0',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            oninput: test_helpers_1.noop,
                            onkeydown: test_helpers_1.noop,
                            onkeypress: test_helpers_1.noop,
                            onkeyup: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        }),
                        d_1.v('div', {
                            classes: [css.track, fixedCss.trackFixed],
                            'aria-hidden': 'true',
                            styles: {}
                        }, [
                            d_1.v('span', {
                                classes: [css.fill, fixedCss.fillFixed],
                                styles: { width: '0%' }
                            }),
                            d_1.v('span', {
                                classes: [css.thumb, fixedCss.thumbFixed],
                                styles: { left: '0%' }
                            })
                        ]),
                        d_1.v('output', {
                            classes: [css.output, null],
                            for: '',
                            styles: {},
                            tabIndex: -1
                        }, ['0'])
                    ])
                ]); });
                properties = {
                    invalid: false,
                    disabled: false,
                    readOnly: false,
                    required: false
                };
                h.expect(function () { return d_1.v('div', {
                    key: 'root',
                    classes: [css.root, null, null, null, css.valid, null, null, null, fixedCss.rootFixed]
                }, [
                    null,
                    d_1.v('div', {
                        classes: [css.inputWrapper, fixedCss.inputWrapperFixed],
                        styles: {}
                    }, [
                        d_1.v('input', {
                            disabled: false,
                            'aria-invalid': null,
                            readOnly: false,
                            'aria-readonly': null,
                            required: false,
                            key: 'input',
                            classes: [css.input, fixedCss.nativeInput],
                            id: '',
                            max: '100',
                            min: '0',
                            name: undefined,
                            step: '1',
                            styles: {},
                            type: 'range',
                            value: '0',
                            onblur: test_helpers_1.noop,
                            onchange: test_helpers_1.noop,
                            onclick: test_helpers_1.noop,
                            onfocus: test_helpers_1.noop,
                            oninput: test_helpers_1.noop,
                            onkeydown: test_helpers_1.noop,
                            onkeypress: test_helpers_1.noop,
                            onkeyup: test_helpers_1.noop,
                            onmousedown: test_helpers_1.noop,
                            onmouseup: test_helpers_1.noop,
                            ontouchstart: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            ontouchcancel: test_helpers_1.noop
                        }),
                        d_1.v('div', {
                            classes: [css.track, fixedCss.trackFixed],
                            'aria-hidden': 'true',
                            styles: {}
                        }, [
                            d_1.v('span', {
                                classes: [css.fill, fixedCss.fillFixed],
                                styles: { width: '0%' }
                            }),
                            d_1.v('span', {
                                classes: [css.thumb, fixedCss.thumbFixed],
                                styles: { left: '0%' }
                            })
                        ]),
                        d_1.v('output', {
                            classes: [css.output, null],
                            for: '',
                            styles: {},
                            tabIndex: -1
                        }, ['0'])
                    ])
                ]); });
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
//# sourceMappingURL=Slider.js.map