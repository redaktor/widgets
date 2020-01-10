(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../radio/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../radio/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.onChange = function (value) {
            this._inputValue = value;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _a = this._inputValue, _inputValue = _a === void 0 ? 'first' : _a;
            return d_1.v('div', [
                d_1.v('h2', {
                    innerHTML: 'Radio Examples'
                }),
                d_1.v('fieldset', { id: 'example-1' }, [
                    d_1.v('legend', {}, ['Set of radio buttons with first option selected']),
                    d_1.w(index_1.default, {
                        key: 'r1',
                        checked: _inputValue === 'first',
                        value: 'first',
                        label: 'First option',
                        name: 'sample-radios',
                        onChange: this.onChange
                    }),
                    d_1.w(index_1.default, {
                        key: 'r2',
                        checked: this._inputValue === 'second',
                        value: 'second',
                        label: 'Second option',
                        name: 'sample-radios',
                        onChange: this.onChange
                    }),
                    d_1.w(index_1.default, {
                        key: 'r3',
                        checked: this._inputValue === 'third',
                        value: 'third',
                        label: 'Third option',
                        name: 'sample-radios',
                        onChange: this.onChange
                    })
                ]),
                d_1.v('fieldset', { id: 'example-2' }, [
                    d_1.v('legend', {}, ['Set of disabled radio buttons']),
                    d_1.w(index_1.default, {
                        key: 'r4',
                        checked: false,
                        disabled: true,
                        label: 'First option',
                        name: 'sample-radios-disabled'
                    }),
                    d_1.w(index_1.default, {
                        key: 'r5',
                        checked: true,
                        disabled: true,
                        label: 'Second option',
                        name: 'sample-radios-disabled'
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