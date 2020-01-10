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
        de: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./de'); }) : new Promise(function (resolve_1, reject_1) { require(['./de'], resolve_1, reject_1); }); },
        es: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./es'); }) : new Promise(function (resolve_2, reject_2) { require(['./es'], resolve_2, reject_2); }); },
        fr: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./fr'); }) : new Promise(function (resolve_3, reject_3) { require(['./fr'], resolve_3, reject_3); }); },
        zh: function () { return __syncRequire ? Promise.resolve().then(function () { return require('./zh'); }) : new Promise(function (resolve_4, reject_4) { require(['./zh'], resolve_4, reject_4); }); }
    };
    var provider = {
        id: 'flickr',
        title: 'flickr',
        requestUrl: 'https://www.flickr.com/services/oauth/request_token',
        authUrl: 'https://www.flickr.com/services/oauth/authorize?perms=read',
        accessUrl: 'https://www.flickr.com/services/oauth/access_token',
        me: {
            templates: [
                '{protocol:5}://{www:3.*}flickr.com/photos{/userId,path*}',
                '{protocol:5}://{www:3.*}flickr.com/people{/userId,path*}',
                '{protocol:5}://{www:3.*}flickr.com{/userId*}'
            ],
            target: 'https://www.flickr.com/people/{+userId}'
        },
        verify: {
            set: {
                result: function (provider, oauth) {
                    return (function (res) {
                        console.log('ID', res.data.user_nsid);
                        res.data.userId = res.data.user_nsid;
                        res.data.profileUrl = provider.me.target.replace('{+userId}', res.data.userId);
                        return res;
                    });
                }
            },
            meta: { userId: '/user_nsid' }
        },
        // i18n :
        description: 'The home for all your photos.\nUpload, access, organize, edit, and ' +
            'share your photos from any device, from anywhere in the world.',
        setup: {
            instructions: 'Please note: Open the developer page and click "Create an App", ' +
                'then choose non-commercial or commercial key ...',
            key: 'Key',
            secret: 'Secret',
            url: 'https://www.flickr.com/services/apps/create/'
        },
        svg: '<circle fill="#3E373C" cx="224" cy="224" r="224"/> <circle fill="#FF0084" ' +
            'cx="224" cy="224" r="204"/> <path fill="#FFFFFF" d="M236,226.001C236,201.698,' +
            '255.727,182,280.066,182c24.333,0,44.067,19.699,44.067,44.001c0,24.3-19.734,' +
            '43.999-44.067,43.999C255.727,270,236,250.301,236,226.001z M249.552,226.001c0,' +
            '16.823,13.631,30.461,30.462,30.461c16.817,0,30.463-13.638,30.463-30.461c0-16.818' +
            '-13.646-30.462-30.463-30.462C263.183,195.538,249.552,209.176,249.552,226.001z"/> ' +
            '<circle fill="#116DDA" cx="168" cy="226" r="44"/>'
    };
    exports.default = { locales: locales, provider: provider };
});
//# sourceMappingURL=index.js.map