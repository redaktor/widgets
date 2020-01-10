(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/widget-core/meta/Focus", "../themes/redaktor-default/calendar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var css = require("../themes/redaktor-default/calendar.m.css");
    var CalendarCellBase = /** @class */ (function (_super) {
        tslib_1.__extends(CalendarCellBase, _super);
        function CalendarCellBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CalendarCellBase.prototype._onClick = function (event) {
            event.stopPropagation();
            var _a = this.properties, date = _a.date, _b = _a.disabled, disabled = _b === void 0 ? false : _b, onClick = _a.onClick;
            onClick && onClick(date, disabled);
        };
        CalendarCellBase.prototype._onKeyDown = function (event) {
            event.stopPropagation();
            var onKeyDown = this.properties.onKeyDown;
            onKeyDown && onKeyDown(event, function () { event.preventDefault(); });
        };
        CalendarCellBase.prototype.formatDate = function (date) {
            return Widget_1.v('span', ["" + date]);
        };
        CalendarCellBase.prototype.getModifierClasses = function () {
            var _a = this.properties, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.selected, selected = _c === void 0 ? false : _c, _d = _a.today, today = _d === void 0 ? false : _d;
            return [
                disabled ? css.inactiveDate : null,
                selected ? css.selectedDate : null,
                today ? css.todayDate : null
            ];
        };
        CalendarCellBase.prototype.render = function () {
            var _a = this.properties, callFocus = _a.callFocus, date = _a.date, _b = _a.focusable, focusable = _b === void 0 ? false : _b, _c = _a.selected, selected = _c === void 0 ? false : _c, onFocusCalled = _a.onFocusCalled;
            if (callFocus) {
                this.meta(Focus_1.default).set('root');
                onFocusCalled && onFocusCalled();
            }
            return Widget_1.v('td', {
                key: 'root',
                role: 'gridcell',
                'aria-selected': "" + selected,
                tabIndex: focusable ? 0 : -1,
                classes: this.theme(tslib_1.__spread([css.date], this.getModifierClasses())),
                onclick: this._onClick,
                onkeydown: this._onKeyDown
            }, [this.formatDate(date)]);
        };
        CalendarCellBase = tslib_1.__decorate([
            Widget_1.theme(css)
        ], CalendarCellBase);
        return CalendarCellBase;
    }(Widget_1.ThemedBase));
    exports.CalendarCellBase = CalendarCellBase;
    var CalendarCell = /** @class */ (function (_super) {
        tslib_1.__extends(CalendarCell, _super);
        function CalendarCell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CalendarCell;
    }(CalendarCellBase));
    exports.default = CalendarCell;
});
//# sourceMappingURL=CalendarCell.js.map