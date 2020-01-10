(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var locales = {};
    var messages = {
        sunShort: 'Sun',
        monShort: 'Mon',
        tueShort: 'Tue',
        wedShort: 'Wed',
        thuShort: 'Thu',
        friShort: 'Fri',
        satShort: 'Sat',
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        janShort: 'Jan',
        febShort: 'Feb',
        marShort: 'Mar',
        aprShort: 'Apr',
        mayShort: 'May',
        junShort: 'Jun',
        julShort: 'Jul',
        augShort: 'Aug',
        sepShort: 'Sep',
        octShort: 'Oct',
        novShort: 'Nov',
        decShort: 'Dec',
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
        clear: 'clear',
        close: 'close',
        open: 'open'
    };
    exports.default = { locales: locales, messages: messages };
});
//# sourceMappingURL=common.js.map