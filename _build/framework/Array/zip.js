(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/each"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var each_1 = require("../Collection/each");
    function zip(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        var r = [];
        each_1.each(a, function (v, i) { return r.push([v]) && each_1.each(b, function (_v) { r[i].push(_v[i]); }); });
        return r;
    }
    exports.zip = zip;
    function zipWith(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        var FN = b.pop(); // TODO FIXME get FN
        return each_1.map(a, function (v, i) { return FN.apply(void 0, tslib_1.__spread([v], each_1.map(b, function (_v) { return _v[i]; }))); });
    }
    exports.zipWith = zipWith;
    function unzip(a) {
        var L = Math.max.apply(Math, tslib_1.__spread(a.map(function (_a) { return _a.length; })));
        return each_1.map(new Array(L), function (v, i) { return each_1.map(a, function (o) { return o == null ? void 0 : o[i]; }); }, L);
    }
    exports.unzip = unzip;
    function unzipWith() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return zipWith.apply(void 0, tslib_1.__spread([a[0][0]], tslib_1.__spread(a[0].slice(1), a.slice(1))));
    }
    exports.unzipWith = unzipWith;
});
//# sourceMappingURL=zip.js.map