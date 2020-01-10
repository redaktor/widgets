import AccordionPane, { AccordionPaneProperties } from '../widgets/accordion-pane';
import TitlePane from '../widgets/title-pane';
import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { Set } from '@dojo/framework/shim/Set';
import CalendarPane from './panes/CalendarPane';
import DialogPane from './panes/DialogPane';
import ThemePane, { ThemePaneProperties } from './panes/ThemePane';

export interface AccordionProperties extends ThemePaneProperties {};

export default class Accordion extends WidgetBase<AccordionProperties> {
	private _openKeys = new Set<string>(['dialog-title-pane']);

	private _requestOpen(key: string) {
		this._openKeys.add(key);
		// do stuff
	}

	private _requestClose(key: string) {
		this._openKeys.delete(key);
		// do stuff
	}

	render() {
		const {
			themes,
			currentTheme,
			onThemeChange
		} = this.properties;

		return w(AccordionPane, {
			//material: 'blue',
			exclusive: true,
			onRequestOpen: this._requestOpen,
			onRequestClose: this._requestClose,
			openKeys: Array.from(this._openKeys)
		}, [
			w(TitlePane, {
				title: 'Theme',
				key: 'theme-title-pane'
			}, [ w(ThemePane, {
				themes,
				currentTheme,
				onThemeChange
			}) ]),
			w(TitlePane, {
				title: 'Calendar',
				key: 'calendar-title-pane'
			}, [ w(CalendarPane, {}) ]),
			w(TitlePane, {
				title: 'Dialog',
				key: 'dialog-title-pane'
			}, [ w(DialogPane, {}) ])
		])

	}
}
