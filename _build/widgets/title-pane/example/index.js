(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../title-pane/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../title-pane/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._t2Open = true;
            _this._t3Open = false;
            return _this;
        }
        App.prototype.render = function () {
            var _this = this;
            var _a = this, _t2Open = _a._t2Open, _t3Open = _a._t3Open;
            return d_1.v('div', {
                styles: {
                    margin: '20px',
                    maxWidth: '350px'
                }
            }, [
                d_1.v('div', {
                    id: 'titlePane1',
                    styles: { marginBottom: '15px' }
                }, [
                    d_1.w(index_1.default, {
                        headingLevel: 1,
                        closeable: false,
                        key: 'titlePane1',
                        title: 'TitlePanel Widget With closeable=false'
                    }, [
                        d_1.v('div', {
                            innerHTML: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
                        })
                    ])
                ]),
                d_1.v('div', {
                    id: 'titlePane2',
                    styles: { marginBottom: '15px' }
                }, [
                    d_1.w(index_1.default, {
                        headingLevel: 2,
                        key: 'titlePane2',
                        open: _t2Open,
                        title: 'TitlePanel Widget (closeable)',
                        onRequestClose: function () {
                            _this._t2Open = false;
                            _this.invalidate();
                        },
                        onRequestOpen: function () {
                            _this._t2Open = true;
                            _this.invalidate();
                        }
                    }, [
                        d_1.v('div', {
                            innerHTML: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in.\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in.\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
                        })
                    ])
                ]),
                d_1.v('div', { id: 'titlePane3' }, [
                    d_1.w(index_1.default, {
                        key: 'titlePane3',
                        open: _t3Open,
                        title: 'TitlePanel Widget with open=false',
                        onRequestClose: function () {
                            _this._t3Open = false;
                            _this.invalidate();
                        },
                        onRequestOpen: function () {
                            _this._t3Open = true;
                            _this.invalidate();
                        }
                    }, [
                        d_1.v('div', {
                            innerHTML: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
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