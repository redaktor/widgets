(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "sinon", "@dojo/framework/widget-core/d", "../../index", "../../../icon/index", "../../../theme/dialog.m.css", "../../styles/dialog.m.css", "../../../common/styles/animations.m.css", "../../../global-event/index", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var sinon = require("sinon");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var index_2 = require("../../../icon/index");
    var css = require("../../../theme/dialog.m.css");
    var fixedCss = require("../../styles/dialog.m.css");
    var animations = require("../../../common/styles/animations.m.css");
    var index_3 = require("../../../global-event/index");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy]);
    var expectedCloseButton = function () {
        return d_1.v('button', {
            classes: css.close,
            type: 'button',
            onclick: test_helpers_1.noop
        }, [
            'close ',
            d_1.w(index_2.default, { type: 'closeIcon', theme: undefined })
        ]);
    };
    var expected = function (open, closeable, children) {
        if (open === void 0) { open = false; }
        if (closeable === void 0) { closeable = false; }
        if (children === void 0) { children = []; }
        return d_1.v('div', {
            classes: css.root,
            dir: '',
            lang: null
        }, open ? [
            d_1.w(index_3.GlobalEvent, {
                key: 'global',
                document: {
                    keyup: test_helpers_1.noop
                }
            }),
            d_1.v('div', {
                classes: [null, fixedCss.underlay],
                enterAnimation: animations.fadeIn,
                exitAnimation: animations.fadeOut,
                key: 'underlay',
                onclick: test_helpers_1.noop
            }),
            d_1.v('div', {
                'aria-labelledby': '',
                classes: css.main,
                enterAnimation: animations.fadeIn,
                exitAnimation: animations.fadeOut,
                key: 'main',
                role: 'dialog',
                tabIndex: -1
            }, [
                d_1.v('div', {
                    classes: css.title,
                    key: 'title'
                }, [
                    d_1.v('div', { id: '' }, ['']),
                    closeable ? expectedCloseButton() : null
                ]),
                d_1.v('div', {
                    classes: css.content,
                    key: 'content'
                }, children)
            ])
        ] : []);
    };
    registerSuite('Dialog', {
        tests: {
            'default properties': function () {
                var properties = {};
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.expect(expected);
                properties = {
                    open: true,
                    closeable: false
                };
                h.expect(function () { return expected(true); });
            },
            'custom properties': function () {
                var properties = {
                    open: true
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                // set tested properties
                properties = {
                    aria: { describedBy: 'foo' },
                    closeable: true,
                    closeText: 'foo',
                    enterAnimation: 'fooAnimation',
                    exitAnimation: 'barAnimation',
                    open: true,
                    role: 'alertdialog',
                    title: 'foo',
                    underlay: true
                };
                h.expect(function () { return d_1.v('div', {
                    classes: css.root,
                    dir: '',
                    lang: null
                }, [
                    d_1.w(index_3.GlobalEvent, {
                        key: 'global',
                        document: {
                            keyup: test_helpers_1.noop
                        }
                    }),
                    d_1.v('div', {
                        classes: [css.underlayVisible, fixedCss.underlay],
                        enterAnimation: animations.fadeIn,
                        exitAnimation: animations.fadeOut,
                        key: 'underlay',
                        onclick: test_helpers_1.noop
                    }),
                    d_1.v('div', {
                        role: 'alertdialog',
                        'aria-describedby': 'foo',
                        'aria-labelledby': '',
                        classes: css.main,
                        enterAnimation: 'fooAnimation',
                        exitAnimation: 'barAnimation',
                        key: 'main',
                        tabIndex: -1
                    }, [
                        d_1.v('div', {
                            classes: css.title,
                            key: 'title'
                        }, [
                            d_1.v('div', { id: '' }, ['foo']),
                            d_1.v('button', {
                                classes: css.close,
                                type: 'button',
                                onclick: test_helpers_1.noop
                            }, [
                                'foo',
                                d_1.w(index_2.default, { type: 'closeIcon', theme: undefined })
                            ])
                        ]),
                        d_1.v('div', {
                            classes: css.content,
                            key: 'content'
                        }, [])
                    ])
                ]); });
            },
            'correct close text': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    closeable: true,
                    open: true,
                    title: 'foo'
                }); });
                h.expect(function () { return d_1.v('div', {
                    classes: css.root,
                    dir: '',
                    lang: null
                }, [
                    d_1.w(index_3.GlobalEvent, {
                        key: 'global',
                        document: {
                            keyup: test_helpers_1.noop
                        }
                    }),
                    d_1.v('div', {
                        classes: [null, fixedCss.underlay],
                        enterAnimation: animations.fadeIn,
                        exitAnimation: animations.fadeOut,
                        key: 'underlay',
                        onclick: test_helpers_1.noop
                    }),
                    d_1.v('div', {
                        role: 'dialog',
                        'aria-labelledby': '',
                        classes: css.main,
                        enterAnimation: animations.fadeIn,
                        exitAnimation: animations.fadeOut,
                        key: 'main',
                        tabIndex: -1
                    }, [
                        d_1.v('div', {
                            classes: css.title,
                            key: 'title'
                        }, [
                            d_1.v('div', { id: '' }, ['foo']),
                            d_1.v('button', {
                                classes: css.close,
                                type: 'button',
                                onclick: test_helpers_1.noop
                            }, [
                                'close foo',
                                d_1.w(index_2.default, { type: 'closeIcon', theme: undefined })
                            ])
                        ]),
                        d_1.v('div', {
                            classes: css.content,
                            key: 'content'
                        }, [])
                    ])
                ]); });
            },
            children: function () {
                var h = harness(function () { return d_1.w(index_1.default, { open: true }, [
                    d_1.v('p', ['Lorem ipsum dolor sit amet']),
                    d_1.v('a', { href: '#foo' }, ['foo'])
                ]); });
                h.expect(function () { return expected(true, true, [
                    d_1.v('p', ['Lorem ipsum dolor sit amet']),
                    d_1.v('a', { href: '#foo' }, ['foo'])
                ]); });
            },
            onRequestClose: function () {
                var onRequestClose = sinon.stub();
                var properties = {
                    closeable: true,
                    open: true,
                    onRequestClose: onRequestClose
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger("." + css.close, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onRequestClose.calledOnce, 'onRequestClose handler called when close button is clicked');
                properties = {
                    closeable: false,
                    open: true,
                    onRequestClose: onRequestClose
                };
                h.trigger("." + css.close, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onRequestClose.calledOnce, 'onRequestClose handler not called when closeable is false');
            },
            onOpen: function () {
                var onOpen = sinon.stub();
                var properties = {
                    open: true,
                    onOpen: onOpen
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                assert.isTrue(onOpen.calledOnce, 'onOpen handler called when open is initially set to true');
                properties = {
                    closeable: true,
                    open: true,
                    onOpen: onOpen
                };
                h.expect(function () { return expected(true, true); });
                assert.isTrue(onOpen.calledOnce, 'onOpen handler not called if dialog was previously open');
            },
            modal: function () {
                var onRequestClose = sinon.stub();
                var properties = {
                    open: true,
                    modal: true,
                    onRequestClose: onRequestClose
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.trigger("." + fixedCss.underlay, 'onclick', test_helpers_1.stubEvent);
                assert.isFalse(onRequestClose.called, 'onRequestClose should not be called when the underlay is clicked and modal is true');
                properties = {
                    open: true,
                    modal: false,
                    onRequestClose: onRequestClose
                };
                h.trigger("." + fixedCss.underlay, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(onRequestClose.called, 'onRequestClose is called when the underlay is clicked and modal is false');
            },
            escapeKey: function () {
                var onRequestClose = sinon.stub();
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: onRequestClose
                }); });
                h.trigger('@global', function (node) {
                    if (d_1.isWNode(node) && node.properties.document !== undefined) {
                        return node.properties.document.keyup;
                    }
                }, tslib_1.__assign({ which: Keys.Down }, test_helpers_1.stubEvent));
                assert.isTrue(onRequestClose.notCalled);
                h.trigger('@global', function (node) {
                    if (d_1.isWNode(node) && node.properties.document !== undefined) {
                        return node.properties.document.keyup;
                    }
                }, tslib_1.__assign({ which: Keys.Escape }, test_helpers_1.stubEvent));
                assert.isTrue(onRequestClose.calledOnce);
            }
        }
    });
});
//# sourceMappingURL=Dialog.js.map