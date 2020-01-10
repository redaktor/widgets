(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/widget-core/d", "../../../../../dojo/core/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var d_1 = require("@dojo/framework/widget-core/d");
    var main_1 = require("../../../../../dojo/core/main");
    function displayUrl(_url, relUrls) {
        /* TODO FIXME - if !!(relUrls) use .title, .text, .url */
        return _url.replace(/https?:[/][/]/gi, '').replace(/[/]$/gi, '').trim();
    }
    exports.displayUrl = displayUrl;
    /*
      TODO :
      e- : eExplode including sanitizing
    */
    // dt- : 'explode' the parts -->
    function dtExplode(type, props, baseClass, title, suffix, _el) {
        if (baseClass === void 0) { baseClass = ''; }
        if (suffix === void 0) { suffix = ''; }
        if (_el === void 0) { _el = 'time'; }
        if (baseClass !== '') {
            baseClass = ' ' + baseClass;
        }
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return props[type].map(function (dt) { return d_1.v(_el, { class: 'dt-' + type + baseClass, title: dt, datetime: dt }, [
            new Date(dt).toLocaleDateString('en-us', options)
        ]); });
    }
    exports.dtExplode = dtExplode;
    /*
    TODO : becomes widgets
    */
    function imgNode(photo) {
        return d_1.v('img', { class: "img ui inline mini image right floated", src: photo });
    }
    function urlNode(href, cssClass, title, children) {
        return d_1.v('a', { class: 'item ${cssClass}', target: '_blank', href: href, title: title }, children);
    }
    // u-, p- : 'explode' the parts -->
    //upExplode('url',p,'item',' ','URLs');
    function u_pExplode(type, props, baseClass, title, _el) {
        if (baseClass === void 0) { baseClass = ''; }
        if (_el === void 0) { _el = 'span'; }
        console.log('u_p', type, props, baseClass, title);
        if (baseClass !== '') {
            baseClass = ' ' + baseClass;
        }
        return props[type].map(function (part) {
            if (typeof part === 'object' && part.hasOwnProperty('properties') && Array.isArray(part.properties.url)) {
                var _namePart = (part.properties.name || part.properties.url);
                var children = [];
                if (!!(part.properties.photo) || !!(part.properties.logo)) {
                    var photo = part.properties[!!(part.properties.photo) ? 'photo' : 'logo'][0];
                    children = [
                        d_1.v('span', [
                            _namePart,
                            imgNode(photo)
                        ])
                    ];
                }
                else {
                    children = [part.properties.name || part.properties.url];
                }
                return urlNode(part.properties.url, 'u-' + type + baseClass, title || '', children);
            }
            else if (typeof part === 'string' && type === 'url') {
                return urlNode(part, 'u-' + type + baseClass, title || '', [part]);
            }
            else if (typeof part === 'string') {
                return d_1.v(_el, { class: 'p-' + type + baseClass, title: title }, [part]);
            }
            else if (typeof part === 'object') {
                return d_1.v(_el, { class: 'p-' + type + baseClass, title: title }, [JSON.stringify(part)]);
            }
            return '';
        });
    }
    exports.u_pExplode = u_pExplode;
    // GEO ARRAY
    function geoArray(o) {
        var geo;
        if (typeof o === 'string') {
            geo = o.replace('geo:', '').split(',');
        }
        else {
            geo = [o.latitude[0], o.longitude[0]];
            geo.push((!!(o.altitude)) ? o.altitude[0] : NaN);
        }
        if (isNaN(parseFloat(geo[0])) || isNaN(parseFloat(geo[1]))) {
            return [];
        }
        return geo;
    }
    exports.geoArray = geoArray;
    // card ADDRESS portion -->
    function addressObj(adr) {
        if (!(adr)) {
            return '';
        }
        var o = { label: adr, geoFull: '', summary: '', details: '' };
        var children = [];
        if (typeof adr === 'string') {
            return main_1.lang.mixin(o, { details: d_1.v('span.item.p-adr', [adr]) });
        }
        else if (typeof adr !== 'object' || !(adr.properties)) {
            return '';
        }
        var p = adr.properties;
        var aps = ['post-office-box', 'extended-address', 'street-address', 'locality',
            'postal-code', 'region', 'country-name'];
        var allAps = aps.concat(['adr', 'label', 'geo', 'latitude', 'longitude']);
        if (!(allAps.filter(function (s) { return p.hasOwnProperty(s); }).length)) {
            return '';
        }
        if (Array.isArray(p.name) && Array.isArray(p.label) && p.label[0].length < p.name[0].length) {
            main_1.lang.mixin(o, { label: p.name[0], summary: p.label[0] });
        }
        else {
            main_1.lang.mixin(o, { label: p.label[0], summary: p.name[0] });
        }
        var pL = aps.map(function (type) {
            var c = (type === 'postal-code') ? 'header' : 'description';
            children.push(u_pExplode(type, p, c));
            return (Array.isArray(p[type]) ? p[type][0] + ', ' : '');
        }).join(', ');
        main_1.lang.mixin(o, { details: d_1.v('address.ui.narrow.list', children) }, ((pL.length > o.label.length) ? { label: pL } : {}));
        var geo = [];
        if (!!(p.latitude) && !!(p.longitude)) {
            geo = geoArray(p);
        }
        else if (Array.isArray(p.geo) && p.geo[0].properties) {
            geo = geoArray(p.geo[0].properties);
        }
        else if (Array.isArray(p.geo)) {
            geo = geoArray(p.geo[0]);
        }
        if (!!geo) {
            main_1.lang.mixin(o, { label: geo.slice(0, 2).join(','), geoFull: geo.join(',') });
        }
        return o;
    }
    exports.addressObj = addressObj;
});
/*
export function openstreetmap(mapLabel: string, geoStr = '') {
  // TODO - serverside rendering is no problem but involves the geocoding request to nominatim
  const noJS = '<noscript><i class="red map icon"></i> Enable JavaScript for maps</noscript>';
  const $ = node('span', '', noJS);
  const _ = $(':root');
  // TODO - serverside rendering, see assets/osm.js
  if (geoStr != '') { _.append(el('small','p-geo',('geo:'+geoStr))); }
  _.append(el('i','ui map icon'), el('div','osm map',mapLabel));
  return $.html();
}
*/
//# sourceMappingURL=util.js.map