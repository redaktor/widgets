(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../JSON/Pointer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Pointer_1 = require("../JSON/Pointer");
    function invoke(o, path, fnName) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var fn = Pointer_1.default(o, path)[fnName];
        return (typeof fn !== 'function') ? void 0 : fn.apply(void 0, tslib_1.__spread(args));
    }
    exports.invoke = invoke;
});
/* COLLECTION
invokeMap(collection: any, path: Function | string[] | string, ...args) => (Array): Returns the array of results.
Invokes the method at path of each element in collection, returning an array of the results
of each invoked method. Any additional arguments are provided to each invoked method.
If path is a function, it's invoked for, and this bound to, each element in collection.

OBJECT
invoke(object: any, path: string[] | string, ...args) => Returns the result of the invoked method.
Invokes the method at path of object. args: The arguments to invoke the method with.
*/
//# sourceMappingURL=invoke.js.map