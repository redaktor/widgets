(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Progress = /** @class */ (function (_super) {
        tslib_1.__extends(Progress, _super);
        function Progress() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Progress.prototype.render = function () {
            var _a = this.properties.providers, providers = _a === void 0 ? [] : _a;
            return d_1.v('div.ui.equal.width.grid.authProgress', providers.map(function (p) {
                return d_1.v('output.ui.column', { 'data-ref': (p.valid) ? p.url : 'link' }, [d_1.v('div.ui.small.indicating.progress', [d_1.v('div.bar')])]);
            }));
        };
        return Progress;
    }(WidgetBase_1.default));
    exports.default = Progress;
});
//# sourceMappingURL=IndieAuthProgress.js.map