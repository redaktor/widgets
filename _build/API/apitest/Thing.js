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
    var Thing = /** @class */ (function () {
        function Thing(_input, _options) {
            if (_options === void 0) { _options = {}; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._input = _input;
            this._options = _options;
            this.isA = 'Thing';
        }
        Object.defineProperty(Thing.prototype, "testThing", {
            get: function () { return { 'TEST': 1, 'THING': 2 }; },
            enumerable: true,
            configurable: true
        });
        return Thing;
    }());
    exports.default = Thing;
});
//# sourceMappingURL=Thing.js.map