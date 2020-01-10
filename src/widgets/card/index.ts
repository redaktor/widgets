import {
	RedaktorWidgetBase, RedaktorDimensions, v, w, theme, customElement, DNode
} from '../common/Widget';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { alwaysRender } from '@dojo/framework/core/decorators/alwaysRender';
import {
	RedaktorProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties
} from '../common/interfaces';
import * as css from '../themes/redaktor-default/card.m.css';


import * as uiCss from '../themes/redaktor-default/_ui.m.css';
import Button from '../../widgets/button';
import Icon from '../../widgets/icon';

export interface CardProperties extends RedaktorProperties {
	actionsRenderer?(): RenderResult;
}

@customElement<CardProperties>({
	tag: 'dojo-card',
	properties: ['actionsRenderer']
})
@theme(css)
@alwaysRender()
class Card<P extends CardProperties = CardProperties> extends RedaktorWidgetBase<P> {
	protected render(): DNode {
		const { actionsRenderer } = this.properties;
		const actionsResult = actionsRenderer && actionsRenderer();
		const mb = this.meta(RedaktorDimensions).getOffset('media').marginBottom || 0;
		let c = [
			v('div', {
				classes: this.theme(css.rootAction)
			}, [

				v('div', {
					key: 'media',
					classes: this.theme([css.media, css.mediaSquare]),
					styles: {
						backgroundImage: 'url("https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg")',
						marginBottom: `${mb}px`
					}
				}, [
					v('div', { // figcaption
						classes: this.theme(css.mediaContent)
					}, [
						v('hgroup', [
							v('h4', ['Our changing planet']),
							v('h5', {classes: [uiCss.subtitle, uiCss.muted]}, ['by Kurt Wagner'])
						])
					])
				]),


				v('p', ['Visit ten places on our planet that are undergoing the biggest changes today.']),

				v('div', {
					classes: this.theme([css.actions])
				}, [
					v('div', { classes: this.theme([css.actionButtons]) }, [
						v('div', { classes: this.theme([css.actionButton]) }, [ w(Button, { size: 'small', depth: 'flat' }, [ 'Read' ]) ]),
						v('div', { classes: this.theme([css.actionButton]) }, [ w(Button, { size: 'small', depth: 'flat' }, [ 'Bookmark' ]) ])
					]),

					v('div', { classes: this.theme([css.actionIcons]) }, [
						v('div', { classes: this.theme([css.actionIcon]) }, [ w(Icon, { type: 'searchIcon' }) ]),
						v('div', { classes: this.theme([css.actionIcon]) }, [ w(Icon, { type: 'locationIcon' }) ])
					])

				])
			].concat(<any>this.children))
		];

		return v('span', {
			key: 'root',
			classes: [
				this.theme(css.root),
					...this.getSchemaClasses(css),
					...this.getSizeClasses()
				]
		}, c)

		// TODO actions :
		/*(
			<div key="root" classes={this.theme(css.root)}>
				{this.children}
				{actionsResult && <div classes={this.theme(css.actions)}>{actionsResult}</div>}
			</div>
		);*/
	}
}

export default Card;
