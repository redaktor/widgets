(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./formats", "./is"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var formats_1 = require("./formats");
    var is_1 = require("./is");
    function to(data, type) {
        var toO = formats_1.TYPES[formats_1.TYPEMAP[type]];
        /* Exit early to avoid a performance hit in some environments */
        if (!is_1.is(toO, 'object') || is_1.is(data, type)) {
            return data;
        }
        /* Complex types before schema types */
        var formats = is_1.isAn(data).reverse();
        var coerced;
        for (var f = 0; f < formats.length; f++) {
            var key = formats[f];
            if (toO.from && typeof toO.from[key] === 'function') {
                coerced = toO.from[key](data);
            }
            else if (toO.from && typeof toO.from.any === 'function') {
                coerced = toO.from.any(data);
            }
            if (is_1.isAn(coerced, type)) {
                data = coerced;
                break;
            }
        }
        return data;
        /* Coerce / convert datatypes */
        /*
        // TODO expose toFunctions : toArray (w camelCase())...  - mention here in DOC
        Object.keys(TO).forEach(function(key) {
          exports[['to', TO.titlecase(key)].join('')] = TO[key];
        });
        */
    }
    exports.to = to;
});
//# sourceMappingURL=to.js.map