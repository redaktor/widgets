(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/button", "../../widgets/checkbox", "../../widgets/radio", "../../widgets/icon", "../../widgets/label", "../../styles/tabs.m.css", "../../widgets/themes/redaktor-default/_ui.m.css", "../../widgets/common/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var button_1 = require("../../widgets/button");
    var checkbox_1 = require("../../widgets/checkbox");
    var radio_1 = require("../../widgets/radio");
    var icon_1 = require("../../widgets/icon");
    var label_1 = require("../../widgets/label");
    var css = require("../../styles/tabs.m.css");
    var ui = require("../../widgets/themes/redaktor-default/_ui.m.css");
    var util_1 = require("../../widgets/common/util");
    var BasicFormTab = /** @class */ (function (_super) {
        tslib_1.__extends(BasicFormTab, _super);
        function BasicFormTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._togglePressed = true;
            _this._checkboxChecked = true;
            _this._toggleChecked = true;
            _this._selectedRadio = 'first';
            _this._defaultTypo = 'medium'; /* TODO 'default' in baseClass ! */
            return _this;
        }
        BasicFormTab.prototype._toggleButtonClick = function () {
            this._togglePressed = !this._togglePressed;
            this.invalidate();
        };
        BasicFormTab.prototype._checkboxChange = function () {
            this._checkboxChecked = !this._checkboxChecked;
            this.invalidate();
        };
        BasicFormTab.prototype._radioChange = function (evt) {
            this._selectedRadio = evt.value;
            this.invalidate();
        };
        BasicFormTab.prototype._toggleChange = function () {
            this._toggleChecked = !this._toggleChecked;
            this.invalidate();
        };
        BasicFormTab.prototype.getSizeClasses = function (_ui, typoSize, uiSize) {
            if (_ui === void 0) { _ui = ui; }
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            if (!uiSize || !(uiSize in util_1.Size)) {
                uiSize = size;
            }
            if (size === 'default') {
                typoSize = this._defaultTypo || size;
            }
            else if (!typoSize || !(typoSize in util_1.Size)) {
                typoSize = size;
            }
            return [_ui.ui, _ui[uiSize + "UI"], _ui[typoSize + "Typo"]];
        };
        BasicFormTab.prototype.render = function () {
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            var uiSizeClasses = this.getSizeClasses();
            var defaultSizeClasses = this.getSizeClasses(ui, 'medium', 'default');
            return d_1.v('div', { classes: [css.root /*, ui.running*/] }, [
                /*
                      v('div', {
                        classes: [ui.wrapper, ui.hasPrefix, ui.hasSuffix, ...uiSizeClasses],
                        style: 'background: orange;'
                      }, [
                        v('div', {classes: [ui.prefix, ...uiSizeClasses]}, [ w(Icon, { type: 'downIcon' }) ]),
                        v('div', {classes: [ui.inner, ...uiSizeClasses]}, [
                          //w(Label, {size: 'default'}, ['Hello World'])
                          `Size: ${size}`
                        ]),
                        v('div', {classes: [ui.suffix, ...uiSizeClasses]}, [ 'X' ])
                
                      ]),
                      v('div', {
                        classes: [ui.wrapper, ui.square, ...uiSizeClasses],
                        style: 'background: orange;'
                      }, [
                        v('div', {classes: [ui.inner, ui.strongTypo, ...uiSizeClasses]}, [
                          w(Icon, { type: 'checkIcon' })
                        ]),
                      ]),
                      v('div', {
                        classes: [ui.wrapper, ...defaultSizeClasses],
                        style: 'background: lightgrey;'
                      }, [
                        v('div', {classes: [ui.inner, ...defaultSizeClasses]}, ['[Size: default]']),
                      ]),
                */
                d_1.v('h2', ['Lorem Ipsum']),
                d_1.v('p', [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique.\n        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n        Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu,\n        in vestibulum neque nulla a felis.."
                ]),
                d_1.v('h3', ['Radio']),
                d_1.w(label_1.default, { size: size }, ['default']),
                d_1.v('div', [
                    d_1.w(radio_1.default, {
                        size: size,
                        checked: this._selectedRadio === 'first',
                        value: 'first',
                        label: 'An option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        checked: this._selectedRadio === 'second',
                        value: 'second',
                        label: 'Option 2',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        checked: this._selectedRadio === 'primary',
                        schema: 'primary',
                        value: 'primary',
                        label: 'Primary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        checked: this._selectedRadio === 'secondary',
                        schema: 'secondary',
                        value: 'secondary',
                        label: 'Secondary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        checked: this._selectedRadio === 'light_green',
                        schema: 'light_green',
                        value: 'light_green',
                        label: 'Custom color option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        value: 'third',
                        label: 'Disabled option',
                        disabled: true,
                        name: 'sample-radios'
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['outlined']),
                d_1.v('div', [
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        checked: this._selectedRadio === 'outlined first',
                        value: 'outlined first',
                        label: 'An option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        checked: this._selectedRadio === 'outlined second',
                        value: 'outlined second',
                        label: 'Option 2',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        checked: this._selectedRadio === 'outlined primary',
                        value: 'outlined primary',
                        schema: 'primary',
                        label: 'Primary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        checked: this._selectedRadio === 'outlined secondary',
                        value: 'outlined secondary',
                        schema: 'secondary',
                        label: 'Secondary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        checked: this._selectedRadio === 'outlined light_green',
                        value: 'outlined light_green',
                        schema: 'light_green',
                        label: 'Custom color option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        outlined: true,
                        value: 'third',
                        label: 'Disabled option',
                        disabled: true,
                        name: 'sample-radios'
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['filled']),
                d_1.v('div', [
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        checked: this._selectedRadio === 'filled first',
                        value: 'filled first',
                        label: 'An option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        checked: this._selectedRadio === 'filled second',
                        value: 'filled second',
                        label: 'Option 2',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        checked: this._selectedRadio === 'filled primary',
                        value: 'filled primary',
                        schema: 'primary',
                        label: 'Primary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        checked: this._selectedRadio === 'filled secondary',
                        value: 'filled secondary',
                        schema: 'secondary',
                        label: 'Secondary option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        checked: this._selectedRadio === 'filled light_green',
                        value: 'filled light_green',
                        schema: 'light_green',
                        label: 'Custom color option',
                        name: 'sample-radios',
                        onChange: this._radioChange
                    }),
                    d_1.w(radio_1.default, {
                        size: size,
                        filled: true,
                        value: 'third',
                        label: 'Disabled option',
                        disabled: true,
                        name: 'sample-radios'
                    })
                ]),
                d_1.v('h3', ['Checkbox']),
                d_1.w(label_1.default, { size: size }, ['default']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: this._checkboxChecked,
                        label: 'Checked checkbox',
                        value: 'checkbox-example-1',
                        onChange: this._checkboxChange
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        schema: 'primary',
                        label: 'Primary checkbox',
                        value: 'checkbox-example-2'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        schema: 'secondary',
                        label: 'Secondary checkbox',
                        value: 'checkbox-example-3'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        schema: 'indigo',
                        label: 'Custom color',
                        value: 'checkbox-example-4'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        disabled: true,
                        value: 'disabled-checkbox-example-5'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: false,
                        disabled: true,
                        label: 'Disabled checkboxes',
                        value: 'disabled-uncheckbox-example-6'
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['outlined']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        outlined: true,
                        label: 'Checked checkbox',
                        value: 'checkbox-example-1'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        schema: 'primary',
                        label: 'Primary checkbox',
                        value: 'checkbox-example-2'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        schema: 'secondary',
                        label: 'Secondary checkbox',
                        value: 'checkbox-example-3'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        checked: true,
                        schema: 'indigo',
                        label: 'Custom color',
                        value: 'checkbox-example-4'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        checked: true,
                        disabled: true,
                        value: 'disabled-checkbox-example-5'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        checked: false,
                        disabled: true,
                        label: 'Disabled checkboxes',
                        value: 'disabled-uncheckbox-example-6'
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['filled']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        filled: true,
                        label: 'Checked checkbox',
                        value: 'checkbox-example-1'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        schema: 'primary',
                        label: 'Primary checkbox',
                        value: 'checkbox-example-2'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        schema: 'secondary',
                        label: 'Secondary checkbox',
                        value: 'checkbox-example-3'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        checked: true,
                        schema: 'indigo',
                        label: 'Custom color',
                        value: 'checkbox-example-4'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        checked: true,
                        disabled: true,
                        value: 'disabled-checkbox-example-5'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        checked: false,
                        disabled: true,
                        label: 'Disabled checkboxes',
                        value: 'disabled-uncheckbox-example-6'
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['default / "toggle" mode']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        mode: checkbox_1.Mode.toggle,
                        checked: this._toggleChecked,
                        label: 'toggle',
                        onChange: this._toggleChange
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'primary',
                        label: 'Primary toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'secondary',
                        label: 'Secondary toggle',
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        mode: 'toggle',
                        checked: true,
                        schema: 'orange',
                        label: 'Custom color toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: false,
                        schema: 'secondary',
                        offLabel: 'Off',
                        label: 'On',
                        mode: checkbox_1.Mode.toggle
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        label: 'disabled',
                        /*offLabel: 'Off',*/
                        mode: checkbox_1.Mode.toggle,
                        disabled: true
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['outlined / "toggle" mode']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        label: 'toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'primary',
                        label: 'Primary toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'secondary',
                        label: 'Secondary toggle',
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        mode: 'toggle',
                        checked: true,
                        schema: 'orange',
                        label: 'Custom color toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        checked: false,
                        schema: 'secondary',
                        offLabel: 'Off',
                        label: 'On',
                        mode: checkbox_1.Mode.toggle
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        outlined: true,
                        checked: true,
                        label: 'disabled',
                        /*offLabel: 'Off',*/
                        mode: checkbox_1.Mode.toggle,
                        disabled: true
                    })
                ]),
                d_1.w(label_1.default, { size: size }, ['filled / "toggle" mode']),
                d_1.v('div', [
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        label: 'toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'primary',
                        label: 'Primary toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        mode: checkbox_1.Mode.toggle,
                        checked: true,
                        schema: 'secondary',
                        label: 'Secondary toggle',
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        mode: 'toggle',
                        checked: true,
                        schema: 'orange',
                        label: 'Custom color toggle'
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        checked: false,
                        schema: 'secondary',
                        offLabel: 'Off',
                        label: 'On',
                        mode: checkbox_1.Mode.toggle
                    }),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        filled: true,
                        checked: true,
                        label: 'disabled',
                        /*offLabel: 'Off',*/
                        mode: checkbox_1.Mode.toggle,
                        disabled: true
                    })
                ]),
                d_1.v('h3', ['Buttons']),
                d_1.v('div', {
                    classes: css.buttons
                }, [
                    //				v('h4', [ 'Enabled' ]),
                    /*				w(Checkbox, {
                                        size: 'small',
                                        checked: true,
                                        schema: 'primary',
                                        label: 'Checked primary checkbox',
                                        value: 'checkbox-example-2'
                                    }),
                                    w(Checkbox, {
                                        size: 'default',
                                        checked: true,
                                        schema: 'primary',
                                        label: 'Checked primary checkbox',
                                        value: 'checkbox-example-2'
                                    }),
                                    w(Checkbox, {
                                        size: 'medium',
                                        checked: true,
                                        schema: 'primary',
                                        label: 'Checked primary checkbox',
                                        value: 'checkbox-example-2'
                                    }),
                                    w(Checkbox, {
                                        size: 'large',
                                        checked: true,
                                        schema: 'primary',
                                        label: 'Checked primary checkbox',
                                        value: 'checkbox-example-2'
                                    }),
                            v('br'),
                    */
                    d_1.w(label_1.default, { size: size }, ['default']),
                    d_1.v('div', [
                        d_1.w(button_1.default, { size: size }, ['Basic']),
                        d_1.w(button_1.default, { size: size, schema: 'primary' }, ['Primary']),
                        d_1.w(button_1.default, { size: size, schema: 'secondary' }, ['Secondary']),
                        d_1.w(button_1.default, { size: size, schema: 'green' }, ['Custom']),
                        d_1.w(button_1.default, { size: size, disabled: true }, ['Disabled']),
                    ]),
                    d_1.w(label_1.default, { size: size }, ['raised']),
                    d_1.v('div', [
                        d_1.w(button_1.default, { size: size, depth: 'raised' }, ['Basic']),
                        d_1.w(button_1.default, { size: size, depth: 'raised', schema: 'primary' }, ['Primary']),
                        d_1.w(button_1.default, { size: size, depth: 'raised', schema: 'secondary' }, ['Secondary']),
                        d_1.w(button_1.default, { size: size, depth: 'raised', schema: 'green' }, ['Custom']),
                        d_1.w(button_1.default, { size: size, depth: 'raised', disabled: true }, ['Disabled']),
                    ]),
                    d_1.w(label_1.default, { size: size }, ['flat']),
                    d_1.v('div', [
                        d_1.w(button_1.default, { size: size, depth: 'flat' }, ['Basic']),
                        d_1.w(button_1.default, { size: size, depth: 'flat', schema: 'primary' }, ['Primary']),
                        d_1.w(button_1.default, { size: size, depth: 'flat', schema: 'secondary' }, ['Secondary']),
                        d_1.w(button_1.default, { size: size, depth: 'flat', schema: 'green' }, ['Custom']),
                        d_1.w(button_1.default, { size: size, depth: 'flat', disabled: true }, ['Disabled']),
                    ]),
                    d_1.w(label_1.default, { size: size }, ['outlined']),
                    d_1.v('div', [
                        d_1.w(button_1.default, { size: size, outlined: true }, ['Basic']),
                        d_1.w(button_1.default, { size: size, outlined: true, schema: 'primary' }, ['Primary']),
                        d_1.w(button_1.default, { size: size, outlined: true, schema: 'secondary' }, ['Secondary']),
                        d_1.w(button_1.default, { size: size, outlined: true, schema: 'green' }, ['Custom']),
                        d_1.w(button_1.default, { size: size, outlined: true, disabled: true }, ['Disabled']),
                    ]),
                    d_1.v('br'), d_1.v('br'),
                    d_1.w(checkbox_1.default, {
                        size: size,
                        checked: true,
                        schema: 'primary',
                        label: 'X',
                        value: 'checkbox-example-2'
                    }),
                    d_1.w(button_1.default, { size: size, depth: 'raised', disabled: true }, ['Disabled']),
                    d_1.w(button_1.default, { size: size }, ['Icon Button ', d_1.w(icon_1.default, { type: 'searchIcon' })]),
                    /*w(Button, { size, popup: { expanded: false, id: 'fakeId' } }, [ 'Popup' ]),*/
                    d_1.w(button_1.default, { size: size, pressed: this._togglePressed, onClick: this._toggleButtonClick }, ['Toggle']),
                    d_1.w(button_1.default, {
                        size: size, pressed: this._togglePressed, onClick: this._toggleButtonClick, schema: 'primary'
                    }, ['Primary Toggle'])
                ]),
                d_1.v('div', {
                    classes: [css.buttons, css.disabled]
                }, [
                    d_1.v('h4', ['Disabled']),
                    d_1.w(button_1.default, { size: size, disabled: true }, ['Basic Button']),
                    d_1.w(button_1.default, { size: size, disabled: true }, ['Icon Button ', d_1.w(icon_1.default, { type: 'searchIcon' })]),
                    /*w(Button, { size, disabled: true, popup: { expanded: false, id: 'fakeId' } }, [ 'Popup' ]),*/
                    d_1.w(button_1.default, {
                        size: size, disabled: true, pressed: this._togglePressed, onClick: this._toggleButtonClick
                    }, ['Toggle']),
                    d_1.w(button_1.default, { size: size, popup: true /*, responsive: true*/ }, ['menu'])
                ]),
                d_1.v('p', ['Lorem Ipsum'])
            ]);
        };
        return BasicFormTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = BasicFormTab;
});
//# sourceMappingURL=BasicFormTab.js.map