(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var EventEmitter = require("events");
    var devices = require('puppeteer/DeviceDescriptors');
    var rp = require('request-promise');
    // @ts-ignore
    var robotsParser = require('robots-parser');
    var _a = require('./helper'), delay = _a.delay, generateKey = _a.generateKey, checkDomainMatch = _a.checkDomainMatch, getRobotsUrl = _a.getRobotsUrl, getSitemapUrls = _a.getSitemapUrls, tracePublicAPI = _a.tracePublicAPI;
    var PriorityQueue = require('./priority-queue');
    var Crawler = require('./crawler');
    var SessionCache = require('../cache/session');
    /*
    
    */
    var Fetcher = /** @class */ (function (_super) {
        tslib_1.__extends(Fetcher, _super);
        function Fetcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Fetcher;
    }(EventEmitter));
    exports.default = Fetcher;
});
//# sourceMappingURL=mainFetch.js.map