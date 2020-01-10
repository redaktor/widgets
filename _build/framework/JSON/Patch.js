(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../lang/hasUndefined", "../lang/isEqual", "./PatchError", "./Pointer", "./clone"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var hasUndefined_1 = require("../lang/hasUndefined");
    var isEqual_1 = require("../lang/isEqual");
    var PatchError_1 = require("./PatchError");
    var Pointer_1 = require("./Pointer");
    var clone_1 = require("./clone");
    var PATCH_OPTIONS = {
        validate: true,
        protectRoot: false,
        mutateDocument: false
    };
    var OP;
    (function (OP) {
        OP["add"] = "add";
        OP["remove"] = "remove";
        OP["replace"] = "replace";
        OP["move"] = "move";
        OP["copy"] = "copy";
        OP["test"] = "test";
    })(OP || (OP = {}));
    exports.JSONpatchOP = OP;
    var JSONpatch = /** @class */ (function (_super) {
        tslib_1.__extends(JSONpatch, _super);
        function JSONpatch(root, options) {
            if (root === void 0) { root = {}; }
            if (options === void 0) { options = PATCH_OPTIONS; }
            var _this = _super.call(this, root, tslib_1.__assign({}, PATCH_OPTIONS, options)) || this;
            _this.root = root;
            _this.options = options;
            return _this;
        }
        JSONpatch.prototype.as = function (value, pointer) { return this.set(pointer, value); };
        // JSON PATCH CORE METHODS - TODO DOC
        JSONpatch.prototype.add = function (op) { return this.set(op.path, op.value, false); };
        JSONpatch.prototype.replace = function (op) { return this.set(op.path, op.value); };
        JSONpatch.prototype.remove = function (op) { return _super.prototype.remove.call(this, op.path); };
        JSONpatch.prototype.copy = function (op) { return this.set(op.path, this.get(op.from)); };
        JSONpatch.prototype.move = function (op) {
            _super.prototype.remove.call(this, op.from);
            return this.set(op.path, this.get(op.from));
        };
        JSONpatch.prototype.test = function (op) {
            if (!isEqual_1.default(this.get(op.path), op.value)) {
                throw new PatchError_1.default('TEST_OPERATION_FAILED');
            }
            return this;
        };
        /**
         * Apply a JSON Patch or single JSON Patch Operation on a JSON document.
         * Returns the result of the operation(s).
         * @param patch The patch or operation to apply
         * @param validateOperation `false` is without validation, `true` to use default validation,
         * 	or you can pass a `validateOperation` callback to be used for validation.
         * @param mutateDocument Whether to mutate the original document or clone it before applying
         * @return `result` after the operation
         */
        JSONpatch.prototype.apply = function (patch, validateOperation, mutateDocument) {
            if (validateOperation === void 0) { validateOperation = true; }
            if (mutateDocument === void 0) { mutateDocument = true; }
            if (typeof patch === 'object' && patch.op) {
                patch = [patch];
            }
            if (!Array.isArray(patch)) {
                throw new PatchError_1.default('SEQUENCE_NOT_AN_ARRAY');
            }
            var L = patch.length;
            var isCustomValidate = (typeof validateOperation === 'function');
            var validate;
            if (validateOperation) {
                validate = isCustomValidate ? validateOperation : this.validator.bind(this);
            }
            if (!mutateDocument) {
                this.root = clone_1.default(this.root);
            }
            for (var i = 0; i < L; i++) {
                console.log('do:', patch[i]);
                var valid = !validate || validate(patch[i], i, this.root);
                console.log('valid:', valid);
                valid && this.applyOperation(patch[i], !!validate);
                console.log('->:', this.root);
            }
            return this.root;
        };
        /**
         * Validates a single operation. Called from `jsonpatch.validate`. Throws `PatchError` in case of an error.
         * @param {object} operation - operation object (patch)
         * @param {number} index - index of operation in the sequence
         */
        JSONpatch.prototype.validator = function (o, index, root) {
            var _this = this;
            if (root === void 0) { root = this.root; }
            var patchErr = function (type) { return new PatchError_1.default(type, '', index, o, _this.root); };
            if (typeof o !== 'object' || o === null || Array.isArray(o)) {
                throw patchErr('OPERATION_NOT_AN_OBJECT');
            }
            else if (!OP[o.op]) {
                throw patchErr('OPERATION_OP_INVALID');
            }
            else if (typeof o.path !== 'string' || (o.path.indexOf('/') !== 0 && !!o.path.length)) {
                throw patchErr('OPERATION_PATH_INVALID');
            }
            else if (o.op === OP.add || o.op === OP.replace || o.op === OP.test) {
                if (o.value === undefined) {
                    throw patchErr('OPERATION_VALUE_REQUIRED');
                }
                if (hasUndefined_1.default(o.value)) {
                    throw patchErr('OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED');
                }
            }
            else if (o.op === OP.move || o.op === OP.copy) {
                if (typeof o.from !== 'string') {
                    throw patchErr('OPERATION_FROM_REQUIRED');
                }
                if (!this.has(o.from)) {
                    throw patchErr('OPERATION_FROM_UNRESOLVABLE');
                }
            }
            if (o.op === OP.add) {
                var hasParentObj = (typeof this.get(Pointer_1.parse(o.path).slice(0, -1)) === 'object');
                if (!hasParentObj) {
                    throw patchErr('OPERATION_PATH_CANNOT_ADD');
                }
            }
            else if (o.op === OP.replace || o.op === OP.remove) {
                if (!this.has(o.path)) {
                    throw patchErr('OPERATION_PATH_UNRESOLVABLE');
                }
            }
            return true;
        };
        JSONpatch.prototype.applyOperation = function (o, validateOperation) {
            return this[o.op](o, validateOperation);
        };
        return JSONpatch;
    }(Pointer_1.JSONpointer));
    exports.default = JSONpatch;
});
//# sourceMappingURL=Patch.js.map