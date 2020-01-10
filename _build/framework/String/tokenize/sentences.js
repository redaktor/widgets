(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../regex/regexLine", "../regex/regexPunctuations", "../regex/regexPeriodDigit", "../regex/regexPeriodPrefix", "../regex/abbreviation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regexLine_1 = require("../regex/regexLine");
    var regexPunctuations_1 = require("../regex/regexPunctuations");
    var regexPeriodDigit_1 = require("../regex/regexPeriodDigit");
    var regexPeriodPrefix_1 = require("../regex/regexPeriodPrefix");
    var abbreviation_1 = require("../regex/abbreviation");
    /*
    async function renderWidget() {
        const container = document.getElementById("widget");
        if (container !== null) {
            const widget = await import("./widget");
            widget.render(container);
        }
    }
    
    renderWidget();
    
    
    export const periodPrefixes: any = `id|xy|${TLDs}|${fileExtensions}`;
    new RegExp(String.raw`\b(${abbreviations})[.] ?$`, 'i')
    */
    function splitSentences(s) {
        var text = "" + s;
        var sentences = [];
        if (!text) {
            return sentences;
        }
        var chunks = [];
        var splits = [];
        // first, split by newline
        var lines = text.split(regexLine_1.default);
        var l = lines.length;
        for (var i = 0; i < l; i++) {
            // split by period, question-mark, and exclamation-mark
            var arr = lines[i].split(regexPunctuations_1.default);
            for (var o = 0; o < arr.length; o++) {
                splits.push(arr[o]);
            }
        }
        // filter-out the grap ones
        for (var i = 0; i < splits.length; i++) {
            var s_1 = splits[i];
            if (!s_1 || !s_1.length) {
                continue;
            }
            // this is meaningful whitespace
            if (!s_1) {
                // add it to the last one
                if (chunks[chunks.length - 1]) {
                    chunks[chunks.length - 1] += s_1;
                    continue;
                }
                else if (splits[i + 1]) {
                    // add it to the next one
                    splits[i + 1] = s_1 + splits[i + 1];
                    continue;
                }
            }
            // else, only whitespace, no terms, no sentence
            chunks.push(s_1);
        }
        // detection of non-sentence chunks:
        // loop through these chunks, and join the non-sentence chunks back together..
        for (var i = 0; i < chunks.length; i++) {
            var c = chunks[i];
            var isOK = regexPeriodDigit_1.default.test(c);
            var isAbbr = abbreviation_1.default(c); /*|| this.i18n.periodSuffix.test(c.trim());*/ // FIXME
            console.log(c, isOK, isAbbr);
            // should this chunk be combined with the next one?
            var isAbbrChunk = i < chunks.length - 1 && !isOK && !!isAbbr;
            if (!isAbbrChunk && i < chunks.length - 1) {
                var lastW = c.match(/\b(\w+)\W*$/);
                var abbrMulti = ("" + (lastW && lastW[1] ? lastW[1] : '') + (chunks[i + 1] || ''))
                    .replace(/\s|[.]/g, '');
                //isAbbrChunk = (`${this.i18n.abbreviations}|`.indexOf(`${abbrMulti}|`) > -1); // FIXME
            }
            /* TODO FIXME
            -> isAbbrDigitChunk (e.g. lists - "2. Do a task" OR latin order 132. item)
            -> date // digit MIKE - SUN digit etc
            sun|jan|
            -> place
            in|mass|
            -> other
            is|as|
            '	foot
            '	minute
            ''	inch
            ''	second
            */
            if (isAbbrChunk) {
                chunks[i + 1] = c + (chunks[i + 1] || '');
            }
            else if (c && c.length > 0) {
                // this chunk is a proper sentence..
                sentences.push(c);
                chunks[i] = '';
            }
            if (i > 0 && regexPeriodPrefix_1.default.test(c)) { // TODO
                chunks[i - 1] = chunks[i - 1] + c;
                chunks[i] = '';
            }
        }
        // if we never got a sentence, return the given text
        return (sentences.length === 0) ? [text] : sentences;
    }
    exports.default = splitSentences;
});
//# sourceMappingURL=sentences.js.map