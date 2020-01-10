(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("../Collection/main");
    var _a = tslib_1.__read(['Collection/', 'Object/'], 2), _C = _a[0], _O = _a[1];
    var _b = tslib_1.__read([_O + "keys", _O + "merge", _C + "while"], 3), K = _b[0], M = _b[1], W = _b[2];
    //@API.options({hello: 'world'})
    var OBJECT = /** @class */ (function (_super) {
        tslib_1.__extends(OBJECT, _super);
        function OBJECT(_input) {
            if (_input === void 0) { _input = {}; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread([_input], args)) || this;
            _this._input = _input;
            return _this.init({ awaits: {
                    keys: K, keysIn: K, forIn: K, forInRight: K, forOwn: K, forOwnRight: K, invert: K,
                    invertBy: K, mapKeys: K, mapKeysIn: K, mapValues: K, pick: K, pickBy: K, omit: K,
                    omitBy: K, unset: K, values: K, valuesIn: K, functions: K, functionsIn: K, toPairs: K,
                    toPairsIn: K, merge: M, mergeWith: M, assignIn: M, assignWith: M, assignInWith: M,
                    defaults: M, defaultsDeep: M, findKey: W, findLastKey: W
                } });
        }
        OBJECT.prototype.create = function (proto, keys) { return Object.assign(Object.create(proto), keys); };
        OBJECT.prototype.assign = function (o) {
            var sources = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                sources[_i - 1] = arguments[_i];
            }
            return Object.assign.apply(Object, tslib_1.__spread([o], sources));
        };
        return OBJECT;
    }(main_1.default));
    exports.default = OBJECT;
});
//# sourceMappingURL=main.js.map