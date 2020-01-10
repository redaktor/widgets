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
    function sortObj(o) {
        if (Array.isArray(o) /*!isObject*/) {
            return o;
        }
        return Object.keys(o).sort().reduce(function (_o, k) {
            _o[k] = o[k];
            return _o;
        }, {});
    }
    function inArr(a, s, i) {
        /* opinionated compromise TODO */
        if (Array.isArray(s)) {
            return !!s.filter(function (w) { return !!inArr(a, w); }).length;
        }
        if (s !== s) {
            s = 0;
            a = a.map(function (_s) { return ((_s !== _s) ? 0 : _s); });
        }
        if (typeof s === 'object') {
            s = sortObj(s);
            s = JSON.stringify([s]).slice(1, -1);
            a = a.map(function (_s) { return (typeof _s === 'object') ? JSON.stringify([s]).slice(1, -1) : s; });
        }
        if (typeof i === 'number') {
            return a.indexOf(s) === i;
        }
        return (i === true) ? a.indexOf(s) : a.indexOf(s) > -1;
    }
    function inObj(o, s, i) {
        var keys = Object.keys(o);
        var a = keys.map(function (k) { return o[k]; });
        var index = inArr(a, s, true);
        return (index > -1) ? keys[index] : void 0;
    }
    function hasValue(x, s, i) {
        if (typeof x !== 'object') {
            return void 0;
        }
        return (Array.isArray(x) ? inArr(x, s, i) : inObj(x, s, i));
    }
    exports.default = hasValue;
});
//# sourceMappingURL=hasValue.js.map