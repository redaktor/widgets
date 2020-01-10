import { w, v } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { theme } from '@dojo/framework/core/mixins/Themed';

import { Material, Size } from './widgets/common/util';
import Icon from './widgets/icon';
import Toolbar from './widgets/toolbar';
import Container from './widgets/container';
import SplitPane from './widgets/split-pane';
import Tabs from './demoWidgets/Tabs';
import Accordion, { AccordionProperties } from './demoWidgets/Accordion';

import * as css from './styles/app.m.css';
//import * as uiCss from './widgets/themes/redaktor-default/_ui.m.css';
import * as colorCss from './widgets/themes/redaktor-default/_color.m.css';

export interface AppProperties extends AccordionProperties {}

@theme(css)
export default class App extends WidgetBase<AppProperties> {
	private _paneSize = 360;
	private _size: any = 'default';
	private _material: any = 'light';
	private _baselineDebug = false;

	private _onResize(size: number) {
		this._paneSize = size;
		this.invalidate();
	}
	private _onSizeClick(evt: MouseEvent) {
		this._size = (<any>evt.target).dataset.size;
		this.invalidate();
	}
	private _onMaterialClick(evt: MouseEvent) {
		/*console.log('material', (<any>evt.target).dataset.color);*/
		this._material = (<any>evt.target).dataset.color;
		this.invalidate();
	}
	private _onBaselineClick(evt: MouseEvent) {
		this._baselineDebug = !this._baselineDebug;
		this.invalidate();
	}
	private _renderMaterials() {
		return v('div', {
				classes: css.colorHolder
			},
			Object.keys(Material).map((c: string) => v('div', {
				'data-color': c,
				title: c,
				classes: [css.colorField, (<any>colorCss)[`${c}_material`]],
				style: `background: var(--bg);`,
				onclick: this._onMaterialClick
			}))
		)
	}
	private _renderSizes() {
		return v('div', {
				classes: css.sizeHolder
			},
			Object.keys(Size).map((s: string) => v('div', {
				'data-size': s,
				title: s,
				classes: [
					(<any>css)[`size-${s}`],
					s === this._size ? css.sizeActive : null,
					css.sizeField
				],
				onclick: this._onSizeClick
			}))
		)
	}
	render() {
		const {
			themes,
			currentTheme,
			onThemeChange
		} = this.properties;

		return [
			w(Container, {
				/*extraClasses: {root: css.app},*/
				material: this._material
			}, [
				v('div', { classes: css.toolbarHolder }, [
					w(Toolbar, {
						collapseWidth: 700,
						heading: 'Widget Showcase'
					}, [
						v('div', {
							classes: css.debugBaseLineIcon,
							onclick: this._onBaselineClick
						}, [
							w(Icon, {type: 'barsIcon'})
						]),
						this._renderMaterials(),
						this._renderSizes()
					])
				]),
				v('div', { classes: css.splitPaneHolder }, [
					w(SplitPane, {
						size: this._paneSize,
						material: this._material,
						key: 'split-pane',
						direction: SplitPane.Direction.column,
						onResize: this._onResize
					}, [
						w(Accordion, {
							themes,
							currentTheme,
							onThemeChange
						}),
						w(Tabs, {
							size: this._size
						})

					])
				]),
				v('div', { classes: this._baselineDebug ? css.debugBaseLine : null })
			])
		];
	}
}
