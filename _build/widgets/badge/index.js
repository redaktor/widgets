(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../themes/redaktor-default/app-bar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var css = require("../themes/redaktor-default/app-bar.m.css");
    var Badge = /** @class */ (function (_super) {
        tslib_1.__extends(Badge, _super);
        function Badge() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Badge.prototype.render = function () {
            var _a = this.properties.aria, aria = _a === void 0 ? {} : _a;
            return Widget_1.v('span', {
                classes: tslib_1.__spread([this.theme(css.root)], this.getSchemaClasses(css), this.getSizeClasses(css))
            }, this.children);
        };
        Badge = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-icon',
                properties: [
                    'theme',
                    'aria',
                    'extraClasses'
                ],
                attributes: []
            })
        ], Badge);
        return Badge;
    }(Widget_1.RedaktorWidgetBase));
    exports.default = Badge;
});
//# sourceMappingURL=index.js.map