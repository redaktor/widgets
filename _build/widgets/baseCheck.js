(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./common/Widget", "./common/util", "../framework/uuid", "@dojo/framework/widget-core/meta/Focus", "./icon/index", "./label/index", "./themes/redaktor-default/checkbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("./common/Widget");
    var util_1 = require("./common/util");
    var uuid_1 = require("../framework/uuid");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var index_1 = require("./icon/index");
    var index_2 = require("./label/index");
    var css = require("./themes/redaktor-default/checkbox.m.css");
    var CheckBase = /** @class */ (function (_super) {
        tslib_1.__extends(CheckBase, _super);
        function CheckBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._uuid = uuid_1.default();
            _this._type = 'checkbox';
            return _this;
        }
        CheckBase.prototype._onFocus = function (event) {
            this.properties.onFocus && this.properties.onFocus(event);
        };
        CheckBase.prototype._onBlur = function (event) {
            this.properties.onBlur && this.properties.onBlur(event);
        };
        CheckBase.prototype._onHover = function (event) {
            this.properties.onHover && this.properties.onHover(event);
        };
        CheckBase.prototype._onMouseDown = function (event) {
            event.stopPropagation();
            this.properties.onMouseDown && this.properties.onMouseDown(event);
        };
        CheckBase.prototype._toggleEvt = function (event) {
            this.readonlyProp('checked', event.target.checked, event);
            this.readonlyProp('value', event.target.value, event);
            return event;
        };
        CheckBase.prototype._onClick = function (event) {
            event.stopPropagation();
            this.properties.onClick && this.properties.onClick(this._toggleEvt(event));
        };
        CheckBase.prototype._onChange = function (event) {
            event.stopPropagation();
            this.properties.onChange && this.properties.onChange(this._toggleEvt(event));
        };
        CheckBase.prototype._onMouseUp = function (event) {
            event.stopPropagation();
            this.properties.onMouseUp && this.properties.onMouseUp(event);
        };
        CheckBase.prototype._onTouchStart = function (event) {
            event.stopPropagation();
            this.properties.onTouchStart && this.properties.onTouchStart(event);
        };
        CheckBase.prototype._onTouchEnd = function (event) {
            event.stopPropagation();
            this.properties.onTouchEnd && this.properties.onTouchEnd(event);
        };
        CheckBase.prototype._onTouchCancel = function (event) {
            event.stopPropagation();
            this.properties.onTouchCancel && this.properties.onTouchCancel(event);
        };
        CheckBase.prototype.getEvtArgs = function (event) {
            return [event.target.checked];
        };
        CheckBase.prototype.getModifierClasses = function () {
            return [css.normal];
        };
        CheckBase.prototype.getInputClasses = function () {
            //console.log(this.getSchemaClasses(css));
            return tslib_1.__spread([
                this.theme(css.input)
            ], this.getSchemaClasses(css));
        };
        CheckBase.prototype.getInnerClasses = function () {
            return [];
        };
        CheckBase.prototype._getRootClasses = function (ui) {
            if (ui === void 0) { ui = css; }
            var _a = this.properties, _b = _a.checked, checked = _b === void 0 ? false : _b, required = _a.required;
            var focus = this.meta(Focus_1.default).get('root');
            return tslib_1.__spread([
                ui.root,
                ui.wrapper,
                this.getDisabledClass(ui),
                this.getValidClass(ui)
            ], this.getStyleClasses(ui), [
                checked ? ui.checked : null,
                focus.containsFocus ? ui.focused : null,
                required ? ui.required : null
            ], this.getModifierClasses());
        };
        CheckBase.prototype.getRootClasses = function () { return this._getRootClasses(); };
        CheckBase.prototype.renderLabel = function (key) {
            if (key === void 0) { key = 'label'; }
            //console.log('RL', this.properties.label)
            if (!this.properties.label) {
                return Widget_1.v('p', ['.']);
            }
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, size = _a.size, disabled = _a.disabled, valid = _a.valid, label = _a.label, offLabel = _a.offLabel, _c = _a.labelHidden, labelHidden = _c === void 0 ? false : _c, readOnly = _a.readOnly, required = _a.required, schema = _a.schema, theme = _a.theme;
            var focus = this.meta(Focus_1.default).get('root');
            return Widget_1.w(index_2.default, {
                muted: true,
                key: key,
                size: size,
                theme: theme,
                schema: schema,
                disabled: disabled,
                valid: valid === true || undefined,
                readOnly: readOnly,
                required: required,
                focused: focus.containsFocus,
                hidden: labelHidden,
                forId: widgetId
            }, [key === 'offLabel' ? offLabel : label]);
        };
        CheckBase.prototype.renderIcon = function () {
            return [Widget_1.w(index_1.default, { type: 'checkIcon', extraClasses: { root: css.checkIcon } })];
        };
        CheckBase.prototype.renderContent = function () { return this.renderIcon(); };
        CheckBase.prototype.renderInput = function () {
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, _c = _a.aria, aria = _c === void 0 ? {} : _c, _d = _a.checked, checked = _d === void 0 ? false : _d, _e = _a.size, size = _e === void 0 ? 'default' : _e, disabled = _a.disabled, valid = _a.valid, label = _a.label, _f = _a.labelAfter, labelAfter = _f === void 0 ? true : _f, theme = _a.theme, name = _a.name, readOnly = _a.readOnly, required = _a.required, schema = _a.schema, _g = _a.value, value = _g === void 0 ? "" + this._value : _g;
            return Widget_1.v('input', tslib_1.__assign({ id: widgetId }, util_1.formatAriaProperties(aria), { classes: this.getInputClasses(), checked: checked,
                disabled: disabled, 'aria-invalid': valid === false ? 'true' : null, name: name,
                readOnly: readOnly, 'aria-readonly': readOnly === true ? 'true' : null, required: required,
                value: value, type: this._type, onblur: this._onBlur, onhover: this._onHover, onchange: this._onChange, onclick: this._onClick, onfocus: this._onFocus, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }));
        };
        CheckBase.prototype.renderInputWrapper = function () {
            return [
                this.renderInput(),
                Widget_1.v('div', {
                    classes: tslib_1.__spread(this.getSchemaClasses(css), this.getSizeClasses(), this.getInnerClasses(), [
                        this.theme(css.inner)
                    ])
                }, this.renderContent())
            ];
        };
        CheckBase.prototype.beforeRender = function () { };
        CheckBase.prototype.render = function () {
            this.beforeRender();
            var _a = this.properties, label = _a.label, _b = _a.offLabel, offLabel = _b === void 0 ? null : _b, _c = _a.labelAfter, labelAfter = _c === void 0 ? true : _c;
            var children = tslib_1.__spread([
                offLabel ? this.renderLabel('offLabel') : null
            ], this.renderInputWrapper(), [
                this.renderLabel()
            ]);
            return Widget_1.v('div', {
                key: 'root',
                classes: this.getRootClasses()
            }, (!!offLabel || !!labelAfter) ? children : children.reverse());
        };
        return CheckBase;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = CheckBase;
});
//# sourceMappingURL=baseCheck.js.map