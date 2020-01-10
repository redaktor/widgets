(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../Request", "../../../dojo/core/util", "../../url", "./config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Request_1 = require("../../Request");
    var util_1 = require("../../../dojo/core/util");
    var url_1 = require("../../url");
    var config_1 = require("./config");
    var IndieAuthClient = /** @class */ (function (_super) {
        tslib_1.__extends(IndieAuthClient, _super);
        function IndieAuthClient(_url, _params, verifyTimeout, el, colors, sentProgress, messages) {
            if (_url === void 0) { _url = ''; }
            if (_params === void 0) { _params = {}; }
            if (verifyTimeout === void 0) { verifyTimeout = config_1.verifyTimeout + 400; }
            if (el === void 0) { el = {}; }
            if (sentProgress === void 0) { sentProgress = {}; }
            if (messages === void 0) { messages = {}; }
            var _this = _super.call(this) || this;
            _this._url = _url;
            _this._params = _params;
            _this.verifyTimeout = verifyTimeout;
            _this.el = el;
            _this.colors = colors;
            _this.sentProgress = sentProgress;
            _this.messages = messages;
            _this.debug = false;
            _this._protocol = 'IndieAuth';
            _this._version = '1.0.0';
            _this._type = 'client';
            _this._options = {
                followRedirects: true,
                method: 'GET',
                headers: {},
                responseType: 'json',
                query: {},
                timeout: 8000 /* NOTE : STUB, set this in config.ts ! */
                //,cacheBust: true
            };
            _this.s = {
                grid: '.indieauth.grid',
                pGrid: '.authProgress.grid',
                divider: '.ui.statusdivider',
                p: '.ui.progress',
                links: 'output.indieauth.link[data-order]',
                linkInfo: 'output.indieauth.link .meta.blue.text',
                providers: 'output.indieauth.provider[data-order]',
                ref: 'output[data-ref]',
                done: 'output[data-done]',
                success: ('output.indieauth.provider[data-order="1"], ' +
                    'output.indieauth.provider[data-order="2"], ' +
                    'output.indieauth.provider[data-order="3"]'),
                rescan: '.rescan.button'
            };
            _this._each = Array.prototype.slice;
            _this.isObject(_url) && util_1.mixin(_this, _url);
            _this._url = _this._normalizeUrl(window.location.href, false);
            _this._params = url_1.default.parameters(window.location.href);
            _this._options.timeout = _this.verifyTimeout;
            /* ui order: 1 authorization_endpoint, 2 success, 3 warning (sets "me" link),
            // 4 error, 5 not supported */
            _this.colors = ['', 'green', 'green', 'orange', 'red', 'blue'];
            _this.el = {
                /* TODO - make provider grid and progress grid selectors variables */
                grid: document.querySelector(_this.s.grid),
                pGrid: document.querySelector(_this.s.pGrid),
                divider: document.querySelector(_this.s.divider),
                rescan: document.querySelectorAll(_this.s.rescan)
            };
            _this.el.providers = _this.el.grid.querySelectorAll(_this.s.providers);
            if (!document.querySelector('.authStatus')) {
                _this.initProgress();
            }
            _this.initDebugLog();
            _this.init();
            _this.verify();
            return _this;
        }
        ;
        /* overwritable : */
        IndieAuthClient.prototype.init = function () { };
        /* ProgressBar is optional :
        // if Semantic UI progress.js is loaded and there is a progressbar container
        // support ProgressBar (e.g. see view auth.html) ...
        // NOTE : TODO this could become a core dojo widget
        */
        IndieAuthClient.prototype.hasProgress = function () {
            return (!!(window['jQuery']) && this.el.pGrid && !!$(this.s.p)['progress']);
        };
        /* set initial order, progressbar status and provider status text */
        IndieAuthClient.prototype.initProgress = function () {
            if (!this.hasProgress()) {
                return;
            }
            var ps = document.querySelector(this.s.pGrid).querySelectorAll(this.s.ref);
            this._each.call(ps).map(function (el) {
                el.dataset.order = (el.dataset.ref === 'link') ? 5 : 4;
            });
            $(this.s.pGrid + ' ' + this.s.p)['progress']({ percent: 10, autoSuccess: false });
            $(this.s.pGrid).after('<div class="ui grey inverted vertical masthead center aligned segment">' +
                '<div class="ui inverted horizontal bulleted list strong authStatus"></div></div>');
        };
        IndieAuthClient.prototype.reorderProgress = function () {
            var _this = this;
            var ps = '.authProgress output[data-ref]';
            this._each.call(document.querySelectorAll(ps)).map(function (el, i) {
                var order = el.dataset.order;
                if (i > 0 && order < el.previousElementSibling.dataset.order) {
                    var target = _this.el.pGrid.querySelector('[data-order="' + (order) + '"]');
                    _this.el.pGrid.insertBefore(el, target);
                }
            });
        };
        /* set progressbar changes */
        IndieAuthClient.prototype.setProgress = function (percent, sel, barColor) {
            if (sel === void 0) { sel = '.ui.progress'; }
            if (barColor === void 0) { barColor = ''; }
            if (!this.hasProgress()) {
                return;
            }
            var el = (typeof sel === 'string') ? $(sel) : sel;
            el['progress']('set percent', percent);
            if (barColor !== '') {
                barColor = ' ' + barColor;
            }
            (barColor !== '' && el.attr('class', 'ui small' + barColor + ' progress'));
            if (percent === 100) {
                el['progress']('complete');
            }
            return el;
        };
        /* set summary text under progress when finished */
        IndieAuthClient.prototype.setStatusText = function () {
            /* TODO FIXME - i18n, pluralize etc. */
            var status = ['', 'endpoint ok', 'ok', 'warning', 'error'];
            $('.authStatus').empty();
            var i;
            for (i = 1; i < 5; i++) {
                $('.authStatus').append(['<div class="item ' + this.colors[i] + ' text">',
                    $('.authProgress output[data-order="' + (i) + '"]').length, ' ', status[i],
                    '</div>'].join(''));
            }
            $('.ui.dimmer').removeClass('active inverted');
            this.setProgress(100, '.ui.progress.active', 'red');
            document.querySelector(this.s.linkInfo).classList.add('first');
            $(this.s.linkInfo + ':not(.first)').remove();
        };
        /* set error divider, text summary above providers */
        IndieAuthClient.prototype.setDividerError = function () {
            this.el.divider.classList.remove('green', 'divider');
            this.el.divider.classList.add('red', 'divider');
            var msg = document.createDocumentFragment();
            var msgEl = document.createElement('small');
            msgEl.innerText = this.msg('verifyNoProvider');
            msg.appendChild(msgEl);
            while (this.el.divider.firstChild) {
                this.el.divider.removeChild(this.el.divider.firstChild);
            }
            this.el.divider.appendChild(msg);
        };
        IndieAuthClient.prototype.iconMessage = function (msg, iconCl, colorCl, isMeta) {
            if (iconCl === void 0) { iconCl = ''; }
            if (colorCl === void 0) { colorCl = ''; }
            if (isMeta === void 0) { isMeta = true; }
            if (iconCl !== '') {
                iconCl = iconCl + ' icon';
            }
            var icon = (iconCl === '') ? '' : '<i class="' + iconCl + '></i>&nbsp;';
            var cl = (!!isMeta) ? 'meta' : '';
            var cCl = (colorCl === '') ? cl : (cl + ' ' + colorCl + ' text');
            return '<p class="' + cCl + '>' + (icon + msg) + '</p>';
        };
        /* verify response : set errors and/or order change */
        IndieAuthClient.prototype.verifyUI = function (el, error, readyCount) {
            var _this = this;
            if (error === void 0) { error = null; }
            if (readyCount === void 0) { readyCount = 0; }
            if (error) {
                console.log('ERROR', error);
            }
            if (readyCount === 0) {
                readyCount = this.el.providers.length;
            }
            var progressSel = 'output[data-ref="' + el.dataset.url + '"]';
            var meUrl = document.querySelector('.me.site.title')['dataset']['ref'];
            var order = 4;
            var _end = false;
            if (this.hasProgress()) {
                _end = setTimeout(this.setStatusText.bind(this), this.verifyTimeout);
            }
            el.dataset.done = '1';
            if (!!(el.dataset.provider)) {
                if (!!(error)) {
                    el.dataset.error = (typeof error === 'object' && (!!(error.id)) ? error.id : 'unknown');
                    if (el.dataset.error === 'verifyTmpInvalidMe') {
                        order = 3;
                    }
                }
                else {
                    order = ((el.dataset.provider === 'authorization_endpoint') ? 1 : 2);
                }
            }
            var status = (!!(el.dataset.error)) ? el.dataset.error : 'verifySuccess';
            el.dataset.order = order;
            var p = {
                icon: ((order === 1) ? 'privacy' : 'exchange'),
                color: (this.colors[order] || 'red'),
                btn: el.querySelector('.ui.button'),
                dimmer: el.querySelector('.ui.dimmer'),
                progress: this.el.pGrid.querySelector(progressSel),
                target: null,
                progressTarget: null
            };
            // provider status: color and message ...
            if (!!(p.dimmer)) {
                var _color = ((!!(order < 3)) ? 'grey' : p.color);
                var _icon = (status === 'verifyNoCred') ? 'terminal' : p.icon;
                p.dimmer.innerHTML = this.iconMessage(this.msg(status, el), _icon, _color);
                if (status === 'verifyNoMe' || status === 'verifyInvalidMe') {
                    var uEl = document.createElement('small');
                    uEl.innerHTML = '<input type="url"' +
                        ' onClick="this.setSelectionRange(0,this.value.length)" value="' + meUrl + '" /> ' +
                        this.msg('missing') +
                        ' <a href="' + el.dataset.url + '" target="_blank">' + el.dataset.title + '</a>';
                    p.dimmer.appendChild(uEl);
                }
                p.dimmer.classList.remove('active', 'inverted');
            }
            // provider button: color and state ...
            if (!!(p.btn)) {
                p.btn.classList.remove('disabled', 'green', 'red', 'orange', 'blue', 'button');
                if (order < 4) {
                    p.btn.parentNode.addEventListener('click', this.signIn(p.btn.parentNode));
                }
                else {
                    p.btn.classList.add('disabled');
                }
                p.btn.classList.add(p.color, 'button');
            }
            // set progress ...
            if (this.hasProgress()) {
                p.progress.dataset.order = el.dataset.order;
                this.setProgress(100, (progressSel + ' .ui.progress'), p.color);
                if (!!(_end) && $(this.s.done).length === readyCount) {
                    clearTimeout(_end);
                    _end = null;
                    this.setStatusText();
                }
            }
            // sort links and providers and progress after change ...
            var i;
            for (i = order + 1; i < 6; i++) {
                p.target = this.el.grid.querySelector('output[data-order="' + (i) + '"]');
                if (!!(p.target)) {
                    break;
                }
            }
            if (order === 1) {
                this.el.pGrid.insertBefore(p.progress, this.el.pGrid.firstChild);
                return this.el.grid.insertBefore(el, this.el.grid.firstChild);
            }
            if (!(p.target)) {
                this.el.pGrid.appendChild(p.progress);
                return this.el.grid.appendChild(el);
            }
            p.progressTarget = this.el.pGrid.querySelector('[data-order="' + (p.target.dataset.order) + '"]');
            this.el.pGrid.insertBefore(p.progress, p.progressTarget);
            this.el.grid.insertBefore(el, p.target);
            // evtl. set error text in divider
            if (this.el.grid.querySelectorAll(this.s.done).length === readyCount) {
                if (this.el.grid.querySelectorAll(this.s.success).length < 1) {
                    this.setDividerError();
                }
                this._each.call(this.el.rescan).map(function (r) {
                    r.addEventListener('click', _this.verifyFresh.bind(_this));
                });
            }
            return el;
            /* TODO - if there is an unsupported IndieAuth provider with a domain
            // matching "me" : EXPLAIN how to set up authorization_endpoint ...
            */
        };
        IndieAuthClient.prototype.query = function (mix) {
            return lang.mixin({
                state: this._params.get('state'),
                me: this._params.get('me'),
                client_id: this._params.get('client_id')
            }, mix);
        };
        IndieAuthClient.prototype.progressSel = function (ref) {
            return ['.authProgress.grid output[data-ref="', ref, '"] .ui.progress'].join('');
        };
        /* verify request ... */
        IndieAuthClient.prototype.verify = function (cacheBust) {
            var _this = this;
            if (cacheBust === void 0) { cacheBust = false; }
            this.setProgress(20);
            /* TODO FIXME - CACHE and
            if provider === 'sms' || 'email' || 'clef' || 'pgpkey'
                 verified = true;
            */
            // verify rel="me"
            var successLength = this.el.grid.querySelectorAll(this.s.success).length;
            console.log('verify2', successLength);
            var hasCache = false;
            this._each.call(this.el.providers).map(function (el) {
                if (!!(el.dataset.order) && parseInt(el.dataset.order, 10) < 4) {
                    // cached ...
                    if (!hasCache) {
                        hasCache = (!cacheBust);
                    }
                    var e = (el.dataset.order === '3') ? { id: 'verifyTmpInvalidMe' } : null;
                    _this.verifyUI(el, e, (!cacheBust) ? successLength : 0);
                }
                return el;
            });
            console.log('hasCache', hasCache);
            if (!!(hasCache)) {
                document.body.classList.add('cached');
                this.reorderProgress();
            }
            else {
                (!!(cacheBust) && document.body.classList.remove('cached'));
                this._each.call(this.el.providers).map(function (el) {
                    if (!(el.dataset.order) || el.dataset.order > 3) {
                        _this.setProgress(50, _this.progressSel(el.dataset.url), 'orange');
                        console.log('verify', _this._url);
                        _this.get({
                            url: _this._url,
                            headers: {},
                            query: _this.query({ verify: el.dataset.url })
                        }).then(function (res) {
                            //console.log('res', el.dataset.provider, res);
                            var v = (res.data.verified === true);
                            var e = ((v && !(res.data.error)) ? null : res.data.error);
                            _this.verifyUI(el, e);
                        }, function (e) { _this.verifyUI(el, e); });
                    }
                });
            }
            this.setProgress(100, this.progressSel('link'), 'blue');
        };
        IndieAuthClient.prototype.verifyFresh = function () { return this.verify(true); };
        IndieAuthClient.prototype.gpgForm = function (res) {
            if (!(res.data) || !(res.data.code) || !(res.data.state)) {
                return 'GPG AUTH ERR'; // TODO FIXME
            }
            return ['<br><form class="gpgAuthForm" action="', this._url, '" method="post">',
                '<textarea name="code" rows="10" onfocus="this.select()" autofocus=true>',
                res.data.code,
                '</textarea>',
                '<input name="state" type="hidden" value="', res.data.state, '">',
                '<button type="submit" class="ui green button">OK</button>',
                '</form>'
            ].join('');
        };
        IndieAuthClient.prototype.authUI = function (el) {
            var _this = this;
            el.removeEventListener('click', this.signIn(el));
            /* remove old forms : */
            [].forEach.call(document.querySelectorAll('.gpgAuthForm'), function (fEl) {
                fEl.parentNode.removeChild(fEl);
            });
            /* */
            var dimmer = el.querySelector('.ui.dimmer');
            dimmer.innerHTML = this.iconMessage(this.msg('msgPrepare'), 'exchange', 'black');
            el.querySelector('.ui.button').classList.add('disabled');
            /* TODO FIXME from config : */ var mailTimeout = (4 * 60 * 1000);
            var _second = 100;
            var _aniDur = 1000;
            this.get({
                url: this._url,
                query: this.query({ authorize: el.dataset.url })
            }).then(function (res) {
                el.querySelector('.ui.button').classList.remove('disabled');
                if (!!_this.hasProgress() && !!dimmer) {
                    if (!!_this.sentProgress[el.dataset.provider]) {
                        clearInterval(_this.sentProgress[el.dataset.provider]);
                    }
                    var _o = { m: 'sent', c: '' };
                    if (el.dataset.provider === 'pgpkey') {
                        _o = { m: 'sign', c: _this.gpgForm(res) };
                    }
                    ;
                    dimmer.innerHTML = [
                        _this.iconMessage(_this.msg(_o.m, el) + ':', 'exchange', 'black'), _o.c,
                        '<div class="ui small green progress"><div class="bar">',
                        '<i class="clock inverted icon"></i>',
                        '<div class="progress"></div></div></div>'
                    ].join('');
                    var pEl_1 = $('.ui.progress', dimmer);
                    var cEl_1 = $('.clock', dimmer);
                    if (!pEl_1['progress'].total) {
                        pEl_1['progress']({
                            duration: _aniDur, total: (mailTimeout / _second),
                            autoSuccess: false, label: ''
                        });
                    }
                    pEl_1['progress']('reset');
                    _this.sentProgress[el.dataset.provider] = setInterval(function () {
                        pEl_1['progress']('increment');
                        var per = pEl_1['progress']('get percent');
                        if (per < 75 && !pEl_1.hasClass('green')) {
                            pEl_1.addClass('green');
                        }
                        if (per > 99 && pEl_1.hasClass('yellow')) {
                            console.log('TIMEOUT', el.dataset.provider);
                            pEl_1.removeClass('yellow').addClass('red');
                            pEl_1['progress']('set bar label', 'timed out');
                            el.querySelector('.ui.button').classList.remove('disabled');
                            clearInterval(_this.sentProgress[el.dataset.provider]);
                            if (el.dataset.provider === 'pgpkey') {
                                [].forEach.call(document.querySelectorAll('.gpgAuthForm'), function (fEl) {
                                    fEl.parentNode.removeChild(fEl);
                                });
                            }
                        }
                        else if (per > 75 && pEl_1.hasClass('green')) {
                            pEl_1.removeClass('green').addClass('yellow');
                        }
                        else if (per > 35) {
                            var left = parseInt(pEl_1['progress']('get text', '{left}'));
                            var sec = Math.round(left / (_aniDur / _second));
                            if (cEl_1.hasClass('icon')) {
                                cEl_1.removeClass('icon');
                            }
                            pEl_1['progress']('set bar label', _this.msg('secLeft', { seconds: sec }));
                        }
                    }, _second);
                }
            });
        };
        IndieAuthClient.prototype.signIn = function (el) {
            var _this = this;
            var p = el.dataset.provider;
            if (p === 'mail' || p === 'sms' || p === 'pgpkey') {
                return function () { _this.authUI(el); };
            }
            return function () {
                window.location.href += ('&authorize=' + _this._encode(el.dataset.url));
            };
        };
        return IndieAuthClient;
    }(Request_1.default));
    ;
    exports.default = IndieAuthClient;
});
//# sourceMappingURL=client.js.map