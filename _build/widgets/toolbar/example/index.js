(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../toolbar/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../toolbar/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.onAttach = function () {
            var style = document.createElement('style');
            document.head.appendChild(style);
            var sheet = style.sheet;
            sheet.insertRule('#module-select { position: absolute; left: 0; top: 200px; } ');
        };
        App.prototype.render = function () {
            return d_1.v('div', [
                d_1.w(index_1.default, {
                    collapseWidth: 700,
                    heading: 'Foobar'
                }, [
                    d_1.v('a', { href: '/#home' }, ['Home']),
                    d_1.v('a', { href: '/#about' }, ['About']),
                    d_1.v('a', { href: '/#contact' }, ['Contact'])
                ]),
                d_1.v('h2', ['Toolbar Examples'])
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