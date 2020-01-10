(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../../widgets/baseInput", "../../../../../dojo/core/main", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var baseInput_1 = require("../../../../../widgets/baseInput");
    var main_1 = require("../../../../../dojo/core/main");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Url = /** @class */ (function (_super) {
        tslib_1.__extends(Url, _super);
        function Url() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Url.prototype.render = function () {
            var _a = this.properties, _b = _a.href, href = _b === void 0 ? '#' : _b, _c = _a.target, target = _c === void 0 ? '_self' : _c, _d = _a.rel, rel = _d === void 0 ? 'nofollow' : _d;
            var children = (!this.children.length) ? [href] : tslib_1.__spread(this.children);
            return d_1.v('a.item', main_1.lang.mixin({ rel: rel, target: target, href: href }, this.properties), children);
        };
        return Url;
    }(baseInput_1.default));
    exports.default = Url;
});
//# sourceMappingURL=RedUrl.js.map