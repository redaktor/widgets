import {
  DNode, v, w, WidgetBase, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { Material } from '../common/util';
import GlobalEvent from '../global-event/index';
//import uuid from '../../framework/uuid';
import Icon from '../icon/index';
import * as fixedCss from './styles/title-pane.m.css';
import * as css from '../themes/redaktor-default/title-pane.m.css';

/**
 * @type TitlePaneProperties
 *
 * Properties that can be set on a TitlePane component
 *
 * @property closeable          If false the pane will not collapse in response to clicking the title
 * @property headingLevel       'aria-level' for the title's DOM node
 * @property onRequestClose     Called when the title of an open pane is clicked
 * @property onRequestOpen      Called when the title of a closed pane is clicked
 * @property open               If true the pane is opened and content is visible
 * @property title              Title to display above the content
 */
export interface TitlePaneProperties extends ThemedProperties {
	closeable?: boolean;
	headingLevel?: number;
  material?: Material | keyof typeof Material;
	onRequestClose?(key: string | number | undefined): void;
	onRequestOpen?(key: string | number | undefined): void;
	open?: boolean | undefined;
	exclusive?: boolean | undefined;
	controlName?: string;
	title: string;
}

@theme(css)
@customElement<TitlePaneProperties>({
	tag: 'redaktor-title-pane',
	properties: [ 'theme', 'material', 'extraClasses', 'open', 'closeable', 'headingLevel' ],
	attributes: [ 'title', 'key' ],
	events: [
		'onRequestClose',
		'onRequestOpen'
	]
})
export class TitlePaneBase<P extends TitlePaneProperties = TitlePaneProperties> extends ThemedBase<P> {
	private _id = `t${Date.now()}`//uuid();
	private _open: boolean;

	private _onWindowResize = () => {
		this.invalidate();
	}

	private _onTitleClick(event: MouseEvent) {
		event.stopPropagation();
		this._toggle();
	}

	private _toggle() {
		const {
			closeable = true,
			key,
			onRequestClose,
			onRequestOpen,
			open = true
		} = this.properties;
		if (!closeable) { return }
		if (open) {
			onRequestClose && onRequestClose(key);
		} else {
			onRequestOpen && onRequestOpen(key);
		}
	}

	protected getButtonContent(): DNode {
		return this.properties.title;
	}

	protected getFixedModifierClasses(): (string | null)[] {
		const { closeable = true } = this.properties;
		return [
			closeable ? fixedCss.closeableFixed : null
		];
	}

	protected getModifierClasses(): (string | null)[] {
		const { closeable = true } = this.properties;
		return [ closeable ? css.closeable : null ];
	}

	protected getPaneContent(): DNode[] {
		return this.children;
	}

	protected renderExpandIcon(): DNode {
		const { open = true, theme } = this.properties;
		return v('span', { classes: this.theme(css.arrow) }, [
			w(Icon, { type: 'rightIcon', theme })
		]);
	}

	protected render(): DNode {
		const {
			headingLevel,
			material,
			controlName = null,
			exclusive = false,
			closeable = true,
			open = true
		} = this.properties;

		let transition = false;
		let ctrlNode = null;
		let ctrlId = '';
		if (open !== this._open) {
			transition = true;
			this._open = open;
		}
		if (controlName) {
			ctrlId = `${controlName}-${this._id}`;
			const controlProps: any = {
				id: ctrlId,
				type: exclusive ? 'radio' : 'checkbox',
				name: controlName,
				classes: this.theme([css.rPane]),
				checked: this._open
			};
			if (exclusive && controlName) {
				controlProps.name = controlName
			}
			ctrlNode = v('input', controlProps);
		}
		let classes = this.theme([css.root, exclusive ? css.exclusive : null]);
		if (material) {
			classes = classes.concat(this.theme([(<any>css)[material], css.material]));
		}
		return v('div', { classes }, [
			w(GlobalEvent, { key: 'global', window: { resize: this._onWindowResize } }),
			ctrlNode,
			v(controlName ? 'label' : 'div', {
				'aria-level': headingLevel ? `${headingLevel}` : null,
				for: ctrlId,
				classes: [
					...this.theme([ css.title, ...this.getModifierClasses() ]),
					fixedCss.titleFixed,
					...this.getFixedModifierClasses()
				],
				role: 'heading'
			}, [
				v('button', {
					'aria-controls': `${this._id}-content`,
					'aria-expanded': `${open}`,
					disabled: !closeable,
					classes: [ fixedCss.titleButtonFixed, ...this.theme([css.titleButton]) ],
					id: `${this._id}-title`,
					type: 'button',
					onclick: this._onTitleClick
				}, [
					this.renderExpandIcon(),
					this.getButtonContent()
				])
			]),
			v('div', {
				'aria-hidden': open ? null : 'true',
				'aria-labelledby': `${this._id}-title`,
				classes: [
					...this.theme([ css.content, transition ? css.contentTransition : null ]),
					fixedCss.contentFixed
				],
				id: `${this._id}-content`,
				key: 'content',
			}, this.getPaneContent())
		]);
	}
}

export default class TitlePane extends TitlePaneBase<TitlePaneProperties> {}
