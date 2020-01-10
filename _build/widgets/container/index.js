(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../themes/redaktor-default/split-pane.m.css", "../global-event/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var css = require("../themes/redaktor-default/split-pane.m.css");
    var index_1 = require("../global-event/index");
    var ContainerBase = /** @class */ (function (_super) {
        tslib_1.__extends(ContainerBase, _super);
        function ContainerBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._onResize = function () {
                _this.properties.onResize && _this.properties.onResize(); /* TODO FIXME (size: number) */
            };
            return _this;
        }
        ContainerBase.prototype.render = function () {
            console.log('MATERIAL', util_1.materialClass(this.properties.material));
            return Widget_1.v('div', {
                classes: tslib_1.__spread(this.theme([css.root]), [
                    util_1.materialClass(this.properties.material)
                ]),
                key: 'root'
            }, tslib_1.__spread([
                Widget_1.w(index_1.GlobalEvent, {
                    key: 'global',
                    window: {
                        resize: this._onResize
                    }
                })
            ], this.children));
        };
        ContainerBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-container',
                properties: ['theme', 'material', 'extraClasses'],
                events: ['onResize']
            })
        ], ContainerBase);
        return ContainerBase;
    }(Widget_1.ThemedBase));
    exports.ContainerBase = ContainerBase;
    var Container = /** @class */ (function (_super) {
        tslib_1.__extends(Container, _super);
        function Container() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Container;
    }(ContainerBase));
    exports.default = Container;
});
//# sourceMappingURL=index.js.map