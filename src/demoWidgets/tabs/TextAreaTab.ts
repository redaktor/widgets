import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { TabProperties } from '../Tabs';
import Textarea from '../../widgets/text-area';
import Label from '../../widgets/label';
import { Size, MaterialSchema } from '../../widgets/common/util';
import * as css from '../../styles/tabs.m.css';

export default class TextAreaTab<P extends TabProperties = TabProperties> extends WidgetBase<P> {

	render() {
		console.log('TextArea Tab');
		const { size = 'default' } = this.properties;
		return v('div', { classes: css.root }, [
			v('h3', [ 'Text Areas' ]),
			w(Label, { size }, ['default']),
			v('div', [
				w(Textarea, {
					size,
					//responsive: true,
					//columns: 40,
					rows: 6,
					placeholder: 'Hello World',
					label: 'Text area, 6 rows'
				}),
				w(Textarea, {
					size,
					columns: 40,
					rows: 3,
					expand: true,
					placeholder: 'Hello World',
					label: 'Expanding text area'
				}),
				w(Textarea, {
					size,
					columns: 40,
					rows: 2,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Primary text area'
				}),
				w(Textarea, {
					size,
					columns: 40,
					schema: 'secondary',
					placeholder: 'Hello World',
					label: 'Secondary text area'
				}),
				w(Textarea, {
					size,
					columns: 40,
					rows: 3,
					expand: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Expanding primary text area'
				}),
				w(Textarea, {
					size,
					columns: 40,
					rows: 2,
					disabled: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Disabled primary text area'
				})
			]),
			v('br'),
			w(Label, { size }, ['filled']),
			v('div', [
				w(Textarea, {
					size,
					filled: true,
					//responsive: true,
					//columns: 40,
					rows: 6,
					placeholder: 'Hello World',
					label: 'Text area, 6 rows'
				}),
				w(Textarea, {
					size,
					filled: true,
					columns: 40,
					rows: 3,
					expand: true,
					placeholder: 'Hello World',
					label: 'Expanding text area'
				}),
				w(Textarea, {
					size,
					filled: true,
					columns: 40,
					rows: 2,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Primary text area'
				}),
				w(Textarea, {
					size,
					filled: true,
					columns: 40,
					schema: 'secondary',
					placeholder: 'Hello World',
					label: 'Secondary text area'
				}),
				w(Textarea, {
					size,
					filled: true,
					columns: 40,
					rows: 3,
					expand: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Expanding primary text area'
				}),
				w(Textarea, {
					size,
					filled: true,
					columns: 40,
					rows: 2,
					disabled: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Disabled primary text area'
				})
			]),
			v('br'),
			w(Label, { size }, ['outlined']),
			v('div', [
				w(Textarea, {
					size,
					outlined: true,
					//responsive: true,
					//columns: 40,
					rows: 6,
					placeholder: 'Hello World',
					label: 'Text area, 6 rows'
				}),
				w(Textarea, {
					size,
					outlined: true,
					columns: 40,
					rows: 3,
					expand: true,
					placeholder: 'Hello World',
					label: 'Expanding text area'
				}),
				w(Textarea, {
					size,
					outlined: true,
					columns: 40,
					rows: 2,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Primary text area'
				}),
				w(Textarea, {
					size,
					outlined: true,
					columns: 40,
					schema: 'secondary',
					placeholder: 'Hello World',
					label: 'Secondary text area'
				}),
				w(Textarea, {
					size,
					outlined: true,
					columns: 40,
					rows: 3,
					expand: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Expanding primary text area'
				}),
				w(Textarea, {
					size,
					outlined: true,
					columns: 40,
					rows: 2,
					disabled: true,
					schema: 'primary',
					placeholder: 'Hello World',
					label: 'Disabled primary text area'
				})
			]),
			v('br'),
			w(Label, { size }, ['etc.']),
			v('div', [
				v('p',['LOREM Sxy TEST']),
				w(Textarea, {
					size,
					columns: 40,
					disabled: true,
					rows: 4,
					value: 'Initial value',
					label: 'Disabled text area'
				}),
				v('p',['LOREM Sxy TEST']),
			])
		]);
	}
}
