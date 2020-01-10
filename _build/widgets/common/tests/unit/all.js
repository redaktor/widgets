(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./util", "../../../accordion-pane/tests/unit/AccordionPane", "../../../button/tests/unit/Button", "../../../calendar/tests/unit/Calendar", "../../../calendar/tests/unit/CalendarCell", "../../../calendar/tests/unit/DatePicker", "../../../checkbox/tests/unit/Checkbox", "../../../combobox/tests/unit/ComboBox", "../../../dialog/tests/unit/Dialog", "../../../enhanced-text-input/tests/unit/EnhancedTextInput", "../../../global-event/tests/unit/GlobalEvent", "../../../icon/tests/unit/Icon", "../../../label/tests/unit/Label", "../../../listbox/tests/unit/Listbox", "../../../listbox/tests/unit/ListboxOption", "../../../progress/tests/unit/Progress", "../../../radio/tests/unit/Radio", "../../../select/tests/unit/Select", "../../../slide-pane/tests/unit/SlidePane", "../../../slider/tests/unit/Slider", "../../../split-pane/tests/unit/SplitPane", "../../../tab/tests/unit/Tab", "../../../tab-controller/tests/unit/TabButton", "../../../tab-controller/tests/unit/TabController", "../../../text-area/tests/unit/Textarea", "../../../text-input/tests/unit/TextInput", "../../../time-picker/tests/unit/TimePicker", "../../../title-pane/tests/unit/TitlePane", "../../../toolbar/tests/unit/Toolbar", "../../../tooltip/tests/unit/Tooltip"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./util");
    require("../../../accordion-pane/tests/unit/AccordionPane");
    require("../../../button/tests/unit/Button");
    require("../../../calendar/tests/unit/Calendar");
    require("../../../calendar/tests/unit/CalendarCell");
    require("../../../calendar/tests/unit/DatePicker");
    require("../../../checkbox/tests/unit/Checkbox");
    require("../../../combobox/tests/unit/ComboBox");
    require("../../../dialog/tests/unit/Dialog");
    require("../../../enhanced-text-input/tests/unit/EnhancedTextInput");
    require("../../../global-event/tests/unit/GlobalEvent");
    require("../../../icon/tests/unit/Icon");
    require("../../../label/tests/unit/Label");
    require("../../../listbox/tests/unit/Listbox");
    require("../../../listbox/tests/unit/ListboxOption");
    require("../../../progress/tests/unit/Progress");
    require("../../../radio/tests/unit/Radio");
    require("../../../select/tests/unit/Select");
    require("../../../slide-pane/tests/unit/SlidePane");
    require("../../../slider/tests/unit/Slider");
    require("../../../split-pane/tests/unit/SplitPane");
    require("../../../tab/tests/unit/Tab");
    require("../../../tab-controller/tests/unit/TabButton");
    require("../../../tab-controller/tests/unit/TabController");
    require("../../../text-area/tests/unit/Textarea");
    require("../../../text-input/tests/unit/TextInput");
    require("../../../time-picker/tests/unit/TimePicker");
    require("../../../title-pane/tests/unit/TitlePane");
    require("../../../toolbar/tests/unit/Toolbar");
    require("../../../tooltip/tests/unit/Tooltip");
});
//# sourceMappingURL=all.js.map