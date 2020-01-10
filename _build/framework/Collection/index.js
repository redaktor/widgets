(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var core_1 = require("../core");
    var pathArr = function (v) { return Array.isArray(v) && Array.isArray(v[0]) ? v[0] : v; };
    //@API.options({hello: 'world'})
    var _C = 'Collection/';
    var _a = tslib_1.__read(['cgk', 'each', 'shuffle', 'while', 'invoke', 'includes'].map(function (s) { return "" + _C + s; }), 6), C = _a[0], E = _a[1], S = _a[2], W = _a[3], I = _a[4], IN = _a[5];
    var Collection = /** @class */ (function (_super) {
        tslib_1.__extends(Collection, _super);
        function Collection(_input, _options) {
            if (_input === void 0) { _input = {}; }
            if (_options === void 0) { _options = {}; }
            var _this = _super.call(this, _input) || this;
            _this._input = _input;
            _this._options = _options;
            _this.sampleSize = function (size) { return _this; };
            _this.init({ awaits: {
                    count: C, countBy: C, each: E, every: E, filter: E, find: W, findLast: W,
                    groupBy: C, includes: IN, invoke: I, keyBy: C, map: E, partition: E,
                    reduce: E, reject: E, sample: S, sampleSize: S, shuffle: S, some: E
                } });
            return _this;
            /*if (typeof _options.baseUrl !== 'string') { _options.baseUrl = './' }
            //if (_options.baseUrl) { console.log('baseUrl', _options.baseUrl, Reflect.ownKeys(this)) }
            //this.count = this.fn([C,'count']);
            for (let k in Collection.awaits) {
              (<any>this)[k] = this.fn([Collection.awaits[k], k]); // TODO FIXME path join
            }
            */
        }
        Collection.prototype.at = function () {
            var _this = this;
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            return pathArr(paths).map(function (p) { return _this.pointer(_this.value, p); });
        };
        return Collection;
    }(core_1.default));
    exports.default = Collection;
});
//# sourceMappingURL=index.js.map