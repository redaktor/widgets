(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/shim/array", "../../../dojo/core/lang", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../tab/index", "../../tab-controller/index", "../../../dojo/core/async/Task"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var array_1 = require("@dojo/framework/shim/array");
    var lang_1 = require("../../../dojo/core/lang");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../tab/index");
    var index_2 = require("../../tab-controller/index");
    var Task_1 = require("../../../dojo/core/async/Task");
    var refresh;
    function refreshData() {
        return new Task_1.default(function (resolve, reject) {
            setTimeout(resolve, 1500);
        });
    }
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._state = {
                align: index_2.Align.top,
                closedKeys: [],
                loading: false,
                activeIndex: 0
            };
            return _this;
        }
        App.prototype.setState = function (state) {
            this._state = lang_1.deepAssign(this._state, state);
            this.invalidate();
        };
        App.prototype.onAlignChange = function (event) {
            var value = event.target.value;
            var align = index_2.Align.top;
            switch (value) {
                case 'right':
                    align = index_2.Align.right;
                    break;
                case 'bottom':
                    align = index_2.Align.bottom;
                    break;
                case 'left':
                    align = index_2.Align.left;
                    break;
            }
            this.setState({ align: align });
        };
        App.prototype.render = function () {
            var _this = this;
            var _a = this._state, _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, align = _a.align, _c = _a.closedKeys, closedKeys = _c === void 0 ? [] : _c, loading = _a.loading;
            return d_1.v('div', {
                classes: 'example'
            }, [
                d_1.v('select', {
                    styles: { marginBottom: '20px' },
                    onchange: this.onAlignChange
                }, [
                    d_1.v('option', { selected: true, value: 'top' }, ['Top']),
                    d_1.v('option', { value: 'left' }, ['Left']),
                    d_1.v('option', { value: 'right' }, ['Right']),
                    d_1.v('option', { value: 'bottom' }, ['Bottom'])
                ]),
                d_1.w(index_2.default, {
                    activeIndex: activeIndex,
                    alignButtons: align,
                    onRequestTabClose: function (index, key) {
                        _this.setState({ closedKeys: tslib_1.__spread(closedKeys, [key]) });
                    },
                    onRequestTabChange: function (index, key) {
                        refresh && refresh.cancel();
                        if (key === 'async') {
                            _this.setState({
                                activeIndex: 2,
                                loading: true
                            });
                            refresh = refreshData().then(function () {
                                _this.setState({ loading: false });
                            });
                        }
                        else {
                            _this.setState({ activeIndex: index });
                        }
                    }
                }, [
                    d_1.w(index_1.default, {
                        key: 'default',
                        label: 'Default'
                    }, [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in ex pharetra, iaculis turpis eget, tincidunt lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
                    ]),
                    d_1.w(index_1.default, {
                        disabled: true,
                        key: 'disabled',
                        label: 'Disabled'
                    }, [
                        'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
                    ]),
                    d_1.w(index_1.default, {
                        key: 'async',
                        label: 'Async'
                    }, [
                        loading ? 'Loading...' : 'Curabitur id elit a tellus consequat maximus in non lorem. Donec sagittis porta aliquam. Nulla facilisi. Quisque sed mauris justo. Donec eu fringilla urna. Aenean vulputate ipsum imperdiet orci ornare tempor.'
                    ]),
                    !array_1.includes(closedKeys, 'closeable') ? d_1.w(index_1.default, {
                        closeable: true,
                        key: 'closeable',
                        label: 'Closeable'
                    }, [
                        'Nullam congue, massa in egestas sagittis, diam neque rutrum tellus, nec egestas metus tellus vel odio. Vivamus tincidunt quam nisl, sit amet venenatis purus bibendum eget. Phasellus fringilla ex vitae odio hendrerit, non volutpat orci rhoncus.'
                    ]) : null,
                    d_1.w(index_1.default, {
                        key: 'foo',
                        label: 'Foobar'
                    }, [
                        'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
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