import {
	CustomAriaProperties, GenericInputProperties, LabeledProperties,
	PointerEventProperties, KeyEventProperties, InputEventProperties, Input,
	HasInput, Level2Input, RedaktorCSS, RedaktorStyleCSS, RedaktorProperties
} from './common/interfaces';
import has from '@dojo/framework/core/has';
import Focus from '@dojo/framework/core/meta/Focus';
import MetaBase from '@dojo/framework/core/meta/Base';
import { FocusMixin, FocusProperties } from '@dojo/framework/core/mixins/Focus';
import { PropertyChangeRecord } from '@dojo/framework/core/interfaces';
import diffProperty from '@dojo/framework/core/decorators/diffProperty';
import { reference } from '@dojo/framework/core/diff';
import { DNode, v } from './common/Widget';
import { LabeledBase } from './common/WidgetLabeled';
import keyboard from './common/events/keyboard';
import { formatAriaProperties } from './common/util';
//import uuid from '../framework/uuid'; // TODO
//import Label from './label/index';
import * as css from './themes/redaktor-default/text-input.m.css';
import * as fixedCss from './text-input/styles/text-input.m.css';
// do NOT allow example@example -
// https://codepen.io/kevinSuttle/post/the-current-state-of-web-forms
export const emailRegexStr = [
	"[a-zA-Z0-9_]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)",
	"*@(?!([a-zA-Z0-9]*\\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\\.))",
	"(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\\.)",
	"+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
].join('');
// TODO https://github.com/Microsoft/TypeScript/issues/17592 (please upvote)
export enum TextInputPatternType {
	'text' = 'text',
	'email' = 'email',
	'search' = 'search',
	'tel' = 'tel',
	'url' = 'url'
}
export enum TextInputType {
	'text' = 'text',
	'hidden' = 'hidden',
	'email' = 'email',
	'number' = 'number',
	'password' = 'password',
	'search' = 'search',
	'tel' = 'tel',
	'url' = 'url'
}

interface TextInputInternalState {
	previousValue?: string;
	previousValid?: boolean;
	previousMessage?: string;
}
function formatAutocomplete(autocomplete: string | boolean | undefined): string | undefined {
	if (typeof autocomplete === 'boolean') {
		return autocomplete ? 'on' : 'off';
	}
	return autocomplete;
}
function formatSpellcheck(spellcheck: boolean | undefined): string | undefined {
	return typeof spellcheck === 'boolean' ? spellcheck.toString() : undefined
}

function formatLength(l: string | number | undefined): string | undefined {
	return typeof l === 'number' || typeof l === 'string' ? `${l}` : undefined
}
function patternDiffer(prevProperty: string | undefined, newProperty: string | RegExp | undefined): PropertyChangeRecord {
	const value = newProperty instanceof RegExp ? newProperty.source : newProperty;
	return {
		changed: prevProperty !== value,
		value
	};
}
export interface InputProperties extends RedaktorProperties, GenericInputProperties,
InputEventProperties, LabeledProperties, FocusProperties, PointerEventProperties,
KeyEventProperties, CustomAriaProperties {
	leading?: DNode[];
	trailing?: DNode[];
	value?: number | string;
	autofocus?: boolean;
	autocomplete?: boolean | string;
// TODO FIXME
	list?: string; // datalist
	customValidator?: ((value: string) => ({ valid?: boolean; message?: string; })) | null;
	onValidate?: (valid: boolean | undefined, message: string) => void;
}
export interface NumberInputProperties {
	min?: number;
	max?: number;
	step?: number;
	arrows?: 'native' | 'arrows' | 'plusminus'
}
/**
 * @type TextInputProperties
 *
 * Properties that can be set on a TextInput component
 *
 * @property controls       ID of an element that this input controls
 * @property type           Input type, e.g. text, email, tel, etc.
 * @property maxLength      Maximum number of characters allowed in the input
 * @property minLength      Minimum number of characters allowed in the input
 * @property placeholder    Placeholder text
 * @property value          The current value
 */
export interface TextInputProperties extends InputProperties, NumberInputProperties {
	controls?: string;
	type?: TextInputType | keyof typeof TextInputType;
	pattern?: string | RegExp;
	maxLength?: number | string;
	minLength?: number | string;
	placeholder?: string;
	spellcheck?: boolean;
	tabindex?: number | string;
	box?: boolean;
}
/* TODO check readonly + size

-> privacy concerns <-
A string that describes what if any type of autocomplete functionality the input should provide
Possible values https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
autocomplete


---  hidden
-> the special value _charset_ causes the hidden input's value to be reported as the
character encoding used to submit the form
name
--- email
Whether or not to allow multiple, comma-separated, e-mail addresses to be entered
multiple

???
The id of a <datalist> element located in the same document which provides a list
of predefined values to suggest to the user for this input.
list




A Boolean attribute which, if present, indicates that the input should automatically have focus
autofocus

A string specifying the <form> element with which the input is associated (that is, its form owner).
form

An optional numeric value that defines both whether or not the input should be focusable through use
of the Tab key as well as whether or not the element participates in sequential focus navigation.
tabindex

Defines whether the element may be checked for spelling errors.
spellcheck


------
+ SubmitInput
image: A graphical submit button.
You must use the src attribute to define the source of the image and the alt attribute
to define alternative text.
You can use the height and width attributes to define the size of the image in pixels.
--- submit
The URL to which to submit the form's data; overrides the form's action attribute,
if any.
formaction
A string specifying the encoding type to use for the form data.
formenctype
The HTTP method (get or post) to use when submitting the form.
formmethod
A Boolean which, if present, means the form's fields will not be subjected to
constraint validation before submitting the data to the server
formnovalidate
The browsing context into which to load the response returned by the server after
submitting the form
formtarget

+ FileInput
file: A control that lets the user select a file.
--- file
One or more unique file type specifiers describing file types to allow
accept
What source to use for capturing image or video data
capture
A FileList listing the chosen files
files
A Boolean which, if present, indicates that the user may choose more than one file
multiple

+ DateInput
A control for entering a date (year, month, and day, with no time).
--- date / time
min
max
step

+ NumberInput
--- number / range
min
max
step

+ ColorInput
color: A control for specifying a color.
*/

class InputValidity extends MetaBase {
	get(key: string | number, value: string) {
		const node = this.getNode(key) as HTMLFormElement | undefined;

		if (!node) {
			return { valid: undefined, message: '' };
		}

		if (value !== node.value) {
			// if the vdom is out of sync with the real dom our
			// validation check will be one render behind.
			// Call invalidate on the next loop.
			setTimeout(() => this.invalidate());
		}

		return {
			valid: node.validity.valid,
			message: node.validationMessage
		};
	}
}

@diffProperty('pattern', patternDiffer)
@diffProperty('leading', reference)
@diffProperty('trailing', reference)
export default class TextInputBase<P extends TextInputProperties = TextInputProperties>
extends FocusMixin(LabeledBase)<P> {

	//protected _uuid: string;
	protected _defaultValue = '';
	protected _fixedLabel = false;
	protected _fixedPrefixes: DNode[] = [];
	protected _fixedSuffixes: DNode[] = [];
	protected _inputElement = 'input';
	protected _hasRange = true;
	/* Input Events Level 2 Polyfill, e.g. for beforeInput
	Trying to catch cancelable events as early as possible
	*/
	/*
	TODO deleteCompositionText deleteByComposition // per ctxMenu deleteContent
	TODO getTargetRanges()
	returns , unless the inputType is "historyUndo" or "historyRedo" or the editing host
	is not a contenteditable element, in which case it returns an empty Array.
	TODO .data
	data holds the value of the characters generated by an input method.
	This MAY be a single Unicode character or a non-empty sequence of Unicode characters.
	Characters SHOULD be normalized as defined by the Unicode normalization form NFC, defined in [UAX15].
	This attribute MAY contain the empty string.
	*/
	protected has: HasInput = {
		documentMode: 0,
		beforeInput: false,
		fallbackCompositionData: false,
		compositionEvent: false,
		textInputEvent: false,
		beforeInputEmitted: false
	};
	protected level2: Level2Input = {
		type: 'beforeinput',
		inputType: '',
		data: null,
		dataTransfer: null,
		isComposing: false,
		getTargetRanges: () => [],
		range: [0,0]
	};
	private _state: TextInputInternalState = {};
	private _validate() {
		const { _state: state, properties: {  onValidate, value, customValidator } } = this;
//console.log('validate', customValidator);
		if (/*!onValidate ||*/ value === undefined || value === null || state.previousValue === value) {
			return;
		}
		const v = `${value}`;
		state.previousValue = v
		let { valid, message = '' } = this.meta(InputValidity).get('input', v);
		console.log(valid, customValidator)
		if (valid && customValidator) {
			const customValid = customValidator(v);
			console.log(customValid)
			if (customValid) {
				valid = customValid.valid;
				message = customValid.message || '';
			}
		}
		if (valid === state.previousValid && message === state.previousMessage) {
			return;
		}
		state.previousValid = valid;
		state.previousMessage = message;
		onValidate && onValidate(valid, message);
	}
	protected get validity() {
		const { valid = { valid: undefined, message: undefined } } = this.properties;
		if (typeof valid === 'boolean') {
			return { valid, message: undefined };
		}
		return {
			valid: valid.valid,
			message: valid.message
		};
	}

	protected set inputType(type: string) { this.level2.inputType = type; }
	protected set data(data: string) {  this.level2.data = data; }
	protected set dataTransfer(event: ClipboardEvent) {
		this.level2.dataTransfer = event.clipboardData ||
			(<any>event).dataTransfer || {};
	}
	protected set range(event: any) {
		if (!!event.target && typeof event.target.selectionStart === 'number') {
			this.level2.range = [
				event.target.selectionStart, event.target.selectionEnd
			];
		}
	}
	protected get hasRange() {
		return this.level2.range[0] !== this.level2.range[1];
	}
	protected get isComposing() { return this.level2.isComposing }
	protected set isComposing(isC: boolean) { this.level2.isComposing = isC }

	constructor() {
		super();
		//this._uuid = uuid();
	}
	onAttach() {
		if (has('host-browser')) {
			const docMode = 'documentMode' in document ? (<any>document).documentMode : 0;
			this.has.documentMode = docMode;
			this.has.compositionEvent = 'CompositionEvent' in window;
		 	this.has.textInputEvent = 'TextEvent' in window && !docMode;
		  this.has.fallbackCompositionData = (!this.has.compositionEvent ||
		    (docMode && docMode > 8 && docMode <= 11));
			this.has.beforeInput = 'onbeforeinput' in document ||
				(('InputEvent' in window) && 'inputType' in (new (<any>window).InputEvent('')));
		}
  }

	// TODO _onMouseUp (event: MouseEvent) { HAD this.range = event;

	protected _onFocus(event: FocusEvent<HTMLInputElement>) {
		this.properties.onFocus && this.properties.onFocus(event);
	}
	protected _onBlur(event: FocusEvent<HTMLInputElement>) {
		this.properties.onBlur && this.properties.onBlur(event);
	}
	protected _onHover(event: MouseEvent) {
		this.properties.onHover && this.properties.onHover(event);
	}
	protected _onMouseDown(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onMouseDown && this.properties.onMouseDown(event);
	}
	protected _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick(event);
	}
	protected _onMouseUp(event: MouseEvent) {
		if (this._hasRange) { this.range = event }
		event.stopPropagation();
		this.properties.onMouseUp && this.properties.onMouseUp(event);
	}
	protected _onTouchStart(event: TouchEvent) {
		event.stopPropagation();
		this.properties.onTouchStart && this.properties.onTouchStart(event);
	}
	protected _onTouchEnd(event: TouchEvent) {
		event.stopPropagation();
		this.properties.onTouchEnd && this.properties.onTouchEnd(event);
	}
	protected _onTouchCancel(event: TouchEvent) {
		event.stopPropagation();
		this.properties.onTouchCancel && this.properties.onTouchCancel(event);
	}

	protected _onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const evt = keyboard(event);
		if (!this.has.beforeInput) {
			if (evt.key === 'Backspace') {
				this.inputType = this.hasRange ? 'deleteContent' :
					(evt.altKey === true ? 'deleteWordBackward' : 'deleteContentBackward');
				this._onBeforeInput(evt);
			} else if (evt.key === 'Delete') {
				this.inputType = this.hasRange ? 'deleteContent' :
					(evt.altKey === true ? 'deleteWordForward' : 'deleteContentForward');
				this._onBeforeInput(evt);
			}
		}
		// TODO contextmenu delete https://github.com/mozilla/notes/issues/423
		this.properties.onKeyDown && this.properties.onKeyDown(evt, () => { event.preventDefault(); });
	}
	protected _onKeyPress(event: KeyboardEvent) {
		event.stopPropagation();
		const evt = keyboard(event);
		if (evt.key.length > 1) {
			return (this.properties.onKeyPress && this.properties.onKeyPress(evt, () => { evt.preventDefault(); }));
		}
		const vOld = <string>this._value||'';
		const v = (<HTMLInputElement>evt.target).value;
		const isTranspose = (v.length === vOld.length && `${v[1]}${v[0]}${v.slice(2)}` === vOld);
		this.inputType = isTranspose ? 'insertTranspose' : 'insertText';
		this.data = evt.key; // TODO ???
		if (!this.has.textInputEvent && !this.has.compositionEvent) {
			this.isComposing = evt.isStart;
		}
		!this.has.beforeInput && this._onBeforeInput(evt);
		this.properties.onKeyPress && this.properties.onKeyPress(evt, () => { evt.preventDefault(); });
	}
	protected _onKeyUp(event: KeyboardEvent) {
		event.stopPropagation();
		if (this._hasRange) { this.range = event }
		const evt = keyboard(event);
		this.properties.onKeyUp && this.properties.onKeyUp(evt, () => { evt.preventDefault(); });
	}

	protected _onComposition(event: UIEvent, type = 'insertCompositionText') {
		this.inputType = type; // TODO beforeInput
		this.isComposing = (type === 'insertCompositionText');
		!this.has.beforeInput && this._onBeforeInput(event);
	}
	protected _onCompositionStart(event: UIEvent) {
		this._onComposition(event);
	}
	protected _onCompositionEnd(event: UIEvent) {
		// TODO if range deleteByComposition
		this._onComposition(event, 'insertFromComposition');
	}

	protected _onCut(event: ClipboardEvent) {
		this.dataTransfer = event;
		this.inputType = 'clipboardData' in event && (<any>event).clipboardData.dropEffect === 'move' ?
			'deleteByDrag' : 'deleteByCut';
		!this.has.beforeInput && this._onBeforeInput(event);
	}
	protected _onPaste(event: ClipboardEvent) {
		this.dataTransfer = event;
		// TODO if level2.range SHOULD WE emit deleteContent ?
		this.inputType = 'clipboardData' in event && (<any>event).clipboardData.dropEffect === 'move' ?
			'insertFromDrop' : 'insertFromPaste';
		!this.has.beforeInput && this._onBeforeInput(event);
	}
	protected _onDrop(event: ClipboardEvent) {
		// TODO if level2.range SHOULD WE emit deleteContent ?
		if (this._hasRange) { this.range = event }
		this.dataTransfer = event;
		this.inputType = 'insertFromDrop';
		!this.has.beforeInput && this._onBeforeInput(event);
	}
	protected _onDragEnd(event: ClipboardEvent) {
		// NOTE browser normalization:
		// Drag to another field means 'Cut' in e.g Safari and 'Copy' in e.g. Firefox
		// TODO if range deleteByDrag
		if (this._hasRange) { this.range = event }
		// TODO check if value changed: deleteByDrag

	}

	protected getCaretRange(el: HTMLInputElement | any) {
		var doc = el.ownerDocument || el.document;
		var win = doc.defaultView || doc.parentWindow;
		if (el.selectionStart && el.selectionEnd) {
			return [el.selectionStart, el.selectionEnd]
		} else if (typeof win.getSelection !== "undefined" && win.getSelection().rangeCount > 0) {
			var range = win.getSelection().getRangeAt(0);
			return [range.startOffset, range.endOffset];
		}
		return [0,0]
	}
	protected _onBeforeInput(event: any) {
		//event.stopPropagation();
		if (!this.has.beforeInput && this.level2.inputType !== '') {
	  	('InputEvent' in window) && (<any>Object).setPrototypeOf(event, (<any>window).InputEvent.prototype);
	    ['type', 'inputType', 'data', 'dataTransfer', 'getTargetRanges'].forEach((key) =>
	    	!(key in event) && this.readonlyProp(key, (<any>this.level2)[key], event))
		}
		//this._value = this._evt('onBeforeInput', event);
		this.readonlyProp('value', this._value, event);
		this.properties.onBeforeInput && this.properties.onBeforeInput(<Input>event);
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
	}
	protected _onChange(event: Input) {
		event.stopPropagation();
		this.readonlyProp('value', this._value, event);
//console.log('_onChange', (<HTMLInputElement>event.target).value, this._value, this.properties.onChange);
		this.properties.onChange && this.properties.onChange(event);
	}

	protected _getRootClasses(ui: RedaktorCSS & RedaktorStyleCSS = css): (string | null)[] {
		const { responsive, required, label, labelStatic/*, invalid = false*/ } = this.properties;
		const focus = this.meta(Focus).get('root');
		return [
			ui.root,
			this.getDisabledClass(ui),
			this.getValidClass(ui),
			...this.getStyleClasses(ui),
			focus.containsFocus ? ui.focused : null,
			responsive === true ? ui.responsive : null,
			required === true ? ui.required : null,
			label && (labelStatic) ? ui.staticLabel : (label ? ui.slideLabel : ui.noLabel)
		];
	}
	protected getRootClasses(): (string | null)[] { return this._getRootClasses() }
	protected getInputClasses(): (string | null)[] { return [css.input] }
	protected getWrapperClasses(): (string | null)[] { return [css.wrapper] }
	protected getFixedRootClasses(): (string | null)[] { return [] }
	protected getFixedInputClasses(): (string | null)[] { return [ fixedCss.input ] }





	protected getInputProperties(): any {
		const {type = 'text', autocomplete} = this.properties;
		let { pattern, maxLength, minLength, spellcheck } = this.properties;
		if (pattern instanceof RegExp) { pattern = pattern.source; }
		if (!(type in TextInputPatternType)) {
			pattern = void 0;
		} else if (type === 'email' && typeof pattern !== 'string') {
			pattern = emailRegexStr;
		}
		return {
			type,
			pattern,
			maxlength: formatLength(maxLength),
			minlength: formatLength(minLength),
			autocomplete: formatAutocomplete(autocomplete),
			spellcheck: formatSpellcheck(spellcheck)
		}
	}

	get _inputValue(): string {
		const { value = this._defaultValue/*, onInput*/ } = this.properties;
		if (typeof this._value === 'undefined') {
			this._value = `${value}`;
			return `${value}`
		}
		if (value !== this._defaultValue) {
			this._value = `${value}`;
			this._defaultValue = `${value}`;
			return `${value}`
		}
		return (<string>this._value);
	}
	protected renderInput(): DNode {
		const {
			widgetId, aria = {}, type,
			disabled, valid, name, placeholder,/* maxLength, minLength, */
			readOnly, required, autofocus, tabindex, min, max, step, arrows = 'arrows'
		} = this.properties;

//console.log(':!:',focus, this.shouldFocus())

		if (type === 'hidden') {
			return v(this._inputElement, {
				focus: this.shouldFocus(),
				id: widgetId,
				key: 'input',
				name
			});
		}
//console.log('V!', this._value);
		const inputOptions = {
			id: widgetId,
			key: 'input',
			classes: [
				css[arrows],
				...this.theme(this.getInputClasses()),
				...this.getFixedInputClasses()
			],
			...formatAriaProperties(aria),
			...(type === 'number' ? { min, max, step } : {}),
			name,
			disabled,
			required,
			readOnly,
			focus: this.shouldFocus(),
			'aria-invalid': valid === false ? 'true' : null,
			'aria-readonly': readOnly ? 'true' : null,
			placeholder: placeholder ? placeholder : ' ', /* CSS :placeholder-shown */
			value: this._inputValue,
			onfocus: this._onFocus,
			onblur: this._onBlur,
			onbeforeinput: (this.has.beforeInput ? this._onBeforeInput : null),
			oninput: this._onInput,
			ontextinput: (this.has.textInputEvent && !('oninput' in window) ?
				this._onInput : null),
			oncut: this._onCut,
			onpaste: this._onPaste,
			ondragend: this._onDragEnd,
			ondrop: this._onDrop,
			onkeydown: this._onKeyDown,
			oncompositionstart: (this.has.compositionEvent ? this._onCompositionStart : null),
			onkeypress: this._onKeyPress,
			oncompositionend: (this.has.compositionEvent ? this._onCompositionEnd : null),
			onkeyup: this._onKeyUp,
			onchange: this._onChange,
			onhover: this._onHover,
			onclick: this._onClick,
			onmousedown: this._onMouseDown,
			onmouseup: this._onMouseUp,
			ontouchstart: this._onTouchStart,
			ontouchend: this._onTouchEnd,
			ontouchcancel: this._onTouchCancel,
			...this.getInputProperties(),
		}

		if (autofocus) {
			inputOptions.autofocus = true;
			//this.meta(Focus).set('input')
		}
		if (tabindex || typeof tabindex === 'number') {
			inputOptions.tabindex = `${tabindex}`;
		}

		this._value = this._inputValue;
//console.log('render',this._value);
		return v(this._inputElement, inputOptions);
	}

	protected renderAddon(addon: DNode, before = false): DNode {
		return v('div', {
			classes: [
				before ? fixedCss.prefix : fixedCss.suffix,
				before ? css.prefix : css.suffix,
				css.square,
				...this.getSizeClasses()
			]
		}, [ addon ]);
	}
	protected renderMenu(): DNode { return null }
	protected renderInputWrapper(): DNode {
		const { label, labelStatic, trailing = [], leading = [] } = this.properties;
		const _input = this.renderInput();
		const _prefixes = this._fixedPrefixes.concat(leading)
			.map((addon: DNode) => this.renderAddon(addon, true))
		const _suffixes = this._fixedSuffixes.concat(trailing)
			.map((addon: DNode) => this.renderAddon(addon));
		const addonsInput = label && !labelStatic ?
			[_input, ..._prefixes, ..._suffixes] : [..._prefixes, _input, ..._suffixes];
		return v('div', {
			key: 'wrapper',
			role: 'presentation',
			classes: [
				...this.getSchemaClasses(css),
				...this.getSizeClasses(<any>css),
				...this.theme(this.getWrapperClasses())
			]
		}, [
			...addonsInput,
			v('b', {
				classes: this.theme(css.border),
				onclick: (event: MouseEvent) => {
					event.stopPropagation();
					this.meta(Focus).set('input');
				//	console.log(e.target)
				}
			}),
			this.renderLabel(),
			this.renderMenu()
		]);
	}

  protected renderHelperText() {
		const { valid, message } = this.validity;
		const computedHelperText = (valid === false && message) || this.properties.helperText;
    return this._renderHelperText(computedHelperText, valid, <any>css);
  }

	protected beforeRender(): any {}
	protected render(): DNode {
		const { type, label, max = 0, leading = [] } = this.properties;
		this.beforeRender();
		if (type === 'hidden') {
			return this.renderInput()
		}
		const { labelAfter/*, schema, helperText, box = false*/ } = this.properties;
		this._validate();

		//const focus = this.meta(Focus).get('root');

		const core = [
			this._fixedLabel ? this.renderLabel() : null,
			this.renderInputWrapper()
		];
		const children = (labelAfter ? core.reverse() : core)
			.concat(this.children.filter(child => child !== null))
			.concat(this.renderHelperText());
		let styleO = {};
		if (type === 'number') {
			const LL = !leading.length && label ? label.length : 0;
			const w = `${Math.max(3, LL, `${max}`.length)}${LL ? 'ch' : 'em'}`;
			styleO = { style: `--ui-default-input-width: auto; --ui-input-width: ${w};` }
		}

		return v('div', {
			key: 'root',
			...styleO,
			classes: [
				this.getSizeClasses()[0],
				...this.getSchemaClasses(css, true),
				...this.getFixedRootClasses(),
				...this.theme(this.getRootClasses()),
				type === 'number' ? css.number : null
			]},
			children
		);
	}
}
