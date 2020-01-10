(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "../../../dojo/core/util", "uri-templates", "../../JSON/webtoken", "../../log", "../../String/startEnd", "./widgets/microformats/util", "./nls/CLI"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var has_1 = require("@dojo/framework/has/has");
    var lang = require("../../../dojo/core/util");
    var uriTemplates = require("uri-templates");
    var webtoken_1 = require("../../JSON/webtoken");
    var log_1 = require("../../log");
    var startEnd_1 = require("../../String/startEnd");
    var util_1 = require("./widgets/microformats/util");
    var CLI_1 = require("./nls/CLI");
    //import providers from './providers';
    var providers = {
        authorization_endpoint: 1,
        askubuntu: 1,
        flickr: 1,
        github: 1,
        /* google: google, */
        instagram: 1,
        mail: 1,
        pgpkey: 1,
        /* sms: sms, */
        stackexchange: 1,
        stackoverflow: 1,
        superuser: 1,
        twitter: 1,
        youtube: 1
    };
    /**
     * ...
     * ...
     */
    /*
    TODO FIXME
    "always exit" option
    if user enter password wrong >n times
    */
    var _N = has_1.default('host-node');
    var fs = (_N) ? require('fs') : {};
    var path = (_N) ? require('path') : {};
    //TODO const _auth: any = (_N) ? require('../authProviders/main') : {};
    var messages = CLI_1.default.messages;
    exports.OS = (_N) ? process.platform : navigator.platform;
    exports.userDir = (_N) ? process.env[(exports.OS === 'win32') ? 'USERPROFILE' : 'HOME'] : '~';
    function _providerWarnings(_providers) {
        var status = { notFound: [], invalid: [], hasWarning: false };
        var key;
        for (key in _providers) {
            if (key === 'authorization_endpoint') {
                continue;
            }
            if (!(_providers[key].valid)) {
                var err = _providers[key].errors || [{}];
                var sKey = (err[0].code === 400) ? 'notFound' : 'invalid';
                status[sKey].push(key);
            }
        }
        status.hasWarning = (!!(status.notFound.length) || !!(status.invalid.length));
        if (status.hasWarning) {
            console.log(' ');
            console.log(messages.warning);
        }
        if (!!(status.notFound.length)) {
            doLog({ error: (messages.vNotFoundCred + ' : "' + status.notFound.join('", "') + '" !') });
        }
        if (!!(status.invalid.length)) {
            doLog({ error: (messages.vInvalidCred + ' : "' + status.invalid.join('", "') + '" !') });
        }
        if (status.hasWarning) {
            console.log('  ' + messages.vHintCred);
            console.log('  ');
        }
    }
    function providerLinkObj(my, url, userId, props) {
        var provider = tslib_1.__assign({ originalUrl: url, url: url, userId: userId }, (my['rel-urls'].hasOwnProperty(url) ? my['rel-urls'][url] : { text: url }), props);
        return provider;
    }
    function getProviders(pw, doWarn, exclEndpoint, inclSetup) {
        if (pw === void 0) { pw = ''; }
        if (doWarn === void 0) { doWarn = true; }
        if (exclEndpoint === void 0) { exclEndpoint = false; }
        if (inclSetup === void 0) { inclSetup = false; }
        var _providers = {};
        var _hasPW = (pw !== '' && !!checkPW(pw));
        var key;
        for (key in providers) {
            if (!!(exclEndpoint) && key === 'authorization_endpoint') {
                continue;
            }
            var PROVIDER = providers[key].provider;
            var FAILED = lang.mixin({}, PROVIDER, {
                valid: false,
                errors: [{ message: messages.vNoCred, code: 400 }],
                client: null
            });
            if (!_hasPW) {
                /* no need for credentials, only config description */
                _providers[key] = tslib_1.__assign({ valid: true }, PROVIDER);
            }
            else if (!!(_N)) {
                var _token = (key === 'pgpkey') ? {} : readToken(pw, key, this.subDir);
                var _options = { debug: this.debug };
                if (!(_token.callbackUrl) && !!(this._url)) {
                    _options.callbackUrl = this._url;
                }
                if (!!(_token) && (key === 'pgpkey' || _token.statusCode === 200)) {
                    /* node.js: got credentials, return client TODO */
                    //_providers[key] = _auth.providerClient(lang.mixin({}, PROVIDER, _token, _options));
                }
                else {
                    /* got no credentials, error if not 'authorization_endpoint' or 'pgpkey' */
                    _providers[key] = (key === 'authorization_endpoint') ? PROVIDER : FAILED;
                }
            }
            else {
                /* pw but not node, error */
                _providers[key] = FAILED;
            }
            if (!!_providers[key].setup && !inclSetup) {
                delete _providers[key].setup;
            }
        }
        (!!((_N)) && !!(doWarn) && _providerWarnings(_providers)); /* TODO make independent as in CLI */
        return Object.freeze(_providers);
    }
    exports.getProviders = getProviders;
    function providerLinks(my, providers) {
        return function (url) {
            var i, key, o;
            var props = { key: false, url: url };
            var uId = '';
            providerLoop: for (key in providers) {
                var _provider = providers[key];
                if (!(_provider.me) || !(_provider.me.templates)) {
                    continue;
                }
                for (i = 0; i < _provider.me.templates.length; i++) {
                    uId = '';
                    o = uriTemplates(_provider.me.templates[i]).fromUri(decodeURIComponent(url));
                    if (!!o && typeof o.userId === 'string' && o.userId.length) {
                        uId = o.userId;
                    }
                    else if (!!o && Array.isArray(o.userId) && o.userId.length === 1) {
                        uId = o.userId[0];
                    }
                    if (uId !== '') {
                        props = { key: key, valid: _provider.valid, me: _provider.me, display: uId };
                        props.url = uriTemplates(props.me.target).fillFromObject(tslib_1.__assign({}, o, { userId: uId }));
                        break providerLoop;
                    }
                    else {
                        props.display = util_1.displayUrl(props.url);
                    }
                }
            }
            return providerLinkObj(my, url, uId, props);
        };
    }
    exports.providerLinks = providerLinks;
    function endpointLinks(my, endpoints) {
        if (endpoints === void 0) { endpoints = []; }
        ['authorization_endpoint', 'pgpkey'].forEach(function (key) {
            if (my.rels.hasOwnProperty(key) && !!(my['rel-urls'])) {
                endpoints = my.rels[key].map(function (url) {
                    var _o = { key: key, valid: true, display: util_1.displayUrl(url), url: url };
                    return providerLinkObj(my, url, url, _o);
                });
            }
        });
        return endpoints;
    }
    exports.endpointLinks = endpointLinks;
    // sort providers
    function validFirst(a, b) {
        var isP = [(!!(a.valid) && !!(a.key)), (!!(b.valid) && !!(b.key))];
        if (!!isP[0] && !isP[1]) {
            return -1;
        }
        if (!!isP[1] && !isP[0]) {
            return 1;
        }
        return 0;
    }
    exports.validFirst = validFirst;
    function getTokenChoices(subDir) {
        if (subDir === void 0) { subDir = '.IndieAuth'; }
        if (!(_N)) {
            throw new Error('requires node.js');
        }
        var dir = path.resolve(exports.userDir, subDir);
        return fs.readdirSync(dir)
            .filter(function (file) {
            try {
                var stats = fs.lstatSync(path.join(dir, file));
                if (stats.isSymbolicLink()) {
                    return false;
                }
                var isDir = stats.isDirectory();
                var isDotFile = (path.basename(file).indexOf('.') === 0);
                var hasJWT = (file !== 'IndieAuth.jwt' && path.extname(file) === '.jwt');
                return (!(isDir) && !(isDotFile) && hasJWT);
            }
            catch (error) {
                return false;
            }
        })
            .map(function (file) { return ({ name: file, value: path.basename(file, '.jwt') }); })
            .sort();
    }
    exports.getTokenChoices = getTokenChoices;
    function readToken(pw, fileBaseName, subDir) {
        if (fileBaseName === void 0) { fileBaseName = 'IndieAuth'; }
        if (subDir === void 0) { subDir = '.IndieAuth'; }
        if (!(_N)) {
            throw new Error('requires node.js');
        }
        var dir = path.resolve(exports.userDir, subDir);
        var fileName = [fileBaseName, 'jwt'].join('.');
        try {
            var jwTokenR = fs.readFileSync(path.resolve(dir, fileName), 'utf8');
            return (webtoken_1.default.decode(jwTokenR, pw) || {});
        }
        catch (e) {
            if (fileBaseName === 'IndieAuth') {
                /* TODO FIXME password recovery ? */
                /* NO password token, delete folder ??? - unexpected error */
            }
            return {};
        }
    }
    exports.readToken = readToken;
    function writeToken(o, pw, subDir) {
        if (subDir === void 0) { subDir = '.IndieAuth'; }
        if (!(_N)) {
            throw new Error('requires node.js');
        }
        var dir = path.resolve(exports.userDir, subDir);
        var tokenRes = (!!(o.providerID) ? { provider: o.providerID } : o);
        var fileName = [(!!(o.providerID) ? o.providerID : 'IndieAuth'), 'jwt'].join('.');
        var stats = {};
        if (fileName !== 'IndieAuth.jwt') {
            try {
                stats = fs.lstatSync(path.join(dir, fileName));
            }
            catch (e) { }
            var key;
            for (key in o) {
                if (startEnd_1.start(key, 'provider_')) {
                    tokenRes[key.replace('provider_', '')] = o[key];
                }
            }
            /* TODO - error handling */
        }
        var cDate = (!!(stats.birthtime)) ? stats.birthtime : (new Date());
        var uDate = (!!(stats.birthtime)) ? (new Date()) : null;
        var content = tslib_1.__assign({ statusCode: 200, iat: cDate, uat: uDate }, tokenRes);
        var jwTokenW = webtoken_1.default.encode(content, pw, 'sha256');
        try {
            fs.writeFileSync(path.resolve(dir, fileName), jwTokenW, 'utf8');
        }
        catch (e) {
            return false;
        }
        return jwTokenW;
    }
    exports.writeToken = writeToken;
    function checkPW(pw) {
        if (!(_N)) {
            throw new Error('requires node.js');
        }
        var jwToken = (typeof pw === 'string') ? readToken(pw) : void 0;
        if (typeof jwToken !== 'object' || !(jwToken.salt) || jwToken.statusCode !== 200) {
            return void 0;
        }
        return jwToken;
    }
    exports.checkPW = checkPW;
    function doLog(logArr, doPadding, inclFn) {
        if (doPadding === void 0) { doPadding = false; }
        if (inclFn === void 0) { inclFn = false; }
        if (!Array.isArray(logArr)) {
            logArr = [logArr];
        }
        log_1.log(logArr, doPadding, inclFn);
    }
    exports.doLog = doLog;
    function logToken(token, title) {
        if (title === void 0) { title = ''; }
        // log a shallow copy with readable dates etc.
        var o = lang.mixin({}, token);
        var dateOptions = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
        };
        Object.keys(o).forEach(function (key) {
            if ((key === 'iat' || key === 'uat') && !!(token[key])) {
                o[key] = new Date(o[key]).toLocaleDateString(['en', 'de'], dateOptions);
            }
            if (key.indexOf('secret') > -1) {
                o[key] = log_1.pwLog(o[key], 2);
            }
        });
        doLog([
            { success: ['JWT credentials for ' + ((title === '') ? token.provider : title) + ' :'] },
            { list: o }
        ], true);
    }
    exports.logToken = logToken;
});
//# sourceMappingURL=helper.js.map