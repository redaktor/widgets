(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../lang/range"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var range_1 = require("../lang/range");
    function _shuffle(a, size) {
        var _a = tslib_1.__read(range_1.default(a, 0, size + 1, 1), 5), i = _a[0], end = _a[1], s = _a[2], L = _a[3], R = _a[4];
        for (i = L - 1; i > L - end; i -= 1) {
            var randI = Math.floor(Math.random() * (i + 1));
            var tmp = R[i];
            R[i] = R[randI];
            R[randI] = tmp;
        }
        return R.slice(0, size);
    }
    function sample(a) { return _shuffle(a, 1); } // TODO FIXME doShuffle(a, 1)[0],
    exports.sample = sample;
    function sampleSize(a, size) {
        if (size === void 0) { size = 1; }
        return _shuffle(a, size);
    }
    exports.sampleSize = sampleSize;
    function shuffle(a) { return _shuffle(a); }
    exports.shuffle = shuffle;
});
//# sourceMappingURL=shuffle.js.map