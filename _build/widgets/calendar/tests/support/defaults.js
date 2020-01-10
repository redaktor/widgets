(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../nls/Calendar", "../../../common/nls/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Calendar_1 = require("../../nls/Calendar");
    var common_1 = require("../../../common/nls/common");
    exports.DEFAULT_LABELS = {
        chooseMonth: Calendar_1.default.messages.chooseMonth,
        chooseYear: Calendar_1.default.messages.chooseYear,
        previousMonth: Calendar_1.default.messages.previousMonth,
        nextMonth: Calendar_1.default.messages.nextMonth,
        previousYears: Calendar_1.default.messages.previousYears,
        nextYears: Calendar_1.default.messages.nextYears
    };
    exports.DEFAULT_WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        .map(function (weekday) {
        return {
            short: common_1.default.messages[weekday.slice(0, 3) + 'Short'],
            long: common_1.default.messages[weekday]
        };
    });
    exports.DEFAULT_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        .map(function (month) {
        return {
            short: common_1.default.messages[month.slice(0, 3) + 'Short'],
            long: common_1.default.messages[month]
        };
    });
});
//# sourceMappingURL=defaults.js.map