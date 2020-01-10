(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./bitap", "../../Array/diu", "../../lang/isArrayTypes", "./deepValue"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var bitap_1 = require("./bitap");
    var diu_1 = require("../../Array/diu");
    var isArrayTypes_1 = require("../../lang/isArrayTypes");
    var deepValue_1 = require("./deepValue");
    var dv = ['./', 'NO'];
    var StringSearch = /** @class */ (function () {
        function StringSearch(list, options) {
            this.tokens = new Map();
            this.properties = tslib_1.__assign({ 
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
                threshold: 0.6, 
                // Machine word size
                maxPatternLength: 32, 
                // Indicates whether comparisons should be case sensitive.
                caseSensitive: false, 
                // Regex used to separate words when searching. Only applicable when `tokenize` is `true`.
                tokenSeparator: / +/g, 
                // When true, the algorithm continues searching to the end of the input even if a perfect
                // match is found before the end of the same input.
                findAllMatches: false, 
                // Minimum number of characters that must be matched before a result is considered a match
                minMatchCharLength: 1, 
                // The name of the identifier property. If specified, the returned result will be a list
                // of the items' identifiers, otherwise it will be a list of the items.
                id: null, 
                // List of properties that will be searched. This also supports nested properties.
                keys: [], 
                // Whether to sort the result list, by score
                shouldSort: true, 
                // The get function to use when fetching an object's properties.
                // The default will search nested paths *ie foo.bar.baz*
                getFn: deepValue_1.default, 
                // Default sort function
                sortFn: function (a, b) { return (a.score - b.score); }, 
                // When true, the search algorithm will search individual words **and** the full string,
                // computing the final score as a function of both. Note that when `tokenize` is `true`,
                // the `threshold`, `distance`, and `location` are inconsequential for individual tokens.
                tokenize: false, 
                // When true, the result set will only include records that match all tokens. Will only work
                // if `tokenize` is also true.
                matchAllTokens: false, 
                // Will print to the console. Useful for debugging.
                verbose: false }, options);
            this._log("---------\nSearch properties:", this.properties);
            this.collection = list;
            this.tokens = new Map();
        }
        Object.defineProperty(StringSearch.prototype, "collection", {
            set: function (list) {
                this._list = list;
            },
            enumerable: true,
            configurable: true
        });
        StringSearch.prototype.test = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var widget;
                return tslib_1.__generator(this, function (_a) {
                    var _b;
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (_b = dv[0] + 'deepValue', __syncRequire ? Promise.resolve().then(function () { return require(_b); }) : new Promise(function (resolve_1, reject_1) { require([_b], resolve_1, reject_1); }))];
                        case 1:
                            widget = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        StringSearch.prototype.search = function (pattern) {
            this._log("---------\nSearch pattern: \"" + pattern + "\"");
            var _a = this._prepareSearchers(pattern), fullSearcher = _a.fullSearcher, tokenSearchers = _a.tokenSearchers;
            var _b = this._search(fullSearcher, tokenSearchers), weights = _b.weights, results = _b.results;
            this._computeScore(weights, results);
            this.properties.shouldSort && this._sort(results);
            return this._format(results);
        };
        StringSearch.prototype._prepareSearchers = function (pattern) {
            if (pattern === void 0) { pattern = ''; }
            var tokenSearchers = [];
            if (this.properties.tokenize) {
                var _a = this.properties.tokenSeparator, tokenSeparator = _a === void 0 ? / +/g : _a;
                var tokens = pattern.split(tokenSeparator);
                for (var i = 0, len = tokens.length; i < len; i += 1) {
                    tokenSearchers.push(new bitap_1.default(tokens[i], this.properties));
                }
            }
            var fullSearcher = new bitap_1.default(pattern, this.properties);
            return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
        };
        StringSearch.prototype._search = function (fullSearcher, tokenSearchers) {
            var _a = this.properties, _b = _a.keys, keys = _b === void 0 ? [] : _b, _c = _a.getFn, getFn = _c === void 0 ? deepValue_1.default : _c;
            var list = this._list;
            var resultMap = {};
            var results = [];
            // Check the first item in the list, if it's a string, then we assume that
            // every item in the list is also a string, and thus it's a flattened array.
            if (typeof list[0] === 'string') {
                // Iterate over every item
                for (var i = 0, len = list.length; i < len; i += 1) {
                    this._analyze({
                        key: '',
                        value: list[i],
                        record: list[i],
                        index: i
                    }, {
                        resultMap: resultMap,
                        results: results,
                        tokenSearchers: tokenSearchers,
                        fullSearcher: fullSearcher
                    });
                }
                return { weights: null, results: results };
            }
            // Otherwise, the first item is an Object (hopefully), and thus
            // the searching is done on the values of the keys of each item.
            var weights = {};
            for (var i = 0, len = list.length; i < len; i += 1) {
                var item = list[i];
                // Iterate over every key
                for (var j = 0, keysLen = keys.length; j < keysLen; j += 1) {
                    var key = keys[j];
                    if (typeof key === 'object') {
                        weights[key.name] = { weight: (1 - key.weight) || 1 };
                        if (key.weight <= 0 || key.weight > 1) {
                            throw new Error('Key weight has to be > 0 and <= 1');
                        }
                        key = key.name;
                    }
                    else {
                        weights[key] = {
                            weight: 1
                        };
                    }
                    this._analyze({
                        key: key,
                        value: getFn(item, key),
                        record: item,
                        index: i
                    }, {
                        resultMap: resultMap,
                        results: results,
                        tokenSearchers: tokenSearchers,
                        fullSearcher: fullSearcher
                    });
                }
            }
            return { weights: weights, results: results };
        };
        StringSearch.prototype._analyze = function (options, searchers) {
            var key = options.key, _a = options.arrayIndex, arrayIndex = _a === void 0 ? -1 : _a, value = options.value, record = options.record, index = options.index;
            if (!value) {
                return;
            }
            var tokenSearchers = searchers.tokenSearchers, fullSearcher = searchers.fullSearcher, _b = searchers.resultMap, resultMap = _b === void 0 ? {} : _b, _c = searchers.results, results = _c === void 0 ? [] : _c;
            var _d = this.properties, _e = _d.tokenSeparator, tokenSeparator = _e === void 0 ? / +/g : _e, tokenize = _d.tokenize, matchAllTokens = _d.matchAllTokens;
            var averageScore = -1;
            var numTextMatches = 0;
            if (typeof value === 'string') {
                this._log("\nKey: " + (key === '' ? '-' : key));
                var mainSearchResult = fullSearcher.search(value);
                this._log("Full text: \"" + value + "\", score: " + mainSearchResult.score);
                if (tokenize) {
                    var tokens = value.split(tokenSeparator);
                    this.tokens.set(index, tokens);
                    var scores = [];
                    for (var i = 0; i < tokenSearchers.length; i += 1) {
                        var tokenSearcher = tokenSearchers[i];
                        this._log("\nPattern: \"" + tokenSearcher.pattern + "\"");
                        var hasMatchInText = false;
                        for (var j = 0; j < tokens.length; j += 1) {
                            var word = tokens[j];
                            var tokenSearchResult = tokenSearcher.search(word);
                            var obj = {};
                            if (tokenSearchResult.isMatch) {
                                obj[word] = tokenSearchResult.score;
                                //exists = true;
                                hasMatchInText = true;
                                scores.push(tokenSearchResult.score);
                            }
                            else {
                                obj[word] = 1;
                                if (!matchAllTokens) {
                                    scores.push(1);
                                }
                            }
                            this._log("Token: \"" + word + "\", score: " + obj[word]);
                            // tokenScores.push(obj)
                        }
                        if (hasMatchInText) {
                            numTextMatches += 1;
                        }
                    }
                    averageScore = scores[0];
                    var scoresLen = scores.length;
                    for (var i = 1; i < scoresLen; i += 1) {
                        averageScore += scores[i];
                    }
                    averageScore = averageScore / scoresLen;
                    this._log('Token score average:', averageScore);
                }
                var finalScore = mainSearchResult.score;
                if (averageScore > -1) {
                    finalScore = (finalScore + averageScore) / 2;
                }
                this._log('Score average:', finalScore);
                var checkTextMatches = (tokenize && matchAllTokens) ?
                    numTextMatches >= tokenSearchers.length : true;
                this._log("\nCheck Matches: " + checkTextMatches);
                // If a match is found, add the item to <rawResults>, including its score
                if (checkTextMatches) {
                    // Check if the item already exists in our results
                    var existingResult = resultMap[index];
                    var matchedIndices = mainSearchResult.matchedIndices, needle = mainSearchResult.needle, haystack = mainSearchResult.haystack;
                    if (existingResult) {
                        // Use the lowest score
                        // existingResult.score, bitapResult.score
                        existingResult.output.push({
                            key: key,
                            index: index,
                            arrayIndex: arrayIndex,
                            value: value,
                            needle: needle,
                            haystack: haystack,
                            matchedIndices: matchedIndices,
                            score: finalScore
                        });
                    }
                    else {
                        // Add it to the raw result list
                        resultMap[index] = {
                            value: record,
                            output: [{
                                    key: key,
                                    index: index,
                                    arrayIndex: arrayIndex,
                                    value: value,
                                    needle: needle,
                                    haystack: haystack,
                                    matchedIndices: matchedIndices,
                                    score: finalScore,
                                }]
                        };
                        results.push(resultMap[index]);
                    }
                }
            }
            else if (isArrayTypes_1.isArray(value)) {
                for (var i = 0, len = value.length; i < len; i += 1) {
                    this._analyze({
                        key: key,
                        index: index,
                        arrayIndex: i,
                        value: value[i],
                        record: record
                    }, {
                        resultMap: resultMap,
                        results: results,
                        tokenSearchers: tokenSearchers,
                        fullSearcher: fullSearcher
                    });
                }
            }
        };
        StringSearch.prototype._computeScore = function (weights, results) {
            this._log('\n\nComputing score:\n');
            for (var i = 0, len = results.length; i < len; i += 1) {
                var output = results[i].output;
                var scoreLen = output.length;
                var currScore = !!output[0].matchedIndices.length ? 0.99 : 1;
                var bestScore = 1;
                for (var j = 0; j < scoreLen; j += 1) {
                    if (!!output[j].matchedIndices.length) {
                        output[j].score -= 0.001;
                    }
                    var weight = weights ? weights[output[j].key].weight : 1;
                    var score = weight === 1 ? output[j].score : (output[j].score || 0.001);
                    var nScore = score * weight;
                    if (weight !== 1) {
                        bestScore = Math.min(bestScore, nScore);
                    }
                    else {
                        output[j].nScore = nScore;
                        currScore *= nScore;
                    }
                }
                results[i].score = Math.max(0, bestScore === 1 ? currScore : bestScore);
                this._log(results[i]);
            }
        };
        StringSearch.prototype._sort = function (results) {
            this._log('\n\nSorting....');
            results.sort(this.properties.sortFn);
        };
        StringSearch.prototype._format = function (results) {
            var _this = this;
            var _a = this.properties, verbose = _a.verbose, id = _a.id, caseSensitive = _a.caseSensitive, _b = _a.tokenSeparator, tokenSeparator = _b === void 0 ? / +/g : _b, _c = _a.getFn, getFn = _c === void 0 ? deepValue_1.default : _c;
            var finalOutput = [];
            var transformers = [];
            this._log('\n\nOutput:\n\n', JSON.stringify(results));
            transformers.push(function (result, data) {
                var output = result.output;
                data.matches = [];
                var _loop_1 = function (i, len) {
                    var item = output[i];
                    if (item.matchedIndices.length === 0) {
                        return "continue";
                    }
                    var obj = {
                        indices: item.matchedIndices.map(function (range) {
                            var haystack = item.haystack.substring(range[0], range[1]);
                            var type = (item.needle === item.haystack) ? 'exact' : 'fuzzy';
                            if (type === 'fuzzy') {
                                var tokens = _this.tokens.get(item.index).map(function (t) {
                                    t = caseSensitive ? t : t.toLowerCase();
                                    if (t === haystack) {
                                        type = 'token';
                                    }
                                    return t;
                                });
                                if (type === 'fuzzy') {
                                    if (tokens.length === diu_1.intersection.apply(void 0, tslib_1.__spread([tokens], haystack.split(tokenSeparator))).length) {
                                        type = 'token';
                                    }
                                }
                            }
                            return { type: type, range: range };
                        }),
                        value: item.value
                    };
                    if (item.key) {
                        obj.key = item.key;
                    }
                    if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
                        obj.arrayIndex = item.arrayIndex;
                    }
                    data.matches.push(obj);
                };
                for (var i = 0, len = output.length; i < len; i += 1) {
                    _loop_1(i, len);
                }
            });
            transformers.push(function (result, data) {
                if (data.matches.length && data.matches[0].indices && data.matches[0].indices[0].type === 'exact') {
                    data.score = 0;
                }
                else {
                    data.score = result.score;
                }
            });
            for (var i = 0, len = results.length; i < len; i += 1) {
                var result = results[i];
                var value = result.value, output = result.output, _d = result.score, score = _d === void 0 ? 1 : _d;
                if (id) {
                    result.value = getFn(result.value, id)[0];
                }
                var data = { value: value, index: output[0].index };
                for (var j = 0, len_1 = transformers.length; j < len_1; j += 1) {
                    transformers[j](result, data);
                }
                finalOutput.push(data);
            }
            return finalOutput;
        };
        StringSearch.prototype._log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.properties.verbose) {
                console.log.apply(console, tslib_1.__spread(args));
            }
        };
        return StringSearch;
    }());
    exports.default = StringSearch;
});
//# sourceMappingURL=index.js.map