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
    var provider = {
        description: '一個地方，存放你的所有相片。\n隨時隨地都可以使用任何裝置上傳、存取、整理、編輯及分享你的相片。',
        setup: {
            instructions: 'Please note: Open the developer page and create your credentials...',
            key: 'Client-ID',
            secret: 'Clientkey'
        }
    };
    exports.default = provider;
});
//# sourceMappingURL=index.js.map