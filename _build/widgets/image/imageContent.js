(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../themes/redaktor-default/image.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var css = require("../themes/redaktor-default/image.m.css");
    var HPos;
    (function (HPos) {
        HPos["left"] = "left";
        HPos["center"] = "center";
        HPos["right"] = "right";
    })(HPos = exports.HPos || (exports.HPos = {}));
    var VPos;
    (function (VPos) {
        VPos["top"] = "top";
        VPos["center"] = "center";
        VPos["bottom"] = "bottom";
    })(VPos = exports.VPos || (exports.VPos = {}));
    var ImageContent = /** @class */ (function (_super) {
        tslib_1.__extends(ImageContent, _super);
        function ImageContent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._element = 'div';
            return _this;
        }
        ImageContent.prototype.getRootClasses = function () {
            return [];
        };
        ImageContent.prototype.getPositionClasses = function (ui) {
            if (ui === void 0) { ui = css; }
            var _a = this.properties, horizontal = _a.horizontal, vertical = _a.vertical;
            return [
                horizontal || vertical ? css.flex : null,
                (horizontal && horizontal in HPos) ? this.theme(ui[horizontal]) : null,
                (vertical && vertical in VPos) ?
                    (vertical === VPos.center ? css.middle : this.theme(ui[vertical])) : null
            ];
        };
        ImageContent.prototype.getGradient = function () {
            // TODO :  gradient = false
            var _a = this.properties, _b = _a.background, background = _b === void 0 ? false : _b, h = _a.horizontal, v = _a.vertical;
            if (!background) {
                return { style: null, gradientClass: null };
            }
            else if ((v === VPos.center && h === HPos.center)) {
                return { style: null, gradientClass: 'toCenter' };
            }
            var offset = this.meta(Widget_1.Dimensions).get('root').offset;
            var wrapperOffset = this.meta(Widget_1.Dimensions).get('wrapper').offset;
            var a = offset.height >= offset.width ? [h, v] : [v, h];
            var pos = (a[0] === HPos.center || a[0] === VPos.center) ? a[1] : a[0];
            var bg = [];
            if (typeof background === 'number') {
                bg = [0, 0, background, background];
            }
            else if (Array.isArray(background)) {
                if (background.length === 4) {
                    bg = background;
                }
                else if (background.length === 3) {
                    bg = [0].concat(background);
                }
            }
            return {
                style: "--content-pos: to " + pos + ";\n--content-h: " + Math.min((100 * wrapperOffset.height) / offset.height, 64) + "%;\n--content-w: " + Math.min((100 * wrapperOffset.width) / offset.width, 80) + "%;\n" + bg.reduce(function (s, v, i) { return s + " --img-a" + i + ": " + v + ";"; }, ''),
                gradientClass: "to" + pos
            };
        };
        ImageContent.prototype.render = function () {
            var _a = this.getGradient(), style = _a.style, gradientClass = _a.gradientClass;
            return Widget_1.v(this._element, {
                key: 'root',
                style: style,
                classes: tslib_1.__spread([
                    this.theme(css.mediaContent),
                    gradientClass ? this.theme(css.gradient) : null,
                    gradientClass ? this.theme(css[gradientClass]) : null
                ], this.getSchemaClasses(css), this.getPositionClasses(), this.getRootClasses())
            }, [Widget_1.v('div', { key: 'wrapper' }, this.children)]); //this.children)
        };
        ImageContent = tslib_1.__decorate([
            Widget_1.customElement({
                tag: 'redaktor-image',
                properties: []
            }),
            Widget_1.theme(css)
        ], ImageContent);
        return ImageContent;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = ImageContent;
});
//# sourceMappingURL=imageContent.js.map