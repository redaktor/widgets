(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/testing/harness", "../../index", "../../../theme/progress.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var _a = intern.getInterface('bdd'), describe = _a.describe, it = _a.it;
    var d_1 = require("@dojo/framework/widget-core/d");
    var harness_1 = require("@dojo/framework/testing/harness");
    var index_1 = require("../../index");
    var css = require("../../../theme/progress.m.css");
    var expectedVDom = function (args) {
        var width = args.width, output = args.output, value = args.value, _a = args.showOutput, showOutput = _a === void 0 ? true : _a, _b = args.max, max = _b === void 0 ? 100 : _b, _c = args.min, min = _c === void 0 ? 0 : _c, id = args.id, describedBy = args.describedBy;
        return d_1.v('div', { classes: css.root }, [
            d_1.v('div', tslib_1.__assign({ classes: css.bar, 'aria-valuemax': "" + max, 'aria-valuemin': "" + min, 'aria-valuenow': "" + value, 'aria-valuetext': "" + output, role: 'progressbar', id: id }, (describedBy ? { 'aria-describedby': describedBy } : {})), [
                d_1.v('div', {
                    classes: css.progress,
                    styles: {
                        width: width + "%"
                    }
                })
            ]),
            showOutput ? d_1.v('span', { classes: css.output }, [output]) : null
        ]);
    };
    describe('Progress', function () {
        it('defaults max width to 100', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                value: 50
            }); });
            h.expect(function () { return expectedVDom({ width: 50, output: '50%', value: 50 }); });
        });
        it('accepts a max to calculate width', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                max: 200,
                value: 50
            }); });
            h.expect(function () { return expectedVDom({ width: 25, output: '25%', value: 50, max: 200 }); });
        });
        it('accepts decimal values', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                max: 1,
                value: 0.2
            }); });
            h.expect(function () { return expectedVDom({ width: 20, output: '20%', value: 0.2, max: 1 }); });
        });
        it('accepts a min and max to calculate width', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                min: 100,
                max: 200,
                value: 150
            }); });
            h.expect(function () { return expectedVDom({ width: 50, output: '50%', value: 150, min: 100, max: 200 }); });
        });
        it('accepts an output function', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                value: 50,
                output: function (value, percent) { return value + ", " + percent; }
            }); });
            h.expect(function () { return expectedVDom({ width: 50, output: '50, 50', value: 50 }); });
        });
        it('can hide output', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                value: 50,
                showOutput: false
            }); });
            h.expect(function () { return expectedVDom({ width: 50, value: 50, output: '50%', showOutput: false }); });
        });
        it('can accept an id', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                value: 50,
                widgetId: 'my-id'
            }); });
            h.expect(function () { return expectedVDom({ width: 50, output: '50%', value: 50, id: 'my-id' }); });
        });
        it('accepts aria properties', function () {
            var h = harness_1.default(function () { return d_1.w(index_1.default, {
                value: 50,
                aria: {
                    describedBy: 'foo',
                    valueNow: 'overridden'
                }
            }); });
            h.expect(function () { return expectedVDom({ width: 50, output: '50%', value: 50, describedBy: 'foo' }); });
        });
    });
});
//# sourceMappingURL=Progress.js.map