(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../checkbox/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../checkbox/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._checkboxStates = {
                c1: true,
                c2: false,
                c3: false,
                c4: false,
                c5: true
            };
            return _this;
        }
        App.prototype.onChange = function (value, checked) {
            this._checkboxStates[value] = checked;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _a = this._checkboxStates, _b = _a.c1, c1 = _b === void 0 ? true : _b, _c = _a.c2, c2 = _c === void 0 ? false : _c, _d = _a.c3, c3 = _d === void 0 ? false : _d, _e = _a.c4, c4 = _e === void 0 ? false : _e, _f = _a.c5, c5 = _f === void 0 ? true : _f;
            return d_1.v('div', [
                d_1.v('h2', {
                    innerHTML: 'Checkbox Examples'
                }),
                d_1.v('fieldset', [
                    d_1.v('legend', {}, ['Checkbox Example']),
                    d_1.v('div', { id: 'example-1' }, [
                        d_1.w(index_1.default, {
                            key: 'c1',
                            checked: c1,
                            label: 'Sample checkbox that starts checked',
                            value: 'c1',
                            onChange: this.onChange
                        })
                    ]),
                    d_1.v('div', { id: 'example-2' }, [
                        d_1.w(index_1.default, {
                            key: 'c2',
                            checked: c2,
                            label: 'Sample disabled checkbox',
                            disabled: true,
                            value: 'c2',
                            onChange: this.onChange
                        })
                    ]),
                    d_1.v('div', { id: 'example-3' }, [
                        d_1.w(index_1.default, {
                            key: 'c3',
                            checked: c3,
                            label: 'Required checkbox',
                            required: true,
                            value: 'c3',
                            onChange: this.onChange
                        })
                    ]),
                    d_1.v('div', { id: 'example-4' }, [
                        d_1.w(index_1.default, {
                            key: 'c4',
                            checked: c4,
                            label: 'Checkbox in "toggle" mode',
                            mode: index_1.Mode.toggle,
                            value: 'c4',
                            onChange: this.onChange
                        })
                    ]),
                    d_1.v('div', { id: 'example-5' }, [
                        d_1.w(index_1.default, {
                            key: 'c5',
                            checked: c5,
                            label: 'Disabled toggle mode',
                            onLabel: 'On',
                            offLabel: 'Off',
                            mode: index_1.Mode.toggle,
                            disabled: true,
                            value: 'c5',
                            onChange: this.onChange
                        })
                    ])
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