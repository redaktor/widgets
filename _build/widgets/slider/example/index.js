(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/widget-core/WidgetBase", "@dojo/framework/widget-core/mixins/Projector", "@dojo/framework/widget-core/d", "../../slider/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var WidgetBase_1 = require("@dojo/framework/widget-core/WidgetBase");
    var Projector_1 = require("@dojo/framework/widget-core/mixins/Projector");
    var d_1 = require("@dojo/framework/widget-core/d");
    var index_1 = require("../../slider/index");
    var App = /** @class */ (function (_super) {
        tslib_1.__extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.onTribbleInput = function (value) {
            this._tribbleValue = value;
            this.invalidate();
        };
        App.prototype.onVerticalInput = function (value) {
            this._verticalValue = value;
            this._verticalInvalid = value > 50;
            this.invalidate();
        };
        App.prototype.render = function () {
            var _a = this, _b = _a._tribbleValue, tribbleValue = _b === void 0 ? 50 : _b, _c = _a._verticalValue, verticalValue = _c === void 0 ? 0 : _c, _d = _a._verticalInvalid, verticalInvalid = _d === void 0 ? false : _d;
            return d_1.v('div', [
                d_1.v('h1', {}, ['Slider with custom output']),
                d_1.v('div', { id: 'example-s1' }, [
                    d_1.w(index_1.default, {
                        key: 's1',
                        label: 'How much do you like tribbles?',
                        min: 0,
                        max: 100,
                        output: function (value) {
                            if (value < 20) {
                                return 'I am a Klingon';
                            }
                            if (value < 40) {
                                return 'Tribbles only cause trouble';
                            }
                            if (value < 60) {
                                return 'They\`re kind of cute';
                            }
                            if (value < 80) {
                                return 'Most of my salary goes to tribble food';
                            }
                            else {
                                return 'I permanently altered the ecology of a planet for my tribbles';
                            }
                        },
                        step: 1,
                        value: tribbleValue,
                        onChange: this.onTribbleInput,
                        onInput: this.onTribbleInput
                    })
                ]),
                d_1.v('h1', {}, ['Disabled slider']),
                d_1.v('div', { id: 'example-s2' }, [
                    d_1.w(index_1.default, {
                        key: 's2',
                        label: 'Stuck at 30',
                        min: 0,
                        max: 100,
                        step: 1,
                        value: 30,
                        disabled: true
                    })
                ]),
                d_1.v('h1', {}, ['Vertical slider']),
                d_1.v('div', { id: 'example-s3' }, [
                    d_1.w(index_1.default, {
                        key: 's3',
                        label: 'Vertical Slider with default properties. Anything over 50 is invalid:',
                        value: verticalValue,
                        vertical: true,
                        invalid: verticalInvalid,
                        output: function (value) {
                            return d_1.v('span', {
                                innerHTML: verticalInvalid ? value + ' !' : value + ''
                            });
                        },
                        outputIsTooltip: true,
                        onChange: this.onVerticalInput,
                        onInput: this.onVerticalInput
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