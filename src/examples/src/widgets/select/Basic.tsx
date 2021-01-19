import { create, tsx } from '@dojo/framework/core/vdom';
import Select from '@dojo/widgets/select';
import icache from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import {
	createMemoryResourceTemplate,
	createResourceMiddleware
} from '@dojo/framework/core/middleware/resources';
import { ListOption } from '@dojo/widgets/list';

const resource = createResourceMiddleware();
const factory = create({ icache, resource });
const options = [
	{ value: 'cat', label: 'Cat' },
	{ value: 'dog', label: 'Dog' },
	{ value: 'fish', label: 'Fish' }
];
/*

	<Combobox
		color={'primary'}
		label={'A primary Combobox'}
		placeholder={'optional placeholder'}
		autocomplete={false}
		scroll={false}
		results={options} // .map((o) => o.label),
		getOptionText={(o: any, i: number) => o.label}
		onResultSelect={(v: any, i: number, key: string) => console.log('!!! onResultSelect', v, i, key)}
		onChange={(v: any, i: number, key: string) => { console.log('!!! onChange', v, i, key) }}
	/>
	/*
		name={'testcombo1'}
		size={'l'}
		responsive={false}
		blurOnSelect={false}
	// animated: false,
	// muted: true,
	// filled: true,
	// outlined: true,
	// helperText: 'Lorem Ipsum - helperText'
	// helperText: 'Lorem Ipsum - helperText',
	// schema: 'primary',
	// raised: true,
	// getOptionLabel: (o: any, i: number, textNode: any) => textNode
	// tabIndex: _open ? 0 : -1
	
*/
const template = createMemoryResourceTemplate<ListOption>();

export default factory(function Basic({ id, middleware: { icache, resource } }) {
	return (
		<Example>
			<Select
				resource={resource({ template, initOptions: { id, data: options } })}
				onValue={(value) => {
					icache.set('value', value);
				}}
			>
				{{
					label: 'Basic Select'
				}}
			</Select>
			<pre>{icache.getOrSet('value', '')}</pre>
		</Example>
	);
});
