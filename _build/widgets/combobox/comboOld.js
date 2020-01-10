(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../baseInput", "../../framework/Array/diu", "../icon/index", "../listbox/index", "../common/nls/common", "@dojo/framework/widget-core/mixins/I18n", "@dojo/framework/widget-core/meta/Focus", "../../framework/uuid", "../themes/redaktor-default/text-input.m.css", "../text-input/styles/text-input.m.css", "../themes/redaktor-default/combobox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    //import { MaterialSchema } from '../common/util';
    var baseInput_1 = require("../baseInput");
    var diu_1 = require("../../framework/Array/diu");
    var index_1 = require("../icon/index");
    var index_2 = require("../listbox/index");
    var common_1 = require("../common/nls/common");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var uuid_1 = require("../../framework/uuid");
    var css = require("../themes/redaktor-default/text-input.m.css");
    var fixedCss = require("../text-input/styles/text-input.m.css");
    var comboCss = require("../themes/redaktor-default/combobox.m.css");
    // Enum used when traversing items using arrow keys
    var Operation;
    (function (Operation) {
        Operation[Operation["increase"] = 1] = "increase";
        Operation[Operation["decrease"] = -1] = "decrease";
    })(Operation = exports.Operation || (exports.Operation = {}));
    exports.i18nBase = I18n_1.I18nMixin(baseInput_1.default);
    var ComboBox = /** @class */ (function (_super) {
        tslib_1.__extends(ComboBox, _super);
        function ComboBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._activeIndex = 0;
            _this._callInputFocus = false;
            _this._idBase = uuid_1.default();
            _this._menuHasVisualFocus = false;
            _this.tokenMap = new Map();
            _this.resultsMap = new Map();
            _this._defaultValue = '';
            _this._onTokens = {
                whitespace: function (str) {
                    //str = _.toStr(str);
                    return str ? str.split(/\s+/) : [];
                },
                nonword: function (str) {
                    //str = _.toStr(str);
                    return str ? str.split(/\W+/) : [];
                }
            };
            _this._onSorts = {
                score: function (a, b) {
                    return a.score < b.score ? 1 : -1;
                }
            };
            return _this;
        }
        ComboBox.prototype.onAttach = function () {
            var _this = this;
            this.resultsMap = new Map();
            var _a = this.properties, _b = _a.results, results = _b === void 0 ? [] : _b, _c = _a.onToken, onToken = _c === void 0 ? this._onTokens.whitespace : _c;
            var length = results.length;
            var index = 0;
            for (index = 0; index < length; index++) {
                if (!results[index]) {
                    continue;
                }
                var res = typeof results[index] === 'string' ?
                    results[index].toLowerCase() : results[index];
                this.resultsMap.set(res, index);
                onToken(res).map(function (term, wordIndex) {
                    var termList = _this.tokenMap.get(term) || [];
                    // remember the index within the original array
                    termList.push([index, wordIndex]);
                    _this.tokenMap.set(term, termList);
                });
            }
        };
        ComboBox.prototype._onFocus = function (event) {
            if (this.resultsMap.has(this._inputValue.toLowerCase())) {
                event.target.select();
            }
            this.properties.onFocus && this.properties.onFocus(event);
        };
        ComboBox.prototype._onInput = function (event) {
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
            this.invalidate();
        };
        ComboBox.prototype._sortMenu = function (query) {
            if (query === void 0) { query = this._value; }
            var e_1, _a;
            var _b = this.properties, _c = _b.results, results = _c === void 0 ? [] : _c, _d = _b.onToken, onToken = _d === void 0 ? this._onTokens.whitespace : _d, _e = _b.onSort, onSort = _e === void 0 ? this._onSorts.score : _e;
            if (!query) {
                return results;
            }
            query = query.toLowerCase();
            var scoredResults = new Array(results.length);
            var fullMatch = this.resultsMap.get(query);
            var tokens = onToken(query);
            var token;
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
            var index = 0;
            /*tokenLoop:*/
            for (index = 0; index < length; index++) {
                if (!tokens[index]) {
                    continue;
                }
                token = tokens[index];
                console.log('!!!', token, fullMatch);
                var tokenSplit = token.split('');
                var _loop_1 = function () {
                    if (!indices.length) {
                        return "continue";
                    }
                    var intersection = diu_1.intersection.apply(void 0, tslib_1.__spread([tokenSplit], result.split('')));
                    var pos = token.search(result);
                    var score = intersection.length / (token.length / result.length);
                    if (pos === 0) {
                        score += (token === result) ? (tokens.length - index) : 0.5;
                    }
                    indices.forEach(function (i_word) {
                        var _a = tslib_1.__read(i_word, 2), i = _a[0], word = _a[1];
                        if (typeof fullMatch === 'number' && fullMatch === i) {
                            score = 1000;
                        }
                        if (token === result) {
                            score += tokens.length - word;
                        }
                        if (typeof scoredResults[i] === 'object') {
                            scoredResults[i].intersection = scoredResults[i].intersection.concat(intersection);
                            scoredResults[i].score += score;
                            scoredResults[i].words.push(word);
                        }
                        else {
                            var value = typeof results[i] === 'string' ? results[i] : results[i].value;
                            scoredResults[i] = { value: value, intersection: intersection, score: score, words: [word] };
                        }
                    });
                };
                try {
                    for (var _f = tslib_1.__values(this.tokenMap), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var _h = tslib_1.__read(_g.value, 2), result = _h[0], indices = _h[1];
                        _loop_1();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            scoredResults.sort(onSort);
            console.log(query, scoredResults);
            return scoredResults;
        };
        ComboBox.prototype._openMenu = function () {
            var _a = this.properties, key = _a.key, onRequestResults = _a.onRequestResults;
            /*this._activeIndex = 0;*/
            this._open = true;
            onRequestResults && onRequestResults(key);
            //	this.invalidate();
        };
        ComboBox.prototype._closeMenu = function () {
            this._open = false;
            //	this.invalidate();
        };
        ComboBox.prototype._getMenuId = function () {
            return this._idBase + "-menu";
        };
        ComboBox.prototype._getResultLabel = function (result) {
            var getResultLabel = this.properties.getResultLabel;
            return getResultLabel ? getResultLabel(result) :
                ((typeof result === 'object' && 'value' in result) ? result.value : "" + result);
        };
        ComboBox.prototype._getResultSelected = function (result, index) {
            var getResultSelected = this.properties.getResultSelected;
            return getResultSelected ?
                getResultSelected(result, index, this._activeIndex) : index === this._activeIndex;
        };
        ComboBox.prototype._getResultId = function (result, index) {
            return this._idBase + "-result" + index;
        };
        ComboBox.prototype.renderMenu = function () {
            var _this = this;
            var _a = this.properties, theme = _a.theme, isResultDisabled = _a.isResultDisabled, onChange = _a.onChange, _b = _a.sortable, sortable = _b === void 0 ? true : _b, _c = _a.results, results = _c === void 0 ? [] : _c;
            if (!Array.isArray(results) || !results.length /* TODO || !this._open*/) {
                return null;
            }
            //console.log(this._getMenuId());
            return Widget_1.v('div', {
                key: 'dropdown',
                classes: [comboCss.dropdown],
            }, [
                Widget_1.w(index_2.default, {
                    theme: theme,
                    raised: true,
                    key: 'listbox',
                    activeIndex: this._activeIndex,
                    widgetId: this._getMenuId(),
                    optionData: sortable ? this._sortMenu() : results,
                    visualFocus: this._menuHasVisualFocus,
                    tabIndex: this._open ? 0 : -1,
                    getOptionDisabled: isResultDisabled,
                    getOptionId: this._getResultId,
                    getOptionLabel: this._getResultLabel,
                    getOptionSelected: this._getResultSelected,
                    onActiveIndexChange: function (index) {
                        _this._activeIndex = index;
                        _this.invalidate();
                    },
                    onOptionSelect: function (option) {
                        // FIXME EVENT:
                        _this.readonlyProp('option', option, event);
                        _this.readonlyProp('value', option.value, event);
                        onChange && onChange(event);
                        _this.meta(Focus_1.default).set('trigger');
                        _this._closeMenu();
                    }
                })
            ]);
        };
        ComboBox.prototype._onClearClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, key = _a.key, onChange = _a.onChange;
            this._callInputFocus = true;
            /*this._value = '';*/
            this.invalidate();
            this.readonlyProp('key', key, event);
            this.readonlyProp('value', '', event);
            onChange && onChange(event);
        };
        ComboBox.prototype._onTriggerClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly;
            if (!disabled && !readOnly) {
                this._callInputFocus = true;
                this._openMenu();
            }
        };
        /*
        classes: [
            before ? fixedCss.prefix : fixedCss.suffix,
            before ? css.prefix : css.suffix,
            css.square,
            ...this.getSizeClasses(css),
        ]
        */
        ComboBox.prototype.renderClearButton = function (messages) {
            var _this = this;
            var _a = this.properties, _b = _a.label, label = _b === void 0 ? '' : _b, disabled = _a.disabled, readOnly = _a.readOnly, theme = _a.theme, _c = _a.schema, schema = _c === void 0 ? 'parentSchema' : _c;
            return Widget_1.v('button', {
                key: 'clear',
                'aria-controls': this._getMenuId(),
                classes: tslib_1.__spread([
                    comboCss.clear,
                    fixedCss.prefix,
                    css.prefix,
                    css.square
                ], this.getSizeClasses()
                /*,
                ...this.theme([
            comboCss.clear,
            (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
          ])*/
                ),
                disabled: disabled || readOnly,
                type: 'button',
                onclick: function (event) { return _this._onClearClick(event); },
                'aria-label': messages.clear + " " + label
            }, [
                Widget_1.w(index_1.default, { type: 'closeIcon', theme: theme })
            ]);
        };
        ComboBox.prototype.renderMenuButton = function (messages) {
            var _this = this;
            var _a = this.properties, _b = _a.label, label = _b === void 0 ? '' : _b, disabled = _a.disabled, readOnly = _a.readOnly, theme = _a.theme, _c = _a.schema, schema = _c === void 0 ? 'parentSchema' : _c;
            return Widget_1.v('button', {
                key: 'trigger',
                classes: tslib_1.__spread([
                    comboCss.trigger,
                    fixedCss.suffix,
                    css.suffix,
                    css.square
                ], this.getSizeClasses() /*,
                ...this.theme([
            comboCss.trigger,
            (schema in MaterialSchema) ? (<any>css)[schema] : css.parentSchema
          ])*/),
                disabled: disabled || readOnly,
                tabIndex: -1,
                type: 'button',
                onclick: function (event) { return _this._onTriggerClick(event); },
                'aria-label': messages.open + " " + label
            }, [
                Widget_1.w(index_1.default, { type: 'downIcon', theme: theme })
            ]);
        };
        ComboBox.prototype.renderInputWrapper = function () {
            var _a = this.properties, label = _a.label, labelStatic = _a.labelStatic, outlined = _a.outlined, _b = _a.leading, leading = _b === void 0 ? [] : _b, _c = _a.trailing, trailing = _c === void 0 ? [] : _c;
            var messages = this.localizeBundle(common_1.default).messages;
            var _input = this.renderInput();
            // TODO ...leading, ...trailing
            var _prefix = this.renderClearButton(messages);
            var _suffix = this.renderMenuButton(messages);
            var addonsInput = label && !labelStatic ?
                [_input, _prefix, _suffix] : [_prefix, _input, _suffix];
            // console.log(this.getSchemaClasses(comboCss));
            return Widget_1.v('div', {
                key: 'wrapper',
                classes: tslib_1.__spread([
                    this.theme(css.wrapper)
                ], this.getSchemaClasses(css))
            }, tslib_1.__spread(addonsInput, [
                outlined ? null : Widget_1.v('b', { classes: this.theme(css.border) }),
                this.renderLabel(),
                this.renderMenu()
            ]));
        };
        ComboBox.prototype.getFixedRootClasses = function () {
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
            var focus = this.meta(Focus_1.default).get('root');
            return [comboCss.root, focus.containsFocus ? comboCss.focused : null];
        };
        ComboBox = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
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
        ], ComboBox);
        return ComboBox;
    }(exports.i18nBase));
    exports.default = ComboBox;
});
//# sourceMappingURL=comboOld.js.map