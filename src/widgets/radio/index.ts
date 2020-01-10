import { DNode, theme, customElement } from '../common/Widget';
import CheckBase, { CheckProperties } from '../baseCheck';
import * as css from '../themes/redaktor-default/radio.m.css';

/**
 * @type RadioProperties
 *
 * Properties that can be set on a Radio component
 *
 * @property checked          Checked/unchecked property of the radio
 * @property value           The current value
 */
export interface RadioProperties extends CheckProperties { }

@theme(css)
@customElement<RadioProperties>({
	tag: 'redaktor-radio',
	attributes: [ 'widgetId', 'label', 'value', 'name' ],
	properties: [
		'aria', 'disabled', 'invalid', 'required', 'readOnly', 'labelHidden',
		'size', 'theme', 'schema', 'extraClasses', 'checked'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
		'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export class RadioBase<P extends RadioProperties = RadioProperties> extends CheckBase<P> {
	protected _type = 'radio';
  protected getInputClasses() { return [css.input, ...this.getSchemaClasses(css)] }
  protected getInnerClasses() { return [this.theme(css.inner)] }
  protected getModifierClasses() { return [css.normal, css.radio] }
  protected renderContent(): DNode[] { return this.children }
	protected getRootClasses() {
    const { label, offLabel } = this.properties;
    return [
      !label && !offLabel ? css.noLabel : null,
      ...this._getRootClasses(css),
      ...this.getSizeClasses(),
    ]
  }
}

export default class Radio extends RadioBase<RadioProperties> {}
