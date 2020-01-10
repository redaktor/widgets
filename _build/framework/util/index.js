(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./formats", "./is", "./to", "./log", "./lang", "./array/main", "./string/main", "./promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var formats_1 = require("./formats");
    exports.TYPES = formats_1.TYPES;
    exports.TYPEMAP = formats_1.TYPEMAP;
    exports.TYPETREE = formats_1.TYPETREE;
    exports.SCHEMATYPES = formats_1.SCHEMATYPES;
    var is_1 = require("./is");
    exports.is = is_1.is;
    exports.isAn = is_1.isAn;
    var to_1 = require("./to");
    exports.to = to_1.to;
    var log_1 = require("./log");
    exports.log = log_1.log;
    exports.pwLog = log_1.pwLog;
    exports.dumpError = log_1.dumpError;
    exports.syntaxLog = log_1.syntaxLog;
    exports.syntaxHighlight = log_1.syntaxHighlight;
    exports.strColor = log_1.strColor;
    var lang_1 = require("./lang");
    exports.applyMixins = lang_1.applyMixins;
    exports.functor = lang_1.functor;
    exports.getDottedProperty = lang_1.getDottedProperty;
    exports.getProperty = lang_1.getProperty;
    exports.exists = lang_1.exists;
    exports.copy = lang_1.copy;
    exports.arrToObjByKey = lang_1.arrToObjByKey;
    exports.byteLength = lang_1.byteLength;
    exports.escapeRegExp = lang_1.escapeRegExp;
    exports.hash = lang_1.hash;
    var main_1 = require("./array/main");
    exports.flatten = main_1.flatten;
    exports.toTree = main_1.toTree;
    exports.hasL = main_1.hasL; /* TODO FIXME - naming */
    var main_2 = require("./string/main");
    exports.truncate = main_2.truncate;
    var promise_1 = require("./promise");
    exports.objectPromiseAll = promise_1.objectPromiseAll;
});
//# sourceMappingURL=index.js.map