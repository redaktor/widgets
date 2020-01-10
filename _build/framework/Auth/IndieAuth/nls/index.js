(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/main", "../../../util/string/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var main_1 = require("@dojo/framework/has/main");
    var main_2 = require("../../../util/string/main");
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/IndieAuth/nls') + '/index');
    var locales = ['de'];
    var messages = {
        slogan: 'Be just &ldquo;you&rdquo;.',
        providers: 'Providers',
        what: 'What is IndieAuth?',
        whatText: main_2._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["IndieAuth is a way to <b>use your own domain name</b> to sign in to websites.<br />\n    It works by linking your website to one or more authentication providers such as\n    Twitter or GitHub, then entering your domain name in the login form on websites\n    that support IndieAuth."], ["IndieAuth is a way to <b>use your own domain name</b> to sign in to websites.<br />\n    It works by linking your website to one or more authentication providers such as\n    Twitter or GitHub, then entering your domain name in the login form on websites\n    that support IndieAuth."]))),
        why: 'Why IndieAuth?',
        whyText: main_2._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["IndieAuth is part of the <a href=\"http://indiewebcamp.com/why\">IndieWeb movement</a>\n    to take back control of your online identity. Instead of logging in to websites as\n    &ldquo;you on Twitter&rdquo; or &ldquo;you on Facebook&rdquo;,\n    you should be able to log in as just &ldquo;you&rdquo;.<br><br>\n    We should not be relying on <a href=\"https://indieweb.org/silo\">SILOs</a> to provide\n    our authenticated identities, we should be able to use our own domain names to log in to\n    sites everywhere."], ["IndieAuth is part of the <a href=\"http://indiewebcamp.com/why\">IndieWeb movement</a>\n    to take back control of your online identity. Instead of logging in to websites as\n    &ldquo;you on Twitter&rdquo; or &ldquo;you on Facebook&rdquo;,\n    you should be able to log in as just &ldquo;you&rdquo;.<br><br>\n    We should not be relying on <a href=\"https://indieweb.org/silo\">SILOs</a> to provide\n    our authenticated identities, we should be able to use our own domain names to log in to\n    sites everywhere."]))),
        how: 'How to Set Up IndieAuth?',
        how1: main_2._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["Add links on your home page to your social profiles<br>with the attribute\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a>."], ["Add links on your home page to your social profiles<br>with the attribute\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a>."]))),
        how2: 'Ensure your profiles link back to your home page.',
        howLabel: 'Full setup instructions',
        join: 'Join Us!',
        attend: 'Attend an',
        eventN: 'event nearby',
        join1: 'Add yourself to the IndieWebCamp Guest List<br>after signing in with your own domain',
        join2: 'Add your own IndieWeb projects to the Project List'
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
    var templateObject_1, templateObject_2, templateObject_3;
});
//# sourceMappingURL=index.js.map