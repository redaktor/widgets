(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/has/has"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var has_1 = require("@dojo/framework/has/has");
    //import jsonPointer from '../JSON/Pointer';
    /*
    Based on sizeof.js by Stephen Morley
    A function to calculate the approximate memory usage of objects
    Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
    the terms of the CC0 1.0 Universal legal code:
    http://creativecommons.org/publicdomain/zero/1.0/legalcode
    Returns the approximate memory usage, in bytes, of the specified object.
    */
    function getApproximateByteSize(object) {
        var objects = [object];
        var size = 0;
        for (var index = 0; index < objects.length; index++) {
            switch (typeof objects[index]) {
                case 'boolean':
                    size += 4;
                    break;
                case 'number':
                    size += 8;
                    break;
                case 'string':
                    size += 2 * objects[index].length;
                    break;
                case 'object':
                    // if the object is not an array, add the sizes of the keys
                    if (Object.prototype.toString.call(objects[index]) !== '[object Array]') {
                        for (var key in objects[index]) {
                            size += 2 * key.length;
                        }
                    }
                    // loop over the keys
                    for (var key in objects[index]) {
                        // determine whether the value has already been processed
                        var processed = false;
                        for (var j = 0; j < objects.length; j++) {
                            if (objects[j] === objects[index][key]) {
                                processed = true;
                                break;
                            }
                        }
                        // queue the value to be processed if appropriate
                        if (!processed) {
                            objects.push(objects[index][key]);
                        }
                    }
            }
        }
        return size;
    }
    exports.getApproximateByteSize = getApproximateByteSize;
    //const _ = exports;
    //export default _;
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                if (name !== 'constructor') {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                }
            });
        });
    }
    exports.applyMixins = applyMixins;
    /* TODO FIXME SHOULD be to('function') or toFunction as well */
    function functor(v) {
        return typeof v === "function" ? v : function () { return v; };
    }
    exports.functor = functor;
    function getDottedProperty(object, parts, create) {
        if (create === void 0) { create = false; }
        var key;
        var i = 0;
        while (object && (key = parts[i++])) {
            if (typeof object !== 'object') {
                return undefined;
            }
            object = key in object ? object[key] : (create ? object[key] = {} : undefined);
        }
        return object;
    }
    exports.getDottedProperty = getDottedProperty;
    function getProperty(object, propertyName, create) {
        if (create === void 0) { create = false; }
        if (create === void 0) {
            create = false;
        }
        return getDottedProperty(object, propertyName.split('.'), create);
    }
    exports.getProperty = getProperty;
    function exists(name, obj) {
        // derives from dojo 1.x lang
        // example:
        //	| // define an object
        //	| var foo = {
        //	|		bar: { }
        //	| };
        //	|
        //	| // search the global scope
        //	| lang.exists("foo.bar"); // true
        //	| lang.exists("foo.bar.baz"); // false
        //	|
        //	| // search from a particular scope
        //	| lang.exists("bar", foo); // true
        //	| lang.exists("bar.baz", foo); // false
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        return (getProperty(obj, name, false) !== undefined);
    }
    exports.exists = exists;
    /* Try to make a shallow copy */
    function copy(o) {
        try {
            return JSON.parse(JSON.stringify(o));
        }
        catch (e) {
            return o;
        }
    }
    exports.copy = copy;
    /* Std. reduce array to object */
    function arrToObjByKey(key) {
        return function (o, aO) { o[aO[key]] = aO; return o; };
    }
    exports.arrToObjByKey = arrToObjByKey;
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
        return value === other || (value !== value && other !== other);
    }
    exports.eq = eq;
    function byteLength(v) {
        if (!!(Buffer) && Buffer.isBuffer(v)) {
            return v.length;
        }
        else if (!!(ArrayBuffer) && ArrayBuffer.isView(v)) {
            return v.length;
        }
        else if (typeof v === 'string') {
            if (has_1.default('host-node')) {
                return Buffer.byteLength(v);
            }
            else {
                // Buffer fallback, returns the byte length of an utf8 string
                var s = v.length;
                for (var i = v.length - 1; i >= 0; i--) {
                    var code = v.charCodeAt(i);
                    if (code > 0x7f && code <= 0x7ff)
                        s++;
                    else if (code > 0x7ff && code <= 0xffff)
                        s += 2;
                    if (code >= 0xDC00 && code <= 0xDFFF)
                        i--; //trail surrogate
                }
                return s;
            }
        }
        else {
            // type fallback, other than string
            return getApproximateByteSize(v);
        }
    }
    exports.byteLength = byteLength;
    /* TODO - FIXME - check: */
    // user input for regex quotes (treat as literal string)
    function escapeRegExp(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    exports.escapeRegExp = escapeRegExp;
    function hash(s) {
        if (typeof s != 'string') {
            s = JSON.stringify(s);
        }
        var hash = 0, i, chr, len;
        if (s.length == 0)
            return hash;
        for (i = 0, len = s.length; i < len; i++) {
            chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }
    exports.hash = hash;
});
//# sourceMappingURL=lang.js.map