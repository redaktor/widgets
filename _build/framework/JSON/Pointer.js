(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./PatchError", "../lang/isInteger", "../lang/to"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var PatchError_1 = require("./PatchError");
    var isInteger_1 = require("../lang/isInteger");
    var to_1 = require("../lang/to");
    var POINTER_OPTIONS = {
        validate: false,
        protectRoot: true,
        mutateDocument: false
    };
    //The pointer / doesn’t point to the root, it points to a key of '' on the root.
    var JSONpointer = /** @class */ (function () {
        function JSONpointer(root, options) {
            if (root === void 0) { root = {}; }
            if (options === void 0) { options = POINTER_OPTIONS; }
            this.root = root;
            this.options = options;
            this.options = tslib_1.__assign({}, POINTER_OPTIONS, options);
        }
        JSONpointer.prototype.tokens = function (pointer) {
            if (pointer === void 0) { pointer = ''; }
            return typeof pointer === 'string' ? this.parse(pointer) :
                (Array.isArray(pointer) ? pointer : [to_1.toStr("/" + pointer)]);
        };
        /**
         * Tests if an object has a value for a json pointer
         *
         * @param pointer
         * @returns {boolean}
         */
        JSONpointer.prototype.has = function (pointer) {
            return typeof this.get(pointer) !== 'undefined';
        };
        /**
        * Lookup a json pointer in an object
        *
        * @param {String|Array} pointer
        * @returns {*}
        */
        JSONpointer.prototype.get = function (pointer) {
            var refTokens = this.tokens(pointer);
            if (!refTokens) {
                return void 0;
            }
            var L = refTokens.length;
            if (!L) {
                return this.root;
            }
            var o = this.root;
            for (var i = 0; i < L; ++i) {
                var tok = refTokens[i];
                if (tok === '#') {
                    continue;
                }
                if (typeof o !== 'object' || !(tok in o)) {
                    return o;
                }
                o = o[tok];
            }
            return o;
        };
        /**
        * Sets a value on an object
        *
        * @param {String|Array} pointer
        * @param value
        */
        JSONpointer.prototype.set = function (pointer, value, replacing) {
            if (replacing === void 0) { replacing = true; }
            var refTokens = this.tokens(pointer);
            //console.log('refTokens',refTokens);
            if (!refTokens) {
                return void 0;
            }
            if (this.options.protectRoot && !refTokens.length) {
                throw Error('Cannot set the root object');
            }
            var key = refTokens[0];
            var o = this.root;
            for (var i = 0; i < refTokens.length - 1; ++i) {
                var tok = refTokens[i];
                if (tok === '-' && Array.isArray(o)) {
                    tok = "" + o.length;
                }
                key = refTokens[i + 1];
                if (!(tok in o)) {
                    o[tok] = (key.match(/^(\d+|-)$/)) ? [] : {};
                }
                o = o[tok];
            }
            if (Array.isArray(o)) {
                var L = o.length;
                if (key === '-') {
                    key = L;
                }
                else {
                    if (this.options.validate && !isInteger_1.isIntegerString(key)) {
                        throw new PatchError_1.default('OPERATION_PATH_ILLEGAL_ARRAY_INDEX');
                    }
                    else if (isInteger_1.isIntegerString(key)) { // only parse key when it's an integer for `arr.prop` to work
                        if (this.options.validate && parseInt(key) > L) {
                            throw new PatchError_1.default('OPERATION_VALUE_OUT_OF_BOUNDS');
                        }
                        key = ~~key;
                    }
                }
                if (!replacing) {
                    o.splice(~~key, 0, value);
                    return this;
                }
            }
            o[key] = value;
            return this;
        };
        /**
        * Removes an attribute
        *
        * @param {String|Array} pointer
        */
        JSONpointer.prototype.remove = function (pointer) {
            var refTokens = this.tokens(pointer);
            var finalToken = refTokens[refTokens.length - 1];
            if (finalToken === undefined) {
                return void 0;
            }
            var parent = this.get(refTokens.slice(0, -1));
            if (Array.isArray(parent)) {
                var index = +finalToken;
                if (index < parent.length) {
                    Array.prototype.splice.call(parent, index, 1);
                }
            }
            else {
                delete parent[finalToken];
            }
            return this;
        };
        /**
        * Returns a (pointer -> value) dictionary for an object
        *
        * @param {function} descend
        * @returns {}
        */
        JSONpointer.prototype.dict = function (descend) {
            var results = {};
            this.walk(function (value, pointer) { results[pointer] = value; }, descend);
            return results;
        };
        /**
        * Iterates over an object
        * Iterator: function (value, pointer) {}
        *
        * @param obj
        * @param {function} iterator
        * @param {function} descend
        */
        JSONpointer.prototype.walk = function (iterator, descend) {
            var _this = this;
            if (descend === void 0) { descend = function (value) {
                var type = Object.prototype.toString.call(value);
                return type === '[object Object]' || type === '[object Array]';
            }; }
            var refTokens = [];
            var next = function (cur) {
                for (var key in cur) {
                    refTokens.push(String(key));
                    if (descend(cur[key])) {
                        next(cur[key]);
                    }
                    else {
                        iterator(cur[key], _this.compile(refTokens));
                    }
                    refTokens.pop();
                }
            };
            (next(this.root));
            return true;
        };
        /**
         * Builds a json pointer from an array of reference tokens
         *
         * @param refTokens
         * @returns {string}
         */
        JSONpointer.prototype.compile = function (refTokens) {
            if (refTokens.length === 0) {
                return '';
            }
            return '/' + refTokens.map(this.escape).join('/');
        };
        /**
         * Escapes a reference token
         *
         * @param str
         * @returns {string}
         */
        JSONpointer.prototype.escape = function (str) { return escape(str); };
        /**
         * Unescapes a reference token
         *
         * @param str
         * @returns {string}
         */
        JSONpointer.prototype.unescape = function (str) { return unescape(str); };
        /**
         * Converts a json pointer into an array of reference tokens
         *
         * @param pointer
         * @returns {Array}
         */
        JSONpointer.prototype.parse = function (pointer) { return parse(pointer); };
        return JSONpointer;
    }());
    exports.JSONpointer = JSONpointer;
    function escape(str) {
        return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
    }
    exports.escape = escape;
    function unescape(str) {
        return str.replace(/~1/g, '/').replace(/~0/g, '~');
    }
    exports.unescape = unescape;
    function parse(pointer) {
        if (typeof pointer !== 'string' || pointer === '') {
            return [];
        }
        if (pointer.charAt(0) !== '/') {
            pointer = "/" + pointer;
        }
        return pointer.substring(1).split(/\//).map(unescape);
    }
    exports.parse = parse;
    function jsonpointer(obj, pointer, value) {
        var P = new JSONpointer(obj);
        if (typeof pointer === 'string') {
            if (typeof value !== 'undefined') { // .set()
                return P.set(pointer, value);
            }
            else { // .get()
                return P.get(pointer);
            }
        }
        return P;
    }
    exports.default = jsonpointer;
});
//# sourceMappingURL=Pointer.js.map