import { create, tsx } from '@dojo/framework/core/vdom';
import SlidePane from '@dojo/widgets/slide-pane';
import icache from '@dojo/framework/core/middleware/icache';
import { DEMO_TEXT } from './common';

const factory = create({ icache });

export default factory(function LeftAlignSlidePane({ middleware: { icache } }) {
	return (
		<SlidePane
			title="Left Aligned SlidePane"
			open={icache.getOrSet('open', true)}
			underlay={false}
			align="left"
			onRequestClose={() => {
				console.log('close');
				icache.set('open', false);
			}}
		>
			{DEMO_TEXT}
		</SlidePane>
	);
});
