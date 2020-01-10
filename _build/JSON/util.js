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
    /* TODO - i18n error messages */
    function jsonObject(o) {
        var s = (typeof o === 'string') ? o.replace(/[^\x20-\x7E]/gmi, '') : JSON.stringify(o);
        var safeO;
        try {
            safeO = JSON.parse(s);
        }
        catch (e) {
            try {
                safeO = JSON.parse(JSON.stringify(eval('(' + o + ')')));
            }
            catch (e) {
                safeO = void 0;
            }
        }
        return (typeof safeO === 'object') ? safeO : {};
    }
    exports.jsonObject = jsonObject;
    function checkJSON(o, _path) {
        if (_path === void 0) { _path = '/'; }
        var jsonO = jsonObject(o);
        var JSONtypes = ['boolean', 'string', 'number', 'object'];
        return Object.keys(jsonO).reduce(function (result, key, index) {
            if (jsonO.hasOwnProperty(key) && jsonO[key] === o[key]) {
                return result;
            }
            var isJSONtype = (o[key] === null ||
                (JSONtypes.indexOf(typeof o[key]) > -1) || Array.isArray(o[key]));
            var isPrimitive = (typeof o[key] !== 'object');
            var eSuffix = (isPrimitive) ? 'is not valid.' : 'contained invalid values.';
            return result.concat([{
                    path: (_path + key),
                    primitive: isPrimitive,
                    error: (!isJSONtype) ? typeof o[key] + " is not a valid type." :
                        typeof o[key] + " " + eSuffix,
                    value: o[key]
                }]);
        }, []);
    }
    exports.checkJSON = checkJSON;
    function jsonObjectWithErrors(o, path) {
        if (path === void 0) { path = '/'; }
        var errArr = checkJSON(o, path);
        var jsonO = jsonObject(o);
        console.log('...:', errArr);
        /*
        errArr.forEach((errO) => {
          if (!errO.primitive) {
            if (typeof jsonO === 'object') {
              if (!errO.errors) { errO.errors = []; }
              const newErrors = jsonObjectWithErrors(errO.value, errO.path + '/');
              errO.errors.push(newErrors);
              errArr = errArr.map((aO) => { return (errO.path === aO.path) ? errO : aO; });
            }
          }
        });
        */
        return jsonO; //{value: jsonO, errors: errArr};
    }
    exports.jsonObjectWithErrors = jsonObjectWithErrors;
    ;
});
//# sourceMappingURL=util.js.map