// TODO - FIXME - needed?
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isObjectTypes", "./assignValue", "./copy/array", "./copy/buffer", "./isPrototype", "./isBuffer", "../Collection/each", "../Object/merge", "../Object/keys", "../Object/keysAll", "./tag"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isObjectTypes_1 = require("./isObjectTypes");
    var assignValue_1 = require("./assignValue");
    var array_1 = require("./copy/array");
    var buffer_1 = require("./copy/buffer");
    var isPrototype_1 = require("./isPrototype");
    var isBuffer_1 = require("./isBuffer");
    var each_1 = require("../Collection/each");
    var merge_1 = require("../Object/merge");
    var keys_1 = require("../Object/keys");
    var keysAll_1 = require("../Object/keysAll");
    var tag_1 = require("./tag");
    var CLONE_FLAG;
    (function (CLONE_FLAG) {
        CLONE_FLAG[CLONE_FLAG["DEEP"] = 1] = "DEEP";
        CLONE_FLAG[CLONE_FLAG["FLAT"] = 2] = "FLAT";
        CLONE_FLAG[CLONE_FLAG["SYMBOL"] = 4] = "SYMBOL";
    })(CLONE_FLAG = exports.CLONE_FLAG || (exports.CLONE_FLAG = {}));
    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} a The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(a) {
        var length = a.length, result = a.constructor(length);
        // Add properties assigned by `RegExp#exec`.
        if (length && typeof a[0] == 'string' && Reflect.has(a, 'index')) {
            result.index = a.index;
            result.input = a.input;
        }
        return result;
    }
    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(o) {
        return (typeof o.constructor === 'function' && !isPrototype_1.default(o))
            ? Object.create(Reflect.getPrototypeOf(o)) : {};
    }
    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
        var result;
        var isDeep = (bitmask & CLONE_FLAG.DEEP) == CLONE_FLAG.DEEP;
        var isFlat = (bitmask & CLONE_FLAG.FLAT) == CLONE_FLAG.FLAT;
        var isFull = (bitmask & CLONE_FLAG.SYMBOL) == CLONE_FLAG.SYMBOL;
        if (customizer) {
            result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== undefined) {
            return result;
        }
        if (!isObjectTypes_1.isObject(value)) {
            return value;
        }
        var isArr = Array.isArray(value);
        if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
                return array_1.default(value, result);
            }
        }
        else {
            var tag = tag_1.default(value), isFunc = tag == '[object Function]' || tag == '[object GeneratorFunction]';
            if (isBuffer_1.default(value)) {
                return buffer_1.default(value, isDeep);
            }
            if (tag == '[object Object]' || tag == '[object Arguments]' || (isFunc && !object)) {
                result = (isFlat || isFunc) ? {} : initCloneObject(value);
                if (!isDeep) {
                    return isFlat
                        ? keysAll_1.copySymbolsIn(value, merge_1.assignIn(result, value))
                        : keysAll_1.copySymbols(value, Object.assign(result, value));
                }
            }
            else {
                /*
                {"[object Uint32Array]":true,"[object Uint16Array]":true,"[object Uint8ClampedArray]":true,
                "[object Uint8Array]":true,"[object Symbol]":true,"[object String]":true,"[object Set]":true,
                "[object RegExp]":true,"[object Object]":true,"[object Number]":true,"[object Map]":true,
                "[object Int32Array]":true,"[object Int16Array]":true,"[object Int8Array]":true,
                "[object Float64Array]":true,"[object Float32Array]":true,"[object Date]":true,
                "[object Boolean]":true,"[object DataView]":true,"[object ArrayBuffer]":true,"[object Array]":true,
                "[object Arguments]":true,"[object WeakMap]":false,"[object Function]":false,"[object Error]":false}
                */
                if (!cloneableTags[tag]) {
                    return object ? value : {};
                }
                result = initCloneByTag(value, tag, baseClone, isDeep);
            }
        }
        // Check for circular references and return its corresponding clone.
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
            return stacked;
        }
        stack.set(value, result);
        var keysFunc = isFull ? (isFlat ? keysAll_1.getAllKeysIn : keysAll_1.getAllKeys) : (isFlat ? keys_1.keysIn : keys_1.keys);
        var props = isArr ? undefined : keysFunc(value);
        each_1.each(props || value, function (subValue, key) {
            if (props) {
                key = subValue;
                subValue = value[key];
            }
            // Recursively populate clone (susceptible to call stack limits).
            assignValue_1.default(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
    }
    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(v) {
        return baseClone(v, CLONE_FLAG.SYMBOL);
    }
    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(v, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return baseClone(v, CLONE_FLAG.SYMBOL, customizer);
    }
    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(v) {
        return baseClone(v, CLONE_FLAG.DEEP | CLONE_FLAG.SYMBOL);
    }
    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(v, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return baseClone(v, CLONE_FLAG.DEEP | CLONE_FLAG.SYMBOL, customizer);
    }
});
//# sourceMappingURL=clone.js.map