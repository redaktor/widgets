(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../text-area/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../text-area/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', [
                d_1.v('h2', {}, ['Textarea Example']),
                d_1.v('div', { id: 'example-t1' }, [
                    d_1.w(index_1.default, {
                        key: 't1',
                        columns: 40,
                        rows: 8,
                        placeholder: 'Hello, World',
                        label: 'Type Something',
                        value: this._value1,
                        onInput: function (value) {
                            _this._value1 = value;
                            _this.invalidate();
                        }
                    })
                ]),
                d_1.v('h3', {}, ['Disabled Textarea']),
                d_1.v('div', { id: 'example-t2' }, [
                    d_1.w(index_1.default, {
                        key: 't2',
                        columns: 40,
                        rows: 3,
                        label: 'Can\'t type here',
                        value: 'Initial value',
                        disabled: true
                    })
                ]),
                d_1.v('h3', {}, ['Validated, Required Textarea']),
                d_1.v('div', { id: 'example-t3' }, [
                    d_1.w(index_1.default, {
                        key: 't3',
                        columns: 40,
                        rows: 8,
                        label: 'Required',
                        required: true,
                        value: this._value2,
                        invalid: this._invalid,
                        onChange: function (value) {
                            _this._value2 = value;
                            _this._invalid = value.trim().length === 0;
                            _this.invalidate();
                        }
                    })
                ]),
                d_1.v('h3', {}, ['Hidden Label Textarea']),
                d_1.v('div', { id: 'example-t4' }, [
                    d_1.w(index_1.default, {
                        key: 't4',
                        columns: 40,
                        rows: 8,
                        label: 'Hidden label',
                        labelHidden: true,
                        labelAfter: true
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