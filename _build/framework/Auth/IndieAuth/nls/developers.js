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
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/IndieAuth/nls') + '/developers');
    var locales = ['de'];
    var messages = {
        _okRes: 'An example successful response',
        _errRes: 'An example error response',
        description: 'for developers',
        introHead: 'Using IndieAuth.com to sign users in to your website',
        introLead: 'Create a Web Sign-in form',
        intro: main_2._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["If you are building a website and need to sign people in,\n    you can use IndieAuth.com to handle web sign-in so that you\n    don't have to implement OAuth code for each provider."], ["If you are building a website and need to sign people in,\n    you can use IndieAuth.com to handle web sign-in so that you\n    don\\'t have to implement OAuth code for each provider."]))),
        paramHead: 'Form Parameters',
        paramAction: main_2._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["<b>action</b>: Set the action of the form to your IndieAuth service\n    (you can use <code>https://indieauth.com/auth</code> &mdash; or\n    <a href=\"https://github.com/aaronpk/IndieAuth\">download the source</a>\n    and run your own server)."], ["<b>action</b>: Set the action of the form to your IndieAuth service\n    (you can use <code>https://indieauth.com/auth</code> &mdash; or\n    <a href=\"https://github.com/aaronpk/IndieAuth\">download the source</a>\n    and run your own server)."]))),
        paramMe: '<b>me</b>: The "me" parameter is the URL that the user enters',
        paramClientId: main_2._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["<b>client_id</b>: Set the client_id in a hidden field to let us know\n    the home page of the application the user is signing in to"], ["<b>client_id</b>: Set the client_id in a hidden field to let us know\n    the home page of the application the user is signing in to"]))),
        paramRedirectUri: main_2._(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["<b>redirect_uri</b>: Set the redirect_uri in a hidden field to\n    let us know where to redirect back to after authentication is complete"], ["<b>redirect_uri</b>: Set the redirect_uri in a hidden field to\n    let us know where to redirect back to after authentication is complete"]))),
        lead1: 'The user logs in with their domain',
        text1: main_2._(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["After the user enters their domain in the sign-in form and submits,\n    IndieAuth goes and scans their domain looking for rel=\"me\" links\n    from providers it knows about\n    (see <a href=\"./index.html#providers\">Supported Providers</a> above).\n    It also verifies that the third-party website links back\n    to the user's domain with a rel=\"me\" link as well."], ["After the user enters their domain in the sign-in form and submits,\n    IndieAuth goes and scans their domain looking for rel=\"me\" links\n    from providers it knows about\n    (see <a href=\"./index.html#providers\">Supported Providers</a> above).\n    It also verifies that the third-party website links back\n    to the user\\'s domain with a rel=\"me\" link as well."]))),
        lead2: 'The user is redirected back to your site',
        text2: main_2._(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["If everything is successful, the user will be redirected back to the redirect_uri\n    you specified in the form. There will be a token in the query string parameter"], ["If everything is successful, the user will be redirected back to the redirect_uri\n    you specified in the form. There will be a token in the query string parameter"]))),
        lead3: 'Verify the authorization code with indieauth.com',
        text3: main_2._(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["At this point you need to verify the code which will also return the domain\n    name of the authenticated user. Make a POST request to indieauth.com/auth\n    with the code and all the original parameters of the request, and you will\n    get back the domain name of the authenticated user."], ["At this point you need to verify the code which will also return the domain\n    name of the authenticated user. Make a POST request to indieauth.com/auth\n    with the code and all the original parameters of the request, and you will\n    get back the domain name of the authenticated user."]))),
        lead4: 'Done!',
        text4: main_2._(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["Finally you know the domain belonging to the authenticated user.\n    You can store the domain secure session and log the user in with their\n    domain name identity. You don't need to worry about whether they\n    authenticated with Google, Twitter or Github, their identity is their\n    domain name! You won't have to worry about merging duplicate accounts\n    or handling error cases when Twitter is offline."], ["Finally you know the domain belonging to the authenticated user.\n    You can store the domain secure session and log the user in with their\n    domain name identity. You don\\'t need to worry about whether they\n    authenticated with Google, Twitter or Github, their identity is their\n    domain name! You won\\'t have to worry about merging duplicate accounts\n    or handling error cases when Twitter is offline."])))
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
});
//# sourceMappingURL=developers.js.map