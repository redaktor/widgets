(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../util", "@dojo/framework/i18n", "./authProviders/flickr"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require("../util");
    var i18n_1 = require("@dojo/framework/i18n");
    var flickr_1 = require("./authProviders/flickr");
    i18n_1.default(flickr_1.default, 'de').then(function (locales) {
        console.log(locales);
    }, function (e) {
        util_1.dumpError(e);
    });
});
//# sourceMappingURL=testInt.js.map