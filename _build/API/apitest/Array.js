(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../base/wrap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wrap_1 = require("../base/wrap");
    var ARRAY = /** @class */ (function () {
        function ARRAY(_input, _options) {
            if (_options === void 0) { _options = {}; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var _this = this;
            this._input = _input;
            this._options = _options;
            this.isA = 'Array';
            this.pushIt = wrap_1.default(function (pushIt) {
                _this._input.push(pushIt);
                return _this._input;
            });
            this.value = _input;
        }
        ARRAY.prototype.filter = function (fn) { return this._input.filter(fn); };
        Object.defineProperty(ARRAY.prototype, "count", {
            //(pushIt: any) { this._input.push(pushIt) }
            get: function () { return { 'TEST': 1, '2': 2 }; },
            enumerable: true,
            configurable: true
        });
        ARRAY.test = 'test';
        return ARRAY;
    }());
    exports.default = ARRAY;
});
//# sourceMappingURL=Array.js.map