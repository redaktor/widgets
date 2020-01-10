(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "../../regex/fromString", "./bitapSearch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var fromString_1 = require("../../regex/fromString");
    var bitapSearch_1 = require("./bitapSearch");
    exports.SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
    function regexSearch(text, pattern, tokenSeparator) {
        if (tokenSeparator === void 0) { tokenSeparator = / +/g; }
        var regex = new RegExp(fromString_1.regexString(pattern).replace(tokenSeparator, '|'));
        var matches = text.match(regex) || [];
        var isMatch = !!matches;
        var matchedIndices = [];
        if (isMatch) {
            for (var i = 0, matchesLen = matches.length; i <= matchesLen; i += 1) {
                var match = matches[i];
                matchedIndices.push([text.indexOf(match), match.length]);
            }
        }
        // TODO: revisit this score ?
        return { score: isMatch ? 0.5 : 1, isMatch: isMatch, matchedIndices: matchedIndices };
    }
    exports.regexSearch = regexSearch;
    function patternAlphabet(pattern) {
        var mask = {};
        var len = pattern.length;
        for (var i = 0; i < len; i += 1) {
            mask[pattern.charAt(i)] = 0;
        }
        for (var i = 0; i < len; i += 1) {
            mask[pattern.charAt(i)] |= 1 << (len - i - 1);
        }
        return mask;
    }
    exports.patternAlphabet = patternAlphabet;
    var Bitap = /** @class */ (function () {
        function Bitap(pattern, options) {
            if (options === void 0) { options = {}; }
            this.patternAlphabet = '';
            var _a = (this.properties = tslib_1.__assign({ 
                // Approximately where in the text is the pattern expected to be found?
                location: 0, 
                // Determines how close the match must be to the fuzzy location (specified above).
                // An exact letter match which is 'distance' characters away from the fuzzy location
                // would score as a complete mismatch. A distance of '0' requires the match be at
                // the exact location specified, a threshold of '1000' would require a perfect match
                // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
                distance: 100, 
                // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
                // (of both letters and location), a threshold of '1.0' would match anything.
                threshold: 0.75, 
                // Machine word size
                maxPatternLength: 36, 
                // Indicates whether comparisons should be case sensitive.
                caseSensitive: false, 
                // Regex used to separate words when searching. Only applicable when `tokenize` is `true`.
                tokenSeparator: / +/g, 
                // When true, the algorithm continues searching to the end of the input even if a perfect
                // match is found before the end of the same input.
                findAllMatches: false, 
                // ...
                // weightLocation: false,
                // Minimum number of characters that must be matched before a result is considered a match
                minMatchCharLength: 1 }, options)).maxPatternLength, maxPatternLength = _a === void 0 ? 36 : _a;
            this.pattern = this.properties.caseSensitive ? pattern : pattern.toLowerCase();
            if (this.pattern.length <= maxPatternLength) {
                this.patternAlphabet = patternAlphabet(this.pattern);
            }
        }
        Bitap.prototype.search = function (text) {
            if (!this.properties.caseSensitive) {
                text = text.toLowerCase();
            }
            var searchBase = { needle: this.pattern, haystack: text };
            // Exact match
            if (this.pattern === text) {
                return tslib_1.__assign({ isMatch: true, score: 0, matchedIndices: [[0, text.length]] }, searchBase);
            }
            // When pattern length is greater than the machine word length, just do a a regex comparison
            var _a = this.properties, _b = _a.maxPatternLength, maxPatternLength = _b === void 0 ? 36 : _b, tokenSeparator = _a.tokenSeparator;
            if (this.pattern.length > maxPatternLength) {
                return regexSearch(text, this.pattern, tokenSeparator);
            }
            // Otherwise, use Bitap algorithm
            var _c = this.properties, _d = _c.location, location = _d === void 0 ? 0 : _d, _e = _c.distance, distance = _e === void 0 ? 100 : _e, _f = _c.threshold, threshold = _f === void 0 ? 0.75 : _f, _g = _c.findAllMatches, findAllMatches = _g === void 0 ? false : _g, _h = _c.minMatchCharLength, minMatchCharLength = _h === void 0 ? 1 : _h;
            return tslib_1.__assign({}, bitapSearch_1.default(text, this.pattern, this.patternAlphabet, {
                location: location,
                distance: distance,
                threshold: threshold,
                findAllMatches: findAllMatches,
                minMatchCharLength: minMatchCharLength
            }), searchBase);
        };
        return Bitap;
    }());
    exports.default = Bitap;
});
// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)
//# sourceMappingURL=index.js.map