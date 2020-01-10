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
    var Ribbon = /** @class */ (function (_super) {
        tslib_1.__extends(Ribbon, _super);
        function Ribbon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Ribbon.prototype.render = function () {
            var _a = this.properties, _b = _a.label, label = _b === void 0 ? '' : _b, _c = _a.success, success = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? 'medium' : _d, _e = _a.align, align = _e === void 0 ? 'right' : _e;
            var color = this.properties.color || (!!success) ? 'green' : 'grey';
            var aligned = '.' + align;
            var children = (!!success ? [d_1.v('i.ui.checkmark.box.icon')] : []);
            if (!!success) {
                if (Array.isArray(label)) {
                    label = (label.join(', ') + ' ');
                }
                children.push(d_1.v('', [' ' + label]));
            }
            return d_1.v("div.ui." + color + aligned + ".ribbon.label", this.properties, children);
        };
        return Ribbon;
    }(WidgetBase_1.default));
    exports.default = Ribbon;
});
//# sourceMappingURL=MfCardRibbon.js.map