(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./regex/regexesTrim", "./slice"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regexesTrim_1 = require("./regex/regexesTrim");
    var slice_1 = require("./slice");
    function symbolsForTrim(str, chars, guard, regexSuffix) {
        if (regexSuffix === void 0) { regexSuffix = ''; }
        str = "" + str;
        chars = "" + chars;
        if (!str.length) {
            return '';
        }
        if (str && (guard || chars === undefined)) {
            return str.replace(regexesTrim_1.trimAll, '');
        }
        return Array.from(str);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && chrSymbols.indexOf(strSymbols[index]) > -1) { }
        return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && chrSymbols.indexOf(strSymbols[index]) > -1) { }
        return index;
    }
    function baseTrim(str, chars, guard, type) {
        var strSymbols = symbolsForTrim(str, chars, guard);
        if (typeof strSymbols === 'string') {
            return strSymbols;
        }
        var chrSymbols = Array.from(chars);
        var start = type === 'End' ? 0 : charsStartIndex(strSymbols, chrSymbols);
        var end = type === 'Start' ? void 0 : charsEndIndex(strSymbols, chrSymbols) + 1;
        return slice_1.default(strSymbols, start, end).join('');
    }
    exports.baseTrim = baseTrim;
    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(str, chars, guard, type) {
        return baseTrim(str, chars, guard);
    }
    exports.trim = trim;
    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(str, chars, guard) {
        return baseTrim(str, chars, guard, 'End');
    }
    exports.trimEnd = trimEnd;
    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(str, chars, guard) {
        return baseTrim(str, chars, guard, 'Start');
    }
    exports.trimStart = trimStart;
});
//# sourceMappingURL=trim.js.map