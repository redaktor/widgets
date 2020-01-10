(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/meta/Focus", "@dojo/framework/widget-core/d", "../../index", "../../ListboxOption", "../../../theme/listbox.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var assert = intern.getPlugin('chai').assert;
    var registerSuite = intern.getInterface('object').registerSuite;
    var sinon = require("sinon");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var ListboxOption_1 = require("../../ListboxOption");
    var css = require("../../../theme/listbox.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var compareKey = { selector: '*', property: 'key', comparator: function (property) { return typeof property === 'string'; } };
    var compareAriaActiveDescendant = { selector: '*', property: 'aria-activedescendant', comparator: function (property) { return typeof property === 'string'; } };
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, compareAriaActiveDescendant]);
    var testOptions = [
        {
            label: 'One',
            value: 'one',
            id: 'first'
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
    var expectedFirstOption = function (overrides) {
        if (overrides === void 0) { overrides = {}; }
        return d_1.v('div', { key: 'first' }, [
            d_1.w(ListboxOption_1.default, tslib_1.__assign({ active: false, classes: [css.option, css.activeOption, null, null], disabled: false, id: 'first', index: 0, key: 'option-0', label: '[object Object]', option: testOptions[0], selected: false, onClick: test_helpers_1.noop, theme: undefined }, overrides))
        ]);
    };
    var expectedSecondOption = function (overrides) {
        if (overrides === void 0) { overrides = {}; }
        return d_1.v('div', { key: '1' }, [
            d_1.w(ListboxOption_1.default, tslib_1.__assign({ active: false, classes: [css.option, null, null, null], disabled: false, id: '', index: 1, key: 'option-1', label: '[object Object]', option: testOptions[1], selected: false, onClick: test_helpers_1.noop, theme: undefined }, overrides))
        ]);
    };
    var expectedThirdOption = function (overrides) {
        if (overrides === void 0) { overrides = {}; }
        return d_1.v('div', { key: '2' }, [
            d_1.w(ListboxOption_1.default, tslib_1.__assign({ active: false, classes: [css.option, null, null, null], disabled: false, id: '', index: 2, key: 'option-2', label: '[object Object]', option: testOptions[2], selected: false, onClick: test_helpers_1.noop, theme: undefined }, overrides))
        ]);
    };
    var expectedOptions = function (activeIndex) {
        if (activeIndex === void 0) { activeIndex = 0; }
        return [
            expectedFirstOption({ active: activeIndex === 0 }),
            expectedSecondOption({ active: activeIndex === 1 }),
            expectedThirdOption({ active: activeIndex === 2 })
        ];
    };
    var expectedVdom = function (options) {
        if (options === void 0) { options = []; }
        return d_1.v('div', {
            'aria-activedescendant': '',
            'aria-multiselectable': null,
            classes: [css.root, null],
            id: undefined,
            key: 'root',
            role: 'listbox',
            tabIndex: 0,
            onkeydown: test_helpers_1.noop
        }, options);
    };
    registerSuite('Listbox', {
        tests: {
            'empty listbox': function () {
                var h = harness(function () { return d_1.w(index_1.default, {}); });
                h.expect(function () { return expectedVdom(); });
            },
            'options with default properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    optionData: testOptions
                }); }, [compareKey]);
                h.expect(function () { return expectedVdom(expectedOptions()); });
            },
            'custom properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 0,
                    aria: { describedBy: 'foo' },
                    visualFocus: true,
                    widgetId: 'bar',
                    multiselect: true,
                    optionData: testOptions,
                    tabIndex: -1,
                    theme: {},
                    getOptionDisabled: function (option) { return !!option.disabled; },
                    getOptionId: function (option, index) { return option.id || "" + index; },
                    getOptionLabel: function (option) { return option.label; },
                    getOptionSelected: function (option, index) { return index === 1; }
                }); });
                h.expect(function () { return d_1.v('div', {
                    'aria-activedescendant': 'first',
                    'aria-describedby': 'foo',
                    'aria-multiselectable': 'true',
                    classes: [css.root, css.focused],
                    id: 'bar',
                    tabIndex: -1,
                    key: 'root',
                    role: 'listbox',
                    onkeydown: test_helpers_1.noop
                }, [
                    expectedFirstOption({
                        label: 'One',
                        active: true,
                        theme: {}
                    }),
                    expectedSecondOption({
                        classes: [css.option, null, null, css.selectedOption],
                        label: 'Two',
                        selected: true,
                        theme: {}
                    }),
                    expectedThirdOption({
                        classes: [css.option, null, css.disabledOption, null],
                        disabled: true,
                        label: 'Three',
                        theme: {}
                    })
                ]); });
            },
            'focused class': function () {
                var mockMeta = sinon.stub();
                var mockFocusGet = sinon.stub().returns({
                    active: true,
                    containsFocus: true
                });
                mockMeta.withArgs(Focus_1.default).returns({
                    get: mockFocusGet
                });
                var h = harness(function () { return d_1.w(test_helpers_1.MockMetaMixin(index_1.default, mockMeta), {}); });
                h.expect(function () { return d_1.v('div', {
                    'aria-activedescendant': '',
                    'aria-multiselectable': null,
                    classes: [css.root, css.focused],
                    id: undefined,
                    key: 'root',
                    role: 'listbox',
                    tabIndex: 0,
                    onkeydown: test_helpers_1.noop
                }, []); });
            },
            'onkeydown event': function () {
                var onKeyDown = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, { onKeyDown: onKeyDown }); });
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ eventInit: { which: Keys.Down } }, test_helpers_1.stubEvent));
                assert.isTrue(onKeyDown.called);
            },
            'arrow keys move active index': function () {
                var onActiveIndexChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    optionData: testOptions,
                    onActiveIndexChange: onActiveIndexChange
                }); });
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Down, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onActiveIndexChange.calledWith(1), 'Down arrow moves to second option');
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Up, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onActiveIndexChange.calledWith(1), 'Up arrow moves to last option');
            },
            'home and end move active index': function () {
                var onActiveIndexChange = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 1,
                    optionData: testOptions,
                    onActiveIndexChange: onActiveIndexChange
                }); });
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Home, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onActiveIndexChange.calledWith(0), 'Home key moves to first option');
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.End, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onActiveIndexChange.calledWith(2), 'End key moves to last option');
            },
            'clicking selects option and moves active index': function () {
                var onActiveIndexChange = sinon.stub();
                var onOptionSelect = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 1,
                    optionData: testOptions,
                    onActiveIndexChange: onActiveIndexChange,
                    onOptionSelect: onOptionSelect
                }); });
                h.trigger('@option-0', 'onClick', testOptions[0], 0);
                assert.isTrue(onActiveIndexChange.calledWith(0), 'Clicking first option moves active index');
                assert.isTrue(onOptionSelect.calledWith(testOptions[0], 0), 'Clicking first option selects it');
            },
            'keyboard selects active option': function () {
                var onOptionSelect = sinon.stub();
                var properties = {
                    activeIndex: 1,
                    key: 'foo',
                    optionData: testOptions,
                    onOptionSelect: onOptionSelect
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Enter, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onOptionSelect.calledWith(testOptions[1], 1, 'foo'), 'Enter key selects option');
                properties = {
                    activeIndex: 0,
                    key: 'foo',
                    optionData: testOptions,
                    onOptionSelect: onOptionSelect
                };
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Space, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isTrue(onOptionSelect.calledWith(testOptions[0], 0, 'foo'), 'Space key selects option');
            },
            'disabled options are not selected': function () {
                var onOptionSelect = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    activeIndex: 2,
                    optionData: testOptions,
                    getOptionDisabled: function (option) { return !!option.disabled; },
                    onOptionSelect: onOptionSelect
                }); });
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Enter, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isFalse(onOptionSelect.called, 'Enter key does not select disabled option');
                h.trigger('@root', 'onkeydown', tslib_1.__assign({ which: Keys.Space, preventDefault: sinon.stub() }, test_helpers_1.stubEvent));
                assert.isFalse(onOptionSelect.called, 'Space key does not select disabled option');
                h.trigger('@option-0', 'onClick', testOptions[2], 2);
                assert.isFalse(onOptionSelect.called, 'Clicking disabled option does not select it');
            },
            'scroll to active option below the viewport': function () {
                var scrollStub = sinon.stub();
                var StubMeta = /** @class */ (function () {
                    function StubMeta() {
                    }
                    // dimensions .get()
                    StubMeta.prototype.get = function (key) {
                        if (key === 'root') {
                            return {
                                scroll: { top: 0 },
                                offset: { height: 200 }
                            };
                        }
                        else {
                            return {
                                offset: {
                                    top: 300,
                                    height: 50
                                }
                            };
                        }
                    };
                    // scroll meta
                    StubMeta.prototype.scroll = function (key, scrollValue) {
                        scrollStub(key, scrollValue);
                    };
                    return StubMeta;
                }());
                var ScrollListbox = /** @class */ (function (_super) {
                    tslib_1.__extends(ScrollListbox, _super);
                    function ScrollListbox() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    ScrollListbox.prototype.meta = function (MetaType) {
                        return new StubMeta();
                    };
                    return ScrollListbox;
                }(index_1.default));
                harness(function () { return d_1.w(ScrollListbox, { activeIndex: 3 }); });
                assert.isTrue(scrollStub.calledWith('root', 150));
            },
            'scroll to active option above the viewport': function () {
                var scrollStub = sinon.stub();
                var StubDimensions = /** @class */ (function () {
                    function StubDimensions() {
                    }
                    StubDimensions.prototype.get = function (key) {
                        if (key === 'root') {
                            return {
                                scroll: { top: 300 },
                                offset: { height: 200 }
                            };
                        }
                        else {
                            return {
                                offset: {
                                    top: 100,
                                    height: 50
                                }
                            };
                        }
                    };
                    // scroll meta
                    StubDimensions.prototype.scroll = function (key, scrollValue) {
                        scrollStub(key, scrollValue);
                    };
                    return StubDimensions;
                }());
                var ScrollListbox = /** @class */ (function (_super) {
                    tslib_1.__extends(ScrollListbox, _super);
                    function ScrollListbox() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    ScrollListbox.prototype.meta = function (MetaType) {
                        return new StubDimensions();
                    };
                    return ScrollListbox;
                }(index_1.default));
                harness(function () { return d_1.w(ScrollListbox, { activeIndex: 0 }); });
                assert.isTrue(scrollStub.calledWith('root', 100));
            }
        }
    });
});
//# sourceMappingURL=Listbox.js.map