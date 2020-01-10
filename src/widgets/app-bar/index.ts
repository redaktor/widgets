import {
  CustomAriaProperties, PointerEventProperties, RedaktorProperties
} from '../common/interfaces';
import { DNode, v, RedaktorWidgetBase, theme, customElement } from '../common/Widget';
import { formatAriaProperties } from '../common/util';
import * as baseCss from '../common/styles/base.m.css';
import * as css from '../themes/redaktor-default/app-bar.m.css';

/**
 * @type AppBarProperties
 *
 * Properties that can be set on an AppBar component
 *
 * @property position           The positioning type. Sticky falls back to static.
 *
 */
export interface AppBarProperties extends RedaktorProperties,
 PointerEventProperties, CustomAriaProperties {
  position: 'fixed' | 'absolute' | 'sticky' | 'static'
}

@theme(css)
@customElement<AppBarProperties>({
	tag: 'dojo-icon',
	properties: [
		'theme',
		'aria',
		'extraClasses'
	],
	attributes: [ 'position' ]
})
export class AppBarBase<P extends AppBarProperties = AppBarProperties>
extends RedaktorWidgetBase<P> {
	render(): DNode {
		const { aria = {}, position = 'fixed' } = this.properties;
		return v('div', {
      classes: [ this.theme(css.root),
				...this.getSchemaClasses(css),
				...this.getSizeClasses(css)
      ]
    }, this.children);
	}
}

export default class AppBar extends AppBarBase<AppBarProperties> {}
