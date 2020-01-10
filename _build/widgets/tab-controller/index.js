(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../common/util", "@dojo/framework/shim/object", "../../framework/uuid", "./TabButton", "../themes/redaktor-default/tab-controller.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var util_1 = require("../common/util");
    var object_1 = require("@dojo/framework/shim/object");
    var uuid_1 = require("../../framework/uuid");
    var TabButton_1 = require("./TabButton");
    var css = require("../themes/redaktor-default/tab-controller.m.css");
    var TabControllerBase = /** @class */ (function (_super) {
        tslib_1.__extends(TabControllerBase, _super);
        function TabControllerBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._id = uuid_1.default();
            _this._callTabFocus = false;
            return _this;
        }
        Object.defineProperty(TabControllerBase.prototype, "_tabs", {
            get: function () {
                return this.children.filter(function (child) { return child !== null; });
            },
            enumerable: true,
            configurable: true
        });
        TabControllerBase.prototype._onDownArrowPress = function () {
            var alignButtons = this.properties.alignButtons;
            if (alignButtons === util_1.Align.left || alignButtons === util_1.Align.right) {
                this.selectNextIndex();
            }
        };
        TabControllerBase.prototype._onLeftArrowPress = function () {
            this.selectPreviousIndex();
        };
        TabControllerBase.prototype._onRightArrowPress = function () {
            this.selectNextIndex();
        };
        TabControllerBase.prototype._onUpArrowPress = function () {
            var alignButtons = this.properties.alignButtons;
            if (alignButtons === util_1.Align.left || alignButtons === util_1.Align.right) {
                this.selectPreviousIndex();
            }
        };
        /**
         * Determines if the tab at `currentIndex` is enabled. If disabled,
         * returns the next valid index, or null if no enabled tabs exist.
         */
        TabControllerBase.prototype._validateIndex = function (currentIndex, backwards) {
            var tabs = this._tabs;
            if (tabs.every(function (result) { return Boolean(result.properties.disabled); })) {
                return null;
            }
            function nextIndex(index) {
                if (backwards) {
                    return (tabs.length + (index - 1)) % tabs.length;
                }
                return (index + 1) % tabs.length;
            }
            var i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;
            while (tabs[i].properties.disabled) {
                i = nextIndex(i);
            }
            return i;
        };
        TabControllerBase.prototype.closeIndex = function (index) {
            var onRequestTabClose = this.properties.onRequestTabClose;
            var key = this._tabs[index].properties.key;
            this._callTabFocus = true;
            onRequestTabClose && onRequestTabClose(index, key);
        };
        TabControllerBase.prototype.renderButtonContent = function (label) {
            return [label || null];
        };
        TabControllerBase.prototype.renderTabButtons = function () {
            var _this = this;
            return this._tabs.map(function (tab, i) {
                var _a = tab.properties, closeable = _a.closeable, disabled = _a.disabled, key = _a.key, label = _a.label, theme = _a.theme;
                return Widget_1.w(TabButton_1.default, {
                    callFocus: _this._callTabFocus && i === _this.properties.activeIndex,
                    active: i === _this.properties.activeIndex,
                    closeable: closeable,
                    controls: _this._id + "-tab-" + i,
                    disabled: disabled,
                    id: _this._id + "-tabbutton-" + i,
                    index: i,
                    key: key + "-tabbutton",
                    onClick: _this.selectIndex,
                    onCloseClick: _this.closeIndex,
                    onDownArrowPress: _this._onDownArrowPress,
                    onEndPress: _this.selectLastIndex,
                    onFocusCalled: function () { _this._callTabFocus = false; },
                    onHomePress: _this.selectFirstIndex,
                    onLeftArrowPress: _this._onLeftArrowPress,
                    onRightArrowPress: _this._onRightArrowPress,
                    onUpArrowPress: _this._onUpArrowPress,
                    theme: theme
                }, _this.renderButtonContent(label));
            });
        };
        TabControllerBase.prototype.renderTabs = function () {
            var _this = this;
            var activeIndex = this.properties.activeIndex;
            return this._tabs.reduce(function (a, tab, i) {
                var id = _this._id + "-tabcontrol-" + i;
                var controlProps = {
                    type: 'radio',
                    name: _this._id + "-tabcontrol",
                    classes: _this.theme([css.rTab])
                };
                if (i === activeIndex) {
                    controlProps.checked = true;
                }
                object_1.assign(tab.properties, {
                    id: _this._id + "-tab-" + i,
                    labelledBy: _this._id + "-tabbutton-" + i
                });
                a.push(Widget_1.v('input', controlProps));
                a.push(tab);
                return a;
            }, []);
        };
        TabControllerBase.prototype.selectIndex = function (index, backwards) {
            var _a = this.properties, activeIndex = _a.activeIndex, onRequestTabChange = _a.onRequestTabChange;
            var validIndex = this._validateIndex(index, backwards);
            this._callTabFocus = true;
            if (validIndex !== null && validIndex !== activeIndex) {
                var key = this._tabs[validIndex].properties.key;
                onRequestTabChange && onRequestTabChange(validIndex, key);
            }
        };
        TabControllerBase.prototype.selectFirstIndex = function () {
            this.selectIndex(0, true);
        };
        TabControllerBase.prototype.selectLastIndex = function () {
            this.selectIndex(this._tabs.length - 1);
        };
        TabControllerBase.prototype.selectNextIndex = function () {
            var activeIndex = this.properties.activeIndex;
            this.selectIndex(activeIndex === this._tabs.length - 1 ? 0 : activeIndex + 1);
        };
        TabControllerBase.prototype.selectPreviousIndex = function () {
            var activeIndex = this.properties.activeIndex;
            this.selectIndex(activeIndex === 0 ? this._tabs.length - 1 : activeIndex - 1, true);
        };
        TabControllerBase.prototype.render = function () {
            var _a = this.properties, activeIndex = _a.activeIndex, _b = _a.aria, aria = _b === void 0 ? {} : _b;
            var validIndex = this._validateIndex(activeIndex);
            var tabs = this.renderTabs();
            if (validIndex !== null && validIndex !== activeIndex) {
                this.selectIndex(validIndex);
                return null;
            }
            var children = [
                Widget_1.v('div', {
                    key: 'buttons',
                    classes: this.theme(css.tabButtons)
                }, this.renderTabButtons()),
                tabs.length ? Widget_1.v('div', {
                    key: 'tabs',
                    classes: this.theme(css.tabs)
                }, tabs) : null
            ];
            var alignClasses = [css.horizontal];
            var orientation = 'horizontal';
            var _c = this.properties, alignButtons = _c.alignButtons, material = _c.material;
            switch (alignButtons) {
                case util_1.Align.bottom:
                    alignClasses = [css.alignBottom, css.horizontal];
                    children.reverse();
                    break;
                case util_1.Align.right:
                    alignClasses = [css.alignRight, css.vertical];
                    orientation = 'vertical';
                    children.reverse();
                    break;
                case util_1.Align.left:
                    alignClasses = [css.alignLeft, css.vertical];
                    orientation = 'vertical';
                    break;
                default:
                    alignClasses = [css.alignTop, css.horizontal];
            }
            return Widget_1.v('div', tslib_1.__assign({}, util_1.formatAriaProperties(aria), { 'aria-orientation': orientation, classes: this.theme(tslib_1.__spread([css.root], alignClasses)), role: 'tablist' }), children);
        };
        TabControllerBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'dojo-tab-controller',
                properties: ['theme', 'material', 'aria', 'extraClasses', 'activeIndex'],
                attributes: ['alignButtons'],
                events: [
                    'onRequestTabChange',
                    'onRequestTabClose'
                ]
            })
        ], TabControllerBase);
        return TabControllerBase;
    }(Widget_1.ThemedBase));
    exports.TabControllerBase = TabControllerBase;
    var TabController = /** @class */ (function (_super) {
        tslib_1.__extends(TabController, _super);
        function TabController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TabController;
    }(TabControllerBase));
    exports.default = TabController;
});
//# sourceMappingURL=index.js.map