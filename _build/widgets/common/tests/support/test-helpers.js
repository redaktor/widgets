(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/testing/harness"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var harness_1 = require("@dojo/framework/testing/harness");
    exports.noop = function () { };
    exports.stubEvent = {
        stopPropagation: exports.noop,
        preventDefault: exports.noop,
        target: {}
    };
    exports.isStringComparator = function (value) { return typeof value === 'string'; };
    exports.isStringObjectComparator = function (value) { return Object.keys(value).every(function (key) { return typeof value[key] === 'string'; }); };
    exports.compareId = {
        selector: '*',
        property: 'id',
        comparator: exports.isStringComparator
    };
    exports.compareForId = {
        selector: '*',
        property: 'forId',
        comparator: exports.isStringComparator
    };
    exports.compareAria = {
        selector: '*',
        property: 'aria',
        comparator: exports.isStringObjectComparator
    };
    exports.compareAriaControls = {
        selector: '*',
        property: 'aria-controls',
        comparator: exports.isStringComparator
    };
    exports.compareAriaLabelledBy = {
        selector: '*',
        property: 'aria-labelledby',
        comparator: exports.isStringComparator
    };
    exports.compareLabelId = {
        selector: '*',
        property: 'labelId',
        comparator: function (property) { return typeof property === 'string'; }
    };
    exports.createHarness = function (globalCompares) {
        return function (renderFunction, compares) {
            if (compares === void 0) { compares = []; }
            return harness_1.harness(renderFunction, tslib_1.__spread(globalCompares, compares));
        };
    };
    function MockMetaMixin(Base, mockStub) {
        return /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.meta = function (MetaType) {
                return mockStub(MetaType);
            };
            return class_1;
        }(Base));
    }
    exports.MockMetaMixin = MockMetaMixin;
});
//# sourceMappingURL=test-helpers.js.map