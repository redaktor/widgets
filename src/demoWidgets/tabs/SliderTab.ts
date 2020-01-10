import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { Input } from '../../widgets/common/interfaces';
import { TabProperties } from '../Tabs';
import Icon from '../../widgets/icon';
import Slider from '../../widgets/slider';
import * as css from '../../styles/tabs.m.css';

export default class SliderTab<P extends TabProperties = TabProperties> extends WidgetBase<P> {
	private _horizontalValue = 50;
	private _verticalValue = 0;
	private _verticalInvalid = false;

	private _onHorizontalInput(evt: Input) {
		this._horizontalValue = parseFloat(evt.value);
		//console.log(evt)
		//FIXME EVENT: this._horizontalValue = evt.value;
		//this.invalidate();
	}

	private _onVerticalInput(evt: Input) {
		this._verticalValue = parseFloat(evt.value);
	}

	render() {
		console.log('Slider Tab');
		const { size = 'default' } = this.properties;
		return v('div', { classes: css.root }, [
			v('h3', [ 'Sliders' ]),

			v('div', [
				v('h4', {}, ['Horizontal slider, value: 50']),

				w(Slider, {
					key: 's1',
					size,
					label: 'How much do you like tribbles?',
					min: 0,
					max: 100,
					value: this._horizontalValue,
					onChange: this._onHorizontalInput,
					onInput: this._onHorizontalInput
				}),

				w(Slider, {
					key: 's1p',
					size,
					schema: 'primary',
					label: 'How much do you like tribbles?',
					min: 0,
					max: 100,
					output: (value: number) => {
						if (value < 20) { return 'I am a Klingon'; }
						if (value < 40) { return 'Tribbles only cause trouble'; }
						if (value < 60) { return 'They\`re kind of cute'; }
						if (value < 80) { return 'Most of my salary goes to tribble food'; }
						else { return 'I permanently altered the ecology of a planet for my tribbles'; }
					}
				}),
				w(Slider, {
					key: 's1s',
					size,
					schema: 'secondary',
					label: 'How much do you like tribbles?',
					min: 0,
					max: 100,
					step: 10,
					tickMarks: 10,
					tickLabels: [0,20,50,80,100],
					output: (value: number) => {
						if (value < 20) { return 'I am a Klingon'; }
						if (value < 40) { return 'Tribbles only cause trouble'; }
						if (value < 60) { return 'They\`re kind of cute'; }
						if (value < 80) { return 'Most of my salary goes to tribble food'; }
						else { return 'I permanently altered the ecology of a planet for my tribbles'; }
					},
					tickOutput: (value: number) => `${value}%`
				}),
				v('h4', {}, ['Disabled slider, value: 30']),
				w(Slider, {
					key: 's2d',
					size,
					label: 'Disabled Slider',
					outputDisplay: 'inline',
					min: 0,
					max: 100,
					step: 1,
					value: 30,
					disabled: true
				}),
				w(Slider, {
					key: 's2i',
					size,
					label: 'Volume',
					outputDisplay: 'inline',
					leading: [v('span',['X'])], // w(Icon, {type: 'minusIcon'})
					trailing: [w(Icon, {type: 'plusIcon'})],
					min: 0,
					max: 100,
					step: 10,
					tickMarks: 10,
					tickLabels: 20
					//value: this._horizontalValue,
					//onChange: this._onHorizontalInput,
					//onInput: this._onHorizontalInput
				}),

				v('h4', {}, ['Vertical slider with validation']),
				/* FIXME EVENT:
				*/
				w(Slider, {
					key: 's2v',
					size,
					label: 'Vertical Slider with default properties. Anything over 50 is invalid:',
					value: this._verticalValue,
					vertical: true,
					invalid: this._verticalInvalid,
					output: (value: number) => {
						return v('span', {
							innerHTML: this._verticalInvalid ? value + ' !' : value + ''
						});
					},
					//tickMarks: 10,
					//tickLabels: [0,20,50,80,100],
					//outputIsTooltip: true,
					onChange: this._onVerticalInput,
					onInput: this._onVerticalInput
				}),
				v('br'), v('br'), v('br')
			])
		]);
	}
}
