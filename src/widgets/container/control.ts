//import { RedaktorProperties } from '../common/interfaces';
import { DNode, v, RedaktorWidgetBase, theme/*, customElement*/ } from '../common/Widget';
import { Size } from '../common/util';
import * as css from '../themes/redaktor-default/control.m.css';
export type ControlMode = 'back'|'bookmark'|'close'|'down'|'enter'|'first'|
  'forward'|'language'|'last'|'levelUp'|'maxmin'|'minmax'|'metaToggle'|
  'moreHorizontal'|'moreVertical'|'settingsToggle'|'star'|'state'|'tl'|'todo'|'up';
/**
 * @type ControlProperties
 *
 * Properties that can be set on a Control component
 *
 * @property material
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 */
export interface ControlProperties {
  name: string | number;
  mode: ControlMode;
  size?: Size;
  checked?: boolean;
  onClick?(event: MouseEvent): void;
}


@theme(css)
/*@customElement<ControlProperties>({
	tag: 'redaktor-container',
	properties: [ 'theme', 'material', 'extraClasses' ],
	events: [ 'onResize' ]
})*/
export default class Control<P extends ControlProperties = ControlProperties>
extends RedaktorWidgetBase<P> {
  protected radios = { close:1, minimize:1, maximize:1, enter:1, levelUp:1 };
	protected render(): DNode[] {
    const { name, mode, onClick, checked = false } = this.properties;
    const type = this.radios.hasOwnProperty(mode) ? 'radio' : 'checkbox';
		return [
      v('input', {
        type,
        checked,
        classes: [ css.control, css[mode] ],
        id: `${name}-${mode}`,
        name: `${name}`,
        value: mode
      }),
      v('label', {
        key: 'root',
        classes: [
          this.theme(css.root),
          css[mode],
          this.getDisabledClass(css),
          ...this.getSizeClasses()
        ],
        for: `${name}-${mode}`,
        onClick
      }, [
        v('div', { classes: [ css.inner ] }, [
          v('div', { classes: [ css.icon ] })
        ])
      ])
    ]
	}
}
