(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./accordion-pane.m.css", "./app-bar.m.css", "./button.m.css", "./calendar.m.css", "./card.m.css", "./chip.m.css", "./checkbox.m.css", "./combobox.m.css", "./dialog.m.css", "./icon.m.css", "./image.m.css", "./label.m.css", "./listbox.m.css", "./progressLinear.m.css", "./progressCircular.m.css", "./radio.m.css", "./select.m.css", "./slide-pane.m.css", "./slider.m.css", "./split-pane.m.css", "./tab-controller.m.css", "./text-area.m.css", "./text-input.m.css", "./time-picker.m.css", "./title-pane.m.css", "./toolbar.m.css", "./tooltip.m.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var accordionPane = require("./accordion-pane.m.css");
    var appBar = require("./app-bar.m.css");
    var button = require("./button.m.css");
    var calendar = require("./calendar.m.css");
    var card = require("./card.m.css");
    var chip = require("./chip.m.css");
    var checkbox = require("./checkbox.m.css");
    var combobox = require("./combobox.m.css");
    var dialog = require("./dialog.m.css");
    var icon = require("./icon.m.css");
    var image = require("./image.m.css");
    var label = require("./label.m.css");
    var listbox = require("./listbox.m.css");
    var progressLinear = require("./progressLinear.m.css");
    var progressCircular = require("./progressCircular.m.css");
    var radio = require("./radio.m.css");
    var select = require("./select.m.css");
    var slidePane = require("./slide-pane.m.css");
    var slider = require("./slider.m.css");
    var splitPane = require("./split-pane.m.css");
    var tabController = require("./tab-controller.m.css");
    var textArea = require("./text-area.m.css");
    var textInput = require("./text-input.m.css");
    var timePicker = require("./time-picker.m.css");
    var titlePane = require("./title-pane.m.css");
    var toolbar = require("./toolbar.m.css");
    var tooltip = require("./tooltip.m.css");
    exports.default = {
        'accordion-pane': accordionPane,
        'app-bar': appBar,
        'button': button,
        'calendar': calendar,
        'card': card,
        'checkbox': checkbox,
        'chip': chip,
        'combobox': combobox,
        'dialog': dialog,
        'icon': icon,
        'image': image,
        'label': label,
        'listbox': listbox,
        'progress': progressLinear,
        'CircularProgress': progressCircular,
        'radio': radio,
        'select': select,
        'slide-pane': slidePane,
        'slider': slider,
        'split-pane': splitPane,
        'tab-controller': tabController,
        'text-area': textArea,
        'text-input': textInput,
        'time-picker': timePicker,
        'title-pane': titlePane,
        'toolbar': toolbar,
        'tooltip': tooltip
    };
});
//# sourceMappingURL=index.js.map