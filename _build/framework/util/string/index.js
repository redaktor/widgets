(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../array/helper", "../to", "../lang", "./regexes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var helper_1 = require("../array/helper");
    var to_1 = require("../to");
    var lang_1 = require("../lang");
    var r = require("./regexes");
    var MAX_SAFE_INTEGER = 9007199254740991;
    /* TODO
    FIXME : is functions !!!
      DOC FIXME
      see pwLog / substitute
    */
    /* helpers */
    /* TODO FIXME API member
    function KW(str: any, ...args: any[]) {
      args.unshift([str,'str','string']);
      return kwArgs.apply(null, args);
    }
    */
    function unicodeSize(str) {
        var result = r.Unicode.lastIndex = 0;
        while (r.Unicode.test(str)) {
            result++;
        }
        return result;
    }
    function baseRepeat(str, n) {
        var result = '';
        if (!str || n < 1 || n > MAX_SAFE_INTEGER) {
            return result;
        }
        // Leverage the exponentiation by squaring algorithm for a faster repeat.
        // SeeAlso https://en.wikipedia.org/wiki/Exponentiation_by_squaring !
        do {
            if (n % 2) {
                result += str;
            }
            n = Math.floor(n / 2);
            if (n) {
                str += str;
            }
        } while (n);
        return result;
    }
    function isIterateeCall(value, i, o) {
        if (typeof o !== 'object') {
            return false;
        }
        var type = typeof i;
        if (type === 'number'
            ? (Array.isArray(o) && helper_1.isIndex(i, o.length))
            : (type == 'string' && o.hasOwnProperty(i))) {
            return lang_1.eq(o[i], value);
        }
        return false;
    }
    function paddingStr(length, chars) {
        if (chars === void 0) { chars = ' '; }
        chars = to_1.to(chars, 'string');
        var charsLength = chars.length;
        if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result = baseRepeat(chars, Math.ceil(length / stringSize(chars)));
        return hasUnicode(chars)
            ? helper_1.castSlice(stringToArray(result), 0, length).join('')
            : result.slice(0, length);
    }
    function stripTags(s) {
        return (s.replace(/(<([^>]+)>)/ig, '')) || '';
    }
    exports.stripTags = stripTags;
    function addSlashes(s) {
        return (s.replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\"/g, '\\"')) || '';
    }
    exports.addSlashes = addSlashes;
    /* EXPORTS WITH ONLY 1 ARGUMENT (a string) */
    function hasUnicode(str) {
        return r.HasUnicode.test(str);
    }
    exports.hasUnicode = hasUnicode;
    function hasUnicodeWord(str) {
        return r.HasUnicodeWord.test(str);
    }
    exports.hasUnicodeWord = hasUnicodeWord;
    function unicodeWords(str) {
        return str.match(r.UnicodeWord) || [];
    }
    exports.unicodeWords = unicodeWords;
    function asciiWords(str) {
        return str.match(r.AsciiWord) || [];
    }
    exports.asciiWords = asciiWords;
    function stringToArray(str, splitter) {
        if (splitter === void 0) { splitter = ''; }
        return hasUnicode(str) ? (str.match(r.Unicode) || []) : str.split(splitter);
    }
    exports.stringToArray = stringToArray;
    /**
     * Gets the number of symbols in `string`.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {number} Returns the string size.
     */
    function stringSize(str) {
        return hasUnicode(str) ? unicodeSize(str) : str.length;
    }
    exports.stringSize = stringSize;
    function deburr(str) {
        str = to_1.to(str, 'string');
        var deburrLetter = function (o) { return (function (k) { return (o === null ? undefined : o[k]); }); };
        return str && str.replace(r.Latin, deburrLetter).replace(r.ComboMark, '');
    }
    exports.deburr = deburr;
    function words(str, pattern, guard) {
        str = to_1.to(str, 'string');
        pattern = guard ? void 0 : pattern;
        if (pattern === void 0) {
            return hasUnicodeWord(str) ? unicodeWords(str) : asciiWords(str);
        }
        return str.match(pattern) || [];
    }
    exports.words = words;
    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(str, length, chars) {
        if (chars === void 0) { chars = ' '; }
        var o = KW(str, [length, 'length', 'integer'], [chars, 'chars', 'string']);
        var strLength = o.length ? stringSize(o.str) : 0;
        if (!o.length || strLength >= o.length) {
            return o.str;
        }
        var mid = (o.length - strLength) / 2;
        return (paddingStr(Math.floor(mid), o.chars) +
            o.str +
            paddingStr(Math.ceil(mid), o.chars));
    }
    exports.pad = pad;
    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(str, length, chars) {
        if (chars === void 0) { chars = ' '; }
        var o = KW(str, [length, 'length', 'integer'], [chars, 'chars', 'string']);
        var strLength = o.length ? stringSize(o.str) : 0;
        return (o.length && strLength < o.length)
            ? (o.str + paddingStr(o.length - strLength, o.chars))
            : o.str;
    }
    exports.padEnd = padEnd;
    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(str, length, chars) {
        if (chars === void 0) { chars = ' '; }
        var o = KW(str, [length, 'length', 'integer'], [chars, 'chars', 'string']);
        var strLength = o.length ? stringSize(o.str) : 0;
        return (o.length && strLength < o.length)
            ? (paddingStr(o.length - strLength, o.chars) + o.str)
            : o.str;
    }
    exports.padStart = padStart;
    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * TODO - DOC [arguments OR kwArgs/options]
     */
    function truncate(str, length, omission, separator) {
        if (length === void 0) { length = 30; }
        if (omission === void 0) { omission = ' […]'; }
        var o = KW(str, [length, 'length', 'integer'], [omission, 'omission', 'string'], [separator, 'separator']);
        var Sep = o.separator;
        var strLength = o.str.length;
        if (hasUnicode(o.str)) {
            var Symbols = stringToArray(o.str);
            strLength = Symbols.length;
        }
        if (o.length >= strLength) {
            return o.str;
        }
        var end = o.length - stringSize(o.omission);
        if (end < 1) {
            return o.omission;
        }
        var result = Symbols ? helper_1.castSlice(Symbols, 0, end).join('') : o.str.slice(0, end);
        if (Sep === undefined) {
            return result + o.omission;
        }
        if (Symbols) {
            end += (result.length - end);
        }
        if (Sep instanceof RegExp) {
            if (o.str.slice(end).search(Sep)) {
                var match, substring = result;
                if (!Sep.global) {
                    Sep = RegExp(Sep.source, to_1.to(r.Flags.exec(Sep), 'string') + 'g');
                }
                Sep.lastIndex = 0;
                while ((match = Sep.exec(substring))) {
                    var newEnd = match.index;
                }
                result = result.slice(0, newEnd === undefined ? end : newEnd);
            }
        }
        else if (o.str.indexOf(to_1.to(Sep, 'string'), end) != end) {
            var index = result.lastIndexOf(Sep);
            if (index > -1) {
                result = result.slice(0, index);
            }
        }
        return result + o.omission;
    }
    exports.truncate = truncate;
    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(str, n, guard) {
        if (n === void 0) { n = 1; }
        var o = KW(str, [n, 'n', 'integer'], [guard, 'guard']);
        if (guard && isIterateeCall(str, n, guard)) {
            n = 1;
        }
        return baseRepeat(str, n);
    }
    exports.repeat = repeat;
    /* TODO FIXME TEST: startsWith and truncate
    !! template
    */
    // string, non empty = is
    function str(s) {
        return (typeof s === 'string' && s.trim() != '');
    }
});
//# sourceMappingURL=index.js.map