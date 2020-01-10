import {
  DNode, v, w, WidgetBase, Dimensions, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { keyName, Direction, Material, materialClass } from '../common/util';
import * as fixedCss from './styles/split-pane.m.css';
import * as css from '../themes/redaktor-default/split-pane.m.css';
import { GlobalEvent } from '../global-event/index';
import { auto } from '@dojo/framework/core/diff';
import { diffProperty } from '@dojo/framework/core/decorators/diffProperty';

/**
 * @type SplitPaneProperties
 *
 * Properties that can be set on a SplitPane component
 *
 * @property direction      Orientation of this SplitPane, can be `row` or `column`
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 * @property size           Size of the primary pane
 */
type DIRECTION = Direction | keyof typeof Direction;
export interface SplitPaneProperties extends ThemedProperties {
  material?: Material | keyof typeof Material;
	direction?: DIRECTION;
	size?: number;
	collapseWidth?: number;
	onResize?(size: number): void;
	onCollapse?(collapsed: boolean): void;
}

const DEFAULT_SIZE = 100;

@theme(css)
@customElement<SplitPaneProperties>({
	tag: 'dojo-split-pane',
	properties: [ 'theme', 'material', 'extraClasses', 'size' ],
	attributes: [ 'direction' ],
	events: [ 'onResize' ]
})
export class SplitPaneBase<P extends SplitPaneProperties = SplitPaneProperties> extends ThemedBase<P> {
	private _dragging: boolean | undefined;
	private _position = 0;
	private _step = 10;
	private _collapsed = false;
	private _lastSize?: number;
	static Direction = Direction;

	private _getPosition(event: MouseEvent & TouchEvent) {
		event.stopPropagation();
		const { direction = Direction.column } = this.properties;
		if (direction === Direction.column) {
			return event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
		}
		else {
			return event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
		}
	}
	private _getMaxSize(minSize = 32) {
		const { direction = Direction.column } = this.properties;
		const rootDimensions = this.meta(Dimensions).get('root');
		const dividerDimensions = this.meta(Dimensions).get('divider');
		return direction === Direction.column ?
			rootDimensions.offset.width - dividerDimensions.offset.width - minSize:
			rootDimensions.offset.height - dividerDimensions.offset.height - minSize;
	}

	private _onDragStart(event: MouseEvent & TouchEvent) {
		event.stopPropagation();
		this._dragging = true;
		this._position = this._getPosition(event);
	}

	private _onDragMove = (event: MouseEvent & TouchEvent) => {
		event.stopPropagation();
		if (!this._dragging) { return }
		const { onResize, size = DEFAULT_SIZE } = this.properties;

		const currentPosition = this._getPosition(event);
		const rootDimensions = this.meta(Dimensions).get('root');
		const dividerDimensions = this.meta(Dimensions).get('divider');
		const curSize = (this._lastSize === undefined ? size : this._lastSize);
		let newSize =  curSize + currentPosition - this._position;
		this._lastSize = newSize;
		newSize = Math.min(this._getMaxSize(), Math.max(32, newSize));
		this._position = currentPosition;
		onResize && onResize(newSize);
	}

	@diffProperty('collapseWidth', auto)
	protected collapseWidthReaction(oldProperty: any, newProperty: any) {
		const { direction = Direction.column } = this.properties;
		const { collapseWidth = 600 } = newProperty;
		this._collapseIfNecessary(collapseWidth, direction);
	}

	@diffProperty('direction', auto)
	protected directionReaction(oldProperty: any, newProperty: any) {
		const { collapseWidth = 600 } = this.properties;
		const { direction = Direction.column } = newProperty;
		this._collapseIfNecessary(collapseWidth, direction);
	}

	private _onDragEnd = (event: MouseEvent & TouchEvent) => {
		event.stopPropagation();
		if (!this._dragging) { return } /* arrow key + blur */
		this._dragging = false;
		this._lastSize = undefined;
		this.invalidate();
	}

	protected getPaneContent(content: DNode | undefined): DNode[] {
		return content ? [ content ] : [];
	}

	protected getPaneStyles(): {[key: string]: string} {
		const {
			direction = Direction.column,
			size = DEFAULT_SIZE
		} = this.properties;

		const styles: {[key: string]: string} = {};
		let computedSize = (!this._dragging && this._lastSize) ?
			`${this._lastSize}px` : (this._collapsed ? 'auto' : `${size}px`);
		styles[direction === Direction.column ? 'width' : 'height'] = computedSize;
		return styles;
	}

	protected onAttach() {
		const g = getComputedStyle(document.documentElement).getPropertyValue("--grid-base");
		if (/^(\d*)px/.test(g)) {
			this._step = Math.max(1, parseInt(g.replace('px',''), 10));
		}
		this._onResize();
	}
	private _onArrowPress(event: KeyboardEvent) {
		event.stopPropagation();
    const key = keyName(event, 'ArrowLeft', 'ArrowRight');
		if (!key) { return }
		const {
			onResize,
			direction = Direction.column,
			size = DEFAULT_SIZE
		} = this.properties;
		const Size = key === 'ArrowLeft' ? size - this._step : size + this._step;
		if (Size && this._lastSize !== Size) {
			this._lastSize = Math.min(this._getMaxSize(), Math.max(32, Size));
			onResize && onResize(Size);
			this.invalidate();
		}
	}
	private _onReset(event: MouseEvent & TouchEvent) {
		event.stopPropagation();
		//this._collapsed = true;
		//this.invalidate(); // TODO FIXME dblclick
	}
	private _collapseIfNecessary(collapseWidth: number, direction: DIRECTION) {
		if (direction === Direction.row || !this.meta(Dimensions).has('root')) {
			return;
		}
		const { onCollapse } = this.properties;
		const { width } = this.meta(Dimensions).get('root').size;
		if (width > collapseWidth && this._collapsed === true) {
			this._collapsed = false;
			onCollapse && onCollapse(this._collapsed);
		} else if (width <= collapseWidth && this._collapsed === false) {
			this._collapsed = true;
			onCollapse && onCollapse(this._collapsed);
		}
	}

	private _onResize = () => {
		const { collapseWidth = 600, direction = Direction.column } = this.properties;
		const isCollapsed = this._collapsed;
		this._collapseIfNecessary(collapseWidth, direction);
		if (isCollapsed !== this._collapsed) {
			this.invalidate();
		}
	}

	protected render(): DNode {
		const { direction = Direction.column, material } = this.properties;
		return v('div', {
      classes: [
        ...this.theme([
          css.root,
          (direction === Direction.row) ? css.row : css.column,
          this._collapsed ? css.collapsed : null,
          this._dragging ? css.dragging : null
        ]),
        materialClass(material),
        fixedCss.rootFixed,
        direction === Direction.row ? fixedCss.rowFixed : fixedCss.columnFixed,
				this._collapsed ? fixedCss.collapsedFixed : null
      ],
			key: 'root'
		}, [
			w(GlobalEvent, {
				key: 'global',
				window: {
					mouseup: this._onDragEnd,
					mousemove: this._onDragMove,
					touchmove: this._onDragMove,
					resize: this._onResize
				}
			}),
			v('div', {
				classes: [
					this.theme(css.leading),
					fixedCss.leadingFixed
				],
				key: 'leading',
				styles: this.getPaneStyles()
			}, this.getPaneContent(this.children[0])),
			v('div', {
				classes: [
					this.theme(css.divider),
					fixedCss.dividerFixed
				],
				tabIndex: 0,
				key: 'divider',
				onmousedown: this._onDragStart,
				ontouchend: this._onDragEnd,
				ontouchstart: this._onDragStart,
				onkeydown: this._onArrowPress,
				ondblclick: this._onReset
			}, [
        v('div', { classes: [ css.arrows ] })
      ]),
			v('div', {
				classes: [
					this.theme(css.trailing),
					fixedCss.trailingFixed
				],
				key: 'trailing'
			}, this.getPaneContent(this.children[1]))
		]);
	}
}

export default class SplitPane extends SplitPaneBase<SplitPaneProperties> {}
