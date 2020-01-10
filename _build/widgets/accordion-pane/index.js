(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "@dojo/framework/shim/object", "../../framework/uuid", "./aspect", "@dojo/framework/shim/array", "../themes/redaktor-default/accordion-pane.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var object_1 = require("@dojo/framework/shim/object");
    var uuid_1 = require("../../framework/uuid");
    var aspect_1 = require("./aspect");
    var array_1 = require("@dojo/framework/shim/array");
    var css = require("../themes/redaktor-default/accordion-pane.m.css");
    var AccordionPaneBase = /** @class */ (function (_super) {
        tslib_1.__extends(AccordionPaneBase, _super);
        function AccordionPaneBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._id = uuid_1.default();
            return _this;
        }
        AccordionPaneBase.prototype._assignCallback = function (child, functionName, callback) {
            var _this = this;
            var existingProperty = child.properties[functionName];
            var property = function () { callback.call(_this, "" + child.properties.key); };
            return existingProperty ? aspect_1.after(existingProperty, property) : property;
        };
        AccordionPaneBase.prototype.onRequestClose = function (key) {
            var onRequestClose = this.properties.onRequestClose;
            onRequestClose && onRequestClose(key);
        };
        AccordionPaneBase.prototype.onRequestOpen = function (key) {
            var onRequestOpen = this.properties.onRequestOpen;
            onRequestOpen && onRequestOpen(key);
        };
        AccordionPaneBase.prototype.renderChildren = function () {
            var _this = this;
            var _a = this.properties, _b = _a.openKeys, openKeys = _b === void 0 ? [] : _b, _c = _a.exclusive, exclusive = _c === void 0 ? false : _c, theme = _a.theme, material = _a.material;
            return this.children.filter(function (child) { return child; }).map(function (child) {
                // null checks skipped since children are filtered prior to mapping
                object_1.assign(child.properties, {
                    exclusive: exclusive,
                    controlName: _this._id + "-panecontrol",
                    onRequestClose: _this._assignCallback(child, 'onRequestClose', _this.onRequestClose),
                    onRequestOpen: _this._assignCallback(child, 'onRequestOpen', _this.onRequestOpen),
                    open: array_1.includes(openKeys, child.properties.key),
                    theme: theme
                });
                return child;
            });
        };
        AccordionPaneBase.prototype.render = function () {
            return Widget_1.v('div', { classes: this.theme(css.root) }, this.renderChildren());
        };
        AccordionPaneBase = tslib_1.__decorate([
            Widget_1.theme(css),
            Widget_1.customElement({
                tag: 'redaktor-accordion-pane',
                properties: ['openKeys', 'theme', 'material', 'extraClasses'],
                events: ['onRequestClose', 'onRequestOpen']
            })
        ], AccordionPaneBase);
        return AccordionPaneBase;
    }(Widget_1.ThemedBase));
    exports.AccordionPaneBase = AccordionPaneBase;
    var AccordionPane = /** @class */ (function (_super) {
        tslib_1.__extends(AccordionPane, _super);
        function AccordionPane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AccordionPane;
    }(AccordionPaneBase));
    exports.default = AccordionPane;
});
//# sourceMappingURL=index.js.map