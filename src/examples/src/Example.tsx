import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import myTheme from '../../theme/material';
import * as css from './Example.m.css';

interface ExampleProperties {
	hasFullscreen?: boolean;
	spaced?: boolean;
}
const factory = create({ theme, icache }).properties<ExampleProperties>();

export default factory(function({ children, properties, middleware: { theme, icache } }) {
	const [example, ...rest] = children();
	icache.getOrSet('variant', 'dark', false);
	icache.getOrSet('bg', 'var(--paper)', false);
	icache.getOrSet('viewSize', 'minimize', false);
	theme.set(myTheme, icache.get('variant'));
	const altVariant = icache.get('variant') === 'light' ? 'dark' : 'light';
	const altSize = icache.get('viewSize') === 'maximize' ? 'minimize' : 'maximize';
	const themedCss = theme.classes(css);

	document.documentElement.style.setProperty('--color-baseline',
		`var(--color-baseline-${icache.get('variant')}`);
	document.documentElement.style.setProperty('--surface',
		icache.get('variant') === 'light' ? '#fff' : '#000');

	const { hasFullscreen = false, spaced = false } = properties();
	return (
		<virtual>
			<nav classes={themedCss.nav}>
				<button onclick={() => {(document.querySelector('#app') as any).classList.toggle("debug")}}>baseline</button>
				<button onclick={() => { icache.set('variant', altVariant) } }>
					{altVariant}
				</button>
				<label><input type="radio" name="bg" value="surface" onclick={() => { icache.set('bg', 'var(--surface)') } } /> surface</label>
				<label><input type="radio" name="bg" value="bg" onclick={() => { icache.set('bg', 'var(--bg)') } } /> bg</label>
				<label><input type="radio" name="bg" value="paper" onclick={() => { icache.set('bg', 'var(--paper)') } } checked /> paper</label>
				<label><input type="radio" name="bg" value="uibg" onclick={() => { icache.set('bg', 'var(--ui-bg)') } } /> ui</label>

				{hasFullscreen && <button onclick={() => {
					(document.querySelector('.markdown + .hidden') as any).classList.toggle("markdownFullscreen");
					(document.querySelector('.z-90.hidden') as any).classList.toggle("markdownFullscreen");
					(document.querySelector('.markdown') as any).classList.toggle("markdownFullscreen");
					icache.set('viewSize', altSize);
				}}>
					{altSize}
				</button>}
			</nav>
			<div style={`--example-bg: ${icache.get('bg')};`} classes={[themedCss.root, spaced ? themedCss.spaced : null, theme.variant()]}>
				{example}
			</div>
			{...rest}
		</virtual>
	);
});
