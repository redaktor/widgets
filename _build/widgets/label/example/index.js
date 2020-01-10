(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../label/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../label/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            return d_1.v('div', [
                d_1.v('h1', {}, ['Label Examples']),
                d_1.v('h3', {}, ['Label assigned as string without extra options']),
                d_1.v('div', { id: 'example-1' }, [
                    d_1.w(index_1.default, {}, ['Type Something'])
                ]),
                d_1.v('h3', {}, ['Hidden label']),
                d_1.v('div', { id: 'example-2' }, [
                    d_1.w(index_1.default, { hidden: true }, ['Can\'t read me!'])
                ]),
                d_1.v('h3', {}, ['Label with Input']),
                d_1.v('div', { id: 'example-3' }, [
                    d_1.w(index_1.default, { forId: 'input-1' }, ['Type Something']),
                    d_1.v('input', { id: 'input-1' })
                ]),
                d_1.v('h3', {}, ['Required Label']),
                d_1.v('div', { id: 'example-4' }, [
                    d_1.w(index_1.default, { required: true }, ['I\'m required'])
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