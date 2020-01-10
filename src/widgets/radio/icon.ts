import { v, theme, customElement } from '../common/Widget';
import CheckBase, { CheckProperties } from '../baseCheck';
import Focus from '@dojo/framework/core/meta/Focus';
import * as css from '../themes/redaktor-default/radio.m.css';

/**
 * @type RadioProperties
 *
 * Properties that can be set on a Radio component
 *
 * @property checked          Checked/unchecked property of the radio
 * @property value           The current value
 */
export interface RadioProperties extends CheckProperties {}

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
	protected getRootClasses() {
    return [
      ...this._getRootClasses(css),
      ...this.getSizeClasses(),
    ]
  }
	protected getModifierClasses() { return [css.normal, css.radio] }
	protected renderInputWrapper() {
		return [
			this.renderInput(),
			v('div', {
				classes: [
					...this.getSchemaClasses(css),
  				...this.getSizeClasses(),
          this.theme(css.inner)
        ]
			}, [])
		]
	}
}

export default class Radio extends RadioBase<RadioProperties> {}
