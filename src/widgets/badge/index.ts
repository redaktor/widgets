import {
  CustomAriaProperties, PointerEventProperties, RedaktorProperties
} from '../common/interfaces';
import { DNode, v, RedaktorWidgetBase, theme, customElement } from '../common/Widget';
import { formatAriaProperties } from '../common/util';
import * as baseCss from '../common/styles/base.m.css';
import * as css from '../themes/redaktor-default/app-bar.m.css';

/**
 * @type BadgeProperties
 *
 * Properties that can be set on an AppBar component
 *
 */
export interface BadgeProperties extends RedaktorProperties,
 PointerEventProperties, CustomAriaProperties {

}

@theme(css)
@customElement<BadgeProperties>({
	tag: 'dojo-icon',
	properties: [
		'theme',
		'aria',
		'extraClasses'
	],
	attributes: [ ]
})
export default class Badge<P extends BadgeProperties = BadgeProperties>
extends RedaktorWidgetBase<P> {
	render(): DNode {
		const { aria = {} } = this.properties;
		return v('span', {
      classes: [ this.theme(css.root),
				...this.getSchemaClasses(css),
				...this.getSizeClasses(css)
      ]
    }, this.children);
	}
}
