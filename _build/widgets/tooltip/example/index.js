(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/shim/Set", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../button/index", "../../text-input/index", "../../tooltip/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var Set_1 = require("@dojo/framework/shim/Set");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../button/index");
    var index_2 = require("../../text-input/index");
    var index_3 = require("../../tooltip/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._open = new Set_1.Set();
            return _this;
        }
        App.prototype.onShow = function (key) {
            this._open.add(key);
            this.invalidate();
        };
        App.prototype.onHide = function (key) {
            this._open.delete(key);
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.v('h2', ['Tooltip Examples']),
                d_1.v('div', { id: 'example-1' }, [
                    d_1.w(index_3.default, {
                        key: 'foo',
                        content: 'This is a right-oriented tooltip that opens and closes based on child click.',
                        orientation: index_3.Orientation.right,
                        open: this._open.has('foo')
                    }, [
                        d_1.w(index_1.default, {
                            onClick: function () {
                                var exists = _this._open.has('foo');
                                exists ? _this.onHide('foo') : _this.onShow('foo');
                            }
                        }, ['Click me'])
                    ])
                ]),
                d_1.v('div', { id: 'example-2' }, [
                    d_1.w(index_3.default, {
                        key: 'bar',
                        content: 'This is a right-oriented tooltip that opens and closes based on child focus.',
                        orientation: index_3.Orientation.right,
                        open: this._open.has('bar')
                    }, [
                        d_1.w(index_2.default, {
                            placeholder: 'Focus me',
                            onFocus: function () { _this.onShow('bar'); },
                            onBlur: function () { _this.onHide('bar'); }
                        })
                    ])
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