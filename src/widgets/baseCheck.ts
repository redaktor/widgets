import {
	CustomAriaProperties, LabeledProperties, GenericInputProperties, Input, Toggle,
	CheckEventProperties, KeyEventProperties, PointerEventProperties,
	RedaktorStyleCSS, RedaktorCSS, RedaktorProperties
} from './common/interfaces';
import { DNode, v, w, RedaktorWidgetBase/*, theme, customElement*/ } from './common/Widget';
import { formatAriaProperties/*, Sizes*/ } from './common/util';
//import uuid from '../framework/uuid';
import Focus from '@dojo/framework/core/meta/Focus';
import Icon from './icon/index';
import Label from './label/index';
import * as css from './themes/redaktor-default/checkbox.m.css';
import * as baseCss from './themes/redaktor-default/cb.m.css';
export interface CheckProperties extends RedaktorProperties, GenericInputProperties,
LabeledProperties, KeyEventProperties, PointerEventProperties,
CustomAriaProperties, CheckEventProperties {
	offLabel?: DNode;
	checked?: boolean;
	value?: string;
	customIcon?: boolean;
}

export default class CheckBase<P extends CheckProperties = CheckProperties>
extends RedaktorWidgetBase<P> {
	//protected _uuid = uuid();
	protected _type = 'checkbox';

	private _onFocus(event: FocusEvent) {
		this.properties.onFocus && this.properties.onFocus(event);
	}
	private _onBlur(event: FocusEvent) {
		this.properties.onBlur && this.properties.onBlur(event);
	}
	private _onHover(event: MouseEvent) {
		this.properties.onHover && this.properties.onHover(event);
	}
	private _onMouseDown(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onMouseDown && this.properties.onMouseDown(event);
	}
	private _toggleEvt(event: MouseEvent | Input): Toggle {
		this.readonlyProp('checked', (<HTMLInputElement>event.target).checked, event);
		this.readonlyProp('value', (<HTMLInputElement>event.target).value, event);
		return <Toggle>event
	}
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick(this._toggleEvt(event));
	}
	private _onChange(event: Input) {
		event.stopPropagation();
		this.properties.onChange && this.properties.onChange(this._toggleEvt(event));
	}
	private _onMouseUp(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onMouseUp && this.properties.onMouseUp(event);
	}
	private _onTouchStart(event: TouchEvent) {
		event.stopPropagation();
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
  protected getEvtArgs(event: Event): any[] {
		return [(event.target as HTMLInputElement).checked]
	}

	protected getModifierClasses(): (string | null)[] {
		return [css.normal]
	}
	protected getInputClasses(): any[] {
		//console.log(this.getSchemaClasses(css));
		return [
      this.theme(css.input),
      ...this.getSchemaClasses(css)
    ];
	}
	protected getInnerClasses(): any[] {
		return [ css.inner ]
	}
	protected _getRootClasses(ui: RedaktorCSS & RedaktorStyleCSS = css): (string | null)[] {
		const { checked = false, required } = this.properties;
		const focus = this.meta(Focus).get('root');
		return [
			ui.root,
			this.getDisabledClass(ui),
			this.getValidClass(ui),
			...this.getStyleClasses(ui),
			checked ? ui.checked : null,
			focus.containsFocus ? ui.focused : null,
			required ? ui.required : null,
			...this.getModifierClasses()
		];
	}
	protected getRootClasses(): (string | null)[] { return this._getRootClasses() }
	protected renderLabel(key: string = 'label') {
		//console.log('RL', this.properties.label)

		if (!this.properties.label) { return '' }
		// if (!this.properties.label) { return v('p',['.']) } // TODO FIXME
		const {
			widgetId/* = this._uuid*/, size,
			disabled, valid, label, offLabel, labelHidden = false,
			readOnly, required, schema, theme
		} = this.properties;

		const focus = this.meta(Focus).get('root');
		return w(Label, {
			muted: true,
			key,
			size,
			theme,
			schema,
			disabled,
			valid: valid === true || undefined,
			readOnly,
			required,
			focused: focus.containsFocus,
			hidden: labelHidden,
			forId: widgetId
		}, [ key === 'offLabel' ? offLabel : label ])
	}

	protected renderIcon(): DNode[] {
		return [w(Icon, { type: 'checkIcon', extraClasses: {root: css.checkIcon } })]
	}
	protected renderContent(): DNode[] { return this.renderIcon() }

	protected renderInput(): DNode {
		const {
			widgetId/* = this._uuid*/, aria = {}, checked = false,
			disabled, valid, /*size = 'default', label, labelAfter = true, theme, schema,*/
			name, readOnly, required, value = `${this._value}`
		} = this.properties;
		return v('input', {
			id: widgetId,
			...formatAriaProperties(aria),
			classes: this.getInputClasses(),
			checked,
			disabled,
			'aria-invalid': valid === false ? 'true' : null,
			name,
			readOnly,
			'aria-readonly': readOnly === true ? 'true' : null,
			required,
			value,
			type: this._type,
			onblur: this._onBlur,
			onhover: this._onHover,
			onchange: this._onChange,
			onclick: this._onClick,
			onfocus: this._onFocus,
			onmousedown: this._onMouseDown,
			onmouseup: this._onMouseUp,
			ontouchstart: this._onTouchStart,
			ontouchend: this._onTouchEnd,
			ontouchcancel: this._onTouchCancel
		})
	}
	protected renderInputWrapper(): DNode[] {
		//console.log('renderInputWrapper', this.properties.customIcon);
		return [
			this.renderInput(),
			v('div', {
				classes: [
					...this.getSchemaClasses(css),
					...this.getSizeClasses(),
					...this.getInnerClasses(),
					this.properties.customIcon ? baseCss.icon : null
				]
			}, this.renderContent())
		]
	}

	protected beforeRender(): any {}
	protected render(): DNode {
		this.beforeRender();
		const { /*label,*/ offLabel = null, labelAfter = true } = this.properties;

		const children = [
			offLabel ? this.renderLabel('offLabel') : null,
			...this.renderInputWrapper(),
			this.renderLabel()
		];

		return v('div', {
			key: 'root',
			classes: this.getRootClasses()
		}, (!!offLabel || !!labelAfter) ? children : children.reverse());
	}
}
