import { RedaktorWidgetBase, DNode, w, theme, customElement } from '../common/Widget';
import {
  CustomAriaProperties, LabeledProperties, RedaktorProperties
} from '../common/interfaces';
import { diffProperty } from '@dojo/framework/core/decorators/diffProperty';
import { reference } from '@dojo/framework/core/diff';
import { FocusProperties } from '@dojo/framework/core/mixins/Focus';
import { formatAriaProperties } from '../common/util';
//import uuid from '../../framework/uuid';
import Listbox, { ListboxProperties } from '../listbox/index';
import Icon from '../icon/index';
import * as css from '../themes/redaktor-default/listbox.m.css';
//import * as css from '../themes/redaktor-default/select.m.css';

/**
 * @type SelectProperties
 *
 * Properties that can be set on a Select component
 *

 */
 export interface SelectProperties extends
 RedaktorProperties, CustomAriaProperties, FocusProperties, LabeledProperties {
  /* TODO goes to main / RedaktorCSS */
  animated?: boolean;
  /* <-- */
  activeIndex?: number | number[];
  multiple?: boolean;
  muted?: boolean;
  options?: any[];
  raised?: boolean;
  scroll?: boolean | number;
  tabIndex?: number;
  useNativeElement?: boolean;
  visualFocus?: boolean;
  widgetId?: string;

  getOptionDisabled?(option: any, index: number): boolean;
  getOptionId?(option: any, index: number): string;
  getOptionLabel?(option: any, index: number): DNode;
  getOptionSelected?(option: any, index: number): boolean;
  //getOptionValue?(option: any, index: number): string; // TODO
  onActiveIndexChange?(index: number, key?: string | number): void;
  onOptionSelect?(index: number, key?: string | number): void;
  onKeyDown?(event: KeyboardEvent, key?: string | number): void;
  onBlur?(key?: string | number): void;
  onFocus?(key?: string | number): void;
  onChange?(option: any, key?: string | number): void; // TODO
 }

@theme(css)
@diffProperty('options', reference)
@customElement<SelectProperties>({
	tag: 'redaktor-listbox',
	properties: [
		'activeIndex',
		'focus',
		'multiple',
    'raised',
		'tabIndex',
		'visualFocus',
		'options',
		'getOptionDisabled',
		'getOptionId',
		'getOptionLabel',
		'getOptionSelected'
	],
	attributes: [
		'widgetId'
	],
	events: [
		'onActiveIndexChange',
		'onOptionSelect',
		'onKeyDown',
		'onFocus',
		'onBlur',
    'onChange'
	]
})
export default class Select extends RedaktorWidgetBase<SelectProperties> {
  private _getOptionValue(option: any) {
    if (typeof option === 'string') { return option }
    return typeof option.value === 'string' ? option.value : ''
  }

/*
  private _getOptionSelected = (option: any, index: number) => {
    const { getOptionValue, value } = this.properties;
    return getOptionValue ? getOptionValue(option, index) === value : option === value;
  }

  // native select events
  private _onNativeChange (event: Event) {
    const { key, getOptionValue, options = [], onChange } = this.properties;
    event.stopPropagation();
    const value = (<HTMLInputElement> event.target).value;
    const option = find(options, (option: any, index: number) => getOptionValue ?
      getOptionValue(option, index) === value : false);
    // FIXME EVENT:
    this.readonlyProp('key', key, event);
    this.readonlyProp('option', option, event);
    this.readonlyProp('value', value, event);
    option && onChange && onChange(<Input>event);
  }
*/

  protected render(): DNode {
    const { activeIndex = -1, options = [], onOptionSelect, onChange } = this.properties;
    const listProperties: Partial<ListboxProperties> = this.properties;

    return w(Listbox, {
      ...listProperties,
      widgetId: `${listProperties.widgetId}` || `lb${Date.now()}`,//uuid(),
      autoOpen: true,
      autoOrder: true,
      optionData: options,
      onOptionSelect: (index: number, key?: string | number) => {

        onOptionSelect && onOptionSelect(index, key);

        // onChange && onChange(option, key); // TODO
      }
    })
  }
}
