(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    function bitapScore(pattern, _a) {
        var _b = _a.errors, errors = _b === void 0 ? 0 : _b, _c = _a.current, current = _c === void 0 ? 0 : _c, _d = _a.expected, expected = _d === void 0 ? 0 : _d, _e = _a.distance, distance = _e === void 0 ? 100 : _e;
        var accuracy = errors / pattern.length;
        var proximity = Math.abs(expected - current);
        if (!distance) {
            // Dodge divide by zero error.
            return proximity ? 1.0 : accuracy;
        }
        return accuracy + (proximity / distance);
    }
    exports.bitapScore = bitapScore;
    function matchedIndices(matchmask, minMatchCharLength) {
        if (matchmask === void 0) { matchmask = []; }
        if (minMatchCharLength === void 0) { minMatchCharLength = 1; }
        var matchedIndices = [];
        var _a = tslib_1.__read([-1, -1, 0], 3), start = _a[0], end = _a[1], i = _a[2];
        for (var len = matchmask.length; i < len; i += 1) {
            var match = matchmask[i];
            if (match && start === -1) {
                start = i;
            }
            else if (!match && start !== -1) {
                end = i - 1;
                if ((end - start) + 1 >= minMatchCharLength) {
                    matchedIndices.push([start, end + 1]);
                }
                start = -1;
            }
        }
        // (i-1 - start) + 1 => i - start
        if (matchmask[i - 1] && (i - start) >= minMatchCharLength) {
            matchedIndices.push([start, i]);
        }
        return matchedIndices;
    }
    exports.matchedIndices = matchedIndices;
    function bitapSearch(text, pattern, patternAlphabet, _a) {
        var _b = _a.location, location = _b === void 0 ? 0 : _b, _c = _a.distance, distance = _c === void 0 ? 100 : _c, _d = _a.threshold, threshold = _d === void 0 ? 0.6 : _d, _e = _a.findAllMatches, findAllMatches = _e === void 0 ? false : _e, _f = _a.minMatchCharLength, minMatchCharLength = _f === void 0 ? 1 : _f;
        //console.log(text);
        var expected = location;
        // Set starting location at beginning text and initialize the alphabet.
        var textLen = text.length;
        // Highest score beyond which we give up.
        var currentThreshold = threshold;
        // Is there a nearby exact match? (speedup)
        var bestLocation = text.indexOf(pattern, expected);
        var current = bestLocation;
        var patternLen = pattern.length;
        // a mask of the matches
        var matchMask = [];
        for (var i = 0; i < textLen; i += 1) {
            matchMask[i] = 0;
        }
        if (bestLocation !== -1) {
            var score = bitapScore(pattern, { errors: 0, current: current, expected: expected, distance: distance });
            currentThreshold = Math.min(score, currentThreshold);
            // What about in the other direction? (speed up)
            current = bestLocation = text.lastIndexOf(pattern, expected + patternLen);
            if (bestLocation !== -1) {
                var score_1 = bitapScore(pattern, { errors: 0, current: current, expected: expected, distance: distance });
                currentThreshold = Math.min(score_1, currentThreshold);
            }
        }
        // Reset the best location
        bestLocation = -1;
        var lastBitArr = [];
        var finalScore = 1;
        var binMax = patternLen + textLen;
        var mask = 1 << (patternLen - 1);
        for (var errors = 0; errors < patternLen; errors += 1) {
            // Scan for the best match; each iteration allows for one more error.
            // Run a binary search to determine how far from the match location we can stray
            // at this error level.
            var binMin = 0;
            var binMid = binMax;
            while (binMin < binMid) {
                var current_1 = expected + binMid;
                var score_2 = bitapScore(pattern, { errors: errors, current: current_1, expected: expected, distance: distance });
                if (score_2 <= currentThreshold) {
                    binMin = binMid;
                }
                else {
                    binMax = binMid;
                }
                binMid = Math.floor((binMax - binMin) / 2 + binMin);
            }
            // Use the result from this iteration as the maximum for the next.
            binMax = binMid;
            var start = Math.max(1, expected - binMid + 1);
            var finish = findAllMatches ? textLen : Math.min(expected + binMid, textLen) + patternLen;
            // Initialize the bit array
            var bitArr = Array(finish + 2);
            bitArr[finish + 1] = (1 << errors) - 1;
            for (var j = finish; j >= start; j -= 1) {
                var current_2 = j - 1;
                var charMatch = patternAlphabet[text.charAt(current_2)];
                if (charMatch) {
                    matchMask[current_2] = 1;
                }
                // First pass: exact match
                bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;
                // Subsequent passes: fuzzy match
                if (errors !== 0) {
                    bitArr[j] |= (((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1) | lastBitArr[j + 1];
                }
                if (bitArr[j] & mask) {
                    var lengthProximity = text.length > pattern.length ?
                        (text.length / pattern.length / distance) : (pattern.length / text.length / distance);
                    var score_3 = bitapScore(pattern, { errors: errors, current: current_2, expected: expected, distance: distance });
                    finalScore = Math.min(score_3 + lengthProximity, 1);
                    // This match will almost certainly be better than any existing match.
                    // But check anyway.
                    if (finalScore <= currentThreshold) {
                        // Indeed it is
                        currentThreshold = finalScore;
                        bestLocation = current_2;
                        // Already passed `loc`, downhill from here on in.
                        if (bestLocation <= expected) {
                            break;
                        }
                        // When passing `bestLocation`, don't exceed our current distance from `expected`.
                        start = Math.max(1, 2 * expected - bestLocation);
                    }
                }
            }
            // No hope for a (better) match at greater error levels.
            var score = bitapScore(pattern, {
                errors: errors + 1,
                current: expected,
                expected: expected,
                distance: distance
            });
            // console.log('score', score, finalScore)
            if (score > currentThreshold) {
                break;
            }
            lastBitArr = bitArr;
        }
        // Count exact matches (those with a score of 0) to be "almost" exact
        return {
            isMatch: bestLocation >= 0,
            score: finalScore === 0 ? 0.001 : finalScore,
            matchedIndices: matchedIndices(matchMask, minMatchCharLength)
        };
    }
    exports.default = bitapSearch;
});
//# sourceMappingURL=bitapSearch.js.map