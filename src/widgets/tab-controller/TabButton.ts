import { DNode } from '@dojo/framework/core/interfaces';
import { I18nMixin } from '@dojo/framework/core/mixins/I18n';
import { ThemedMixin, ThemedProperties, theme } from '@dojo/framework/core/mixins/Themed';
import Focus from '@dojo/framework/core/meta/Focus';
import { v } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import commonBundle from '../common/nls/common';
import { CommonMessages } from '../common/interfaces';
import { keyName } from '../common/util';

import * as css from '../themes/redaktor-default/tab-controller.m.css';

/**
 * @type TabButtonProperties
 *
 * Properties that can be set on a TabButton component
 *
 * @property active             Determines whether this tab button is active
 * @property callFocus          Used to immediately call focus on the cell
 * @property closeable          Determines whether this tab can be closed
 * @property controls           ID of the DOM element this tab button controls
 * @property disabled           Determines whether this tab can become active
 * @property id                 ID of this tab button DOM element
 * @property index              The position of this tab button
 * @property onClick            Called when this tab button is clicked
 * @property onCloseClick       Called when this tab button's close icon is clicked
 * @property onDownArrowPress   Called when the down arrow button is pressed
 * @property onEndPress         Called when the end button is pressed
 * @property onFocusCalled      Callback function when the cell receives focus
 * @property onHomePress        Called when the home button is pressed
 * @property onLeftArrowPress   Called when the left arrow button is pressed
 * @property onRightArrowPress  Called when the right arrow button is pressed
 * @property onUpArrowPress     Called when the up arrow button is pressed
 */
export interface TabButtonProperties extends ThemedProperties {
	active?: boolean;
	callFocus?: boolean;
	closeable?: boolean;
	controls: string;
	disabled?: boolean;
	id: string;
	index: number;
	onClick?: (index: number) => void;
	onCloseClick?: (index: number) => void;
	onDownArrowPress?: () => void;
	onEndPress?: () => void;
	onFocusCalled?: () => void;
	onHomePress?: () => void;
	onLeftArrowPress?: () => void;
	onRightArrowPress?: () => void;
	onUpArrowPress?: () => void;
}

export const ThemedBase = I18nMixin(ThemedMixin(WidgetBase));

@theme(css)
export class TabButtonBase<P extends TabButtonProperties = TabButtonProperties> extends ThemedBase<P> {
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		const {
			disabled,
			index,
			onClick
		} = this.properties;

		!disabled && onClick && onClick(index);
	}

	private _onCloseClick(event: MouseEvent) {
		event.stopPropagation();
		const {
			index,
			onCloseClick
		} = this.properties;

		onCloseClick && onCloseClick(index);
	}

	private _onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const {
			closeable,
			disabled,
			index,
			onCloseClick,
			onDownArrowPress,
			onEndPress,
			onHomePress,
			onLeftArrowPress,
			onRightArrowPress,
			onUpArrowPress
		} = this.properties;

		if (disabled) {
			return;
		}

		// Accessibility
		switch (keyName(event)) {
			// Escape
			case 'Escape':
				closeable && onCloseClick && onCloseClick(index);
				break;
			// Left arrow
			case 'ArrowLeft':
				onLeftArrowPress && onLeftArrowPress();
				break;
			// Right arrow
			case 'ArrowRight':
				onRightArrowPress && onRightArrowPress();
				break;
			// Up arrow
			case 'ArrowUp':
				onUpArrowPress && onUpArrowPress();
				break;
			// Down arrow
			case 'ArrowDown':
				onDownArrowPress && onDownArrowPress();
				break;
			// Home
			case 'Home':
				onHomePress && onHomePress();
				break;
			// End
			case 'End':
				onEndPress && onEndPress();
				break;
		}
	}

	protected getContent(messages: CommonMessages): DNode[] {
		const { active, closeable } = this.properties;

		return [
			...this.children,
			closeable ? v('button', {
				tabIndex: active ? 0 : -1,
				classes: this.theme(css.close),
				type: 'button',
				onclick: this._onCloseClick
			}, [
				messages.close
			]) : null
		];
	}

	protected getModifierClasses(): (string | null)[] {
		const { active, closeable, disabled } = this.properties;
		return [
			active ? css.active : null,
			closeable ? css.closeable : null,
			disabled ? css.disabled : css.enabled
		];
	}

	render(): DNode {
		const {
			active,
			callFocus,
			controls,
			disabled,
			id,
			index,
			onFocusCalled
		} = this.properties;
		const { messages } = this.localizeBundle(commonBundle);

		if (callFocus) {
			this.meta(Focus).set('tab-button');
			onFocusCalled && onFocusCalled();
		}

		return v('label', {
			'aria-controls': controls,
			'aria-disabled': disabled ? 'true' : 'false',
			'aria-selected': active === true ? 'true' : 'false',
			classes: this.theme([ css.tabButton, ...this.getModifierClasses() ]),
			id,
			for: id.replace('tabbutton', 'tabcontrol'),
			key: 'tab-button',
			onclick: this._onClick,
			onkeydown: this._onKeyDown,
			role: 'tab',
			tabIndex: active === true ? 0 : -1
		}, this.getContent(messages));
	}
}

export default class TabButton extends TabButtonBase<TabButtonProperties> {}
