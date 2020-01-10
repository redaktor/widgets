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
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var locales = {
        de: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./de'); }) : new Promise(function (resolve_1, reject_1) { require(['./de'], resolve_1, reject_1); }); }
    };
    var provider = {
        id: 'authorization_endpoint',
        title: 'Personal authorization endpoint',
        // i18n :
        description: 'Your personal Authorization Endpoint.',
        setup: {
            instructions: 'Please note: Open the developer page',
            key: '',
            secret: '',
            url: 'https://indieweb.org/authorization-endpoint'
        },
        svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#95cc0d" cx="224" cy="224" r="204"/>' +
            '<g><rect x="128.163" y="121.529" fill="#FF0000" width="191.674" height="53.65"/>' +
            '<rect x="128.163" y="194.753" fill="#FF0000" width="191.674" height="116.747"/></g>'
    };
    exports.default = { locales: locales, provider: provider };
});
//# sourceMappingURL=index.js.map