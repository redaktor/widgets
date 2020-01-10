(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d", "../../../../Template/components", "../redaktor/RedSvg"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var components_1 = require("../../../../Template/components");
    var RedSvg_1 = require("../redaktor/RedSvg");
    var Providers = /** @class */ (function (_super) {
        tslib_1.__extends(Providers, _super);
        function Providers() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Providers.prototype.render = function () {
            var _a = this.properties, _b = _a.me, me = _b === void 0 ? {} : _b, _c = _a.client_id, client_id = _c === void 0 ? {} : _c, _d = _a.headerNote, headerNote = _d === void 0 ? '' : _d, _e = _a.js, js = _e === void 0 ? '' : _e, _f = _a.notSupported, notSupported = _f === void 0 ? '' : _f, _g = _a.date, date = _g === void 0 ? '' : _g;
            var providers = me.data.best.providers;
            var vColors = ['', 'green', 'green', 'orange', 'red', 'blue'];
            console.log('PROVIDERS0', Object.keys(providers));
            return d_1.v('section.ui.column.stackable.grid#auth', [
                d_1.v('article.sixteen.wide.column', [
                    d_1.v('h4.ui.top.spaced.horizontal.header.green.divider.statusdivider', [
                        d_1.v('small', [headerNote])
                    ]),
                    d_1.v('noscript', [
                        d_1.v('div.ui.tiny.bordered.raised.segment', [d_1.v('h2.red.text', [js])])
                    ])
                ]),
                d_1.v('span.sixteen.wide.column.indieauth.grid', Object.keys(providers).map(function (k) {
                    var p = providers[k];
                    console.log('PROVIDERS', k, p);
                    var isP = (!!p.valid && p.key);
                    var isA = (!!isP && p.key === 'authorization_endpoint');
                    var order = !!p.order ? p.order : (!!isP ? 4 : 5);
                    var btnCl = ((order > 3) ? '.disabled.' : '.') + vColors[order];
                    var vNode = "output.indieauth." + (isP ? 'provider' : 'link');
                    return d_1.v(vNode, components_1.dataset({ order: order, url: p.url, provider: p.key, title: p.title }), [
                        d_1.v("button.ui.large" + btnCl + ".button", [
                            d_1.v('div.ui.horizontal.segments', [
                                d_1.v('div.ui.segment.site', (!!isP ? [
                                    d_1.v('div.ui.mini.image', { title: p.title + ":" + p.description }, [
                                        d_1.w(RedSvg_1.default, { svg: p.svg })
                                    ]),
                                    d_1.v('span', ['  ', p.display || '?'])
                                ] :
                                    [
                                        d_1.v('p.meta.blue.text', [d_1.v('i.minus.icon'), ' ' + notSupported]),
                                        (!p.display) ? '' : p.display
                                    ])),
                                (!isP) ? '' : d_1.v('div.ui.inverted.segment.active.dimmer', [
                                    d_1.v('div.ui.indeterminate.loader', [d_1.v('i.exchange.icon.blue.text')])
                                ])
                            ])
                        ])
                    ]);
                }).concat(d_1.v('div.ui.center.aligned.grey.inverted.segment.indieauth.link', [
                    d_1.v('p.serif.italic', [
                        d_1.v('time', { title: date, datetime: date }, [date])
                    ])
                ])))
            ]);
        };
        return Providers;
    }(WidgetBase_1.default));
    exports.default = Providers;
});
//# sourceMappingURL=IndieAuthProviders.js.map