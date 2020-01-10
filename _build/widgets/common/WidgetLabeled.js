(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./Widget", "../label/index", "@dojo/framework/widget-core/meta/Focus", "../themes/redaktor-default/_ui.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /*
    import { MaterialSchema, Size, Sizes } from './util';
    import { customElement as _cE } from '@dojo/framework/widget-core/decorators/customElement';
    import * as colorCss from '../themes/redaktor-default/_color.m.css';
    */
    var Widget_1 = require("./Widget");
    var index_1 = require("../label/index");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var uiCss = require("../themes/redaktor-default/_ui.m.css");
    var LabeledBase = /** @class */ (function (_super) {
        tslib_1.__extends(LabeledBase, _super);
        function LabeledBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LabeledBase.prototype._renderLabel = function (_size, _schema) {
            if (_size === void 0) { _size = true; }
            if (_schema === void 0) { _schema = true; }
            if (!this.properties.label) {
                return null;
            }
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, size = _a.size, disabled = _a.disabled, valid = _a.valid, label = _a.label, _c = _a.labelAfter, labelAfter = _c === void 0 ? false : _c, _d = _a.labelHidden, labelHidden = _d === void 0 ? false : _d, readOnly = _a.readOnly, required = _a.required, schema = _a.schema, theme = _a.theme;
            var focus = this.meta(Focus_1.default).get('root');
            var colorSchema = _schema ? { schema: schema } : { muted: true };
            return Widget_1.w(index_1.default, tslib_1.__assign({}, colorSchema, { theme: theme, 
                //schema,
                size: _size ? size : undefined, disabled: disabled, valid: valid === true || undefined, readOnly: readOnly,
                required: required, focused: focus.containsFocus, hidden: labelHidden, forId: widgetId }), [label]);
        };
        LabeledBase.prototype.renderLabel = function (_size, _schema) {
            if (_size === void 0) { _size = true; }
            if (_schema === void 0) { _schema = true; }
            return this._renderLabel(_size, _schema);
        };
        LabeledBase.prototype._renderHelperText = function (msg, valid, css) {
            if (css === void 0) { css = uiCss; }
            var message = msg ? msg : this.properties.helperText;
            return message ? Widget_1.v('p', {
                key: 'helperText',
                classes: [
                    css.helperText,
                    typeof valid !== 'boolean' ? null : (valid ? css.valid : css.invalid)
                ]
            }, [message]) : null;
        };
        LabeledBase.prototype.renderHelperText = function (msg, valid, css) {
            if (css === void 0) { css = uiCss; }
            return this._renderHelperText(msg, valid, css);
        };
        return LabeledBase;
    }(Widget_1.RedaktorWidgetBase));
    exports.LabeledBase = LabeledBase;
});
//# sourceMappingURL=WidgetLabeled.js.map