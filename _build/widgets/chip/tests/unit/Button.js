(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../index", "../../../icon/index", "../../../theme/button.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var index_2 = require("../../../icon/index");
    var css = require("../../../theme/button.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    registerSuite('Button', {
        tests: {
            'no content': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {}); });
                h.expect(function () { return d_1.v('button', {
                    'aria-controls': null,
                    'aria-expanded': null,
                    'aria-haspopup': null,
                    'aria-pressed': null,
                    classes: [css.root, null, null, null],
                    disabled: undefined,
                    id: undefined,
                    name: undefined,
                    onblur: test_helpers_1.noop,
                    onclick: test_helpers_1.noop,
                    onfocus: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop,
                    onkeypress: test_helpers_1.noop,
                    onkeyup: test_helpers_1.noop,
                    onmousedown: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchcancel: test_helpers_1.noop,
                    type: undefined,
                    value: undefined
                }, [null]); });
            },
            'properties and attributes': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    type: 'submit',
                    name: 'bar',
                    id: 'qux',
                    aria: {
                        describedBy: 'baz'
                    },
                    disabled: true,
                    popup: {
                        expanded: true,
                        id: 'popupId'
                    },
                    pressed: true,
                    value: 'value'
                }, ['foo']); });
                h.expect(function () { return d_1.v('button', {
                    'aria-controls': 'popupId',
                    'aria-describedby': 'baz',
                    'aria-expanded': 'true',
                    'aria-haspopup': 'true',
                    'aria-pressed': 'true',
                    classes: [css.root, css.disabled, css.popup, css.pressed],
                    disabled: true,
                    name: 'bar',
                    id: 'qux',
                    onblur: test_helpers_1.noop,
                    onclick: test_helpers_1.noop,
                    onfocus: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop,
                    onkeypress: test_helpers_1.noop,
                    onkeyup: test_helpers_1.noop,
                    onmousedown: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchcancel: test_helpers_1.noop,
                    type: 'submit',
                    value: 'value'
                }, [
                    'foo',
                    d_1.v('span', { classes: css.addon }, [
                        d_1.w(index_2.default, { type: 'downIcon', theme: undefined })
                    ])
                ]); });
            },
            'popup = true': function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    popup: true
                }); });
                h.expect(function () { return d_1.v('button', {
                    'aria-controls': '',
                    'aria-expanded': 'false',
                    'aria-haspopup': 'true',
                    'aria-pressed': null,
                    classes: [css.root, null, css.popup, null],
                    disabled: undefined,
                    name: undefined,
                    id: undefined,
                    onblur: test_helpers_1.noop,
                    onclick: test_helpers_1.noop,
                    onfocus: test_helpers_1.noop,
                    onkeydown: test_helpers_1.noop,
                    onkeypress: test_helpers_1.noop,
                    onkeyup: test_helpers_1.noop,
                    onmousedown: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchcancel: test_helpers_1.noop,
                    type: undefined,
                    value: undefined
                }, [
                    d_1.v('span', { classes: css.addon }, [
                        d_1.w(index_2.default, { type: 'downIcon', theme: undefined })
                    ])
                ]); });
            },
            events: function () {
                var blurred = false;
                var clicked = false;
                var focused = false;
                var keydown = false;
                var keypress = false;
                var keyup = false;
                var mousedown = false;
                var mouseup = false;
                var touchstart = false;
                var touchend = false;
                var touchcancel = false;
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    onBlur: function () { blurred = true; },
                    onClick: function () { clicked = true; },
                    onFocus: function () { focused = true; },
                    onKeyDown: function () { keydown = true; },
                    onKeyPress: function () { keypress = true; },
                    onKeyUp: function () { keyup = true; },
                    onMouseDown: function () { mousedown = true; },
                    onMouseUp: function () { mouseup = true; },
                    onTouchStart: function () { touchstart = true; },
                    onTouchEnd: function () { touchend = true; },
                    onTouchCancel: function () { touchcancel = true; }
                }); });
                h.trigger('button', 'onblur');
                h.trigger('button', 'onclick', test_helpers_1.stubEvent);
                h.trigger('button', 'onfocus');
                h.trigger('button', 'onkeydown', test_helpers_1.stubEvent);
                h.trigger('button', 'onkeypress', test_helpers_1.stubEvent);
                h.trigger('button', 'onkeyup', test_helpers_1.stubEvent);
                h.trigger('button', 'onmousedown', test_helpers_1.stubEvent);
                h.trigger('button', 'onmouseup', test_helpers_1.stubEvent);
                h.trigger('button', 'ontouchstart', test_helpers_1.stubEvent);
                h.trigger('button', 'ontouchend', test_helpers_1.stubEvent);
                h.trigger('button', 'ontouchcancel', test_helpers_1.stubEvent);
                assert.isTrue(blurred);
                assert.isTrue(clicked);
                assert.isTrue(focused);
                assert.isTrue(keydown);
                assert.isTrue(keypress);
                assert.isTrue(keyup);
                assert.isTrue(mousedown);
                assert.isTrue(mouseup);
                assert.isTrue(touchstart);
                assert.isTrue(touchend);
                assert.isTrue(touchcancel);
            }
        }
    });
});
//# sourceMappingURL=Button.js.map