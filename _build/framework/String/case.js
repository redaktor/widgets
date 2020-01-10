(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./regex/regexApostroph", "./slug", "./checks", "./slice", "./words"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regexApostroph_1 = require("./regex/regexApostroph");
    var slug_1 = require("./slug");
    var checks_1 = require("./checks");
    var slice_1 = require("./slice");
    var words_1 = require("./words");
    //import { each } from '../Collection/each';
    function caseFirstFn(methodName) {
        return function (str) {
            str = "" + str;
            var Symbols = checks_1.hasUnicode(str) ? Array.from(str) : null;
            var chr = Symbols ? Symbols[0] : str.charAt(0);
            var trailing = Symbols ? slice_1.default(Symbols, 1).join('') : str.slice(1);
            return chr[methodName]() + trailing;
        };
    }
    function caseFn(cb) {
        return function (str) { return words_1.default(slug_1.deburr(str).replace(regexApostroph_1.default, '')).reduce(cb, ''); };
    }
    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(str) {
        str = ("" + str).toLowerCase();
        return exports.upperFirst(str);
    }
    exports.capitalize = capitalize;
    /**
    * Converts the first character of `string` to upper case.
    *
    * @static
    * @memberOf _
    * @since 4.0.0
    * @category String
    * @param {string} [string=''] The string to convert.
    * @returns {string} Returns the converted string.
    * @example
    *
    * _.upperFirst('fred');
    * // => 'Fred'
    *
    * _.upperFirst('FRED');
    * // => 'FRED'
    */
    exports.upperFirst = caseFirstFn('toUpperCase');
    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    exports.lowerFirst = caseFirstFn('toLowerCase');
    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    exports.upperCase = caseFn(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toUpperCase();
    });
    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    exports.lowerCase = caseFn(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toLowerCase();
    });
    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(str) {
        return ("" + str).toLowerCase();
    }
    exports.toLower = toLower;
    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(str) {
        return ("" + str).toUpperCase();
    }
    exports.toUpper = toUpper;
    /* case formats ... TODO might go to formats - TODO doc */
    exports.readable = function (s) {
        return (!s) ? '' : s.replace(/([A-Z])/g, function ($1) { return [' ', $1.toLowerCase()].join(''); });
    };
    exports.camelCase = caseFn(function (result, word, index) {
        return result + (index ? capitalize(word) : word.toLowerCase());
    });
    exports.pascalCase = caseFn(function (result, word, index) {
        return result + capitalize(word);
    }); // PascalCase
    exports.kebapCase = caseFn(function (result, word, index) {
        return result + (index ? '-' : '') + word.toLowerCase();
    }); // kebap-case
    exports.snakeCase = caseFn(function (result, word, index) {
        return result + (index ? '_' : '') + word.toLowerCase();
    }); // snake_case
    exports.startCase = caseFn(function (result, word, index) {
        return result + (index ? ' ' : '') + exports.upperFirst(word);
    }); // Start Case Anyword
});
//# sourceMappingURL=case.js.map