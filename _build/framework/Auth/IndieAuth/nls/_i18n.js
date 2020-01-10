(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./common", "./index", "./setup", "./developers", "./faq", "./history", "./CLI", "./auth"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("./common");
    var index_1 = require("./index");
    var setup_1 = require("./setup");
    var developers_1 = require("./developers");
    var faq_1 = require("./faq");
    var history_1 = require("./history");
    var CLI_1 = require("./CLI");
    var auth_1 = require("./auth");
    var nlsBundles = {
        common: common_1.default,
        index: index_1.default,
        setup: setup_1.default,
        developers: developers_1.default,
        faq: faq_1.default,
        history: history_1.default,
        CLI: CLI_1.default,
        auth: auth_1.default
    };
    exports.default = nlsBundles;
});
//# sourceMappingURL=_i18n.js.map