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
    function _textContent(children) {
        return children.filter(function (child) { return typeof child === 'string'; });
    }
    function textContent(nodeOrChildren) {
        var results = [];
        if (typeof nodeOrChildren === 'string') {
            results.push(nodeOrChildren);
        }
        else if (Array.isArray(nodeOrChildren)) {
        }
        else if (typeof nodeOrChildren === 'object') {
        }
        return results.join('');
    }
    var MfDetails = /** @class */ (function (_super) {
        tslib_1.__extends(MfDetails, _super);
        function MfDetails() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MfDetails.prototype.render = function () {
            console.log('MfDetails', this.properties);
            var _a = this.properties, icon = _a.icon, _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.summary, summary = _c === void 0 ? false : _c, _d = _a.summaryTag, summaryTag = _d === void 0 ? 'div.strong.summary.blue.text' : _d, _e = _a.baseTag, baseTag = _e === void 0 ? 'label.ui.details' : _e;
            if (!!icon && !!icon.length) {
                icon += ' icon';
            }
            if (typeof summary !== 'string') {
                console.log('this.children', this.children);
                console.log('textContent', this.children.filter(function (child) { return typeof child === 'string'; }));
                summary = 'TEST';
            }
            var classes = (!!this.properties.summaryCount) ?
                'summarized' : (this.properties.class || 'default');
            console.log('classes', classes);
            var summaryChildren = (!!icon) ?
                [d_1.v('i', { class: icon }), ' ', summary] : [summary];
            var children = [
                d_1.v('input', { type: 'checkbox' }),
                d_1.v(summaryTag, summaryChildren)
            ];
            console.log(this.children);
            return d_1.v('div', { title: title }, [d_1.v(baseTag, { class: classes }, children.concat(this.children))]);
        };
        return MfDetails;
    }(WidgetBase_1.default));
    exports.default = MfDetails;
});
//# sourceMappingURL=RedDetails.js.map