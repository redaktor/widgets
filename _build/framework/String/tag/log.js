(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@dojo/framework/has/has", "@dojo/framework/shim/string"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var has_1 = require("@dojo/framework/has/has");
    var string_1 = require("@dojo/framework/shim/string");
    var R = [31, '#DC0005'];
    var G = [32, '#95CC0D'];
    var B = [34, '#0D7ECC'];
    var C = [36, '#1397A3'];
    var M = [35, '#CC0D5A'];
    var Y = [33, '#FFAF00'];
    var K = [30, '#1C191B'];
    var W = [37, '#F5F5F5'];
    var gray = [90, '#74757A'];
    var colorCodes = {
        R: R, red: R, error: R,
        G: G, green: G, success: G,
        B: B, blue: B, info: B,
        C: C, cyan: C,
        M: M, magenta: M,
        Y: Y, yellow: Y, warning: Y,
        K: K, black: K,
        W: W, white: W,
        gray: gray, grey: G, muted: G,
        reset: ['', '']
    };
    var prefixes = {
        reset: ' ',
        message: ' ',
        success: '*',
        warning: '!',
        error: '!',
        list: '*',
        input: '<',
        output: '>',
        neutral: '*',
        muted: '*'
    };
    //type Prefix = keyof typeof prefixes;
    var types = {
        _string: 'G',
        _number: 'B',
        _function: 'Y',
        _key: 'M',
        _null: 'gray',
        _undefined: 'gray',
        _boolean: 'reset',
    };
    var prefixFns = Object.keys(prefixes).reduce(function (o, prefix) {
        o[prefix] = function (strings) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            var logArgs = _.apply(void 0, tslib_1.__spread([strings], values));
            logArgs[0] = coloredStr(prefixes[prefix] + " " + logArgs[0], prefix);
            console.log.apply(console, tslib_1.__spread(logArgs));
            return logArgs[0];
        };
        return o;
    }, {});
    function _(strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var browserColors = [];
        var s = strings.reduce(function (result, string, i) {
            var v = Array.isArray(values[i]) ? values[i].join(' ') : values[i];
            var color = Object.keys(colorCodes).filter(function (k) { return string_1.endsWith(string, "" + k); })[0];
            if (color) {
                string = string.slice(0, 0 - color.length);
                v = coloredStr(v, color, browserColors);
            }
            return "" + result + string + (v ? "" + v : '');
        }, '');
        return tslib_1.__spread([s], browserColors);
    }
    exports._ = _;
    function log(strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var logArgs = _.apply(void 0, tslib_1.__spread([strings], values));
        console.log.apply(console, tslib_1.__spread([' '], logArgs));
        return logArgs[0];
    }
    exports.log = log;
    exports.reset = prefixFns.reset, exports.message = prefixFns.message, exports.success = prefixFns.success, exports.warning = prefixFns.warning, exports.error = prefixFns.error, exports.list = prefixFns.list, exports.input = prefixFns.input, exports.output = prefixFns.output, exports.neutral = prefixFns.neutral, exports.muted = prefixFns.muted;
    function info() {
        var strings = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            strings[_i] = arguments[_i];
        }
        //strings = strings.map(s => _`${s}`[0]);
        log(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["G", ""], ["G", ""])), " \u255A\u2550\u2550\u2550\u2550\u255D");
        log(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["G", ""], ["G", ""])), " \u2554\u2550\u2550\u2550\u2550\u2557");
        log(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["G", ""], ["G", ""])), " \u2551    \u2551");
        log(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["G", " ", ""], ["G", " ", ""])), " \u2551    \u2551", strings.join(' '));
    }
    exports.info = info;
    function coloredStr(v, color, browserColors) {
        if (browserColors === void 0) { browserColors = []; }
        if (!colorCodes[color]) {
            return v;
        }
        if (has_1.default('host-node')) {
            var code = colorCodes[color][0];
            v = "\u001B[" + code + "m" + v + "\u001B[" + (!!code ? '39' : '') + "m";
        }
        else {
            var hex = colorCodes[color][0];
            v = "%c" + v;
            browserColors.push("color: " + hex);
        }
        return v;
    }
    function syntaxLog(prefix, key, value, includeFn) {
        if (typeof console === 'undefined') {
            return;
        }
        if ((prefix === '<' || prefix === '>') && typeof value === 'string' &&
            /^(http|\/|.\/|..\/)/i.test(value)) {
            console.log(prefix, key, syntaxColor(value, 'gray'));
        }
        else if (!!value && typeof value === 'object' && key.length && Object.keys(value).length) {
            console.log(prefix, key, syntaxColor('\u27C0', 'yellow'));
            console.log(syntaxHighlight(JSON.stringify(value, null, 2)));
            // console.log(' ');
        }
        else if (value === void 0 || value === null) {
            var strValue = (value === void 0) ? 'undefined' : 'null';
            console.log(prefix, key, syntaxColor(strValue, 'gray'));
        }
        else if (typeof value === 'function') {
            if (includeFn) {
                console.log(prefix, syntaxColor(key, 'yellow'), value);
            }
            else {
                return void 0;
            }
        }
        else {
            console.log(prefix, key, syntaxHighlight(JSON.stringify(value)));
        }
    }
    exports.syntaxLog = syntaxLog;
    function dumpError(err) {
        if (typeof err === 'object') {
            if (err.message) {
                console.log('\nERROR Message: ' + err.message);
            }
            if (err.stack) {
                console.log('\nStacktrace:');
                console.log('====================');
                console.log(err.stack);
            }
        }
        else {
            console.log('dumpError :: argument is not an object');
        }
    }
    exports.dumpError = dumpError;
    function syntaxColor(v, color) {
        if (typeof color === 'string' && colorCodes.hasOwnProperty(color)) {
            return coloredStr(v, color);
        }
        var cType = types._number;
        if (/^"/.test(v)) {
            cType = /:$/.test(v) ? types._key : types._string;
        }
        else if (/true|false/.test(v)) {
            cType = types._boolean;
        }
        else if (/null|undefined/.test(v)) {
            cType = types._null;
        }
        return coloredStr(v, cType);
    }
    exports.syntaxColor = syntaxColor;
    function syntaxHighlight(value) {
        var fn = function (v, color) { return syntaxColor(v, color); };
        return value.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, fn);
    }
    exports.syntaxHighlight = syntaxHighlight;
    function pwStr(str, padding) {
        if (padding === void 0) { padding = 1; }
        str = "" + str;
        if ((padding * 2) > str.length - 3) {
            padding = 1;
        }
        var secretStr = new Array(str.length + 1 - padding).join('*');
        return ([str.slice(0, padding), secretStr, str.slice(0 - padding)].join(''));
    }
    exports.pwStr = pwStr;
    function _log(logArr, doPadding, includeFn) {
        if (doPadding === void 0) { doPadding = false; }
        if (includeFn === void 0) { includeFn = true; }
        if (typeof console === 'undefined') {
            return;
        }
        if (!(logArr instanceof Array)) {
            logArr = [logArr];
        }
        logArr.forEach(function (o) {
            var isPrefix = prefixes.hasOwnProperty(Object.keys(o)[0]);
            var prefix = ':';
            if (typeof o != 'object' || Object.keys(o).length > 1 || !isPrefix) {
                console.log(':', o);
            }
            else {
                var key = Object.keys(o)[0];
                var isSyntax = !(colorCodes.hasOwnProperty(key));
                prefix = prefixes.hasOwnProperty(key) ? prefixes[key] : ' ';
                if (typeof o[key] != 'object') {
                    if (isSyntax) {
                        syntaxLog(prefix, '', o[key], includeFn);
                    }
                    else {
                        console.log(' ', o[key]);
                    }
                }
                else if (Array.isArray(o[key])) {
                    o[key].forEach(function (v) {
                        syntaxLog(prefix, '', v, includeFn);
                    });
                }
                else {
                    for (var logKey in o[key]) {
                        var k = logKey;
                        var v = o[key][k];
                        if (typeof v != 'function' && doPadding) {
                            k = new Array(Object.keys(o[key]).reduce(function (a, b) {
                                return a.length > b.length ? a : b;
                            }).length + 1).join(' ');
                            k = ([k || ' ', logKey].join(' ')).slice(-k.length - 1);
                        }
                        syntaxLog(prefix, k + ':', v, includeFn);
                    }
                }
            }
            //if (prefix != '<' && prefix != '>') { console.log(' '); }
        });
    }
    exports._log = _log;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
});
//# sourceMappingURL=log.js.map