(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../common/Widget", "../themes/redaktor-default/listbox.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Widget_1 = require("../common/Widget");
    var css = require("../themes/redaktor-default/listbox.m.css");
    var ListboxOptionBase = /** @class */ (function (_super) {
        tslib_1.__extends(ListboxOptionBase, _super);
        function ListboxOptionBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListboxOptionBase.prototype._onClick = function (event) {
            console.log(event);
            event.stopPropagation();
            var _a = this.properties, index = _a.index, key = _a.key, option = _a.option, onClick = _a.onClick;
            onClick && onClick(option, index, key);
        };
        ListboxOptionBase.prototype.render = function () {
            var _a = this.properties, id = _a.id, label = _a.label, 
            //classes = [],
            _b = _a.disabled, 
            //classes = [],
            disabled = _b === void 0 ? false : _b, _c = _a.selected, selected = _c === void 0 ? false : _c;
            /*
                    return v('label', {
                  //for: optionId,
                  key: this._getOptionId(index),
                  classes: this.theme(css.option)
                }, [
                  v('input', {
                    //id: optionId,
                    type: multiple ? 'checkbox' : 'radio', // TODO FIXED CSS
                    'aria-hidden': true,
                    name: `${ widgetId }-listcontrol`,
                    checked: index === activeIndex,
                    onclick: (event: MouseEvent) => {
                      console.log(event)
                    //  event.stopPropagation();
                      this._onOptionClick(option, index)
                    }
                  }),
                  v('span', {
                    classes: [
                      this.theme(css.label),
                      disabled ? this.theme(css.disabled) : null
                    ]
                  }, [this._getOptionLabel(option, index)])
                    ]);
                */
            return Widget_1.v('label', {
                'aria-disabled': disabled ? 'true' : null,
                'aria-selected': disabled ? null : String(selected),
                //classes: this.theme(classes),
                id: id,
                role: 'option',
                onclick: this._onClick
            }, [label]);
        };
        ListboxOptionBase = tslib_1.__decorate([
            Widget_1.theme(css)
        ], ListboxOptionBase);
        return ListboxOptionBase;
    }(Widget_1.ThemedBase));
    exports.ListboxOptionBase = ListboxOptionBase;
    var ListboxOption = /** @class */ (function (_super) {
        tslib_1.__extends(ListboxOption, _super);
        function ListboxOption() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ListboxOption;
    }(ListboxOptionBase));
    exports.default = ListboxOption;
});
//# sourceMappingURL=ListboxOption.js.map