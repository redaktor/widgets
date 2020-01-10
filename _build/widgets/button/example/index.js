(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../button/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../button/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.toggleButton = function () {
            this._buttonPressed = !this._buttonPressed;
            this.invalidate();
        };
        App.prototype.render = function () {
            return d_1.v('div', [
                d_1.v('h2', ['Button Examples']),
                d_1.v('div', { id: 'example-1' }, [
                    d_1.v('p', ['Basic example:']),
                    d_1.w(index_1.default, {
                        key: 'b1'
                    }, ['Basic Button'])
                ]),
                d_1.v('div', { id: 'example-2' }, [
                    d_1.v('p', ['Disabled submit button:']),
                    d_1.w(index_1.default, {
                        key: 'b2',
                        disabled: true,
                        type: 'submit'
                    }, ['Submit'])
                ]),
                d_1.v('div', { id: 'example-3' }, [
                    d_1.v('p', ['Popup button:']),
                    d_1.w(index_1.default, {
                        key: 'b3',
                        popup: { expanded: false, id: 'fakeId' }
                    }, ['Open'])
                ]),
                d_1.v('div', { id: 'example-4' }, [
                    d_1.v('p', ['Toggle Button']),
                    d_1.w(index_1.default, {
                        key: 'b4',
                        pressed: this._buttonPressed,
                        onClick: this.toggleButton
                    }, ['Button state'])
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