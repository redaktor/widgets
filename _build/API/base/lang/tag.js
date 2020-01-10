(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} v The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(v) {
        var isOwn = Reflect.has(v, symToStringTag);
        var tag = v[symToStringTag];
        var unmasked = false;
        try {
            v[symToStringTag] = undefined;
            unmasked = true;
        }
        catch (e) { }
        var r = Object.prototype.toString.call(v);
        if (unmasked) {
            if (isOwn) {
                v[symToStringTag] = tag;
            }
            else {
                delete v[symToStringTag];
            }
        }
        return r;
    }
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} v The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function getTag(v) {
        if (v == null) {
            return v === undefined ? '[object Undefined]' : '[object Null]';
        }
        return (symToStringTag && symToStringTag in Object(v))
            ? getRawTag(v) : Object.prototype.toString.call(v);
    }
    exports.default = getTag;
});
//# sourceMappingURL=tag.js.map