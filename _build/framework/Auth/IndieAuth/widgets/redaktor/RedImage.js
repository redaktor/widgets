(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../../widgets/baseInput", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var baseInput_1 = require("../../../../../widgets/baseInput");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Image = /** @class */ (function (_super) {
        tslib_1.__extends(Image, _super);
        function Image() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sizes = { mini: 1, tiny: 1, small: 1, medium: 1, large: 1, big: 1, huge: 1, massive: 1 };
            _this.aligns = { top: 1, middle: 1, bottom: 1 };
            return _this;
        }
        Image.prototype.render = function () {
            var _a = this.properties, _b = _a.size, size = _b === void 0 ? '' : _b, _c = _a.align, align = _c === void 0 ? 'middle' : _c;
            var sized = (!!this.sizes[size] ? ('.' + size) : '');
            var aligned = (!!this.aligns[align] ? '.' + align : '');
            return d_1.v("img.ui.inline" + aligned + ".aligned" + sized + ".image", this.properties);
        };
        return Image;
    }(baseInput_1.default));
    exports.default = Image;
});
//# sourceMappingURL=RedImage.js.map