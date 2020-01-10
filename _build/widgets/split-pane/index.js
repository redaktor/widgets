(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "./styles/split-pane.m.css", "../themes/redaktor-default/split-pane.m.css", "../global-event/index", "@dojo/framework/widget-core/diff", "@dojo/framework/widget-core/decorators/diffProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var fixedCss = require("./styles/split-pane.m.css");
    var css = require("../themes/redaktor-default/split-pane.m.css");
    var index_1 = require("../global-event/index");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var DEFAULT_SIZE = 100;
    var SplitPaneBase = /** @class */ (function (_super) {
        tslib_1.__extends(SplitPaneBase, _super);
        function SplitPaneBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._position = 0;
            _this._step = 10;
            _this._collapsed = false;
            _this._onDragMove = function (event) {
                event.stopPropagation();
                if (!_this._dragging) {
                    return;
                }
                var _a = _this.properties, onResize = _a.onResize, _b = _a.size, size = _b === void 0 ? DEFAULT_SIZE : _b;
                var currentPosition = _this._getPosition(event);
                var rootDimensions = _this.meta(Widget_1.Dimensions).get('root');
                var dividerDimensions = _this.meta(Widget_1.Dimensions).get('divider');
                var curSize = (_this._lastSize === undefined ? size : _this._lastSize);
                var newSize = curSize + currentPosition - _this._position;
                _this._lastSize = newSize;
                newSize = Math.min(_this._getMaxSize(), Math.max(32, newSize));
                _this._position = currentPosition;
                onResize && onResize(newSize);
            };
            _this._onDragEnd = function (event) {
                event.stopPropagation();
                if (!_this._dragging) {
                    return;
                } /* arrow key + blur */
                _this._dragging = false;
                _this._lastSize = undefined;
                _this.invalidate();
            };
            _this._onResize = function () {
                var _a = _this.properties, _b = _a.collapseWidth, collapseWidth = _b === void 0 ? 600 : _b, _c = _a.direction, direction = _c === void 0 ? util_1.Direction.column : _c;
                var isCollapsed = _this._collapsed;
                _this._collapseIfNecessary(collapseWidth, direction);
                if (isCollapsed !== _this._collapsed) {
                    _this.invalidate();
                }
            };
            return _this;
        }
        SplitPaneBase.prototype._getPosition = function (event) {
            event.stopPropagation();
            var _a = this.properties.direction, direction = _a === void 0 ? util_1.Direction.column : _a;
            if (direction === util_1.Direction.column) {
                return event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
            }
            else {
                return event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
            }
        };
        SplitPaneBase.prototype._getMaxSize = function (minSize) {
            if (minSize === void 0) { minSize = 32; }
            var _a = this.properties.direction, direction = _a === void 0 ? util_1.Direction.column : _a;
            var rootDimensions = this.meta(Widget_1.Dimensions).get('root');
            var dividerDimensions = this.meta(Widget_1.Dimensions).get('divider');
            return direction === util_1.Direction.column ?
                rootDimensions.offset.width - dividerDimensions.offset.width - minSize :
                rootDimensions.offset.height - dividerDimensions.offset.height - minSize;
        };
        SplitPaneBase.prototype._onDragStart = function (event) {
            event.stopPropagation();
            this._dragging = true;
            this._position = this._getPosition(event);
        };
        SplitPaneBase.prototype.collapseWidthReaction = function (oldProperty, newProperty) {
            var _a = this.properties.direction, direction = _a === void 0 ? util_1.Direction.column : _a;
            var _b = newProperty.collapseWidth, collapseWidth = _b === void 0 ? 600 : _b;
            this._collapseIfNecessary(collapseWidth, direction);
        };
        SplitPaneBase.prototype.directionReaction = function (oldProperty, newProperty) {
            var _a = this.properties.collapseWidth, collapseWidth = _a === void 0 ? 600 : _a;
            var _b = newProperty.direction, direction = _b === void 0 ? util_1.Direction.column : _b;
            this._collapseIfNecessary(collapseWidth, direction);
        };
        SplitPaneBase.prototype.getPaneContent = function (content) {
            return content ? [content] : [];
        };
        SplitPaneBase.prototype.getPaneStyles = function () {
            var _a = this.properties, _b = _a.direction, direction = _b === void 0 ? util_1.Direction.column : _b, _c = _a.size, size = _c === void 0 ? DEFAULT_SIZE : _c;
            var styles = {};
            var computedSize = (!this._dragging && this._lastSize) ?
                this._lastSize + "px" : (this._collapsed ? 'auto' : size + "px");
            styles[direction === util_1.Direction.column ? 'width' : 'height'] = computedSize;
            return styles;
        };
        SplitPaneBase.prototype.onAttach = function () {
            var g = getComputedStyle(document.documentElement).getPropertyValue("--grid-base");
            if (/^(\d*)px/.test(g)) {
                this._step = Math.max(1, parseInt(g.replace('px', ''), 10));
            }
            this._onResize();
        };
        SplitPaneBase.prototype._onArrowPress = function (event) {
            event.stopPropagation();
            var key = util_1.keyName(event, 'ArrowLeft', 'ArrowRight');
            if (!key) {
                return;
            }
            var _a = this.properties, onResize = _a.onResize, _b = _a.direction, direction = _b === void 0 ? util_1.Direction.column : _b, _c = _a.size, size = _c === void 0 ? DEFAULT_SIZE : _c;
            var Size = key === 'ArrowLeft' ? size - this._step : size + this._step;
            if (Size && this._lastSize !== Size) {
                this._lastSize = Math.min(this._getMaxSize(), Math.max(32, Size));
                onResize && onResize(Size);
                this.invalidate();
            }
        };
        SplitPaneBase.prototype._onReset = function (event) {
            event.stopPropagation();
            //this._collapsed = true;
            //this.invalidate(); // TODO FIXME dblclick
        };
        SplitPaneBase.prototype._collapseIfNecessary = function (collapseWidth, direction) {
            if (direction === util_1.Direction.row || !this.meta(Widget_1.Dimensions).has('root')) {
                return;
            }
            var onCollapse = this.properties.onCollapse;
            var width = this.meta(Widget_1.Dimensions).get('root').size.width;
            if (width > collapseWidth && this._collapsed === true) {
                this._collapsed = false;
                onCollapse && onCollapse(this._collapsed);
            }
            else if (width <= collapseWidth && this._collapsed === false) {
                this._collapsed = true;
                onCollapse && onCollapse(this._collapsed);
            }
        };
        SplitPaneBase.prototype.render = function () {
            var _a = this.properties, _b = _a.direction, direction = _b === void 0 ? util_1.Direction.column : _b, material = _a.material;
            return Widget_1.v('div', {
                classes: tslib_1.__spread(this.theme([
                    css.root,
                    (direction === util_1.Direction.row) ? css.row : css.column,
                    this._collapsed ? css.collapsed : null,
                    this._dragging ? css.dragging : null
                ]), [
                    util_1.materialClass(material),
                    fixedCss.rootFixed,
                    direction === util_1.Direction.row ? fixedCss.rowFixed : fixedCss.columnFixed,
                    this._collapsed ? fixedCss.collapsedFixed : null
                ]),
                key: 'root'
            }, [
                Widget_1.w(index_1.GlobalEvent, {
                    key: 'global',
                    window: {
                        mouseup: this._onDragEnd,
                        mousemove: this._onDragMove,
                        touchmove: this._onDragMove,
                        resize: this._onResize
                    }
                }),
                Widget_1.v('div', {
                    classes: [
                        this.theme(css.leading),
                        fixedCss.leadingFixed
                    ],
                    key: 'leading',
                    styles: this.getPaneStyles()
                }, this.getPaneContent(this.children[0])),
                Widget_1.v('div', {
                    classes: [
                        this.theme(css.divider),
                        fixedCss.dividerFixed
                    ],
                    tabIndex: 0,
                    key: 'divider',
                    onmousedown: this._onDragStart,
                    ontouchend: this._onDragEnd,
                    ontouchstart: this._onDragStart,
                    onkeydown: this._onArrowPress,
                    ondblclick: this._onReset
                }, [
                    Widget_1.v('div', { classes: [css.arrows] })
                ]),
                Widget_1.v('div', {
                    classes: [
                        this.theme(css.trailing),
                        fixedCss.trailingFixed
                    ],
                    key: 'trailing'
                }, this.getPaneContent(this.children[1]))
            ]);
        };
        SplitPaneBase.Direction = util_1.Direction;
        tslib_1.__decorate([
            diffProperty_1.diffProperty('collapseWidth', diff_1.auto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], SplitPaneBase.prototype, "collapseWidthReaction", null);
        tslib_1.__decorate([
            diffProperty_1.diffProperty('direction', diff_1.auto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], SplitPaneBase.prototype, "directionReaction", null);
        SplitPaneBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-split-pane',
                properties: ['theme', 'material', 'extraClasses', 'size'],
                attributes: ['direction'],
                events: ['onResize']
            })
        ], SplitPaneBase);
        return SplitPaneBase;
    }(Widget_1.ThemedBase));
    exports.SplitPaneBase = SplitPaneBase;
    var SplitPane = /** @class */ (function (_super) {
        tslib_1.__extends(SplitPane, _super);
        function SplitPane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SplitPane;
    }(SplitPaneBase));
    exports.default = SplitPane;
});
//# sourceMappingURL=index.js.map