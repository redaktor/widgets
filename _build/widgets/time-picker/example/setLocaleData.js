(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/i18n/cldr/load", "@dojo/framework/i18n/i18n"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var load_1 = require("@dojo/framework/i18n/cldr/load");
    var i18n_1 = require("@dojo/framework/i18n/i18n");
    // The following is the minimum CLDR data required to render 12-hour time in English.
    var cldrData = {
        supplemental: {
            likelySubtags: { en: 'en-Latn-US' }
        },
        main: {
            en: {
                numbers: {
                    defaultNumberingSystem: 'latn',
                    'symbols-numberSystem-latn': {
                        decimal: '.',
                        group: ',',
                        percentSign: '%',
                        plusSign: '+',
                        minusSign: '-',
                        exponential: 'E',
                        perMille: '‰',
                        infinity: '∞',
                        nan: 'NaN',
                        timeSeparator: ':'
                    }
                },
                dates: {
                    calendars: {
                        gregorian: {
                            dayPeriods: {
                                format: {
                                    wide: {
                                        am: 'AM',
                                        pm: 'PM'
                                    }
                                }
                            },
                            timeFormats: {
                                short: 'h:mm a'
                            }
                        }
                    }
                }
            }
        }
    };
    function setLocaleData() {
        load_1.default(cldrData);
        i18n_1.switchLocale('en');
    }
    exports.default = setLocaleData;
});
//# sourceMappingURL=setLocaleData.js.map