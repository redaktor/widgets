import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { TabProperties } from '../Tabs';
import Button from '../../widgets/button';
import Progress, { CircularProgress } from '../../widgets/progress';
import * as css from '../../styles/tabs.m.css';

export default class ProgressTab<P extends TabProperties = TabProperties> extends WidgetBase<P> {
	private _customOutputMax = 750;
	private _completed = 0;
	private _buffer = 0;
	private _timer: any = false;
	private _indeterminate: any = false;

	private _customOutput(value: number, percent: number) {
		return `${value} of ${this._customOutputMax} is ${percent}%`;
	}

	private _bufferProgress() {
    if (this._completed > 100) {
			this._completed = 0;
			this._buffer = 10;
    } else {
      const diff = Math.random() * 8;
			this._completed = this._completed + 5;
			this._buffer = this._completed + diff;
			/*
      const diff2 = Math.random() * 10;
			this._completed = this._completed + diff;
			this._buffer = this._completed + diff + diff2;*/
    }
		this.invalidate();
  }
	private onBuffer() {
		this._indeterminate = false;
		if (!!this._timer) {
			clearInterval(this._timer);
			this._buffer = 0;
			this._timer = false;
		} else {
			this._buffer = 10;
			this._timer = setInterval(this._bufferProgress.bind(this), 500);
		}
		this.invalidate();
  }
	private onIndeterminate() {
		this._indeterminate = !this._indeterminate;
		if (!!this._timer) {
			clearInterval(this._timer);
			this._timer = false;
		}
		this.invalidate();
  }

	render() {
		console.log('Progress Tab');
		const { size = 'default' } = this.properties;
		return v('div', { classes: css.root }, [
			v('h3', [ 'Progress Bars' ]),
			v('div', [
				v('h4', {}, ['value: 50%']),
				w(Progress, { size, label: 'countdown', outputDisplay: 'inline', value: 50, tickMarks: 10, tickLabels: 20 }),
				v('h4', {}, ['value: 0.3, max: 1']),
				w(Progress, { size, value: 0.3, max: 1 }),
				w(Progress, { size, schema: 'primary', value: 0.3, max: 1, tickMarks: 0.1, tickLabels: 0.2 }),
				w(Progress, { size, schema: 'secondary', value: 0.3, max: 1 }),
				v('h4', {}, ['animated ...']),

				/* TODO Toggle button */
				w(Button, {
					size: 'small', schema: 'primary', pressed: this._indeterminate, onClick: this.onIndeterminate
				}, ['indeterminate']),
				w(Button, {
					size: 'small', schema: 'primary', pressed: !!this._timer, onClick: this.onBuffer
				}, ['buffer']),
				w(Progress, {
					size, schema: 'secondary', min: 10, max: 100, value: this._completed,
					buffer: this._buffer, indeterminate: this._indeterminate
				}),
				v('h4', {}, ['value: 250, custom output function']),
				w(Progress, {
					size,
					value: 250,
					max: this._customOutputMax,
					output: this._customOutput
				}),
				v('h4', {}, ['value: 10, showOutput: false']),
				w(Progress, { size, value: 10, outputDisplay: 'none' }),
				v('h4', {}, ['circular']),
				w(CircularProgress, { size, indeterminate: false, value: 10, outputDisplay: 'none' }),
				w(CircularProgress, { size, schema: 'primary', indeterminate: false, value: 30, outputDisplay: 'none' }),
				w(CircularProgress, { size, schema: 'secondary', indeterminate: false, value: 50, outputDisplay: 'none' })
			])
		]);
	}
}
