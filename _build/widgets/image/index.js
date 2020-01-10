(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/util", "@dojo/framework/widget-core/meta/Base", "@dojo/framework/widget-core/meta/Intersection", "@dojo/framework/widget-core/meta/Resize", "../themes/redaktor-default/image.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var util_2 = require("../common/util");
    var Base_1 = require("@dojo/framework/widget-core/meta/Base");
    var Intersection_1 = require("@dojo/framework/widget-core/meta/Intersection");
    var Resize_1 = require("@dojo/framework/widget-core/meta/Resize");
    var css = require("../themes/redaktor-default/image.m.css");
    var CurrentSrc = /** @class */ (function (_super) {
        tslib_1.__extends(CurrentSrc, _super);
        function CurrentSrc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CurrentSrc.prototype.get = function (key) {
            var node = this.getNode(key);
            return node && node.currentSrc ? node.currentSrc :
                (node && node.src ? node.src : '');
        };
        return CurrentSrc;
    }(Base_1.default));
    // TODO maxSize (fixed size)
    // loading indicator
    // objectFit, objectPosition ?
    /* NOSCRIPT STATIC, e.g. gatsby
    // Show the original image during server-side rendering if JavaScript is disabled
    {this.addNoScript && (
      <noscript
        dangerouslySetInnerHTML={{
          __html: noscriptImg({
            alt,
            title,
            loading,
            ...image,
            imageVariants,
          }),
        }}
      />
    )}
    */
    var Image = /** @class */ (function (_super) {
        tslib_1.__extends(Image, _super);
        function Image() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._boundIsLarger = _this.isLarger.bind(_this);
            _this._faded = false;
            _this._error = false;
            _this._loaded = false;
            _this._loading = false;
            _this.__w = 0.1;
            _this._mb = 0;
            return _this;
        }
        Image_1 = Image;
        Image.prototype._onHover = function (event) {
            this.properties.onHover && this.properties.onHover(event);
        };
        Image.prototype._onClick = function (event) {
            event.stopPropagation();
            this.properties.onClick && this.properties.onClick(event);
        };
        Image.prototype._onLoad = function (event) {
            this._loaded = true;
            this.invalidate();
            this.properties.onLoad && this.properties.onLoad(event);
        };
        Image.prototype._onError = function (event) {
            this._error = true;
            this.invalidate();
            this.properties.onError && this.properties.onError(event);
        };
        Image.prototype._onFadeEnd = function (event) {
            if (event.animationName.indexOf('_fadein_') > 0) {
                this._faded = true;
                this.invalidate();
            }
            this.properties.onFadeEnd && this.properties.onFadeEnd(event);
        };
        Image.prototype.isLarger = function (contentRect) {
            var _a = this.properties.baselined, baselined = _a === void 0 ? true : _a;
            var _b = this.meta(Widget_1.RedaktorDimensions).getOffset('root').marginBottom, marginBottom = _b === void 0 ? 0 : _b;
            this.__w = Math.ceil((100 * contentRect.width) / window.innerWidth);
            var grew = typeof this._w === 'undefined' || this.__w > this._w;
            if (grew) {
                this._w = this.__w;
            }
            if (baselined && this._mb !== marginBottom) {
                this._mb = marginBottom;
                this.invalidate();
            }
            return grew;
        };
        Image.prototype.getConstraints = function () {
            var _a = this.properties, placeholder = _a.placeholder, background = _a.background, _b = _a.fade, fade = _b === void 0 ? false : _b, _c = _a.fadeDuration, fadeDuration = _c === void 0 ? 320 : _c, _d = _a.load, load = _d === void 0 ? 'progressive' : _d, _e = _a.aspectRatio, _r = _e === void 0 ? { width: 0, height: 0 } : _e;
            var _f = _r.width, width = _f === void 0 ? 0 : _f, _g = _r.height, height = _g === void 0 ? 0 : _g, _h = _r.position, _p = _h === void 0 ? 50 : _h, _j = _r.cover, isCover = _j === void 0 ? true : _j;
            var isPositive = function (n) { return (typeof n === 'number' && n > 0); };
            var ratio = (!isPositive(width) || !isPositive(height)) ? 0 :
                (Math.min(width, height) / Math.max(width, height) * 100);
            var offset = this.meta(Widget_1.Dimensions).get('media').offset;
            var rootOffset = this.meta(Widget_1.Dimensions).get('root').offset;
            var isIntersecting = this.meta(Intersection_1.Intersection).get('media').isIntersecting;
            var isMax = offset.width >= rootOffset.width;
            var isPortrait = !!ratio && width < height;
            var isToFade = this._loaded && !this._faded && fade;
            var isFade = load === 'start' ? true :
                (isToFade && load === 'progressive' && isIntersecting);
            var willFade = !this._loaded && !this._faded && placeholder && fade;
            var style = "--img-mb: " + this._mb + "px;" + (ratio > 0 ? "--ratio: " + ratio + "%;" : '');
            if (ratio > 0) {
                var a = [['width', 'x'], ['height', 'y']];
                var _k = tslib_1.__read((!!isCover ? a : a.reverse())[isMax ? 0 : 1], 2), key = _k[0], coord = _k[1];
                var maxPos = (offset[key] - rootOffset[key]) / rootOffset[key] * 100;
                var pos = (_p / 100) * maxPos * -1;
                style += "--img-" + coord + ": " + pos + "%;";
                if (!isCover) {
                    var hPerc = (rootOffset[key] - offset[key]) / rootOffset[key] * 100;
                    var remaining = 100 - hPerc;
                    style += "--img-" + key.charAt(0) + ": " + remaining + "%;";
                }
            }
            if (placeholder && !this._faded) {
                style += "--img-ph: " + offset.height + "px;";
            }
            if (typeof background === 'string' && (!this._loaded || ratio > 0)) {
                style += "--img-bg: " + background + ";";
            }
            if (isFade && typeof fadeDuration === 'number' && fadeDuration > 0) {
                style += "--img-fd: " + fadeDuration + "ms;";
            }
            return { ratio: ratio, style: style, isIntersecting: isIntersecting, isMax: isMax, isCover: isCover, isPortrait: isPortrait, isFade: isFade, willFade: willFade };
        };
        Image.prototype.renderPlaceholder = function (isIntersecting) {
            if (isIntersecting === void 0) { isIntersecting = true; }
            var _a = this.properties, size = _a.size, placeholder = _a.placeholder, placeholderStyles = _a.placeholderStyles, /*placeholderClasses,*/ _b = _a.fade, /*placeholderClasses,*/ fade = _b === void 0 ? false : _b, _c = _a.load, load = _c === void 0 ? 'progressive' : _c;
            var hasPlaceholder = !!placeholder && typeof placeholder === 'string';
            var loadPlaceholder = load !== 'intersect' || (load === 'intersect' && isIntersecting);
            return (fade && !this._faded && loadPlaceholder && hasPlaceholder) ? Widget_1.v('img', {
                key: 'placeholder',
                src: placeholder,
                styles: placeholderStyles,
                classes: this.theme([
                    css.media, css.placeholder,
                    size in util_1.Size ? css[size] : css.noSize
                ]),
            }) : null;
        };
        Image.prototype.renderImage = function (isIntersecting, isLarger) {
            if (isIntersecting === void 0) { isIntersecting = true; }
            if (isLarger === void 0) { isLarger = false; }
            var imgProperties = this.properties;
            var _a = this.properties, _src = _a.src, _set = _a.srcset, alt = _a.alt, longdesc = _a.longdesc, crossorigin = _a.crossorigin, usemap = _a.usemap, size = _a.size, placeholder = _a.placeholder, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.styles, styles = _c === void 0 ? {} : _c, _d = _a.sizes, sizes = _d === void 0 ? this._w + "vw" : _d, _e = _a.load, load = _e === void 0 ? 'progressive' : _e, onLoadStart = _a.onLoadStart, onError = _a.onError;
            var hasSrcset = Image_1.prototype.hasOwnProperty('srcset');
            this._loading = load === 'start' || isIntersecting || this._loaded;
            // TODO load 'progressive' or load 'intersect' + fade placeholder bg
            if (this._loading && onLoadStart) {
                var currentSrc = this.meta(CurrentSrc).get('media');
                onLoadStart(currentSrc, isLarger);
            }
            if (this._error && placeholder && !onError) {
                return null;
            }
            var src = this._loading ? _src :
                (!hasSrcset && typeof placeholder === 'string') ? placeholder : '';
            var srcset = this._loading ? _set :
                (hasSrcset && typeof placeholder === 'string') ? placeholder : void 0;
            return Widget_1.v('img', tslib_1.__assign({ key: 'media' }, imgProperties, { alt: alt, longdesc: longdesc, crossorigin: crossorigin, usemap: usemap, styles: styles, src: src, srcset: srcset, sizes: sizes }, util_2.formatAriaProperties(aria), { classes: this.theme([
                    css.media,
                    css.img,
                    size in util_1.Size ? css[size] : css.noSize
                ]), placeholder: void 0, onhover: this._onHover, onclick: this._onClick, onload: this._loading ? this._onLoad : void 0, onerror: this._loading ? this._onError : void 0, onanimationend: this._onFadeEnd }));
        };
        Image.prototype.renderChildren = function () {
            return !this.children ? null : Widget_1.v('figurecaption', { key: 'wrapper' }, this.children);
        };
        Image.prototype.render = function () {
            var _a = this.getConstraints(), ratio = _a.ratio, style = _a.style, isMax = _a.isMax, isPortrait = _a.isPortrait, isCover = _a.isCover, isIntersecting = _a.isIntersecting, isFade = _a.isFade, willFade = _a.willFade;
            var isRatio = ratio > 0;
            var _b = this.properties.baselined, baselined = _b === void 0 ? true : _b;
            var _c = this.meta(Resize_1.Resize).get('root', {
                isLarger: this._boundIsLarger
            }).isLarger, isLarger = _c === void 0 ? false : _c;
            return Widget_1.v(!this.children ? 'span' : 'figure', {
                key: 'root',
                classes: this.theme([
                    css.root,
                    isRatio ? css.ratio : null,
                    isRatio ? (isCover === false ? css.contain : css.cover) : null,
                    isPortrait ? css.portrait : css.landscape,
                    isLarger ? css.grew : null,
                    isMax ? css.max : null,
                    isFade ? css.fade : (willFade ? css.toFade : null),
                    baselined === true ? css.baselined : null
                ]),
                style: style
            }, [
                this.renderImage(isIntersecting, isLarger),
                this.renderPlaceholder(isIntersecting),
                this.renderChildren()
            ]);
        };
        var Image_1;
        Image = Image_1 = tslib_1.__decorate([
            Widget_1.customElement({
                tag: 'redaktor-image',
                properties: []
            }),
            Widget_1.theme(css)
        ], Image);
        return Image;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = Image;
});
//# sourceMappingURL=index.js.map