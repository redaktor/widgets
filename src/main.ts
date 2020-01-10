import { ProjectorMixin } from '@dojo/framework/core/mixins/Projector';
import { registerThemeInjector } from '@dojo/framework/core/mixins/Themed';
import { Registry } from '@dojo/framework/core/Registry';
import App from './App';
import r from './widgets/themes/redaktor-default';
import Injector from '@dojo/framework/core/Injector';
import ResizeObserver from 'resize-observer-polyfill';
//import '@dojo/framework/shim';

const themes: { [index: string]: any } = {
	r,
	vanilla: undefined
};

const registry = new Registry();
const themeContext = registerThemeInjector(r, registry);

registry.defineInjector('theme-context', () => {
	return () => ({
		get: () => themeContext,
		set: (theme: string) => themeContext.set(theme)
	});
});

let initialAppState = {
	registry,
	themes: Object.keys(themes),
	currentTheme: 'redaktor-default',
	onThemeChange: _onThemechange
};



const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties(initialAppState);

function _onThemechange(theme: string) {
	themeContext.set(themes[theme]);
	projector.setProperties({
		...initialAppState,
		currentTheme: theme
	});
}
projector.append();
