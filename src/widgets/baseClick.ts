import {
	CustomAriaProperties, InputEventProperties, PointerEventProperties,
	KeyEventProperties, RedaktorProperties
} from './common/interfaces';
import { DNode, v, w, Dimensions, RedaktorWidgetBase/*, theme, customElement*/ } from './common/Widget';
import keyboard from './common/events/keyboard';
import { formatAriaProperties, Depth/*, Sizes*/ } from './common/util';
//import { CustomElementChildType } from '@dojo/framework/core/registerCustomElement';
import * as css from './themes/redaktor-default/button.m.css';
import Icon from './icon/index';

export enum ButtonType {
	'submit' = 'submit',
	'reset' = 'reset',
	'button' = 'button',
	'menu' = 'menu'
}

export interface ClickProperties extends RedaktorProperties,
InputEventProperties, PointerEventProperties, KeyEventProperties, CustomAriaProperties {
	id?: string;
	name?: string;
	disabled?: boolean;
	type?: ButtonType | keyof typeof ButtonType;
	depth?: Depth | keyof typeof Depth;
	value?: string;
	pressed?: boolean;
	wide?: boolean;
	popup?: { expanded?: boolean; id?: string; type?: string } | boolean;
}

export default class ClickBase<P extends ClickProperties = ClickProperties> extends RedaktorWidgetBase<P> {
	private _onFocus(event: FocusEvent) {
		this.properties.onFocus && this.properties.onFocus(event);
	}
	private _onBlur(event: FocusEvent) {
		this.properties.onBlur && this.properties.onBlur(event);
	}
	protected _onHover(event: MouseEvent) {
		this.properties.onHover && this.properties.onHover(event);
	}
	private _onMouseDown(event: MouseEvent) {
		event.stopPropagation();
		this.setClickDimensions(event);
		this.properties.onMouseDown && this.properties.onMouseDown(event);
	}
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick(event);
	}
	private _onMouseUp(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onMouseUp && this.properties.onMouseUp(event);
	}
	private _onTouchStart(event: TouchEvent) {
		event.stopPropagation();
		this.setClickDimensions(event);
		this.properties.onTouchStart && this.properties.onTouchStart(event);
	}
	private _onTouchEnd(event: TouchEvent) {
		event.stopPropagation();
		this.properties.onTouchEnd && this.properties.onTouchEnd(event);
	}
	private _onTouchCancel(event: TouchEvent) {
		event.stopPropagation();
		this.properties.onTouchCancel && this.properties.onTouchCancel(event);
	}

	protected _onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const evt = keyboard(event);
		this.properties.onKeyDown && this.properties.onKeyDown(evt, () => { event.preventDefault(); });
	}
	private _onKeyPress(event: KeyboardEvent) {
		event.stopPropagation();
		const evt = keyboard(event);
		this.properties.onKeyPress && this.properties.onKeyPress(evt, () => { event.preventDefault(); });
	}
	private _onKeyUp(event: KeyboardEvent) {
		event.stopPropagation();
		const evt = keyboard(event);
		this.properties.onKeyUp && this.properties.onKeyUp(evt, () => { event.preventDefault(); });
	}

	private setClickDimensions(event: MouseEvent | TouchEvent) {
		const e: any = event;
		const docStyle = document.documentElement.style;
		const elW = this.meta(Dimensions).get('root').offset.width;
		let offset = {x: -1, y: -1};
		if (!!e.targetTouches) {
			const rect = e.target.getBoundingClientRect();
			offset.x = e.targetTouches[0].pageX - rect.left;
			offset.y = e.targetTouches[0].pageY - rect.top;
		} else {
			offset.x = e.offsetX;
			offset.y = e.offsetY;
		}
		if (typeof offset.x === 'number' && offset.x > -1 && !!elW) {
			const btnW = elW / 2 + Math.abs(elW / 2 - offset.x);
			docStyle.setProperty('--redaktor-btn-w', `${btnW}px`);
			docStyle.setProperty('--redaktor-btn-x', `${offset.x}px`);
			docStyle.setProperty('--redaktor-btn-y', `${offset.y}px`);
		}
	}

	protected getContent(): DNode[] {
		const { disabled, outlined = false, popup = false, theme  } = this.properties;

		if (this.children.length === 1 && typeof this.children[0] === 'string') {
			this.children[0] = v('span',[this.children[0]]);
		}
		const content = [v('span', {
			key: 'inner',
			classes: this.theme([css.inner/*,...this.getSizeClasses(css)*/])
		}, this.children)];

		if (popup) {
			content.push(
				v('span', {
					classes: [...this.getSizeClasses(), this.theme(css.suffix)]
				}, [
					w(Icon, { type: 'downIcon', theme })
				])
			);
		}
		if (!disabled) {
			content.push(v('b', {
				classes: [
					this.theme(css.animation)
				].concat(outlined ? this.getSchemaClasses(css) : null),
				onanimationend: "this.blur()",
				tabIndex: 0
			}));
		}
		return content;
	}

	protected getRootClasses(): any[] {
		const {
			pressed, depth = 'defaultDepth', wide = false,
			popup = false, outlined = false/*, shaped = false, disabled, schema */
		} = this.properties;
	//console.log(this.properties.size, this.getSizeClasses());
		return [
			...this.getSizeClasses(),
			//...this.getSchemaClasses(css),
			...this.getStyleClasses(css),
			...this.theme([
				css.root,
				css.wrapper,
				popup ? css.hasSuffix : null,
				this.getDisabledClass(css),
				(depth in Depth) ? (<any>css)[depth] : css.defaultDepth,
				wide ? css.wide : null,
				pressed ? css.pressed : null
			])
		].concat(!outlined ? this.getSchemaClasses(css) : null);
	}
	protected beforeRender(): any {}
	protected render(): DNode {
		this.beforeRender();
		const {
			aria = {}, id, name, disabled, pressed, type = 'button', value
		} = this.properties;
		let { popup = false } = this.properties;
		if (popup === true) {
			popup = { expanded: false, id: '' };
		}
		return v('button', {
			key: 'root',
			classes: this.getRootClasses(),
			id, name, disabled, type, value,
			onblur: this._onBlur,
			onclick: this._onClick,
			onfocus: this._onFocus,
			onkeydown: this._onKeyDown,
			onkeypress: this._onKeyPress,
			onkeyup: this._onKeyUp,
			onmousedown: this._onMouseDown,
			onmouseup: this._onMouseUp,
			ontouchstart: this._onTouchStart,
			ontouchend: this._onTouchEnd,
			ontouchcancel: this._onTouchCancel,
			tabIndex: 0,
			'aria-haspopup': popup ? (popup.type ? popup.type : 'true') : null,
			'aria-controls': popup ? popup.id : null,
			'aria-expanded': popup ? popup.expanded + '' : null,
			'aria-pressed': typeof pressed === 'boolean' ? pressed.toString() : null,
			'aria-disabled': typeof disabled === 'boolean' ? disabled.toString() : null,
			...formatAriaProperties(aria)
		}, this.getContent());
	}
}
