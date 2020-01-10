(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../lang/isArrayTypes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isArrayTypes_1 = require("../../lang/isArrayTypes");
    function deepValue(obj, path, list) {
        if (list === void 0) { list = []; }
        if (!path) {
            // If there's no path left, we've gotten to the object we care about.
            list.push(obj);
        }
        else {
            var dotIndex = path.indexOf('.');
            var firstSegment = path;
            var remaining = null;
            if (dotIndex !== -1) {
                firstSegment = path.slice(0, dotIndex);
                remaining = path.slice(dotIndex + 1);
            }
            var value = obj[firstSegment];
            if (value !== null && value !== undefined) {
                if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
                    list.push(value.toString());
                }
                else if (isArrayTypes_1.isArray(value)) {
                    // Search each item in the array.
                    for (var i = 0, len = value.length; i < len; i += 1) {
                        deepValue(value[i], remaining, list);
                    }
                }
                else if (remaining) {
                    // An object. Recurse further.
                    deepValue(value, remaining, list);
                }
            }
        }
        return list;
    }
    exports.default = deepValue;
});
//# sourceMappingURL=deepValue.js.map