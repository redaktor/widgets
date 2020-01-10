(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d", "../../../../../dojo/core/uuid", "../redaktor/RedImage", "../redaktor/RedUrl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var uuid_1 = require("../../../../../dojo/core/uuid");
    var RedImage_1 = require("../redaktor/RedImage");
    var RedUrl_1 = require("../redaktor/RedUrl");
    var SiteInfo = /** @class */ (function (_super) {
        tslib_1.__extends(SiteInfo, _super);
        function SiteInfo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SiteInfo.prototype.render = function () {
            var o = this.properties;
            if (!(o) || typeof o != 'object' || (!(o.best) && !(o.url))) {
                o = { best: {}, url: '' };
            }
            var t = o.best.title;
            var infoChildren = [];
            if (!!(o.best.icon)) {
                infoChildren.push(d_1.w(RedImage_1.default, { src: o.best.icon, class: 'icon', key: uuid_1.default() }));
                infoChildren.push('  ');
            }
            (!!(o.url) && infoChildren.push(d_1.w(RedUrl_1.default, { href: o.url, title: t, target: '_blank' })));
            return d_1.v('span', infoChildren);
        };
        return SiteInfo;
    }(WidgetBase_1.default));
    exports.default = SiteInfo;
});
//# sourceMappingURL=MfCardSiteInfo.js.map