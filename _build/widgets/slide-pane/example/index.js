(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../slide-pane/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var index_1 = require("../../slide-pane/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._open = false;
            _this._underlay = false;
            _this._align = index_1.Align.left;
            return _this;
        }
        App.prototype.openSlidePane = function () {
            this._open = true;
            this.invalidate();
        };
        App.prototype.toggleUnderlay = function (event) {
            this._underlay = event.target.checked;
            this.invalidate();
        };
        App.prototype.toggleAlign = function (event) {
            this._align = event.target.checked ? index_1.Align.right : index_1.Align.left;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.w(index_1.default, {
                    title: 'SlidePane',
                    key: 'pane',
                    open: this._open,
                    underlay: this._underlay,
                    align: this._align,
                    onRequestClose: function () {
                        _this._open = false;
                        _this.invalidate();
                    }
                }, [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
                ]),
                d_1.v('button', {
                    id: 'button',
                    innerHTML: 'open slidepane',
                    onclick: this.openSlidePane
                }),
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
                        id: 'alignRight',
                        onchange: this.toggleAlign
                    }),
                    d_1.v('label', {
                        for: 'alignRight',
                        innerHTML: 'align right'
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