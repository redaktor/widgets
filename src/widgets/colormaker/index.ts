/** based on https://github.com/sdras/csscolorgenerator */
//import { Direction } from './interfaces';
import { GlobalEvent } from '../global-event/index';
import {
	v, w, DNode, theme, RedaktorWidgetBase, ThemedProperties, customElement
} from '../common/Widget';
import { Material, materialClass } from '../common/util';
import Container from '../container/index';
import Control from '../container/control';
//import TextInput from '../text-input';

import * as controlCss from '../themes/redaktor-default/control.m.css';
import * as css from './styles/colormaker.m.css';

export interface ColormakerProperties extends ThemedProperties {
  label?: string;
  comment?: string;
  selected?: number;
  material?: Material | keyof typeof Material;
	onResize?(): void; /* TODO FIXME (size: number) */
}

@theme(css)
@customElement<ColormakerProperties>({
	tag: 'redaktor-Colormaker',
	properties: [ 'theme', 'material', 'extraClasses' ],
	events: [ 'onResize' ]
})
export default class Colormaker <P extends ColormakerProperties = ColormakerProperties>
extends RedaktorWidgetBase<P> {

  protected render(): DNode {
		const { material = 'dark' } = this.properties

		return w(Container, {
			material,
			title: 'Color Maker',
			padding: 1,
			controls: [
				w(Control, { name: 'colorSettings', mode: 'settingsToggle', checked: true }),
				w(Control, { name: 'colorCode', mode: 'metaToggle' })
			],
			meta: w(Container, { material, padding: 1, spacing: 1 }, [

			])
		}, [
			v('div', {
				key: 'root',
	      classes: [
					controlCss.container,
					...this.theme([css.root]),
					...this.getSchemaClasses(css, true)
				]
	    }, [

      // SETTINGS Section
			v('div', { classes: controlCss.settings }, [
				/*
				w(Settings, {
	        key: 'settingsSection',
					label, comment, row, col,
	        onChange: (t: SettingsChange, v: any) => { console.log(t,v); this[t] = v; }
	      })
				*/
			]),

      // Color Container
      v('div', { key: 'colorContainer', classes: [
				css.colorContainer,
				materialClass(material)
			] }, [
        v('section', {
          key: 'color',
					//id: 'colorxy',
          classes: [ css.color, controlCss.content ],
          //style: `${styles.col} ${styles.row} ${styles.gap}`
          /* TODO
          @touchstart.prevent='delegatedTouchPlaceChild'
          @touchend.prevent='delegatedTouchPlaceChild'
          */
        }, [])
			]),
      w(GlobalEvent, {
        key: 'global',
        window: { resize: this._onResize }
      }),
      ...this.children
			])
		]);
  }

  private _onResize = () => {
		this.properties.onResize && this.properties.onResize(); /* TODO FIXME (size: number) */
	}
}
