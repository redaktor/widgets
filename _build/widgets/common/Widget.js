(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Themed", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/meta/Dimensions", "./util", "@dojo/framework/widget-core/decorators/customElement", "../themes/redaktor-default/_color.m.css", "../themes/redaktor-default/_ui.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var util_1 = require("./util");
    var customElement_1 = require("@dojo/framework/widget-core/decorators/customElement");
    var colorCss = require("../themes/redaktor-default/_color.m.css");
    var uiCss = require("../themes/redaktor-default/_ui.m.css");
    exports.v = d_1.v;
    exports.w = d_1.w;
    exports.WidgetBase = WidgetBase_1.WidgetBase;
    exports.Dimensions = Dimensions_1.Dimensions;
    exports.theme = Themed_1.theme;
    exports.ThemedMixin = Themed_1.ThemedMixin;
    exports.ThemedBase = Themed_1.ThemedMixin(WidgetBase_1.WidgetBase);
    exports.customElement = customElement_1.customElement;
    var RedaktorWidgetBase = /** @class */ (function (_super) {
        tslib_1.__extends(RedaktorWidgetBase, _super);
        function RedaktorWidgetBase() {
            var _this = _super.call(this) || this;
            /*
            TODO
            FocusEvent
            MouseEvent | TouchEvent
            KeyboardEvent
            OLD:
            protected getEvtValue(event: Event): string | number {
                  return (event.target as HTMLInputElement).value
              }
            protected getEvtArgs(event: Event): any[] {
                  return []
              }
            protected _evt(evtType: string, event: Event, key?: number): string | number {
              const V = this.getEvtValue(event);
              const A = this.getEvtArgs(event);
              console.log(event, key)
              if (typeof (<any>this.properties)[evtType] === 'function') {
                if (key) {
                  (<any>this.properties)[evtType](key, () => { event.preventDefault(); })
                } else {
                  (<any>this.properties)[evtType](V, ...this.getEvtArgs(event))
                }
              }
              return V
            }
            */
            _this._defaultTypo = 'default';
            return _this;
        }
        RedaktorWidgetBase.prototype.readonlyProp = function (key, value, o) {
            if (o === void 0) { o = this; }
            var descriptor = Object.getOwnPropertyDescriptor(o, key);
            if (!descriptor || !!descriptor.configurable) {
                return Object.defineProperty(o, key, { value: value, writable: false });
            }
        };
        RedaktorWidgetBase.prototype.getSizeClasses = function (ui, typoSize, uiSize) {
            if (ui === void 0) { ui = uiCss; }
            /* NOTE order matters: UI class, then Typo class
            TODO STRONG TYPE > TS 2.7
            */
            var _a = this.properties, _b = _a.size, size = _b === void 0 ? 'default' : _b, _c = _a.responsive, responsive = _c === void 0 ? false : _c;
            if (!uiSize || !(uiSize in util_1.Size)) {
                uiSize = size;
            }
            if (!typoSize || !(typoSize in util_1.Size)) {
                typoSize = size;
            }
            return [
                ui[uiSize + "UI"], ui[typoSize + "Typo"],
                responsive ? ui.responsive : null
            ];
        };
        RedaktorWidgetBase.prototype.getSchemaClasses = function (css, isParent) {
            if (isParent === void 0) { isParent = false; }
            var schema = this.properties.schema;
            if (isParent) {
                return (schema && schema in util_1.MaterialSchema) ? [css.hasSchema] : [];
            }
            if (schema && schema in util_1.MaterialSchema) {
                return [colorCss[schema], css[schema]];
            }
            return (schema && schema + "_material" in colorCss) ?
                [colorCss[schema + "_material"], (schema in css) ? css[schema] : null] :
                [css.parentSchema];
        };
        RedaktorWidgetBase.prototype.getDisabledClass = function (css) {
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly;
            if (disabled === true) {
                return css.disabled;
            }
            if (css.readonly && readOnly === true) {
                return css.readonly;
            }
            return css.enabled;
        };
        RedaktorWidgetBase.prototype.getValidClass = function (css) {
            var invalid = this.properties.invalid;
            return invalid === true ? css.invalid : (invalid === false ? css.valid : null);
        };
        RedaktorWidgetBase.prototype.getStyleClasses = function (css) {
            var _a = this.properties, filled = _a.filled, outlined = _a.outlined, shaped = _a.shaped;
            var a = [];
            (filled === true) && a.push(css.filled);
            (outlined === true) && a.push(css.outlined);
            (shaped === true) && a.push(css.shaped);
            return a;
        };
        return RedaktorWidgetBase;
    }(exports.ThemedBase));
    exports.RedaktorWidgetBase = RedaktorWidgetBase;
    // TODO TS
    var RedaktorDimensions = /** @class */ (function (_super) {
        tslib_1.__extends(RedaktorDimensions, _super);
        function RedaktorDimensions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RedaktorDimensions.prototype.getOffset = function (key) {
            var node = this.getNode(key);
            if (node) {
                var _lh = window.getComputedStyle(node).lineHeight;
                var lh = _lh && parseInt(_lh.replace('px', ''), 10) || 0;
                var /*scroll,*/ offset = this.get(key).offset;
                //console.log( scroll, offset )
                var h = lh && Math.ceil(Math.ceil(offset.height / lh) * lh) || offset.height;
                var mOffset = tslib_1.__assign({}, offset, { marginBottom: 0 });
                if (typeof h === 'number') {
                    mOffset.marginBottom = h - offset.height;
                }
                return mOffset;
            }
            return {};
        };
        return RedaktorDimensions;
    }(exports.Dimensions));
    exports.RedaktorDimensions = RedaktorDimensions;
    var CSSvar = /** @class */ (function (_super) {
        tslib_1.__extends(CSSvar, _super);
        function CSSvar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CSSvar.prototype.getVar = function (key, varKey) {
            var node = this.getNode(key);
            return node ? getComputedStyle(node).getPropertyValue("--" + varKey) : null;
        };
        CSSvar.prototype.setVar = function (key, varKey, value) {
            var node = this.getNode(key);
            console.log(node);
            if (node) {
                node.style.setProperty("--" + varKey, value);
            }
        };
        return CSSvar;
    }(exports.Dimensions));
    exports.CSSvar = CSSvar;
});
//# sourceMappingURL=Widget.js.map