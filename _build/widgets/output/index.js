(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../label", "../themes/redaktor-default/label.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var label_1 = require("../label");
    var css = require("../themes/redaktor-default/label.m.css");
    var Output = /** @class */ (function (_super) {
        tslib_1.__extends(Output, _super);
        function Output() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rootElement = 'output';
            return _this;
        }
        Output = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-output',
                properties: [
                    'theme', 'schema', 'size', 'aria', 'extraClasses', 'focused',
                    'disabled', 'readOnly', 'required', 'invalid', 'hidden', 'muted'
                ],
                attributes: [],
                events: []
            })
        ], Output);
        return Output;
    }(label_1.default));
    exports.default = Output;
});
//# sourceMappingURL=index.js.map