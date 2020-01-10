(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Themed", "./widgets/common/util", "./widgets/icon", "./widgets/toolbar", "./widgets/container", "./widgets/split-pane", "./demoWidgets/Tabs", "./demoWidgets/Accordion", "./styles/app.m.css", "./widgets/themes/redaktor-default/_color.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Themed_1 = require("@dojo/framework/widget-core/mixins/Themed");
    var util_1 = require("./widgets/common/util");
    var icon_1 = require("./widgets/icon");
    var toolbar_1 = require("./widgets/toolbar");
    var container_1 = require("./widgets/container");
    var split_pane_1 = require("./widgets/split-pane");
    var Tabs_1 = require("./demoWidgets/Tabs");
    var Accordion_1 = require("./demoWidgets/Accordion");
    var css = require("./styles/app.m.css");
    var colorCss = require("./widgets/themes/redaktor-default/_color.m.css");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._paneSize = 360;
            _this._size = 'default';
            _this._material = 'light';
            _this._baselineDebug = false;
            return _this;
        }
        App.prototype._onResize = function (size) {
            this._paneSize = size;
            this.invalidate();
        };
        App.prototype._onSizeClick = function (evt) {
            this._size = evt.target.dataset.size;
            this.invalidate();
        };
        App.prototype._onMaterialClick = function (evt) {
            /*console.log('material', (<any>evt.target).dataset.color);*/
            this._material = evt.target.dataset.color;
            this.invalidate();
        };
        App.prototype._onBaselineClick = function (evt) {
            this._baselineDebug = !this._baselineDebug;
            this.invalidate();
        };
        App.prototype._renderMaterials = function () {
            var _this = this;
            return d_1.v('div', {
                classes: css.colorHolder
            }, Object.keys(util_1.Material).map(function (c) { return d_1.v('div', {
                'data-color': c,
                title: c,
                classes: [css.colorField, colorCss[c + "_material"]],
                style: "background: var(--bg);",
                onclick: _this._onMaterialClick
            }); }));
        };
        App.prototype._renderSizes = function () {
            var _this = this;
            return d_1.v('div', {
                classes: css.sizeHolder
            }, Object.keys(util_1.Size).map(function (s) { return d_1.v('div', {
                'data-size': s,
                title: s,
                classes: [
                    css["size-" + s],
                    s === _this._size ? css.sizeActive : null,
                    css.sizeField
                ],
                onclick: _this._onSizeClick
            }); }));
        };
        App.prototype.render = function () {
            var _a = this.properties, themes = _a.themes, currentTheme = _a.currentTheme, onThemeChange = _a.onThemeChange;
            return [
                d_1.w(container_1.default, {
                    /*extraClasses: {root: css.app},*/
                    material: this._material
                }, [
                    d_1.v('div', { classes: css.toolbarHolder }, [
                        d_1.w(toolbar_1.default, {
                            collapseWidth: 700,
                            heading: 'Widget Showcase'
                        }, [
                            d_1.v('div', {
                                classes: css.debugBaseLineIcon,
                                onclick: this._onBaselineClick
                            }, [
                                d_1.w(icon_1.default, { type: 'barsIcon' })
                            ]),
                            this._renderMaterials(),
                            this._renderSizes()
                        ])
                    ]),
                    d_1.v('div', { classes: css.splitPaneHolder }, [
                        d_1.w(split_pane_1.default, {
                            size: this._paneSize,
                            material: this._material,
                            key: 'split-pane',
                            direction: split_pane_1.default.Direction.column,
                            onResize: this._onResize
                        }, [
                            d_1.w(Accordion_1.default, {
                                themes: themes,
                                currentTheme: currentTheme,
                                onThemeChange: onThemeChange
                            }),
                            d_1.w(Tabs_1.default, {
                                size: this._size
                            })
                        ])
                    ]),
                    d_1.v('div', { classes: this._baselineDebug ? css.debugBaseLine : null })
                ])
            ];
        };
        App = tslib_1.__decorate([
            Themed_1.theme(css)
        ], App);
        return App;
    }(WidgetBase_1.WidgetBase));
    exports.default = App;
});
//# sourceMappingURL=App.js.map