import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { Input } from '../../widgets/common/interfaces';
import Icon from '../../widgets/icon';
import TimePicker, { TimeUnits } from '../../widgets/time-picker';

import LoginForm from '../../widgets/form/login';
import TextInput from '../../widgets/text-input';
//import ComboBox from '../../widgets/combobox';
import Label from '../../widgets/label';
import { TabProperties } from '../Tabs';
import * as css from '../../styles/tabs.m.css';

import * as uiCss from '../../widgets/themes/redaktor-default/_ui.m.css';

export default class TextInputTab<P extends TabProperties = TabProperties> extends WidgetBase<P> {
	private _timePickerOptions: TimeUnits[];
	private _timePickerValue = '10:30';

	private _textValue = 'Initial Value';

	private _onSetValue(evt: Input) {
		this._timePickerValue = evt.value;
		this.invalidate();
	}

	render() {
		console.log('TextInput Tab');
		const { size = 'default' } = this.properties;
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
    const responsive = false;

		return v('div', { classes: css.root }, [
			v('h3', [ 'Text input' ]),
			w(Label, { size }, ['default']),

			v('div', [
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

				h.div({})
					.p({})
					.p
					.li
				*/

				w(LoginForm, {}),


				w(TextInput, {
					size,
					responsive,
					labelStatic: true,
					label: 'Static Label',
					placeholder: 'optional placeholder',
					helperText: 'Lorem Ipsum - helperText'
				}),
				w(TextInput, {
					size,
          responsive,
					label: 'Text input',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					label: 'Required text input',
					required: true,
					placeholder: 'a placeholder',
					helperText: 'Lorem Ipsum - helperText'
				}),
				w(TextInput, {
					size,
          responsive,
					schema: 'primary',
					label: 'Text input primary',
					placeholder: 'Enter text',
					helperText: 'Lorem Ipsum - helperText'
				}),
				w(TextInput, {
					size,
          responsive,
					schema: 'secondary',
					label: 'Text input secondary',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					schema: 'amber',
					label: 'Text input custom color',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					disabled: true,
					label: 'Text input disabled',
					placeholder: 'Enter text'
				}),
			]),
			v('br'),
			w(Label, { size }, ['filled']),
			v('div', [
				w(TextInput, {
					size,
          responsive,
					filled: true,
					label: 'Text input',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					filled: true,
					labelStatic: true,
					label: 'Static Label',
					placeholder: 'optional placeholder'
				}),
				w(TextInput, {
					size,
          responsive,
					filled: true,
					label: 'Required text input',
					required: true,
					placeholder: 'a placeholder'
				}),
				w(TextInput, {
					size,
          responsive,
					filled: true,
					schema: 'primary',
					label: 'Text input primary',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					filled: true,
					schema: 'secondary',
					label: 'Text input secondary',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					filled: true,
					schema: 'amber',
					label: 'Text input custom color',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					filled: true,
					disabled: true,
					label: 'Text input disabled',
					placeholder: 'Enter text'
				}),
			]),
			v('br'),
			w(Label, { size }, ['outlined']),
			v('div', [
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					label: 'Text input',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					labelStatic: true,
					label: 'Static Label',
					placeholder: 'optional placeholder'
				}),
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					label: 'Required text input',
					required: true,
					placeholder: 'a placeholder'
				}),
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					schema: 'primary',
					label: 'Text input primary',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					schema: 'secondary',
					label: 'Text input secondary',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					outlined: true,
					schema: 'amber',
					label: 'Text input custom color',
					placeholder: 'Enter text'
				}),
				w(TextInput, {
					size,
					responsive,
					outlined: true,
					disabled: true,
					label: 'Text input disabled',
					placeholder: 'Enter text'
				}),
			]),
			v('br'),
			w(Label, { size }, ['etc.']),
			//validation
			v('div', [
				w(TextInput, {
					size,
          responsive,
					label: 'Initial value',
					value: this._textValue,/*
					onChange: (evt: Input) => {
						this._textValue = evt.value.replace('n','x');
						this.invalidate()
					},*/
					placeholder: 'enter text'
				}),
				w(TextInput, {
					size,
          responsive,
					label: 'email input',
					type: 'email',
					placeholder: 'Email address',
					helperText: 'Lorem Ipsum - helperText '
				}),
				w(TextInput, {
					size,
          responsive,
					schema: 'primary',
					placeholder: 'has no label'
				}),
				w(TextInput, {
					size,
          responsive,
					label: 'no placeholder'
				})
			]),
			v('h3', [ 'Text input with addons' ]),
			v('div', [
				w(TextInput, {
					size,
          responsive,
					schema: 'primary',
					leading: [ '@' ],
					label: 'Primary Twitter Username',
					placeholder: 'username'
				}),
				w(TextInput, {
					size,
          responsive,
					filled: true,
					leading: [ '@' ],
					label: 'Twitter Username',
					placeholder: 'username'
				}),
				w(TextInput, {
					size,
          responsive,
					outlined: true,
					leading: [ '@' ],
					label: 'Twitter Username',
					placeholder: 'username'
				}),
				w(TextInput, {
					size,
          responsive: false,
					leading: [ '$' ],
					trailing: [ '.00' ],
					label: 'Price, rounded to the nearest dollar',
					type: 'number'
				}),
				w(TextInput, {
					size,
          responsive: false,
					trailing: [ w(Icon, {type: 'downIcon'}) ],
					label: 'Test'
				}),
				w(TextInput, {
					size,
          responsive,
					schema: 'primary',
					leading: [ w(Icon, { type: 'closeIcon' }) ],
					trailing: [ w(Icon, {type: 'downIcon'}) ],
					label: 'Test'
				}),
/*
				w(ComboBox, {
					label: 'ComboBox',
					clearable: true,
					results: ['Initial value', '2nd value']
				}),
				w(ComboBox, {
					label: 'Primary ComboBox',
					clearable: true,
					schema: 'primary',
					value: 'Initial Value',
					results: ['Initial value', '2nd value', 'in 2nd', 'freaky']
				})
*/
			]),
/*
			v('h3', [ 'Time picker' ]),
			v('div', [
				w(TimePicker, {
					clearable: true,
					end: '23:59',
					label: 'Basic time picker',
					//onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue
				}),
				w(TimePicker, {
					clearable: true,
					end: '23:59',
					label: 'Basic time picker (native)',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue,
					useNativeElement: true
				}),
				w(TimePicker, {
					clearable: true,
					disabled: true,
					end: '23:59',
					label: 'Disabled time picker',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue
				}),
				w(TimePicker, {
					clearable: true,
					disabled: true,
					end: '23:59',
					label: 'Disabled time picker (native)',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue,
					useNativeElement: true
				})
			])
		*/
		]);
	}
}
