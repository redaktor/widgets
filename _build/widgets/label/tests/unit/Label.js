(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/testing/harness", "@dojo/framework/widget-core/d", "../../index", "../../../theme/label.m.css", "../../../common/styles/base.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var registerSuite = intern.getInterface('object').registerSuite;
    var harness_1 = require("@dojo/framework/testing/harness");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../index");
    var css = require("../../../theme/label.m.css");
    var baseCss = require("../../../common/styles/base.m.css");
    registerSuite('Label', {
        tests: {
            simple: function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {}, ['baz']); });
                h.expect(function () { return d_1.v('label', {
                    classes: [
                        css.root,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ],
                    for: undefined
                }, [
                    'baz'
                ]); });
            },
            custom: function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    forId: 'foo',
                    aria: {
                        describedBy: 'bar'
                    },
                    disabled: true,
                    focused: true,
                    readOnly: true,
                    required: true,
                    invalid: true,
                    secondary: true
                }, ['baz']); });
                h.expect(function () { return d_1.v('label', {
                    classes: [
                        css.root,
                        css.disabled,
                        css.focused,
                        css.invalid,
                        null,
                        css.readonly,
                        css.required,
                        css.secondary,
                        null
                    ],
                    for: 'foo',
                    'aria-describedby': 'bar'
                }, ['baz']); });
            },
            hidden: function () {
                var h = harness_1.default(function () { return d_1.w(index_1.default, {
                    hidden: true
                }, ['baz']); });
                h.expect(function () { return (d_1.v('label', {
                    classes: [
                        css.root,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        baseCss.visuallyHidden
                    ],
                    for: undefined
                }, ['baz'])); });
            }
        }
    });
});
//# sourceMappingURL=Label.js.map