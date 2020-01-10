(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/shim/global", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/decorators/diffProperty", "@dojo/framework/widget-core/diff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var global_1 = require("@dojo/framework/shim/global");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var diffProperty_1 = require("@dojo/framework/widget-core/decorators/diffProperty");
    var diff_1 = require("@dojo/framework/widget-core/diff");
    var GlobalEvent = /** @class */ (function (_super) {
        tslib_1.__extends(GlobalEvent, _super);
        function GlobalEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._listeners = {
                window: {},
                document: {}
            };
            return _this;
        }
        GlobalEvent.prototype._registerListeners = function (type, previousListeners, newListeners) {
            var _this = this;
            var registeredListeners = {};
            previousListeners[type] && Object.keys(previousListeners[type]).forEach(function (eventName) {
                var newListener = newListeners[type][eventName];
                if (newListener === undefined) {
                    global_1.default[type].removeEventListener(eventName, _this._listeners[type][eventName]);
                }
                else if (previousListeners[type][eventName] !== newListener) {
                    global_1.default[type].removeEventListener(eventName, _this._listeners[type][eventName]);
                    global_1.default[type].addEventListener(eventName, newListener);
                    registeredListeners[eventName] = newListener;
                }
                else {
                    registeredListeners[eventName] = newListener;
                }
            });
            newListeners[type] && Object.keys(newListeners[type]).forEach(function (eventName) {
                if (previousListeners[type] === undefined || previousListeners[type][eventName] === undefined) {
                    global_1.default[type].addEventListener(eventName, newListeners[type][eventName]);
                    registeredListeners[eventName] = newListeners[type][eventName];
                }
            });
            this._listeners[type] = registeredListeners;
        };
        GlobalEvent.prototype._removeAllRegisteredListeners = function (type) {
            var _this = this;
            Object.keys(this._listeners[type]).forEach(function (eventName) {
                global_1.default[type].removeEventListener(eventName, _this._listeners[type][eventName]);
            });
        };
        GlobalEvent.prototype.onWindowListenersChange = function (previousListeners, newListeners) {
            this._registerListeners('window', previousListeners, newListeners);
        };
        GlobalEvent.prototype.onDocumentListenersChange = function (previousListeners, newListeners) {
            this._registerListeners('document', previousListeners, newListeners);
        };
        GlobalEvent.prototype.onDetach = function () {
            this._removeAllRegisteredListeners('window');
            this._removeAllRegisteredListeners('document');
        };
        GlobalEvent.prototype.render = function () {
            if (this.children.length > 0) {
                return this.children;
            }
            return null;
        };
        tslib_1.__decorate([
            diffProperty_1.diffProperty('window', diff_1.shallow),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], GlobalEvent.prototype, "onWindowListenersChange", null);
        tslib_1.__decorate([
            diffProperty_1.diffProperty('document', diff_1.shallow),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], GlobalEvent.prototype, "onDocumentListenersChange", null);
        return GlobalEvent;
    }(WidgetBase_1.default));
    exports.GlobalEvent = GlobalEvent;
    exports.default = GlobalEvent;
});
//# sourceMappingURL=index.js.map