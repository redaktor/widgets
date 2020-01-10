import { v, theme, customElement } from '../common/Widget';
import CheckBase, { CheckProperties } from '../baseCheck';
import * as css from '../themes/redaktor-default/checkbox.m.css';
import * as uiCss from '../themes/redaktor-default/_ui.m.css';
/**
 * The type of UI to show for this Checkbox
 */
export enum Mode { normal = 'normal', toggle = 'toggle' }
/**
 * @type CheckboxProperties
 *
 * Properties that can be set on a Checkbox component
 *
 * @property checked        Checked/unchecked property of the radio
 * @property mode           The type of user interface to show for this Checkbox
 * @property offLabel       Label to show in the "off" positin of a toggle
 * @property value           The current value
 */
export interface CheckboxProperties extends CheckProperties {
	mode?: Mode | keyof typeof Mode;
}
@theme(css)
@customElement<CheckboxProperties>({
	tag: 'redaktor-checkbox',
	attributes: [ 'label', 'value', 'mode', 'offLabel' ],
	properties: [
		'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
		'size', 'theme', 'schema', 'extraClasses', 'checked'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
		'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class Checkbox extends CheckBase<CheckboxProperties> {
	protected renderToggle() {
		return [ v('div', { key: 'toggle', classes: this.theme(css.toggleSwitch) }) ]
	}
  protected getRootClasses() {
    return [
      ...this._getRootClasses(css),
      ...this.getSizeClasses()
    ]
  }
	protected renderContent() {
		return this.properties.mode !== Mode.toggle ? this.renderIcon() : this.renderToggle();
	}
	protected getModifierClasses() {
		return this.properties.mode !== Mode.toggle ? [css.normal] : [css.toggle]
	}
	protected getInnerClasses(): any[] {
		return [
      this.theme(css.inner),
      this.properties.mode !== Mode.toggle ? uiCss.square : uiCss.rectangle
    ]
	}
}
