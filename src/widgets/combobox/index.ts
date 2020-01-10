import { I18nMixin } from '@dojo/framework/core/mixins/I18n';
import { FocusMixin, FocusProperties } from '@dojo/framework/core/mixins/Focus';
import Focus from '@dojo/framework/core/meta/Focus';
import MetaBase from '@dojo/framework/core/meta/Base';
import commonBundle from '../common/nls/common';
import { RedaktorWidgetBase, v, w, theme, customElement, DNode } from '../common/Widget';
import { formatAriaProperties, keyName } from '../common/util';
import {
	Input, CommonMessages, RedaktorProperties, LabeledProperties, PointerEventProperties,
	KeyEventProperties, CustomAriaProperties
} from '../common/interfaces';
import TextInput, { TextInputProperties } from '../text-input';
import Listbox, { ListboxProperties, Operation } from '../listbox';
//import uuid from '../../framework/uuid';
import * as css from '../themes/redaktor-default/listbox.m.css';
import * as comboCss from '../themes/redaktor-default/combobox.m.css';

/* TODO native autocomplete
// TODO strict mode
// TODO onSort / onSortRemaining (notMatches)
// TODO multiple ???
// TODO - phonetic search - localized AS string !!!  */
import Search, { SearchResult } from '../../framework/String/search/';
import phonetics from '../../framework/String/phonetic/doubleMetaphone';
import germanPhonetics from '../../framework/String/phonetic/colognePhonetics';
import spanishPhonetics from '../../framework/String/phonetic/spanishPhonology';
//import Bitap from '../../framework/String/search/bitap';
//import sentences from '../../framework/String/tokenize/sentences';

interface Indices { type: 'exact'|'token'|'fuzzy', range: [number, number] }

export interface ComboBoxProperties extends RedaktorProperties, LabeledProperties,
PointerEventProperties, KeyEventProperties, CustomAriaProperties {
	/* TODO goes to main / RedaktorCSS */
  animated?: boolean;
  /* <-- */

	strict?: boolean;
	clearable?: boolean;
	disabled?: boolean;

	helperText?: string;
	widgetId?: string;
	openOnFocus?: boolean; /* default true */
	blurOnSelect?: boolean; /* default true */
	valid?: { valid?: boolean; message?: string } | boolean;
	readOnly?: boolean;
	required?: boolean;
	results?: any[];
	sortable?: boolean;
	value?: number | string;

	getOptionText?(result: any, index: number, input: string): string;
	getOptionLabel?(result: any, index: number, output: DNode): DNode;

	getOptionSelected?(result: any, index: number): boolean;
	getOptionDisabled?(result: any): boolean;
	getValue?(result: any, index: number): any;

	onBlur?(evt: FocusEvent, value: string, key?: string | number): void;
	onFocus?(evt: FocusEvent, value: string, key?: string | number): void;
	onChange?(value: string, index: number, key?: string | number): void;
	onMenuChange?(open: boolean, key?: string | number): void;

	onRequestResults?(key?: string | number): void;
	onResultSelect?(result: any, index: number, key?: string | number): void;
	onValidate?(valid: boolean | undefined, message: string): void;

	onToken?(result: string): string[];
	onSort?(result: Result): (-1 | 0 | 1);
	/* TODO ???
	events: [
		'onChange', 'onBlur', 'onFocus',
		'onClick', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	] */

	// Input Properties partial
	name?: string;
	maxLength?: number | string;
	minLength?: number | string;
	leading?: DNode[];
	trailing?: DNode[];
	autofocus?: boolean;
	autocomplete?: boolean | string;
	pattern?: string | RegExp;
	placeholder?: string;
	spellcheck?: boolean;
	// Listbox Properties partial
	bottom?: boolean;
	focus?: boolean;
	raised?: boolean;
	muted?: boolean;
	scroll?: boolean | number;
	useNativeElement?: boolean;
}
// Enum used when traversing items using arrow keys
export interface Result { value: string, intersection: string[], score: number }
export const i18nBase = I18nMixin(RedaktorWidgetBase);

export class ScrollViewMeta extends MetaBase {
	public scroll(key: string | number): void {
		const node = this.getNode(key);
		if (node) {
			node.scrollIntoView({block: "end", behavior: "smooth"});
		}
	}
}

@theme(css)
@customElement<ComboBoxProperties>({
	tag: 'redaktor-text-input',
	attributes: [
		'widgetId', 'label', 'placeholder', 'leading', 'trailing',
		'size', 'schema', 'minLength', 'maxLength', 'value', 'name'
	],
	properties: [
		'aria', 'disabled', 'valid', 'required', 'readOnly', 'labelHidden',
		'autofocus', 'size', 'theme', 'schema', 'extraClasses'
	]
})
export default class ComboBox extends FocusMixin(i18nBase)<ComboBoxProperties> {
	private _boundGetOptionText = this._getOptionText.bind(this);
	private _hasMatch = false;
	private _hadMatch = false;
	private _indexed: DNode[];
	private _indexes: number[];
	private _activeIndex = -1;
	private _callInputFocus = false;
	private _ignoreBlur: boolean;
	private _idBase = `combo${Date.now()}`//uuid();
	private _menuHasVisualFocus = false;
	private _open: boolean = false;
	private _wasOpen: boolean = false;

	protected _value: string;
	protected _defaultValue = '';
	protected _onTokens = {
		whitespace: (str: string) => {
			//str = _.toStr(str);
		  return str ? str.split(/\s+/) : [];
		},
		nonword: (str: string) => {
			//str = _.toStr(str);
			return str ? str.split(/\W+/) : [];
		}
	}
	protected _onSorts = {
		score: (a: Result, b: Result) => {
		  return a.score < b.score ? 1 : -1
		}
	}

/*
// TODO autofill / spellchecker ? "insertReplacementText"
		this._value = (<HTMLInputElement>event.target).value;
		this.readonlyProp('value', this._value, event);
		this.properties.onInput && this.properties.onInput(event);
		this.invalidate()
	}
*/
	protected searchResult(query: string, indices: Indices[]) {
		const firstIndex = indices[0].range[0];
		const children: DNode[] = indices.reduce((_children: DNode[], o, i) => {
			const text = query.substring(o.range[0], o.range[1]);
	  	const next = i+1 === indices.length ? void 0 : indices[i+1].range[0];
			// TODO might go to Search
			/*const considerExact = this._value.toLowerCase() === text.toLowerCase();*/
			return _children.concat(
				v('u', {
					key: `${Date.now()}`,//uuid(),
					classes: this.theme([css.match, css[o.type]])
				},[text]),
				query.substring(o.range[1], next)
			)
	  }, !firstIndex ? [] : [query.substring(0, firstIndex)]);
	  return v('span', children);
	}

	protected _indexResults(query: string = this._value) {
		const {
			results = [], sortable = true,
			onToken = this._onTokens.whitespace,
			onSort = this._onSorts.score
		} = this.properties;
		this._indexes = [];
		this._hadMatch = this._hasMatch;
		this._hasMatch = false;

		if (!query) {
			this._indexed = results.map(this._boundGetOptionText);
			return this._indexed
		}
		// TODO : or phonetic ...
		const resultTexts = new Search(results.map(this._boundGetOptionText), {
			shouldSort: sortable,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			tokenize: true
		});

		this._indexed = resultTexts.search(query).map((r, indexedI) => {
			this._indexes.push(r.index);
			if (!r.matches.length) { return r.value }
			if (r.score === 0) {
				this._value = r.value;
				this._hasMatch = true;
				if (!this._menuHasVisualFocus) { this._activeIndex = 0 }
			}
			const indexMap = new Map();
			r.matches.forEach((m) => m.indices.forEach((o: Indices) => indexMap.set(o, 1)));
			return this.searchResult(r.value, Array.from(indexMap.keys()))
		});
		return this._indexed
	}

	private _onMenuChange() {
		const { key, onMenuChange } = this.properties;
		if (!onMenuChange) { return }
		this._open && !this._wasOpen && onMenuChange(true, key);
		!this._open && this._wasOpen && onMenuChange(false, key);
	}

	private _onInput(evt: Input | any) {
		const { key, onChange } = this.properties;
		this._menuHasVisualFocus = false;
		this._open = true;
		this._value = evt.value;
		onChange && onChange(evt.value, this._activeIndex, <any>key);
		this.readonlyProp('value', this._value, event);
		this.invalidate()
	}
	private _onResultMouseDown(event: MouseEvent) {
		event.stopPropagation();
		// Maintain underlying input focus on next render
		this._ignoreBlur = true;
		this._callInputFocus = true;
	}
	private _onInputBlur(evt: FocusEvent) {
		const { key, onBlur } = this.properties;
		if (this._ignoreBlur) {
			this._ignoreBlur = false;
			return;
		}
		const value = this._value; // TODO FIXME !
		onBlur && onBlur(evt, value, key);
		this._open && this._closeMenu();
	}
	private _onInputFocus(evt: FocusEvent) {
		const { key, disabled, readOnly, onFocus, openOnFocus = true } = this.properties;
		const value = this._value; // TODO FIXME !
		onFocus && onFocus(evt, value, key);
		const _onlyFocus = this._callInputFocus;
		this._callInputFocus = false;
		!disabled && !readOnly && !_onlyFocus && openOnFocus && this._openMenu();
	}
	private _openMenu() {
		const { key, onRequestResults } = this.properties;
		/*this._activeIndex = 0;*/
		console.log('_openMenu')
		this._open = true;
		onRequestResults && onRequestResults(key);
		this.invalidate();
	}
	private _closeMenu() {
		this._open = false;
		this.invalidate();
	}

	private _getMenuId() {
		return `${this._idBase}-menu`;
	}
	private _getOptionLabel(result: any, index: number) {
		const { getOptionLabel } = this.properties;
		return getOptionLabel ? getOptionLabel(result, index, this._indexed[index]) :
			this._indexed[index];
	}
	private _getOptionText(result: any, index: number) {
		const { getOptionText } = this.properties;
		return getOptionText ? getOptionText(result, index, this._value) :
			((typeof result === 'object' && 'value' in result) ? result.value : `${result}`);
	}
	private _getOptionSelected(result: any, index: number) {
		const { getOptionSelected, value } = this.properties;
		return getOptionSelected
			? getOptionSelected(result, index)
			: this._getOptionLabel(result, index) === value;
	}
	private _getOptionId(result: any, index: number) {
		return `${this._idBase}-result${index}`;
	}
	private _getValue(result: any, index: number) {
		const { getValue = this._boundGetOptionText } = this.properties;
		return getValue ? `${getValue(result, index)}` : `${result}`;
	}

	private _selectIndex(
		index = this._activeIndex, key = this.properties.key, isFresh: boolean = true
	) {
		const { onChange, onResultSelect, blurOnSelect = true, results = [] } = this.properties;
		const i = this._indexes.length ? this._indexes[index] : index;
		const changed = this._activeIndex !== index;
		this._value = this._getOptionText(results[i], i);
		(this._hasMatch || changed) && onChange && onChange(this._getValue(results[i], i), i, key);
		(this._hasMatch || isFresh) && onResultSelect && onResultSelect(results[i], i, key);
		this._open && this._closeMenu();
	}
	private _selectedIndex(index = this._activeIndex, key = this.properties.key) {
		this._selectIndex(index, key, false);
	}

	protected renderInput() {
		const inputProperties: Partial<TextInputProperties> = this.properties;
		const {
			autofocus, blurOnSelect = true, strict = false, results = []
		} = this.properties;
		if (this._open) { inputProperties.labelStatic = true }
		return w(TextInput, {
			...inputProperties,
			key: 'textinput',
			type: 'text',
			controls: this._getMenuId(),
			aria: {
				...(!this._open ? {} : {
					activedescendant: this._getOptionId(0, this._activeIndex)
				}),
				autocomplete: 'list'
			},
			autofocus: (!this._wasOpen && autofocus) || (!blurOnSelect && this._callInputFocus),
			focus: this.shouldFocus,
			value: this._value,
			helperText: undefined,
			onInput: this._onInput,
			onClick: () => !this._open && this._openMenu(),
			onFocus: this._onInputFocus,
			onBlur: this._onInputBlur,
			onKeyDown: this._onInputKeyDown,
			onChange: void 0,
			invalid: strict && !this._hasMatch
			//valid: strict ? this._hasMatch : true
			//customValidator: !strict ? null : (v: string) => ({ valid: this._hasMatch, message: '' })
			// TODO onValidate

		})
	}
	protected renderMenu() {
		const {
			getOptionDisabled, onChange, blurOnSelect = true, sortable = true,
			animated = true, results = []
		} = this.properties;
		if (!results.length || (!this._open && !animated)) { return null }

		const listProperties: Partial<ListboxProperties> = this.properties;
		const wasOpen = this._wasOpen;
		this._wasOpen = this._open;

		//console.log('render menu', this._activeIndex, this._menuHasVisualFocus);
		console.log('_opening', !wasOpen && this._open, '::', wasOpen, this._open)
		// TODO shaped
		return v('div', {
			key: 'dropdown',
			classes: [
				comboCss.dropdown,
				this._open === true ? comboCss.open : comboCss.closed
			],
			onmousedown: this._onResultMouseDown
		}, [
			w(Listbox, {
				...listProperties,
				key: this._getMenuId(),
				widgetId: this._getMenuId(),
				autoOpen: false,
				autoOrder: false,
				label: undefined,
				activeIndex: this._activeIndex > -1 ? this._activeIndex : void 0,
				optionData: this._indexed,

				tabIndex: -1, //this._open ? 0 : -1,
				closed: !this._open,
				_opening: !wasOpen && this._open,
				getOptionDisabled,
				/* getOptionId: this._getOptionId, TODO FIXME */
				getOptionLabel: this._getOptionLabel,
				/* getOptionSelected: this._getOptionSelected, TODO FIXME */
				onActiveIndexChange: (index: number) => {
					//console.log('index change V', index, this._value);
					this._activeIndex = this._indexes.length ? this._indexes[index] : index;
					this.invalidate();
				},
				onOptionSelect: this._selectIndex
			})
		])
	}

	protected render(): DNode {
		/*console.log('PHONE en', phonetics('This is an englisch sentence.'));
		console.log('PHONE de', germanPhonetics('Sebastian Lasse und ein Baum'));
		console.log('PHONE es', spanishPhonetics('La polilla crepuscular de Madagascar describió'));*/
		//console.log(!this.properties.value, !this._value);

		//console.log('render', this._activeIndex, !this._hadMatch && this._hasMatch);
		this._idBase = `${Date.now()}`//uuid();
		this._onMenuChange();
		this._indexResults();
		if (!this._hasMatch && !this._menuHasVisualFocus) {
			this._activeIndex = -1;
		} else if (!this._hadMatch && this._hasMatch) {
			this._selectedIndex();
		}
		if (this._open) {
			this.meta(ScrollViewMeta).scroll('dropdown');
		}
    return v('div', {
      key: 'root'
		}, [
			this.renderInput(),
			this.renderMenu()
		])
	}



	// KEYBOARD NAVIGATION
	private _moveActiveIndex(operation: Operation) {
		const { onResultSelect, key, results = [] } = this.properties;
		if (!results.length) {
			this._activeIndex = -1;
			this.invalidate();
			return;
		}
		const total = results.length;
		const nextIndex = ((this._activeIndex) + operation + total) % total;
		const i = this._indexes.length ? this._indexes[nextIndex] : nextIndex;
		this._activeIndex = nextIndex;
		this.invalidate();
		onResultSelect && onResultSelect(results[i], i, key);
	}
	private _onInputKeyDown(event: KeyboardEvent) {
		const {
			disabled,
			readOnly,
			getOptionDisabled = () => false,
			blurOnSelect = true,
			results = []
		} = this.properties;
		const pressed = keyName(event);
		const visualFocus: any = {ArrowUp:1, ArrowDown:1, Home:1, End:1}
		if (visualFocus[pressed]) { this._menuHasVisualFocus = true }

		switch (pressed) {
			case 'ArrowUp':
				event.preventDefault();
				this._moveActiveIndex(Operation.decrease);
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (!this._open && !disabled && !readOnly) {
					this._openMenu();
				} else if (this._open) {
					this._moveActiveIndex(Operation.increase);
				}
				break;
			case 'Escape':
				this._open && this._closeMenu();
				this._menuHasVisualFocus = false;
				break;
			case 'Enter':
			case ' ':
				const hasFocus = this._menuHasVisualFocus;
				const isDisabled = getOptionDisabled(results[this._activeIndex]); /* TODO indexed results */
				if (pressed === ' ' && hasFocus) { event.preventDefault() }
				if ((pressed === ' ' && !hasFocus) || (hasFocus && isDisabled)) {
					return;
				}
				this._menuHasVisualFocus = false;
				if (this._open) {
					if (blurOnSelect && !this._ignoreBlur && !this._callInputFocus) {
						this.meta(Focus).set('root');
						if ("activeElement" in document) (<any>document).activeElement.blur();
					}
					this._selectedIndex();
				}
				break;
			case 'Home':
				this._activeIndex = 0;
				this.invalidate();
				break;
			case 'End':
				this._activeIndex = results.length - 1;
				this.invalidate();
				break;
		}
	}

		//abcdefghijklmnopq
		/*
		const s = new Search(['lirem', 'lo', 'xzy', 'lorem'], {
			shouldSort: true,
		  threshold: 0.6,
		  location: 0,
		  distance: 100,
		  maxPatternLength: 32,
		  minMatchCharLength: 1,
			//findAllMatches: true,
			//verbose: true,
			//id: 'myID'
			//getFn: (o) => { console.log('o',o); return o }
		});
		const sO = new Search([{value:'lirem'}, {value:'lo'}, {value:'xzy'}, {value:'lorem'}], {
			shouldSort: true,
		  threshold: 0.6,
		  location: 0,
		  distance: 100,
		  maxPatternLength: 32,
		  minMatchCharLength: 1,
			//findAllMatches: true,
			//verbose: true,
			//id: 'myID',
			keys: ['value']
			//getFn: (o) => { console.log('o',o); return o }
		});
		const b = new Bitap('lorem or ipsum', {});

		//console.log('...', b.search('loremabcdefghijklmnopp'));
		*/

/*
		console.log('lorem', b.search('lorem'));
		console.log('lirems', b.search('lirems'));
		console.log('lo', b.search('lo'));
		console.log('or', b.search('or'));
		console.log('no', b.search('no'));
		console.log('em', b.search('em'));
		*/
//		console.log(sentences('f.y.i: this is a 1st sentence! And this is sentence 2.0. One more e.g. with abbrev.'))

/*
		console.log('PHONE en', phonetics('This is an englisch sentence.'));
		console.log('PHONE de', germanPhonetics('Sebastian Lasse und ein Baum'));
		console.log('PHONE es', spanishPhonetics('La polilla crepuscular de Madagascar describió'));

		console.log('or', s.search('or'));
		console.log('or obj', sO.search('or'));
		*/
	protected getFixedRootClasses() {
		//const focus = this.meta(Focus).get('root');
		//return [comboCss.root, focus.containsFocus ? comboCss.focused : null]
	}


}
