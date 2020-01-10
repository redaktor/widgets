(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "../../../../../dojo/core/uuid", "../../../../webcomponents/WidgetBase", "./util", "./svgs", "./MfCardRibbon", "./MfCardNameHeader", "../redaktor/RedImage", "../redaktor/RedUrl", "../redaktor/RedDetails", "./nls/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var uuid_1 = require("../../../../../dojo/core/uuid");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var util_1 = require("./util");
    var svgs_1 = require("./svgs");
    var MfCardRibbon_1 = require("./MfCardRibbon");
    var MfCardNameHeader_1 = require("./MfCardNameHeader");
    var RedImage_1 = require("../redaktor/RedImage");
    var RedUrl_1 = require("../redaktor/RedUrl");
    var RedDetails_1 = require("../redaktor/RedDetails");
    var common_1 = require("./nls/common");
    /* TODO FIXME -
    better isSmall
    .cardExtra .meta {
        display: inline-block;
        min-width: 52px;
    }
    */
    var Card = /** @class */ (function (_super) {
        tslib_1.__extends(Card, _super);
        function Card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /* TODO : this and h-x-app in own files ? */
        Card.prototype.hOrg = function (o, isSmall, isOrg) {
            var _this = this;
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (!(o.org)) {
                return '';
            }
            var children = o.org.map(function (_org) {
                if (_org.properties) {
                    return d_1.w(Card, {
                        card: _org.properties,
                        locale: _this.properties.locale,
                        type: 'h-org', isSmall: true, isOrg: true, key: uuid_1.default()
                    });
                }
                else {
                    return d_1.v('span.grey.italic.serif.text.p-org', [_org]);
                }
            });
            return d_1.v('div.p-org.org.extra.content', children);
        };
        Card.prototype.avatar = function (o, isSmall, isOrg) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            var Avatar = d_1.v('i.ui.user.icon.right.floated', {
                style: (!!isOrg) ? 'margin-left: 1.8rem;' : ''
            });
            if (Array.isArray(o.photo) || Array.isArray(o.logo)) {
                Avatar = d_1.w(RedImage_1.default, {
                    key: uuid_1.default(),
                    src: (!!(o.photo) ? o.photo[0] : o.logo[0]),
                    size: 'mini',
                    class: 'right floated'
                });
                // TODO : slideshow with ATTR. p-photo / p-logo
            }
            else if (!!(o.sex) && o.sex.toUpperCase() === 'M') {
                Avatar = d_1.v('div.right.floated', [svgs_1.monster]);
            }
            else if (!!(o.sex)) {
                Avatar = d_1.v('div.right.floated', [svgs_1.witch]);
            }
            return Avatar;
        };
        Card.prototype.notes = function (o, isSmall, isOrg, caption) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (caption === void 0) { caption = 'Notes'; }
            var Notes = '';
            if (!!(o.note)) {
                // TODO ? 'lang="en-us"' -> lang.detect, hyphenated
                var notes = util_1.u_pExplode('note', o, 'justified note small serif text', '', 'p');
                if (!!notes.length) {
                    var summary = d_1.v('span', (!!notes[0].children.length) ?
                        [(notes[0].children[0].slice(0, 20) + ' …')] : [caption]);
                    Notes = d_1.w(RedDetails_1.default, {
                        key: uuid_1.default(),
                        icon: 'idea',
                        title: caption,
                    }, notes.concat([d_1.v('br')]));
                }
            }
            return Notes;
        };
        Card.prototype.orgs = function (o, isSmall, isOrg, caption) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (caption === void 0) { caption = 'Organisations'; }
            var Orgs = '';
            var isArr = Array.isArray(o.org);
            if (!(o.org)) {
                return Orgs;
            }
            if (!(isArr && o.org.length === 1 && typeof o.org[0] === 'string')) {
                var orgContent = (this.hOrg(o, isSmall)) || ((!isOrg) ? 'priv.' : '');
                var orgP = { key: uuid_1.default(), icon: 'users', summary: caption, title: caption };
                Orgs = d_1.w(RedDetails_1.default, orgP, [orgContent, d_1.v('br')]);
            } // else only org string is under name already
            return Orgs;
        };
        Card.prototype.contact = function (o, isSmall, isOrg, captions) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (!(o.tel) && !(o.email) && !(o.key) && !(o.impp)) {
                return '';
            }
            /* TODO i18n c[1] :: */
            var contactTypes = [['p-tel', 'tel', 'call'], ['u-email', 'email', 'mail'],
                ['u-key', 'key', 'privacy'], ['u-impp', 'impp', 'talk']];
            var children = { summary: [], list: [] };
            var cl = '', item = '';
            contactTypes.forEach(function (c) {
                if (o[c[1]]) {
                    if (!Array.isArray(o[c[1]])) {
                        o[c[1]] = [o[c[1]]];
                    }
                    children.summary.push(d_1.v('i', { class: 'ui ' + c[2] + ' icon' }));
                    children.summary.push(' ');
                    o[c[1]].forEach(function (val, i) {
                        cl = ((i > 0) ? [c[1], 'header'] : [c[0], c[1], 'header']).join(' ');
                        item = d_1.v('div.item', [
                            d_1.v('span', { class: cl }, [
                                d_1.v('i', { class: 'ui ' + c[2] + ' icon' }, [
                                    (i > 0) ? d_1.w(RedUrl_1.default, {
                                        key: uuid_1.default(), href: val, class: ('contact ' + c[0]), title: c[1], target: '_blank'
                                    }) : val
                                ]),
                                ' '
                            ])
                        ]);
                        children.list.push(item);
                    });
                }
            });
            // TODO : DETAILS :
            return d_1.v('div.extra.content.description', [
                d_1.v('label.ui.details', [
                    d_1.v('input', { type: 'checkbox' }),
                    d_1.v('span.summary.purple.text', children.summary),
                    d_1.v('div.ui.list', children.list)
                ])
            ]);
        };
        Card.prototype.address = function (o, isSmall, isOrg, captions) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            var children = [];
            if (!!(o.adr)) {
                o.adr.forEach(function (adr) {
                    var myAddress = util_1.addressObj(adr);
                    if (!(myAddress.summary)) {
                        children.push(d_1.w(RedDetails_1.default, {
                            key: uuid_1.default(),
                            summaryTag: 'span.summary.purple.text',
                            summary: d_1.v('div.ui.left.pointing.purple.basic.label', [
                                d_1.v('i.ui.marker.icon'), ' ', myAddress.summary
                            ])
                        }, [myAddress.details, d_1.v('br')]));
                    }
                    else {
                        children.push.apply(children, tslib_1.__spread([d_1.v('i.ui.marker.icon'), ' ', myAddress.details]));
                    }
                });
            }
            else {
                /* TODO FIXME - we could parse address details or geo if any,
                    also see openstreetmap in main and util */
            }
            return d_1.v('div.extra.content.description', children);
        };
        Card.prototype.categories = function (o, isSmall, isOrg, caption) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (caption === void 0) { caption = 'Categories'; }
            if (!!(o.category)) {
                var cats = util_1.u_pExplode('category', o, 'ui tag label');
                return d_1.w(RedDetails_1.default, { key: uuid_1.default(), icon: 'tags', summary: caption, title: caption }, cats);
            }
            return '';
        };
        Card.prototype.urls = function (o, isSmall, isOrg, caption) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            if (caption === void 0) { caption = 'URLs'; }
            /* TODO FIXME APP
            if ((!!(p.url) && p.url.length > 1) || !(p.name)) {
            const urls = upExplode('url',p,'item',' ','URLs');
            _.append(el('div', 'ui narrow list extra content urls', urls+'<br/><br/>'));
            if (Object.keys(rels).length) {
              $('.list.extra.content.urls').each((i: number, elem: any) => {
                const href = $(this).attr('href');
                if (!!(href)) {
                  ['code-license','code-repository','content-license','content-repository'].forEach(type => {
                      if (!!(rels[type])) {
                        rels[type].forEach((_url: string) => {
                          if (href === _url) {
                            var v = type+': '+$(this).html();
                            $(this).html(v);
                          }
                        });
                      }
                  });
                };
              });
            }
          }
            */
            if (!o.url || o.url.length < 2) { // name is linked with only url already
                return '';
            }
            if (!!(o.url)) {
                var urls = util_1.u_pExplode('url', o, 'item', caption);
                console.log('urls', urls);
                return d_1.w(RedDetails_1.default, {
                    key: uuid_1.default(), icon: 'linkify', summary: caption, title: caption
                }, [d_1.v('div.ui.narrow.list.urls', urls), d_1.v('div')]);
            }
            return '';
        };
        Card.prototype.extra = function (o, p, title, icon, isDT) {
            if (title === void 0) { title = ''; }
            if (icon === void 0) { icon = ''; }
            if (isDT === void 0) { isDT = false; }
            console.log('extra', title);
            if (icon !== '') {
                icon = d_1.v('i.ui.' + icon + '.icon');
            }
            var cl = (icon !== '') ? '' : 'header';
            var content = (!!isDT) ? util_1.dtExplode(p, o, cl, title) : util_1.u_pExplode(p, o, cl, title);
            content.push(d_1.v('br'));
            var eChildren = [icon, d_1.v('small.meta', [title]), ' '].concat(content);
            return d_1.v('span', eChildren);
        };
        Card.prototype.extras = function (o, isSmall, isOrg, messages) {
            if (isSmall === void 0) { isSmall = false; }
            if (isOrg === void 0) { isOrg = false; }
            var Extras = '';
            // TODO if !!(o.bday) || !!(o.anniversary) is near make it red, if today blink
            var eO = {
                bday: [messages.bday, 'birthday', true],
                anniversary: [messages.anniversary, 'birthday', true],
                tz: [messages.tz, 'wait'],
                callsign: [messages.callsign, 'sound'],
                role: [messages.role, 'spy'],
                'job-title': [messages.jobTitle, 'spy']
            };
            var eChildren = [];
            var key;
            for (key in eO) {
                if (!!(o[key])) {
                    eChildren.push(this.extra.apply(this, [o, key].concat(eO[key])));
                }
            }
            if (!!(o.responses)) {
                var responses = util_1.u_pExplode('responses', o, 'small note meta serif text');
                eChildren.push(d_1.w(RedDetails_1.default, {
                    key: uuid_1.default(),
                    summaryTag: 'small',
                    summary: messages.res,
                    title: messages.res,
                    icon: 'comments outline'
                }, responses));
            }
            return d_1.v('div.extra.content.cardExtra', eChildren);
        };
        Card.prototype.render = function () {
            var _this = this;
            /* TODO for extends :
            classes : e.g. hCard h-card vcard
            hApp h-x-app
            */
            var messages = this.localizeBundle(common_1.default);
            var _a = this.properties, _b = _a.representative, representative = _b === void 0 ? false : _b, _c = _a.isSmall, isSmall = _c === void 0 ? false : _c, _d = _a.isOrg, isOrg = _d === void 0 ? false : _d, _e = _a.type, type = _e === void 0 ? [''] : _e;
            var o = (!!this.properties.card) ? this.properties.card : this.properties;
            /* TODO - instead of `card`, `url` can be specified  : this.properties.url*/
            var ribbonLabel = (!!representative) ? messages.representative : ' ';
            var Children = [];
            if (!!(this.children) && !!this.children.length) {
                Children.push(d_1.v('div.extra.content', [d_1.v('i.child.icon')].concat(this.children.reduce(function (a, c) {
                    if (c.value) {
                        a.push(d_1.v('small', [c.value]));
                    }
                    a.push(d_1.v('br'));
                    a.push(d_1.w(Card, {
                        card: c.properties,
                        locale: _this.properties.locale,
                        type: c.type,
                        key: uuid_1.default()
                    }, c.children || []));
                    return a;
                }, []))));
            }
            return d_1.v('div.ui.fluid.card', [
                d_1.w(MfCardRibbon_1.default, { label: (ribbonLabel + ' ' + type), success: representative, key: uuid_1.default() }),
                /* TODO NameHeader : ((type === '') ? 'priv.' : '')))||'anonymous' */
                d_1.v('div.content', [
                    this.avatar(o, isSmall, isOrg),
                    d_1.w(MfCardNameHeader_1.default, o),
                    this.notes(o, isSmall, isOrg, messages.note),
                    this.orgs(o, isSmall, isOrg, messages.org),
                    this.contact(o, isSmall, isOrg, messages),
                    this.address(o, isSmall, isOrg, messages),
                    this.categories(o, isSmall, isOrg, messages.cat),
                    this.urls(o, isSmall, isOrg, messages.url),
                    this.extras(o, isSmall, isOrg, messages)
                ]),
                d_1.v('div.extra.content', Children)
            ]);
        };
        return Card;
    }(WidgetBase_1.default));
    exports.default = Card;
});
//# sourceMappingURL=MfCard.js.map