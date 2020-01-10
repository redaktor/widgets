(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../../dojo/core/lang", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Dimensions", "../../split-pane/index", "../../global-event/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var lang_1 = require("../../../dojo/core/lang");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Dimensions_1 = require("@dojo/framework/widget-core/meta/Dimensions");
    var index_1 = require("../../split-pane/index");
    var index_2 = require("../../global-event/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            _this._direction = index_1.Direction.column;
            _this._collapseWidth = 600;
            _this._onResize = function () {
                _this.invalidate();
            };
            return _this;
        }
        App.prototype.setState = function (state) {
            this.state = lang_1.deepAssign(this.state, state);
            this.invalidate();
        };
        App.prototype._changeToRow = function () {
            this._direction = this._direction === index_1.Direction.row ? index_1.Direction.column : index_1.Direction.row;
            this.invalidate();
        };
        App.prototype._changeCollapseWidth = function () {
            this._collapseWidth = this._collapseWidth === 600 ? 350 : 600;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            var containerStyles = {
                width: '100%',
                height: '500px',
                maxWidth: '1000px',
                border: '1px solid rgba(170, 170, 170, 0.5)'
            };
            var width = this.meta(Dimensions_1.Dimensions).get('example-column').size.width;
            return d_1.v('div', {
                styles: {
                    padding: '50px'
                }
            }, [
                d_1.w(index_2.default, { key: 'global', window: { resize: this._onResize } }),
                d_1.v('h1', ['SplitPane Examples']),
                d_1.v('h3', ['Column']),
                d_1.v('div', { styles: { marginBottom: '10px' } }, [
                    d_1.v('div', { styles: { marginBottom: '5px' } }, ["Current Collapse Width: " + this._collapseWidth]),
                    d_1.v('div', { styles: { marginBottom: '5px' } }, ["Current Size: " + width]),
                    d_1.v('button', { onclick: this._changeToRow }, ['Change to row']),
                    d_1.v('button', { onclick: this._changeCollapseWidth }, ["Change collapse width to " + (this._collapseWidth === 600 ? '350' : '600')])
                ]),
                d_1.v('div', {
                    key: 'example-column',
                    id: 'example-column',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'column',
                        collapseWidth: this._collapseWidth,
                        direction: this._direction,
                        onResize: function (size) {
                            _this.setState({ columnSize: size });
                        },
                        size: this.state.columnSize
                    }, [d_1.v('div', ['left']), d_1.v('div', ['right'])])
                ]),
                d_1.v('h3', ['Row']),
                d_1.v('div', {
                    id: 'example-row',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'row',
                        direction: index_1.Direction.row,
                        onResize: function (size) {
                            _this.setState({ rowSize: size });
                        },
                        size: this.state.rowSize
                    })
                ]),
                d_1.v('h3', ['Nested']),
                d_1.v('div', {
                    id: 'example-nested',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'nested',
                        direction: index_1.Direction.column,
                        onResize: function (size) {
                            _this.setState({ nestedSizeA: size });
                        },
                        size: this.state.nestedSizeA
                    }, [
                        d_1.v('div'),
                        d_1.w(index_1.default, {
                            direction: index_1.Direction.row,
                            onResize: function (size) {
                                _this.setState({ nestedSizeB: size });
                            },
                            size: this.state.nestedSizeB
                        })
                    ])
                ]),
                d_1.v('h3', ['Multiple vertical nested']),
                d_1.v('div', {
                    id: 'example-vertical-nested',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'verticalNested',
                        direction: index_1.Direction.column,
                        onResize: function (size) {
                            _this.setState({ nestedSizeC: size });
                        },
                        size: this.state.nestedSizeC
                    }, [
                        d_1.v('div'),
                        d_1.w(index_1.default, {
                            direction: index_1.Direction.column,
                            onResize: function (size) {
                                _this.setState({ nestedSizeD: size });
                            },
                            size: this.state.nestedSizeD
                        })
                    ])
                ]),
                d_1.v('h3', ['Multiple horizontal nested']),
                d_1.v('div', {
                    id: 'example-horizontal-nested',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'horizontalNested',
                        direction: index_1.Direction.row,
                        onResize: function (size) {
                            _this.setState({ nestedSizeE: size });
                        },
                        size: this.state.nestedSizeE
                    }, [
                        d_1.v('div'),
                        d_1.w(index_1.default, {
                            direction: index_1.Direction.row,
                            onResize: function (size) {
                                _this.setState({ nestedSizeF: size });
                            },
                            size: this.state.nestedSizeF
                        })
                    ])
                ]),
                d_1.v('h3', ['Maximum size']),
                d_1.v('div', {
                    id: 'example-max',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'maxSize',
                        direction: index_1.Direction.column,
                        onResize: function (size) {
                            size = size > 300 ? 300 : size;
                            _this.setState({ maxSize: size });
                        },
                        size: this.state.maxSize
                    })
                ]),
                d_1.v('h3', ['Minimum size']),
                d_1.v('div', {
                    id: 'example-min',
                    styles: containerStyles
                }, [
                    d_1.w(index_1.default, {
                        key: 'minSize',
                        direction: index_1.Direction.column,
                        onResize: function (size) {
                            size = size < 100 ? 100 : size;
                            _this.setState({ minSize: size });
                        },
                        size: this.state.minSize
                    })
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