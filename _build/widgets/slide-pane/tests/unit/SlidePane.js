(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "../../index", "../../../theme/slide-pane.m.css", "../../styles/slide-pane.m.css", "../../../common/styles/animations.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var assert = intern.getPlugin('chai').assert;
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var css = require("../../../theme/slide-pane.m.css");
    var fixedCss = require("../../styles/slide-pane.m.css");
    var animations = require("../../../common/styles/animations.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareId, test_helpers_1.compareAriaLabelledBy]);
    var GREEKING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\tQuisque id purus ipsum. Aenean ac purus purus.\n\tNam sollicitudin varius augue, sed lacinia felis tempor in.";
    registerSuite('SlidePane', {
        tests: {
            'Should construct SlidePane with passed properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    key: 'foo',
                    align: index_1.Align.left,
                    aria: { describedBy: 'foo' },
                    open: true,
                    underlay: true
                }, [GREEKING]); });
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': '',
                    classes: css.root,
                    dir: '',
                    lang: null,
                    onmousedown: test_helpers_1.noop,
                    onmousemove: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchmove: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop
                }, [
                    d_1.v('div', {
                        classes: [css.underlayVisible, fixedCss.underlay],
                        enterAnimation: animations.fadeIn,
                        exitAnimation: animations.fadeOut,
                        onmouseup: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        key: 'underlay'
                    }),
                    d_1.v('div', {
                        key: 'content',
                        'aria-describedby': 'foo',
                        classes: [
                            css.pane,
                            css.left,
                            css.open,
                            css.slideIn,
                            null,
                            fixedCss.paneFixed,
                            fixedCss.openFixed,
                            fixedCss.leftFixed,
                            fixedCss.slideInFixed,
                            null
                        ],
                        transitionend: test_helpers_1.noop,
                        styles: {
                            transform: undefined,
                            width: '320px',
                            height: null
                        }
                    }, [
                        null,
                        d_1.v('div', {
                            classes: css.content
                        }, [GREEKING])
                    ])
                ]); }, function () { return h.getRender(); });
            },
            'Render correct children': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    key: 'foo',
                    underlay: false
                }); });
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': '',
                    dir: '',
                    lang: null,
                    onmousedown: test_helpers_1.noop,
                    onmousemove: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchmove: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    classes: css.root
                }, [
                    null,
                    d_1.v('div', {
                        key: 'content',
                        classes: [
                            css.pane,
                            css.left,
                            null,
                            null,
                            null,
                            fixedCss.paneFixed,
                            null,
                            fixedCss.leftFixed,
                            null,
                            null
                        ],
                        transitionend: test_helpers_1.noop,
                        styles: {
                            transform: undefined,
                            width: '320px',
                            height: null
                        }
                    }, [
                        null,
                        d_1.v('div', {
                            classes: css.content
                        }, [])
                    ])
                ]); });
            },
            onOpen: function () {
                var called = false;
                harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onOpen: function () {
                        called = true;
                    }
                }); });
                assert.isTrue(called, 'onOpen should be called');
            },
            'change property to close': function () {
                var properties = {
                    open: true
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': '',
                    dir: '',
                    lang: null,
                    onmousedown: test_helpers_1.noop,
                    onmousemove: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchmove: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    classes: css.root
                }, [
                    d_1.v('div', {
                        classes: [null, fixedCss.underlay],
                        enterAnimation: animations.fadeIn,
                        exitAnimation: animations.fadeOut,
                        onmouseup: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        key: 'underlay'
                    }),
                    d_1.v('div', {
                        key: 'content',
                        classes: [
                            css.pane,
                            css.left,
                            css.open,
                            css.slideIn,
                            null,
                            fixedCss.paneFixed,
                            fixedCss.openFixed,
                            fixedCss.leftFixed,
                            fixedCss.slideInFixed,
                            null
                        ],
                        transitionend: test_helpers_1.noop,
                        styles: {
                            transform: undefined,
                            width: '320px',
                            height: null
                        }
                    }, [
                        null,
                        d_1.v('div', {
                            classes: css.content
                        }, [])
                    ])
                ]); });
                properties.open = false;
                h.expect(function () { return d_1.v('div', {
                    'aria-labelledby': '',
                    dir: '',
                    lang: null,
                    onmousedown: test_helpers_1.noop,
                    onmousemove: test_helpers_1.noop,
                    onmouseup: test_helpers_1.noop,
                    ontouchend: test_helpers_1.noop,
                    ontouchmove: test_helpers_1.noop,
                    ontouchstart: test_helpers_1.noop,
                    classes: css.root
                }, [
                    null,
                    d_1.v('div', {
                        key: 'content',
                        classes: [
                            css.pane,
                            css.left,
                            null,
                            null,
                            css.slideOut,
                            fixedCss.paneFixed,
                            null,
                            fixedCss.leftFixed,
                            null,
                            fixedCss.slideOutFixed
                        ],
                        transitionend: test_helpers_1.noop,
                        styles: {
                            transform: undefined,
                            width: '320px',
                            height: null
                        }
                    }, [
                        null,
                        d_1.v('div', {
                            classes: css.content
                        }, [])
                    ])
                ]); });
            },
            'click underlay to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'onmousedown', tslib_1.__assign({ pageX: 300 }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'onmouseup', tslib_1.__assign({ pageX: 300 }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should have been called');
            },
            'click close button to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    title: 'foo',
                    closeText: 'close',
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger("." + css.close, 'onclick', test_helpers_1.stubEvent);
                assert.isTrue(called, 'onRequestClose should have been called');
            },
            'tap underlay to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'ontouchstart', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchend', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called on underlay tap');
            },
            'drag to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'onmousedown', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'onmousemove', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'onmouseup', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called if dragged far enough');
            },
            'swipe to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenX: 150 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchstart', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchend', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called if swiped far enough');
            },
            'swipe to close top': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    align: index_1.Align.top,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenY: 150 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchstart', tslib_1.__assign({ changedTouches: [{ screenY: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenY: 150 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchend', tslib_1.__assign({ changedTouches: [{ screenY: 50 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called if swiped far enough up');
            },
            'swipe to close right': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    align: index_1.Align.right,
                    open: true,
                    width: 320,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'ontouchstart', tslib_1.__assign({ changedTouches: [{ screenX: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenX: 400 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchend', tslib_1.__assign({ changedTouches: [{ screenX: 500 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called if swiped far enough to close right');
            },
            'swipe to close bottom': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    align: index_1.Align.bottom,
                    open: true,
                    width: 320,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger('@underlay', 'ontouchstart', tslib_1.__assign({ changedTouches: [{ screenY: 300 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchmove', tslib_1.__assign({ changedTouches: [{ screenY: 400 }] }, test_helpers_1.stubEvent));
                h.trigger('@underlay', 'ontouchend', tslib_1.__assign({ changedTouches: [{ screenY: 500 }] }, test_helpers_1.stubEvent));
                assert.isTrue(called, 'onRequestClose should be called if swiped far enough to close bottom');
            },
            'not dragged far enough to close': function () {
                var called = false;
                var h = harness(function () { return d_1.w(index_1.default, {
                    open: true,
                    onRequestClose: function () {
                        called = true;
                    }
                }); });
                h.trigger("." + css.root, 'onmousedown', tslib_1.__assign({ pageX: 300 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmousemove', tslib_1.__assign({ pageX: 250 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmouseup', tslib_1.__assign({ pageX: 250 }, test_helpers_1.stubEvent));
                assert.isFalse(called, 'onRequestClose should not be called if not swiped far enough to close');
            },
            'classes removed after transition': function () {
                function expected(open, transitionDone) {
                    return d_1.v('div', {
                        'aria-labelledby': '',
                        dir: '',
                        lang: null,
                        onmousedown: test_helpers_1.noop,
                        onmousemove: test_helpers_1.noop,
                        onmouseup: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        ontouchmove: test_helpers_1.noop,
                        ontouchstart: test_helpers_1.noop,
                        classes: css.root
                    }, [
                        open ? d_1.v('div', {
                            classes: [null, fixedCss.underlay],
                            enterAnimation: animations.fadeIn,
                            exitAnimation: animations.fadeOut,
                            onmouseup: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            key: 'underlay'
                        }) : null,
                        d_1.v('div', {
                            key: 'content',
                            classes: [
                                css.pane,
                                css.left,
                                open ? css.open : null,
                                transitionDone ? null : (open ? css.slideIn : null),
                                transitionDone ? null : (open ? null : css.slideOut),
                                fixedCss.paneFixed,
                                open ? fixedCss.openFixed : null,
                                fixedCss.leftFixed,
                                transitionDone ? null : (open ? fixedCss.slideInFixed : null),
                                transitionDone ? null : (open ? null : fixedCss.slideOutFixed)
                            ],
                            transitionend: test_helpers_1.noop,
                            styles: {
                                transform: undefined,
                                width: '320px',
                                height: null
                            }
                        }, [
                            null,
                            d_1.v('div', {
                                classes: css.content
                            }, [GREEKING])
                        ])
                    ]);
                }
                var properties = {
                    open: true
                };
                var h = harness(function () { return d_1.w(index_1.default, properties, [GREEKING]); });
                h.expect(function () { return expected(true, false); }, function () { return h.getRender(); });
                h.trigger('@content', 'transitionend');
                h.expect(function () { return expected(true, true); });
                properties.open = false;
                h.expect(function () { return expected(false, false); });
                h.trigger('@content', 'transitionend');
                h.expect(function () { return expected(false, true); });
            },
            'last transform is applied on next render if being swiped closed': function () {
                var properties = {
                    open: true
                };
                var h = harness(function () { return d_1.w(index_1.default, properties, [GREEKING]); });
                function expected(closed, swipeState) {
                    if (swipeState === void 0) { swipeState = {}; }
                    return d_1.v('div', {
                        'aria-labelledby': '',
                        dir: '',
                        lang: null,
                        onmousedown: test_helpers_1.noop,
                        onmousemove: test_helpers_1.noop,
                        onmouseup: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        ontouchmove: test_helpers_1.noop,
                        ontouchstart: test_helpers_1.noop,
                        classes: css.root
                    }, [
                        closed ? null : d_1.v('div', {
                            classes: [null, fixedCss.underlay],
                            enterAnimation: animations.fadeIn,
                            exitAnimation: animations.fadeOut,
                            onmouseup: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            key: 'underlay'
                        }),
                        d_1.v('div', {
                            key: 'content',
                            classes: swipeState.classes || [
                                css.pane,
                                css.left,
                                closed ? null : css.open,
                                css.slideIn,
                                null,
                                fixedCss.paneFixed,
                                closed ? null : fixedCss.openFixed,
                                fixedCss.leftFixed,
                                fixedCss.slideInFixed,
                                null
                            ],
                            transitionend: test_helpers_1.noop,
                            styles: swipeState.styles || {
                                transform: undefined,
                                width: '320px',
                                height: null
                            }
                        }, [
                            null,
                            d_1.v('div', {
                                classes: css.content
                            }, [GREEKING])
                        ])
                    ]);
                }
                h.expect(function () { return expected(false); }, function () { return h.getRender(); });
                h.trigger("." + css.root, 'onmousedown', tslib_1.__assign({ pageX: 300 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmousemove', tslib_1.__assign({ pageX: 150 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmouseup', tslib_1.__assign({ pageX: 50 }, test_helpers_1.stubEvent));
                properties.open = false;
                h.expect(function () { return expected(true, {
                    classes: [
                        css.pane,
                        css.left,
                        null,
                        null,
                        css.slideOut,
                        fixedCss.paneFixed,
                        null,
                        fixedCss.leftFixed,
                        null,
                        fixedCss.slideOutFixed
                    ],
                    styles: {
                        transform: 'translateX(-78.125%)',
                        width: '320px',
                        height: null
                    }
                }); });
            },
            'last transform is applied on next render if being swiped closed right': function () {
                function expected(closed, swipeState) {
                    if (closed === void 0) { closed = false; }
                    if (swipeState === void 0) { swipeState = {}; }
                    return d_1.v('div', {
                        'aria-labelledby': '',
                        dir: '',
                        lang: null,
                        onmousedown: test_helpers_1.noop,
                        onmousemove: test_helpers_1.noop,
                        onmouseup: test_helpers_1.noop,
                        ontouchend: test_helpers_1.noop,
                        ontouchmove: test_helpers_1.noop,
                        ontouchstart: test_helpers_1.noop,
                        classes: css.root
                    }, [
                        closed ? null : d_1.v('div', {
                            classes: [null, fixedCss.underlay],
                            enterAnimation: animations.fadeIn,
                            exitAnimation: animations.fadeOut,
                            onmouseup: test_helpers_1.noop,
                            ontouchend: test_helpers_1.noop,
                            key: 'underlay'
                        }),
                        d_1.v('div', {
                            key: 'content',
                            classes: swipeState.classes || [
                                css.pane,
                                css.right,
                                css.open,
                                css.slideIn,
                                null,
                                fixedCss.paneFixed,
                                fixedCss.openFixed,
                                fixedCss.rightFixed,
                                fixedCss.slideInFixed,
                                null
                            ],
                            transitionend: test_helpers_1.noop,
                            styles: swipeState.styles || {
                                transform: undefined,
                                width: '320px',
                                height: null
                            }
                        }, [
                            null,
                            d_1.v('div', {
                                classes: css.content
                            })
                        ])
                    ]);
                }
                var properties = {
                    align: index_1.Align.right,
                    open: true
                };
                var h = harness(function () { return d_1.w(index_1.default, properties); });
                h.expect(expected);
                h.trigger("." + css.root, 'onmousedown', tslib_1.__assign({ pageX: 300 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmousemove', tslib_1.__assign({ pageX: 400 }, test_helpers_1.stubEvent));
                h.trigger("." + css.root, 'onmouseup', tslib_1.__assign({ pageX: 500 }, test_helpers_1.stubEvent));
                properties = {
                    align: index_1.Align.right,
                    open: false
                };
                h.expect(function () { return expected(true, {
                    classes: [
                        css.pane,
                        css.right,
                        null,
                        null,
                        css.slideOut,
                        fixedCss.paneFixed,
                        null,
                        fixedCss.rightFixed,
                        null,
                        fixedCss.slideOutFixed
                    ],
                    styles: {
                        transform: 'translateX(62.5%)',
                        width: '320px',
                        height: null
                    }
                }); });
            }
        }
    });
});
//# sourceMappingURL=SlidePane.js.map