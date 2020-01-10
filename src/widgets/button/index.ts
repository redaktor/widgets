import { theme, customElement } from '../common/Widget';
import { CustomElementChildType } from '@dojo/framework/core/registerCustomElement';
import ClickBase, { ClickProperties/*, ButtonType*/ } from '../baseClick';
import * as css from '../themes/redaktor-default/button.m.css';

/**
 * @type ButtonProperties
 *
 * Properties that can be set on a Button component
 *
 * @property disabled       Whether the button is disabled or clickable
 * @property popup       		Controls aria-haspopup, aria-expanded, and aria-controls for popup buttons
 * @property name           The button's name attribute
 * @property pressed        Indicates status of a toggle button
 * @property type           Button type can be "submit", "reset", "button", or "menu"
 * @property value          Defines a value for the button submitted with form data
 */
export interface ButtonProperties extends ClickProperties { }

@theme(css)
@customElement<ButtonProperties>({
	tag: 'redaktor-button',
	childType: CustomElementChildType.TEXT,
	attributes: [ 'id', 'name', 'value' ],
	properties: [
		'disabled', 'size', 'depth', 'schema', 'pressed', 'popup', 'theme', 'aria', 'extraClasses'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
		'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class Button extends ClickBase<ClickProperties> {}
