(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            return d_1.v('div', [
                d_1.v('h2', {
                    innerHTML: 'Icon Examples'
                }),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'downIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'leftIcon', altText: 'alt text' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'rightIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'closeIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'plusIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'minusIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'checkIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'upIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'upAltIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'downAltIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'searchIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'barsIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'settingsIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'alertIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'helpIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'infoIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'phoneIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'editIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'dateIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'linkIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'locationIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'secureIcon' })
                ]),
                d_1.v('div', {}, [
                    d_1.w(index_1.default, { type: 'mailIcon' })
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