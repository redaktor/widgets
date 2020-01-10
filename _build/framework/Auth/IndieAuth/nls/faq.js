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
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/IndieAuth/nls') + '/faq');
    var locales = ['de'];
    var messages = {
        faq: 'Frequently Asked Questions',
        q1: 'How is this different from OpenID?',
        a1: main_2._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["The goals of OpenID and IndieAuth are similar. Both encourage you to sign in\n    to a website using your own domain name. However, OpenID has failed to gain\n    wide adoption, at least in part due to the complexities of the protocol.\n    IndieAuth is a simpler implementation of a similar goal, by leveraging other\n    OAuth providers and behaviors that people are already accustomed to."], ["The goals of OpenID and IndieAuth are similar. Both encourage you to sign in\n    to a website using your own domain name. However, OpenID has failed to gain\n    wide adoption, at least in part due to the complexities of the protocol.\n    IndieAuth is a simpler implementation of a similar goal, by leveraging other\n    OAuth providers and behaviors that people are already accustomed to."]))),
        q2: 'Can my rel="me" links be hidden on my home page?',
        a2: main_2._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["Yes, your rel=\"me\" links do not need to be visible, but the html does need\n    to be on your home page. You can hide the links with CSS, or include them\n    as &lt;link&gt; tags in your html head."], ["Yes, your rel=\"me\" links do not need to be visible, but the html does need\n    to be on your home page. You can hide the links with CSS, or include them\n    as &lt;link&gt; tags in your html head."]))),
        q3: 'What if a rel="me" link is private?',
        a3: "We are working for a solution with JWT. Stay tuned.",
        q4: 'Does this require users to have their own domain name?',
        a4: main_2._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["Yes, the assumption is that people are willing to\n    <a href=\"http://indiewebcamp.com/why\">own their online identities</a>\n    in the form of a domain name. It is getting easier and easier to host content\n    on your own domain name. See\n    \"<a href=\"http://indiewebcamp.com/Getting_Started\">Getting Started on the Indie Web</a>\"\n    for some suggestions, including mapping your domain to a Tumblr blog, or signing up\n    <a href=\"https://www.uberspace.de\">to be hosted on asteroids</a>\n    or for any other simple web hosting service like\n    <a href=\"http://www.dreamhost.com/r.cgi?426455\">Dreamhost</a>."], ["Yes, the assumption is that people are willing to\n    <a href=\"http://indiewebcamp.com/why\">own their online identities</a>\n    in the form of a domain name. It is getting easier and easier to host content\n    on your own domain name. See\n    \"<a href=\"http://indiewebcamp.com/Getting_Started\">Getting Started on the Indie Web</a>\"\n    for some suggestions, including mapping your domain to a Tumblr blog, or signing up\n    <a href=\"https://www.uberspace.de\">to be hosted on asteroids</a>\n    or for any other simple web hosting service like\n    <a href=\"http://www.dreamhost.com/r.cgi?426455\">Dreamhost</a>."]))),
        q5: 'But doesn\'t this make me dependent on your site, indieauth.com?',
        a5: main_2._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["This service exists for websites to use if they don't want to implement OAuth code\n    for each provider. As a user signing in to the site, you don't need to worry about\n    whether the site is using indieauth.com or some other RelMeAuth service."], ["This service exists for websites to use if they don\\'t want to implement OAuth code\n    for each provider. As a user signing in to the site, you don\\'t need to worry about\n    whether the site is using indieauth.com or some other RelMeAuth service."]))),
        q6: 'What if IndieAuth.com is down?',
        a6: main_2._(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["If an application is using IndieAuth.com as an auth service and IndieAuth.com is down,\n    then logins to that website will not work. However this is just the same as if that site's\n    own internal auth service is down had they implemented it themselves. Because of this\n    potential risk, it is possible that some apps may wish to run their own instance of this\n    software or implement <a href=\"http://indiewebcamp.com/RelMeAuth\">RelMeAuth</a>\n    directly to avoid relying on a third party service."], ["If an application is using IndieAuth.com as an auth service and IndieAuth.com is down,\n    then logins to that website will not work. However this is just the same as if that site\\'s\n    own internal auth service is down had they implemented it themselves. Because of this\n    potential risk, it is possible that some apps may wish to run their own instance of this\n    software or implement <a href=\"http://indiewebcamp.com/RelMeAuth\">RelMeAuth</a>\n    directly to avoid relying on a third party service."]))),
        q7: 'I run an authentication provider, how can I be added to the "supported providers" list?',
        a7: main_2._(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["We gladly welcome new providers! The goal is to support as many as possible so users are not',\n    'reliant on any one in particular. Here is what you need to do to be supported by IndieAuth:"], ["We gladly welcome new providers! The goal is to support as many as possible so users are not',\n    'reliant on any one in particular. Here is what you need to do to be supported by IndieAuth:"]))),
        a7_1: 'Ensure your users have a way to enter their website address in the "profile" section of your website.',
        a7_2: main_2._(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["When displaying the HTML rendering of a user's page, ensure the\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a> attribute is set on the link."], ["When displaying the HTML rendering of a user\\'s page, ensure the\n    <a href=\"http://microformats.org/wiki/rel-me\">rel=\"me\"</a> attribute is set on the link."]))),
        a7_3: 'Write a client to handle authenticating with your API and submit it.',
        a7_4: main_2._(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["Integrate the new provider into the IndieAuth source codes, or just\n    <a href=\"https://github.com/aaronpk/IndieAuth/issues/new\">open an issue</a> with your request."], ["Integrate the new provider into the IndieAuth source codes, or just\n    <a href=\"https://github.com/aaronpk/IndieAuth/issues/new\">open an issue</a> with your request."]))),
        q8: 'Why isn\'t Google+ working?',
        a8: main_2._(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["Google+ profiles lost all the rel=\"me\" attributes on links for personal pages.\n    This was the result of google deprecating the \"classical google plus\" in 2017 ...<br>\n    YouTube is supported."], ["Google+ profiles lost all the rel=\"me\" attributes on links for personal pages.\n    This was the result of google deprecating the \"classical google plus\" in 2017 ...<br>\n    YouTube is supported."]))),
        q9: 'Why does IndieAuth.com need to see my tweets and see who I follow?',
        a9: main_2._(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["IndieAuth.com requests the minimum permissions from each OAuth provider.\n    In some cases providers do not provide a scope that only verifies identity\n    without also giving access to data such as public tweets."], ["IndieAuth.com requests the minimum permissions from each OAuth provider.\n    In some cases providers do not provide a scope that only verifies identity\n    without also giving access to data such as public tweets."])))
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
});
//# sourceMappingURL=faq.js.map