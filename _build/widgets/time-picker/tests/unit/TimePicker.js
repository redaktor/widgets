(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "sinon", "../../index", "../../../theme/time-picker.m.css", "../../../combobox/index", "../../../label/index", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var sinon = require("sinon");
    var index_1 = require("../../index");
    var css = require("../../../theme/time-picker.m.css");
    var index_2 = require("../../../combobox/index");
    var index_3 = require("../../../label/index");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var testProperties = {
        clearable: true,
        disabled: false,
        widgetId: 'foo',
        invalid: true,
        label: 'Some Field',
        openOnFocus: false,
        readOnly: false,
        required: true,
        value: 'some value'
    };
    var getExpectedCombobox = function (useTestProperties, results) {
        if (useTestProperties === void 0) { useTestProperties = false; }
        results = results ? results : index_1.getOptions();
        return d_1.w(index_2.default, {
            key: 'combo',
            clearable: useTestProperties ? true : undefined,
            disabled: useTestProperties ? false : undefined,
            getResultLabel: test_helpers_1.noop,
            widgetId: useTestProperties ? 'foo' : '',
            inputProperties: undefined,
            invalid: useTestProperties ? true : undefined,
            isResultDisabled: undefined,
            label: useTestProperties ? 'Some Field' : undefined,
            labelAfter: undefined,
            labelHidden: undefined,
            onBlur: test_helpers_1.noop,
            onChange: test_helpers_1.noop,
            onFocus: test_helpers_1.noop,
            onMenuChange: test_helpers_1.noop,
            onRequestResults: test_helpers_1.noop,
            openOnFocus: useTestProperties ? false : undefined,
            extraClasses: undefined,
            readOnly: useTestProperties ? false : undefined,
            required: useTestProperties ? true : undefined,
            results: results,
            theme: undefined,
            value: useTestProperties ? 'some value' : undefined
        });
    };
    registerSuite('TimePicker', {
        getOptions: {
            'Should include each minute for a full day by default': function () {
                var options = index_1.getOptions();
                assert.lengthOf(options, 1440);
            },
            'Should allow steps under 60 seconds': function () {
                var options = index_1.getOptions('00:00:00', '00:00:10', 1);
                assert.lengthOf(options, 11);
                options.forEach(function (option, i) {
                    var hour = option.hour, minute = option.minute, second = option.second;
                    assert.strictEqual(hour, 0);
                    assert.strictEqual(minute, 0);
                    assert.strictEqual(second, i);
                });
            }
        },
        parseUnits: function () {
            assert.throws(index_1.parseUnits.bind(null, ''));
            assert.throws(index_1.parseUnits.bind(null, '273:00:00'));
            assert.throws(index_1.parseUnits.bind(null, 'x@1235s'));
            assert.throws(index_1.parseUnits.bind(null, '7:00'));
            assert.throws(index_1.parseUnits.bind(null, '07:0a'));
            var units = { hour: 13 };
            assert.strictEqual(index_1.parseUnits(units), units);
            assert.deepEqual(index_1.parseUnits('23:44:50'), {
                hour: 23,
                minute: 44,
                second: 50
            });
            assert.deepEqual(index_1.parseUnits('00:00'), {
                hour: 0,
                minute: 0,
                second: 0
            });
            assert.deepEqual(index_1.parseUnits('55:98:72'), {
                hour: 55,
                minute: 98,
                second: 72
            }, 'does not check for invalid units');
        },
        'Custom input': {
            'Should delegate to ComboBox': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, testProperties); });
                h.expect(function () { return getExpectedCombobox(true); });
            },
            'Should use `getOptionLabel` to format menu options': function () {
                var getOptionLabel = sinon.spy();
                var option = { hour: 0 };
                var h = harness_1.default(function () { return d_1.w(index_1.default, { getOptionLabel: getOptionLabel }); });
                h.trigger('@combo', 'getResultLabel', option);
                assert.isTrue(getOptionLabel.calledWith(option));
            },
            'Should format options as `HH:mm` by default': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {}); });
                var result = h.trigger('@combo', 'getResultLabel', { hour: 4, minute: 22, second: 0 });
                assert.strictEqual(result, '04:22');
            },
            'Should format options as `HH:mm:ss` when the step is less than 60 seconds': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { step: 1 }); });
                var result = h.trigger('@combo', 'getResultLabel', { hour: 4, minute: 22, second: 0 });
                assert.strictEqual(result, '04:22:00');
            },
            'Should set options with step and default start and end': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { step: 3600 }); }, [test_helpers_1.compareWidgetId]);
                var expectedOptions = index_1.getOptions(undefined, undefined, 3600);
                h.expect(function () { return getExpectedCombobox(false, expectedOptions); });
            },
            'Should set options with start, end, and step': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, { end: '01:00', start: '00:00' }); }, [test_helpers_1.compareWidgetId]);
                var expectedOptions = index_1.getOptions('00:00', '01:00');
                h.expect(function () { return getExpectedCombobox(false, expectedOptions); });
            },
            'Should call onRequestOptions': function () {
                var onRequestOptions = sinon.spy();
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    key: 'foo',
                    onRequestOptions: onRequestOptions,
                    step: 3600
                }); });
                h.trigger('@combo', 'onRequestResults');
                assert.isTrue(onRequestOptions.calledWith('foo'));
            }
        },
        'Native input': {
            basic: function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    name: 'some-field',
                    useNativeElement: true
                }); }, [test_helpers_1.compareId]);
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root, null, null, null, null, null],
                    key: 'root'
                }, [
                    null,
                    d_1.v('input', {
                        'aria-invalid': null,
                        'aria-readonly': null,
                        classes: css.input,
                        disabled: undefined,
                        invalid: undefined,
                        key: 'native-input',
                        id: '',
                        max: undefined,
                        min: undefined,
                        name: 'some-field',
                        onblur: test_helpers_1.noop,
                        onchange: test_helpers_1.noop,
                        onfocus: test_helpers_1.noop,
                        readOnly: undefined,
                        required: undefined,
                        step: undefined,
                        type: 'time',
                        value: undefined
                    })
                ]); });
            },
            'Attributes added': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    disabled: true,
                    end: '12:00',
                    inputProperties: {
                        aria: { describedBy: 'Some descriptive text' }
                    },
                    invalid: true,
                    name: 'some-field',
                    readOnly: true,
                    required: true,
                    start: '10:00',
                    step: 60,
                    useNativeElement: true,
                    value: '11:30'
                }); }, [test_helpers_1.compareId]);
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root,
                        css.disabled,
                        null,
                        css.invalid,
                        css.readonly,
                        css.required
                    ],
                    key: 'root'
                }, [
                    null,
                    d_1.v('input', {
                        'aria-describedby': 'Some descriptive text',
                        'aria-invalid': 'true',
                        'aria-readonly': 'true',
                        classes: css.input,
                        id: '',
                        disabled: true,
                        invalid: true,
                        key: 'native-input',
                        max: '12:00',
                        min: '10:00',
                        name: 'some-field',
                        onblur: test_helpers_1.noop,
                        onchange: test_helpers_1.noop,
                        onfocus: test_helpers_1.noop,
                        readOnly: true,
                        required: true,
                        step: 60,
                        type: 'time',
                        value: '11:30'
                    })
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
                var h = harness_1.default(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), {
                    name: 'some-field',
                    useNativeElement: true
                }); }, [test_helpers_1.compareId]);
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root, null, css.focused, null, null, null],
                    key: 'root'
                }, [
                    null,
                    d_1.v('input', {
                        'aria-invalid': null,
                        'aria-readonly': null,
                        classes: css.input,
                        disabled: undefined,
                        invalid: undefined,
                        key: 'native-input',
                        id: '',
                        max: undefined,
                        min: undefined,
                        name: 'some-field',
                        onblur: test_helpers_1.noop,
                        onchange: test_helpers_1.noop,
                        onfocus: test_helpers_1.noop,
                        readOnly: undefined,
                        required: undefined,
                        step: undefined,
                        type: 'time',
                        value: undefined
                    })
                ]); });
            },
            'Label should render': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    label: 'foo',
                    useNativeElement: true
                }); }, [test_helpers_1.compareId, test_helpers_1.compareForId]);
                h.expect(function () { return d_1.v('div', {
                    classes: [css.root, null, null, null, null, null],
                    key: 'root'
                }, [
                    d_1.w(index_3.default, {
                        theme: undefined,
                        disabled: undefined,
                        focused: false,
                        hidden: false,
                        invalid: undefined,
                        readOnly: undefined,
                        required: undefined,
                        forId: ''
                    }, ['foo']),
                    d_1.v('input', {
                        'aria-invalid': null,
                        'aria-readonly': null,
                        classes: css.input,
                        disabled: undefined,
                        invalid: undefined,
                        key: 'native-input',
                        id: '',
                        max: undefined,
                        min: undefined,
                        name: undefined,
                        onblur: test_helpers_1.noop,
                        onchange: test_helpers_1.noop,
                        onfocus: test_helpers_1.noop,
                        readOnly: undefined,
                        required: undefined,
                        step: undefined,
                        type: 'time',
                        value: undefined
                    })
                ]); });
            },
            '`onBlur` should be called': function () {
                var onBlur = sinon.spy();
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onBlur: onBlur,
                    useNativeElement: true,
                    value: '12:34:56'
                }); });
                h.trigger('input[type=time]', 'onblur', { target: { value: '12:34:56' } });
                assert.isTrue(onBlur.calledWith('12:34:56'), '`onBlur` should be called with the value');
            },
            '`onChange` should be called': function () {
                var onChange = sinon.spy();
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onChange: onChange,
                    useNativeElement: true,
                    value: '12:34:56'
                }); });
                h.trigger('input[type=time]', 'onchange', { target: { value: '12:34:56' } });
                assert.isTrue(onChange.calledWith('12:34:56'), '`onChange` should be called with the value');
            },
            '`onFocus` should be called': function () {
                var onFocus = sinon.spy();
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onFocus: onFocus,
                    useNativeElement: true,
                    value: '12:34:56'
                }); });
                h.trigger('input[type=time]', 'onfocus', { target: { value: '12:34:56' } });
                assert.isTrue(onFocus.calledWith('12:34:56'), '`onFocus` should be called with the value');
            }
        }
    });
});
//# sourceMappingURL=TimePicker.js.map