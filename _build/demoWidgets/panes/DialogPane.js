(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/d", "@dojo/framework/widget-core/WidgetBase", "../../widgets/button", "../../widgets/dialog"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var d_1 = require("@dojo/framework/widget-core/d");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var button_1 = require("../../widgets/button");
    var dialog_1 = require("../../widgets/dialog");
    var DialogPane = /** @class */ (function (_super) {
        tslib_1.__extends(DialogPane, _super);
        function DialogPane() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._dialogOpen = false;
            return _this;
        }
        DialogPane.prototype._buttonClick = function () {
            this._dialogOpen = !this._dialogOpen;
            console.log('_buttonClick', this._dialogOpen);
            this.invalidate();
        };
        DialogPane.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.w(button_1.default, {
                    pressed: this._dialogOpen,
                    onClick: this._buttonClick
                }, ['Show a Dialog']),
                d_1.v('p', [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu, in vestibulum neque nulla a felis. Aenean non dapibus nibh. Suspendisse sed tellus eu erat congue sollicitudin in nec lorem. Vestibulum ut mauris orci. Pellentesque congue neque et egestas pulvinar. Fusce bibendum mollis iaculis. Suspendisse quis dui in mi ultricies faucibus et quis risus. Fusce id viverra orci. Aliquam erat volutpat. Morbi lobortis, justo vel convallis laoreet, neque tellus tempus arcu, ac rutrum lacus ligula vel ligula. Cras a pulvinar erat. Cras tempor commodo pellentesque. Morbi vel tortor sit amet enim malesuada feugiat. Etiam justo turpis, pharetra a pulvinar semper, faucibus at ligula.<br>Mauris in ultrices neque, vitae luctus mauris. Integer justo nibh, lacinia quis luctus a, placerat vitae enim. Integer eu turpis semper, sagittis purus nec, bibendum nulla. Donec mollis at odio vehicula ullamcorper. Nullam consequat mattis mauris, a consequat tortor tempor tincidunt. Mauris laoreet laoreet magna. Morbi lectus nunc, euismod id dapibus vitae, ullamcorper volutpat massa. Praesent dui est, auctor eget sem at, dignissim venenatis quam. Quisque a justo nunc. Proin venenatis eros augue.",
                    d_1.v('br'), d_1.v('br'),
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in.",
                    d_1.v('br'), d_1.v('br'),
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu, in vestibulum neque nulla a felis. Aenean non dapibus nibh. Suspendisse sed tellus eu erat congue sollicitudin in nec lorem. Vestibulum ut mauris orci. Pellentesque congue neque et egestas pulvinar. Fusce bibendum mollis iaculis. Suspendisse quis dui in mi ultricies faucibus et quis risus. Fusce id viverra orci. Aliquam erat volutpat. Morbi lobortis, justo vel convallis laoreet, neque tellus tempus arcu, ac rutrum lacus ligula vel ligula. Cras a pulvinar erat. Cras tempor commodo pellentesque. Morbi vel tortor sit amet enim malesuada feugiat. Etiam justo turpis, pharetra a pulvinar semper, faucibus at ligula.<br>Mauris in ultrices neque, vitae luctus mauris. Integer justo nibh, lacinia quis luctus a, placerat vitae enim. Integer eu turpis semper, sagittis purus nec, bibendum nulla. Donec mollis at odio vehicula ullamcorper. Nullam consequat mattis mauris, a consequat tortor tempor tincidunt. Mauris laoreet laoreet magna. Morbi lectus nunc, euismod id dapibus vitae, ullamcorper volutpat massa. Praesent dui est, auctor eget sem at, dignissim venenatis quam. Quisque a justo nunc. Proin venenatis eros augue."
                ]),
                d_1.w(dialog_1.default, {
                    title: 'Dialog',
                    open: this._dialogOpen,
                    modal: true,
                    underlay: true,
                    closeable: true,
                    onRequestClose: function () {
                        _this._dialogOpen = false;
                        _this.invalidate();
                    }
                }, [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\tQuisque id purus ipsum. Aenean ac purus purus.\n\t\t\t\tNam sollicitudin varius augue, sed lacinia felis tempor in."
                ])
            ]);
        };
        return DialogPane;
    }(WidgetBase_1.WidgetBase));
    exports.default = DialogPane;
});
//# sourceMappingURL=DialogPane.js.map