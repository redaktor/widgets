import { DNode, v, RedaktorWidgetBase, theme, customElement } from '../common/Widget';
import { CustomAriaProperties, RedaktorProperties } from '../common/interfaces';
import { formatAriaProperties, Size, MaterialSchema } from '../common/util';
import * as baseCss from '../common/styles/base.m.css';
import * as css from '../themes/redaktor-default/label.m.css';

/**
 * @type LabelProperties
 *
 * Properties that can be set on a Label component
 *
 * @property forId     ID to explicitly associate the label with an input element
 * @property disabled
 * @property focused
 * @property readOnly
 * @property required
 * @property valid
 * @property hidden
 * @property muted
 */
export interface LabelProperties extends RedaktorProperties, CustomAriaProperties {
	forId?: string;
	disabled?: boolean;
	focused?: boolean;
	readOnly?: boolean;
	required?: boolean;
	valid?: boolean;
	hidden?: boolean;
	muted?: boolean;
  style?: any;
  tabIndex?: number;
}

@theme(css)
@customElement<LabelProperties>({
	tag: 'redaktor-label',
	properties: [
    'theme', 'schema', 'size', 'aria', 'extraClasses', 'focused',
    'disabled', 'readOnly', 'required', 'valid', 'hidden', 'muted'
  ],
	attributes: [],
	events: []
})
export class LabelBase<P extends LabelProperties = LabelProperties> extends RedaktorWidgetBase<P> {
  protected _rootElement = 'label';

	protected getRootClasses(): (string | null)[] {
		const { focused = false, muted, required, schema, size } = this.properties;

		return [
			css.root,
      this.getDisabledClass(css),
      this.getValidClass(css),
      focused && (schema in MaterialSchema) ? (<any>css)[schema] : null,
			focused ? css.focused : null,
			required ? css.required : null,
			muted ? css.muted : null
		].concat(size in Size ? this.getSizeClasses(css) : []);
	}

	render(): DNode {
		const { aria = {}, /*size = 'medium', */forId, style, tabIndex, hidden } = this.properties;

		return v(this._rootElement, {
			...formatAriaProperties(aria),
			classes: [
				...this.theme(this.getRootClasses()),
				hidden ? baseCss.visuallyHidden : null
			],
			for: forId,
      style,
      tabIndex
		}, this.children);
	}
}

export default class Label extends LabelBase<LabelProperties> {}
