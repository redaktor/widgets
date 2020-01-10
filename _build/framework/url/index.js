(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../isIdentical", "./UrlSearchParams"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var has_1 = require("@dojo/framework/has/has");
    var isIdentical_1 = require("../isIdentical");
    var UrlSearchParams_1 = require("./UrlSearchParams");
    var _url = (has_1.default('host-node')) ? require('url') : window.URL;
    /* TODO FIXME http://medialize.github.io/URI.js/ */
    var Parameters = /** @class */ (function (_super) {
        tslib_1.__extends(Parameters, _super);
        function Parameters(input) {
            return _super.call(this, input) || this;
        }
        /**
           * Returns a plain object with all first values OR
         * the first value associated with a key here!
           * @param key The key to return the first value for
           * @return The first string value for the key
           */
        Parameters.prototype.get = function (key) {
            var _this = this;
            if (key === void 0) { key = ''; }
            if (!this.has(key)) {
                return Object.keys(this._list).reduce(function (_o, key) {
                    if (key !== '') {
                        _o[key] = _this._list[key][0];
                    }
                    return _o;
                }, {});
            }
            return this._list[key][0];
        };
        return Parameters;
    }(UrlSearchParams_1.UrlSearchParams));
    exports.Parameters = Parameters;
    var url = /** @class */ (function () {
        function url() {
        }
        url.format = function (urlAny) {
            if (has_1.default('host-node')) {
                return _url.format(urlAny);
            }
            ;
            return (new _url(urlAny)).toString();
        };
        url.parse = function (urlStr, parseQuery, slashesDenoteHost) {
            if (parseQuery === void 0) { parseQuery = false; }
            if (slashesDenoteHost === void 0) { slashesDenoteHost = false; }
            urlStr = urlStr.trim();
            var proto = url.protocolPattern.exec(urlStr);
            var defProto = url.defaultProtocolPattern.exec(urlStr);
            if (!proto || defProto) {
                urlStr = "https:" + (defProto ? '' : '//') + urlStr;
            }
            if (has_1.default('host-node')) {
                var parsed = _url.parse(urlStr, parseQuery, slashesDenoteHost);
                parsed.originalUrl = urlStr;
                return (!!(parseQuery) && !(parsed.host) && !Object.keys(parsed.query).length) ? tslib_1.__assign({}, parsed, { query: url.parameters(urlStr).get() }) : parsed;
            }
            var U;
            try {
                U = new _url(urlStr);
            }
            catch (e) {
                return {};
            }
            U.originalUrl = urlStr;
            U.path = [U.pathname || '', U.search || ''].join('');
            // auth
            U.auth = (typeof U.username === 'string' && U.username.length) ?
                [U.username, U.password] : '';
            // query
            if (parseQuery) {
                U.query = (typeof U.searchParams === 'object') ?
                    U.searchParams : new Parameters(U.search || '').get();
            }
            else {
                U.query = U.search;
            }
            // slashes
            if (proto) {
                var lowerProto = proto[0].toLowerCase();
                U.protocol = lowerProto;
                urlStr = urlStr.substr(proto[0].length);
            }
            if (slashesDenoteHost || proto || urlStr.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var slashes = (urlStr.substr(0, 2) === '//');
                var lowerProto = proto[0].toLowerCase();
                if (slashes && !(lowerProto && url.hostlessProtocol[lowerProto])) {
                    urlStr = urlStr.substr(2);
                    U.slashes = true;
                }
            }
            return U;
        };
        url.parameters = function (input) {
            var U = (typeof input === 'string') ? url.parse(input) : input;
            if (!U.host && !U.search) {
                U.search = U.pathname;
            }
            return (new Parameters((!U.search) ? '' : U.search.replace('?', '')));
        };
        url.withParameters = function (baseUrl, queryObj) {
            var t = (typeof baseUrl);
            if (t !== 'string' && t !== 'object') {
                return '';
            }
            var parsed = (t === 'string') ? url.parse(baseUrl, true, false) : baseUrl;
            parsed.query = tslib_1.__assign({}, (parsed.query || {}), (queryObj || {}));
            return url.format(parsed);
        };
        url.concat = function (baseUrl, path) {
            return ((baseUrl.slice(-1) === '/') ? baseUrl.slice(0, -1) : baseUrl) +
                ((path.slice(0, 1) !== '/') ? ('/' + path) : path);
        };
        url.resolve = function (from, to) {
            if (has_1.default('host-node')) {
                return _url.resolve(from, to);
            }
            ;
            /* TODO FIXME browser */
        };
        url.resolveRelative = function (mainUrl, u) {
            var _u = url.parse(u);
            if (!(_u.protocol) && !(_u.host) && (!!(_u.path) || _u.href.charAt(0) === '#')) {
                return url.resolve(mainUrl, u);
            }
            return u;
        };
        url.normalizeUrl = function (u, inclQuery, defaultProtocol, forceProtocol) {
            if (inclQuery === void 0) { inclQuery = true; }
            if (defaultProtocol === void 0) { defaultProtocol = 'https:'; }
            if (forceProtocol === void 0) { forceProtocol = false; }
            // parse url
            u = (typeof u === 'string') ? url.parse(u, true) : u;
            // exclude standard ports
            var port = (!!u.port && ((u.protocol === 'http:' && u.port != '80') ||
                (u.protocol === 'https:' && u.port != '443'))) ?
                [':', u.port].join('') : '';
            // Bare domains get parsed as just a relative path, so fix that here
            if (!(u.protocol) && !(u.host) && !!(u.pathname)) {
                var h = JSON.parse(JSON.stringify(u.pathname));
                if (!!(u.query)) {
                    delete u.query[h];
                }
                u = tslib_1.__assign({}, u, { host: h, hostname: h, path: '/', pathname: '/' });
            }
            if (!!forceProtocol) {
                u = tslib_1.__assign({}, u, { protocol: defaultProtocol });
            }
            else if (typeof defaultProtocol === 'string' && !u.protocol) {
                u = tslib_1.__assign({}, u, { protocol: (defaultProtocol + ':') });
            }
            if (!inclQuery) {
                u.search = '';
            }
            if (!u.pathname || u.pathname === '') {
                u.pathname = '/';
            }
            if (!u.hostname) {
                return u.pathname;
            }
            return url.format(u);
        };
        url.hasIdentical = function (urls, myUrl) {
            if (typeof urls === 'string') {
                urls = [urls];
            }
            if (Array.isArray(urls) && urls.length && typeof myUrl === 'string' && myUrl.trim().length) {
                var nUrl = url.normalizeUrl(myUrl);
                var i, u;
                for (i = 0; i < urls.length; i++) {
                    u = url.resolveRelative(myUrl, urls[i]);
                    u = url.normalizeUrl(u);
                    if (typeof u === 'string' && u.trim().length && isIdentical_1.isIdentical(u, nUrl)) {
                        return true;
                    }
                }
            }
            return false;
        };
        url.protocolPattern = /^([a-z0-9.+-]+:)/i;
        url.defaultProtocolPattern = /^(\/\/)/i;
        url.hostlessProtocol = {
            'javascript': true,
            'javascript:': true
        };
        // protocols that always contain a // bit.
        url.slashedProtocol = {
            'http': true,
            'https': true,
            'ftp': true,
            'gopher': true,
            'file': true
        };
        return url;
    }());
    exports.default = url;
});
//# sourceMappingURL=index.js.map