(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/has", "../../../../dojo/core/main", "@dojo/framework/i18n/main", "../../../util/unique", "../helper", "inquirer", "fs", "path", "net", "chalk", "../nls/CLI"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * ...
     */
    /*
    TODO FIXME
    "always exit" option
    if user enter password wrong >n times
    */
    /* TODO FIXME i18n : */
    var has_1 = require("@dojo/framework/has/has");
    var main_1 = require("../../../../dojo/core/main");
    var main_2 = require("@dojo/framework/i18n/main");
    var unique_1 = require("../../../util/unique");
    var helper_1 = require("../helper");
    var inquirer = require("inquirer");
    var fs = require("fs");
    var path = require("path");
    var net = require("net");
    var chalk_1 = require("chalk");
    var CLI_1 = require("../nls/CLI");
    //import * as directoryPrompt from './directoryPrompt';
    var Socket = net.Socket;
    var opn = require('opn');
    var zxcvbn = require('zxcvbn');
    var _bullet = (helper_1.OS === 'win32') ? '*' : '●';
    var pwBar1 = chalk_1.default.green('█') + chalk_1.default.red('███');
    var pwBar2 = chalk_1.default.green('██') + chalk_1.default.red('██');
    //inquirer.registerPrompt('directory', (<any>directoryPrompt));
    var CLI = /** @class */ (function () {
        function CLI(kwArgs, directory, providers, providersOK, providersLeft, providerKeys, readonlyKeys, user, helpPW, messages) {
            if (directory === void 0) { directory = ''; }
            if (providers === void 0) { providers = {}; }
            if (providersOK === void 0) { providersOK = []; }
            if (providersLeft === void 0) { providersLeft = []; }
            if (providerKeys === void 0) { providerKeys = []; }
            if (readonlyKeys === void 0) { readonlyKeys = [
                'provider', 'statusCode', 'iat', 'uat'
            ]; }
            if (user === void 0) { user = ''; }
            if (helpPW === void 0) { helpPW = false; }
            if (messages === void 0) { messages = {}; }
            var _this = this;
            this.kwArgs = kwArgs;
            this.directory = directory;
            this.providers = providers;
            this.providersOK = providersOK;
            this.providersLeft = providersLeft;
            this.providerKeys = providerKeys;
            this.readonlyKeys = readonlyKeys;
            this.user = user;
            this.helpPW = helpPW;
            this.messages = messages;
            this.quitting = false;
            /* TODO - many things of this CLI inquirer questions could come from JSON schemas */
            /* CLI FLOW - " questions " : */
            this.q = function (pw, providerID) {
                if (pw === void 0) { pw = ''; }
                var qKey = {
                    type: 'input',
                    name: 'provider_key',
                    message: function (o) {
                        var iksu = _this.iksu(o.providerID);
                        if (o.helpAction === 'open') {
                            opn(iksu[3]);
                        }
                        return _this.msg('qWhat') + iksu[1] + ' ?';
                    },
                    validate: function (value) {
                        return (value.length < 3) ?
                            _this.msg('vLength', { key: 'key', length: 3 }) : true;
                    }
                };
                var qSecret = {
                    type: 'password',
                    name: 'provider_secret',
                    message: function (o) {
                        var iksu = _this.iksu(o.providerID);
                        return _this.msg('qWhat') + iksu[2] + ' ?';
                    },
                    validate: function (value, o) {
                        return (!(o.providerID) && value.length < 3) ?
                            _this.msg('vLength', { key: 'secret', length: 3 }) : true;
                    }
                };
                return {
                    actions: [{
                            type: 'list',
                            name: 'action',
                            message: _this.msg('qAction'),
                            choices: [
                                { name: _this.msg('qaCreate'), value: 'create', short: _this.msg('qsCreate') },
                                { name: _this.msg('qaEdit'), value: 'edit', short: _this.msg('qsEdit') },
                                { name: _this.msg('qaQuit'), value: 'quit', short: _this.msg('qaQuit') }
                            ]
                        }],
                    password: [{
                            type: 'password',
                            name: 'pw',
                            message: _this.msg('qPw'),
                            filter: zxcvbn,
                            validate: function (pw) {
                                var o = helper_1.checkPW(pw.password);
                                return (!o || typeof o !== 'object' || !(o.salt)) ? _this.msg('vWrongPw') : true;
                            }
                        }],
                    passwordSet: [
                        {
                            type: 'password',
                            name: 'pw',
                            message: _this.msg('qPw'),
                            filter: zxcvbn,
                            validate: function (strength) {
                                if (strength.score < 2) {
                                    return pwBar1 + chalk_1.default.red(' ' + _this.msg('vPW1') + ' (' + _this.msg('vSc') + ' 1/4):\n') +
                                        strength.feedback.warning + '\n' + _bullet + ' ' +
                                        strength.feedback.suggestions.join('\n' + _bullet + ' ');
                                }
                                else if (strength.score < 3) {
                                    return pwBar2 + chalk_1.default.yellow(' ' + _this.msg('vPW2') + ' (' + _this.msg('vSc') + ' 2/4):\n') +
                                        strength.feedback.warning + '\n' + _bullet + ' ' +
                                        strength.feedback.suggestions.join('\n' + _bullet + ' ');
                                }
                                return true;
                            }
                        },
                        {
                            type: 'password',
                            name: 'pwConfirmed',
                            message: _this.msg('qPwConfirmed'),
                            filter: zxcvbn
                        }
                    ],
                    create: [
                        {
                            type: 'list',
                            name: 'providerID',
                            message: _this.msg('qProviderID'),
                            choices: function () {
                                return _this.providersLeft.map(function (_p) { return ({
                                    name: _p, value: _p, short: _p
                                }); }).concat([{ name: _this.msg('qaNewP'), value: 'unknown', short: _this.msg('_new') }]);
                            }
                        },
                        {
                            type: 'input',
                            name: 'providerID',
                            message: _this.msg('qProviderIDtba') + '\n' + chalk_1.default.dim('> 3 ' + _this.msg('chars')),
                            validate: function (value) {
                                if (value.length < 3) {
                                    return _this.msg('vLength', { key: 'name', length: 3 });
                                }
                                else if (_this.providersOK.indexOf(value) > -1) {
                                    return _this.msg('vExistsP');
                                }
                                else if (_this.providersLeft.indexOf(value) > -1) {
                                    return _this.msg('vPrimaryP');
                                }
                                else {
                                    return true;
                                }
                            },
                            when: function (o) { return (o.providerID === 'unknown'); }
                        },
                        {
                            type: 'list',
                            name: 'doHelp',
                            message: function (o) {
                                var key = o.providerID;
                                var msg = chalk_1.default.dim(_this.providers[key].description) + '\n';
                                msg += chalk_1.default.reset('  ') +
                                    chalk_1.default.bold(_this.msg('qCanHelp') + ' ' + _this.providers[key].title + ' ?');
                                return msg;
                            },
                            choices: [_this.msg('qcHelp'), _this.msg('qcNoHelp')],
                            when: function (o) { return (o.providerID !== 'unknown'); },
                            filter: function (value) { return (value === _this.msg('qcHelp')); }
                        },
                        {
                            type: 'list',
                            name: 'helpAction',
                            message: function (o) {
                                var iksu = _this.iksu(o.providerID);
                                return (chalk_1.default.reset(iksu[0] || ' ') + '\n' +
                                    chalk_1.default.green([_this.msg('need'), iksu[1], _this.msg('_and'), iksu[2] + '.'].join(' ')) +
                                    '\n' + chalk_1.default.dim(_this.msg('qcHelpGet') + ' ' + iksu[3]));
                            },
                            choices: [
                                {
                                    name: _this.msg('qcOpenPage'),
                                    value: 'open',
                                    short: _this.msg('qsOpenPage')
                                },
                                {
                                    name: _this.msg('qcGoOn'),
                                    value: 'go',
                                    short: '...'
                                }
                            ],
                            when: function (o) { return (o.doHelp === true && o.providerID !== 'unknown'); }
                        },
                        qKey,
                        qSecret,
                        /* <--- */
                        /* additionalProperties from any provider goes HERE ... */
                        /* <--- */
                        {
                            type: 'input',
                            name: 'provider_note',
                            message: _this.msg('qNote'),
                            default: _this.msg('qNoNote'),
                            filter: function (value) { return ((value === _this.msg('qNoNote')) ? '' : value.trim()); }
                        }
                    ],
                    /* Change provider ... */
                    edit: [
                        {
                            type: 'list',
                            name: 'providerID',
                            message: _this.msg('qeProviderID'),
                            choices: helper_1.getTokenChoices.bind(_this)
                        },
                        {
                            type: 'list',
                            name: 'providerEdit',
                            message: function (o) {
                                helper_1.logToken(helper_1.readToken(pw, o.providerID));
                                return _this.msg('qProviderEdit');
                            },
                            choices: [
                                { name: _this.msg('qeKS'), value: 'editShort', short: _this.msg('qsKS') },
                                { name: _this.msg('qeAll'), value: 'editFull', short: _this.msg('qsAll') },
                                { name: _this.msg('qeAdd'), value: 'editAdd', short: _this.msg('qsAdd') },
                                { name: _this.msg('qeNo'), value: 'start', short: 'OK!' },
                            ]
                        },
                        main_1.lang.mixin({
                            when: function (o) { return (o.providerEdit === 'editShort'); },
                            default: function (o) { return ((helper_1.readToken(pw, o.providerID).key) || ''); }
                        }, qKey),
                        main_1.lang.mixin({
                            when: function (o) { return (o.providerEdit === 'editShort'); },
                            default: function (o) { return ((helper_1.readToken(pw, o.providerID).secret) || ''); }
                        }, qSecret)
                    ],
                    editAdd: [
                        {
                            type: 'input',
                            name: 'providerAddKey',
                            message: function (o) {
                                var msg = chalk_1.default.red('Read Only: "' + _this.readonlyKeys.join('", "') + '".');
                                return (msg + '\n' + _this.msg('qProviderAddKey'));
                            },
                            validate: function (value) {
                                return (value === '' || _this.readonlyKeys.indexOf(value) > -1) ?
                                    _this.msg('vAddKey') : true;
                            }
                        },
                        {
                            type: 'input',
                            name: 'providerAddValue',
                            message: function (o) { return (_this.msg('qProviderAddValue') + o.providerAddKey + ' ?'); }
                        },
                        {
                            type: 'list',
                            name: 'providerAddAnother',
                            message: _this.msg('qProviderAddAnother'),
                            choices: [_this.msg('yes'), _this.msg('no')]
                        }
                    ]
                };
            };
            if (!has_1.default('host-node')) {
                throw new Error('requires node.js');
            }
            /*
            if (!!this.helpPW) { this.helpWithPW(); return; }
            if (typeof kwArgs === 'object' && !!(kwArgs) && !(kwArgs instanceof Array)) {
              lang.mixin(this, kwArgs);
            }*/
            main_2.default(CLI_1.default, main_2.default.locale).then(this._init.bind(this));
        }
        CLI.prototype.msg = function (_id, el, fallback) {
            if (_id === void 0) { _id = 'unknown'; }
            if (fallback === void 0) { fallback = ''; }
            var m = (!!(this.messages) && this.messages[_id]);
            if (!m) {
                m = _id;
            }
            if (!!el && typeof el === 'object') {
                var rawData_1 = !!(el.dataset) ? el.dataset : el;
                (m.match(/[_]\{([^}]+)\}/gi) || []).map(function (tplStr) {
                    var pointer = tplStr.slice(2, -1);
                    var data = rawData_1[pointer];
                    if (typeof data !== 'string' && tplStr.slice(2, 3) === '/') {
                        data = m;
                    }
                    m = m.replace(tplStr, (typeof data === 'string') ? data : fallback);
                });
            }
            return m;
        };
        /* TODO - SHOULD go to util/net - used for SMTP check for "providers.mail" */
        CLI.prototype.scanPort = function (port, host) {
            if (typeof port === 'string') {
                port = parseInt(port);
            }
            var socket = new Socket();
            var status = 'closed';
            return new Promise(function (resolve, reject) {
                socket.on('connect', function () { status = 'open'; socket.destroy(); });
                socket.setTimeout(500);
                socket.on('timeout', function () { status = 'closed'; socket.destroy(); });
                socket.on('error', function () { status = 'closed'; });
                socket.on('close', function () { resolve(status); });
                socket.connect(port, host);
            });
        };
        /* shorthand function for setup ... */
        CLI.prototype.iksu = function (key) {
            return [
                (this.providers[key].setup.instructions || ' '),
                (this.providers[key].setup.key || 'key'),
                (this.providers[key].setup.secret || 'secret'),
                (this.providers[key].setup.url || 'https://indieauth.com')
            ];
        };
        CLI.prototype._init = function (messages) {
            this.messages = messages;
            var subDir = (this.directory === '') ? '.IndieAuth' : this.directory;
            this.directory = path.resolve(helper_1.userDir || './', subDir);
            this.user = path.basename(helper_1.userDir || './');
            console.log(chalk_1.default.reset(' '));
            console.log(chalk_1.default.red(' ╔════╗ ') + chalk_1.default.green('   __   '));
            console.log(chalk_1.default.red(' ╚════╝ ') + chalk_1.default.green('  /__\\ '));
            console.log(chalk_1.default.red(' ╔════╗ ') + chalk_1.default.green(' / || \\'));
            console.log(chalk_1.default.red(' ║    ║ ') + chalk_1.default.green('(__||__)'));
            console.log(chalk_1.default.red(' ║    ║ '));
            console.log(chalk_1.default.red(' ╚════╝ ') + 'Hi ' + this.user + ', ' + this.msg('welcome'));
            helper_1.doLog({ success: '      IndieAuth Command Line Utility !' });
            this.providers = helper_1.getProviders('', true, true, true);
            this.updateProviders();
            this.prerequisites();
        };
        CLI.prototype.updateProviders = function (pw) {
            var _this = this;
            this.providerKeys = Object.keys(this.providers);
            this.providersLeft = [];
            this.providersOK = [];
            var q = this.q(pw);
            this.providerKeys.forEach(function (key) {
                var a = (!!_this.providers[key].setup && _this.providers[key].setup.additionalProperties);
                if (!!pw && !!a) {
                    var secretIndex = (q.create.map(function (action) {
                        return action.name;
                    }).indexOf('provider_secret') || (q.create.length - 1));
                    q.create.splice.apply(q.create, [secretIndex + 1, 0].concat(a));
                }
                if (!fs.existsSync(path.resolve(_this.directory, key + '.jwt'))) {
                    _this.providersLeft.push(key);
                }
                else {
                    _this.providersOK.push(key);
                }
            });
            if (!!pw) {
                q.create = q.create.map(function (action) {
                    var key;
                    for (key in action) {
                        if (typeof action[key] === 'function') {
                            action[key] = action[key].bind(_this);
                        }
                    }
                    return action;
                });
                return q;
            }
        };
        /**/
        CLI.prototype.prerequisites = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!fs.existsSync(path.join(_this.directory, '/IndieAuth.jwt'))) {
                    try {
                        helper_1.doLog({ warning: _this.msg('cInstalled') + ' :' });
                        if (!fs.existsSync(_this.directory)) {
                            fs.mkdirSync(_this.directory);
                        }
                        helper_1.doLog({
                            success: _this.msg('cCredDir') + '\n' + _this.directory
                        });
                        helper_1.doLog({
                            neutral: _this.msg('cPWnote1') + '\n' + _this.msg('cPWnote2') +
                                '\n> ' + chalk_1.default.green(_this.msg('cPWnote3'))
                        });
                        _this.setPassword();
                    }
                    catch (e) {
                        _this.directory = '';
                        reject(false);
                    }
                }
                else {
                    if (!!(process.env.PW) && helper_1.checkPW(process.env.PW || '')) {
                        _this.start({ pw: zxcvbn(process.env.PW) });
                    }
                    else {
                        // check password
                        inquirer.prompt(_this.q().password).then(_this.start.bind(_this));
                    }
                }
            });
        };
        CLI.prototype.setPassword = function (saltMinLength, saltMaxLength) {
            var _this = this;
            if (saltMinLength === void 0) { saltMinLength = 100; }
            if (saltMaxLength === void 0) { saltMaxLength = 260; }
            return inquirer.prompt(this.q().passwordSet).then(function (o) {
                if (!!_this.quitting) {
                    return;
                }
                if (o.pwConfirmed.password !== o.pw.password) {
                    helper_1.doLog({ error: _this.msg('cPWerr') });
                    _this.setPassword(saltMinLength, saltMaxLength);
                }
                else {
                    /* e.g. used for session secret ... */
                    var kid = unique_1.uuid();
                    var salt = unique_1.nonce(saltMinLength, saltMaxLength);
                    if (typeof kid !== 'string' || typeof salt !== 'string' ||
                        salt.length < saltMinLength || salt.length > saltMaxLength) {
                        helper_1.doLog({ error: _this.msg('cWriteErr') }); /* TODO better error for nonce err. */
                        helper_1.doLog({ error: _this.msg('cPWerr') });
                        _this.setPassword(100, 260);
                    }
                    helper_1.writeToken({ salt: salt, kid: kid }, o.pw.password);
                    if (!helper_1.checkPW(o.pw.password)) {
                        // should not happen: we can't write in our created directory ...
                        helper_1.doLog({ error: _this.msg('cWriteErr') });
                        helper_1.doLog({ neutral: _this.msg('cWriteHint', { directory: _this.directory, user: _this.user }) });
                        return _this.setPassword(saltMinLength, saltMaxLength);
                    }
                    _this.start(o, true);
                }
            });
        };
        CLI.prototype.helpWithPW = function () {
            var _this = this;
            helper_1.doLog({ error: this.msg('cNoPWerr') });
            helper_1.doLog({ error: this.msg('cNoPWerr2') });
            var __q = [{
                    type: 'list',
                    name: 'startCLI',
                    message: this.msg('cCLI'),
                    choices: [
                        { name: this.msg('yes'), value: 'yes', short: 'CLI' },
                        { name: this.msg('noAgain'), value: 'no', short: this.msg('qaQuit') }
                    ]
                }];
            return inquirer.prompt(__q).then(function (hO) {
                if (hO.startCLI === 'yes') {
                    return Promise.resolve(new CLI({ directory: _this.directory }));
                }
                else {
                    return Promise.reject(false);
                }
            });
        };
        CLI.prototype.editFull = function (o, id, pw) {
            var _this = this;
            var _token = helper_1.readToken(pw, id);
            var qEditFull = Object.keys(_token)
                .filter(function (key) { return (_this.readonlyKeys.indexOf(key) < 0); })
                .map(function (key) { return ({
                type: 'input',
                name: ('provider_' + key),
                message: _this.msg('qProviderNewValue') + ' "' + key + '" ?',
                default: _token[key]
            }); });
            return inquirer.prompt(qEditFull).then(function (eO) {
                eO.providerID = id;
                helper_1.writeToken(eO, pw);
                _this.start(o, false, true);
            });
        };
        CLI.prototype.editAdd = function (o, id, pw, _o) {
            var _this = this;
            var _token = (_o || { providerID: id });
            if (!_o) {
                _o = helper_1.readToken(pw, id);
                var key;
                for (key in _o) {
                    if (this.readonlyKeys.indexOf(key) === -1) {
                        _token['provider_' + key] = _o[key];
                    }
                }
            }
            var qEditAdd = this.q(pw, id).editAdd;
            return inquirer.prompt(qEditAdd).then(function (eO) {
                if (eO.providerAddAnother === _this.msg('yes')) {
                    _token['provider_' + eO.providerAddKey] = eO.providerAddValue;
                    _this.editAdd(o, id, pw, _token);
                }
                else {
                    _token['provider_' + eO.providerAddKey] = eO.providerAddValue;
                    helper_1.writeToken(_token, pw);
                    _this.start(o, false, true);
                }
            });
        };
        CLI.prototype.start = function (o, isNew, isRepeat) {
            var _this = this;
            if (isNew === void 0) { isNew = false; }
            if (isRepeat === void 0) { isRepeat = false; }
            if (!o.pw.password) {
                return false;
            }
            var pwBar = chalk_1.default.green('███') + chalk_1.default[(o.pw.score === 4) ? 'green' : 'red']('█');
            var pwStatus = [pwBar, this.msg('vPW'), this.msg('vSc'), (o.pw.score + '/4')].join(' ');
            if (isNew) {
                helper_1.doLog({ success: pwStatus });
                helper_1.doLog({ success: this.msg('cWorks') });
            }
            else {
                helper_1.doLog({ success: (isRepeat) ? 'OK!' : pwStatus });
            }
            var q = this.updateProviders(o.pw.password);
            //const q = this.q(o.pw.password);
            if (this.providersOK.length > 0) {
                helper_1.doLog({ success: this.msg('cFoundCred') + ': \n' + this.providersOK.join(', ') });
            }
            helper_1.doLog((this.providersLeft.length > 0) ?
                { error: this.msg('cFoundNot') + ': \n' + this.providersLeft.join(', ') } :
                { success: this.msg('cFoundAll') });
            var rootPrompt = inquirer.prompt(q.actions);
            return rootPrompt.then(function (aO) {
                if (aO.action !== 'quit') {
                    return inquirer.prompt(q[aO.action]).then(function (rO) {
                        if (!!(rO.providerEdit) && rO.providerEdit !== 'editShort') {
                            return _this[rO.providerEdit](o, rO.providerID, o.pw.password);
                        }
                        else {
                            helper_1.writeToken(rO, o.pw.password);
                            return _this.start(o, false, true);
                        }
                    });
                }
                _this.quitting = true;
                helper_1.doLog({
                    out: [
                        _this.msg('thanks'), _this.msg('_and'),
                        ((_this.providersLeft.length > 1) ? _this.msg('comeback') : _this.msg('bye'))
                    ].join(' ')
                });
                console.log(chalk_1.default.reset(' '));
                if (!!(o.pw)) {
                    delete o.pw;
                }
                if (!!(o.pwConfirmed)) {
                    delete o.pwConfirmed;
                }
                process.exit(1);
            });
        };
        return CLI;
    }());
    exports.CLI = CLI;
});
//# sourceMappingURL=main.js.map