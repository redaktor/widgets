import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import TextArea from '@dojo/widgets/text-area';

const factory = create();

export default factory(function Label() {
	return <Example spaced={true}><TextArea>Textarea with label</TextArea></Example>;
});
