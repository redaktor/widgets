(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../dojo/core/main", "./formats", "./lang"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var main_1 = require("../../dojo/core/main");
    var formats_1 = require("./formats");
    var lang_1 = require("./lang");
    /* TODO : see ./formats */
    function _getFormat(type, describe) {
        if (describe !== true) {
            return type;
        }
        var o = {
            id: type,
            description: ['The JS', type, 'type.'].join(' ')
        };
        if (formats_1.SCHEMATYPES.hasOwnProperty(type)) {
            main_1.lang.mixin(o, formats_1.SCHEMATYPES[type] || { description: '' });
        }
        formats_1.TYPES.map(function (fO) {
            if (fO.id === type) {
                o = main_1.lang.mixin(fO, formats_1.SCHEMATYPES[type] || { description: '' });
            }
        });
        return o;
    }
    function _getChildren(data, rootArr, formatO, describe) {
        if (!formatO.hasOwnProperty('children') || !Array.isArray(formatO.children)) {
            return rootArr;
        }
        formatO.children.map(function (format) {
            if (format.is(data)) {
                rootArr.push(_getFormat(format.id, describe));
                if (format.hasOwnProperty('children') && Array.isArray(format.children)) {
                    rootArr = _getChildren(data, rootArr, format, describe);
                }
            }
            return format;
        });
        return rootArr;
    }
    function isAn(data, typeOrDescribe) {
        var type = is(data);
        if ((data === void 0 && typeof typeOrDescribe === 'string' && typeOrDescribe !== 'undefined') ||
            (data === null && typeof typeOrDescribe === 'string' && typeOrDescribe !== 'null')) {
            return false;
        }
        var root = [_getFormat(type, typeOrDescribe)];
        if (lang_1.getDottedProperty(formats_1.SCHEMATYPES, [type, 'format'])) {
            if (formats_1.SCHEMATYPES[type].format.parent) {
                var pType = formats_1.SCHEMATYPES[type].format.parent;
                if (typeOrDescribe === true) {
                    root[0].parent = pType;
                }
                root.unshift(_getFormat(pType, typeOrDescribe));
            }
            return _getChildren(data, root, formats_1.SCHEMATYPES[type].format, typeOrDescribe);
        }
        if (typeOrDescribe !== true) {
            root[0] = root[0].id;
        }
        if (typeof typeOrDescribe === 'string') {
            return (root.indexOf(typeOrDescribe) >= 0);
        }
        return root;
    }
    exports.isAn = isAn;
    // string, non empty
    function str(s) {
        return (typeof s === 'string' && s.trim() !== '');
    }
});
/* TODO ?
export function ifIs(value: any, isType: string) {
  var type = isSync(value);
  if (!JSONTYPES.hasOwnProperty(isType) && (typeof value === 'number') && (isNaN(value))) {
      type = 'NaN';
  }
  (isType === type) ? ifIs.resolve(true) : ifIs.reject(false);
}
*/
//# sourceMappingURL=isAn.js.map