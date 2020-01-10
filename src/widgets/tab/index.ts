import {
  DNode, v, w, WidgetBase, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { CustomAriaProperties } from '../common/interfaces';
import { formatAriaProperties } from '../common/util';
import * as css from '../themes/redaktor-default/tab-controller.m.css';
import { CustomElementChildType } from '@dojo/framework/core/registerCustomElement';

/**
 * @type TabProperties
 *
 * Properties that can be set on a Tab component
 *
 * @property closeable    Determines whether this tab can be closed
 * @property disabled     Determines whether this tab can become active
 * @property id           ID of this underlying DOM element
 * @property key          A unique identifier for this Tab within the TabController
 * @property label        Content to show in the TabController control bar for this tab
 * @property labelledBy   ID of DOM element that serves as a label for this tab
 */
export interface TabProperties extends ThemedProperties, CustomAriaProperties {
	closeable?: boolean;
	disabled?: boolean;
	id?: string;
	key: string;
	label?: DNode;
	show?: boolean;
	labelledBy?: string;
}

@theme(css)
@customElement<TabProperties>({
	tag: 'redaktor-tab',
	childType: CustomElementChildType.NODE,
	properties: [ 'theme', 'aria', 'extraClasses', 'closeable', 'disabled', 'label', 'show' ],
	attributes: [ 'key', 'labelledBy', 'id', 'label' ],
	events: [ ]
})
export class TabBase<P extends TabProperties = TabProperties> extends ThemedBase<P> {
	render(): DNode {
		const {
			aria = {},
			id,
			labelledBy,
			show = false
		} = this.properties;

		return v('section', {
			...formatAriaProperties(aria),
			'aria-labelledby': labelledBy,
			classes: this.theme([css.tab/*, !show ? css.hidden : null*/]),
			id,
			role: 'tabpanel'
		}, this.children);
	}
}

export default class Tab extends TabBase<TabProperties> {}
