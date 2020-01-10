(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../Template/dom", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/has", "@dojo/framework/shim/Promise", "@dojo/framework/core", "fs", "path", "./App", "..", "../../util", "./helper", "./config", "../../dstore/src/Memory", "../../util/string", "../../JSON/Pointer", "../../url", "./CLI", "./AppMfTest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var dom_1 = require("../../Template/dom");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var has_1 = require("@dojo/framework/has");
    var Promise_1 = require("@dojo/framework/shim/Promise");
    var core_1 = require("@dojo/framework/core");
    var fs = require("fs");
    var path = require("path");
    var App_1 = require("./App");
    var __1 = require("..");
    var util_1 = require("../../util");
    var helper_1 = require("./helper");
    var config_1 = require("./config");
    var Memory_1 = require("../../dstore/src/Memory");
    var string_1 = require("../../util/string");
    var Pointer_1 = require("../../JSON/Pointer");
    var url_1 = require("../../url");
    var CLI_1 = require("./CLI");
    var AppMfTest_1 = require("./AppMfTest");
    /* TODO FIXME - BUG s :
     * CACHED will make warnings to errors ... (setUrl rewrite ...)
     * missing providers : sms, clef
     * CSS :
     - .gpgAuthForm --> .ui.labeled.action.input.gpgAuth
     - .ui.labeled.action.input.mailAuth
    */
    /* TODO FIXME - add setUrl
    // twitter POST /account/update_profile ['url']
    // github PATCH /user ['blog']
    +
      * DOC USAGE
      * REDIS support is NOT yet included, but it SHOULD be ...
      * SSL error handling and [insecure redirects, e.g. line 302] in https://goo.gl/5rof5T
    */
    /*
    * SHOULD fix following issues (! check) :
    * #1, #31 (!), #48 (!), #72 (!), #85 and #104, #88, #103 (!), #109, #128
    * #130, #134
    * ;( #116
    */
    /* TODO FIXME - allover
    since redaktor.parser is near alpha, replace fixed date, time, place values w.
    according dynamic types and parse e.g. to ms
    */
    var IndieAuth = /** @class */ (function (_super) {
        tslib_1.__extends(IndieAuth, _super);
        function IndieAuth(kwArgs, kid, directory, user, salt, verifyTimeout, verifyStore, providers, subDir) {
            if (kwArgs === void 0) { kwArgs = {}; }
            if (directory === void 0) { directory = ''; }
            if (user === void 0) { user = ''; }
            if (verifyTimeout === void 0) { verifyTimeout = config_1.verifyTimeout; }
            if (verifyStore === void 0) { verifyStore = {}; }
            if (providers === void 0) { providers = {}; }
            if (subDir === void 0) { subDir = '.IndieAuth'; }
            var _this = _super.call(this) || this;
            _this.kid = kid;
            _this.directory = directory;
            _this.user = user;
            _this.salt = salt;
            _this.verifyTimeout = verifyTimeout;
            _this.verifyStore = verifyStore;
            _this.providers = providers;
            _this.subDir = subDir;
            _this.debug = false;
            _this._protocol = 'IndieAuth';
            _this._version = '1.0.0';
            _this._type = 'node';
            _this._url = null;
            _this._hasClients = false;
            _this._sessionData = { date: (new Date()), urls: {}, locale: 'en', me: {}, client_id: {}, redirect_uri: '' };
            _this._options = {
                followRedirects: true,
                method: 'GET',
                headers: {
                    accept: 'text/html',
                    connection: 'close',
                    'Content-Type': 'text/html;charset=UTF-8',
                    /* will change to users agent if available : */
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) ' +
                        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
                },
                responseType: 'mf',
                /* NOTE -     'mf' all IndieAuth requests return microformats by default !
                > the OAuth request are handled by redaktor.auth.OAuth modules and return JSON.
                */
                query: {},
                timeout: 6000 /* NOTE : seeAlso config.ts ! */
                /*,cacheBust: true*/
            };
            _this.user = path.basename(helper_1.userDir);
            if (_this.directory !== '') {
                _this.subDir = _this.directory;
            }
            _this.directory = path.resolve(helper_1.userDir, _this.subDir);
            if (!has_1.default('host-node')) {
                throw new Error('This module requires node.js');
            }
            else if (!fs.existsSync(_this.directory) ||
                typeof process.env.PW !== 'string' || !(process.env.PW.length)) {
                new CLI_1.CLI({ directory: _this.subDir });
                return _this;
            }
            if (process.env.NODE_ENV === 'development') {
                _this.debug = true;
            }
            var secrets = helper_1.checkPW(process.env.PW);
            if ((!secrets || secrets.statusCode !== 200) && core_1.lang.mixin(_this, { debug: true })) {
                throw _this.error('vWrongPw', 400).statusCode;
            }
            else {
                core_1.lang.mixin(_this, secrets);
                _this.isObject(kwArgs) && core_1.lang.mixin(_this, kwArgs);
                _this.verifyStore = new Memory_1.default({ data: [], idProperty: 'url' });
                _this.providers = helper_1.getProviders();
                _this.initDebugLog([], ['salt', 'providers', 'verifyStore']);
                _this.initIndieAuth();
            }
            return _this;
        }
        /* public, overwritable : */
        IndieAuth.prototype.initIndieAuth = function () { };
        IndieAuth.prototype.test = function (data, res, returnFn) {
            //'/Users/sebi/Desktop/redaktorTS2/_build/webcomponents/Widgets/dist/index.html'
            var root = dom_1.default.createElement('div');
            var appNode = root.appendChild(dom_1.default.createElement('my-app'));
            var Projector = Projector_1.ProjectorMixin(AppMfTest_1.default);
            var projector = new Projector();
            //projector.sandbox(Doc);
            projector.setProperties(data);
            projector.append(appNode);
            /*
            //Doc.write(html);
            JSDOM.fromFile('/Users/sebi/Desktop/redaktorTS2/_build/webcomponents/Widgets/dist/index.html', {
              CONSOLE,
              resources: 'usable',
              runScripts: 'dangerously'
            }).then((dom: any) => {
            setTimeout(function() {
              res.locals.messages = JSON.stringify(res.locals);
              res.locals.IndieAuth = dom.serialize();
              res.locals.icon = (!!data.me && !!data.me.data.best && data.me.data.best.icon);
              res.locals.providerCount = data.me.data.best.providerCount;
              if (!!res) { res.render('auth.html', res.locals) }
              //console.log(dom.serialize());
              return !!(returnFn) ? returnFn(data) : data;
            }, 400);
            });
            */
        };
        IndieAuth.prototype.render = function (data, res, returnFn) {
            var root = dom_1.default.createElement('div');
            var appNode = root.appendChild(dom_1.default.createElement('my-app'));
            var Projector = Projector_1.ProjectorMixin(App_1.default);
            var projector = new Projector();
            //console.log('PROJECTOR DATA', JSON.stringify(data))
            projector.setProperties(data);
            projector.append(appNode);
            /* TODO - when turning to components : */
            res.locals.messages = JSON.stringify(res.locals);
            res.locals.IndieAuth = root.innerHTML; /* TODO FIXME */
            res.locals.icon = (!!data.me && !!data.me.data.best && data.me.data.best.icon);
            res.locals.providerCount = data.me.data.best.providerCount;
            /* <--- */
            if (!!res) {
                res.render('auth.html', res.locals);
            }
            return !!(returnFn) ? returnFn(data) : data;
        };
        IndieAuth.prototype.meData = function (me) {
            if (typeof me !== 'object') {
                return me;
            }
            var my = me.data;
            my.best.providers = {};
            if (!!(my['rel-urls'])) {
                var isValid = function (k) {
                    return (!!(my.best.providers[k].valid) && !!(my.best.providers[k].key));
                };
                /* check authorization_endpoints and pgpkey */
                var myEndpoints = helper_1.endpointLinks(my);
                /* check OAuth providers */
                var myProviders = [];
                if (my.rels.hasOwnProperty('me')) {
                    myProviders = my.rels.me.map(helper_1.providerLinks(my, this.providers)).sort(helper_1.validFirst);
                }
                //console.log('.KEY myProviders',myProviders);
                my.best.providers = myEndpoints.concat(myProviders).reduce(util_1.arrToObjByKey('url'), {});
                my.best.providerCount = Object.keys(my.best.providers).length;
                my.best.verifyCount = Object.keys(my.best.providers).filter(isValid).length;
            }
            return me;
        };
        IndieAuth.prototype.getCachedParameters = function (req, res, urls, cacheBust) {
            var cache = { client_id: false, me: false };
            var rState = ((util_1.exists('query.state', req) && req.query.state));
            var state = (rState || urls.me[0] + "#" + res.locals.csrf);
            var session = this.sessionData(req, { urls: urls, state: state });
            if (!this.session(req, session)) {
                return {};
            }
            if (!(cacheBust)) {
                var s_1 = this.session(req);
                if (s_1.state !== state) {
                    s_1.state = state;
                }
                var _has = function (k) { return (s_1.urls[k].indexOf(urls[k][0]) > -1); };
                for (var key in cache) {
                    if (!_has(key) || !s_1[key].hasOwnProperty(urls[key][0])) {
                        continue;
                    }
                    cache[key] = Promise_1.default.resolve(s_1[key][urls[key][0]]);
                }
                cache.date = s_1.date;
            }
            return cache;
        };
        IndieAuth.prototype.getCachedRequestOptions = function (type, urls, cache) {
            return (cache[type] || this.get({ url: urls[type][0], meta: { id: type } }));
        };
        IndieAuth.prototype.auth = function (req, res, cacheBust) {
            var _this = this;
            if (cacheBust === void 0) { cacheBust = false; }
            if (!this._hasClients) {
                this._url = url_1.default.concat((config_1.baseUrl || '/'), req.route.path);
                this.providers = helper_1.getProviders.call(this, process.env.PW);
                this._hasClients = true;
            }
            var isCallback = (!!(req.query.state) || !!(req.body.state)) &&
                (!!(req.query.oauth_token) || !!(req.query.code) || !!(req.body.code));
            if (!isCallback) {
                // Tell clients this is an indieauth endpoint :
                res.set('IndieAuth', 'authorization_endpoint');
            }
            if (!!(req.query.authorize)) { /* Authorize provider ? */
                return this.providerAuth(req, res);
            }
            else if (isCallback) { /* Handle Callback provider ? */
                console.log('isCallback');
                return this.providerAccess(req, res);
            }
            if (!req || typeof req !== 'object' ||
                !(req.query) || typeof req.query.client_id !== 'string') {
                return this.render(this.error('client_id', 400), res);
            }
            if (typeof req.query.me !== 'string') {
                return this.render(this.error('me'), res); /* TODO - FIXME in view */
            }
            if (!!(req.query.verify)) { /* Verify provider ? */
                return this.verify(req, res);
            }
            /* TODO if (!!(req.query.error)) fall short */
            var urls = {
                me: [this.normalizeMe(this._decode(req.query.me))],
                client_id: [this._normalizeUrl(this._decode(req.query.client_id))]
            };
            if (typeof urls.me[0] !== 'string' || urls.me[0] === '/') {
                return this.render(this.error('meInvalid'), res);
            }
            /* Cache ? */
            var cache = this.getCachedParameters(req, res, urls, cacheBust);
            /* console.log('cache', cache); */
            util_1.objectPromiseAll({
                client_id: this.getCachedRequestOptions('client_id', urls, cache),
                me: this.getCachedRequestOptions('me', urls, cache)
            }).then(function (results) {
                /* if no cache, get me / my providers */
                if (!(cache.me)) {
                    results.me = _this.meData(results.me);
                }
                /* TODO make meData async */
                /* TODO FIXME render me error if NO results.me.data.items [] */
                var s = _this.session(req);
                if (s.redirect_uri === '') {
                    s.redirect_uri = (req.query.redirect_uri || req.query.client_id);
                }
                var me = results.me;
                var cl = results.client_id;
                var data = {
                    date: (!!(cache.date) ? cache.date : (new Date())),
                    client_id: { statusCode: cl.statusCode, data: { best: cl.data.best, url: cl.data.url } },
                    me: { statusCode: me.statusCode, data: { best: me.data.best, url: me.data.url } }
                };
                var toSession = function (type) {
                    return function (u) {
                        (s.urls[type].indexOf(u) < 0 && s.urls[type].push(u));
                        s[type][u] = data[type];
                    };
                };
                var key;
                for (key in urls) {
                    if (!!cache[key]) {
                        continue;
                    }
                    (urls[key][0] !== data[key].data.url && urls[key].push(data[key].data.url));
                    if (key === 'me' && !!(me.requestOptions.redirects)) {
                        me.requestOptions.redirects.forEach(function (rU) {
                            (urls.me.indexOf(rU) === -1 && urls.me.push(rU));
                        });
                    }
                    urls[key].forEach(toSession(key));
                }
                _this.session(req, s);
                /* some provider parameters are added finally to keep sessions small */
                var d = util_1.copy(data);
                for (key in d.me.data.best.providers) {
                    if (!!d.me.data.best.providers[key].key) {
                        var p = _this.providers[d.me.data.best.providers[key].key];
                        core_1.lang.mixin(d.me.data.best.providers[key], { id: p.id, svg: p.svg, title: (!!p.title) ? p.title : '' });
                    }
                }
                //console.log('!AUTHDATA', JSON.stringify(d));
                return _this.render(d, res);
            }, function (errRes) {
                var _id = null; // console.log('ERROR',errRes);
                if (!(errRes.meta.id) || (errRes['code'] && errRes['code'] === 'ENOTFOUND')) {
                    var meHost = url_1.default.parse(urls.me[0]).host;
                    _id = (meHost === errRes['host']) ? 'me' : 'client_id';
                }
                return _this.render(_this._reqError(errRes, _id), res);
            });
        };
        IndieAuth.prototype.reqOptions = function (provider, verifyUrl, req) {
            var myData = (this.providers[provider.key].me || {});
            var _agent = (!!myData.agent) ? myData.agent : /* e.g. google needs curl */
                (!!req && req.get('User-Agent') || this._options.headers['User-Agent']);
            var headers = core_1.lang.mixin(this._options.headers, { Accept: '*/*', 'User-Agent': _agent });
            var options = core_1.lang.mixin({
                url: verifyUrl, headers: headers, timeout: this.verifyTimeout,
                meta: { id: 'verify', provider: provider.key }
            }, myData);
            if (!!myData.set && typeof myData.set.options === 'function') {
                core_1.lang.mixin(options, myData.set.options(provider));
            }
            return options;
        };
        IndieAuth.prototype.verify = function (req, res) {
            var _this = this;
            var me = this.normalizeMe(this._decode(req.query.me));
            var verifyUrl = this._normalizeUrl(this._decode(req.query.verify));
            var s = this.session(req);
            if (!this.hasMe(req, me)) {
                return this.errJSON('verifyInsecure', res);
            }
            try {
                this.verifyStore.addSync({
                    url: req.query.me, me: 'self', count: s.me[me].data.best.verifyCount,
                    urls: [req.query.me], done: 0
                });
            }
            catch (e) { }
            var sProvider = s.me[me].data.best.providers[req.query.verify];
            // console.log('v, verify', v, verifyUrl, sProvider.key);
            var is = { authorization_endpoint: false, mail: false, sms: false, pgpkey: false };
            for (var key in is) {
                is[key] = (sProvider.key === key);
            }
            var options = this.reqOptions(sProvider, verifyUrl, req);
            var finish = function (err) {
                var s = _this.session(req);
                var meObj = _this.verifyStore.getSync(req.query.me);
                var i;
                for (i = 0; i < meObj.urls.length; i++) {
                    if (s.urls.me.indexOf(meObj.urls[i]) === -1) {
                        s.urls.me.push(meObj.urls[i]);
                    }
                }
                _this.verifyStore.filter({ me: req.query.me }).forEach(function (_o) {
                    if (_o.verified === true) {
                        s.me[me].data.best.providers[_o.url].verified = true;
                        s.me[me].data.best.providers[_o.url].order = 2;
                    }
                    else if (!!(_o.key && _this.providers[_o.key].setUrl)) {
                        s.me[me].data.best.providers[_o.url].order = 3;
                    }
                    _this.verifyStore.remove(_o.url);
                }).then(function () {
                    return _this.resJSON(((!!err) ? _this.error(err) : { verified: true }), res);
                });
            };
            var status = function (err) {
                if (!!err) {
                    console.log(sProvider.key, 'RETURNED E', JSON.stringify(err));
                }
                var R = { key: sProvider.key, url: req.query.verify, me: req.query.me, verified: !(err) };
                return _this.verifyStore.add(R).then(function () {
                    _this.verifyStore.get(req.query.me).then(function (_me) {
                        _me.done++;
                        console.log('COUNT', _me.done, _me.count, sProvider.key, err);
                        if (_me.done === _me.count) {
                            finish(err);
                        }
                        else {
                            _this.verifyStore.putSync(_me);
                            return _this.resJSON(((!!err) ? _this.error(err) : { verified: true }), res);
                        }
                    });
                });
            };
            if (!(is.authorization_endpoint) && !(sProvider.valid)) {
                return status('verifyNoCred');
            }
            if (is.mail || is.sms || is.pgpkey) {
                return status();
            }
            /* Compare rel="me" links to check if they link back */
            var provider = function (mfRes) {
                var key;
                if (!(mfRes.data.rels) || !Array.isArray(mfRes.data.rels.me)) {
                    return status('verifyNoMe');
                }
                /* twitter stores the real URL in title, let's evt. omit one request : */
                if (string_1.startsWith(mfRes.requestOptions['url'], 'https://twitter.com')) {
                    for (key in mfRes.data['rel-urls']) {
                        var o = mfRes.data['rel-urls'][key];
                        if (typeof o === 'object' && !!(o.title) && (o.rels.indexOf('me') > -1)) {
                            mfRes.data.rels.me.push(o.title);
                            break;
                        }
                    }
                    ;
                }
                if (_this.hasMe(req, mfRes)) {
                    return status();
                }
                // if they don't link back follow all urls for the redirects
                var rM = mfRes.requestOptions['meta'];
                var rP = (rM && rM.provider && _this.providers[rM.provider]);
                var e = (!!rP && !!(rP.setUrl)) ? 'verifyTmpInvalidMe' : 'verifyInvalidMe';
                var hasN = 0;
                mfRes.data.rels.me.forEach(function (meUrl) {
                    var redirectOptions = _this.reqOptions(sProvider, meUrl, req);
                    _this.get(redirectOptions).then(function (redirectRes) {
                        hasN++;
                        if (url_1.default.hasIdentical(s.urls.me, redirectRes.data.url) &&
                            !!(redirectRes.requestOptions.meta.url)) {
                            var redirected = redirectRes.requestOptions.meta.url;
                            var meObj = _this.verifyStore.getSync(req.query.me);
                            if (meObj.urls.indexOf(redirected) === -1) {
                                meObj.urls.push(redirected);
                            }
                            return status();
                        }
                        if (hasN === mfRes.data.rels.me.length) {
                            status(e);
                        }
                    }, function (e) {
                        hasN++;
                        if (hasN === mfRes.data.rels.me.length) {
                            status(e);
                        }
                    });
                });
            };
            /* <-- provider [OAuth provider] */
            /* Make an HTTP request to the auth server and check that it responds
             * with an "IndieAuth: authorization_endpoint" header,
             * but return false if it's actually this server
            */
            var endpoint = function (epRes) {
                var h = epRes.getHeader('indieauth');
                if (!(h) || h !== 'authorization_endpoint') {
                    return status('verifyNoHeader');
                }
                var _v = _this._decode(req.query.verify);
                var _urls = ((!!(epRes.url) && _v !== epRes.url) ? [epRes.url, _v] : [_v]);
                /* TODO redirects ? */
                if (url_1.default.hasIdentical(_urls, _this._url)) {
                    return status('verifyNotSelf');
                }
                /*
                 * If only one profile is set, and it's an indieauth authorization endpoint,
                 * then skip directly to it
                */
                if (s.me[me].data.best.verifyCount === 1) {
                    res.redirect(epRes.url);
                }
                return status();
            };
            /* <-- endpoint [Authorization endpoint] */
            var method = (!!(is.authorization_endpoint)) ? 'head' : 'get';
            return this[method](options).then(((!!(is.authorization_endpoint)) ? endpoint : provider), res.status(200).json);
        };
        IndieAuth.prototype.getProvider = function (req, res) {
            var s = this.session(req);
            var hasUrl = (!!s && !!url_1.default.hasIdentical(s.urls.me, s.login.me));
            var _state = (!!(req.query) && req.query.state) || (!!(req.body) && req.body.state);
            /* TODO FIXME urgent : _state !== s.state */
            if (!hasUrl || !_state /*|| _state !== s.state*/) {
                return this.errJSON('accessInsecure', res);
            }
            var sProvider, authProvider;
            try {
                sProvider = s.me[s.login.me].data.best.providers[s.login.url];
                authProvider = this.providers[sProvider.key];
            }
            catch (e) { /* JS client kiddies (wrong "key") ... */
                return this.errJSON('accessInvalid', res);
            }
            if (!authProvider || !authProvider.valid || (!sProvider.verified && !authProvider.setUrl)) {
                return this.errJSON('accessInvalid', res);
            }
            return authProvider;
        };
        IndieAuth.prototype.providerAuth = function (req, res) {
            var me = this.normalizeMe(this._decode(req.query.me));
            var s = this.session(req);
            s.login = { me: me, url: req.query.authorize, created: (new Date()) };
            var provider = this.getProvider(req, res);
            /* TODO FIXME error handling [should not happen ;)] */
            if (!provider.valid) {
                throw ('no client found for ' + req.query.authorize);
            }
            return provider.auth(req, res, { state: s.state });
        };
        IndieAuth.prototype.providerAccess = function (req, res) {
            var _this = this;
            var provider = this.getProvider(req, res);
            /* TODO FIXME error handling [should not happen ;)] */
            //if (!provider.valid) { throw('no client found for' + req.url) }
            var s = this.session(req);
            provider.access(req, res, { state: s.state }).then(function (accessRes) {
                var sProvider = s.me[s.login.me].data.best.providers[s.login.url];
                var v = provider.verify;
                // verifiers can return
                // options: (provider,oauth) => {}, set: (o) => {}, verify: {userId:'/', userMe:'/'}
                var verify = function (o) {
                    req.data = (o.data || {});
                    s = _this.session(req);
                    var VERIFIED = {
                        userId: false,
                        userMe: (provider._protocol === 'MailAuth' || provider._protocol === 'GPGAuth')
                    };
                    //VERIFIED { userId: false, userMe: true }
                    if (typeof v.meta === 'object') {
                        if (!!v.meta.userId) {
                            var userId = Pointer_1.default(req.data, v.meta.userId);
                            if (!!userId && sProvider.userId === userId) {
                                VERIFIED.userId = true;
                            }
                        }
                        if (!!v.meta.userMe) {
                            var userMe = Pointer_1.default(req.data, v.meta.userMe);
                            if (!!userMe && url_1.default.hasIdentical(s.urls.me, userMe)) {
                                VERIFIED.userMe = true;
                            }
                            //console.log('verify userMe', v.meta.userMe, ' :: ', userMe, ' : ', s.urls.me);
                        }
                    }
                    console.log('VERIFIED', VERIFIED);
                    if (VERIFIED.userId === true && VERIFIED.userMe === true) {
                        _this.access(req, res);
                    }
                    else if (VERIFIED.userMe !== true && !!(req.data.profileUrl)) {
                        var options = _this.reqOptions(sProvider, req.data.profileUrl, req);
                        _this.get(options).then(function (mfRes) {
                            if (!(mfRes.data.rels) || !Array.isArray(mfRes.data.rels.me)) {
                                _this.render(_this.error('accessUserId'), res);
                            }
                            if (_this.hasMe(req, mfRes)) {
                                console.log('OK');
                                _this.access(req, res);
                            }
                            else {
                                console.log('ERR');
                                _this.render(_this.error('accessUserId'), res);
                            }
                        }, function () { _this.render(_this.error('accessUserId'), res); });
                    }
                    else if (VERIFIED.userMe !== true && !!(provider.setUrl)) {
                        // TODO FIXME setUrl
                    }
                    else {
                        console.log('Not VERIFIED');
                        console.log(_this.error(!(VERIFIED.userId) ? 'accessUserId' : 'accessUserMe'));
                        _this.render(_this.error(!(VERIFIED.userId) ? 'accessUserId' : 'accessUserMe'), res);
                    }
                    return o;
                };
                var setData = (!!v.set && typeof v.set.result === 'function') ?
                    v.set.result(sProvider, accessRes) : (function (res) { return res; });
                var myOptions = core_1.lang.mixin({ responseType: 'json', oauth: accessRes }, v);
                if (!!v.set && typeof v.set.options === 'function') {
                    core_1.lang.mixin(myOptions, v.set.options(provider, accessRes));
                }
                if (!!myOptions.url && typeof myOptions.url === 'string') {
                    return provider.get(myOptions).then(setData).then(verify);
                }
                return Promise_1.default.resolve(setData({ data: accessRes })).then(verify);
            });
        };
        IndieAuth.prototype.access = function (req, res) {
            // SEND REDIRECT URI
            var s = this.session(req);
            var ACCESSCODE = 'TODO'; // TODO FIXME
            var redirect_uri = url_1.default.withParameters(s.redirect_uri, {
                code: ACCESSCODE, me: s.login.me, state: s.state
            });
            console.log('OK !!! data', req.data);
            console.log('OK !!! redirecting to redirect_uri', redirect_uri);
            //    res.redirect(redirect_uri);
            return req.data;
        };
        return IndieAuth;
    }(__1.default));
    exports.default = IndieAuth;
});
//# sourceMappingURL=index.js.map