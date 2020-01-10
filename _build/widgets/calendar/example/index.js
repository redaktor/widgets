(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../calendar/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../calendar/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', {}, [
                d_1.w(index_1.default, {
                    month: this._month,
                    selectedDate: this._selectedDate,
                    year: this._year,
                    onMonthChange: function (month) {
                        _this._month = month;
                        _this.invalidate();
                    },
                    onYearChange: function (year) {
                        _this._year = year;
                        _this.invalidate();
                    },
                    onDateSelect: function (date) {
                        _this._selectedDate = date;
                        _this.invalidate();
                    }
                }),
                this._selectedDate ? d_1.v('p', ["Selected Date: " + this._selectedDate.toDateString()]) : null
            ]);
        };
        return App;
    }(WidgetBase_1.WidgetBase));
    exports.App = App;
    var Projector = Projector_1.ProjectorMixin(App);
    var projector = new Projector();
    projector.append();
});
//# sourceMappingURL=index.js.map