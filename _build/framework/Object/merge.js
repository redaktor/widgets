(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lang/isObjectTypes", "./keys"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isObjectTypes_1 = require("../lang/isObjectTypes");
    var keys_1 = require("./keys");
    function _merge(a, b, fnOrDefaults, inherited, assign, stack) {
        if (fnOrDefaults === void 0) { fnOrDefaults = false; }
        if (inherited === void 0) { inherited = true; }
        if (assign === void 0) { assign = false; }
        if (!isObjectTypes_1.isObject(a)) {
            return a;
        }
        keys_1.each(b, function (source) {
            if (isObjectTypes_1.isObject(a) && isObjectTypes_1.isObject(source)) {
                return keys_1.eachKeys(source, inherited, 0, function (k, _i, _o, goOn) {
                    var _b, _c, _d, _e;
                    stack || (stack = new Map());
                    var v = source[k];
                    if (typeof fnOrDefaults === 'function') {
                        var CV = fnOrDefaults(a[k], v, k, _o, stack);
                        if (assign || typeof CV !== 'undefined') {
                            Object.assign(a, (_b = {}, _b[k] = CV, _b));
                        }
                        return goOn;
                    }
                    if (assign || (!!a[k] && typeof v === 'undefined')) {
                        if (assign) {
                            Object.assign(a, (_c = {}, _c[k] = v, _c));
                        }
                        return goOn;
                    }
                    if (Array.isArray(v)) {
                        if (fnOrDefaults && typeof a[k] === 'undefined') {
                            a[k] = v;
                        }
                        if (Array.isArray(a[k]) && !!a[k].length) {
                            keys_1.each(source[k], function (_v, i, _a, next, stop) {
                                if (i === a[k].length) {
                                    return stop;
                                }
                                if (typeof _v !== 'undefined') {
                                    a[k][i] = _v;
                                }
                            });
                        }
                    }
                    else if (isObjectTypes_1.isObject(v)) {
                        if (!a[k]) {
                            Object.assign(a, (_d = {}, _d[k] = {}, _d));
                        }
                        return _merge(v, a[k], fnOrDefaults, inherited, assign, stack);
                    }
                    else {
                        return Object.assign(a, (_e = {}, _e[k] = v, _e));
                    }
                });
            }
        });
        return a;
    }
    function merge(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources);
    }
    exports.merge = merge;
    function mergeWith(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, sources.pop(), true);
    }
    exports.mergeWith = mergeWith;
    function assignIn(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, false, true, true);
    }
    exports.assignIn = assignIn;
    function assignWith(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, sources.pop(), false, true);
    }
    exports.assignWith = assignWith;
    function assignInWith(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, sources.pop(), true, true);
    }
    exports.assignInWith = assignInWith;
    function defaults(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, true, true, true);
    }
    exports.defaults = defaults;
    function defaultsDeep(o) {
        var sources = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            sources[_b - 1] = arguments[_b];
        }
        return _merge(o, sources, true, true);
    }
    exports.defaultsDeep = defaultsDeep;
});
//# sourceMappingURL=merge.js.map