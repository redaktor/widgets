import { Input, CommonMessages } from '../common/interfaces';
import { v, w, theme, customElement, DNode } from '../common/Widget';
//import { MaterialSchema } from '../common/util';
import TextInputBase, { TextInputProperties as TIP } from '../baseInput';

import { intersection as getIntersection } from '../../framework/Array/diu';
import Icon from '../icon/index';
import Listbox from '../listbox/index';
import commonBundle from '../common/nls/common';
import { I18nMixin } from '@dojo/framework/core/mixins/I18n';
import Focus from '@dojo/framework/core/meta/Focus';
import uuid from '../../framework/uuid';
import * as css from '../themes/redaktor-default/text-input.m.css';
import * as fixedCss from '../text-input/styles/text-input.m.css';
import * as comboCss from '../themes/redaktor-default/combobox.m.css';

//import Bitap from '../../framework/String/search/bitap';
//import Search from '../../framework/String/search/';
//import phonetics from '../../framework/String/phonetic/doubleMetaphone';
//import germanPhonetics from '../../framework/String/phonetic/colognePhonetics';
//import spanishPhonetics from '../../framework/String/phonetic/spanishPhonology';
//import sentences from '../../framework/String/tokenize/sentences';

export interface ComboBoxProperties extends TIP {
	clearable?: boolean;
	sortable?: boolean;
	getResultLabel?(result: string): string;
	getResultSelected?(result: string, index: number, activeIndex: number): boolean;
	widgetId?: string;
	isResultDisabled?(result: any): boolean;
	onMenuChange?(open: boolean, key?: string | number): void;
	onRequestResults?(key?: string | number): void;
	openOnFocus?: boolean;
	results?: any[];
  resultsRequired?: boolean;
	onToken?: (result: string) => string[];
	onSort?: (result: Result) => (-1 | 0 | 1);
}
// Enum used when traversing items using arrow keys
export enum Operation { increase = 1, decrease = -1 }
export interface Result { value: string, intersection: string[], score: number }
export const i18nBase = I18nMixin(TextInputBase);

@theme(css)
@customElement<ComboBoxProperties>({
	tag: 'redaktor-text-input',
	attributes: [
		'widgetId', 'label', 'placeholder', 'leading', 'trailing', 'controls',
		'type', 'size', 'schema', 'minLength', 'maxLength', 'value', 'name'
	],
	properties: [
		'aria', 'disabled', 'valid', 'required', 'readOnly', 'labelHidden',
		'autofocus', 'size', 'theme', 'schema', 'extraClasses'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onInput', 'onMouseDown', 'onMouseUp',
		'onKeyDown', 'onKeyPress', 'onKeyUp', 'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class ComboBox extends i18nBase<ComboBoxProperties> {
	private _activeIndex = 0;
	private _callInputFocus = false;
	private _ignoreBlur: boolean | undefined;
	private _idBase = uuid();
	private _menuHasVisualFocus = false;
	private _open: boolean | undefined;
	private _wasOpen: boolean | undefined;
	private tokenMap: any = new Map();
	private resultsMap: any = new Map();
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
	onAttach() {
		this.resultsMap = new Map();
		const { results = [], onToken = this._onTokens.whitespace } = this.properties;
		const length = results.length;
		let index = 0;
	  for (index = 0; index < length; index++) {
	  	if (!results[index]) { continue; }
	    const res = typeof results[index] === 'string' ?
				results[index].toLowerCase() : results[index];
	    this.resultsMap.set(res, index);

			onToken(res).map((term, wordIndex) => {
	      const termList = this.tokenMap.get(term) || [];
	    	// remember the index within the original array
	      termList.push([index, wordIndex]);
	    	this.tokenMap.set(term, termList);
	    })
	  }
	}

	protected _onFocus(event: FocusEvent) {
		if (this.resultsMap.has(this._inputValue.toLowerCase())) {
			(<any>event.target).select();
		}
		this.properties.onFocus && this.properties.onFocus(event);
	}
	protected _onInput(event: Input) {
		event.stopPropagation();
		if (!!this.isComposing) {
			if (!this.has.compositionEvent) {
				this.isComposing = false;
			}
			return
		}
// TODO autofill / spellchecker ? "insertReplacementText"
		this._value = (<HTMLInputElement>event.target).value;
		this.readonlyProp('value', this._value, event);
		this.properties.onInput && this.properties.onInput(event);
		this.invalidate()
	}
	protected _sortMenu(query: string = this._value) {
		const {
			results = [],
			onToken = this._onTokens.whitespace,
			onSort = this._onSorts.score
		} = this.properties;
		if (!query) { return results }
		query = query.toLowerCase();
		const scoredResults: any[] = new Array(results.length);
	  const fullMatch = this.resultsMap.get(query);
		const tokens = onToken(query);
	  let token: string;
	  length = tokens.length;
/*
	  if (typeof fullMatch === 'number') {
			const fullResponse = response[fullMatch];
console.log('!!!', fullResponse);
			if (typeof fullResponse === 'object') {
				response[fullMatch].full = true
			} else {
				response[fullMatch] = {value: response[fullMatch], full: true}
			}
	  }*/
		//console.log('!!!', fullMatch);
	  let index = 0;
	  /*tokenLoop:*/
	  for (index = 0; index < length; index++) {
	  	if (!tokens[index]) { continue; }

	    token = tokens[index];
			console.log('!!!', token, fullMatch);

	    const tokenSplit = token.split('');

	    for (var [result, indices] of this.tokenMap) {
	    	if (!indices.length) { continue }
	      const intersection = getIntersection(tokenSplit, ...result.split(''));
				const pos = token.search(result);
				let score = intersection.length / (token.length / result.length);
				if (pos === 0) { score += (token === result) ? (tokens.length - index) : 0.5; }
				indices.forEach((i_word: any[]) => {
					const [i,word] = i_word;
					if (typeof fullMatch === 'number' && fullMatch === i) { score = 1000 }
					if (token === result) { score += tokens.length - word; }
					if (typeof scoredResults[i] === 'object') {
						scoredResults[i].intersection = scoredResults[i].intersection.concat(intersection);
						scoredResults[i].score += score;
						scoredResults[i].words.push(word);
					} else {
						const value = typeof results[i] === 'string' ? results[i] : results[i].value;
						scoredResults[i] = {value, intersection, score, words: [word]};
					}
				});
	    }
	  }
		scoredResults.sort(onSort)
		console.log(query, scoredResults);
		return scoredResults
	}
	private _openMenu() {
		const { key, onRequestResults } = this.properties;
		/*this._activeIndex = 0;*/
		this._open = true;
		onRequestResults && onRequestResults(key);
	//	this.invalidate();
	}
	private _closeMenu() {
		this._open = false;
	//	this.invalidate();
	}
	private _getMenuId() {
		return `${this._idBase}-menu`;
	}

	private _getResultLabel(result: any) {
		const { getResultLabel } = this.properties;
		return getResultLabel ? getResultLabel(result) :
			((typeof result === 'object' && 'value' in result) ? result.value : `${result}`);
	}
	private _getResultSelected(result: any, index: number) {
		const { getResultSelected } = this.properties;
		return getResultSelected ?
      getResultSelected(result, index, this._activeIndex) : index === this._activeIndex;
	}
	private _getResultId(result: any, index: number) {
		return `${this._idBase}-result${index}`;
	}

	protected renderMenu() {
		const {
			theme, isResultDisabled, onChange, sortable = true, results = []
		} = this.properties;
		if (!Array.isArray(results) || !results.length /* TODO || !this._open*/) { return null }
//console.log(this._getMenuId());
		return v('div', {
			key: 'dropdown',
			classes: [comboCss.dropdown],
			//onmouseover: this._onResultHover,
			//onmousedown: this._onResultMouseDown
		}, [
			w(Listbox, {
				theme,
				raised: true,
				key: 'listbox',
				activeIndex: this._activeIndex,
				widgetId: this._getMenuId(),
				optionData: sortable ? this._sortMenu() : results,
				visualFocus: this._menuHasVisualFocus,
				tabIndex: this._open ? 0 : -1, // was -1
				getOptionDisabled: isResultDisabled,
				getOptionId: this._getResultId,
				getOptionLabel: this._getResultLabel,
				getOptionSelected: this._getResultSelected,
				onActiveIndexChange: (index: number) => {
					this._activeIndex = index;
					this.invalidate();
				},
				onOptionSelect: (option: any) => {

					// FIXME EVENT:
					this.readonlyProp('option', option, event);
					this.readonlyProp('value', option.value, event);
					onChange && onChange(<Input>event);
					this.meta(Focus).set('trigger');
					this._closeMenu();
				}
			})
		])
	}

	private _onClearClick(event: any) {
		event.stopPropagation();
		const { key, onChange } = this.properties;
		this._callInputFocus = true;
		/*this._value = '';*/
		this.invalidate();
		this.readonlyProp('key', key, event);
		this.readonlyProp('value', '', event);
		onChange && onChange(event);
	}
	private _onTriggerClick(event: MouseEvent) {
		event.stopPropagation();
		const { disabled, readOnly } = this.properties;
		if (!disabled && !readOnly) {
			this._callInputFocus = true;
			this._openMenu();
		}
	}
/*
classes: [
	before ? fixedCss.prefix : fixedCss.suffix,
	before ? css.prefix : css.suffix,
	css.square,
	...this.getSizeClasses(css),
]
*/
	protected renderClearButton(messages: CommonMessages): DNode {
		const { label = '', disabled, readOnly, theme, schema = 'parentSchema' } = this.properties;
		return v('button', {
			key: 'clear',
			'aria-controls': this._getMenuId(),
			classes: [
				comboCss.clear,
				fixedCss.prefix,
				css.prefix,
				css.square,
				...this.getSizeClasses()
				/*,
				...this.theme([
	        comboCss.clear,
	        (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
	      ])*/
			],
			disabled: disabled || readOnly,
			type: 'button',
			onclick: (event: MouseEvent) => this._onClearClick(event),
			'aria-label': `${messages.clear} ${label}`
		}, [
			w(Icon, { type: 'closeIcon', theme })
		]);
	}
	protected renderMenuButton(messages: CommonMessages): DNode {
		const { label = '', disabled, readOnly, theme, schema = 'parentSchema' } = this.properties;
		return v('button', {
			key: 'trigger',
			classes: [
				comboCss.trigger,
				fixedCss.suffix,
				css.suffix,
				css.square,
				...this.getSizeClasses()/*,
				...this.theme([
	        comboCss.trigger,
	        (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
	      ])*/
			],
			disabled: disabled || readOnly,
			tabIndex: -1,
			type: 'button',
			onclick: (event: MouseEvent) => this._onTriggerClick(event),
			'aria-label': `${messages.open} ${label}`
		}, [
			w(Icon, { type: 'downIcon', theme })
		]);
	}

	protected renderInputWrapper() {
		const {
			label, labelStatic, outlined, leading = [], trailing = []
		} = this.properties;
		const { messages } = this.localizeBundle(commonBundle);
		const _input = this.renderInput();

		// TODO ...leading, ...trailing

		const _prefix = this.renderClearButton(messages);
		const _suffix = this.renderMenuButton(messages);
		const addonsInput = label && !labelStatic ?
			[_input, _prefix, _suffix] : [_prefix, _input, _suffix];

		// console.log(this.getSchemaClasses(comboCss));

		return v('div', {
			key: 'wrapper',
			classes: [
				this.theme(css.wrapper),
				...this.getSchemaClasses(css),
				//...this.getSchemaClasses(comboCss),
				//...this.getSizeClasses()
			]

		}, [
			...addonsInput,
			outlined ? null : v('b', {classes: this.theme(css.border)}),
			this.renderLabel(),
			this.renderMenu()
		]);
	}
	protected getFixedRootClasses() {
		//abcdefghijklmnopq
		/*
		const s = new Search(['lirem', 'lo', 'xy', 'lorem'], {
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
		const sO = new Search([{value:'lirem'}, {value:'lo'}, {value:'xy'}, {value:'lorem'}], {
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

		const focus = this.meta(Focus).get('root');
		return [comboCss.root, focus.containsFocus ? comboCss.focused : null]
	}
}
