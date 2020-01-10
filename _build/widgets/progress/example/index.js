(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../progress/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../progress/index");
    var customOutputMax = 750;
    function customOutput(value, percent) {
        return value + " of " + customOutputMax + " is " + percent + "%";
    }
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            return d_1.v('div', [
                d_1.v('h1', {}, ['Progress Examples']),
                d_1.v('h3', {}, ['Progress with 50% value']),
                d_1.v('div', { id: 'example-1' }, [
                    d_1.w(index_1.default, { value: 50 })
                ]),
                d_1.v('h3', {}, ['Progress with an id']),
                d_1.v('div', { id: 'example-2' }, [
                    d_1.w(index_1.default, { value: 80, widgetId: 'progress-2' })
                ]),
                d_1.v('h3', {}, ['Progress with max']),
                d_1.v('div', { id: 'example-3' }, [
                    d_1.w(index_1.default, { value: 0.3, max: 1 })
                ]),
                d_1.v('h3', {}, ['Progress with custom output']),
                d_1.v('div', { id: 'example-4' }, [
                    d_1.w(index_1.default, {
                        value: 250,
                        max: customOutputMax,
                        output: customOutput
                    })
                ]),
                d_1.v('h3', {}, ['Progress with no output']),
                d_1.v('div', { id: 'example-5' }, [
                    d_1.w(index_1.default, { value: 10, showOutput: false })
                ])
            ]);
        };
        return App;
    }(WidgetBase_1.WidgetBase));
    exports.App = App;
    var Projector = Projector_1.ProjectorMixin(App);
    var projector = new Projector();
    projector.append();
});
//# sourceMappingURL=index.js.map