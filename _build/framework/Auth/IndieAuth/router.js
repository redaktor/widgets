(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "express-session", "body-parser", "helmet", "csurf", "../../../dojo/core/main", "../../util/promise", "../../util/i18n", "./nls/_i18n", "./main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express = require("express");
    var session = require("express-session");
    var bodyParser = require("body-parser");
    var helmet = require("helmet");
    var csrf = require("csurf");
    var main_1 = require("../../../dojo/core/main");
    var promise_1 = require("../../util/promise");
    var i18n_1 = require("../../util/i18n");
    var _i18n_1 = require("./nls/_i18n");
    var main_2 = require("./main");
    /* Please NOTE that any console log before here is deleted now */
    //console.log('\x1Bc');
    var IndieAuth = new main_2.default({ debug: true });
    /* INDIEAUTH : */
    /* ROUTER FUNCTIONS : */
    function localizedRoute(routeStr) {
        /* TODO FIXME */
        if (routeStr === 'test') {
            var data_1 = require('./test.json');
            // TODO if languages is undefined it will be an empty string causing a fn with objects an error :
            return (function (req, res) { res.locals.languages = {}; IndieAuth.test(data_1, res); });
        }
        var view = (!routeStr.length || routeStr === 'home') ? 'index' : routeStr;
        return (function (req, res) {
            var _lang = (IndieAuth.session(req).locale || i18n_1.getLocaleObj(req).locale);
            var _locales = ['en'].concat(_i18n_1.default[view].locales || []);
            var _languages = _locales.reduce(function (o, locale) {
                o[locale] = i18n_1.getLocalLangName(locale);
                return o;
            }, {});
            promise_1.objectPromiseAll({
                common: i18n_1.getCachedI18n(_lang, _i18n_1.default.common),
                page: i18n_1.getCachedI18n(_lang, _i18n_1.default[view])
            }).then(function (results) {
                main_1.lang.mixin(res.locals, results.common.messages, results.page.messages, {
                    language: _lang,
                    languages: _languages,
                    locales: _locales
                });
                (view === 'auth') ? IndieAuth.auth(req, res) : res.render(view + '.html');
            });
        });
    }
    function switchLanguage(req, res) {
        if (req.params.locale.match(/^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/)) {
            var s = IndieAuth.session(req);
            /* TODO should hasSesssion directly return session instead of true ? */
            IndieAuth.session(req, main_1.lang.mixin({}, s, i18n_1.getLocaleObj(req.params.locale, _i18n_1.default.common) || {}));
        }
        res.redirect('back');
    }
    /* Initial language : */
    var doInitialLanguage = function (req, res, next) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return next();
        }
        console.log(req.method, req.url, req.path);
        if (!IndieAuth.hasSession(req)) {
            var s = IndieAuth.session(req);
            /* TODO should hasSesssion directly return session instead of true ? */
            IndieAuth.session(req, main_1.lang.mixin({}, s, i18n_1.getLocaleObj(req, _i18n_1.default.common) || {}));
        }
        console.log('initial lang session', IndieAuth.session(req));
        next();
    };
    var IndieAuthRouter = express.Router();
    /* POST bodies */
    var doParseBody = [bodyParser.json(), bodyParser.urlencoded({ extended: true })];
    /* Sessions: IndieAuth gives you one constant salt per server password */
    var doSession = session({
        name: 'sessionId',
        secret: 'evtlEnterAnythingHER3_butSALTit:' + IndieAuth.salt,
        resave: false,
        saveUninitialized: false,
        cookie: {
            //secure: true,
            httpOnly: true
            /* TODO - FIXME from config :
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
            */
        }
    });
    /* CSRF */
    var doCSRF = csrf({
        value: function (req) {
            var _state = (!!(req.query) && req.query.state) || (!!(req.body) && req.body.state);
            if (!!_state) {
                try {
                    var _o = JSON.parse(_state);
                    if (typeof _o === 'object' && _o._csrf) {
                        return _o._csrf;
                    }
                }
                catch (e) { }
                return _state;
            }
            else {
                // std:
                return (req.body && req.body._csrf) ||
                    (req.query && req.query._csrf) ||
                    (req.headers['csrf-token']) ||
                    (req.headers['xsrf-token']) ||
                    (req.headers['x-csrf-token']) ||
                    (req.headers['x-xsrf-token']);
            }
        }
    });
    /* Mix CSRF in locals for client */
    var doLocalsCSRF = function (req, res, next) {
        res.locals.csrf = req.csrfToken();
        next();
    };
    /* Handle CSRF errors specifically */
    var doErrorCSRF = function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN')
            return next(err);
        res.status(403).json({ "error": "Session has expired or tampered with" });
    };
    IndieAuthRouter.use(doParseBody, 
    /* Std. security related headers */
    helmet(), doSession, doCSRF, doLocalsCSRF, doErrorCSRF, doInitialLanguage);
    var autoauth = function (req) {
        console.log(req);
    };
    /* ROUTES : */
    // Language Handling
    IndieAuthRouter.get('/language/:locale', switchLanguage);
    // GET routes
    ['', 'home', 'setup', 'developers', 'faq', 'history', 'auth', 'test'].map(function (s) {
        IndieAuthRouter.get('/' + s, localizedRoute(s));
    });
    // POST access routes (e. g. Mail and GPG auth)
    IndieAuthRouter.post('/auth', localizedRoute('auth'));
    // TEST FOR https://indieweb.org/2018/Nuremberg/autoauth
    IndieAuthRouter.get('/autoauth', autoauth);
    /* TEST FOR BasicAuth */
    /*
    function unauthorized(res: any, realm: string) {
      var realm = realm || 'Authorization Required';
      res.set('WWW-Authenticate', 'Basic realm=' + realm);
    
      return res.sendStatus(401);
    };
    
    function isPromiseLike(obj: any) {
      return obj && typeof obj.then === 'function';
    }
    
    function decodeBase64 (str: string) {
      return new Buffer(str, 'base64').toString('utf8')
    }
    
    var CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
    var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
    IndieAuthRouter.get('/basic', (req: any, res: any, next: any) => {
      var match = CREDENTIALS_REGEXP.exec(req.headers.authorization);
      if (!match || match.length < 2) { return unauthorized(res, realm); }
      var u = USER_PASS_REGEXP.exec(decodeBase64(match[1]));
      //userPass[1], userPass[2]
      var realm = '';
      if (!u) {
        console.log('e1');
        return unauthorized(res, realm);
      }
      var user = {name:'sebi', pass:'sebi'};
      console.log('1',u);
      var authorized = !(!user || user.name !== u[1] || user.pass !== u[2]);
      if (!authorized) { return unauthorized(res, realm); }
      return res.status(200).json({status: 200, ok: 'OK'});
    });
    */
    /* */
    exports.default = IndieAuthRouter;
});
//# sourceMappingURL=router.js.map