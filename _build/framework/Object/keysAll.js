(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Collection/each", "../Object/keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var each_1 = require("../Collection/each");
    var keys_1 = require("../Object/keys");
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var getSymbols = Object.getOwnPropertySymbols;
    function getSymbolsIn(o) {
        o = Object(o);
        if (!o || !Object.getOwnPropertySymbols) {
            return [];
        }
        var result = [];
        while (o) {
            result.push(each_1.filter(getSymbols(o), function (symbol) { return isEnumerable.call(o, symbol)(o); }));
            o = Reflect.getPrototypeOf(o);
        }
        return result;
    }
    exports.getSymbolsIn = getSymbolsIn;
    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return Array.isArray(object) ? result : (result.push(symbolsFunc(object) && result));
    }
    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
        return getSymbolsIn(source).reduce(function (o, k) { o[k] = source[k]; return o; }, object);
    }
    exports.copySymbolsIn = copySymbolsIn;
    function copySymbols(source, object) {
        return getSymbols(source).reduce(function (o, k) { o[k] = source[k]; return o; }, object);
    }
    exports.copySymbols = copySymbols;
    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
        return baseGetAllKeys(object, keys_1.keys, getSymbols);
    }
    exports.getAllKeys = getAllKeys;
    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
        return baseGetAllKeys(object, keys_1.keysIn, getSymbolsIn);
    }
    exports.getAllKeysIn = getAllKeysIn;
});
//# sourceMappingURL=keysAll.js.map