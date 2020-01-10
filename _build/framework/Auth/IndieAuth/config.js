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
    /*
      Your baseUrl:
      Must be https (!)
      This is the URL where the main page of IndieAuth is available:
    */
    exports.baseUrl = 'https://redaktor.circinus.uberspace.de/redaktornode/';
    /*
      Verify external providers:
      Allow extra time to follow e.g. SILO-shortened links and for flickr :
    */
    exports.verifyTimeout = 15000;
    /*
      Mail and SMS tokens expire :
    */
    exports.expiration = {
        mail: (5 * 60 * 1000),
        sms: (4 * 60 * 1000)
    };
});
//# sourceMappingURL=config.js.map