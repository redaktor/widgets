import { DNode, v, w, theme, customElement } from '../common/Widget';
import Dimensions from '@dojo/framework/core/meta/Dimensions';
import { formatAriaProperties } from '../common/util';
import { ProgressBase, ProgressProperties } from '../progress';
import Output from '../output';
import * as fixedCss from './styles/slider.m.css';
import * as css from '../themes/redaktor-default/slider.m.css';

/* TODO ENHANCE make Circular slider */
/**
 * @type SliderProperties
 *
 * Properties that can be set on a Slider component
 *
 * @property max               The maximum value for the slider
 * @property min               The minimum value for the slider
 * @property output            An optional function that returns a string or DNode for custom output format
 * @property step              Size of the slider increment
 * @property vertical          Orients the slider vertically, false by default.
 * @property verticalHeight    Length of the vertical slider (only used if vertical is true)
 * @property value           The current value
 */
export interface SliderProperties extends ProgressProperties {
	step?: number;
}
/* TODO FIXME
export class jsOutput extends Dimensions {
	set(key: string): any {
	  const node = this.getNode(key);
		node && node.setAttribute('style', ``);
	}
}*/

@theme(css)
@customElement<SliderProperties>({
	tag: 'redaktor-slider',
	properties: [
		'theme',
		'size',
		'aria',
		'extraClasses',
		'disabled',
		'invalid',
		'required',
		'readOnly',
		'output',
		'max',
		'min',
		'outputDisplay',
		'step',
		'vertical',
		'value'
	],
	attributes: [ 'widgetId', 'height' ],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class Slider extends ProgressBase<SliderProperties> {
	protected _value: number = NaN;
	protected _role: string = 'slider';

  protected _onInput(event: any) {
//    console.log('_onInput', (event.target as HTMLInputElement).value);
    event.stopPropagation();
    if (!!this.isComposing) {
      if (!this.has.compositionEvent) {
        this.isComposing = false;
      }
      return
    }
  // TODO autofill / spellchecker ? "insertReplacementText"
    this._value = parseFloat((event.target as HTMLInputElement).value);
    this.readonlyProp('value', this._value, event);
    this.invalidate();
    this.properties.onInput && this.properties.onInput(event);
  }
	protected _onChange(event: Event) {
    console.log('on change', (event.target as HTMLInputElement).value);
		event.stopPropagation();
		this._value = parseFloat((event.target as HTMLInputElement).value);
    this.readonlyProp('value', this._value, event);
		this.invalidate();
	}
	protected numberValue(nr: number) {
		const { step = 1 } = this.properties;
		return Math.round(nr / step) * step;
	}
  protected getRootClasses() {
		const { vertical, tickLabels } = this.properties;
		const stdRootClasses = [
			...this._getRootClasses(css),
			...this.getSizeClasses()
		];
		return stdRootClasses.concat([
			vertical ? css.vertical : css.horizontal,
			tickLabels ? css.labeled : null
		]);
	}
  protected getInputClasses(): (string | null)[] { return [css.input] }
	protected getWrapperClasses(): (string | null)[] {
		const { leading = [], trailing = [] } = this.properties;
		return [
			leading.length > 0 ? css.hasPrefix : null,
			trailing.length > 0 ? css.hasSuffix : null,
			css.responsive,
			css.wrapper
		]
  }
  protected getLegendClasses(labeled = false, even = false): (string | null)[] {
		return labeled ? [css.tickLabels, !!even ? css.even : css.uneven, css.smallTypo] :
			[css.tickMarks, css.uneven];
	}
  protected getCurrentClass() { return css.current }
	protected getTooltipClasses(position = 'above'): any { return [] }
	protected getInputProperties(): any {
		const {
			max = 100, min = 0, step = 1, vertical = false, height = '200px'
		} = this.properties;

		return {
			styles: vertical ? { width: `calc(${height} + var(--ui-inner-h))` } : {},
			max: `${max}`, min: `${min}`, step: `${step}`,
			type: 'range'
		}
	}
  protected renderInner(percentV: number = 0): DNode {
		const { vertical = false, height = '200px' } = this.properties;
		return v('div', {
			classes: [ this.theme(css.track), fixedCss.trackFixed ],
			'aria-hidden': 'true',
			styles: vertical ? { width: height } : {}
		}, [
			v('div', {
				classes: [ this.theme(css.fill), fixedCss.fillFixed ],
				styles: { width: `${this._value}%` }
			}),
			this.renderControls(this._value),
			this.renderLegend(this._value),
			this.renderLegend(this._value, true)
		]);
	}
	protected ariaInputWrapper() {
		return formatAriaProperties(this.properties.aria||{});
	}
	protected renderControls(percentV: number = 0): DNode {
		return v('span', {
			...{...this._ariaInputWrapper(), ...{role: 'slider'}},
			classes: this.theme(css.thumb),
			styles: { left: `${percentV}%` }
		})
	}
}
