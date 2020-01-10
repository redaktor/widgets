(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/shim/Symbol", "./array/main"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Symbol_1 = require("@dojo/framework/shim/Symbol");
    var main_1 = require("./array/main");
    var toS = Object.prototype.toString;
    /* TODO - ADD TYPE + check if not in list and if valid parent */
    /* toString
    null values SHOULD be replaced by the text "null"
    boolean values SHOULD be replaced by their lower-case equivalents: "true" or "false"
    numbers SHOULD be replaced with their original JSON representation.
    */
    /*
    
        _.isArrayBuffer
        _.isArrayLike
        _.isArrayLikeObject
        _.isObjectLike
    
        _.isNil,_.isNull
    
    _.isSymbol
    _.isBuffer
    _.isMap
    _.isSet
    _.isTypedArray
    _.isWeakMap
    _.isWeakSet
    
    _.isNative
    _.isArguments
    _.isElement
    _.isEmpty
    _.isEqual
    _.isEqualWith
    _.isError
    _.isLength
    
    _.isMatch
    _.isMatchWith
    _.isFinite
    _.isNaN
    _.isSafeInteger
    */
    var _SCHEMATYPES = {
        array: { description: 'A JSON array' },
        boolean: { description: 'A JSON boolean.' },
        integer: { description: 'A JSON number without a fraction or exponent part.' },
        number: { description: 'Any JSON number. Number includes integer.' },
        null: { description: 'The JSON null value.' },
        object: { description: 'A JSON object.' },
        string: { description: 'A JSON string.' }
    };
    exports.TYPES = [
        {
            id: 'null',
            parent: null,
            is: function (v) { return (v === null); },
            from: {
                any: function (v) { return null; },
            }
        },
        {
            id: 'array',
            parent: 'object',
            is: function (v) { return (v instanceof Array); },
            from: {
                string: function (s) {
                    if (s.substring(0, 1) === '[' && s.slice(-1) === ']') {
                        try {
                            var n = JSON.parse(s);
                        }
                        catch (e) { }
                        if (Array.isArray(n)) {
                            return n;
                        }
                    }
                    return s.split(String(',')).map(Function.prototype.call, String.prototype.trim);
                },
                any: function (v) { return [v]; }
            }
        },
        {
            id: 'boolean',
            parent: null,
            is: function (v) { return (typeof v === 'boolean'); },
            from: {
                string: function (s) { return (s.toLowerCase() === 'false') ? false : (!!s); },
                any: function (v) { return (!!v); }
            }
        },
        {
            id: 'isodate',
            parent: 'string',
            is: function (v) {
                if (typeof v === 'string') {
                    var re = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
                    return re.test(v);
                }
                return false;
            },
            from: {
                string: function (v) {
                    // four-digit year
                    var d = '0000'.substr(0, 4 - v.length) + v;
                    // pattern for partial dates
                    d += '0000-01-01T00:00:00Z'.substring(v.length);
                    return exports.to(d, 'date');
                }
                /* TODO number etc. */
            }
        },
        {
            id: 'date',
            parent: 'object',
            is: function (v) { return (v instanceof Date); },
            from: {
                integer: function (v) {
                    var d = new Date(v);
                    return (isNaN(d.getTime())) ? void 0 : d;
                },
                number: function (v) {
                    var d = new Date(v);
                    return (isNaN(d.getTime())) ? void 0 : d;
                },
                string: function (v) {
                    var d;
                    var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/.exec(v);
                    if (isoDate) {
                        d = new Date(Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3], +isoDate[4], +isoDate[5], +isoDate[6], +isoDate[7] || 0));
                    }
                    else {
                        d = new Date(+v);
                    }
                    return (isNaN(d.getTime())) ? void 0 : d;
                }
            }
        },
        {
            id: 'integer',
            parent: 'number',
            is: function (v) { return (((isFinite(v) && Math.floor(v) === v))); },
            from: {
                string: function (s) {
                    if (!s.trim().length) {
                        return s;
                    }
                    var n = Number(String(s.replace(/ /g, '')));
                    /* TODO - if NaN : .nlp */
                    if (typeof n === 'number') {
                        return (isNaN(n)) ? s : n;
                    }
                },
                number: function (n) { return Math.round(n); },
                boolean: function (b) { return (b === true) ? 1 : 0; },
                date: function (d) { return +d; }
            }
        },
        {
            id: 'number',
            parent: null,
            is: function (v) { return (typeof v === 'number'); },
            from: {
                string: function (s) {
                    if (!s.trim().length) {
                        return s;
                    }
                    var n = Number(String(s.replace(/,/g, '.').replace(/ /g, '')));
                    return ((isNaN(n) === true) ? void 0 : n);
                    /* TODO - if NaN : .nlp */
                },
                boolean: function (b) { return (b === true) ? 1 : 0; },
                date: function (d) { return +d; }
            }
        },
        {
            id: 'object',
            parent: null,
            is: function (v) { return (typeof v === 'object'); },
            from: {
                array: function (a) {
                    return a.reduce(function (o, v, i) {
                        o[i.toString()] = v;
                        return o;
                    }, {});
                },
                string: function (s) {
                    var o = s;
                    try {
                        o = JSON.parse(s);
                    }
                    catch (e) {
                        return void 0;
                    }
                    return (typeof o === 'object') ? o : s;
                }
            }
        },
        {
            id: 'string',
            parent: null,
            is: function (v) { return (typeof v === 'string'); },
            from: {
                symbol: function (v) { return (Symbol_1.default && Symbol_1.default.prototype.toString) ? Symbol_1.default.prototype.toString.call(v) : ''; },
                boolean: function (b) { return b.toString(); },
                date: function (d) { return d.toString(); },
                any: function (v) {
                    var result = (v + '');
                    return (result == '0' && (1 / v) === -(1 / 0)) ? '-0' : result;
                }
            }
            /* else if (t === 'array') {
                // If user authorize array and strings...
                if (schema.items || schema.properties)
                    return v;
                return v.join(String(schema.joinWith || ','));
            } else if (t === 'object') {
                // If user authorize objects and strings...
                if (schema.items || schema.properties)
                    return v;
                return JSON.stringify(v);
            }
        */
        },
        {
            id: 'symbol',
            parent: null,
            is: function (v) { return (typeof v === 'symbol' || (v && typeof v === 'object' && toS.call(v) === '[object Symbol]')); },
            from: {}
        },
        {
            id: 'regex',
            parent: 'object',
            is: function (v) { return ((v instanceof RegExp) && v.ignoreCase); },
            from: {
                /* TODO - FIXME .regex */
                glob: function (s) {
                    s = s.replace(/([\\|\||\(|\)|\[|\{|\^|\$|\*|\+|\?|\.|\<|\>])/g, function (x) { return '\\' + x; }).replace(/\\\*/g, '.*').replace(/\\\?/g, '.?');
                    if (s.substring(0, 2) !== '.*') {
                        s = '^' + s;
                    }
                    else {
                        s = s.substring(2);
                    }
                    if (s.substring(s.length - 2) !== '.*') {
                        s = s + '$';
                    }
                    else {
                        s = s.substring(0, s.length - 2);
                    }
                    return new RegExp(s, 'i');
                },
                string: function (s) { return new RegExp(s, 'i'); }
            }
        },
        {
            id: 'REGEX',
            parent: 'object',
            is: function (v) { return ((v instanceof RegExp)); },
            from: {
                /* TODO - FIXME .regex */
                string: function (s) { return new RegExp(s); }
            }
        },
        {
            id: 'glob',
            parent: 'string',
            is: function (v) {
                /* TODO - FIXME */
                if (typeof v === 'string' && v.indexOf('*') > -1) {
                    return true;
                }
                return false;
            },
            from: {
            /* TODO - FIXME */
            //string: (s: string) =>
            }
        },
        {
            id: 'TEST',
            parent: 'glob',
            is: function (v) {
                /* TODO - FIXME */
                if (typeof v === 'string' && v.indexOf('**') > -1) {
                    return true;
                }
                return false;
            },
            from: {}
        }
        /*, //TODO FIXME // string transformation // case */
    ];
    exports.TYPEMAP = {};
    exports.TYPETREE = main_1.toTree(exports.TYPES);
    exports.TYPES.map(function (rootO, i) {
        if (typeof rootO.id === 'string') {
            exports.TYPEMAP[rootO.id] = i;
            if (_SCHEMATYPES.hasOwnProperty(rootO.id)) {
                _SCHEMATYPES[rootO.id].format = rootO;
            }
        }
    });
    exports.SCHEMATYPES = _SCHEMATYPES;
});
//# sourceMappingURL=formats.js.map