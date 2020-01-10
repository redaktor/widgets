(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "puppeteer", "events", "url"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Puppeteer = require("puppeteer");
    var EventEmitter = require("events");
    var url_1 = require("url");
    var devices = require('puppeteer/DeviceDescriptors');
    var rp = require('request-promise');
    // @ts-ignore
    var robotsParser = require('robots-parser');
    var _a = require('./helper'), delay = _a.delay, generateKey = _a.generateKey, checkDomainMatch = _a.checkDomainMatch, getRobotsUrl = _a.getRobotsUrl, getSitemapUrls = _a.getSitemapUrls, tracePublicAPI = _a.tracePublicAPI;
    var PriorityQueue = require('./priority-queue');
    var Crawler = require('./crawler');
    var SessionCache = require('../cache/session');
    /*
    static tracePublicAPI(classType) {
      const className = classType.prototype.constructor.name.toLowerCase();
      const debugClass = debug(`hccrawler:${className}`);
    
      Reflect.ownKeys(classType.prototype).forEach(methodName => {
        if (methodName === 'constructor' || !isString(methodName) || startsWith(methodName, '_')) return;
        const method = Reflect.get(classType.prototype, methodName);
        if (!isFunction(method)) return;
        Reflect.set(classType.prototype, methodName, function (...args) {
          const argsText = args.map(Helper.stringifyArgument).join(', ');
          debugClass(`${methodName}(${argsText})`);
          return method.call(this, ...args);
        });
      });
      if (classType.Events) {
        const method = Reflect.get(classType.prototype, 'emit');
        Reflect.set(classType.prototype, 'emit', function (event, ...args) {
          const argsText = [JSON.stringify(event)].concat(args.map(Helper.stringifyArgument)).join(', ');
          debugClass(`emit(${argsText})`);
          return method.call(this, event, ...args);
        });
      }
    }
    */
    var HeadlessCrawler = /** @class */ (function (_super) {
        tslib_1.__extends(HeadlessCrawler, _super);
        /**
         * @param {!Puppeteer.Browser} browser
         * @param {!Object} options
         */
        function HeadlessCrawler(options, _browser, _options, _cache, _queue, _exporter, _preRequest, _requestedCount, _onSuccess, _onError, _customCrawl) {
            if (_options === void 0) { _options = {}; }
            if (_cache === void 0) { _cache = {}; }
            if (_queue === void 0) { _queue = {}; }
            if (_exporter === void 0) { _exporter = {}; }
            if (_preRequest === void 0) { _preRequest = null; }
            if (_requestedCount === void 0) { _requestedCount = 0; }
            if (_onSuccess === void 0) { _onSuccess = null; }
            if (_onError === void 0) { _onError = null; }
            if (_customCrawl === void 0) { _customCrawl = null; }
            var _this = _super.call(this) || this;
            _this.options = options;
            _this._browser = _browser;
            _this._options = _options;
            _this._cache = _cache;
            _this._queue = _queue;
            _this._exporter = _exporter;
            _this._preRequest = _preRequest;
            _this._requestedCount = _requestedCount;
            _this._onSuccess = _onSuccess;
            _this._onError = _onError;
            _this._customCrawl = _customCrawl;
            _this._defaultOptions = {
                maxDepth: 1,
                maxConcurrency: 10,
                maxRequest: 0,
                priority: 0,
                delay: 0,
                retryCount: 3,
                retryDelay: 10000,
                timeout: 30000,
                jQuery: true,
                browserCache: true,
                persistCache: false,
                skipDuplicates: true,
                depthPriority: true,
                obeyRobotsTxt: true,
                followSitemapXml: false,
                skipRequestedRedirect: false,
                cookies: [],
                screenshot: null,
                viewport: null,
                url: ''
            };
            _this._options = Object.assign(_this._options, options);
            _this._cache = options.cache || new SessionCache();
            _this._queue = new PriorityQueue({
                maxConcurrency: _this._options.maxConcurrency,
                cache: _this._cache,
            });
            _this._exporter = options.exporter || null;
            _this._requestedCount = 0;
            _this._preRequest = options.preRequest || null;
            _this._onSuccess = options.onSuccess || null;
            _this._onError = options.onError || null;
            _this._customCrawl = options.customCrawl || null;
            _this._exportHeader();
            _this._queue.on('pull', function (_options, depth, previousUrl) { return _this._startRequest(_options, depth, previousUrl); });
            _this._browser.on('disconnected', function () { return void _this.emit(HeadlessCrawler.Events.Disconnected); });
            return _this;
        }
        /**
         * @param {!Object=} options
         * @return {!Promise<!HeadlessCrawler>}
         */
        HeadlessCrawler.launch = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ignoreHTTPSErrors, headless, executablePath, slowMo, args, ignoreDefaultArgs, handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, userDataDir, env, devtools, CRAWL, LAUNCH, browser, crawler;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ignoreHTTPSErrors = options.ignoreHTTPSErrors, headless = options.headless, executablePath = options.executablePath, slowMo = options.slowMo, args = options.args, ignoreDefaultArgs = options.ignoreDefaultArgs, handleSIGINT = options.handleSIGINT, handleSIGTERM = options.handleSIGTERM, handleSIGHUP = options.handleSIGHUP, dumpio = options.dumpio, userDataDir = options.userDataDir, env = options.env, devtools = options.devtools, CRAWL = tslib_1.__rest(options, ["ignoreHTTPSErrors", "headless", "executablePath", "slowMo", "args", "ignoreDefaultArgs", "handleSIGINT", "handleSIGTERM", "handleSIGHUP", "dumpio", "userDataDir", "env", "devtools"]);
                            LAUNCH = {
                                ignoreHTTPSErrors: ignoreHTTPSErrors, headless: headless, executablePath: executablePath, slowMo: slowMo, args: args, ignoreDefaultArgs: ignoreDefaultArgs,
                                handleSIGINT: handleSIGINT, handleSIGTERM: handleSIGTERM, handleSIGHUP: handleSIGHUP, dumpio: dumpio, userDataDir: userDataDir, env: env, devtools: devtools
                            };
                            return [4 /*yield*/, Puppeteer.launch(LAUNCH)];
                        case 1:
                            browser = _a.sent();
                            crawler = new HeadlessCrawler(CRAWL, browser);
                            return [4 /*yield*/, crawler.init()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, crawler];
                    }
                });
            });
        };
        /**
         * @param {!Object=} options
         * @return {!Promise<!HeadlessCrawler>}
         */
        HeadlessCrawler.connect = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var browserWSEndpoint, ignoreHTTPSErrors, CRAWL, CONNECT, browser, crawler;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            browserWSEndpoint = options.browserWSEndpoint, ignoreHTTPSErrors = options.ignoreHTTPSErrors, CRAWL = tslib_1.__rest(options, ["browserWSEndpoint", "ignoreHTTPSErrors"]);
                            CONNECT = { browserWSEndpoint: browserWSEndpoint, ignoreHTTPSErrors: ignoreHTTPSErrors };
                            return [4 /*yield*/, Puppeteer.connect(CONNECT)];
                        case 1:
                            browser = _a.sent();
                            crawler = new HeadlessCrawler(CRAWL, browser);
                            return [4 /*yield*/, crawler.init()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, crawler];
                    }
                });
            });
        };
        /**
         * @return {!string}
         */
        HeadlessCrawler.executablePath = function () {
            return Puppeteer.executablePath();
        };
        /**
         * @return {!Array<!string>}
         */
        HeadlessCrawler.defaultArgs = function () {
            return Puppeteer.defaultArgs();
        };
        /**
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.init = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._cache.init()];
                        case 1:
                            _a.sent();
                            this._queue.init();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?Object|?Array<!string>|?string} options
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.queue = function (optionsOrURIs) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var options, queued;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = Array.isArray(optionsOrURIs) ? optionsOrURIs : [optionsOrURIs];
                            queued = (options).map(function (_option) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var queueOption, CONSTRUCTOR_OPTIONS, mergedOptions;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            queueOption = typeof _option === 'string' ? { url: _option } : _option;
                                            CONSTRUCTOR_OPTIONS = [
                                                'browserWSEndpoint', 'ignoreHTTPSErrors', 'slowMo', 'ignoreHTTPSErrors',
                                                'headless', 'executablePath', 'slowMo', 'args', 'ignoreDefaultArgs',
                                                'handleSIGINT', 'handleSIGTERM', 'handleSIGHUP', 'dumpio', 'userDataDir',
                                                'env', 'devtools',
                                                'maxConcurrency', 'maxRequest', 'cache', 'exporter', 'persistCache',
                                                'preRequest', 'onSuccess', 'onError', 'customizeCrawl',
                                            ];
                                            CONSTRUCTOR_OPTIONS.forEach(function (option) {
                                                if (queueOption && queueOption[option]) {
                                                    throw new Error("Overriding " + option + " is not allowed!");
                                                }
                                            });
                                            mergedOptions = Object.assign({}, this._options, queueOption);
                                            if (mergedOptions.evaluatePage) {
                                                mergedOptions.evaluatePage = "(" + mergedOptions.evaluatePage + ")()";
                                            }
                                            if (!mergedOptions.url) {
                                                throw new Error('Url must be defined!');
                                            }
                                            if (mergedOptions.device && mergedOptions.device !== 'default' &&
                                                !devices[mergedOptions.device]) {
                                                throw new Error('Specified device is not supported!');
                                            }
                                            if (mergedOptions.delay > 0 && mergedOptions.maxConcurrency !== 1) {
                                                throw new Error('Max concurrency must be 1 when delay is set!');
                                            }
                                            mergedOptions.url = url_1.parse(mergedOptions.url).href;
                                            return [4 /*yield*/, this._push(omit(mergedOptions, CONSTRUCTOR_OPTIONS), 1, null)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(queued)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.close = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._queue.end();
                            return [4 /*yield*/, this._browser.close()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._endExporter()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._clearCacheOnEnd()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._closeCache()];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.disconnect = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._queue.end();
                            return [4 /*yield*/, this._browser.disconnect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._endExporter()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this._clearCacheOnEnd()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._closeCache()];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!Promise<!string>}
         */
        HeadlessCrawler.prototype.version = function () {
            return this._browser.version();
        };
        /**
         * @return {!Promise<!string>}
         */
        HeadlessCrawler.prototype.userAgent = function () {
            return this._browser.userAgent();
        };
        /**
         * @return {!string}
         */
        HeadlessCrawler.prototype.wsEndpoint = function () {
            return this._browser.wsEndpoint();
        };
        /**
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.onIdle = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._queue.onIdle()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!number} maxRequest
         */
        HeadlessCrawler.prototype.setMaxRequest = function (maxRequest) {
            this._options.maxRequest = maxRequest;
        };
        HeadlessCrawler.prototype.pause = function () {
            this._queue.pause();
        };
        HeadlessCrawler.prototype.resume = function () {
            this._queue.resume();
        };
        /**
         * @return {!Promise}
         */
        HeadlessCrawler.prototype.clearCache = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._cache.clear()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!boolean}
         */
        HeadlessCrawler.prototype.isPaused = function () {
            return this._queue.isPaused();
        };
        /**
         * @return {!Promise<!number>}
         */
        HeadlessCrawler.prototype.queueSize = function () {
            return this._queue.size();
        };
        /**
         * @return {!number}
         */
        HeadlessCrawler.prototype.pendingQueueSize = function () {
            return this._queue.pending();
        };
        /**
         * @return {!number}
         */
        HeadlessCrawler.prototype.requestedCount = function () {
            return this._requestedCount;
        };
        /**
         * @param {!Object} options
         * @return {!Promise<!Crawler>}
         * @param {!number} depth
         * @param {string} previousUrl
         * @private
         */
        HeadlessCrawler.prototype._newCrawler = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var page;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._browser.newPage()];
                        case 1:
                            page = _a.sent();
                            return [2 /*return*/, new Crawler(page, options, depth, previousUrl)];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise}
         */
        HeadlessCrawler.prototype._push = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var priority;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            priority = options.priority;
                            if (!priority && options.depthPriority)
                                priority = depth;
                            return [4 /*yield*/, this._queue.push(options, depth, previousUrl, priority)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._startRequest = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var skip, allowed, links;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._skipRequest(options)];
                        case 1:
                            skip = _a.sent();
                            if (!skip) return [3 /*break*/, 3];
                            this.emit(HeadlessCrawler.Events.RequestSkipped, options);
                            return [4 /*yield*/, this._markRequested(options)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3: return [4 /*yield*/, this._checkAllowedRobots(options, depth, previousUrl)];
                        case 4:
                            allowed = _a.sent();
                            if (!!allowed) return [3 /*break*/, 6];
                            this.emit(HeadlessCrawler.Events.RequestDisallowed, options);
                            return [4 /*yield*/, this._markRequested(options)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                        case 6: return [4 /*yield*/, this._followSitemap(options, depth, previousUrl)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, this._request(options, depth, previousUrl)];
                        case 8:
                            links = _a.sent();
                            this._checkRequestCount();
                            return [4 /*yield*/, this._followLinks(links, options, depth)];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, delay(options.delay)];
                        case 10:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @return {!Promise<!boolean>}
         * @private
         */
        HeadlessCrawler.prototype._skipRequest = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var allowedDomain, requested, shouldRequest;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowedDomain = this._checkAllowedDomains(options);
                            if (!allowedDomain)
                                return [2 /*return*/, true];
                            return [4 /*yield*/, this._checkRequested(options)];
                        case 1:
                            requested = _a.sent();
                            if (requested)
                                return [2 /*return*/, true];
                            return [4 /*yield*/, this._shouldRequest(options)];
                        case 2:
                            shouldRequest = _a.sent();
                            if (!shouldRequest)
                                return [2 /*return*/, true];
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @param {!number=} retryCount
         * @return {!Promise<!Array<!string>>}
         * @private
         */
        HeadlessCrawler.prototype._request = function (options, depth, previousUrl, retryCount) {
            if (retryCount === void 0) { retryCount = 0; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var crawler, res, requested, error_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.emit(HeadlessCrawler.Events.RequestStarted, options);
                            return [4 /*yield*/, this._newCrawler(options, depth, previousUrl)];
                        case 1:
                            crawler = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 9, , 14]);
                            return [4 /*yield*/, this._crawl(crawler)];
                        case 3:
                            res = _a.sent();
                            return [4 /*yield*/, crawler.close()];
                        case 4:
                            _a.sent();
                            this.emit(HeadlessCrawler.Events.RequestFinished, options);
                            return [4 /*yield*/, this._checkRequestedRedirect(options, res.response)];
                        case 5:
                            requested = _a.sent();
                            return [4 /*yield*/, this._markRequested(options)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this._markRequestedRedirects(options, res.redirectChain, res.response)];
                        case 7:
                            _a.sent();
                            if (requested)
                                return [2 /*return*/, []];
                            this._exportLine(res);
                            return [4 /*yield*/, this._success(res)];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, res.links];
                        case 9:
                            error_1 = _a.sent();
                            return [4 /*yield*/, crawler.close()];
                        case 10:
                            _a.sent();
                            Object.assign(error_1, { options: options, depth: depth, previousUrl: previousUrl });
                            if (!(retryCount >= options.retryCount)) return [3 /*break*/, 12];
                            this.emit(HeadlessCrawler.Events.RequestFailed, error_1);
                            return [4 /*yield*/, this._error(error_1)];
                        case 11:
                            _a.sent();
                            return [2 /*return*/, []];
                        case 12:
                            this.emit(HeadlessCrawler.Events.RequestRetried, options);
                            return [4 /*yield*/, delay(options.retryDelay)];
                        case 13:
                            _a.sent();
                            return [2 /*return*/, this._request(options, depth, previousUrl, retryCount + 1)];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise<!boolean>}
         * @private
         */
        HeadlessCrawler.prototype._checkAllowedRobots = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var robot, userAgent;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.obeyRobotsTxt)
                                return [2 /*return*/, true];
                            return [4 /*yield*/, this._getRobot(options, depth, previousUrl)];
                        case 1:
                            robot = _a.sent();
                            return [4 /*yield*/, this._getUserAgent(options)];
                        case 2:
                            userAgent = _a.sent();
                            return [2 /*return*/, robot.isAllowed(options.url, userAgent)];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._followSitemap = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var robot, sitemapUrls;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.followSitemapXml)
                                return [2 /*return*/];
                            return [4 /*yield*/, this._getRobot(options, depth, previousUrl)];
                        case 1:
                            robot = _a.sent();
                            sitemapUrls = robot.getSitemaps();
                            return [4 /*yield*/, Promise.resolve(sitemapUrls.map(function (sitemapUrl) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var sitemapXml, urls;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._getSitemapXml(sitemapUrl, options, depth, previousUrl)];
                                            case 1:
                                                sitemapXml = _a.sent();
                                                urls = getSitemapUrls(sitemapXml);
                                                return [4 /*yield*/, Promise.all(urls.map(function (url) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                        return tslib_1.__generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, this._push(Object.assign({}, options, { url: url }), depth, options.url)];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }))];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!string} sitemapUrl
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise<!string>}
         */
        HeadlessCrawler.prototype._getSitemapXml = function (sitemapUrl, options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var sitemapXml, error_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._cache.get(sitemapUrl)];
                        case 1:
                            sitemapXml = _a.sent();
                            if (!!sitemapXml) return [3 /*break*/, 7];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, 5, 7]);
                            return [4 /*yield*/, rp(sitemapUrl)];
                        case 3:
                            sitemapXml = _a.sent();
                            return [3 /*break*/, 7];
                        case 4:
                            error_2 = _a.sent();
                            Object.assign(error_2, { options: options, depth: depth, previousUrl: previousUrl });
                            this.emit(HeadlessCrawler.Events.SitemapXmlRequestFailed, error_2);
                            sitemapXml = '';
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, this._cache.set(sitemapUrl, '1')];
                        case 6:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/, sitemapXml];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!number} depth
         * @param {string} previousUrl
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._getRobot = function (options, depth, previousUrl) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var robotsUrl, robotsTxt, error_3;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            robotsUrl = getRobotsUrl(options.url);
                            return [4 /*yield*/, this._cache.get(robotsUrl)];
                        case 1:
                            robotsTxt = _a.sent();
                            if (!!robotsTxt) return [3 /*break*/, 7];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, 5, 7]);
                            return [4 /*yield*/, rp(robotsUrl)];
                        case 3:
                            robotsTxt = _a.sent();
                            return [3 /*break*/, 7];
                        case 4:
                            error_3 = _a.sent();
                            Object.assign(error_3, { options: options, depth: depth, previousUrl: previousUrl });
                            this.emit(HeadlessCrawler.Events.RobotsTxtRequestFailed, error_3);
                            robotsTxt = '';
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, this._cache.set(robotsUrl, robotsTxt)];
                        case 6:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/, robotsParser(robotsUrl, robotsTxt)];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @return {!Promise<!string>}
         * @private
         */
        HeadlessCrawler.prototype._getUserAgent = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (options.userAgent)
                        return [2 /*return*/, options.userAgent];
                    if (devices[options.device])
                        return [2 /*return*/, devices[options.device].userAgent];
                    return [2 /*return*/, this.userAgent()];
                });
            });
        };
        /**
         * @param {!Object} options
         * @return {!boolean}
         * @private
         */
        HeadlessCrawler.prototype._checkAllowedDomains = function (options) {
            var hostname = url_1.parse(options.url).hostname;
            if (options.deniedDomains && checkDomainMatch(options.deniedDomains, hostname))
                return false;
            if (options.allowedDomains && !checkDomainMatch(options.allowedDomains, hostname))
                return false;
            return true;
        };
        /**
         * @param {!Object} options
         * @return {!Promise<!boolean>}
         * @private
         */
        HeadlessCrawler.prototype._checkRequested = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var key, value;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.skipDuplicates)
                                return [2 /*return*/, false];
                            key = generateKey(options);
                            return [4 /*yield*/, this._cache.get(key)];
                        case 1:
                            value = _a.sent();
                            return [2 /*return*/, !!value];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!Object} response
         * @return {!Promise<!boolean>}
         * @private
         */
        HeadlessCrawler.prototype._checkRequestedRedirect = function (options, response) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var requested;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.skipRequestedRedirect)
                                return [2 /*return*/, false];
                            return [4 /*yield*/, this._checkRequested(Object.assign({}, options, { url: response.url }))];
                        case 1:
                            requested = _a.sent();
                            return [2 /*return*/, requested];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._markRequested = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var key;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.skipDuplicates)
                                return [2 /*return*/];
                            key = generateKey(options);
                            return [4 /*yield*/, this._cache.set(key, '1')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @param {!Array<!Object>} redirectChain
         * @param {!Object} response
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._markRequestedRedirects = function (options, redirectChain, response) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.skipRequestedRedirect)
                                return [2 /*return*/];
                            return [4 /*yield*/, Promise.all(redirectChain.map(function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this._markRequested(Object.assign({}, options, { url: request.url }))];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._markRequested(Object.assign({}, options, { url: response.url }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Object} options
         * @return {!Promise<?boolean>}
         * @private
         */
        HeadlessCrawler.prototype._shouldRequest = function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (!this._preRequest)
                        return [2 /*return*/, true];
                    return [2 /*return*/, this._preRequest(options)];
                });
            });
        };
        /**
         * @param {!Object} result
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._success = function (result) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._onSuccess)
                                return [2 /*return*/];
                            return [4 /*yield*/, this._onSuccess(result)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Error} error
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._error = function (error) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._onError)
                                return [2 /*return*/];
                            return [4 /*yield*/, this._onError(error)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {!Crawler} crawler
         * @return {!Promise<!Object>}
         */
        HeadlessCrawler.prototype._crawl = function (crawler) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var crawl;
                return tslib_1.__generator(this, function (_a) {
                    if (!this._customCrawl)
                        return [2 /*return*/, crawler.crawl()];
                    crawl = function () { return crawler.crawl.call(crawler); };
                    return [2 /*return*/, this._customCrawl(crawler.page(), crawl)];
                });
            });
        };
        /**
         * @param {!Array<!string>} urls
         * @param {!Object} options
         * @param {!number} depth
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._followLinks = function (urls, options, depth) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (depth >= options.maxDepth) {
                                this.emit(HeadlessCrawler.Events.MaxDepthReached);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, Promise.all(urls.map(function (url) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var _options, skip;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _options = Object.assign({}, options, { url: url });
                                                return [4 /*yield*/, this._skipRequest(_options)];
                                            case 1:
                                                skip = _a.sent();
                                                if (skip)
                                                    return [2 /*return*/];
                                                return [4 /*yield*/, this._push(_options, depth + 1, options.url)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @private
         */
        HeadlessCrawler.prototype._checkRequestCount = function () {
            this._requestedCount += 1;
            if (this._options.maxRequest && this._requestedCount >= this._options.maxRequest) {
                this.emit(HeadlessCrawler.Events.MaxRequestReached);
                this.pause();
            }
        };
        /**
         * @private
         */
        HeadlessCrawler.prototype._exportHeader = function () {
            if (!this._exporter)
                return;
            this._exporter.writeHeader();
        };
        /**
         * @param {!Object} res
         * @private
         */
        HeadlessCrawler.prototype._exportLine = function (res) {
            if (!this._exporter)
                return;
            this._exporter.writeLine(res);
        };
        /**
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._endExporter = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._exporter)
                                return [2 /*return*/];
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    _this._exporter.onEnd().then(resolve).catch(reject);
                                    _this._exporter.writeFooter();
                                    _this._exporter.end();
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._clearCacheOnEnd = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._options.persistCache)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.clearCache()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @return {!Promise}
         * @private
         */
        HeadlessCrawler.prototype._closeCache = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._cache.close()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HeadlessCrawler.Events = {
            RequestStarted: 'requeststarted',
            RequestSkipped: 'requestskipped',
            RequestDisallowed: 'requestdisallowed',
            RequestFinished: 'requestfinished',
            RequestRetried: 'requestretried',
            RequestFailed: 'requestfailed',
            RobotsTxtRequestFailed: 'robotstxtrequestfailed',
            SitemapXmlRequestFailed: 'sitemapxmlrequestfailed',
            MaxDepthReached: 'maxdepthreached',
            MaxRequestReached: 'maxrequestreached',
            Disconnected: 'disconnected',
        };
        return HeadlessCrawler;
    }(EventEmitter));
    exports.default = HeadlessCrawler;
    tracePublicAPI(HeadlessCrawler);
    module.exports = HeadlessCrawler;
});
//# sourceMappingURL=index.js.map