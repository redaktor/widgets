(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../widgets/common/Widget", "../widgets/tab", "../widgets/tab-controller", "./tabs/BasicFormTab", "./tabs/TextInputTab", "./tabs/TextAreaTab", "./tabs/SelectTab", "./tabs/ProgressTab", "./tabs/SliderTab"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../widgets/common/Widget");
    var tab_1 = require("../widgets/tab");
    var tab_controller_1 = require("../widgets/tab-controller");
    var BasicFormTab_1 = require("./tabs/BasicFormTab");
    var TextInputTab_1 = require("./tabs/TextInputTab");
    var TextAreaTab_1 = require("./tabs/TextAreaTab");
    var SelectTab_1 = require("./tabs/SelectTab");
    var ProgressTab_1 = require("./tabs/ProgressTab");
    var SliderTab_1 = require("./tabs/SliderTab");
    exports.ThemedBase = Widget_1.ThemedMixin(Widget_1.WidgetBase);
    var Tabs = /** @class */ (function (_super) {
        tslib_1.__extends(Tabs, _super);
        function Tabs() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._activeIndex = 0;
            return _this;
        }
        Tabs.prototype._requestTabChange = function (activeIndex) {
            this._activeIndex = activeIndex;
            this.invalidate();
        };
        Tabs.prototype.render = function () {
            var _a = this.properties, material = _a.material, size = _a.size;
            return Widget_1.w(tab_controller_1.default, {
                material: material,
                //alignButtons: 'left',
                activeIndex: this._activeIndex,
                onRequestTabChange: this._requestTabChange
            }, [
                Widget_1.w(tab_1.default, {
                    key: 'button-tab',
                    label: 'Form Widgets'
                }, [Widget_1.w(BasicFormTab_1.default, { size: size })]),
                Widget_1.w(tab_1.default, {
                    key: 'input-tab',
                    label: 'Text Input'
                }, [Widget_1.w(TextInputTab_1.default, { size: size })]),
                Widget_1.w(tab_1.default, {
                    key: 'text-area-tab',
                    label: 'Text Area'
                }, [Widget_1.w(TextAreaTab_1.default, { size: size })]),
                Widget_1.w(tab_1.default, {
                    key: 'select-tab',
                    label: 'Selects'
                }, [Widget_1.w(SelectTab_1.default, { size: size })]),
                Widget_1.w(tab_1.default, {
                    key: 'progress-tab',
                    label: 'Progress'
                }, [Widget_1.w(ProgressTab_1.default, { size: size })]),
                Widget_1.w(tab_1.default, {
                    key: 'slider-tab',
                    label: 'Slider'
                }, [Widget_1.w(SliderTab_1.default, { size: size })])
            ]);
        };
        return Tabs;
    }(exports.ThemedBase));
    exports.default = Tabs;
});
//# sourceMappingURL=Tabs.js.map