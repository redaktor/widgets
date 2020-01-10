(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/styles/base.m.css", "../themes/redaktor-default/icon.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var baseCss = require("../common/styles/base.m.css");
    var css = require("../themes/redaktor-default/icon.m.css");
    var IconBase = /** @class */ (function (_super) {
        tslib_1.__extends(IconBase, _super);
        function IconBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IconBase.prototype.renderAltText = function (altText) {
            return Widget_1.v('span', { classes: [baseCss.visuallyHidden] }, [altText]);
        };
        IconBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {
                hidden: 'true'
            } : _b, type = _a.type, altText = _a.altText;
            return Widget_1.v('span', { classes: this.theme(css.root) }, [
                Widget_1.v('i', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { classes: this.theme([css.icon, css[type]]) })),
                altText ? this.renderAltText("" + altText) : null
            ]);
        };
        IconBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-icon',
                properties: [
                    'theme',
                    'aria',
                    'extraClasses'
                ],
                attributes: ['type', 'altText']
            })
        ], IconBase);
        return IconBase;
    }(Widget_1.ThemedBase));
    exports.IconBase = IconBase;
    var Icon = /** @class */ (function (_super) {
        tslib_1.__extends(Icon, _super);
        function Icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Icon;
    }(IconBase));
    exports.default = Icon;
});
//# sourceMappingURL=index.js.map