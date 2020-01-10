import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { Toggle } from '../../widgets/common/interfaces';
import Radio from '../../widgets/radio';

export interface ThemePaneProperties {
	themes: string[];
	currentTheme: string;
	onThemeChange: (theme: string) => void;
}

export default class ThemePane extends WidgetBase<ThemePaneProperties> {

	private _radioChange(evt: Toggle) {
		this.properties.onThemeChange && this.properties.onThemeChange(evt.value);
	}

	render() {
		const { themes, currentTheme } = this.properties;

		return v('div', [
			v('h3', [ 'Change Theme' ]),
			v('div', themes.map(theme => {
				const checked = currentTheme === theme;
				return w(Radio, {
					key: `${theme}-radio`,
					checked,
					value: theme,
					label: theme,
					name: 'theme-radios',
					onChange: this._radioChange
				})
			}))
		]);
	}
}
