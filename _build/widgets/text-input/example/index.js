(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../text-input/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../text-input/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var _this = this;
            return d_1.v('div', {
                styles: { maxWidth: '256px' }
            }, [
                d_1.v('h2', {}, ['Text Input Examples']),
                d_1.v('div', { id: 'example-text' }, [
                    d_1.v('h3', {}, ['String label']),
                    d_1.w(index_1.default, {
                        key: 't1',
                        label: 'Name',
                        type: 'text',
                        placeholder: 'Hello, World',
                        value: this._value1,
                        onChange: function (value) {
                            _this._value1 = value;
                            _this.invalidate();
                        }
                    })
                ]),
                d_1.v('div', { id: 'example-email' }, [
                    d_1.v('h3', {}, ['Label before the input']),
                    d_1.w(index_1.default, {
                        key: 't2',
                        type: 'email',
                        label: 'Email (required)',
                        required: true,
                        value: this._value2,
                        onChange: function (value) {
                            _this._value2 = value;
                            _this.invalidate();
                        }
                    })
                ]),
                d_1.v('div', { id: 'example-hidden-label' }, [
                    d_1.v('h3', {}, ['Hidden accessible label']),
                    d_1.w(index_1.default, {
                        key: 't3',
                        type: 'text',
                        placeholder: 'Type something...',
                        label: 'Try listening to me!',
                        labelAfter: true,
                        labelHidden: true,
                        value: this._value3,
                        onChange: function (value) {
                            _this._value3 = value;
                            _this.invalidate();
                        }
                    })
                ]),
                d_1.v('div', { id: 'example-disabled' }, [
                    d_1.v('h3', {}, ['Disabled text input']),
                    d_1.w(index_1.default, {
                        key: 't4',
                        type: 'text',
                        label: 'Can\'t type here',
                        value: 'Initial value',
                        disabled: true,
                        readOnly: true
                    })
                ]),
                d_1.v('div', { id: 'example-validated' }, [
                    d_1.v('h3', {}, ['Validated Input']),
                    d_1.w(index_1.default, {
                        key: 't5',
                        type: 'text',
                        label: 'Type "foo" or "bar"',
                        value: this._value4,
                        invalid: this._invalid,
                        onInput: function (value) {
                            _this._value4 = value;
                            _this._invalid = value.toLowerCase() !== 'foo' && value.toLowerCase() !== 'bar';
                            _this.invalidate();
                        }
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