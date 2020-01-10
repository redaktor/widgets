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
    var bundlePath = ((main_1.default('host-node') ? __dirname : 'src/Auth/IndieAuth/nls') + '/setup');
    var locales = ['de'];
    var messages = {
        _generateHcard: 'Generate your h-card',
        description: 'Documentation',
        lead1: 'Link to your various social profiles on your home page',
        text1: main_2._(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["On your home page, link to your profiles and add the <code>rel=\"me\"</code>\n    attribute to the links.<br>This may look something like the following:"], ["On your home page, link to your profiles and add the <code>rel=\"me\"</code>\n    attribute to the links.<br>This may look something like the following:"]))),
        text1_2: main_2._(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["If you don't want visible links on your home page, you can instead use\n    <code>&lt;link&gt;</code> tags<br>in your html header."], ["If you don\\'t want visible links on your home page, you can instead use\n    <code>&lt;link&gt;</code> tags<br>in your html header."]))),
        lead2: 'On each service, ensure there is a link back to you',
        text2: main_2._(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["You'll need to verify that each service has a link back to your home page.<br>\n    For convenience the \"edit profile\" links for some supported services are below."], ["You\\'ll need to verify that each service has a link back to your home page.<br>\n    For convenience the \"edit profile\" links for some supported services are below."]))),
        lead3: 'You\'re done!',
        text3: 'That\'s it!<br>Now you can use your domain to sign in to any sites that support IndieAuth!'
    };
    exports.default = { bundlePath: bundlePath, locales: locales, messages: messages };
    var templateObject_1, templateObject_2, templateObject_3;
});
//# sourceMappingURL=setup.js.map