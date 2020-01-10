(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/text-area", "../../widgets/label", "../../styles/tabs.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var text_area_1 = require("../../widgets/text-area");
    var label_1 = require("../../widgets/label");
    var css = require("../../styles/tabs.m.css");
    var TextAreaTab = /** @class */ (function (_super) {
        tslib_1.__extends(TextAreaTab, _super);
        function TextAreaTab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextAreaTab.prototype.render = function () {
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            return d_1.v('div', { classes: css.root }, [
                d_1.v('h3', ['Text Areas']),
                d_1.w(label_1.default, { size: size }, ['default']),
                d_1.v('div', [
                    d_1.w(text_area_1.default, {
                        size: size,
                        //responsive: true,
                        //columns: 40,
                        rows: 6,
                        placeholder: 'Hello World',
                        label: 'Text area, 6 rows'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        placeholder: 'Hello World',
                        label: 'Expanding text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        rows: 2,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        schema: 'secondary',
                        placeholder: 'Hello World',
                        label: 'Secondary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Expanding primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        rows: 2,
                        disabled: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Disabled primary text area'
                    })
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['filled']),
                d_1.v('div', [
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        //responsive: true,
                        //columns: 40,
                        rows: 6,
                        placeholder: 'Hello World',
                        label: 'Text area, 6 rows'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        placeholder: 'Hello World',
                        label: 'Expanding text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        columns: 40,
                        rows: 2,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        columns: 40,
                        schema: 'secondary',
                        placeholder: 'Hello World',
                        label: 'Secondary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Expanding primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        filled: true,
                        columns: 40,
                        rows: 2,
                        disabled: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Disabled primary text area'
                    })
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['outlined']),
                d_1.v('div', [
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        //responsive: true,
                        //columns: 40,
                        rows: 6,
                        placeholder: 'Hello World',
                        label: 'Text area, 6 rows'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        placeholder: 'Hello World',
                        label: 'Expanding text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        columns: 40,
                        rows: 2,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        columns: 40,
                        schema: 'secondary',
                        placeholder: 'Hello World',
                        label: 'Secondary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        columns: 40,
                        rows: 3,
                        expand: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Expanding primary text area'
                    }),
                    d_1.w(text_area_1.default, {
                        size: size,
                        outlined: true,
                        columns: 40,
                        rows: 2,
                        disabled: true,
                        schema: 'primary',
                        placeholder: 'Hello World',
                        label: 'Disabled primary text area'
                    })
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['etc.']),
                d_1.v('div', [
                    d_1.v('p', ['LOREM Sxy TEST']),
                    d_1.w(text_area_1.default, {
                        size: size,
                        columns: 40,
                        disabled: true,
                        rows: 4,
                        value: 'Initial value',
                        label: 'Disabled text area'
                    }),
                    d_1.v('p', ['LOREM Sxy TEST']),
                ])
            ]);
        };
        return TextAreaTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = TextAreaTab;
});
//# sourceMappingURL=TextAreaTab.js.map