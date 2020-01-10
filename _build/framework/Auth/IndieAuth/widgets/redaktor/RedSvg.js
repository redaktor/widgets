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
    var Svg = /** @class */ (function (_super) {
        tslib_1.__extends(Svg, _super);
        function Svg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Svg.prototype.render = function () {
            var _a = this.properties, _b = _a.x, x = _b === void 0 ? '0px' : _b, _c = _a.y, y = _c === void 0 ? '0px' : _c, _d = _a.width, width = _d === void 0 ? '40px' : _d, _e = _a.height, height = _e === void 0 ? '40px' : _e, _f = _a.viewBox, viewBox = _f === void 0 ? '0 0 448 448' : _f, svg = _a.svg;
            var children = (!!svg) ? [] : tslib_1.__spread(this.children);
            var mySVG = (!svg && !!children.length) ? children[0] : svg;
            /* TODO console warn
            if viewBox has letters or
            if multiple children|children[0] is node */
            var vNode = d_1.v('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                version: '1.1',
                x: x,
                y: y,
                width: width,
                height: height,
                viewBox: viewBox,
                'enable-background': ('new ' + viewBox),
                'xml:space': 'preserve',
                innerHTML: mySVG
            });
            //console.log('mySVG',mySVG);
            //		if (mySVG) { (<any>vNode).innerHTML = mySVG; } // TODO FIXME
            return vNode;
        };
        return Svg;
    }(WidgetBase_1.default));
    exports.default = Svg;
});
//# sourceMappingURL=RedSvg.js.map