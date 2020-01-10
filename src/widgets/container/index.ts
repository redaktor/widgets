import { RedaktorProperties } from '../common/interfaces';
import { DNode, v, w, RedaktorWidgetBase, theme/*, customElement*/ } from '../common/Widget';
import { Material, materialClass } from '../common/util';
import * as css from '../themes/redaktor-default/container.m.css';
import * as controlCss from '../themes/redaktor-default/control.m.css';
import { GlobalEvent } from '../global-event/index';
//import { auto } from '@dojo/framework/core/diff';
//import { diffProperty } from '@dojo/framework/core/decorators/diffProperty';
import uuid from '../../framework/uuid';

// https://jsfiddle.net/eg4dk38o/
// TODO control order : close, maxmin, maximize, minmax, minimize + others

/**
 * @type ContainerProperties
 *
 * Properties that can be set on a Container component
 *
 * @property material
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 */
export interface ContainerProperties extends RedaktorProperties {
  spacing?: number | string | (number | string)[];
  padding?: number | string | (number | string)[];
  material?: Material | keyof typeof Material;
  controls?: DNode[]; /* TODO */
  meta?: DNode;
  title?: DNode;
	onResize?(): void; /* TODO FIXME (size: number) */
}
/*
required?: boolean;
disabled?: boolean;
readOnly?: boolean;
invalid?: boolean;
responsive?: boolean;
size?: Sizes | undefined;
schema?: any; // MaterialSchema | keyof typeof MaterialSchema; // TODO
filled?: boolean;
outlined?: boolean;
shaped?: boolean;
---
getSizeClasses
getSchemaClasses
getDisabledClass
getStyleClasses -> filled, outlined, shaped
*/
@theme(css)
/*@customElement<ContainerProperties>({
	tag: 'redaktor-container',
	properties: [ 'theme', 'material', 'extraClasses' ],
	events: [ 'onResize' ]
})*/
export class ContainerBase<P extends ContainerProperties = ContainerProperties> extends RedaktorWidgetBase<P> {
  private id = uuid();

	protected render(): DNode {
    const { controls = [], meta = '', title } = this.properties;
    let l = '';
    const style = ['spacing', 'padding'].reduce((s, k: keyof ContainerProperties) => {
      const v = this.properties[k];
      if (!v) { return '' }
      let arr = (Array.isArray(v) ? v : [v]).slice(0,4);
      const L = arr.length;
      arr = arr.map((raw: number) => {
        return !raw ? 0 : (isNaN(raw) ? raw : `calc(var(--line, 16px) * ${raw})`);
      });
      if (k === 'padding') { l = (L !== 3) ? arr[L-1] : arr[1] }
      return `${s} --r-${k}: ${arr.join(' ').trim()};`
    }, '') + (!l ? '' : ` --r-l: ${l}`);

    return v('div', {
      style,
      classes: [
        controlCss.container,
        ...this.theme([css.root]),
        ...this.getSchemaClasses(css, true),
        ...this.getStyleClasses(css),
        this.getDisabledClass(css),
        materialClass(this.properties.material)
      ],
			key: 'root'
		}, [
      ...controls,
      !!controls ? v('div', { classes: controlCss.end }) : null,
      !!title ? (typeof title === 'string' ?
        v('h5', { classes: [css.title, !!controls ? controlCss.title : null] }, [title]) :
        title) : null,
      v('div', {
        classes: [ css.meta, !!controls ? controlCss.meta : null ]
      }, [ meta ]),
			w(GlobalEvent, {
				key: 'global',
				window: { resize: this._onResize }
			}),
			v('div', {
        classes: [ css.content, !!controls ? controlCss.content : null ]
      }, this.children)
		]);
	}

	private _onResize = () => {
		this.properties.onResize && this.properties.onResize(); /* TODO FIXME (size: number) */
	}
}

export default class Container extends ContainerBase<ContainerProperties> {}
