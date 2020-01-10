(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/decorator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var decorator_1 = require("../core/decorator");
    exports.schemaMin = { "type": "object", "properties": { "_constructor": { "$ref": "#/definitions/constructor1" } }, "additionalProperties": false, "definitions": { "constructor1": { "type": "object", "properties": { "0": { "title": "name" }, "1": { "title": "message", "type": "string" }, "2": { "title": "index", "type": "number" }, "3": { "title": "operation" }, "4": { "title": "tree" } }, "additionalProperties": false, "required": ["0"] } }, "$schema": "http://json-schema.org/draft-07/schema#" };
    exports.initializers = {};
    exports.default = decorator_1.default(exports.schemaMin, exports.initializers);
});
//# sourceMappingURL=PatchError.r.js.map