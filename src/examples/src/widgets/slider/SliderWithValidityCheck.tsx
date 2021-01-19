import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Example from '../../Example';
import Slider from '@dojo/widgets/slider';

const factory = create({ icache });

export default factory(function SliderWithValidityCheck({ middleware: { icache } }) {
	const value = icache.getOrSet<number>('value', 0);
	const valid = value < 50;
	return (<Example spaced={true}>
		<Slider min={0} max={100} onValue={(value) => icache.set('value', value)} valid={valid}>
			{{
				label: 'Anything over 50 is invalid',
				output: () => (valid ? 'Valid' : 'Invalid')
			}}
		</Slider>
	</Example>);
});
