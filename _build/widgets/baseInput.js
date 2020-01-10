(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "@dojo/framework/widget-core/meta/Focus", "@dojo/framework/widget-core/meta/Base", "@dojo/framework/widget-core/mixins/Focus", "@dojo/framework/widget-core/decorators/diffProperty", "@dojo/framework/widget-core/diff", "./common/Widget", "./common/WidgetLabeled", "./common/events/keyboard", "./common/util", "../framework/uuid", "./themes/redaktor-default/text-input.m.css", "./text-input/styles/text-input.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var has_1 = require("@dojo/framework/has/has");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var Base_1 = require("@dojo/framework/widget-core/meta/Base");
    var Focus_2 = require("@dojo/framework/widget-core/mixins/Focus");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var Widget_1 = require("./common/Widget");
    var WidgetLabeled_1 = require("./common/WidgetLabeled");
    var keyboard_1 = require("./common/events/keyboard");
    var util_1 = require("./common/util");
    var uuid_1 = require("../framework/uuid");
    var css = require("./themes/redaktor-default/text-input.m.css");
    var fixedCss = require("./text-input/styles/text-input.m.css");
    // do NOT allow example@example -
    // https://codepen.io/kevinSuttle/post/the-current-state-of-web-forms
    exports.emailRegexStr = [
        "[a-zA-Z0-9_]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)",
        "*@(?!([a-zA-Z0-9]*\\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\\.))",
        "(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\\.)",
        "+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
    ].join('');
    // TODO https://github.com/Microsoft/TypeScript/issues/17592 (please upvote)
    var TextInputPatternType;
    (function (TextInputPatternType) {
        TextInputPatternType["text"] = "text";
        TextInputPatternType["email"] = "email";
        TextInputPatternType["search"] = "search";
        TextInputPatternType["tel"] = "tel";
        TextInputPatternType["url"] = "url";
    })(TextInputPatternType = exports.TextInputPatternType || (exports.TextInputPatternType = {}));
    var TextInputType;
    (function (TextInputType) {
        TextInputType["text"] = "text";
        TextInputType["hidden"] = "hidden";
        TextInputType["email"] = "email";
        TextInputType["number"] = "number";
        TextInputType["password"] = "password";
        TextInputType["search"] = "search";
        TextInputType["tel"] = "tel";
        TextInputType["url"] = "url";
    })(TextInputType = exports.TextInputType || (exports.TextInputType = {}));
    function formatAutocomplete(autocomplete) {
        if (typeof autocomplete === 'boolean') {
            return autocomplete ? 'on' : 'off';
        }
        return autocomplete;
    }
    function formatSpellcheck(spellcheck) {
        return typeof spellcheck === 'boolean' ? spellcheck.toString() : undefined;
    }
    function formatLength(l) {
        return typeof l === 'number' || typeof l === 'string' ? "" + l : undefined;
    }
    function patternDiffer(prevProperty, newProperty) {
        var value = newProperty instanceof RegExp ? newProperty.source : newProperty;
        return {
            changed: prevProperty !== value,
            value: value
        };
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
    var InputValidity = /** @class */ (function (_super) {
        tslib_1.__extends(InputValidity, _super);
        function InputValidity() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputValidity.prototype.get = function (key, value) {
            var _this = this;
            var node = this.getNode(key);
            if (!node) {
                return { valid: undefined, message: '' };
            }
            if (value !== node.value) {
                // if the vdom is out of sync with the real dom our
                // validation check will be one render behind.
                // Call invalidate on the next loop.
                setTimeout(function () { return _this.invalidate(); });
            }
            return {
                valid: node.validity.valid,
                message: node.validationMessage
            };
        };
        return InputValidity;
    }(Base_1.default));
    var TextInputBase = /** @class */ (function (_super) {
        tslib_1.__extends(TextInputBase, _super);
        function TextInputBase() {
            var _this = _super.call(this) || this;
            _this._defaultValue = '';
            _this._fixedLabel = false;
            _this._fixedPrefixes = [];
            _this._fixedSuffixes = [];
            _this._inputElement = 'input';
            _this._hasRange = true;
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
            _this.has = {
                documentMode: 0,
                beforeInput: false,
                fallbackCompositionData: false,
                compositionEvent: false,
                textInputEvent: false,
                beforeInputEmitted: false
            };
            _this.level2 = {
                type: 'beforeinput',
                inputType: '',
                data: null,
                dataTransfer: null,
                isComposing: false,
                getTargetRanges: function () { return []; },
                range: [0, 0]
            };
            _this._state = {};
            _this._uuid = uuid_1.default();
            return _this;
        }
        TextInputBase.prototype._validate = function () {
            var _a = this, state = _a._state, _b = _a.properties, onValidate = _b.onValidate, value = _b.value, customValidator = _b.customValidator;
            //console.log('validate', customValidator);
            if ( /*!onValidate ||*/value === undefined || value === null || state.previousValue === value) {
                return;
            }
            var v = "" + value;
            state.previousValue = v;
            var _c = this.meta(InputValidity).get('input', v), valid = _c.valid, _d = _c.message, message = _d === void 0 ? '' : _d;
            console.log(valid, customValidator);
            if (valid && customValidator) {
                var customValid = customValidator(v);
                console.log(customValid);
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
        };
        Object.defineProperty(TextInputBase.prototype, "validity", {
            get: function () {
                var _a = this.properties.valid, valid = _a === void 0 ? { valid: undefined, message: undefined } : _a;
                if (typeof valid === 'boolean') {
                    return { valid: valid, message: undefined };
                }
                return {
                    valid: valid.valid,
                    message: valid.message
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "inputType", {
            set: function (type) { this.level2.inputType = type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "data", {
            set: function (data) { this.level2.data = data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "dataTransfer", {
            set: function (event) {
                this.level2.dataTransfer = event.clipboardData ||
                    event.dataTransfer || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "range", {
            set: function (event) {
                if (!!event.target && typeof event.target.selectionStart === 'number') {
                    this.level2.range = [
                        event.target.selectionStart, event.target.selectionEnd
                    ];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "hasRange", {
            get: function () {
                return this.level2.range[0] !== this.level2.range[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInputBase.prototype, "isComposing", {
            get: function () { return this.level2.isComposing; },
            set: function (isC) { this.level2.isComposing = isC; },
            enumerable: true,
            configurable: true
        });
        TextInputBase.prototype.onAttach = function () {
            if (has_1.default('host-browser')) {
                var docMode = 'documentMode' in document ? document.documentMode : 0;
                this.has.documentMode = docMode;
                this.has.compositionEvent = 'CompositionEvent' in window;
                this.has.textInputEvent = 'TextEvent' in window && !docMode;
                this.has.fallbackCompositionData = (!this.has.compositionEvent ||
                    (docMode && docMode > 8 && docMode <= 11));
                this.has.beforeInput = 'onbeforeinput' in document ||
                    (('InputEvent' in window) && 'inputType' in (new window.InputEvent('')));
            }
        };
        // TODO _onMouseUp (event: MouseEvent) { HAD this.range = event;
        TextInputBase.prototype._onFocus = function (event) {
            this.properties.onFocus && this.properties.onFocus(event);
        };
        TextInputBase.prototype._onBlur = function (event) {
            this.properties.onBlur && this.properties.onBlur(event);
        };
        TextInputBase.prototype._onHover = function (event) {
            this.properties.onHover && this.properties.onHover(event);
        };
        TextInputBase.prototype._onMouseDown = function (event) {
            event.stopPropagation();
            this.properties.onMouseDown && this.properties.onMouseDown(event);
        };
        TextInputBase.prototype._onClick = function (event) {
            event.stopPropagation();
            this.properties.onClick && this.properties.onClick(event);
        };
        TextInputBase.prototype._onMouseUp = function (event) {
            if (this._hasRange) {
                this.range = event;
            }
            event.stopPropagation();
            this.properties.onMouseUp && this.properties.onMouseUp(event);
        };
        TextInputBase.prototype._onTouchStart = function (event) {
            event.stopPropagation();
            this.properties.onTouchStart && this.properties.onTouchStart(event);
        };
        TextInputBase.prototype._onTouchEnd = function (event) {
            event.stopPropagation();
            this.properties.onTouchEnd && this.properties.onTouchEnd(event);
        };
        TextInputBase.prototype._onTouchCancel = function (event) {
            event.stopPropagation();
            this.properties.onTouchCancel && this.properties.onTouchCancel(event);
        };
        TextInputBase.prototype._onKeyDown = function (event) {
            event.stopPropagation();
            var evt = keyboard_1.default(event);
            if (!this.has.beforeInput) {
                if (evt.key === 'Backspace') {
                    this.inputType = this.hasRange ? 'deleteContent' :
                        (evt.altKey === true ? 'deleteWordBackward' : 'deleteContentBackward');
                    this._onBeforeInput(evt);
                }
                else if (evt.key === 'Delete') {
                    this.inputType = this.hasRange ? 'deleteContent' :
                        (evt.altKey === true ? 'deleteWordForward' : 'deleteContentForward');
                    this._onBeforeInput(evt);
                }
            }
            // TODO contextmenu delete https://github.com/mozilla/notes/issues/423
            this.properties.onKeyDown && this.properties.onKeyDown(evt, function () { event.preventDefault(); });
        };
        TextInputBase.prototype._onKeyPress = function (event) {
            event.stopPropagation();
            var evt = keyboard_1.default(event);
            if (evt.key.length > 1) {
                return (this.properties.onKeyPress && this.properties.onKeyPress(evt, function () { evt.preventDefault(); }));
            }
            var vOld = this._value || '';
            var v = evt.target.value;
            var isTranspose = (v.length === vOld.length && "" + v[1] + v[0] + v.slice(2) === vOld);
            this.inputType = isTranspose ? 'insertTranspose' : 'insertText';
            this.data = evt.key; // TODO ???
            if (!this.has.textInputEvent && !this.has.compositionEvent) {
                this.isComposing = evt.isStart;
            }
            !this.has.beforeInput && this._onBeforeInput(evt);
            this.properties.onKeyPress && this.properties.onKeyPress(evt, function () { evt.preventDefault(); });
        };
        TextInputBase.prototype._onKeyUp = function (event) {
            event.stopPropagation();
            if (this._hasRange) {
                this.range = event;
            }
            var evt = keyboard_1.default(event);
            this.properties.onKeyUp && this.properties.onKeyUp(evt, function () { evt.preventDefault(); });
        };
        TextInputBase.prototype._onComposition = function (event, type) {
            if (type === void 0) { type = 'insertCompositionText'; }
            this.inputType = type; // TODO beforeInput
            this.isComposing = (type === 'insertCompositionText');
            !this.has.beforeInput && this._onBeforeInput(event);
        };
        TextInputBase.prototype._onCompositionStart = function (event) {
            this._onComposition(event);
        };
        TextInputBase.prototype._onCompositionEnd = function (event) {
            // TODO if range deleteByComposition
            this._onComposition(event, 'insertFromComposition');
        };
        TextInputBase.prototype._onCut = function (event) {
            this.dataTransfer = event;
            this.inputType = 'clipboardData' in event && event.clipboardData.dropEffect === 'move' ?
                'deleteByDrag' : 'deleteByCut';
            !this.has.beforeInput && this._onBeforeInput(event);
        };
        TextInputBase.prototype._onPaste = function (event) {
            this.dataTransfer = event;
            // TODO if level2.range SHOULD WE emit deleteContent ?
            this.inputType = 'clipboardData' in event && event.clipboardData.dropEffect === 'move' ?
                'insertFromDrop' : 'insertFromPaste';
            !this.has.beforeInput && this._onBeforeInput(event);
        };
        TextInputBase.prototype._onDrop = function (event) {
            // TODO if level2.range SHOULD WE emit deleteContent ?
            if (this._hasRange) {
                this.range = event;
            }
            this.dataTransfer = event;
            this.inputType = 'insertFromDrop';
            !this.has.beforeInput && this._onBeforeInput(event);
        };
        TextInputBase.prototype._onDragEnd = function (event) {
            // NOTE browser normalization:
            // Drag to another field means 'Cut' in e.g Safari and 'Copy' in e.g. Firefox
            // TODO if range deleteByDrag
            if (this._hasRange) {
                this.range = event;
            }
            // TODO check if value changed: deleteByDrag
        };
        TextInputBase.prototype.getCaretRange = function (el) {
            var doc = el.ownerDocument || el.document;
            var win = doc.defaultView || doc.parentWindow;
            if (el.selectionStart && el.selectionEnd) {
                return [el.selectionStart, el.selectionEnd];
            }
            else if (typeof win.getSelection !== "undefined" && win.getSelection().rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                return [range.startOffset, range.endOffset];
            }
            return [0, 0];
        };
        TextInputBase.prototype._onBeforeInput = function (event) {
            var _this = this;
            //event.stopPropagation();
            if (!this.has.beforeInput && this.level2.inputType !== '') {
                ('InputEvent' in window) && Object.setPrototypeOf(event, window.InputEvent.prototype);
                ['type', 'inputType', 'data', 'dataTransfer', 'getTargetRanges'].forEach(function (key) {
                    return !(key in event) && _this.readonlyProp(key, _this.level2[key], event);
                });
            }
            //this._value = this._evt('onBeforeInput', event);
            this.readonlyProp('value', this._value, event);
            this.properties.onBeforeInput && this.properties.onBeforeInput(event);
        };
        TextInputBase.prototype._onInput = function (event) {
            event.stopPropagation();
            if (!!this.isComposing) {
                if (!this.has.compositionEvent) {
                    this.isComposing = false;
                }
                return;
            }
            // TODO autofill / spellchecker ? "insertReplacementText"
            this._value = event.target.value;
            this.readonlyProp('value', this._value, event);
            this.properties.onInput && this.properties.onInput(event);
        };
        TextInputBase.prototype._onChange = function (event) {
            event.stopPropagation();
            this.readonlyProp('value', this._value, event);
            //console.log('_onChange', (<HTMLInputElement>event.target).value, this._value, this.properties.onChange);
            this.properties.onChange && this.properties.onChange(event);
        };
        TextInputBase.prototype._getRootClasses = function (ui) {
            if (ui === void 0) { ui = css; }
            var _a = this.properties, responsive = _a.responsive, required = _a.required, label = _a.label, labelStatic = _a.labelStatic, _b = _a.invalid, invalid = _b === void 0 ? false : _b;
            var focus = this.meta(Focus_1.default).get('root');
            return tslib_1.__spread([
                ui.root,
                this.getDisabledClass(ui),
                this.getValidClass(ui)
            ], this.getStyleClasses(ui), [
                focus.containsFocus ? ui.focused : null,
                responsive === true ? ui.responsive : null,
                required === true ? ui.required : null,
                label && (labelStatic) ? ui.staticLabel : (label ? ui.slideLabel : ui.noLabel)
            ]);
        };
        TextInputBase.prototype.getRootClasses = function () { return this._getRootClasses(); };
        TextInputBase.prototype.getInputClasses = function () { return [css.input]; };
        TextInputBase.prototype.getWrapperClasses = function () { return [css.wrapper]; };
        TextInputBase.prototype.getFixedRootClasses = function () { return []; };
        TextInputBase.prototype.getFixedInputClasses = function () { return [fixedCss.input]; };
        TextInputBase.prototype.getInputProperties = function () {
            var _a = this.properties, _b = _a.type, type = _b === void 0 ? 'text' : _b, autocomplete = _a.autocomplete;
            var _c = this.properties, pattern = _c.pattern, maxLength = _c.maxLength, minLength = _c.minLength, spellcheck = _c.spellcheck;
            if (pattern instanceof RegExp) {
                pattern = pattern.source;
            }
            if (!(type in TextInputPatternType)) {
                pattern = void 0;
            }
            else if (type === 'email' && typeof pattern !== 'string') {
                pattern = exports.emailRegexStr;
            }
            return {
                type: type,
                pattern: pattern,
                maxlength: formatLength(maxLength),
                minlength: formatLength(minLength),
                autocomplete: formatAutocomplete(autocomplete),
                spellcheck: formatSpellcheck(spellcheck)
            };
        };
        Object.defineProperty(TextInputBase.prototype, "_inputValue", {
            get: function () {
                var _a = this.properties, _b = _a.value, value = _b === void 0 ? this._defaultValue : _b, onInput = _a.onInput;
                if (typeof this._value === 'undefined') {
                    this._value = "" + value;
                    return "" + value;
                }
                if (value !== this._defaultValue) {
                    this._value = "" + value;
                    this._defaultValue = "" + value;
                    return "" + value;
                }
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        TextInputBase.prototype.renderInput = function () {
            var _a = this.properties, _b = _a.widgetId, widgetId = _b === void 0 ? this._uuid : _b, _c = _a.aria, aria = _c === void 0 ? {} : _c, type = _a.type, disabled = _a.disabled, valid = _a.valid, maxLength = _a.maxLength, minLength = _a.minLength, name = _a.name, placeholder = _a.placeholder, readOnly = _a.readOnly, required = _a.required, autofocus = _a.autofocus, tabindex = _a.tabindex;
            if (type === 'hidden') {
                return Widget_1.v(this._inputElement, {
                    id: widgetId,
                    key: 'input',
                    name: name
                });
            }
            //console.log('V!', this._value);
            var inputOptions = tslib_1.__assign({ id: widgetId, key: 'input', classes: tslib_1.__spread(this.theme(this.getInputClasses()), this.getFixedInputClasses()) }, util_1.formatAriaProperties(aria), { name: name,
                disabled: disabled,
                required: required,
                readOnly: readOnly, 
                // focus: this.shouldFocus, // TODO
                'aria-invalid': valid === false ? 'true' : null, 'aria-readonly': readOnly ? 'true' : null, placeholder: placeholder ? placeholder : ' ', value: this._inputValue, onfocus: this._onFocus, onblur: this._onBlur, onbeforeinput: (this.has.beforeInput ? this._onBeforeInput : null), oninput: this._onInput, ontextinput: (this.has.textInputEvent && !('oninput' in window) ?
                    this._onInput : null), oncut: this._onCut, onpaste: this._onPaste, ondragend: this._onDragEnd, ondrop: this._onDrop, onkeydown: this._onKeyDown, oncompositionstart: (this.has.compositionEvent ? this._onCompositionStart : null), onkeypress: this._onKeyPress, oncompositionend: (this.has.compositionEvent ? this._onCompositionEnd : null), onkeyup: this._onKeyUp, onchange: this._onChange, onhover: this._onHover, onclick: this._onClick, onmousedown: this._onMouseDown, onmouseup: this._onMouseUp, ontouchstart: this._onTouchStart, ontouchend: this._onTouchEnd, ontouchcancel: this._onTouchCancel }, this.getInputProperties());
            if (autofocus) {
                inputOptions.autofocus = true;
                this.meta(Focus_1.default).set('input');
            }
            if (tabindex || typeof tabindex === 'number') {
                inputOptions.tabindex = "" + tabindex;
            }
            this._value = this._inputValue;
            //console.log('render',this._value);
            return Widget_1.v(this._inputElement, inputOptions);
        };
        TextInputBase.prototype.renderAddon = function (addon, before) {
            if (before === void 0) { before = false; }
            return Widget_1.v('div', {
                classes: tslib_1.__spread([
                    before ? fixedCss.prefix : fixedCss.suffix,
                    before ? css.prefix : css.suffix,
                    css.square
                ], this.getSizeClasses())
            }, [addon]);
        };
        TextInputBase.prototype.renderMenu = function () { return null; };
        TextInputBase.prototype.renderInputWrapper = function () {
            var _this = this;
            var _a = this.properties, label = _a.label, labelStatic = _a.labelStatic, _b = _a.trailing, trailing = _b === void 0 ? [] : _b, _c = _a.leading, leading = _c === void 0 ? [] : _c;
            var _input = this.renderInput();
            var _prefixes = this._fixedPrefixes.concat(leading)
                .map(function (addon) { return _this.renderAddon(addon, true); });
            var _suffixes = this._fixedSuffixes.concat(trailing)
                .map(function (addon) { return _this.renderAddon(addon); });
            var addonsInput = label && !labelStatic ? tslib_1.__spread([_input], _prefixes, _suffixes) : tslib_1.__spread(_prefixes, [_input], _suffixes);
            return Widget_1.v('div', {
                key: 'wrapper',
                role: 'presentation',
                classes: tslib_1.__spread(this.getSchemaClasses(css), this.getSizeClasses(css), this.theme(this.getWrapperClasses()))
            }, tslib_1.__spread(addonsInput, [
                Widget_1.v('b', {
                    classes: this.theme(css.border),
                    onclick: function (event) {
                        event.stopPropagation();
                        _this.meta(Focus_1.default).set('input');
                        //	console.log(e.target)
                    }
                }),
                this.renderLabel(),
                this.renderMenu()
            ]));
        };
        TextInputBase.prototype.renderHelperText = function () {
            var _a = this.validity, valid = _a.valid, message = _a.message;
            var computedHelperText = (valid === false && message) || this.properties.helperText;
            return this._renderHelperText(computedHelperText, valid);
        };
        TextInputBase.prototype.beforeRender = function () { };
        TextInputBase.prototype.render = function () {
            this.beforeRender();
            if (this.properties.type === 'hidden') {
                return this.renderInput();
            }
            var _a = this.properties, labelAfter = _a.labelAfter, schema = _a.schema, helperText = _a.helperText, _b = _a.box, box = _b === void 0 ? false : _b;
            this._validate();
            var focus = this.meta(Focus_1.default).get('root');
            var core = [
                this._fixedLabel ? this.renderLabel() : null,
                this.renderInputWrapper()
            ];
            var children = (labelAfter ? core.reverse() : core)
                .concat(this.children.filter(function (child) { return child !== null; }))
                .concat(this.renderHelperText());
            return Widget_1.v('div', {
                key: 'root',
                classes: tslib_1.__spread([
                    this.getSizeClasses()[0]
                ], this.getSchemaClasses(css, true), this.getFixedRootClasses(), this.theme(this.getRootClasses()))
            }, children);
        };
        TextInputBase = tslib_1.__decorate([
            diffProperty_1.default('pattern', patternDiffer),
            diffProperty_1.default('leading', diff_1.reference),
            diffProperty_1.default('trailing', diff_1.reference),
            tslib_1.__metadata("design:paramtypes", [])
        ], TextInputBase);
        return TextInputBase;
    }(Focus_2.FocusMixin(WidgetLabeled_1.LabeledBase)));
    exports.default = TextInputBase;
});
//# sourceMappingURL=baseInput.js.map