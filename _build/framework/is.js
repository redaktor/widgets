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
    function is(data, evtType) {
        var type = (typeof data);
        if (data === void 0) {
            type = 'undefined';
        }
        else if (data === null) {
            type = 'null';
        }
        else if (type === 'number') {
            if (isNaN(data)) {
                type = 'NaN';
            }
            else if ((isFinite(data) && Math.floor(data) === data)) {
                type = 'integer';
            }
        }
        else if (type === 'object') {
            type = (data instanceof Array) ? 'array' : 'object';
        }
        if (typeof evtType === 'string') {
            return (evtType === 'number' && type === 'integer') ? true : (evtType === type);
        }
        return type;
    }
    exports.default = is;
});
//# sourceMappingURL=is.js.map