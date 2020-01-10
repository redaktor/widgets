import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { Toggle } from '../../widgets/common/interfaces';
import { TabProperties } from '../Tabs';
import Button from '../../widgets/button';
import Checkbox, { Mode } from '../../widgets/checkbox';
import Radio from '../../widgets/radio';
import Icon from '../../widgets/icon';
import Label from '../../widgets/label';
import * as css from '../../styles/tabs.m.css';
import * as ui from '../../widgets/themes/redaktor-default/_ui.m.css';
import { Size, Sizes } from '../../widgets/common/util';

export default class BasicFormTab<P extends TabProperties = TabProperties> extends WidgetBase<P> {
	private _togglePressed = true;
	private _checkboxChecked = true;
	private _toggleChecked = true;
	private _selectedRadio = 'first';

	private _toggleButtonClick() {
		this._togglePressed = !this._togglePressed;
		this.invalidate();
	}

	private _checkboxChange() {
		this._checkboxChecked = !this._checkboxChecked;
		this.invalidate();
	}

	private _radioChange(evt: Toggle) {
		this._selectedRadio = evt.value;
		this.invalidate();
	}

	private _toggleChange() {
		this._toggleChecked = !this._toggleChecked;
		this.invalidate();
	}

  protected _defaultTypo: Sizes = 'medium'; /* TODO 'default' in baseClass ! */
  protected getSizeClasses(_ui: any/*RedaktorSizeCSS*/ = ui, typoSize?: Sizes, uiSize?: Sizes) {
    const { size = 'default' } = this.properties;
    if (!uiSize || !(uiSize in Size)) { uiSize = size; }
    if (size === 'default') {
      typoSize = this._defaultTypo || size;
    } else if (!typoSize || !(typoSize in Size)) {
      typoSize = size;
    }
    return [_ui.ui, _ui[`${uiSize}UI`], _ui[`${typoSize}Typo`]]
  }

	render() {
		console.log('BasicForm Tab');
    const { size = 'default' } = this.properties;
    const uiSizeClasses = this.getSizeClasses();
    const defaultSizeClasses = this.getSizeClasses(ui, 'medium', 'default');

		return v('div', { classes: [css.root/*, ui.running*/] }, [
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
      v('h2', ['Lorem Ipsum']),
      v('p', [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu,
        in vestibulum neque nulla a felis..`
      ]),

			v('h3', [ 'Radio' ]),
      w(Label, { size }, ['default']),
			v('div', { classes: ui.flexRow }, [
				w(Radio, {
					size,
					checked: this._selectedRadio === 'first',
					value: 'first',
					label: 'An option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					checked: this._selectedRadio === 'second',
					value: 'second',
					label: 'Option 2',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					checked: this._selectedRadio === 'primary',
					schema: 'primary',
					value: 'primary',
					label: 'Primary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					checked: this._selectedRadio === 'secondary',
					schema: 'secondary',
					value: 'secondary',
					label: 'Secondary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					checked: this._selectedRadio === 'light_green',
					schema: 'light_green',
					value: 'light_green',
					label: 'Custom color option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					value: 'third',
					label: 'Disabled option',
					disabled: true,
					name: 'sample-radios'
				})
			]),

			w(Label, { size }, ['outlined']),
			v('div', { classes: ui.flexRow }, [
				w(Radio, {
					size,
					outlined: true,
					checked: this._selectedRadio === 'outlined first',
					value: 'outlined first',
					label: 'An option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					outlined: true,
					checked: this._selectedRadio === 'outlined second',
					value: 'outlined second',
					label: 'Option 2',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					outlined: true,
					checked: this._selectedRadio === 'outlined primary',
					value: 'outlined primary',
					schema: 'primary',
					label: 'Primary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					outlined: true,
					checked: this._selectedRadio === 'outlined secondary',
					value: 'outlined secondary',
					schema: 'secondary',
					label: 'Secondary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					outlined: true,
					checked: this._selectedRadio === 'outlined light_green',
					value: 'outlined light_green',
					schema: 'light_green',
					label: 'Custom color option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					outlined: true,
					value: 'third',
					label: 'Disabled option',
					disabled: true,
					name: 'sample-radios'
				})
			]),

			w(Label, { size }, ['filled']),
			v('div', { classes: ui.flexRow }, [
				w(Radio, {
					size,
					filled: true,
					checked: this._selectedRadio === 'filled first',
					value: 'filled first',
					label: 'An option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					filled: true,
					checked: this._selectedRadio === 'filled second',
					value: 'filled second',
					label: 'Option 2',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					filled: true,
					checked: this._selectedRadio === 'filled primary',
					value: 'filled primary',
					schema: 'primary',
					label: 'Primary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					filled: true,
					checked: this._selectedRadio === 'filled secondary',
					value: 'filled secondary',
					schema: 'secondary',
					label: 'Secondary option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					filled: true,
					checked: this._selectedRadio === 'filled light_green',
					value: 'filled light_green',
					schema: 'light_green',
					label: 'Custom color option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					size,
					filled: true,
					value: 'third',
					label: 'Disabled option',
					disabled: true,
					name: 'sample-radios'
				})
			]),

			v('h3', [ 'Checkbox' ]),
			w(Label, { size }, ['default']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					checked: this._checkboxChecked,
					label: 'Checked checkbox',
					value: 'checkbox-example-1',
					onChange: this._checkboxChange
				}),
				w(Checkbox, {
					size,
					schema: 'primary',
					label: 'Primary checkbox',
					value: 'checkbox-example-2'
				}),
				w(Checkbox, {
					size,
					schema: 'secondary',
					label: 'Secondary checkbox',
					value: 'checkbox-example-3'
				}),
				w(Checkbox, {
					size,
					checked: true,
					schema: 'indigo',
					label: 'Custom color',
					value: 'checkbox-example-4'
				}),
				w(Checkbox, {
					size,
					checked: true,
					disabled: true,
					value: 'disabled-checkbox-example-5'
				}),
				w(Checkbox, {
					size,
					checked: false,
					disabled: true,
					label: 'Disabled checkboxes',
					value: 'disabled-uncheckbox-example-6'
				})
			]),

			w(Label, { size }, ['outlined']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					checked: true,
					outlined: true,
					label: 'Checked checkbox',
					value: 'checkbox-example-1'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					schema: 'primary',
					label: 'Primary checkbox',
					value: 'checkbox-example-2'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					schema: 'secondary',
					label: 'Secondary checkbox',
					value: 'checkbox-example-3'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					checked: true,
					schema: 'indigo',
					label: 'Custom color',
					value: 'checkbox-example-4'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					checked: true,
					disabled: true,
					value: 'disabled-checkbox-example-5'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					checked: false,
					disabled: true,
					label: 'Disabled checkboxes',
					value: 'disabled-uncheckbox-example-6'
				})
			]),

			w(Label, { size }, ['filled']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					checked: true,
					filled: true,
					label: 'Checked checkbox',
					value: 'checkbox-example-1'
				}),
				w(Checkbox, {
					size,
					filled: true,
					schema: 'primary',
					label: 'Primary checkbox',
					value: 'checkbox-example-2'
				}),
				w(Checkbox, {
					size,
					filled: true,
					schema: 'secondary',
					label: 'Secondary checkbox',
					value: 'checkbox-example-3'
				}),
				w(Checkbox, {
					size,
					filled: true,
					checked: true,
					schema: 'indigo',
					label: 'Custom color',
					value: 'checkbox-example-4'
				}),
				w(Checkbox, {
					size,
					filled: true,
					checked: true,
					disabled: true,
					value: 'disabled-checkbox-example-5'
				}),
				w(Checkbox, {
					size,
					filled: true,
					checked: false,
					disabled: true,
					label: 'Disabled checkboxes',
					value: 'disabled-uncheckbox-example-6'
				})
			]),

			w(Label, { size }, ['default / "toggle" mode']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					mode: Mode.toggle,
					checked: this._toggleChecked,
					label: 'toggle',
					onChange: this._toggleChange
				}),
				w(Checkbox, {
					size,
					mode: Mode.toggle,
					checked: true,
					schema: 'primary',
					label: 'Primary toggle'
				}),
				w(Checkbox, {
					size,
					mode: Mode.toggle,
					checked: true,
					schema: 'secondary',
					label: 'Secondary toggle',
				}),
				w(Checkbox, {
					size,
					mode: 'toggle',
					checked: true,
					schema: 'orange',
					label: 'Custom color toggle'
				}),
				w(Checkbox, {
					size,
					checked: false,
					schema: 'secondary',
					offLabel: 'Off',
          label: 'On',
					mode: Mode.toggle
				}),
				w(Checkbox, {
					size,
					checked: true,
					label: 'disabled',
					/*offLabel: 'Off',*/
					mode: Mode.toggle,
					disabled: true
				})
			]),

			w(Label, { size }, ['outlined / "toggle" mode']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					outlined: true,
					mode: Mode.toggle,
					checked: true,
					label: 'toggle'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					mode: Mode.toggle,
					checked: true,
					schema: 'primary',
					label: 'Primary toggle'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					mode: Mode.toggle,
					checked: true,
					schema: 'secondary',
					label: 'Secondary toggle',
				}),
				w(Checkbox, {
					size,
					outlined: true,
					mode: 'toggle',
					checked: true,
					schema: 'orange',
					label: 'Custom color toggle'
				}),
				w(Checkbox, {
					size,
					outlined: true,
					checked: false,
					schema: 'secondary',
					offLabel: 'Off',
          label: 'On',
					mode: Mode.toggle
				}),
				w(Checkbox, {
					size,
					outlined: true,
					checked: true,
					label: 'disabled',
					/*offLabel: 'Off',*/
					mode: Mode.toggle,
					disabled: true
				})
			]),

			w(Label, { size }, ['filled / "toggle" mode']),
			v('div', { classes: ui.flexRow }, [
				w(Checkbox, {
					size,
					filled: true,
					mode: Mode.toggle,
					checked: true,
					label: 'toggle'
				}),
				w(Checkbox, {
					size,
					filled: true,
					mode: Mode.toggle,
					checked: true,
					schema: 'primary',
					label: 'Primary toggle'
				}),
				w(Checkbox, {
					size,
					filled: true,
					mode: Mode.toggle,
					checked: true,
					schema: 'secondary',
					label: 'Secondary toggle',
				}),
				w(Checkbox, {
					size,
					filled: true,
					mode: 'toggle',
					checked: true,
					schema: 'orange',
					label: 'Custom color toggle'
				}),
				w(Checkbox, {
					size,
					filled: true,
					checked: false,
					schema: 'secondary',
					offLabel: 'Off',
          label: 'On',
					mode: Mode.toggle
				}),
				w(Checkbox, {
					size,
					filled: true,
					checked: true,
					label: 'disabled',
					/*offLabel: 'Off',*/
					mode: Mode.toggle,
					disabled: true
				})
			]),

      v('h3', [ 'Buttons' ]),
			v('div', {
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

				w(Label, { size }, ['default']),
				v('div', { classes: ui.flexRow }, [
	        w(Button, { size }, [ 'Basic' ]),
					w(Button, { size, schema: 'primary' }, [ 'Primary' ]),
					w(Button, { size, schema: 'secondary' }, [ 'Secondary' ]),
					w(Button, { size, schema: 'green' }, [ 'Custom' ]),
					w(Button, { size, disabled: true }, [ 'Disabled' ]),
				]),
				w(Label, { size }, ['raised']),
				v('div', { classes: ui.flexRow }, [
	        w(Button, { size, depth: 'raised' }, [ 'Basic' ]),
					w(Button, { size, depth: 'raised', schema: 'primary' }, [ 'Primary' ]),
					w(Button, { size, depth: 'raised', schema: 'secondary' }, [ 'Secondary' ]),
					w(Button, { size, depth: 'raised', schema: 'green' }, [ 'Custom' ]),
					w(Button, { size, depth: 'raised', disabled: true }, [ 'Disabled' ]),
				]),
				w(Label, { size }, ['flat']),
				v('div', { classes: ui.flexRow }, [
					w(Button, { size, depth: 'flat' }, [ 'Basic' ]),
					w(Button, { size, depth: 'flat', schema: 'primary' }, [ 'Primary' ]),
					w(Button, { size, depth: 'flat', schema: 'secondary' }, [ 'Secondary' ]),
					w(Button, { size, depth: 'flat', schema: 'green' }, [ 'Custom' ]),
					w(Button, { size, depth: 'flat', disabled: true }, [ 'Disabled' ]),
				]),
				w(Label, { size }, ['outlined']),
				v('div', { classes: ui.flexRow }, [
	        w(Button, { size, outlined: true }, [ 'Basic' ]),
					w(Button, { size, outlined: true, schema: 'primary' }, [ 'Primary' ]),
					w(Button, { size, outlined: true, schema: 'secondary' }, [ 'Secondary' ]),
					w(Button, { size, outlined: true, schema: 'green' }, [ 'Custom' ]),
					w(Button, { size, outlined: true, disabled: true }, [ 'Disabled' ]),
				]),
				v('br'),v('br'),
				w(Checkbox, {
					size,
					checked: true,
					schema: 'primary',
					label: 'X',
					value: 'checkbox-example-2'
				}),
				w(Button, { size, depth: 'raised', disabled: true }, [ 'Disabled' ]),
				w(Button, { size }, [ 'Icon Button ', w(Icon, { type: 'searchIcon' }) ]),
				/*w(Button, { size, popup: { expanded: false, id: 'fakeId' } }, [ 'Popup' ]),*/
				w(Button, { size, pressed: this._togglePressed, onClick: this._toggleButtonClick }, [ 'Toggle' ]),
				w(Button, {
					size, pressed: this._togglePressed, onClick: this._toggleButtonClick, schema: 'primary'
				}, [ 'Primary Toggle' ])
			]),
			v('div', {
				classes: [css.buttons, css.disabled]
			}, [
				v('h4', [ 'Disabled' ]),
				w(Button, { size, disabled: true }, [ 'Basic Button' ]),
				w(Button, { size, disabled: true }, [ 'Icon Button ', w(Icon, { type: 'searchIcon' }) ]),
				/*w(Button, { size, disabled: true, popup: { expanded: false, id: 'fakeId' } }, [ 'Popup' ]),*/
				w(Button, {
          size, disabled: true, pressed: this._togglePressed, onClick: this._toggleButtonClick
        }, [ 'Toggle' ]),
				w(Button, { size, popup: true/*, responsive: true*/ }, ['menu'])
			]),
      v('p',['Lorem Ipsum'])
		]);
	}
}
