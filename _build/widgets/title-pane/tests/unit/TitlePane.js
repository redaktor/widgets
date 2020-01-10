(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "../../../icon/index", "../../index", "../../../theme/title-pane.m.css", "../../styles/title-pane.m.css", "../../../common/tests/support/test-helpers", "../../../global-event/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../../icon/index");
    var index_2 = require("../../index");
    var css = require("../../../theme/title-pane.m.css");
    var fixedCss = require("../../styles/title-pane.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var index_3 = require("../../../global-event/index");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy, test_helpers_1.compareAriaControls]);
    var StubMeta = /** @class */ (function () {
        function StubMeta() {
        }
        // dimensions .get()
        StubMeta.prototype.get = function (key) {
            return {
                offset: { height: 100 }
            };
        };
        return StubMeta;
    }());
    var StubbedTitlePane = /** @class */ (function (_super) {
        tslib_1.__extends(StubbedTitlePane, _super);
        function StubbedTitlePane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StubbedTitlePane.prototype.meta = function (MetaType) {
            return new StubMeta();
        };
        return StubbedTitlePane;
    }(index_2.default));
    function createVNodeSelector(type, name) {
        return function (node) {
            if (d_1.isWNode(node) && node.properties[type] !== undefined) {
                var globalFuncs = node.properties[type];
                return globalFuncs ? globalFuncs[name] : undefined;
            }
        };
    }
    var expected = function (options) {
        if (options === void 0) { options = {}; }
        var _a = options.open, open = _a === void 0 ? true : _a, _b = options.closeable, closeable = _b === void 0 ? true : _b, _c = options.heading, heading = _c === void 0 ? null : _c, _d = options.transition, transition = _d === void 0 ? true : _d;
        return d_1.v('div', {
            classes: [css.root, open ? css.open : null, fixedCss.rootFixed]
        }, [
            d_1.w(index_3.GlobalEvent, { window: { resize: test_helpers_1.noop }, key: 'global' }),
            d_1.v('div', {
                'aria-level': heading,
                classes: [css.title, closeable ? css.closeable : null, fixedCss.titleFixed, closeable ? fixedCss.closeableFixed : null],
                role: 'heading'
            }, [
                d_1.v('button', {
                    'aria-controls': '',
                    'aria-expanded': "" + open,
                    classes: [fixedCss.titleButtonFixed, css.titleButton],
                    disabled: !closeable,
                    id: '',
                    type: 'button',
                    onclick: test_helpers_1.noop
                }, [
                    d_1.v('span', { classes: css.arrow }, [
                        d_1.w(index_1.default, { type: open ? 'downIcon' : 'rightIcon', theme: undefined })
                    ]),
                    'test'
                ])
            ]),
            d_1.v('div', {
                'aria-hidden': open ? null : 'true',
                'aria-labelledby': '',
                classes: [css.content, transition ? css.contentTransition : null, fixedCss.contentFixed],
                styles: {
                    marginTop: open ? '0px' : '-100px'
                },
                id: '',
                key: 'content'
            }, [])
        ]);
    };
    registerSuite('TitlePane', {
        tests: {
            'default rendering': function () {
                var h = harness(function () { return d_1.w(StubbedTitlePane, { title: 'test' }); });
                h.expect(expected);
            },
            'Should construct with the passed properties': function () {
                var h = harness(function () { return d_1.w(StubbedTitlePane, {
                    closeable: false,
                    headingLevel: 5,
                    open: false,
                    title: 'test'
                }); });
                h.expect(function () { return expected({ open: false, closeable: false, heading: '5' }); });
            },
            'click title to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(StubbedTitlePane, {
                    closeable: true,
                    onRequestClose: function () {
                        called = true;
                    },
                    title: 'test'
                }); });
                h.trigger("." + css.titleButton, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(called, 'onRequestClose should be called on title click');
            },
            'click title to open': function () {
                var called = false;
                var h = harness(function () { return d_1.w(StubbedTitlePane, {
                    closeable: true,
                    open: false,
                    onRequestOpen: function () {
                        called = true;
                    },
                    title: 'test'
                }); });
                h.trigger("." + css.titleButton, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(called, 'onRequestOpen should be called on title click');
            },
            'can not open pane on click': function () {
                var called = 0;
                var properties = {
                    closeable: false,
                    open: true,
                    onRequestClose: function () {
                        called++;
                    },
                    title: 'test'
                };
                var h = harness(function () { return d_1.w(StubbedTitlePane, properties); });
                h.trigger("." + css.titleButton, 'onclick', test_helpers_1.stubEvent);
                properties = {
                    open: true,
                    onRequestClose: function () {
                        called++;
                    },
                    title: 'test'
                };
                h.trigger("." + css.titleButton, 'onclick', test_helpers_1.stubEvent);
                assert.strictEqual(called, 1, 'onRequestClose should only becalled once');
            },
            'Can animate closed': function () {
                var open = true;
                var h = harness(function () { return d_1.w(StubbedTitlePane, {
                    title: 'test',
                    open: open
                }); });
                h.expect(function () { return expected({ open: true }); });
                open = false;
                h.expect(function () { return expected({ open: false }); });
            },
            'Global resize event removes transition class': function () {
                var h = harness(function () { return d_1.w(StubbedTitlePane, {
                    title: 'test'
                }); });
                h.expect(function () { return expected({ open: true, transition: true }); });
                h.trigger('@global', createVNodeSelector('window', 'resize'), test_helpers_1.stubEvent);
                h.expect(function () { return expected({ open: true, transition: false }); });
            }
        }
    });
});
//# sourceMappingURL=TitlePane.js.map