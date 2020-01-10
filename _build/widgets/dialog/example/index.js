(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/meta/Focus", "../../dialog/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var Focus_1 = require("@dojo/framework/widget-core/meta/Focus");
    var index_1 = require("../../dialog/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._modal = false;
            _this._underlay = false;
            _this._closeable = true;
            _this._open = false;
            return _this;
        }
        App.prototype.openDialog = function () {
            this._open = true;
            this.invalidate();
        };
        App.prototype.toggleModal = function (event) {
            this._modal = event.target.checked;
            this.invalidate();
        };
        App.prototype.toggleUnderlay = function (event) {
            this._underlay = event.target.checked;
            this.invalidate();
        };
        App.prototype.toggleCloseable = function (event) {
            this._closeable = event.target.checked;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.v('button', {
                    id: 'button',
                    key: 'button',
                    innerHTML: 'open dialog',
                    onclick: this.openDialog
                }),
                d_1.w(index_1.default, {
                    key: 'dialog',
                    title: 'Dialog',
                    open: this._open,
                    modal: this._modal,
                    underlay: this._underlay,
                    closeable: this._closeable,
                    onRequestClose: function () {
                        _this._open = false;
                        _this.meta(Focus_1.default).set('button');
                        _this.invalidate();
                    }
                }, [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
                ]),
                d_1.v('div', { classes: 'option' }, [
                    d_1.v('input', {
                        type: 'checkbox',
                        id: 'modal',
                        onchange: this.toggleModal
                    }),
                    d_1.v('label', {
                        for: 'modal',
                        innerHTML: 'modal'
                    })
                ]),
                d_1.v('div', { classes: 'option' }, [
                    d_1.v('input', {
                        type: 'checkbox',
                        id: 'underlay',
                        onchange: this.toggleUnderlay
                    }),
                    d_1.v('label', {
                        for: 'underlay',
                        innerHTML: 'underlay'
                    })
                ]),
                d_1.v('div', { classes: 'option' }, [
                    d_1.v('input', {
                        type: 'checkbox',
                        id: 'closeable',
                        onchange: this.toggleCloseable,
                        checked: true
                    }),
                    d_1.v('label', {
                        for: 'closeable',
                        innerHTML: 'closeable'
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