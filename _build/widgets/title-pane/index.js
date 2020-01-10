(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../global-event/index", "../../framework/uuid", "../icon/index", "./styles/title-pane.m.css", "../themes/redaktor-default/title-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var index_1 = require("../global-event/index");
    var uuid_1 = require("../../framework/uuid");
    var index_2 = require("../icon/index");
    var fixedCss = require("./styles/title-pane.m.css");
    var css = require("../themes/redaktor-default/title-pane.m.css");
    var TitlePaneBase = /** @class */ (function (_super) {
        tslib_1.__extends(TitlePaneBase, _super);
        function TitlePaneBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._id = uuid_1.default();
            _this._onWindowResize = function () {
                _this.invalidate();
            };
            return _this;
        }
        TitlePaneBase.prototype._onTitleClick = function (event) {
            event.stopPropagation();
            this._toggle();
        };
        TitlePaneBase.prototype._toggle = function () {
            var _a = this.properties, _b = _a.closeable, closeable = _b === void 0 ? true : _b, key = _a.key, onRequestClose = _a.onRequestClose, onRequestOpen = _a.onRequestOpen, _c = _a.open, open = _c === void 0 ? true : _c;
            if (!closeable) {
                return;
            }
            if (open) {
                onRequestClose && onRequestClose(key);
            }
            else {
                onRequestOpen && onRequestOpen(key);
            }
        };
        TitlePaneBase.prototype.getButtonContent = function () {
            return this.properties.title;
        };
        TitlePaneBase.prototype.getFixedModifierClasses = function () {
            var _a = this.properties.closeable, closeable = _a === void 0 ? true : _a;
            return [
                closeable ? fixedCss.closeableFixed : null
            ];
        };
        TitlePaneBase.prototype.getModifierClasses = function () {
            var _a = this.properties.closeable, closeable = _a === void 0 ? true : _a;
            return [closeable ? css.closeable : null];
        };
        TitlePaneBase.prototype.getPaneContent = function () {
            return this.children;
        };
        TitlePaneBase.prototype.renderExpandIcon = function () {
            var _a = this.properties, _b = _a.open, open = _b === void 0 ? true : _b, theme = _a.theme;
            return Widget_1.v('span', { classes: this.theme(css.arrow) }, [
                Widget_1.w(index_2.default, { type: 'rightIcon', theme: theme })
            ]);
        };
        TitlePaneBase.prototype.render = function () {
            var _a = this.properties, headingLevel = _a.headingLevel, material = _a.material, _b = _a.controlName, controlName = _b === void 0 ? null : _b, _c = _a.exclusive, exclusive = _c === void 0 ? false : _c, _d = _a.closeable, closeable = _d === void 0 ? true : _d, _e = _a.open, open = _e === void 0 ? true : _e;
            var transition = false;
            var ctrlNode = null;
            var ctrlId = '';
            if (open !== this._open) {
                transition = true;
                this._open = open;
            }
            if (controlName) {
                ctrlId = controlName + "-" + this._id;
                var controlProps = {
                    id: ctrlId,
                    type: exclusive ? 'radio' : 'checkbox',
                    name: controlName,
                    classes: this.theme([css.rPane]),
                    checked: this._open
                };
                if (exclusive && controlName) {
                    controlProps.name = controlName;
                }
                ctrlNode = Widget_1.v('input', controlProps);
            }
            var classes = this.theme([css.root, exclusive ? css.exclusive : null]);
            if (material) {
                classes = classes.concat(this.theme([css[material], css.material]));
            }
            return Widget_1.v('div', { classes: classes }, [
                Widget_1.w(index_1.default, { key: 'global', window: { resize: this._onWindowResize } }),
                ctrlNode,
                Widget_1.v(controlName ? 'label' : 'div', {
                    'aria-level': headingLevel ? "" + headingLevel : null,
                    for: ctrlId,
                    classes: tslib_1.__spread(this.theme(tslib_1.__spread([css.title], this.getModifierClasses())), [
                        fixedCss.titleFixed
                    ], this.getFixedModifierClasses()),
                    role: 'heading'
                }, [
                    Widget_1.v('button', {
                        'aria-controls': this._id + "-content",
                        'aria-expanded': "" + open,
                        disabled: !closeable,
                        classes: tslib_1.__spread([fixedCss.titleButtonFixed], this.theme([css.titleButton])),
                        id: this._id + "-title",
                        type: 'button',
                        onclick: this._onTitleClick
                    }, [
                        this.renderExpandIcon(),
                        this.getButtonContent()
                    ])
                ]),
                Widget_1.v('div', {
                    'aria-hidden': open ? null : 'true',
                    'aria-labelledby': this._id + "-title",
                    classes: tslib_1.__spread(this.theme([css.content, transition ? css.contentTransition : null]), [
                        fixedCss.contentFixed
                    ]),
                    id: this._id + "-content",
                    key: 'content',
                }, this.getPaneContent())
            ]);
        };
        TitlePaneBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-title-pane',
                properties: ['theme', 'material', 'extraClasses', 'open', 'closeable', 'headingLevel'],
                attributes: ['title', 'key'],
                events: [
                    'onRequestClose',
                    'onRequestOpen'
                ]
            })
        ], TitlePaneBase);
        return TitlePaneBase;
    }(Widget_1.ThemedBase));
    exports.TitlePaneBase = TitlePaneBase;
    var TitlePane = /** @class */ (function (_super) {
        tslib_1.__extends(TitlePane, _super);
        function TitlePane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TitlePane;
    }(TitlePaneBase));
    exports.default = TitlePane;
});
//# sourceMappingURL=index.js.map