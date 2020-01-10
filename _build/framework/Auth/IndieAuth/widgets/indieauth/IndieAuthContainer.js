(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d", "../../../../../dojo/core/main", "../../../../../dojo/core/uuid", "../microformats/MfCardSiteInfo", "../microformats/MfCard", "./IndieAuthError", "./IndieAuthProviders"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var main_1 = require("../../../../../dojo/core/main");
    var uuid_1 = require("../../../../../dojo/core/uuid");
    var MfCardSiteInfo_1 = require("../microformats/MfCardSiteInfo");
    var MfCard_1 = require("../microformats/MfCard");
    var IndieAuthError_1 = require("./IndieAuthError");
    var IndieAuthProviders_1 = require("./IndieAuthProviders");
    var Container = /** @class */ (function (_super) {
        tslib_1.__extends(Container, _super);
        function Container() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Container.prototype.render = function () {
            var _a = this.properties, _b = _a.me, me = _b === void 0 ? {} : _b, _c = _a.client_id, client_id = _c === void 0 ? {} : _c, _d = _a.statusCode, statusCode = _d === void 0 ? 0 : _d, _e = _a._as, _as = _e === void 0 ? 'as' : _e, _f = _a._to, _to = _f === void 0 ? 'to' : _f, _g = _a.mfs, mfs = _g === void 0 ? '' : _g, _h = _a.error, error = _h === void 0 ? '' : _h, _j = _a.cardHeader, cardHeader = _j === void 0 ? '' : _j;
            var providers = me.data.best.providers;
            var mfLabel = d_1.v('h5.summary.grey.text', [
                d_1.v('img.ui.mini.image', { src: 'img/logoMicroformats.svg' }, [
                    '&nbsp;  ',
                    d_1.v('small.grey.serif.text', [d_1.v('em', [mfs])])
                ])
            ]);
            // The "Login as / to Header" with microformats
            var steps = {
                as: [
                    /* site info for 'me' */
                    (!me.data ? '' :
                        d_1.v('output.me.site.title', { 'data-ref': me.data.url }, [
                            d_1.w(MfCardSiteInfo_1.default, main_1.lang.mixin(me.data, { key: uuid_1.default() }))
                        ])),
                    ((!me.data.best.hCard) ? '' :
                        d_1.v('output.left.aligned.container', {
                            'data-ref': me.data.url + "#" + me.data.best.hCard['$ref']
                        }, [
                            /* TODO : widget redaktor.Details : */
                            d_1.v('div.mf.description', [
                                d_1.v('label.ui.details', [
                                    d_1.v('input', { type: 'checkbox' }),
                                    mfLabel,
                                    /* representative h-card for 'me' */
                                    d_1.w(MfCard_1.default, {
                                        locale: 'de',
                                        card: me.data.best.hCard.properties,
                                        type: me.data.best.hCard.type,
                                        representative: me.data.best.hCard.representative,
                                        key: uuid_1.default()
                                    }, me.data.best.hCard.children || [])
                                ])
                            ])
                        ]))
                ],
                to: [
                    /* site info for 'client_id' */
                    (!client_id.data ? '' :
                        d_1.v('output.client_id.site.title', { 'data-ref': client_id.data.url }, [
                            d_1.w(MfCardSiteInfo_1.default, main_1.lang.mixin(client_id.data, { key: uuid_1.default() }))
                        ])),
                    ((!client_id.data.best.hXApp) ? '' :
                        d_1.v('output.left.aligned.container', {
                            'data-ref': client_id.data.url + "#" + client_id.data.best.hXApp['$ref']
                        }, [
                            /* TODO : widget redaktor.Details : */
                            d_1.v('div.mf.description', [
                                d_1.v('label.ui.details', [
                                    d_1.v('input', { type: 'checkbox' }),
                                    mfLabel,
                                    /* representative h-x-app for 'client_id' */
                                    d_1.w(MfCard_1.default, {
                                        locale: 'de',
                                        card: client_id.data.best.hXApp.properties,
                                        type: client_id.data.best.hXApp.type,
                                        representative: client_id.data.best.hXApp.representative,
                                        key: uuid_1.default()
                                    }, client_id.data.best.hXApp.children || [])
                                ])
                            ])
                        ]))
                ]
            };
            var meError = ((me.statusCode !== 200 || !me.data.best) && [
                d_1.v('b.ui.top.left.attached.label.red.large', ['“me”', error]),
                d_1.w(IndieAuthError_1.default, this.properties)
            ]);
            return d_1.v('div.ui.inverted.vertical.grey.segment', [
                d_1.v('div.ui.text.container', [
                    d_1.v('div.ui.top.green.label.signin', [d_1.v('b', [cardHeader])]),
                    d_1.v('div.ui.two.steps', [
                        d_1.v('div.step.as', (!!meError ? meError : [
                            d_1.v('b.ui.top.left.attached.green.label', [_as]),
                            d_1.v('div.ui.container.meContainer', steps.as)
                        ])),
                        d_1.v('div.step.to', [
                            d_1.v('b.ui.top.right.attached.green.label', [_to]),
                            d_1.v('div.ui.container.clientIdContainer', steps.to)
                        ])
                    ]),
                    d_1.w(IndieAuthProviders_1.default, this.properties)
                ])
            ]);
        };
        return Container;
    }(WidgetBase_1.default));
    exports.default = Container;
});
//# sourceMappingURL=IndieAuthContainer.js.map