(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../Collection/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("../Collection/main");
    //const [K, M]: any = ['keys','merge'];
    //@API.options({hello: 'world'})
    var STRING = /** @class */ (function (_super) {
        tslib_1.__extends(STRING, _super);
        function STRING(_input) {
            if (_input === void 0) { _input = ''; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread([_input], args)) || this;
            _this._input = _input;
            return _this.init({ awaits: {} });
        }
        STRING.prototype.$splitSentences = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return STRING;
    }(main_1.default));
    exports.default = STRING;
});
//# sourceMappingURL=main.js.map