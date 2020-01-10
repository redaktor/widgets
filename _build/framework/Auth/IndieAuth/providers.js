(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../authProviders/authorization_endpoint", "../authProviders/askubuntu", "../authProviders/flickr", "../authProviders/github", "../authProviders/gpg", "../authProviders/instagram", "../authProviders/mail", "../authProviders/stackexchange", "../authProviders/stackoverflow", "../authProviders/superuser", "../authProviders/twitter", "../authProviders/youtube"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var authorization_endpoint_1 = require("../authProviders/authorization_endpoint");
    var askubuntu_1 = require("../authProviders/askubuntu");
    var flickr_1 = require("../authProviders/flickr");
    var github_1 = require("../authProviders/github");
    var gpg_1 = require("../authProviders/gpg");
    /* import google from '../authProviders/google'; */
    var instagram_1 = require("../authProviders/instagram");
    var mail_1 = require("../authProviders/mail");
    /* import sms from '../authProviders/sms'; */
    var stackexchange_1 = require("../authProviders/stackexchange");
    var stackoverflow_1 = require("../authProviders/stackoverflow");
    var superuser_1 = require("../authProviders/superuser");
    var twitter_1 = require("../authProviders/twitter");
    var youtube_1 = require("../authProviders/youtube");
    /* TODO TS +
      DOC Providers
    
    please note : google deprecated original google plus idea on 24th Jan 2017
    It is currently not possible to use google
    */
    var indieAuthProviders = {
        authorization_endpoint: authorization_endpoint_1.default,
        askubuntu: askubuntu_1.default,
        flickr: flickr_1.default,
        github: github_1.default,
        /* google: google, */
        instagram: instagram_1.default,
        mail: mail_1.default,
        pgpkey: gpg_1.default,
        /* sms: sms, */
        stackexchange: stackexchange_1.default,
        stackoverflow: stackoverflow_1.default,
        superuser: superuser_1.default,
        twitter: twitter_1.default,
        youtube: youtube_1.default
    };
    exports.default = indieAuthProviders;
});
//# sourceMappingURL=providers.js.map