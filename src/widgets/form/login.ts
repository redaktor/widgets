import {
  DNode, v, w, customElement /*,ThemedBase, ThemedProperties, theme */
} from '../common/Widget';
//import MetaBase from '@dojo/framework/core/meta/Base';
import { FormBase, FormProperties } from './';
import Button from '../../widgets/button';
import TextInput from '../../widgets/text-input';
export interface LoginFormProperties extends FormProperties {}

/* TODO
class InputValue extends MetaBase {
	get(key: string): string {
		const node = this.getNode(key);
		return node && (<any>node).value ? (<any>node).value : '';
	}
}
*/

// TODO THEMED
//@theme(css)
@customElement<FormProperties>({
	tag: 'redaktor-LoginForm',
	properties: [ 'theme', 'material', 'extraClasses', 'hasTraps', 'csurf' ],
	events: [ 'onResize' ]
})
export default class LoginForm<P extends LoginFormProperties = LoginFormProperties> extends FormBase<P> {

  protected submit() {

    //console.log(this, this.meta(InputValue).get('u'))
  }
  protected getProperties() {
    return { ...this.properties, hasTraps: true, csurf: true, onBeforeSubmit: this.submit }
  }
  protected privateFields(): DNode[] {

    //const token = !this.isSubmitting ? '' :

    return [
      w(TextInput, {
        responsive: true,
        outlined: true,
        labelStatic: true,
        label: 'eMail',
        type: 'email',
        name: 'u',
        key: 'u',
        placeholder: 'optional placeholder'
        //,helperText: 'Lorem Ipsum - helperText'
      }),
      w(TextInput, {
        responsive: true,
        outlined: true,
        labelStatic: true,
        label: 'password',
        type: 'password',
        name: 'p',
        key: 'p',
        placeholder: 'optional placeholder'
        //,helperText: 'Lorem Ipsum - helperText'
      }),
      v('input', {
        type: 'hidden',
        name: 'p',
        key: 'token'
      }),
      v('br'),
      w(Button, {
        responsive: true,
        schema: 'primary',
        type: 'submit'
      }, [ 'Login' ])
    ]
  }

}
