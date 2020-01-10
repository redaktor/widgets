(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/I18n", "@dojo/framework/widget-core/mixins/Focus", "@dojo/framework/widget-core/meta/Focus", "@dojo/framework/widget-core/meta/Base", "../common/Widget", "../common/util", "../text-input", "../listbox", "../../framework/uuid", "../themes/redaktor-default/listbox.m.css", "../themes/redaktor-default/combobox.m.css", "../../framework/String/search/"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var Focus_1 = require("@dojo/framework/widget-core/mixins/Focus");
    var Focus_2 = require("@dojo/framework/widget-core/meta/Focus");
    var Base_1 = require("@dojo/framework/widget-core/meta/Base");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var text_input_1 = require("../text-input");
    var listbox_1 = require("../listbox");
    var uuid_1 = require("../../framework/uuid");
    var css = require("../themes/redaktor-default/listbox.m.css");
    var comboCss = require("../themes/redaktor-default/combobox.m.css");
    /* TODO native autocomplete
    // TODO strict mode
    // TODO onSort / onSortRemaining (notMatches)
    // TODO multiple ???
    // TODO - phonetic search - localized AS string !!!  */
    var search_1 = require("../../framework/String/search/");
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.RedaktorWidgetBase);
    var ScrollViewMeta = /** @class */ (function (_super) {
        tslib_1.__extends(ScrollViewMeta, _super);
        function ScrollViewMeta() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScrollViewMeta.prototype.scroll = function (key) {
            var node = this.getNode(key);
            if (node) {
                node.scrollIntoView({ block: "end", behavior: "smooth" });
            }
        };
        return ScrollViewMeta;
    }(Base_1.default));
    exports.ScrollViewMeta = ScrollViewMeta;
    var ComboBox = /** @class */ (function (_super) {
        tslib_1.__extends(ComboBox, _super);
        function ComboBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._boundGetOptionText = _this._getOptionText.bind(_this);
            _this._hasMatch = false;
            _this._hadMatch = false;
            _this._activeIndex = -1;
            _this._callInputFocus = false;
            _this._idBase = uuid_1.default();
            _this._menuHasVisualFocus = false;
            _this._open = false;
            _this._wasOpen = false;
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
        /*
        // TODO autofill / spellchecker ? "insertReplacementText"
                this._value = (<HTMLInputElement>event.target).value;
                this.readonlyProp('value', this._value, event);
                this.properties.onInput && this.properties.onInput(event);
                this.invalidate()
            }
        */
        ComboBox.prototype.searchResult = function (query, indices) {
            var _this = this;
            var firstIndex = indices[0].range[0];
            var children = indices.reduce(function (_children, o, i) {
                var text = query.substring(o.range[0], o.range[1]);
                var next = i + 1 === indices.length ? void 0 : indices[i + 1].range[0];
                // TODO might go to Search
                /*const considerExact = this._value.toLowerCase() === text.toLowerCase();*/
                return _children.concat(Widget_1.v('u', {
                    key: uuid_1.default(),
                    classes: _this.theme([css.match, css[o.type]])
                }, [text]), query.substring(o.range[1], next));
            }, !firstIndex ? [] : [query.substring(0, firstIndex)]);
            return Widget_1.v('span', children);
        };
        ComboBox.prototype._indexResults = function (query) {
            var _this = this;
            if (query === void 0) { query = this._value; }
            var _a = this.properties, _b = _a.results, results = _b === void 0 ? [] : _b, _c = _a.sortable, sortable = _c === void 0 ? true : _c, _d = _a.onToken, onToken = _d === void 0 ? this._onTokens.whitespace : _d, _e = _a.onSort, onSort = _e === void 0 ? this._onSorts.score : _e;
            this._indexes = [];
            this._hadMatch = this._hasMatch;
            this._hasMatch = false;
            if (!query) {
                this._indexed = results.map(this._boundGetOptionText);
                return this._indexed;
            }
            // TODO : or phonetic ...
            var resultTexts = new search_1.default(results.map(this._boundGetOptionText), {
                shouldSort: sortable,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                tokenize: true
            });
            this._indexed = resultTexts.search(query).map(function (r, indexedI) {
                _this._indexes.push(r.index);
                if (!r.matches.length) {
                    return r.value;
                }
                if (r.score === 0) {
                    _this._value = r.value;
                    _this._hasMatch = true;
                    if (!_this._menuHasVisualFocus) {
                        _this._activeIndex = 0;
                    }
                }
                var indexMap = new Map();
                r.matches.forEach(function (m) { return m.indices.forEach(function (o) { return indexMap.set(o, 1); }); });
                return _this.searchResult(r.value, Array.from(indexMap.keys()));
            });
            return this._indexed;
        };
        ComboBox.prototype._onMenuChange = function () {
            var _a = this.properties, key = _a.key, onMenuChange = _a.onMenuChange;
            if (!onMenuChange) {
                return;
            }
            this._open && !this._wasOpen && onMenuChange(true, key);
            !this._open && this._wasOpen && onMenuChange(false, key);
        };
        ComboBox.prototype._onInput = function (evt) {
            var _a = this.properties, key = _a.key, onChange = _a.onChange;
            this._menuHasVisualFocus = false;
            this._open = true;
            this._value = evt.value;
            onChange && onChange(evt.value, this._activeIndex, key);
            this.readonlyProp('value', this._value, event);
            this.invalidate();
        };
        ComboBox.prototype._onResultMouseDown = function (event) {
            event.stopPropagation();
            // Maintain underlying input focus on next render
            this._ignoreBlur = true;
            this._callInputFocus = true;
        };
        ComboBox.prototype._onInputBlur = function (evt) {
            var _a = this.properties, key = _a.key, onBlur = _a.onBlur;
            if (this._ignoreBlur) {
                this._ignoreBlur = false;
                return;
            }
            var value = this._value; // TODO FIXME !
            onBlur && onBlur(evt, value, key);
            this._open && this._closeMenu();
        };
        ComboBox.prototype._onInputFocus = function (evt) {
            var _a = this.properties, key = _a.key, disabled = _a.disabled, readOnly = _a.readOnly, onFocus = _a.onFocus, _b = _a.openOnFocus, openOnFocus = _b === void 0 ? true : _b;
            var value = this._value; // TODO FIXME !
            onFocus && onFocus(evt, value, key);
            var _onlyFocus = this._callInputFocus;
            this._callInputFocus = false;
            !disabled && !readOnly && !_onlyFocus && openOnFocus && this._openMenu();
        };
        ComboBox.prototype._openMenu = function () {
            var _a = this.properties, key = _a.key, onRequestResults = _a.onRequestResults;
            /*this._activeIndex = 0;*/
            console.log('_openMenu');
            this._open = true;
            onRequestResults && onRequestResults(key);
            this.invalidate();
        };
        ComboBox.prototype._closeMenu = function () {
            this._open = false;
            this.invalidate();
        };
        ComboBox.prototype._getMenuId = function () {
            return this._idBase + "-menu";
        };
        ComboBox.prototype._getOptionLabel = function (result, index) {
            var getOptionLabel = this.properties.getOptionLabel;
            return getOptionLabel ? getOptionLabel(result, index, this._indexed[index]) :
                this._indexed[index];
        };
        ComboBox.prototype._getOptionText = function (result, index) {
            var getOptionText = this.properties.getOptionText;
            return getOptionText ? getOptionText(result, index, this._value) :
                ((typeof result === 'object' && 'value' in result) ? result.value : "" + result);
        };
        ComboBox.prototype._getOptionSelected = function (result, index) {
            var _a = this.properties, getOptionSelected = _a.getOptionSelected, value = _a.value;
            return getOptionSelected
                ? getOptionSelected(result, index)
                : this._getOptionLabel(result, index) === value;
        };
        ComboBox.prototype._getOptionId = function (result, index) {
            return this._idBase + "-result" + index;
        };
        ComboBox.prototype._getValue = function (result, index) {
            var _a = this.properties.getValue, getValue = _a === void 0 ? this._boundGetOptionText : _a;
            return getValue ? "" + getValue(result, index) : "" + result;
        };
        ComboBox.prototype._selectIndex = function (index, key, isFresh) {
            if (index === void 0) { index = this._activeIndex; }
            if (key === void 0) { key = this.properties.key; }
            if (isFresh === void 0) { isFresh = true; }
            var _a = this.properties, onChange = _a.onChange, onResultSelect = _a.onResultSelect, _b = _a.blurOnSelect, blurOnSelect = _b === void 0 ? true : _b, _c = _a.results, results = _c === void 0 ? [] : _c;
            var i = this._indexes.length ? this._indexes[index] : index;
            var changed = this._activeIndex !== index;
            this._value = this._getOptionText(results[i], i);
            (this._hasMatch || changed) && onChange && onChange(this._getValue(results[i], i), i, key);
            (this._hasMatch || isFresh) && onResultSelect && onResultSelect(results[i], i, key);
            this._open && this._closeMenu();
        };
        ComboBox.prototype._selectedIndex = function (index, key) {
            if (index === void 0) { index = this._activeIndex; }
            if (key === void 0) { key = this.properties.key; }
            this._selectIndex(index, key, false);
        };
        ComboBox.prototype.renderInput = function () {
            var _this = this;
            var inputProperties = this.properties;
            var _a = this.properties, autofocus = _a.autofocus, _b = _a.blurOnSelect, blurOnSelect = _b === void 0 ? true : _b, _c = _a.strict, strict = _c === void 0 ? false : _c, _d = _a.results, results = _d === void 0 ? [] : _d;
            if (this._open) {
                inputProperties.labelStatic = true;
            }
            return Widget_1.w(text_input_1.default, tslib_1.__assign({}, inputProperties, { key: 'textinput', type: 'text', controls: this._getMenuId(), aria: tslib_1.__assign({}, (!this._open ? {} : {
                    activedescendant: this._getOptionId(0, this._activeIndex)
                }), { autocomplete: 'list' }), autofocus: (!this._wasOpen && autofocus) || (!blurOnSelect && this._callInputFocus), focus: this.shouldFocus, value: this._value, helperText: undefined, onInput: this._onInput, onClick: function () { return !_this._open && _this._openMenu(); }, onFocus: this._onInputFocus, onBlur: this._onInputBlur, onKeyDown: this._onInputKeyDown, onChange: void 0, invalid: strict && !this._hasMatch }));
        };
        ComboBox.prototype.renderMenu = function () {
            var _this = this;
            var _a = this.properties, getOptionDisabled = _a.getOptionDisabled, onChange = _a.onChange, _b = _a.blurOnSelect, blurOnSelect = _b === void 0 ? true : _b, _c = _a.sortable, sortable = _c === void 0 ? true : _c, _d = _a.animated, animated = _d === void 0 ? true : _d, _e = _a.results, results = _e === void 0 ? [] : _e;
            if (!results.length || (!this._open && !animated)) {
                return null;
            }
            var listProperties = this.properties;
            var wasOpen = this._wasOpen;
            this._wasOpen = this._open;
            //console.log('render menu', this._activeIndex, this._menuHasVisualFocus);
            console.log('_opening', !wasOpen && this._open, '::', wasOpen, this._open);
            // TODO shaped
            return Widget_1.v('div', {
                key: 'dropdown',
                classes: [
                    comboCss.dropdown,
                    this._open === true ? comboCss.open : comboCss.closed
                ],
                onmousedown: this._onResultMouseDown
            }, [
                Widget_1.w(listbox_1.default, tslib_1.__assign({}, listProperties, { key: this._getMenuId(), widgetId: this._getMenuId(), autoOpen: false, autoOrder: false, label: undefined, activeIndex: this._activeIndex > -1 ? this._activeIndex : void 0, optionData: this._indexed, tabIndex: -1, closed: !this._open, _opening: !wasOpen && this._open, getOptionDisabled: getOptionDisabled, 
                    /* getOptionId: this._getOptionId, TODO FIXME */
                    getOptionLabel: this._getOptionLabel, 
                    /* getOptionSelected: this._getOptionSelected, TODO FIXME */
                    onActiveIndexChange: function (index) {
                        //console.log('index change V', index, this._value);
                        _this._activeIndex = _this._indexes.length ? _this._indexes[index] : index;
                        _this.invalidate();
                    }, onOptionSelect: this._selectIndex }))
            ]);
        };
        ComboBox.prototype.render = function () {
            /*console.log('PHONE en', phonetics('This is an englisch sentence.'));
            console.log('PHONE de', germanPhonetics('Sebastian Lasse und ein Baum'));
            console.log('PHONE es', spanishPhonetics('La polilla crepuscular de Madagascar describió'));*/
            //console.log(!this.properties.value, !this._value);
            //console.log('render', this._activeIndex, !this._hadMatch && this._hasMatch);
            this._idBase = uuid_1.default();
            this._onMenuChange();
            this._indexResults();
            if (!this._hasMatch && !this._menuHasVisualFocus) {
                this._activeIndex = -1;
            }
            else if (!this._hadMatch && this._hasMatch) {
                this._selectedIndex();
            }
            if (this._open) {
                this.meta(ScrollViewMeta).scroll('dropdown');
            }
            return Widget_1.v('div', {
                key: 'root'
            }, [
                this.renderInput(),
                this.renderMenu()
            ]);
        };
        // KEYBOARD NAVIGATION
        ComboBox.prototype._moveActiveIndex = function (operation) {
            var _a = this.properties, onResultSelect = _a.onResultSelect, key = _a.key, _b = _a.results, results = _b === void 0 ? [] : _b;
            if (!results.length) {
                this._activeIndex = -1;
                this.invalidate();
                return;
            }
            var total = results.length;
            var nextIndex = ((this._activeIndex) + operation + total) % total;
            var i = this._indexes.length ? this._indexes[nextIndex] : nextIndex;
            this._activeIndex = nextIndex;
            this.invalidate();
            onResultSelect && onResultSelect(results[i], i, key);
        };
        ComboBox.prototype._onInputKeyDown = function (event) {
            var _a = this.properties, disabled = _a.disabled, readOnly = _a.readOnly, _b = _a.getOptionDisabled, getOptionDisabled = _b === void 0 ? function () { return false; } : _b, _c = _a.blurOnSelect, blurOnSelect = _c === void 0 ? true : _c, _d = _a.results, results = _d === void 0 ? [] : _d;
            var pressed = util_1.keyName(event);
            var visualFocus = { ArrowUp: 1, ArrowDown: 1, Home: 1, End: 1 };
            if (visualFocus[pressed]) {
                this._menuHasVisualFocus = true;
            }
            switch (pressed) {
                case 'ArrowUp':
                    event.preventDefault();
                    this._moveActiveIndex(listbox_1.Operation.decrease);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!this._open && !disabled && !readOnly) {
                        this._openMenu();
                    }
                    else if (this._open) {
                        this._moveActiveIndex(listbox_1.Operation.increase);
                    }
                    break;
                case 'Escape':
                    this._open && this._closeMenu();
                    this._menuHasVisualFocus = false;
                    break;
                case 'Enter':
                case ' ':
                    var hasFocus = this._menuHasVisualFocus;
                    var isDisabled = getOptionDisabled(results[this._activeIndex]); /* TODO indexed results */
                    if (pressed === ' ' && hasFocus) {
                        event.preventDefault();
                    }
                    if ((pressed === ' ' && !hasFocus) || (hasFocus && isDisabled)) {
                        return;
                    }
                    this._menuHasVisualFocus = false;
                    if (this._open) {
                        if (blurOnSelect && !this._ignoreBlur && !this._callInputFocus) {
                            this.meta(Focus_2.default).set('root');
                            if ("activeElement" in document)
                                document.activeElement.blur();
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
        };
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
        ComboBox.prototype.getFixedRootClasses = function () {
            //const focus = this.meta(Focus).get('root');
            //return [comboCss.root, focus.containsFocus ? comboCss.focused : null]
        };
        ComboBox = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
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
        ], ComboBox);
        return ComboBox;
    }(Focus_1.FocusMixin(exports.i18nBase)));
    exports.default = ComboBox;
});
//# sourceMappingURL=index.js.map