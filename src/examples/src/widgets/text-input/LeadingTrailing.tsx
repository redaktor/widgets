import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextInput, { Addon } from '@dojo/widgets/text-input';

const factory = create();

export default factory(function Basic() {
	return (<Example spaced={true}>
		<TextInput>
			{{
				label: 'Input label',
				leading: <Addon>A</Addon>,
				trailing: <Addon filled>Z</Addon>
			}}
		</TextInput>
	</Example>);
});
