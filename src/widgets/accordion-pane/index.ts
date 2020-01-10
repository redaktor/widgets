import { WNode } from '@dojo/framework/core/interfaces';
import {
  DNode, v, WidgetBase, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { Material } from '../common/util';
import { assign } from '@dojo/framework/shim/object';
//import uuid from '../../framework/uuid';
import { after } from './aspect';
import { includes } from '@dojo/framework/shim/array';
import TitlePane from '../title-pane/index';
import * as css from '../themes/redaktor-default/accordion-pane.m.css';

/**
 * @type AccordionPaneProperties
 *
 * Properties that can be set on AccordionPane components
 *
 * @property onRequestClose   Called when the title of an open pane is clicked
 * @property onRequestOpen    Called when the title of a closed pane is clicked
 * @property openKeys         Array of TitlePane keys indicating which panes should be open
 */
export interface AccordionPaneProperties extends ThemedProperties {
  material?: Material | keyof typeof Material;
	onRequestClose?(key: string): void;
	onRequestOpen?(key: string): void;
	openKeys?: string[];
	exclusive?: boolean;
}

@theme(css)
@customElement<AccordionPaneProperties>({
	tag: 'redaktor-accordion-pane',
	properties: [ 'openKeys', 'theme', 'material', 'extraClasses' ],
	events: [ 'onRequestClose', 'onRequestOpen' ]
})
export class AccordionPaneBase<P extends AccordionPaneProperties = AccordionPaneProperties>
extends ThemedBase<P, WNode<TitlePane>> {
	private _id = `a${Date.now()}`//uuid();

	private _assignCallback(child: WNode<TitlePane>, functionName: 'onRequestClose' | 'onRequestOpen',
	callback: (key: string) => void) {
		const existingProperty = child.properties[functionName];
		const property = () => { callback.call(this, `${ child.properties.key }`); };

		return existingProperty ? after(existingProperty, property) : property;
	}

	protected onRequestClose(key: string) {
		const { onRequestClose } = this.properties;
		onRequestClose && onRequestClose(key);
	}

	protected onRequestOpen(key: string) {
		const { onRequestOpen } = this.properties;
		onRequestOpen && onRequestOpen(key);
	}

	protected renderChildren(): DNode[] {
		const { openKeys = [], exclusive = false, theme, material } = this.properties;

		return this.children.filter((child) => child).map((child) => {
			// null checks skipped since children are filtered prior to mapping
			assign(child!.properties, {
				exclusive,
				controlName: `${ this._id }-panecontrol`,
				onRequestClose: this._assignCallback(child!, 'onRequestClose', this.onRequestClose),
				onRequestOpen: this._assignCallback(child!, 'onRequestOpen', this.onRequestOpen),
				open: includes(openKeys, child!.properties.key),
				theme
			});

			return child;
		})
	}

	protected render(): DNode {
		return v('div', { classes: this.theme(css.root) }, this.renderChildren());
	}
}

export default class AccordionPane extends AccordionPaneBase<AccordionPaneProperties> {}
