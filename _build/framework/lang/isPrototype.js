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
    function isPrototype(v) {
        var CT = !!v && v.constructor;
        return v === ((typeof CT === 'function' && CT.prototype) || Object.prototype);
    }
    exports.default = isPrototype;
});
//# sourceMappingURL=isPrototype.js.map