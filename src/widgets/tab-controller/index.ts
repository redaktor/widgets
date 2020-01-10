import { WNode } from '@dojo/framework/core/interfaces';
import { CustomAriaProperties } from '../common/interfaces';
import {
  DNode, v, w, WidgetBase, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { formatAriaProperties, Align, Material } from '../common/util';
import { assign } from '@dojo/framework/shim/object';
import uuid from '../../framework/uuid';
import Tab, { TabProperties } from '../tab/index';
import TabButton from './TabButton';
import * as css from '../themes/redaktor-default/tab-controller.m.css';

/**
 * @type TabControllerProperties
 *
 * Properties that can be set on a TabController component
 *
 * @property activeIndex           Position of the currently active tab
 * @property alignButtons          Orientation of the tab buttons
 * @property onRequestTabChange    Called when a new tab button is clicked
 * @property onRequestTabClose     Called when a tab close button is clicked
 */
export interface TabControllerProperties extends ThemedProperties, CustomAriaProperties {
	activeIndex: number;
	alignButtons?: Align | keyof typeof Align;
	onRequestTabChange?(index: number, key: string): void;
	onRequestTabClose?(index: number, key: string): void;
  material?: Material | keyof typeof Material;
}

@theme(css)
@customElement<TabControllerProperties>({
	tag: 'dojo-tab-controller',
	properties: [ 'theme', 'material', 'aria', 'extraClasses', 'activeIndex' ],
	attributes: [ 'alignButtons' ],
	events: [
		'onRequestTabChange',
		'onRequestTabClose'
	]
})
export class TabControllerBase<P extends TabControllerProperties = TabControllerProperties> extends ThemedBase<P, WNode<Tab>> {
	private _id = uuid();
	private _callTabFocus = false;

	private get _tabs(): WNode<Tab>[] {
		return this.children.filter(child => child !== null) as WNode<Tab>[];
	}

	private _onDownArrowPress() {
		const { alignButtons } = this.properties;

		if (alignButtons === Align.left || alignButtons === Align.right) {
			this.selectNextIndex();
		}
	}

	private _onLeftArrowPress() {
		this.selectPreviousIndex();
	}

	private _onRightArrowPress() {
		this.selectNextIndex();
	}

	private _onUpArrowPress() {
		const { alignButtons } = this.properties;

		if (alignButtons === Align.left || alignButtons === Align.right) {
			this.selectPreviousIndex();
		}
	}

	/**
	 * Determines if the tab at `currentIndex` is enabled. If disabled,
	 * returns the next valid index, or null if no enabled tabs exist.
	 */
	private _validateIndex(currentIndex: number, backwards?: boolean) {
		const tabs = this._tabs;

		if (tabs.every(result => Boolean(result.properties.disabled))) {
			return null;
		}

		function nextIndex(index: number) {
			if (backwards) {
				return (tabs.length + (index - 1)) % tabs.length;
			}
			return (index + 1) % tabs.length;
		}

		let i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;

		while (tabs[i].properties.disabled) {
			i = nextIndex(i);
		}

		return i;
	}

	protected closeIndex(index: number) {
		const { onRequestTabClose } = this.properties;
		const key = this._tabs[index].properties.key;
		this._callTabFocus = true;

		onRequestTabClose && onRequestTabClose(index, key);
	}

	protected renderButtonContent(label?: DNode): DNode[] {
		return [ label || null ];
	}

	protected renderTabButtons(): DNode[] {
		return this._tabs.map((tab, i) => {
			const {
				closeable,
				disabled,
				key,
				label,
				theme
			} = <TabProperties> tab.properties;

			return w(TabButton, {
				callFocus: this._callTabFocus &&  i === this.properties.activeIndex,
				active: i === this.properties.activeIndex,
				closeable,
				controls: `${ this._id }-tab-${i}`,
				disabled,
				id: `${ this._id }-tabbutton-${i}`,
				index: i,
				key: `${ key }-tabbutton`,
				onClick: this.selectIndex,
				onCloseClick: this.closeIndex,
				onDownArrowPress: this._onDownArrowPress,
				onEndPress: this.selectLastIndex,
				onFocusCalled: () => { this._callTabFocus = false; },
				onHomePress: this.selectFirstIndex,
				onLeftArrowPress: this._onLeftArrowPress,
				onRightArrowPress: this._onRightArrowPress,
				onUpArrowPress: this._onUpArrowPress,
				theme
			}, this.renderButtonContent(label));
		});
	}

	protected renderTabs(): DNode[] {
		const { activeIndex } = this.properties;

		return this._tabs.reduce((a: any, tab, i) => {
			const id = `${ this._id }-tabcontrol-${ i }`;
			const controlProps: any = {
				type: 'radio',
				name: `${ this._id }-tabcontrol`,
				classes: this.theme([css.rTab])
			};
			if (i === activeIndex) { controlProps.checked = true }
			assign(tab.properties, {
				id: `${ this._id }-tab-${i}`,
				labelledBy: `${ this._id }-tabbutton-${i}`
			});
			a.push(v('input', controlProps))
			a.push(tab);
			return a;
		}, []);
	}

	protected selectIndex(index: number, backwards?: boolean) {
		const {
			activeIndex,
			onRequestTabChange
		} = this.properties;

		const validIndex = this._validateIndex(index, backwards);
		this._callTabFocus = true;

		if (validIndex !== null && validIndex !== activeIndex) {
			const key = this._tabs[validIndex].properties.key;
			onRequestTabChange && onRequestTabChange(validIndex, key);
		}
	}

	protected selectFirstIndex() {
		this.selectIndex(0, true);
	}

	protected selectLastIndex() {
		this.selectIndex(this._tabs.length - 1);
	}

	protected selectNextIndex() {
		const { activeIndex } = this.properties;
		this.selectIndex(activeIndex === this._tabs.length - 1 ? 0 : activeIndex + 1);
	}

	protected selectPreviousIndex() {
		const { activeIndex } = this.properties;
		this.selectIndex(activeIndex === 0 ? this._tabs.length - 1 : activeIndex - 1, true);
	}

	render(): DNode {
		const { activeIndex, aria = {} } = this.properties;
		const validIndex = this._validateIndex(activeIndex);
		const tabs = this.renderTabs();

		if (validIndex !== null && validIndex !== activeIndex) {
			this.selectIndex(validIndex);
			return null;
		}

		const children = [
			v('div', {
				key: 'buttons',
				classes: this.theme(css.tabButtons)
			}, this.renderTabButtons()),
			tabs.length ? v('div', {
				key: 'tabs',
				classes: this.theme(css.tabs)
			}, tabs) : null
		];

		let alignClasses = [css.horizontal];
		let orientation = 'horizontal';

		const { alignButtons, material } = this.properties;
		switch (alignButtons) {
      case Align.bottom:
        alignClasses = [css.alignBottom, css.horizontal];
        children.reverse();
        break;
			case Align.right:
				alignClasses = [css.alignRight, css.vertical];
				orientation = 'vertical';
				children.reverse();
				break;
			case Align.left:
        alignClasses = [css.alignLeft, css.vertical];
				orientation = 'vertical';
				break;
      default:
        alignClasses = [css.alignTop, css.horizontal];
		}


		return v('div', {
			...formatAriaProperties(aria),
			'aria-orientation': orientation,
			classes: this.theme([css.root, ...alignClasses]),
			role: 'tablist'
		}, children);
	}
}

export default class TabController extends TabControllerBase<TabControllerProperties> {}
