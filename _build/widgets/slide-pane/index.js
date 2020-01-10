(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/styles/animations.m.css", "../common/nls/common", "../../framework/uuid", "@dojo/framework/widget-core/mixins/I18n", "../icon/index", "./styles/slide-pane.m.css", "../themes/redaktor-default/slide-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var animations = require("../common/styles/animations.m.css");
    var common_1 = require("../common/nls/common");
    var uuid_1 = require("../../framework/uuid");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var index_1 = require("../icon/index");
    var fixedCss = require("./styles/slide-pane.m.css");
    var css = require("../themes/redaktor-default/slide-pane.m.css");
    /**
     * Enum for left / right alignment
     */
    var Align;
    (function (Align) {
        Align["bottom"] = "bottom";
        Align["left"] = "left";
        Align["right"] = "right";
        Align["top"] = "top";
    })(Align = exports.Align || (exports.Align = {}));
    /**
     * The default width of the slide pane
     */
    var DEFAULT_WIDTH = 320;
    var Plane;
    (function (Plane) {
        Plane[Plane["x"] = 0] = "x";
        Plane[Plane["y"] = 1] = "y";
    })(Plane || (Plane = {}));
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.ThemedBase);
    var SlidePaneBase = /** @class */ (function (_super) {
        tslib_1.__extends(SlidePaneBase, _super);
        function SlidePaneBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._titleId = uuid_1.default();
            _this._wasOpen = false;
            _this._attached = false;
            _this._hasMoved = false;
            return _this;
        }
        Object.defineProperty(SlidePaneBase.prototype, "plane", {
            get: function () {
                var _a = this.properties.align, align = _a === void 0 ? Align.left : _a;
                return align === Align.left || align === Align.right ? Plane.x : Plane.y;
            },
            enumerable: true,
            configurable: true
        });
        SlidePaneBase.prototype._getDelta = function (event, eventType) {
            var _a = this.properties.align, align = _a === void 0 ? Align.left : _a;
            if (this.plane === Plane.x) {
                var currentX = event.type === eventType ? event.changedTouches[0].screenX : event.pageX;
                return align === Align.right ? currentX - this._initialPosition : this._initialPosition - currentX;
            }
            else {
                var currentY = event.type === eventType ? event.changedTouches[0].screenY : event.pageY;
                return align === Align.bottom ? currentY - this._initialPosition : this._initialPosition - currentY;
            }
        };
        SlidePaneBase.prototype._onCloseClick = function (event) {
            event.stopPropagation();
            var onRequestClose = this.properties.onRequestClose;
            onRequestClose && onRequestClose();
        };
        SlidePaneBase.prototype._onSwipeStart = function (event) {
            event.stopPropagation();
            this._swiping = true;
            // Cache initial pointer position
            if (this.plane === Plane.x) {
                this._initialPosition = event.type === 'touchstart' ? event.changedTouches[0].screenX : event.pageX;
            }
            else {
                this._initialPosition = event.type === 'touchstart' ? event.changedTouches[0].screenY : event.pageY;
            }
            // Clear out the last transform applied
            this._transform = 0;
        };
        SlidePaneBase.prototype._onSwipeMove = function (event) {
            event.stopPropagation();
            // Ignore mouse movement when not clicking
            if (!this._swiping) {
                return;
            }
            this._hasMoved = true;
            var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.width, width = _c === void 0 ? DEFAULT_WIDTH : _c;
            var delta = this._getDelta(event, 'touchmove');
            // Transform to apply
            this._transform = 100 * delta / width;
            // Prevent pane from sliding past screen edge
            if (delta <= 0) {
                return;
            }
            // Move the pane
            if (this.plane === Plane.x) {
                this._stylesTransform = "translateX(" + (align === Align.left ? '-' : '') + this._transform + "%)";
            }
            else {
                this._stylesTransform = "translateY(" + (align === Align.top ? '-' : '') + this._transform + "%)";
            }
            this.invalidate();
        };
        SlidePaneBase.prototype._onSwipeEnd = function (event) {
            event.stopPropagation();
            this._swiping = false;
            this._hasMoved = false;
            var _a = this.properties, onRequestClose = _a.onRequestClose, _b = _a.width, width = _b === void 0 ? DEFAULT_WIDTH : _b;
            var delta = this._getDelta(event, 'touchend');
            // If the pane was swiped far enough to close
            if (delta > width / 2) {
                // Cache the transform to apply on next render
                this._transform = 100 * delta / width;
                onRequestClose && onRequestClose();
            }
            // If pane was not swiped far enough to close
            else if (delta > 0) {
                // Animate the pane back open
                this._slideIn = true;
                this.invalidate();
            }
        };
        SlidePaneBase.prototype._onUnderlayMouseUp = function (event) {
            var onRequestClose = this.properties.onRequestClose;
            if (this._hasMoved === false) {
                onRequestClose && onRequestClose();
            }
        };
        SlidePaneBase.prototype.onAttach = function () {
            this._attached = true;
        };
        SlidePaneBase.prototype.getContent = function () {
            return Widget_1.v('div', { classes: this.theme(css.content) }, this.children);
        };
        SlidePaneBase.prototype.getStyles = function () {
            var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.open, open = _c === void 0 ? false : _c, _d = _a.width, width = _d === void 0 ? DEFAULT_WIDTH : _d;
            var translate = '';
            var translateAxis = this.plane === Plane.x ? 'X' : 'Y';
            // If pane is closing because of swipe
            if (!open && this._wasOpen && this._transform) {
                translate = align === Align.left || align === Align.top ? "-" + this._transform : "" + this._transform;
            }
            return {
                transform: translate ? "translate" + translateAxis + "(" + translate + "%)" : this._stylesTransform,
                width: this.plane === Plane.x ? width + "px" : void 0,
                height: this.plane === Plane.y ? width + "px" : void 0
            };
        };
        SlidePaneBase.prototype.getFixedModifierClasses = function () {
            var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.open, open = _c === void 0 ? false : _c;
            var alignCss = fixedCss;
            return [
                open ? fixedCss.openFixed : null,
                alignCss[align + "Fixed"],
                this._slideIn || (open && !this._wasOpen) ? fixedCss.slideInFixed : null,
                !open && this._wasOpen ? fixedCss.slideOutFixed : null
            ];
        };
        SlidePaneBase.prototype.getModifierClasses = function () {
            var _a = this.properties, _b = _a.align, align = _b === void 0 ? Align.left : _b, _c = _a.open, open = _c === void 0 ? false : _c;
            var alignCss = css;
            return [
                alignCss[align],
                open ? css.open : null,
                this._slideIn || (open && !this._wasOpen) ? css.slideIn : null,
                !open && this._wasOpen ? css.slideOut : null
            ];
        };
        SlidePaneBase.prototype.renderTitle = function () {
            var _a = this.properties.title, title = _a === void 0 ? '' : _a;
            return Widget_1.v('div', { id: this._titleId }, [title]);
        };
        SlidePaneBase.prototype.renderUnderlay = function () {
            var _a = this.properties.underlay, underlay = _a === void 0 ? false : _a;
            return Widget_1.v('div', {
                classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
                enterAnimation: animations.fadeIn,
                exitAnimation: animations.fadeOut,
                onmouseup: this._onUnderlayMouseUp,
                ontouchend: this._onUnderlayMouseUp,
                key: 'underlay'
            });
        };
        SlidePaneBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, closeText = _a.closeText, onOpen = _a.onOpen, _c = _a.open, open = _c === void 0 ? false : _c, _d = _a.title, title = _d === void 0 ? '' : _d, theme = _a.theme;
            var contentStyles = this.getStyles();
            var contentClasses = this.getModifierClasses();
            var fixedContentClasses = this.getFixedModifierClasses();
            if (this._slideIn && this._attached) {
                this._stylesTransform = '';
            }
            if (!closeText) {
                var messages = this.localizeBundle(common_1.default).messages;
                closeText = messages.close + " " + title;
            }
            open && !this._wasOpen && onOpen && onOpen();
            this._wasOpen = open;
            this._slideIn = false;
            return Widget_1.v('div', {
                'aria-labelledby': this._titleId,
                classes: this.theme(css.root),
                onmousedown: this._onSwipeStart,
                onmousemove: this._onSwipeMove,
                onmouseup: this._onSwipeEnd,
                ontouchend: this._onSwipeEnd,
                ontouchmove: this._onSwipeMove,
                ontouchstart: this._onSwipeStart
            }, [
                open ? this.renderUnderlay() : null,
                Widget_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { key: 'content', classes: tslib_1.__spread(this.theme(tslib_1.__spread([css.pane], contentClasses)), [fixedCss.paneFixed], fixedContentClasses), transitionend: this.invalidate, styles: contentStyles }), [
                    title ? Widget_1.v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        Widget_1.v('button', {
                            classes: this.theme(css.close),
                            type: 'button',
                            onclick: this._onCloseClick
                        }, [
                            closeText,
                            Widget_1.w(index_1.default, { type: 'closeIcon', theme: theme })
                        ])
                    ]) : null,
                    this.getContent()
                ])
            ]);
        };
        SlidePaneBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-slide-pane',
                properties: ['theme', 'aria', 'extraClasses', 'open', 'underlay'],
                attributes: ['align', 'closeText', 'title'],
                events: [
                    'onOpen',
                    'onRequestClose'
                ]
            })
        ], SlidePaneBase);
        return SlidePaneBase;
    }(exports.i18nBase));
    exports.SlidePaneBase = SlidePaneBase;
    var SlidePane = /** @class */ (function (_super) {
        tslib_1.__extends(SlidePane, _super);
        function SlidePane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SlidePane;
    }(SlidePaneBase));
    exports.default = SlidePane;
});
//# sourceMappingURL=index.js.map