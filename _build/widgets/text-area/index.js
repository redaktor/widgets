(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/meta/Dimensions", "../baseInput", "../themes/redaktor-default/text-area.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var baseInput_1 = require("../baseInput");
    var css = require("../themes/redaktor-default/text-area.m.css");
    var ExpandHeight = /** @class */ (function (_super) {
        tslib_1.__extends(ExpandHeight, _super);
        function ExpandHeight() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExpandHeight.prototype.set = function (key, isResize) {
            if (isResize === void 0) { isResize = false; }
            var node = this.getNode(key);
            if (node) {
                var _lh = window.getComputedStyle(node).lineHeight;
                var lh = _lh && parseInt(_lh.replace('px', ''), 10) || 0;
                !isResize && node.setAttribute('style', '');
                var _a = this.get(key), scroll_1 = _a.scroll, offset = _a.offset;
                var h = lh && Math.floor(Math.ceil(scroll_1.height / lh) * lh) || scroll_1.height;
                h && node.setAttribute('style', "height:" + h + "px;");
                //if (typeof h === 'number' && h > -1) (<any>node).style.height = `${h}px;`;
                return scroll_1.height;
            }
        };
        return ExpandHeight;
    }(Dimensions_1.default));
    exports.ExpandHeight = ExpandHeight;
    var TextareaBase = /** @class */ (function (_super) {
        tslib_1.__extends(TextareaBase, _super);
        function TextareaBase() {
            var _this = _super.call(this) || this;
            _this._inputElement = 'textarea';
            return _this;
        }
        TextareaBase.prototype._onInput = function (event) {
            event.stopPropagation();
            this._value = event.target.value;
            if (this.properties.expand) {
                this._height = this.meta(ExpandHeight).set('input');
            }
            this.readonlyProp('value', this._value, event);
            this.properties.onInput && this.properties.onInput(event);
        };
        /* TODO FIXME misfire */
        TextareaBase.prototype._onMouseUp = function (event) {
            event.stopPropagation();
            var expand = this.properties.expand;
            if (!expand) {
                var _h = this.meta(ExpandHeight).get('input').offset.height;
                if (_h !== this._height) {
                    this._height = !this._height ? _h : this.meta(ExpandHeight).set('input', true);
                }
            }
            this.properties.onMouseUp && this.properties.onMouseUp(event);
        };
        TextareaBase.prototype.getRootClasses = function () {
            var expand = this.properties.expand;
            return tslib_1.__spread(this._getRootClasses(css), [
                this.theme(expand ? css.expand : css.fixed)
            ]);
        };
        TextareaBase.prototype.getInputClasses = function () { return [css.input]; };
        TextareaBase.prototype.getInputProperties = function () {
            var _a = this.properties, size = _a.size, expand = _a.expand, columns = _a.columns, wrapText = _a.wrapText;
            var minRows = size === 'large' ? 4 : 3;
            var _b = this.properties.rows, rows = _b === void 0 ? minRows : _b;
            rows = Math.max(rows, minRows);
            return {
                style: "height: calc(var(--line) * " + rows + ");",
                wrap: wrapText,
                cols: columns ? "" + columns : null,
                rows: rows ? "" + rows : null
            };
        };
        TextareaBase.prototype.renderInputWrapper = function () {
            return Widget_1.v('div', {
                key: 'wrapper',
                classes: tslib_1.__spread(this.getSchemaClasses(css), this.getSizeClasses(), [
                    this.theme(css.wrapper)
                ])
            }, [
                this.renderInput(),
                this.properties.outlined ? null : Widget_1.v('b', { classes: this.theme(css.border) }),
                Widget_1.v('b', { classes: this.theme(css.bg) }),
                this.renderLabel()
            ]);
        };
        TextareaBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-text-area',
                attributes: [
                    'widgetId', 'label', 'placeholder', 'minLength', 'maxLength', 'value', 'name'
                ],
                properties: [
                    'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
                    'columns', 'rows', 'expand', 'size', 'theme', 'schema', 'extraClasses'
                ],
                events: [
                    'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
                    'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
                ]
            }),
            tslib_1.__metadata("design:paramtypes", [])
        ], TextareaBase);
        return TextareaBase;
    }(baseInput_1.default));
    exports.TextareaBase = TextareaBase;
    var Textarea = /** @class */ (function (_super) {
        tslib_1.__extends(Textarea, _super);
        function Textarea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Textarea;
    }(TextareaBase));
    exports.default = Textarea;
});
//# sourceMappingURL=index.js.map