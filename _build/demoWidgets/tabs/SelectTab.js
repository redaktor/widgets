(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/listbox", "../../widgets/combobox", "../../widgets/select", "../../styles/tabs.m.css", "../../widgets/themes/redaktor-default/_ui.m.css", "../../widgets/image", "../../widgets/image/imageContent", "../../widgets/card"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var listbox_1 = require("../../widgets/listbox");
    var combobox_1 = require("../../widgets/combobox");
    var select_1 = require("../../widgets/select");
    var css = require("../../styles/tabs.m.css");
    var uiCss = require("../../widgets/themes/redaktor-default/_ui.m.css");
    var image_1 = require("../../widgets/image");
    var imageContent_1 = require("../../widgets/image/imageContent");
    var card_1 = require("../../widgets/card");
    var SelectTab = /** @class */ (function (_super) {
        tslib_1.__extends(SelectTab, _super);
        function SelectTab() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._animals = [
                {
                    value: 'cat',
                    label: 'Cat'
                },
                {
                    value: 'dog',
                    label: 'Dog'
                },
                {
                    value: 'mouse',
                    label: 'Mouse'
                },
                {
                    value: 'hamster',
                    label: 'Hamster'
                },
                {
                    value: 'sheep',
                    label: 'Sheep'
                },
                {
                    value: 'bird',
                    label: 'Bird'
                },
                {
                    value: 'cow',
                    label: 'Cow'
                },
                {
                    value: 'racoon dog',
                    label: 'Racoon dog'
                },
                {
                    value: 'horse',
                    label: 'Horse'
                },
                {
                    value: 'goat',
                    label: 'Goat',
                    disabled: true
                }
            ];
            return _this;
        }
        SelectTab.prototype.render = function () {
            var _a = this.properties.size, size = _a === void 0 ? 'default' : _a;
            return d_1.v('div', { classes: css.root }, [
                d_1.v('div', { styles: { width: '80%', height: 'auto' } }, [
                    d_1.w(image_1.default, {
                        src: 'http://redaktor.me/_deliver/erdmann.jpg',
                        placeholder: 'http://redaktor.me/_deliver/erdmann.svg',
                        fade: true,
                        //fadeDuration: 2000,
                        alt: 'erdmann',
                        aspectRatio: {
                            width: 16,
                            height: 9
                        },
                        onHover: function (evt) { console.log('hover', evt); },
                        onClick: function (evt) { console.log('click', evt); },
                        onLoadStart: function (curSrc, larger) { console.log('loadstart', curSrc, larger); },
                        onLoad: function (evt) { console.log('load', evt); },
                        onFadeEnd: function (evt) { console.log('load', evt); }
                    }),
                    //v('br'), v('br'),
                    d_1.w(image_1.default, {
                        src: 'https://placehold.it/320x160/000',
                        srcset: "https://placehold.it/320x160/ddd 320w,\n\thttps://placehold.it/480x240/ccc 480w,\n\thttps://placehold.it/768x384/444/fff 768w,\n\thttps://placehold.it/1024x512/a20000/fff 1024w,\n\thttps://placehold.it/1280x640/fd8700/000 1280w",
                        placeholder: 'https://placehold.it/8x4/a20000/ddd',
                        background: 'green',
                        alt: 'a lighthouse',
                    }, [
                        d_1.w(imageContent_1.default, {
                            horizontal: 'center',
                            vertical: 'bottom',
                            schema: 'dark',
                            background: true //0.2 //[0.1,0.4,0.4,0.8]
                        }, [
                            d_1.v('hgroup', [
                                d_1.v('h4', ['Our changing planet']),
                                //w(Headline, { type: 'subtitle', muted: true })
                                d_1.v('h5', { classes: [uiCss.subtitle, uiCss.muted] }, ['by Kurt Wagner']) //, v('br'), v('br') /
                            ])
                        ])
                    ])
                ]),
                d_1.v('p', ['X']), d_1.v('br'),
                d_1.w(card_1.default, { size: size }, []),
                //w(Chip, { size, schema: 'primary' }, [ 'Primary' ]),
                d_1.v('br'),
                d_1.w(combobox_1.default, {
                    size: size,
                    responsive: false,
                    blurOnSelect: false,
                    name: 'testcombo1',
                    autocomplete: false,
                    schema: 'primary',
                    //animated: false,
                    //muted: true,
                    //filled: true,
                    //outlined: true,
                    label: 'A primary Combobox',
                    placeholder: 'optional placeholder',
                    //helperText: 'Lorem Ipsum - helperText'
                    scroll: false,
                    widgetId: 'combo1',
                    //helperText: 'Lorem Ipsum - helperText',
                    //schema: 'primary',
                    //raised: true,
                    results: this._animals,
                    getOptionText: function (o, i) { return o.label; },
                    //getOptionLabel: (o: any, i: number, textNode: any) => textNode
                    //tabIndex: _open ? 0 : -1,
                    onResultSelect: function (v, i, key) { return console.log('!!! onResultSelect', v, i, key); },
                    onChange: function (v, i, key) { console.log('!!! onChange', v, i, key); }
                }),
                d_1.w(combobox_1.default, {
                    size: size,
                    responsive: false,
                    blurOnSelect: false,
                    name: 'testcombo2',
                    autocomplete: false,
                    strict: true,
                    label: 'A Combobox, strict',
                    placeholder: 'optional placeholder',
                    scroll: false,
                    widgetId: 'combo2',
                    results: this._animals,
                    getOptionText: function (o, i) { return o.label; },
                    onResultSelect: function (v, i, key) { return console.log('!!! onResultSelect', v, i, key); },
                    onChange: function (v, i, key) { console.log('!!! onChange', v, i, key); }
                }),
                d_1.v('br'),
                d_1.w(select_1.default, {
                    size: size,
                    label: 'Single Select no scroll no schema',
                    scroll: false,
                    activeIndex: 0,
                    widgetId: 'sel1',
                    options: this._animals.map(function (o) { return o.label; }),
                    //tabIndex: _open ? 0 : -1,
                    helperText: 'lorem'
                }),
                d_1.v('br'),
                d_1.w(select_1.default, {
                    size: size,
                    label: 'Single Select no scroll secondary',
                    scroll: false,
                    schema: 'secondary',
                    activeIndex: 0,
                    widgetId: 'sel2',
                    options: this._animals.map(function (o) { return o.label; }),
                    helperText: 'lorem'
                }),
                d_1.v('br'),
                d_1.w(select_1.default, {
                    size: size,
                    label: 'Single Select scroll',
                    scroll: true,
                    activeIndex: 2,
                    widgetId: 'sel3',
                    options: this._animals.map(function (o) { return o.label; }),
                    helperText: 'lorem'
                }),
                d_1.w(select_1.default, {
                    size: size,
                    label: 'Multi Select no scroll primary',
                    multiple: true,
                    scroll: false,
                    schema: 'primary',
                    activeIndex: 2,
                    widgetId: 'sel4',
                    options: this._animals.map(function (o) { return o.label; }),
                    helperText: 'lorem'
                }),
                d_1.v('br'),
                d_1.w(select_1.default, {
                    size: size,
                    scroll: true,
                    label: 'Multi Select scroll',
                    activeIndex: 2,
                    widgetId: 'sel5',
                    multiple: true,
                    required: true,
                    options: this._animals.map(function (o) { return o.label; }),
                    helperText: 'lorem'
                }),
                d_1.v('br'),
                d_1.w(listbox_1.default, {
                    size: size,
                    scroll: false,
                    label: 'Listbox multiple, no scroll expanded',
                    activeIndex: 2,
                    widgetId: 'lb1',
                    autoOpen: false,
                    multiple: true,
                    optionData: this._animals.map(function (o) { return o.label; }),
                    //tabIndex: _open ? 0 : -1,
                    helperText: 'lorem'
                }),
                d_1.v('p', ['X']),
                d_1.w(listbox_1.default, {
                    size: size,
                    scroll: true,
                    label: 'Listbox scroll expanded',
                    activeIndex: 2,
                    widgetId: 'lb2',
                    autoOpen: false,
                    //schema: 'primary',
                    //raised: true,
                    optionData: this._animals.map(function (o) { return o.label; }),
                    //tabIndex: _open ? 0 : -1,
                    helperText: 'lorem'
                }),
                d_1.v('p', ['X']),
                d_1.w(listbox_1.default, {
                    size: size,
                    scroll: true,
                    label: 'Multi Select scroll expanded',
                    activeIndex: 2,
                    widgetId: 'lb3',
                    schema: 'primary',
                    multiple: true,
                    autoOpen: false,
                    optionData: this._animals.map(function (o) { return o.label; }),
                    //tabIndex: _open ? 0 : -1,
                    helperText: 'lorem'
                }),
                d_1.v('br'),
                d_1.w(select_1.default, {
                    size: size,
                    label: 'this should open to top',
                    scroll: false,
                    activeIndex: 0,
                    widgetId: 'sel6',
                    options: this._animals.map(function (o) { return o.label; }),
                    //tabIndex: _open ? 0 : -1,
                    helperText: 'lorem'
                })
            ]);
        };
        return SelectTab;
    }(WidgetBase_1.WidgetBase));
    exports.default = SelectTab;
});
//# sourceMappingURL=SelectTab.js.map