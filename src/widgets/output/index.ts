import { theme, customElement } from '../common/Widget';
import Label, { LabelProperties } from '../label';
import * as css from '../themes/redaktor-default/label.m.css';

@theme(css)
@customElement<LabelProperties>({
	tag: 'redaktor-output',
	properties: [
    'theme', 'schema', 'size', 'aria', 'extraClasses', 'focused',
    'disabled', 'readOnly', 'required', 'invalid', 'hidden', 'muted'
  ],
	attributes: [],
	events: []
})
export default class Output extends Label {
  protected _rootElement = 'output';
}
