import { DNode, v, w, theme, customElement } from '../common/Widget';
import Dimensions from '@dojo/framework/core/meta/Dimensions';
import { Intersection } from '@dojo/framework/core/meta/Intersection';
import InputBase, { InputProperties } from '../baseInput';
import { formatAriaProperties } from '../common/util';
import Output from '../output';

import * as fixedCss from './styles/progress.m.css';
import * as css from '../themes/redaktor-default/progressLinear.m.css';
import * as cssCircular from '../themes/redaktor-default/progressCircular.m.css';

enum OutputDisplay {
	'above' = 'above', // default
	'none' = 'none',
	'inline' = 'inline',
	'tooltip' = 'tooltip',
	'below' = 'below'
}
export type OutputDisplays = (OutputDisplay | keyof typeof OutputDisplay);

/**
 * @type ProgressProperties
 *
 * Properties that can be set on a Progress component
 *
 * @property max               The maximum value for the slider
 * @property min               The minimum value for the slider
 * @property output            An optional function that returns a string or DNode for custom output format
 * @property vertical          Orients the slider vertically, false by default.
 * @property height    Length of the vertical slider (only used if vertical is true)
 * @property value           The current value
 */
export interface ProgressProperties extends InputProperties {
	max?: number;
	min?: number;
	output?(value: number, percent: number): DNode;
	outputDisplay?: OutputDisplays;
	tickMarks?: number | number[];
	tickLabels?: number | number[];
	tickOutput?(value: number): DNode;
	vertical?: boolean;
	height?: string;
}
export interface LinearProgressProperties extends ProgressProperties {
	indeterminate?: boolean;
	buffer?: number;
}
export interface CircularProgressProperties extends ProgressProperties {
	indeterminate?: boolean;

}

export class jsOutput extends Dimensions { /* TODO FIXME */
	set(key: string): any {
	  const node = this.getNode(key);
		node && node.setAttribute('style', ``);
	}
}

export class ProgressBase<P extends LinearProgressProperties = LinearProgressProperties> extends InputBase<P> {

/* TODO FIXME  widgetId for role="progress" // lines statt height */

	protected _hasRange = false;
	protected _value: number = NaN;

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
			[css.tickMarks, !!even ? css.even : css.uneven];
	}
	protected getCurrentClass() { return css.current }
	protected getFixedRootClasses() { return [fixedCss.rootFixed] }
	protected getFixedInputClasses() { return [fixedCss.nativeInput] }
	protected getTooltipClasses(position: OutputDisplays = 'above') {
		return [
			position === 'none' ? this.theme(css.outputNone) : null,
			position === 'inline' ? this.theme(css.outputInline) : null,
			position === 'tooltip' ? this.theme(css.outputTooltip) : null
		]
	}
	protected renderLegend(percentV: number = 100, labeled = false) {
		const {
			max = 100, min = 0, tickMarks, tickLabels, tickOutput
		} = this.properties;

		const ticks = labeled ? tickLabels : tickMarks;
		if (!ticks) { return null }

		const range = Math.abs(max - min);
		const el = labeled ? 'data' : 'i';
		if (Array.isArray(ticks)) {
			return v('div', {
				classes: this.theme(this.getLegendClasses(labeled))
			}, ticks.map((tick) => {
				const percent = this.numberPercent(tick)[1];
				const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
				return v(el, {
					classes: this.theme([ percent >= percentV ? this.getCurrentClass() : null ]),
					styles: {left: `${percent}%`},
					value: `${tick}`
				}, tickContent);
			}));
		}
		if (typeof ticks !== 'number') { return null }
		const tickCount = Math.round(range / ticks + 1);
		const stepCurrent = Math.floor((percentV / 100) * tickCount);
		const percentBase = Math.floor(this.numberPercent(ticks)[1]);
		return v('div', {
			classes: this.theme(this.getLegendClasses(labeled, true))
		}, [...Array(tickCount)].map((t, i) => {
			const tick = min + ticks * i;
			const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
			return v(el, {
				classes: this.theme([ i === stepCurrent ? this.getCurrentClass() : null ]),
				styles: labeled ? {left: `${percentBase * i}%`} : {},
				value: `${tick}`
			}, tickContent)
		}))
	}
/*
	protected renderLegend(percentV: number = 100, labeled = false) {
		const {
			max = 100, min = 0, tickMarks, tickLabels, tickOutput,
			indeterminate = false, vertical = false
		} = this.properties;

		const ticks = labeled ? tickLabels : tickMarks;
		if (!ticks) { return null }

		const range = Math.abs(max - min);
		const el = labeled ? 'data' : 'i';
		if (Array.isArray(ticks)) {
			return v('div', {
				classes: this.theme(this.getLegendClasses(labeled))
			}, ticks.map((tick) => {
				const percent = this.numberPercent(tick)[1];
				const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
				return v(el, {
					classes: this.theme([ percent >= percentV ? this.getCurrentClass() : null ]),
					styles: {left: `${percent}%`},
					value: `${tick}`
				}, tickContent);
			}));
		}
		const tickCount = Math.round(range / ticks + 1);
		const stepCurrent = Math.floor((percentV / 100) * tickCount);
		const percentBase = Math.floor(this.numberPercent(ticks)[1]);
		return v('div', {
			classes: this.theme(this.getLegendClasses(labeled, true))
		}, [...Array(tickCount)].map((t,i) => {
			const tick = min + ticks * i;
			const tickContent = labeled ? [tickOutput ? tickOutput(tick) : `${tick}`] : [];
			return v(el, {
				classes: this.theme([ i === stepCurrent ? this.getCurrentClass() : null ]),
				styles: labeled ? {left: `${percentBase * i}%`} : {},
				value: `${tick}`
			}, tickContent)
		}))
	}
*/
	protected renderControls(percentV: number = 0): DNode {
		const { min = 0, max = 100, buffer, indeterminate } = this.properties;
		const { isIntersecting } = this.meta(Intersection).get('wrapper');
		if (indeterminate) {
			return v('div', { classes: this.theme(css.absorb) });
		} else if (typeof buffer === 'number') {
			const bufferPercent = Math.min(this.numberPercent(buffer)[1] + percentV, 100);
			return v('div', {
				classes: this.theme(css.absorb),
				styles: { width: `${bufferPercent}%` }
			});
		}
		return null;
	}

	protected renderInner(percentV: number = 0): DNode {
		const { vertical = false, height = '200px', indeterminate = false } = this.properties;
		return v('div', {
			classes: [ this.theme(css.track), fixedCss.trackFixed ],
			'aria-hidden': 'true',
			styles: vertical ? { width: height } : {}
		}, [
			v('div', {
				classes: [ this.theme(css.fill), fixedCss.fillFixed ],
				styles: indeterminate ? {} : { width: `${percentV}%` }
			}),
			this.renderControls(percentV),
			this.renderLegend(percentV),
			this.renderLegend(percentV, true)
		]);
	}
	protected renderLabelWrapper(value = 0, percentV = 0): DNode {
		const {
			widgetId = this._uuid, size = 'default', label, output, outputDisplay = 'above',
			indeterminate = false, vertical = false
		} = this.properties;
		const hasLabel = (typeof label === 'string' && label.length);
		const outputNode = output ? output(value, percentV) : `${value}`;
		// output styles
		let outputStyles: { left?: string; top?: string } = {};
		if (outputDisplay === 'tooltip') {
			outputStyles = vertical ? { top: `${100 - percentV}%` } : { left: `${percentV}%` };
		}

		return v('span', {
			classes: [
				outputDisplay === 'tooltip' ? fixedCss.outputTooltip : null,
				...this.getTooltipClasses(outputDisplay)
			]
		}, [
			hasLabel ? this.renderLabel() : null,
			!indeterminate && hasLabel && outputDisplay === 'above' ? v('br') : null,
			!indeterminate ? w(Output, {
				key: 'output',
				size,
				forId: widgetId,
				style: outputStyles,
				tabIndex: -1 /* needed so Edge doesn't select the element while tabbing through */
			}, [ outputNode ]) : null,
			outputDisplay === 'inline' ? v('br') : null
		])
	}

	protected _ariaInputWrapper() {
		const {
			value = this._value, min = 0, max = 100, aria = {}, output
		} = this.properties;
		return {
			...formatAriaProperties(aria),
			role: 'progressbar',
			'aria-valuemin': `${min}`,
			'aria-valuemax': `${max}`,
			'aria-valuenow': `${value}`,
			'aria-valuetext': output || (() => `${value}`),
			/*aria-labelledby="idRed"*/
			/* TODO https://github.com/w3c/aria/issues/471 */
		}
	}
	protected ariaInputWrapper(): any {
		return this._ariaInputWrapper()
	}

	protected renderInputWrapper(value = 0, percentV = 0) {
		const {
			responsive = true, leading = [], trailing = [],
			vertical = false, height = '200px'
		} = this.properties;
		const _input = this.renderInput();
		const _prefixes = leading.map((addon: DNode) => this.renderAddon(addon, true));
		const _suffixes = trailing.map((addon: DNode) => this.renderAddon(addon));

		return v('div', {
			key: 'wrapper',
			...this.ariaInputWrapper(),
			classes: [
				fixedCss.wrapperFixed,
				...this.getSizeClasses(css),
				...this.getSchemaClasses(css),
				...this.theme(this.getWrapperClasses())
			],
			styles: vertical ? { height: height } : {}
		}, [ _input, ..._prefixes, this.renderInner(percentV), ..._suffixes ]);
	}

	protected numberValue(nr: number) { return nr } /* needed to round e.g. to 'step' */
	protected numberPercent(forValue?: number): [number, number] {
		const { value = this._value, max = 100, min = 0 } = this.properties;
		const range = Math.abs(max - min);
		const v = typeof forValue === 'number' ? forValue : value;
		const _nrV = typeof v === 'number' && isNaN(v) ? ((max + min) / 2) :
			(typeof v === 'number' ? v : parseFloat(v));
		const nrV = this.numberValue(Math.max(min, Math.min(max, _nrV)));
		return [nrV, ((nrV / range) * 100)];
	}

	protected render(): DNode {
		const {max = 100, min = 0} = this.properties;
		if (typeof this._value === 'number' && isNaN(this._value)) {
			this._value = ((max + min) / 2);
		}
		const nr_p = this.numberPercent();
		return v('div', {
				key: 'root',
				classes: [...this.getRootClasses(), ...this.getFixedRootClasses()]
			},
			[
				this.renderLabelWrapper(...nr_p),
				this.renderInputWrapper(...nr_p)
			]
		);
	}
}

@theme(css)
@customElement<LinearProgressProperties>({
	tag: 'redaktor-progress',
	properties: [
		'theme', 'size', 'aria', 'extraClasses', 'disabled', 'invalid', 'readOnly',
		'required', 'buffer', 'indeterminate', 'output', 'outputDisplay', 'max', 'min',
		'vertical', 'value'
	],
	attributes: [ 'widgetId', 'height' ],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class Progress extends ProgressBase<LinearProgressProperties> {
	protected renderInput(): DNode { return null }
	protected getTooltipClasses(position: OutputDisplays = 'above'): any { return [] }

	protected getRootClasses() {
		const { vertical, tickLabels, indeterminate, buffer } = this.properties;
		const stdRootClasses = [
			...this._getRootClasses(css),
			...this.getSizeClasses()
		];
		const { isIntersecting } = this.meta(Intersection).get('wrapper');
		return stdRootClasses.concat([
			vertical ? css.vertical : css.horizontal,
			tickLabels ? css.labeled : null,
			isIntersecting && indeterminate ? css.indeterminate : css.determinate,
			buffer ? css.buffer : null
		]);
	}
}

@theme(cssCircular)
@customElement<CircularProgressProperties>({
	tag: 'redaktor-progress',
	properties: [
		'theme', 'size', 'aria', 'extraClasses', 'disabled', 'invalid', 'readOnly',
		'required', 'indeterminate', 'output', 'outputDisplay', 'max', 'min',
		'vertical', 'value'
	],
	attributes: [ 'widgetId', 'height' ],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export class CircularProgress extends ProgressBase<CircularProgressProperties> {
	protected renderInput(): DNode { return null }
	protected getTooltipClasses(position = 'above') {
		return [
			position === 'none' ? this.theme(cssCircular.outputNone) : null,
			position === 'inline' ? this.theme(cssCircular.outputInline) : null,
			position === 'tooltip' ? this.theme(cssCircular.outputTooltip) : null
		]
	}
	protected getRootClasses() {
		const { vertical, tickLabels, indeterminate } = this.properties;
		const stdRootClasses = this._getRootClasses(cssCircular);
		return stdRootClasses.concat([
			tickLabels ? cssCircular.labeled : null
		]);
		/* style={{ width: size, height: size, ...rootStyle, ...style }} */
	}
	protected renderInputWrapper(value = 0, percentV = 0) {
		const SIZE = 80;
		const THICK = 3.6;
		/* <--- TODO FIXME goes properties */

		const { indeterminate, leading = [], trailing = [] } = this.properties;
		const _prefixes = leading.map((addon: DNode) => this.renderAddon(addon, true));
		const _suffixes = trailing.map((addon: DNode) => this.renderAddon(addon));
		const easeIn = (t: number) => t * t;
		const easeOut = (t: number) => {
		  t = Math.min(Math.max(0, t), 1);
		  t = (t -= 1) * t * t + 1; // https://gist.github.com/gre/1650294
		  return t;
		}
		const styles: any = {
			transform: `rotate(${indeterminate ? (easeOut(value / 70) * 270).toFixed(3) : -90}deg)`
		};
		const circle = v('svg', {
			styles,
			classes: this.theme([cssCircular.inner, cssCircular.svg])
			/*viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`*/
		}, [
			v('circle', {
				classes: this.theme([cssCircular.circle, cssCircular.track])
			}),
			v('circle', {
				styles: indeterminate ? {} : {
					strokeDashoffset: `calc(var(--circumference) - ${percentV / 100} * var(--circumference))`
				},
				classes: this.theme(cssCircular.circle)
			})
		]);
		const { isIntersecting } = this.meta(Intersection).get('wrapper');
		return v('div', {
			key: 'wrapper',
			...this.ariaInputWrapper(),
			classes: [
				...this.getSizeClasses(css),
				...this.getSchemaClasses(css),
				...this.theme([
					isIntersecting && indeterminate ? cssCircular.indeterminate : cssCircular.determinate,
					leading.length > 0 ? cssCircular.hasPrefix : null,
					trailing.length > 0 ? cssCircular.hasSuffix : null,
					cssCircular.wrapper
				])
			]
		}, [ ..._prefixes, circle, ..._suffixes ]);
	}
}
