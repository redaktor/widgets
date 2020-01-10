(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "../common/nls/common", "../global-event/index", "@dojo/framework/widget-core/mixins/I18n", "@dojo/framework/widget-core/meta/Focus", "../../framework/uuid", "../icon/index", "../common/styles/animations.m.css", "./styles/dialog.m.css", "../themes/redaktor-default/dialog.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var common_1 = require("../common/nls/common");
    var index_1 = require("../global-event/index");
    var I18n_1 = require("@dojo/framework/widget-core/mixins/I18n");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var uuid_1 = require("../../framework/uuid");
    var index_2 = require("../icon/index");
    var animations = require("../common/styles/animations.m.css");
    var fixedCss = require("./styles/dialog.m.css");
    var css = require("../themes/redaktor-default/dialog.m.css");
    exports.i18nBase = I18n_1.I18nMixin(Widget_1.ThemedBase);
    var DialogBase = /** @class */ (function (_super) {
        tslib_1.__extends(DialogBase, _super);
        function DialogBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._titleId = uuid_1.default();
            _this._callFocus = false;
            _this._onKeyUp = function (event) {
                event.stopPropagation();
                if (util_1.keyName(event) === 'Escape') {
                    _this._close();
                }
            };
            return _this;
        }
        DialogBase.prototype._onCloseClick = function (event) {
            event.stopPropagation();
            this._close();
        };
        DialogBase.prototype._close = function () {
            var _a = this.properties, _b = _a.closeable, closeable = _b === void 0 ? true : _b, onRequestClose = _a.onRequestClose;
            closeable && onRequestClose && onRequestClose();
        };
        DialogBase.prototype._onUnderlayClick = function (event) {
            event.stopPropagation();
            !this.properties.modal && this._close();
        };
        DialogBase.prototype._onOpen = function () {
            var onOpen = this.properties.onOpen;
            this._callFocus = true;
            onOpen && onOpen();
        };
        DialogBase.prototype.getContent = function () {
            console.log('getContent Dialog', this);
            return Widget_1.v('div', {
                classes: this.theme(css.content),
                key: 'content'
            }, this.children);
        };
        DialogBase.prototype.renderTitle = function () {
            var _a = this.properties.title, title = _a === void 0 ? '' : _a;
            return Widget_1.v('div', { id: this._titleId }, [title]);
        };
        DialogBase.prototype.renderUnderlay = function () {
            var underlay = this.properties.underlay;
            return Widget_1.v('div', {
                classes: [this.theme(underlay ? css.underlayVisible : null), fixedCss.underlay],
                enterAnimation: animations.fadeIn,
                exitAnimation: animations.fadeOut,
                key: 'underlay',
                onclick: this._onUnderlayClick
            });
        };
        DialogBase.prototype.render = function () {
            var _a = this.properties, _b = _a.aria, aria = _b === void 0 ? {} : _b, _c = _a.closeable, closeable = _c === void 0 ? true : _c, closeText = _a.closeText, _d = _a.enterAnimation, enterAnimation = _d === void 0 ? animations.fadeIn : _d, _e = _a.exitAnimation, exitAnimation = _e === void 0 ? animations.fadeOut : _e, _f = _a.open, open = _f === void 0 ? false : _f, _g = _a.role, role = _g === void 0 ? 'dialog' : _g, _h = _a.title, title = _h === void 0 ? '' : _h, theme = _a.theme;
            open && !this._wasOpen && this._onOpen();
            this._wasOpen = open;
            if (this._callFocus) {
                this.meta(Focus_1.default).set('main');
                var dialogFocus = this.meta(Focus_1.default).get('main');
                if (dialogFocus.active) {
                    this._callFocus = false;
                }
            }
            if (!closeText) {
                var messages = this.localizeBundle(common_1.default).messages;
                closeText = messages.close + " " + title;
            }
            console.log('render dialog', open);
            return Widget_1.v('div', {
                classes: this.theme(css.root)
            }, open ? [
                Widget_1.w(index_1.GlobalEvent, { key: 'global', document: { keyup: this._onKeyUp } }),
                this.renderUnderlay(),
                Widget_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-labelledby': this._titleId, classes: this.theme(css.main), enterAnimation: enterAnimation,
                    exitAnimation: exitAnimation, key: 'main', role: role, tabIndex: -1 }), [
                    Widget_1.v('div', {
                        classes: this.theme(css.title),
                        key: 'title'
                    }, [
                        this.renderTitle(),
                        closeable ? Widget_1.v('button', {
                            classes: this.theme(css.close),
                            type: 'button',
                            onclick: this._onCloseClick
                        }, [
                            closeText,
                            Widget_1.w(index_2.default, { type: 'closeIcon', theme: theme })
                        ]) : null
                    ]),
                    this.getContent()
                ])
            ] : []);
        };
        DialogBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-dialog',
                properties: [
                    'theme',
                    'aria',
                    'extraClasses',
                    'closeable',
                    'modal',
                    'open',
                    'underlay'
                ],
                attributes: [
                    'title',
                    'role',
                    'exitAnimation',
                    'enterAnimation',
                    'closeText'
                ],
                events: [
                    'onOpen',
                    'onRequestClose'
                ]
            })
        ], DialogBase);
        return DialogBase;
    }(exports.i18nBase));
    exports.DialogBase = DialogBase;
    var Dialog = /** @class */ (function (_super) {
        tslib_1.__extends(Dialog, _super);
        function Dialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Dialog;
    }(DialogBase));
    exports.default = Dialog;
});
//# sourceMappingURL=index.js.map