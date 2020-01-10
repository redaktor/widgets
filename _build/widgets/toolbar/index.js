(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/nls/common", "../global-event/index", "@dojo/framework/widget-core/mixins/I18n", "../icon/index", "../slide-pane/index", "./styles/toolbar.m.css", "../themes/redaktor-default/toolbar.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var common_1 = require("../common/nls/common");
    var index_1 = require("../global-event/index");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var index_2 = require("../icon/index");
    var index_3 = require("../slide-pane/index");
    var fixedCss = require("./styles/toolbar.m.css");
    var css = require("../themes/redaktor-default/toolbar.m.css");
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.ThemedBase);
    var ToolbarBase = /** @class */ (function (_super) {
        tslib_1.__extends(ToolbarBase, _super);
        function ToolbarBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._collapsed = false;
            _this._open = false;
            _this._collapseIfNecessary = function () {
                var _a = _this.properties, _b = _a.collapseWidth, collapseWidth = _b === void 0 ? 800 : _b, onCollapse = _a.onCollapse;
                var width = _this.meta(Widget_1.Dimensions).get('root').size.width;
                if (width > collapseWidth && _this._collapsed === true) {
                    _this._collapsed = false;
                    onCollapse && onCollapse(_this._collapsed);
                    _this.invalidate();
                }
                else if (width <= collapseWidth && _this._collapsed === false) {
                    _this._collapsed = true;
                    onCollapse && onCollapse(_this._collapsed);
                    _this.invalidate();
                }
            };
            return _this;
        }
        ToolbarBase.prototype._closeMenu = function () {
            this._open = false;
            this.invalidate();
        };
        ToolbarBase.prototype._toggleMenu = function (event) {
            event.stopPropagation();
            this._open = !this._open;
            this.invalidate();
        };
        ToolbarBase.prototype.onAttach = function () {
            this._collapseIfNecessary();
        };
        ToolbarBase.prototype.renderActions = function () {
            var close = this.localizeBundle(common_1.default).messages.close;
            var _a = this.properties, theme = _a.theme, heading = _a.heading;
            return this._collapsed ? Widget_1.w(index_3.default, {
                align: index_3.Align.right,
                closeText: close,
                key: 'slide-pane-menu',
                onRequestClose: this._closeMenu,
                open: this._open,
                theme: theme,
                title: heading
            }, this.children) : Widget_1.v('div', {
                classes: this.theme(css.actions),
                key: 'menu'
            }, this.children);
        };
        ToolbarBase.prototype.renderButton = function () {
            var open = this.localizeBundle(common_1.default).messages.open;
            var theme = this.properties.theme;
            return Widget_1.v('button', {
                classes: this.theme(css.menuButton),
                type: 'button',
                onclick: this._toggleMenu
            }, [
                open,
                Widget_1.w(index_2.default, { type: 'barsIcon', theme: theme })
            ]);
        };
        ToolbarBase.prototype.render = function () {
            var heading = this.properties.heading;
            var hasActions = this.children && this.children.length;
            return Widget_1.v('div', {
                key: 'root',
                classes: tslib_1.__spread([
                    fixedCss.rootFixed
                ], this.theme([
                    css.root,
                    this._collapsed ? css.collapsed : null
                ]))
            }, [
                Widget_1.w(index_1.GlobalEvent, { key: 'global', window: { resize: this._collapseIfNecessary } }),
                heading ? Widget_1.v('div', {
                    classes: this.theme(css.title)
                }, [heading]) : null,
                hasActions ? this.renderActions() : null,
                hasActions && this._collapsed ? this.renderButton() : null
            ]);
        };
        ToolbarBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-toolbar',
                properties: ['theme', 'extraClasses', 'collapseWidth'],
                attributes: ['key', 'heading'],
                events: [
                    'onCollapse'
                ]
            })
        ], ToolbarBase);
        return ToolbarBase;
    }(exports.i18nBase));
    exports.ToolbarBase = ToolbarBase;
    var Toolbar = /** @class */ (function (_super) {
        tslib_1.__extends(Toolbar, _super);
        function Toolbar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Toolbar;
    }(ToolbarBase));
    exports.default = Toolbar;
});
//# sourceMappingURL=index.js.map