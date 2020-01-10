import { theme, customElement } from '../common/Widget';
import TextInputBase, { TextInputProperties as TIP } from '../baseInput';
import * as css from '../themes/redaktor-default/text-input.m.css';


export interface TextInputProperties extends TIP { }

@theme(css)
@customElement<TextInputProperties>({
	tag: 'redaktor-text-input',
	attributes: [
		'widgetId', 'label', 'placeholder', 'leading', 'trailing', 'controls',
		'type', 'size', 'schema', 'minLength', 'maxLength', 'value', 'name'
	],
	properties: [
		'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
		'autofocus', 'size', 'theme', 'schema', 'extraClasses'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class TextInput extends TextInputBase<TextInputProperties> { }
