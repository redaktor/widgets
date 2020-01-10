(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "../../index", "../../../theme/icon.m.css", "../../../common/styles/base.m.css", "../../../common/tests/support/test-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var registerSuite = intern.getInterface('object').registerSuite;
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var css = require("../../../theme/icon.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    var test_helpers_1 = require("../../../common/tests/support/test-helpers");
    var harness = test_helpers_1.createHarness([test_helpers_1.compareAria, test_helpers_1.compareAriaControls]);
    var expected = function (icon, overrides, altText) {
        if (icon === void 0) { icon = 'downIcon'; }
        if (overrides === void 0) { overrides = {}; }
        var children = [
            d_1.v('i', tslib_1.__assign({ classes: [
                    css.icon,
                    css[icon]
                ], 'aria-hidden': 'true' }, overrides))
        ];
        if (altText) {
            children.push(d_1.v('span', { classes: [baseCss.visuallyHidden] }, [altText]));
        }
        return d_1.v('span', { classes: css.root }, children);
    };
    registerSuite('Icon', {
        tests: {
            'renders with default properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    type: 'downIcon'
                }); });
                h.expect(expected);
            },
            'custom properties': function () {
                var h = harness(function () { return d_1.w(index_1.default, {
                    type: 'mailIcon',
                    aria: {
                        hidden: 'false'
                    }
                }); });
                h.expect(function () { return expected('mailIcon', { 'aria-hidden': 'false' }); });
            },
            'alt text': function () {
                var altText = 'Secure something';
                var h = harness(function () { return d_1.w(index_1.default, {
                    type: 'secureIcon',
                    altText: altText
                }); });
                h.expect(function () { return expected('secureIcon', {}, altText); });
            }
        }
    });
});
//# sourceMappingURL=Icon.js.map