(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../accordion-pane/tests/functional/AccordionPane", "../../../button/tests/functional/Button", "../../../calendar/tests/functional/Calendar", "../../../checkbox/tests/functional/Checkbox", "../../../combobox/tests/functional/ComboBox", "../../../dialog/tests/functional/Dialog", "../../../icon/tests/functional/Icon", "../../../label/tests/functional/Label", "../../../listbox/tests/functional/Listbox", "../../../radio/tests/functional/Radio", "../../../slide-pane/tests/functional/SlidePane", "../../../slider/tests/functional/Slider", "../../../split-pane/tests/functional/SplitPane", "../../../tab-controller/tests/functional/TabController", "../../../text-area/tests/functional/Textarea", "../../../text-input/tests/functional/TextInput", "../../../time-picker/tests/functional/TimePicker", "../../../title-pane/tests/functional/TitlePane", "../../../toolbar/tests/functional/Toolbar", "../../../tooltip/tests/functional/Tooltip"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../../../accordion-pane/tests/functional/AccordionPane");
    require("../../../button/tests/functional/Button");
    require("../../../calendar/tests/functional/Calendar");
    require("../../../checkbox/tests/functional/Checkbox");
    require("../../../combobox/tests/functional/ComboBox");
    require("../../../dialog/tests/functional/Dialog");
    require("../../../icon/tests/functional/Icon");
    require("../../../label/tests/functional/Label");
    require("../../../listbox/tests/functional/Listbox");
    require("../../../radio/tests/functional/Radio");
    require("../../../slide-pane/tests/functional/SlidePane");
    require("../../../slider/tests/functional/Slider");
    require("../../../split-pane/tests/functional/SplitPane");
    require("../../../tab-controller/tests/functional/TabController");
    require("../../../text-area/tests/functional/Textarea");
    require("../../../text-input/tests/functional/TextInput");
    require("../../../time-picker/tests/functional/TimePicker");
    require("../../../title-pane/tests/functional/TitlePane");
    require("../../../toolbar/tests/functional/Toolbar");
    require("../../../tooltip/tests/functional/Tooltip");
});
//# sourceMappingURL=all.js.map