(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    exports.PATCH_ERROR = {
        SEQUENCE_NOT_AN_ARRAY: "Patch sequence must be an array",
        OPERATION_NOT_AN_OBJECT: "Operation is not an object",
        OPERATION_OP_INVALID: "Operation 'op' property is not defined in RFC 6902",
        OPERATION_PATH_INVALID: "Operation 'path' property is not a string starting with \"/\"",
        OPERATION_FROM_REQUIRED: "Operation 'from' property is not present\n\t\t(applicable in 'move' and 'copy' operations)",
        OPERATION_VALUE_REQUIRED: "Operation 'value' property is not present\n\t\t(applicable in 'add', 'replace' and 'test' operations)",
        OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED: "Operation 'value' cannot contain undefined values",
        OPERATION_PATH_CANNOT_ADD: "Cannot perform an 'add' operation at the desired path",
        OPERATION_PATH_UNRESOLVABLE: "Cannot perform the operation at a path that does not exist",
        OPERATION_FROM_UNRESOLVABLE: "Cannot perform the operation from a path that does not exist",
        OPERATION_PATH_ILLEGAL_ARRAY_INDEX: "Expected an unsigned base-10 integer value,\n\t\tmaking the new referenced value the array element with the zero-based index",
        OPERATION_VALUE_OUT_OF_BOUNDS: "The specified index MUST NOT be greater than\n\t\tthe number of elements in the array",
        TEST_OPERATION_FAILED: "Test operation failed"
    };
    var PatchError = /** @class */ (function (_super) {
        tslib_1.__extends(PatchError, _super);
        function PatchError(name, message, index, operation, tree) {
            if (message === void 0) { message = ''; }
            if (index === void 0) { index = 0; }
            if (operation === void 0) { operation = {}; }
            var _this = _super.call(this, message || exports.PATCH_ERROR[name] + " - " + index + ": " + JSON.stringify(operation)) || this;
            _this.name = name;
            _this.message = message;
            _this.index = index;
            _this.operation = operation;
            _this.tree = tree;
            return _this;
        }
        return PatchError;
    }(Error));
    exports.default = PatchError;
});
//# sourceMappingURL=PatchError.js.map