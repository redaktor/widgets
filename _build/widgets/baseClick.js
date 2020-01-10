(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./common/Widget", "./common/events/keyboard", "./common/util", "./themes/redaktor-default/button.m.css", "./icon/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("./common/Widget");
    var keyboard_1 = require("./common/events/keyboard");
    var util_1 = require("./common/util");
    var css = require("./themes/redaktor-default/button.m.css");
    var index_1 = require("./icon/index");
    var ButtonType;
    (function (ButtonType) {
        ButtonType["submit"] = "submit";
        ButtonType["reset"] = "reset";
        ButtonType["button"] = "button";
        ButtonType["menu"] = "menu";
    })(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
    var ClickBase = /** @class */ (function (_super) {
        tslib_1.__extends(ClickBase, _super);
        function ClickBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClickBase.prototype._onFocus = function (event) {
            this.properties.onFocus && this.properties.onFocus(event);
        };
        ClickBase.prototype._onBlur = function (event) {
            this.properties.onBlur && this.properties.onBlur(event);
        };
        ClickBase.prototype._onHover = function (event) {
            this.properties.onHover && this.properties.onHover(event);
        };
        ClickBase.prototype._onMouseDown = function (event) {
            event.stopPropagation();
            this.setClickDimensions(event);
            this.properties.onMouseDown && this.properties.onMouseDown(event);
        };
        ClickBase.prototype._onClick = function (event) {
            event.stopPropagation();
            this.properties.onClick && this.properties.onClick(event);
        };
        ClickBase.prototype._onMouseUp = function (event) {
            event.stopPropagation();
            this.properties.onMouseUp && this.properties.onMouseUp(event);
        };
        ClickBase.prototype._onTouchStart = function (event) {
            event.stopPropagation();
            this.setClickDimensions(event);
            this.properties.onTouchStart && this.properties.onTouchStart(event);
        };
        ClickBase.prototype._onTouchEnd = function (event) {
            event.stopPropagation();
            this.properties.onTouchEnd && this.properties.onTouchEnd(event);
        };
        ClickBase.prototype._onTouchCancel = function (event) {
            event.stopPropagation();
            this.properties.onTouchCancel && this.properties.onTouchCancel(event);
        };
        ClickBase.prototype._onKeyDown = function (event) {
            event.stopPropagation();
            var evt = keyboard_1.default(event);
            this.properties.onKeyDown && this.properties.onKeyDown(evt, function () { event.preventDefault(); });
        };
        ClickBase.prototype._onKeyPress = function (event) {
            event.stopPropagation();
            var evt = keyboard_1.default(event);
            this.properties.onKeyPress && this.properties.onKeyPress(evt, function () { event.preventDefault(); });
        };
        ClickBase.prototype._onKeyUp = function (event) {
            event.stopPropagation();
            var evt = keyboard_1.default(event);
            this.properties.onKeyUp && this.properties.onKeyUp(evt, function () { event.preventDefault(); });
        };
        ClickBase.prototype.setClickDimensions = function (event) {
            var e = event;
            var docStyle = document.documentElement.style;
            var elW = this.meta(Widget_1.Dimensions).get('root').offset.width;
            var offset = { x: -1, y: -1 };
            if (!!e.targetTouches) {
                var rect = e.target.getBoundingClientRect();
                offset.x = e.targetTouches[0].pageX - rect.left;
                offset.y = e.targetTouches[0].pageY - rect.top;
            }
            else {
                offset.x = e.offsetX;
                offset.y = e.offsetY;
            }
            if (typeof offset.x === 'number' && offset.x > -1 && !!elW) {
                var btnW = elW / 2 + Math.abs(elW / 2 - offset.x);
                docStyle.setProperty('--redaktor-btn-w', btnW + "px");
                docStyle.setProperty('--redaktor-btn-x', offset.x + "px");
                docStyle.setProperty('--redaktor-btn-y', offset.y + "px");
            }
        };
        ClickBase.prototype.getContent = function () {
            var _a = this.properties, disabled = _a.disabled, _b = _a.outlined, outlined = _b === void 0 ? false : _b, _c = _a.popup, popup = _c === void 0 ? false : _c, theme = _a.theme;
            if (this.children.length === 1 && typeof this.children[0] === 'string') {
                this.children[0] = Widget_1.v('span', [this.children[0]]);
            }
            var content = [Widget_1.v('span', {
                    key: 'inner',
                    classes: this.theme([css.inner /*,...this.getSizeClasses(css)*/])
                }, this.children)];
            if (popup) {
                content.push(Widget_1.v('span', {
                    classes: tslib_1.__spread(this.getSizeClasses(), [this.theme(css.suffix)])
                }, [
                    Widget_1.w(index_1.default, { type: 'downIcon', theme: theme })
                ]));
            }
            if (!disabled) {
                content.push(Widget_1.v('b', {
                    classes: [
                        this.theme(css.animation)
                    ].concat(outlined ? this.getSchemaClasses(css) : null),
                    onanimationend: "this.blur()",
                    tabIndex: 0
                }));
            }
            return content;
        };
        ClickBase.prototype.getRootClasses = function () {
            var _a = this.properties, disabled = _a.disabled, pressed = _a.pressed, schema = _a.schema, _b = _a.depth, depth = _b === void 0 ? 'defaultDepth' : _b, _c = _a.wide, wide = _c === void 0 ? false : _c, _d = _a.popup, popup = _d === void 0 ? false : _d, _e = _a.outlined, outlined = _e === void 0 ? false : _e, _f = _a.shaped, shaped = _f === void 0 ? false : _f;
            //console.log(this.properties.size, this.getSizeClasses());
            return tslib_1.__spread(this.getSizeClasses(), this.getStyleClasses(css), this.theme([
                css.root,
                css.wrapper,
                popup ? css.hasSuffix : null,
                this.getDisabledClass(css),
                (depth in util_1.Depth) ? css[depth] : css.defaultDepth,
                wide ? css.wide : null,
                pressed ? css.pressed : null
            ])).concat(!outlined ? this.getSchemaClasses(css) : null);
        };
        ClickBase.prototype.beforeRender = function () { };
        ClickBase.prototype.render = function () {
            this.beforeRender();
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, id = _a.id, name = _a.name, disabled = _a.disabled, pressed = _a.pressed, _c = _a.type, type = _c === void 0 ? 'button' : _c, value = _a.value;
            var _d = this.properties.popup, popup = _d === void 0 ? false : _d;
            if (popup === true) {
                popup = { expanded: false, id: '' };
            }
            return Widget_1.v('button', tslib_1.__assign({ key: 'root', classes: this.getRootClasses(), id: id, name: name, disabled: disabled, type: type, value: value, onblur: this._onBlur, onclick: this._onClick, onfocus: this._onFocus, onkeydown: this._onKeyDown, onkeypress: this._onKeyPress, onkeyup: this._onKeyUp, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel, tabIndex: 0, 'aria-haspopup': popup ? (popup.type ? popup.type : 'true') : null, 'aria-controls': popup ? popup.id : null, 'aria-expanded': popup ? popup.expanded + '' : null, 'aria-pressed': typeof pressed === 'boolean' ? pressed.toString() : null, 'aria-disabled': typeof disabled === 'boolean' ? disabled.toString() : null }, util_1.formatAriaProperties(aria)), this.getContent());
        };
        return ClickBase;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = ClickBase;
});
//# sourceMappingURL=baseClick.js.map