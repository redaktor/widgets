(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../../webcomponents/WidgetBase", "@dojo/framework/widget-core/d", "../redaktor/RedUrl", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("../../../../webcomponents/WidgetBase");
    var d_1 = require("@dojo/framework/widget-core/d");
    var RedUrl_1 = require("../redaktor/RedUrl");
    var util_1 = require("./util");
    var NameHeader = /** @class */ (function (_super) {
        tslib_1.__extends(NameHeader, _super);
        function NameHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NameHeader.prototype.render = function () {
            var nps = ['honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix'];
            var _a = this.properties, url = _a.url, name = _a.name, org = _a.org, nickname = _a.nickname, _b = _a.isOrg, isOrg = _b === void 0 ? false : _b;
            var type;
            var p = this.properties;
            var children = [];
            if (Array.isArray(url) && url.length === 1 && !!name) {
                children.push(d_1.w(RedUrl_1.default, {
                    href: url[0],
                    class: 'p-name u-url fn url right floated',
                    target: '_blank',
                    title: 'name',
                    style: 'max-width: calc(100% - 2.7rem - 1em);'
                }, [(Array.isArray(name) && !!name.length) ? name[0] : url[0]]));
            }
            else if (!isOrg && Array.isArray(name)) {
                children.push(d_1.v('span.p-name', name));
            }
            else if (p[nps[0]] || p[nps[1]] || p[nps[2]] || p[nps[3]] || p[nps[4]]) {
                nps.forEach(function (type) { return children.push(util_1.u_pExplode(type, p)); });
            }
            else {
                type = 'org';
                children.push(d_1.v('span.p-org.org.grey.text', [!!(p.org) ? p.org[0] : 'Name']));
            }
            if (type !== 'org' && Array.isArray(p.org) && p.org.length === 1 && typeof p.org[0] === 'string') {
                children.push(d_1.v('span.p-org.org.grey.text', [p.org[0]]));
            }
            return d_1.v('h3.header', children);
        };
        return NameHeader;
    }(WidgetBase_1.default));
    exports.default = NameHeader;
});
//# sourceMappingURL=MfCardNameHeader.js.map