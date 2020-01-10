import {
  DNode, v, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { CustomAriaProperties } from '../common/interfaces';
import { formatAriaProperties } from '../common/util';
import * as baseCss from '../common/styles/base.m.css';
import * as css from '../themes/redaktor-default/icon.m.css';

export type IconType = keyof typeof css;

/**
 * @type IconProperties
 *
 * Properties that can be set on an Icon component
 *
 * @property type           Icon type, e.g. downIcon, searchIcon, etc.
 * @property altText        An optional, visually hidden label for the icon
 */
export interface IconProperties extends ThemedProperties, CustomAriaProperties {
	type: IconType;
	altText?: string;
}

@theme(css)
@customElement<IconProperties>({
	tag: 'dojo-icon',
	properties: [
		'theme',
		'aria',
		'extraClasses'
	],
	attributes: [ 'type', 'altText' ]
})
export class IconBase<P extends IconProperties = IconProperties> extends ThemedBase<P, null> {

	protected renderAltText(altText: string): DNode {
		return v('span', { classes: [ baseCss.visuallyHidden ] }, [ altText ]);
	}

	render(): DNode {
		const {
			aria = {
				hidden: 'true'
			},
			type,
			altText
		} = this.properties;

		return v('span', { classes: this.theme(css.root) }, [
			v('i', {
				...formatAriaProperties(aria),
				classes: this.theme([ css.icon, css[type] ])
			}),
			altText ? this.renderAltText(`${altText}`) : null
		]);
	}
}

export default class Icon extends IconBase<IconProperties> {}
