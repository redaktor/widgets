import {
  DNode, v, w, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { diffProperty } from '@dojo/framework/core/decorators/diffProperty';
import { keyName } from '../common/util';
import { reference } from '@dojo/framework/core/diff';
import { I18nMixin } from '@dojo/framework/core/mixins/I18n';
import Focus from '@dojo/framework/core/meta/Focus';
import uuid from '../../dojo/core/uuid';

import Icon from '../icon/index';
import Label from '../label/index';
import Listbox from '../listbox/index';
import TextInput, { TextInputProperties } from '../text-input';
import { MaterialSchema } from '../common/util';
import commonBundle from '../common/nls/common';
import { CommonMessages, LabeledProperties } from '../common/interfaces';

import * as css from '../themes/redaktor-default/combobox.m.css';

/**
 * @type ComboBoxProperties
 *
 * Properties that can be set on a ComboBox component
 *
 * @property clearable          Determines whether the input should be able to be cleared
 * @property disabled           Prevents user interaction and styles content accordingly
 * @property getResultLabel     Can be used to get the text label of a result based on the underlying result object
 * @property getResultSelected  Can be used to highlight the selected result. Defaults to checking the result label.
 * @property widgetId            Optional id string for the combobox, set on the text input
 * @property inputProperties    TextInput properties to set on the underlying input
 * @property invalid            Determines if this input is valid
 * @property isResultDisabled   Used to determine if an item should be disabled
 * @property label              Label to show for this input
 * @property onBlur             Called when the input is blurred
 * @property onChange           Called when the value changes
 * @property onFocus            Called when the input is focused
 * @property onMenuChange       Called when menu visibility changes
 * @property onRequestResults   Called when results are shown; should be used to set `results`
 * @property openOnFocus        Determines whether the result list should open when the input is focused
 * @property readOnly           Prevents user interaction
 * @property required           Determines if this input is required, styles accordingly
 * @property results            Results for the current search term; should be set in response to `onRequestResults`
 * @property value              Value to set on the input
 */
export interface ComboBoxProperties extends ThemedProperties, LabeledProperties {
	clearable?: boolean;
	disabled?: boolean;
	getResultLabel?(result: any): string;
	getResultSelected?(result: any, index: number, activeIndex: number): boolean;
	widgetId?: string;
	inputProperties?: TextInputProperties;
	invalid?: boolean;
	isResultDisabled?(result: any): boolean;
	onBlur?(value: string, key?: string | number): void;
	onChange?(value: string, key?: string | number): void;
	onFocus?(value: string, key?: string | number): void;
	onMenuChange?(open: boolean, key?: string | number): void;
	onRequestResults?(key?: string | number): void;
	openOnFocus?: boolean;
	readOnly?: boolean;
	required?: boolean;
	results?: any[];
  resultsRequired?: boolean;
  schema?: MaterialSchema | keyof typeof MaterialSchema;
	value?: string;
}

// Enum used when traversing items using arrow keys
export enum Operation {
	increase = 1,
	decrease = -1
}
//extends TextInputBase<EnhancedTextInputProperties> {
export const i18nBase = I18nMixin(ThemedBase);

@theme(css)
@diffProperty('results', reference)
@customElement<ComboBoxProperties>({
	tag: 'redaktor-combo-box',
	properties: [
		'theme', 'extraClasses', 'labelAfter', 'labelHidden', 'clearable',
    'required', 'disabled', 'readOnly', 'invalid', 'isResultDisabled',
		'openOnFocus', 'inputProperties', 'results', 'resultsRequired'
	],
	attributes: [ 'widgetId', 'label', 'value' ],
	events: [ 'onBlur', 'onChange', 'onFocus', 'onMenuChange', 'onRequestResults' ]
})
export class ComboBoxBase<P extends ComboBoxProperties = ComboBoxProperties> extends i18nBase<P, null> {
	private _activeIndex = 0;
	private _callInputFocus = false;
	private _ignoreBlur: boolean | undefined;
	private _idBase = uuid();
	private _menuHasVisualFocus = false;
	private _open: boolean | undefined;
	private _wasOpen: boolean | undefined;
	private _value = '';
	private _defaultValue = '';

	private _closeMenu() {
		this._open = false;
		this.invalidate();
	}
	private _getMenuId() {
		return `${this._idBase}-menu`;
	}

	private _getResultLabel(result: any) {
		const { getResultLabel } = this.properties;
		return getResultLabel ? getResultLabel(result) : `${result}`;
	}
	private _getResultSelected(result: any, index: number) {
		const { getResultSelected } = this.properties;
		return getResultSelected ?
      getResultSelected(result, index, this._activeIndex) : index === this._activeIndex;
	}
	private _getResultId(result: any, index: number) {
		return `${this._idBase}-result${index}`;
	}

	private _onTriggerClick(event: MouseEvent) {
		event.stopPropagation();
		const { disabled, readOnly } = this.properties;
		if (!disabled && !readOnly) {
			this._callInputFocus = true;
			this._openMenu();
		}
	}
	private _onClearClick(event: MouseEvent) {
		event.stopPropagation();
		const { key, onChange } = this.properties;
		this._callInputFocus = true;
    this._value = '';
		this.invalidate();
		onChange && onChange('', key);
	}

	private _onInput(value: string) {
		const { key, disabled, readOnly, onChange } = this.properties;
    this._value = value;
		onChange && onChange(value, key);
		!disabled && !readOnly && this._openMenu();
	}
	private _onInputBlur(event: FocusEvent) {
		const { key, onBlur } = this.properties;
		if (this._ignoreBlur) {
			this._ignoreBlur = false;
			return;
		}
		onBlur && onBlur(this._value, key);
		this._closeMenu();
	}
	private _onInputFocus(value: string) {
		const { key, disabled, readOnly, onFocus, openOnFocus } = this.properties;
		onFocus && onFocus(value, key);
		!disabled && !readOnly && openOnFocus && this._openMenu();
	}

	private _onInputKeyDown(event: KeyboardEvent, preventDefault: () => void) {
		const {
			disabled, readOnly, results = [], isResultDisabled = () => false
		} = this.properties;
		this._menuHasVisualFocus = true;
    const key = keyName(event);
		switch (key) {
			case 'ArrowUp':
				preventDefault();
				this._moveActiveIndex(Operation.decrease);
				break;
			case 'ArrowDown':
				preventDefault();
				if (!this._open && !disabled && !readOnly) {
					this._openMenu();
				} else if (this._open) {
					this._moveActiveIndex(Operation.increase);
				}
				break;
			case 'Escape':
				this._open && this._closeMenu();
				break;
			case 'Enter':
			case ' ':
				if (this._open && results.length > 0) {
					if (isResultDisabled(results[this._activeIndex])) {
						return;
					}
					this._selectIndex(this._activeIndex);
				}
				break;
			case 'Home':
				this._activeIndex = 0;
				this.invalidate();
				break;
			case 'End':
				this._activeIndex = results.length - 1;
				this.invalidate();
				break;
		}
	}

	private _onMenuChange() {
		const { key, onMenuChange } = this.properties;
		if (!onMenuChange) { return }
		this._open && !this._wasOpen && onMenuChange(true, key);
		!this._open && this._wasOpen && onMenuChange(false, key);
	}

	private _onResultHover(): void {
		this._menuHasVisualFocus = false;
		this.invalidate();
	}

	private _onResultMouseDown(event: MouseEvent) {
		event.stopPropagation();
		// Maintain underlying input focus on next render
		this._ignoreBlur = true;
	}

	private _openMenu() {
		const { key, onRequestResults } = this.properties;
		/*this._activeIndex = 0;*/
		this._open = true;
		onRequestResults && onRequestResults(key);
		this.invalidate();
	}

	private _selectIndex(index: number) {
		const { key, onChange, results = [] } = this.properties;
		this._callInputFocus = true;
		this._closeMenu();
		onChange && onChange(this._getResultLabel(results[index]), key);
	}

	private _moveActiveIndex(operation: Operation) {
		const { results = [] } = this.properties;
		if (results.length === 0) {
			this._activeIndex = 0;
			this.invalidate();
			return;
		}
		const total = results.length;
		const nextIndex = (this._activeIndex + operation + total) % total;
		this._activeIndex = nextIndex;
		this.invalidate();
	}

  protected getDisabledClass(): (string | null) {
    const { disabled, readOnly } = this.properties;
    if (disabled === true) { return css.disabled }
    if (readOnly === true) { return css.readonly }
    return css.enabled
  }
	protected getRootClasses(): (string | null)[] {
		const { clearable, invalid } = this.properties;
		const focus = this.meta(Focus).get('root');
		return [
			css.root,
      this.getDisabledClass(),
			this._open ? css.open : null,
			clearable ? css.clearable : null,
			focus.containsFocus ? css.focused : null,
			invalid === true ? css.invalid : null,
			invalid === false ? css.valid : null
		];
	}
  protected getValue(): string {
    const v = this.properties.value;
    if (!this._value) {
      return v ? v : this._defaultValue;
    }
    return this._value ? this._value : this._defaultValue;
  }
	protected renderInput(messages: CommonMessages): DNode {
		const {
			widgetId = this._idBase, theme, schema, label, invalid, readOnly, required, disabled,
      labelHidden, labelAfter, clearable = false, inputProperties = {}, results = []
		} = this.properties;

		const focusInput = this._callInputFocus;
		if (this._callInputFocus) { this._callInputFocus = false }
/*return '' FIXME EVENT:

this.readonlyProp('key', key, event);
this.readonlyProp('option', option, event);
this.readonlyProp('value', option.value, event);
*/
    return w(TextInput, {
      ...inputProperties,
			key: 'textinput',
      aria: {
				activedescendant: this._getResultId(results[this._activeIndex], this._activeIndex),
				controls: this._getMenuId(),
				owns: this._getMenuId()
			},
			widgetId,
      label,
			invalid,
			readOnly,
			required,
			disabled,
			labelHidden,
			labelAfter,
			theme,
      schema,
      value: this.getValue(),
      shouldFocus: focusInput,
			//onBlur: this._onInputBlur,
			//onFocus: this._onInputFocus,
			//onInput: this._onInput,
			onKeyDown: this._onInputKeyDown,
      addonBefore: clearable ? [ this.renderClearButton(messages) ] : [],
      addonAfter: [ this.renderMenuButton(messages) ]
    });

	}

	protected renderClearButton(messages: CommonMessages): DNode {
		const { label = '', disabled, readOnly, theme, schema } = this.properties;
		return v('button', {
			key: 'clear',
			'aria-controls': this._getMenuId(),
			classes: this.theme([
        css.clear,
        (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
      ]),
			disabled: disabled || readOnly,
			type: 'button',
			onclick: (event: MouseEvent) => this._onClearClick(event),
			'aria-label': `${messages.clear} ${label}`
		}, [
			w(Icon, { type: 'closeIcon', theme })
		]);
	}

	protected renderMenuButton(messages: CommonMessages): DNode {
		const { label = '', disabled, readOnly, theme, schema } = this.properties;
		return v('button', {
			key: 'trigger',
			classes: this.theme([
        css.trigger,
        (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
      ]),
			disabled: disabled || readOnly,
			tabIndex: -1,
			type: 'button',
			onclick: (event: MouseEvent) => this._onTriggerClick(event),
			'aria-label': `${messages.open} ${label}`
		}, [
			w(Icon, { type: 'downIcon', theme })
		]);
	}

	protected renderMenu(results: any[]): DNode {
		const { theme, isResultDisabled } = this.properties;
		if (results.length === 0 || !this._open) {
			return null;
		}
		return v('div', {
			key: 'dropdown',
			classes: this.theme(css.dropdown),
			onmouseover: this._onResultHover,
			onmousedown: this._onResultMouseDown
		}, [
			w(Listbox, {
        raised: true,
				key: 'listbox',
				activeIndex: this._activeIndex,
				widgetId: this._getMenuId(),
				visualFocus: this._menuHasVisualFocus,
				optionData: results,
				tabIndex: -1,
				getOptionDisabled: isResultDisabled,
				getOptionId: this._getResultId,
				getOptionLabel: this._getResultLabel,
				getOptionSelected: this._getResultSelected,
				onActiveIndexChange: (index: number) => {
					this._activeIndex = index;
					this.invalidate();
				},
				onOptionSelect: (option: any, index: number) => {
					this._selectIndex(index);
				},
				theme
			})
		]);
	}

	render(): DNode {
		const {
			clearable = false,
			widgetId = this._idBase,
			label,
			invalid,
			readOnly,
			required,
			disabled,
			labelHidden,
			labelAfter,
			theme,
			results = []
		} = this.properties;
		const { messages } = this.localizeBundle(commonBundle);
		const focus = this.meta(Focus).get('root');
		const menu = this.renderMenu(results);
		this._onMenuChange();
		this._wasOpen = this._open;
//console.log(results, menu);
		const controls = [
			v('div', { classes: this.theme(css.controls) }, [ this.renderInput(messages) ]),
			menu
		];
		return v('div', {
			'aria-expanded': this._open ? 'true' : 'false',
			'aria-haspopup': 'true',
			'aria-readonly': readOnly ? 'true' : null,
			'aria-required': required ? 'true' : null,
			classes: this.theme(this.getRootClasses()),
			key: 'root',
			role: 'combobox'
		}, labelAfter ? controls.reverse() : controls);
	}
}

export default class ComboBox extends ComboBoxBase<ComboBoxProperties> {}
