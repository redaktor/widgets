(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "./styles/tooltip.m.css", "../themes/redaktor-default/tooltip.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var fixedCss = require("./styles/tooltip.m.css");
    var css = require("../themes/redaktor-default/tooltip.m.css");
    // Enum used to position the Tooltip
    var Orientation;
    (function (Orientation) {
        Orientation["bottom"] = "bottom";
        Orientation["left"] = "left";
        Orientation["right"] = "right";
        Orientation["top"] = "top";
    })(Orientation = exports.Orientation || (exports.Orientation = {}));
    var fixedOrientationCss = fixedCss;
    var orientationCss = css;
    var TooltipBase = /** @class */ (function (_super) {
        tslib_1.__extends(TooltipBase, _super);
        function TooltipBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TooltipBase.prototype.getFixedModifierClasses = function () {
            var _a = this.properties.orientation, orientation = _a === void 0 ? Orientation.right : _a;
            return [
                fixedCss.rootFixed,
                fixedOrientationCss[orientation + "Fixed"]
            ];
        };
        TooltipBase.prototype.getModifierClasses = function () {
            var _a = this.properties.orientation, orientation = _a === void 0 ? Orientation.right : _a;
            return [
                orientationCss[orientation]
            ];
        };
        TooltipBase.prototype.renderContent = function () {
            var _a = this.properties.aria, aria = _a === void 0 ? {} : _a;
            return Widget_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: [this.theme(css.content), fixedCss.contentFixed], key: 'content' }), [this.properties.content]);
        };
        TooltipBase.prototype.renderTarget = function () {
            return Widget_1.v('div', { key: 'target' }, this.children);
        };
        TooltipBase.prototype.render = function () {
            var open = this.properties.open;
            var classes = this.getModifierClasses();
            var fixedClasses = this.getFixedModifierClasses();
            return Widget_1.v('div', {
                classes: tslib_1.__spread(this.theme(classes), fixedClasses)
            }, [
                this.renderTarget(),
                open ? this.renderContent() : null
            ]);
        };
        TooltipBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-tooltip',
                properties: ['theme', 'aria', 'extraClasses', 'content', 'open'],
                attributes: ['orientation'],
                events: []
            })
        ], TooltipBase);
        return TooltipBase;
    }(Widget_1.ThemedBase));
    exports.TooltipBase = TooltipBase;
    var Tooltip = /** @class */ (function (_super) {
        tslib_1.__extends(Tooltip, _super);
        function Tooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Tooltip;
    }(TooltipBase));
    exports.default = Tooltip;
});
//# sourceMappingURL=index.js.map