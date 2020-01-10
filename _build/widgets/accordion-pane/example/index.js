(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/shim/Set", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/shim/array", "../../accordion-pane/index", "../../title-pane/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var Set_1 = require("@dojo/framework/shim/Set");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var array_1 = require("@dojo/framework/shim/array");
    var index_1 = require("../../accordion-pane/index");
    var index_2 = require("../../title-pane/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._openKeys = new Set_1.Set();
            return _this;
        }
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', { styles: { maxWidth: '350px' } }, [
                d_1.v('h2', ['AccordionPane Examples']),
                d_1.v('div', { id: 'pane' }, [
                    d_1.v('h3', ['Normal AccordionPane']),
                    d_1.w(index_1.default, {
                        onRequestOpen: function (key) {
                            _this._openKeys.add(key);
                            _this.invalidate();
                        },
                        onRequestClose: function (key) {
                            _this._openKeys.delete(key);
                            _this.invalidate();
                        },
                        openKeys: array_1.from(this._openKeys)
                    }, [
                        d_1.w(index_2.default, {
                            title: 'Pane 1',
                            key: 'foo'
                        }, ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales ante sed massa finibus, at euismod ex molestie. Donec sagittis ligula at lorem blandit imperdiet. Aenean sapien justo, blandit at aliquet a, tincidunt ac nulla. Donec quis dapibus est. Donec id massa eu nisl cursus ornare quis sit amet velit.']),
                        d_1.w(index_2.default, {
                            title: 'Pane 2',
                            key: 'bar'
                        }, ['Ut non lectus vitae eros hendrerit pellentesque. In rhoncus ut lectus id tempus. Cras eget mauris scelerisque, condimentum ante sed, vehicula tellus. Donec congue ligula felis, a porta felis aliquet nec. Nulla mi lorem, efficitur nec lectus vehicula, vehicula varius eros.'])
                    ])
                ]),
                d_1.v('div', { id: 'pane2' }, [
                    d_1.v('h3', ['Exclusive AccordionPane']),
                    d_1.w(index_1.default, {
                        onRequestOpen: function (key) {
                            _this._exclusiveKey = key;
                            _this.invalidate();
                        },
                        onRequestClose: function (key) {
                            _this._exclusiveKey = undefined;
                            _this.invalidate();
                        },
                        openKeys: this._exclusiveKey ? [this._exclusiveKey] : []
                    }, [
                        d_1.w(index_2.default, {
                            title: 'Pane 1',
                            key: 'baz'
                        }, ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales ante sed massa finibus, at euismod ex molestie. Donec sagittis ligula at lorem blandit imperdiet. Aenean sapien justo, blandit at aliquet a, tincidunt ac nulla. Donec quis dapibus est. Donec id massa eu nisl cursus ornare quis sit amet velit.']),
                        d_1.w(index_2.default, {
                            title: 'Pane 2',
                            key: 'bax'
                        }, ['Ut non lectus vitae eros hendrerit pellentesque. In rhoncus ut lectus id tempus. Cras eget mauris scelerisque, condimentum ante sed, vehicula tellus. Donec congue ligula felis, a porta felis aliquet nec. Nulla mi lorem, efficitur nec lectus vehicula, vehicula varius eros.'])
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