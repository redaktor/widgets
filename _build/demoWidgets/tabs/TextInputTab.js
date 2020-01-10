(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/icon", "../../widgets/text-input", "../../widgets/label", "../../styles/tabs.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var icon_1 = require("../../widgets/icon");
    var text_input_1 = require("../../widgets/text-input");
    var label_1 = require("../../widgets/label");
    var css = require("../../styles/tabs.m.css");
    var TextInputTab = /** @class */ (function (_super) {
        tslib_1.__extends(TextInputTab, _super);
        function TextInputTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timePickerValue = '10:30';
            _this._textValue = 'Initial Value';
            return _this;
        }
        TextInputTab.prototype._onSetValue = function (evt) {
            this._timePickerValue = evt.value;
            this.invalidate();
        };
        TextInputTab.prototype.render = function () {
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            /*
                    const ROOT = (marginTop: string) =>
                        `--mt: ${marginTop}; --mb: calc((var(--margin-bottom) - var(--line)) / 2);
                        margin: var(--mt) 16px 0 0;
                        display: flex;`;
                    const WRAP = 'position: relative;'
                    const INPUT = (diff: string) => ``
                    const _L = 'position: absolute; transform: matrix(0.8333, 0, 0, 0.8333, 0, 0); top: calc(var(--mt) * -1);';
                    const L = (size:any) =>
                        w(Label, { style: `${_L}`, muted: true, size: size ? size : undefined }, [ 'label' ]);
                    const TEST = `font-family: Maven Pro; font-size: 15px; line-height: 16px;
                        padding-left: 4px; margin: 0; box-sizing: border-box;
                        border-radius: var(--ui-border-radius-emphasized); border: 2px solid transparent; `;
            */
            var responsive = false;
            return d_1.v('div', { classes: css.root }, [
                d_1.v('h3', ['Text input']),
                d_1.w(label_1.default, { size: size }, ['default']),
                d_1.v('div', [
                    /*
                    v('div', {
                        style: ROOT('0px'), classes: uiCss.defaultUI
                    }, [
                        v('div', { style: `${WRAP}
                            padding-top: 0px;
                            padding-bottom: calc(var(--mb) + var(--padding-top));`
                        }, [
                            L('default'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                    padding-top: var(--line);
                                    padding-bottom: calc(var(--mb) - var(--padding-top));`
                            })
                        ])
                    ]),
                    v('p',['X']),
                    v('div', { style: ROOT('0px'), classes: uiCss.defaultUI }, [
                        v('div', { style: `${WRAP}
                            padding-top: calc(var(--line) - var(--padding-top));
                            padding-bottom: calc(var(--mb) + var(--padding-top));`
                     }, [
                            L('default'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                    padding-top: var(--padding-top);
                                    padding-bottom: calc(var(--mb) - var(--padding-top));`
                            })
                        ])
                    ]),
    // medium
                    v('p',['X']),
                    v('div', { style: ROOT('-6px'), classes: uiCss.mediumUI }, [
                        v('div', { style: WRAP }, [
                            L('medium'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                margin-top: 0px;
                                margin-bottom: var(--mb);
                                padding-top: calc(var(--line) + 6px);
                                padding-bottom: var(--mb);`
                            })
                        ])
                    ]),
                    v('p',['X']),
                    v('div', { style: ROOT('0px'), classes: uiCss.mediumUI }, [
                        v('div', { style: WRAP }, [
                            L('medium'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                margin-top: calc(var(--line) - var(--padding-top));
                                margin-bottom: var(--mb);
                                padding-top: var(--padding-top);
                                padding-bottom: var(--mb);`
                            })
                        ])
                    ]),
    // large
                    v('p',['X']),
                    v('div', { style: ROOT('-6px'), classes: uiCss.largeUI }, [
                        v('div', { style: WRAP }, [
                            L('large'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                margin-top: 0px;
                                margin-bottom: calc(var(--mb) - var(--padding-top) * 2);
                                padding-top: calc(var(--line) + 6px);
                                padding-bottom: calc(var(--mb) + var(--padding-top) * 2);`
                            })
                        ])
                    ]),
                    v('p',['X']),
                    v('div', { style: ROOT('0px'), classes: uiCss.largeUI }, [
                        v('div', { style: WRAP }, [
                            L('large'),
                            v('input', {
                                type: 'text',
                                style: `${TEST}
                                margin-top: calc(var(--line) - var(--padding-top));
                                margin-bottom: calc(var(--mb) - 4px);
                                padding-top: var(--padding-top);
                                padding-bottom: calc(var(--mb) + 4px);`
                            })
                        ])
                    ]),
                    */
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        labelStatic: true,
                        label: 'Static Label',
                        placeholder: 'optional placeholder',
                        helperText: 'Lorem Ipsum - helperText'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        label: 'Text input',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        label: 'Required text input',
                        required: true,
                        placeholder: 'a placeholder',
                        helperText: 'Lorem Ipsum - helperText'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'primary',
                        label: 'Text input primary',
                        placeholder: 'Enter text',
                        helperText: 'Lorem Ipsum - helperText'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'secondary',
                        label: 'Text input secondary',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'amber',
                        label: 'Text input custom color',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        disabled: true,
                        label: 'Text input disabled',
                        placeholder: 'Enter text'
                    }),
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['filled']),
                d_1.v('div', [
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        label: 'Text input',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        labelStatic: true,
                        label: 'Static Label',
                        placeholder: 'optional placeholder'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        label: 'Required text input',
                        required: true,
                        placeholder: 'a placeholder'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        schema: 'primary',
                        label: 'Text input primary',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        schema: 'secondary',
                        label: 'Text input secondary',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        schema: 'amber',
                        label: 'Text input custom color',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        disabled: true,
                        label: 'Text input disabled',
                        placeholder: 'Enter text'
                    }),
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['outlined']),
                d_1.v('div', [
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        label: 'Text input',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        labelStatic: true,
                        label: 'Static Label',
                        placeholder: 'optional placeholder'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        label: 'Required text input',
                        required: true,
                        placeholder: 'a placeholder'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        schema: 'primary',
                        label: 'Text input primary',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        schema: 'secondary',
                        label: 'Text input secondary',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        schema: 'amber',
                        label: 'Text input custom color',
                        placeholder: 'Enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        disabled: true,
                        label: 'Text input disabled',
                        placeholder: 'Enter text'
                    }),
                ]),
                d_1.v('br'),
                d_1.w(label_1.default, { size: size }, ['etc.']),
                //validation
                d_1.v('div', [
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        label: 'Initial value',
                        value: this._textValue,
                        placeholder: 'enter text'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        label: 'email input',
                        type: 'email',
                        placeholder: 'Email address',
                        helperText: 'Lorem Ipsum - helperText '
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'primary',
                        placeholder: 'has no label'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        label: 'no placeholder'
                    })
                ]),
                d_1.v('h3', ['Text input with addons']),
                d_1.v('div', [
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'primary',
                        leading: ['@'],
                        label: 'Primary Twitter Username',
                        placeholder: 'username'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        filled: true,
                        leading: ['@'],
                        label: 'Twitter Username',
                        placeholder: 'username'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        outlined: true,
                        leading: ['@'],
                        label: 'Twitter Username',
                        placeholder: 'username'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        leading: ['$'],
                        trailing: ['.00'],
                        label: 'Price, rounded to the nearest dollar',
                        type: 'number'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: false,
                        trailing: [d_1.w(icon_1.default, { type: 'downIcon' })],
                        label: 'Test'
                    }),
                    d_1.w(text_input_1.default, {
                        size: size,
                        responsive: responsive,
                        schema: 'primary',
                        leading: [d_1.w(icon_1.default, { type: 'closeIcon' })],
                        trailing: [d_1.w(icon_1.default, { type: 'downIcon' })],
                        label: 'Test'
                    }),
                ]),
            ]);
        };
        return TextInputTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = TextInputTab;
});
//# sourceMappingURL=TextInputTab.js.map