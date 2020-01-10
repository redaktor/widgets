import {
  DNode, v, w, ThemedBase, ThemedProperties, theme, customElement
} from '../common/Widget';
import { Material, materialClass } from '../common/util';
import { TextInputProperties } from '../baseInput';
import TextInput from '../../widgets/text-input';
import * as css from '../themes/redaktor-default/split-pane.m.css';
import * as formCss from './styles/form.m.css';
import { GlobalEvent } from '../global-event/index';

/**
 * @type FormProperties
 *
 * Properties that can be set on a Form component
 *
 * @property material
 * @property onResize       Called when the divider is dragged; should be used to update `size`
 */
export interface FormProperties extends ThemedProperties {
  material?: Material | keyof typeof Material;
  hasTraps?: boolean;

  csurf?: boolean | TextInputProperties; /* default true */


	onResize?(): void; /* TODO FIXME (size: number) */
  onBeforeSubmit?(): void;
}

@theme(css)
@customElement<FormProperties>({
	tag: 'redaktor-Form',
	properties: [ 'theme', 'material', 'extraClasses', 'hasTraps', 'csurf' ],
	events: [ 'onResize' ]
})
export class FormBase<P extends FormProperties = FormProperties> extends ThemedBase<P> {
  protected isSubmitting = false;

	private _onResize = () => {
		this.properties.onResize && this.properties.onResize(); /* TODO FIXME (size: number) */
	}

  protected getProperties(): any {
    return this.properties
  }
  protected privateFields(): DNode[] {
    return []
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    alert('submit');
    const { onBeforeSubmit } = this.getProperties();
    this.isSubmitting = true;
    if (typeof onBeforeSubmit === 'function') { onBeforeSubmit() }

    this.invalidate()
  }

	protected render(): DNode {
    const { hasTraps, csurf } = this.getProperties();
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfCheck = !csurf ? null :
      v('input', {
        type: 'hidden',
        name: '_csrf',
        value: csrfMeta && csrfMeta.getAttribute('content') || ''
      })
    const trap = !hasTraps ? null :
      v('div', {
        'aria-hidden': 'true', classes: [ formCss.invisible ]
      }, [
        w(TextInput, {
          responsive: false,
          labelStatic: true,
          label: 'username',
          name: 'user',
          placeholder: 'Enter your username'
        }),
        v('input', {type: 'hidden', name: 'agreed', value: ''}),
        v('input', {type: 'checkbox', name: 'agreed', value: 'TRUE'})
      ]);
    //console.log('MATERIAL', materialClass(this.properties.material))
		return v('form', {

      action: '#',
      method: 'POST',

      classes: [
        formCss.root,
        ...this.theme([css.root]),
        materialClass(this.properties.material)
      ],
      onsubmit: this.onSubmit,
			key: 'root'
		}, [
			w(GlobalEvent, {
				key: 'global',
				window: {
					resize: this._onResize
				}
			}),
      csrfCheck,
      trap,
			...this.children,
      ...this.privateFields()
		]);
	}
}

export default class Form extends FormBase<FormProperties> {}
