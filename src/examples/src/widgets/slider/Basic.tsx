import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@dojo/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Example spaced={true}>
		<span>
			<Slider value={50} size="xs" />
			<Slider value={50} size="s" />
			<Slider value={50} size="m" />
			<Slider value={50} size="l" />
			<Slider value={50} size="xl" />
			<Slider value={50} size="xxl" />
			<p>Slider</p>
		</span>
</Example>;
});
