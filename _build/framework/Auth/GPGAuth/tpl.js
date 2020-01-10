(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tplCommon = {
        form: "<form class=\"ui labeled action input gpgAuth\" method=\"POST\" action=\"_{url}\">\n    <label>_{messageForm}<br>\n      <textarea name=\"code\" rows=\"10\" onfocus=\"this.select()\" autofocus=\"autofocus\">_{code}</textarea>\n    </label>\n    <input type=\"hidden\" name=\"state\" value=\"_{state}\">\n    <button type=\"submit\" class=\"ui green button\">OK</button>\n  </form>"
    };
    exports.default = tplCommon;
});
//# sourceMappingURL=tpl.js.map